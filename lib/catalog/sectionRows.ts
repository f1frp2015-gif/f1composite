// One catalog size as the size tables, the profile finder and the search show
// it: nominal dimensions, published mass and the section properties of the
// nominal, sharp-cornered section, computed from lib/catalog so every surface
// agrees with the datasheets.

import { CAD_SLUGS } from "@/lib/cadManifest";
import { modelToSlug } from "@/lib/catalog/public";
import { computeProperties, SHAPES, type ShapeId } from "@/lib/catalog/shapes";

export interface SectionRow {
  model: string;
  slug: string;
  shape: ShapeId;
  /** Nominal dimensions, for drawing the section. */
  dims: Record<string, number>;
  /** Depth, leg, outside diameter or bar width, mm. */
  d: number;
  /** Flange width or second leg, mm; null for round sections and flat bars. */
  b: number | null;
  /** Wall, flange or bar thickness, mm; null for solid rods. */
  t: number | null;
  /** Published mass, kg/m; null when the catalog has none. */
  mass: number | null;
  /** mm² */
  A: number;
  /** cm⁴ */
  Ix: number;
  Iy: number;
  /** Elastic section moduli, cm³ */
  Wx: number;
  Wy: number;
  /** Radii of gyration, mm */
  rx: number;
  ry: number;
  dxf: boolean;
}

const round = (value: number) => Number(value.toPrecision(4));

function mainDimensions(shape: ShapeId, dims: Record<string, number>): Pick<SectionRow, "d" | "b" | "t"> {
  switch (shape) {
    case "i_beam":
    case "channel":
      return { d: dims.H, b: dims.B, t: dims.tw };
    case "angle":
      return { d: dims.a, b: dims.b, t: dims.t };
    case "shs":
      return { d: dims.D, b: dims.D, t: dims.t };
    case "rhs":
      return { d: dims.H, b: dims.B, t: dims.t };
    case "tube":
      return { d: dims.OD, b: null, t: dims.t };
    case "rod":
      return { d: dims.D, b: null, t: null };
    case "flat":
      return { d: dims.H, b: null, t: dims.B };
  }
}

/** The row for one size, or null when its dimensions do not describe the shape. */
export function sectionRow(model: string, shape: ShapeId, dims: Record<string, number>, mass: number | null): SectionRow | null {
  if (!SHAPES[shape].fields.every((field) => Number.isFinite(dims[field.key]) && dims[field.key] > 0)) return null;
  const properties = computeProperties({ kind: "parametric", shape, dims });
  const slug = modelToSlug(model);
  return {
    model,
    slug,
    shape,
    dims,
    ...mainDimensions(shape, dims),
    mass,
    A: round(properties.A),
    Ix: round(properties.Ix / 1e4),
    Iy: round(properties.Iy / 1e4),
    Wx: round(properties.Sx / 1e3),
    Wy: round(properties.Sy / 1e3),
    rx: round(properties.rx),
    ry: round(properties.ry),
    dxf: CAD_SLUGS.has(slug),
  };
}
