import { describe, it, expect } from 'vitest';
import { solve } from './solver';
import { LEVELS } from './levels';
import type { Level } from './types';

describe('solve 基本', () => {
  it('1 ブロックが直接ゲートへ出られる → 最小 1 手', () => {
    const lv: Level = {
      cols: 4,
      rows: 4,
      blocks: [{ id: 'r', color: 'red', cells: [{ c: 2, r: 1 }] }],
      gates: [{ edge: 'right', start: 1, end: 1, color: 'red' }],
    };
    const res = solve(lv);
    expect(res.solvable).toBe(true);
    expect(res.minMoves).toBe(1);
  });

  it('幅の合うゲートが無ければ解けない', () => {
    const lv: Level = {
      cols: 4,
      rows: 4,
      // 2 幅ブロックに対しゲート幅 1 → 永久に出られない
      blocks: [{ id: 'r', color: 'red', cells: [{ c: 0, r: 0 }, { c: 1, r: 0 }] }],
      gates: [{ edge: 'top', start: 0, end: 0, color: 'red' }],
    };
    const res = solve(lv);
    expect(res.solvable).toBe(false);
  });

  it('邪魔なブロックをどかしてから出す → 複数手', () => {
    // red は右ゲート(行1)へ出たいが、blue が右隣を塞いでいる。
    // blue を先にどかす（例: 上/下へ）必要がある。
    const lv: Level = {
      cols: 4,
      rows: 3,
      blocks: [
        { id: 'r', color: 'red', cells: [{ c: 1, r: 1 }] },
        { id: 'b', color: 'blue', cells: [{ c: 2, r: 1 }, { c: 3, r: 1 }] },
      ],
      gates: [
        { edge: 'right', start: 1, end: 1, color: 'red' },
        { edge: 'top', start: 2, end: 3, color: 'blue' },
      ],
    };
    const res = solve(lv);
    expect(res.solvable).toBe(true);
    expect(res.minMoves).toBeGreaterThanOrEqual(2);
  });
});

describe('同梱レベルは全て解ける', () => {
  it.each(LEVELS.map((lv, i) => [i + 1, lv] as const))('Level %i が解ける', (_i, lv) => {
    const res = solve(lv);
    expect(res.exceeded).toBe(false);
    expect(res.solvable).toBe(true);
    expect(res.minMoves).toBeGreaterThanOrEqual(1);
  });
});
