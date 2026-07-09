import { Game } from './core/game';
import { DragController } from './core/drag';
import { LEVELS } from './core/levels';
import { solve, type SolveMove } from './core/solver';
import { ThreeRenderer } from './render/three';
import type { ExitEffect, Renderer } from './render/renderer';
import type { ColorId, Cell, Edge } from './core/types';
import { sfx } from './platform/audio';
import { recordResult, allResults } from './platform/storage';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const app = document.getElementById('app') as HTMLElement;
const overlay = document.getElementById('overlay') as HTMLElement;
const levelLabel = document.getElementById('level-label') as HTMLElement;
const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
const prevLvBtn = document.getElementById('prev-btn') as HTMLButtonElement;
const nextLvBtn = document.getElementById('next-lv-btn') as HTMLButtonElement;
const solveBtn = document.getElementById('solve-btn') as HTMLButtonElement;
const levelsBtn = document.getElementById('levels-btn') as HTMLButtonElement;
const muteBtn = document.getElementById('mute-btn') as HTMLButtonElement;
const menuBtn = document.getElementById('menu-btn') as HTMLButtonElement;
const menu = document.getElementById('menu') as HTMLElement;
const levelSelect = document.getElementById('level-select') as HTMLElement;
const lsGrid = document.getElementById('ls-grid') as HTMLElement;
const lsClose = document.getElementById('ls-close') as HTMLButtonElement;
const clearStars = document.getElementById('clear-stars') as HTMLElement;
const clearMoves = document.getElementById('clear-moves') as HTMLElement;

const renderer: Renderer = new ThreeRenderer(canvas);

let levelIndex = 0;
let game = new Game(LEVELS[levelIndex]);
let cleared = false;

// ---- 手数・評価 ------------------------------------------------------------
let currentMinMoves = 0; // 現レベルの最小手数（★判定の基準）
let movesUsed = 0; // プレイヤーの実手数
let usedSolve = false; // Solve 再生を使ったか（使うと★対象外）

// ---- ドラッグ状態 ----------------------------------------------------------
let drag: DragController | null = null;
let dragStartSig: string | null = null; // 掴んだ時のブロック位置（移動有無の判定用）

// ---- 脱出演出 --------------------------------------------------------------
const EXIT_DURATION = 240; // ms
interface ActiveEffect {
  effect: ExitEffect;
  start: number;
}
let effects: ActiveEffect[] = [];

// ---- 正解再生 --------------------------------------------------------------
const REPLAY_STEP = 450; // ms/手
interface Replay {
  moves: SolveMove[];
  index: number;
  nextTime: number;
}
let replay: Replay | null = null;

function loadLevel(index: number): void {
  levelIndex = ((index % LEVELS.length) + LEVELS.length) % LEVELS.length;
  game = new Game(LEVELS[levelIndex]);
  cleared = false;
  drag = null;
  effects = [];
  replay = null;
  movesUsed = 0;
  usedSolve = false;
  currentMinMoves = solve(LEVELS[levelIndex]).minMoves;
  overlay.classList.remove('show');
  levelLabel.textContent = `Level ${levelIndex + 1} / ${LEVELS.length}`;
}

/** 現在のレベルを最初から並べ直し、正解手順の自動再生を開始する。 */
function startReplay(): void {
  loadLevel(levelIndex); // 初期状態に戻す
  const res = solve(LEVELS[levelIndex]);
  if (!res.solvable || !res.path) return;
  usedSolve = true;
  replay = { moves: res.path, index: 0, nextTime: 0 };
}

/** 解答の 1 手を適用（ブロックを目標アンカーへ移動、ゲートに収まれば脱出）。 */
function applySolveMove(move: SolveMove, now: number): void {
  const b = game.blocks[move.block];
  if (b.removed) return;
  let minc = Infinity;
  let minr = Infinity;
  for (const c of b.cells) {
    if (c.c < minc) minc = c.c;
    if (c.r < minr) minr = c.r;
  }
  b.cells = b.cells.map((c) => ({ c: move.to.c + (c.c - minc), r: move.to.r + (c.r - minr) }));
  const gate = game.findExitGate(b);
  if (gate) {
    const snap = b.cells.map((c) => ({ ...c }));
    b.removed = true;
    pushExitEffect(snap, b.color, gate.edge, now);
    sfx.exit();
  } else {
    sfx.move();
  }
}

function resize(): void {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.resize(app.clientWidth, app.clientHeight, dpr);
}

function canvasPoint(e: PointerEvent): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function onPointerDown(e: PointerEvent): void {
  sfx.resume(); // 最初のユーザー操作で音声を有効化
  if (cleared || replay) return;
  const p = canvasPoint(e);
  const cell = renderer.pixelToCell(p.x, p.y);
  const block = game.blockAt(cell.c, cell.r);
  if (!block) return;
  const f = renderer.pixelToCellF(p.x, p.y);
  drag = new DragController(game, block, f.c, f.r);
  dragStartSig = JSON.stringify(block.cells);
  sfx.grab();
  canvas.setPointerCapture(e.pointerId);
}

function onPointerMove(e: PointerEvent): void {
  if (!drag) return;
  const p = canvasPoint(e);
  const f = renderer.pixelToCellF(p.x, p.y);
  drag.moveTo(f.c, f.r);
  if (drag.exited) endDrag(e.pointerId);
}

function onPointerUp(e: PointerEvent): void {
  if (!drag) return;
  drag.release();
  endDrag(e.pointerId);
}

function pushExitEffect(cells: Cell[], color: ColorId, edge: Edge, now: number): void {
  effects.push({
    start: now,
    effect: { cells, color, edge, baseOffC: 0, baseOffR: 0, progress: 0 },
  });
}

function spawnExit(d: DragController, now: number): void {
  if (!d.exitEdge) return;
  const s = d.snapshot();
  pushExitEffect(s.cells, s.color, d.exitEdge, now);
}

function endDrag(pointerId: number): void {
  if (drag) {
    if (drag.exited) {
      spawnExit(drag, performance.now());
      movesUsed++;
      sfx.exit();
    } else {
      const b = game.blocks.find((x) => x.id === drag!.blockId);
      if (b && JSON.stringify(b.cells) !== dragStartSig) {
        movesUsed++;
        sfx.move();
      }
    }
  }
  drag = null;
  dragStartSig = null;
  if (canvas.hasPointerCapture?.(pointerId)) canvas.releasePointerCapture(pointerId);
  if (game.isCleared()) cleared = true; // オーバーレイは演出終了後に frame で表示
}

function frame(ts: number): void {
  // 正解再生：一定間隔で 1 手ずつ適用
  if (replay && ts >= replay.nextTime) {
    if (replay.index < replay.moves.length) {
      applySolveMove(replay.moves[replay.index], ts);
      replay.index++;
      replay.nextTime = ts + REPLAY_STEP;
    } else {
      replay = null;
      if (game.isCleared()) cleared = true;
    }
  }

  // 脱出演出を進め、終わったものは除去
  effects = effects.filter((a) => {
    a.effect.progress = Math.min(1, (ts - a.start) / EXIT_DURATION);
    return a.effect.progress < 1;
  });

  renderer.render(
    game,
    drag ? { blockId: drag.blockId, offC: drag.offC, offR: drag.offR } : null,
    effects.map((a) => a.effect),
  );

  // クリア表示は、吸い込み演出が終わってから
  if (cleared && effects.length === 0 && !overlay.classList.contains('show')) {
    showClear();
  }
  requestAnimationFrame(frame);
}

function starsFor(moves: number, min: number): number {
  if (moves <= min) return 3;
  if (moves <= Math.ceil(min * 1.5)) return 2;
  return 1;
}

function renderStars(n: number): string {
  let out = '';
  for (let i = 0; i < 3; i++) out += i < n ? '★' : '<span class="dim">★</span>';
  return out;
}

function showClear(): void {
  const stars = usedSolve ? 0 : starsFor(movesUsed, currentMinMoves);
  clearStars.innerHTML = renderStars(stars);
  clearMoves.textContent = usedSolve
    ? 'Solve を使用（★対象外）'
    : `手数 ${movesUsed} ／ 最小 ${currentMinMoves}`;
  if (!usedSolve) recordResult(levelIndex, movesUsed, stars);
  sfx.clear();
  overlay.classList.add('show');
}

function buildLevelSelect(): void {
  const results = allResults();
  lsGrid.innerHTML = '';
  for (let i = 0; i < LEVELS.length; i++) {
    const btn = document.createElement('button');
    btn.className = 'ls-cell';
    const r = results[i];
    if (r) btn.classList.add('done');
    const num = document.createElement('div');
    num.textContent = String(i + 1);
    const s = document.createElement('div');
    s.className = 's';
    s.textContent = r ? '★'.repeat(r.stars) : '';
    btn.append(num, s);
    btn.addEventListener('click', () => {
      levelSelect.classList.remove('show');
      loadLevel(i);
    });
    lsGrid.append(btn);
  }
}

function updateMuteBtn(): void {
  muteBtn.textContent = sfx.muted ? '🔇' : '🔊';
}

canvas.addEventListener('pointerdown', onPointerDown);
canvas.addEventListener('pointermove', onPointerMove);
canvas.addEventListener('pointerup', onPointerUp);
canvas.addEventListener('pointercancel', onPointerUp);
window.addEventListener('resize', resize);
resetBtn.addEventListener('click', () => loadLevel(levelIndex));
nextBtn.addEventListener('click', () => loadLevel(levelIndex + 1));
prevLvBtn.addEventListener('click', () => loadLevel(levelIndex - 1));
nextLvBtn.addEventListener('click', () => loadLevel(levelIndex + 1));
solveBtn.addEventListener('click', () => startReplay());
levelsBtn.addEventListener('click', () => {
  buildLevelSelect();
  levelSelect.classList.add('show');
});
lsClose.addEventListener('click', () => levelSelect.classList.remove('show'));
muteBtn.addEventListener('click', () => {
  sfx.setMuted(!sfx.muted);
  if (!sfx.muted) sfx.resume();
  updateMuteBtn();
});

// メニュー（ドロップダウン）の開閉
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('show');
});
menu.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).tagName === 'BUTTON') menu.classList.remove('show');
});
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target as Node) && e.target !== menuBtn) menu.classList.remove('show');
});

updateMuteBtn();
loadLevel(0);
resize();
requestAnimationFrame(frame);
