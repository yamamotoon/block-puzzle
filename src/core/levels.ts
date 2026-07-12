import type { Level } from './types';
import { parseLevel } from './level-format';

// 自動生成（generate.ts / seed固定）。
// World1=基本(1-30, やさしい入口→ランプ), World2=固定ブロック(31-60, 障害物を避けて解く)。
// 各スロットは同難易度の複数バリエーションを持ち、main.ts でランダムに1枚選ばれる。
// 全レベル: 解ける・過密なし。solver.test / validate.test / replay.test で健全性を担保。

export const LEVEL_SLOTS: Level[][] = [
  // Slot 1 [W1] — minMoves=3, blocks=3, extra=0, board=5x5
  [
    parseLevel(`
grid:
...o.
...o.
.gg..
....y
.....
gates:
bottom 0-1 green
right 0-1 yellow
top 0-2 orange
`),
    parseLevel(`
grid:
...yy
g...y
g....
.oo..
.....
gates:
right 1-3 green
left 1-3 orange
top 1-2 yellow
`),
    parseLevel(`
grid:
.....
.....
pp...
bgg..
bg...
gates:
right 1 purple
left 1-2 blue
bottom 0-1 green
`),
  ],
  // Slot 2 [W1] — minMoves=3, blocks=3, extra=0, board=5x5
  [
    parseLevel(`
grid:
.....
...o.
g....
..pp.
.....
gates:
left 3 green
top 1-3 purple
bottom 0-2 orange
`),
    parseLevel(`
grid:
.....
....r
..ob.
...b.
.....
gates:
left 0-2 orange
top 4 red
bottom 0-1 blue
`),
    parseLevel(`
grid:
.....
.....
py...
p..oo
.....
gates:
left 0 yellow
bottom 2 purple
top 2-3 orange
`),
  ],
  // Slot 3 [W1] — minMoves=3, blocks=3, extra=0, board=5x5
  [
    parseLevel(`
grid:
.ppp.
..gg.
.....
.....
.oo..
gates:
top 0-1 orange
right 1 purple
left 0-2 green
`),
    parseLevel(`
grid:
..gpp
..yy.
..y..
.....
.....
gates:
top 3 green
bottom 0-1 purple
left 1-2 yellow
`),
    parseLevel(`
grid:
.o...
.....
.pp..
.bb..
.....
gates:
top 2 orange
left 0-2 purple
right 0 blue
`),
  ],
  // Slot 4 [W1] — minMoves=4, blocks=4, extra=0, board=5x5
  [
    parseLevel(`
grid:
.r...
.rpp.
.o...
....y
....y
gates:
right 0-1 orange
top 3 red
bottom 1-3 yellow
left 3 purple
`),
    parseLevel(`
grid:
.....
.oo..
...g.
.yyr.
.....
gates:
right 2-3 yellow
left 1-2 red
bottom 4 green
top 1-3 orange
`),
    parseLevel(`
grid:
....g
...b.
.oo..
.....
..pp.
gates:
left 2-4 purple
right 3 orange
bottom 1-3 green
top 0 blue
`),
  ],
  // Slot 5 [W1] — minMoves=4, blocks=4, extra=0, board=5x5
  [
    parseLevel(`
grid:
....b
pp.r.
...r.
.....
g....
gates:
bottom 2-4 green
right 2-4 red
left 4 purple
top 0-1 blue
`),
    parseLevel(`
grid:
g..r.
.yy..
..ybb
.....
.....
gates:
right 0-1 yellow
top 3-4 blue
bottom 3-4 red
left 3 green
`),
    parseLevel(`
grid:
...b.
.....
....g
..oo.
yyo..
gates:
top 2-3 yellow
left 1-3 orange
right 0-1 green
bottom 2-4 blue
`),
  ],
  // Slot 6 [W1] — minMoves=4, blocks=4, extra=0, board=5x5
  [
    parseLevel(`
grid:
.....
.pp..
bb.oo
b....
..yy.
gates:
right 1-2 yellow
bottom 2-4 purple
top 2-4 orange
left 3-4 blue
`),
    parseLevel(`
grid:
.bb..
.b...
.r...
.r.yy
.gg..
gates:
right 2-4 blue
left 3-4 red
top 2-4 yellow
bottom 3-4 green
`),
    parseLevel(`
grid:
..rr.
..b.y
....y
...g.
.....
gates:
bottom 0-1 yellow
right 3-4 red
left 0-2 green
top 0-2 blue
`),
  ],
  // Slot 7 [W1] — minMoves=4, blocks=3, extra=1, board=5x5
  [
    parseLevel(`
grid:
gg...
...rr
.....
.b...
.b...
gates:
right 0-2 blue
bottom 0-1 red
left 2-3 green
`),
    parseLevel(`
grid:
.....
.r...
p..b.
o..b.
...b.
gates:
top 0-2 red
left 0-2 blue
bottom 0-2 orange
right 0 purple
`),
    parseLevel(`
grid:
bb...
..o..
r.oo.
.....
p....
gates:
left 1 blue
right 1-2 orange
top 2-4 red
bottom 2 purple
`),
  ],
  // Slot 8 [W1] — minMoves=5, blocks=4, extra=1, board=5x5
  [
    parseLevel(`
grid:
ooo..
.....
.....
.bbb.
.prr.
gates:
bottom 0-2 blue
right 1 orange
top 0-1 purple
left 1 red
`),
    parseLevel(`
grid:
b..oo
..ro.
.....
..yy.
.y...
gates:
left 1 yellow
bottom 1 red
right 2-4 orange
top 2 blue
`),
    parseLevel(`
grid:
..ooo
.oy..
b....
b..rr
....r
gates:
left 2-4 orange
bottom 0-1 yellow
top 4 blue
right 1-3 red
`),
  ],
  // Slot 9 [W1] — minMoves=5, blocks=4, extra=1, board=5x5
  [
    parseLevel(`
grid:
.b...
r....
r...r
r...r
y...r
gates:
right 1-3 blue
left 2-3 yellow
bottom 0 red
`),
    parseLevel(`
grid:
.....
....y
..goo
...bg
.....
gates:
top 3-4 green
right 1 orange
left 2-3 yellow
bottom 2-4 blue
`),
    parseLevel(`
grid:
.....
..p..
..g..
y.g..
o..p.
gates:
left 1-2 green
top 2 purple
right 0-1 yellow
bottom 4 orange
`),
  ],
  // Slot 10 [W1] — minMoves=6, blocks=5, extra=1, board=5x5
  [
    parseLevel(`
grid:
.rbpp
....p
...PP
....o
...oo
gates:
bottom 4 blue
left 3-4 purple
top 1-2 orange
right 1 red
`),
    parseLevel(`
grid:
pp...
pr.ob
..o.b
....b
..pp.
gates:
left 1-2 red
right 3-4 orange
top 2-3 blue
bottom 0-2 purple
`),
    parseLevel(`
grid:
gg.rb
.....
.r...
...g.
ooo..
gates:
top 3-4 green
left 0-1 red
bottom 0-1 blue
right 2 orange
`),
  ],
  // Slot 11 [W1] — minMoves=6, blocks=5, extra=1, board=5x5
  [
    parseLevel(`
grid:
...g.
..ygo
..yb.
...o.
...o.
gates:
top 3 orange
right 3 blue
bottom 4 yellow
left 2-3 green
`),
    parseLevel(`
grid:
.....
r.rr.
r.b..
r.b..
yg.rr
gates:
bottom 2-3 red
top 1-3 yellow
left 1-2 green
right 0-1 blue
`),
    parseLevel(`
grid:
.....
.gygo
.gy.o
.g...
....r
gates:
right 1-2 yellow
top 2 orange
left 0-1 red
bottom 2 green
`),
  ],
  // Slot 12 [W1] — minMoves=7, blocks=6, extra=1, board=5x5
  [
    parseLevel(`
grid:
.b...
bb...
..gO.
pooO.
p..g.
gates:
top 3-4 purple
bottom 0-1 orange
right 3-4 blue
left 2-3 green
`),
    parseLevel(`
grid:
..oo.
.y..y
.y.gy
b..b.
....g
gates:
bottom 0 yellow
right 1-2 orange
top 1 blue
left 4 green
`),
    parseLevel(`
grid:
p.yOO
..ooo
...p.
...p.
.orrr
gates:
bottom 1-3 red
right 0-2 yellow
left 4 orange
top 1-2 purple
`),
  ],
  // Slot 13 [W1] — minMoves=8, blocks=7, extra=1, board=5x5
  [
    parseLevel(`
grid:
..b..
r.b..
r.b.g
oo.go
ggg.o
gates:
right 2-4 blue
bottom 0-2 red
top 0-1 orange
left 1-3 green
`),
    parseLevel(`
grid:
y.o..
..oO.
Bb...
.bB.p
..y..
gates:
left 2-3 purple
bottom 0-1 blue
right 1-2 orange
top 4 yellow
`),
    parseLevel(`
grid:
Bb.RR
Bg..r
BgRRr
..bb.
y.b..
gates:
right 0-2 yellow
top 3-4 green
left 3-4 red
bottom 0-2 blue
`),
  ],
  // Slot 14 [W1] — minMoves=8, blocks=7, extra=1, board=5x5
  [
    parseLevel(`
grid:
b..o.
bg.o.
..b..
.g.p.
...PP
gates:
left 3-4 orange
right 1-2 blue
top 2-3 purple
bottom 3-4 green
`),
    parseLevel(`
grid:
BBbbr
.Bybr
.oyry
.bb.y
.....
gates:
right 1-3 orange
top 0 red
bottom 2-4 blue
left 3-4 yellow
`),
    parseLevel(`
grid:
op..r
.r..r
.ro..
.yOy.
.yOO.
gates:
right 4 purple
bottom 0 yellow
left 1-3 orange
top 2 red
`),
  ],
  // Slot 15 [W1] — minMoves=9, blocks=8, extra=1, board=5x5
  [
    parseLevel(`
grid:
g.oo.
g..gg
g.opp
....b
Pp..b
gates:
bottom 2-4 green
left 2 orange
right 0 purple
top 2-4 blue
`),
    parseLevel(`
grid:
bpp..
BBB..
O.oo.
Oogg.
Oo...
gates:
right 4 blue
bottom 0-2 green
top 0-1 orange
left 4 purple
`),
    parseLevel(`
grid:
r.RRy
rrR..
.y...
.Yp..
oY.oo
gates:
bottom 1-2 orange
top 0 yellow
right 2-3 purple
left 1-2 red
`),
  ],
  // Slot 16 [W1] — minMoves=9, blocks=8, extra=1, board=5x5
  [
    parseLevel(`
grid:
gp..y
b...y
bg...
b.gy.
.pgy.
gates:
right 2 purple
bottom 1 green
left 2-4 yellow
top 2-4 blue
`),
    parseLevel(`
grid:
..G..
.bg..
bb.g.
..pR.
.rrRb
gates:
left 0-2 red
right 0-1 purple
top 3-4 blue
bottom 0 green
`),
    parseLevel(`
grid:
gg.rr
.gogg
bbo.g
Rrrb.
RR...
gates:
right 1-3 red
bottom 1-3 green
top 1-2 orange
left 1 blue
`),
  ],
  // Slot 17 [W1] — minMoves=10, blocks=9, extra=1, board=5x5
  [
    parseLevel(`
grid:
...rr
yyoor
pOO..
..rry
ooyr.
gates:
bottom 2-4 purple
right 3-4 red
left 1-3 orange
top 2-4 yellow
`),
    parseLevel(`
grid:
O.ybb
o.p.b
...y.
o.b..
..y..
gates:
top 1-2 blue
bottom 0 orange
right 0 purple
left 3 yellow
`),
    parseLevel(`
grid:
.pp.R
popRr
.o.Rr
...pr
yyy..
gates:
right 1 yellow
bottom 2 red
left 2-4 purple
top 1-3 orange
`),
  ],
  // Slot 18 [W1] — minMoves=11, blocks=10, extra=1, board=5x5
  [
    parseLevel(`
grid:
oog.o
pp.p.
gg.p.
ppgo.
..gob
gates:
bottom 2-3 purple
top 1-3 orange
left 1-2 blue
right 0-2 green
`),
    parseLevel(`
grid:
.y..r
oyy.r
..ob.
.YYbr
yyyrb
gates:
left 0-1 yellow
right 0 orange
top 0-2 red
bottom 1-2 blue
`),
    parseLevel(`
grid:
rpp.y
..yr.
y.pp.
ydbrr
.dB..
gates:
top 3 blue
left 1 red
right 2 purple
bottom 3-4 yellow
`),
  ],
  // Slot 19 [W1] — minMoves=11, blocks=10, extra=1, board=5x5
  [
    parseLevel(`
grid:
.....
oOO.g
R...r
rpg..
Pp..g
gates:
bottom 4 red
right 2 green
top 4 purple
left 2 orange
`),
    parseLevel(`
grid:
gp...
.pp.b
gg.gg
rbBg.
bb..p
gates:
bottom 2-3 green
right 1-2 purple
left 2-3 blue
top 1-3 red
`),
    parseLevel(`
grid:
...oO
...yy
.bBy.
.oB.g
.ggyb
gates:
bottom 1 blue
top 0-2 orange
left 2-3 yellow
right 2 green
`),
  ],
  // Slot 20 [W1] — minMoves=12, blocks=11, extra=1, board=5x5
  [
    parseLevel(`
grid:
.g.go
pb.g.
g..g.
g.ppo
op..b
gates:
right 1 purple
bottom 1 green
top 0-1 orange
left 1-2 blue
`),
    parseLevel(`
grid:
P.rGg
PPpGg
g.rrr
o..o.
.ppoo
gates:
right 3-4 purple
left 1-2 red
top 0-1 orange
bottom 1-3 green
`),
    parseLevel(`
grid:
opp..
o...y
.p.yy
..yBb
bbpoo
gates:
right 1-3 purple
bottom 0-2 yellow
left 0 blue
top 3-4 orange
`),
  ],
  // Slot 21 [W1] — minMoves=13, blocks=12, extra=1, board=5x5
  [
    parseLevel(`
grid:
p.yp.
bYYpy
prb..
pprb.
r.rb.
gates:
bottom 1-2 purple
right 1-2 blue
top 4 red
left 0 yellow
`),
    parseLevel(`
grid:
ppoog
YpOog
ygOyy
.oOyg
oo...
gates:
bottom 0-2 green
right 0-1 purple
left 3-4 yellow
top 0-2 orange
`),
    parseLevel(`
grid:
yyyoo
.rbob
br..R
.r.yR
.y..r
gates:
right 2 yellow
top 3 red
bottom 0-2 blue
left 0-1 orange
`),
  ],
  // Slot 22 [W1] — minMoves=13, blocks=11, extra=2, board=5x5
  [
    parseLevel(`
grid:
.yyBb
..ryy
ppPr.
pPPpp
.rbb.
gates:
left 1 blue
right 2-3 yellow
top 4 red
bottom 1-2 purple
`),
    parseLevel(`
grid:
rr.gG
...g.
bbRR.
bprR.
.rrbb
gates:
left 0 purple
right 3-4 red
top 2-4 blue
bottom 2 green
`),
    parseLevel(`
grid:
pGypp
GGg.b
b.BBb
bb.g.
..y..
gates:
right 0-2 green
left 3-4 purple
top 2-3 blue
bottom 0 yellow
`),
  ],
  // Slot 23 [W1] — minMoves=14, blocks=12, extra=2, board=5x5
  [
    parseLevel(`
grid:
oRr.g
.BgG.
bBg.o
.obbo
rr...
gates:
bottom 2 orange
right 3 red
top 0-2 blue
left 1-3 green
`),
    parseLevel(`
grid:
.rr..
prOo.
ppgOg
.rgOg
..rrg
gates:
bottom 0 green
right 0-1 red
top 2-4 purple
left 2-4 orange
`),
    parseLevel(`
grid:
Ggg..
GYYg.
GyOOo
pyyOp
.pooo
gates:
left 1-2 yellow
bottom 0-1 green
top 2-4 orange
right 0-1 purple
`),
  ],
  // Slot 24 [W1] — minMoves=14, blocks=12, extra=2, board=5x5
  [
    parseLevel(`
grid:
..ryo
orr.o
yyorb
rbory
rro.b
gates:
top 3 orange
right 0-1 red
left 0 yellow
bottom 3 blue
`),
    parseLevel(`
grid:
yYg..
g.ry.
G.B..
rbbrr
rBBBr
gates:
bottom 1-2 green
right 3 blue
top 3-4 red
left 3 yellow
`),
    parseLevel(`
grid:
..Rrb
p.RRB
.YrpB
pyrp.
pprpy
gates:
left 0-2 yellow
right 2-4 red
bottom 2-4 blue
top 1-2 purple
`),
  ],
  // Slot 25 [W1] — minMoves=15, blocks=12, extra=3, board=5x5
  [
    parseLevel(`
grid:
.pRgg
.rRpp
..bgp
ggbp.
brrbb
gates:
right 2-4 green
bottom 2-3 red
top 2-4 purple
left 2-3 blue
`),
    parseLevel(`
grid:
g.rRg
..rRr
pYYyr
pYyyr
p...g
gates:
left 1-2 yellow
right 0-2 purple
bottom 2 red
top 1 green
`),
    parseLevel(`
grid:
.Y...
pYyop
ggGGG
.og..
.ooy.
gates:
left 3 green
top 4 yellow
right 3-4 orange
bottom 3-4 purple
`),
  ],
  // Slot 26 [W1] — minMoves=16, blocks=9, extra=7, board=5x5
  [
    parseLevel(`
grid:
oyypp
ybbpP
yyb.P
bbppp
yb...
gates:
right 0-2 blue
left 3-4 purple
top 2-3 yellow
bottom 0-2 orange
`),
    parseLevel(`
grid:
b..y.
bbB.o
rrBBo
.yRbb
oor.b
gates:
right 2 yellow
left 1 red
bottom 0-1 blue
top 1-2 orange
`),
    parseLevel(`
grid:
.rrgy
.yygy
.rrpp
.prgP
yyyPP
gates:
left 2-3 purple
bottom 1-2 red
right 1-2 yellow
top 1 green
`),
  ],
  // Slot 27 [W1] — minMoves=16, blocks=10, extra=6, board=5x5
  [
    parseLevel(`
grid:
YPPp.
YyPpo
yyYoo
..opp
bbbo.
gates:
left 3 blue
right 3-4 yellow
bottom 3-4 purple
top 3-4 orange
`),
    parseLevel(`
grid:
...Bb
oggBb
rrrgb
obo.g
oboog
gates:
top 0 blue
right 0-2 red
bottom 3-4 orange
left 1-3 green
`),
    parseLevel(`
grid:
roo..
rgOB.
bbOBB
.brbr
.oorr
gates:
bottom 2-3 orange
top 1-3 blue
right 1-2 red
left 3 green
`),
  ],
  // Slot 28 [W1] — minMoves=17, blocks=10, extra=7, board=5x5
  [
    parseLevel(`
grid:
ooygb
.OygG
ooyBG
o.BB.
ybb..
gates:
right 0-1 orange
bottom 2 green
left 2-3 blue
top 3 yellow
`),
    parseLevel(`
grid:
b.rrO
Boryo
BoRyo
.bRRo
.b.rr
gates:
bottom 3-4 orange
top 0 yellow
left 1-2 red
right 1-3 blue
`),
    parseLevel(`
grid:
pyyp.
yrryg
Gggy.
GrRR.
.rppp
gates:
right 2-4 red
left 2-3 purple
top 0-2 green
bottom 2-4 yellow
`),
  ],
  // Slot 29 [W1] — minMoves=17, blocks=10, extra=7, board=5x5
  [
    parseLevel(`
grid:
ggbbb
grrBg
.rgog
.oggo
..rro
gates:
right 1 blue
top 0-2 red
bottom 0-2 green
left 2-4 orange
`),
    parseLevel(`
grid:
g.o..
yyoop
gYgg.
ggopp
p..p.
gates:
bottom 3-4 green
left 2-3 orange
right 0-2 yellow
top 1-3 purple
`),
    parseLevel(`
grid:
oooB.
gggby
ooyby
.gYo.
GG.oo
gates:
bottom 0-2 orange
left 2-4 yellow
top 2 blue
right 1 green
`),
  ],
  // Slot 30 [W1] — minMoves=18, blocks=11, extra=7, board=5x5
  [
    parseLevel(`
grid:
.Rggo
.RRgo
rrhhr
.opPg
.oPPo
gates:
left 2-4 green
right 3-4 purple
top 1-2 orange
bottom 0-1 red
`),
    parseLevel(`
grid:
yyY.r
oobor
.obo.
bOORr
yO.b.
gates:
left 2-4 orange
top 4 blue
right 2-3 yellow
bottom 1 red
`),
    parseLevel(`
grid:
yyyoo
.bobo
OOOGG
..gG.
Yygb.
gates:
left 2-3 green
bottom 2-4 orange
right 0 yellow
top 2-4 blue
`),
  ],
  // Slot 31 [W2] — minMoves=4, blocks=4, extra=0, board=6x6
  [
    parseLevel(`
grid:
..brr.
...r..
......
##....
...y..
......
gates:
top 4 yellow
right 4-5 blue
bottom 3-4 red
`),
    parseLevel(`
grid:
.o....
......
......
pPPP..
.#....
.r....
gates:
bottom 3-5 purple
left 5 orange
top 3-4 red
`),
    parseLevel(`
grid:
.r.pp.
.r....
....gg
..##..
.r....
......
gates:
top 0 red
bottom 2-4 purple
right 3-4 green
`),
  ],
  // Slot 32 [W2] — minMoves=5, blocks=5, extra=0, board=6x6
  [
    parseLevel(`
grid:
b..#..
b..#..
..y.bo
....bb
......
......
gates:
left 1-3 yellow
top 3-5 blue
bottom 2 orange
`),
    parseLevel(`
grid:
..o..b
..o..b
......
..#..b
pp...b
.b....
gates:
bottom 2 blue
left 1-2 orange
right 0 purple
`),
    parseLevel(`
grid:
o..o.g
o#.o..
..OO..
.y....
......
......
gates:
top 1 yellow
bottom 1-3 orange
right 1-3 green
`),
  ],
  // Slot 33 [W2] — minMoves=5, blocks=5, extra=0, board=6x6
  [
    parseLevel(`
grid:
.....y
..p...
#.p...
..gg..
gg....
g.....
gates:
top 0-1 purple
right 0-1 green
bottom 0 yellow
`),
    parseLevel(`
grid:
.y....
......
..r.r.
....r.
..r.gg
..#...
gates:
right 1-3 green
top 3 red
bottom 1-3 yellow
`),
    parseLevel(`
grid:
gg....
...#oO
......
....yy
......
.y....
gates:
right 3-5 green
left 0 orange
top 3-5 yellow
`),
  ],
  // Slot 34 [W2] — minMoves=5, blocks=5, extra=0, board=6x6
  [
    parseLevel(`
grid:
.yy...
op..#.
op...p
.....p
......
......
gates:
right 2-3 yellow
top 2 purple
bottom 3 orange
`),
    parseLevel(`
grid:
.....g
......
....Bb
yyy.#b
..g...
......
gates:
right 1 yellow
top 2 blue
bottom 2 green
`),
    parseLevel(`
grid:
...yyy
..gg..
...g#.
.y.bbg
......
......
gates:
top 0-2 yellow
right 2-3 blue
left 2-3 green
`),
  ],
  // Slot 35 [W2] — minMoves=5, blocks=5, extra=0, board=6x6
  [
    parseLevel(`
grid:
#...yy
#...yY
.b..YY
.bo...
..oo..
......
gates:
right 1-2 orange
top 3-5 blue
bottom 2-4 yellow
`),
    parseLevel(`
grid:
...ppr
....rr
...roo
...r..
p.....
..##..
gates:
top 1-2 red
right 4 orange
left 0 purple
`),
    parseLevel(`
grid:
.....p
.Yyy..
r.....
......
......
p.##..
gates:
left 3 yellow
right 3-4 purple
top 2 red
`),
  ],
  // Slot 36 [W2] — minMoves=5, blocks=5, extra=0, board=6x6
  [
    parseLevel(`
grid:
......
..oo..
bbbBgg
...Bg#
......
......
gates:
top 0-2 green
right 1-3 blue
left 3 orange
`),
    parseLevel(`
grid:
......
..o..#
..o..#
...b.o
pp..po
p.....
gates:
left 4 blue
bottom 2-3 orange
right 4-5 purple
`),
    parseLevel(`
grid:
......
gg....
oo...g
.##bb.
b.....
b.....
gates:
left 4 orange
right 4-5 green
top 4-5 blue
`),
  ],
  // Slot 37 [W2] — minMoves=6, blocks=6, extra=0, board=6x6
  [
    parseLevel(`
grid:
...ggg
..oo..
yoggg.
yo.#..
......
......
gates:
left 2 green
bottom 1-3 orange
top 5 yellow
`),
    parseLevel(`
grid:
yyy...
......
......
...pgy
...pG.
.#....
gates:
bottom 3-5 yellow
top 5 green
left 0-1 purple
`),
    parseLevel(`
grid:
.##.pp
......
....b.
bB.yb.
bB....
.yyy..
gates:
bottom 3-5 yellow
top 0 blue
right 5 purple
`),
  ],
  // Slot 38 [W2] — minMoves=6, blocks=6, extra=0, board=6x6
  [
    parseLevel(`
grid:
.o.##o
r.o..g
r....g
r.....
......
......
gates:
top 2-4 red
right 3-4 green
left 1-3 orange
`),
    parseLevel(`
grid:
....gg
..p...
.gg..g
...p..
..rpp.
##....
gates:
right 3 red
top 2-4 green
left 2-3 purple
`),
    parseLevel(`
grid:
..ob.B
o..bbB
o....B
...bb.
.....#
y.....
gates:
top 0-2 blue
left 3-5 orange
bottom 5 yellow
`),
  ],
  // Slot 39 [W2] — minMoves=6, blocks=6, extra=0, board=6x6
  [
    parseLevel(`
grid:
..po..
...op.
..#...
r.....
roo...
r.....
gates:
right 1-3 red
bottom 1-3 purple
left 4-5 orange
`),
    parseLevel(`
grid:
.g..pp
.#....
..y...
.....y
.p..p.
pp.pp.
gates:
top 3-5 yellow
left 2 green
right 2-4 purple
`),
    parseLevel(`
grid:
rr....
#r..rR
.p..rR
.p..r.
Pp.b..
..bb..
gates:
bottom 4 purple
top 3-5 red
right 3-5 blue
`),
  ],
  // Slot 40 [W2] — minMoves=6, blocks=6, extra=0, board=6x6
  [
    parseLevel(`
grid:
....pp
.b..g.
.b..g.
.BB.g.
...b..
....#.
gates:
bottom 0 green
left 2 purple
right 0-2 blue
`),
    parseLevel(`
grid:
.##Bo.
.poBoo
...Bb.
......
pp....
......
gates:
top 3-4 orange
right 5 purple
bottom 2-3 blue
`),
    parseLevel(`
grid:
....r.
.r....
.rg.y.
.GG.yy
.rr...
#.....
gates:
top 1-3 red
left 2 green
bottom 0-2 yellow
`),
  ],
  // Slot 41 [W2] — minMoves=7, blocks=7, extra=0, board=6x6
  [
    parseLevel(`
grid:
......
.pppyy
.g.y#g
...yy.
...gg.
...g..
gates:
bottom 1-3 yellow
right 1 purple
top 2-3 green
`),
    parseLevel(`
grid:
...g.r
.GGG..
...yYY
.g.y..
.yy...
....##
gates:
right 3-4 yellow
top 1 red
left 3 green
`),
    parseLevel(`
grid:
o.gg..
o....y
g.##..
g.....
y.g...
yygy..
gates:
left 1-2 orange
top 1-3 yellow
bottom 3-4 green
`),
  ],
  // Slot 42 [W2] — minMoves=7, blocks=7, extra=0, board=6x6
  [
    parseLevel(`
grid:
..oo..
...p..
...P..
...Pp.
.##Pp.
o.g...
gates:
right 3 orange
top 2-3 purple
left 1-2 green
`),
    parseLevel(`
grid:
.oo...
g.b...
ggOo..
..bb..
...bBB
.....#
gates:
left 5 orange
right 2-3 green
bottom 0-2 blue
`),
    parseLevel(`
grid:
..rp..
...p..
br...r
.r..#.
.r..b.
..bb..
gates:
right 0-1 blue
bottom 0-2 purple
top 5 red
`),
  ],
  // Slot 43 [W2] — minMoves=7, blocks=7, extra=0, board=6x6
  [
    parseLevel(`
grid:
......
Ooo.g.
Oopg..
##pg..
..p...
.g....
gates:
bottom 0 green
right 2-4 orange
top 3-5 purple
`),
    parseLevel(`
grid:
......
.....o
.ygo.o
.gg..#
..y..y
g....y
gates:
bottom 2 yellow
right 1-3 green
top 0 orange
`),
    parseLevel(`
grid:
.Gggg.
.r...#
.....#
..oo..
.ggor.
..gOOO
gates:
bottom 3-5 green
left 1-3 orange
top 0-1 red
`),
  ],
  // Slot 44 [W2] — minMoves=8, blocks=8, extra=0, board=6x6
  [
    parseLevel(`
grid:
..o.bb
..oog.
......
g.....
g.#.oo
gbbbob
gates:
right 3-4 blue
top 3 green
bottom 2-4 orange
`),
    parseLevel(`
grid:
...pgg
gg..yy
....yp
.#....
g.....
.yyyYY
gates:
left 0-2 purple
top 2-4 yellow
right 1 green
`),
    parseLevel(`
grid:
..pprr
....p.
....pP
...#rP
...#bP
bb.rbb
gates:
top 0-2 purple
right 0-2 blue
left 4 red
`),
  ],
  // Slot 45 [W2] — minMoves=8, blocks=8, extra=0, board=6x6
  [
    parseLevel(`
grid:
.b....
.bbB..
.BBooo
......
.....#
Yy.y.#
gates:
top 4 yellow
bottom 3-5 blue
left 1 orange
`),
    parseLevel(`
grid:
r.YYr.
r.Yyr#
r..y.#
...r..
......
.BBBb.
gates:
top 1 red
bottom 2-4 yellow
left 0 blue
`),
    parseLevel(`
grid:
.p##..
..g...
.pg...
bbp.b.
.b..GG
....g.
gates:
left 0-1 purple
right 3-4 blue
bottom 0-2 green
`),
  ],
  // Slot 46 [W2] — minMoves=8, blocks=8, extra=0, board=6x6
  [
    parseLevel(`
grid:
.bo...
..o...
g.....
bbbg..
#.oggb
#....b
gates:
bottom 2-4 blue
right 4-5 orange
left 0-1 green
`),
    parseLevel(`
grid:
...p..
.Yyyb.
.Y.yYY
bbb...
.BB...
##p...
gates:
right 4-5 blue
left 1 purple
bottom 1-3 yellow
`),
    parseLevel(`
grid:
.....y
oyy..y
.o...y
..p.yp
..pp..
#p....
gates:
bottom 4 orange
right 2-4 yellow
left 1-3 purple
`),
  ],
  // Slot 47 [W2] — minMoves=8, blocks=8, extra=0, board=6x6
  [
    parseLevel(`
grid:
bb..go
b..ogo
...ogo
...b..
o..bb.
bb.#..
gates:
top 0-2 orange
right 1-2 blue
bottom 0 green
`),
    parseLevel(`
grid:
.rr...
..r...
r..pp.
rr.prr
p#....
PP.o..
gates:
bottom 2-4 red
right 1-3 orange
left 1-2 purple
`),
    parseLevel(`
grid:
..BB..
bbBbb.
..##g.
.....o
.gg...
...o.g
gates:
left 0 green
top 4 orange
bottom 2-4 blue
`),
  ],
  // Slot 48 [W2] — minMoves=9, blocks=9, extra=0, board=6x6
  [
    parseLevel(`
grid:
...obb
...g..
g..goo
...g.o
g..bb.
g#BB..
gates:
right 3-5 orange
top 3-5 green
left 2 blue
`),
    parseLevel(`
grid:
ggg.gg
....bg
...#.b
....oO
.....g
.bo.gg
gates:
bottom 5 blue
left 2-3 green
top 2-3 orange
`),
    parseLevel(`
grid:
....b.
......
rby#..
r.yy.b
.....b
r.yr.b
gates:
top 1 blue
bottom 5 red
right 0-2 yellow
`),
  ],
  // Slot 49 [W2] — minMoves=9, blocks=9, extra=0, board=6x6
  [
    parseLevel(`
grid:
...Ppp
..#...
G.#..r
G.....
g.prr.
gG....
gates:
top 3 green
right 3-4 red
left 2 purple
`),
    parseLevel(`
grid:
..b..b
.rr...
..r.YY
.b..#Y
y.RRyy
..rr..
gates:
top 1-3 yellow
bottom 5 blue
left 3-4 red
`),
    parseLevel(`
grid:
y.ooyg
..ogg.
......
.y..#g
......
..o..o
gates:
left 0-1 orange
top 3-4 green
right 1 yellow
`),
  ],
  // Slot 50 [W2] — minMoves=9, blocks=9, extra=0, board=6x6
  [
    parseLevel(`
grid:
o#.pp.
o#b.P.
o.bb.o
....B.
o..bB.
..bbB.
gates:
top 4-5 blue
left 4 purple
bottom 0-2 orange
`),
    parseLevel(`
grid:
bbb..#
.p.y.#
.pyb..
......
...pp.
.b.yp.
gates:
top 0-2 purple
left 3 blue
bottom 4 yellow
`),
    parseLevel(`
grid:
...y..
...g#.
....b.
...bb.
.bbyBB
ygggB.
gates:
bottom 1-2 blue
left 2 green
top 0 yellow
`),
  ],
  // Slot 51 [W2] — minMoves=10, blocks=10, extra=0, board=6x6
  [
    parseLevel(`
grid:
...o..
..p.Py
#.ppP.
...yO.
yy..Op
y..oop
gates:
right 3-4 yellow
bottom 2-4 purple
left 3-5 orange
`),
    parseLevel(`
grid:
.....g
..Bbbp
..BBbp
..bbg.
.P.bg#
PPp.g#
gates:
right 1-3 blue
top 4 green
left 1-3 purple
`),
    parseLevel(`
grid:
#yy.b.
YY..b.
bY.o..
o....o
ooyb..
......
gates:
left 0-2 orange
bottom 3-5 yellow
top 1 blue
`),
  ],
  // Slot 52 [W2] — minMoves=10, blocks=10, extra=0, board=6x6
  [
    parseLevel(`
grid:
.PPrr.
.rp...
.g....
...r..
...#.g
....pG
gates:
left 0 purple
top 3 green
right 4 red
`),
    parseLevel(`
grid:
yp.g..
....#.
....#.
yy.ppp
ypyyg.
g.y...
gates:
left 3 purple
top 1 green
right 2-4 yellow
`),
    parseLevel(`
grid:
yb....
o...#.
o...yy
Bbo...
.b.y..
...y.o
gates:
bottom 3 orange
top 2 blue
right 4-5 yellow
`),
  ],
  // Slot 53 [W2] — minMoves=10, blocks=10, extra=0, board=6x6
  [
    parseLevel(`
grid:
..yyYo
..ryff
o.r...
o.....
##.orR
......
gates:
left 1-3 yellow
bottom 4 red
top 3 orange
`),
    parseLevel(`
grid:
.#g.o.
goo.o.
Y.....
Yy....
..y.oo
ggy..o
gates:
bottom 5 yellow
right 5 green
left 3-4 orange
`),
    parseLevel(`
grid:
.ooo.r
r..r.r
r..rrg
rg..Og
...#oo
......
gates:
right 1 orange
top 1-3 red
bottom 1-2 green
`),
  ],
  // Slot 54 [W2] — minMoves=10, blocks=10, extra=0, board=6x6
  [
    parseLevel(`
grid:
ooy..y
b.....
..OOoy
b..Ooy
.bb..#
.b...#
gates:
bottom 1-3 orange
left 3-4 yellow
top 4-5 blue
`),
    parseLevel(`
grid:
...b..
yyybBB
..b..B
.bb..o
oO.y..
o..#..
gates:
bottom 0-1 blue
left 3-5 yellow
top 3 orange
`),
    parseLevel(`
grid:
...o.r
##.rr.
#p.roo
.rp.o.
.oo...
pp....
gates:
left 4-5 orange
right 0 purple
bottom 3-5 red
`),
  ],
  // Slot 55 [W2] — minMoves=11, blocks=9, extra=2, board=6x6
  [
    parseLevel(`
grid:
y.o..#
yyoo.#
o.....
o..yy.
GGYygg
gGYY.g
gates:
bottom 0-2 yellow
left 1-2 orange
top 2-3 green
`),
    parseLevel(`
grid:
...Yrr
##.Yy.
oo.Y..
oO...r
.Oy...
..yoo#
gates:
right 3-5 orange
top 4 yellow
left 1-2 red
`),
  ],
  // Slot 56 [W2] — minMoves=11, blocks=10, extra=1, board=6x6
  [
    parseLevel(`
grid:
PPgg.r
prrg..
ppGGp.
...G..
r.g#..
rrg...
gates:
left 0-2 green
bottom 2-3 purple
right 3-5 red
`),
  ],
  // Slot 57 [W2] — minMoves=11, blocks=10, extra=1, board=6x6
  [
    parseLevel(`
grid:
bb#gb.
b.ggbb
.....B
.y...B
gYY#g.
gg.#g.
gates:
left 3-5 blue
bottom 0-2 yellow
right 1-3 green
`),
  ],
  // Slot 58 [W2] — minMoves=11, blocks=9, extra=2, board=6x6
  [
    parseLevel(`
grid:
..rOoo
RrrOo#
......
ppor..
..orr.
...pp.
gates:
bottom 3-5 orange
right 0-1 purple
left 2-4 red
`),
  ],
  // Slot 59 [W2] — minMoves=12, blocks=11, extra=1, board=6x6
  [
    parseLevel(`
grid:
yBBbG.
y.#bGg
..#YYy
#...Yy
#...by
....bg
gates:
bottom 1-2 green
top 3-5 yellow
right 2-3 blue
`),
    parseLevel(`
grid:
...#Gg
.bb..b
..b.bb
r.r..r
.gg.br
#..bbr
gates:
top 3-5 blue
bottom 2 red
right 3 green
`),
  ],
  // Slot 60 [W2] — minMoves=12, blocks=11, extra=1, board=6x6
  [
    parseLevel(`
grid:
....o.
#..g.b
#GGgGb
bGb.O.
b.b#O.
b.b#Oo
gates:
left 2-4 green
top 3-4 blue
bottom 2-3 orange
`),
  ],
];
