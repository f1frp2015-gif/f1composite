export type FrpStakeReferenceSize = {
  nominalDiameter: string;
  metricDiameter: string;
  referenceLengths: string;
  publicPackReference: string;
  surfaceAndColor: string;
  planningUse: string;
};

/**
 * Public wholesale-market references used to shape the quote-planning table.
 * They are not certified F1 stock sizes or design values. The page keeps that
 * boundary visible next to the table and requires confirmation at quotation.
 */
export const frpStakeReferenceSizes = [
  {
    nominalDiameter: "1/5 in",
    metricDiameter: "≈ 5 mm",
    referenceLengths: "42 in / 1.07 m",
    publicPackReference: "100 pcs",
    surfaceAndColor: "Smooth · dark green",
    planningUse: "Light plant and garden support",
  },
  {
    nominalDiameter: "5/16 in",
    metricDiameter: "≈ 8 mm",
    referenceLengths: "72 in / 1.83 m",
    publicPackReference: "100 pcs",
    surfaceAndColor: "Smooth · white",
    planningUse: "Plant support and visible marking",
  },
  {
    nominalDiameter: "3/8 in",
    metricDiameter: "≈ 9.5 mm",
    referenceLengths: "60 or 72 in / 1.52 or 1.83 m",
    publicPackReference: "50 pcs",
    surfaceAndColor: "Smooth · green, white or orange",
    planningUse: "Nursery, vineyard, tree and visible site-marker inquiries",
  },
  {
    nominalDiameter: "1/2 in",
    metricDiameter: "≈ 12.7 mm",
    referenceLengths: "60 or 72 in / 1.52 or 1.83 m",
    publicPackReference: "20–40 pcs",
    surfaceAndColor: "Optional surface veil · blue-green",
    planningUse: "Medium-duty plant and site support",
  },
  {
    nominalDiameter: "5/8 in",
    metricDiameter: "≈ 15.9 mm",
    referenceLengths: "72 in / 1.83 m",
    publicPackReference: "20 pcs",
    surfaceAndColor: "Optional surface veil · gray",
    planningUse: "Heavy plant, tree or marking applications",
  },
  {
    nominalDiameter: "3/4 in",
    metricDiameter: "≈ 19.1 mm",
    referenceLengths: "72 in / 1.83 m",
    publicPackReference: "10 pcs",
    surfaceAndColor: "Optional surface veil · gray",
    planningUse: "Heavy support and construction-marker inquiries",
  },
] as const satisfies readonly FrpStakeReferenceSize[];

export const frpStakeImageAssets = {
  hero: "/images/products/fiberglass-stakes/fiberglass-stakes-size-range.webp",
  vineyard: "/images/products/fiberglass-stakes/frp-stakes-vineyard-training.webp",
  nursery: "/images/products/fiberglass-stakes/fiberglass-tree-stakes-nursery.webp",
} as const;

export const frpStakeApplications = [
  {
    title: "Vineyard and cane training",
    query: "fiberglass vineyard stakes",
    image: frpStakeImageAssets.vineyard,
    alt: "Dark green fiberglass stakes supporting grapevines along a vineyard trellis row",
    body: "Use the row height, vine load, wire layout, wind exposure and attachment method to choose stake diameter and embedment. The trellis carries the system load; the stake is one coordinated component.",
  },
  {
    title: "Nursery and young-tree support",
    query: "fiberglass tree stakes",
    image: frpStakeImageAssets.nursery,
    alt: "Young nursery tree supported by two dark green fiberglass tree stakes and wide soft ties",
    body: "Match the stake to tree height, root-ball condition, soil and wind. Use broad flexible ties, leave controlled movement and review the tree periodically so the support does not girdle the trunk.",
  },
] as const;

export const frpStakePublicSources = [
  {
    label: "Wholesale fiberglass stakes and FRP plant supports",
    href: "https://www.wellcowholesale.com/all-products/fiberglass-stake.html",
  },
  {
    label: "Fiberglass driveway markers and construction stakes",
    href: "https://www.wellcowholesale.com/application/construction/fiberglass-stake.html",
  },
  {
    label: "3/8 in × 6 ft FRP stake reference",
    href: "https://www.wellcowholesale.com/3-8-x-6-50pcs-dark-green-frp-stakes.html",
  },
] as const;
