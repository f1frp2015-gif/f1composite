// Rows for the profile finder: every catalog size with its published mass and
// the section properties of its nominal, sharp-cornered section, computed on
// the server from lib/catalog so the finder, datasheets and search agree.

import { FAMILY_ORDER, PROFILE_FAMILIES } from "@/lib/catalog/profileFamilies";
import { sectionRow, type SectionRow } from "@/lib/catalog/sectionRows";
import type { ShapeId } from "@/lib/catalog/shapes";
import type { PublishedProfile } from "@/lib/catalog/published";
import type { CatalogConfiguration } from "@/lib/catalog/identity";

export interface FinderRow extends SectionRow {
  family: string;
  /** Published mass, kg/m. */
  mass: number | null;
  categorySlug: string;
  configuration: CatalogConfiguration;
}

export function finderRows(profiles: readonly PublishedProfile[]): FinderRow[] {
  return profiles.flatMap((profile): FinderRow[] => {
    const geometry = profile.product.geometry;
    if (geometry?.kind !== "parametric") return [];
    const shape = geometry.shape as ShapeId;
    const row = sectionRow(profile.product.model, shape, geometry.dims, profile.product.weight_per_m, profile.slug);
    if (!row) return [];
    return [{ ...row, slug: profile.slug, family: PROFILE_FAMILIES[shape].label,
      categorySlug: profile.category?.slug ?? "", configuration: profile.configuration }];
  }).sort((a, b) => FAMILY_ORDER.indexOf(a.shape) - FAMILY_ORDER.indexOf(b.shape) || a.d - b.d || (a.b ?? 0) - (b.b ?? 0) || (a.t ?? 0) - (b.t ?? 0));
}
