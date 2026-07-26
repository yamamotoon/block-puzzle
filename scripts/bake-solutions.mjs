// levels.ts（LEVEL_SLOTS）の全レベルを solve() で解き、結果を
// src/core/levels.solutions.ts に書き出す。
//
// levels.ts を追加・変更したら、コミット前に必ず実行してください:
//   npm run bake:solutions
//
// アプリ本体（main.ts）はここで焼き込んだ minMoves / path を読むだけになり、
// 実行時に solve()（A* 探索）を一切走らせない。
// 新規依存を増やさないため、実行は Node 単体ではなく Vite の SSR ロードを使う
// （levels.ts / solver.ts は拡張子なし import なので素の Node では解決できないため）。

import { createServer } from 'vite';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outFile = path.join(root, 'src/core/levels.solutions.ts');

async function main() {
  const server = await createServer({ root, server: { middlewareMode: true }, logLevel: 'error' });
  try {
    const { LEVEL_SLOTS } = await server.ssrLoadModule('/src/core/levels.ts');
    const { solve } = await server.ssrLoadModule('/src/core/solver.ts');

    const slots = LEVEL_SLOTS.map((variants, slotIndex) =>
      variants.map((level, variantIndex) => {
        const res = solve(level);
        if (!res.solvable || !res.path) {
          throw new Error(`slot=${slotIndex + 1} variant=${variantIndex + 1} が解けません（levels.ts を確認してください）`);
        }
        return { minMoves: res.minMoves, path: res.path };
      }),
    );

    const body = slots
      .map((variants) => `  [\n${variants.map((v) => `    { minMoves: ${v.minMoves}, path: ${JSON.stringify(v.path)} },`).join('\n')}\n  ],`)
      .join('\n');

    const out = `// 自動生成ファイル。手で編集しないこと。
// \`npm run bake:solutions\` で levels.ts から再生成する（scripts/bake-solutions.mjs）。
// LEVEL_SLOTS と同じ [slot][variant] 構造で、各レベルの最小手数と解答手順を持つ。

import type { SolveMove } from './solver';

export interface LevelSolution {
  minMoves: number;
  path: SolveMove[];
}

export const LEVEL_SOLUTIONS: LevelSolution[][] = [
${body}
];
`;

    writeFileSync(outFile, out);
    const total = slots.reduce((s, v) => s + v.length, 0);
    console.log(`[bake-solutions] ${slots.length} slots / ${total} variants を書き出しました: ${path.relative(root, outFile)}`);
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
