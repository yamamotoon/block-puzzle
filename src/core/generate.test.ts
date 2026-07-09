import { describe, it, expect } from 'vitest';
import { generateLevel, generateBatch, makeRng, pickRamp, pickRampTargets, pickProgression } from './generate';
import { validateLevel } from './validate';
import { solve } from './solver';
import { parseLevel, levelToText } from './level-format';

describe('generateLevel', () => {
  it('生成物は構造的に正当（エラー無し）', () => {
    const rng = makeRng(1);
    let checked = 0;
    for (let i = 0; i < 50; i++) {
      const lv = generateLevel(rng);
      if (!lv) continue;
      expect(validateLevel(lv).errors).toEqual([]);
      checked++;
    }
    expect(checked).toBeGreaterThan(0);
  });

  it('同じ seed なら同じ結果（再現性）', () => {
    const a = generateLevel(makeRng(42));
    const b = generateLevel(makeRng(42));
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});

describe('generateBatch', () => {
  it('返る候補は全て解ける', () => {
    const cands = generateBatch(7, 120);
    expect(cands.length).toBeGreaterThan(0);
    for (const c of cands) {
      expect(solve(c.level).solvable).toBe(true);
    }
  });

  it('「どかし」が要る候補（extraMoves>0）も生成できる', () => {
    const cands = generateBatch(3, 300);
    const withDepth = cands.filter((c) => c.extraMoves > 0);
    expect(withDepth.length).toBeGreaterThan(0);
  });
});

describe('pickRamp', () => {
  it('手数昇順・重複なしのランプを抽出する', () => {
    const pool = generateBatch(9, 200, { cols: 5, rows: 5, colors: 4, maxBlocksPerColor: 3, maxBlockSize: 3 }, 15000);
    const ramp = pickRamp(pool, 10);
    expect(ramp.length).toBeGreaterThan(1);
    expect(ramp.length).toBeLessThanOrEqual(10);
    // 昇順
    for (let i = 1; i < ramp.length; i++) {
      expect(ramp[i].minMoves).toBeGreaterThanOrEqual(ramp[i - 1].minMoves);
    }
    // 重複なし・全て解ける・最低難度以上
    const keys = new Set(ramp.map((c) => JSON.stringify(c.level)));
    expect(keys.size).toBe(ramp.length);
    for (const c of ramp) expect(c.minMoves).toBeGreaterThanOrEqual(3);
  }, 30000);
});

describe('pickRampTargets', () => {
  it('extra≥1・cap以下・昇順・重複なしの滑らかなランプ', () => {
    const pool = generateBatch(5, 300, { cols: 5, rows: 5, colors: 4, maxBlocksPerColor: 3, maxBlockSize: 3, minFreeCells: 4 }, 15000);
    const ramp = pickRampTargets(pool, 8, 16);
    expect(ramp.length).toBeGreaterThan(1);
    const keys = new Set(ramp.map((c) => JSON.stringify(c.level)));
    expect(keys.size).toBe(ramp.length); // 重複なし
    for (let i = 0; i < ramp.length; i++) {
      expect(ramp[i].extraMoves).toBeGreaterThanOrEqual(1); // 必ず「どかし」あり
      expect(ramp[i].minMoves).toBeLessThanOrEqual(16); // cap 以下
      if (i > 0) expect(ramp[i].minMoves).toBeGreaterThanOrEqual(ramp[i - 1].minMoves); // 昇順
    }
  }, 30000);
});

describe('pickProgression', () => {
  it('やさしい入口→cap までの昇順・重複なし進行', () => {
    const pool = [
      ...generateBatch(41, 300, { cols: 5, rows: 5, colors: 2, maxBlocksPerColor: 1, maxBlockSize: 3, minFreeCells: 8 }, 15000),
      ...generateBatch(42, 300, { cols: 5, rows: 5, colors: 4, maxBlocksPerColor: 3, maxBlockSize: 3, minFreeCells: 4 }, 15000),
    ];
    const prog = pickProgression(pool, 12, 16);
    expect(prog.length).toBeGreaterThan(4);
    const keys = new Set(prog.map((c) => JSON.stringify(c.level)));
    expect(keys.size).toBe(prog.length); // 重複なし
    for (let i = 1; i < prog.length; i++) {
      expect(prog[i].minMoves).toBeGreaterThanOrEqual(prog[i - 1].minMoves); // 昇順
    }
    expect(prog[0].minMoves).toBeLessThanOrEqual(prog[prog.length - 1].minMoves);
    expect(prog[prog.length - 1].minMoves).toBeLessThanOrEqual(16); // cap
  }, 30000);
});

describe('levelToText / parseLevel 往復', () => {
  it('生成レベルを文字列化→再パースしてブロック数・ゲートが一致', () => {
    const rng = makeRng(11);
    for (let i = 0; i < 30; i++) {
      const lv = generateLevel(rng);
      if (!lv) continue;
      const round = parseLevel(levelToText(lv));
      expect(round.blocks.length).toBe(lv.blocks.length);
      expect(round.gates).toEqual(lv.gates);
    }
  });
});
