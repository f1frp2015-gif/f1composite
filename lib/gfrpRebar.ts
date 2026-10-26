// GFRP reinforcing bar helper: size cross-reference between steel bar systems
// and GFRP bars, ACI CODE-440.11-22 design values from the supplier's
// guaranteed strength, and the standards that apply in each market.
//
// A size match is not a design substitution: GFRP has about a quarter of the
// stiffness of steel, so the engineer of record redesigns the reinforcement.

export type BarSystem = "astm" | "en" | "asnzs" | "csa";

export interface BarSize {
  system: BarSystem;
  designation: string;
  diameterMm: number;
  areaMm2: number;
}

const round = (d: number) => Math.round((Math.PI * d * d) / 4);

/** Nominal diameters and areas of the steel (and ASTM D7957 GFRP) bar series. */
export const BAR_SIZES: readonly BarSize[] = [
  // ASTM A615 inch-pound sizes; ASTM D7957 GFRP bars use the same designations, plus No. 2.
  { system: "astm", designation: "No. 2", diameterMm: 6.4, areaMm2: 32 },
  { system: "astm", designation: "No. 3", diameterMm: 9.5, areaMm2: 71 },
  { system: "astm", designation: "No. 4", diameterMm: 12.7, areaMm2: 129 },
  { system: "astm", designation: "No. 5", diameterMm: 15.9, areaMm2: 199 },
  { system: "astm", designation: "No. 6", diameterMm: 19.1, areaMm2: 284 },
  { system: "astm", designation: "No. 7", diameterMm: 22.2, areaMm2: 387 },
  { system: "astm", designation: "No. 8", diameterMm: 25.4, areaMm2: 510 },
  { system: "astm", designation: "No. 9", diameterMm: 28.7, areaMm2: 645 },
  { system: "astm", designation: "No. 10", diameterMm: 32.3, areaMm2: 819 },
  // EN 10080 / B500B nominal diameters.
  ...[8, 10, 12, 14, 16, 20, 25, 28, 32].map((d) => ({ system: "en" as const, designation: `Ø${d}`, diameterMm: d, areaMm2: round(d) })),
  // AS/NZS 4671 N-grade deformed bars.
  ...[10, 12, 16, 20, 24, 28, 32, 36].map((d) => ({ system: "asnzs" as const, designation: `N${d}`, diameterMm: d, areaMm2: d === 36 ? 1020 : round(d) })),
  // CSA G30.18 metric bars.
  { system: "csa", designation: "10M", diameterMm: 11.3, areaMm2: 100 },
  { system: "csa", designation: "15M", diameterMm: 16.0, areaMm2: 200 },
  { system: "csa", designation: "20M", diameterMm: 19.5, areaMm2: 300 },
  { system: "csa", designation: "25M", diameterMm: 25.2, areaMm2: 500 },
  { system: "csa", designation: "30M", diameterMm: 29.9, areaMm2: 700 },
  { system: "csa", designation: "35M", diameterMm: 35.7, areaMm2: 1000 },
];

export const BAR_SYSTEMS: Record<BarSystem, string> = {
  astm: "ASTM A615 / ASTM D7957 (US)",
  en: "EN 10080 / B500B (Europe, UK)",
  asnzs: "AS/NZS 4671 (Australia, New Zealand)",
  csa: "CSA G30.18 (Canada)",
};

/** Nominal GFRP diameters on F1's inquiry list (content/data/frpRebar.ts). */
export const F1_GFRP_DIAMETERS = [6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 30, 32, 34, 36] as const;

export function barSize(system: string, designation: string): BarSize | undefined {
  return BAR_SIZES.find((size) => size.system === system && size.designation === designation);
}

/** Closest F1 metric GFRP diameter and ASTM D7957 designation to a bar diameter. */
export function matchGfrpSize(diameterMm: number) {
  if (!Number.isFinite(diameterMm) || diameterMm <= 0) return null;
  const f1 = F1_GFRP_DIAMETERS.reduce((best, d) => (Math.abs(d - diameterMm) < Math.abs(best - diameterMm) ? d : best));
  const astm = BAR_SIZES.filter((size) => size.system === "astm").reduce((best, size) =>
    Math.abs(size.diameterMm - diameterMm) < Math.abs(best.diameterMm - diameterMm) ? size : best,
  );
  return { f1DiameterMm: f1, f1AreaMm2: round(f1), astm };
}

/**
 * ACI CODE-440.11-22 values used below. C_E = 0.85 (Section 20.2.2.3) as cited
 * by Hussain, Lin, Trussoni and Nanni, ACI Structural Journal 120-S55 (2023);
 * the sustained-stress limit of 0.30 of the design strength as cited in the
 * peer-reviewed literature (e.g. Borges and Lameiras, Latin American Journal of Solids and Structures). Not read in
 * the code text itself (confidence B).
 */
export const ACI_440_11 = {
  environmentalFactor: 0.85, // C_E, applied to the guaranteed tensile strength
  sustainedStressRatio: 0.3, // sustained stress limit as a fraction of the design tensile strength
  phiTensionControlled: 0.55,
  phiCompressionControlled: 0.65,
  phiShear: 0.75,
} as const;

export interface GfrpDesignInput {
  /** Guaranteed tensile strength f*_fu from the supplier's certificate, MPa. */
  guaranteedStrengthMPa: number;
  /** Tensile modulus from the certificate, GPa. */
  modulusGPa: number;
  /** Nominal area of the bar, mm². */
  areaMm2: number;
}

export function gfrpDesignValues(input: GfrpDesignInput) {
  const { guaranteedStrengthMPa, modulusGPa, areaMm2 } = input;
  if (![guaranteedStrengthMPa, modulusGPa, areaMm2].every((value) => Number.isFinite(value) && value > 0)) return null;
  const designStrengthMPa = ACI_440_11.environmentalFactor * guaranteedStrengthMPa;
  const sustainedLimitMPa = ACI_440_11.sustainedStressRatio * designStrengthMPa;
  return {
    designStrengthMPa,
    designForceKn: (designStrengthMPa * areaMm2) / 1000,
    sustainedLimitMPa,
    sustainedForceKn: (sustainedLimitMPa * areaMm2) / 1000,
    /** Design rupture strain, ε_fu = f_fu / E_f. */
    ruptureStrain: designStrengthMPa / (modulusGPa * 1000),
    /** Stiffness relative to steel (E_s = 200 GPa). */
    stiffnessRatio: modulusGPa / 200,
  };
}

/** Unit mass from nominal area and density; replace with the supplier's declared value. */
export function gfrpUnitMass(areaMm2: number, densityGcm3: number): number {
  return (areaMm2 * densityGcm3) / 1000; // kg/m
}

export const GFRP_STANDARDS_BY_MARKET = [
  { market: "United States", design: "ACI CODE-440.11-22 (buildings); AASHTO GFRP-2, 2nd ed. 2018 (bridges)", product: "ASTM D7957/D7957M; ACI 440.11-22 references the 2022 edition", notes: "Construction: ACI SPEC-440.5-22. Test methods: ASTM D7205/D7205M" },
  { market: "Canada", design: "CSA S806:26 (buildings); CSA S6:25 (bridges)", product: "CSA S807:19 (R2024), grades by modulus and durability class", notes: "Provincial owners add their own requirements, e.g. Ontario OPSS" },
  { market: "European Union", design: "EN 1992-1-1:2023 Annex R (informative, FRP reinforcement), where adopted nationally", product: "No harmonised product standard; CE marking through an ETA to EAD 260023-00-0301", notes: "Test methods: ISO 10406-1:2025" },
  { market: "United Kingdom", design: "No UK design standard of its own; the engineer adopts a recognised code, for example EN 1992-1-1:2023 Annex R, ACI CODE-440.11-22 or CSA S806", product: "Client specification; ETA or third-party certification", notes: "Test methods: ISO 10406-1:2025" },
  { market: "Australia", design: "No national design standard; state road authority specifications, e.g. Queensland TMR MRTS271 (design to CSA S806)", product: "AS 5204:2023 fibre-reinforced polymer bars", notes: "MRTS271 calls for CSA S807 Grade III bars" },
  { market: "New Zealand", design: "No local design standard; the engineer adopts ACI 440.11, CSA S806 or AS 5204 with the consent authority", product: "Project specification, which can name AS 5204:2023 or CSA S807", notes: "Confirm acceptance with the building consent authority" },
] as const;

// ── Size chart (/resources/gfrp-rebar-size-chart) ──────────────────────────
// Masses are calculated from the nominal area, not measured: the supplier's
// declared mass per meter governs. 1.9 g/cm³ follows the specific gravity of
// 1.92 measured on GFRP bars in the University of Kentucky study for FHWA,
// cited in the GFRP installation guide.

export const GFRP_CHART_DENSITY_GCM3 = 1.9;
export const STEEL_DENSITY_GCM3 = 7.85;

const MM2_PER_IN2 = 645.16;
const MM_PER_IN = 25.4;
const LB_PER_FT_PER_KG_PER_M = 0.672;

export interface GfrpChartRow {
  designation: string;
  diameterMm: number;
  diameterIn: number;
  areaMm2: number;
  areaIn2: number;
  gfrpKgPerM: number;
  gfrpLbPerFt: number;
  steelKgPerM: number;
  steelLbPerFt: number;
}

/** Nominal inch diameters of the ASTM designations: n/8 in up to No. 8, then the standard values. */
const ASTM_DIAMETER_IN: Record<string, number> = {
  "No. 2": 0.25, "No. 3": 0.375, "No. 4": 0.5, "No. 5": 0.625, "No. 6": 0.75,
  "No. 7": 0.875, "No. 8": 1.0, "No. 9": 1.128, "No. 10": 1.27,
};

function chartRow(designation: string, diameterMm: number, areaMm2: number): GfrpChartRow {
  const gfrpKgPerM = gfrpUnitMass(areaMm2, GFRP_CHART_DENSITY_GCM3);
  const steelKgPerM = gfrpUnitMass(areaMm2, STEEL_DENSITY_GCM3);
  return {
    designation,
    diameterMm,
    diameterIn: ASTM_DIAMETER_IN[designation] ?? diameterMm / MM_PER_IN,
    areaMm2,
    areaIn2: areaMm2 / MM2_PER_IN2,
    gfrpKgPerM,
    gfrpLbPerFt: gfrpKgPerM * LB_PER_FT_PER_KG_PER_M,
    steelKgPerM,
    steelLbPerFt: steelKgPerM * LB_PER_FT_PER_KG_PER_M,
  };
}

/** ASTM D7957 bar designations No. 2–No. 10 with nominal values and calculated masses. */
export function astmGfrpChartRows(): GfrpChartRow[] {
  return BAR_SIZES.filter((size) => size.system === "astm").map((size) => chartRow(size.designation, size.diameterMm, size.areaMm2));
}

/** F1 inquiry diameters with the nominal circular area and the closest ASTM designation. */
export function metricGfrpChartRows(): Array<GfrpChartRow & { closestAstm: string }> {
  return F1_GFRP_DIAMETERS.map((d) => ({
    ...chartRow(`Ø${d}`, d, round(d)),
    closestAstm: matchGfrpSize(d)?.astm.designation ?? "",
  }));
}

// ── ASTM D7957/D7957M requirements (public standard values) ─────────────────
// These are the minimums the standard sets for a qualifying bar. They describe
// the standard, not any bar F1 offers: the supplier's qualification report and
// lot certificate state what a delivered bar achieved.

export interface AstmD7957SizeMinimum {
  designation: string;
  diameterMm: number;
  areaMm2: number;
  /** Minimum guaranteed tensile force, kN (mean minus three standard deviations). */
  minTensileLoadKn: number;
  /** The same force in kip, as printed in the standard. */
  minTensileLoadKip: number;
}

/**
 * Table 3 of ASTM D7957/D7957M: minimum guaranteed tensile force by bar size (kip, with kN
 * in parentheses in the standard). Reproduced in Nanni, Concrete International, Aug. 2021,
 * https://par.nsf.gov/servlets/purl/10353515. Guaranteed = sample mean minus three standard deviations.
 */
export const ASTM_D7957_SIZE_MINIMUMS: readonly AstmD7957SizeMinimum[] = [
  { designation: "No. 2", diameterMm: 6.4, areaMm2: 32, minTensileLoadKn: 27, minTensileLoadKip: 6.1 },
  { designation: "No. 3", diameterMm: 9.5, areaMm2: 71, minTensileLoadKn: 59, minTensileLoadKip: 13.2 },
  { designation: "No. 4", diameterMm: 12.7, areaMm2: 129, minTensileLoadKn: 96, minTensileLoadKip: 21.6 },
  { designation: "No. 5", diameterMm: 15.9, areaMm2: 199, minTensileLoadKn: 130, minTensileLoadKip: 29.1 },
  { designation: "No. 6", diameterMm: 19.1, areaMm2: 284, minTensileLoadKn: 182, minTensileLoadKip: 40.9 },
  { designation: "No. 7", diameterMm: 22.2, areaMm2: 387, minTensileLoadKn: 241, minTensileLoadKip: 54.1 },
  { designation: "No. 8", diameterMm: 25.4, areaMm2: 510, minTensileLoadKn: 297, minTensileLoadKip: 66.8 },
  { designation: "No. 9", diameterMm: 28.7, areaMm2: 645, minTensileLoadKn: 365, minTensileLoadKip: 82.0 },
  { designation: "No. 10", diameterMm: 32.3, areaMm2: 819, minTensileLoadKn: 437, minTensileLoadKip: 98.2 },
];

/** Minimum guaranteed tensile stress implied by the load and the nominal area, MPa. */
export function astmMinTensileStressMPa(size: AstmD7957SizeMinimum): number {
  return (size.minTensileLoadKn * 1000) / size.areaMm2;
}

export interface GfrpPropertyRequirement {
  property: string;
  requirement: string;
  method: string;
  /** Why a buyer should care, in one sentence. */
  why: string;
}

/** Property requirements of ASTM D7957/D7957M that apply to every size. */
export const ASTM_D7957_REQUIREMENTS: readonly GfrpPropertyRequirement[] = [
  { property: "Tensile modulus", requirement: "≥ 44.8 GPa (6,500 ksi), mean", method: "ASTM D7205/D7205M", why: "Stiffness governs crack width and deflection; a quarter of steel's 200 GPa." },
  { property: "Ultimate tensile strain", requirement: "≥ 1.1%, mean", method: "ASTM D7205/D7205M", why: "Confirms the bar reaches its guaranteed load before rupture." },
  { property: "Guaranteed tensile force", requirement: "Table 3 value by size (mean − 3σ); see the size table", method: "ASTM D7205/D7205M", why: "The number the engineer multiplies by C_E = 0.85 to design with." },
  { property: "Transverse shear strength", requirement: "≥ 131 MPa (19 ksi)", method: "ASTM D7617/D7617M", why: "Resists dowel action and cutting at cracks and construction joints." },
  { property: "Bond strength to concrete", requirement: "≥ 7.6 MPa (1,100 psi)", method: "ASTM D7913/D7913M", why: "Qualifies the sand coating, wrap or ribs that anchor the bar." },
  { property: "Bent-bar tensile strength", requirement: "≥ 60% of the straight-bar guaranteed load", method: "ASTM D7914/D7914M", why: "Stirrups and hooks lose capacity at the bend; design uses the bent value." },
  { property: "Fiber mass fraction", requirement: "≥ 70% by mass", method: "ASTM D2584 or D3171", why: "Glass carries the load; low fiber content shows up as low modulus." },
  { property: "Moisture absorption", requirement: "≤ 0.25% at 24 h; ≤ 1.0% at saturation", method: "ASTM D570", why: "Water uptake is the route for alkali attack on the glass." },
  { property: "Alkali resistance", requirement: "≥ 80% tensile strength retained after exposure", method: "ASTM D7705/D7705M, Procedure A", why: "Concrete pore water is highly alkaline; this is the durability screen." },
  { property: "Glass transition temperature", requirement: "≥ 100 °C", method: "ASTM E1356 (DSC) or E1640 (DMA)", why: "Sets the service-temperature margin of the vinyl ester matrix." },
  { property: "Degree of cure", requirement: "≥ 95%", method: "ASTM E2160 (DSC)", why: "Under-cured resin absorbs water and loses strength early." },
  { property: "Measured cross-sectional area", requirement: "Within the size-specific range of Table 3", method: "ASTM D7205 Annex", why: "Keeps the nominal area honest when a sand coat or wrap adds diameter." },
];

// ── Standards crosswalk by market ───────────────────────────────────────────

export type StandardRole = "Product" | "Design" | "Test methods" | "Approval / listing" | "Construction";

export interface GfrpStandardEntry {
  market: string;
  document: string;
  role: StandardRole;
  /** What the document fixes or certifies. */
  scope: string;
  /** Who asks for it in practice. */
  usedBy: string;
  /** What a buyer should request from a supplier against it. */
  ask: string;
  href?: string;
}

export const GFRP_STANDARDS_CROSSWALK: readonly GfrpStandardEntry[] = [
  { market: "United States", document: "ASTM D7957/D7957M-26", role: "Product", scope: "Solid round GFRP bars: sizes No. 2–No. 10, guaranteed tensile load by size, modulus ≥ 44.8 GPa, bond, shear, durability (Tables 1–2) and minimum guaranteed force by size (Table 3), with lot quality control.", usedBy: "ACI 440.11 projects, US engineers, most export specifications worldwide.", ask: "Qualification report per size and the production-lot certificate (five specimens per lot), each stating the edition tested.", href: "https://store.astm.org/d7957_d7957m-26.html" },
  { market: "United States", document: "ACI CODE-440.11-22", role: "Design", scope: "Building code for concrete reinforced with GFRP bars; references D7957-22; C_E = 0.85; sustained stress ≤ 0.30 f_fd; seismic and fire limits.", usedBy: "Engineers of record for buildings in IBC jurisdictions.", ask: "Confirm the bar grade's guaranteed values and modulus feed the designer's 440.11 calculation.", href: "https://www.concrete.org/store/productdetail?ItemID=44011U22&Language=English&Units=US_Units" },
  { market: "United States", document: "AASHTO GFRP-2 (2nd ed., 2018)", role: "Design", scope: "LRFD bridge design guide specification for GFRP-reinforced decks, railings, substructures and foundations.", usedBy: "State DOT bridge offices.", ask: "Owner's producer list or approved-product listing, which an importer normally cannot supply.", href: "https://store.transportation.org/Item/PublicationDetail?ID=4148" },
  { market: "United States", document: "ICC-ES AC454 / AC521 (ESR)", role: "Approval / listing", scope: "Acceptance criteria for GFRP bars in structural concrete (AC454) and flatwork shrinkage reinforcement (AC521); an ESR lists one producer's bars.", usedBy: "Building officials and residential/commercial engineers.", ask: "Only holders of a published ESR may claim it. Ask any supplier for the ESR number or a plain statement that none is held.", href: "https://icc-es.org/evaluation-report-program/" },
  { market: "United States", document: "ACI SPEC-440.5-22", role: "Construction", scope: "Construction specification: submittals, storage, handling, placing tolerances and inspection for GFRP bars.", usedBy: "Specifiers writing Division 03 sections.", ask: "Handling and storage instructions and the cutting method for the offered bar.", href: "https://www.concrete.org/store/productdetail.aspx?ItemID=4405U22&Language=English&Units=US_Units" },
  { market: "Canada", document: "CSA S807:19 (R2024)", role: "Product", scope: "FRP bars classified by fiber, modulus grade (I ≥ 40, II ≥ 50, III ≥ 60 GPa) and durability class (D1, D2); covers glass, basalt, carbon and aramid.", usedBy: "Provincial owners (MTO OPSS 1640 requires Grade III, D1, E-CR glass with vinyl ester or epoxy).", ask: "Grade and durability class with the test report that supports them.", href: "https://www.csagroup.org/store/product/CSA%20S807:19/" },
  { market: "Canada", document: "CSA S806:26 · CSA S6:25", role: "Design", scope: "Design of buildings (S806) and highway bridges (S6, Section 16) with FRP reinforcement.", usedBy: "Canadian engineers of record.", ask: "Confirm which grade the design assumed before quoting a substitute.", href: "https://scc-ccn.ca/standardsdb/standards/4035099" },
  { market: "International", document: "ISO 10406-1:2025", role: "Test methods", scope: "Test methods for FRP bars (grids are covered by ISO 10406-4:2025): tension, bond, creep, alkali resistance, transverse shear and more.", usedBy: "Projects outside North America that need a neutral test basis; EU ETAs.", ask: "Reports that name the ISO clause tested; ISO methods do not by themselves certify conformity.", href: "https://www.iso.org/standard/84321.html" },
  { market: "European Union", document: "EN 1992-1-1:2023 Annex R", role: "Design", scope: "Informative annex on FRP reinforcement in Eurocode 2, applied where a national annex allows it.", usedBy: "European engineers, subject to national adoption.", ask: "Nothing product-specific: Annex R is a design method, not a product certification.", href: "https://standards.cencenelec.eu/" },
  { market: "European Union", document: "EAD 260023-00-0301 (ETA → CE)", role: "Approval / listing", scope: "European Assessment Document under which a producer obtains an ETA and may CE mark GFRP bars.", usedBy: "EU and UK (UKCA path) specifiers requiring CE marking.", ask: "The ETA number and Declaration of Performance; without them a bar is not CE marked.", href: "https://www.eota.eu/" },
  { market: "Germany", document: "DIBt general technical approval (e.g. Z-1.6-238)", role: "Approval / listing", scope: "National approval of a specific producer's bar system with design rules for German practice.", usedBy: "German building authorities and designers.", ask: "Approval number; only the named product and producer are covered.", href: "https://www.dibt.de/" },
  { market: "Australia", document: "AS 5204:2023", role: "Product", scope: "Fibre-reinforced polymer bars for concrete reinforcement: materials, properties, testing and marking.", usedBy: "Australian specifiers; state road agencies add their own clauses (Queensland TMR MRTS271 calls for CSA S807 Grade III bars).", ask: "Test reports mapped to AS 5204 clauses plus any state registration the project needs.", href: "https://store.standards.org.au/product/as-5204-2023" },
  { market: "China", document: "GB/T 26743-2011 · JG/T 406-2013", role: "Product", scope: "National standard for FRP bars for civil engineering (GB/T 26743) and the building-industry standard for glass FRP bars (JG/T 406): grades by tensile strength, modulus and durability.", usedBy: "Domestic Chinese projects and some Belt-and-Road export specifications.", ask: "Factory test reports to the GB/T or JG/T grade when the project is designed to Chinese codes.", href: "https://openstd.samr.gov.cn/" },
  { market: "Russia / CIS", document: "GOST 31938-2022", role: "Product", scope: "Composite polymer reinforcement for concrete: types, sizes, physical and mechanical requirements.", usedBy: "Russian and CIS projects.", ask: "GOST certificate of conformity for the specific type and size range.", href: "https://legalacts.ru/doc/prikaz-rosstandarta-ot-01062022-n-444-st-o-vvedenii-v/" },
];

// ── Export planning ─────────────────────────────────────────────────────────

/** Metres of bar per tonne at the chart density; replace with the supplier's declared unit mass. */
export function gfrpMetresPerTonne(areaMm2: number, densityGcm3 = GFRP_CHART_DENSITY_GCM3): number {
  return 1000 / gfrpUnitMass(areaMm2, densityGcm3);
}

/** Indicative container limits used on the export guide. Payload values are typical road-legal figures, not a carrier's rating. */
export const CONTAINER_PLANNING = {
  twentyFt: { internalLengthM: 5.9, payloadT: 26, maxBarLengthM: 5.8 },
  fortyFtHc: { internalLengthM: 12.03, payloadT: 26, maxBarLengthM: 11.8 },
} as const;
