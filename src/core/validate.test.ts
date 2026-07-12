import { describe, it, expect } from 'vitest';
import { validateLevel } from './validate';
import { LEVEL_SLOTS } from './levels';
import { solve } from './solver';
import { canonicalLevelKey } from './generate';
import type { Level } from './types';

describe('validateLevel エラー検出', () => {
  it('セルの盤外・重なりを検出する', () => {
    const lv: Level = {
      cols: 4,
      rows: 4,
      blocks: [
        { id: 'a', color: 'red', cells: [{ c: 0, r: 0 }] },
        { id: 'b', color: 'red', cells: [{ c: 0, r: 0 }] }, // 重なり
        { id: 'c', color: 'blue', cells: [{ c: 5, r: 0 }] }, // 盤外
      ],
      gates: [{ edge: 'top', start: 0, end: 3, color: 'red' }],
    };
    const { errors } = validateLevel(lv);
    expect(errors.some((e) => e.includes('重な'))).toBe(true);
    expect(errors.some((e) => e.includes('盤外'))).toBe(true);
  });

  it('ゲート範囲のはみ出しを検出する', () => {
    const lv: Level = {
      cols: 4,
      rows: 4,
      blocks: [{ id: 'a', color: 'red', cells: [{ c: 0, r: 0 }] }],
      gates: [{ edge: 'top', start: 2, end: 9, color: 'red' }],
    };
    expect(validateLevel(lv).errors.length).toBeGreaterThan(0);
  });
});

describe('validateLevel 警告', () => {
  it('初期位置ですでに脱出可能なブロックを警告する', () => {
    const lv: Level = {
      cols: 4,
      rows: 4,
      blocks: [{ id: 'a', color: 'red', cells: [{ c: 1, r: 0 }] }], // top辺に接触
      gates: [{ edge: 'top', start: 0, end: 3, color: 'red' }],
    };
    const { errors, warnings } = validateLevel(lv);
    expect(errors).toHaveLength(0);
    expect(warnings.some((w) => w.includes('初期位置'))).toBe(true);
  });

  it('脱出できないブロック（対応ゲート無し）を警告する', () => {
    const lv: Level = {
      cols: 4,
      rows: 4,
      blocks: [{ id: 'a', color: 'green', cells: [{ c: 1, r: 1 }] }],
      gates: [{ edge: 'top', start: 0, end: 3, color: 'red' }],
    };
    expect(validateLevel(lv).warnings.some((w) => w.includes('脱出できません'))).toBe(true);
  });
});

describe('同梱レベルは健全', () => {
  it('全スロット・全バリエーションにエラーが無く、初期脱出可能ブロックも無い', () => {
    for (const variants of LEVEL_SLOTS) {
      for (const lv of variants) {
        const { errors, warnings } = validateLevel(lv);
        expect(errors).toEqual([]);
        expect(warnings.filter((w) => w.includes('初期位置'))).toEqual([]);
      }
    }
  });
});

describe('LEVEL_SLOTS のデータ品質', () => {
  it('各スロットに最低1つのバリエーションがある', () => {
    for (const variants of LEVEL_SLOTS) {
      expect(variants.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('同一スロット内の全バリエーションは最小手数が一致する（★判定の公平性）', () => {
    for (const variants of LEVEL_SLOTS) {
      const moves = variants.map((lv) => solve(lv).minMoves);
      const first = moves[0];
      for (const m of moves) expect(m).toBe(first);
    }
  }, 30000);

  it('全スロット・全バリエーションを通して盤面の重複が無い', () => {
    const keys = LEVEL_SLOTS.flatMap((variants) => variants.map((lv) => canonicalLevelKey(lv)));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('前半(World1)は固定ブロックが無く、後半(World2)は固定ブロックがある', () => {
    const half = LEVEL_SLOTS.length / 2;
    for (let i = 0; i < half; i++) {
      for (const lv of LEVEL_SLOTS[i]) {
        expect(lv.blocks.some((b) => b.fixed)).toBe(false);
      }
    }
    for (let i = half; i < LEVEL_SLOTS.length; i++) {
      for (const lv of LEVEL_SLOTS[i]) {
        expect(lv.blocks.some((b) => b.fixed)).toBe(true);
      }
    }
  });
});
