// クリア進捗（★評価・自己ベスト手数）を localStorage に保存する platform 層。

export interface LevelResult {
  stars: number; // 1..3
  best: number; // 最小手数（自己ベスト）
}

const KEY = 'cbj-progress-v1';

type Progress = Record<number, LevelResult>;

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw) as unknown;
    return obj && typeof obj === 'object' ? (obj as Progress) : {};
  } catch {
    return {};
  }
}

function save(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function getResult(index: number): LevelResult | undefined {
  return load()[index];
}

export function allResults(): Progress {
  return load();
}

/** クリア結果を記録（★が増える／手数が縮む場合のみ更新）。 */
export function recordResult(index: number, moves: number, stars: number): void {
  const p = load();
  const prev = p[index];
  if (!prev || stars > prev.stars || moves < prev.best) {
    p[index] = {
      stars: Math.max(stars, prev?.stars ?? 0),
      best: prev ? Math.min(prev.best, moves) : moves,
    };
    save(p);
  }
}
