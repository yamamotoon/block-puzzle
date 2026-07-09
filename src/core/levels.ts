import type { Level } from './types';
import { parseLevel } from './level-format';

// 自動生成（generate.ts / seed固定）の難易度進行。やさしい入口→18手で頭打ち。
// 全レベル: 解ける・空きマス≥4（過密なし）を満たす。序盤以外は extra≥1（要どかし）。
// solver.test / validate.test / replay.test で健全性を担保。

export const LEVELS: Level[] = [
  // Level 1 — minMoves=2, blocks=2, extra=0, board=5x5
  parseLevel(`
grid:
.....
b....
.....
.pp..
.....
gates:
bottom 0 blue
left 2-3 purple
`),
  // Level 2 — minMoves=3, blocks=2, extra=1, board=5x5
  parseLevel(`
grid:
.....
.....
...p.
..ppo
...oo
gates:
left 1-2 orange
right 2-3 purple
`),
  // Level 3 — minMoves=3, blocks=2, extra=1, board=5x5
  parseLevel(`
grid:
r..g.
rr.g.
.....
.....
.....
gates:
left 0-2 green
top 2-4 red
`),
  // Level 4 — minMoves=3, blocks=2, extra=1, board=5x5
  parseLevel(`
grid:
.....
.....
.....
...by
...yy
gates:
top 1-3 yellow
right 3 blue
`),
  // Level 5 — minMoves=4, blocks=3, extra=1, board=5x5
  parseLevel(`
grid:
...rr
...or
.....
.....
.yyy.
gates:
left 2 yellow
right 0 orange
bottom 1-2 red
`),
  // Level 6 — minMoves=4, blocks=3, extra=1, board=5x5
  parseLevel(`
grid:
....b
....y
....y
....y
rrr..
gates:
left 1-2 blue
right 2-3 red
bottom 0-2 yellow
`),
  // Level 7 — minMoves=5, blocks=4, extra=1, board=6x6
  parseLevel(`
grid:
.gg..o
.gg..o
y...oo
y....b
.....b
......
gates:
left 1-3 green
right 0-1 blue
top 1 yellow
bottom 1-3 orange
`),
  // Level 8 — minMoves=6, blocks=5, extra=1, board=5x5
  parseLevel(`
grid:
.....
...bb
.RRb.
.roy.
rro..
gates:
right 3-4 red
bottom 1-2 blue
top 2-4 orange
left 1 yellow
`),
  // Level 9 — minMoves=7, blocks=6, extra=1, board=6x6
  parseLevel(`
grid:
..yy..
bp.yy.
ppp..y
......
..r...
.....b
gates:
left 3-5 yellow
right 0-1 blue
bottom 2-4 purple
top 2 red
`),
  // Level 10 — minMoves=8, blocks=7, extra=1, board=6x6
  parseLevel(`
grid:
GGggoo
G..GG.
...G..
.b....
..o...
.oo..y
gates:
bottom 0-1 green
right 0-2 yellow
left 0-2 orange
top 4 blue
`),
  // Level 11 — minMoves=9, blocks=8, extra=1, board=6x6
  parseLevel(`
grid:
gggGG.
..pppr
.Yyprr
.y..g.
......
......
gates:
top 4-5 yellow
left 3-4 red
bottom 2-4 green
right 4-5 purple
`),
  // Level 12 — minMoves=10, blocks=9, extra=1, board=6x6
  parseLevel(`
grid:
....o.
....or
.y....
ryo...
rrYyyo
rb..y.
gates:
right 3-5 yellow
left 3 blue
top 4-5 red
bottom 2 orange
`),
  // Level 13 — minMoves=11, blocks=10, extra=1, board=6x6
  parseLevel(`
grid:
.bbb.r
..b.Rr
yPPpp.
y..y..
y.bbp.
.rbb..
gates:
top 2-4 yellow
bottom 4 red
right 0-1 blue
left 2-3 purple
`),
  // Level 14 — minMoves=12, blocks=11, extra=1, board=5x5
  parseLevel(`
grid:
oyyyg
Y..og
yyyoG
.YoGG
g.ogg
gates:
left 3 yellow
bottom 1-3 green
right 0-2 orange
`),
  // Level 15 — minMoves=13, blocks=12, extra=1, board=6x6
  parseLevel(`
grid:
RRRr..
RRrrbb
GRR.o.
g.o...
.og...
bbg.bb
gates:
left 2-4 red
bottom 0 orange
top 5 green
right 4 blue
`),
  // Level 16 — minMoves=14, blocks=12, extra=2, board=6x6
  parseLevel(`
grid:
booygg
ggbboo
yggb..
yyGG..
.GGybb
ooyybb
gates:
right 3 orange
bottom 4-5 yellow
left 4-5 green
top 3-5 blue
`),
  // Level 17 — minMoves=15, blocks=11, extra=4, board=5x5
  parseLevel(`
grid:
gRRBb
grRB.
gG.bb
GGgg.
r.rrr
gates:
left 1-3 red
top 2-4 green
bottom 0-1 blue
`),
  // Level 18 — minMoves=16, blocks=11, extra=5, board=5x5
  parseLevel(`
grid:
gpPpp
.GY.p
.GYYg
gGypg
ggYY.
gates:
top 0-2 yellow
bottom 1-3 green
right 2-4 purple
`),
  // Level 19 — minMoves=17, blocks=9, extra=8, board=5x5
  parseLevel(`
grid:
.Roo.
rRoG.
.PgGG
oPPpg
oo...
gates:
top 0-1 green
left 0-1 purple
right 1-3 orange
bottom 3-4 red
`),
  // Level 20 — minMoves=18, blocks=9, extra=9, board=5x5
  parseLevel(`
grid:
.B.bp
bbyby
byyby
YY.pp
.Yggg
gates:
left 2 purple
top 0-1 yellow
bottom 1-3 green
right 1-3 blue
`),
];
