/**
 * Documents listed on /resources/downloads when the catalog database has no
 * rows (or is unreachable), plus the window templates the page always shows.
 * The site search indexes the same list (lib/documents.ts).
 */

export interface DownloadItem {
  title: string;
  format: string;
  size: string;
  description: string;
  file?: string;
}

export const fallbackDownloads: DownloadItem[] = [
  {
    title: "Pultruded FRP Pipe — Mining & Oilfield Catalog (Edition 2026.06)",
    format: "PDF",
    size: "991 KB",
    description: "3-page product catalog for F1 Composite serial-production pultruded FRP pipe in two qualified families. Series 01 — Oilfield Surface Gathering: DN50–DN300, 0.7–3.5 MPa, −40 °C to +140 °C continuous (short-term peak +160 °C), vinyl-ester / epoxy / polyurethane matrices with 0.5–2.5 mm resin-rich liner (novolac VE for sour H₂S / CO₂ service), ≥25-year life, qualified to API 15LR, ISO 14692, NORSOK M-622, ASTM D2992, SY/T 6266. Series 02 — Mine Methane Drainage: DN25–DN300, 0.6–1.6 MPa, surface resistance ≤3×10⁸ Ω, LOI ≥28%, UL 94 V-0, ≥50-year design life, qualified to MT 558.2, GB 16413, MT 113, ISO 4589-2, ASTM E84 Class I. Edition 2026.06, Rev v1.3.",
    file: "/downloads/f1composite-oilfield-mine-pipe-catalog-2026-06.pdf",
  },
  {
    title: "Nine-Series FRP Window & Door Purchasing Catalog",
    format: "PDF",
    size: "2026 edition",
    description: "Nine series, two purchasing paths: system profiles for local fabrication and finished units for local installation. Updated 50/55/90-sliding/140 profile codes, configuration review, BOM and window-schedule requirements.",
    file: "/downloads/f1composite-frp-window-door-catalog.pdf",
  },
  {
    title: "Wind Energy Pultruded Laminate — Mechanical Data Sheet",
    format: "PDF",
    size: "13 KB",
    description: "GFRP (WE-G80) and CFRP (WE-C100) pultruded spar-cap laminates for wind turbine rotor blades. Tension-tension S-N fatigue per ISO 13003, full static envelope per ISO 527-5 / 14125 / 14126 / 14130 and ASTM D7078, with characteristic values per DNVGL-ST-0376 and GL 2010. Independent DNV·GL-accredited laboratory testing.",
    file: "/downloads/f1composite-wind-energy-pultruded-laminate-datasheet.pdf",
  },
  {
    title: "PU-GF Pultruded Profile — Mechanical Data Sheet",
    format: "PDF",
    size: "8 KB",
    description: "Mechanical performance summary for PU-GF (polyurethane / E-glass) pultruded composite, 80 mm structural section. Tensile, compressive, flexural, ILSS, and water absorption against GB/T, ISO, and ASTM standards. Independent third-party laboratory testing.",
    file: "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf",
  },
  {
    title: "PHI Component Certificate — 90-Series GFRP Window",
    format: "PDF",
    size: "0.4 MB",
    description: "Passive House Institute (PHI) component certification for the 90-series pultruded GFRP window. Component-ID 2491wi03, phB efficiency class for the cool-temperate climate zone. Issued by PHI Darmstadt.",
    file: "/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf",
  },
  {
    title: "Intertek AS 2047 Test Report — Turn-and-Tilt GFRP Window",
    format: "PDF",
    size: "3 MB",
    description: "Intertek Report No. 240821010SHF-001. Full AS 2047-2014 / AS/NZS 4420.1-2016 performance test on a pultruded GFRP turn-and-tilt window. Air infiltration, water penetration (600 Pa), structural at 3000 Pa. IAS-accredited Intertek Shanghai Fengxian lab.",
    file: "/downloads/intertek-report-240821010SHF-001-turn-tilt-window.pdf",
  },
  {
    title: "Intertek AS 2047 Test Report — Lift-Sliding GFRP Door",
    format: "PDF",
    size: "2.8 MB",
    description: "Intertek Report No. 240821010SHF-002. Full AS 2047-2014 / AS/NZS 4420.1-2016 performance test on a 3000 × 2400 mm 140-Series pultruded GFRP lift-sliding door. Tested Oct 2024, issued Dec 2024 at IAS-accredited Intertek Shanghai Fengxian.",
    file: "/downloads/intertek-report-240821010SHF-002-lift-sliding-door.pdf",
  },
  {
    title: "3-Star Green Building Material Certificate — Pultruded GFRP Windows",
    format: "PDF",
    size: "115 KB",
    description: "Certificate No. CABR-01(02)-(2025)-CGP-035. 3-Star (highest tier) rating under the Chinese Green Building Material assessment framework T/CECS 10026-2019 and CABR/CC-TD-CGP-09:2024. Covers F1 Composite 65/70/80/90-series tilt-and-turn pultruded GFRP-polyurethane windows for cold, hot-summer-cold-winter, and hot-summer-warm-winter climate zones. Issued by China Academy of Building Research Co., Ltd. (CABR), valid 2025-06-05 to 2030-06-04.",
    file: "/downloads/f1composite-3star-green-building-cert-frp-windows-2025.pdf",
  },
  {
    title: "EPD & Carbon Footprint — Pultruded GFRP Composite Profiles",
    format: "PDF",
    size: "142 KB",
    description: "Environmental Product Declaration and product carbon footprint analysis for F1 Composite pultruded GFRP composite profile products, with 1 m² functional unit. Calculation reference CABR-CFC-01(02)-2025(20030)1, cradle-to-gate 33,934.34 g CO₂e/m², distribution 254.59 g, cradle-to-grave 36,099.32 g. Standards: GB/T 24025-2009 (ISO 14025-aligned Type III EPD), GB/T 32161-2015, ISO 14067, PAS 2050. Issued by China Academy of Building Research Co., Ltd. (CABR) Certification Center on April 30, 2025.",
    file: "/downloads/f1composite-epd-carbon-footprint-frp-profiles-2025.pdf",
  },
  {
    title: "Product Catalog 2024",
    format: "PDF",
    size: "12 MB",
    description: "Complete catalog of standard pultruded FRP profiles with dimensions, properties, and ordering information.",
  },
  {
    title: "Fenestration Systems Brochure",
    format: "PDF",
    size: "8 MB",
    description: "Project-specific window and door information; use the nine-series purchasing catalog for the current range.",
  },
  {
    title: "ISO 9001:2015 Certificate",
    format: "PDF",
    size: "0.5 MB",
    description: "Request the current quality-management certificate holder, validity and scope for your proposed supply.",
  },
  {
    title: "CE Declaration of Performance",
    format: "PDF",
    size: "1 MB",
    description: "Request product-specific performance and applicable conformity documentation; confirm the intended use and assessment route.",
  },
  {
    title: "Standard Profiles — CAD Library",
    format: "DWG/STEP",
    size: "25 MB",
    description: "2D and 3D CAD models for all standard I-beam, channel, angle, and tube profiles.",
  },
  {
    title: "Chemical Resistance Chart",
    format: "PDF",
    size: "2 MB",
    description: "Chemical resistance ratings for polyester, vinyl ester, and epoxy resin systems across 200+ chemicals.",
  },
];

export const windowTemplates: DownloadItem[] = [
  { title: "Window Profile BOM Template", format: "CSV", size: "Editable template", description: "For profile supply: series, section code, drawing revision, lengths, quantities, finishing and requested accessories.", file: "/downloads/f1-window-profile-bom-template.csv" },
  { title: "Finished Window & Door Schedule Template", format: "CSV", size: "Editable template", description: "For finished units: opening ID, series, dimensions, opening type, glazing, hardware, quantity and delivery requirements.", file: "/downloads/f1-window-schedule-template.csv" },
];
