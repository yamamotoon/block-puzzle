import { describe, it, expect } from 'vitest';
import { Game } from './game';
import { solve } from './solver';
import { LEVELS } from './levels';
import type { Level } from './types';

// ソルバーの解答手順を、実際にブロックを動かして最後まで再生し、
// 盤面が本当に空になる（クリアできる）ことを検証する。
// 各手のあと盤面が合法（盤内・重なり無し）であることも確認する。

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

function replayClears(level: Level): { cleared: boolean; alwaysLegal: boolean; moves: number } {
  const g = new Game(level);
  const res = solve(level);
  if (!res.path) return { cleared: false, alwaysLegal: false, moves: 0 };
  let alwaysLegal = true;
  for (const mv of res.path) {
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
  return { cleared: g.isCleared(), alwaysLegal, moves: res.path.length };
}

describe('解答手順の再生で全レベルがクリアできる', () => {
  it.each(LEVELS.map((lv, i) => [i + 1, lv] as const))('Level %i の解答が盤面を空にする', (_i, lv) => {
    const r = replayClears(lv);
    expect(r.alwaysLegal).toBe(true);
    expect(r.cleared).toBe(true);
    expect(r.moves).toBe(solve(lv).minMoves);
  });
});
