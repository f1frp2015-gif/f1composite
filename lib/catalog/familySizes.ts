// The size table of a standard profile page: the admin catalog's rows when the
// database is populated, else the published seed catalog, each with its
// nominal section properties, datasheet and DXF. A database row without usable
// dimensions borrows the seed row of the same model; a size that neither can
// describe is left out, because it can be neither drawn nor computed.

import { getCategorySizes } from "@/lib/catalog/public";
import { sectionRow, type SectionRow } from "@/lib/catalog/sectionRows";
import type { ShapeId } from "@/lib/catalog/shapes";
import { buildProducts } from "@/lib/catalog/standardProfiles";
import { datasheetHrefForModel } from "@/lib/datasheetContent";

export type ProfileCategory = "i-beam" | "channel" | "angle" | "square-tube" | "round-tube" | "rod" | "flat-bar";

export interface FamilySize extends SectionRow {
  datasheet: string | null;
}

const CATEGORY_SHAPES: Record<Exclude<ProfileCategory, "square-tube">, ShapeId> = {
  "i-beam": "i_beam",
  channel: "channel",
  angle: "angle",
  "round-tube": "tube",
  rod: "rod",
  "flat-bar": "flat",
};

// Square tubes store their side as D; rectangular tubes store H × B.
const shapeOf = (category: ProfileCategory, dims: Record<string, number>): ShapeId =>
  category === "square-tube" ? (dims.D ? "shs" : "rhs") : CATEGORY_SHAPES[category];

export async function loadFamilySizes(category: ProfileCategory): Promise<FamilySize[]> {
  const seed = buildProducts().filter((product) => product.cat === category);
  const seedDims = new Map(seed.map((product) => [product.model, product.geometry.dims]));
  const database = await getCategorySizes(category);
  const source = database.length
    ? database.map((row) => ({ model: row.model, dims: Object.keys(row.dims).length ? row.dims : (seedDims.get(row.model) ?? {}), mass: row.weight }))
    : seed.map((product) => ({ model: product.model, dims: product.geometry.dims, mass: product.weight }));
  return source
    .flatMap(({ model, dims, mass }) => {
      const row = sectionRow(model, shapeOf(category, dims), dims, mass);
      return row ? [{ ...row, datasheet: datasheetHrefForModel(model) }] : [];
    })
    .sort((a, b) => a.d - b.d || (a.b ?? 0) - (b.b ?? 0) || (a.t ?? 0) - (b.t ?? 0));
}
