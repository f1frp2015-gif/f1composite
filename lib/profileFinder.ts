// Rows for the profile finder: every catalog size with its published mass and
// the section properties of its nominal, sharp-cornered section, computed on
// the server from lib/catalog so the finder, datasheets and search agree.

import { CAD_SLUGS } from "@/lib/cadManifest";
import { FAMILY_ORDER, PROFILE_FAMILIES } from "@/lib/catalog/profileFamilies";
import { modelToSlug } from "@/lib/catalog/public";
import { computeProperties, type ShapeId } from "@/lib/catalog/shapes";
import { buildProducts } from "@/lib/catalog/standardProfiles";

export interface FinderRow {
  model: string;
  slug: string;
  shape: ShapeId;
  family: string;
  /** Nominal dimensions, for drawing the section. */
  dims: Record<string, number>;
  /** Depth, leg, outside diameter or bar width, mm. */
  d: number;
  /** Flange width or second leg, mm; null for round sections and flat bars. */
  b: number | null;
  /** Wall, flange or bar thickness, mm; null for solid rods. */
  t: number | null;
  /** Published mass, kg/m. */
  mass: number;
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

function mainDimensions(shape: ShapeId, dims: Record<string, number>): Pick<FinderRow, "d" | "b" | "t"> {
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

export function finderRows(): FinderRow[] {
  return buildProducts()
    .map((product): FinderRow => {
      const shape = product.geometry.shape as ShapeId;
      const dims = product.geometry.dims;
      const properties = computeProperties({ kind: "parametric", shape, dims });
      const slug = modelToSlug(product.model);
      return {
        model: product.model,
        slug,
        shape,
        family: PROFILE_FAMILIES[shape].label,
        dims,
        ...mainDimensions(shape, dims),
        mass: product.weight,
        A: round(properties.A),
        Ix: round(properties.Ix / 1e4),
        Iy: round(properties.Iy / 1e4),
        Wx: round(properties.Sx / 1e3),
        Wy: round(properties.Sy / 1e3),
        rx: round(properties.rx),
        ry: round(properties.ry),
        dxf: CAD_SLUGS.has(slug),
      };
    })
    .sort((a, b) => FAMILY_ORDER.indexOf(a.shape) - FAMILY_ORDER.indexOf(b.shape) || a.d - b.d || (a.b ?? 0) - (b.b ?? 0) || (a.t ?? 0) - (b.t ?? 0));
}
