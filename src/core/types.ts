// 描画に一切依存しない純粋なドメイン型。
// 論理座標は常に 2D グリッドの (c, r) = (列, 行)。
// この層は 2D でも 3D でも変更されない。

export type ColorId =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'orange';

/** グリッド上のセル位置。c = 列(x), r = 行(y)。 */
export interface Cell {
  c: number;
  r: number;
}

/** 盤面のどの辺にゲートがあるか。 */
export type Edge = 'top' | 'bottom' | 'left' | 'right';

/**
 * 色付きゲート（出口）。辺に沿って [start, end]（両端含む）の範囲を占める。
 * top/bottom は列インデックス、left/right は行インデックスで範囲を表す。
 */
export interface Gate {
  edge: Edge;
  start: number;
  end: number;
  color: ColorId;
}

/** レベル定義中のブロック（絶対セル座標で形状を持つ）。 */
export interface BlockDef {
  id: string;
  color: ColorId;
  cells: Cell[];
}

/** 1 ステージの定義。 */
export interface Level {
  cols: number;
  rows: number;
  blocks: BlockDef[];
  gates: Gate[];
}
