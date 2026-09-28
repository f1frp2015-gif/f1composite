// Handrail and guardrail load check for pultruded FRP post-and-rail systems.
//
// Loads come from the rule the user selects; section properties and design
// strengths come from the same engine as the FRP profile calculator
// (lib/frpSectionProperties.ts, lib/frpDesignBasis.ts). Presets carry values
// that agree across reliable sources; the UK, Canadian and Australian/New
// Zealand rows were checked against secondary sources only, and say so in
// their notes. Other categories ask the user to enter the value from the
// named clause (docs/audits/2026-09-26-tools-standards-audit.md and
// docs/audits/2026-09-28-tools-round-2.md).
//
// Model: posts are cantilevers fixed at the base plate; the top rail spans
// simply between posts (conservative for continuous rails). The line load and
// the concentrated load are separate cases, as the codes apply them.

import { DESIGN_MATERIALS, designResistance, envFactor, flexuralStrength, shearModulus, type DesignMethod } from "@/lib/frpDesignBasis";
import { calcIx, calcShearArea, calcWx, getSectionDimensionError } from "@/lib/frpSectionProperties";

export type GuardRegion = "US" | "EU" | "UK" | "CA" | "AU" | "NZ";

export interface GuardLoadCase {
  id: string;
  region: GuardRegion;
  label: string;
  clause: string;
  /** Horizontal line load on the top rail, kN/m; null when the user enters it. */
  lineKnPerM: number | null;
  /** Concentrated load at the top rail, kN; null when the user enters it. */
  pointKn: number | null;
  /** EN ISO 14122-3 style: a concentrated test load of this many kN per metre of post spacing. */
  pointPerSpacingKnPerM?: number;
  heightMinMm?: number;
  heightMaxMm?: number;
  /** Height the tool starts from when the rule is chosen; defaults to heightMinMm. */
  defaultHeightMm?: number;
  /** Horizontal deflection limit at the handrail under the service load, mm. */
  deflectionLimitMm?: number;
  /** OSHA 1910.29(b)(4): under the downward load the top rail stays at or above this height, mm. */
  minLoadedHeightMm?: number;
  maxPostSpacingMm?: number;
  method: DesignMethod;
  userEntry?: boolean;
  notes: readonly string[];
}

export const GUARD_LOAD_CASES: readonly GuardLoadCase[] = [
  {
    id: "us-ibc",
    region: "US",
    label: "IBC 2024 guards, general",
    clause: "IBC 2024 §1607.9.1 and §1015.3; ASCE 7-22 §4.5.1",
    lineKnPerM: 0.73,
    pointKn: 0.89,
    heightMinMm: 1067,
    method: "lrfd-asce",
    notes: [
      "50 lb/ft (0.73 kN/m) and 200 lb (0.89 kN) in any direction, not applied together.",
      "Infill, balusters and rails other than the top rail and handrail: 50 lb (0.22 kN) on 1 ft².",
      "Openings must stop a 4 in sphere; 21 in at walkways to mechanical, electrical or plumbing equipment.",
    ],
  },
  {
    id: "us-ibc-industrial",
    region: "US",
    label: "IBC 2024 guards, non-public industrial area",
    clause: "IBC 2024 §1607.9.1 Exception 2",
    lineKnPerM: 0.29,
    pointKn: 0.89,
    heightMinMm: 1067,
    method: "lrfd-asce",
    notes: [
      "20 lb/ft (0.29 kN/m) in Group I-3, F, H and S areas not accessible to the general public with an occupant load under 50.",
      "The 200 lb (0.89 kN) concentrated load still applies.",
    ],
  },
  {
    id: "us-osha",
    region: "US",
    label: "OSHA 1910.29 guardrail (general industry)",
    clause: "29 CFR 1910.29(b)(1)–(5)",
    lineKnPerM: 0,
    pointKn: 0.89,
    heightMinMm: 991,
    heightMaxMm: 1143,
    defaultHeightMm: 1067,
    minLoadedHeightMm: 991,
    method: "lrfd-asce",
    notes: [
      "Top edge 42 in (1,067 mm) ± 3 in; 200 lb (890 N) outward or downward within 2 in of the top edge, at any point.",
      "Under the downward 200 lb load the top rail must not drop below 39 in (991 mm).",
      "Midrails, screens and intermediate members: 150 lb (667 N). Toeboards at least 3.5 in high, 50 lb.",
      "Construction sites follow 29 CFR 1926.502(b), which uses the same forces.",
    ],
  },
  {
    id: "eu-iso14122",
    region: "EU",
    label: "EN ISO 14122-3 guard-rail (machinery access)",
    clause: "EN ISO 14122-3:2016",
    lineKnPerM: 0,
    pointKn: null,
    pointPerSpacingKnPerM: 0.3,
    heightMinMm: 1100,
    deflectionLimitMm: 30,
    maxPostSpacingMm: 1500,
    method: "lrfd-cents19101",
    notes: [
      "Test load F = 300 N/m × post spacing at the most unfavourable point; deflection no more than 30 mm.",
      "The standard's ultimate test factor of 1.75 is given for steel and aluminium guard-rails; an FRP system needs its own test or design justification.",
      "Knee rail with openings of no more than 500 mm; toe plate at least 100 mm high, no more than 10 mm above the walking level.",
    ],
  },
  {
    id: "uk-iso14122",
    region: "UK",
    label: "BS EN ISO 14122-3 guard-rail (machinery access)",
    clause: "BS EN ISO 14122-3:2016",
    lineKnPerM: 0,
    pointKn: null,
    pointPerSpacingKnPerM: 0.3,
    heightMinMm: 1100,
    deflectionLimitMm: 30,
    maxPostSpacingMm: 1500,
    method: "lrfd-cents19101",
    notes: [
      "Same requirements as EN ISO 14122-3 for permanent access to machinery.",
      "Barriers in buildings follow BS EN 1991-1-1 with the UK National Annex and BS 6180; choose the UK buildings option and enter the category load.",
    ],
  },
  {
    id: "uk-industrial",
    region: "UK",
    label: "UK industrial or storage area, not prone to overcrowding",
    clause: "BS 6180:2011 Table 2; BS EN 1991-1-1 UK National Annex, Table NA.8",
    lineKnPerM: 0.74,
    pointKn: 0,
    method: "lrfd-cents19101",
    notes: [
      "0.74 kN/m at the top. The infill takes 1.0 kN/m² or 0.5 kN on any part as separate cases, which this tool does not check.",
      "Row as quoted from BS 6180 and the UK National Annex by barrier designers; confirm it in your copy. On the Eurocode route the infill loads are in PD 6688-1-1.",
    ],
  },
  {
    id: "uk-light-industrial",
    region: "UK",
    label: "UK light pedestrian route in an industrial building",
    clause: "BS 6180:2011 Table 2; BS EN 1991-1-1 UK National Annex, Table NA.8",
    lineKnPerM: 0.36,
    pointKn: 0,
    method: "lrfd-cents19101",
    notes: [
      "0.36 kN/m for light pedestrian traffic routes in industrial and storage buildings, except designated escape routes. Infill 0.5 kN/m² or 0.25 kN.",
      "Light access stairs and gangways no more than 600 mm wide take 0.22 kN/m; enter that with the other-category option.",
      "Row as quoted from BS 6180 and the UK National Annex by barrier designers; confirm it in your copy.",
    ],
  },
  {
    id: "uk-buildings",
    region: "UK",
    label: "UK buildings, other category: enter the NA.8 load",
    clause: "BS EN 1991-1-1 UK National Annex, Table NA.8; BS 6180 for heights",
    lineKnPerM: null,
    pointKn: null,
    method: "lrfd-cents19101",
    userEntry: true,
    notes: ["Take the horizontal line load for the occupancy category from Table NA.8. Enter 0 for the concentrated load unless the category gives one for the top rail."],
  },
  {
    id: "ca-nbc-equipment",
    region: "CA",
    label: "Canada: access to equipment platforms",
    clause: "NBC 2020 Division B, Article 4.1.5.14 (or the provincial code in force)",
    lineKnPerM: 0,
    pointKn: 1.0,
    method: "lrfd-asce",
    notes: [
      "1.0 kN concentrated at any point, for access ways to equipment platforms, contiguous stairs and similar areas where the gathering of many people is improbable.",
      "A vertical 1.5 kN/m on the top, not applied with the horizontal load, is not checked here.",
      "Provinces adopt NBC editions at different times, and NBC 2025 has been published; check the edition in force.",
    ],
  },
  {
    id: "ca-nbc-general",
    region: "CA",
    label: "Canada: guards in other locations",
    clause: "NBC 2020 Division B, Article 4.1.5.14 (or the provincial code in force)",
    lineKnPerM: 0.75,
    pointKn: 1.0,
    method: "lrfd-asce",
    notes: [
      "0.75 kN/m or 1.0 kN concentrated at any point, whichever governs. Individual infill elements take 0.5 kN over 100 × 100 mm.",
      "Viewing stands and the means of egress in grandstands and arenas take 3.0 kN/m; use the enter-a-load option.",
      "Provinces adopt NBC editions at different times, and NBC 2025 has been published; check the edition in force.",
    ],
  },
  {
    id: "ca-nbc",
    region: "CA",
    label: "Canada, other case: enter the NBC guard load",
    clause: "NBC 2020 Division B, Article 4.1.5.14 (or the provincial code in force)",
    lineKnPerM: null,
    pointKn: null,
    method: "lrfd-asce",
    userEntry: true,
    notes: ["Enter the uniform and concentrated guard loads for the occupancy from Article 4.1.5.14; guard heights are in Part 3 or Part 9."],
  },
  {
    id: "au-as1657",
    region: "AU",
    label: "Australia: AS 1657 platforms, walkways and stairways",
    clause: "AS 1657:2018 (guardrailing); AS/NZS 1170.1 Table 3.3 row for fixed access",
    lineKnPerM: 0.35,
    pointKn: 0.6,
    heightMinMm: 900,
    heightMaxMm: 1100,
    defaultHeightMm: 1000,
    deflectionLimitMm: 100,
    method: "lrfd-asce",
    notes: [
      "600 N at any point of the top rail, intermediate rail or post, or 350 N/m along a rail, outward or downward; elastic deflection no more than 100 mm.",
      "Guardrail height 900 to 1100 mm. Toeboards take 100 N with no more than 30 mm deflection.",
      "Values as published in AS 1657:2018 summaries by access-system designers and state regulators; confirm them in your copy.",
    ],
  },
  {
    id: "au-1170-work",
    region: "AU",
    label: "Australia: offices and work areas",
    clause: "AS/NZS 1170.1 Table 3.3 (occupancy types B and E)",
    lineKnPerM: 0.75,
    pointKn: 0.6,
    method: "lrfd-asce",
    notes: [
      "0.75 kN/m horizontal or 0.6 kN concentrated at the top edge, as separate cases; infill 1.0 kPa or 0.5 kN.",
      "Combine with the AS/NZS 1170.0 load factors for the ultimate check.",
    ],
  },
  {
    id: "au-1170",
    region: "AU",
    label: "Australia, other occupancy: enter the Table 3.3 load",
    clause: "AS/NZS 1170.1 Table 3.3",
    lineKnPerM: null,
    pointKn: null,
    method: "lrfd-asce",
    userEntry: true,
    notes: ["Enter the top-edge line load and the concentrated load for the occupancy type from Table 3.3."],
  },
  {
    id: "nz-1170-work",
    region: "NZ",
    label: "New Zealand: offices and work areas",
    clause: "AS/NZS 1170.1 Table 3.3 (occupancy types B and E) through NZBC B1; barrier geometry under NZBC F4",
    lineKnPerM: 0.75,
    pointKn: 0.6,
    method: "lrfd-asce",
    notes: [
      "0.75 kN/m horizontal or 0.6 kN concentrated at the top edge, as separate cases; infill 1.0 kPa or 0.5 kN.",
      "Combine with the AS/NZS 1170.0 load factors for the ultimate check.",
    ],
  },
  {
    id: "nz-1170",
    region: "NZ",
    label: "New Zealand, other occupancy: enter the Table 3.3 load",
    clause: "AS/NZS 1170.1 Table 3.3 through NZBC B1; barrier geometry under NZBC F4",
    lineKnPerM: null,
    pointKn: null,
    method: "lrfd-asce",
    userEntry: true,
    notes: ["Enter the top-edge line load and the concentrated load for the occupancy type from Table 3.3."],
  },
] as const;

export function guardLoadCase(id: string): GuardLoadCase | undefined {
  return GUARD_LOAD_CASES.find((item) => item.id === id);
}

export type TubeShape = "square-tube" | "round-tube";

export interface TubeSection {
  shape: TubeShape;
  /** Outside size (square) or outside diameter (round), mm. */
  d: number;
  /** Wall thickness, mm. */
  t: number;
}

/** Tube sections used for FRP handrail posts and rails. */
export const GUARD_SECTIONS: readonly { id: string; label: string; section: TubeSection }[] = [
  { id: "shs-50-6.4", label: "Square tube 50 × 50 × 6.4 (F1 square handrail system)", section: { shape: "square-tube", d: 50, t: 6.4 } },
  { id: "chs-50-5", label: "Round tube 50 × 5 (F1 round handrail system)", section: { shape: "round-tube", d: 50, t: 5 } },
  { id: "shs-50-5", label: "Square tube SHS 50 × 50 × 5", section: { shape: "square-tube", d: 50, t: 5 } },
  { id: "shs-60-5", label: "Square tube SHS 60 × 60 × 5", section: { shape: "square-tube", d: 60, t: 5 } },
  { id: "shs-75-6", label: "Square tube SHS 75 × 75 × 6", section: { shape: "square-tube", d: 75, t: 6 } },
  { id: "chs-60-5", label: "Round tube CHS 60 × 5", section: { shape: "round-tube", d: 60, t: 5 } },
  { id: "chs-63.5-6.4", label: "Round tube CHS 63.5 × 6.4", section: { shape: "round-tube", d: 63.5, t: 6.4 } },
  { id: "chs-76-6.4", label: "Round tube CHS 76 × 6.4", section: { shape: "round-tube", d: 76, t: 6.4 } },
] as const;

export interface GuardInput {
  caseId: string;
  /** User-entered loads for presets marked userEntry (or to override). */
  lineKnPerM?: number;
  pointKn?: number;
  heightMm: number;
  spacingMm: number;
  post: TubeSection;
  rail: TubeSection;
  materialId: string;
  method: DesignMethod;
  envId: string;
  /** End or corner posts carry half the tributary line load. */
  endPost?: boolean;
}

interface MemberCheck {
  serviceMomentKnm: number;
  factoredMomentKnm: number;
  bendingStressMPa: number;
  bendingAllowableMPa: number;
  shearStressMPa: number;
  shearAllowableMPa: number;
  utilisation: number;
}

export interface GuardResult {
  loadCase: GuardLoadCase;
  lineKnPerM: number;
  pointKn: number;
  loadFactor: number;
  lambda: number;
  post: MemberCheck & {
    serviceForceKn: number;
    governingLoad: "line" | "point";
    /** Horizontal load at rail height that brings the post base to its characteristic bending strength (with the environment knockdown, no φ or γ), kN. */
    characteristicCapacityKn: number;
    /** characteristicCapacityKn ÷ serviceForceKn: the margin a without-failure test would see. */
    capacityRatio: number;
  };
  rail: MemberCheck;
  /** Horizontal deflection at the top rail under service loads, mm. */
  deflectionMm: number;
  deflectionCase: "line load" | "point load at mid-span" | "point load at a post";
  /** Top-rail height under the downward point load (OSHA check), mm. */
  loadedHeightMm?: number;
  base: { serviceShearKn: number; serviceMomentKnm: number; factoredShearKn: number; factoredMomentKnm: number };
  flags: {
    heightBelowMin: boolean;
    heightAboveMax: boolean;
    spacingAboveMax: boolean;
    deflectionExceeds: boolean;
    loadedHeightBelowMin: boolean;
    slenderWall: boolean;
  };
}

function sectionProps(section: TubeSection) {
  const b = section.d; // square tubes only; the round-tube formulas ignore B
  const I = calcIx(section.shape, section.d, b, section.t, section.t);
  return {
    I,
    W: calcWx(I, section.d, section.shape, b, section.t),
    Av: calcShearArea(section.shape, section.d, b, section.t, section.t),
  };
}

export function guardInputError(input: GuardInput): string | null {
  const loadCase = guardLoadCase(input.caseId);
  if (!loadCase) return "Choose a load rule.";
  if (!DESIGN_MATERIALS[input.materialId] || DESIGN_MATERIALS[input.materialId].group !== "FRP") return "Choose an FRP material.";
  if (!Number.isFinite(input.heightMm) || input.heightMm <= 0) return "Rail height must be greater than zero.";
  if (!Number.isFinite(input.spacingMm) || input.spacingMm <= 0) return "Post spacing must be greater than zero.";
  for (const [name, section] of [["Post", input.post], ["Rail", input.rail]] as const) {
    const error = getSectionDimensionError(section.shape, section.d, section.d, section.t, section.t);
    if (error) return `${name}: ${error}`;
  }
  if (loadCase.userEntry) {
    const line = input.lineKnPerM;
    const point = input.pointKn;
    if (line === undefined || point === undefined || !Number.isFinite(line) || !Number.isFinite(point) || line < 0 || point < 0 || line + point <= 0) {
      return `Enter the line load and the concentrated load from ${loadCase.clause}.`;
    }
  }
  return null;
}

export function checkGuardrail(input: GuardInput): GuardResult | null {
  if (guardInputError(input)) return null;
  const loadCase = guardLoadCase(input.caseId)!;
  const material = DESIGN_MATERIALS[input.materialId];
  const resistance = designResistance({ material, method: input.method, envId: input.envId, durationId: "occupancy" });
  const E = material.E * 1000 * resistance.envStiffness; // MPa
  const G = shearModulus(material) * 1000 * resistance.envStiffness;
  const s = input.spacingMm;
  const H = input.heightMm;

  const line = loadCase.userEntry ? input.lineKnPerM! : input.lineKnPerM ?? loadCase.lineKnPerM ?? 0;
  const point = loadCase.userEntry
    ? input.pointKn!
    : input.pointKn ?? (loadCase.pointPerSpacingKnPerM !== undefined ? loadCase.pointPerSpacingKnPerM * (s / 1000) : loadCase.pointKn ?? 0);

  const post = sectionProps(input.post);
  const rail = sectionProps(input.rail);

  // Post: cantilever with the load at the top rail.
  const tributary = input.endPost ? s / 2 : s;
  const lineForce = line * (tributary / 1000); // kN
  const postForce = Math.max(lineForce, point);
  const postMomentKnm = (postForce * H) / 1000;

  // Rail: simple span between posts.
  const railMomentLine = (line * (s / 1000) ** 2) / 8;
  const railMomentPoint = (point * (s / 1000)) / 4;
  const railMomentKnm = Math.max(railMomentLine, railMomentPoint);
  const railShearKn = Math.max((line * s) / 2000, point);

  const gamma = resistance.loadFactor;
  const member = (momentKnm: number, shearKn: number, props: { W: number; Av: number }): MemberCheck => {
    const bendingStressMPa = (gamma * momentKnm * 1e6) / props.W;
    const shearStressMPa = (gamma * shearKn * 1e3) / props.Av;
    return {
      serviceMomentKnm: momentKnm,
      factoredMomentKnm: gamma * momentKnm,
      bendingStressMPa,
      bendingAllowableMPa: resistance.bendingAllowable,
      shearStressMPa,
      shearAllowableMPa: resistance.shearAllowable,
      utilisation: Math.max(bendingStressMPa / resistance.bendingAllowable, shearStressMPa / resistance.shearAllowable),
    };
  };

  // Service deflections (N, mm), bending plus Timoshenko shear term.
  const cantilever = (forceKn: number) =>
    ((forceKn * 1000 * H ** 3) / (3 * E * post.I)) * (1 + (3 * E * post.I) / (G * post.Av * H ** 2));
  const railUdl = (w: number) =>
    ((5 * w * s ** 4) / (384 * E * rail.I)) * (1 + (9.6 * E * rail.I) / (G * rail.Av * s ** 2));
  const railPoint = (forceKn: number) =>
    ((forceKn * 1000 * s ** 3) / (48 * E * rail.I)) * (1 + (12 * E * rail.I) / (G * rail.Av * s ** 2));

  const candidates: { value: number; label: GuardResult["deflectionCase"] }[] = [];
  if (line > 0) candidates.push({ value: cantilever(line * (s / 1000)) + railUdl(line), label: "line load" });
  if (point > 0) {
    candidates.push({ value: cantilever(point / 2) + railPoint(point), label: "point load at mid-span" });
    candidates.push({ value: cantilever(point), label: "point load at a post" });
  }
  const governing = candidates.reduce((best, item) => (item.value > best.value ? item : best), candidates[0]);

  const loadedHeightMm = loadCase.minLoadedHeightMm !== undefined && point > 0 ? H - railPoint(point) : undefined;
  const characteristicCapacityKn = (flexuralStrength(material) * envFactor(input.envId).factor * post.W) / H / 1000;
  const wallRatio = (section: TubeSection) => (section.shape === "round-tube" ? section.d / section.t : (section.d - 2 * section.t) / section.t);

  return {
    loadCase,
    lineKnPerM: line,
    pointKn: point,
    loadFactor: gamma,
    lambda: resistance.lambda,
    post: {
      ...member(postMomentKnm, postForce, post),
      serviceForceKn: postForce,
      governingLoad: lineForce >= point ? "line" : "point",
      characteristicCapacityKn,
      capacityRatio: characteristicCapacityKn / postForce,
    },
    rail: member(railMomentKnm, railShearKn, rail),
    deflectionMm: governing.value,
    deflectionCase: governing.label,
    loadedHeightMm,
    base: {
      serviceShearKn: postForce,
      serviceMomentKnm: postMomentKnm,
      factoredShearKn: gamma * postForce,
      factoredMomentKnm: gamma * postMomentKnm,
    },
    flags: {
      heightBelowMin: loadCase.heightMinMm !== undefined && H < loadCase.heightMinMm,
      heightAboveMax: loadCase.heightMaxMm !== undefined && H > loadCase.heightMaxMm,
      spacingAboveMax: loadCase.maxPostSpacingMm !== undefined && s > loadCase.maxPostSpacingMm,
      deflectionExceeds: loadCase.deflectionLimitMm !== undefined && governing.value > loadCase.deflectionLimitMm,
      loadedHeightBelowMin: loadedHeightMm !== undefined && loadCase.minLoadedHeightMm !== undefined && loadedHeightMm < loadCase.minLoadedHeightMm,
      slenderWall: wallRatio(input.post) > 40 || wallRatio(input.rail) > 40,
    },
  };
}
