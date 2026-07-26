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

## ワールド構成・レベル量（1ワールド=30スロット×3バリエーション、目標 計120スロット/約360盤面）
30問だけだと数周で全部覚えてしまう問題があったため、「1レベル＝1固定盤面」をやめ、
「1レベル＝同難易度の複数バリエーションの束（スロット）」にして `main.ts` でランダムに1枚選ぶ方式にした
（`LEVEL_SLOTS: Level[][]`、詳細は `generate.ts` の `fillVariants` と `main.ts` の `pickVariant`）。
新しいワールドを追加するときも **1ワールド=30スロット×3バリエーション** を基本単位として揃える。

- World 1 (1-30)：基本、5x5、cap=18 … ✅（手数 3→18、全スロット3variant）
- World 2 (31-60)：固定ブロック、6x6、cap=14 … ✅（手数 3→10。盤が小さく障害物入りだと生成コストが跳ね上がるため難易度上限は控えめ。末尾数スロットはバリエーションが1〜2枚に減る＝プールに同難易度の候補が足りなかった分）
- World 3 (61-90)：氷 … ⬜
- World 4 (91-120)：鍵/ロック … ⬜
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
- **本番 pool を回す前に、必ず小さいバッチ（50〜150件）で1候補あたりの実測コストを測ってから規模を決める**。
  盤サイズ・色数・`fixedBlocks`・`maxBlocksPerColor` が増えると solve() のコストは線形以上に効いてくる
  （実例: 5x5・障害物無しは ~17ms/候補だったのに対し、6x6+固定ブロック2個・`maxBlocksPerColor=2` では ~200ms/候補、
  最悪ケースで800ms/候補。これを見落として seed×count を大きくしすぎ、パターン数万件・体感4時間規模のジョブを
  走らせて2.6時間経過後にkillする事故が起きた）。目安として「小バッチ実測ms × 本番件数」で総時間を概算し、
  数分〜十分程度に収まる規模に抑える。
- **障害物ありワールドは同じ盤サイズでも到達可能な最大手数がずっと低い**。難易度上限(cap)は理論値ではなく
  実際に生成したプールの分布を見て決める（今回はWorld2の到達上限が cap 想定より大幅に低かったため、
  `maxBlocksPerColor` を上げて範囲を広げつつ、上限自体も現実的な値に下げて折り合いをつけた）。
- **オフライン生成は重い**。大きい pool × 高い `maxExpanded` は数分かかりタイムアウトする。
  → pool は数百〜数千程度、`maxExpanded` は盤サイズ・障害物有無に応じて 8000〜15000 程度に抑える。
- **既存worldの難易度カーブやバリエーション構成そのものを作り直したい場合は、既存worldごと再生成してよい**
  （通常の「新worldだけ追記」より重いので、上の事前計測をより丁寧に行う）。単なる追加なら
  従来どおり既存worldは再生成せず新worldだけ生成して追記する方が速い。
- **一時 writer テスト（`_*.test.ts`）を必ず削除してから `npm test` する**。
  kill された生成 writer が残ると、次の `npm test` で再実行され levels.ts を上書き・長時間化する事故が起きた。
- **levels.ts は CRLF**。`writeFileSync` 時に `\n` → `\r\n` へ変換してから書き出す
  （`fileText.replace(/\r?\n/g, '\r\n')`）。手Editでの末尾一致も外れやすいので、生成物は
  一時 writer テストで丸ごと `writeFileSync` する方式が確実。
- 追記・再生成後は **tsc → npm test → build** で全スロット・全バリエーションの可解性・健全性・
  解答再生クリア、および `LEVEL_SLOTS` のデータ品質（variant数・スロット内minMoves一致・重複無し）を確認する。
- **`levels.ts` を追加・変更したら必ず `npm run bake:solutions` を実行する。**
  `main.ts` は実行時に `solve()` を呼ばず、`src/core/levels.solutions.ts`（`LEVEL_SLOTS` と同じ
  `[slot][variant]` 構造で minMoves/解答手順を焼き込んだ自動生成ファイル）を読むだけになっている
  （「解答を見る」クリック時に毎回A*を回すと重く、演出が固まる/飛ぶ原因になっていたため）。
  焼き忘れは `levels.solutions.test.ts`（スロット/バリエーション数の一致・焼き込み済み手順で
  実際にクリアできるかを検証）が検知するので、`npm test` が落ちたら焼き直しを疑う。

## 現状の主要ファイル
- ロジック: `src/core/game.ts`, `solver.ts`, `generate.ts`, `validate.ts`, `level-format.ts`, `levels.ts`, `types.ts`
- 描画: `src/render/three.ts`（ギミックの見た目はここ）
- 結線/UI: `src/main.ts`, `index.html`
- レベル本体（`levels.ts`）の生成: vitest で一時テストを書き `writeFileSync` する（`vite-node`/`tsx` は未導入）。
  **一時テストは実行後に必ず削除する**（消し忘れて次の `npm test` で再実行され levels.ts が上書きされた事故が過去にある）。
- 解答データ（`levels.solutions.ts`）の生成: `scripts/bake-solutions.mjs`（`npm run bake:solutions`）。
  こちらは一時テストではなく常設スクリプトで、Vite の `createServer({ middlewareMode: true }).ssrLoadModule()`
  を使って拡張子なし import のまま TS を直接読み込む（新規依存追加なしで `.ts` を Node から実行できる、
  今後 `levels.ts` 側の生成スクリプトを常設化する際もこのパターンが流用できる）。

## 難易度キュレーションの使い分け
- 通常ブロックの world：`pickProgression`（extra≥1 で「どかし」必須、易しい入口つき）
- 固定/氷など障害物系：`pickRampTargets(..., minExtra=0)`（extra=0 でも障害物回避がパズルになるため）
