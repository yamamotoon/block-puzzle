import type { Game, Block } from './game';
import type { Cell, ColorId, Edge } from './types';

// グリッドロック方式のドラッグ制御。描画には依存しない。
// 論理位置は常に整数セル。ドラッグ中は「掴んだセルをポインタ直下のマスへ寄せる」
// だけを行い、実移動は game.moveToward（1 マスずつ・角も回り込む衝突解決）に委譲する。
// 見た目の滑らかさは描画側のイージング補間で出す（ここではサブセル位置を持たない）。

export type ReleaseResult = 'exit' | 'snap';

export class DragController {
  // 描画インターフェース互換のため保持（グリッドロックでは常に 0）。
  readonly offC = 0;
  readonly offR = 0;
  exited = false;
  exitEdge: Edge | null = null;

  private game: Game;
  private block: Block;
  private grabCell: Cell; // block.cells 内の参照。移動で座標が追従する。
  private grabFracC: number;
  private grabFracR: number;

  constructor(game: Game, block: Block, pointerC: number, pointerR: number) {
    this.game = game;
    this.block = block;
    const gc = Math.floor(pointerC);
    const gr = Math.floor(pointerR);
    this.grabFracC = pointerC - gc;
    this.grabFracR = pointerR - gr;
    this.grabCell = block.cells.find((c) => c.c === gc && c.r === gr) ?? block.cells[0];
  }

  get blockId(): string {
    return this.block.id;
  }

  /** ポインタ位置（連続セル座標）に応じて、掴んだセルをその直下のマスへ寄せる。 */
  moveTo(pointerC: number, pointerR: number): void {
    if (this.exited) return;
    const wantC = Math.round(pointerC - this.grabFracC);
    const wantR = Math.round(pointerR - this.grabFracR);
    const dc = wantC - this.grabCell.c;
    const dr = wantR - this.grabCell.r;
    if (dc !== 0 || dr !== 0) this.game.moveToward(this.block, dc, dr);
    this.tryExit();
  }

  /** 指を離したときの確定処理（論理位置は既に整数なのでスナップ不要）。 */
  release(): ReleaseResult {
    if (this.exited) return 'exit';
    return this.tryExit() ? 'exit' : 'snap';
  }

  private tryExit(): boolean {
    const gate = this.game.findExitGate(this.block);
    if (!gate) return false;
    this.exited = true;
    this.exitEdge = gate.edge;
    this.block.removed = true;
    return true;
  }

  /** 脱出演出に必要な、掴んでいるブロックのスナップショット。 */
  snapshot(): { cells: Cell[]; color: ColorId; offC: number; offR: number } {
    return {
      cells: this.block.cells.map((c) => ({ ...c })),
      color: this.block.color,
      offC: 0,
      offR: 0,
    };
  }
}
