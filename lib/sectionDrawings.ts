import { datasheetFamily, dimensionLabel } from "@/lib/datasheetContent";

/**
 * Dimensioned cross-section drawings of the standard catalog sizes, as static
 * WebP files for Google Images. The inline SVG on a page cannot be indexed as
 * an image; these files can, and each one is the lead image of its datasheet.
 *
 * scripts/covers/draw-section-drawings.mjs draws one per size in
 * lib/catalog/standardProfiles.ts from the same section engine the pages use,
 * and names the file with sectionDrawingPath(); rerun it when a size changes.
 */

export const SECTION_DRAWING_DIR = "/images/sections";
export const SECTION_DRAWING_SIZE = { width: 1200, height: 900 } as const;

const slugify = (text: string) =>
  text.toLowerCase().replace(/×/g, "x").replace(/ø/g, "").replace(/\./g, "-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** "I 100×50×6" + "i_beam" → "/images/sections/fiberglass-i-beam-100x50x6-mm-cross-section.webp" */
export function sectionDrawingPath(model: string, shape: string | undefined): string {
  return `${SECTION_DRAWING_DIR}/${slugify(datasheetFamily(shape).noun)}-${slugify(dimensionLabel(model))}-mm-cross-section.webp`;
}

/** "100 × 50 × 6 mm", "Ø12 mm" */
export function sectionDrawingSize(model: string): string {
  return `${dimensionLabel(model).replace(/×/g, " × ")} mm`;
}

/** Alt text: what the picture shows, in words a searcher would use. */
export function sectionDrawingAlt(model: string, shape: string | undefined): string {
  return `Dimensioned cross-section drawing of a ${sectionDrawingSize(model)} pultruded ${datasheetFamily(shape).noun}`;
}
