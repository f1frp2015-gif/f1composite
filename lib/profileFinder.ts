// Rows for the profile finder: every catalog size with its published mass and
// the section properties of its nominal, sharp-cornered section, computed on
// the server from lib/catalog so the finder, datasheets and search agree.

import { FAMILY_ORDER, PROFILE_FAMILIES } from "@/lib/catalog/profileFamilies";
import { sectionRow, type SectionRow } from "@/lib/catalog/sectionRows";
import type { ShapeId } from "@/lib/catalog/shapes";
import { buildProducts } from "@/lib/catalog/standardProfiles";

export interface FinderRow extends SectionRow {
  family: string;
  /** Published mass, kg/m. */
  mass: number;
}

export function finderRows(): FinderRow[] {
  return buildProducts()
    .map((product): FinderRow => {
      const shape = product.geometry.shape as ShapeId;
      const row = sectionRow(product.model, shape, product.geometry.dims, product.weight);
      if (!row) throw new Error(`${product.model}: catalog dimensions do not describe a ${shape}`);
      return { ...row, family: PROFILE_FAMILIES[shape].label, mass: product.weight };
    })
    .sort((a, b) => FAMILY_ORDER.indexOf(a.shape) - FAMILY_ORDER.indexOf(b.shape) || a.d - b.d || (a.b ?? 0) - (b.b ?? 0) || (a.t ?? 0) - (b.t ?? 0));
}
