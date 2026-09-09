/**
 * Preliminary, short-term Euler–Bernoulli response of one straight, prismatic,
 * simply supported girder under a full-span uniform service load. The model
 * assumes small deflections; very large outputs are outside that assumption.
 *
 * Uniform deck loading is shared equally between identical girders. This is a
 * stated teaching assumption, not a transverse-distribution analysis. Permanent
 * load must include all dead load expressed over the loaded deck area.
 *
 * E and I describe ONE girder. No composite action is inferred from a deck,
 * bonded webs or an adjacent girder. The A/B/D concept sections are not sized here.
 *
 * Bending deflection excludes shear deformation, creep and joint slip and can
 * therefore underestimate total movement. Strength, buckling, vibration, fatigue,
 * connections, barriers, bearings and foundations require separate design.
 * No result is a pass/fail judgement or confirmation of a bridge configuration.
 */
export type BeamBridgeInputs = {
  spanM: number;
  widthM: number;
  girderCount: number;
  permanentLoadKNm2: number;
  variableLoadKNm2: number;
  longitudinalModulusGPa: number;
  secondMomentMm4: number;
  deflectionLimitDenominator: number;
};

/** Every default is an illustrative assumption, not project or certified data. */
export const DEFAULT_BEAM_BRIDGE_INPUTS: Readonly<BeamBridgeInputs> = Object.freeze({
  spanM: 4,
  widthM: 2.15,
  girderCount: 3,
  permanentLoadKNm2: 1,
  variableLoadKNm2: 5,
  longitudinalModulusGPa: 23,
  secondMomentMm4: 100_000_000,
  deflectionLimitDenominator: 300,
});

export const BEAM_BRIDGE_METHOD_SOURCES = [
  {
    label: "University of South Florida — uniform-load beam deflection",
    href: "https://kaw.eng.usf.edu/compositesOCW/WorkedOutExamples/Section%201.1%20Introduction/Bending_E_raised_to_onethird_by_density/Bending_E_raised_to_onethird_by_density.html",
  },
  {
    label: "AISC design examples — required second moment of area (F-7)",
    href: "https://www.aisc.org/globalassets/aisc/manual/v15.1-companion/v15.1_vol-1_design-examples.pdf",
  },
] as const;

export type BeamBridgeResult = {
  spanMm: number;
  modulusMPa: number;
  totalAreaLoadKNm2: number;
  tributaryWidthM: number;
  totalLineLoadKNm: number;
  perGirderLineLoadKNm: number;
  perGirderLineLoadNmm: number;
  /** Load across the full deck width of this one modeled span. */
  totalAppliedLoadKN: number;
  perGirderAppliedLoadKN: number;
  perGirderEndReactionKN: number;
  perGirderMaxShearKN: number;
  perGirderMaxMomentKNm: number;
  /** All girder reactions at one end of this span, not an interior-pier total. */
  wholeBridgeEndReactionKN: number;
  bendingDeflectionMm: number;
  referenceDeflectionMm: number;
  requiredSecondMomentMm4: number;
};

export function getBeamBridgeInputError(input: BeamBridgeInputs): string | null {
  const positiveInputs: Array<[number, string]> = [
    [input.spanM, "Support span"],
    [input.widthM, "Loaded deck width"],
    [input.longitudinalModulusGPa, "Longitudinal modulus"],
    [input.secondMomentMm4, "Second moment of area"],
    [input.deflectionLimitDenominator, "Reference deflection denominator"],
  ];

  for (const [value, label] of positiveInputs) {
    if (!Number.isFinite(value) || value <= 0) {
      return `${label} must be a finite number greater than zero.`;
    }
  }

  if (!Number.isSafeInteger(input.girderCount) || input.girderCount < 1) {
    return "Girder count must be a positive whole number.";
  }

  for (const [value, label] of [
    [input.permanentLoadKNm2, "Permanent area load"],
    [input.variableLoadKNm2, "Variable area load"],
  ] as const) {
    if (!Number.isFinite(value) || value < 0) {
      return `${label} must be a finite number of zero or more.`;
    }
  }

  return null;
}

/**
 * Equilibrium gives R = Vmax = wL/2 and Mmax = wL²/8.
 * Integrating EI·v'' = M with zero end deflection gives δb = 5wL⁴/(384EI).
 * Ireq = 5wL⁴/(384Eδref) is a bending-only reference, not a section selection.
 *
 * Unit trace: kN/m² × m = kN/m = N/mm; m × 1000 = mm;
 * GPa × 1000 = MPa = N/mm²; kN·m × 10⁶ = N·mm.
 */
export function calculateBeamBridge(input: BeamBridgeInputs): BeamBridgeResult {
  const inputError = getBeamBridgeInputError(input);
  if (inputError) throw new RangeError(inputError);

  const spanMm = input.spanM * 1000;
  const modulusMPa = input.longitudinalModulusGPa * 1000;
  const totalAreaLoadKNm2 = input.permanentLoadKNm2 + input.variableLoadKNm2;
  const tributaryWidthM = input.widthM / input.girderCount;
  const totalLineLoadKNm = totalAreaLoadKNm2 * input.widthM;
  const perGirderLineLoadKNm = totalLineLoadKNm / input.girderCount;
  const perGirderLineLoadNmm = perGirderLineLoadKNm;
  const totalAppliedLoadKN = totalLineLoadKNm * input.spanM;
  const perGirderAppliedLoadKN = perGirderLineLoadKNm * input.spanM;
  const perGirderEndReactionKN = perGirderAppliedLoadKN / 2;
  const referenceDeflectionMm = spanMm / input.deflectionLimitDenominator;
  const deflectionNumerator = 5 * perGirderLineLoadNmm * spanMm ** 4;

  const result: BeamBridgeResult = {
    spanMm,
    modulusMPa,
    totalAreaLoadKNm2,
    tributaryWidthM,
    totalLineLoadKNm,
    perGirderLineLoadKNm,
    perGirderLineLoadNmm,
    totalAppliedLoadKN,
    perGirderAppliedLoadKN,
    perGirderEndReactionKN,
    perGirderMaxShearKN: perGirderEndReactionKN,
    perGirderMaxMomentKNm: perGirderLineLoadKNm * input.spanM ** 2 / 8,
    wholeBridgeEndReactionKN: totalAppliedLoadKN / 2,
    bendingDeflectionMm: deflectionNumerator / (384 * modulusMPa * input.secondMomentMm4),
    referenceDeflectionMm,
    requiredSecondMomentMm4: deflectionNumerator / (384 * modulusMPa * referenceDeflectionMm),
  };

  if (Object.values(result).some((value) => !Number.isFinite(value))) {
    throw new RangeError("Inputs exceed the numerical range of this preliminary model.");
  }

  return result;
}
