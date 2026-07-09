import type { Level } from './types';

// 各ブロックが対応する同色ゲートに（多少他ブロックをどかしつつ）到達できる、
// 遊べる最小レベル群。座標は (c, r) = (列, 行)、原点は左上。

export const LEVELS: Level[] = [
  // Level 1: 4 色 4 ブロック・4 ゲート。各辺に 1 つずつ出口。
  {
    cols: 6,
    rows: 6,
    blocks: [
      { id: 'r1', color: 'red', cells: [{ c: 1, r: 1 }, { c: 2, r: 1 }, { c: 2, r: 2 }] },
      { id: 'b1', color: 'blue', cells: [{ c: 4, r: 1 }, { c: 4, r: 2 }] },
      { id: 'g1', color: 'green', cells: [{ c: 2, r: 4 }, { c: 3, r: 4 }, { c: 3, r: 3 }] },
      { id: 'y1', color: 'yellow', cells: [{ c: 1, r: 5 }, { c: 2, r: 5 }] },
    ],
    gates: [
      { edge: 'top', start: 0, end: 2, color: 'red' },
      { edge: 'right', start: 0, end: 2, color: 'blue' },
      { edge: 'bottom', start: 2, end: 4, color: 'green' },
      { edge: 'left', start: 3, end: 5, color: 'yellow' },
    ],
  },

  // Level 2: 中央の大きなブロックを含む、少し密なレイアウト。
  {
    cols: 6,
    rows: 6,
    blocks: [
      { id: 'r1', color: 'red', cells: [{ c: 0, r: 2 }, { c: 1, r: 2 }] },
      { id: 'b1', color: 'blue', cells: [{ c: 2, r: 2 }, { c: 3, r: 2 }, { c: 2, r: 3 }, { c: 3, r: 3 }] },
      { id: 'p1', color: 'purple', cells: [{ c: 4, r: 1 }, { c: 4, r: 2 }, { c: 4, r: 3 }] },
      { id: 'g1', color: 'green', cells: [{ c: 2, r: 4 }, { c: 3, r: 4 }] },
    ],
    gates: [
      { edge: 'top', start: 0, end: 5, color: 'red' },
      { edge: 'left', start: 1, end: 3, color: 'blue' },
      { edge: 'right', start: 1, end: 3, color: 'purple' },
      { edge: 'bottom', start: 2, end: 3, color: 'green' },
    ],
  },
];
