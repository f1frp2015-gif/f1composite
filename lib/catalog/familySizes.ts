// Family tables project the same published records used by finder and PDFs.
// Missing or invalid geometry is not guessed from a matching model label.

import { getCategorySizes } from "@/lib/catalog/public";
import { sectionRow, type SectionRow } from "@/lib/catalog/sectionRows";
import type { ShapeId } from "@/lib/catalog/shapes";
import type { CatalogConfiguration } from "@/lib/catalog/identity";

export type ProfileCategory = "i-beam" | "channel" | "angle" | "square-tube" | "round-tube" | "rod" | "flat-bar";

export interface FamilySize extends SectionRow {
  datasheet: string | null;
  configuration: CatalogConfiguration;
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
  const source = await getCategorySizes(category);
  return source.flatMap(({ model, dims, weight, slug, configuration }) => {
    const row = sectionRow(model, shapeOf(category, dims), dims, weight, slug);
    return row ? [{ ...row, slug, datasheet: `/datasheets/${slug}`, configuration }] : [];
  })
    .sort((a, b) => a.d - b.d || (a.b ?? 0) - (b.b ?? 0) || (a.t ?? 0) - (b.t ?? 0));
}
