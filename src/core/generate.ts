import type { Level, Cell, ColorId, Edge, Gate } from './types';
import { fitsGate } from './game';
import { validateLevel } from './validate';
import { solve, type SolveResult } from './solver';

// レベル自動生成器（順生成＋ソルバー判定）。
// ランダムに盤面を作り、ソルバーで「解けるか／最小手数」を測って採否を決める。
// 生成は開発時に回す用途（アプリ実行時には使わない）。

// --- 乱数（seed 指定で再現可能） ------------------------------------------
export function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const randInt = (rng: () => number, lo: number, hi: number): number =>
  lo + Math.floor(rng() * (hi - lo + 1));

function shuffle<T>(rng: () => number, arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PALETTE: ColorId[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
const ALL_EDGES: Edge[] = ['top', 'right', 'bottom', 'left'];

export interface GenOptions {
  cols: number;
  rows: number;
  colors: number; // 使う色数（=辺数、最大4）
  maxBlocksPerColor: number;
  maxBlockSize: number;
  minFreeCells: number; // 盤面に必ず残す空きマス数（過密＝理不尽を防ぐ）
  fixedBlocks: number; // 配置する固定ブロック数
  fixedMaxSize: number; // 固定ブロックの最大セル数
}

const DEFAULTS: GenOptions = {
  cols: 6,
  rows: 6,
  colors: 4,
  maxBlocksPerColor: 2,
  maxBlockSize: 4,
  minFreeCells: 3,
  fixedBlocks: 0,
  fixedMaxSize: 2,
};

/** 1 レベル生成を試みる。作れなければ null。 */
export function generateLevel(rng: () => number, opts: Partial<GenOptions> = {}): Level | null {
  const o = { ...DEFAULTS, ...opts };
  const cols = o.cols;
  const rows = o.rows;
  const k = Math.min(o.colors, 4);

  const colors = shuffle(rng, PALETTE).slice(0, k);
  const edges = shuffle(rng, ALL_EDGES).slice(0, k);

  const gates: Gate[] = [];
  const gateByColor = new Map<ColorId, Gate>();
  for (let i = 0; i < k; i++) {
    const edge = edges[i];
    const edgeLen = edge === 'top' || edge === 'bottom' ? cols : rows;
    const w = randInt(rng, 1, Math.min(3, edgeLen));
    const start = randInt(rng, 0, edgeLen - w);
    const gate: Gate = { edge, start, end: start + w - 1, color: colors[i] };
    gates.push(gate);
    gateByColor.set(colors[i], gate);
  }

  const occupied = new Set<string>();
  const key = (c: number, r: number) => `${c},${r}`;
  const inBounds = (c: number, r: number) => c >= 0 && c < cols && r >= 0 && r < rows;
  const isFree = (c: number, r: number) => inBounds(c, r) && !occupied.has(key(c, r));

  const blocks: Level['blocks'] = [];
  let idCounter = 0;

  // 固定ブロック（障害物）を先に置く。
  for (let f = 0; f < o.fixedBlocks; f++) {
    const size = randInt(rng, 1, o.fixedMaxSize);
    const cells = growPolyomino(rng, size, cols, rows, isFree);
    if (!cells) continue;
    for (const c of cells) occupied.add(key(c.c, c.r));
    blocks.push({ id: `x${idCounter++}`, color: 'red', cells, fixed: true });
  }

  for (const color of colors) {
    const gate = gateByColor.get(color)!;
    const gateAxisIsCol = gate.edge === 'top' || gate.edge === 'bottom';
    const gateWidth = gate.end - gate.start + 1;
    const count = randInt(rng, 1, o.maxBlocksPerColor);

    for (let b = 0; b < count; b++) {
      let placed: Cell[] | null = null;
      for (let attempt = 0; attempt < 30 && !placed; attempt++) {
        const size = randInt(rng, 1, o.maxBlockSize);
        const cells = growPolyomino(rng, size, cols, rows, isFree);
        if (!cells) continue;
        // ゲート幅に収まる形か（幅を超えると出られない）
        const spanAxis = extentAlong(cells, gateAxisIsCol);
        if (spanAxis > gateWidth) continue;
        // 初期状態で既に脱出できる配置は避ける
        if (fitsGate(cells, gate, cols, rows)) continue;
        placed = cells;
      }
      if (!placed) continue; // このブロックは諦める
      for (const c of placed) occupied.add(key(c.c, c.r));
      blocks.push({ id: `${color[0]}${idCounter++}`, color, cells: placed });
    }
  }

  if (blocks.filter((b) => !b.fixed).length === 0) return null; // 可動ブロックが必須
  const filled = blocks.reduce((s, b) => s + b.cells.length, 0);
  if (cols * rows - filled < o.minFreeCells) return null; // 過密は不採用
  const level: Level = { cols, rows, blocks, gates };
  if (validateLevel(level).errors.length > 0) return null;
  return level;
}

/** 連結ポリオミノをランダム生成（空きマスのみ、指定サイズに届かなければ途中まで）。 */
function growPolyomino(
  rng: () => number,
  size: number,
  cols: number,
  rows: number,
  isFree: (c: number, r: number) => boolean,
): Cell[] | null {
  // 開始セル候補をランダムに探す
  let start: Cell | null = null;
  for (let t = 0; t < 40 && !start; t++) {
    const c = Math.floor(rng() * cols);
    const r = Math.floor(rng() * rows);
    if (isFree(c, r)) start = { c, r };
  }
  if (!start) return null;

  const cells = [start];
  const inBlock = new Set<string>([`${start.c},${start.r}`]);
  while (cells.length < size) {
    const candidates: Cell[] = [];
    for (const cell of cells) {
      for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
        const nc = cell.c + dc;
        const nr = cell.r + dr;
        const k = `${nc},${nr}`;
        if (!inBlock.has(k) && isFree(nc, nr)) candidates.push({ c: nc, r: nr });
      }
    }
    if (candidates.length === 0) break;
    const pick = candidates[Math.floor(rng() * candidates.length)];
    cells.push(pick);
    inBlock.add(`${pick.c},${pick.r}`);
  }
  return cells;
}

function extentAlong(cells: Cell[], alongCol: boolean): number {
  let min = Infinity;
  let max = -Infinity;
  for (const c of cells) {
    const v = alongCol ? c.c : c.r;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return max - min + 1;
}

export interface Candidate {
  level: Level;
  minMoves: number;
  expanded: number;
  blocks: number;
  extraMoves: number; // minMoves - blocks（>0 なら「どかし」が必要＝パズル性）
}

/** レベルの正規化キー（重複除去用）。 */
export function canonicalLevelKey(level: Level): string {
  const b = level.blocks
    .map(
      (bl) =>
        `${bl.color}:${bl.cells.map((c) => `${c.c},${c.r}`).sort().join(';')}`,
    )
    .sort()
    .join('|');
  const g = level.gates
    .map((x) => `${x.edge}${x.start}-${x.end}${x.color}`)
    .sort()
    .join('|');
  return `${level.cols}x${level.rows}#${b}#${g}`;
}

/**
 * 候補プールから、重複を除き手数順に並べた難易度ランプを targetCount 個抽出する。
 * minDifficulty 未満（易しすぎ）は除外し、残りを均等間隔でサンプリングする。
 */
export function pickRamp(pool: Candidate[], targetCount: number, minDifficulty = 3): Candidate[] {
  const seen = new Set<string>();
  const uniq: Candidate[] = [];
  for (const c of pool) {
    if (c.minMoves < minDifficulty) continue;
    const k = canonicalLevelKey(c.level);
    if (seen.has(k)) continue;
    seen.add(k);
    uniq.push(c);
  }
  uniq.sort((a, b) => a.minMoves - b.minMoves || a.expanded - b.expanded);
  if (uniq.length <= targetCount) return uniq;

  const out: Candidate[] = [];
  for (let i = 0; i < targetCount; i++) {
    const idx = Math.round((i * (uniq.length - 1)) / (targetCount - 1));
    if (out.length === 0 || out[out.length - 1] !== uniq[idx]) out.push(uniq[idx]);
  }
  return out;
}

/**
 * 目標手数を等間隔に置き、各目標に最も近い候補を選んで滑らかなランプを作る。
 * - extra≥1（必ず「どかし」が要る）だけを対象＝作業レベルを排除
 * - 最難手数を cap で頭打ちにして急な跳ねを防ぐ
 */
export function pickRampTargets(pool: Candidate[], count: number, cap = 18, minExtra = 1): Candidate[] {
  const seen = new Set<string>();
  const uniq: Candidate[] = [];
  for (const c of pool) {
    if (c.extraMoves < minExtra || c.minMoves > cap) continue;
    const k = canonicalLevelKey(c.level);
    if (seen.has(k)) continue;
    seen.add(k);
    uniq.push(c);
  }
  if (uniq.length === 0) return [];
  uniq.sort((a, b) => a.minMoves - b.minMoves || a.expanded - b.expanded);

  const lo = uniq[0].minMoves;
  const hi = uniq[uniq.length - 1].minMoves;
  const used = new Set<number>();
  const chosen: Candidate[] = [];
  for (let i = 0; i < count; i++) {
    const target = count === 1 ? lo : lo + ((hi - lo) * i) / (count - 1);
    let best = -1;
    let bestDist = Infinity;
    for (let j = 0; j < uniq.length; j++) {
      if (used.has(j)) continue;
      const d = Math.abs(uniq[j].minMoves - target);
      if (d < bestDist) {
        bestDist = d;
        best = j;
      }
    }
    if (best < 0) break;
    used.add(best);
    chosen.push(uniq[best]);
  }
  chosen.sort((a, b) => a.minMoves - b.minMoves || a.expanded - b.expanded);
  return chosen;
}

/**
 * やさしい導入レベル（少手数・どかし不要も可）を数個先頭に置き、
 * 続けて extra≥1 の本編ランプを cap まで並べた、全 count 個の進行を作る。
 */
export function pickProgression(pool: Candidate[], count: number, cap = 18): Candidate[] {
  const introCount = Math.max(2, Math.round(count * 0.2));
  // 導入：手数が小さく（≤introCap）、どかし不要(extra=0)も許容。やさしい入り口。
  const introCap = 4;
  const intro = pickRampTargets(pool, introCount, introCap, 0);
  const introKeys = new Set(intro.map((c) => canonicalLevelKey(c.level)));
  // 本編：導入で使ったものを除き、extra≥1 で cap まで。
  const rest = pool.filter((c) => !introKeys.has(canonicalLevelKey(c.level)));
  const main = pickRampTargets(rest, count - intro.length, cap, 1);
  const all = [...intro, ...main];
  all.sort((a, b) => a.minMoves - b.minMoves || a.expanded - b.expanded);
  return all;
}

/**
 * アンカー候補（難易度カーブ用に選ばれた代表候補）ごとに、同じ minMoves を持つ
 * 別候補をプールから追加収集し、variantsPerSlot 個までのバリエーション束にする。
 * 同じ盤面（canonicalLevelKey）はスロットをまたいで重複させない。
 * プールに同じ minMoves の候補が足りない場合は集まった分だけ返す（最低1個＝アンカー自身）。
 */
export function fillVariants(
  pool: Candidate[],
  anchors: Candidate[],
  variantsPerSlot: number,
): Candidate[][] {
  // 他スロットのアンカー自身を、別スロットのバリエーションとして誤って拾わないよう先に予約する。
  const used = new Set<string>(anchors.map((a) => canonicalLevelKey(a.level)));
  return anchors.map((anchor) => {
    const variants: Candidate[] = [anchor];
    for (const c of pool) {
      if (variants.length >= variantsPerSlot) break;
      if (c.minMoves !== anchor.minMoves) continue;
      const k = canonicalLevelKey(c.level);
      if (used.has(k)) continue;
      used.add(k);
      variants.push(c);
    }
    return variants;
  });
}

/** seed から count 個生成を試み、解ける候補だけ返す。 */
export function generateBatch(
  seed: number,
  count: number,
  opts: Partial<GenOptions> = {},
  maxExpanded = 60000,
): Candidate[] {
  const rng = makeRng(seed);
  const out: Candidate[] = [];
  for (let i = 0; i < count; i++) {
    const level = generateLevel(rng, opts);
    if (!level) continue;
    const res: SolveResult = solve(level, maxExpanded);
    if (!res.solvable || res.exceeded) continue;
    out.push({
      level,
      minMoves: res.minMoves,
      expanded: res.expanded,
      blocks: level.blocks.length,
      extraMoves: res.minMoves - level.blocks.length,
    });
  }
  return out;
}
