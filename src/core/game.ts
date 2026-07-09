import type { Level, BlockDef, Cell, Gate } from './types';
import { validateLevel } from './validate';

/** 実行時のブロック状態（レベル定義 + 消去フラグ）。 */
export interface Block extends BlockDef {
  cells: Cell[];
  removed: boolean;
}

function key(c: number, r: number): string {
  return `${c},${r}`;
}

/**
 * ゲームのコアロジック。純粋な 2D グリッド演算のみを行い、描画・入力・DOM に依存しない。
 * 3D 化しても、この層は一切変更する必要がない。
 */
export class Game {
  readonly cols: number;
  readonly rows: number;
  readonly blocks: Block[];
  readonly gates: Gate[];

  constructor(level: Level) {
    const issues = validateLevel(level);
    if (issues.errors.length > 0) {
      throw new Error(`不正なレベル定義:\n- ${issues.errors.join('\n- ')}`);
    }
    for (const w of issues.warnings) console.warn(`[level] ${w}`);

    this.cols = level.cols;
    this.rows = level.rows;
    this.gates = level.gates.map((g) => ({ ...g }));
    this.blocks = level.blocks.map((b) => ({
      id: b.id,
      color: b.color,
      cells: b.cells.map((c) => ({ ...c })),
      removed: false,
    }));
  }

  /** 指定ブロックを除いた占有セル → ブロックのマップ。 */
  private occupancy(exclude?: Block): Map<string, Block> {
    const map = new Map<string, Block>();
    for (const b of this.blocks) {
      if (b.removed || b === exclude) continue;
      for (const cell of b.cells) map.set(key(cell.c, cell.r), b);
    }
    return map;
  }

  /** そのセルにある（消えていない）ブロックを返す。 */
  blockAt(c: number, r: number): Block | undefined {
    for (const b of this.blocks) {
      if (b.removed) continue;
      if (b.cells.some((cell) => cell.c === c && cell.r === r)) return b;
    }
    return undefined;
  }

  /** ブロックを (dc, dr) だけ動かせるか（盤内かつ他ブロックと重ならないか）。 */
  canMoveTo(block: Block, dc: number, dr: number): boolean {
    const occ = this.occupancy(block);
    for (const cell of block.cells) {
      const nc = cell.c + dc;
      const nr = cell.r + dr;
      if (nc < 0 || nc >= this.cols || nr < 0 || nr >= this.rows) return false;
      if (occ.has(key(nc, nr))) return false;
    }
    return true;
  }

  private translate(block: Block, dc: number, dr: number): void {
    for (const cell of block.cells) {
      cell.c += dc;
      cell.r += dr;
    }
  }

  /** 整数デルタでの移動が可能なら確定して true。スナップ確定に使う。 */
  applyMove(block: Block, dc: number, dr: number): boolean {
    if (!this.canMoveTo(block, dc, dr)) return false;
    this.translate(block, dc, dr);
    return true;
  }

  /**
   * ブロックを目標デルタ (totalDc, totalDr) に向けて、1 セルずつ可能な限り近づける。
   * 障害物に当たったらそこで止まる（すり抜けない）。
   */
  moveToward(block: Block, totalDc: number, totalDr: number): void {
    let remDc = totalDc;
    let remDr = totalDr;
    let moved = true;
    while ((remDc !== 0 || remDr !== 0) && moved) {
      moved = false;
      // 残り距離が大きい軸を優先して試す。
      const axes: Array<[number, number]> = [];
      const stepC: [number, number] = [Math.sign(remDc), 0];
      const stepR: [number, number] = [0, Math.sign(remDr)];
      if (Math.abs(remDc) >= Math.abs(remDr)) {
        if (remDc !== 0) axes.push(stepC);
        if (remDr !== 0) axes.push(stepR);
      } else {
        if (remDr !== 0) axes.push(stepR);
        if (remDc !== 0) axes.push(stepC);
      }
      for (const [sc, sr] of axes) {
        if (this.canMoveTo(block, sc, sr)) {
          this.translate(block, sc, sr);
          remDc -= sc;
          remDr -= sr;
          moved = true;
          break;
        }
      }
    }
  }

  /** ブロックが同色ゲートに収まって出られる状態なら消去し、true を返す。 */
  tryExit(block: Block): boolean {
    if (block.removed) return false;
    for (const gate of this.gates) {
      if (gate.color !== block.color) continue;
      if (this.fitsGate(block, gate)) {
        block.removed = true;
        return true;
      }
    }
    return false;
  }

  /** ブロックがゲートに接し、かつゲート幅に収まっているか。 */
  fitsGate(block: Block, gate: Gate): boolean {
    let minC = Infinity;
    let maxC = -Infinity;
    let minR = Infinity;
    let maxR = -Infinity;
    for (const cell of block.cells) {
      if (cell.c < minC) minC = cell.c;
      if (cell.c > maxC) maxC = cell.c;
      if (cell.r < minR) minR = cell.r;
      if (cell.r > maxR) maxR = cell.r;
    }
    switch (gate.edge) {
      case 'top':
        return minR === 0 && minC >= gate.start && maxC <= gate.end;
      case 'bottom':
        return maxR === this.rows - 1 && minC >= gate.start && maxC <= gate.end;
      case 'left':
        return minC === 0 && minR >= gate.start && maxR <= gate.end;
      case 'right':
        return maxC === this.cols - 1 && minR >= gate.start && maxR <= gate.end;
    }
  }

  /** 全ブロックが消えていればクリア。 */
  isCleared(): boolean {
    return this.blocks.every((b) => b.removed);
  }
}
