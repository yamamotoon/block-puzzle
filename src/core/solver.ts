import type { Level, Cell, ColorId } from './types';
import { fitsGate } from './game';

// レベルソルバー（A*）。1 手 = あるブロックを 1 ドラッグで到達可能なマスへ動かす／
// 同色ゲートから出す。全ブロックを消し切るまでの最小手数を求める。
// ドラッグで届く範囲は「4 近傍スライドで連結した配置」＝ moveToward の到達域と一致する。

/** 解答手順の 1 手。block 番目のブロックを、アンカー(最小セル) that `to` の位置へ動かす。
 *  その位置が同色ゲートに収まる場合はゲートから脱出する。 */
export interface SolveMove {
  block: number;
  to: Cell;
}

export interface SolveResult {
  solvable: boolean;
  minMoves: number; // solvable のときのみ有効
  expanded: number; // 展開した状態数
  exceeded: boolean; // 探索上限に達して打ち切った
  path?: SolveMove[]; // solvable のとき、最小手数の手順
}

interface SBlock {
  color: ColorId;
  offsets: Cell[]; // アンカー（最小セル）からの相対形状
}

type Anchors = Array<Cell | null>; // null = 消去済み

export function solve(level: Level, maxExpanded = 300000): SolveResult {
  const { cols, rows, gates } = level;

  // 固定ブロックは動かない静的障害物として扱い、探索対象からは外す。
  const fixedCells = new Set<string>();
  for (const b of level.blocks) {
    if (b.fixed) for (const c of b.cells) fixedCells.add(`${c.c},${c.r}`);
  }

  const sblocks: SBlock[] = [];
  const initAnchors: Anchors = [];
  const origIndex: number[] = []; // 可動ブロック番号 → level.blocks 上の番号
  for (let bi = 0; bi < level.blocks.length; bi++) {
    const b = level.blocks[bi];
    if (b.fixed) continue;
    let mc = Infinity;
    let mr = Infinity;
    for (const c of b.cells) {
      if (c.c < mc) mc = c.c;
      if (c.r < mr) mr = c.r;
    }
    sblocks.push({ color: b.color, offsets: b.cells.map((c) => ({ c: c.c - mc, r: c.r - mr })) });
    initAnchors.push({ c: mc, r: mr });
    origIndex.push(bi);
  }
  const n = sblocks.length;

  const absCells = (i: number, a: Cell): Cell[] =>
    sblocks[i].offsets.map((o) => ({ c: a.c + o.c, r: a.r + o.r }));

  const keyOf = (anchors: Anchors): string =>
    anchors.map((a) => (a ? `${a.c},${a.r}` : 'x')).join('|');

  const occupancyExcept = (anchors: Anchors, exclude: number): Set<string> => {
    const s = new Set<string>(fixedCells); // 固定ブロックは常に障害物
    for (let i = 0; i < n; i++) {
      const a = anchors[i];
      if (i === exclude || !a) continue;
      for (const c of absCells(i, a)) s.add(`${c.c},${c.r}`);
    }
    return s;
  };

  const placementValid = (cells: Cell[], occ: Set<string>): boolean =>
    cells.every((c) => c.c >= 0 && c.c < cols && c.r >= 0 && c.r < rows && !occ.has(`${c.c},${c.r}`));

  /** ブロック i が現状態から 1 ドラッグで到達できるアンカー集合。 */
  const reachable = (i: number, anchors: Anchors): Cell[] => {
    const occ = occupancyExcept(anchors, i);
    const start = anchors[i]!;
    const seen = new Set<string>([`${start.c},${start.r}`]);
    const out: Cell[] = [start];
    const stack: Cell[] = [start];
    while (stack.length) {
      const a = stack.pop()!;
      for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
        const na = { c: a.c + dc, r: a.r + dr };
        const k = `${na.c},${na.r}`;
        if (seen.has(k)) continue;
        if (placementValid(absCells(i, na), occ)) {
          seen.add(k);
          out.push(na);
          stack.push(na);
        }
      }
    }
    return out;
  };

  const canExitAt = (i: number, a: Cell, occ: ReadonlySet<string>): boolean => {
    const cells = absCells(i, a);
    for (const g of gates) {
      if (g.color === sblocks[i].color && fitsGate(cells, g, cols, rows, occ)) return true;
    }
    return false;
  };

  const remaining = (anchors: Anchors): number => anchors.reduce((s, a) => s + (a ? 1 : 0), 0);

  // --- A* --------------------------------------------------------------------
  // f = g + h（h = 残ブロック数、各ブロックは最低 1 手必要なので許容的）。
  interface Node {
    f: number;
    g: number;
    anchors: Anchors;
  }
  const heap: Node[] = [];
  const push = (node: Node): void => {
    heap.push(node);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (better(heap[i], heap[p])) {
        [heap[i], heap[p]] = [heap[p], heap[i]];
        i = p;
      } else break;
    }
  };
  const pop = (): Node => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let best = i;
        if (l < heap.length && better(heap[l], heap[best])) best = l;
        if (r < heap.length && better(heap[r], heap[best])) best = r;
        if (best === i) break;
        [heap[i], heap[best]] = [heap[best], heap[i]];
        i = best;
      }
    }
    return top;
  };
  // f 昇順、同 f なら g 大（ゴールに近い）を優先。
  const better = (a: Node, b: Node): boolean => (a.f !== b.f ? a.f < b.f : a.g > b.g);

  const bestG = new Map<string, number>();
  const cameFrom = new Map<string, { prev: string; move: SolveMove }>();
  const startKey = keyOf(initAnchors);
  push({ f: remaining(initAnchors), g: 0, anchors: initAnchors });
  bestG.set(startKey, 0);

  let expanded = 0;
  while (heap.length) {
    const node = pop();
    const h = remaining(node.anchors);
    const curKey = keyOf(node.anchors);
    if (h === 0) {
      return { solvable: true, minMoves: node.g, expanded, exceeded: false, path: rebuild(curKey) };
    }

    if (++expanded > maxExpanded) return { solvable: false, minMoves: -1, expanded, exceeded: true };

    // 展開後に g が更新されていたらスキップ（古いエントリ）。
    if ((bestG.get(curKey) ?? Infinity) < node.g) continue;

    for (let i = 0; i < n; i++) {
      if (!node.anchors[i]) continue;
      const reach = reachable(i, node.anchors);
      const cur = node.anchors[i]!;
      const occ = occupancyExcept(node.anchors, i);

      // 脱出（到達域のどこかでゲートに収まるなら 1 手で消せる）
      const exitAnchor = reach.find((a) => canExitAt(i, a, occ));
      if (exitAnchor) {
        const next = node.anchors.slice();
        next[i] = null;
        relax(next, node.g + 1, curKey, { block: origIndex[i], to: exitAnchor });
      }
      // 移動
      for (const a of reach) {
        if (a.c === cur.c && a.r === cur.r) continue;
        const next = node.anchors.slice();
        next[i] = a;
        relax(next, node.g + 1, curKey, { block: origIndex[i], to: a });
      }
    }
  }
  return { solvable: false, minMoves: -1, expanded, exceeded: false };

  function relax(anchors: Anchors, g: number, fromKey: string, move: SolveMove): void {
    const k = keyOf(anchors);
    if ((bestG.get(k) ?? Infinity) <= g) return;
    bestG.set(k, g);
    cameFrom.set(k, { prev: fromKey, move });
    push({ f: g + remaining(anchors), g, anchors });
  }

  function rebuild(goalKey: string): SolveMove[] {
    const path: SolveMove[] = [];
    let k = goalKey;
    while (cameFrom.has(k)) {
      const { prev, move } = cameFrom.get(k)!;
      path.push(move);
      k = prev;
    }
    return path.reverse();
  }
}
