// Shared idempotent catalog seed: categories + E23 formulation + every
// published standard-profile size (weights are F1-published values, NOT
// computed) + the downloads-page document list.
//
// Run from scripts/seed-catalog.ts in a controlled environment with DATABASE_URL.
// The public website deliberately exposes no catalog-management or seed endpoint.

import postgres from "postgres";
// Shared with /resources/technical-data via lib/catalog/en13706.ts — the one
// source for the EN 13706 grade minimums; do not redefine them here.
import { E23_MIN, E17_MIN, TYP_NOTE } from "./en13706";
import { buildProducts } from "./standardProfiles";

export { buildProducts } from "./standardProfiles";

type Sql = ReturnType<typeof postgres>;

const categories = [
  { slug: "i-beam", name: "I-Beams / Wide Flange", description: "Pultruded FRP I-beam and wide-flange structural profiles.", sort: 1 },
  { slug: "channel", name: "Channels", description: "Pultruded FRP channel / U-profiles.", sort: 2 },
  { slug: "angle", name: "Angles", description: "Pultruded FRP equal-leg angle profiles.", sort: 3 },
  { slug: "square-tube", name: "Square & Rectangular Tube", description: "Pultruded FRP SHS / RHS hollow sections.", sort: 4 },
  { slug: "round-tube", name: "Round Tube", description: "Pultruded FRP round tube (CHS).", sort: 5 },
  { slug: "rod", name: "Solid Rod", description: "Pultruded FRP solid round rod.", sort: 6 },
  { slug: "flat-bar", name: "Flat Bar", description: "Pultruded FRP flat bar / strip.", sort: 7 },
];

// ── formulations ────────────────────────────────────────────────────────────
//
// Two data provenances, and they must not be blurred:
//  - E17 / E23 rows carry the MINIMUM requirements of EN 13706-3:2002 Table 1.
//    These are standard values — legitimate to publish as guaranteed minimums
//    for any laminate declared to that grade, regardless of resin family.
//  - E30 / E40 are NOT EN 13706 grades (EN 13706 defines only E17 and E23).
//    E30 is a vendor-tier designation above E23; E40 corresponds to the
//    Austroads ATS 5880 bridge-grade modulus threshold. Only the definitional
//    full-section modulus is filled; every strength stays NULL → renders
//    "verify before release" until real test data exists.
//
// EN 13706-3:2002 Table 1 minimums:
//              E23      E17
//  E_L         23 GPa   17 GPa
//  E_T          7 GPa    5 GPa
//  σt,L       240 MPa  170 MPa
//  σt,T        50 MPa   30 MPa
//  σf,L       240 MPa  170 MPa
//  σf,T       100 MPa   70 MPa
//  pin-bearing L 150 MPa  90 MPa
//  pin-bearing T  70 MPa  50 MPa
//  ILSS (L)     25 MPa   15 MPa

interface SeedFormulation {
  code: string;
  name: string;
  resin: string | null;
  resin_family: string | null;
  glass_content: string | null;
  density_g_cm3: number | null;
  en13706_grade: string | null;
  fire_rating: string | null;
  e_l_gpa: number | null;
  e_t_gpa: number | null;
  tensile_l_mpa: number | null;
  tensile_t_mpa: number | null;
  flexural_l_mpa: number | null;
  flexural_t_mpa: number | null;
  shear_mpa: number | null;
  compressive_l_mpa: number | null;
  pin_bearing_l_mpa: number | null;
  pin_bearing_t_mpa: number | null;
  barcol: number | null;
  water_abs_pct: number | null;
  notes: string | null;
}

const NO_MECH = {
  e_t_gpa: null, tensile_l_mpa: null, tensile_t_mpa: null,
  flexural_l_mpa: null, flexural_t_mpa: null, shear_mpa: null,
  pin_bearing_l_mpa: null, pin_bearing_t_mpa: null,
};
const BASE = {
  compressive_l_mpa: null as number | null,
  barcol: null as number | null,
  water_abs_pct: null as number | null,
  density_g_cm3: null as number | null,
  fire_rating: null as string | null,
  glass_content: null as string | null,
};
const EN_NOTE = (g: string) =>
  `Minimum requirements per EN 13706-3:2002 Table 1, grade ${g}. Guaranteed minimums for laminates declared to this grade; replace with measured values where certified test data exists.`;

// EN 13706 does not specify compressive strength, Barcol hardness or water
// absorption. Until F1 certified test data lands, these three carry TYPICAL
// industry values for the resin system (benchmarks: Strongwell EXTREN
// 500/525/625 coupon data — compressive LW 207 MPa at the E17 tier, Barcol 45,
// water absorption 0.60% max ASTM D570; E23-tier compressive 240 MPa follows
// the European design-manual convention of compressive ≈ tensile minimum).
// TYP_NOTE now lives in ./en13706 (shared with /resources/technical-data).

// Density and glass content shown on non-published rows are typical for the
// resin system, not certified F1 values.
const DG_TYP =
  "Density and glass content shown are typical for the resin system, not certified F1 values.";

// Fire performance is resin-driven, NOT grade-driven. Standard (non-FR)
// polyester is NOT Class 1 — only fire-retardant resins (FR polyester / FR
// vinyl ester) and phenolic reach ASTM E84 Class 1 (flame spread ≤ 25). Every
// fire class below is the class expected for that resin system and still
// requires a certified per-profile ASTM E84 test report before it is specified.
const FIRE_STD = "Standard grade — not fire-retardant (specify an FR grade for ASTM E84 Class 1)";
const FIRE_FR = "ASTM E84 Class 1 (flame spread ≤ 25), UL94 V-0 — FR resin; certified test report required per profile";
const FIRE_VE = "ASTM E84 Class 1 (flame spread ≤ 25) + low smoke — FR vinyl ester; certified test report required per profile";
const FIRE_PH = "ASTM E84 Class 1 (inherent, no additives), low smoke & low toxicity — phenolic; certified test report required per profile";
const FIRE_PU = "Additive-dependent — specify an FR grade for ASTM E84 Class 1";
const FIRE_EP = "Not inherently fire-retardant";

const formulations: SeedFormulation[] = [
  // F1's own published E23 laminate — keeps existing code so the 114 seeded
  // products stay linked. Published values where F1 publishes (ILSS 30 > the
  // 25 minimum), standard minimums for the transverse values F1 does not.
  {
    ...BASE, ...E23_MIN,
    code: "E23-ISO",
    name: "E23 · Isophthalic polyester (general purpose) / E-glass",
    resin: "Isophthalic unsaturated polyester",
    resin_family: "unsaturated_polyester",
    glass_content: "65–70% by weight",
    density_g_cm3: 1.9,
    en13706_grade: "E23",
    fire_rating: FIRE_STD,
    shear_mpa: 30,
    compressive_l_mpa: 240, barcol: 45, water_abs_pct: 0.6,
    notes:
      `F1-published general-purpose laminate (FRP Profile Design Manual DOC-PF-2026-EN Rev. A); ILSS 30 MPa published above the EN 13706 minimum of 25 MPa; transverse values are EN 13706-3 Table 1 grade minimums. Standard isophthalic polyester is not fire-retardant — for ASTM E84 Class 1 specify the FR-E23 grade. ${TYP_NOTE}`,
  },
  {
    ...BASE, ...E17_MIN,
    code: "UP-E17",
    name: "E17 · Isophthalic polyester (general purpose) / E-glass",
    resin: "Isophthalic unsaturated polyester",
    resin_family: "unsaturated_polyester",
    glass_content: "55–60% by weight",
    density_g_cm3: 1.8,
    en13706_grade: "E17",
    fire_rating: FIRE_STD,
    compressive_l_mpa: 200, barcol: 45, water_abs_pct: 0.6,
    notes: `${EN_NOTE("E17")} Secondary / lightly-loaded structural grade. ${DG_TYP} ${TYP_NOTE}`,
  },
  // Rung 2 — fire-retardant polyester (mirrors Strongwell EXTREN 525 /
  // Creative Pultrusions Pultex 1525 / Bedford IFR). Same profile geometry as
  // the GP grade; the FR resin is what carries the ASTM E84 Class 1 rating.
  {
    ...BASE, ...E23_MIN,
    code: "FR-E23",
    name: "E23 · Fire-retardant isophthalic polyester (Class 1) / E-glass",
    resin: "Fire-retardant isophthalic unsaturated polyester",
    resin_family: "unsaturated_polyester",
    glass_content: "60–70% by weight",
    density_g_cm3: 1.9,
    en13706_grade: "E23",
    fire_rating: FIRE_FR,
    compressive_l_mpa: 240, barcol: 45, water_abs_pct: 0.6,
    notes: `${EN_NOTE("E23")} Fire-retardant polyester for fire-code service where chemistry is mild. ${DG_TYP} ${TYP_NOTE}`,
  },
  // Rung 3 — fire-retardant vinyl ester (mirrors EXTREN 625 / Pultex 1625 /
  // Bedford VFR). Premium corrosion + fire.
  {
    ...BASE, ...E23_MIN,
    code: "VE-E23",
    name: "E23 · Vinyl ester (FR, corrosion grade) / E-glass",
    resin: "Fire-retardant vinyl ester",
    resin_family: "vinyl_ester",
    glass_content: "60–70% by weight",
    density_g_cm3: 1.85,
    en13706_grade: "E23",
    fire_rating: FIRE_VE,
    compressive_l_mpa: 240, barcol: 45, water_abs_pct: 0.5,
    notes: `${EN_NOTE("E23")} Vinyl ester matrix for aggressive chemical / marine service (strong acids, bleach, solvents, hydrolysis) and higher service temperature. ${DG_TYP} ${TYP_NOTE}`,
  },
  {
    ...BASE, ...E23_MIN,
    code: "EP-E23",
    name: "E23 · Epoxy / E-glass",
    resin: "Epoxy",
    resin_family: "epoxy",
    glass_content: "60–70% by weight",
    density_g_cm3: 1.9,
    en13706_grade: "E23",
    fire_rating: FIRE_EP,
    compressive_l_mpa: 240, barcol: 50, water_abs_pct: 0.5,
    notes: `${EN_NOTE("E23")} Epoxy matrix for elevated-temperature and fatigue-critical service (e.g. wind spar caps). ${DG_TYP} ${TYP_NOTE}`,
  },
  {
    ...BASE, ...E23_MIN,
    code: "PU-E23",
    name: "E23 · Polyurethane / E-glass",
    resin: "Polyurethane",
    resin_family: "polyurethane",
    glass_content: "65–75% by weight",
    density_g_cm3: 1.95,
    en13706_grade: "E23",
    fire_rating: FIRE_PU,
    // Water absorption backed by F1's own PU spec limit (PU-GF TDS F1-TDS-PUGF-001:
    // spec <= 0.5%, measured 0.099-0.114% on the automotive-grade laminate).
    compressive_l_mpa: 240, barcol: 45, water_abs_pct: 0.5,
    notes: `${EN_NOTE("E23")} Tough PU matrix for impact / high-strength thin-wall sections (e.g. window frames); PU pultrusion typically exceeds these minimums (see PU-GF mechanical data sheet), replace with measured values per program. ${DG_TYP} ${TYP_NOTE}`,
  },
  {
    ...BASE, ...E23_MIN,
    code: "PH-E23",
    name: "E23 · Phenolic / E-glass",
    resin: "Phenolic",
    resin_family: "phenolic",
    glass_content: "55–65% by weight",
    density_g_cm3: 1.75,
    en13706_grade: "E23",
    fire_rating: FIRE_PH,
    // Phenolic laminates run slightly below polyester in compressive strength
    // and absorb more moisture — typical published ranges, not measured F1 data.
    compressive_l_mpa: 200, barcol: 45, water_abs_pct: 1.0,
    notes: `${EN_NOTE("E23")} Phenolic matrix for fire-critical enclosed / occupied service — tunnels, transit interiors, offshore (inherent low flame spread, low smoke & toxicity). ${DG_TYP} ${TYP_NOTE}`,
  },
  // Higher-modulus tiers — NOT EN 13706 grades. Definitional modulus only.
  {
    ...BASE, ...NO_MECH,
    code: "HM-E30",
    name: "E30 · High-modulus laminate (vendor tier)",
    resin: null,
    resin_family: null,
    en13706_grade: "E30",
    e_l_gpa: 30,
    notes:
      "E30 is NOT an EN 13706 grade (the standard defines only E17/E23). Vendor tier: full-section modulus ≥ 30 GPa is definitional; all strengths require program test data before release.",
  },
  {
    ...BASE, ...NO_MECH,
    code: "HM-E40",
    name: "E40-equivalent · Bridge-grade laminate (ATS 5880 tier)",
    resin: null,
    resin_family: null,
    en13706_grade: "E40",
    e_l_gpa: 40,
    notes:
      "E40 is an \"E40-equivalent\" bridge-grade threshold per Austroads ATS 5880 (full-section modulus ≥ 40 GPa) — NOT an EN 13706 grade (EN 13706 tops out at E23). Benchmark construction: FR vinyl ester + ~77% glass by weight (industry reference: Wagner CFT). Bridge use additionally requires characteristic values per ASTM D7290 and full-section four-point bending per ASTM D6109; all strengths require program test data before release.",
  },
];

// Products default to the E23-ISO general-purpose laminate. That base resin is
// NOT fire-retardant, so the products-level standards line states the structural
// grade only — an ASTM E84 fire class belongs to the FR / VE / phenolic
// formulations, not the default general-purpose profile.
const STANDARDS = "EN 13706 Grade E23";

/**
 * Build-safe, read-only copy of the authoritative seed catalog.
 *
 * Public datasheet pages use this when the production catalog database is
 * empty, incomplete, or temporarily unavailable. Keeping the fallback here
 * prevents the HTML routes from drifting away from the same categories,
 * formulation, geometry, and published weights used by the database seed.
 */
export function buildStaticCatalogFallback() {
  const formulation = formulations.find((item) => item.code === "E23-ISO");
  if (!formulation) {
    throw new Error("Static catalog fallback is missing the E23-ISO formulation");
  }

  return {
    categories: categories.map((category) => ({ ...category })),
    formulation: { ...formulation },
    products: buildProducts(),
  };
}

// Downloads (from the previously hardcoded downloads page list)
const downloads: {
  title: string; format: string; size: string; category: string;
  file_url: string | null; description: string;
}[] = [
  { title: "Pultruded FRP Pipe — Mining & Oilfield Catalog (Edition 2026.06)", format: "PDF", size: "991 KB", category: "catalog", file_url: "/downloads/f1composite-oilfield-mine-pipe-catalog-2026-06.pdf", description: "3-page product catalog for F1 Composite serial-production pultruded FRP pipe in two qualified families. Series 01 — Oilfield Surface Gathering: DN50–DN300, 0.7–3.5 MPa, −40 °C to +140 °C continuous (short-term peak +160 °C), vinyl-ester / epoxy / polyurethane matrices with 0.5–2.5 mm resin-rich liner (novolac VE for sour H₂S / CO₂ service), ≥25-year life, qualified to API 15LR, ISO 14692, NORSOK M-622, ASTM D2992, SY/T 6266. Series 02 — Mine Methane Drainage: DN25–DN300, 0.6–1.6 MPa, surface resistance ≤3×10⁸ Ω, LOI ≥28%, UL 94 V-0, ≥50-year design life, qualified to MT 558.2, GB 16413, MT 113, ISO 4589-2, ASTM E84 Class I. Edition 2026.06, Rev v1.3." },
  { title: "FRP Profile Design Manual — 2026 Edition", format: "PDF", size: "734 KB", category: "catalog", file_url: "/downloads/f1composite-frp-profile-design-manual-2026.pdf", description: "24-page engineering reference for F1 Composite pultruded structural profiles. Covers equal angle (50–152 mm), square box (50–101 mm), channel (100–254 mm), tube and top rail, and wide flange beam (152–305 mm), with full dimensions, section properties, E23-grade material data per EN 13706-2, point-load and UDL mid-span deflection tables across 500 mm to 6 m spans, chemical resistance, BS 476 fire performance, MSDS, handling, and maintenance. Doc no. DOC-PF-2026-EN Rev. A." },
  { title: "Pultruded FRP Window & Door Catalog", format: "PDF", size: "830 KB", category: "catalog", file_url: "/downloads/f1composite-frp-window-door-catalog.pdf", description: "Full F1 Composite fenestration catalog — 70/80/90/140 series window and door frame profiles. Material comparison vs aluminum / PVC-U / pine, profile specifications, recommended glazing builds and U-values, energy-code matching for EN 14351-1, PHI passive-house, AS 2047 and NFRC. Includes sub-frame range and custom-pultrusion options." },
  { title: "Wind Energy Pultruded Laminate — Mechanical Data Sheet", format: "PDF", size: "13 KB", category: "catalog", file_url: "/downloads/f1composite-wind-energy-pultruded-laminate-datasheet.pdf", description: "GFRP (WE-G80) and CFRP (WE-C100) pultruded spar-cap laminates for wind turbine rotor blades. Tension-tension S-N fatigue per ISO 13003, full static envelope per ISO 527-5 / 14125 / 14126 / 14130 and ASTM D7078, with characteristic values per DNVGL-ST-0376 and GL 2010. Independent DNV·GL-accredited laboratory testing." },
  { title: "PU-GF Pultruded Profile — Mechanical Data Sheet", format: "PDF", size: "8 KB", category: "catalog", file_url: "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf", description: "Mechanical performance summary for PU-GF (polyurethane / E-glass) pultruded composite, 80 mm structural section. Tensile, compressive, flexural, ILSS, and water absorption against GB/T, ISO, and ASTM standards. Independent third-party laboratory testing." },
  { title: "PHI Component Certificate — 90-Series GFRP Window", format: "PDF", size: "0.4 MB", category: "certification", file_url: "/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf", description: "Passive House Institute (PHI) component certification for the 90-series pultruded GFRP window. Component-ID 2491wi03, phA arctic climate class. Issued by PHI Darmstadt." },
  { title: "Intertek AS 2047 Test Report — Turn-and-Tilt GFRP Window", format: "PDF", size: "3 MB", category: "certification", file_url: "/downloads/intertek-report-240821010SHF-001-turn-tilt-window.pdf", description: "Intertek Report No. 240821010SHF-001. Full AS 2047-2014 / AS/NZS 4420.1-2016 performance test on a pultruded GFRP turn-and-tilt window. Air infiltration, water penetration (600 Pa), structural at 3000 Pa. IAS-accredited Intertek Shanghai Fengxian lab." },
  { title: "Intertek AS 2047 Test Report — Lift-Sliding GFRP Door", format: "PDF", size: "2.8 MB", category: "certification", file_url: "/downloads/intertek-report-240821010SHF-002-lift-sliding-door.pdf", description: "Intertek Report No. 240821010SHF-002. Full AS 2047-2014 / AS/NZS 4420.1-2016 performance test on a 3000 × 2400 mm 140-Series pultruded GFRP lift-sliding door. Tested Oct 2024, issued Dec 2024 at IAS-accredited Intertek Shanghai Fengxian." },
  { title: "3-Star Green Building Material Certificate — Pultruded GFRP Windows", format: "PDF", size: "115 KB", category: "certification", file_url: "/downloads/f1composite-3star-green-building-cert-frp-windows-2025.pdf", description: "Certificate No. CABR-01(02)-(2025)-CGP-035. 3-Star (highest tier) rating under the Chinese Green Building Material assessment framework T/CECS 10026-2019 and CABR/CC-TD-CGP-09:2024. Covers F1 Composite 65/70/80/90-series tilt-and-turn pultruded GFRP-polyurethane windows for cold, hot-summer-cold-winter, and hot-summer-warm-winter climate zones. Issued by China Academy of Building Research Co., Ltd. (CABR), valid 2025-06-05 to 2030-06-04." },
  { title: "EPD & Carbon Footprint — Pultruded GFRP Composite Profiles", format: "PDF", size: "142 KB", category: "sustainability", file_url: "/downloads/f1composite-epd-carbon-footprint-frp-profiles-2025.pdf", description: "Environmental Product Declaration and product carbon footprint analysis for F1 Composite pultruded GFRP composite profile products, with 1 m² functional unit. Calculation reference CABR-CFC-01(02)-2025(20030)1, cradle-to-gate 33,934.34 g CO₂e/m², distribution 254.59 g, cradle-to-grave 36,099.32 g. Standards: GB/T 24025-2009 (ISO 14025-aligned Type III EPD), GB/T 32161-2015, ISO 14067, PAS 2050. Issued by China Academy of Building Research Co., Ltd. (CABR) Certification Center on April 30, 2025." },
  { title: "Product Catalog 2024", format: "PDF", size: "12 MB", category: "catalog", file_url: null, description: "Complete catalog of standard pultruded FRP profiles with dimensions, properties, and ordering information." },
  { title: "Fenestration Systems Brochure", format: "PDF", size: "8 MB", category: "catalog", file_url: null, description: "Detailed brochure covering 70/80/90-series FRP window and door frame systems." },
  { title: "ISO 9001:2015 Certificate", format: "PDF", size: "0.5 MB", category: "certification", file_url: null, description: "Current ISO 9001:2015 quality management system certification." },
  { title: "CE Declaration of Performance", format: "PDF", size: "1 MB", category: "certification", file_url: null, description: "EN 13706 Declaration of Performance for CE-marked structural profiles." },
  { title: "Standard Profiles — CAD Library", format: "DWG/STEP", size: "25 MB", category: "cad", file_url: null, description: "2D and 3D CAD models for all standard I-beam, channel, angle, and tube profiles." },
  { title: "Chemical Resistance Chart", format: "PDF", size: "2 MB", category: "catalog", file_url: null, description: "Chemical resistance ratings for polyester, vinyl ester, and epoxy resin systems across 200+ chemicals." },
];

export interface SeedResult {
  categories: number;
  formulations: number;
  formulationId: number;
  products: number;
  downloads: number;
}

/** Run the full idempotent seed against the given self-hosted PostgreSQL connection. */
export async function runCatalogSeed(sql: Sql): Promise<SeedResult> {
  // tables (same DDL as lib/catalog/db.ts ensureCatalogTables)
  await sql`CREATE TABLE IF NOT EXISTS catalog_categories (
    id BIGSERIAL PRIMARY KEY, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
    description TEXT, sort INT NOT NULL DEFAULT 0)`;
  await sql`CREATE TABLE IF NOT EXISTS catalog_formulations (
    id BIGSERIAL PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
    resin TEXT, glass_content TEXT, density_g_cm3 NUMERIC, en13706_grade TEXT,
    fire_rating TEXT, e_l_gpa NUMERIC, e_t_gpa NUMERIC, tensile_l_mpa NUMERIC,
    tensile_t_mpa NUMERIC, flexural_l_mpa NUMERIC, flexural_t_mpa NUMERIC,
    shear_mpa NUMERIC, compressive_l_mpa NUMERIC, barcol NUMERIC, water_abs_pct NUMERIC,
    notes TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
  await sql`CREATE TABLE IF NOT EXISTS catalog_products (
    id BIGSERIAL PRIMARY KEY, model TEXT NOT NULL UNIQUE, name TEXT,
    category_id BIGINT REFERENCES catalog_categories(id) ON DELETE SET NULL,
    formulation_id BIGINT REFERENCES catalog_formulations(id) ON DELETE SET NULL,
    geometry JSONB, weight_per_m NUMERIC, standards TEXT, applications TEXT,
    tolerances TEXT, status TEXT NOT NULL DEFAULT 'active', sort INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
  await sql`CREATE TABLE IF NOT EXISTS catalog_downloads (
    id BIGSERIAL PRIMARY KEY, title TEXT NOT NULL, format TEXT NOT NULL DEFAULT 'PDF',
    size TEXT, description TEXT, file_url TEXT, category TEXT, sort INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
  await sql`ALTER TABLE catalog_formulations ADD COLUMN IF NOT EXISTS resin_family TEXT`;
  await sql`ALTER TABLE catalog_formulations ADD COLUMN IF NOT EXISTS pin_bearing_l_mpa NUMERIC`;
  await sql`ALTER TABLE catalog_formulations ADD COLUMN IF NOT EXISTS pin_bearing_t_mpa NUMERIC`;
  await sql`CREATE TABLE IF NOT EXISTS admin_settings (
    key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`;

  // categories
  const catId = new Map<string, number>();
  for (const c of categories) {
    const rows = (await sql`
      INSERT INTO catalog_categories (slug, name, description, sort)
      VALUES (${c.slug}, ${c.name}, ${c.description}, ${c.sort})
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, sort = EXCLUDED.sort
      RETURNING id
    `) as { id: number }[];
    catId.set(c.slug, rows[0].id);
  }

  // formulations — E23-ISO first so the returned id keeps the 114 products' link
  let formulationId = 0;
  for (const f of formulations) {
    const fRows = (await sql`
      INSERT INTO catalog_formulations
        (code, name, resin, resin_family, glass_content, density_g_cm3, en13706_grade,
         fire_rating, e_l_gpa, e_t_gpa, tensile_l_mpa, tensile_t_mpa, flexural_l_mpa,
         flexural_t_mpa, shear_mpa, compressive_l_mpa, pin_bearing_l_mpa, pin_bearing_t_mpa,
         barcol, water_abs_pct, notes)
      VALUES
        (${f.code}, ${f.name}, ${f.resin}, ${f.resin_family}, ${f.glass_content},
         ${f.density_g_cm3}, ${f.en13706_grade}, ${f.fire_rating}, ${f.e_l_gpa}, ${f.e_t_gpa},
         ${f.tensile_l_mpa}, ${f.tensile_t_mpa}, ${f.flexural_l_mpa}, ${f.flexural_t_mpa},
         ${f.shear_mpa}, ${f.compressive_l_mpa}, ${f.pin_bearing_l_mpa}, ${f.pin_bearing_t_mpa},
         ${f.barcol}, ${f.water_abs_pct}, ${f.notes})
      ON CONFLICT (code) DO UPDATE SET
        name = EXCLUDED.name, resin = EXCLUDED.resin, resin_family = EXCLUDED.resin_family,
        glass_content = EXCLUDED.glass_content, density_g_cm3 = EXCLUDED.density_g_cm3,
        en13706_grade = EXCLUDED.en13706_grade, fire_rating = EXCLUDED.fire_rating,
        e_l_gpa = EXCLUDED.e_l_gpa, e_t_gpa = EXCLUDED.e_t_gpa,
        tensile_l_mpa = EXCLUDED.tensile_l_mpa, tensile_t_mpa = EXCLUDED.tensile_t_mpa,
        flexural_l_mpa = EXCLUDED.flexural_l_mpa, flexural_t_mpa = EXCLUDED.flexural_t_mpa,
        shear_mpa = EXCLUDED.shear_mpa, pin_bearing_l_mpa = EXCLUDED.pin_bearing_l_mpa,
        pin_bearing_t_mpa = EXCLUDED.pin_bearing_t_mpa,
        compressive_l_mpa = EXCLUDED.compressive_l_mpa, barcol = EXCLUDED.barcol,
        water_abs_pct = EXCLUDED.water_abs_pct, notes = EXCLUDED.notes,
        updated_at = now()
      RETURNING id
    `) as { id: number }[];
    if (f.code === "E23-ISO") formulationId = fRows[0].id;
  }

  // products
  const P = buildProducts();
  let sort = 0;
  for (const p of P) {
    sort += 1;
    const categoryId = catId.get(p.cat);
    if (categoryId == null) {
      throw new Error(`Missing seeded category: ${p.cat}`);
    }
    await sql`
      INSERT INTO catalog_products
        (model, category_id, formulation_id, geometry, weight_per_m, standards, status, sort)
      VALUES
        (${p.model}, ${categoryId}, ${formulationId}, ${JSON.stringify(p.geometry)}::jsonb,
         ${p.weight}, ${STANDARDS}, 'active', ${sort})
      ON CONFLICT (model) DO UPDATE SET
        category_id = EXCLUDED.category_id, formulation_id = EXCLUDED.formulation_id,
        geometry = EXCLUDED.geometry, weight_per_m = EXCLUDED.weight_per_m,
        standards = EXCLUDED.standards, sort = EXCLUDED.sort, updated_at = now()
    `;
  }

  // downloads — no natural unique key in DDL; match on title
  let dlSort = 0;
  for (const d of downloads) {
    dlSort += 1;
    const existing = (await sql`SELECT id FROM catalog_downloads WHERE title = ${d.title}`) as { id: number }[];
    if (existing.length) {
      await sql`
        UPDATE catalog_downloads SET format = ${d.format}, size = ${d.size},
          description = ${d.description}, file_url = ${d.file_url}, category = ${d.category},
          sort = ${dlSort}, updated_at = now()
        WHERE id = ${existing[0].id}
      `;
    } else {
      await sql`
        INSERT INTO catalog_downloads (title, format, size, description, file_url, category, sort, published)
        VALUES (${d.title}, ${d.format}, ${d.size}, ${d.description}, ${d.file_url}, ${d.category}, ${dlSort}, true)
      `;
    }
  }

  return {
    categories: catId.size,
    formulations: formulations.length,
    formulationId,
    products: P.length,
    downloads: downloads.length,
  };
}
