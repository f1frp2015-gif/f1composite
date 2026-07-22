// Static shortlist of the most-requested datasheet slugs —
// 8 per profile family (RHS has only 5 catalog sizes, so all 5). These render
// as plain SSR anchors on /resources/downloads so customers can reach
// representative /datasheets/[slug] pages without the
// DB-driven index; the full 114-product catalog stays database-driven at
// /datasheets. Slugs must exist in lib/cadManifest.ts (same modelToSlug
// convention) — keep in sync when the catalog seed changes.

export interface DatasheetHighlightFamily {
  family: string;
  categoryHref: string;
  items: { slug: string; model: string }[];
}

export const DATASHEET_HIGHLIGHTS: DatasheetHighlightFamily[] = [
  {
    family: "Fiberglass I-Beams",
    categoryHref: "/products/standard-profiles/i-beam",
    items: [
      { slug: "i-76x38x6-4", model: "I 76×38×6.4" },
      { slug: "i-100x50x6", model: "I 100×50×6" },
      { slug: "i-120x60x6", model: "I 120×60×6" },
      { slug: "i-152x76x6-4", model: "I 152×76×6.4" },
      { slug: "i-160x80x8", model: "I 160×80×8" },
      { slug: "i-200x100x10", model: "I 200×100×10" },
      { slug: "i-240x120x12", model: "I 240×120×12" },
      { slug: "i-300x150x15", model: "I 300×150×15" },
    ],
  },
  {
    family: "Fiberglass Channels",
    categoryHref: "/products/standard-profiles/channel",
    items: [
      { slug: "u-50x25x5", model: "U 50×25×5" },
      { slug: "u-76x38x6-4", model: "U 76×38×6.4" },
      { slug: "u-100x50x6", model: "U 100×50×6" },
      { slug: "u-120x50x6", model: "U 120×50×6" },
      { slug: "u-152x43x6-4", model: "U 152×43×6.4" },
      { slug: "u-160x48x8", model: "U 160×48×8" },
      { slug: "u-200x60x8", model: "U 200×60×8" },
      { slug: "u-240x72x8", model: "U 240×72×8" },
    ],
  },
  {
    family: "Fiberglass Angles",
    categoryHref: "/products/standard-profiles/angle",
    items: [
      { slug: "l-25x25x3-2", model: "L 25×25×3.2" },
      { slug: "l-38x38x4-8", model: "L 38×38×4.8" },
      { slug: "l-50x50x5", model: "L 50×50×5" },
      { slug: "l-50x50x6", model: "L 50×50×6" },
      { slug: "l-65x65x6", model: "L 65×65×6" },
      { slug: "l-75x75x6", model: "L 75×75×6" },
      { slug: "l-100x100x8", model: "L 100×100×8" },
      { slug: "l-150x150x12", model: "L 150×150×12" },
    ],
  },
  {
    family: "Fiberglass Square Tubes (SHS)",
    categoryHref: "/products/standard-profiles/square-tube",
    items: [
      { slug: "shs-25x25x3-2", model: "SHS 25×25×3.2" },
      { slug: "shs-38x38x4-8", model: "SHS 38×38×4.8" },
      { slug: "shs-50x50x5", model: "SHS 50×50×5" },
      { slug: "shs-60x60x5", model: "SHS 60×60×5" },
      { slug: "shs-75x75x6", model: "SHS 75×75×6" },
      { slug: "shs-100x100x6", model: "SHS 100×100×6" },
      { slug: "shs-120x120x8", model: "SHS 120×120×8" },
      { slug: "shs-152x152x9-5", model: "SHS 152×152×9.5" },
    ],
  },
  {
    family: "Fiberglass Rectangular Tubes (RHS)",
    categoryHref: "/products/standard-profiles/square-tube",
    items: [
      { slug: "rhs-40x20x7", model: "RHS 40×20×7" },
      { slug: "rhs-40x25x8", model: "RHS 40×25×8" },
      { slug: "rhs-80x60x5", model: "RHS 80×60×5" },
      { slug: "rhs-100x60x8", model: "RHS 100×60×8" },
      { slug: "rhs-120x60x5", model: "RHS 120×60×5" },
    ],
  },
  {
    family: "Fiberglass Round Tubes (CHS)",
    categoryHref: "/products/standard-profiles/tube",
    items: [
      { slug: "chs-25x3", model: "CHS 25×3" },
      { slug: "chs-32x3", model: "CHS 32×3" },
      { slug: "chs-50x4", model: "CHS 50×4" },
      { slug: "chs-50x5", model: "CHS 50×5" },
      { slug: "chs-60x5", model: "CHS 60×5" },
      { slug: "chs-76x6-4", model: "CHS 76×6.4" },
      { slug: "chs-89x6-4", model: "CHS 89×6.4" },
      { slug: "chs-100x6", model: "CHS 100×6" },
    ],
  },
  {
    family: "Fiberglass Rods",
    categoryHref: "/products/standard-profiles/rod",
    items: [
      { slug: "rod-6", model: "Rod Ø6" },
      { slug: "rod-10", model: "Rod Ø10" },
      { slug: "rod-12", model: "Rod Ø12" },
      { slug: "rod-16", model: "Rod Ø16" },
      { slug: "rod-20", model: "Rod Ø20" },
      { slug: "rod-25", model: "Rod Ø25" },
      { slug: "rod-32", model: "Rod Ø32" },
      { slug: "rod-50", model: "Rod Ø50" },
    ],
  },
  {
    family: "Fiberglass Flat Bars",
    categoryHref: "/products/standard-profiles/flat-bar",
    items: [
      { slug: "fb-20x3", model: "FB 20×3" },
      { slug: "fb-25x3", model: "FB 25×3" },
      { slug: "fb-30x4", model: "FB 30×4" },
      { slug: "fb-50x5", model: "FB 50×5" },
      { slug: "fb-50x6", model: "FB 50×6" },
      { slug: "fb-75x6", model: "FB 75×6" },
      { slug: "fb-100x6", model: "FB 100×6" },
      { slug: "fb-100x10", model: "FB 100×10" },
    ],
  },
];
