import type { Level, BlockDef, Gate } from './types';

export interface LevelIssues {
  errors: string[]; // これがあるとレベルは成立しない
  warnings: string[]; // 遊べるが設計上の注意
}

function blockSpan(b: BlockDef) {
  let cMin = Infinity;
  let cMax = -Infinity;
  let rMin = Infinity;
  let rMax = -Infinity;
  for (const cell of b.cells) {
    if (cell.c < cMin) cMin = cell.c;
    if (cell.c > cMax) cMax = cell.c;
    if (cell.r < rMin) rMin = cell.r;
    if (cell.r > rMax) rMax = cell.r;
  }
  return { cMin, cMax, rMin, rMax };
}

/** ブロックが「初期状態ですでに同色ゲートに接して揃っている」か（掴んだ瞬間に脱出できてしまう）。 */
function alreadyExitable(b: BlockDef, gate: Gate, cols: number, rows: number): boolean {
  if (gate.color !== b.color) return false;
  const { cMin, cMax, rMin, rMax } = blockSpan(b);
  switch (gate.edge) {
    case 'top':
      return rMin === 0 && cMin >= gate.start && cMax <= gate.end;
    case 'bottom':
      return rMax === rows - 1 && cMin >= gate.start && cMax <= gate.end;
    case 'left':
      return cMin === 0 && rMin >= gate.start && rMax <= gate.end;
    case 'right':
      return cMax === cols - 1 && rMin >= gate.start && rMax <= gate.end;
  }
}

/** ブロックが幅の合う同色ゲートを 1 つでも持つか（＝原理的に脱出可能か）。 */
function hasUsableGate(b: BlockDef, gates: Gate[]): boolean {
  const { cMin, cMax, rMin, rMax } = blockSpan(b);
  const wCols = cMax - cMin + 1;
  const wRows = rMax - rMin + 1;
  return gates.some((g) => {
    if (g.color !== b.color) return false;
    const span = g.end - g.start + 1;
    const need = g.edge === 'top' || g.edge === 'bottom' ? wCols : wRows;
    return span >= need;
  });
}

export function validateLevel(level: Level): LevelIssues {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { cols, rows, blocks, gates } = level;

  if (cols <= 0 || rows <= 0) errors.push(`盤面サイズが不正: ${cols}x${rows}`);

  // セルの範囲・重複・ブロック間の重なり
  const occupied = new Map<string, string>();
  for (const b of blocks) {
    if (b.cells.length === 0) errors.push(`ブロック ${b.id} にセルがありません`);
    const seen = new Set<string>();
    for (const cell of b.cells) {
      const k = `${cell.c},${cell.r}`;
      if (cell.c < 0 || cell.c >= cols || cell.r < 0 || cell.r >= rows) {
        errors.push(`ブロック ${b.id} のセル (${cell.c},${cell.r}) が盤外`);
      }
      if (seen.has(k)) errors.push(`ブロック ${b.id} 内でセル (${cell.c},${cell.r}) が重複`);
      seen.add(k);
      const owner = occupied.get(k);
      if (owner) errors.push(`セル (${cell.c},${cell.r}) がブロック ${owner} と ${b.id} で重なっています`);
      else occupied.set(k, b.id);
    }
  }

  // ゲートの範囲
  for (const g of gates) {
    const axisMax = g.edge === 'top' || g.edge === 'bottom' ? cols - 1 : rows - 1;
    if (g.start > g.end) errors.push(`ゲート(${g.edge},${g.color}) の start>end`);
    if (g.start < 0 || g.end > axisMax) {
      errors.push(`ゲート(${g.edge},${g.color}) の範囲 [${g.start},${g.end}] が辺からはみ出しています`);
    }
  }

  // 設計上の注意（警告）。固定ブロックは脱出しないのでゲート関連はスキップ。
  for (const b of blocks) {
    if (b.fixed) continue;
    if (!hasUsableGate(b, gates)) {
      warnings.push(`ブロック ${b.id}(${b.color}) は幅の合う同色ゲートが無く、脱出できません`);
    }
    for (const g of gates) {
      if (alreadyExitable(b, g, cols, rows)) {
        warnings.push(`ブロック ${b.id}(${b.color}) は初期位置ですでに ${g.edge} ゲートから脱出可能です`);
      }
    }
  }
  const blockColors = new Set(blocks.filter((b) => !b.fixed).map((b) => b.color));
  for (const g of gates) {
    if (!blockColors.has(g.color)) {
      warnings.push(`ゲート(${g.edge},${g.color}) に対応するブロックがありません`);
    }
  }

  return { errors, warnings };
}
