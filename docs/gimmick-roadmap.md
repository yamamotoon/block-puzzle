# ギミック追加ロードマップ（Color Block Jam Web）

別セッションで作業を再開するための計画と注意点。

## 大原則（最重要）
- 本プロジェクトの強みは **ソルバーで「解ける保証」＋自動生成**。
- **ギミックは core と solver の両方に実装しないと生成・検証が壊れる**。
- solver を単純に保つため、ギミックのルールは **「盤面の状態だけで決まる（state-pure）」** 形にする。
  手数や時間に依存させない（探索が重くなる）。

## ギミック仕様（決定済み）
| ギミック | 状態 | ルール（state-pure） |
|---|---|---|
| 固定ブロック | ✅実装済 (World2) | 動かせない障害物。脱出せず、クリア判定から除外。`BlockDef.fixed` |
| 氷 | ⬜次にやる (World3) | **他ブロックがT体脱出すると解凍**（＝進めると溶ける）。「exited数 ≥ T」で可動＝状態の関数 |
| 鍵/ロック | ⬜未 (World4) | **対応する鍵ブロックが脱出するまでゲートが使えない**。`gate.lockedBy = keyBlockId`。key.removed で開く |
| 複合＋大盤 | ⬜未 (World5) | 上記の組合せ、7x7〜8x8、手数上限を上げる |

## ワールド構成・レベル量（目標 計50前後、各ギミック +10）
- World 1 (1-20)：基本、5x5〜6x6 … ✅
- World 2 (21-30)：固定ブロック、6x6 … ✅（手数 3→11）
- World 3 (31-40)：氷 … ⬜
- World 4 (41-50)：鍵/ロック … ⬜
- World 5：複合＋大盤（余力があれば）… ⬜

盤面拡張はカメラが自動フィットするので描画OK。solver は盤が大きいほど重い → 生成時は `maxExpanded` で頭打ち。

## 次の実装（氷 / World3）チェックリスト
固定ブロックと同じく一巡させる：
1. **types**: `BlockDef.iceUntil?: number`（T体脱出するまで動かせない）
2. **game.ts**: 「解凍済みか」= `(総ブロック数 - 残り) >= iceUntil` の判定を追加。掴む/移動の可否に反映（state-pure）
3. **solver.ts**: 各状態で「exited数（= 全可動数 - 現在の可動残数、または removed 数）≥ iceUntil なら可動」を反映。
   未解凍の氷ブロックは reachable 対象から外し、静的障害物として占有に含める（＝可動になったら対象へ）。
   ※ 固定ブロックの `fixedCells` 実装が参考になる（solver.ts）
4. **level-format.ts**: 氷の盤面表記。氷は「色＋解凍しきい値」が要るので、grid では色文字のまま置き、
   **`ice:` セクションを追加**して `ice: <col> <row> <T>`（対象セルとT）で指定する等。往復（parse/levelToText）も対応
5. **validate.ts**: 氷ブロックも「幅の合う同色ゲートが必要」（脱出する）。初期解凍済みで即脱出可能な配置に注意
6. **render/three.ts**: 氷は半透明の氷カバー（水色・透明度）＋（任意で）ヒビ表現。解凍後は通常表示
7. **main.ts**: 未解凍の氷は掴めない（掴もうとしたら不可のフィードバック）
8. **generate.ts**: `iceBlocks` オプション。氷にする movable ブロックとしきい値Tを設定
9. **tests**: ice.test（parse往復・解凍判定・solver・生成）
10. **levels**: World3 を +10 生成して 31-40 に **追記**（下の注意参照）

## 生成・レベル追記の注意（今回ハマった点）
- **オフライン生成は重い**。大きい pool × 高い `maxExpanded` は数分かかりタイムアウトする。
  → pool は数百〜1500程度、`maxExpanded` は 10000〜15000 程度に抑える。
- **World1 は seed 固定で再現可能だが再生成は遅い**。→ 既存 world は再生成せず、
  **新 world だけ生成して levels.ts に追記**する。
- **一時 writer テスト（`_*.test.ts`）を必ず削除してから `npm test` する**。
  kill された生成 writer が残ると、次の `npm test` で再実行され levels.ts を上書き・長時間化する事故が起きた。
- **levels.ts は CRLF**。手Editでの末尾一致が外れやすい。追記は
  「一時 `_world2.gen.txt` に新worldブロックを書く → 小さな fs-append テストで最後の `];` 直前に挿入」
  が確実（今回この方式で成功）。
- 追記後は **tsc → npm test → build** で 30/40/50 レベルの可解性・健全性・解答再生クリアを確認。

## 現状の主要ファイル
- ロジック: `src/core/game.ts`, `solver.ts`, `generate.ts`, `validate.ts`, `level-format.ts`, `levels.ts`, `types.ts`
- 描画: `src/render/three.ts`（ギミックの見た目はここ）
- 結線/UI: `src/main.ts`, `index.html`
- 生成の実行方法: vitest で一時テストを書き `writeFileSync` する（`vite-node`/`tsx` は未導入）

## 難易度キュレーションの使い分け
- 通常ブロックの world：`pickProgression`（extra≥1 で「どかし」必須、易しい入口つき）
- 固定/氷など障害物系：`pickRampTargets(..., minExtra=0)`（extra=0 でも障害物回避がパズルになるため）
