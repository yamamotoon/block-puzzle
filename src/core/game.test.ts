import { describe, it, expect } from 'vitest';
import { Game } from './game';
import type { Level } from './types';

function baseLevel(): Level {
  return {
    cols: 5,
    rows: 5,
    blocks: [
      { id: 'r', color: 'red', cells: [{ c: 1, r: 2 }, { c: 2, r: 2 }] },
      { id: 'b', color: 'blue', cells: [{ c: 3, r: 2 }] },
    ],
    gates: [
      { edge: 'top', start: 0, end: 2, color: 'red' },
      { edge: 'right', start: 0, end: 4, color: 'blue' },
    ],
  };
}

describe('Game 移動と衝突', () => {
  it('空きマスへ動ける', () => {
    const g = new Game(baseLevel());
    const r = g.blocks[0];
    g.moveToward(r, 0, -1); // 上へ 1
    expect(r.cells).toEqual([{ c: 1, r: 1 }, { c: 2, r: 1 }]);
  });

  it('他ブロックを貫通しない', () => {
    const g = new Game(baseLevel());
    const r = g.blocks[0]; // (1,2)(2,2)
    g.moveToward(r, 5, 0); // 右へ大きく → (3,2) の青にぶつかって止まる
    expect(r.cells).toEqual([{ c: 1, r: 2 }, { c: 2, r: 2 }]);
  });

  it('盤外へは出ない（ゲート判定を除く）', () => {
    const g = new Game(baseLevel());
    const r = g.blocks[0];
    g.moveToward(r, -5, 0); // 左端まで
    expect(r.cells).toEqual([{ c: 0, r: 2 }, { c: 1, r: 2 }]);
  });

  it('障害物に当たっても行ける所までは進む', () => {
    const g = new Game(baseLevel());
    const b = g.blocks[1]; // (3,2)
    g.moveToward(b, 0, -5); // 上端 r=0 まで
    expect(b.cells).toEqual([{ c: 3, r: 0 }]);
  });
});

describe('Game ゲート判定とクリア', () => {
  it('同色ゲートに収まれば消える', () => {
    const g = new Game(baseLevel());
    const r = g.blocks[0];
    g.moveToward(r, 0, -2); // 上端へ（列 1,2 は top ゲート 0..2 内）
    expect(g.tryExit(r)).toBe(true);
    expect(r.removed).toBe(true);
  });

  it('色が違えば消えない', () => {
    const g = new Game(baseLevel());
    const b = g.blocks[1];
    g.moveToward(b, 0, -2); // 上端に着くが top ゲートは red
    expect(g.tryExit(b)).toBe(false);
    expect(b.removed).toBe(false);
  });

  it('ゲート幅からはみ出すと消えない', () => {
    const level = baseLevel();
    level.gates[0] = { edge: 'top', start: 0, end: 1, color: 'red' }; // 幅を 2 → cols0..1 に
    const g = new Game(level);
    const r = g.blocks[0]; // 列 1,2 を占有 → 列 2 がゲート外
    g.moveToward(r, 0, -2);
    expect(g.tryExit(r)).toBe(false);
  });

  it('全ブロックを消すとクリア', () => {
    const g = new Game(baseLevel());
    const r = g.blocks[0];
    const b = g.blocks[1];
    g.moveToward(r, 0, -2);
    g.tryExit(r);
    expect(g.isCleared()).toBe(false);
    g.moveToward(b, 5, 0); // 右端 c=4 へ、right ゲート内
    g.tryExit(b);
    expect(g.isCleared()).toBe(true);
  });
});
