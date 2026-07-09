import { describe, it, expect } from 'vitest';
import { buildRoundedPolyGeometry } from './three';
import type { Cell } from '../core/types';

// 代表的なポリオミノで、角丸立体ジオメトリが例外なく生成でき、
// 頂点を持つ（＝空でない）ことを確認する。
const SHAPES: Record<string, Cell[]> = {
  monomino: [{ c: 0, r: 0 }],
  dominoH: [{ c: 0, r: 0 }, { c: 1, r: 0 }],
  dominoV: [{ c: 0, r: 0 }, { c: 0, r: 1 }],
  lTromino: [{ c: 0, r: 0 }, { c: 0, r: 1 }, { c: 1, r: 1 }],
  sTetromino: [{ c: 1, r: 0 }, { c: 2, r: 0 }, { c: 0, r: 1 }, { c: 1, r: 1 }],
  oTetromino: [{ c: 0, r: 0 }, { c: 1, r: 0 }, { c: 0, r: 1 }, { c: 1, r: 1 }],
  tTetromino: [{ c: 0, r: 0 }, { c: 1, r: 0 }, { c: 2, r: 0 }, { c: 1, r: 1 }],
};

describe('buildRoundedPolyGeometry', () => {
  it.each(Object.entries(SHAPES))('%s のジオメトリを生成できる', (_name, cells) => {
    let ac = Infinity;
    let ar = Infinity;
    for (const c of cells) {
      if (c.c < ac) ac = c.c;
      if (c.r < ar) ar = c.r;
    }
    const geo = buildRoundedPolyGeometry(cells, ac, ar);
    const pos = geo.getAttribute('position');
    expect(pos).toBeTruthy();
    expect(pos.count).toBeGreaterThan(0);
    // 高さ（Y）が 0..BLOCK_H 付近に収まる（極端に壊れていない）
    let maxY = -Infinity;
    let minY = Infinity;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > maxY) maxY = y;
      if (y < minY) minY = y;
    }
    expect(minY).toBeGreaterThanOrEqual(-0.2);
    expect(maxY).toBeLessThanOrEqual(1.2);
  });
});
