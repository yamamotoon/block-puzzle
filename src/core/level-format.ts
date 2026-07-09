import type { Level, BlockDef, Cell, ColorId, Edge, Gate } from './types';

// ASCII マップ形式のレベルを Level に変換するパーサ。
//
// 例:
//   grid:
//   .rr...
//   ..r.b.
//   ......
//   gates:
//   top 0-2 red
//   right 1-2 blue
//
// - grid: セクションは盤面。'.' か空白は空きマス、文字はブロックのセル。
//   同じ文字で 4 近傍に連結したセルの塊が 1 ブロックになる。
//   （隣接する同色ブロックを分けたいときは r と R のように別文字を使う）
//   '#' は固定ブロック（動かせない障害物）。
// - gates: セクションは 1 行 1 ゲート「辺 範囲 色」。範囲は "a-b" か単一 "a"。

const FIXED_CHAR = '#';

const COLOR_CHARS: Record<string, ColorId> = {
  r: 'red', R: 'red',
  b: 'blue', B: 'blue',
  g: 'green', G: 'green',
  y: 'yellow', Y: 'yellow',
  p: 'purple', P: 'purple',
  o: 'orange', O: 'orange',
};

// 色 → [小文字, 大文字]。隣接する同色別ブロックは 2 文字目で分けて表現する。
const CHARS_BY_COLOR: Record<ColorId, [string, string]> = {
  red: ['r', 'R'],
  blue: ['b', 'B'],
  green: ['g', 'G'],
  yellow: ['y', 'Y'],
  purple: ['p', 'P'],
  orange: ['o', 'O'],
};

const EDGES: readonly Edge[] = ['top', 'bottom', 'left', 'right'];
const COLOR_NAMES: readonly ColorId[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

function isEmpty(ch: string): boolean {
  return ch === '.' || ch === ' ' || ch === '';
}

export function parseLevel(text: string): Level {
  const rawLines = text.split('\n').map((l) => l.replace(/\r$/, ''));

  let mode: 'none' | 'grid' | 'gates' = 'none';
  const gridLines: string[] = [];
  const gateLines: string[] = [];
  for (const line of rawLines) {
    const key = line.trim().toLowerCase();
    if (key === 'grid:') { mode = 'grid'; continue; }
    if (key === 'gates:') { mode = 'gates'; continue; }
    if (mode === 'grid') gridLines.push(line);
    else if (mode === 'gates' && line.trim()) gateLines.push(line.trim());
  }

  // 前後の空行を除去（テンプレートリテラル由来）。
  while (gridLines.length && gridLines[0].trim() === '') gridLines.shift();
  while (gridLines.length && gridLines[gridLines.length - 1].trim() === '') gridLines.pop();

  if (gridLines.length === 0) throw new Error('parseLevel: grid: セクションが空です');

  const rows = gridLines.length;
  const cols = Math.max(...gridLines.map((l) => l.length));
  const at = (c: number, r: number): string => gridLines[r][c] ?? '.';

  // 連結成分でブロックを抽出。
  const visited: boolean[][] = Array.from({ length: rows }, () => new Array<boolean>(cols).fill(false));
  const blocks: BlockDef[] = [];
  let counter = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ch = at(c, r);
      if (visited[r][c] || isEmpty(ch)) continue;
      const isFixed = ch === FIXED_CHAR;
      if (!isFixed && !(ch in COLOR_CHARS)) {
        throw new Error(`parseLevel: 未知の文字 '${ch}' (${c},${r})`);
      }
      const color: ColorId = isFixed ? 'red' : COLOR_CHARS[ch]; // 固定は色未使用（描画で無視）
      const cells: Cell[] = [];
      const stack: Array<[number, number]> = [[c, r]];
      while (stack.length) {
        const [cc, rr] = stack.pop()!;
        if (cc < 0 || cc >= cols || rr < 0 || rr >= rows) continue;
        if (visited[rr][cc] || at(cc, rr) !== ch) continue;
        visited[rr][cc] = true;
        cells.push({ c: cc, r: rr });
        stack.push([cc + 1, rr], [cc - 1, rr], [cc, rr + 1], [cc, rr - 1]);
      }
      blocks.push(isFixed ? { id: `x${counter++}`, color, cells, fixed: true } : { id: `${ch}${counter++}`, color, cells });
    }
  }

  const gates: Gate[] = gateLines.map((line) => parseGate(line));

  return { cols, rows, blocks, gates };
}

/** Level を ASCII マップ形式の文字列に変換する（生成結果の貼り付け用）。 */
export function levelToText(level: Level): string {
  const { cols, rows, blocks, gates } = level;
  const grid: string[][] = Array.from({ length: rows }, () => new Array<string>(cols).fill('.'));

  for (const b of blocks) {
    if (b.fixed) {
      for (const cell of b.cells) grid[cell.r][cell.c] = FIXED_CHAR;
      continue;
    }
    const [lo, hi] = CHARS_BY_COLOR[b.color];
    // 隣接する同色別ブロックと文字が衝突しないよう小文字/大文字を選ぶ。
    let ch = lo;
    const conflict = (candidate: string): boolean =>
      b.cells.some((cell) =>
        [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dc, dr]) => {
          const nc = cell.c + dc;
          const nr = cell.r + dr;
          return (
            nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === candidate
          );
        }),
      );
    if (conflict(lo)) ch = hi;
    for (const cell of b.cells) grid[cell.r][cell.c] = ch;
  }

  const gridText = grid.map((row) => row.join('')).join('\n');
  const gateText = gates
    .map((g) => `${g.edge} ${g.start === g.end ? g.start : `${g.start}-${g.end}`} ${g.color}`)
    .join('\n');
  return `grid:\n${gridText}\ngates:\n${gateText}`;
}

function parseGate(line: string): Gate {
  const parts = line.split(/\s+/);
  if (parts.length !== 3) throw new Error(`parseLevel: ゲート行が不正です「${line}」（辺 範囲 色）`);
  const [edgeStr, rangeStr, colorStr] = parts;

  const edge = edgeStr as Edge;
  if (!EDGES.includes(edge)) throw new Error(`parseLevel: 未知の辺 '${edgeStr}'`);

  const color = colorStr as ColorId;
  if (!COLOR_NAMES.includes(color)) throw new Error(`parseLevel: 未知の色 '${colorStr}'`);

  let start: number;
  let end: number;
  if (rangeStr.includes('-')) {
    const [a, b] = rangeStr.split('-').map((s) => Number(s));
    start = a;
    end = b;
  } else {
    start = end = Number(rangeStr);
  }
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    throw new Error(`parseLevel: ゲート範囲が不正です '${rangeStr}'`);
  }
  return { edge, start, end, color };
}
