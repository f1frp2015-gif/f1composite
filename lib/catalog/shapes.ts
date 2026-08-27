// Parametric cross-section generators (ported from dimviz lib/profiles/shapes.ts,
// minus the aluminum T-slot, which is not an F1 product; plus a "custom" polygon
// geometry kind for irregular pultrusions digitized from DXF drawings).
//
// A product's geometry is stored in the DB as JSONB in one of two forms:
//   { kind: "parametric", shape: "i_beam", dims: { H, B, tf, tw } }
//   { kind: "polygon", outer: [[x,y],…], holes: [[[x,y],…],…] }
// Parametric shapes derive their polygon + section properties at runtime;
// polygon shapes are used as-is (properties computed from the polygon, J omitted
// unless supplied — FEM-grade J for irregular sections is an offline concern).

import type { Point, Section, SectionProperties } from "./section";
import { sectionProperties } from "./section";

export type ShapeId =
  | "i_beam"
  | "channel"
  | "angle"
  | "tee"
  | "offset_tee"
  | "unequal_channel"
  | "strut_channel"
  | "shs"
  | "rhs"
  | "tube"
  | "rod"
  | "flat";

export interface DimField {
  key: string;
  label: string;
  symbol: string;
}

export interface ShapeDef {
  id: ShapeId;
  label: string;
  family: string;
  fields: DimField[];
  build: (d: Record<string, number>) => Section;
  analytic?: (d: Record<string, number>) => { A?: number; Ix?: number; Iy?: number; J?: number };
  torsion?: (d: Record<string, number>) => number;
  designation: (d: Record<string, number>) => string;
  validate?: (d: Record<string, number>) => string | null;
}

const circle = (r: number, cx = 0, cy = 0, n = 120): Point[] => {
  const pts: Point[] = [];
  for (let i = 0; i < n; i++) {
    const a = (2 * Math.PI * i) / n;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
};

const iBeam: ShapeDef = {
  id: "i_beam",
  label: "I-Beam / Wide Flange",
  family: "pultruded structural beam",
  fields: [
    { key: "H", label: "Depth", symbol: "H" },
    { key: "B", label: "Flange width", symbol: "B" },
    { key: "tf", label: "Flange thickness", symbol: "tf" },
    { key: "tw", label: "Web thickness", symbol: "tw" },
  ],
  build: ({ H, B, tf, tw }) => {
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
  },
  torsion: ({ H, B, tf, tw }) => (2 * B * tf ** 3 + (H - 2 * tf) * tw ** 3) / 3,
  designation: ({ H, B, tw }) => `I ${H}×${B}×${tw}`,
};

const channel: ShapeDef = {
  id: "channel",
  label: "Channel / U-Profile",
  family: "pultruded channel",
  fields: [
    { key: "H", label: "Depth", symbol: "H" },
    { key: "B", label: "Flange width", symbol: "B" },
    { key: "tf", label: "Flange thickness", symbol: "tf" },
    { key: "tw", label: "Web thickness", symbol: "tw" },
  ],
  build: ({ H, B, tf, tw }) => {
    const hh = H / 2;
    return {
      outer: [
        [0, -hh], [B, -hh], [B, -hh + tf], [tw, -hh + tf],
        [tw, hh - tf], [B, hh - tf], [B, hh], [0, hh],
      ],
    };
  },
  torsion: ({ H, B, tf, tw }) => (H * tw ** 3 + 2 * (B - tw) * tf ** 3) / 3,
  designation: ({ H, B, tw }) => `U ${H}×${B}×${tw}`,
};

const angle: ShapeDef = {
  id: "angle",
  label: "Angle / L-Profile",
  family: "pultruded angle",
  fields: [
    { key: "a", label: "Vertical leg", symbol: "a" },
    { key: "b", label: "Horizontal leg", symbol: "b" },
    { key: "t", label: "Thickness", symbol: "t" },
  ],
  build: ({ a, b, t }) => ({
    outer: [
      [0, 0], [b, 0], [b, t], [t, t], [t, a], [0, a],
    ],
  }),
  torsion: ({ a, b, t }) => (a * t ** 3 + (b - t) * t ** 3) / 3,
  designation: ({ a, b, t }) => `L ${a}×${b}×${t}`,
};

const tee: ShapeDef = {
  id: "tee",
  label: "T-Section",
  family: "pultruded T-section",
  fields: [
    { key: "H", label: "Overall depth", symbol: "H" },
    { key: "B", label: "Flange width", symbol: "B" },
    { key: "tf", label: "Flange thickness", symbol: "tf" },
    { key: "tw", label: "Web thickness", symbol: "tw" },
  ],
  build: ({ H, B, tf, tw }) => {
    const hb = B / 2;
    const hw = tw / 2;
    return {
      outer: [
        [-hb, H], [hb, H], [hb, H - tf], [hw, H - tf],
        [hw, 0], [-hw, 0], [-hw, H - tf], [-hb, H - tf],
      ],
    };
  },
  torsion: ({ H, B, tf, tw }) => (B * tf ** 3 + (H - tf) * tw ** 3) / 3,
  designation: ({ H, B, tf, tw }) =>
    tf === tw ? `T ${B}×${H}×${tw}` : `T ${B}×${H}×${tw}×${tf}`,
  validate: ({ H, B, tf, tw }) =>
    tf >= H ? "flange thickness must be smaller than depth" : tw >= B ? "web thickness must be smaller than flange width" : null,
};

const offsetTee: ShapeDef = {
  id: "offset_tee",
  label: "Offset T-Section (OT)",
  family: "custom pultruded offset T-section",
  fields: [
    { key: "H", label: "Overall depth", symbol: "H" },
    { key: "BL", label: "Left flange projection", symbol: "BL" },
    { key: "BR", label: "Right flange projection", symbol: "BR" },
    { key: "t", label: "Uniform thickness", symbol: "t" },
  ],
  build: ({ H, BL, BR, t }) => ({
    outer: [
      [-BL, H], [BR, H], [BR, H - t], [t / 2, H - t],
      [t / 2, 0], [-t / 2, 0], [-t / 2, H - t], [-BL, H - t],
    ],
  }),
  torsion: ({ H, BL, BR, t }) => ((BL + BR) * t ** 3 + (H - t) * t ** 3) / 3,
  designation: ({ H, BL, BR, t }) => `OT ${BL}+${BR}×${H}×${t}`,
  validate: ({ H, BL, BR, t }) =>
    t >= H || t >= BL + BR ? "thickness must be smaller than the overall section dimensions" : null,
};

const unequalChannel: ShapeDef = {
  id: "unequal_channel",
  label: "Unequal Channel (UC)",
  family: "custom pultruded unequal-flange channel",
  fields: [
    { key: "H", label: "Overall depth", symbol: "H" },
    { key: "B1", label: "Long flange width", symbol: "B1" },
    { key: "B2", label: "Short flange width", symbol: "B2" },
    { key: "t", label: "Uniform thickness", symbol: "t" },
  ],
  build: ({ H, B1, B2, t }) => ({
    outer: [
      [0, 0], [B2, 0], [B2, t], [t, t],
      [t, H - t], [B1, H - t], [B1, H], [0, H],
    ],
  }),
  torsion: ({ H, B1, B2, t }) => (H * t ** 3 + (B1 - t) * t ** 3 + (B2 - t) * t ** 3) / 3,
  designation: ({ H, B1, B2, t }) => `UC ${B1}×${H}×${B2}×${t}`,
  validate: ({ H, B1, B2, t }) =>
    t >= Math.min(H, B1, B2) ? "thickness must be smaller than depth and both flange widths" : null,
};

const strutChannel: ShapeDef = {
  id: "strut_channel",
  label: "Strut / Unistrut-Type Channel",
  family: "custom pultruded lipped strut channel",
  fields: [
    { key: "H", label: "Overall depth", symbol: "H" },
    { key: "B", label: "Overall width", symbol: "B" },
    { key: "t", label: "Uniform thickness", symbol: "t" },
    { key: "lip", label: "Inward lip length", symbol: "L" },
    { key: "return", label: "Lip return depth", symbol: "R" },
  ],
  build: ({ H, B, t, lip, return: ret }) => ({
    outer: [
      [lip, H], [0, H], [0, 0], [B, 0], [B, H], [B - lip, H],
      [B - lip, H - ret], [B - lip - t, H - ret], [B - lip - t, H - t],
      [B - t, H - t], [B - t, t], [t, t], [t, H - t],
      [t + lip, H - t], [t + lip, H - ret], [lip, H - ret],
    ],
  }),
  torsion: ({ H, B, t, lip, return: ret }) =>
    (B * t ** 3 + 2 * (H - t) * t ** 3 + 2 * lip * t ** 3 + 2 * ret * t ** 3) / 3,
  designation: ({ H, B, t, lip, return: ret }) => `STRUT ${B}×${H}×${t} L${lip} R${ret}`,
  validate: ({ H, B, t, lip, return: ret }) => {
    if (2 * t >= Math.min(H, B)) return "wall thickness is too large for the overall strut dimensions";
    if (lip + t >= B / 2) return "lip plus wall thickness must leave a positive slot opening";
    if (ret >= H - t) return "lip return depth must be smaller than the clear channel depth";
    return null;
  },
};

const shs: ShapeDef = {
  id: "shs",
  label: "Square Hollow (SHS)",
  family: "pultruded square tube",
  fields: [
    { key: "D", label: "Side", symbol: "D" },
    { key: "t", label: "Wall thickness", symbol: "t" },
  ],
  build: ({ D, t }) => {
    const h = D / 2;
    const hi = h - t;
    return {
      outer: [[-h, -h], [h, -h], [h, h], [-h, h]],
      holes: [[[-hi, -hi], [hi, -hi], [hi, hi], [-hi, hi]]],
    };
  },
  torsion: ({ D, t }) => {
    const m = D - t;
    return (4 * (m * m) ** 2 * t) / (2 * (m + m));
  },
  designation: ({ D, t }) => `SHS ${D}×${D}×${t}`,
};

const rhs: ShapeDef = {
  id: "rhs",
  label: "Rectangular Hollow (RHS)",
  family: "pultruded rectangular tube",
  fields: [
    { key: "H", label: "Depth", symbol: "H" },
    { key: "B", label: "Width", symbol: "B" },
    { key: "t", label: "Wall thickness", symbol: "t" },
  ],
  build: ({ H, B, t }) => {
    const hh = H / 2;
    const hb = B / 2;
    const ih = hh - t;
    const ib = hb - t;
    return {
      outer: [[-hb, -hh], [hb, -hh], [hb, hh], [-hb, hh]],
      holes: [[[-ib, -ih], [ib, -ih], [ib, ih], [-ib, ih]]],
    };
  },
  torsion: ({ H, B, t }) => {
    const bm = B - t;
    const hm = H - t;
    return (2 * t * (bm * bm) * (hm * hm)) / (bm + hm);
  },
  designation: ({ H, B, t }) => `RHS ${H}×${B}×${t}`,
};

const tube: ShapeDef = {
  id: "tube",
  label: "Round Tube (CHS)",
  family: "pultruded round tube",
  fields: [
    { key: "OD", label: "Outside diameter", symbol: "OD" },
    { key: "t", label: "Wall thickness", symbol: "t" },
  ],
  build: ({ OD, t }) => ({
    outer: circle(OD / 2),
    holes: [circle(OD / 2 - t).slice().reverse()],
  }),
  analytic: ({ OD, t }) => {
    const ro = OD / 2;
    const ri = ro - t;
    const A = Math.PI * (ro ** 2 - ri ** 2);
    const I = (Math.PI * (ro ** 4 - ri ** 4)) / 4;
    return { A, Ix: I, Iy: I, J: 2 * I };
  },
  designation: ({ OD, t }) => `CHS ⌀${OD}×${t}`,
};

const rod: ShapeDef = {
  id: "rod",
  label: "Round Rod (Solid)",
  family: "pultruded solid rod",
  fields: [{ key: "D", label: "Diameter", symbol: "D" }],
  build: ({ D }) => ({ outer: circle(D / 2) }),
  analytic: ({ D }) => {
    const r = D / 2;
    const A = Math.PI * r ** 2;
    const I = (Math.PI * r ** 4) / 4;
    return { A, Ix: I, Iy: I, J: (Math.PI * D ** 4) / 32 };
  },
  designation: ({ D }) => `ROD ⌀${D}`,
};

const flat: ShapeDef = {
  id: "flat",
  label: "Flat Bar",
  family: "pultruded flat bar",
  fields: [
    { key: "H", label: "Width", symbol: "H" },
    { key: "B", label: "Thickness", symbol: "B" },
  ],
  build: ({ H, B }) => {
    const hh = H / 2;
    const hb = B / 2;
    return { outer: [[-hb, -hh], [hb, -hh], [hb, hh], [-hb, hh]] };
  },
  torsion: ({ H, B }) => {
    const a = Math.max(H, B) / 2;
    const bb = Math.min(H, B) / 2;
    return a * bb ** 3 * (16 / 3 - 3.36 * (bb / a) * (1 - bb ** 4 / (12 * a ** 4)));
  },
  designation: ({ H, B }) => `FLAT ${H}×${B}`,
};

export const SHAPES: Record<ShapeId, ShapeDef> = {
  i_beam: iBeam,
  channel,
  angle,
  tee,
  offset_tee: offsetTee,
  unequal_channel: unequalChannel,
  strut_channel: strutChannel,
  shs,
  rhs,
  tube,
  rod,
  flat,
};

// ── geometry (as stored in products.geometry JSONB) ────────────────────────

export interface ParametricGeometry {
  kind: "parametric";
  shape: ShapeId;
  dims: Record<string, number>;
}

export interface PolygonGeometry {
  kind: "polygon";
  outer: Point[];
  holes?: Point[][];
  /** Optional offline-computed torsion constant (mm⁴, e.g. from FEM). */
  J?: number;
}

export type Geometry = ParametricGeometry | PolygonGeometry;

/** Build the cross-section polygon for any geometry. */
export function buildSection(geo: Geometry): Section {
  if (geo.kind === "polygon") {
    return { outer: geo.outer, holes: geo.holes };
  }
  const def = SHAPES[geo.shape];
  return def.build(geo.dims);
}

/** Compute geometric section properties for any geometry. */
export function computeProperties(geo: Geometry, density?: number): SectionProperties {
  if (geo.kind === "polygon") {
    return sectionProperties(
      { outer: geo.outer, holes: geo.holes },
      { density, J: geo.J ?? null },
    );
  }
  const def = SHAPES[geo.shape];
  return sectionProperties(def.build(geo.dims), {
    density,
    analytic: def.analytic?.(geo.dims),
    J: def.torsion ? def.torsion(geo.dims) : null,
  });
}

/** Human designation, e.g. "I 240×120×12". */
export function designation(geo: Geometry): string | null {
  if (geo.kind === "polygon") return null;
  return SHAPES[geo.shape].designation(geo.dims);
}

/** Dimension rows for display: [{symbol,label,value}] */
export function dimensionRows(geo: Geometry): { symbol: string; label: string; value: number }[] {
  if (geo.kind === "polygon") return [];
  const def = SHAPES[geo.shape];
  return def.fields.map((f) => ({ symbol: f.symbol, label: f.label, value: geo.dims[f.key] }));
}

/** Validate a geometry object coming from admin input. Returns error or null. */
export function validateGeometry(geo: unknown): string | null {
  if (!geo || typeof geo !== "object") return "geometry must be an object";
  const g = geo as Record<string, unknown>;
  if (g.kind === "parametric") {
    const shape = g.shape as string;
    if (!(shape in SHAPES)) return `unknown shape "${shape}"`;
    const dims = g.dims as Record<string, unknown> | undefined;
    if (!dims) return "dims required";
    for (const f of SHAPES[shape as ShapeId].fields) {
      const v = dims[f.key];
      if (typeof v !== "number" || !isFinite(v) || v <= 0) {
        return `dims.${f.key} (${f.label}) must be a positive number`;
      }
    }
    const shapeError = SHAPES[shape as ShapeId].validate?.(dims as Record<string, number>);
    if (shapeError) return shapeError;
    return null;
  }
  if (g.kind === "polygon") {
    const outer = g.outer as unknown;
    if (!Array.isArray(outer) || outer.length < 3) return "polygon.outer needs ≥3 points";
    const okRing = (ring: unknown) =>
      Array.isArray(ring) &&
      ring.every(
        (p) => Array.isArray(p) && p.length === 2 && p.every((n) => typeof n === "number" && isFinite(n)),
      );
    if (!okRing(outer)) return "polygon.outer must be [[x,y],…] numbers";
    if (g.holes != null) {
      if (!Array.isArray(g.holes) || !(g.holes as unknown[]).every(okRing)) {
        return "polygon.holes must be an array of [[x,y],…] rings";
      }
    }
    return null;
  }
  return `geometry.kind must be "parametric" or "polygon"`;
}
