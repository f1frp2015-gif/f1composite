import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";

const { DEFAULT_BEAM_INPUTS, DEFAULT_EQ_INPUTS, calculateBeam, calculateEquivalence, PROFILE_ENGINE_VERSION } = loadProjectModule("lib/profileCalculation.ts");
const { createProfileSnapshot, parseProfileSnapshot, replayProfileSnapshot, PROFILE_SNAPSHOT_MAX_BYTES } = loadProjectModule("lib/profileCalculationSnapshot.ts");
const { buildRfqHref, parseRfqFragment } = loadProjectModule("lib/rfq.ts");
const { buildToolStateHref, readToolStateParams } = loadProjectModule("lib/toolStateUrl.ts");
const copy = (value) => JSON.parse(JSON.stringify(value));
const near = (actual, expected, relative = 1e-11) => assert.ok(Math.abs(actual - expected) <= relative * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);
const input = (extra = {}) => ({ ...copy(DEFAULT_BEAM_INPUTS), ...extra });
const custom = { E: 40, E_T: 10, G_LT: 4, sigma: 400, sigma_c: 350, tau: 40, density: 2 };

// Independent closed-form checks, with service w=5 N/mm or P=5000 N and L=3000 mm.
for (const [loadType, moment, shear, bendingCoefficient, shearCoefficient, distributed] of [
  ["udl", 5 * 3000 ** 2 / 8, 5 * 3000 / 2, 5 / 384, 1 / 8, true],
  ["point-mid", 5000 * 3000 / 4, 5000 / 2, 1 / 48, 1 / 4, false],
  ["cantilever-point", 5000 * 3000, 5000, 1 / 3, 1, false],
  ["cantilever-udl", 5 * 3000 ** 2 / 2, 5 * 3000, 1 / 8, 1 / 2, true],
]) {
  test(`${loadType}: snapshot replay agrees with independent moment, shear and Timoshenko deflection`, () => {
    const snapshot = createProfileSnapshot(input({ loadType }));
    const result = replayProfileSnapshot(JSON.parse(JSON.stringify(snapshot)));
    const ix = (100 * 200 ** 3 - 90 * 180 ** 3) / 12;
    const E = 17200, G = 3000, av = 1800, L = 3000;
    const deltaB = bendingCoefficient * (distributed ? 5 * L ** 4 : 5000 * L ** 3) / (E * ix);
    const deltaS = shearCoefficient * (distributed ? 5 * L ** 2 : 5000 * L) / (G * av);
    near(result.Ix, ix); near(result.M_service_Nmm, moment); near(result.V_service_N, shear);
    near(result.defl, deltaB + deltaS); near(result.deflShearPct, deltaS / deltaB * 100);
    near(result.M_factored_Nmm, moment * 1.6);
    assert.equal(snapshot.units.serviceLoad, distributed ? "kN/m" : "kN");
    assert.deepEqual(result, snapshot.results);
  });
}

test("load duration freezes both ASCE strength lambda and the load factor", () => {
  const live = createProfileSnapshot(input()), permanent = createProfileSnapshot(input({ durationId: "permanent" }));
  near(permanent.results.F_b_allow, 0.65 * 0.4 * 207 * 0.85);
  near(permanent.results.M_factored_Nmm / live.results.M_factored_Nmm, 1.4 / 1.6);
  near(permanent.results.F_b_allow / live.results.F_b_allow, 0.5);
  near(permanent.results.defl, live.results.defl);
  assert.equal(permanent.basis.duration.lambda, 0.4);
});

test("wet environment changes stiffness and resistance without changing service load", () => {
  const dry = createProfileSnapshot(input({ environmentId: "indoor-dry" }));
  const wet = createProfileSnapshot(input({ environmentId: "wet" }));
  near(wet.results.defl / dry.results.defl, 1 / 0.9);
  near(wet.results.F_b_allow / dry.results.F_b_allow, 0.75);
  near(wet.results.M_service_Nmm, dry.results.M_service_Nmm);
  assert.equal(wet.basis.environment.stiffnessFactor, 0.9);
});

test("E23 engine dataset mass is distinguished from area-times-density mass", () => {
  const standard = createProfileSnapshot(input({ materialId: "frp-e23" }));
  assert.equal(standard.results.weightPerM, 5.8);
  assert.equal(standard.basis.weight.kind, "engine-catalog");
  assert.equal(standard.basis.weight.sourceVersion, PROFILE_ENGINE_VERSION);
  assert.equal(standard.candidate.source, "standardProfiles-static");
  assert.equal(standard.candidate.sourceVersion, PROFILE_ENGINE_VERSION);
  const user = createProfileSnapshot(input({ materialId: "custom", method: "asd", customMaterial: custom }));
  near(user.results.weightPerM, 3800 * 2 / 1000);
  assert.equal(user.basis.weight.kind, "nominal-area-density");
  assert.equal(user.candidate.requiresRecalculation, true);
  assert.equal(user.candidate.match, "nominal-geometry");
  assert.equal("stressOk" in user.candidate, false);
});

test("custom material preserves all seven values and replay is isolated from input mutation", () => {
  const request = input({ materialId: "custom", method: "asd", customMaterial: copy(custom), environmentId: "indoor-dry" });
  const snapshot = createProfileSnapshot(request);
  request.geometry.tw = 5; request.customMaterial.G_LT = 10;
  assert.deepEqual(snapshot.inputs.customMaterial, custom);
  assert.equal(snapshot.inputs.geometry.tw, 10);
  near(snapshot.results.F_b_allow, 350 / 2.5); near(snapshot.results.F_v_allow, 40 / 3);
  assert.deepEqual(replayProfileSnapshot(snapshot), snapshot.results);
  assert.match(snapshot.basis.material.values.standard, /not a certified grade/);
});

test("auto equivalence retains distinct source web/flange walls and independent EI requirement", () => {
  const snapshot = createProfileSnapshot(copy(DEFAULT_EQ_INPUTS));
  const result = replayProfileSnapshot(snapshot);
  const sourceIx = (100 * 200 ** 3 - 92 * 176 ** 3) / 12;
  near(result.srcIx, sourceIx); near(result.reqIx, sourceIx * 210 / 23);
  near(result.reqWx, sourceIx / 100 * 235 / 200);
  assert.equal(snapshot.inputs.geometry.tw, 8); assert.equal(snapshot.inputs.geometry.tf, 12);
  assert.notEqual(result.stiffTw, result.stiffTf);
  assert.equal(snapshot.basis.resistanceFactorsApplied, false);
  assert.equal(result.requiresRecalculation, true);
});

test("fixed-wall round equivalence preserves solver constraints and meets unrounded EI target", () => {
  const snapshot = createProfileSnapshot({ ...copy(DEFAULT_EQ_INPUTS), geometry: { shape: "round-tube", h: 100, b: 100, tw: 6, tf: 6 }, targetWallMm: 6 });
  const result = replayProfileSnapshot(snapshot);
  const targetIx = Math.PI / 64 * (result.stiffH ** 4 - (result.stiffH - 12) ** 4);
  assert.ok(targetIx >= result.reqIx);
  assert.equal(result.stiffTw, 6); assert.equal(result.stiffTf, 6);
  assert.equal(result.stiffH, result.stiffB);
  assert.deepEqual(snapshot.basis.solver, { iterations: 50, ceilingMm: 20000 });
});

test("each supported nominal shape replays, and nearest candidates cannot acquire a pass state", () => {
  for (const shape of ["i-beam", "channel", "angle", "square-tube", "round-tube"]) {
    const snapshot = createProfileSnapshot(input({ geometry: { shape, h: 211, b: 103, tw: 9, tf: 11 } }));
    assert.deepEqual(replayProfileSnapshot(snapshot), snapshot.results);
    assert.equal(snapshot.candidate.requiresRecalculation, true);
    assert.equal(snapshot.candidate.match, "nearest-geometry");
    assert.ok(!Object.keys(snapshot.candidate).some((key) => /pass|stress|shear|defl/i.test(key)));
  }
});

test("invalid physical, numeric, material and method inputs never produce a snapshot", () => {
  for (const patch of [
    { spanMm: 0 }, { serviceLoad: -1 }, { deflectionLimit: NaN }, { spanMm: Infinity },
    { geometry: { shape: "square-tube", h: 20, b: 20, tw: 10, tf: 10 } },
    { geometry: { shape: "unsupported", h: 20, b: 20, tw: 1, tf: 1 } },
    { materialId: "unknown" }, { method: "__proto__" }, { loadType: "unknown" },
    { unexpectedField: "cannot be part of a declared calculation" },
    { materialId: "custom", method: "lrfd-asce", customMaterial: custom },
    { materialId: "custom", method: "asd", customMaterial: { ...custom, G_LT: 0 } },
    { spanMm: 1e200 },
  ]) assert.throws(() => createProfileSnapshot(input(patch)), RangeError);
  assert.throws(() => calculateEquivalence({ ...copy(DEFAULT_EQ_INPUTS), targetWallMm: 7 }), /wall thickness/);
  assert.throws(() => calculateBeam(input({ serviceLoad: 0 })), /Service load/);
});

test("cleared hidden dimensions in legacy round-tube shares remain replayable", () => {
  const inputs = input({ geometry: { shape: "round-tube", h: 100, b: 0, tw: 6, tf: 0 } });
  const snapshot = createProfileSnapshot(inputs);
  assert.equal(snapshot.inputs.geometry.b, 0);
  assert.equal(snapshot.inputs.geometry.tf, 0);
  assert.deepEqual(replayProfileSnapshot(snapshot), calculateBeam(input({ geometry: { shape: "round-tube", h: 100, b: 100, tw: 6, tf: 6 } })));
  for (const patch of [{ h: 0 }, { tw: 0 }, { tw: 50 }]) {
    assert.throws(() => createProfileSnapshot({ ...inputs, geometry: { ...inputs.geometry, ...patch } }), RangeError);
  }
});

test("switching from a cleared flange field to a box or angle ignores tf only", () => {
  for (const shape of ["square-tube", "angle"]) {
    const inputs = input({ geometry: { shape, h: 100, b: 100, tw: 6, tf: 0 } });
    const snapshot = createProfileSnapshot(inputs);
    assert.deepEqual(replayProfileSnapshot(snapshot), calculateBeam(input({ geometry: { ...inputs.geometry, tf: 6 } })));
    assert.throws(() => createProfileSnapshot({ ...inputs, geometry: { ...inputs.geometry, b: 0 } }), RangeError);
    assert.throws(() => createProfileSnapshot({ ...inputs, geometry: { ...inputs.geometry, tw: 100 } }), RangeError);
  }
  assert.throws(() => createProfileSnapshot(input({ geometry: { shape: "i-beam", h: 100, b: 100, tw: 6, tf: 0 } })), RangeError);
});

test("snapshot boundary rejects altered outputs, units, basis, identity and unsupported versions", () => {
  const original = createProfileSnapshot(input());
  for (const alter of [
    (s) => { s.results.defl = 0; }, (s) => { s.results.stressOk = !s.results.stressOk; },
    (s) => { s.units.serviceLoad = "N"; }, (s) => { s.basis.material.values.E *= 2; },
    (s) => { s.basis.loadFactor = 1; }, (s) => { s.engineVersion = "old"; },
    (s) => { s.schemaVersion = 2; }, (s) => { s.calculationId = "forged"; },
    (s) => { s.candidate.requiresRecalculation = false; },
    (s) => { s.candidate.nominalMassKgPerM = 1; },
    (s) => { s.basis.weight.kgPerM = 1; },
    (s) => { s.inputs.serviceLoad = NaN; },
  ]) { const changed = copy(original); alter(changed); assert.throws(() => parseProfileSnapshot(changed), RangeError); }
});

test("snapshot size, nesting and dangerous JSON properties are rejected", () => {
  const snapshot = createProfileSnapshot(input());
  assert.ok(Buffer.byteLength(JSON.stringify(snapshot)) < PROFILE_SNAPSHOT_MAX_BYTES);
  assert.throws(() => parseProfileSnapshot({ ...snapshot, padding: "中".repeat(5000) }), /12 KB/);
  assert.throws(() => parseProfileSnapshot(JSON.parse('{"__proto__":{}}')), /Unsupported snapshot property/);
  assert.throws(() => parseProfileSnapshot(undefined), RangeError);
  let nested = {}; for (let i = 0; i < 12; i++) nested = { nested };
  assert.throws(() => parseProfileSnapshot(nested), /deeply nested/);
});

test("identical calculations have stable IDs; meaningful edits change the ID", () => {
  const a = createProfileSnapshot(input()), b = createProfileSnapshot(input());
  assert.equal(a.calculationId, b.calculationId);
  assert.notEqual(a.calculationId, createProfileSnapshot(input({ deflectionLimit: 360 })).calculationId);
  assert.equal(a.engineVersion, PROFILE_ENGINE_VERSION);
  assert.deepEqual(parseProfileSnapshot(a), a);
});

test("share and RFQ fragments transport complete replayable snapshots without context in query", () => {
  const snapshot = createProfileSnapshot(input({ materialId: "custom", method: "asd", customMaterial: custom }));
  const shared = new URL(buildToolStateHref("/frp-profile-calculator", { snapshot: JSON.stringify(snapshot) }), "https://www.f1composite.com");
  const restored = parseProfileSnapshot(JSON.parse(readToolStateParams(shared).get("snapshot")));
  assert.equal(restored.calculationId, snapshot.calculationId);
  assert.equal(shared.search, "");
  const rfq = new URL(buildRfqHref({ source: "calculator", context: { calculatorSnapshot: snapshot }, message: "Please review" }), shared);
  assert.equal(rfq.searchParams.has("context"), false);
  const parsed = parseRfqFragment(rfq.hash);
  assert.equal(parsed.message, "Please review");
  assert.deepEqual(replayProfileSnapshot(parsed.context.calculatorSnapshot), snapshot.results);
});
