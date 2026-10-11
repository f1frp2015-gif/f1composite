import { calcArea, calcIx, calcShearArea, calcWx, getSectionDimensionError, type FrpSectionShape } from "./frpSectionProperties";
import { findStandardProfile } from "./catalog/standardProfiles";
import { DESIGN_MATERIALS, DESIGN_METHODS, ENV_FACTORS, LOAD_DURATIONS, designResistance, type DesignMaterial, type DesignMethod } from "./frpDesignBasis";

/** Versioned preliminary screen. Updating equations, rounding or the dataset requires a new version. */
export const PROFILE_ENGINE_VERSION = "2026-10-11.1";
export type CustomMaterial = Required<Pick<DesignMaterial, "E" | "E_T" | "G_LT" | "sigma" | "sigma_c" | "tau" | "density">>;
export const METHOD_MATERIALS: Record<DesignMethod, string[]> = {
  "lrfd-asce": ["frp-asce-std", "frp-asce-high", "frp-e17", "frp-e23"],
  "lrfd-cents19101": ["frp-e17", "frp-e23"],
  "lrfd-gb50608": ["frp-gb50608-i", "frp-gb50608-ii"],
  asd: ["frp-e17", "frp-e23", "frp-gb50608-i", "frp-gb50608-ii", "frp-asce-std", "frp-asce-high", "custom"],
};
export const PROFILE_LOAD_CASES = [
  { id: "udl", label: "Uniform Distributed Load (UDL)", factor_M: 1 / 8, factor_d: 5 / 384, factor_V: 0.5, factor_s: 9.6 },
  { id: "point-mid", label: "Point Load at Midspan", factor_M: 1 / 4, factor_d: 1 / 48, factor_V: 0.5, factor_s: 12 },
  { id: "cantilever-point", label: "Cantilever — Point Load at Tip", factor_M: 1, factor_d: 1 / 3, factor_V: 1, factor_s: 3 },
  { id: "cantilever-udl", label: "Cantilever — Uniform Load", factor_M: 1 / 2, factor_d: 1 / 8, factor_V: 1, factor_s: 4 },
] as const;
export type ProfileLoadType = typeof PROFILE_LOAD_CASES[number]["id"];
export interface ProfileGeometry { shape: FrpSectionShape; h: number; b: number; tw: number; tf: number }
export interface BeamInputs {
  mode: "beam"; geometry: ProfileGeometry; materialId: string; customMaterial?: CustomMaterial;
  method: DesignMethod; environmentId: string; durationId: string; loadType: ProfileLoadType;
  spanMm: number; serviceLoad: number; deflectionLimit: number;
}
export interface EquivalenceInputs {
  mode: "equivalence"; geometry: ProfileGeometry; sourceMaterialId: string; targetMaterialId: string;
  customMaterial?: CustomMaterial; targetWallMm: number | "auto";
}
export type ProfileInputs = BeamInputs | EquivalenceInputs;
export interface FrozenMaterial { id: string; values: DesignMaterial }
export interface BeamBasis {
  mode: "beam"; material: FrozenMaterial;
  method: { id: DesignMethod; label: string; description: string; phiFlex: number; phiShear: number };
  environment: { id: string; label: string; note: string; strengthFactor: number; stiffnessFactor: number };
  duration: { id: string; label: string; lambda: number; applies: boolean };
  loadCase: { id: ProfileLoadType; label: string; factor_M: number; factor_d: number; factor_V: number; factor_s: number };
  loadFactor: number;
  weight: { kind: "engine-catalog" | "nominal-area-density"; model: string | null; kgPerM: number | null; sourceVersion: string; source: "standardProfiles-static" | "entered-geometry-and-density" };
}
export interface EquivalenceBasis {
  mode: "equivalence"; source: FrozenMaterial; target: FrozenMaterial;
  comparison: "characteristic-EI-and-sigmaW"; resistanceFactorsApplied: false;
  rounding: "whole-mm-dimensions-v1"; solver: { iterations: 50; ceilingMm: 20000 };
}
export type ProfileBasis = BeamBasis | EquivalenceBasis;
export const DEFAULT_BEAM_INPUTS: BeamInputs = {
  mode: "beam", geometry: { shape: "i-beam", h: 200, b: 100, tw: 10, tf: 10 }, materialId: "frp-asce-std",
  method: "lrfd-asce", environmentId: "outdoor", durationId: "occupancy", loadType: "udl",
  spanMm: 3000, serviceLoad: 5, deflectionLimit: 250,
};
export const DEFAULT_EQ_INPUTS: EquivalenceInputs = {
  mode: "equivalence", geometry: { shape: "i-beam", h: 200, b: 100, tw: 8, tf: 12 },
  sourceMaterialId: "steel-s235", targetMaterialId: "frp-e23", targetWallMm: "auto",
};

const positive = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n) && n > 0;
const customKeys = ["E", "E_T", "G_LT", "sigma", "sigma_c", "tau", "density"] as const;
export function profileInputError(input: ProfileInputs): string | null {
  if (!input || !["beam", "equivalence"].includes(input.mode)) return "Unsupported calculation mode.";
  const g = input.geometry;
  if (!g) return "Section geometry is required.";
  // Preserve hidden values in the snapshot without applying geometric constraints
  // to unused fields (round tubes ignore B/tf; boxes and angles ignore tf).
  if (![g.h, g.b, g.tw, g.tf].every((n) => typeof n === "number" && Number.isFinite(n))) return "All stored section dimensions must be finite numbers.";
  const error = getSectionDimensionError(g.shape, g.h, g.b, g.tw, g.tf);
  if (error) return error;
  const targetId = input.mode === "beam" ? input.materialId : input.targetMaterialId;
  if (targetId === "custom") {
    if (!input.customMaterial || !customKeys.every((key) => positive(input.customMaterial?.[key]))) return "Every custom material property must be a finite number greater than zero.";
  } else if (DESIGN_MATERIALS[targetId]?.group !== "FRP") return "Choose a supported FRP material dataset.";
  if (input.mode === "beam") {
    if (!positive(input.spanMm)) return "Span must be a finite number greater than zero.";
    if (!positive(input.serviceLoad)) return "Service load must be a finite number greater than zero.";
    if (!positive(input.deflectionLimit)) return "Deflection limit denominator must be greater than zero.";
    if (!Object.prototype.hasOwnProperty.call(METHOD_MATERIALS, input.method) || !METHOD_MATERIALS[input.method].includes(input.materialId)) return "The material dataset is not compatible with this screening method.";
    if (!PROFILE_LOAD_CASES.some((v) => v.id === input.loadType)) return "Unsupported load case.";
    if (!ENV_FACTORS.some((v) => v.id === input.environmentId)) return "Unsupported environment.";
    if (!LOAD_DURATIONS.some((v) => v.id === input.durationId)) return "Unsupported load duration.";
  } else {
    if (DESIGN_MATERIALS[input.sourceMaterialId]?.group !== "Metal") return "Choose a supported source metal.";
    if (input.targetWallMm !== "auto" && ![3, 4, 5, 6, 8, 10, 12].includes(input.targetWallMm)) return "Unsupported target wall thickness.";
  }
  return null;
}
function material(id: string, custom?: CustomMaterial): FrozenMaterial {
  return { id, values: id === "custom"
    ? { label: "Custom FRP grade (user-defined)", group: "FRP", standard: "User-defined characteristic inputs; not a certified grade", ...custom! }
    : { ...DESIGN_MATERIALS[id] } };
}
export function resolveProfileBasis(input: BeamInputs): BeamBasis;
export function resolveProfileBasis(input: EquivalenceInputs): EquivalenceBasis;
export function resolveProfileBasis(input: ProfileInputs): ProfileBasis;
export function resolveProfileBasis(input: ProfileInputs): ProfileBasis {
  const error = profileInputError(input);
  if (error) throw new RangeError(error);
  if (input.mode === "equivalence") return {
    mode: "equivalence", source: material(input.sourceMaterialId), target: material(input.targetMaterialId, input.customMaterial),
    comparison: "characteristic-EI-and-sigmaW", resistanceFactorsApplied: false,
    rounding: "whole-mm-dimensions-v1", solver: { iterations: 50, ceilingMm: 20000 },
  };
  const mat = material(input.materialId, input.customMaterial);
  const dm = DESIGN_METHODS[input.method];
  const env = ENV_FACTORS.find((v) => v.id === input.environmentId)!;
  const duration = LOAD_DURATIONS.find((v) => v.id === input.durationId)!;
  const resistance = designResistance({ material: mat.values, method: input.method, envId: input.environmentId, durationId: input.durationId });
  const exact = input.materialId === "frp-e23" ? findStandardProfile(input.geometry) : null;
  return {
    mode: "beam", material: mat,
    method: { id: input.method, label: dm.label, description: dm.basis, phiFlex: dm.phiFlex, phiShear: dm.phiShear },
    environment: { id: env.id, label: env.label, note: env.note, strengthFactor: resistance.envStrength, stiffnessFactor: resistance.envStiffness },
    duration: { id: duration.id, label: duration.label, lambda: resistance.lambda, applies: input.method === "lrfd-asce" },
    loadCase: { ...PROFILE_LOAD_CASES.find((v) => v.id === input.loadType)! }, loadFactor: resistance.loadFactor,
    weight: exact ? { kind: "engine-catalog", model: exact.model, kgPerM: exact.weight, sourceVersion: PROFILE_ENGINE_VERSION, source: "standardProfiles-static" } : { kind: "nominal-area-density", model: null, kgPerM: null, sourceVersion: PROFILE_ENGINE_VERSION, source: "entered-geometry-and-density" },
  };
}
export function slendernessCheck(shape: string, h: number, b: number, tw: number, tf: number) {
  if (shape === "i-beam") return { ratio: b / 2 / tf, limit: 18, label: "outstanding flange b/t" };
  if (shape === "channel") return { ratio: b / tf, limit: 18, label: "outstanding flange b/t" };
  if (shape === "angle") return { ratio: Math.max(h, b) / tw, limit: 18, label: "leg b/t" };
  if (shape === "square-tube") return { ratio: (Math.max(h, b) - 2 * tw) / tw, limit: 40, label: "box flat-width b/t" };
  return { ratio: h / tw, limit: 40, label: "tube D/t" };
}
function ensureFinite(value: unknown): void {
  if (typeof value === "number" && !Number.isFinite(value)) throw new RangeError("Calculation exceeds the supported numerical range.");
  if (value && typeof value === "object") Object.values(value).forEach(ensureFinite);
}
export function calculateBeam(input: BeamInputs, basis = resolveProfileBasis(input)) {
  const error = profileInputError(input);
  if (error) throw new RangeError(error);
  const { shape, h, b, tw, tf } = input.geometry;
  const mat = basis.material.values, lt = basis.loadCase;
  const Ix = calcIx(shape, h, b, tw, tf), Wx = calcWx(Ix, h, shape, b, tw);
  const area = calcArea(shape, h, b, tw, tf), Aw = calcShearArea(shape, h, b, tw, tf);
  const isDistributed = input.loadType === "udl" || input.loadType === "cantilever-udl";
  const span = input.spanMm, load = input.serviceLoad, spanM = span / 1000;
  const totalForce = isDistributed ? load * spanM : load;
  const M_service_Nmm = isDistributed ? lt.factor_M * load * spanM ** 2 * 1e6 : lt.factor_M * load * span * 1000;
  const V_service_N = lt.factor_V * (isDistributed ? load * spanM * 1000 : load * 1000);
  const loadFactor = basis.loadFactor;
  const M_factored_Nmm = M_service_Nmm * loadFactor, V_factored_N = V_service_N * loadFactor;
  const sigma_max = M_factored_Nmm / Wx, tau_max = V_factored_N / Aw;
  const F_b_allow = basis.method.phiFlex * basis.duration.lambda * Math.min(mat.sigma, mat.sigma_c ?? mat.sigma) * basis.environment.strengthFactor;
  const F_v_allow = basis.method.phiShear * basis.duration.lambda * (mat.tau ?? 25) * basis.environment.strengthFactor;
  const E_mpa = mat.E * 1000 * basis.environment.stiffnessFactor;
  const G_mpa = (mat.G_LT ?? mat.E / 2.6) * 1000 * basis.environment.stiffnessFactor;
  const defl_bending = isDistributed ? lt.factor_d * load * span ** 4 / (E_mpa * Ix) : lt.factor_d * load * 1000 * span ** 3 / (E_mpa * Ix);
  const shearCorrection = 1 + lt.factor_s * E_mpa * Ix / (G_mpa * Aw * span ** 2);
  const defl = defl_bending * shearCorrection;
  const deflShearPct = (shearCorrection - 1) * 100; // increase over bending-only, NOT share of total
  const deflRatio = span / (defl || 1);
  const weightPerM = basis.weight.kind === "engine-catalog" ? basis.weight.kgPerM! : area * mat.density / 1000;
  const slender = slendernessCheck(shape, h, b, tw, tf);
  const result = { Ix, Wx, area, Aw, isDistributed, totalForce, M_service_Nmm, V_service_N,
    loadFactor, M_factored_Nmm, V_factored_N, sigma_max, tau_max, F_b_allow, F_v_allow,
    E_mpa, G_mpa, defl_bending, shearCorrection, defl, deflShearPct, deflRatio, weightPerM,
    stressOk: sigma_max <= F_b_allow, shearOk: tau_max <= F_v_allow, deflOk: deflRatio >= input.deflectionLimit,
    slender, slenderWarn: slender.ratio > slender.limit };
  ensureFinite(result);
  return result;
}
function solveH(shape: string, target: number, prop: "Ix" | "Wx", t: number, k: number, solver: EquivalenceBasis["solver"]) {
  const at = (h: number) => {
    const b = shape === "round-tube" || shape === "square-tube" ? h : Math.max(k * h, 2 * t + 2);
    const ix = calcIx(shape, h, b, t, t);
    return prop === "Ix" ? ix : calcWx(ix, h, shape, b, t);
  };
  let lo = 2 * t + 2;
  let hi: number = solver.ceilingMm;
  if (at(hi) < target) return hi;
  for (let i = 0; i < solver.iterations; i++) { const mid = (lo + hi) / 2; if (at(mid) >= target) hi = mid; else lo = mid; }
  return hi;
}
export function calculateEquivalence(input: EquivalenceInputs, basis = resolveProfileBasis(input)) {
  const error = profileInputError(input);
  if (error) throw new RangeError(error);
  const { shape, h, b, tw, tf } = input.geometry;
  const src = basis.source.values, tgt = basis.target.values;
  const srcIx = calcIx(shape, h, b, tw, tf), srcWx = calcWx(srcIx, h, shape, b, tw), srcArea = calcArea(shape, h, b, tw, tf);
  const tgtSigma = Math.min(tgt.sigma, tgt.sigma_c ?? tgt.sigma);
  const reqWx = srcWx * src.sigma / tgtSigma, reqIx = srcIx * src.E / tgt.E;
  const stiffnessScale = (src.E / tgt.E) ** 0.25, strengthScale = (src.sigma / tgtSigma) ** (1 / 3);
  const fixedWall = input.targetWallMm !== "auto", tWall = fixedWall ? input.targetWallMm as number : 0;
  const aspectK = b / h;
  const bFromH = (height: number) => shape === "round-tube" || shape === "square-tube" ? height : Math.round(aspectK * height);
  const stiffH = fixedWall ? Math.ceil(solveH(shape, reqIx, "Ix", tWall, aspectK, basis.solver)) : Math.round(h * stiffnessScale);
  const stiffB = fixedWall ? bFromH(stiffH) : Math.round(b * stiffnessScale);
  const stiffTw = fixedWall ? tWall : Math.max(1, Math.round(tw * stiffnessScale));
  const stiffTf = fixedWall ? tWall : Math.max(1, Math.round(tf * stiffnessScale));
  const strengthH = fixedWall ? Math.ceil(solveH(shape, reqWx, "Wx", tWall, aspectK, basis.solver)) : Math.round(h * strengthScale);
  const strengthB = fixedWall ? bFromH(strengthH) : Math.round(b * strengthScale);
  const strengthTw = fixedWall ? tWall : Math.max(1, Math.round(tw * strengthScale));
  const strengthTf = fixedWall ? tWall : Math.max(1, Math.round(tf * strengthScale));
  const stiffGoverns = fixedWall ? stiffH >= strengthH : stiffnessScale >= strengthScale;
  const governingScale = Math.max(stiffnessScale, strengthScale), governingCriterion = stiffGoverns ? "Stiffness (EI)" : "Strength (σW)";
  const srcWeight = srcArea * src.density / 1000;
  const stiffWeight = calcArea(shape, stiffH, stiffB, stiffTw, stiffTf) * tgt.density / 1000;
  const strengthWeight = calcArea(shape, strengthH, strengthB, strengthTw, strengthTf) * tgt.density / 1000;
  const tgtWeight = stiffGoverns ? stiffWeight : strengthWeight;
  const result = { srcIx, srcWx, srcArea, reqWx, reqIx, stiffnessScale, strengthScale, fixedWall, tWall,
    stiffH, stiffB, stiffTw, stiffTf, strengthH, strengthB, strengthTw, strengthTf, stiffGoverns, governingScale, governingCriterion,
    srcWeight, stiffWeight, strengthWeight, tgtWeight, weightSaving: (1 - tgtWeight / srcWeight) * 100,
    eqFrpH: stiffGoverns ? stiffH : strengthH, eqFrpB: stiffGoverns ? stiffB : strengthB,
    eqFrpWall: stiffGoverns ? stiffTw : strengthTw, eqFrpTf: stiffGoverns ? stiffTf : strengthTf,
    requiresRecalculation: true };
  ensureFinite(result);
  return result;
}
