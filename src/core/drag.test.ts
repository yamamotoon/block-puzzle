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

describe('DragController グリッドロック移動', () => {
  it('掴んだセルをポインタ直下のマスへ寄せる（整数移動）', () => {
    const g = new Game(level());
    const r = g.blocks[0]; // (1,2)(2,2)
    const d = new DragController(g, r, 1.5, 2.5); // (1,2) を掴む
    d.moveTo(1.5, 1.5); // 1 マス上へ
    expect(r.cells).toEqual([{ c: 1, r: 1 }, { c: 2, r: 1 }]);
  });

  it('他ブロックを貫通しない（接触で止まる）', () => {
    const g = new Game(level());
    const r = g.blocks[0]; // (1,2)(2,2)、右隣 (3,2) に青
    const d = new DragController(g, r, 1.5, 2.5);
    d.moveTo(6, 2.5); // 右へ大きく → 青に阻まれて動けない
    expect(r.cells).toEqual([{ c: 1, r: 2 }, { c: 2, r: 2 }]);
  });

  it('常にグリッド整数位置（サブセルのブレが無い）', () => {
    const g = new Game(level());
    const r = g.blocks[0];
    const d = new DragController(g, r, 1.5, 2.5);
    d.moveTo(0.9, 0.9); // 斜めの半端な入力
    for (const cell of r.cells) {
      expect(Number.isInteger(cell.c)).toBe(true);
      expect(Number.isInteger(cell.r)).toBe(true);
    }
  });

  it('階段状の経路を 1 回の入力でも角を回り込んで進める', () => {
    // moveToward が 1 マスずつ優先軸＋フォールバックで解決するため、
    // 大きな移動でも角を回り込める。
    const lv: Level = {
      cols: 4,
      rows: 4,
      blocks: [
        { id: 'm', color: 'red', cells: [{ c: 0, r: 0 }] },
        { id: 'o1', color: 'blue', cells: [{ c: 1, r: 0 }, { c: 2, r: 0 }, { c: 2, r: 1 }] },
        { id: 'o2', color: 'blue', cells: [{ c: 0, r: 2 }] },
      ],
      gates: [],
    };
    const g = new Game(lv);
    const m = g.blocks[0];
    const d = new DragController(g, m, 0.5, 0.5);
    d.moveTo(2.5, 2.5); // (2,2) を目指す
    expect(m.cells).toEqual([{ c: 2, r: 2 }]);
  });
});

describe('DragController ゲート脱出', () => {
  it('同色ゲートに揃って接すると脱出（隣接で自動）', () => {
    const g = new Game(level());
    const r = g.blocks[0]; // red、top ゲート 0..2
    const d = new DragController(g, r, 1.5, 2.5);
    d.moveTo(1.5, -1); // 上端 (row 0) まで運ぶ
    expect(d.exited).toBe(true);
    expect(d.exitEdge).toBe('top');
    expect(r.removed).toBe(true);
  });

  it('色が違うゲートからは脱出しない', () => {
    const g = new Game(level());
    const b = g.blocks[1]; // blue、top ゲートは red
    const d = new DragController(g, b, 3.5, 2.5);
    d.moveTo(3.5, -1); // 上端まで
    expect(b.removed).toBe(false);
    expect(d.exited).toBe(false);
  });

  it('ゲート幅からはみ出す位置では脱出しない', () => {
    // 右ゲートは行1のみ。ブロックを行3へ下ろしてから右端へ寄せても出られない。
    const lv: Level = {
      cols: 5,
      rows: 5,
      blocks: [{ id: 'r', color: 'red', cells: [{ c: 3, r: 1 }] }],
      gates: [{ edge: 'right', start: 1, end: 1, color: 'red' }],
    };
    const g = new Game(lv);
    const r = g.blocks[0];
    const d = new DragController(g, r, 3.5, 1.5);
    d.moveTo(3.5, 3.5); // 行3へ
    d.moveTo(9, 3.5); // 右端へ寄せる（行3・ゲート外）
    expect(r.removed).toBe(false);
    expect(d.exited).toBe(false);
  });

  it('ゲート幅に合った位置なら脱出する（対照）', () => {
    const lv: Level = {
      cols: 5,
      rows: 5,
      blocks: [{ id: 'r', color: 'red', cells: [{ c: 3, r: 1 }] }],
      gates: [{ edge: 'right', start: 1, end: 1, color: 'red' }],
    };
    const g = new Game(lv);
    const r = g.blocks[0];
    const d = new DragController(g, r, 3.5, 1.5);
    d.moveTo(9, 1.5); // 行1のまま右端へ → 脱出
    expect(d.exited).toBe(true);
    expect(d.exitEdge).toBe('right');
    expect(r.removed).toBe(true);
  });
});
