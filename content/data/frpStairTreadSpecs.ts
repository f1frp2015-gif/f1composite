export interface StairTreadReferenceRow {
  family: string;
  bestFor: string;
  treadDepth: string;
  lengthOrWidth: string;
  structuralDepth: string;
  surfaceAndNosing: string;
  releaseBasis: string;
}

export const frpStairTreadImageAssets = {
  coverHero: "/images/products/frp-stair-treads/frp-stair-tread-covers-installed.webp",
  retrofitBefore: "/images/products/frp-stair-treads/metal-grating-stairs-before-retrofit.webp",
  fastenerDetail: "/images/products/frp-stair-treads/frp-stair-tread-cover-fastener-detail.webp",
  moldedCloseup: "/images/products/molded-frp-grating/molded-grating-grit-mesh-closeup.webp",
  pultrudedCloseup: "/images/products/pultruded-frp-grating/pultruded-grating-t-bar-closeup.webp",
  fullStaircase: "/images/case-studies/frp-factory-access-staircase-hero.webp",
} as const;

/**
 * Selection references for the stair-tread family. The two cover rows are
 * converted from the supplier reference page supplied for this update:
 * 12 / 13.5 in tread depth × 144 in stock length × 1/8 in thickness.
 * They are not F1 inventory or order-code commitments. Grating-tread rows are
 * shortlist families linked to the dedicated molded/pultruded grating data.
 */
export const stairTreadReferenceRows: readonly StairTreadReferenceRow[] = [
  {
    family: "Retrofit cover · 12 in reference",
    bestFor: "Sound steel, concrete, timber or brick steps",
    treadDepth: "305 mm (12 in)",
    lengthOrWidth: "3,658 mm (144 in) stock reference; cut to schedule",
    structuralDepth: "3.2 mm (1/8 in)",
    surfaceAndNosing: "Solid coarse-grit top; black with yellow leading edge",
    releaseBasis: "Confirm substrate, cut length, nose return, resin and fixing schedule",
  },
  {
    family: "Retrofit cover · 13.5 in reference",
    bestFor: "Deeper sound existing steps and landings",
    treadDepth: "343 mm (13.5 in)",
    lengthOrWidth: "3,658 mm (144 in) stock reference; cut to schedule",
    structuralDepth: "3.2 mm (1/8 in)",
    surfaceAndNosing: "Solid coarse-grit top; black with yellow leading edge",
    releaseBasis: "Confirm substrate, cut length, nose return, resin and fixing schedule",
  },
  {
    family: "Molded grating tread",
    bestFor: "New stairs, drainage, frequent wet or corrosive exposure",
    treadDepth: "Project tread depth; cut from approved panel layout",
    lengthOrWidth: "Project clear width and end-bearing detail",
    structuralDepth: "25 or 38 mm shortlist; other catalog depths available",
    surfaceAndNosing: "Open square or mini mesh; grit top; contrasting integral nosing",
    releaseBasis: "Load table, support spacing, mesh opening and approved tread drawing",
  },
  {
    family: "Pultruded T-bar tread",
    bestFor: "Longer one-way spans and higher directional stiffness",
    treadDepth: "Project tread depth; fabricated from T-bar grating",
    lengthOrWidth: "Project clear width and bearing direction",
    structuralDepth: "25 or 38 mm pedestrian T-bar shortlist",
    surfaceAndNosing: "Open T-bar surface; fine/coarse grit; contrasting nosing option",
    releaseBasis: "Series load table, span/deflection check and approved end-plate detail",
  },
] as const;

export const stairTreadSelectionFamilies = [
  {
    name: "Retrofit tread covers",
    decision: "Keep the existing stair",
    bestFor: "Structurally sound steps that are slippery, worn or visually poor.",
    avoidWhen: "Do not cover through-corroded steel, loose masonry, spalled concrete or a failed stringer.",
    shortlist: "305 or 343 mm nominal depth × 3.2 mm; cut from a 3,658 mm supplier-reference length.",
    image: frpStairTreadImageAssets.coverHero,
    imageAlt: "Black coarse-grit FRP stair tread covers with high-visibility yellow leading edges installed over existing stairs",
    href: "#cover-reference-sizes",
  },
  {
    name: "Molded grating treads",
    decision: "Replace the whole tread",
    bestFor: "New or replacement stairs where water, ice, dirt or washdown must drain through.",
    avoidWhen: "Do not release from depth alone; mesh opening, support width and load table still govern.",
    shortlist: "25 or 38 mm molded panel depth with square or mini mesh and an integral grit nosing.",
    image: frpStairTreadImageAssets.moldedCloseup,
    imageAlt: "Close-up of molded fiberglass grating with square mesh and bonded grit surface",
    href: "/products/molded-frp-grating",
  },
  {
    name: "Pultruded T-bar treads",
    decision: "Carry a longer clear width",
    bestFor: "New stair flights governed by one-way span, directional stiffness or project-specific deflection.",
    avoidWhen: "Bearing-bar direction cannot be rotated casually; end plates and stringer connections must match the drawing.",
    shortlist: "25 or 38 mm pedestrian T-bar series with fine or coarse grit and optional contrasting nosing.",
    image: frpStairTreadImageAssets.pultrudedCloseup,
    imageAlt: "Close-up of yellow pultruded T-bar fiberglass grating bearing bars and cross rods",
    href: "/products/frp-gratings#pultruded-grating-specifications",
  },
] as const;
