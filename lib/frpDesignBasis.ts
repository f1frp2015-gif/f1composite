// Shared design basis for the structural screening tools: the FRP profile
// calculator, the span tables and the handrail load check. One table of
// materials and factors, so the tools cannot drift apart.
//
// Provenance (details in docs/audits/2026-09-26-tools-standards-audit.md):
//  - EN 13706-3:2002 Table 1 minimums: E_L, E_T, tensile strength and the
//    apparent interlaminar shear strength (used here as the shear strength,
//    because EN 13706 gives no in-plane shear value). G_LT and F_cL are not in
//    EN 13706; the values below are stated assumptions.
//  - Metals: minimum yield strengths of the cited product standards, elastic
//    moduli of the design code of the same market (EN 1993/EN 1999 in Europe,
//    AISC 360, CSA S16 and AS 4100 elsewhere).
//  - ASCE/SEI 74-23 resistance factors are applied as φ = 0.65 for both
//    flexure and shear; the time-effect factors λ are the ASCE LRFD
//    Pre-Standard (2010) values that ASCE/SEI 74-23 builds on.
//  - CEN/TS 19101:2022 is screened with γ_M = 1.5 and EN 1990:2023 actions
//    for consequence class CC2 (k_F = 1.0).

export type MaterialGroup = "FRP" | "Metal";

export interface DesignMaterial {
  label: string;
  group: MaterialGroup;
  standard: string;
  /** GPa: E_L for FRP, E for metals. */
  E: number;
  /** GPa, FRP transverse modulus. */
  E_T?: number;
  /** GPa, FRP in-plane shear modulus. */
  G_LT?: number;
  /** MPa: F_tL for FRP, minimum yield strength for metals. */
  sigma: number;
  /** MPa, FRP longitudinal compressive strength. */
  sigma_c?: number;
  /** MPa, FRP shear strength. */
  tau?: number;
  /** g/cm³ */
  density: number;
}

export const DESIGN_MATERIALS: Record<string, DesignMaterial> = {
  // EN 13706-3 grade minimums; G_LT and F_cL are assumptions (not in EN 13706).
  "frp-e17": { label: "FRP EN 13706 E17", group: "FRP", standard: "EN 13706-3:2002 minimums (G_LT, F_cL assumed)", E: 17, E_T: 5, G_LT: 3, sigma: 170, sigma_c: 140, tau: 15, density: 1.9 },
  "frp-e23": { label: "FRP EN 13706 E23", group: "FRP", standard: "EN 13706-3:2002 minimums (G_LT, F_cL assumed)", E: 23, E_T: 7, G_LT: 3.5, sigma: 240, sigma_c: 200, tau: 25, density: 1.9 },
  // GB 50608-2020 (China FRP application code) / T/CECS 692-2020 (pultruded profile regulation)
  "frp-gb50608-i": { label: "FRP GB 50608 Class I", group: "FRP", standard: "GB 50608-2020 / T/CECS 692-2020", E: 23, E_T: 7, G_LT: 3.5, sigma: 240, sigma_c: 200, tau: 30, density: 1.9 },
  "frp-gb50608-ii": { label: "FRP GB 50608 Class II", group: "FRP", standard: "GB 50608-2020 / T/CECS 692-2020", E: 17, E_T: 5, G_LT: 3, sigma: 170, sigma_c: 140, tau: 25, density: 1.9 },
  // Illustrative balanced-GFRP screening inputs. ASCE/SEI 74-23 is a design
  // standard, not a material grade; project qualification data must replace
  // these values before a design is released.
  "frp-asce-std": { label: "Balanced GFRP (illustrative standard-property set)", group: "FRP", standard: "Illustrative inputs for ASCE/SEI 74-23 screening; qualification data required", E: 17.2, E_T: 5.5, G_LT: 3, sigma: 207, sigma_c: 207, tau: 31, density: 1.8 },
  "frp-asce-high": { label: "Balanced GFRP (illustrative high-property set)", group: "FRP", standard: "Illustrative inputs for ASCE/SEI 74-23 screening; qualification data required", E: 27.6, E_T: 8.3, G_LT: 4, sigma: 345, sigma_c: 290, tau: 45, density: 1.9 },
  // Metals: minimum yield strength, modulus of the matching design code.
  "steel-s235": { label: "Steel S235 (EN 10025-2)", group: "Metal", standard: "EN 10025-2; E per EN 1993-1-1", E: 210, sigma: 235, density: 7.85 },
  "steel-s355": { label: "Steel S355 (EN 10025-2)", group: "Metal", standard: "EN 10025-2; E per EN 1993-1-1", E: 210, sigma: 355, density: 7.85 },
  "steel-a36": { label: "Steel ASTM A36 (US)", group: "Metal", standard: "ASTM A36/A36M; E per AISC 360", E: 200, sigma: 250, density: 7.85 },
  "steel-a992": { label: "Steel ASTM A992 (US)", group: "Metal", standard: "ASTM A992/A992M; E per AISC 360", E: 200, sigma: 345, density: 7.85 },
  "steel-350w": { label: "Steel CSA G40.21 350W (Canada)", group: "Metal", standard: "CSA G40.21; E per CSA S16", E: 200, sigma: 350, density: 7.85 },
  "steel-as300": { label: "Steel AS/NZS 3679.1 Grade 300 (AU/NZ)", group: "Metal", standard: "AS/NZS 3679.1 (nominal grade; f_y varies with thickness); E per AS 4100", E: 200, sigma: 300, density: 7.85 },
  "steel-q235": { label: "Steel Q235 (GB/T 700)", group: "Metal", standard: "GB/T 700-2006", E: 206, sigma: 235, density: 7.85 },
  "steel-q355": { label: "Steel Q355B (GB/T 1591)", group: "Metal", standard: "GB/T 1591-2018 (t ≤ 16 mm)", E: 206, sigma: 355, density: 7.85 },
  "alu-6061": { label: "Aluminum 6061-T6", group: "Metal", standard: "EN 1999-1-1 Table 3.2b (EN AW-6061 T6) / ASTM B221", E: 70, sigma: 240, density: 2.7 },
  "alu-6063": { label: "Aluminum 6063-T5", group: "Metal", standard: "EN 1999-1-1 Table 3.2b (EN AW-6063 T5, 3–25 mm) / ASTM B221", E: 70, sigma: 110, density: 2.7 },
};

export type DesignMethod = "lrfd-asce" | "lrfd-cents19101" | "lrfd-gb50608" | "asd";

export interface DesignMethodBasis {
  label: string;
  phiFlex: number;
  phiShear: number;
  /** Factor on the (variable) service load for strength checks. */
  loadFactor: number;
  basis: string;
}

/* Load factors use the variable-action (live-load-dominated) value of each code
   family: 1.6 (ASCE 7-22), 1.5 (EN 1990:2023, CC2), 1.5 (GB 55001). The ASCE
   path also takes the time-effect factor λ (see LOAD_DURATIONS). */
export const DESIGN_METHODS: Record<DesignMethod, DesignMethodBasis> = {
  "lrfd-asce": { label: "Preliminary LRFD screen, ASCE/SEI 74-23", phiFlex: 0.65, phiShear: 0.65, loadFactor: 1.6, basis: "Preliminary global beam screen using ASCE/SEI 74-23-style φ, the time-effect factor λ and ASCE 7-22 load factors; not a complete code check" },
  "lrfd-cents19101": { label: "Preliminary partial-factor screen, CEN/TS 19101:2022", phiFlex: 1 / 1.5, phiShear: 1 / 1.5, loadFactor: 1.5, basis: "Preliminary global beam screen using CEN/TS 19101-style γ_M = 1.5 and EN 1990:2023 variable-action γ_Q (CC2, k_F = 1.0); creep conversion for permanent loads is not modelled; not a complete code check" },
  "lrfd-gb50608": { label: "Preliminary LRFD screen, GB 50608-2020", phiFlex: 1 / 1.6, phiShear: 1 / 1.6, loadFactor: 1.5, basis: "Preliminary global beam screen using GB 50608-style γ_R and GB 55001 variable-action γ_Q; not a complete code check" },
  "asd": { label: "Preliminary ASD screen, user-selected properties", phiFlex: 1 / 2.5, phiShear: 1 / 3.0, loadFactor: 1.0, basis: "Preliminary allowable-stress screen: F/2.5 bending and F/3.0 shear; not a code compliance check" },
};

/**
 * Load duration for the ASCE/SEI 74-23 path: the time-effect factor λ on
 * resistance and the ASCE 7-22 factor on the one load the calculator carries.
 * λ values: ASCE LRFD Pre-Standard for pultruded FRP (2010), Table 2.3-1.
 */
export const LOAD_DURATIONS = [
  { id: "occupancy", label: "Live load from occupancy (1.2D + 1.6L)", lambda: 0.8, loadFactor: 1.6 },
  { id: "storage", label: "Live load from storage (1.2D + 1.6L)", lambda: 0.6, loadFactor: 1.6 },
  { id: "permanent", label: "Permanent load only (1.4D)", lambda: 0.4, loadFactor: 1.4 },
  { id: "wind", label: "Wind or earthquake (1.0W, 1.0E)", lambda: 1.0, loadFactor: 1.0 },
] as const;

export type LoadDurationId = (typeof LOAD_DURATIONS)[number]["id"];

export function loadDuration(id: string) {
  return LOAD_DURATIONS.find((duration) => duration.id === id) ?? LOAD_DURATIONS[0];
}

/**
 * Screening knockdowns for the service environment. `factor` multiplies the
 * FRP strengths, `stiffness` the FRP moduli (deflection). Metals are unaffected.
 */
export const ENV_FACTORS = [
  { id: "indoor-dry", label: "Indoor, dry, ≤ 30 °C", factor: 1.0, stiffness: 1.0, note: "Reference; no knockdown" },
  { id: "outdoor", label: "Outdoor, exposed (UV + humidity)", factor: 0.85, stiffness: 1.0, note: "In line with the moisture conversion factor CEN/TS 19101 uses for outdoor exposure not continuously wet" },
  { id: "wet", label: "Wet / immersion", factor: 0.75, stiffness: 0.9, note: "ASCE/SEI 74-23 wet-service adjustment for a polyester matrix: 0.75 on strength, 0.90 on stiffness" },
  { id: "chemical", label: "Mild chemical (acid/alkali)", factor: 0.75, stiffness: 1.0, note: "F1 screening value; resin-specific chemical data are needed" },
  { id: "hot", label: "Elevated temperature (32–60 °C)", factor: 0.7, stiffness: 1.0, note: "F1 screening value; stiffness also falls, so ask for resin data. ASCE/SEI 74-23 limits service temperature to T_g − 22 °C" },
] as const;

export type EnvFactorId = (typeof ENV_FACTORS)[number]["id"];

export function envFactor(id: string) {
  return ENV_FACTORS.find((env) => env.id === id) ?? ENV_FACTORS[0];
}

/** Bending strength used for FRP: the compression face usually governs pultruded bending. */
export function flexuralStrength(material: DesignMaterial): number {
  return material.group === "FRP" ? Math.min(material.sigma, material.sigma_c ?? material.sigma) : material.sigma;
}

/** Shear strength: FRP value, or 0.6·f_y for metals. */
export function shearStrength(material: DesignMaterial): number {
  return material.group === "FRP" ? (material.tau ?? 25) : material.sigma * 0.6;
}

/** Shear modulus in GPa: FRP G_LT, or E/2.6 (ν ≈ 0.3) for metals. */
export function shearModulus(material: DesignMaterial): number {
  return material.G_LT ?? material.E / 2.6;
}

export interface ResistanceInput {
  material: DesignMaterial;
  method: DesignMethod;
  envId?: string;
  /** ASCE path only; ignored for the other methods. */
  durationId?: string;
}

/**
 * Design strengths (MPa) and the factor on the service load for one method,
 * environment and load duration. Stiffness factor applies to FRP moduli.
 */
export function designResistance({ material, method, envId = "indoor-dry", durationId = "occupancy" }: ResistanceInput) {
  const basis = DESIGN_METHODS[method];
  const isFRP = material.group === "FRP";
  const env = envFactor(envId);
  const duration = loadDuration(durationId);
  const asce = method === "lrfd-asce";
  const lambda = asce && isFRP ? duration.lambda : 1;
  const envStrength = isFRP ? env.factor : 1;
  return {
    basis,
    lambda,
    loadFactor: asce ? duration.loadFactor : basis.loadFactor,
    envStrength,
    envStiffness: isFRP ? env.stiffness : 1,
    bendingAllowable: basis.phiFlex * lambda * flexuralStrength(material) * envStrength,
    shearAllowable: basis.phiShear * lambda * shearStrength(material) * envStrength,
  };
}
