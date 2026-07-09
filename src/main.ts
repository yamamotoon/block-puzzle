import { Game } from './core/game';
import { DragController } from './core/drag';
import { LEVELS } from './core/levels';
import { ThreeRenderer } from './render/three';
import type { ExitEffect, Renderer } from './render/renderer';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const app = document.getElementById('app') as HTMLElement;
const overlay = document.getElementById('overlay') as HTMLElement;
const levelLabel = document.getElementById('level-label') as HTMLElement;
const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;

const renderer: Renderer = new ThreeRenderer(canvas);

let levelIndex = 0;
let game = new Game(LEVELS[levelIndex]);
let cleared = false;

// ---- ドラッグ状態 ----------------------------------------------------------
let drag: DragController | null = null;

// ---- 脱出演出 --------------------------------------------------------------
const EXIT_DURATION = 240; // ms
interface ActiveEffect {
  effect: ExitEffect;
  start: number;
}
let effects: ActiveEffect[] = [];

function loadLevel(index: number): void {
  levelIndex = ((index % LEVELS.length) + LEVELS.length) % LEVELS.length;
  game = new Game(LEVELS[levelIndex]);
  cleared = false;
  drag = null;
  effects = [];
  overlay.classList.remove('show');
  levelLabel.textContent = `Level ${levelIndex + 1}`;
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
  if (cleared) return;
  const p = canvasPoint(e);
  const cell = renderer.pixelToCell(p.x, p.y);
  const block = game.blockAt(cell.c, cell.r);
  if (!block) return;
  const f = renderer.pixelToCellF(p.x, p.y);
  drag = new DragController(game, block, f.c, f.r);
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

function spawnExit(d: DragController, now: number): void {
  if (!d.exitEdge) return;
  const s = d.snapshot();
  effects.push({
    start: now,
    effect: {
      cells: s.cells,
      color: s.color,
      edge: d.exitEdge,
      baseOffC: s.offC,
      baseOffR: s.offR,
      progress: 0,
    },
  });
}

function endDrag(pointerId: number): void {
  if (drag?.exited) spawnExit(drag, performance.now());
  drag = null;
  if (canvas.hasPointerCapture?.(pointerId)) canvas.releasePointerCapture(pointerId);
  if (game.isCleared()) cleared = true; // オーバーレイは演出終了後に frame で表示
}

function frame(ts: number): void {
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
    overlay.classList.add('show');
  }
  requestAnimationFrame(frame);
}

canvas.addEventListener('pointerdown', onPointerDown);
canvas.addEventListener('pointermove', onPointerMove);
canvas.addEventListener('pointerup', onPointerUp);
canvas.addEventListener('pointercancel', onPointerUp);
window.addEventListener('resize', resize);
resetBtn.addEventListener('click', () => loadLevel(levelIndex));
nextBtn.addEventListener('click', () => loadLevel(levelIndex + 1));

resize();
requestAnimationFrame(frame);
