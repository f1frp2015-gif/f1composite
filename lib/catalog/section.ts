// Deterministic section-property engine (ported from dimviz lib/section.ts).
//
// A pultruded profile is a constant cross-section swept along a straight
// axis, so every geometric property below is an EXACT function of the 2-D
// cross-section polygon — no simulation, no guessing.
//
// DATA-INTEGRITY RULE: vendor-published mass per meter is authoritative for
// display; engine-computed section properties are geometric derivations and
// are labelled as such on datasheets. Mechanical (strength/modulus) values
// NEVER come from this engine — they come from the formulation's tested data.
//
// Units: geometry mm, areas mm², second moments mm⁴, moduli mm³, mass kg/m.

export type Point = readonly [number, number];

/** A closed cross-section: one outer ring plus zero or more holes. */
export interface Section {
  outer: Point[];
  holes?: Point[][];
}

export interface SectionProperties {
  A: number;
  cx: number;
  cy: number;
  Ix: number;
  Iy: number;
  Sx: number;
  Sy: number;
  rx: number;
  ry: number;
  /** Torsion constant (mm⁴). null when no closed-form estimate applies. */
  J: number | null;
  cTop: number;
  cBottom: number;
  cLeft: number;
  cRight: number;
  width: number;
  height: number;
  /** Mass per meter (kg/m) — present only when a density was supplied. */
  massPerMetre?: number;
}

interface RingRaw {
  A: number;
  qx: number;
  qy: number;
  ixo: number;
  iyo: number;
}

function signedArea(pts: Point[]): number {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    a += x0 * y1 - x1 * y0;
  }
  return a / 2;
}

function ringRaw(input: Point[]): RingRaw {
  const pts = signedArea(input) < 0 ? [...input].reverse() : input;
  let A = 0;
  let qx = 0;
  let qy = 0;
  let ixo = 0;
  let iyo = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    const cross = x0 * y1 - x1 * y0;
    A += cross;
    qx += (x0 + x1) * cross;
    qy += (y0 + y1) * cross;
    ixo += (y0 * y0 + y0 * y1 + y1 * y1) * cross;
    iyo += (x0 * x0 + x0 * x1 + x1 * x1) * cross;
  }
  return { A: A / 2, qx: qx / 6, qy: qy / 6, ixo: ixo / 12, iyo: iyo / 12 };
}

function bbox(section: Section) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of section.outer) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY };
}

export interface PropOptions {
  /** Material density in kg/m³ (FRP ≈ 1900). */
  density?: number;
  /** Analytic overrides for round shapes where a polygon only approximates. */
  analytic?: { A?: number; Ix?: number; Iy?: number; J?: number };
  /** Closed-form torsion constant supplied by the shape generator (mm⁴). */
  J?: number | null;
}

/** Compute exact geometric section properties from a cross-section polygon. */
export function sectionProperties(section: Section, opts: PropOptions = {}): SectionProperties {
  const outer = ringRaw(section.outer);
  const holes = (section.holes ?? []).map(ringRaw);

  let A = outer.A;
  let qx = outer.qx;
  let qy = outer.qy;
  let ixo = outer.ixo;
  let iyo = outer.iyo;
  for (const h of holes) {
    A -= h.A;
    qx -= h.qx;
    qy -= h.qy;
    ixo -= h.ixo;
    iyo -= h.iyo;
  }

  const cx = qx / A;
  const cy = qy / A;
  let Ix = ixo - A * cy * cy;
  let Iy = iyo - A * cx * cx;

  const an = opts.analytic ?? {};
  if (an.A != null) A = an.A;
  if (an.Ix != null) Ix = an.Ix;
  if (an.Iy != null) Iy = an.Iy;

  const { minX, minY, maxX, maxY } = bbox(section);
  const cTop = maxY - cy;
  const cBottom = cy - minY;
  const cLeft = cx - minX;
  const cRight = maxX - cx;

  const Sx = Ix / Math.max(cTop, cBottom);
  const Sy = Iy / Math.max(cLeft, cRight);
  const rx = Math.sqrt(Ix / A);
  const ry = Math.sqrt(Iy / A);

  const J = an.J != null ? an.J : opts.J ?? null;

  const props: SectionProperties = {
    A, cx, cy, Ix, Iy, Sx, Sy, rx, ry, J,
    cTop, cBottom, cLeft, cRight,
    width: maxX - minX,
    height: maxY - minY,
  };

  if (opts.density != null) {
    props.massPerMetre = A * 1e-6 * opts.density;
  }
  return props;
}

/** Format a number to N significant figures. */
export function sig(value: number | null | undefined, figures = 4): string {
  if (value == null || !isFinite(value)) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  let out: string;
  if (abs >= 1e6 || abs < 1e-3) {
    out = value.toExponential(figures - 1);
  } else {
    const digits = Math.max(0, figures - Math.floor(Math.log10(abs)) - 1);
    out = value.toFixed(Math.min(digits, 3));
  }
  return out;
}
