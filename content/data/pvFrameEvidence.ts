/**
 * PV module frame and composite material reports, transcribed from the PDFs
 * in /public/downloads. The solar mounting page shows them in full and the
 * evidence index lists them. TÜV Rheinland reports may not be reproduced in
 * extracts without the laboratory's permission, so their table rows below
 * state only the overall result printed on the cover.
 */
export interface PvFrameReport {
  id: string;
  /** Card heading on the solar page. */
  title: string;
  /** Heading in the evidence index, readable without the solar page around it. */
  indexTitle: string;
  issuer: string;
  reference: string;
  /** Issue date, YYYY-MM-DD. */
  issued: string;
  detail: string;
  scope: string;
  file: string;
  original?: string;
  label: string;
  /** Scope line in the evidence index, llms.txt and the AI context. */
  indexScope: string;
  /** Row in the evidence results table. */
  tested: string;
  method: string;
  result: string;
}

export const pvFrameReports: PvFrameReport[] = [
  {
    id: "cpvt-2025dacs20319",
    title: "PV frame mechanical, electrical and ageing properties",
    indexTitle: "PV module frame material test report",
    issuer: "Wuxi / CPVT",
    reference: "2025DACS20319",
    issued: "2026-06-15",
    detail: "Chongqing Xianju composite PV frame, identified as all-weather modified resin. Initial mean tensile strength: 1,310 MPa; flexural strength: 1,060 MPa; flexural modulus: 48.0 GPa; volume resistivity: 1.0 × 10¹³ Ω·m. Reported HDT: >290°C; flammability: V-1.",
    scope: "Includes UV, combined UV/damp-heat, UV/humidity-freeze, UV/thermal-cycle, salt-mist and ammonia exposure results. The report gives measurements without an overall pass/fail conclusion. Its salt-mist cycle count and total duration are inconsistent; consult the issuer for clarification.",
    file: "frp-pv-module-frame-material-performance-test-report-2025dacs20319-en.pdf",
    original: "frp-pv-module-frame-material-performance-test-report-2025dacs20319-original-zh.pdf",
    label: "PV frame performance report with English notes",
    indexScope: "Composite PV module frame in all-weather modified resin: mean tensile strength 1,310 MPa, flexural strength 1,060 MPa, flexural modulus 48.0 GPa, HDT above 290 °C and flammability V-1, with UV, damp-heat, humidity-freeze, thermal-cycle, salt-mist and ammonia exposure results. The report gives measurements without a pass/fail conclusion, and its salt-mist cycle count and duration are inconsistent.",
    tested: "Composite PV module frame, all-weather modified resin",
    method: "Methods listed for each property in the report",
    result: "Mean tensile strength 1,310 MPa; flexural strength 1,060 MPa; flexural modulus 48.0 GPa; HDT above 290 °C; flammability V-1. No pass/fail assessment.",
  },
  {
    id: "tuv-cn24kz3a-002",
    title: "Jotun Jota Solar CL coating variant",
    indexTitle: "PV frame coating test report: Jotun Jota Solar CL",
    issuer: "TÜV Rheinland",
    reference: "CN24KZ3A 002",
    issued: "2025-03-14",
    detail: "Chongqing Fengdu GFF-series polymer composite PV frames with Jota Solar CL water-based polyurethane coating. Initial mean tensile strength: 1,410.22 MPa; flexural strength: 1,570.95 MPa. Tested against 2 PfG 2923/11.22 with a reported Pass result.",
    scope: "Coating-change report covering clauses 5.2, 5.4, 5.5, 5.6, 5.9, 5.13, 5.16, 5.20, 5.21 and 5.22. Other tests refer to CN24KZ3A 001. Includes 2,000 h weathering, TC200, 1,000 h damp heat and TC50 plus humidity-freeze results.",
    file: "frp-pv-module-frame-jotun-coating-tuv-test-report-cn24kz3a-002.pdf",
    label: "Jotun coating test report in English",
    indexScope: "GFF-series PV frames with Jotun Jota Solar CL coating, tested to the coating-change clauses of 2 PfG 2923/11.22 with a Pass result stated on the cover; other clauses refer to CN24KZ3A 001. TÜV Rheinland does not permit reproduction in extracts without its approval, and the report does not authorize a test mark.",
    tested: "GFF-series polymer composite PV frames with Jotun Jota Solar CL coating",
    method: "2 PfG 2923/11.22, coating-change clauses",
    result: "Pass, as stated on the report cover. Other clauses refer to CN24KZ3A 001.",
  },
  {
    id: "tuv-cn24kz3a-003",
    title: "B9986S polyester coating variant",
    indexTitle: "PV frame coating test report: B9986S polyester",
    issuer: "TÜV Rheinland",
    reference: "CN24KZ3A 003",
    issued: "2025-10-10",
    detail: "Chongqing Fengdu GFF-series polymer composite PV frames with B9986S polyester coating. Initial mean tensile strength: 1,353.25 MPa; flexural strength: 1,755.71 MPa. Tested against 2 PfG 2923/11.22 with a reported Pass result.",
    scope: "Covers the same coating-change clauses as report 002 and refers to CN24KZ3A 001 for other tests. Tensile strength retention is reported as 92.08% after TC200, 87.54% after damp heat and 97.17% after weathering.",
    file: "frp-pv-module-frame-b9986s-coating-tuv-test-report-cn24kz3a-003.pdf",
    label: "B9986S coating test report in English",
    indexScope: "GFF-series PV frames with B9986S polyester coating, tested to the coating-change clauses of 2 PfG 2923/11.22 with a Pass result stated on the cover; other clauses refer to CN24KZ3A 001. TÜV Rheinland does not permit reproduction in extracts without its approval, and the report does not authorize a test mark.",
    tested: "GFF-series polymer composite PV frames with B9986S polyester coating",
    method: "2 PfG 2923/11.22, coating-change clauses",
    result: "Pass, as stated on the report cover. Other clauses refer to CN24KZ3A 001.",
  },
  {
    id: "sgs-gzmr260702529004",
    title: "E-TS-AB composite material flammability",
    indexTitle: "Composite profile material flammability test report",
    issuer: "SGS",
    reference: "GZMR260702529004",
    issued: "2026-07-30",
    detail: "Chongqing Xianju glass-fibre-reinforced composite profile E-TS-AB, tested as longitudinal A1 sheet specimens at 10.1 mm thickness. UL 94-2023 Rev.2-2024, Section 8: V-0, Pass.",
    scope: "This result applies to the specified material and tested thickness. It does not establish V-0 for thin-wall PV frames or replace the V-1 result in the separate Wuxi frame report. SGS states that this report is for internal reference.",
    file: "frp-composite-profile-sgs-ul94-v0-test-report-gzmr260702529004-en.pdf",
    original: "frp-composite-profile-sgs-ul94-v0-test-report-gzmr260702529004-original-zh.pdf",
    label: "SGS material flammability report with English notes",
    indexScope: "Composite profile material E-TS-AB: V-0 to UL 94-2023 Rev.2-2024 Section 8 at 10.1 mm thickness. The result does not establish V-0 for thin-wall PV frames, and SGS marks the report for internal reference.",
    tested: "Composite profile material E-TS-AB, 10.1 mm longitudinal specimens",
    method: "UL 94-2023 Rev.2-2024, Section 8 (vertical burning)",
    result: "V-0 at 10.1 mm. Report marked for internal reference.",
  },
];
