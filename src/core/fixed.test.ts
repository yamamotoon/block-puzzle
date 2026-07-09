import { describe, it, expect } from 'vitest';
import { Game } from './game';
import { solve } from './solver';
import { parseLevel, levelToText } from './level-format';
import { generateBatch } from './generate';
import type { Level } from './types';

describe('固定ブロック: parse/serialize', () => {
  it("'#' を固定ブロックとして解釈する", () => {
    const lv = parseLevel(`
grid:
r.#
..#
gates:
left 0 red
`);
    const fixed = lv.blocks.filter((b) => b.fixed);
    const movable = lv.blocks.filter((b) => !b.fixed);
    expect(movable).toHaveLength(1);
    expect(fixed).toHaveLength(1);
    expect(fixed[0].cells).toHaveLength(2); // (2,0),(2,1) が連結
  });

  it('固定ブロックは往復（text↔Level）で保たれる', () => {
    const lv = parseLevel(`
grid:
r#
gates:
left 0 red
`);
    const round = parseLevel(levelToText(lv));
    expect(round.blocks.filter((b) => b.fixed)).toHaveLength(1);
  });
});

describe('固定ブロック: ゲーム挙動', () => {
  const lv: Level = {
    cols: 4,
    rows: 1,
    blocks: [
      { id: 'r', color: 'red', cells: [{ c: 0, r: 0 }] },
      { id: 'x', color: 'red', cells: [{ c: 1, r: 0 }], fixed: true },
    ],
    gates: [{ edge: 'right', start: 0, end: 0, color: 'red' }],
  };

  it('固定ブロックは障害物として貫通できない', () => {
    const g = new Game(lv);
    const r = g.blocks[0];
    expect(g.canMoveTo(r, 1, 0)).toBe(false); // 右隣に固定ブロック
  });

  it('固定ブロックはクリア判定に含めない', () => {
    const g = new Game(lv);
    // 可動の赤を消す手段が無い配置だが、判定ロジックの確認として removed を立てる
    g.blocks[0].removed = true;
    expect(g.isCleared()).toBe(true); // 固定は残っていてもクリア
  });
});

describe('固定ブロック: ソルバー', () => {
  it('固定ブロックを避けて解く（固定は脱出対象外）', () => {
    // 赤は左ゲートへ。上に固定ブロックがあるが左へは動ける。
    const lv: Level = {
      cols: 4,
      rows: 3,
      blocks: [
        { id: 'r', color: 'red', cells: [{ c: 2, r: 1 }] },
        { id: 'x', color: 'red', cells: [{ c: 0, r: 0 }, { c: 1, r: 0 }], fixed: true },
      ],
      gates: [{ edge: 'left', start: 1, end: 1, color: 'red' }],
    };
    const res = solve(lv);
    expect(res.solvable).toBe(true);
    expect(res.minMoves).toBe(1); // 赤を左へ 1 手
  });
});

describe('固定ブロック: 生成', () => {
  it('fixedBlocks 指定で固定ブロック入りの解けるレベルを生成できる', () => {
    const cands = generateBatch(
      77,
      120,
      { cols: 6, rows: 6, colors: 3, maxBlocksPerColor: 2, maxBlockSize: 3, minFreeCells: 4, fixedBlocks: 2, fixedMaxSize: 2 },
      12000,
    );
    const withFixed = cands.filter((c) => c.level.blocks.some((b) => b.fixed));
    expect(withFixed.length).toBeGreaterThan(0);
    for (const c of withFixed) expect(solve(c.level).solvable).toBe(true);
  }, 30000);
});
