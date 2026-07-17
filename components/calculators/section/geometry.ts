// Cross-section geometry for the calculator's live section preview.
//
// Shape builders and dimension annotations ported from DimViz (dimviz.com).
// Each calculator shape id maps to a closed polygon (outer ring + holes) in
// mm, y-up, built from the same H/B/tw/tf state the calculator already holds.
// The design checks in ProfileCalculator.tsx remain the numeric source of
// truth — this module only feeds the 3D viewer and the 2-D drawing.

export type Point = readonly [number, number];

/** A closed cross-section: one outer ring plus zero or more holes. */
export interface Section {
  outer: Point[];
  holes?: Point[][];
}

const circle = (r: number, n = 120): Point[] => {
  const pts: Point[] = [];
  for (let i = 0; i < n; i++) {
    const a = (2 * Math.PI * i) / n;
    pts.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  return pts;
};

/**
 * Build the section polygon for a calculator shape id. Returns null while the
 * dimensions are degenerate (free-typed number inputs pass through 0 / partial
 * values mid-edit) so callers can fall back to a placeholder instead of
 * feeding NaN geometry to the renderers.
 */
export function buildSection(shape: string, H: number, B: number, tw: number, tf: number): Section | null {
  if (![H, B, tw, tf].every((v) => Number.isFinite(v))) return null;
  switch (shape) {
    case "i-beam": {
      if (H <= 0 || B <= 0 || tw <= 0 || tf <= 0 || tf * 2 >= H || tw >= B) return null;
      const hh = H / 2;
      const hb = B / 2;
      const hw = tw / 2;
      const yi = hh - tf;
      return {
        outer: [
          [-hb, -hh], [hb, -hh], [hb, -yi], [hw, -yi],
          [hw, yi], [hb, yi], [hb, hh], [-hb, hh],
          [-hb, yi], [-hw, yi], [-hw, -yi], [-hb, -yi],
        ],
      };
    }
    case "channel": {
      if (H <= 0 || B <= 0 || tw <= 0 || tf <= 0 || tf * 2 >= H || tw >= B) return null;
      const hh = H / 2;
      return {
        outer: [
          [0, -hh], [B, -hh], [B, -hh + tf], [tw, -hh + tf],
          [tw, hh - tf], [B, hh - tf], [B, hh], [0, hh],
        ],
      };
    }
    case "angle": {
      const t = tw;
      if (H <= 0 || B <= 0 || t <= 0 || t >= H || t >= B) return null;
      return { outer: [[0, 0], [B, 0], [B, t], [t, t], [t, H], [0, H]] };
    }
    case "square-tube": {
      const t = tw;
      if (H <= 0 || B <= 0 || t <= 0 || t * 2 >= Math.min(H, B)) return null;
      const hh = H / 2;
      const hb = B / 2;
      const ih = hh - t;
      const ib = hb - t;
      return {
        outer: [[-hb, -hh], [hb, -hh], [hb, hh], [-hb, hh]],
        holes: [[[-ib, -ih], [ib, -ih], [ib, ih], [-ib, ih]]],
      };
    }
    case "round-tube": {
      const t = tw;
      const ro = H / 2;
      if (H <= 0 || t <= 0 || t >= ro) return null;
      return { outer: circle(ro), holes: [circle(ro - t).slice().reverse()] };
    }
    default:
      return null;
  }
}

// ── centroid (polygon contour integrals, holes subtract) ─────────────────

function ringAreaMoments(input: Point[]): { A: number; qx: number; qy: number } {
  let A = 0;
  let qx = 0;
  let qy = 0;
  for (let i = 0; i < input.length; i++) {
    const [x0, y0] = input[i];
    const [x1, y1] = input[(i + 1) % input.length];
    const cross = x0 * y1 - x1 * y0;
    A += cross;
    qx += (x0 + x1) * cross;
    qy += (y0 + y1) * cross;
  }
  const s = A < 0 ? -1 : 1;
  return { A: (s * A) / 2, qx: (s * qx) / 6, qy: (s * qy) / 6 };
}

export function centroid(section: Section): { cx: number; cy: number } {
  const o = ringAreaMoments(section.outer);
  let A = o.A;
  let qx = o.qx;
  let qy = o.qy;
  for (const h of section.holes ?? []) {
    const r = ringAreaMoments(h);
    A -= r.A;
    qx -= r.qx;
    qy -= r.qy;
  }
  return A ? { cx: qx / A, cy: qy / A } : { cx: 0, cy: 0 };
}

// ── material looks for the 3D viewer ─────────────────────────────────────

export interface MaterialPbr {
  /** base colour (sRGB hex). */
  color: string;
  metalness: number;
  roughness: number;
  /** procedural texture painted into the roughness map. */
  texture: "brushed" | "fibre" | "none";
  /** clearcoat layer (resin sheen), 0–1. */
  clearcoat?: number;
}

export const SECTION_LOOKS = {
  frp: { color: "#878c94", metalness: 0.0, roughness: 0.55, texture: "fibre", clearcoat: 0.35 },
  steel: { color: "#8f959f", metalness: 0.92, roughness: 0.42, texture: "none" },
  alu: { color: "#cdd1d6", metalness: 0.85, roughness: 0.38, texture: "brushed" },
} as const satisfies Record<string, MaterialPbr>;

export type SectionLook = keyof typeof SECTION_LOOKS;

// ── dimension annotations (authored in section coordinates, mm, y-up) ────

export interface AnnoLine {
  a: [number, number];
  b: [number, number];
  dash?: boolean;
  arrowA?: boolean;
  arrowB?: boolean;
  faint?: boolean;
}

export interface AnnoLabel {
  at: [number, number];
  text: string;
  /** horizontal text anchor */
  align?: "l" | "r" | "c";
  /** vertical baseline */
  vAlign?: "t" | "m" | "b";
  /** de-emphasised (axis tick letters) */
  faint?: boolean;
}

export interface Annotations {
  lines: AnnoLine[];
  labels: AnnoLabel[];
}

const fmt = (v: number) => `${Math.round(v * 10) / 10} mm`;

/**
 * Overall H/B dimensions, centroidal y–y / z–z axes, and per-shape thickness
 * callouts. Labels reuse the calculator's own field symbols (H, B, t_w, t_f)
 * so the preview reads as the drawing of the numbers typed above it.
 */
export function buildAnnotations(
  shape: string,
  d: { H: number; B: number; tw: number; tf: number },
  section: Section,
  c: { cx: number; cy: number },
): Annotations {
  const xs = section.outer.map((p) => p[0]);
  const ys = section.outer.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const w = maxX - minX;
  const h = maxY - minY;
  const span = Math.max(w, h) || 1;

  const dimOff = span * 0.2;
  const extEnd = span * 0.26;
  const g = span * 0.08;

  const lines: AnnoLine[] = [];
  const labels: AnnoLabel[] = [];

  // overall depth (right side) — the calculator's H (OD for round tube)
  lines.push({ a: [maxX, maxY], b: [maxX + extEnd, maxY], faint: true });
  lines.push({ a: [maxX, minY], b: [maxX + extEnd, minY], faint: true });
  lines.push({ a: [maxX + dimOff, maxY], b: [maxX + dimOff, minY], arrowA: true, arrowB: true });
  labels.push({
    at: [maxX + dimOff, (maxY + minY) / 2],
    text: `${shape === "round-tube" ? "OD" : "H"} ${fmt(h)}`,
    align: "l",
    vAlign: "m",
  });

  // overall width (bottom) — redundant for a circle, so skipped there
  if (shape !== "round-tube") {
    lines.push({ a: [minX, minY], b: [minX, minY - extEnd], faint: true });
    lines.push({ a: [maxX, minY], b: [maxX, minY - extEnd], faint: true });
    lines.push({ a: [minX, minY - dimOff], b: [maxX, minY - dimOff], arrowA: true, arrowB: true });
    labels.push({ at: [(minX + maxX) / 2, minY - dimOff], text: `B ${fmt(w)}`, align: "c", vAlign: "t" });
  }

  // centroidal axes y–y (horizontal) and z–z (vertical)
  lines.push({ a: [minX - extEnd, c.cy], b: [maxX + extEnd, c.cy], dash: true, faint: true });
  labels.push({ at: [minX - extEnd, c.cy], text: "y", align: "r", vAlign: "m", faint: true });
  labels.push({ at: [maxX + extEnd, c.cy], text: "y", align: "l", vAlign: "m", faint: true });
  lines.push({ a: [c.cx, minY - extEnd], b: [c.cx, maxY + extEnd], dash: true, faint: true });
  labels.push({ at: [c.cx, maxY + extEnd], text: "z", align: "c", vAlign: "b", faint: true });
  labels.push({ at: [c.cx, minY - extEnd], text: "z", align: "c", vAlign: "t", faint: true });

  // per-shape thickness callouts, placed in each builder's coordinate frame
  const vDim = (x: number, y0: number, y1: number, off: number, text: string, side: "l" | "r") => {
    const dx = x + off;
    lines.push({ a: [x, y0], b: [dx, y0], faint: true });
    lines.push({ a: [x, y1], b: [dx, y1], faint: true });
    lines.push({ a: [dx, y0], b: [dx, y1], arrowA: true, arrowB: true });
    labels.push({ at: [dx, (y0 + y1) / 2], text, align: side === "l" ? "r" : "l", vAlign: "m" });
  };
  const hLeader = (x0: number, x1: number, y: number, text: string) => {
    lines.push({ a: [x0, y], b: [x1, y], arrowA: true, arrowB: true });
    labels.push({ at: [x1 + g * 0.3, y], text, align: "l", vAlign: "m" });
  };

  switch (shape) {
    case "i-beam":
      vDim(-d.B / 2, d.H / 2, d.H / 2 - d.tf, -g, `t_f ${fmt(d.tf)}`, "l");
      hLeader(-d.tw / 2, d.tw / 2, 0, `t_w ${fmt(d.tw)}`);
      break;
    case "channel":
      vDim(d.B, d.H / 2, d.H / 2 - d.tf, g, `t_f ${fmt(d.tf)}`, "r");
      hLeader(0, d.tw, -d.H * 0.25, `t_w ${fmt(d.tw)}`);
      break;
    case "angle":
      vDim(d.B * 0.72, 0, d.tw, g, `t ${fmt(d.tw)}`, "r");
      break;
    case "square-tube":
      vDim(0, d.H / 2, d.H / 2 - d.tw, g, `t ${fmt(d.tw)}`, "r");
      break;
    case "round-tube":
      hLeader(d.H / 2 - d.tw, d.H / 2, 0, `t ${fmt(d.tw)}`);
      break;
  }

  return { lines, labels };
}

// ── SVG path helpers for the 2-D drawing ─────────────────────────────────

/** engineering (y-up) → screen (y-down) path string */
export function toPath(pts: Point[], close = true): string {
  if (pts.length === 0) return "";
  let path = "";
  pts.forEach((p, i) => {
    path += `${i === 0 ? "M" : "L"}${p[0].toFixed(2)} ${(-p[1]).toFixed(2)} `;
  });
  return close ? `${path}Z` : path.trim();
}

/** Path for a filled section with holes (even-odd fill rule). */
export function sectionPath(outer: Point[], holes: Point[][] = []): string {
  return [toPath(outer), ...holes.map((h) => toPath(h))].join(" ");
}
