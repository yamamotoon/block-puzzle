// 自動生成ファイル。手で編集しないこと。
// `npm run bake:solutions` で levels.ts から再生成する（scripts/bake-solutions.mjs）。
// LEVEL_SLOTS と同じ [slot][variant] 構造で、各レベルの最小手数と解答手順を持つ。

import type { SolveMove } from './solver';

export interface LevelSolution {
  minMoves: number;
  path: SolveMove[];
}

export const LEVEL_SOLUTIONS: LevelSolution[][] = [
  [
    { minMoves: 3, path: [{"block":0,"to":{"c":2,"r":0}},{"block":1,"to":{"c":0,"r":4}},{"block":2,"to":{"c":4,"r":1}}] },
    { minMoves: 3, path: [{"block":0,"to":{"c":1,"r":0}},{"block":1,"to":{"c":4,"r":1}},{"block":2,"to":{"c":0,"r":3}}] },
    { minMoves: 3, path: [{"block":0,"to":{"c":3,"r":1}},{"block":1,"to":{"c":0,"r":1}},{"block":2,"to":{"c":0,"r":3}}] },
  ],
  [
    { minMoves: 3, path: [{"block":0,"to":{"c":1,"r":4}},{"block":1,"to":{"c":0,"r":3}},{"block":2,"to":{"c":2,"r":0}}] },
    { minMoves: 3, path: [{"block":0,"to":{"c":4,"r":0}},{"block":1,"to":{"c":0,"r":0}},{"block":2,"to":{"c":1,"r":3}}] },
    { minMoves: 3, path: [{"block":0,"to":{"c":2,"r":3}},{"block":1,"to":{"c":0,"r":0}},{"block":2,"to":{"c":2,"r":0}}] },
  ],
  [
    { minMoves: 3, path: [{"block":1,"to":{"c":0,"r":2}},{"block":0,"to":{"c":2,"r":1}},{"block":2,"to":{"c":0,"r":0}}] },
    { minMoves: 3, path: [{"block":2,"to":{"c":0,"r":1}},{"block":1,"to":{"c":0,"r":4}},{"block":0,"to":{"c":3,"r":0}}] },
    { minMoves: 3, path: [{"block":0,"to":{"c":2,"r":0}},{"block":1,"to":{"c":0,"r":2}},{"block":2,"to":{"c":3,"r":0}}] },
  ],
  [
    { minMoves: 4, path: [{"block":1,"to":{"c":0,"r":3}},{"block":0,"to":{"c":3,"r":0}},{"block":2,"to":{"c":4,"r":0}},{"block":3,"to":{"c":3,"r":3}}] },
    { minMoves: 4, path: [{"block":0,"to":{"c":1,"r":0}},{"block":1,"to":{"c":4,"r":4}},{"block":2,"to":{"c":3,"r":2}},{"block":3,"to":{"c":0,"r":1}}] },
    { minMoves: 4, path: [{"block":0,"to":{"c":1,"r":4}},{"block":1,"to":{"c":0,"r":0}},{"block":2,"to":{"c":3,"r":3}},{"block":3,"to":{"c":0,"r":2}}] },
  ],
  [
    { minMoves: 4, path: [{"block":0,"to":{"c":1,"r":0}},{"block":2,"to":{"c":4,"r":2}},{"block":3,"to":{"c":4,"r":4}},{"block":1,"to":{"c":0,"r":4}}] },
    { minMoves: 4, path: [{"block":0,"to":{"c":0,"r":3}},{"block":1,"to":{"c":3,"r":4}},{"block":2,"to":{"c":3,"r":0}},{"block":3,"to":{"c":3,"r":0}}] },
    { minMoves: 4, path: [{"block":1,"to":{"c":4,"r":1}},{"block":0,"to":{"c":4,"r":4}},{"block":2,"to":{"c":0,"r":1}},{"block":3,"to":{"c":2,"r":0}}] },
  ],
  [
    { minMoves: 4, path: [{"block":1,"to":{"c":0,"r":3}},{"block":2,"to":{"c":3,"r":0}},{"block":3,"to":{"c":3,"r":2}},{"block":0,"to":{"c":3,"r":4}}] },
    { minMoves: 4, path: [{"block":1,"to":{"c":0,"r":3}},{"block":2,"to":{"c":3,"r":0}},{"block":0,"to":{"c":3,"r":2}},{"block":3,"to":{"c":3,"r":4}}] },
    { minMoves: 4, path: [{"block":0,"to":{"c":3,"r":4}},{"block":1,"to":{"c":2,"r":0}},{"block":2,"to":{"c":1,"r":3}},{"block":3,"to":{"c":0,"r":0}}] },
  ],
  [
    { minMoves: 4, path: [{"block":0,"to":{"c":0,"r":2}},{"block":1,"to":{"c":2,"r":1}},{"block":2,"to":{"c":4,"r":1}},{"block":1,"to":{"c":0,"r":4}}] },
    { minMoves: 4, path: [{"block":0,"to":{"c":1,"r":0}},{"block":1,"to":{"c":4,"r":0}},{"block":2,"to":{"c":0,"r":0}},{"block":3,"to":{"c":0,"r":4}}] },
    { minMoves: 4, path: [{"block":0,"to":{"c":0,"r":1}},{"block":1,"to":{"c":3,"r":1}},{"block":2,"to":{"c":2,"r":0}},{"block":3,"to":{"c":2,"r":4}}] },
  ],
  [
    { minMoves: 5, path: [{"block":0,"to":{"c":2,"r":1}},{"block":2,"to":{"c":0,"r":0}},{"block":1,"to":{"c":2,"r":3}},{"block":3,"to":{"c":0,"r":1}},{"block":1,"to":{"c":0,"r":4}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":2,"r":0}},{"block":3,"to":{"c":0,"r":1}},{"block":1,"to":{"c":3,"r":2}},{"block":4,"to":{"c":0,"r":1}},{"block":2,"to":{"c":1,"r":4}}] },
    { minMoves: 5, path: [{"block":1,"to":{"c":0,"r":4}},{"block":2,"to":{"c":1,"r":4}},{"block":4,"to":{"c":3,"r":2}},{"block":0,"to":{"c":0,"r":4}},{"block":3,"to":{"c":4,"r":0}}] },
  ],
  [
    { minMoves: 5, path: [{"block":0,"to":{"c":4,"r":1}},{"block":1,"to":{"c":1,"r":1}},{"block":3,"to":{"c":0,"r":3}},{"block":1,"to":{"c":0,"r":2}},{"block":2,"to":{"c":0,"r":2}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":0,"r":2}},{"block":1,"to":{"c":3,"r":0}},{"block":2,"to":{"c":3,"r":1}},{"block":3,"to":{"c":3,"r":4}},{"block":4,"to":{"c":4,"r":0}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":2,"r":0}},{"block":1,"to":{"c":0,"r":1}},{"block":2,"to":{"c":4,"r":1}},{"block":3,"to":{"c":4,"r":4}},{"block":4,"to":{"c":2,"r":0}}] },
  ],
  [
    { minMoves: 6, path: [{"block":3,"to":{"c":0,"r":3}},{"block":2,"to":{"c":0,"r":3}},{"block":0,"to":{"c":4,"r":1}},{"block":1,"to":{"c":3,"r":0}},{"block":4,"to":{"c":1,"r":0}},{"block":1,"to":{"c":4,"r":4}}] },
    { minMoves: 6, path: [{"block":1,"to":{"c":0,"r":2}},{"block":0,"to":{"c":0,"r":3}},{"block":5,"to":{"c":1,"r":4}},{"block":2,"to":{"c":4,"r":4}},{"block":3,"to":{"c":3,"r":0}},{"block":4,"to":{"c":4,"r":4}}] },
    { minMoves: 6, path: [{"block":1,"to":{"c":0,"r":1}},{"block":3,"to":{"c":0,"r":1}},{"block":4,"to":{"c":3,"r":0}},{"block":5,"to":{"c":2,"r":2}},{"block":2,"to":{"c":1,"r":4}},{"block":0,"to":{"c":3,"r":0}}] },
  ],
  [
    { minMoves: 6, path: [{"block":3,"to":{"c":4,"r":3}},{"block":1,"to":{"c":2,"r":2}},{"block":0,"to":{"c":0,"r":2}},{"block":2,"to":{"c":3,"r":0}},{"block":1,"to":{"c":4,"r":3}},{"block":4,"to":{"c":3,"r":0}}] },
    { minMoves: 6, path: [{"block":2,"to":{"c":4,"r":0}},{"block":5,"to":{"c":2,"r":4}},{"block":1,"to":{"c":2,"r":4}},{"block":0,"to":{"c":2,"r":2}},{"block":3,"to":{"c":1,"r":0}},{"block":4,"to":{"c":0,"r":2}}] },
    { minMoves: 6, path: [{"block":2,"to":{"c":2,"r":4}},{"block":4,"to":{"c":0,"r":0}},{"block":1,"to":{"c":3,"r":1}},{"block":0,"to":{"c":2,"r":2}},{"block":3,"to":{"c":2,"r":0}},{"block":1,"to":{"c":4,"r":1}}] },
  ],
  [
    { minMoves: 7, path: [{"block":1,"to":{"c":0,"r":2}},{"block":5,"to":{"c":0,"r":2}},{"block":3,"to":{"c":0,"r":2}},{"block":4,"to":{"c":0,"r":4}},{"block":2,"to":{"c":1,"r":3}},{"block":0,"to":{"c":3,"r":3}},{"block":3,"to":{"c":3,"r":0}}] },
    { minMoves: 7, path: [{"block":3,"to":{"c":0,"r":4}},{"block":4,"to":{"c":1,"r":0}},{"block":1,"to":{"c":0,"r":3}},{"block":2,"to":{"c":0,"r":3}},{"block":0,"to":{"c":3,"r":1}},{"block":5,"to":{"c":1,"r":0}},{"block":6,"to":{"c":0,"r":4}}] },
    { minMoves: 7, path: [{"block":0,"to":{"c":1,"r":0}},{"block":4,"to":{"c":1,"r":0}},{"block":1,"to":{"c":4,"r":2}},{"block":5,"to":{"c":0,"r":4}},{"block":2,"to":{"c":0,"r":4}},{"block":6,"to":{"c":1,"r":4}},{"block":3,"to":{"c":0,"r":4}}] },
  ],
  [
    { minMoves: 8, path: [{"block":0,"to":{"c":3,"r":0}},{"block":3,"to":{"c":0,"r":0}},{"block":4,"to":{"c":0,"r":3}},{"block":6,"to":{"c":0,"r":3}},{"block":1,"to":{"c":2,"r":3}},{"block":5,"to":{"c":1,"r":0}},{"block":2,"to":{"c":0,"r":1}},{"block":0,"to":{"c":4,"r":2}}] },
    { minMoves: 8, path: [{"block":2,"to":{"c":4,"r":1}},{"block":1,"to":{"c":4,"r":1}},{"block":0,"to":{"c":4,"r":0}},{"block":3,"to":{"c":0,"r":4}},{"block":4,"to":{"c":1,"r":3}},{"block":5,"to":{"c":0,"r":4}},{"block":6,"to":{"c":0,"r":3}},{"block":7,"to":{"c":4,"r":0}}] },
    { minMoves: 8, path: [{"block":6,"to":{"c":1,"r":3}},{"block":5,"to":{"c":0,"r":3}},{"block":1,"to":{"c":2,"r":4}},{"block":2,"to":{"c":0,"r":3}},{"block":3,"to":{"c":3,"r":0}},{"block":0,"to":{"c":1,"r":2}},{"block":7,"to":{"c":4,"r":0}},{"block":4,"to":{"c":0,"r":3}}] },
  ],
  [
    { minMoves: 8, path: [{"block":3,"to":{"c":4,"r":2}},{"block":5,"to":{"c":2,"r":0}},{"block":1,"to":{"c":2,"r":2}},{"block":6,"to":{"c":2,"r":0}},{"block":2,"to":{"c":3,"r":4}},{"block":0,"to":{"c":4,"r":1}},{"block":1,"to":{"c":0,"r":3}},{"block":4,"to":{"c":3,"r":4}}] },
    { minMoves: 8, path: [{"block":7,"to":{"c":2,"r":4}},{"block":3,"to":{"c":0,"r":3}},{"block":6,"to":{"c":0,"r":3}},{"block":4,"to":{"c":4,"r":3}},{"block":0,"to":{"c":2,"r":3}},{"block":1,"to":{"c":2,"r":3}},{"block":2,"to":{"c":0,"r":0}},{"block":5,"to":{"c":0,"r":0}}] },
    { minMoves: 8, path: [{"block":0,"to":{"c":0,"r":1}},{"block":1,"to":{"c":4,"r":4}},{"block":2,"to":{"c":2,"r":0}},{"block":3,"to":{"c":2,"r":0}},{"block":4,"to":{"c":0,"r":1}},{"block":5,"to":{"c":0,"r":3}},{"block":6,"to":{"c":0,"r":2}},{"block":7,"to":{"c":0,"r":4}}] },
  ],
  [
    { minMoves: 9, path: [{"block":0,"to":{"c":1,"r":0}},{"block":3,"to":{"c":0,"r":2}},{"block":0,"to":{"c":2,"r":2}},{"block":1,"to":{"c":0,"r":2}},{"block":2,"to":{"c":2,"r":4}},{"block":4,"to":{"c":3,"r":0}},{"block":5,"to":{"c":4,"r":0}},{"block":6,"to":{"c":4,"r":0}},{"block":7,"to":{"c":4,"r":0}}] },
    { minMoves: 9, path: [{"block":5,"to":{"c":1,"r":2}},{"block":6,"to":{"c":1,"r":4}},{"block":4,"to":{"c":3,"r":0}},{"block":2,"to":{"c":2,"r":4}},{"block":0,"to":{"c":4,"r":4}},{"block":3,"to":{"c":0,"r":0}},{"block":1,"to":{"c":0,"r":4}},{"block":4,"to":{"c":0,"r":0}},{"block":5,"to":{"c":1,"r":0}}] },
    { minMoves: 9, path: [{"block":5,"to":{"c":4,"r":2}},{"block":3,"to":{"c":0,"r":3}},{"block":0,"to":{"c":0,"r":1}},{"block":1,"to":{"c":0,"r":1}},{"block":2,"to":{"c":0,"r":0}},{"block":3,"to":{"c":0,"r":0}},{"block":4,"to":{"c":0,"r":0}},{"block":6,"to":{"c":1,"r":4}},{"block":7,"to":{"c":1,"r":4}}] },
  ],
  [
    { minMoves: 9, path: [{"block":1,"to":{"c":4,"r":2}},{"block":4,"to":{"c":2,"r":2}},{"block":7,"to":{"c":4,"r":2}},{"block":0,"to":{"c":1,"r":4}},{"block":4,"to":{"c":1,"r":4}},{"block":3,"to":{"c":2,"r":0}},{"block":2,"to":{"c":0,"r":2}},{"block":5,"to":{"c":1,"r":3}},{"block":6,"to":{"c":0,"r":2}}] },
    { minMoves: 9, path: [{"block":7,"to":{"c":4,"r":0}},{"block":3,"to":{"c":4,"r":3}},{"block":4,"to":{"c":4,"r":1}},{"block":0,"to":{"c":0,"r":4}},{"block":2,"to":{"c":0,"r":4}},{"block":1,"to":{"c":3,"r":0}},{"block":3,"to":{"c":0,"r":4}},{"block":5,"to":{"c":0,"r":0}},{"block":6,"to":{"c":0,"r":2}}] },
    { minMoves: 9, path: [{"block":2,"to":{"c":2,"r":0}},{"block":0,"to":{"c":1,"r":0}},{"block":4,"to":{"c":0,"r":1}},{"block":7,"to":{"c":0,"r":1}},{"block":6,"to":{"c":3,"r":3}},{"block":0,"to":{"c":2,"r":3}},{"block":1,"to":{"c":3,"r":3}},{"block":3,"to":{"c":2,"r":3}},{"block":5,"to":{"c":3,"r":1}}] },
  ],
  [
    { minMoves: 10, path: [{"block":7,"to":{"c":0,"r":3}},{"block":1,"to":{"c":0,"r":0}},{"block":2,"to":{"c":0,"r":1}},{"block":4,"to":{"c":0,"r":1}},{"block":6,"to":{"c":2,"r":0}},{"block":3,"to":{"c":4,"r":4}},{"block":5,"to":{"c":3,"r":3}},{"block":0,"to":{"c":3,"r":3}},{"block":1,"to":{"c":2,"r":0}},{"block":8,"to":{"c":2,"r":0}}] },
    { minMoves: 10, path: [{"block":0,"to":{"c":0,"r":4}},{"block":3,"to":{"c":0,"r":4}},{"block":6,"to":{"c":0,"r":4}},{"block":1,"to":{"c":0,"r":3}},{"block":5,"to":{"c":0,"r":3}},{"block":7,"to":{"c":1,"r":0}},{"block":8,"to":{"c":0,"r":3}},{"block":4,"to":{"c":0,"r":1}},{"block":2,"to":{"c":1,"r":0}},{"block":4,"to":{"c":4,"r":0}}] },
    { minMoves: 10, path: [{"block":2,"to":{"c":0,"r":2}},{"block":6,"to":{"c":0,"r":3}},{"block":3,"to":{"c":2,"r":2}},{"block":0,"to":{"c":0,"r":2}},{"block":3,"to":{"c":2,"r":0}},{"block":7,"to":{"c":0,"r":1}},{"block":4,"to":{"c":2,"r":3}},{"block":1,"to":{"c":2,"r":4}},{"block":5,"to":{"c":2,"r":2}},{"block":7,"to":{"c":2,"r":1}}] },
  ],
  [
    { minMoves: 11, path: [{"block":2,"to":{"c":3,"r":0}},{"block":1,"to":{"c":4,"r":0}},{"block":0,"to":{"c":1,"r":0}},{"block":4,"to":{"c":4,"r":1}},{"block":5,"to":{"c":3,"r":0}},{"block":8,"to":{"c":3,"r":0}},{"block":4,"to":{"c":3,"r":3}},{"block":7,"to":{"c":4,"r":0}},{"block":3,"to":{"c":2,"r":4}},{"block":6,"to":{"c":2,"r":4}},{"block":9,"to":{"c":0,"r":2}}] },
    { minMoves: 11, path: [{"block":2,"to":{"c":0,"r":2}},{"block":0,"to":{"c":0,"r":0}},{"block":1,"to":{"c":2,"r":0}},{"block":2,"to":{"c":4,"r":0}},{"block":3,"to":{"c":4,"r":0}},{"block":5,"to":{"c":0,"r":1}},{"block":6,"to":{"c":2,"r":0}},{"block":7,"to":{"c":0,"r":1}},{"block":4,"to":{"c":1,"r":3}},{"block":8,"to":{"c":2,"r":0}},{"block":9,"to":{"c":2,"r":4}}] },
    { minMoves: 11, path: [{"block":0,"to":{"c":0,"r":1}},{"block":6,"to":{"c":3,"r":2}},{"block":4,"to":{"c":0,"r":1}},{"block":8,"to":{"c":3,"r":0}},{"block":10,"to":{"c":3,"r":0}},{"block":2,"to":{"c":3,"r":4}},{"block":1,"to":{"c":3,"r":2}},{"block":3,"to":{"c":3,"r":4}},{"block":7,"to":{"c":3,"r":0}},{"block":9,"to":{"c":0,"r":1}},{"block":5,"to":{"c":3,"r":3}}] },
  ],
  [
    { minMoves: 11, path: [{"block":9,"to":{"c":2,"r":4}},{"block":3,"to":{"c":4,"r":4}},{"block":0,"to":{"c":0,"r":2}},{"block":1,"to":{"c":0,"r":2}},{"block":4,"to":{"c":4,"r":4}},{"block":2,"to":{"c":4,"r":2}},{"block":5,"to":{"c":4,"r":4}},{"block":6,"to":{"c":4,"r":0}},{"block":7,"to":{"c":4,"r":2}},{"block":8,"to":{"c":4,"r":0}},{"block":9,"to":{"c":4,"r":2}}] },
    { minMoves: 11, path: [{"block":7,"to":{"c":2,"r":2}},{"block":4,"to":{"c":2,"r":3}},{"block":8,"to":{"c":4,"r":2}},{"block":2,"to":{"c":4,"r":0}},{"block":1,"to":{"c":3,"r":1}},{"block":0,"to":{"c":3,"r":4}},{"block":3,"to":{"c":2,"r":4}},{"block":2,"to":{"c":0,"r":2}},{"block":5,"to":{"c":1,"r":0}},{"block":6,"to":{"c":0,"r":2}},{"block":7,"to":{"c":0,"r":2}}] },
    { minMoves: 11, path: [{"block":0,"to":{"c":2,"r":0}},{"block":1,"to":{"c":2,"r":0}},{"block":5,"to":{"c":0,"r":0}},{"block":6,"to":{"c":4,"r":2}},{"block":3,"to":{"c":0,"r":0}},{"block":2,"to":{"c":0,"r":2}},{"block":7,"to":{"c":3,"r":2}},{"block":3,"to":{"c":1,"r":4}},{"block":4,"to":{"c":1,"r":3}},{"block":8,"to":{"c":0,"r":2}},{"block":9,"to":{"c":1,"r":4}}] },
  ],
  [
    { minMoves: 12, path: [{"block":9,"to":{"c":2,"r":4}},{"block":0,"to":{"c":1,"r":4}},{"block":5,"to":{"c":1,"r":3}},{"block":4,"to":{"c":0,"r":2}},{"block":1,"to":{"c":1,"r":2}},{"block":2,"to":{"c":1,"r":0}},{"block":3,"to":{"c":4,"r":1}},{"block":6,"to":{"c":3,"r":1}},{"block":7,"to":{"c":1,"r":0}},{"block":8,"to":{"c":0,"r":0}},{"block":9,"to":{"c":4,"r":1}},{"block":10,"to":{"c":0,"r":2}}] },
    { minMoves: 12, path: [{"block":9,"to":{"c":0,"r":4}},{"block":5,"to":{"c":2,"r":4}},{"block":6,"to":{"c":0,"r":2}},{"block":4,"to":{"c":4,"r":3}},{"block":1,"to":{"c":0,"r":2}},{"block":2,"to":{"c":2,"r":3}},{"block":3,"to":{"c":2,"r":3}},{"block":7,"to":{"c":1,"r":0}},{"block":0,"to":{"c":0,"r":2}},{"block":8,"to":{"c":0,"r":0}},{"block":0,"to":{"c":3,"r":3}},{"block":9,"to":{"c":3,"r":3}}] },
    { minMoves: 12, path: [{"block":2,"to":{"c":3,"r":0}},{"block":3,"to":{"c":4,"r":2}},{"block":1,"to":{"c":3,"r":2}},{"block":7,"to":{"c":3,"r":2}},{"block":2,"to":{"c":0,"r":3}},{"block":0,"to":{"c":3,"r":0}},{"block":4,"to":{"c":0,"r":4}},{"block":5,"to":{"c":0,"r":0}},{"block":6,"to":{"c":0,"r":0}},{"block":7,"to":{"c":0,"r":0}},{"block":8,"to":{"c":4,"r":1}},{"block":9,"to":{"c":3,"r":0}}] },
  ],
  [
    { minMoves: 13, path: [{"block":8,"to":{"c":4,"r":2}},{"block":5,"to":{"c":3,"r":2}},{"block":10,"to":{"c":4,"r":1}},{"block":9,"to":{"c":4,"r":0}},{"block":2,"to":{"c":2,"r":3}},{"block":7,"to":{"c":4,"r":0}},{"block":6,"to":{"c":1,"r":3}},{"block":3,"to":{"c":4,"r":2}},{"block":0,"to":{"c":1,"r":4}},{"block":1,"to":{"c":0,"r":0}},{"block":4,"to":{"c":0,"r":0}},{"block":5,"to":{"c":0,"r":0}},{"block":11,"to":{"c":4,"r":0}}] },
    { minMoves: 13, path: [{"block":5,"to":{"c":0,"r":3}},{"block":3,"to":{"c":0,"r":3}},{"block":9,"to":{"c":2,"r":4}},{"block":4,"to":{"c":2,"r":2}},{"block":6,"to":{"c":0,"r":2}},{"block":0,"to":{"c":0,"r":1}},{"block":1,"to":{"c":1,"r":0}},{"block":4,"to":{"c":2,"r":0}},{"block":2,"to":{"c":2,"r":3}},{"block":0,"to":{"c":3,"r":0}},{"block":6,"to":{"c":2,"r":4}},{"block":8,"to":{"c":0,"r":0}},{"block":7,"to":{"c":0,"r":3}}] },
    { minMoves: 13, path: [{"block":3,"to":{"c":2,"r":4}},{"block":5,"to":{"c":0,"r":4}},{"block":7,"to":{"c":2,"r":4}},{"block":6,"to":{"c":2,"r":1}},{"block":7,"to":{"c":4,"r":2}},{"block":4,"to":{"c":2,"r":4}},{"block":8,"to":{"c":4,"r":2}},{"block":1,"to":{"c":3,"r":3}},{"block":6,"to":{"c":3,"r":0}},{"block":0,"to":{"c":2,"r":2}},{"block":2,"to":{"c":3,"r":0}},{"block":1,"to":{"c":0,"r":0}},{"block":9,"to":{"c":3,"r":0}}] },
  ],
  [
    { minMoves: 13, path: [{"block":10,"to":{"c":3,"r":4}},{"block":9,"to":{"c":0,"r":4}},{"block":6,"to":{"c":1,"r":3}},{"block":5,"to":{"c":1,"r":3}},{"block":8,"to":{"c":1,"r":4}},{"block":0,"to":{"c":3,"r":3}},{"block":1,"to":{"c":0,"r":1}},{"block":2,"to":{"c":0,"r":1}},{"block":3,"to":{"c":4,"r":0}},{"block":4,"to":{"c":3,"r":3}},{"block":7,"to":{"c":4,"r":0}},{"block":9,"to":{"c":4,"r":0}},{"block":10,"to":{"c":0,"r":1}}] },
    { minMoves: 13, path: [{"block":3,"to":{"c":0,"r":1}},{"block":5,"to":{"c":0,"r":3}},{"block":6,"to":{"c":0,"r":3}},{"block":4,"to":{"c":3,"r":2}},{"block":1,"to":{"c":2,"r":3}},{"block":2,"to":{"c":2,"r":4}},{"block":3,"to":{"c":2,"r":0}},{"block":4,"to":{"c":3,"r":1}},{"block":0,"to":{"c":3,"r":3}},{"block":5,"to":{"c":0,"r":0}},{"block":7,"to":{"c":2,"r":0}},{"block":4,"to":{"c":3,"r":3}},{"block":6,"to":{"c":3,"r":3}}] },
    { minMoves: 13, path: [{"block":9,"to":{"c":0,"r":4}},{"block":5,"to":{"c":4,"r":3}},{"block":4,"to":{"c":4,"r":1}},{"block":7,"to":{"c":3,"r":2}},{"block":2,"to":{"c":0,"r":4}},{"block":8,"to":{"c":4,"r":1}},{"block":5,"to":{"c":2,"r":0}},{"block":7,"to":{"c":1,"r":2}},{"block":3,"to":{"c":0,"r":4}},{"block":1,"to":{"c":3,"r":0}},{"block":0,"to":{"c":0,"r":4}},{"block":6,"to":{"c":2,"r":0}},{"block":7,"to":{"c":2,"r":0}}] },
  ],
  [
    { minMoves: 14, path: [{"block":10,"to":{"c":3,"r":4}},{"block":9,"to":{"c":2,"r":4}},{"block":6,"to":{"c":0,"r":3}},{"block":3,"to":{"c":0,"r":3}},{"block":2,"to":{"c":4,"r":0}},{"block":7,"to":{"c":2,"r":0}},{"block":0,"to":{"c":2,"r":4}},{"block":4,"to":{"c":0,"r":0}},{"block":5,"to":{"c":0,"r":2}},{"block":8,"to":{"c":2,"r":3}},{"block":1,"to":{"c":4,"r":3}},{"block":2,"to":{"c":4,"r":3}},{"block":10,"to":{"c":1,"r":0}},{"block":11,"to":{"c":3,"r":3}}] },
    { minMoves: 14, path: [{"block":8,"to":{"c":0,"r":4}},{"block":4,"to":{"c":2,"r":3}},{"block":2,"to":{"c":2,"r":2}},{"block":5,"to":{"c":3,"r":3}},{"block":3,"to":{"c":3,"r":2}},{"block":0,"to":{"c":3,"r":0}},{"block":1,"to":{"c":2,"r":0}},{"block":2,"to":{"c":0,"r":2}},{"block":3,"to":{"c":0,"r":2}},{"block":5,"to":{"c":0,"r":2}},{"block":7,"to":{"c":4,"r":0}},{"block":8,"to":{"c":3,"r":0}},{"block":4,"to":{"c":0,"r":3}},{"block":6,"to":{"c":0,"r":2}}] },
    { minMoves: 14, path: [{"block":6,"to":{"c":4,"r":0}},{"block":8,"to":{"c":4,"r":1}},{"block":5,"to":{"c":3,"r":2}},{"block":4,"to":{"c":2,"r":2}},{"block":7,"to":{"c":1,"r":3}},{"block":0,"to":{"c":0,"r":2}},{"block":2,"to":{"c":0,"r":1}},{"block":3,"to":{"c":0,"r":4}},{"block":5,"to":{"c":3,"r":0}},{"block":4,"to":{"c":0,"r":1}},{"block":7,"to":{"c":4,"r":1}},{"block":9,"to":{"c":4,"r":1}},{"block":1,"to":{"c":0,"r":4}},{"block":10,"to":{"c":2,"r":0}}] },
  ],
  [
    { minMoves: 14, path: [{"block":11,"to":{"c":3,"r":4}},{"block":6,"to":{"c":3,"r":3}},{"block":1,"to":{"c":3,"r":2}},{"block":2,"to":{"c":3,"r":0}},{"block":0,"to":{"c":3,"r":0}},{"block":1,"to":{"c":0,"r":0}},{"block":3,"to":{"c":3,"r":0}},{"block":4,"to":{"c":0,"r":0}},{"block":5,"to":{"c":3,"r":0}},{"block":6,"to":{"c":4,"r":0}},{"block":7,"to":{"c":3,"r":4}},{"block":9,"to":{"c":3,"r":4}},{"block":8,"to":{"c":3,"r":0}},{"block":10,"to":{"c":0,"r":0}}] },
    { minMoves: 14, path: [{"block":5,"to":{"c":4,"r":2}},{"block":4,"to":{"c":3,"r":0}},{"block":5,"to":{"c":2,"r":1}},{"block":10,"to":{"c":3,"r":0}},{"block":7,"to":{"c":4,"r":3}},{"block":9,"to":{"c":3,"r":3}},{"block":11,"to":{"c":2,"r":3}},{"block":2,"to":{"c":2,"r":4}},{"block":3,"to":{"c":1,"r":4}},{"block":6,"to":{"c":1,"r":4}},{"block":8,"to":{"c":4,"r":0}},{"block":0,"to":{"c":0,"r":3}},{"block":1,"to":{"c":0,"r":3}},{"block":5,"to":{"c":0,"r":3}}] },
    { minMoves: 14, path: [{"block":3,"to":{"c":1,"r":0}},{"block":5,"to":{"c":0,"r":2}},{"block":9,"to":{"c":0,"r":2}},{"block":8,"to":{"c":0,"r":0}},{"block":6,"to":{"c":1,"r":2}},{"block":7,"to":{"c":2,"r":2}},{"block":4,"to":{"c":3,"r":3}},{"block":2,"to":{"c":3,"r":4}},{"block":1,"to":{"c":4,"r":2}},{"block":0,"to":{"c":3,"r":2}},{"block":7,"to":{"c":2,"r":0}},{"block":8,"to":{"c":1,"r":0}},{"block":10,"to":{"c":0,"r":1}},{"block":6,"to":{"c":4,"r":2}}] },
  ],
  [
    { minMoves: 15, path: [{"block":3,"to":{"c":0,"r":0}},{"block":7,"to":{"c":0,"r":1}},{"block":5,"to":{"c":0,"r":2}},{"block":9,"to":{"c":0,"r":3}},{"block":1,"to":{"c":0,"r":3}},{"block":0,"to":{"c":2,"r":0}},{"block":8,"to":{"c":2,"r":0}},{"block":6,"to":{"c":4,"r":3}},{"block":7,"to":{"c":3,"r":3}},{"block":2,"to":{"c":3,"r":3}},{"block":4,"to":{"c":3,"r":0}},{"block":11,"to":{"c":0,"r":2}},{"block":1,"to":{"c":3,"r":3}},{"block":3,"to":{"c":3,"r":4}},{"block":10,"to":{"c":2,"r":4}}] },
    { minMoves: 15, path: [{"block":0,"to":{"c":1,"r":0}},{"block":1,"to":{"c":0,"r":0}},{"block":6,"to":{"c":1,"r":0}},{"block":7,"to":{"c":1,"r":1}},{"block":2,"to":{"c":2,"r":3}},{"block":7,"to":{"c":2,"r":0}},{"block":5,"to":{"c":3,"r":2}},{"block":1,"to":{"c":2,"r":3}},{"block":6,"to":{"c":0,"r":1}},{"block":7,"to":{"c":0,"r":1}},{"block":3,"to":{"c":1,"r":0}},{"block":5,"to":{"c":0,"r":2}},{"block":4,"to":{"c":2,"r":2}},{"block":5,"to":{"c":4,"r":0}},{"block":8,"to":{"c":1,"r":0}}] },
    { minMoves: 15, path: [{"block":2,"to":{"c":4,"r":0}},{"block":9,"to":{"c":4,"r":4}},{"block":8,"to":{"c":3,"r":3}},{"block":7,"to":{"c":2,"r":3}},{"block":5,"to":{"c":0,"r":3}},{"block":6,"to":{"c":0,"r":2}},{"block":3,"to":{"c":4,"r":3}},{"block":9,"to":{"c":4,"r":0}},{"block":4,"to":{"c":4,"r":4}},{"block":0,"to":{"c":4,"r":0}},{"block":1,"to":{"c":4,"r":4}},{"block":6,"to":{"c":1,"r":2}},{"block":8,"to":{"c":0,"r":3}},{"block":7,"to":{"c":3,"r":3}},{"block":6,"to":{"c":0,"r":3}}] },
  ],
  [
    { minMoves: 16, path: [{"block":7,"to":{"c":2,"r":4}},{"block":5,"to":{"c":4,"r":2}},{"block":2,"to":{"c":3,"r":1}},{"block":1,"to":{"c":2,"r":0}},{"block":0,"to":{"c":4,"r":0}},{"block":4,"to":{"c":0,"r":0}},{"block":0,"to":{"c":3,"r":3}},{"block":2,"to":{"c":2,"r":2}},{"block":4,"to":{"c":3,"r":0}},{"block":3,"to":{"c":2,"r":0}},{"block":6,"to":{"c":3,"r":0}},{"block":8,"to":{"c":2,"r":0}},{"block":2,"to":{"c":0,"r":3}},{"block":0,"to":{"c":1,"r":4}},{"block":5,"to":{"c":0,"r":3}},{"block":7,"to":{"c":0,"r":3}}] },
    { minMoves: 16, path: [{"block":2,"to":{"c":2,"r":0}},{"block":3,"to":{"c":4,"r":0}},{"block":4,"to":{"c":3,"r":2}},{"block":0,"to":{"c":1,"r":1}},{"block":5,"to":{"c":0,"r":0}},{"block":6,"to":{"c":0,"r":1}},{"block":9,"to":{"c":0,"r":1}},{"block":8,"to":{"c":2,"r":4}},{"block":0,"to":{"c":0,"r":3}},{"block":2,"to":{"c":0,"r":3}},{"block":4,"to":{"c":0,"r":1}},{"block":1,"to":{"c":4,"r":2}},{"block":3,"to":{"c":2,"r":0}},{"block":5,"to":{"c":4,"r":2}},{"block":7,"to":{"c":0,"r":3}},{"block":8,"to":{"c":1,"r":0}}] },
    { minMoves: 16, path: [{"block":6,"to":{"c":0,"r":3}},{"block":4,"to":{"c":0,"r":2}},{"block":5,"to":{"c":2,"r":2}},{"block":2,"to":{"c":4,"r":1}},{"block":1,"to":{"c":4,"r":0}},{"block":0,"to":{"c":2,"r":0}},{"block":3,"to":{"c":2,"r":1}},{"block":4,"to":{"c":0,"r":0}},{"block":5,"to":{"c":0,"r":2}},{"block":3,"to":{"c":3,"r":2}},{"block":9,"to":{"c":2,"r":2}},{"block":0,"to":{"c":1,"r":4}},{"block":4,"to":{"c":1,"r":3}},{"block":1,"to":{"c":1,"r":0}},{"block":7,"to":{"c":1,"r":0}},{"block":8,"to":{"c":0,"r":2}}] },
  ],
  [
    { minMoves: 16, path: [{"block":9,"to":{"c":4,"r":4}},{"block":8,"to":{"c":1,"r":4}},{"block":6,"to":{"c":0,"r":4}},{"block":7,"to":{"c":0,"r":3}},{"block":5,"to":{"c":4,"r":3}},{"block":4,"to":{"c":2,"r":2}},{"block":9,"to":{"c":4,"r":0}},{"block":2,"to":{"c":4,"r":3}},{"block":4,"to":{"c":3,"r":0}},{"block":7,"to":{"c":3,"r":3}},{"block":6,"to":{"c":3,"r":0}},{"block":8,"to":{"c":0,"r":3}},{"block":7,"to":{"c":3,"r":4}},{"block":1,"to":{"c":3,"r":3}},{"block":3,"to":{"c":3,"r":3}},{"block":0,"to":{"c":4,"r":3}}] },
    { minMoves: 16, path: [{"block":5,"to":{"c":3,"r":3}},{"block":4,"to":{"c":1,"r":2}},{"block":2,"to":{"c":0,"r":2}},{"block":3,"to":{"c":0,"r":1}},{"block":0,"to":{"c":0,"r":0}},{"block":4,"to":{"c":0,"r":0}},{"block":5,"to":{"c":0,"r":1}},{"block":1,"to":{"c":3,"r":1}},{"block":4,"to":{"c":2,"r":0}},{"block":7,"to":{"c":0,"r":0}},{"block":2,"to":{"c":4,"r":0}},{"block":1,"to":{"c":0,"r":0}},{"block":9,"to":{"c":0,"r":1}},{"block":2,"to":{"c":4,"r":4}},{"block":6,"to":{"c":4,"r":3}},{"block":8,"to":{"c":3,"r":3}}] },
    { minMoves: 16, path: [{"block":4,"to":{"c":3,"r":0}},{"block":7,"to":{"c":3,"r":2}},{"block":8,"to":{"c":3,"r":2}},{"block":9,"to":{"c":2,"r":4}},{"block":6,"to":{"c":1,"r":4}},{"block":3,"to":{"c":2,"r":3}},{"block":5,"to":{"c":1,"r":3}},{"block":2,"to":{"c":0,"r":3}},{"block":1,"to":{"c":1,"r":2}},{"block":4,"to":{"c":2,"r":0}},{"block":7,"to":{"c":3,"r":0}},{"block":8,"to":{"c":3,"r":1}},{"block":0,"to":{"c":4,"r":1}},{"block":5,"to":{"c":2,"r":0}},{"block":1,"to":{"c":2,"r":4}},{"block":6,"to":{"c":4,"r":1}}] },
  ],
  [
    { minMoves: 17, path: [{"block":9,"to":{"c":2,"r":4}},{"block":8,"to":{"c":1,"r":3}},{"block":9,"to":{"c":0,"r":4}},{"block":5,"to":{"c":4,"r":3}},{"block":7,"to":{"c":2,"r":3}},{"block":2,"to":{"c":4,"r":1}},{"block":1,"to":{"c":3,"r":0}},{"block":8,"to":{"c":3,"r":0}},{"block":6,"to":{"c":2,"r":1}},{"block":9,"to":{"c":0,"r":3}},{"block":7,"to":{"c":0,"r":2}},{"block":5,"to":{"c":2,"r":3}},{"block":2,"to":{"c":2,"r":3}},{"block":3,"to":{"c":0,"r":3}},{"block":0,"to":{"c":3,"r":0}},{"block":4,"to":{"c":4,"r":0}},{"block":6,"to":{"c":3,"r":0}}] },
    { minMoves: 17, path: [{"block":9,"to":{"c":2,"r":4}},{"block":6,"to":{"c":4,"r":2}},{"block":2,"to":{"c":4,"r":4}},{"block":5,"to":{"c":4,"r":1}},{"block":1,"to":{"c":3,"r":0}},{"block":7,"to":{"c":3,"r":2}},{"block":4,"to":{"c":2,"r":2}},{"block":3,"to":{"c":0,"r":3}},{"block":1,"to":{"c":0,"r":1}},{"block":0,"to":{"c":0,"r":2}},{"block":5,"to":{"c":0,"r":0}},{"block":0,"to":{"c":4,"r":1}},{"block":3,"to":{"c":4,"r":1}},{"block":7,"to":{"c":0,"r":1}},{"block":4,"to":{"c":4,"r":3}},{"block":8,"to":{"c":4,"r":1}},{"block":9,"to":{"c":0,"r":1}}] },
    { minMoves: 17, path: [{"block":10,"to":{"c":3,"r":3}},{"block":6,"to":{"c":4,"r":3}},{"block":5,"to":{"c":4,"r":0}},{"block":8,"to":{"c":2,"r":3}},{"block":4,"to":{"c":3,"r":2}},{"block":1,"to":{"c":2,"r":1}},{"block":6,"to":{"c":1,"r":0}},{"block":3,"to":{"c":2,"r":0}},{"block":7,"to":{"c":1,"r":0}},{"block":0,"to":{"c":0,"r":2}},{"block":8,"to":{"c":0,"r":0}},{"block":9,"to":{"c":4,"r":2}},{"block":11,"to":{"c":0,"r":2}},{"block":1,"to":{"c":2,"r":4}},{"block":2,"to":{"c":0,"r":3}},{"block":3,"to":{"c":2,"r":4}},{"block":5,"to":{"c":4,"r":3}}] },
  ],
  [
    { minMoves: 17, path: [{"block":7,"to":{"c":0,"r":3}},{"block":9,"to":{"c":0,"r":4}},{"block":5,"to":{"c":2,"r":3}},{"block":6,"to":{"c":3,"r":3}},{"block":3,"to":{"c":3,"r":2}},{"block":2,"to":{"c":2,"r":1}},{"block":9,"to":{"c":0,"r":2}},{"block":5,"to":{"c":1,"r":3}},{"block":6,"to":{"c":0,"r":4}},{"block":8,"to":{"c":0,"r":3}},{"block":4,"to":{"c":2,"r":3}},{"block":3,"to":{"c":4,"r":1}},{"block":9,"to":{"c":2,"r":4}},{"block":0,"to":{"c":0,"r":3}},{"block":2,"to":{"c":0,"r":0}},{"block":1,"to":{"c":2,"r":1}},{"block":9,"to":{"c":1,"r":0}}] },
    { minMoves: 17, path: [{"block":3,"to":{"c":3,"r":0}},{"block":9,"to":{"c":2,"r":4}},{"block":4,"to":{"c":0,"r":3}},{"block":5,"to":{"c":1,"r":3}},{"block":6,"to":{"c":3,"r":2}},{"block":7,"to":{"c":0,"r":2}},{"block":6,"to":{"c":0,"r":2}},{"block":5,"to":{"c":4,"r":2}},{"block":9,"to":{"c":3,"r":0}},{"block":6,"to":{"c":1,"r":3}},{"block":2,"to":{"c":3,"r":2}},{"block":1,"to":{"c":1,"r":1}},{"block":8,"to":{"c":2,"r":0}},{"block":0,"to":{"c":3,"r":4}},{"block":6,"to":{"c":3,"r":4}},{"block":4,"to":{"c":3,"r":3}},{"block":1,"to":{"c":0,"r":2}}] },
    { minMoves: 17, path: [{"block":1,"to":{"c":4,"r":0}},{"block":3,"to":{"c":3,"r":0}},{"block":9,"to":{"c":3,"r":2}},{"block":10,"to":{"c":3,"r":4}},{"block":8,"to":{"c":0,"r":4}},{"block":6,"to":{"c":0,"r":4}},{"block":7,"to":{"c":2,"r":4}},{"block":5,"to":{"c":0,"r":4}},{"block":9,"to":{"c":0,"r":3}},{"block":4,"to":{"c":0,"r":2}},{"block":7,"to":{"c":4,"r":1}},{"block":3,"to":{"c":3,"r":2}},{"block":2,"to":{"c":2,"r":1}},{"block":0,"to":{"c":0,"r":4}},{"block":1,"to":{"c":2,"r":0}},{"block":3,"to":{"c":2,"r":0}},{"block":10,"to":{"c":3,"r":1}}] },
  ],
  [
    { minMoves: 18, path: [{"block":0,"to":{"c":0,"r":0}},{"block":1,"to":{"c":1,"r":0}},{"block":2,"to":{"c":3,"r":0}},{"block":5,"to":{"c":4,"r":0}},{"block":9,"to":{"c":4,"r":1}},{"block":10,"to":{"c":4,"r":2}},{"block":8,"to":{"c":3,"r":3}},{"block":7,"to":{"c":4,"r":4}},{"block":4,"to":{"c":3,"r":3}},{"block":6,"to":{"c":2,"r":3}},{"block":3,"to":{"c":0,"r":4}},{"block":0,"to":{"c":0,"r":3}},{"block":1,"to":{"c":0,"r":2}},{"block":2,"to":{"c":2,"r":0}},{"block":5,"to":{"c":1,"r":4}},{"block":6,"to":{"c":2,"r":0}},{"block":9,"to":{"c":0,"r":4}},{"block":10,"to":{"c":2,"r":0}}] },
    { minMoves: 18, path: [{"block":11,"to":{"c":4,"r":4}},{"block":8,"to":{"c":3,"r":4}},{"block":7,"to":{"c":2,"r":3}},{"block":6,"to":{"c":1,"r":4}},{"block":3,"to":{"c":0,"r":2}},{"block":6,"to":{"c":1,"r":2}},{"block":10,"to":{"c":1,"r":1}},{"block":7,"to":{"c":0,"r":3}},{"block":8,"to":{"c":1,"r":4}},{"block":5,"to":{"c":0,"r":3}},{"block":1,"to":{"c":4,"r":2}},{"block":2,"to":{"c":1,"r":3}},{"block":0,"to":{"c":3,"r":2}},{"block":4,"to":{"c":4,"r":0}},{"block":6,"to":{"c":4,"r":0}},{"block":9,"to":{"c":1,"r":4}},{"block":10,"to":{"c":4,"r":2}},{"block":11,"to":{"c":4,"r":0}}] },
    { minMoves: 18, path: [{"block":10,"to":{"c":4,"r":4}},{"block":6,"to":{"c":3,"r":3}},{"block":4,"to":{"c":3,"r":2}},{"block":1,"to":{"c":3,"r":1}},{"block":0,"to":{"c":2,"r":0}},{"block":2,"to":{"c":2,"r":0}},{"block":1,"to":{"c":3,"r":0}},{"block":3,"to":{"c":0,"r":0}},{"block":4,"to":{"c":2,"r":0}},{"block":5,"to":{"c":0,"r":1}},{"block":7,"to":{"c":0,"r":2}},{"block":6,"to":{"c":0,"r":2}},{"block":1,"to":{"c":2,"r":3}},{"block":3,"to":{"c":3,"r":4}},{"block":8,"to":{"c":4,"r":0}},{"block":9,"to":{"c":4,"r":0}},{"block":10,"to":{"c":4,"r":0}},{"block":5,"to":{"c":2,"r":4}}] },
  ],
  [
    { minMoves: 4, path: [{"block":0,"to":{"c":5,"r":5}},{"block":1,"to":{"c":2,"r":0}},{"block":3,"to":{"c":4,"r":0}},{"block":1,"to":{"c":3,"r":4}}] },
    { minMoves: 4, path: [{"block":1,"to":{"c":4,"r":5}},{"block":0,"to":{"c":0,"r":5}},{"block":2,"to":{"c":3,"r":5}},{"block":4,"to":{"c":3,"r":0}}] },
    { minMoves: 4, path: [{"block":0,"to":{"c":0,"r":0}},{"block":2,"to":{"c":4,"r":3}},{"block":1,"to":{"c":3,"r":5}},{"block":4,"to":{"c":0,"r":0}}] },
  ],
  [
    { minMoves: 5, path: [{"block":2,"to":{"c":0,"r":3}},{"block":3,"to":{"c":3,"r":2}},{"block":4,"to":{"c":2,"r":5}},{"block":0,"to":{"c":5,"r":0}},{"block":3,"to":{"c":4,"r":0}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":0,"r":1}},{"block":1,"to":{"c":2,"r":4}},{"block":3,"to":{"c":2,"r":4}},{"block":4,"to":{"c":4,"r":0}},{"block":5,"to":{"c":2,"r":5}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":1,"r":4}},{"block":1,"to":{"c":3,"r":4}},{"block":2,"to":{"c":5,"r":1}},{"block":4,"to":{"c":2,"r":5}},{"block":5,"to":{"c":1,"r":0}}] },
  ],
  [
    { minMoves: 5, path: [{"block":1,"to":{"c":1,"r":0}},{"block":3,"to":{"c":4,"r":1}},{"block":0,"to":{"c":5,"r":2}},{"block":4,"to":{"c":4,"r":0}},{"block":0,"to":{"c":0,"r":5}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":1,"r":5}},{"block":1,"to":{"c":3,"r":0}},{"block":2,"to":{"c":3,"r":0}},{"block":3,"to":{"c":3,"r":0}},{"block":4,"to":{"c":4,"r":3}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":4,"r":5}},{"block":2,"to":{"c":0,"r":0}},{"block":3,"to":{"c":0,"r":0}},{"block":4,"to":{"c":4,"r":0}},{"block":5,"to":{"c":3,"r":0}}] },
  ],
  [
    { minMoves: 5, path: [{"block":1,"to":{"c":3,"r":4}},{"block":4,"to":{"c":0,"r":0}},{"block":0,"to":{"c":4,"r":3}},{"block":2,"to":{"c":2,"r":0}},{"block":4,"to":{"c":2,"r":0}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":2,"r":5}},{"block":1,"to":{"c":2,"r":0}},{"block":2,"to":{"c":2,"r":0}},{"block":3,"to":{"c":3,"r":1}},{"block":5,"to":{"c":2,"r":5}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":0,"r":0}},{"block":3,"to":{"c":1,"r":0}},{"block":1,"to":{"c":0,"r":2}},{"block":5,"to":{"c":0,"r":3}},{"block":4,"to":{"c":4,"r":3}}] },
  ],
  [
    { minMoves: 5, path: [{"block":2,"to":{"c":3,"r":4}},{"block":3,"to":{"c":3,"r":0}},{"block":1,"to":{"c":3,"r":0}},{"block":4,"to":{"c":4,"r":1}},{"block":1,"to":{"c":3,"r":4}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":0,"r":0}},{"block":1,"to":{"c":1,"r":0}},{"block":2,"to":{"c":2,"r":0}},{"block":3,"to":{"c":4,"r":4}},{"block":4,"to":{"c":0,"r":0}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":5,"r":3}},{"block":1,"to":{"c":0,"r":3}},{"block":2,"to":{"c":0,"r":3}},{"block":3,"to":{"c":2,"r":0}},{"block":4,"to":{"c":5,"r":4}}] },
  ],
  [
    { minMoves: 5, path: [{"block":0,"to":{"c":3,"r":0}},{"block":1,"to":{"c":3,"r":1}},{"block":0,"to":{"c":0,"r":3}},{"block":3,"to":{"c":1,"r":0}},{"block":2,"to":{"c":5,"r":1}}] },
    { minMoves: 5, path: [{"block":0,"to":{"c":2,"r":4}},{"block":5,"to":{"c":5,"r":5}},{"block":3,"to":{"c":3,"r":4}},{"block":4,"to":{"c":4,"r":4}},{"block":2,"to":{"c":0,"r":4}}] },
    { minMoves: 5, path: [{"block":2,"to":{"c":5,"r":4}},{"block":4,"to":{"c":4,"r":0}},{"block":0,"to":{"c":4,"r":4}},{"block":5,"to":{"c":4,"r":0}},{"block":1,"to":{"c":0,"r":4}}] },
  ],
  [
    { minMoves: 6, path: [{"block":3,"to":{"c":1,"r":4}},{"block":0,"to":{"c":2,"r":0}},{"block":2,"to":{"c":5,"r":0}},{"block":1,"to":{"c":1,"r":5}},{"block":4,"to":{"c":0,"r":2}},{"block":0,"to":{"c":0,"r":2}}] },
    { minMoves: 6, path: [{"block":2,"to":{"c":5,"r":0}},{"block":3,"to":{"c":3,"r":5}},{"block":4,"to":{"c":5,"r":0}},{"block":0,"to":{"c":1,"r":0}},{"block":1,"to":{"c":0,"r":0}},{"block":0,"to":{"c":3,"r":5}}] },
    { minMoves: 6, path: [{"block":2,"to":{"c":0,"r":0}},{"block":1,"to":{"c":4,"r":5}},{"block":3,"to":{"c":0,"r":0}},{"block":4,"to":{"c":0,"r":0}},{"block":5,"to":{"c":5,"r":5}},{"block":6,"to":{"c":3,"r":5}}] },
  ],
  [
    { minMoves: 6, path: [{"block":5,"to":{"c":5,"r":3}},{"block":4,"to":{"c":5,"r":1}},{"block":3,"to":{"c":2,"r":0}},{"block":0,"to":{"c":0,"r":1}},{"block":4,"to":{"c":0,"r":1}},{"block":2,"to":{"c":0,"r":1}}] },
    { minMoves: 6, path: [{"block":0,"to":{"c":3,"r":0}},{"block":1,"to":{"c":0,"r":2}},{"block":2,"to":{"c":2,"r":0}},{"block":3,"to":{"c":4,"r":0}},{"block":4,"to":{"c":0,"r":2}},{"block":5,"to":{"c":5,"r":3}}] },
    { minMoves: 6, path: [{"block":0,"to":{"c":0,"r":4}},{"block":1,"to":{"c":1,"r":0}},{"block":2,"to":{"c":2,"r":0}},{"block":3,"to":{"c":0,"r":3}},{"block":4,"to":{"c":1,"r":0}},{"block":6,"to":{"c":5,"r":5}}] },
  ],
  [
    { minMoves: 6, path: [{"block":0,"to":{"c":3,"r":5}},{"block":2,"to":{"c":3,"r":5}},{"block":4,"to":{"c":0,"r":2}},{"block":5,"to":{"c":0,"r":5}},{"block":4,"to":{"c":5,"r":1}},{"block":1,"to":{"c":0,"r":4}}] },
    { minMoves: 6, path: [{"block":0,"to":{"c":0,"r":2}},{"block":1,"to":{"c":4,"r":2}},{"block":3,"to":{"c":3,"r":0}},{"block":4,"to":{"c":5,"r":0}},{"block":5,"to":{"c":4,"r":2}},{"block":6,"to":{"c":4,"r":3}}] },
    { minMoves: 6, path: [{"block":2,"to":{"c":4,"r":0}},{"block":0,"to":{"c":3,"r":0}},{"block":3,"to":{"c":5,"r":0}},{"block":4,"to":{"c":4,"r":3}},{"block":5,"to":{"c":4,"r":5}},{"block":6,"to":{"c":4,"r":3}}] },
  ],
  [
    { minMoves: 6, path: [{"block":4,"to":{"c":5,"r":2}},{"block":0,"to":{"c":0,"r":0}},{"block":3,"to":{"c":4,"r":0}},{"block":2,"to":{"c":0,"r":3}},{"block":1,"to":{"c":5,"r":0}},{"block":0,"to":{"c":0,"r":2}}] },
    { minMoves: 6, path: [{"block":1,"to":{"c":3,"r":3}},{"block":2,"to":{"c":3,"r":0}},{"block":3,"to":{"c":5,"r":5}},{"block":4,"to":{"c":4,"r":0}},{"block":5,"to":{"c":2,"r":5}},{"block":6,"to":{"c":4,"r":5}}] },
    { minMoves: 6, path: [{"block":0,"to":{"c":3,"r":0}},{"block":1,"to":{"c":1,"r":0}},{"block":2,"to":{"c":0,"r":2}},{"block":4,"to":{"c":0,"r":2}},{"block":5,"to":{"c":1,"r":0}},{"block":3,"to":{"c":1,"r":4}}] },
  ],
  [
    { minMoves: 7, path: [{"block":2,"to":{"c":2,"r":0}},{"block":3,"to":{"c":1,"r":4}},{"block":5,"to":{"c":2,"r":0}},{"block":0,"to":{"c":1,"r":0}},{"block":1,"to":{"c":1,"r":5}},{"block":0,"to":{"c":3,"r":1}},{"block":6,"to":{"c":2,"r":0}}] },
    { minMoves: 7, path: [{"block":0,"to":{"c":0,"r":3}},{"block":1,"to":{"c":1,"r":0}},{"block":3,"to":{"c":5,"r":3}},{"block":4,"to":{"c":4,"r":3}},{"block":5,"to":{"c":0,"r":3}},{"block":2,"to":{"c":0,"r":3}},{"block":6,"to":{"c":4,"r":3}}] },
    { minMoves: 7, path: [{"block":2,"to":{"c":1,"r":0}},{"block":6,"to":{"c":4,"r":4}},{"block":3,"to":{"c":4,"r":4}},{"block":0,"to":{"c":0,"r":1}},{"block":7,"to":{"c":1,"r":0}},{"block":1,"to":{"c":3,"r":5}},{"block":5,"to":{"c":1,"r":0}}] },
  ],
  [
    { minMoves: 7, path: [{"block":0,"to":{"c":3,"r":0}},{"block":1,"to":{"c":2,"r":0}},{"block":2,"to":{"c":2,"r":0}},{"block":3,"to":{"c":2,"r":0}},{"block":0,"to":{"c":4,"r":3}},{"block":5,"to":{"c":5,"r":3}},{"block":6,"to":{"c":0,"r":2}}] },
    { minMoves: 7, path: [{"block":5,"to":{"c":1,"r":4}},{"block":0,"to":{"c":0,"r":5}},{"block":2,"to":{"c":2,"r":5}},{"block":1,"to":{"c":4,"r":2}},{"block":3,"to":{"c":0,"r":5}},{"block":4,"to":{"c":0,"r":5}},{"block":6,"to":{"c":1,"r":5}}] },
    { minMoves: 7, path: [{"block":0,"to":{"c":5,"r":0}},{"block":2,"to":{"c":5,"r":1}},{"block":1,"to":{"c":0,"r":4}},{"block":4,"to":{"c":5,"r":0}},{"block":3,"to":{"c":5,"r":0}},{"block":6,"to":{"c":5,"r":0}},{"block":7,"to":{"c":4,"r":0}}] },
  ],
  [
    { minMoves: 7, path: [{"block":6,"to":{"c":0,"r":5}},{"block":2,"to":{"c":0,"r":5}},{"block":1,"to":{"c":4,"r":2}},{"block":0,"to":{"c":5,"r":2}},{"block":3,"to":{"c":2,"r":1}},{"block":4,"to":{"c":0,"r":4}},{"block":3,"to":{"c":3,"r":0}}] },
    { minMoves: 7, path: [{"block":0,"to":{"c":0,"r":0}},{"block":1,"to":{"c":2,"r":5}},{"block":2,"to":{"c":4,"r":1}},{"block":3,"to":{"c":0,"r":0}},{"block":5,"to":{"c":2,"r":5}},{"block":6,"to":{"c":2,"r":4}},{"block":7,"to":{"c":5,"r":2}}] },
    { minMoves: 7, path: [{"block":2,"to":{"c":0,"r":0}},{"block":4,"to":{"c":0,"r":1}},{"block":6,"to":{"c":0,"r":0}},{"block":7,"to":{"c":0,"r":1}},{"block":0,"to":{"c":3,"r":5}},{"block":1,"to":{"c":3,"r":5}},{"block":5,"to":{"c":3,"r":4}}] },
  ],
  [
    { minMoves: 8, path: [{"block":5,"to":{"c":1,"r":3}},{"block":7,"to":{"c":5,"r":4}},{"block":6,"to":{"c":3,"r":4}},{"block":0,"to":{"c":3,"r":4}},{"block":1,"to":{"c":4,"r":3}},{"block":2,"to":{"c":3,"r":0}},{"block":3,"to":{"c":3,"r":0}},{"block":5,"to":{"c":3,"r":4}}] },
    { minMoves: 8, path: [{"block":0,"to":{"c":0,"r":2}},{"block":3,"to":{"c":2,"r":0}},{"block":1,"to":{"c":4,"r":1}},{"block":2,"to":{"c":4,"r":1}},{"block":4,"to":{"c":0,"r":2}},{"block":6,"to":{"c":5,"r":1}},{"block":7,"to":{"c":2,"r":0}},{"block":8,"to":{"c":3,"r":0}}] },
    { minMoves: 8, path: [{"block":0,"to":{"c":1,"r":0}},{"block":1,"to":{"c":0,"r":4}},{"block":2,"to":{"c":2,"r":0}},{"block":3,"to":{"c":2,"r":0}},{"block":5,"to":{"c":0,"r":4}},{"block":6,"to":{"c":4,"r":1}},{"block":7,"to":{"c":4,"r":2}},{"block":8,"to":{"c":0,"r":4}}] },
  ],
  [
    { minMoves: 8, path: [{"block":7,"to":{"c":5,"r":3}},{"block":2,"to":{"c":3,"r":5}},{"block":0,"to":{"c":3,"r":4}},{"block":1,"to":{"c":3,"r":5}},{"block":3,"to":{"c":0,"r":1}},{"block":5,"to":{"c":4,"r":0}},{"block":6,"to":{"c":4,"r":0}},{"block":7,"to":{"c":4,"r":0}}] },
    { minMoves: 8, path: [{"block":0,"to":{"c":1,"r":0}},{"block":5,"to":{"c":1,"r":0}},{"block":2,"to":{"c":1,"r":0}},{"block":7,"to":{"c":0,"r":0}},{"block":3,"to":{"c":4,"r":4}},{"block":1,"to":{"c":3,"r":0}},{"block":6,"to":{"c":0,"r":0}},{"block":1,"to":{"c":3,"r":4}}] },
    { minMoves: 8, path: [{"block":0,"to":{"c":0,"r":0}},{"block":2,"to":{"c":2,"r":4}},{"block":3,"to":{"c":0,"r":1}},{"block":5,"to":{"c":0,"r":1}},{"block":6,"to":{"c":5,"r":3}},{"block":7,"to":{"c":1,"r":5}},{"block":4,"to":{"c":4,"r":3}},{"block":8,"to":{"c":2,"r":5}}] },
  ],
  [
    { minMoves: 8, path: [{"block":2,"to":{"c":0,"r":1}},{"block":1,"to":{"c":5,"r":1}},{"block":4,"to":{"c":0,"r":0}},{"block":0,"to":{"c":3,"r":5}},{"block":7,"to":{"c":4,"r":4}},{"block":1,"to":{"c":5,"r":4}},{"block":3,"to":{"c":2,"r":5}},{"block":6,"to":{"c":5,"r":4}}] },
    { minMoves: 8, path: [{"block":0,"to":{"c":0,"r":1}},{"block":5,"to":{"c":3,"r":4}},{"block":3,"to":{"c":5,"r":5}},{"block":6,"to":{"c":4,"r":4}},{"block":1,"to":{"c":3,"r":4}},{"block":8,"to":{"c":0,"r":1}},{"block":2,"to":{"c":2,"r":4}},{"block":4,"to":{"c":2,"r":5}}] },
    { minMoves: 8, path: [{"block":4,"to":{"c":0,"r":2}},{"block":1,"to":{"c":4,"r":5}},{"block":2,"to":{"c":4,"r":4}},{"block":3,"to":{"c":4,"r":5}},{"block":5,"to":{"c":5,"r":4}},{"block":6,"to":{"c":0,"r":1}},{"block":0,"to":{"c":5,"r":2}},{"block":8,"to":{"c":0,"r":3}}] },
  ],
  [
    { minMoves: 8, path: [{"block":3,"to":{"c":2,"r":0}},{"block":5,"to":{"c":2,"r":0}},{"block":6,"to":{"c":1,"r":5}},{"block":1,"to":{"c":0,"r":3}},{"block":2,"to":{"c":2,"r":0}},{"block":0,"to":{"c":4,"r":1}},{"block":4,"to":{"c":4,"r":1}},{"block":6,"to":{"c":4,"r":1}}] },
    { minMoves: 8, path: [{"block":2,"to":{"c":3,"r":0}},{"block":7,"to":{"c":5,"r":2}},{"block":0,"to":{"c":2,"r":4}},{"block":1,"to":{"c":2,"r":4}},{"block":2,"to":{"c":0,"r":1}},{"block":3,"to":{"c":2,"r":5}},{"block":4,"to":{"c":0,"r":2}},{"block":6,"to":{"c":0,"r":1}}] },
    { minMoves: 8, path: [{"block":5,"to":{"c":4,"r":0}},{"block":7,"to":{"c":4,"r":0}},{"block":1,"to":{"c":3,"r":5}},{"block":4,"to":{"c":0,"r":0}},{"block":2,"to":{"c":3,"r":5}},{"block":0,"to":{"c":3,"r":4}},{"block":6,"to":{"c":0,"r":0}},{"block":8,"to":{"c":0,"r":0}}] },
  ],
  [
    { minMoves: 9, path: [{"block":4,"to":{"c":4,"r":3}},{"block":0,"to":{"c":2,"r":0}},{"block":2,"to":{"c":3,"r":0}},{"block":0,"to":{"c":5,"r":3}},{"block":3,"to":{"c":3,"r":0}},{"block":1,"to":{"c":0,"r":2}},{"block":5,"to":{"c":3,"r":0}},{"block":6,"to":{"c":0,"r":2}},{"block":8,"to":{"c":0,"r":2}}] },
    { minMoves: 9, path: [{"block":0,"to":{"c":0,"r":2}},{"block":5,"to":{"c":2,"r":0}},{"block":6,"to":{"c":2,"r":0}},{"block":7,"to":{"c":0,"r":2}},{"block":2,"to":{"c":5,"r":5}},{"block":1,"to":{"c":0,"r":2}},{"block":4,"to":{"c":5,"r":5}},{"block":8,"to":{"c":5,"r":5}},{"block":9,"to":{"c":2,"r":0}}] },
    { minMoves: 9, path: [{"block":0,"to":{"c":1,"r":0}},{"block":2,"to":{"c":1,"r":0}},{"block":3,"to":{"c":4,"r":0}},{"block":7,"to":{"c":5,"r":0}},{"block":8,"to":{"c":1,"r":3}},{"block":5,"to":{"c":1,"r":0}},{"block":1,"to":{"c":5,"r":4}},{"block":6,"to":{"c":5,"r":5}},{"block":8,"to":{"c":5,"r":5}}] },
  ],
  [
    { minMoves: 9, path: [{"block":4,"to":{"c":5,"r":3}},{"block":7,"to":{"c":4,"r":4}},{"block":3,"to":{"c":1,"r":2}},{"block":0,"to":{"c":0,"r":2}},{"block":6,"to":{"c":0,"r":2}},{"block":3,"to":{"c":3,"r":0}},{"block":1,"to":{"c":0,"r":2}},{"block":5,"to":{"c":3,"r":0}},{"block":8,"to":{"c":3,"r":0}}] },
    { minMoves: 9, path: [{"block":6,"to":{"c":1,"r":0}},{"block":7,"to":{"c":0,"r":4}},{"block":9,"to":{"c":0,"r":4}},{"block":0,"to":{"c":5,"r":5}},{"block":1,"to":{"c":5,"r":5}},{"block":3,"to":{"c":2,"r":0}},{"block":4,"to":{"c":5,"r":5}},{"block":2,"to":{"c":0,"r":3}},{"block":8,"to":{"c":2,"r":0}}] },
    { minMoves: 9, path: [{"block":0,"to":{"c":5,"r":1}},{"block":1,"to":{"c":0,"r":0}},{"block":2,"to":{"c":5,"r":1}},{"block":3,"to":{"c":4,"r":0}},{"block":4,"to":{"c":3,"r":0}},{"block":5,"to":{"c":5,"r":1}},{"block":7,"to":{"c":4,"r":0}},{"block":8,"to":{"c":0,"r":0}},{"block":9,"to":{"c":0,"r":1}}] },
  ],
  [
    { minMoves: 9, path: [{"block":7,"to":{"c":0,"r":5}},{"block":0,"to":{"c":0,"r":3}},{"block":3,"to":{"c":2,"r":0}},{"block":4,"to":{"c":0,"r":4}},{"block":5,"to":{"c":1,"r":5}},{"block":2,"to":{"c":0,"r":4}},{"block":3,"to":{"c":4,"r":0}},{"block":6,"to":{"c":4,"r":0}},{"block":8,"to":{"c":4,"r":0}}] },
    { minMoves: 9, path: [{"block":5,"to":{"c":0,"r":3}},{"block":7,"to":{"c":0,"r":3}},{"block":6,"to":{"c":4,"r":4}},{"block":8,"to":{"c":4,"r":5}},{"block":3,"to":{"c":4,"r":5}},{"block":4,"to":{"c":4,"r":5}},{"block":0,"to":{"c":0,"r":3}},{"block":2,"to":{"c":1,"r":0}},{"block":6,"to":{"c":1,"r":0}}] },
    { minMoves: 9, path: [{"block":0,"to":{"c":0,"r":0}},{"block":1,"to":{"c":0,"r":2}},{"block":7,"to":{"c":0,"r":0}},{"block":4,"to":{"c":2,"r":1}},{"block":5,"to":{"c":0,"r":0}},{"block":8,"to":{"c":0,"r":2}},{"block":3,"to":{"c":1,"r":4}},{"block":4,"to":{"c":1,"r":5}},{"block":6,"to":{"c":1,"r":4}}] },
  ],
  [
    { minMoves: 10, path: [{"block":0,"to":{"c":0,"r":3}},{"block":3,"to":{"c":5,"r":3}},{"block":5,"to":{"c":5,"r":3}},{"block":9,"to":{"c":0,"r":3}},{"block":1,"to":{"c":2,"r":4}},{"block":2,"to":{"c":2,"r":4}},{"block":8,"to":{"c":3,"r":4}},{"block":6,"to":{"c":3,"r":3}},{"block":7,"to":{"c":4,"r":3}},{"block":6,"to":{"c":0,"r":3}}] },
    { minMoves: 10, path: [{"block":0,"to":{"c":4,"r":0}},{"block":6,"to":{"c":0,"r":2}},{"block":8,"to":{"c":0,"r":3}},{"block":2,"to":{"c":2,"r":0}},{"block":5,"to":{"c":4,"r":0}},{"block":3,"to":{"c":4,"r":3}},{"block":2,"to":{"c":4,"r":1}},{"block":1,"to":{"c":4,"r":1}},{"block":3,"to":{"c":0,"r":1}},{"block":4,"to":{"c":4,"r":1}}] },
    { minMoves: 10, path: [{"block":8,"to":{"c":4,"r":5}},{"block":9,"to":{"c":3,"r":5}},{"block":3,"to":{"c":4,"r":4}},{"block":1,"to":{"c":4,"r":5}},{"block":2,"to":{"c":1,"r":0}},{"block":4,"to":{"c":1,"r":0}},{"block":5,"to":{"c":0,"r":1}},{"block":6,"to":{"c":0,"r":1}},{"block":7,"to":{"c":0,"r":2}},{"block":9,"to":{"c":1,"r":0}}] },
  ],
  [
    { minMoves: 10, path: [{"block":0,"to":{"c":0,"r":0}},{"block":3,"to":{"c":0,"r":0}},{"block":8,"to":{"c":0,"r":0}},{"block":7,"to":{"c":4,"r":2}},{"block":2,"to":{"c":5,"r":4}},{"block":5,"to":{"c":5,"r":4}},{"block":1,"to":{"c":4,"r":4}},{"block":4,"to":{"c":3,"r":0}},{"block":7,"to":{"c":3,"r":0}},{"block":9,"to":{"c":3,"r":0}}] },
    { minMoves: 10, path: [{"block":4,"to":{"c":2,"r":1}},{"block":1,"to":{"c":0,"r":3}},{"block":2,"to":{"c":1,"r":0}},{"block":0,"to":{"c":5,"r":2}},{"block":5,"to":{"c":0,"r":3}},{"block":6,"to":{"c":0,"r":3}},{"block":8,"to":{"c":1,"r":0}},{"block":7,"to":{"c":4,"r":3}},{"block":4,"to":{"c":4,"r":3}},{"block":9,"to":{"c":1,"r":0}}] },
    { minMoves: 10, path: [{"block":1,"to":{"c":2,"r":0}},{"block":0,"to":{"c":5,"r":4}},{"block":4,"to":{"c":4,"r":4}},{"block":6,"to":{"c":2,"r":0}},{"block":5,"to":{"c":2,"r":0}},{"block":8,"to":{"c":4,"r":4}},{"block":2,"to":{"c":3,"r":4}},{"block":7,"to":{"c":3,"r":5}},{"block":9,"to":{"c":3,"r":5}},{"block":8,"to":{"c":5,"r":4}}] },
  ],
  [
    { minMoves: 10, path: [{"block":8,"to":{"c":4,"r":5}},{"block":3,"to":{"c":4,"r":4}},{"block":4,"to":{"c":0,"r":1}},{"block":1,"to":{"c":0,"r":1}},{"block":9,"to":{"c":4,"r":5}},{"block":5,"to":{"c":0,"r":0}},{"block":0,"to":{"c":0,"r":2}},{"block":2,"to":{"c":3,"r":0}},{"block":5,"to":{"c":3,"r":0}},{"block":7,"to":{"c":3,"r":0}}] },
    { minMoves: 10, path: [{"block":8,"to":{"c":3,"r":4}},{"block":1,"to":{"c":5,"r":5}},{"block":6,"to":{"c":5,"r":5}},{"block":5,"to":{"c":5,"r":4}},{"block":2,"to":{"c":0,"r":3}},{"block":3,"to":{"c":5,"r":5}},{"block":4,"to":{"c":0,"r":3}},{"block":7,"to":{"c":5,"r":4}},{"block":8,"to":{"c":0,"r":3}},{"block":9,"to":{"c":4,"r":5}}] },
    { minMoves: 10, path: [{"block":5,"to":{"c":1,"r":5}},{"block":0,"to":{"c":2,"r":0}},{"block":2,"to":{"c":1,"r":0}},{"block":0,"to":{"c":0,"r":2}},{"block":3,"to":{"c":2,"r":0}},{"block":1,"to":{"c":3,"r":0}},{"block":0,"to":{"c":3,"r":1}},{"block":4,"to":{"c":2,"r":4}},{"block":6,"to":{"c":5,"r":1}},{"block":8,"to":{"c":4,"r":1}}] },
  ],
  [
    { minMoves: 10, path: [{"block":3,"to":{"c":4,"r":0}},{"block":5,"to":{"c":3,"r":4}},{"block":7,"to":{"c":4,"r":0}},{"block":1,"to":{"c":0,"r":3}},{"block":2,"to":{"c":0,"r":3}},{"block":4,"to":{"c":3,"r":2}},{"block":6,"to":{"c":0,"r":3}},{"block":8,"to":{"c":4,"r":0}},{"block":0,"to":{"c":1,"r":5}},{"block":4,"to":{"c":1,"r":4}}] },
    { minMoves: 10, path: [{"block":3,"to":{"c":3,"r":2}},{"block":1,"to":{"c":0,"r":3}},{"block":7,"to":{"c":0,"r":3}},{"block":0,"to":{"c":2,"r":0}},{"block":4,"to":{"c":3,"r":0}},{"block":6,"to":{"c":3,"r":0}},{"block":0,"to":{"c":1,"r":4}},{"block":5,"to":{"c":3,"r":0}},{"block":2,"to":{"c":0,"r":4}},{"block":3,"to":{"c":0,"r":4}}] },
    { minMoves: 10, path: [{"block":8,"to":{"c":0,"r":4}},{"block":6,"to":{"c":3,"r":5}},{"block":4,"to":{"c":5,"r":4}},{"block":0,"to":{"c":0,"r":4}},{"block":1,"to":{"c":3,"r":5}},{"block":4,"to":{"c":5,"r":0}},{"block":7,"to":{"c":5,"r":0}},{"block":3,"to":{"c":3,"r":4}},{"block":9,"to":{"c":4,"r":0}},{"block":5,"to":{"c":0,"r":4}}] },
  ],
  [
    { minMoves: 11, path: [{"block":1,"to":{"c":4,"r":1}},{"block":0,"to":{"c":1,"r":0}},{"block":3,"to":{"c":0,"r":1}},{"block":5,"to":{"c":0,"r":2}},{"block":6,"to":{"c":1,"r":4}},{"block":4,"to":{"c":1,"r":4}},{"block":0,"to":{"c":1,"r":4}},{"block":5,"to":{"c":2,"r":0}},{"block":1,"to":{"c":0,"r":1}},{"block":7,"to":{"c":2,"r":0}},{"block":8,"to":{"c":2,"r":0}}] },
    { minMoves: 11, path: [{"block":8,"to":{"c":4,"r":4}},{"block":0,"to":{"c":4,"r":2}},{"block":1,"to":{"c":2,"r":3}},{"block":3,"to":{"c":4,"r":0}},{"block":0,"to":{"c":4,"r":0}},{"block":7,"to":{"c":4,"r":0}},{"block":6,"to":{"c":5,"r":0}},{"block":5,"to":{"c":5,"r":3}},{"block":4,"to":{"c":4,"r":3}},{"block":1,"to":{"c":0,"r":2}},{"block":6,"to":{"c":0,"r":2}}] },
  ],
  [
    { minMoves: 11, path: [{"block":2,"to":{"c":5,"r":3}},{"block":6,"to":{"c":3,"r":5}},{"block":5,"to":{"c":4,"r":4}},{"block":3,"to":{"c":4,"r":0}},{"block":4,"to":{"c":4,"r":3}},{"block":1,"to":{"c":0,"r":1}},{"block":5,"to":{"c":0,"r":1}},{"block":7,"to":{"c":4,"r":3}},{"block":8,"to":{"c":0,"r":1}},{"block":0,"to":{"c":2,"r":5}},{"block":3,"to":{"c":2,"r":4}}] },
  ],
  [
    { minMoves: 11, path: [{"block":4,"to":{"c":5,"r":4}},{"block":2,"to":{"c":4,"r":2}},{"block":9,"to":{"c":5,"r":2}},{"block":5,"to":{"c":0,"r":3}},{"block":7,"to":{"c":1,"r":1}},{"block":5,"to":{"c":2,"r":5}},{"block":6,"to":{"c":4,"r":2}},{"block":3,"to":{"c":0,"r":3}},{"block":4,"to":{"c":0,"r":4}},{"block":7,"to":{"c":1,"r":5}},{"block":0,"to":{"c":0,"r":3}}] },
  ],
  [
    { minMoves: 11, path: [{"block":3,"to":{"c":0,"r":2}},{"block":5,"to":{"c":0,"r":5}},{"block":0,"to":{"c":0,"r":2}},{"block":6,"to":{"c":2,"r":4}},{"block":7,"to":{"c":0,"r":2}},{"block":1,"to":{"c":5,"r":4}},{"block":6,"to":{"c":5,"r":4}},{"block":8,"to":{"c":1,"r":2}},{"block":2,"to":{"c":3,"r":4}},{"block":5,"to":{"c":4,"r":0}},{"block":8,"to":{"c":4,"r":0}}] },
  ],
  [
    { minMoves: 12, path: [{"block":9,"to":{"c":1,"r":1}},{"block":10,"to":{"c":1,"r":5}},{"block":6,"to":{"c":1,"r":3}},{"block":3,"to":{"c":3,"r":2}},{"block":5,"to":{"c":2,"r":5}},{"block":7,"to":{"c":5,"r":0}},{"block":2,"to":{"c":5,"r":2}},{"block":1,"to":{"c":4,"r":2}},{"block":6,"to":{"c":4,"r":0}},{"block":3,"to":{"c":2,"r":4}},{"block":9,"to":{"c":5,"r":2}},{"block":0,"to":{"c":3,"r":0}}] },
    { minMoves: 12, path: [{"block":8,"to":{"c":0,"r":4}},{"block":6,"to":{"c":2,"r":5}},{"block":5,"to":{"c":2,"r":5}},{"block":1,"to":{"c":3,"r":4}},{"block":2,"to":{"c":1,"r":3}},{"block":4,"to":{"c":4,"r":0}},{"block":3,"to":{"c":4,"r":0}},{"block":7,"to":{"c":2,"r":3}},{"block":1,"to":{"c":5,"r":3}},{"block":2,"to":{"c":5,"r":3}},{"block":8,"to":{"c":4,"r":3}},{"block":9,"to":{"c":4,"r":0}}] },
  ],
  [
    { minMoves: 12, path: [{"block":0,"to":{"c":1,"r":0}},{"block":3,"to":{"c":4,"r":0}},{"block":2,"to":{"c":5,"r":1}},{"block":4,"to":{"c":4,"r":0}},{"block":7,"to":{"c":3,"r":0}},{"block":0,"to":{"c":2,"r":5}},{"block":6,"to":{"c":3,"r":0}},{"block":4,"to":{"c":0,"r":3}},{"block":2,"to":{"c":0,"r":3}},{"block":5,"to":{"c":0,"r":4}},{"block":8,"to":{"c":2,"r":3}},{"block":10,"to":{"c":2,"r":5}}] },
  ],
];
