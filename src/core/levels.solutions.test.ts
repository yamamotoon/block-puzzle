import { describe, it, expect } from 'vitest';
import { Game } from './game';
import { LEVEL_SLOTS } from './levels';
import { LEVEL_SOLUTIONS } from './levels.solutions';
import type { Level } from './types';
import type { LevelSolution } from './levels.solutions';

// levels.solutions.ts は levels.ts から `npm run bake:solutions` で生成する焼き込みデータ。
// levels.ts だけ変更して焼き直しを忘れると、ここが確実に落ちる
// （手順が今のブロック配置に対して不正／クリアしない）ようにして検知する。

function legal(g: Game): boolean {
  const seen = new Set<string>();
  for (const b of g.blocks) {
    if (b.removed) continue;
    for (const c of b.cells) {
      if (c.c < 0 || c.c >= g.cols || c.r < 0 || c.r >= g.rows) return false;
      const k = `${c.c},${c.r}`;
      if (seen.has(k)) return false;
      seen.add(k);
    }
  }
  return true;
}

function replayBaked(level: Level, sol: LevelSolution): { cleared: boolean; alwaysLegal: boolean } {
  const g = new Game(level);
  let alwaysLegal = true;
  for (const mv of sol.path) {
    const b = g.blocks[mv.block];
    let minc = Infinity;
    let minr = Infinity;
    for (const c of b.cells) {
      if (c.c < minc) minc = c.c;
      if (c.r < minr) minr = c.r;
    }
    b.cells = b.cells.map((c) => ({ c: mv.to.c + (c.c - minc), r: mv.to.r + (c.r - minr) }));
    if (g.findExitGate(b)) b.removed = true;
    if (!legal(g)) alwaysLegal = false;
  }
  return { cleared: g.isCleared(), alwaysLegal };
}

describe('levels.solutions.ts は levels.ts と同期している', () => {
  it('スロット数・バリエーション数が LEVEL_SLOTS と一致する', () => {
    expect(LEVEL_SOLUTIONS.length).toBe(LEVEL_SLOTS.length);
    LEVEL_SLOTS.forEach((variants, i) => {
      expect(LEVEL_SOLUTIONS[i]?.length).toBe(variants.length);
    });
  });

  const allBoards = LEVEL_SLOTS.flatMap((variants, slot) =>
    variants.map((lv, vi) => [`${slot + 1}-${vi + 1}`, lv, LEVEL_SOLUTIONS[slot]?.[vi]] as const),
  );

  it.each(allBoards)('Level %s の焼き込み済み手順が盤面を空にする', (_label, lv, sol) => {
    expect(sol).toBeDefined();
    const r = replayBaked(lv, sol!);
    expect(r.alwaysLegal).toBe(true);
    expect(r.cleared).toBe(true);
    expect(sol!.path.length).toBe(sol!.minMoves);
  });
});
