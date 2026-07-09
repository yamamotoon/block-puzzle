import { describe, it, expect } from 'vitest';
import { Game } from './game';
import { DragController } from './drag';
import type { Level } from './types';

function level(): Level {
  return {
    cols: 5,
    rows: 5,
    blocks: [
      { id: 'r', color: 'red', cells: [{ c: 1, r: 2 }, { c: 2, r: 2 }] },
      { id: 'b', color: 'blue', cells: [{ c: 3, r: 2 }] },
    ],
    gates: [{ edge: 'top', start: 0, end: 2, color: 'red' }],
  };
}

describe('DragController スナップ', () => {
  it('離すと最も近い整数セルへスナップする', () => {
    const g = new Game(level());
    const r = g.blocks[0];
    // (1,2)(2,2) を掴んで上へ約0.8セル動かす → 行1へスナップ（ゲート際ではない）
    const d = new DragController(g, r, 1.5, 2.5);
    d.moveTo(1.5, 1.7); // offR ≈ -0.8
    expect(d.release()).toBe('snap');
    expect(r.cells).toEqual([{ c: 1, r: 1 }, { c: 2, r: 1 }]);
  });

  it('他ブロックを貫通しない（接触で止まる）', () => {
    const g = new Game(level());
    const r = g.blocks[0]; // (1,2)(2,2)、右隣 (3,2) に青
    const d = new DragController(g, r, 1.5, 2.5);
    d.moveTo(6, 2.5); // 右へ大きく → 青に当たって (2,2) の右端まで
    // offC は最大 0（(2,2) の右に (3,2) があるため）に張り付く
    expect(d.offC).toBeLessThan(0.01);
    d.release();
    expect(r.cells).toEqual([{ c: 1, r: 2 }, { c: 2, r: 2 }]);
  });
});

describe('DragController ゲート吸い込み', () => {
  it('同色ゲートに隣接して揃えば自動脱出（押し込み不要）', () => {
    // (3,1) の赤、右ゲートは行1。最終列(c=4)へ運ぶだけ＝盤内で指を止めても脱出。
    const lv: Level = {
      cols: 5,
      rows: 5,
      blocks: [{ id: 'r', color: 'red', cells: [{ c: 3, r: 1 }] }],
      gates: [{ edge: 'right', start: 1, end: 1, color: 'red' }],
    };
    const g = new Game(lv);
    const r = g.blocks[0];
    const d = new DragController(g, r, 3.5, 1.5);
    d.moveTo(4.5, 1.5); // c=4（最終列）まで。盤外へは出していない
    expect(d.exited).toBe(true);
    expect(r.removed).toBe(true);
  });

  it('スナップでゲート際に吸着したら脱出する（回帰）', () => {
    // cols=6、右ゲート行1。ゲートまであと僅か（隣接未満）で離す →
    // スナップで最終列(c=5)に吸着 → その確定位置で脱出判定される。
    const lv: Level = {
      cols: 6,
      rows: 5,
      blocks: [{ id: 'r', color: 'red', cells: [{ c: 3, r: 1 }] }],
      gates: [{ edge: 'right', start: 1, end: 1, color: 'red' }],
    };
    const g = new Game(lv);
    const r = g.blocks[0];
    const d = new DragController(g, r, 3.5, 1.5);
    d.moveTo(5.1, 1.5); // offC≈1.6（c≈4.6）: 隣接(FLUSH=0.1)には未達
    expect(d.exited).toBe(false); // ドラッグ中はまだ出ない
    expect(d.release()).toBe('exit'); // スナップ→c=5でゲート際→脱出
    expect(r.removed).toBe(true);
  });

  it('ゲートに揃っても隣接していなければ脱出しない', () => {
    const lv: Level = {
      cols: 6,
      rows: 5,
      blocks: [{ id: 'r', color: 'red', cells: [{ c: 1, r: 1 }] }],
      gates: [{ edge: 'right', start: 1, end: 1, color: 'red' }],
    };
    const g = new Game(lv);
    const r = g.blocks[0];
    const d = new DragController(g, r, 1.5, 1.5);
    d.moveTo(3.5, 1.5); // c=3 まで（右端 c=5 には未到達）
    expect(d.exited).toBe(false);
    expect(r.removed).toBe(false);
  });

  it('色が違うゲートからは出られない', () => {
    const g = new Game(level());
    const b = g.blocks[1]; // blue、topゲートは red
    const d = new DragController(g, b, 3.5, 2.5);
    d.moveTo(3.5, -1); // 上へ振り切る
    expect(b.removed).toBe(false);
    expect(d.exited).toBe(false);
  });

  it('ゲート幅の外へずれた位置からは脱出できない（回帰）', () => {
    // 右ゲートは行 1 のみ（幅1）。ブロックを行 1 に置く。
    const lv: Level = {
      cols: 5,
      rows: 5,
      blocks: [{ id: 'r', color: 'red', cells: [{ c: 3, r: 1 }] }],
      gates: [{ edge: 'right', start: 1, end: 1, color: 'red' }],
    };
    const g = new Game(lv);
    const r = g.blocks[0];
    const d = new DragController(g, r, 3.5, 1.5);
    d.moveTo(3.5, 3.5); // まず行3（ゲート外）へ下ろす
    d.moveTo(9, 3.5); // 行3のまま右へ押し出そうとする → 壁で止まり脱出できない
    expect(d.exited).toBe(false);
    expect(r.removed).toBe(false);
    expect(d.offC).toBeLessThan(1 + 1e-3); // 右端(c=4)止まりで盤外へは出ていない
  });

  it('ゲート幅に合った位置なら脱出できる（対照）', () => {
    const lv: Level = {
      cols: 5,
      rows: 5,
      blocks: [{ id: 'r', color: 'red', cells: [{ c: 3, r: 1 }] }],
      gates: [{ edge: 'right', start: 1, end: 1, color: 'red' }],
    };
    const g = new Game(lv);
    const r = g.blocks[0];
    const d = new DragController(g, r, 3.5, 1.5);
    d.moveTo(9, 1.5); // 行1のまま右へ → ゲートから脱出
    expect(d.exited).toBe(true);
    expect(r.removed).toBe(true);
  });
});
