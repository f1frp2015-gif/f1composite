import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { calculateThermalMovement, thermalMovementError, THERMAL_MATERIALS } from "../lib/thermalMovement.ts";
import { buildProducts, nearestStandardProfile } from "../lib/catalog/standardProfiles.ts";
import { DESIGN_MATERIALS, designResistance, LOAD_DURATIONS, ENV_FACTORS } from "../lib/frpDesignBasis.ts";
import { calcShearArea } from "../lib/frpSectionProperties.ts";
import { checkLadder, checkStair, checkWalkway, moldedGratingClearOpening } from "../lib/accessGeometry.ts";
import { barSize, gfrpDesignValues, matchGfrpSize } from "../lib/gfrpRebar.ts";
import { calculateCutList, cutListError, parsePieceList } from "../lib/cutList.ts";
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

test("guardrail presets for the UK, Canada and Australia", () => {
  const { checkGuardrail, guardLoadCase, GUARD_LOAD_CASES, GUARD_SECTIONS } = loadProjectModule("lib/guardrailLoads.ts");
  const shs = GUARD_SECTIONS.find((item) => item.id === "shs-50-6.4").section;
  const base = { heightMm: 1100, spacingMm: 1500, post: shs, rail: shs, materialId: "frp-e23", method: "asd", envId: "indoor-dry" };
  // BS 6180 / UK NA.8: 0.74 kN/m line load only, no top-rail point load.
  const uk = checkGuardrail({ ...base, caseId: "uk-industrial" });
  near(uk.post.serviceForceKn, 0.74 * 1.5, 1e-12);
  near(uk.pointKn, 0);
  // NBC 4.1.5.14 equipment access: 1.0 kN anywhere, no line load.
  const ca = checkGuardrail({ ...base, caseId: "ca-nbc-equipment" });
  near(ca.post.serviceForceKn, 1.0);
  assert.equal(ca.post.governingLoad, "point");
  const caGeneral = checkGuardrail({ ...base, caseId: "ca-nbc-general" });
  near(caGeneral.post.serviceForceKn, Math.max(0.75 * 1.5, 1.0), 1e-12);
  // AS 1657: 0.35 kN/m or 0.6 kN, 900–1100 mm, 100 mm deflection.
  const as1657 = guardLoadCase("au-as1657");
  assert.equal(as1657.defaultHeightMm, 1000);
  const au = checkGuardrail({ ...base, caseId: "au-as1657", heightMm: 1000 });
  near(au.post.serviceForceKn, 0.6);
  assert.equal(au.flags.heightBelowMin, false);
  assert.equal(checkGuardrail({ ...base, caseId: "au-as1657", heightMm: 1150 }).flags.heightAboveMax, true);
  // Every region keeps an enter-your-own option for other occupancies.
  for (const region of ["UK", "CA", "AU", "NZ"]) {
    assert.ok(GUARD_LOAD_CASES.some((item) => item.region === region && item.userEntry), region);
  }
  // Rows checked only against secondary sources say so in their notes.
  for (const id of ["uk-industrial", "uk-light-industrial", "au-as1657"]) {
    assert.ok(guardLoadCase(id).notes.some((note) => /confirm/.test(note)), id);
  }
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

  const as1657 = Object.fromEntries(checkLadder({ ...ladder, code: "as1657", rungPitchMm: 280, clearWidthMm: 450, toeClearanceMm: 200 }).map((check) => [check.label, check.status]));
  assert.equal(as1657["Rung spacing"], "pass");
  assert.equal(as1657["Clear width between stiles"], "pass");
  assert.equal(as1657["Clearance behind the rungs"], "pass");
  assert.equal(as1657["Fall protection and landings"], "advice", "published summaries disagree on the AS 1657 cage height");
  const asNarrow = Object.fromEntries(checkLadder({ ...ladder, code: "as1657", rungPitchMm: 320, clearWidthMm: 360 }).map((check) => [check.label, check.status]));
  assert.equal(asNarrow["Rung spacing"], "fail");
  assert.equal(asNarrow["Clear width between stiles"], "fail");
  const asStair = Object.fromEntries(checkStair({ code: "as1657", riserMm: 180, goingMm: 250, widthMm: 550, headroomMm: 2100, flightRiseMm: 3600 }).map((check) => [check.label, check.status]));
  assert.equal(asStair["Step formula 2R + G"], "pass", "360 + 250 = 610 mm");
  assert.equal(asStair["Risers in one flight"], "fail", "3600 / 180 = 20 risers");
  assert.equal(asStair["Clear width"], "advice");

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

test("cut list: kerf, trim, lower bound and the stock comparison", () => {
  // Two 3000 mm pieces need 6003 mm with a 3 mm kerf, so each takes a bar.
  const kerf = calculateCutList({ stockLengthMm: 6000, kerfMm: 3, trimMm: 0, pieces: [{ lengthMm: 3000, qty: 4 }] });
  assert.equal(kerf.bars, 4);
  // Without a kerf they pair up exactly, with no offcut.
  const exact = calculateCutList({ stockLengthMm: 6000, kerfMm: 0, trimMm: 0, pieces: [{ lengthMm: 3000, qty: 4 }] });
  assert.equal(exact.bars, 2);
  assert.equal(exact.provenMinimum, true);
  assert.equal(exact.patterns[0].offcutMm, 0);
  near(exact.wastePercent, 0);

  const mixed = calculateCutList({ stockLengthMm: 6000, kerfMm: 3, trimMm: 5, pieces: [{ lengthMm: 2400, qty: 12 }, { lengthMm: 1150, qty: 12 }, { lengthMm: 900, qty: 30, label: "rung" }] });
  assert.equal(mixed.pieceCount, 54);
  near(mixed.requiredMm, 2400 * 12 + 1150 * 12 + 900 * 30);
  assert.ok(mixed.bars >= mixed.lowerBound);
  assert.equal(mixed.patterns.reduce((sum, pattern) => sum + pattern.count, 0), mixed.bars);
  // Every pattern fits: pieces + kerfs between them ≤ stock − 2 × trim.
  for (const pattern of mixed.patterns) {
    const used = pattern.cuts.reduce((sum, cut) => sum + cut, 0) + (pattern.cuts.length - 1) * 3;
    assert.ok(used <= 6000 - 10 + 1e-9, pattern.cuts.join("+"));
  }
  // All pieces are cut, no more and no fewer.
  const cut = new Map();
  for (const pattern of mixed.patterns) for (const length of pattern.cuts) cut.set(length, (cut.get(length) ?? 0) + pattern.count);
  assert.deepEqual(Object.fromEntries(cut), { 2400: 12, 1150: 12, 900: 30 });
  near(mixed.wasteMm, mixed.orderedMm - mixed.requiredMm, 1e-6);

  // A piece longer than the usable length is refused, with the usable length named.
  assert.match(cutListError({ stockLengthMm: 6000, kerfMm: 3, trimMm: 10, pieces: [{ lengthMm: 5990, qty: 1 }] }), /usable 5980 mm/);
  assert.match(cutListError({ stockLengthMm: 6000, kerfMm: 3, trimMm: 0, pieces: [{ lengthMm: 1000, qty: 1.5 }] }), /whole-number quantity/);
  assert.equal(calculateCutList({ stockLengthMm: 6000, kerfMm: 3, trimMm: 0, pieces: [] }), null);
});

test("cut list: pasted lists from text or a spreadsheet", () => {
  const { pieces, skipped } = parsePieceList("2400 x 12 Top rail\n1150\t24\tPost\n900,30\nnotes\n94.5 × 6");
  assert.deepEqual(pieces, [
    { lengthMm: 2400, qty: 12, label: "Top rail" },
    { lengthMm: 1150, qty: 24, label: "Post" },
    { lengthMm: 900, qty: 30 },
    { lengthMm: 94.5, qty: 6 },
  ]);
  assert.deepEqual(skipped, ["notes"]);
});

test("column screen: shear-corrected Euler, plate buckling and crushing", () => {
  const { checkColumn, maxColumnLength, lightestPassing, columnInputError } = loadProjectModule("lib/frpColumn.ts");
  const base = { lengthMm: 3000, K: 1, weakAxisDivisor: 1, loadKn: 20, materialId: "frp-e23", method: "lrfd-asce", envId: "indoor-dry", durationId: "occupancy" };
  const ibeam = { shape: "i-beam", h: 200, b: 100, tf: 10, tw: 10 };
  const r = checkColumn({ ...base, section: ibeam });
  const byMode = Object.fromEntries(r.modes.map((mode) => [mode.mode, mode]));
  // Weak axis: Iy = (2·10·100³ + 180·10³)/12, Euler with the Engesser shear term.
  const Iy = (2 * 10 * 100 ** 3 + 180 * 10 ** 3) / 12;
  const PE = (Math.PI ** 2 * 23000 * Iy) / 3000 ** 2;
  const Av = (5 / 6) * 2 * 100 * 10;
  near(byMode["global-y"].nominalKn, PE / (1 + PE / (3500 * Av)) / 1000, 1e-9);
  // Flange outstand b = 50 mm: G_LT (t/b)².
  near(byMode["local-flange"].stressMPa, 3500 * (10 / 50) ** 2, 1e-9);
  // Web at the centerline depth 190 mm, both edges simply supported.
  near(byMode["local-web"].stressMPa, (Math.PI ** 2 / 6) * (10 / 190) ** 2 * (Math.sqrt(23000 * 7000) + 0.3 * 7000 + 2 * 3500), 1e-9);
  near(byMode.crushing.stressMPa, 200);
  // Every mode takes φ 0.65 × λ 0.8 on the ASCE-style screen; the load takes 1.6.
  near(byMode.crushing.designKn, byMode.crushing.nominalKn * 0.65 * 0.8, 1e-9);
  near(r.factoredLoadKn, 32);
  assert.equal(r.governing.mode, "global-y");
  // Bracing at mid-height halves the weak-axis length and lifts that mode.
  const braced = checkColumn({ ...base, section: ibeam, weakAxisDivisor: 2 });
  assert.ok(braced.modes.find((mode) => mode.mode === "global-y").nominalKn > 3.5 * byMode["global-y"].nominalKn);

  // A 12 in wide-flange is governed by its flange outstands, not the length.
  const wide = checkColumn({ ...base, section: { shape: "i-beam", h: 305, b: 305, tf: 12.7, tw: 12.7 } });
  assert.equal(wide.governing.mode, "local-flange");

  // Outdoor knockdown reaches crushing but not stiffness.
  const outdoor = checkColumn({ ...base, section: ibeam, envId: "outdoor" });
  near(outdoor.modes.find((mode) => mode.mode === "crushing").stressMPa, 170);
  near(outdoor.modes.find((mode) => mode.mode === "global-y").stressMPa, byMode["global-y"].stressMPa);

  // Longest passing length sits on utilization 1.
  const tube = { shape: "rect-tube", h: 100, b: 100, tf: 8, tw: 8 };
  const longest = maxColumnLength({ ...base, section: tube });
  near(checkColumn({ ...base, section: tube, lengthMm: longest }).utilisation, 1, 1e-6);
  assert.equal(maxColumnLength({ ...base, section: { shape: "i-beam", h: 305, b: 305, tf: 12.7, tw: 12.7 }, loadKn: 400 }), null, "local buckling does not improve with a shorter column");

  const picks = lightestPassing(base, 4);
  assert.ok(picks.length > 0);
  for (let i = 1; i < picks.length; i += 1) assert.ok(picks[i].product.weight >= picks[i - 1].product.weight);
  assert.ok(picks.every((pick) => pick.utilisation <= 1));

  assert.match(columnInputError({ ...base, section: ibeam, materialId: "steel-s355" }), /FRP material/);
  assert.match(columnInputError({ ...base, section: { shape: "rect-tube", h: 50, b: 50, tf: 30, tw: 30 } }), /too thick/);
});

test("unit converter: exact factors, temperature offsets and inch sizes", () => {
  const { convertAll, parseInches, inchSizeToCatalog, QUANTITIES } = loadProjectModule("lib/unitConverter.ts");
  const to = (quantity, value, from, unit) => convertAll(quantity, value, from).find((row) => row.unit.id === unit).value;
  near(to("stress", 1, "ksi", "MPa"), 6.894757293168, 1e-9);
  near(to("modulus", 1, "Msi", "GPa"), 6.894757293168, 1e-9);
  near(to("force", 200, "lbf", "kN"), 0.88964432305, 1e-9);
  near(to("line-load", 50, "lbf/ft", "kN/m"), 0.72969514, 1e-6);
  near(to("pressure", 40, "psf", "kPa"), 1.91521, 1e-5);
  near(to("mass-length", 1, "lb/ft", "kg/m"), 1.48816394, 1e-8);
  near(to("inertia", 1, "in4", "mm4"), 25.4 ** 4, 1e-6);
  near(to("temperature", -40, "C", "F"), -40, 1e-9);
  near(to("temperature", 212, "F", "C"), 100, 1e-9);
  near(to("u-value", 1, "Btu/hft2F", "W/m2K"), 5.678263, 1e-6);
  near(to("r-value", 1, "hft2F/Btu", "m2K/W"), 0.1761102, 1e-7);
  near(to("expansion", 8, "1e-6/K", "1e-6/F"), 8 / 1.8, 1e-9);
  // Round trip through every unit returns the input.
  for (const quantity of QUANTITIES) {
    for (const unit of quantity.units) {
      const back = convertAll(quantity.id, to(quantity.id, 3.7, quantity.units[0].id, unit.id), unit.id)[0].value;
      near(back, 3.7, 1e-9);
    }
  }
  assert.deepEqual(["4", "1/4", "1-1/2", "1 1/2", '3/8"', "0.375 in", "x", "1/0"].map(parseInches), [4, 0.25, 1.5, 1.5, 0.375, 0.375, null, null]);
  const wf = inchSizeToCatalog("i-beam", 12, 12, 0.5);
  assert.equal(wf.product.model, "I 305×305×12.7");
  assert.equal(wf.exact, true);
  const shs = inchSizeToCatalog("square-tube", 4, 4, 0.25);
  assert.equal(shs.product.model, "SHS 100×100×6");
  assert.equal(shs.exact, false, "6 mm against a 6.35 mm wall is more than 2% off");
});

test("life-cycle cost: present values, events, residual credit and galvanizing life", () => {
  const { calculateLcc, galvanizingLife, lccInputError } = loadProjectModule("lib/lifeCycleCost.ts");
  // ISO 9223 zinc rates with the ISO 1461 85 µm coating.
  const c5 = galvanizingLife("C5", 85);
  near(c5.shortYears, 85 / 8.4);
  near(c5.longYears, 85 / 4.2);
  near(c5.midYears, 85 / 6.3);
  near(galvanizingLife("C3", 85).shortYears, 85 / 2.1);

  const option = (label, initial, first, interval, cost, annual = 0, life = 0) => ({ label, initial, firstMaintenanceYear: first, maintenanceInterval: interval, maintenanceCost: cost, annualCost: annual, serviceLife: life });
  const base = { studyYears: 30, discountPercent: 3, downtimePerEvent: 0, residualValue: true };
  const r = calculateLcc({ ...base, frp: option("FRP", 130, 25, 25, 10), steel: option("Steel", 100, 13, 15, 40) });
  assert.deepEqual(r.steel.events.map((event) => event.year), [13, 28]);
  near(r.steel.total, 100 + 40 / 1.03 ** 13 + 40 / 1.03 ** 28, 1e-9);
  near(r.frp.total, 130 + 10 / 1.03 ** 25, 1e-9);
  near(r.saving, r.steel.total - r.frp.total, 1e-12);
  assert.equal(r.breakEvenYear, 28);
  near(r.steel.cumulative[30], r.steel.total, 1e-9);

  // Undiscounted: replacement at 20, one maintenance per life, half a life credited back.
  const flat = calculateLcc({ ...base, discountPercent: 0, downtimePerEvent: 5, frp: option("FRP", 100, 0, 0, 0, 1), steel: option("Steel", 100, 10, 10, 20, 0, 20) });
  assert.deepEqual(flat.steel.events.map((event) => [event.kind, event.year]), [["maintenance", 10], ["replacement", 20]]);
  near(flat.steel.residual, 50);
  near(flat.steel.total, 100 + 20 + 100 + 2 * 5 - 50);
  near(flat.frp.total, 130);
  near(flat.steel.annualized, flat.steel.total / 30);

  assert.match(lccInputError({ ...base, studyYears: 0, frp: option("FRP", 1, 0, 0, 0), steel: option("Steel", 1, 0, 0, 0) }), /study period/);
  assert.match(lccInputError({ ...base, frp: option("FRP", 0, 0, 0, 0), steel: option("Steel", 1, 0, 0, 0) }), /FRP: enter the installed cost/);
});
