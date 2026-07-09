import type { Game, Block } from '../core/game';
import type { Cell, ColorId, Edge, Gate } from '../core/types';
import { COLORS, type DragRenderState, type ExitEffect, type Renderer } from './renderer';

const EXIT_SLIDE_CELLS = 3; // 脱出時に滑り出す距離（セル）

const EDGE_DIR: Record<Edge, { c: number; r: number }> = {
  top: { c: 0, r: -1 },
  bottom: { c: 0, r: 1 },
  left: { c: -1, r: 0 },
  right: { c: 1, r: 0 },
};

interface Layout {
  cell: number;
  originX: number; // 盤面左上の x（CSS px）
  originY: number; // 盤面左上の y（CSS px）
  border: number; // ゲート帯の厚み（CSS px）
}

const PAD = 12;
const BORDER_RATIO = 0.55; // ゲート帯の厚み（セル単位）

/** Canvas 2D による描画実装。論理グリッドを平面として描く。 */
export class Canvas2DRenderer implements Renderer {
  private ctx: CanvasRenderingContext2D;
  private cssW = 0;
  private cssH = 0;
  private dpr = 1;
  private layout: Layout = { cell: 1, originX: 0, originY: 0, border: 0 };
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D context を取得できませんでした');
    this.ctx = ctx;
  }

  resize(cssWidth: number, cssHeight: number, dpr: number): void {
    this.cssW = cssWidth;
    this.cssH = cssHeight;
    this.dpr = dpr;
    this.canvas.width = Math.round(cssWidth * dpr);
    this.canvas.height = Math.round(cssHeight * dpr);
    this.canvas.style.width = `${cssWidth}px`;
    this.canvas.style.height = `${cssHeight}px`;
  }

  private computeLayout(game: Game): Layout {
    const { cols, rows } = game;
    const availW = this.cssW - 2 * PAD;
    const availH = this.cssH - 2 * PAD;
    const cell = Math.floor(
      Math.min(availW / (cols + 2 * BORDER_RATIO), availH / (rows + 2 * BORDER_RATIO)),
    );
    const border = cell * BORDER_RATIO;
    const totalW = cols * cell + 2 * border;
    const totalH = rows * cell + 2 * border;
    const originX = (this.cssW - totalW) / 2 + border;
    const originY = (this.cssH - totalH) / 2 + border;
    return { cell, originX, originY, border };
  }

  pixelToCell(x: number, y: number): Cell {
    const f = this.pixelToCellF(x, y);
    return { c: Math.floor(f.c), r: Math.floor(f.r) };
  }

  pixelToCellF(x: number, y: number): { c: number; r: number } {
    const { cell, originX, originY } = this.layout;
    return { c: (x - originX) / cell, r: (y - originY) / cell };
  }

  render(game: Game, drag: DragRenderState | null, effects: ExitEffect[]): void {
    const ctx = this.ctx;
    this.layout = this.computeLayout(game);
    const { cell, originX, originY, border } = this.layout;

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.cssW, this.cssH);

    const boardW = game.cols * cell;
    const boardH = game.rows * cell;

    // 盤面の外枠（ゲート帯を含む領域）
    this.roundRect(
      originX - border,
      originY - border,
      boardW + 2 * border,
      boardH + 2 * border,
      Math.min(border, 16),
    );
    ctx.fillStyle = '#2a2f42';
    ctx.fill();

    // 盤面の下地
    ctx.fillStyle = '#1b1e2b';
    ctx.fillRect(originX, originY, boardW, boardH);

    // グリッド線
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let c = 0; c <= game.cols; c++) {
      const x = originX + c * cell;
      ctx.moveTo(x, originY);
      ctx.lineTo(x, originY + boardH);
    }
    for (let r = 0; r <= game.rows; r++) {
      const y = originY + r * cell;
      ctx.moveTo(originX, y);
      ctx.lineTo(originX + boardW, y);
    }
    ctx.stroke();

    // ゲート
    for (const gate of game.gates) this.drawGate(game, gate);

    // ブロック（ドラッグ中のものは最後に、オフセット付きで上に描く）
    for (const block of game.blocks) {
      if (block.removed || block.id === drag?.blockId) continue;
      this.drawBlock(block, false, 0, 0);
    }
    if (drag) {
      const dragged = game.blocks.find((b) => b.id === drag.blockId);
      if (dragged && !dragged.removed) this.drawBlock(dragged, true, drag.offC, drag.offR);
    }

    // 脱出演出（ゲート方向へ滑り出しつつフェード）
    for (const fx of effects) this.drawEffect(fx);
  }

  private drawEffect(fx: ExitEffect): void {
    const { cell } = this.layout;
    const dir = EDGE_DIR[fx.edge];
    const slide = fx.progress * EXIT_SLIDE_CELLS;
    const ox = (fx.baseOffC + dir.c * slide) * cell;
    const oy = (fx.baseOffR + dir.r * slide) * cell;
    this.drawCells(fx.cells, fx.color, ox, oy, 1 - fx.progress, false);
  }

  private drawGate(game: Game, gate: Gate): void {
    const ctx = this.ctx;
    const { cell, originX, originY, border } = this.layout;
    const boardW = game.cols * cell;
    const boardH = game.rows * cell;
    const col = COLORS[gate.color];
    const span = gate.end - gate.start + 1;
    const inset = 4;

    let x = 0;
    let y = 0;
    let w = 0;
    let h = 0;
    switch (gate.edge) {
      case 'top':
        x = originX + gate.start * cell;
        y = originY - border;
        w = span * cell;
        h = border;
        break;
      case 'bottom':
        x = originX + gate.start * cell;
        y = originY + boardH;
        w = span * cell;
        h = border;
        break;
      case 'left':
        x = originX - border;
        y = originY + gate.start * cell;
        w = border;
        h = span * cell;
        break;
      case 'right':
        x = originX + boardW;
        y = originY + gate.start * cell;
        w = border;
        h = span * cell;
        break;
    }
    this.roundRect(x + inset / 2, y + inset / 2, w - inset, h - inset, 6);
    ctx.fillStyle = col.base;
    ctx.fill();
    // 出口の口を表す明るいライン
    ctx.fillStyle = col.light;
    const lip = Math.max(3, border * 0.18);
    if (gate.edge === 'top') ctx.fillRect(x + inset, y + h - lip, w - 2 * inset, lip);
    else if (gate.edge === 'bottom') ctx.fillRect(x + inset, y, w - 2 * inset, lip);
    else if (gate.edge === 'left') ctx.fillRect(x + w - lip, y + inset, lip, h - 2 * inset);
    else ctx.fillRect(x, y + inset, lip, h - 2 * inset);
  }

  private drawBlock(block: Block, dragging: boolean, offC: number, offR: number): void {
    const { cell } = this.layout;
    this.drawCells(block.cells, block.color, offC * cell, offR * cell, 1, dragging);
  }

  /** セル集合を 1 つのブロックとして描く。ox/oy はピクセル単位のオフセット。 */
  private drawCells(
    cells: Cell[],
    color: ColorId,
    ox: number,
    oy: number,
    alpha: number,
    dragging: boolean,
  ): void {
    const ctx = this.ctx;
    const { cell, originX, originY } = this.layout;
    const col = COLORS[color];
    const key = (c: number, r: number) => `${c},${r}`;
    const set = new Set(cells.map((c) => key(c.c, c.r)));

    ctx.save();
    ctx.globalAlpha = alpha;
    if (dragging) {
      ctx.shadowColor = 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 6;
    }

    // セルを塗る（同一ブロックは隙間なく連結して見せる）
    for (const c of cells) {
      const x = originX + c.c * cell + ox;
      const y = originY + c.r * cell + oy;
      const grad = ctx.createLinearGradient(x, y, x, y + cell);
      grad.addColorStop(0, col.light);
      grad.addColorStop(1, col.base);
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, cell, cell);
    }

    // 外周だけ濃いフチを描く（同ブロックのセル境界には引かない）
    ctx.strokeStyle = col.dark;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (const c of cells) {
      const x = originX + c.c * cell + ox;
      const y = originY + c.r * cell + oy;
      if (!set.has(key(c.c, c.r - 1))) { ctx.moveTo(x, y); ctx.lineTo(x + cell, y); }
      if (!set.has(key(c.c, c.r + 1))) { ctx.moveTo(x, y + cell); ctx.lineTo(x + cell, y + cell); }
      if (!set.has(key(c.c - 1, c.r))) { ctx.moveTo(x, y); ctx.lineTo(x, y + cell); }
      if (!set.has(key(c.c + 1, c.r))) { ctx.moveTo(x + cell, y); ctx.lineTo(x + cell, y + cell); }
    }
    ctx.stroke();
    ctx.restore();
  }

  private roundRect(x: number, y: number, w: number, h: number, r: number): void {
    const ctx = this.ctx;
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }
}
