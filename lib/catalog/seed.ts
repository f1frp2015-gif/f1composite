// Shared idempotent catalog seed: categories + E23 formulation + every
// published standard-profile size (weights are F1-published values, NOT
// computed) + the downloads-page document list.
//
// Callable from two places:
//  - scripts/seed-catalog.ts  (local, needs a plain-text DATABASE_URL)
//  - POST /api/admin/seed     (on Vercel, where the Neon integration's
//    sensitive env vars exist — `vercel env pull` returns them EMPTY locally,
//    which is why the API path is the practical one for production)

import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

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

const E23_MIN = {
  e_l_gpa: 23, e_t_gpa: 7,
  tensile_l_mpa: 240, tensile_t_mpa: 50,
  flexural_l_mpa: 240, flexural_t_mpa: 100,
  shear_mpa: 25, pin_bearing_l_mpa: 150, pin_bearing_t_mpa: 70,
};
const E17_MIN = {
  e_l_gpa: 17, e_t_gpa: 5,
  tensile_l_mpa: 170, tensile_t_mpa: 30,
  flexural_l_mpa: 170, flexural_t_mpa: 70,
  shear_mpa: 15, pin_bearing_l_mpa: 90, pin_bearing_t_mpa: 50,
};
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
const TYP_NOTE =
  "Compressive strength, Barcol hardness and water absorption are not specified by EN 13706 — the figures shown are typical industry values for this resin system, pending F1 certified test data; request certified values before final design.";

const formulations: SeedFormulation[] = [
  // F1's own published E23 laminate — keeps existing code so the 114 seeded
  // products stay linked. Published values where F1 publishes (ILSS 30 > the
  // 25 minimum), standard minimums for the transverse values F1 does not.
  {
    ...BASE, ...E23_MIN,
    code: "E23-ISO",
    name: "E23 · Unsaturated polyester (isophthalic) / E-glass",
    resin: "Isophthalic unsaturated polyester",
    resin_family: "unsaturated_polyester",
    glass_content: "65–70% by weight",
    density_g_cm3: 1.9,
    en13706_grade: "E23",
    fire_rating: "ASTM E84 Class A (FSI ≤ 25)",
    shear_mpa: 30,
    compressive_l_mpa: 240, barcol: 45, water_abs_pct: 0.6,
    notes:
      `F1-published laminate (FRP Profile Design Manual DOC-PF-2026-EN Rev. A); ILSS 30 MPa published above the EN 13706 minimum of 25 MPa; transverse values are EN 13706-3 Table 1 grade minimums. ${TYP_NOTE}`,
  },
  {
    ...BASE, ...E17_MIN,
    code: "UP-E17",
    name: "E17 · Unsaturated polyester / E-glass",
    resin: "Unsaturated polyester",
    resin_family: "unsaturated_polyester",
    en13706_grade: "E17",
    compressive_l_mpa: 200, barcol: 45, water_abs_pct: 0.6,
    notes: `${EN_NOTE("E17")} ${TYP_NOTE}`,
  },
  {
    ...BASE, ...E23_MIN,
    code: "VE-E23",
    name: "E23 · Vinyl ester / E-glass",
    resin: "Vinyl ester",
    resin_family: "vinyl_ester",
    en13706_grade: "E23",
    compressive_l_mpa: 240, barcol: 45, water_abs_pct: 0.6,
    notes: `${EN_NOTE("E23")} Vinyl ester matrix for aggressive chemical / marine service. ${TYP_NOTE}`,
  },
  {
    ...BASE, ...E23_MIN,
    code: "EP-E23",
    name: "E23 · Epoxy / E-glass",
    resin: "Epoxy",
    resin_family: "epoxy",
    en13706_grade: "E23",
    compressive_l_mpa: 240, barcol: 50, water_abs_pct: 0.5,
    notes: `${EN_NOTE("E23")} Epoxy matrix for elevated-temperature and fatigue-critical service. ${TYP_NOTE}`,
  },
  {
    ...BASE, ...E23_MIN,
    code: "PU-E23",
    name: "E23 · Polyurethane / E-glass",
    resin: "Polyurethane",
    resin_family: "polyurethane",
    en13706_grade: "E23",
    // Water absorption backed by F1's own PU spec limit (PU-GF TDS F1-TDS-PUGF-001:
    // spec <= 0.5%, measured 0.099-0.114% on the automotive-grade laminate).
    compressive_l_mpa: 240, barcol: 45, water_abs_pct: 0.5,
    notes: `${EN_NOTE("E23")} PU pultrusion typically exceeds these minimums (see PU-GF mechanical data sheet); replace with measured values per programme. ${TYP_NOTE}`,
  },
  {
    ...BASE, ...E23_MIN,
    code: "PH-E23",
    name: "E23 · Phenolic / E-glass",
    resin: "Phenolic",
    resin_family: "phenolic",
    en13706_grade: "E23",
    // Phenolic laminates run slightly below polyester in compressive strength
    // and absorb more moisture — typical published ranges, not measured F1 data.
    compressive_l_mpa: 200, barcol: 45, water_abs_pct: 1.0,
    notes: `${EN_NOTE("E23")} Phenolic matrix for fire-critical service (low flame spread / smoke). ${TYP_NOTE}`,
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
      "E30 is NOT an EN 13706 grade (the standard defines only E17/E23). Vendor tier: full-section modulus ≥ 30 GPa is definitional; all strengths require programme test data before release.",
  },
  {
    ...BASE, ...NO_MECH,
    code: "HM-E40",
    name: "E40 · Bridge-grade laminate (ATS 5880 tier)",
    resin: null,
    resin_family: null,
    en13706_grade: "E40",
    e_l_gpa: 40,
    notes:
      "E40 corresponds to the Austroads ATS 5880 bridge-grade modulus threshold, not an EN 13706 grade. Requires ≥77% glass or hybrid carbon reinforcement; all strengths require programme test data before release.",
  },
];

const STANDARDS = "EN 13706 Grade E23 · ASTM E84 Class A";

type SeedProduct = { model: string; cat: string; geometry: unknown; weight: number };

function buildProducts(): SeedProduct[] {
  const P: SeedProduct[] = [];
  const geo = (shape: string, dims: Record<string, number>) => ({ kind: "parametric", shape, dims });

  // I-beams (H, B, t → tf=tw=t) — published weights
  for (const [h, b, t, w] of [
    [76, 38, 6.4, 1.2], [100, 50, 6, 1.6], [120, 60, 6, 2.0], [152, 76, 6.4, 2.9],
    [160, 80, 8, 3.6], [200, 100, 10, 5.8], [240, 120, 12, 8.4], [300, 150, 15, 13.5],
    [305, 305, 12.7, 16.0],
  ] as const) {
    P.push({ model: `I ${h}×${b}×${t}`, cat: "i-beam", geometry: geo("i_beam", { H: h, B: b, tf: t, tw: t }), weight: w });
  }

  // Channels (H, B, t)
  for (const [h, b, t, w] of [
    [38, 13, 4.8, 0.4], [50, 25, 5, 0.7], [76, 25, 6.4, 1.0], [76, 38, 6.4, 1.4],
    [100, 30, 6, 1.5], [100, 50, 6, 1.8], [120, 50, 6, 2.0], [150, 40, 6, 2.1],
    [152, 43, 6.4, 2.2], [152, 43, 9.5, 3.2], [160, 48, 8, 3.0], [200, 60, 8, 3.8],
    [200, 60, 10, 4.6], [240, 72, 8, 4.6], [240, 72, 12, 6.8], [254, 76, 9.5, 5.6],
    [300, 90, 15, 10.4], [305, 89, 12.7, 8.8], [360, 108, 18, 15.0],
  ] as const) {
    P.push({ model: `U ${h}×${b}×${t}`, cat: "channel", geometry: geo("channel", { H: h, B: b, tf: t, tw: t }), weight: w });
  }

  // Angles (a, b, t)
  for (const [a, b, t, w] of [
    [25, 25, 3.2, 0.3], [30, 30, 4, 0.4], [38, 38, 4.8, 0.5], [50, 50, 5, 0.8],
    [50, 50, 6, 0.9], [50, 50, 8, 1.2], [65, 65, 6, 1.2], [75, 75, 6, 1.4],
    [75, 75, 8, 1.8], [76, 76, 6.4, 1.5], [100, 100, 8, 2.5], [100, 100, 10, 3.0],
    [102, 102, 9.5, 3.0], [150, 150, 12, 5.6], [152, 152, 12.7, 6.0],
  ] as const) {
    P.push({ model: `L ${a}×${b}×${t}`, cat: "angle", geometry: geo("angle", { a, b, t }), weight: w });
  }

  // Square / rectangular hollow (H, B, t)
  for (const [h, b, t, w] of [
    [25, 25, 3.2, 0.4], [38, 38, 4.8, 0.9], [40, 20, 7, 1.0], [40, 25, 8, 1.2],
    [50, 50, 5, 1.4], [60, 60, 5, 1.7], [75, 75, 6, 2.5], [80, 60, 5, 2.0],
    [100, 100, 6, 3.5], [100, 100, 8, 4.5], [100, 60, 8, 3.6], [114, 114, 6, 4.0],
    [114, 114, 8, 5.2], [120, 120, 8, 5.6], [120, 60, 5, 2.6], [132, 132, 9.5, 7.0],
    [152, 152, 9.5, 8.2], [160, 160, 8, 7.4], [200, 200, 10, 11.6], [240, 240, 12, 16.8],
  ] as const) {
    const square = h === b;
    P.push({
      model: `${square ? "SHS" : "RHS"} ${h}×${b}×${t}`,
      cat: "square-tube",
      geometry: square ? geo("shs", { D: h, t }) : geo("rhs", { H: h, B: b, t }),
      weight: w,
    });
  }

  // Round tube (OD, t)
  for (const [od, t, w] of [
    [25, 3, 0.3], [32, 3, 0.4], [38, 3.2, 0.5], [42, 4, 0.7], [50, 4, 0.9],
    [50, 5, 1.1], [60, 5, 1.3], [63.5, 6.4, 1.7], [70, 5, 1.6], [76, 6.4, 2.1],
    [80, 5, 1.8], [80, 7, 2.5], [89, 6.4, 2.5], [100, 6, 2.7], [114, 6.4, 3.3],
    [127, 6.4, 3.7], [150, 8, 5.4],
  ] as const) {
    P.push({ model: `CHS ${od}×${t}`, cat: "round-tube", geometry: geo("tube", { OD: od, t }), weight: w });
  }

  // Solid rod (D)
  for (const [d, w] of [
    [6, 0.05], [8, 0.09], [10, 0.14], [12, 0.21], [13, 0.24], [16, 0.37],
    [19, 0.52], [20, 0.57], [22, 0.69], [25, 0.89], [28, 1.12], [30, 1.29],
    [32, 1.47], [38, 2.06], [40, 2.29], [50, 3.57],
  ] as const) {
    P.push({ model: `Rod Ø${d}`, cat: "rod", geometry: geo("rod", { D: d }), weight: w });
  }

  // Flat bar (w=H, t=B)
  for (const [w0, t, w] of [
    [12, 3, 0.07], [20, 3, 0.11], [25, 3, 0.14], [25, 5, 0.23], [30, 4, 0.22],
    [38, 4.8, 0.33], [50, 5, 0.45], [50, 6, 0.55], [50, 10, 0.91], [75, 6, 0.82],
    [75, 10, 1.36], [100, 6, 1.09], [100, 10, 1.82], [100, 15, 2.73], [150, 10, 2.73],
    [150, 15, 4.09], [200, 15, 5.45], [305, 25, 13.86],
  ] as const) {
    P.push({ model: `FB ${w0}×${t}`, cat: "flat-bar", geometry: geo("flat", { H: w0, B: t }), weight: w });
  }

  return P;
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

/** Run the full idempotent seed against the given Neon connection. */
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
    await sql`
      INSERT INTO catalog_products
        (model, category_id, formulation_id, geometry, weight_per_m, standards, status, sort)
      VALUES
        (${p.model}, ${catId.get(p.cat)}, ${formulationId}, ${JSON.stringify(p.geometry)}::jsonb,
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
