import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { calculateThermalMovement, thermalMovementError, THERMAL_MATERIALS } from "../lib/thermalMovement.ts";
import { buildProducts, nearestStandardProfile } from "../lib/catalog/standardProfiles.ts";
import { DESIGN_MATERIALS, designResistance, LOAD_DURATIONS, ENV_FACTORS } from "../lib/frpDesignBasis.ts";
import { calcShearArea } from "../lib/frpSectionProperties.ts";
import { checkLadder, checkStair, checkWalkway, moldedGratingClearOpening } from "../lib/accessGeometry.ts";
import { barSize, gfrpDesignValues, matchGfrpSize } from "../lib/gfrpRebar.ts";
import { loadProjectModule } from "./load-project-module.mjs";

const near = (actual, expected, tolerance = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

test("thermal movement: free, differential, restrained and sealant joint", () => {
  const result = calculateThermalMovement({
    lengthMm: 6000,
    memberId: "gfrp-pultruded-longitudinal",
    substrateId: "steel-carbon",
    installC: 15,
    minC: -20,
    maxC: 60,
    areaMm2: 1000,
    sealantCapability: 0.25,
  });
  // 8e-6 × 6000 × 45 and × 35
  near(result.expansionMm, 2.16);
  near(result.contractionMm, 1.68);
  near(result.totalRangeMm, 3.84);
  // (8 − 12)e-6 × 6000 × 45: the steel grows more
  near(result.differentialHotMm, -1.08);
  // 23 GPa × 8e-6 × 45 K = 8.28 MPa; × 1000 mm² = 8.28 kN
  near(result.restrainedHotMPa, 8.28);
  near(result.restrainedForceKn, 8.28);
  near(result.sealantJointMm, 2.16 / 0.25);
});

test("thermal movement rejects inconsistent temperatures and lengths", () => {
  const base = { lengthMm: 1000, memberId: "aluminium", installC: 20, minC: -10, maxC: 50 };
  assert.equal(thermalMovementError(base), null);
  assert.match(thermalMovementError({ ...base, installC: 60 }), /between/);
  assert.match(thermalMovementError({ ...base, lengthMm: 0 }), /greater than zero/);
  assert.match(thermalMovementError({ ...base, memberId: "unobtainium" }), /member material/);
  assert.equal(calculateThermalMovement({ ...base, maxC: 10 }), null);
});

test("thermal coefficients keep the Eurocode reference values", () => {
  const alpha = Object.fromEntries(THERMAL_MATERIALS.map((material) => [material.id, material.alpha]));
  assert.equal(alpha["steel-carbon"], 12);
  assert.equal(alpha["aluminium"], 23);
  assert.equal(alpha["concrete"], 10);
  assert.equal(alpha["steel-stainless-austenitic"], 16);
});

test("closest catalog size only returns published sizes of the same shape", () => {
  const models = new Set(buildProducts().map((product) => product.model));
  // 150 × 150 SHS is not a catalog size; the nearest published ones are 152 and 160.
  const tube = nearestStandardProfile("square-tube", 150, 150, 10);
  assert.ok(models.has(tube.model));
  assert.equal(tube.model, "SHS 152×152×9.5");
  assert.equal(nearestStandardProfile("i-beam", 200, 100, 10).model, "I 200×100×10");
  assert.equal(nearestStandardProfile("round-tube", 50, 50, 5).model, "CHS 50×5");
  assert.equal(nearestStandardProfile("channel", 150, 40, 6).model, "U 150×40×6");
  assert.equal(nearestStandardProfile("angle", 0, 50, 5), null);
});

// ── Shared design basis, span tables and the new tools ─────────────────────

test("design basis keeps EN 13706 minimums and the corrected metal data", () => {
  const e23 = DESIGN_MATERIALS["frp-e23"];
  assert.equal(e23.E, 23);
  assert.equal(e23.sigma, 240);
  assert.equal(e23.tau, 25, "EN 13706-3 E23 interlaminar shear minimum");
  assert.equal(DESIGN_MATERIALS["frp-e17"].tau, 15);
  assert.equal(DESIGN_MATERIALS["steel-q355"].sigma, 355, "GB/T 1591-2018 Q355, t ≤ 16 mm");
  assert.equal(DESIGN_MATERIALS["alu-6063"].sigma, 110, "6063-T5 minimum 0.2% proof, not tensile strength");
  assert.equal(DESIGN_MATERIALS["alu-6061"].sigma, 240);
  assert.equal(DESIGN_MATERIALS["alu-6061"].E, 70);
  for (const id of ["steel-a36", "steel-a992", "steel-350w", "steel-as300"]) assert.equal(DESIGN_MATERIALS[id].E, 200);
});

test("ASCE path applies λ and the ASCE 7 factor of the load duration; other paths do not", () => {
  const e23 = DESIGN_MATERIALS["frp-e23"];
  const occupancy = designResistance({ material: e23, method: "lrfd-asce", envId: "outdoor", durationId: "occupancy" });
  near(occupancy.bendingAllowable, 0.65 * 0.8 * 200 * 0.85);
  near(occupancy.shearAllowable, 0.65 * 0.8 * 25 * 0.85);
  assert.equal(occupancy.loadFactor, 1.6);
  const permanent = designResistance({ material: e23, method: "lrfd-asce", envId: "indoor-dry", durationId: "permanent" });
  near(permanent.bendingAllowable, 0.65 * 0.4 * 200);
  assert.equal(permanent.loadFactor, 1.4);
  const cen = designResistance({ material: e23, method: "lrfd-cents19101", envId: "indoor-dry", durationId: "permanent" });
  near(cen.bendingAllowable, 200 / 1.5);
  assert.equal(cen.loadFactor, 1.5);
  assert.deepEqual(LOAD_DURATIONS.map((d) => d.lambda), [0.8, 0.6, 0.4, 1.0]);
  const wet = designResistance({ material: e23, method: "asd", envId: "wet" });
  near(wet.envStiffness, 0.9);
  near(wet.bendingAllowable, (200 / 2.5) * 0.75);
  const steel = designResistance({ material: DESIGN_MATERIALS["steel-s355"], method: "asd", envId: "wet" });
  near(steel.envStiffness, 1);
  assert.ok(ENV_FACTORS.every((env) => !/Ω_E/.test(env.note)), "no invented ASCE factor names");
});

test("box shear area uses the clear side walls, like the I-beam web", () => {
  near(calcShearArea("square-tube", 100, 100, 6, 6), 2 * (100 - 12) * 6);
  near(calcShearArea("i-beam", 200, 100, 10, 10), (200 - 20) * 10);
});

test("span tables use the shared basis and deep-link to a calculator pairing it accepts", () => {
  const { buildSpanTables, DESIGN_BASIS } = loadProjectModule("lib/spanTables.ts");
  assert.equal(DESIGN_BASIS.bendingAllowableMPa, 88.4);
  assert.equal(DESIGN_BASIS.shearAllowableMPa, 11); // 0.65 × 0.8 × 25 × 0.85 = 11.05
  assert.match(DESIGN_BASIS.method, /λ = 0\.8/);
  const rows = buildSpanTables().flatMap((family) => family.rows);
  const i200 = rows.find((row) => row.model === "I 200×100×10");
  // Deflection-governed at 3 m: unchanged by the strength factors.
  assert.equal(i200.cells[4].governs, "deflection");
  near(i200.cells[4].w, 5.51, 0.01);
  assert.match(i200.calculatorHref, /material=frp-e23/);
  assert.match(i200.calculatorHref, /method=lrfd-asce/);
  const calculator = readFileSync(new URL("../app/frp-profile-calculator/ProfileCalculator.tsx", import.meta.url), "utf8");
  assert.match(calculator, /"lrfd-asce": \["frp-asce-std", "frp-asce-high", "frp-e17", "frp-e23"\]/, "the span-table link must open without a method/material error");
});

test("guardrail check: OSHA point load, IBC line load and EN ISO 14122-3 test load", () => {
  const { checkGuardrail, guardInputError, GUARD_SECTIONS } = loadProjectModule("lib/guardrailLoads.ts");
  const shs = GUARD_SECTIONS.find((item) => item.id === "shs-50-6.4").section;
  const base = { heightMm: 1067, spacingMm: 1500, post: shs, rail: shs, materialId: "frp-e23", method: "asd", envId: "indoor-dry" };
  const osha = checkGuardrail({ ...base, caseId: "us-osha" });
  near(osha.pointKn, 0.89);
  near(osha.post.serviceMomentKnm, 0.89 * 1.067);
  // SHS 50 × 6.4: I = (50⁴ − 37.2⁴)/12, W = I/25
  const W = (50 ** 4 - 37.2 ** 4) / 12 / 25;
  near(osha.post.bendingStressMPa, (0.89 * 1.067 * 1e6) / W, 1e-6);
  near(osha.post.bendingAllowableMPa, 200 / 2.5);
  assert.ok(osha.loadedHeightMm > 991);
  const ibc = checkGuardrail({ ...base, caseId: "us-ibc" });
  assert.equal(ibc.post.governingLoad, "line");
  near(ibc.post.serviceForceKn, 0.73 * 1.5);
  const iso = checkGuardrail({ ...base, caseId: "eu-iso14122", heightMm: 1100, method: "lrfd-cents19101" });
  near(iso.pointKn, 0.3 * 1.5, 1e-12);
  assert.equal(iso.flags.heightBelowMin, false);
  assert.equal(checkGuardrail({ ...base, caseId: "eu-iso14122", heightMm: 1000, spacingMm: 1800 }).flags.spacingAboveMax, true);
  // User-entry rules refuse to guess a load.
  assert.match(guardInputError({ ...base, caseId: "au-1170" }), /Enter the line load/);
  assert.equal(checkGuardrail({ ...base, caseId: "au-1170" }), null);
  const au = checkGuardrail({ ...base, caseId: "au-1170", lineKnPerM: 0.75, pointKn: 0.6 });
  near(au.post.serviceForceKn, 0.75 * 1.5);
});

test("ladder, stair and walkway rules", () => {
  const ladder = { code: "osha", rungPitchMm: 300, clearWidthMm: 398, toeClearanceMm: 180, heightMm: 9000, railExtensionMm: 1070, fallProtection: "cage", newInstallation: true };
  const osha = Object.fromEntries(checkLadder(ladder).map((check) => [check.label, check.status]));
  assert.equal(osha["Rung spacing"], "pass");
  assert.equal(osha["Clear width between side rails"], "fail", "16 in = 406.4 mm");
  assert.equal(osha["Fall protection"], "fail", "a cage alone does not meet 1910.28(b)(9) on a new ladder over 24 ft");
  const existing = Object.fromEntries(checkLadder({ ...ladder, newInstallation: false }).map((check) => [check.label, check.status]));
  assert.equal(existing["Fall protection"], "advice");
  const iso = Object.fromEntries(checkLadder({ ...ladder, code: "iso14122-4" }).map((check) => [check.label, check.status]));
  assert.equal(iso["Clear width between stiles"], "fail");
  assert.equal(iso["Fall protection"], "pass");

  const stair = Object.fromEntries(checkStair({ code: "osha-standard", riserMm: 200, goingMm: 250, widthMm: 800, headroomMm: 2300, flightRiseMm: 2800 }).map((check) => [check.label, check.status]));
  assert.equal(stair.Angle, "pass");
  assert.equal(stair["Riser height"], "pass");
  const iso3 = Object.fromEntries(checkStair({ code: "iso14122-3", riserMm: 200, goingMm: 250, widthMm: 800, headroomMm: 2300, flightRiseMm: 2800 }).map((check) => [check.label, check.status]));
  assert.equal(iso3["Step formula g + 2h"], "pass", "250 + 400 = 650 mm");
  const ship = Object.fromEntries(checkStair({ code: "osha-ship", riserMm: 250, goingMm: 150, widthMm: 500, headroomMm: 2100, flightRiseMm: 3000 }).map((check) => [check.label, check.status]));
  assert.equal(ship.Angle, "pass");

  near(moldedGratingClearOpening(38.1, 6), 32.1);
  const walk = Object.fromEntries(checkWalkway({ widthMm: 800, headroomMm: 2200, clearOpeningMm: 32.1, peopleBelow: false }).map((check) => [check.label, check.status]));
  assert.equal(walk["Openings in the walking surface"], "pass");
  const below = Object.fromEntries(checkWalkway({ widthMm: 800, headroomMm: 2200, clearOpeningMm: 32.1, peopleBelow: true }).map((check) => [check.label, check.status]));
  assert.equal(below["Openings in the walking surface"], "fail");
});

test("GFRP rebar size match and ACI CODE-440.11-22 values", () => {
  assert.equal(barSize("astm", "No. 4").areaMm2, 129);
  assert.equal(barSize("csa", "15M").areaMm2, 200);
  assert.equal(barSize("asnzs", "N16").areaMm2, 201);
  const match = matchGfrpSize(barSize("astm", "No. 5").diameterMm);
  assert.equal(match.f1DiameterMm, 16);
  assert.equal(match.astm.designation, "No. 5");
  const values = gfrpDesignValues({ guaranteedStrengthMPa: 1000, modulusGPa: 50, areaMm2: 201 });
  near(values.designStrengthMPa, 850);
  near(values.sustainedLimitMPa, 255);
  near(values.stiffnessRatio, 0.25);
  assert.equal(gfrpDesignValues({ guaranteedStrengthMPa: 0, modulusGPa: 50, areaMm2: 201 }), null);
});
