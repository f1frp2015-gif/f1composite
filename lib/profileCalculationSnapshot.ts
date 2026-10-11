import { findStandardProfile, nearestStandardProfile } from "./catalog/standardProfiles";
import {
  PROFILE_ENGINE_VERSION, calculateBeam, calculateEquivalence, profileInputError, resolveProfileBasis,
  type BeamInputs, type EquivalenceInputs, type ProfileInputs, type ProfileBasis,
} from "./profileCalculation";

export const PROFILE_SNAPSHOT_MAX_BYTES = 12_000;
const LIMITATIONS = [
  "Preliminary screening only; not an engineering approval or a complete code check.",
  "Nominal geometry and characteristic material inputs; project qualification, connections, buckling, creep and combined loads require separate review.",
  "Catalog candidates and catalog masses come from this engine version's static dataset, not the current published catalog or inventory. Confirm geometry, material and mass; candidates do not inherit the entered section's results.",
];
function declaredInputs(input: ProfileInputs): ProfileInputs {
  const { shape, h, b, tw, tf } = input.geometry;
  const geometry = { shape, h, b, tw, tf };
  const targetId = input.mode === "beam" ? input.materialId : input.targetMaterialId;
  const customMaterial = targetId === "custom" && input.customMaterial ? (() => {
    const { E, E_T, G_LT, sigma, sigma_c, tau, density } = input.customMaterial;
    return { customMaterial: { E, E_T, G_LT, sigma, sigma_c, tau, density } };
  })() : {};
  return input.mode === "beam" ? {
    mode: "beam", geometry, materialId: input.materialId, ...customMaterial,
    method: input.method, environmentId: input.environmentId, durationId: input.durationId,
    loadType: input.loadType, spanMm: input.spanMm, serviceLoad: input.serviceLoad, deflectionLimit: input.deflectionLimit,
  } : {
    mode: "equivalence", geometry, sourceMaterialId: input.sourceMaterialId,
    targetMaterialId: input.targetMaterialId, ...customMaterial, targetWallMm: input.targetWallMm,
  };
}
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(",")}}`;
  return JSON.stringify(value);
}
function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)); }
function contentId(value: unknown): string {
  // Diagnostic identity, not a signature or claim of engineering authentication.
  let a = 2166136261, b = 3339675911;
  for (const c of canonical(value)) { a = Math.imul(a ^ c.charCodeAt(0), 16777619); b = Math.imul(b ^ c.charCodeAt(0), 2246822519); }
  return `F1-${(a >>> 0).toString(16).padStart(8, "0")}${(b >>> 0).toString(16).padStart(8, "0")}`;
}
export function profileSnapshotMatchesInputs(snapshot: ProfileCalculationSnapshot | null, inputs: ProfileInputs): boolean {
  return !!snapshot && canonical(snapshot.inputs) === canonical(inputs);
}
const unitsFor = (inputs: ProfileInputs) => ({
  geometry: "mm", span: "mm", serviceLoad: inputs.mode === "equivalence" ? "not-applicable" : inputs.loadType === "udl" || inputs.loadType === "cantilever-udl" ? "kN/m" : "kN",
  modulus: "GPa", strength: "MPa", density: "g/cm3", area: "mm2", secondMoment: "mm4", sectionModulus: "mm3",
  moment: "N.mm", shearForce: "N", deflection: "mm", massPerLength: "kg/m", deflectionLimit: "L/denominator",
});
function snapshotBody(inputs: ProfileInputs, basis: ProfileBasis) {
  const results = inputs.mode === "beam" && basis.mode === "beam" ? calculateBeam(inputs, basis)
    : inputs.mode === "equivalence" && basis.mode === "equivalence" ? calculateEquivalence(inputs, basis)
    : (() => { throw new RangeError("Calculation mode and basis do not match."); })();
  const geometry = inputs.mode === "beam" ? inputs.geometry : (() => {
    const r = results as ReturnType<typeof calculateEquivalence>;
    return { shape: inputs.geometry.shape, h: r.eqFrpH, b: r.eqFrpB, tw: r.eqFrpWall, tf: r.eqFrpTf };
  })();
  const exact = findStandardProfile(geometry), candidate = exact ?? nearestStandardProfile(geometry.shape, geometry.h, geometry.shape === "round-tube" ? geometry.h : geometry.b, geometry.tw);
  return {
    schemaVersion: 1 as const, calculator: "frp-profile" as const, engineVersion: PROFILE_ENGINE_VERSION,
    mode: inputs.mode, units: unitsFor(inputs), inputs, basis, results,
    limitations: inputs.mode === "beam" ? LIMITATIONS : [...LIMITATIONS, "Equivalence compares characteristic EI and strength times section modulus only. Rounded dimensions, fixed-wall sizing and the 20,000 mm solver ceiling require verification; no equivalence pass is asserted."],
    candidate: candidate ? { model: candidate.model, geometry: candidate.geometry, nominalMassKgPerM: candidate.weight, source: "standardProfiles-static" as const, sourceVersion: PROFILE_ENGINE_VERSION, match: exact ? "nominal-geometry" as const : "nearest-geometry" as const, requiresRecalculation: true as const } : null,
  };
}
export type ProfileCalculationSnapshot = ReturnType<typeof snapshotBody> & { calculationId: string };

export function createProfileSnapshot(inputs: ProfileInputs, basis: ProfileBasis = resolveProfileBasis(inputs)): ProfileCalculationSnapshot {
  const error = profileInputError(inputs);
  if (error) throw new RangeError(error);
  if (canonical(inputs) !== canonical(declaredInputs(inputs))) throw new RangeError("Calculation inputs contain unsupported or missing fields.");
  // A version identifies both the algorithm and its supported dataset. Old versions
  // must get an explicit replay implementation before being accepted by a new engine.
  if (canonical(basis) !== canonical(resolveProfileBasis(inputs))) throw new RangeError("Calculation basis does not match this engine version and inputs.");
  const body = snapshotBody(inputs, basis);
  const snapshot = clone({ ...body, calculationId: contentId(body) });
  if (new TextEncoder().encode(JSON.stringify(snapshot)).byteLength > PROFILE_SNAPSHOT_MAX_BYTES) throw new RangeError("Calculation snapshot exceeds 12 KB.");
  return snapshot;
}

function safeJson(value: unknown, depth = 0): void {
  if (depth > 10) throw new RangeError("Calculation snapshot is too deeply nested.");
  if (typeof value === "number" && !Number.isFinite(value)) throw new RangeError("Calculation snapshot contains a non-finite number.");
  if (value && typeof value === "object") {
    if (Object.getPrototypeOf(value) !== Object.prototype && !Array.isArray(value)) throw new RangeError("Calculation snapshot must contain plain JSON objects.");
    for (const [key, item] of Object.entries(value)) {
      if (["__proto__", "constructor", "prototype"].includes(key)) throw new RangeError("Unsupported snapshot property.");
      safeJson(item, depth + 1);
    }
  } else if (value !== null && !["number", "string", "boolean"].includes(typeof value)) throw new RangeError("Calculation snapshot must contain JSON values.");
}

/** Server-safe boundary: size check, version check, validation and independent replay.
 * A client snapshot remains user-supplied information, never certified engineering data.
 */
export function parseProfileSnapshot(value: unknown): ProfileCalculationSnapshot {
  safeJson(value);
  if (new TextEncoder().encode(JSON.stringify(value)).byteLength > PROFILE_SNAPSHOT_MAX_BYTES) throw new RangeError("Calculation snapshot exceeds 12 KB.");
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new RangeError("A calculation snapshot object is required.");
  const data = value as Record<string, unknown>;
  if (data.schemaVersion !== 1 || data.calculator !== "frp-profile" || data.engineVersion !== PROFILE_ENGINE_VERSION) throw new RangeError("Unsupported calculation snapshot version. Recalculate with the current tool.");
  if (!data.inputs || typeof data.inputs !== "object" || Array.isArray(data.inputs)) throw new RangeError("Calculation inputs are required.");
  const inputs = data.inputs as ProfileInputs;
  const error = profileInputError(inputs);
  if (error) throw new RangeError(error);
  const expected = createProfileSnapshot(inputs, data.basis as ProfileBasis);
  if (canonical(data) !== canonical(expected)) throw new RangeError("Calculation snapshot does not match its independently recalculated inputs, basis or results.");
  return expected;
}

export function replayProfileSnapshot(value: unknown) {
  const snapshot = parseProfileSnapshot(value);
  if (snapshot.inputs.mode === "beam" && snapshot.basis.mode === "beam") return calculateBeam(snapshot.inputs as BeamInputs, snapshot.basis);
  if (snapshot.inputs.mode === "equivalence" && snapshot.basis.mode === "equivalence") return calculateEquivalence(snapshot.inputs as EquivalenceInputs, snapshot.basis);
  throw new RangeError("Calculation mode and basis do not match.");
}
