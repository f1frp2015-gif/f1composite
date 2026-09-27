// Frame systems, glazing, spacers and reference targets for the window U-value
// calculator. A plain module, so the server page can render the reference
// tables and the client calculator can use the same values.

export type FrameSystem = { id: string; label: string; Uf: number; depth: number; faceWidth: number; certifiedReference?: boolean };
export type GlassConfig = { id: string; label: string; Ug: number; thickness: number; certifiedReference?: boolean };
export type SpacerType = { id: string; label: string; psi: number; certifiedReference?: boolean };

export const PHI_FRAME_ID = "frp-90-phi-2491wi03";
export const PHI_GLASS_ID = "phi-ug070";
export const PHI_SPACER_ID = "phi-psi0023";

export const frameSystems: FrameSystem[] = [
  { id: "frp-65", label: "F1 FRP 65-Series (65 mm, 2-chamber)", Uf: 1.4, depth: 65, faceWidth: 54 },
  { id: "frp-70", label: "F1 FRP 70-Series (70 mm, 3-chamber)", Uf: 1.2, depth: 70, faceWidth: 58 },
  { id: "frp-80", label: "F1 FRP 80-Series (80 mm, 3-chamber)", Uf: 1.0, depth: 80, faceWidth: 65 },
  { id: "frp-90", label: "F1 FRP 90-Series (90 mm, 3-chamber)", Uf: 0.85, depth: 90, faceWidth: 72 },
  { id: PHI_FRAME_ID, label: "PHI certificate 2491wi03 — Fengdu Passive GFRP 90", Uf: 0.78, depth: 90, faceWidth: 109, certifiedReference: true },
  { id: "alu-no-break", label: "Aluminum (no thermal break)", Uf: 5.9, depth: 65, faceWidth: 50 },
  { id: "alu-break", label: "Aluminum (polyamide break)", Uf: 3.2, depth: 70, faceWidth: 55 },
  { id: "pvc-multi", label: "PVC, multi-chamber", Uf: 1.5, depth: 70, faceWidth: 62 },
  { id: "pvc-steel", label: "PVC, steel-reinforced", Uf: 1.8, depth: 70, faceWidth: 65 },
  { id: "timber", label: "Timber (softwood, 68 mm)", Uf: 1.4, depth: 75, faceWidth: 65 },
];

export const glassConfigs: GlassConfig[] = [
  { id: "dg-air", label: "Double — 4/12Air/4", Ug: 2.8, thickness: 20 },
  { id: "dg-ar", label: "Double — 4/16Ar/4 Low-E", Ug: 1.1, thickness: 24 },
  { id: "dg-ar-6", label: "Double — 6/20Ar/6 Low-E", Ug: 1.0, thickness: 32 },
  { id: "tg-ar", label: "Triple — 4/14Ar/4/14Ar/4 2×Low-E", Ug: 0.6, thickness: 40 },
  { id: "tg-kr", label: "Triple — 4/12Kr/4/12Kr/4 2×Low-E", Ug: 0.5, thickness: 36 },
  { id: "tg-ar-wide", label: "Triple — 4/18Ar/4/18Ar/4 2×Low-E", Ug: 0.55, thickness: 48 },
  { id: "qg-kr", label: "Quadruple — 3/12Kr/3/12Kr/3/12Kr/3 3×Low-E", Ug: 0.3, thickness: 48 },
  { id: PHI_GLASS_ID, label: "PHI certificate reference — 48 mm glazing, Ug 0.70", Ug: 0.70, thickness: 48, certifiedReference: true },
];

export const spacerTypes: SpacerType[] = [
  { id: "alu", label: "Aluminum spacer", psi: 0.08 },
  { id: "steel", label: "Steel spacer", psi: 0.06 },
  { id: "warm-basic", label: "Warm-edge (standard)", psi: 0.04 },
  { id: "warm-premium", label: "Warm-edge (premium / TGI / Swisspacer)", psi: 0.03 },
  { id: PHI_SPACER_ID, label: "PHI certificate — Swisspacer Ultimate", psi: 0.023, certifiedReference: true },
];

export const windowTypes = [
  { id: "fixed", label: "Fixed light", sashWidth: 0 },
  { id: "casement", label: "Casement / Tilt-turn", sashWidth: 58 },
  { id: "sliding", label: "Sliding door", sashWidth: 70 },
  { id: "entrance", label: "Entrance door (glazed)", sashWidth: 85 },
];

/* Numeric targets for the quick comparison (W/m²·K). Sources and review
   notes: docs/audits/2026-09-26-tools-standards-audit.md. */
export const TARGET_COMPARISON = [
  { region: "EU", label: "Passive House (PHI), cool-temperate", max: 0.80 },
  { region: "EU", label: "Passive House (PHI), cold", max: 0.60 },
  { region: "UK", label: "England, replacement window (ADL 2021)", max: 1.40 },
  { region: "UK", label: "England, new dwelling limit (ADL 2021)", max: 1.60 },
  { region: "DE", label: "Germany, replaced window (Anlage 7)", max: 1.30 },
  { region: "US", label: "ENERGY STAR v7.0 Northern", max: 1.25 },
  { region: "US", label: "ENERGY STAR v7.0 Southern", max: 1.82 },
  { region: "US", label: "IECC 2024 zones 5–6 and Marine 4", max: 1.59 },
  { region: "US", label: "IECC 2024 zones 7–8", max: 1.53 },
  { region: "CA", label: "ENERGY STAR Canada v5.0", max: 1.22 },
  { region: "CA", label: "NBC 2020 9.36, zones 7B–8", max: 1.40 },
  { region: "NZ", label: "H1/AS1 5th ed., zones 5–6 (R0.50)", max: 2.00 },
  { region: "CN", label: "Severe Cold public, WWR ≤ 0.2", max: 2.70 },
  { region: "CN", label: "Severe Cold public, WWR 0.3–0.4", max: 2.20 },
] as const;

export const REFERENCE_TARGETS = [
  { region: "Europe", std: "EN ISO 10077-1 / PHI", zone: "Passive House window, cool-temperate", uw: "≤ 0.80", note: "PHI component criterion; Uw,installed ≤ 0.85. Cold climate 0.60 (0.65 installed), warm-temperate 1.00 (1.05)" },
  { region: "Europe", std: "EPBD (EU) 2024/1275", zone: "All member states", uw: "National", note: "No EU-wide window limit; member states set element limits in national law" },
  { region: "Europe", std: "EN 14351-1", zone: "CE marking", uw: "Declared", note: "No maximum; the declared Uw goes on the declaration of performance" },
  { region: "Germany", std: "Building energy act, Anlage 7", zone: "Windows replaced in existing buildings", uw: "≤ 1.30", note: "Roof windows 1.40; applies when windows in an existing building are replaced or renewed" },
  { region: "UK (England)", std: "Approved Document L 2021", zone: "New dwellings, limiting value", uw: "≤ 1.60", note: "Notional dwelling uses 1.2; compliance is by whole-dwelling targets" },
  { region: "UK (England)", std: "Approved Document L 2021", zone: "Replacement windows, existing dwellings", uw: "≤ 1.40", note: "Or window energy rating band B" },
  { region: "USA", std: "IECC 2024 / IRC N1102", zone: "Zones 3 and 4 (except Marine)", uw: "≤ 1.70", note: "U ≤ 0.30 Btu/h·ft²·°F" },
  { region: "USA", std: "IECC 2024 / IRC N1102", zone: "Zones 5–6 and Marine 4", uw: "≤ 1.59", note: "U ≤ 0.28; 0.30 allowed above 4,000 ft elevation or in windborne-debris regions" },
  { region: "USA", std: "IECC 2024 / IRC N1102", zone: "Zones 7–8", uw: "≤ 1.53", note: "U ≤ 0.27 (0.30 in the 2021 edition)" },
  { region: "USA", std: "ENERGY STAR v7.0 (2023)", zone: "Northern", uw: "≤ 1.25", note: "U ≤ 0.22; SHGC ≥ 0.17 on the prescriptive path" },
  { region: "USA", std: "ENERGY STAR v7.0 (2023)", zone: "North-Central", uw: "≤ 1.42", note: "U ≤ 0.25; SHGC ≤ 0.40" },
  { region: "USA", std: "ENERGY STAR v7.0 (2023)", zone: "South-Central", uw: "≤ 1.59", note: "U ≤ 0.28; SHGC ≤ 0.23" },
  { region: "USA", std: "ENERGY STAR v7.0 (2023)", zone: "Southern", uw: "≤ 1.82", note: "U ≤ 0.32; SHGC ≤ 0.23" },
  { region: "Canada", std: "ENERGY STAR Canada v5.0", zone: "All of Canada (one zone since 2020)", uw: "≤ 1.22", note: "Or energy rating ER ≥ 34; version 6 is in preparation" },
  { region: "Canada", std: "NBC 2020, 9.36.2.7", zone: "Zones 4–5 / 6–7A / 7B–8", uw: "1.80 / 1.60 / 1.40", note: "Houses and small buildings, prescriptive path; NBC 2025 adds SHGC limits" },
  { region: "Australia", std: "NCC (Section J, Part H6)", zone: "Climate-zone dependent", uw: "No single limit", note: "Glazing is assessed with the wall or through NatHERS; product ratings come from AFRC" },
  { region: "New Zealand", std: "H1/AS1 5th edition", zone: "Zones 1–4 / 5–6 (housing)", uw: "≈ 2.17 / 2.00", note: "Set as construction R-values R0.46 / R0.50; check the edition in force" },
  { region: "China", std: "GB 55015-2021", zone: "All zones, mandatory since April 2022", uw: "Zone / WWR dependent", note: "General code; supersedes the thermal provisions of GB 50189-2015" },
  { region: "China", std: "GB 50189-2015", zone: "Severe Cold A/B, public, WWR ≤ 0.2", uw: "≤ 2.70", note: "Limits tighten with window-to-wall ratio (2.5 / 2.2 …)" },
  { region: "China", std: "GB 50189-2015", zone: "Severe Cold C, public, WWR ≤ 0.2", uw: "≤ 2.90", note: "Shape factor ≤ 0.3 column; tightens with WWR" },
  { region: "China", std: "GB/T 8484-2020", zone: "Test method", uw: "—", note: "Hot-box test method for window thermal performance" },
] as const;

/** Whether the frame needs a thermal break, for the frame comparison table. */
export function thermalBreakNote(frame: FrameSystem): string {
  if (frame.id.startsWith("frp") || frame.id === "timber") return "No, the material insulates";
  if (frame.id === "alu-break") return "Yes, a polyamide strip";
  if (frame.id === "pvc-steel") return "The steel core bridges the chambers";
  if (frame.id === "pvc-multi") return "No, but the section is less stiff";
  return "No, but aluminum conducts heat freely";
}
