import type { Game } from '../core/game';
import type { Cell, ColorId, Edge } from '../core/types';

/**
 * 描画層の抽象。ゲームループ・入力層はこのインターフェースだけに依存する。
 * 2D → 3D 移行時は、この実装を Canvas2DRenderer から ThreeRenderer に
 * 差し替えるだけでよい（コア／入力ロジックは不変）。
 */
/** ドラッグ中ブロックの連続オフセット（セル単位）を描画へ渡すための状態。 */
export interface DragRenderState {
  blockId: string;
  offC: number;
  offR: number;
}

/** ゲートへ吸い込まれて消える最中のブロック（論理上は削除済みのゴースト）。 */
export interface ExitEffect {
  cells: Cell[];
  color: ColorId;
  edge: Edge; // 脱出方向
  baseOffC: number; // 脱出開始時のドラッグオフセット
  baseOffR: number;
  progress: number; // 0..1
}

export interface Renderer {
  /** 表示領域サイズが変わったときに呼ぶ（CSS ピクセル + devicePixelRatio）。 */
  resize(cssWidth: number, cssHeight: number, dpr: number): void;

  /** 現在のゲーム状態を 1 フレーム描画する。drag は掴んでいるブロックの連続位置、effects は脱出中の演出。 */
  render(game: Game, drag: DragRenderState | null, effects: ExitEffect[]): void;

  /**
   * 画面上の座標（キャンバス左上基準の CSS ピクセル）を論理グリッドセルに変換する。
   * 盤外を指す場合は範囲外のセル値を返しうる（端のゲートへ押し出すため）。
   * ※ 2D と 3D で実装が異なる唯一の入力側の関心事。
   */
  pixelToCell(x: number, y: number): Cell;

  /** 同上だが連続（小数）セル座標を返す。ドラッグの追従に使う。 */
  pixelToCellF(x: number, y: number): { c: number; r: number };
}

/** 色定義（fill と、簡易な陰影用の明/暗）。3D 化時もこの色は流用できる。 */
export const COLORS: Record<ColorId, { base: string; light: string; dark: string }> = {
  red: { base: '#e5484d', light: '#f2686c', dark: '#b83338' },
  blue: { base: '#3e63dd', light: '#6485ee', dark: '#2c49ab' },
  green: { base: '#30a46c', light: '#4bc088', dark: '#217a4f' },
  yellow: { base: '#f0c000', light: '#ffd83a', dark: '#c29a00' },
  purple: { base: '#8e4ec6', light: '#a96fdb', dark: '#6d3a9c' },
  orange: { base: '#f76b15', light: '#ff8a40', dark: '#c85306' },
};
