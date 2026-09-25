import { e40EvidenceHref, e40Reports, e40ReportScope } from "./e40Evidence";

/** Public document index. A listed file is not a blanket certification claim. */
export const evidenceRevision = "2026-09-25";

export const commercialFacts = {
  response: "We will acknowledge your requirements within one business day and confirm the next step. A formal quotation follows specification and delivery review.",
  pricing: "Pricing is confirmed against the section or assembly, resin, quantity, tooling, finishing, packing, destination and Incoterm. Calculator estimates are planning references, not offers.",
  availability: "Catalog dimensions identify standard section options, not live inventory. Confirm tooling, material, quantity and production timing in the quotation.",
  thermal: "Uf describes the frame, Ug the glazing and Uw the whole window. Compare values only for the stated window dimensions, glass, spacer, frame and calculation or test method. A component certificate does not cover every window configuration.",
  corrosion: "FRP avoids steel-like rusting, but chemical resistance depends on resin, medium, concentration, temperature and exposure. Confirm compatibility, surface protection and maintenance for the proposed application.",
  serviceLife: "Design life and maintenance depend on the material system, loads, exposure, connections and inspection plan. No universal service life or maintenance-free interval applies to the full catalog.",
  compliance: "Confirm the certificate holder, product or specimen, report number, method, date and scope. EN 13706 and ASTM D3917 are specification references, not proof of blanket certification. CE/UKCA documentation depends on the product, intended use and applicable assessment route.",
} as const;

export interface EvidenceRecord {
  id: string;
  title: string;
  kind: "Component certificate" | "Test report" | "Technical reference";
  reference: string;
  file: string;
  product: string;
  productLabel: string;
  scope: string;
  contextHref?: string;
}

export const engineeringEvidence: EvidenceRecord[] = [
  ...e40Reports.map((report): EvidenceRecord => ({
    id: report.id,
    title: `E40 evidence — SGS full-section test, ${report.average} GPa`,
    kind: "Test report",
    reference: report.reference,
    file: report.file,
    product: "/products/fiberglass-structural-shapes/frp-square-tube",
    productLabel: "Square and rectangular tubes",
    scope: e40ReportScope(report),
    contextHref: e40EvidenceHref,
  })),
  { id: "phi-2491wi03", title: "90-series GFRP window component certificate", kind: "Component certificate", reference: "PHI 2491wi03", file: "/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf", product: "/products/frp-window-frames", productLabel: "FRP windows and doors", scope: "PHI 2491wi03 names Chongqing Xianju New Material Co., Ltd. and Fengdu Passive GFRP 90 Series. The stated configuration is cool-temperate, efficiency class phB, Uw 0.78 W/(m²·K) with Ug 0.70; valid until 31 December 2026. It is not Arctic-climate, PHIUS or blanket F1-window certification. Confirm the original and proposed configuration." },
  { id: "intertek-turn-tilt", title: "Turn-and-tilt GFRP window test report", kind: "Test report", reference: "Intertek 240821010SHF-001", file: "/downloads/intertek-report-240821010SHF-001-turn-tilt-window.pdf", product: "/products/frp-window-frames", productLabel: "FRP windows and doors", scope: "AS 2047 testing of the identified window specimen. Match dimensions, glazing, hardware, pressure and test conditions before using the results." },
  { id: "intertek-sliding", title: "Lift-sliding GFRP door test report", kind: "Test report", reference: "Intertek 240821010SHF-002", file: "/downloads/intertek-report-240821010SHF-002-lift-sliding-door.pdf", product: "/products/frp-window-frames", productLabel: "FRP windows and doors", scope: "Historical 140 Series Lift-Sliding Door specimen, 3000 × 2400 mm, as named in Intertek 240821010SHF-002. The original report is preserved. It does not automatically cover the current 140 Series Compression-Seal Sliding Door; configuration equivalence requires technical verification." },
  { id: "pu-gf-data", title: "PU-GF pultruded profile mechanical data", kind: "Technical reference", reference: "PU-GF data sheet", file: "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf", product: "/products/custom-pultruded-profiles", productLabel: "Custom pultrusions", scope: "The material system and methods identified in the sheet. Confirm whether each value is typical, measured or a design value before applying it to another laminate or section." },
  { id: "wind-laminate", title: "Wind-energy pultruded laminate data", kind: "Technical reference", reference: "GFRP and CFRP laminate data sheet", file: "/downloads/f1composite-wind-energy-pultruded-laminate-datasheet.pdf", product: "/products/wind-turbine-blade-panels", productLabel: "Wind turbine blade panels", scope: "The tested laminate and reinforcement described in the document. Fatigue and fiber-content results apply to the stated specimens, not all blade or spar-cap designs." },
  { id: "window-catalog", title: "Pultruded FRP window and door catalog", kind: "Technical reference", reference: "Window and door catalog", file: "/downloads/f1composite-frp-window-door-catalog.pdf", product: "/products/frp-window-frames", productLabel: "FRP windows and doors", scope: "Nine-series purchasing reference: 50, 55, 60, 65, 70, 80, 90 casement, 90 sliding and 140 compression-seal sliding. Covers separate profile and finished-unit procurement paths, updated profile codes and configuration-specific evidence boundaries. Confirm drawings, glazing, hardware and supply scope at quotation." },
];

/**
 * Files still on the server but withdrawn from the site until a revised
 * edition is published. Catalog rows in the database may still list them, so
 * the downloads page filters them out, and next.config.ts serves them with
 * noindex.
 */
export const withdrawnDownloads: readonly string[] = [
  // Design manual DOC-PF-2026-EN Rev. A, pending revision (see WEBSITE.md).
  "/downloads/f1composite-frp-profile-design-manual-2026.pdf",
];

export const quotationChecklist = [
  { topic: "Section and material", requirement: "Compare the same geometry, tolerances, resin, reinforcement and finish." },
  { topic: "Quantity and tooling", requirement: "Separate production quantity, minimum run, die cost, sampling and tooling ownership." },
  { topic: "Evidence", requirement: "Match report holders, tested specimens, grades and acceptance criteria to the offered product." },
  { topic: "Delivered cost", requirement: "Use the same quotation date, currency, Incoterm, destination, packing and tax assumptions." },
  { topic: "Schedule and support", requirement: "Confirm drawing release, sample approval, production, inspection, shipping and after-sales scope." },
];
