// Thermal movement of pultruded FRP members and the joints between them.
//
// Pure functions shared by /tools/thermal-expansion-calculator and its tests.
// Coefficients are published reference values (sources in THERMAL_MATERIALS);
// a project should use the value declared for the supplied product.
//
//   free movement      ΔL = α · L · ΔT
//   differential       ΔL_rel = (α_member − α_substrate) · L · ΔT
//   fully restrained   σ = E · α · ΔT  (axial, no buckling or creep relief)
//   sealant joint      w ≥ max(opening, closing) / movement capability

export type ThermalMaterialId =
  | "gfrp-pultruded-longitudinal"
  | "gfrp-rebar-longitudinal"
  | "steel-carbon"
  | "steel-stainless-austenitic"
  | "aluminium"
  | "concrete"
  | "glass-soda-lime"
  | "pvc-u";

export interface ThermalMaterial {
  id: ThermalMaterialId;
  label: string;
  /** Coefficient of linear thermal expansion, 10⁻⁶ per K. */
  alpha: number;
  /** Elastic modulus in the same direction, GPa (restrained-stress estimate only). */
  E: number;
  source: string;
}

export const THERMAL_MATERIALS: readonly ThermalMaterial[] = [
  { id: "gfrp-pultruded-longitudinal", label: "Pultruded GFRP profile, lengthwise", alpha: 8, E: 23, source: "Typical E-glass pultrusion; manufacturer design manuals give about 6–11 × 10⁻⁶/K. Declare the supplied value" },
  { id: "gfrp-rebar-longitudinal", label: "GFRP rebar, lengthwise", alpha: 8, E: 50, source: "ACI 440.1R-15 Table 4.1 range 6.0–10.0 × 10⁻⁶/K" },
  { id: "steel-carbon", label: "Carbon steel", alpha: 12, E: 210, source: "EN 1993-1-1 §3.2.6" },
  { id: "steel-stainless-austenitic", label: "Stainless steel 1.4301 / 1.4401 (304 / 316)", alpha: 16, E: 200, source: "EN 1993-1-4 Table 2.3" },
  { id: "aluminium", label: "Aluminium alloy", alpha: 23, E: 70, source: "EN 1999-1-1 §3.2.5" },
  { id: "concrete", label: "Concrete", alpha: 10, E: 33, source: "EN 1992-1-1 §3.1.3(5)" },
  { id: "glass-soda-lime", label: "Soda-lime glass", alpha: 9, E: 70, source: "EN 572-1 Table 1" },
  { id: "pvc-u", label: "PVC-U window profile", alpha: 70, E: 2.5, source: "Typical PVC-U value (about 60–80 × 10⁻⁶/K); declare the supplied value" },
] as const;

export function thermalMaterial(id: string): ThermalMaterial | undefined {
  return THERMAL_MATERIALS.find((material) => material.id === id);
}

/** Sealant movement capability, ± fraction of the joint width at installation. */
export const SEALANT_CLASSES = [
  { id: "iso-25", label: "ISO 11600 class 25 / ASTM C920 class 25 (±25%)", capability: 0.25 },
  { id: "iso-20", label: "ISO 11600 class 20 (±20%)", capability: 0.2 },
  { id: "iso-12", label: "ISO 11600 class 12.5 / ASTM C920 class 12½ (±12.5%)", capability: 0.125 },
  { id: "astm-50", label: "ASTM C920 class 50 (±50%)", capability: 0.5 },
] as const;

export interface ThermalInput {
  /** Length between fixed points or movement joints, mm. */
  lengthMm: number;
  memberId: string;
  /** Optional substrate or frame the member is fixed to. */
  substrateId?: string;
  installC: number;
  minC: number;
  maxC: number;
  /** Optional section area, mm², for the restrained force. */
  areaMm2?: number;
  /** Sealant movement capability as a fraction (0.25 for ±25%). */
  sealantCapability?: number;
}

export interface ThermalResult {
  member: ThermalMaterial;
  substrate?: ThermalMaterial;
  /** Expansion from installation to the maximum temperature, mm (≥ 0). */
  expansionMm: number;
  /** Contraction from installation to the minimum temperature, mm (≥ 0). */
  contractionMm: number;
  totalRangeMm: number;
  /** Member movement minus substrate movement over the same length, mm; signed (+ = member grows more). */
  differentialHotMm?: number;
  differentialColdMm?: number;
  /** Stress if both ends were fully restrained, MPa: compression when hot, tension when cold. */
  restrainedHotMPa: number;
  restrainedColdMPa: number;
  restrainedForceKn?: number;
  /** Minimum sealant joint width at installation, mm. */
  sealantJointMm?: number;
}

export function thermalMovementError(input: ThermalInput): string | null {
  const { lengthMm, installC, minC, maxC, areaMm2, sealantCapability } = input;
  if (!thermalMaterial(input.memberId)) return "Choose a member material.";
  if (input.substrateId && !thermalMaterial(input.substrateId)) return "Choose a valid substrate material.";
  if (!Number.isFinite(lengthMm) || lengthMm <= 0) return "Length must be a number greater than zero.";
  if (![installC, minC, maxC].every(Number.isFinite)) return "Enter all three temperatures.";
  if (minC > installC || installC > maxC) return "The installation temperature must lie between the minimum and maximum member temperatures.";
  if (maxC - minC > 200) return "The temperature range is outside the range of this tool (200 K).";
  if (areaMm2 !== undefined && (!Number.isFinite(areaMm2) || areaMm2 <= 0)) return "Section area must be greater than zero.";
  if (sealantCapability !== undefined && (!Number.isFinite(sealantCapability) || sealantCapability <= 0 || sealantCapability > 1)) {
    return "Sealant movement capability must be between 0 and 100%.";
  }
  return null;
}

export function calculateThermalMovement(input: ThermalInput): ThermalResult | null {
  if (thermalMovementError(input)) return null;
  const member = thermalMaterial(input.memberId)!;
  const substrate = input.substrateId ? thermalMaterial(input.substrateId) : undefined;
  const heat = input.maxC - input.installC;
  const cool = input.installC - input.minC;
  const move = (alpha: number, dT: number) => alpha * 1e-6 * input.lengthMm * dT;

  const expansionMm = move(member.alpha, heat);
  const contractionMm = move(member.alpha, cool);
  const restrainedHotMPa = member.E * 1000 * member.alpha * 1e-6 * heat;
  const restrainedColdMPa = member.E * 1000 * member.alpha * 1e-6 * cool;
  const capability = input.sealantCapability;

  return {
    member,
    substrate,
    expansionMm,
    contractionMm,
    totalRangeMm: expansionMm + contractionMm,
    differentialHotMm: substrate ? move(member.alpha - substrate.alpha, heat) : undefined,
    differentialColdMm: substrate ? move(member.alpha - substrate.alpha, cool) : undefined,
    restrainedHotMPa,
    restrainedColdMPa,
    restrainedForceKn: input.areaMm2 ? (Math.max(restrainedHotMPa, restrainedColdMPa) * input.areaMm2) / 1000 : undefined,
    sealantJointMm: capability ? Math.max(expansionMm, contractionMm) / capability : undefined,
  };
}
