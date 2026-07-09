# Color Block Jam (Web)

色付きブロックを同じ色のゲートへドラッグして消していくパズルゲームの Web 版。

## 遊び方
- ブロックをドラッグして動かす（他ブロック・壁はすり抜け不可）。
- ブロックを**同じ色のゲート**に押し当てると吸い込まれて消える。
- 盤面のブロックを全部消すとクリア。

## 開発
```bash
npm install
npm run dev      # 開発サーバ（http://localhost:5173）
npm test         # コアロジックのテスト
npm run build    # 本番ビルド
```

## 設計方針：2D → 3D 移行を見据えた分離
本家 Color Block Jam は 3D 見た目だが、**ゲームロジックは完全に 2D グリッド**（平面上の移動のみ）。
そのため描画に依存しないコアと、差し替え可能な描画層に分離している。

```
src/
  core/          純粋 TypeScript・描画非依存（2D/3D で不変）
    types.ts       ドメイン型（論理座標は常に (c, r)）
    game.ts        移動・衝突・ゲート判定・クリア判定
    levels.ts      レベル定義
  render/
    renderer.ts    Renderer インターフェース（3D 移行の継ぎ目）
    canvas2d.ts    Canvas 2D 実装（現行）
                   ※ 3D 化時は ThreeRenderer を足して差し替えるだけ
  main.ts        入力・ゲームループの結線
```

**3D 移行時に変わるのは描画層と入力の座標変換（`pixelToCell`）のみ。**
`core/` のロジックとテストは一切変更不要。
