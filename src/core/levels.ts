import type { Level } from './types';
import { parseLevel } from './level-format';

// 自動生成（generate.ts / seed固定）の難易度ランプ。易→難で並ぶ。
// 全レベルはソルバーで解けることを検証済み（solver.test / validate.test で担保）。

export const LEVELS: Level[] = [
  // Level 1 — minMoves=4, blocks=4, extra=0, board=6x6
  parseLevel(`
grid:
..bbb.
r...b.
..o...
......
......
.....p
gates:
right 3-5 red
top 1-3 orange
left 2 purple
bottom 3-5 blue
`),
  // Level 2 — minMoves=6, blocks=6, extra=0, board=6x6
  parseLevel(`
grid:
g.p...
......
..gg.b
.y..bb
.y.g..
......
gates:
top 3-5 purple
left 2-4 blue
bottom 0-1 yellow
right 4 green
`),
  // Level 3 — minMoves=7, blocks=7, extra=0, board=6x6
  parseLevel(`
grid:
o.....
.....b
.p.p..
.ypp..
...o.o
......
gates:
top 2-4 purple
left 0 blue
bottom 3-4 orange
right 1 yellow
`),
  // Level 4 — minMoves=7, blocks=6, extra=1, board=5x5
  parseLevel(`
grid:
.....
bB..p
bb..p
...gg
rr.gp
gates:
bottom 2-3 red
top 2-3 purple
right 0-2 blue
left 3-4 green
`),
  // Level 5 — minMoves=8, blocks=8, extra=0, board=6x6
  parseLevel(`
grid:
pbbb..
p.o...
pPPbb.
.pPyy.
.p.y..
..oo..
gates:
bottom 0-1 yellow
top 4-5 purple
right 0 blue
left 3-5 orange
`),
  // Level 6 — minMoves=8, blocks=7, extra=1, board=5x5
  parseLevel(`
grid:
oo...
p..y.
p.yyp
py..p
.pppg
gates:
right 2-3 yellow
top 1-2 orange
left 2-4 purple
bottom 2 green
`),
  // Level 7 — minMoves=9, blocks=8, extra=1, board=5x5
  parseLevel(`
grid:
.PppP
gP.g.
gg.gg
.GGbr
..bb.
gates:
top 2-4 green
bottom 1 red
right 1-3 purple
left 0-2 blue
`),
  // Level 8 — minMoves=9, blocks=7, extra=2, board=5x5
  parseLevel(`
grid:
yggg.
yyoo.
.BbbB
..b.B
..o.B
gates:
top 0-2 blue
left 1-3 yellow
right 1 orange
bottom 1-3 green
`),
  // Level 9 — minMoves=10, blocks=8, extra=2, board=5x5
  parseLevel(`
grid:
...oB
..ooB
ooOOb
p...b
p.p.y
gates:
left 1 yellow
right 2-3 orange
top 1-2 purple
bottom 2 blue
`),
  // Level 10 — minMoves=11, blocks=9, extra=2, board=6x6
  parseLevel(`
grid:
......
oo...p
oyy.pp
oyy.oo
OOpp..
OPpyb.
gates:
top 4-5 orange
right 2 blue
left 1-3 yellow
bottom 4-5 purple
`),
  // Level 11 — minMoves=12, blocks=10, extra=2, board=6x6
  parseLevel(`
grid:
yyRyy.
yrR...
yrR..b
py.pp.
yy....
.y.pp.
gates:
top 4-5 red
left 0-1 purple
right 3 blue
bottom 3-5 yellow
`),
  // Level 12 — minMoves=31, blocks=11, extra=20, board=5x5
  parseLevel(`
grid:
..gbb
bggbg
pprgg
rbbpp
rpprp
gates:
bottom 2-4 green
left 2-3 blue
top 0-1 red
right 1-2 purple
`),
];
