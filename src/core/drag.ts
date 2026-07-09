import type { Game, Block } from './game';
import type { Cell, ColorId, Edge } from './types';

// ドラッグ中の連続（サブセル）移動と衝突解決。描画には依存しない。
// コア（game.ts）は整数グリッドのまま保ち、ここで「離すまでの中間状態」を
// 浮動小数オフセットとして扱う。離した時点でグリッドにスナップする。
//
// 盤面の境界は常に「壁」で、ブロックはすり抜けない。
// 対応色ゲートに「接して（隣接して）」かつゲート幅に「揃った」瞬間に
// 自動で脱出する（押し込み操作は不要）。整合判定は確定位置ではなく
// 「確定＋オフセットの実際の位置」で行う。

const EPS = 1e-4;
const STEP = 0.05; // 連続移動のサブステップ幅（セル単位）
const FLUSH = 0.1; // ゲート辺にこの距離まで近づいたら「隣接」とみなす（> STEP）

export type ReleaseResult = 'exit' | 'snap';

export class DragController {
  /** committed セル位置からの連続オフセット（セル単位）。 */
  offC = 0;
  offR = 0;
  exited = false;
  exitEdge: Edge | null = null;

  private game: Game;
  private block: Block;
  private baseGrabC: number;
  private baseGrabR: number;
  private grabFracC: number;
  private grabFracR: number;

  constructor(game: Game, block: Block, pointerC: number, pointerR: number) {
    this.game = game;
    this.block = block;
    this.baseGrabC = Math.floor(pointerC);
    this.baseGrabR = Math.floor(pointerR);
    this.grabFracC = pointerC - this.baseGrabC;
    this.grabFracR = pointerR - this.baseGrabR;
  }

  get blockId(): string {
    return this.block.id;
  }

  /** ポインタ位置（連続セル座標）に追従して移動を解決する。 */
  moveTo(pointerC: number, pointerR: number): void {
    if (this.exited) return;
    const targetC = pointerC - this.baseGrabC - this.grabFracC;
    const targetR = pointerR - this.baseGrabR - this.grabFracR;
    const obstacles = this.obstacles();
    this.offC = this.sweep(true, targetC, obstacles);
    this.offR = this.sweep(false, targetR, obstacles);
    this.checkExit();
  }

  /**
   * 指を離したときの確定処理。まずグリッドへスナップし、その確定位置で脱出判定する。
   * （スナップでゲート際に吸着したケースも拾うため、判定はスナップ後に行う）
   */
  release(): ReleaseResult {
    if (this.exited) return 'exit';
    this.snap();
    if (this.checkExit()) return 'exit';
    return 'snap';
  }

  private obstacles(): Array<{ c: number; r: number }> {
    const out: Array<{ c: number; r: number }> = [];
    for (const b of this.game.blocks) {
      if (b === this.block || b.removed) continue;
      for (const cell of b.cells) out.push(cell);
    }
    return out;
  }

  /**
   * 指定した辺を、その辺に沿った座標 coord（セルの手前側の端の位置）で
   * ブロックが越えられるか。同色ゲートがそのセル 1 マス分を完全に覆う場合のみ true。
   * left/right は coord=行の float 位置、top/bottom は coord=列の float 位置。
   */
  private crossable(edge: Edge, coord: number): boolean {
    for (const g of this.game.gates) {
      if (g.color !== this.block.color || g.edge !== edge) continue;
      // セルは [coord, coord+1] を占有する。ゲートは行/列 [start, end]（= 座標 [start, end+1]）。
      // セル全体が開口に収まる条件: start <= coord かつ coord+1 <= end+1
      if (coord >= g.start - EPS && coord <= g.end + EPS) return true;
    }
    return false;
  }

  private valid(offC: number, offR: number, obstacles: Array<{ c: number; r: number }>): boolean {
    const { cols, rows } = this.game;
    for (const cell of this.block.cells) {
      const bx = cell.c + offC;
      const by = cell.r + offR;
      // 壁（すべての辺で貫通不可。脱出は checkExit の隣接判定で行う）
      if (bx < -EPS) return false;
      if (bx + 1 > cols + EPS) return false;
      if (by < -EPS) return false;
      if (by + 1 > rows + EPS) return false;
      // 他ブロックとの重なり（接触は可）
      for (const o of obstacles) {
        if (bx < o.c + 1 - EPS && bx + 1 > o.c + EPS && by < o.r + 1 - EPS && by + 1 > o.r + EPS) {
          return false;
        }
      }
    }
    return true;
  }

  /** 1 軸だけを目標へサブステップで進め、衝突直前で止めた到達オフセットを返す。 */
  private sweep(isC: boolean, target: number, obstacles: Array<{ c: number; r: number }>): number {
    let next = isC ? this.offC : this.offR;
    if (Math.abs(target - next) < EPS) return next;
    const dir = target > next ? 1 : -1;
    let guard = 0;
    while (Math.abs(target - next) > EPS && guard++ < 10000) {
      const stepAmt = Math.min(STEP, Math.abs(target - next)) * dir;
      const cand = next + stepAmt;
      const okC = isC ? cand : this.offC;
      const okR = isC ? this.offR : cand;
      if (this.valid(okC, okR, obstacles)) next = cand;
      else break;
    }
    return next;
  }

  /** はみ出している各セルがすべてゲート開口を通っているか（辺ごと）。 */
  private crossingAll(edge: Edge): boolean {
    for (const cell of this.block.cells) {
      const coord = edge === 'left' || edge === 'right' ? cell.r + this.offR : cell.c + this.offC;
      if (!this.crossable(edge, coord)) return false;
    }
    return true;
  }

  private checkExit(): boolean {
    const { cols, rows } = this.game;
    let bxMin = Infinity;
    let bxMax = -Infinity;
    let byMin = Infinity;
    let byMax = -Infinity;
    for (const cell of this.block.cells) {
      const bx = cell.c + this.offC;
      const by = cell.r + this.offR;
      if (bx < bxMin) bxMin = bx;
      if (bx > bxMax) bxMax = bx;
      if (by < byMin) byMin = by;
      if (by > byMax) byMax = by;
    }
    // 対応色ゲートの辺に隣接（FLUSH 以内）し、かつゲート幅に揃っていれば脱出。
    let edge: Edge | null = null;
    if (bxMax + 1 >= cols - FLUSH && this.crossingAll('right')) edge = 'right';
    else if (bxMin <= FLUSH && this.crossingAll('left')) edge = 'left';
    else if (byMin <= FLUSH && this.crossingAll('top')) edge = 'top';
    else if (byMax + 1 >= rows - FLUSH && this.crossingAll('bottom')) edge = 'bottom';
    if (edge) {
      this.exited = true;
      this.exitEdge = edge;
      this.block.removed = true;
    }
    return edge !== null;
  }

  /** 脱出演出に必要な、掴んでいるブロックの現在スナップショット。 */
  snapshot(): { cells: Cell[]; color: ColorId; offC: number; offR: number } {
    return {
      cells: this.block.cells.map((c) => ({ ...c })),
      color: this.block.color,
      offC: this.offC,
      offR: this.offR,
    };
  }

  /** 最も近い、移動可能な整数セルへ確定する。 */
  private snap(): void {
    const cs = new Set([Math.floor(this.offC), Math.ceil(this.offC), Math.round(this.offC)]);
    const rs = new Set([Math.floor(this.offR), Math.ceil(this.offR), Math.round(this.offR)]);
    const candidates: Array<[number, number]> = [];
    for (const dc of cs) for (const dr of rs) candidates.push([dc, dr]);
    candidates.sort(
      (a, b) =>
        (a[0] - this.offC) ** 2 + (a[1] - this.offR) ** 2 -
        ((b[0] - this.offC) ** 2 + (b[1] - this.offR) ** 2),
    );
    for (const [dc, dr] of candidates) {
      if (this.game.applyMove(this.block, dc, dr)) break;
    }
    this.offC = 0;
    this.offR = 0;
  }
}
