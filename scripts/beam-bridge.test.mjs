import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateBeamBridge,
  DEFAULT_BEAM_BRIDGE_INPUTS,
  getBeamBridgeInputError,
} from "../lib/engineering/beam-bridge.ts";

function near(actual, expected, relativeTolerance = 1e-10) {
  assert.ok(
    Math.abs(actual - expected) <= relativeTolerance * Math.max(1, Math.abs(expected)),
    `${actual} should equal ${expected}`,
  );
}

test("area-load conversion and equal girder distribution conserve applied load", () => {
  const result = calculateBeamBridge(DEFAULT_BEAM_BRIDGE_INPUTS);
  near(result.totalAreaLoadKNm2, 6);
  near(result.tributaryWidthM, 2.15 / 3);
  near(result.totalLineLoadKNm, 12.9);
  near(result.perGirderLineLoadKNm, 4.3);
  near(result.perGirderLineLoadNmm, 4.3);
  near(result.spanMm, 4000);
  near(result.modulusMPa, 23000);
  near(result.totalAppliedLoadKN, 51.6);
  near(result.perGirderAppliedLoadKN * 3, result.totalAppliedLoadKN);
  near(result.perGirderEndReactionKN * 2 * 3, result.totalAppliedLoadKN);
  near(result.wholeBridgeEndReactionKN, 25.8);
});

test("default case reproduces an independently hand-calculated load diagram", () => {
  const result = calculateBeamBridge(DEFAULT_BEAM_BRIDGE_INPUTS);
  near(result.perGirderEndReactionKN, 8.6);
  near(result.perGirderMaxShearKN, 8.6);
  near(result.perGirderMaxMomentKNm, 8.6);
  near(result.bendingDeflectionMm, 6.231884057971015);
  near(result.referenceDeflectionMm, 13.333333333333334);
  near(result.requiredSecondMomentMm4, 46_739_130.43478261);
});

test("bending deflection agrees with virtual-work integration in independent SI units", () => {
  const input = { ...DEFAULT_BEAM_BRIDGE_INPUTS, spanM: 7.3, widthM: 2.8, girderCount: 4 };
  const result = calculateBeamBridge(input);
  const length = input.spanM;
  const loadNPerM = (input.permanentLoadKNm2 + input.variableLoadKNm2) * input.widthM / input.girderCount * 1000;
  const ePa = input.longitudinalModulusGPa * 1e9;
  const iM4 = input.secondMomentMm4 * 1e-12;
  const slices = 1000;
  const step = length / slices;
  let integral = 0;

  // Simpson integration of M(x)·m(x)/(EI). m comes from a unit midspan load.
  for (let index = 0; index <= slices; index += 1) {
    const x = index * step;
    const reactionN = loadNPerM * length / 2;
    const momentNm = reactionN * x - loadNPerM * x * x / 2;
    const unitMomentM = Math.min(x, length - x) / 2;
    const coefficient = index === 0 || index === slices ? 1 : index % 2 ? 4 : 2;
    integral += coefficient * momentNm * unitMomentM / (ePa * iM4);
  }

  near(result.bendingDeflectionMm, integral * step / 3 * 1000);
});

test("span changes scale moment by L², deflection by L⁴ and reference stiffness by L³", () => {
  const short = calculateBeamBridge(DEFAULT_BEAM_BRIDGE_INPUTS);
  for (const spanM of [6, 12]) {
    const result = calculateBeamBridge({ ...DEFAULT_BEAM_BRIDGE_INPUTS, spanM });
    const ratio = spanM / DEFAULT_BEAM_BRIDGE_INPUTS.spanM;
    near(result.perGirderMaxMomentKNm / short.perGirderMaxMomentKNm, ratio ** 2);
    near(result.bendingDeflectionMm / short.bendingDeflectionMm, ratio ** 4);
    near(result.requiredSecondMomentMm4 / short.requiredSecondMomentMm4, ratio ** 3);
  }
});

test("required I gives the selected bending reference without implying other design checks", () => {
  for (const spanM of [4, 6, 12]) {
    const input = { ...DEFAULT_BEAM_BRIDGE_INPUTS, spanM };
    const result = calculateBeamBridge(input);
    const resized = calculateBeamBridge({ ...input, secondMomentMm4: result.requiredSecondMomentMm4 });
    near(resized.bendingDeflectionMm, result.referenceDeflectionMm);
  }
});

test("changing girder count redistributes load while preserving bridge reactions", () => {
  const three = calculateBeamBridge(DEFAULT_BEAM_BRIDGE_INPUTS);
  const six = calculateBeamBridge({ ...DEFAULT_BEAM_BRIDGE_INPUTS, girderCount: 6 });
  near(six.wholeBridgeEndReactionKN, three.wholeBridgeEndReactionKN);
  near(six.bendingDeflectionMm * 2, three.bendingDeflectionMm);
  near(six.perGirderMaxMomentKNm * 2, three.perGirderMaxMomentKNm);
});

test("zero service loads give zero response and invalid inputs are rejected", () => {
  const zero = calculateBeamBridge({ ...DEFAULT_BEAM_BRIDGE_INPUTS, permanentLoadKNm2: 0, variableLoadKNm2: 0 });
  assert.equal(zero.bendingDeflectionMm, 0);
  assert.equal(zero.requiredSecondMomentMm4, 0);
  assert.equal(zero.perGirderMaxMomentKNm, 0);

  for (const [key, value] of [
    ["spanM", 0], ["widthM", -1], ["girderCount", 0], ["girderCount", 2.5],
    ["permanentLoadKNm2", -1], ["variableLoadKNm2", Number.NaN],
    ["longitudinalModulusGPa", 0], ["secondMomentMm4", Number.POSITIVE_INFINITY],
    ["deflectionLimitDenominator", 0],
  ]) {
    const input = { ...DEFAULT_BEAM_BRIDGE_INPUTS, [key]: value };
    assert.ok(getBeamBridgeInputError(input), `${key} must be rejected`);
    assert.throws(() => calculateBeamBridge(input), RangeError);
  }
  assert.throws(() => calculateBeamBridge({ ...DEFAULT_BEAM_BRIDGE_INPUTS, spanM: 1e100 }), /numerical range/);
});
