"use client";

import { useState, useEffect } from "react";
import SectionTag from "@/components/ui/SectionTag";
import { track, ResultLeadCapture } from "@/components/calculators/leadCapture";
import SectionPreview from "@/components/calculators/section/SectionPreview";
import type { FrpSectionShape } from "@/lib/frpSectionProperties";
import { METHOD_MATERIALS, PROFILE_LOAD_CASES, DEFAULT_BEAM_INPUTS, DEFAULT_EQ_INPUTS, calculateBeam, calculateEquivalence, type BeamInputs, type EquivalenceInputs, type ProfileInputs, type ProfileLoadType } from "@/lib/profileCalculation";
import { createProfileSnapshot, parseProfileSnapshot, type ProfileCalculationSnapshot } from "@/lib/profileCalculationSnapshot";
import { buildRfqHref } from "@/lib/rfq";
import { findStandardProfile, nearestStandardProfile } from "@/lib/catalog/standardProfiles";
import { buildToolStateHref, readToolStateParams } from "@/lib/toolStateUrl";
import {
  DESIGN_MATERIALS,
  DESIGN_METHODS,
  ENV_FACTORS,
  LOAD_DURATIONS,
  designResistance,
  type DesignMaterial,
  type DesignMethod,
} from "@/lib/frpDesignBasis";

/* Materials, design methods, environment and load-duration factors come from
   the shared design basis (lib/frpDesignBasis.ts), which the span tables and
   the handrail load check also use.

   Orthotropic terminology:
     E_L  = longitudinal modulus (fiber direction; governs pultruded beam stiffness)
     E_T  = transverse modulus (~0.25–0.35 × E_L for E-glass pultruded)
     G_LT = in-plane shear modulus (~3–4 GPa for pultruded GFRP; drives shear deflection)
     F_tL = longitudinal tensile strength (characteristic)
     F_cL = longitudinal compressive strength (characteristic)
     F_vLT= shear strength (characteristic)
   For isotropic metals these reduce to E_L = E_T = E and a single yield σ. */

type Material = DesignMaterial;
const materials = DESIGN_MATERIALS;

/* Editable characteristic inputs. Initial values are examples rather than a
   qualified material grade; no parameters are inferred from an E-grade label. */
type CustomMat = {
  E: number; E_T: number; G_LT: number; sigma: number; sigma_c: number; tau: number; density: number;
};
const CUSTOM_DEFAULT: CustomMat = {
  E: 40, E_T: 10, G_LT: 4, sigma: 400, sigma_c: 350, tau: 40, density: 2.0,
};
const CUSTOM_FIELDS: { key: keyof CustomMat; label: string; step: string }[] = [
  { key: "E", label: "E_L (GPa)", step: "1" },
  { key: "E_T", label: "E_T (GPa)", step: "0.5" },
  { key: "G_LT", label: "G_LT (GPa)", step: "0.5" },
  { key: "sigma", label: "F_tL (MPa)", step: "10" },
  { key: "sigma_c", label: "F_cL (MPa)", step: "10" },
  { key: "tau", label: "F_vLT (MPa)", step: "1" },
  { key: "density", label: "ρ (g/cm³)", step: "0.05" },
];

/* Editable panel for the user-defined FRP grade. Shared by both the beam-analysis
   Material selector and the equivalence Target-FRP selector, so a single custom
   recipe (e.g. E40) is defined once and referenced from either mode. */
function CustomGradeInputs({
  mat, setMat, inputClass, labelClass,
}: {
  mat: CustomMat;
  setMat: (updater: (m: CustomMat) => CustomMat) => void;
  inputClass: string;
  labelClass: string;
}) {
  return (
    <div className="rounded-control border border-teal/30 bg-white p-[12px] space-y-[8px]">
      <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">
        Custom FRP grade — your parameters (e.g. E40)
      </div>
      <div className="grid grid-cols-2 gap-[8px] sm:grid-cols-4">
        {CUSTOM_FIELDS.map((f) => (
          <div key={f.key}>
            <label className={labelClass}>{f.label}</label>
            <input
              type="number"
              min="0.001"
              step={f.step}
              value={mat[f.key]}
              onChange={(e) => setMat((m) => ({ ...m, [f.key]: +e.target.value }))}
              className={inputClass}
            />
          </div>
        ))}
      </div>
      <p className="text-f12 text-t3">
        These are your own characteristic values — not a published standard row.
        The starting values are editable examples, not a qualified material grade.
        Replace every property with project-specific evidence and confirm with engineering before design use.
      </p>
    </div>
  );
}

const designMethods = DESIGN_METHODS;

/* EN 13706 is a product standard, so its grade minimums can serve as the
   characteristic inputs of either design method. GB datasets stay with GB
   factors; the custom grade stays on the ASD screen. */

const DEFAULT_MATERIAL_BY_METHOD: Record<DesignMethod, string> = {
  "lrfd-asce": "frp-asce-std",
  "lrfd-cents19101": "frp-e23",
  "lrfd-gb50608": "frp-gb50608-i",
  "asd": "frp-e23",
};

const envFactors = ENV_FACTORS;

/* factor_s = load-case constant c in the exact shear-deflection ratio
   δ_shear/δ_bending = c·E·I / (G·A_v·L²), derived from each case's closed-form
   δ_s (UDL midspan: wL²/8GA_v ÷ 5wL⁴/384EI → 9.6; midspan point: 12;
   cantilever tip point: 3; cantilever UDL: 4). */
const loadTypes = PROFILE_LOAD_CASES;

const profileShapes = [
  { id: "i-beam", label: "I-Beam / Wide Flange" },
  { id: "channel", label: "Channel (U-Profile)" },
  { id: "angle", label: "Angle (L-Profile)" },
  { id: "square-tube", label: "Square / Rectangular Tube" },
  { id: "round-tube", label: "Round Tube" },
];

/* Calculator shape → live F1 product page, so a finished calculation routes the
   user straight to the matching product (with the computed spec carried into the
   RFQ). Slugs are the real /products/fiberglass-structural-shapes/* sub-pages. */
const PRODUCT_BY_SHAPE: Record<string, { slug: string; family: string }> = {
  "i-beam": { slug: "frp-i-beam", family: "FRP I-beams & wide-flange profiles" },
  "channel": { slug: "frp-channel", family: "FRP channels (U-profiles)" },
  "angle": { slug: "frp-angle", family: "FRP angles (L-profiles)" },
  "square-tube": { slug: "frp-square-tube", family: "FRP square & rectangular tubes" },
  "round-tube": { slug: "frp-tube", family: "FRP round tubes" },
};

/* One-click scenarios that pre-load the most common FRP selection problems —
   lowers activation energy and each maps to a real F1 application. */
type Preset = {
  id: string; label: string; shape: string; span: number; load: number; loadType: string;
  matKey: string; envKey: string; deflLimit: number;
  dimH: number; dimB: number; dimTw: number; dimTf: number; designMethod: DesignMethod;
};
const PRESETS: Preset[] = [
  { id: "walkway", label: "Walkway beam", shape: "i-beam", span: 3000, load: 5, loadType: "udl", matKey: "frp-asce-std", envKey: "outdoor", deflLimit: 360, dimH: 240, dimB: 120, dimTw: 12, dimTf: 12, designMethod: "lrfd-asce" },
  { id: "solar", label: "Solar purlin", shape: "square-tube", span: 2200, load: 2.5, loadType: "udl", matKey: "frp-asce-std", envKey: "outdoor", deflLimit: 180, dimH: 100, dimB: 100, dimTw: 6, dimTf: 6, designMethod: "lrfd-asce" },
  { id: "cabletray", label: "Cable-tray support", shape: "channel", span: 1500, load: 2, loadType: "udl", matKey: "frp-asce-std", envKey: "chemical", deflLimit: 200, dimH: 100, dimB: 50, dimTw: 6, dimTf: 6, designMethod: "lrfd-asce" },
  { id: "platform", label: "Platform bearer", shape: "i-beam", span: 1800, load: 10, loadType: "udl", matKey: "frp-asce-std", envKey: "outdoor", deflLimit: 360, dimH: 200, dimB: 100, dimTw: 10, dimTf: 10, designMethod: "lrfd-asce" },
];

/* Standard wall thicknesses (mm) offered as quick-select, per material family.
   Steel/aluminum feed the SOURCE profile; FRP feeds the equivalence TARGET
   (a chosen FRP wall then reverse-solves the H×B — FRP is sold in specific
   wall thicknesses, so sizing to a real wall beats an arbitrary scaled one). */
const STD_WALLS = {
  steel: [3, 4, 5, 6, 8, 10, 12, 16],
  alu: [2, 2.5, 3, 4, 5, 6, 8, 10],
  frp: [3, 4, 5, 6, 8, 10, 12],
};

function screenSnapshot(inputs: ProfileInputs): { snapshot: ProfileCalculationSnapshot | null; error: string | null } {
  try { return { snapshot: createProfileSnapshot(inputs), error: null }; }
  catch (error) { return { snapshot: null, error: error instanceof Error ? error.message : "Unsupported calculation inputs." }; }
}
const FALLBACK_BEAM = calculateBeam(DEFAULT_BEAM_INPUTS);
const FALLBACK_EQ = calculateEquivalence(DEFAULT_EQ_INPUTS);

type Mode = "beam" | "equivalence";

export default function ProfileCalculator() {
  const [mode, setMode] = useState<Mode>("beam");

  // Beam state
  const [matKey, setMatKey] = useState("frp-asce-std");
  const [loadType, setLoadType] = useState("udl");
  const [span, setSpan] = useState(3000);
  const [load, setLoad] = useState(5);
  const [shape, setShape] = useState("i-beam");
  const [dimH, setDimH] = useState(200);
  const [dimB, setDimB] = useState(100);
  const [dimTw, setDimTw] = useState(10);
  const [dimTf, setDimTf] = useState(10);
  const [deflLimit, setDeflLimit] = useState(250);
  const [designMethod, setDesignMethod] = useState<DesignMethod>("lrfd-asce");
  const [envKey, setEnvKey] = useState("outdoor");
  // Load duration for the ASCE path (time-effect factor λ and ASCE 7 load factor).
  const [durationKey, setDurationKey] = useState<string>("occupancy");
  // User-defined FRP grade params, editable when matKey === "custom".
  const [customMat, setCustomMat] = useState<CustomMat>(CUSTOM_DEFAULT);

  // Equivalence state
  const [eqSourceMat, setEqSourceMat] = useState("steel-s235");
  const [eqTargetMat, setEqTargetMat] = useState("frp-e23");
  const [eqShape, setEqShape] = useState("i-beam");
  const [eqH, setEqH] = useState(200);
  const [eqB, setEqB] = useState(100);
  const [eqTw, setEqTw] = useState(8);
  const [eqTf, setEqTf] = useState(12);
  // Target FRP wall thickness: "auto" = proportional scale (legacy); a number =
  // pin the FRP wall and reverse-solve H×B to meet the equivalence at that wall.
  const [eqTargetWall, setEqTargetWall] = useState<number | "auto">("auto");
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");
  const [restoreError, setRestoreError] = useState("");

  /* Deep-link presets: prefer #shape&span&load&... so presets do not create
     crawlable URL variants; legacy query-string links remain supported. */
  useEffect(() => {
    /* One-time seed of state from the URL fragment (or a legacy query string).
       window is only available post-mount, so a lazy useState initializer
       would break SSR/prerender — reading it in an effect is the correct pattern
       here, and it no-ops (early return) for the common no-state case. */
    /* eslint-disable react-hooks/set-state-in-effect */
    const sp = readToolStateParams(window.location);
    if ([...sp.keys()].length === 0) return;
    const snapshotParam = sp.get("snapshot");
    if (snapshotParam) {
      try {
        const snapshot = parseProfileSnapshot(JSON.parse(snapshotParam));
        const input = snapshot.inputs, g = input.geometry;
        setMode(input.mode);
        if (input.customMaterial) setCustomMat(input.customMaterial);
        if (input.mode === "beam") {
          setShape(g.shape); setDimH(g.h); setDimB(g.b); setDimTw(g.tw); setDimTf(g.tf);
          setMatKey(input.materialId); setDesignMethod(input.method); setEnvKey(input.environmentId);
          setDurationKey(input.durationId); setLoadType(input.loadType); setSpan(input.spanMm);
          setLoad(input.serviceLoad); setDeflLimit(input.deflectionLimit);
        } else {
          setEqShape(g.shape); setEqH(g.h); setEqB(g.b); setEqTw(g.tw); setEqTf(g.tf);
          setEqSourceMat(input.sourceMaterialId); setEqTargetMat(input.targetMaterialId); setEqTargetWall(input.targetWallMm);
        }
      } catch (error) {
        setRestoreError(error instanceof Error ? error.message : "The shared calculation could not be restored.");
      }
      return;
    }
    const num = (k: string, set: (n: number) => void) => {
      const v = sp.get(k);
      if (v != null && v !== "" && Number.isFinite(+v)) set(+v);
    };
    const str = (k: string, set: (s: string) => void, allowed: string[]) => {
      const v = sp.get(k);
      if (v && allowed.includes(v)) set(v);
    };
    if (sp.get("mode") === "equivalence") setMode("equivalence");
    str("shape", setShape, profileShapes.map((s) => s.id));
    str("material", setMatKey, [...Object.keys(materials).filter((key) => materials[key].group === "FRP"), "custom"]);
    str("env", setEnvKey, envFactors.map((e) => e.id));
    str("load_type", setLoadType, loadTypes.map((l) => l.id));
    str("method", (v) => setDesignMethod(v as DesignMethod), Object.keys(designMethods));
    str("duration", setDurationKey, LOAD_DURATIONS.map((d) => d.id));
    num("span", setSpan); num("load", setLoad); num("defl", setDeflLimit);
    num("h", setDimH); num("b", setDimB); num("tw", setDimTw); num("tf", setDimTf);
    str("eq_source", setEqSourceMat, Object.keys(materials).filter((key) => materials[key].group === "Metal"));
    str("eq_target", setEqTargetMat, [...Object.keys(materials).filter((key) => materials[key].group === "FRP"), "custom"]);
    str("eq_shape", setEqShape, profileShapes.map((s) => s.id));
    num("eq_h", setEqH); num("eq_b", setEqB); num("eq_tw", setEqTw); num("eq_tf", setEqTf);
    const eqWall = sp.get("eq_wall");
    if (eqWall === "auto") setEqTargetWall("auto");
    else if (eqWall != null && STD_WALLS.frp.includes(+eqWall)) setEqTargetWall(+eqWall);
    // Custom FRP grade params (only meaningful when material=custom).
    const cu: Partial<CustomMat> = {};
    const cmap: [string, keyof CustomMat][] = [
      ["cE", "E"], ["cET", "E_T"], ["cG", "G_LT"],
      ["cFt", "sigma"], ["cFc", "sigma_c"], ["cFv", "tau"], ["cRho", "density"],
    ];
    for (const [q, key] of cmap) {
      const v = sp.get(q);
      if (v != null && v !== "" && Number.isFinite(+v)) cu[key] = +v;
    }
    if (Object.keys(cu).length) setCustomMat((m) => ({ ...m, ...cu }));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function applyPreset(p: Preset) {
    setMode("beam");
    setShape(p.shape); setSpan(p.span); setLoad(p.load); setLoadType(p.loadType);
    setMatKey(p.matKey); setEnvKey(p.envKey); setDeflLimit(p.deflLimit);
    setDimH(p.dimH); setDimB(p.dimB); setDimTw(p.dimTw); setDimTf(p.dimTf);
    setDesignMethod(p.designMethod);
    track("calculator_preset", { preset: p.id });
  }

  function changeDesignMethod(next: DesignMethod) {
    setDesignMethod(next);
    if (!METHOD_MATERIALS[next].includes(matKey)) {
      setMatKey(DEFAULT_MATERIAL_BY_METHOD[next]);
    }
  }

  async function copyShareLink() {
    const snapshot = mode === "beam" ? beamSnapshot : eqSnapshot;
    if (!snapshot) return;
    const href = buildToolStateHref("/frp-profile-calculator", { snapshot: JSON.stringify(snapshot) });
    const url = `${window.location.origin}${href}`;
    window.history.replaceState(null, "", href);
    try {
      await navigator.clipboard.writeText(url);
      setShareState("copied");
    } catch {
      setShareState("error");
    }
    window.setTimeout(() => setShareState("idle"), 2500);
    track("calculator_share", { mode, shape: mode === "beam" ? shape : eqShape });
  }

  function printResultReport() {
    track("calculator_print_report", { shape, material: matKey, mode });
    window.print();
  }

  /* ── Beam calculation ── */
  const mat: Material =
    matKey === "custom"
      ? { label: "Custom FRP grade (user-defined)", group: "FRP", standard: "User-defined characteristic inputs; not a certified grade", ...customMat }
      : materials[matKey];
  const lt = loadTypes.find((l) => l.id === loadType)!;
  const dm = designMethods[designMethod];
  const env = envFactors.find((e) => e.id === envKey)!;
  const isFRP = mat.group === "FRP";
  const isAsce = designMethod === "lrfd-asce";
  const duration = LOAD_DURATIONS.find((d) => d.id === durationKey) ?? LOAD_DURATIONS[0];
  const resistance = designResistance({ material: mat, method: designMethod, envId: envKey, durationId: durationKey });
  const sectionLook = isFRP ? "frp" : matKey.startsWith("alu") ? "alu" : "steel";

  const beamInputs: BeamInputs = {
    mode: "beam", geometry: { shape: shape as FrpSectionShape, h: dimH, b: dimB, tw: dimTw, tf: dimTf },
    materialId: matKey, ...(matKey === "custom" ? { customMaterial: customMat } : {}),
    method: designMethod, environmentId: envKey, durationId: durationKey, loadType: loadType as ProfileLoadType,
    spanMm: span, serviceLoad: load, deflectionLimit: deflLimit,
  };
  const { snapshot: beamSnapshot, error: beamInputError } = screenSnapshot(beamInputs);
  const beamInputsOk = beamSnapshot !== null && !restoreError;
  // Fallback values are used only to keep the render total; invalid results and RFQ actions are hidden.
  const { Ix, Wx, Aw, isDistributed, totalForce, M_factored_Nmm, V_factored_N,
    loadFactor, sigma_max, tau_max, F_b_allow, F_v_allow, defl, deflShearPct, deflRatio,
    weightPerM, stressOk, shearOk, deflOk, slender, slenderWarn } =
    (beamSnapshot?.results ?? FALLBACK_BEAM) as ReturnType<typeof calculateBeam>;
  const exactCatalogProfile = findStandardProfile(beamInputs.geometry);
  const catalogProfile = matKey === "frp-e23" ? exactCatalogProfile : null;

  const srcMat = materials[eqSourceMat];
  const tgtMat: Material = eqTargetMat === "custom"
    ? { label: "Custom FRP grade (user-defined)", group: "FRP", standard: "User-defined characteristic inputs; not a certified grade", ...customMat }
    : materials[eqTargetMat];
  const tgtSigma = Math.min(tgtMat.sigma, tgtMat.sigma_c ?? tgtMat.sigma);
  const eqInputs: EquivalenceInputs = {
    mode: "equivalence", geometry: { shape: eqShape as FrpSectionShape, h: eqH, b: eqB, tw: eqTw, tf: eqTf },
    sourceMaterialId: eqSourceMat, targetMaterialId: eqTargetMat,
    ...(eqTargetMat === "custom" ? { customMaterial: customMat } : {}), targetWallMm: eqTargetWall,
  };
  const { snapshot: eqSnapshot, error: eqInputError } = screenSnapshot(eqInputs);
  const eqInputsOk = eqSnapshot !== null && !restoreError;
  const { srcIx, srcWx, reqWx, reqIx, stiffnessScale, strengthScale, fixedWall, tWall,
    stiffH, stiffB, stiffTw, stiffTf, strengthH, strengthB, strengthTw, strengthTf, governingScale, governingCriterion,
    srcWeight, tgtWeight, weightSaving, eqFrpH, eqFrpB, eqFrpWall, eqFrpTf } =
    (eqSnapshot?.results ?? FALLBACK_EQ) as ReturnType<typeof calculateEquivalence>;
  const specContext = { calculatorSnapshot: beamSnapshot };
  const specMessage =
    `Please review this preliminary FRP profile calculation:\nCalculation ID: ${beamSnapshot?.calculationId} · Engine: ${beamSnapshot?.engineVersion}\nFull inputs, units, coefficients and unrounded results are attached.\n\n` +
    `Standard: ${mat.standard}\n` +
    `Design method: ${dm.label}\n` +
    `Environment: ${env.label} (strength ×${env.factor}, stiffness ×${env.stiffness})\n` +
    (isAsce ? `Load duration: ${duration.label}, λ = ${duration.lambda}, γ = ${duration.loadFactor}\n` : "") +
    `Material: ${mat.label}\n` +
    `Profile: ${shape}, H=${dimH}mm, B=${dimB}mm, tw=${dimTw}mm, tf=${dimTf}mm\n` +
    `Span: ${span}mm, Load type: ${lt.label}, Service load: ${load} ${isDistributed ? "kN/m" : "kN"}\n` +
    `Deflection limit: L/${deflLimit}\n\n` +
    `Calculator output:\n` +
    `- Ix = ${(Ix / 1e4).toFixed(1)} cm⁴ · Wx = ${(Wx / 1e3).toFixed(1)} cm³ · A_w = ${(Aw / 100).toFixed(1)} cm²\n` +
    `- Bending (factored): ${sigma_max.toFixed(1)} MPa vs ${F_b_allow.toFixed(1)} MPa allowable (${stressOk ? "OK" : "EXCEEDS"})\n` +
    `- Shear (factored): ${tau_max.toFixed(1)} MPa vs ${F_v_allow.toFixed(1)} MPa allowable (${shearOk ? "OK" : "EXCEEDS"})\n` +
    `- Deflection: ${defl.toFixed(1)} mm = L/${deflRatio.toFixed(0)} (${deflOk ? "OK" : "EXCEEDS"}); increase over bending-only deflection from shear ${deflShearPct.toFixed(1)}%\n` +
    `- Weight: ${weightPerM.toFixed(2)} kg/m\n` +
    (slenderWarn ? `- ⚠ Local-buckling advisory: ${slender.label} = ${slender.ratio.toFixed(1)} > ${slender.limit}\n` : "") +
    `\nApplication context (please add): ____\n` +
    `Project location / corrosion environment: ____\n\nThanks.`;

  const eqContext = { calculatorSnapshot: eqSnapshot };
  const eqMessage =
    `Preliminary FRP sizing — replacing ${srcMat.label} with ${tgtMat.label}:\nCalculation ID: ${eqSnapshot?.calculationId} · Engine: ${eqSnapshot?.engineVersion}\nFull inputs, units, coefficients and unrounded results are attached.\n\n` +
    `Source ${eqShape}: H=${eqH}mm, B=${eqB}mm, tw=${eqTw}mm, tf=${eqTf}mm (${srcWeight.toFixed(2)} kg/m)\n` +
    `FRP sizing candidate (${governingCriterion} governs; detailed recalculation required): H≈${eqFrpH}mm, B≈${eqFrpB}mm, tw=${eqFrpWall}mm, tf=${eqFrpTf}mm${fixedWall ? " (wall pinned)" : " (proportional)"} (${tgtWeight.toFixed(2)} kg/m)\n` +
    `Weight saving: ${weightSaving.toFixed(0)}%\n\n` +
    `Application / corrosion environment (please add): ____\n\nThanks.`;

  const inputClass = "w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
  const selectClass = inputClass;
  const labelClass = "mb-[4px] block font-mono text-f12 uppercase tracking-[0.06em] text-t3";

  const beamMaterialOptions = METHOD_MATERIALS[designMethod];

  return (
    <section aria-label="FRP profile calculator" data-tone="white" className="bg-white py-[32px] md:py-[40px]">
      <style>{`
        @media print {
          body > header,
          body > footer,
          body > a[href="#main"],
          .calculator-mode-tabs,
          .calculator-input-panel,
          .calculator-print-hide { display: none !important; }
          body:not(:has([data-embed-shell])) main#main > *:not(#profile-calculator) { display: none !important; }
          body > main#main { padding-top: 0 !important; }
          .calculator-grid { display: block !important; }
          .calculator-results-panel { border: 0 !important; background: white !important; padding: 0 !important; }
        }
      `}</style>
      <div className="site-container">
        {restoreError && <div role="alert" className="mb-[16px] rounded-control border border-fail-border bg-fail-bg p-[12px] text-f14 text-fail">Shared calculation was not restored: {restoreError} The fields below show the default screen. <button type="button" className="underline" onClick={() => setRestoreError("")}>Start a new calculation</button></div>}
        {/* Mode tabs */}
        <div className="calculator-mode-tabs mb-[20px] flex gap-[8px]">
          <button
            onClick={() => setMode("beam")}
            className={`rounded-control px-[20px] py-[8px] text-f14 font-semibold transition-colors ${mode === "beam" ? "bg-teal text-white" : "bg-bg2 text-t2 hover:bg-teal-bg"}`}
          >
            Beam analysis
          </button>
          <button
            onClick={() => setMode("equivalence")}
            className={`rounded-control px-[20px] py-[8px] text-f14 font-semibold transition-colors ${mode === "equivalence" ? "bg-teal text-white" : "bg-bg2 text-t2 hover:bg-teal-bg"}`}
          >
            Steel or aluminum to FRP
          </button>
        </div>

        {mode === "beam" && (
          <div className="calculator-grid grid gap-[20px] lg:grid-cols-[1fr_1fr]">
            {/* Input panel */}
            <div className="calculator-input-panel space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
              <SectionTag>Input Parameters</SectionTag>

              {/* One-click scenario presets — lower activation energy */}
              <div className="flex flex-wrap items-center gap-[6px]">
                <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Quick start:</span>
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="rounded-full border border-border-default bg-white px-[12px] py-[4px] text-f12 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Standard / Design method / Environment */}
              <div className="grid gap-[12px] sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Design Method</label>
                  <select value={designMethod} onChange={(e) => changeDesignMethod(e.target.value as DesignMethod)} className={selectClass}>
                    <option value="lrfd-asce">Preliminary screen — ASCE/SEI 74-23 factors (US)</option>
                    <option value="lrfd-cents19101">Preliminary screen — CEN/TS 19101 factors (EU)</option>
                    <option value="lrfd-gb50608">Preliminary screen — GB 50608 factors (CN)</option>
                    <option value="asd">Preliminary ASD screen — user properties</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Environment {!isFRP && <span className="font-normal normal-case text-t3">(FRP only)</span>}</label>
                  <select value={envKey} onChange={(e) => setEnvKey(e.target.value)} disabled={!isFRP} className={selectClass + (isFRP ? "" : " opacity-50")}>
                    {envFactors.map((e) => (
                      <option key={e.id} value={e.id}>{e.label} (×{e.factor.toFixed(2)}{e.stiffness < 1 ? `, E ×${e.stiffness.toFixed(2)}` : ""})</option>
                    ))}
                  </select>
                </div>
              </div>

              {isAsce && (
                <div>
                  <label className={labelClass}>Load duration <span className="normal-case tracking-normal">(ASCE time-effect factor λ)</span></label>
                  <select value={durationKey} onChange={(e) => setDurationKey(e.target.value)} className={selectClass}>
                    {LOAD_DURATIONS.map((d) => (
                      <option key={d.id} value={d.id}>{d.label}: λ = {d.lambda}, γ = {d.loadFactor}</option>
                    ))}
                  </select>
                  <p className="mt-[4px] text-f12 text-t3">
                    FRP resistance falls under sustained load. λ values follow the ASCE LRFD Pre-Standard (2010), the basis of ASCE/SEI 74-23.
                    {duration.id === "wind" ? " Enter the strength-level wind or seismic load." : ""}
                  </p>
                </div>
              )}

              <div className="grid gap-[12px] sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Material</label>
                  <select value={matKey} onChange={(e) => setMatKey(e.target.value)} className={selectClass}>
                    {beamMaterialOptions.map((key) => (
                      <option key={key} value={key}>
                        {key === "custom" ? "Custom FRP grade — define properties below" : materials[key].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Load Type</label>
                  <select value={loadType} onChange={(e) => setLoadType(e.target.value)} className={selectClass}>
                    {loadTypes.map((l) => (
                      <option key={l.id} value={l.id}>{l.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom (user-defined) FRP grade parameters — e.g. an E40 grade
                  above the EN 13706 E17/E23 presets. Editable characteristic values. */}
              {matKey === "custom" && (
                <CustomGradeInputs mat={customMat} setMat={setCustomMat} inputClass={inputClass} labelClass={labelClass} />
              )}

              <div className="grid gap-[12px] sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Span (mm)</label>
                  <input type="number" value={span} min="1" onChange={(e) => setSpan(+e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{isDistributed ? "Service Load (kN/m)" : "Service Load (kN)"}</label>
                  <input type="number" value={load} min="0.001" onChange={(e) => setLoad(+e.target.value)} step="0.1" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Deflection Limit (L/n)</label>
                  <input type="number" value={deflLimit} min="1" onChange={(e) => setDeflLimit(+e.target.value)} className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Profile Shape</label>
                <select value={shape} onChange={(e) => setShape(e.target.value)} className={selectClass}>
                  {profileShapes.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-[12px] sm:grid-cols-4">
                <div>
                  <label className={labelClass}>{shape === "round-tube" ? "OD (mm)" : "H (mm)"}</label>
                  <input type="number" value={dimH} min="0.01" onChange={(e) => setDimH(+e.target.value)} className={inputClass} />
                </div>
                {shape !== "round-tube" && (
                  <div>
                    <label className={labelClass}>B (mm)</label>
                    <input type="number" value={dimB} min="0.01" onChange={(e) => setDimB(+e.target.value)} className={inputClass} />
                  </div>
                )}
                <div>
                  <label className={labelClass}>{shape === "i-beam" || shape === "channel" ? "tw (mm)" : "t (mm)"}</label>
                  <input type="number" value={dimTw} min="0.01" onChange={(e) => setDimTw(+e.target.value)} className={inputClass} />
                </div>
                {(shape === "i-beam" || shape === "channel") && (
                  <div>
                    <label className={labelClass}>tf (mm)</label>
                    <input type="number" value={dimTf} min="0.01" onChange={(e) => setDimTf(+e.target.value)} className={inputClass} />
                  </div>
                )}
              </div>

              {/* Live visual of the section the dims above describe */}
              <SectionPreview shape={shape} H={dimH} B={dimB} tw={dimTw} tf={dimTf} look={sectionLook} />

              {/* Basis line */}
              <p className="text-f12 text-t3">
                <strong>Material dataset:</strong> {mat.standard} · <strong>Screening basis:</strong> {dm.basis}
                {isFRP && <> · <strong>Environment:</strong> strength ×{env.factor.toFixed(2)}, stiffness ×{env.stiffness.toFixed(2)} ({env.note})</>}
                {isAsce && isFRP && <> · <strong>λ:</strong> {resistance.lambda}</>}
              </p>
            </div>

            {/* Results panel */}
            <div className="calculator-results-panel space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
              <SectionTag>Preliminary Results</SectionTag>

              {!beamInputsOk ? (
                <div className="rounded-control border border-fail-border bg-fail-bg p-[12px] text-f14 text-fail">
                  {restoreError ? "A shared calculation could not be restored; start a new calculation above to continue." : beamInputError} Results are hidden until the calculation inputs are valid.
                </div>
              ) : (<>

              {/* Material properties — orthotropic for FRP, isotropic for metals */}
              <div className="rounded-control bg-white p-[12px]">
                <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">
                  Material Properties {isFRP ? "(orthotropic)" : "(isotropic)"}
                </div>
                {isFRP ? (
                  <div className="mt-[8px] grid grid-cols-7 gap-[8px] text-center">
                    <div><div className="text-f16 font-extrabold text-t1">{mat.E}</div><div className="text-f12 text-t3">E_L (GPa)</div></div>
                    <div><div className="text-f16 font-extrabold text-t1">{mat.E_T}</div><div className="text-f12 text-t3">E_T (GPa)</div></div>
                    <div><div className="text-f16 font-extrabold text-t1">{mat.G_LT}</div><div className="text-f12 text-t3">G_LT (GPa)</div></div>
                    <div><div className="text-f16 font-extrabold text-t1">{mat.sigma}</div><div className="text-f12 text-t3">F_tL (MPa)</div></div>
                    <div><div className="text-f16 font-extrabold text-t1">{mat.sigma_c}</div><div className="text-f12 text-t3">F_cL (MPa)</div></div>
                    <div><div className="text-f16 font-extrabold text-t1">{mat.tau}</div><div className="text-f12 text-t3">F_vLT (MPa)</div></div>
                    <div><div className="text-f16 font-extrabold text-t1">{mat.density}</div><div className="text-f12 text-t3">ρ (g/cm³)</div></div>
                  </div>
                ) : (
                  <div className="mt-[8px] grid grid-cols-3 gap-[8px] text-center">
                    <div><div className="text-f18 font-extrabold text-t1">{mat.E}</div><div className="text-f12 text-t3">E (GPa)</div></div>
                    <div><div className="text-f18 font-extrabold text-t1">{mat.sigma}</div><div className="text-f12 text-t3">σ_y (MPa)</div></div>
                    <div><div className="text-f18 font-extrabold text-t1">{mat.density}</div><div className="text-f12 text-t3">ρ (g/cm³)</div></div>
                  </div>
                )}
              </div>

              <p className="text-f12 text-t3">Calculation {beamSnapshot?.calculationId} · Engine {beamSnapshot?.engineVersion}. Shares and review requests include the complete replay snapshot; this is a preliminary screen.</p>
              {/* Section properties */}
              <div className="rounded-control bg-white p-[12px]">
                <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Section Properties</div>
                <div className="mt-[8px] grid grid-cols-4 gap-[8px] text-center">
                  <div><div className="text-f16 font-bold text-t1">{(Ix / 1e4).toFixed(1)}</div><div className="text-f12 text-t3">Ix (cm⁴)</div></div>
                  <div><div className="text-f16 font-bold text-t1">{(Wx / 1e3).toFixed(1)}</div><div className="text-f12 text-t3">Wx (cm³)</div></div>
                  <div><div className="text-f16 font-bold text-t1">{(Aw / 100).toFixed(1)}</div><div className="text-f12 text-t3">A_w (cm²)</div></div>
                  <div>
                    <div className="text-f16 font-bold text-t1">{weightPerM.toFixed(2)}</div>
                    <div className="text-f12 text-t3">kg/m · {catalogProfile ? `engine dataset ${catalogProfile.model}` : "nominal calc."}</div>
                  </div>
                </div>
              </div>

              {/* Three checks: bending / shear / deflection */}
              <div className="grid gap-[8px] sm:grid-cols-3">
                <div className={`rounded-control p-[12px] ${stressOk ? "bg-teal-bg border border-teal-border" : "bg-fail-bg border border-fail-border"}`}>
                  <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Bending</div>
                  <div className={`mt-[4px] text-f18 font-extrabold ${stressOk ? "text-teal" : "text-fail"}`}>{sigma_max.toFixed(1)} MPa</div>
                  <div className="text-f12 text-t3">{stressOk ? "within screen" : "exceeds screen"} · limit {F_b_allow.toFixed(1)} ({((sigma_max / F_b_allow) * 100).toFixed(0)}%)</div>
                </div>
                <div className={`rounded-control p-[12px] ${shearOk ? "bg-teal-bg border border-teal-border" : "bg-fail-bg border border-fail-border"}`}>
                  <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Shear</div>
                  <div className={`mt-[4px] text-f18 font-extrabold ${shearOk ? "text-teal" : "text-fail"}`}>{tau_max.toFixed(1)} MPa</div>
                  <div className="text-f12 text-t3">{shearOk ? "within screen" : "exceeds screen"} · limit {F_v_allow.toFixed(1)} ({((tau_max / F_v_allow) * 100).toFixed(0)}%)</div>
                </div>
                <div className={`rounded-control p-[12px] ${deflOk ? "bg-teal-bg border border-teal-border" : "bg-fail-bg border border-fail-border"}`}>
                  <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Deflection</div>
                  <div className={`mt-[4px] text-f18 font-extrabold ${deflOk ? "text-teal" : "text-fail"}`}>{defl.toFixed(1)} mm</div>
                  <div className="text-f12 text-t3">{deflOk ? "within screen" : "exceeds screen"} · L/{deflRatio.toFixed(0)} (limit L/{deflLimit})</div>
                </div>
              </div>

              {/* Load summary + shear-deflection contribution + slenderness advisory */}
              <div className="rounded-control bg-white p-[12px] text-f14 text-t2 space-y-[4px]">
                <div className="grid grid-cols-2 gap-[8px]">
                  <div>Max moment (factored): <span className="font-bold text-t1">{(M_factored_Nmm / 1e6).toFixed(2)} kN·m</span></div>
                  <div>Max shear (factored): <span className="font-bold text-t1">{(V_factored_N / 1e3).toFixed(2)} kN</span></div>
                  <div>Service total force: <span className="font-bold text-t1">{totalForce.toFixed(1)} kN</span></div>
                  <div>Load factor γ: <span className="font-bold text-t1">×{loadFactor}</span>{isAsce && isFRP ? <span className="text-t3"> · λ {resistance.lambda}</span> : null}</div>
                </div>
                {isFRP && (
                  <div className="border-t border-border-default pt-[4px]">
                    <span className="text-t3">Increase over bending-only deflection from shear:</span>{" "}
                    <span className="font-bold text-t1">{deflShearPct.toFixed(1)}%</span>{" "}
                    <span className="text-t3">(via Timoshenko correction; E_L/G_LT ratio governs)</span>
                  </div>
                )}
                {slenderWarn && (
                  <div className="border-t border-fail-border pt-[4px] text-fail">
                    ⚠ <strong>Local-buckling advisory:</strong> {slender.label} = {slender.ratio.toFixed(1)} &gt; {slender.limit}.
                    The value {slender.limit} is a conservative triage threshold, not a code limit.
                    Perform the applicable ASCE/SEI 74-23 Ch.3 or CEN/TS 19101 §6 local-buckling calculation before design release.
                  </div>
                )}
              </div>

              {/* F1 product match — routes a finished calc to the matching product page */}
              {isFRP && PRODUCT_BY_SHAPE[shape] && (() => {
                const prod = PRODUCT_BY_SHAPE[shape];
                const near = exactCatalogProfile ?? nearestStandardProfile(shape as "i-beam" | "channel" | "angle" | "square-tube" | "round-tube", dimH, shape === "round-tube" ? dimH : dimB, dimTw);
                return (
                  <a
                    href={`/products/fiberglass-structural-shapes/${prod.slug}?source=calculator`}
                    onClick={() => track("calculator_product_click", { shape, slug: prod.slug })}
                    className="block rounded-control border border-teal/30 bg-white p-[12px] transition-colors hover:border-teal"
                  >
                    <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Engine dataset candidate — recalculate before selection</div>
                    <div className="mt-[3px] text-f14 text-t2">
                      {near ? (
                        <>{exactCatalogProfile ? "Nominal geometry matches" : "Nearest catalog geometry"}: <strong className="text-t1">{near.model}</strong> ({near.weight} kg/m). </>
                      ) : null}
                      This candidate comes from engine dataset {beamSnapshot?.engineVersion}, not the live catalog or a qualified configuration. The screen above applies to your entered section and material. Confirm current dimensions, mass and material, then recalculate. View the {prod.family} <span aria-hidden>→</span>
                    </div>
                  </a>
                );
              })()}

              {/* Send-to-engineer actions */}
              <div className="grid gap-[8px] sm:grid-cols-2">
                <a
                  href={buildRfqHref({ source: "calculator", context: specContext, message: specMessage })}
                  onClick={() => track("calculator_quote_click", { shape })}
                  className="rounded-control bg-teal-text px-[16px] py-[10px] text-center text-f14 font-bold text-white transition-colors hover:bg-teal"
                >
                  Send to engineering for a quote
                </a>
                <a
                  href={`/ask?prefill=${encodeURIComponent(
                    `I just used the FRP profile calculator. Standard: ${mat.standard}. Design method: ${dm.label}. Environment: ${env.label}. Material: ${mat.label}. ${shape} ${dimH}×${dimB}mm spanning ${span}mm under ${load} ${isDistributed ? "kN/m" : "kN"}. Bending ${sigma_max.toFixed(1)}/${F_b_allow.toFixed(1)} MPa, shear ${tau_max.toFixed(1)}/${F_v_allow.toFixed(1)} MPa, deflection ${defl.toFixed(1)} mm (${deflShearPct.toFixed(0)}% increase over bending-only deflection from shear). Is this sized correctly? What grade/resin should I specify for [my application]?`
                  )}`}
                  onClick={() => track("calculator_ai_click", { shape })}
                  className="rounded-control border border-teal-border bg-teal-bg px-[16px] py-[10px] text-center text-f14 font-bold text-teal-text transition-colors hover:bg-teal-bg2"
                >
                  Discuss the result with the assistant
                </a>
              </div>

              {/* Result-moment email capture — convert at the aha-moment, no page jump */}
              <ResultLeadCapture key={beamSnapshot?.calculationId} source="calculator" summary={specMessage} context={specContext} />

              {/* Share + print/PDF actions keep the computed result portable. */}
              <div className="calculator-print-hide grid gap-[8px] sm:grid-cols-2">
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="w-full rounded-control border border-border-default bg-white px-[16px] py-[8px] text-center text-f14 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
                >
                  {shareState === "copied" ? "Share link copied" : shareState === "error" ? "Link ready in address bar" : "Copy share link"}
                </button>
                <button
                  type="button"
                  onClick={printResultReport}
                  className="w-full rounded-control border border-border-default bg-white px-[16px] py-[8px] text-center text-f14 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
                >
                  Print or save as PDF
                </button>
              </div>

              </>)}

              <p className="text-f12 text-t3">
                Reference: EN 13706-3:2002 · ASCE/SEI 74-23 · ASCE 7-22 · CEN/TS 19101:2022 · EN 1990:2023 · GB 50608-2020 / T/CECS 692-2020.
                The calculator performs global bending (vs min tensile/compressive strength), average shear, and load-case-matched Timoshenko deflection only.
                Not modeled: local buckling, lateral-torsional buckling, web crippling, long-term creep deflection and creep rupture, dead-load combinations,
                principal-axis bending of single angles, and connection design. These need dedicated analysis; contact F1 Composite engineering.
              </p>
            </div>
          </div>
        )}

        {mode === "equivalence" && (
          <div className="grid gap-[20px] lg:grid-cols-[1fr_1fr]">
            {/* Input */}
            <div className="space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
              <SectionTag>Source Profile (Replace This)</SectionTag>

              <div className="grid gap-[12px] sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Current Material</label>
                  <select value={eqSourceMat} onChange={(e) => setEqSourceMat(e.target.value)} className={selectClass}>
                    <optgroup label="Steel, Europe / UK">
                      <option value="steel-s235">S235 (EN 10025)</option>
                      <option value="steel-s355">S355 (EN 10025)</option>
                    </optgroup>
                    <optgroup label="Steel, US / Canada / AU-NZ">
                      <option value="steel-a36">ASTM A36</option>
                      <option value="steel-a992">ASTM A992</option>
                      <option value="steel-350w">CSA G40.21 350W</option>
                      <option value="steel-as300">AS/NZS 3679.1 Grade 300</option>
                    </optgroup>
                    <optgroup label="Steel — GB">
                      <option value="steel-q235">Q235 (GB/T 700)</option>
                      <option value="steel-q355">Q355B (GB/T 1591)</option>
                    </optgroup>
                    <optgroup label="Aluminum">
                      <option value="alu-6061">6061-T6</option>
                      <option value="alu-6063">6063-T5</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Target FRP Grade</label>
                  <select value={eqTargetMat} onChange={(e) => setEqTargetMat(e.target.value)} className={selectClass}>
                    <optgroup label="EN 13706-3">
                      <option value="frp-e17">EN 13706 E17</option>
                      <option value="frp-e23">EN 13706 E23</option>
                    </optgroup>
                    <optgroup label="GB 50608-2020">
                      <option value="frp-gb50608-i">GB 50608 Class I</option>
                      <option value="frp-gb50608-ii">GB 50608 Class II</option>
                    </optgroup>
                    <optgroup label="Balanced GFRP (illustrative)">
                      <option value="frp-asce-std">Standard-property set</option>
                      <option value="frp-asce-high">High-property set</option>
                    </optgroup>
                    <optgroup label="Custom / advanced">
                      <option value="custom">Custom grade (e.g. E40 — define below)</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Same user-defined recipe as beam mode — define/edit an E40-type
                  grade here and the steel/aluminum → FRP equivalence uses it. */}
              {eqTargetMat === "custom" && (
                <CustomGradeInputs mat={customMat} setMat={setCustomMat} inputClass={inputClass} labelClass={labelClass} />
              )}

              {/* Target FRP wall thickness — pin a standard FRP wall and the
                  equivalent H×B is reverse-solved to meet stiffness/strength;
                  "Auto" keeps the legacy proportional-scale behavior. */}
              <div>
                <label className={labelClass}>Target FRP Wall Thickness</label>
                <select
                  value={eqTargetWall === "auto" ? "auto" : String(eqTargetWall)}
                  onChange={(e) => setEqTargetWall(e.target.value === "auto" ? "auto" : +e.target.value)}
                  className={selectClass}
                >
                  <option value="auto">Auto — proportional scale</option>
                  {STD_WALLS.frp.map((w) => (
                    <option key={w} value={w}>{w} mm — reverse-solve H×B</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Profile Shape</label>
                <select value={eqShape} onChange={(e) => setEqShape(e.target.value)} className={selectClass}>
                  {profileShapes.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-[12px] sm:grid-cols-4">
                <div>
                  <label className={labelClass}>{eqShape === "round-tube" ? "OD (mm)" : "H (mm)"}</label>
                  <input type="number" value={eqH} min="0.01" onChange={(e) => setEqH(+e.target.value)} className={inputClass} />
                </div>
                {eqShape !== "round-tube" && (
                  <div>
                    <label className={labelClass}>B (mm)</label>
                    <input type="number" value={eqB} min="0.01" onChange={(e) => setEqB(+e.target.value)} className={inputClass} />
                  </div>
                )}
                <div>
                  <label className={labelClass}>{eqShape === "i-beam" || eqShape === "channel" ? "tw (mm)" : "t (mm)"}</label>
                  <input type="number" value={eqTw} min="0.01" onChange={(e) => setEqTw(+e.target.value)} className={inputClass} />
                </div>
                {(eqShape === "i-beam" || eqShape === "channel") && (
                  <div>
                    <label className={labelClass}>tf (mm)</label>
                    <input type="number" value={eqTf} min="0.01" onChange={(e) => setEqTf(+e.target.value)} className={inputClass} />
                  </div>
                )}
              </div>

              {/* Standard wall-thickness quick-select for the source metal profile
                  — fills web + flange (still editable above). */}
              <div className="flex flex-wrap items-center gap-[6px]">
                <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">
                  {eqSourceMat.startsWith("alu") ? "Alu" : "Steel"} std wall:
                </span>
                {(eqSourceMat.startsWith("alu") ? STD_WALLS.alu : STD_WALLS.steel).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => { setEqTw(w); setEqTf(w); }}
                    className={`rounded-full border px-[10px] py-[4px] text-f12 font-medium transition-colors ${
                      eqTw === w
                        ? "border-teal bg-teal-bg text-teal-text"
                        : "border-border-default bg-white text-t2 hover:border-teal"
                    }`}
                  >
                    {w} mm
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
              <SectionTag>FRP Sizing Candidates</SectionTag>

              {!eqInputsOk ? (
                <div className="rounded-control border border-fail-border bg-fail-bg p-[12px] text-f14 text-fail">
                  {restoreError ? "A shared calculation could not be restored; start a new calculation above to continue." : eqInputError} Results are hidden until the calculation inputs are valid.
                </div>
              ) : (<>

              <p className="text-f12 text-t3">Calculation {eqSnapshot?.calculationId} · Engine {eqSnapshot?.engineVersion}. Dimensions are rounded sizing candidates, requiring detailed recalculation.</p>
              <div className="overflow-x-auto rounded-control bg-white">
                <table className="w-full text-left text-f14">
                  <thead>
                    <tr className="border-b-2 border-border-default">
                      <th className="px-[12px] py-[10px] text-f14 font-semibold text-t3">Property</th>
                      <th className="px-[12px] py-[10px] text-f14 font-semibold text-t3">{srcMat.label}</th>
                      <th className="px-[12px] py-[10px] text-f14 font-semibold text-teal-text">{tgtMat.label}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-default"><td className="px-[12px] py-[8px] text-t2">E (GPa)</td><td className="px-[12px] py-[8px] font-medium text-t1">{srcMat.E}</td><td className="px-[12px] py-[8px] font-medium text-teal">{tgtMat.E}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[12px] py-[8px] text-t2">σ (MPa) — metal σ_y / FRP min(F_tL, F_cL)</td><td className="px-[12px] py-[8px] font-medium text-t1">{srcMat.sigma}</td><td className="px-[12px] py-[8px] font-medium text-teal">{tgtSigma}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[12px] py-[8px] text-t2">Density (g/cm³)</td><td className="px-[12px] py-[8px] font-medium text-t1">{srcMat.density}</td><td className="px-[12px] py-[8px] font-medium text-teal">{tgtMat.density}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[12px] py-[8px] text-t2">Ix required (cm⁴)</td><td className="px-[12px] py-[8px] font-medium text-t1">{(srcIx / 1e4).toFixed(1)}</td><td className="px-[12px] py-[8px] font-medium text-teal">{(reqIx / 1e4).toFixed(1)}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[12px] py-[8px] text-t2">Wx required (cm³)</td><td className="px-[12px] py-[8px] font-medium text-t1">{(srcWx / 1e3).toFixed(1)}</td><td className="px-[12px] py-[8px] font-medium text-teal">{(reqWx / 1e3).toFixed(1)}</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="grid gap-[8px] sm:grid-cols-2">
                <div className="rounded-control bg-white border border-border-default p-[12px]">
                  <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">EI Sizing Estimate</div>
                  <div className="mt-[8px] grid grid-cols-3 gap-[8px] text-f14">
                    <div>H: <span className="font-bold text-t1">{stiffH} mm</span></div>
                    <div>B: <span className="font-bold text-t1">{stiffB} mm</span></div>
                    <div>tw / tf: <span className="font-bold text-t1">{stiffTw} / {stiffTf} mm</span></div>
                  </div>
                  <p className="mt-[4px] text-f12 text-t3">
                    {fixedWall ? `wall t = ${tWall} mm pinned; H solved for required Ix` : <>k = (E_src/E_tgt)<sup>1/4</sup> = ×{stiffnessScale.toFixed(2)}</>}
                  </p>
                </div>
                <div className="rounded-control bg-white border border-border-default p-[12px]">
                  <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">σW Sizing Estimate</div>
                  <div className="mt-[8px] grid grid-cols-3 gap-[8px] text-f14">
                    <div>H: <span className="font-bold text-t1">{strengthH} mm</span></div>
                    <div>B: <span className="font-bold text-t1">{strengthB} mm</span></div>
                    <div>tw / tf: <span className="font-bold text-t1">{strengthTw} / {strengthTf} mm</span></div>
                  </div>
                  <p className="mt-[4px] text-f12 text-t3">
                    {fixedWall ? `wall t = ${tWall} mm pinned; H solved for required Wx` : <>k = (σ_src/σ_tgt)<sup>1/3</sup> = ×{strengthScale.toFixed(2)}</>}
                  </p>
                </div>
              </div>

              <div className="rounded-control bg-teal-bg border border-teal-border p-[12px]">
                <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Governing Criterion</div>
                <div className="mt-[4px] text-f16 font-bold text-t1">
                  {governingCriterion}{fixedWall ? ` — FRP ${eqFrpH}×${eqFrpB} mm @ ${tWall} mm wall` : ` — use ×${governingScale.toFixed(2)}`}
                </div>
                <p className="mt-[4px] text-f12 text-t3">
                  Rounded dimensions are preliminary candidates and must be recalculated for <em>both</em> limits; the {fixedWall ? "larger reverse-solved section" : "larger scale factor"} governs.
                  {srcMat.group === "Metal" && srcMat.label.toLowerCase().includes("alum")
                    ? " For aluminum, stiffness and strength criteria are often comparable — check both before committing to a size."
                    : " For steel, stiffness almost always governs because FRP modulus is ~1/10 of steel."}
                </p>
              </div>

              <div className="grid gap-[8px] sm:grid-cols-3">
                <div className="rounded-control bg-white p-[12px] text-center">
                  <div className="text-f18 font-extrabold text-t1">{srcWeight.toFixed(2)}</div>
                  <div className="text-f12 text-t3">Source (kg/m)</div>
                </div>
                <div className="rounded-control bg-white p-[12px] text-center">
                  <div className="text-f18 font-extrabold text-teal">{tgtWeight.toFixed(2)}</div>
                  <div className="text-f12 text-t3">FRP — governing (kg/m)</div>
                </div>
                <div className="rounded-control bg-teal-bg border border-teal-border p-[12px] text-center">
                  <div className="text-f18 font-extrabold text-teal">{weightSaving.toFixed(0)}%</div>
                  <div className="text-f12 text-t3">Weight saving</div>
                </div>
              </div>

              {/* Product match + result-moment lead capture for the FRP-vs-metal surface */}
              {PRODUCT_BY_SHAPE[eqShape] && (
                <a
                  href={`/products/fiberglass-structural-shapes/${PRODUCT_BY_SHAPE[eqShape].slug}?source=calculator`}
                  onClick={() => track("calculator_product_click", { shape: eqShape, slug: PRODUCT_BY_SHAPE[eqShape].slug, mode: "equivalence" })}
                  className="block rounded-control bg-teal-text px-[16px] py-[10px] text-center text-f14 font-bold text-white transition-colors hover:bg-teal"
                >
                  Browse {PRODUCT_BY_SHAPE[eqShape].family} candidates <span aria-hidden>→</span>
                </a>
              )}
              <a href={buildRfqHref({ source: "calculator-equivalence", context: eqContext, message: eqMessage })} className="block rounded-control border border-teal-border bg-teal-bg px-[16px] py-[10px] text-center text-f14 font-bold text-teal-text">Send sizing candidates for engineering review</a>
              <ResultLeadCapture key={eqSnapshot?.calculationId} source="calculator-equivalence" summary={eqMessage} context={eqContext} />

              <button
                type="button"
                onClick={copyShareLink}
                className="calculator-print-hide w-full rounded-control border border-border-default bg-white px-[16px] py-[8px] text-center text-f14 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
              >
                {shareState === "copied" ? "Share link copied" : shareState === "error" ? "Link ready in address bar" : "Copy share link"}
              </button>

              </>)}

              <p className="text-f12 text-t3">
                Preliminary sizing compares EI and σW using the selected characteristic properties.
                This comparison does not establish compliance with a design standard or confirm a replacement section.
                The strength comparison is at characteristic level (metal yield vs FRP min(F_tL, F_cL)) with no
                resistance or environmental factors, and equal EI does not include FRP shear deflection or creep —
                treat results as sizing guidance and confirm with the factored checks on the beam analysis tab.
                Steel → FRP substitutions are typically deflection-governed; aluminum → FRP can be either —
                the calculator flags whichever scale factor is larger. Consult F1 Composite engineering for
                project-specific verification including local buckling and connection detailing.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
