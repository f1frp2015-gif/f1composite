"use client";

// True-3D section viewer, ported from DimViz (dimviz.com). The section
// polygon (mm, y-up) is extruded into a real prism with THREE.ExtrudeGeometry,
// so occlusion is resolved by the depth buffer and the silhouette IS the input
// geometry, to the millimetre.
//
// Materials are physically based (metalness/roughness + procedural maps). The
// dimension-annotation overlay (H, B, t_f/t_w) is projected to screen every
// frame, so the callouts track zoom and orbit exactly.

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { Section, MaterialPbr, Annotations, AnnoLine, AnnoLabel } from "./geometry";

/* -- procedural texture maps ----------------------------------------- */

const textureCache = new Map<string, THREE.CanvasTexture>();

function makeCanvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  return [c, ctx];
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function streakTexture(kind: "brushed" | "fibre", size = 1024): THREE.CanvasTexture {
  const key = `${kind}-${size}`;
  const hit = textureCache.get(key);
  if (hit) return hit;

  const [canvas, ctx] = makeCanvas(size);
  const rand = mulberry32(kind === "brushed" ? 7 : 13);

  ctx.fillStyle = "#8c8c8c";
  ctx.fillRect(0, 0, size, size);

  const n = kind === "brushed" ? 2600 : 1500;
  for (let i = 0; i < n; i++) {
    const y = rand() * size;
    const len = kind === "brushed" ? size * (0.25 + rand() * 0.75) : size * (0.5 + rand() * 0.5);
    const x = rand() * size;
    const tone = 100 + Math.floor(rand() * 110);
    ctx.strokeStyle = `rgba(${tone},${tone},${tone},${kind === "brushed" ? 0.16 : 0.22})`;
    ctx.lineWidth = kind === "brushed" ? 0.5 + rand() : 0.8 + rand() * 1.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  textureCache.set(key, tex);
  return tex;
}

function tintedMap(pbr: MaterialPbr): THREE.CanvasTexture {
  const key = `map-${pbr.texture}-${pbr.color}`;
  const hit = textureCache.get(key);
  if (hit) return hit;
  const size = 1024;
  const [canvas, ctx] = makeCanvas(size);
  ctx.fillStyle = pbr.color;
  ctx.fillRect(0, 0, size, size);
  const src = streakTexture(pbr.texture as "fibre").image as HTMLCanvasElement;
  ctx.globalAlpha = 0.16;
  ctx.drawImage(src, 0, 0);
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  textureCache.set(key, tex);
  return tex;
}

function buildMaterial(pbr: MaterialPbr): THREE.MeshPhysicalMaterial {
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(pbr.color),
    metalness: pbr.metalness,
    roughness: pbr.roughness,
    clearcoat: pbr.clearcoat ?? 0,
    clearcoatRoughness: 0.35,
    side: THREE.DoubleSide,
  });
  if (pbr.texture !== "none") {
    const tex = streakTexture(pbr.texture);
    mat.roughnessMap = tex;
    if (pbr.texture === "fibre") mat.map = tintedMap(pbr);
  }
  return mat;
}

/* -- geometry -------------------------------------------------------- */

function ringToPath<T extends THREE.Shape | THREE.Path>(ring: readonly (readonly [number, number])[], path: T): T {
  path.moveTo(ring[0][0], ring[0][1]);
  for (let i = 1; i < ring.length; i++) path.lineTo(ring[i][0], ring[i][1]);
  path.closePath();
  return path;
}

function isCW(ring: readonly (readonly [number, number])[]): boolean {
  let a = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[(i + 1) % ring.length];
    a += x0 * y1 - x1 * y0;
  }
  return a < 0;
}

function buildGeometry(section: Section, depth: number): THREE.ExtrudeGeometry {
  const outer = isCW(section.outer) ? [...section.outer].reverse() : section.outer;
  const shape = ringToPath(outer, new THREE.Shape());
  for (const h of section.holes ?? []) {
    const ring = isCW(h) ? h : [...h].reverse();
    shape.holes.push(ringToPath(ring, new THREE.Path()));
  }
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: depth * 0.002,
    bevelSize: depth * 0.002,
    bevelSegments: 1,
    curveSegments: 8,
  });
  geo.center();
  return geo;
}

/* -- annotation overlay ---------------------------------------------- */

const C_DIM = "#00857e";
const C_FAINT = "#6e7189";
const C_INK = "#0d0f24";
const C_HALO = "#ffffff";
const ANNO_FONT = "ui-monospace, SFMono-Regular, Menlo, monospace";

interface ProjPoint {
  x: number;
  y: number;
}
interface AnnoState {
  cxb: number;
  cyb: number;
  halfDepth: number;
  lines: AnnoLine[];
  labels: AnnoLabel[];
}

/** Project a section-space point onto the visible cut face, then to px. */
function projectAnno(
  sx: number,
  sy: number,
  st: AnnoState,
  camera: THREE.PerspectiveCamera,
  target: THREE.Vector3,
  W: number,
  H: number,
  v: THREE.Vector3,
): ProjPoint {
  const faceZ = camera.position.z >= target.z ? st.halfDepth : -st.halfDepth;
  v.set(sx - st.cxb, sy - st.cyb, faceZ);
  v.project(camera);
  return { x: (v.x * 0.5 + 0.5) * W, y: (-v.y * 0.5 + 0.5) * H };
}

function arrowPoly(tip: ProjPoint, from: ProjPoint, len: number): string {
  const dx = tip.x - from.x;
  const dy = tip.y - from.y;
  const d = Math.hypot(dx, dy) || 1;
  const ux = dx / d;
  const uy = dy / d;
  const px = -uy;
  const py = ux;
  const bx = tip.x - ux * len;
  const by = tip.y - uy * len;
  const w = len * 0.42;
  return `${tip.x.toFixed(1)},${tip.y.toFixed(1)} ${(bx + px * w).toFixed(1)},${(by + py * w).toFixed(1)} ${(bx - px * w).toFixed(1)},${(by - py * w).toFixed(1)}`;
}

/** Build the SVG markup for the current camera. */
function overlaySvg(
  st: AnnoState,
  camera: THREE.PerspectiveCamera,
  target: THREE.Vector3,
  W: number,
  H: number,
): string {
  if (W === 0 || H === 0) return "";
  const v = new THREE.Vector3();
  const P = (x: number, y: number) => projectAnno(x, y, st, camera, target, W, H, v);
  const arrow = Math.max(7, Math.min(W, H) * 0.02);
  const fs = Math.max(11, Math.min(W, H) * 0.032);
  let out = "";

  for (const l of st.lines) {
    const a = P(l.a[0], l.a[1]);
    const b = P(l.b[0], l.b[1]);
    const stroke = l.faint ? C_FAINT : C_DIM;
    const sw = l.faint ? 1 : 1.4;
    const dash = l.dash ? ` stroke-dasharray="${(fs * 0.4).toFixed(1)} ${(fs * 0.3).toFixed(1)}"` : "";
    out += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${stroke}" stroke-width="${sw}"${dash} stroke-linecap="round"/>`;
    if (l.arrowA) out += `<polygon points="${arrowPoly(a, b, arrow)}" fill="${C_DIM}"/>`;
    if (l.arrowB) out += `<polygon points="${arrowPoly(b, a, arrow)}" fill="${C_DIM}"/>`;
  }

  for (const lab of st.labels) {
    const p = P(lab.at[0], lab.at[1]);
    const anchor = lab.align === "l" ? "start" : lab.align === "r" ? "end" : "middle";
    const pad = fs * 0.45;
    const dx = lab.align === "l" ? pad : lab.align === "r" ? -pad : 0;
    const dy = lab.vAlign === "t" ? fs * 0.95 : lab.vAlign === "b" ? -fs * 0.45 : fs * 0.34;
    const color = lab.faint ? C_FAINT : C_INK;
    const weight = lab.faint ? 500 : 600;
    const { main, sub } = splitSub(lab.text);
    const tspan = sub
      ? `${escapeXml(main)}<tspan font-size="${(fs * 0.72).toFixed(1)}" dy="${(fs * 0.22).toFixed(1)}">${escapeXml(sub)}</tspan>`
      : escapeXml(main);
    out += `<text x="${(p.x + dx).toFixed(1)}" y="${(p.y + dy).toFixed(1)}" fill="${color}" font-size="${fs.toFixed(1)}" font-weight="${weight}" text-anchor="${anchor}" font-family="${ANNO_FONT}" style="paint-order:stroke;stroke:${C_HALO};stroke-width:${(fs * 0.28).toFixed(1)}px;stroke-linejoin:round">${tspan}</text>`;
  }
  return out;
}

/** "t_f 12 mm" → main "t", sub "f 12 mm" so the subscript renders. */
function splitSub(text: string): { main: string; sub: string | null } {
  const m = text.match(/^([a-zA-Z])_([a-zA-Z])(.*)$/);
  if (m) return { main: m[1], sub: m[2] + m[3] };
  return { main: text, sub: null };
}

function escapeXml(s: string): string {
  return s.replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));
}

/* -- viewer ---------------------------------------------------------- */

export default function SectionViewer3D({
  section,
  pbr,
  annotations,
  className,
  onUnavailable,
}: {
  section: Section;
  pbr: MaterialPbr;
  annotations?: Annotations;
  className?: string;
  /** called when a WebGL context cannot be created, so the host can fall back. */
  onUnavailable?: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    svg: SVGSVGElement;
    mesh?: THREE.Mesh;
    edges?: THREE.LineSegments;
    anno?: AnnoState;
    render: () => void;
    syncOverlay: () => void;
  } | null>(null);
  const annoRef = useRef<Annotations | undefined>(annotations);
  useEffect(() => {
    annoRef.current = annotations;
  }, [annotations]);

  // one-time scene setup
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.style.position = "relative";

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      onUnavailable?.();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("style", "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible");
    host.appendChild(svg);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(32, 1, 1, 100000);

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0004;
    scene.add(key);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    const groundMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minPolarAngle = 0.15;
    controls.maxPolarAngle = Math.PI / 2 + 0.12;

    const render = () => renderer.render(scene, camera);
    const syncOverlay = () => {
      const st = stateRef.current;
      if (!st || !st.anno) {
        svg.innerHTML = "";
        return;
      }
      const w = host.clientWidth;
      const h = host.clientHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.innerHTML = overlaySvg(st.anno, camera, controls.target, w, h);
    };

    let raf = 0;
    let dirty = true;
    controls.addEventListener("change", () => (dirty = true));
    const loop = () => {
      raf = requestAnimationFrame(loop);
      controls.update();
      render();
      if (dirty) {
        syncOverlay();
        dirty = false;
      }
    };
    loop();

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      dirty = true;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    stateRef.current = { renderer, scene, camera, controls, svg, render, syncOverlay };
    const st = stateRef.current;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      st.mesh?.geometry.dispose();
      (st.mesh?.material as THREE.Material | undefined)?.dispose();
      st.edges?.geometry.dispose();
      pmrem.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
      host.removeChild(svg);
      stateRef.current = null;
    };
  }, []);

  // rebuild mesh + annotations whenever section / material / annotations change
  useEffect(() => {
    const st = stateRef.current;
    if (!st) return;

    if (st.mesh) {
      st.scene.remove(st.mesh);
      st.mesh.geometry.dispose();
      (st.mesh.material as THREE.Material).dispose();
    }
    if (st.edges) {
      st.scene.remove(st.edges);
      st.edges.geometry.dispose();
      (st.edges.material as THREE.Material).dispose();
    }

    const xs = section.outer.map((p) => p[0]);
    const ys = section.outer.map((p) => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const w = maxX - minX;
    const h = maxY - minY;
    const span = Math.max(w, h);
    const depth = span * 1.6;

    const geo = buildGeometry(section, depth);
    const mesh = new THREE.Mesh(geo, buildMaterial(pbr));
    mesh.castShadow = true;
    st.scene.add(mesh);
    st.mesh = mesh;

    const edgeGeo = new THREE.EdgesGeometry(geo, 28);
    const edges = new THREE.LineSegments(
      edgeGeo,
      new THREE.LineBasicMaterial({ color: 0x0d0f24, transparent: true, opacity: 0.28 }),
    );
    edges.position.copy(mesh.position);
    st.scene.add(edges);
    st.edges = edges;

    // annotation anchors ride the same centering the geometry uses
    if (annoRef.current) {
      st.anno = {
        cxb: (minX + maxX) / 2,
        cyb: (minY + maxY) / 2,
        halfDepth: depth / 2,
        lines: annoRef.current.lines,
        labels: annoRef.current.labels,
      };
    } else {
      st.anno = undefined;
    }

    // frame the object: 3/4 hero view, zoomed out enough that the dimension
    // callouts (which extend past the mesh bounds) stay inside the canvas
    const radius = Math.sqrt(span * span + depth * depth) * 0.78;
    st.camera.position.set(radius * 1.15, radius * 0.62, radius * 1.28);
    st.controls.target.set(0, 0, 0);
    st.controls.update();

    const ground = st.scene.children.find(
      (c) => c instanceof THREE.Mesh && c.material instanceof THREE.ShadowMaterial,
    ) as THREE.Mesh | undefined;
    if (ground) {
      ground.scale.set(radius * 8, radius * 8, 1);
      ground.position.y = -h / 2 - span * 0.02;
    }
    const key = st.scene.children.find((c) => c instanceof THREE.DirectionalLight) as THREE.DirectionalLight | undefined;
    if (key) {
      key.position.set(radius * 1.4, radius * 2.2, radius * 0.9);
      key.shadow.camera.left = -radius * 1.6;
      key.shadow.camera.right = radius * 1.6;
      key.shadow.camera.top = radius * 1.6;
      key.shadow.camera.bottom = -radius * 1.6;
      key.shadow.camera.far = radius * 8;
      key.shadow.camera.updateProjectionMatrix();
    }
    st.render();
    st.syncOverlay();
  }, [section, pbr, annotations]);

  return (
    <div ref={hostRef} className={className} role="img" aria-label="Interactive 3D profile render — drag to rotate" />
  );
}
