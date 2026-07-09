import * as THREE from 'three';
import type { Game } from '../core/game';
import type { Cell, ColorId, Edge, Gate } from '../core/types';
import { COLORS, type DragRenderState, type ExitEffect, type Renderer } from './renderer';

// core（2Dグリッドのロジック）を一切変更せず、描画だけ 3D 化した実装。
// 論理座標 (c, r) を XZ 平面へ写像し、y を上方向・高さに使う。

const BLOCK_H = 0.8; // ブロックの高さ
const BLOCK_INSET = 0.07; // 輪郭を内側へ縮める量（別ブロックとの隙間 = 2×これ）
const CORNER_R = 0.16; // 角を丸める半径（面内）
const LIFT = 0.15; // ドラッグ中の浮き上がり量（選択が分かる程度に控えめ）
const EXIT_SLIDE_CELLS = 3; // 脱出時に滑り出す距離（セル）

const EDGE_DIR: Record<Edge, { c: number; r: number }> = {
  top: { c: 0, r: -1 },
  bottom: { c: 0, r: 1 },
  left: { c: -1, r: 0 },
  right: { c: 1, r: 0 },
};

interface P2 {
  x: number;
  y: number;
}

/** ポリオミノ（セル集合）の外周を、格子コーナーの折れ線として時計回りに返す。 */
function boundaryLoop(cells: Cell[]): P2[] {
  const set = new Set(cells.map((c) => `${c.c},${c.r}`));
  const has = (c: number, r: number): boolean => set.has(`${c},${r}`);
  const edges = new Map<string, P2>(); // 始点キー → 終点
  for (const { c, r } of cells) {
    if (!has(c, r - 1)) edges.set(`${c},${r}`, { x: c + 1, y: r });
    if (!has(c + 1, r)) edges.set(`${c + 1},${r}`, { x: c + 1, y: r + 1 });
    if (!has(c, r + 1)) edges.set(`${c + 1},${r + 1}`, { x: c, y: r + 1 });
    if (!has(c - 1, r)) edges.set(`${c},${r + 1}`, { x: c, y: r });
  }
  const startKey = edges.keys().next().value as string;
  const [sx, sy] = startKey.split(',').map(Number);
  const loop: P2[] = [{ x: sx, y: sy }];
  let cur = startKey;
  for (let i = 0; i < edges.size; i++) {
    const end = edges.get(cur)!;
    const endKey = `${end.x},${end.y}`;
    if (endKey === startKey) break;
    loop.push({ x: end.x, y: end.y });
    cur = endKey;
  }
  return removeCollinear(loop);
}

/** 直線上の中間点（角でない点）を取り除く。 */
function removeCollinear(loop: P2[]): P2[] {
  const n = loop.length;
  const out: P2[] = [];
  for (let i = 0; i < n; i++) {
    const a = loop[(i - 1 + n) % n];
    const b = loop[i];
    const c = loop[(i + 1) % n];
    const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
    if (Math.abs(cross) > 1e-9) out.push(b);
  }
  return out;
}

function signedArea(pts: P2[]): number {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s / 2;
}

/** 直交多角形を内側へ d だけオフセットする。 */
function insetRectilinear(loop: P2[], d: number): P2[] {
  const n = loop.length;
  const inward = signedArea(loop) > 0 ? 1 : -1;
  const unit = (a: P2, b: P2): P2 => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: dx / len, y: dy / len };
  };
  const out: P2[] = [];
  for (let i = 0; i < n; i++) {
    const prev = loop[(i - 1 + n) % n];
    const cur = loop[i];
    const next = loop[(i + 1) % n];
    const dp = unit(prev, cur);
    const dn = unit(cur, next);
    const np = inward > 0 ? { x: -dp.y, y: dp.x } : { x: dp.y, y: -dp.x };
    const nn = inward > 0 ? { x: -dn.y, y: dn.x } : { x: dn.y, y: -dn.x };
    const pp = { x: cur.x + np.x * d, y: cur.y + np.y * d };
    const pn = { x: cur.x + nn.x * d, y: cur.y + nn.y * d };
    // 直交する2辺の交点：水平辺は y、垂直辺は x を決める。
    if (Math.abs(dp.x) > 0.5) out.push({ x: pn.x, y: pp.y });
    else out.push({ x: pp.x, y: pn.y });
  }
  return out;
}

/** 角を丸めた THREE.Shape を作る。 */
function roundedShape(pts: P2[]): THREE.Shape {
  const shape = new THREE.Shape();
  const n = pts.length;
  const unit = (a: P2, b: P2): P2 => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: dx / len, y: dy / len };
  };
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const cur = pts[i];
    const next = pts[(i + 1) % n];
    const lenIn = Math.hypot(cur.x - prev.x, cur.y - prev.y);
    const lenOut = Math.hypot(next.x - cur.x, next.y - cur.y);
    const r = Math.min(CORNER_R, lenIn / 2, lenOut / 2);
    const vIn = unit(prev, cur);
    const vOut = unit(cur, next);
    const p1 = { x: cur.x - vIn.x * r, y: cur.y - vIn.y * r };
    const p2 = { x: cur.x + vOut.x * r, y: cur.y + vOut.y * r };
    if (i === 0) shape.moveTo(p1.x, p1.y);
    else shape.lineTo(p1.x, p1.y);
    shape.quadraticCurveTo(cur.x, cur.y, p2.x, p2.y);
  }
  shape.closePath();
  return shape;
}

/** ブロック形状（セル集合）を、角丸・面取りした 1 つの立体ジオメトリにする。 */
export function buildRoundedPolyGeometry(cells: Cell[], ac: number, ar: number): THREE.ExtrudeGeometry {
  const loop = boundaryLoop(cells);
  const inset = insetRectilinear(loop, BLOCK_INSET);
  // アンカー中心の 2D 座標へ（y は行→z の向きに合わせて反転）。
  let pts: P2[] = inset.map((p) => ({ x: p.x - ac - 0.5, y: -(p.y - ar - 0.5) }));
  if (signedArea(pts) < 0) pts = pts.reverse(); // ExtrudeGeometry 用に CCW へ
  const shape = roundedShape(pts);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: BLOCK_H,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2,
    curveSegments: 5,
  });
  geo.rotateX(-Math.PI / 2); // XY 平面の形状を XZ 平面へ寝かせ、高さを Y に
  return geo;
}

interface BlockEntry {
  group: THREE.Group;
  // 表示位置（イージング補間の現在値）。論理位置はマス単位で飛ぶが、ここを追従させて滑らかに見せる。
  dispX: number;
  dispY: number;
  dispZ: number;
}

const SMOOTH_TAU = 0.045; // イージングの時定数（秒）。小さいほどキビキビ。

// カメラの見下ろし方向（大きい y ほど真上寄り）。少し見下ろし気味で遠近の偏りを抑える。
const CAM_DIR = new THREE.Vector3(0, 0.9, 0.44);
// 盤面フィット時の余白（セル単位）。横（左右）と奥行（上下）で別々に持つ。
const FIT_MARGIN_X = 1.3;
const FIT_MARGIN_Z = 1.8; // ゲート＋ブロック高さ＋遠近の立ち上がりぶん

// 外周の壁（ゲート開口以外を塞ぐリム）。
const WALL_T = 0.5; // 厚み（ゲートと同じ）
const WALL_H = 0.9; // 高さ（ブロックより少し高く、脱出できないことを示す）

export class ThreeRenderer implements Renderer {
  private gl: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private raycaster = new THREE.Raycaster();
  private boardGroup = new THREE.Group();
  private effectGroup = new THREE.Group();
  private blockMeshes = new Map<string, BlockEntry>();
  private currentGame: Game | null = null;
  private cols = 6;
  private rows = 6;
  private cssW = 1;
  private cssH = 1;
  private lastTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.gl = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.gl.shadowMap.enabled = true;
    this.gl.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene.background = new THREE.Color('#12141c');
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.scene.add(this.boardGroup);
    this.scene.add(this.effectGroup);

    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(amb);
    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(5, 12, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    const s = 12;
    key.shadow.camera.left = -s;
    key.shadow.camera.right = s;
    key.shadow.camera.top = s;
    key.shadow.camera.bottom = -s;
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 50;
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xaaccff, 0.35);
    fill.position.set(-6, 5, -4);
    this.scene.add(fill);
  }

  // ---- 座標変換 ------------------------------------------------------------
  private cellCenterX(c: number): number {
    return c + 0.5 - this.cols / 2;
  }
  private cellCenterZ(r: number): number {
    return r + 0.5 - this.rows / 2;
  }

  resize(cssW: number, cssH: number, dpr: number): void {
    this.cssW = cssW;
    this.cssH = cssH;
    this.gl.setPixelRatio(Math.min(dpr, 2));
    this.gl.setSize(cssW, cssH, false);
    this.gl.domElement.style.width = `${cssW}px`;
    this.gl.domElement.style.height = `${cssH}px`;
    this.updateCamera();
  }

  private updateCamera(): void {
    const aspect = this.cssW / this.cssH || 1;
    this.camera.aspect = aspect;
    // 盤面の実寸（幅=cols／奥行=rows）を、画面の横・縦それぞれに収める距離を求め、
    // 大きい方を採用する。縦長画面では横幅いっぱいに盤面を使える。
    const vHalf = THREE.MathUtils.degToRad(this.camera.fov / 2);
    const hHalf = Math.atan(Math.tan(vHalf) * aspect);
    const halfW = this.cols / 2 + FIT_MARGIN_X;
    const halfD = this.rows / 2 + FIT_MARGIN_Z;
    const distW = halfW / Math.tan(hHalf);
    const distD = halfD / Math.tan(vHalf);
    const dist = Math.max(distW, distD);
    this.camera.position.copy(CAM_DIR.clone().normalize().multiplyScalar(dist));
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
  }

  pixelToCell(x: number, y: number): Cell {
    const f = this.pixelToCellF(x, y);
    return { c: Math.floor(f.c), r: Math.floor(f.r) };
  }

  pixelToCellF(x: number, y: number): { c: number; r: number } {
    const ndc = new THREE.Vector2((x / this.cssW) * 2 - 1, -(y / this.cssH) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    // ブロック上面の高さ (y = BLOCK_H) の平面と交差させる。
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -BLOCK_H);
    const pt = new THREE.Vector3();
    const hit = this.raycaster.ray.intersectPlane(plane, pt);
    if (!hit) return { c: 1e9, r: 1e9 };
    return { c: pt.x + this.cols / 2, r: pt.z + this.rows / 2 };
  }

  // ---- 描画 ----------------------------------------------------------------
  render(game: Game, drag: DragRenderState | null, effects: ExitEffect[]): void {
    if (game !== this.currentGame) this.rebuildScene(game);

    // フレーム時間からイージング係数を算出（フレームレート非依存）。
    const now = performance.now();
    const dt = this.lastTime ? Math.min((now - this.lastTime) / 1000, 0.1) : 1 / 60;
    this.lastTime = now;
    const alpha = 1 - Math.exp(-dt / SMOOTH_TAU);

    for (const block of game.blocks) {
      const entry = this.blockMeshes.get(block.id);
      if (!entry) continue;
      entry.group.visible = !block.removed;
      if (block.removed) continue;
      let ac = Infinity;
      let ar = Infinity;
      for (const cell of block.cells) {
        if (cell.c < ac) ac = cell.c;
        if (cell.r < ar) ar = cell.r;
      }
      const dragging = drag?.blockId === block.id;
      // 目標（論理位置）へ表示位置をイージング補間する。
      const tx = this.cellCenterX(ac);
      const tz = this.cellCenterZ(ar);
      const ty = dragging ? LIFT : 0;
      entry.dispX += (tx - entry.dispX) * alpha;
      entry.dispY += (ty - entry.dispY) * alpha;
      entry.dispZ += (tz - entry.dispZ) * alpha;
      entry.group.position.set(entry.dispX, entry.dispY, entry.dispZ);
    }

    this.updateEffects(effects);
    this.gl.render(this.scene, this.camera);
  }

  private updateEffects(effects: ExitEffect[]): void {
    // 前フレームのゴーストを破棄
    for (const child of [...this.effectGroup.children]) {
      this.disposeGroup(child as THREE.Group);
      this.effectGroup.remove(child);
    }

    for (const fx of effects) {
      const { group } = this.buildBlockGroup(fx.cells, fx.color, 1 - fx.progress);
      // フェード中は影を出さない（影は不透明度を無視するため不自然になる）
      group.traverse((o) => {
        if (o instanceof THREE.Mesh) o.castShadow = false;
      });
      let ac = Infinity;
      let ar = Infinity;
      for (const cell of fx.cells) {
        if (cell.c < ac) ac = cell.c;
        if (cell.r < ar) ar = cell.r;
      }
      // 盤面上を横（ゲート方向）へ滑らせながら透明化するだけ。
      // 上下移動・縮小はしない（落下や縮小に見えないように）。
      const dir = EDGE_DIR[fx.edge];
      const slide = fx.progress * EXIT_SLIDE_CELLS;
      group.position.set(
        this.cellCenterX(ac) + fx.baseOffC + dir.c * slide,
        0,
        this.cellCenterZ(ar) + fx.baseOffR + dir.r * slide,
      );
      this.effectGroup.add(group);
    }
  }

  private rebuildScene(game: Game): void {
    for (const entry of this.blockMeshes.values()) {
      this.disposeGroup(entry.group);
      this.scene.remove(entry.group);
    }
    this.blockMeshes.clear();
    this.disposeGroup(this.boardGroup);

    this.cols = game.cols;
    this.rows = game.rows;

    this.buildBoard();
    this.buildWalls(game.gates);
    for (const gate of game.gates) this.buildGate(gate);
    for (const block of game.blocks) {
      const entry = this.buildBlockGroup(block.cells, block.color, 1);
      // 表示位置を論理位置に初期化（初回にスライドインしないように）。
      let ac = Infinity;
      let ar = Infinity;
      for (const cell of block.cells) {
        if (cell.c < ac) ac = cell.c;
        if (cell.r < ar) ar = cell.r;
      }
      entry.dispX = this.cellCenterX(ac);
      entry.dispY = 0;
      entry.dispZ = this.cellCenterZ(ar);
      entry.group.position.set(entry.dispX, 0, entry.dispZ);
      this.scene.add(entry.group);
      this.blockMeshes.set(block.id, entry);
    }

    this.currentGame = game;
    this.updateCamera();
  }

  private buildBoard(): void {
    // 壁の外側まで覆うトレイ。
    const geo = new THREE.BoxGeometry(this.cols + 2 * WALL_T + 0.3, 0.5, this.rows + 2 * WALL_T + 0.3);
    const mat = new THREE.MeshStandardMaterial({ color: '#232838', roughness: 0.95 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, -0.25, 0);
    mesh.receiveShadow = true;
    this.boardGroup.add(mesh);
  }

  /** 外周の壁を組む。各辺でゲートが覆う範囲を開口として抜く。 */
  private buildWalls(gates: Gate[]): void {
    const mat = new THREE.MeshStandardMaterial({ color: '#3a4056', roughness: 0.9 });
    const edges: Edge[] = ['top', 'bottom', 'left', 'right'];
    for (const edge of edges) {
      const n = edge === 'top' || edge === 'bottom' ? this.cols : this.rows;
      // この辺のゲートが覆う区間（セル座標）を集めて結合。
      const covered = gates
        .filter((g) => g.edge === edge)
        .map((g) => [g.start, g.end + 1] as [number, number])
        .sort((a, b) => a[0] - b[0]);
      // 開口以外（＝壁になる隙間）を求める。
      let cursor = 0;
      for (const [a, b] of covered) {
        if (a > cursor) this.addWallSegment(edge, cursor, a, mat);
        cursor = Math.max(cursor, b);
      }
      if (cursor < n) this.addWallSegment(edge, cursor, n, mat);
    }
    // 角の柱で四隅を閉じる。
    const half = WALL_T / 2;
    const cx = this.cols / 2;
    const cz = this.rows / 2;
    const cornerGeo = new THREE.BoxGeometry(WALL_T, WALL_H, WALL_T);
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
      const m = new THREE.Mesh(cornerGeo, mat);
      m.position.set(sx * (cx + half), WALL_H / 2, sz * (cz + half));
      m.castShadow = true;
      m.receiveShadow = true;
      this.boardGroup.add(m);
    }
  }

  /** 辺 edge の [a, b]（セル座標）区間に壁セグメントを 1 本置く。 */
  private addWallSegment(edge: Edge, a: number, b: number, mat: THREE.Material): void {
    if (b - a <= 1e-6) return;
    let geo: THREE.BoxGeometry;
    let x: number;
    let z: number;
    if (edge === 'top' || edge === 'bottom') {
      geo = new THREE.BoxGeometry(b - a, WALL_H, WALL_T);
      x = (a + b) / 2 - this.cols / 2;
      z = edge === 'top' ? -this.rows / 2 - WALL_T / 2 : this.rows / 2 + WALL_T / 2;
    } else {
      geo = new THREE.BoxGeometry(WALL_T, WALL_H, b - a);
      z = (a + b) / 2 - this.rows / 2;
      x = edge === 'left' ? -this.cols / 2 - WALL_T / 2 : this.cols / 2 + WALL_T / 2;
    }
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, WALL_H / 2, z);
    m.castShadow = true;
    m.receiveShadow = true;
    this.boardGroup.add(m);
  }

  private buildGate(g: Gate): void {
    const span = g.end - g.start + 1;
    const D = 0.5;
    const H = 0.55;
    let wx = D;
    let wz = D;
    let x = 0;
    let z = 0;
    if (g.edge === 'top' || g.edge === 'bottom') {
      wx = span;
      x = g.start + span / 2 - this.cols / 2;
      z = g.edge === 'top' ? -this.rows / 2 - D / 2 : this.rows / 2 + D / 2;
    } else {
      wz = span;
      z = g.start + span / 2 - this.rows / 2;
      x = g.edge === 'left' ? -this.cols / 2 - D / 2 : this.cols / 2 + D / 2;
    }
    const col = COLORS[g.color];
    const geo = new THREE.BoxGeometry(wx, H, wz);
    const mat = new THREE.MeshStandardMaterial({
      color: col.base,
      roughness: 0.4,
      emissive: new THREE.Color(col.dark),
      emissiveIntensity: 0.25,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, H / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.boardGroup.add(mesh);
  }

  /** セル集合を 1 つの角丸立体として構築（アンカー=最小セル基準）。 */
  private buildBlockGroup(cells: Cell[], color: ColorId, opacity: number): BlockEntry {
    let ac = Infinity;
    let ar = Infinity;
    for (const cell of cells) {
      if (cell.c < ac) ac = cell.c;
      if (cell.r < ar) ar = cell.r;
    }
    const col = COLORS[color];
    const geo = buildRoundedPolyGeometry(cells, ac, ar);
    const mat = new THREE.MeshStandardMaterial({
      color: col.base,
      roughness: 0.45,
      metalness: 0.05,
      transparent: opacity < 1,
      opacity,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const group = new THREE.Group();
    group.add(mesh);
    return { group, dispX: 0, dispY: 0, dispZ: 0 };
  }

  private disposeGroup(group: THREE.Group): void {
    for (const child of [...group.children]) {
      group.remove(child);
      const mesh = child as THREE.Mesh;
      mesh.geometry?.dispose();
      const mat = mesh.material;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose();
    }
  }
}
