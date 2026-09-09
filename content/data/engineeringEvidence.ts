/** Public document index. A listed file is not a blanket certification claim. */
export const evidenceRevision = "2026-09-09";

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
}

export const engineeringEvidence: EvidenceRecord[] = [
  { id: "phi-2491wi03", title: "90-series GFRP window component certificate", kind: "Component certificate", reference: "PHI 2491wi03", file: "/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf", product: "/products/frp-window-frames", productLabel: "FRP windows and doors", scope: "PHI 2491wi03 names Chongqing Xianju New Material Co., Ltd. and Fengdu Passive GFRP 90 Series. The stated configuration is cool-temperate, efficiency class phB, Uw 0.78 W/(m²·K) with Ug 0.70; valid until 31 December 2026. It is not Arctic-climate, PHIUS or blanket F1-window certification. Confirm the original and proposed configuration." },
  { id: "intertek-turn-tilt", title: "Turn-and-tilt GFRP window test report", kind: "Test report", reference: "Intertek 240821010SHF-001", file: "/downloads/intertek-report-240821010SHF-001-turn-tilt-window.pdf", product: "/products/frp-window-frames", productLabel: "FRP windows and doors", scope: "AS 2047 testing of the identified window specimen. Match dimensions, glazing, hardware, pressure and test conditions before using the results." },
  { id: "intertek-sliding", title: "Lift-sliding GFRP door test report", kind: "Test report", reference: "Intertek 240821010SHF-002", file: "/downloads/intertek-report-240821010SHF-002-lift-sliding-door.pdf", product: "/products/frp-window-frames", productLabel: "FRP windows and doors", scope: "The lift-sliding specimen and conditions stated in the report. Results do not automatically transfer to other door sizes or assemblies." },
  { id: "structural-design", title: "FRP profile design manual", kind: "Technical reference", reference: "2026 edition", file: "/downloads/f1composite-frp-profile-design-manual-2026.pdf", product: "/products/fiberglass-structural-shapes", productLabel: "Structural shapes", scope: "Design guidance and reference data. Check material grade, section, load combinations, environmental factors and connections; it is not a project approval or batch certificate." },
  { id: "pu-gf-data", title: "PU-GF pultruded profile mechanical data", kind: "Technical reference", reference: "PU-GF data sheet", file: "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf", product: "/products/custom-pultruded-profiles", productLabel: "Custom pultrusions", scope: "The material system and methods identified in the sheet. Confirm whether each value is typical, measured or a design value before applying it to another laminate or section." },
  { id: "wind-laminate", title: "Wind-energy pultruded laminate data", kind: "Technical reference", reference: "GFRP and CFRP laminate data sheet", file: "/downloads/f1composite-wind-energy-pultruded-laminate-datasheet.pdf", product: "/products/wind-turbine-blade-panels", productLabel: "Wind turbine blade panels", scope: "The tested laminate and reinforcement described in the document. Fatigue and fiber-content results apply to the stated specimens, not all blade or spar-cap designs." },
  { id: "window-catalog", title: "Pultruded FRP window and door catalog", kind: "Technical reference", reference: "Window and door catalog", file: "/downloads/f1composite-frp-window-door-catalog.pdf", product: "/products/frp-window-frames", productLabel: "FRP windows and doors", scope: "Series and configuration reference. Confirm opening schedule, frame or complete-window supply, glass, hardware and applicable project evidence at quotation." },
];

export const quotationChecklist = [
  { topic: "Section and material", requirement: "Compare the same geometry, tolerances, resin, reinforcement and finish." },
  { topic: "Quantity and tooling", requirement: "Separate production quantity, minimum run, die cost, sampling and tooling ownership." },
  { topic: "Evidence", requirement: "Match report holders, tested specimens, grades and acceptance criteria to the offered product." },
  { topic: "Delivered cost", requirement: "Use the same quotation date, currency, Incoterm, destination, packing and tax assumptions." },
  { topic: "Schedule and support", requirement: "Confirm drawing release, sample approval, production, inspection, shipping and after-sales scope." },
];
