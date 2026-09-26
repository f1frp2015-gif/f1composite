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

/** ACI CODE-440.11-22 values used below. */
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
  { market: "Canada", design: "CSA S806:12 (R2021) (buildings); CSA S6:25 (bridges)", product: "CSA S807:19 (R2024), grades by modulus and durability class", notes: "Provincial owners add their own requirements, e.g. Ontario OPSS" },
  { market: "European Union", design: "EN 1992-1-1:2023 Annex R (informative, FRP reinforcement), where adopted nationally", product: "No harmonised product standard; CE marking through an ETA to EAD 260023-00-0301", notes: "Test methods: ISO 10406-1:2025" },
  { market: "United Kingdom", design: "No UK design standard of its own; the engineer adopts a recognised code, for example EN 1992-1-1:2023 Annex R, ACI CODE-440.11-22 or CSA S806", product: "Client specification; ETA or third-party certification", notes: "Test methods: ISO 10406-1:2025" },
  { market: "Australia", design: "No national design standard; state road authority specifications, e.g. Queensland TMR MRTS271 (design to CSA S806)", product: "AS 5204:2023 fibre-reinforced polymer bars", notes: "MRTS271 calls for CSA S807 Grade III bars" },
  { market: "New Zealand", design: "No local design standard; the engineer adopts ACI 440.11, CSA S806 or AS 5204 with the consent authority", product: "Project specification, which can name AS 5204:2023 or CSA S807", notes: "Confirm acceptance with the building consent authority" },
] as const;
