import type { Geometry, ShapeId } from "../catalog/shapes";
import {
  baseSectionCode,
  enShapeCodeForGeometry,
  globalDesignation,
  shapeCodeForGeometry,
} from "./profileNomenclature";

export const SEP0043_PROJECT = {
  project_ref: "SEP0043",
  customer: "Structure Evolution",
  title: "Candidate pultruded sections - capability and indicative pricing",
  annual_volume_m: 3500,
  cut_length_min_mm: 1200,
  cut_length_max_mm: 1500,
  quote_currency: "GBP",
  source_document: "SEP0043_Candidate_Sections-001-R00.pdf",
  price_scope: "Catalogue matches plus section items 01, 06, 11 and 13; budgetary comparison only.",
  finishing_requirement: "Cut to finished lengths 1.2-1.5 m; confirm drilling and machining capability.",
  environmental_requirement:
    "Continuous outdoor service approximately -40 C to +55 C; provide +70 C data where available; 90-100% RH including condensation; direct UV/solar exposure.",
  fst_requirement:
    "Capability check only: UL 94 V-0 at supplied wall thickness; halogen-free FR option; smoke density ASTM E662 or EN ISO 5659-2; toxicity BS 7239 or EN 45545-2 route. Evidence and limits deferred to detailed RFQ.",
  grade_requirement:
    "Identify resin systems capable of EN 13706 E17 and/or E23 and explain environmental-performance differences. Do not infer grade from resin alone.",
  status: "scoping",
  notes:
    "Tooling route, tooling cost, lead time, measured mass and budget price remain supplier inputs. The 3,500 m/year basis is not a committed order quantity.",
} as const;

export interface Sep0043SectionSeed {
  project_ref: string;
  line_no: number;
  project_item_ref: string;
  source_designation: string;
  global_designation: string;
  base_section_code: string;
  shape_code: string;
  en_shape_code: string;
  section_family: string;
  geometry: Geometry | null;
  geometry_status: "complete" | "drawing_required";
  catalog_match: string;
  pricing_requested: boolean;
  grade_options: string;
  resin_type_options: string;
  resin_property_options: string;
  additional_process_options: string;
  tooling_route: "to_assess";
  status: "candidate";
  notes: string | null;
}

const geo = (shape: ShapeId, dims: Record<string, number>) =>
  ({ kind: "parametric", shape, dims }) as Geometry;

function section(input: {
  line: number;
  source: string;
  family: string;
  geometry: Geometry | null;
  fallbackCode?: string;
  fallbackDesignation?: string;
  catalogMatch?: string;
  pricing?: boolean;
  notes?: string;
}): Sep0043SectionSeed {
  const line = String(input.line).padStart(2, "0");
  const shapeCode = input.geometry ? shapeCodeForGeometry(input.geometry) : "STRUT";
  const baseCode = input.geometry ? baseSectionCode(input.geometry) : input.fallbackCode;
  const designation = input.geometry ? globalDesignation(input.geometry) : input.fallbackDesignation;
  const enShape = input.geometry ? enShapeCodeForGeometry(input.geometry) : "Z";
  if (!shapeCode || !baseCode || !designation || !enShape) {
    throw new Error(`Incomplete SEP0043 naming data for line ${line}`);
  }
  return {
    project_ref: SEP0043_PROJECT.project_ref,
    line_no: input.line,
    project_item_ref: `${SEP0043_PROJECT.project_ref}-${line}`,
    source_designation: input.source,
    global_designation: designation,
    base_section_code: baseCode,
    shape_code: shapeCode,
    en_shape_code: enShape,
    section_family: input.family,
    geometry: input.geometry,
    geometry_status: input.geometry ? "complete" : "drawing_required",
    catalog_match: input.catalogMatch ?? "no_match_identified",
    pricing_requested: input.pricing ?? false,
    grade_options: "E17,E23",
    resin_type_options: "OPEN",
    resin_property_options: "F,U,Z",
    additional_process_options: "V,P",
    tooling_route: "to_assess",
    status: "candidate",
    notes: input.notes ?? null,
  };
}

export const SEP0043_SECTIONS: Sep0043SectionSeed[] = [
  section({ line: 1, source: "RHS 80x20x5", family: "Box section", geometry: geo("rhs", { B: 80, H: 20, t: 5 }), pricing: true }),
  section({ line: 2, source: "RHS 60x25x5", family: "Box section", geometry: geo("rhs", { B: 60, H: 25, t: 5 }) }),
  section({ line: 3, source: "RHS 70x25x4", family: "Box section", geometry: geo("rhs", { B: 70, H: 25, t: 4 }) }),
  section({ line: 4, source: "RHS 80x25x4", family: "Box section", geometry: geo("rhs", { B: 80, H: 25, t: 4 }) }),
  section({
    line: 5, source: "EA 50x50x5", family: "Equal angle", geometry: geo("angle", { a: 50, b: 50, t: 5 }),
    catalogMatch: "exact: L 50x50x5", pricing: true,
  }),
  section({ line: 6, source: "EA 60x60x4", family: "Equal angle", geometry: geo("angle", { a: 60, b: 60, t: 4 }), pricing: true }),
  section({ line: 7, source: "UA 60x40x5", family: "Unequal angle", geometry: geo("angle", { a: 60, b: 40, t: 5 }) }),
  section({ line: 8, source: "UA 60x80x4", family: "Unequal angle", geometry: geo("angle", { a: 60, b: 80, t: 4 }) }),
  section({ line: 9, source: "T 60x60x5", family: "T-section", geometry: geo("tee", { B: 60, H: 60, tw: 5, tf: 5 }) }),
  section({ line: 10, source: "T 60x80x4", family: "T-section", geometry: geo("tee", { B: 60, H: 80, tw: 4, tf: 4 }) }),
  section({
    line: 11, source: "UT 60x20x60x4", family: "Offset T-section",
    geometry: geo("offset_tee", { BL: 60, BR: 20, H: 60, t: 4 }), pricing: true,
    notes: "BL and BR preserve the customer's left/right flange split; drawing orientation must be frozen before die release.",
  }),
  section({ line: 12, source: "UC 60x60x20x4", family: "Unequal channel", geometry: geo("unequal_channel", { B1: 60, H: 60, B2: 20, t: 4 }) }),
  section({ line: 13, source: "UC 60x80x20x5", family: "Unequal channel", geometry: geo("unequal_channel", { B1: 60, H: 80, B2: 20, t: 5 }), pricing: true }),
  section({ line: 14, source: "UC 60x60x25x4", family: "Unequal channel", geometry: geo("unequal_channel", { B1: 60, H: 60, B2: 25, t: 4 }) }),
  section({ line: 15, source: "UC 60x80x25x4", family: "Unequal channel", geometry: geo("unequal_channel", { B1: 60, H: 80, B2: 25, t: 4 }) }),
  section({
    line: 16, source: "C 76x25.4x6.35", family: "Channel",
    geometry: geo("channel", { H: 76, B: 25.4, tw: 6.35, tf: 6.35 }),
    catalogMatch: "probable rounding match: U 76x25x6.4", pricing: true,
    notes: "Confirm whether 76x25.4x6.35 is the same nominal 3x1x1/4 in tool as catalogue U 76x25x6.4.",
  }),
  section({
    line: 17, source: "UNISTRUT 41x25x3", family: "Lipped strut channel", geometry: null,
    fallbackCode: "F1-STRUT-B041-H025-T3P0", fallbackDesignation: "P-GFRP STRUT B41×H25×t3 mm - lip/return per drawing",
    notes: "Overall width, depth and wall are known. Slot width, lip length, return depth and inside radii are missing; do not calculate properties or release tooling yet.",
  }),
];
