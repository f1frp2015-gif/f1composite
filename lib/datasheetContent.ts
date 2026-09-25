// Size-specific content for /datasheets/[slug].
//
// Indexing pilot (2026-09): 24 of the most-requested standard sizes (see
// lib/datasheetHighlights.ts), all from families that have published span
// tables, are open to search engines. Each carries content no other size page
// has: its own allowable-load table, related sizes, approximate inch size and
// size-specific answers. Every other datasheet stays noindex through
// app/datasheets/layout.tsx. Review the pilot in Search Console after 4–8
// weeks before widening the list.
//
// scripts/submit-indexnow.mjs reads INDEXED_DATASHEET_SLUGS from this file's
// source, so keep it a plain array of string literals.

import { supplyTerms, weeks } from "@/content/data/company";
import { commercialFacts } from "@/content/data/engineeringEvidence";
import { modelToSlug } from "@/lib/catalog/public";
import { buildProducts } from "@/lib/catalog/standardProfiles";
import { approximateInches } from "@/lib/productInquiry";
import { buildSpanTables, SPANS_MM, type SpanRow } from "@/lib/spanTables";

export const INDEXED_DATASHEET_SLUGS: readonly string[] = [
  "i-76x38x6-4",
  "i-100x50x6",
  "i-152x76x6-4",
  "i-200x100x10",
  "i-240x120x12",
  "i-300x150x15",
  "u-76x38x6-4",
  "u-100x50x6",
  "u-152x43x6-4",
  "u-200x60x8",
  "u-240x72x8",
  "shs-25x25x3-2",
  "shs-38x38x4-8",
  "shs-50x50x5",
  "shs-75x75x6",
  "shs-100x100x6",
  "shs-152x152x9-5",
  "rhs-100x60x8",
  "rhs-120x60x5",
  "chs-32x3",
  "chs-50x4",
  "chs-60x5",
  "chs-76x6-4",
  "chs-100x6",
];

const indexedSlugs = new Set(INDEXED_DATASHEET_SLUGS);

export function isIndexedDatasheet(slug: string): boolean {
  return indexedSlugs.has(slug);
}

export interface DatasheetFamily {
  /** Title prefix, e.g. "FRP I-Beam". */
  label: string;
  /** Lower-case noun for sentences, e.g. "fiberglass I-beam". */
  noun: string;
  /** Breadcrumb label for the family page. */
  plural: string;
  href: string;
  /** Span-table anchor on /frp-span-tables, when the family has one. */
  spanTableId?: string;
  uses?: string;
}

const FAMILIES: Record<string, DatasheetFamily> = {
  i_beam: {
    label: "FRP I-Beam",
    noun: "fiberglass I-beam",
    plural: "I-Beams",
    href: "/products/fiberglass-structural-shapes/frp-i-beam",
    spanTableId: "i-beam",
    uses: "walkway and platform beams, pipe racks and equipment supports",
  },
  channel: {
    label: "FRP Channel",
    noun: "fiberglass channel",
    plural: "Channels",
    href: "/products/fiberglass-structural-shapes/frp-channel",
    spanTableId: "channel",
    uses: "stringers, cable-tray supports and frame rails",
  },
  angle: {
    label: "FRP Angle",
    noun: "fiberglass angle",
    plural: "Angles",
    href: "/products/fiberglass-structural-shapes/frp-angle",
  },
  shs: {
    label: "FRP Square Tube",
    noun: "fiberglass square tube",
    plural: "Square & Rectangular Tubes",
    href: "/products/fiberglass-structural-shapes/frp-square-tube",
    spanTableId: "square-tube",
    uses: "guardrail posts, solar purlins and light framing",
  },
  rhs: {
    label: "FRP Rectangular Tube",
    noun: "fiberglass rectangular tube",
    plural: "Square & Rectangular Tubes",
    href: "/products/fiberglass-structural-shapes/frp-square-tube",
    spanTableId: "square-tube",
    uses: "frame rails, purlins and light framing",
  },
  tube: {
    label: "FRP Round Tube",
    noun: "fiberglass round tube",
    plural: "Round Tubes",
    href: "/products/fiberglass-structural-shapes/frp-tube",
    spanTableId: "round-tube",
    uses: "handrails, cross-members and light spanning members",
  },
  rod: {
    label: "FRP Rod",
    noun: "fiberglass rod",
    plural: "Rods",
    href: "/products/fiberglass-structural-shapes/frp-rod",
  },
  flat: {
    label: "FRP Flat Bar",
    noun: "fiberglass flat bar",
    plural: "Flat Bars",
    href: "/products/fiberglass-structural-shapes/frp-flat-bar",
  },
};

const GENERIC_FAMILY: DatasheetFamily = {
  label: "FRP Profile",
  noun: "pultruded FRP profile",
  plural: "Structural Shapes",
  href: "/products/fiberglass-structural-shapes",
};

/** Family for a catalog geometry shape ("i_beam", "channel", "shs", ...). */
export function datasheetFamily(shape: string | undefined): DatasheetFamily {
  return (shape && FAMILIES[shape]) || GENERIC_FAMILY;
}

/** "I 152×76×6.4" → "152×76×6.4"; "Rod Ø12" → "Ø12". */
export function dimensionLabel(model: string): string {
  return model.replace(/^[A-Za-z]+\s+/, "");
}

/** Approximate decimal inches for each dimension: "5.984 × 2.992 × 0.252". */
export function approximateInchSize(model: string): string | null {
  const values = dimensionLabel(model)
    .replace(/Ø/g, "")
    .split("×")
    .map((part) => Number(part));
  if (values.length === 0 || values.some((value) => !Number.isFinite(value) || value <= 0)) return null;
  return values.map(approximateInches).join(" × ");
}

export function datasheetSeoTitle(model: string, shape: string | undefined): string {
  return `${datasheetFamily(shape).label} ${dimensionLabel(model)} mm: Specs, Weight & Span Loads`;
}

/** 120–160 characters, as buildPageMetadata requires. */
export function datasheetSeoDescription(
  model: string,
  shape: string | undefined,
  weightKgPerM: number | null,
  hasCad: boolean,
): string {
  const family = datasheetFamily(shape);
  const noun = family.noun.charAt(0).toUpperCase() + family.noun.slice(1);
  const inches = approximateInchSize(model);
  const weight = weightKgPerM == null ? "" : `${weightKgPerM} kg/m, `;
  const cad = hasCad ? "free DXF drawing and " : "";
  const tail = `${weight}allowable loads at 1–6 m spans, ${cad}EN 13706 E23 section data.`;
  const candidates = [
    `${noun} ${dimensionLabel(model)} mm${inches ? ` (≈ ${inches} in)` : ""}: ${tail}`,
    `${noun} ${dimensionLabel(model)} mm: ${tail}`,
    `${noun} ${dimensionLabel(model)} mm: ${weight}allowable loads at 1–6 m spans and EN 13706 E23 section data.`,
  ];
  return candidates.find((text) => text.length >= 120 && text.length <= 160) ?? candidates[candidates.length - 1];
}

let spanRowsByModel: Map<string, SpanRow> | null = null;

/** The published span-table row for a model, when its family has one. */
export function spanRowForModel(model: string): SpanRow | null {
  if (!spanRowsByModel) {
    spanRowsByModel = new Map(buildSpanTables().flatMap((family) => family.rows.map((row) => [row.model, row] as const)));
  }
  return spanRowsByModel.get(model) ?? null;
}

export interface SpanLoad {
  spanM: number;
  kNPerM: number;
  lbPerFt: number;
  governs: string;
}

const KN_PER_M_TO_LB_PER_FT = 68.52;

/** Allowable service UDL by span; spans below practical use (< 0.05 kN/m) are omitted. */
export function spanLoads(row: SpanRow): SpanLoad[] {
  return SPANS_MM.flatMap((span, index) => {
    const cell = row.cells[index];
    if (!cell || cell.w < 0.05) return [];
    return [{
      spanM: span / 1000,
      kNPerM: cell.w,
      lbPerFt: cell.w * KN_PER_M_TO_LB_PER_FT,
      governs: cell.governs,
    }];
  });
}

export function formatLoad(value: number): string {
  if (value < 1) return value.toFixed(2);
  if (value < 100) return value.toFixed(1);
  return value.toFixed(0);
}

export interface RelatedSize {
  model: string;
  slug: string;
  weight: number;
}

/** Every published size of the same geometry family, lightest first. */
export function relatedSizes(shape: string | undefined): RelatedSize[] {
  if (!shape) return [];
  const sameFamily = shape === "shs" || shape === "rhs" ? ["shs", "rhs"] : [shape];
  return buildProducts()
    .filter((product) => sameFamily.includes(product.geometry.shape))
    .map((product) => ({ model: product.model, slug: modelToSlug(product.model), weight: product.weight }))
    .sort((a, b) => a.weight - b.weight || a.model.localeCompare(b.model));
}

const KG_PER_M_TO_LB_PER_FT = 0.672;

export interface DatasheetAnswer {
  question: string;
  answer: string;
}

/** Answers built only from this size's published data and the site's supply terms. */
export function datasheetFaq({
  model,
  shape,
  weightKgPerM,
  hasCad,
  row,
}: {
  model: string;
  shape: string | undefined;
  weightKgPerM: number | null;
  hasCad: boolean;
  row: SpanRow | null;
}): DatasheetAnswer[] {
  const family = datasheetFamily(shape);
  const size = `${dimensionLabel(model)} mm`;
  const answers: DatasheetAnswer[] = [];

  if (weightKgPerM != null) {
    const length = supplyTerms.standardLengthM;
    answers.push({
      question: `How much does a ${family.noun} ${size} weigh?`,
      answer: `The published mass is ${weightKgPerM} kg per meter (about ${(weightKgPerM * KG_PER_M_TO_LB_PER_FT).toFixed(2)} lb/ft), so a standard ${length} m length weighs about ${(weightKgPerM * length).toFixed(1)} kg.`,
    });
  }

  const loads = row ? spanLoads(row) : [];
  if (loads.length > 0) {
    const first = loads[0];
    const longer = loads.find((load) => load.spanM >= 3) ?? loads[loads.length - 1];
    const pair = longer.spanM === first.spanM
      ? `${formatLoad(first.kNPerM)} kN/m over a simply supported ${first.spanM} m span (${first.governs} governs)`
      : `${formatLoad(first.kNPerM)} kN/m over a simply supported ${first.spanM} m span and ${formatLoad(longer.kNPerM)} kN/m over ${longer.spanM} m (${longer.governs} governs at ${longer.spanM} m)`;
    answers.push({
      question: `What load can a ${size} ${family.noun} carry?`,
      answer: `On the published design basis (EN 13706 E23, LRFD to ASCE/SEI 74-23, outdoor exposure, L/250 deflection with shear deformation), the allowable service uniform load is about ${pair}. Check point loads, connections and your own exposure in the calculator before release.`,
    });
  }

  if (hasCad) {
    answers.push({
      question: `Is there a CAD drawing for ${model}?`,
      answer: "Yes. A dimensioned DXF cross-section is a free download on this page, with no login. It opens in AutoCAD, DraftSight, LibreCAD and other CAD packages.",
    });
  }

  answers.push({
    question: `What is the lead time for ${model}?`,
    answer: `${model} is a catalog section in ${supplyTerms.standardLengthM} m standard lengths. Catalog sections ship in ${weeks(supplyTerms.catalogLeadTimeWeeks)}. ${commercialFacts.availability}`,
  });

  return answers;
}

const publishedSlugs = new Set(buildProducts().map((product) => modelToSlug(product.model)));

/** Datasheet URL for a catalog model, or null when the model is not published. */
export function datasheetHrefForModel(model: string): string | null {
  const slug = modelToSlug(model);
  return publishedSlugs.has(slug) ? `/datasheets/${slug}` : null;
}
