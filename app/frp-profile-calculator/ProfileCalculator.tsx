"use client";

import { useState } from "react";
import SectionTag from "@/components/ui/SectionTag";

/* ──────────────────────────────────────────────────────────────────────────
   Material database — orthotropic FRP + isotropic metals
   FRP rows aligned to source standards (EN 13706, GB 50608, ASCE/SEI 74-23).
   Metals included for steel/aluminum → FRP equivalence calculations.

   Orthotropic terminology:
     E_L  = longitudinal modulus (fiber direction; governs pultruded beam stiffness)
     E_T  = transverse modulus (~0.25–0.35 × E_L for E-glass pultruded)
     G_LT = in-plane shear modulus (~3–4 GPa for pultruded GFRP — drives shear deflection)
     F_tL = longitudinal tensile strength (characteristic)
     F_cL = longitudinal compressive strength (characteristic)
     F_vLT= in-plane shear strength (characteristic)
   For isotropic metals these reduce to E_L = E_T = E and a single yield σ.
   ────────────────────────────────────────────────────────────────────────── */

type Material = {
  label: string;
  group: "FRP" | "Metal";
  standard: string;
  E: number;            // GPa — E_L for FRP, E for metals
  E_T?: number;         // GPa — FRP transverse modulus
  G_LT?: number;        // GPa — FRP in-plane shear modulus
  sigma: number;        // MPa — characteristic tensile strength (F_tL for FRP, σy for metals)
  sigma_c?: number;     // MPa — characteristic compressive strength (FRP)
  tau?: number;         // MPa — characteristic shear strength (FRP)
  density: number;      // g/cm³
};

const materials: Record<string, Material> = {
  // EN 13706-3 minimum-modulus grades
  "frp-e17": { label: "FRP EN 13706 E17", group: "FRP", standard: "EN 13706-3:2002", E: 17, E_T: 5, G_LT: 3, sigma: 170, sigma_c: 140, tau: 25, density: 1.9 },
  "frp-e23": { label: "FRP EN 13706 E23", group: "FRP", standard: "EN 13706-3:2002", E: 23, E_T: 7, G_LT: 3.5, sigma: 240, sigma_c: 200, tau: 30, density: 1.9 },
  // GB 50608-2020 (China FRP application code) / CECS 692:2020 (pultruded profile regulation)
  "frp-gb50608-i":  { label: "FRP GB 50608 Class I",  group: "FRP", standard: "GB 50608-2020 / CECS 692:2020", E: 23, E_T: 7, G_LT: 3.5, sigma: 240, sigma_c: 200, tau: 30, density: 1.9 },
  "frp-gb50608-ii": { label: "FRP GB 50608 Class II", group: "FRP", standard: "GB 50608-2020 / CECS 692:2020", E: 17, E_T: 5, G_LT: 3,   sigma: 170, sigma_c: 140, tau: 25, density: 1.9 },
  // ASCE/SEI 74-23 (US official FRP design standard, 2024 — supersedes 2010 ACMA Pre-Standard)
  "frp-asce-std":  { label: "FRP ASCE/SEI 74-23 Standard",         group: "FRP", standard: "ASCE/SEI 74-23", E: 17.2, E_T: 5.5, G_LT: 3,   sigma: 207, sigma_c: 207, tau: 31, density: 1.8 },
  "frp-asce-high": { label: "FRP ASCE/SEI 74-23 High-Performance", group: "FRP", standard: "ASCE/SEI 74-23", E: 27.6, E_T: 8.3, G_LT: 4,   sigma: 345, sigma_c: 290, tau: 45, density: 1.9 },
  // Metals — single E and yield σ
  "steel-s235": { label: "Steel S235 (EN 10025)",  group: "Metal", standard: "EN 10025-2",         E: 210, sigma: 235, density: 7.85 },
  "steel-s355": { label: "Steel S355 (EN 10025)",  group: "Metal", standard: "EN 10025-2",         E: 210, sigma: 355, density: 7.85 },
  "steel-q235": { label: "Steel Q235 (GB/T 700)",  group: "Metal", standard: "GB/T 700-2006",      E: 206, sigma: 235, density: 7.85 },
  "steel-q355": { label: "Steel Q355B (GB/T 1591)",group: "Metal", standard: "GB/T 1591-2018",     E: 206, sigma: 345, density: 7.85 },
  "alu-6061":   { label: "Aluminum 6061-T6",       group: "Metal", standard: "EN 573-3 / GB/T 3190", E: 69,  sigma: 276, density: 2.7 },
  "alu-6063":   { label: "Aluminum 6063-T5",       group: "Metal", standard: "EN 573-3 / GB/T 3190", E: 69,  sigma: 186, density: 2.7 },
};

/* Design framework — resistance / partial factors
   Sources: ASCE/SEI 74-23 §1.4 ; CEN/TS 19101:2022 §4 ; GB 50608-2020 §3.3 */
type DesignMethod = "lrfd-asce" | "lrfd-cents19101" | "lrfd-gb50608" | "asd";

const designMethods: Record<DesignMethod, { label: string; phiFlex: number; phiShear: number; loadFactor: number; basis: string }> = {
  "lrfd-asce":       { label: "LRFD — ASCE/SEI 74-23",            phiFlex: 0.65,   phiShear: 0.65,   loadFactor: 1.4,  basis: "ASCE/SEI 74-23 §1.4 — φ·R_n ≥ γ·Q" },
  "lrfd-cents19101": { label: "Partial-factor — CEN/TS 19101:2022", phiFlex: 1/1.5,  phiShear: 1/1.5,  loadFactor: 1.35, basis: "CEN/TS 19101 §4 — R_k/γ_M ≥ γ_F·E_k (Eurocode partial-factor)" },
  "lrfd-gb50608":    { label: "LRFD — GB 50608-2020",              phiFlex: 1/1.6,  phiShear: 1/1.6,  loadFactor: 1.3,  basis: "GB 50608-2020 §3.3 — R_k/γ_R ≥ γ_G·G_k + γ_Q·Q_k" },
  "asd":             { label: "ASD — Allowable Stress (legacy)",   phiFlex: 1/2.5,  phiShear: 1/3.0,  loadFactor: 1.0,  basis: "Allowable Stress Design — σ_allow = F_u / FS (FS≈2.5 bending, 3.0 shear)" },
};

/* Environmental knockdown — multiplied onto FRP characteristic strengths.
   Values per ASCE/SEI 74-23 §3.5 Ω_E and CEN/TS 19101 §5 η_c × η_t × η_M. */
const envFactors = [
  { id: "indoor-dry", label: "Indoor, dry, ≤30°C",                factor: 1.00, note: "Reference — no knockdown" },
  { id: "outdoor",    label: "Outdoor, exposed (UV + humidity)",  factor: 0.85, note: "Long-term UV + moisture exposure" },
  { id: "wet",        label: "Wet / immersion",                   factor: 0.80, note: "Continuous moisture absorption" },
  { id: "chemical",   label: "Mild chemical (acid/alkali)",       factor: 0.75, note: "Chemical class — see CECS 692:2020 Annex" },
  { id: "hot",        label: "Elevated temp (30–60°C)",           factor: 0.70, note: "Approaching T_g — see ASCE/SEI 74-23 §3.5.4" },
];

const loadTypes = [
  { id: "udl", label: "Uniform Distributed Load (UDL)", factor_M: 1 / 8, factor_d: 5 / 384, factor_V: 0.5 },
  { id: "point-mid", label: "Point Load at Midspan", factor_M: 1 / 4, factor_d: 1 / 48, factor_V: 0.5 },
  { id: "cantilever-point", label: "Cantilever — Point Load at Tip", factor_M: 1, factor_d: 1 / 3, factor_V: 1.0 },
  { id: "cantilever-udl", label: "Cantilever — Uniform Load", factor_M: 1 / 2, factor_d: 1 / 8, factor_V: 1.0 },
];

const profileShapes = [
  { id: "i-beam", label: "I-Beam / Wide Flange" },
  { id: "channel", label: "Channel (U-Profile)" },
  { id: "angle", label: "Angle (L-Profile)" },
  { id: "square-tube", label: "Square / Rectangular Tube" },
  { id: "round-tube", label: "Round Tube" },
];

function calcIx(shape: string, h: number, b: number, tw: number, tf: number): number {
  if (shape === "i-beam" || shape === "channel") {
    return (b * h ** 3 - (b - tw) * (h - 2 * tf) ** 3) / 12;
  }
  if (shape === "angle") {
    const t = tw;
    const yBar = (h * t * h / 2 + (b - t) * t * t / 2) / (h * t + (b - t) * t);
    const Iv = (t * h ** 3) / 12 + h * t * (h / 2 - yBar) ** 2;
    const Ih = ((b - t) * t ** 3) / 12 + (b - t) * t * (yBar - t / 2) ** 2;
    return Iv + Ih;
  }
  if (shape === "square-tube") return (b * h ** 3 - (b - 2 * tw) * (h - 2 * tw) ** 3) / 12;
  if (shape === "round-tube") {
    const Ro = h / 2; const Ri = Ro - tw;
    return (Math.PI / 4) * (Ro ** 4 - Ri ** 4);
  }
  return 0;
}

function calcWx(Ix: number, h: number, shape?: string, b?: number, tw?: number): number {
  if (shape === "angle" && b && tw) {
    const t = tw;
    const yBar = (h * t * h / 2 + (b - t) * t * t / 2) / (h * t + (b - t) * t);
    const maxDist = Math.max(yBar, h - yBar);
    return Ix / maxDist;
  }
  return Ix / (h / 2);
}

function calcArea(shape: string, h: number, b: number, tw: number, tf: number): number {
  if (shape === "i-beam" || shape === "channel") return 2 * b * tf + (h - 2 * tf) * tw;
  if (shape === "angle") return h * tw + (b - tw) * tw;
  if (shape === "square-tube") return b * h - (b - 2 * tw) * (h - 2 * tw);
  if (shape === "round-tube") {
    const Ro = h / 2; const Ri = Ro - tw;
    return Math.PI * (Ro ** 2 - Ri ** 2);
  }
  return 0;
}

// Shear area (the part resisting transverse shear — web for I/C, walls for tube)
function calcShearArea(shape: string, h: number, b: number, tw: number, tf: number): number {
  if (shape === "i-beam" || shape === "channel") return (h - 2 * tf) * tw;
  if (shape === "angle") return h * tw;
  if (shape === "square-tube") return 2 * h * tw;
  if (shape === "round-tube") {
    const Ro = h / 2; const Ri = Ro - tw;
    return (Math.PI * (Ro ** 2 - Ri ** 2)) / 2;
  }
  return 0;
}

// Outstanding-flange slenderness b/t — flagged for local-buckling review when high.
// Per ASCE/SEI 74-23 Ch.3 and CEN/TS 19101 §6, FRP free flanges typically need b/t ≤ ~18
// for E-glass / polyester; tighter for compression-governed members.
function flangeSlenderness(shape: string, b: number, tf: number, tw: number): number {
  if (shape === "i-beam") return (b / 2) / tf;
  if (shape === "channel") return b / tf;
  if (shape === "square-tube" || shape === "round-tube") return b / tw;
  if (shape === "angle") return b / tw;
  return 0;
}
const SLENDERNESS_FLANGE_WARN = 18;

type Mode = "beam" | "equivalence";

export default function ProfileCalculator() {
  const [mode, setMode] = useState<Mode>("beam");

  // Beam state
  const [matKey, setMatKey] = useState("frp-e23");
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

  // Equivalence state
  const [eqSourceMat, setEqSourceMat] = useState("steel-s235");
  const [eqTargetMat, setEqTargetMat] = useState("frp-e23");
  const [eqShape, setEqShape] = useState("i-beam");
  const [eqH, setEqH] = useState(200);
  const [eqB, setEqB] = useState(100);
  const [eqTw, setEqTw] = useState(8);
  const [eqTf, setEqTf] = useState(12);

  /* ── Beam calculation ── */
  const mat = materials[matKey];
  const lt = loadTypes.find((l) => l.id === loadType)!;
  const dm = designMethods[designMethod];
  const env = envFactors.find((e) => e.id === envKey)!;
  const isFRP = mat.group === "FRP";

  const Ix = calcIx(shape, dimH, dimB, dimTw, dimTf);
  const Wx = calcWx(Ix, dimH, shape, dimB, dimTw);
  const area = calcArea(shape, dimH, dimB, dimTw, dimTf);
  const Aw = calcShearArea(shape, dimH, dimB, dimTw, dimTf);

  const isDistributed = loadType === "udl" || loadType === "cantilever-udl";
  const spanM = span / 1000;
  const totalForce = isDistributed ? load * spanM : load;

  // Service-level moment / shear (no load factor — for deflection at serviceability)
  const M_service_Nmm = isDistributed ? lt.factor_M * load * spanM * spanM * 1e6 : lt.factor_M * load * span * 1000;
  const V_service_N = lt.factor_V * (isDistributed ? load * spanM * 1000 : load * 1000);

  // Factored (LRFD) moment / shear for strength checks
  const M_factored_Nmm = M_service_Nmm * dm.loadFactor;
  const V_factored_N = V_service_N * dm.loadFactor;

  // Stresses (factored for strength check)
  const sigma_max = Wx > 0 ? M_factored_Nmm / Wx : 0;        // MPa
  const tau_max = Aw > 0 ? V_factored_N / Aw : 0;            // MPa (V/A_web average)

  // Allowables — apply resistance factor + (for FRP) environmental knockdown
  const envFac = isFRP ? env.factor : 1.0;
  const F_b_allow = dm.phiFlex * mat.sigma * envFac;
  const F_v_char = isFRP ? (mat.tau ?? 30) : mat.sigma * 0.6;  // metals ≈ 0.6σy for shear
  const F_v_allow = dm.phiShear * F_v_char * envFac;

  // Deflection — bending part + (for FRP) Timoshenko shear correction.
  // δ_shear = α · (V·L) / (G·A_w);  for UDL midspan the equivalent constant α ≈ 1/8 (simply supported UDL on the moment-shear integral)
  // For preliminary tool, use δ_b × [1 + 12·E·I / (k·G·A·L²)]  with k=5/6 (rectangular shear coefficient)
  const E_mpa = mat.E * 1000;
  const G_mpa = (mat.G_LT ?? mat.E / (2 * 1.3)) * 1000;        // metals: ν≈0.3 → G = E/2.6
  const defl_bending = isDistributed
    ? (lt.factor_d * load * span ** 4) / (E_mpa * Ix)
    : (lt.factor_d * load * 1000 * span ** 3) / (E_mpa * Ix);
  const shearCorrection = area > 0 ? 1 + (12 * E_mpa * Ix) / ((5 / 6) * G_mpa * area * span ** 2) : 1;
  const defl = defl_bending * shearCorrection;
  const deflShearPct = ((shearCorrection - 1) * 100);
  const deflRatio = span / (defl || 1);
  const weightPerM = (area / 1e6) * mat.density;

  // Checks
  const stressOk = sigma_max <= F_b_allow;
  const shearOk = tau_max <= F_v_allow;
  const deflOk = deflRatio >= deflLimit;

  // Local-buckling slenderness warning (advisory)
  const slender = flangeSlenderness(shape, dimB, dimTf, dimTw);
  const slenderWarn = isFRP && slender > SLENDERNESS_FLANGE_WARN;

  /* ── Equivalence calculation ── */
  const srcMat = materials[eqSourceMat];
  const tgtMat = materials[eqTargetMat];
  const srcIx = calcIx(eqShape, eqH, eqB, eqTw, eqTf);
  const srcWx = calcWx(srcIx, eqH, eqShape, eqB, eqTw);
  const srcArea = calcArea(eqShape, eqH, eqB, eqTw, eqTf);

  const reqWx = srcWx * (srcMat.sigma / tgtMat.sigma);
  const reqIx = srcIx * (srcMat.E / tgtMat.E);

  const stiffnessScale = Math.pow(srcMat.E / tgtMat.E, 1 / 4);
  const strengthScale = Math.pow(srcMat.sigma / tgtMat.sigma, 1 / 3);

  const stiffH = Math.round(eqH * stiffnessScale);
  const stiffB = Math.round(eqB * stiffnessScale);
  const stiffTw = Math.max(1, Math.round(eqTw * stiffnessScale));
  const stiffTf = Math.max(1, Math.round(eqTf * stiffnessScale));

  const strengthH = Math.round(eqH * strengthScale);
  const strengthB = Math.round(eqB * strengthScale);
  const strengthTw = Math.max(1, Math.round(eqTw * strengthScale));
  const strengthTf = Math.max(1, Math.round(eqTf * strengthScale));

  const governingScale = Math.max(stiffnessScale, strengthScale);
  const governingCriterion = stiffnessScale >= strengthScale ? "Stiffness (EI)" : "Strength (σW)";

  const srcWeight = (srcArea / 1e6) * srcMat.density;
  const stiffArea = calcArea(eqShape, stiffH, stiffB, stiffTw, stiffTf);
  const strengthArea = calcArea(eqShape, strengthH, strengthB, strengthTw, strengthTf);
  const stiffWeight = (stiffArea / 1e6) * tgtMat.density;
  const strengthWeight = (strengthArea / 1e6) * tgtMat.density;
  const tgtWeight = governingScale === stiffnessScale ? stiffWeight : strengthWeight;
  const weightSaving = srcWeight > 0 ? ((1 - tgtWeight / srcWeight) * 100) : 0;

  const inputClass = "w-full rounded-[6px] border border-border-default bg-white px-[13px] py-[8px] text-f13 text-t1 outline-none focus:border-teal";
  const selectClass = inputClass;
  const labelClass = "block text-f11 font-bold uppercase tracking-[2px] text-t3 mb-[5px]";

  const MaterialOptions = (
    <>
      <optgroup label="FRP — EN 13706-3">
        <option value="frp-e17">EN 13706 Grade E17</option>
        <option value="frp-e23">EN 13706 Grade E23</option>
      </optgroup>
      <optgroup label="FRP — GB 50608-2020 / CECS 692:2020">
        <option value="frp-gb50608-i">GB 50608 Class I (E≈23 GPa)</option>
        <option value="frp-gb50608-ii">GB 50608 Class II (E≈17 GPa)</option>
      </optgroup>
      <optgroup label="FRP — ASCE/SEI 74-23">
        <option value="frp-asce-std">ASCE 74-23 Standard</option>
        <option value="frp-asce-high">ASCE 74-23 High-Performance</option>
      </optgroup>
      <optgroup label="Steel — EN">
        <option value="steel-s235">S235 (EN 10025)</option>
        <option value="steel-s355">S355 (EN 10025)</option>
      </optgroup>
      <optgroup label="Steel — GB">
        <option value="steel-q235">Q235 (GB/T 700)</option>
        <option value="steel-q355">Q355B (GB/T 1591)</option>
      </optgroup>
      <optgroup label="Aluminum">
        <option value="alu-6061">6061-T6</option>
        <option value="alu-6063">6063-T5</option>
      </optgroup>
    </>
  );

  return (
    <section className="bg-white py-[34px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        {/* Mode tabs */}
        <div className="mb-[21px] flex gap-[8px]">
          <button
            onClick={() => setMode("beam")}
            className={`rounded-[6px] px-[21px] py-[8px] text-f13 font-semibold transition-colors ${mode === "beam" ? "bg-teal text-white" : "bg-bg2 text-t2 hover:bg-teal-bg"}`}
          >
            Beam Analysis
          </button>
          <button
            onClick={() => setMode("equivalence")}
            className={`rounded-[6px] px-[21px] py-[8px] text-f13 font-semibold transition-colors ${mode === "equivalence" ? "bg-teal text-white" : "bg-bg2 text-t2 hover:bg-teal-bg"}`}
          >
            Steel / Aluminum → FRP Equivalence
          </button>
        </div>

        {mode === "beam" && (
          <div className="grid gap-[21px] lg:grid-cols-[1fr_1fr]">
            {/* Input panel */}
            <div className="space-y-[13px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <SectionTag>Input Parameters</SectionTag>

              {/* Standard / Design method / Environment */}
              <div className="grid gap-[13px] sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Design Method</label>
                  <select value={designMethod} onChange={(e) => setDesignMethod(e.target.value as DesignMethod)} className={selectClass}>
                    <option value="lrfd-asce">LRFD — ASCE/SEI 74-23 (US)</option>
                    <option value="lrfd-cents19101">Partial-factor — CEN/TS 19101 (EU)</option>
                    <option value="lrfd-gb50608">LRFD — GB 50608-2020 (CN)</option>
                    <option value="asd">ASD — Allowable Stress (legacy)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Environment {!isFRP && <span className="font-normal normal-case text-t3">(FRP only)</span>}</label>
                  <select value={envKey} onChange={(e) => setEnvKey(e.target.value)} disabled={!isFRP} className={selectClass + (isFRP ? "" : " opacity-50")}>
                    {envFactors.map((e) => (
                      <option key={e.id} value={e.id}>{e.label} (×{e.factor.toFixed(2)})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-[13px] sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Material</label>
                  <select value={matKey} onChange={(e) => setMatKey(e.target.value)} className={selectClass}>
                    {MaterialOptions}
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

              <div className="grid gap-[13px] sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Span (mm)</label>
                  <input type="number" value={span} onChange={(e) => setSpan(+e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{isDistributed ? "Service Load (kN/m)" : "Service Load (kN)"}</label>
                  <input type="number" value={load} onChange={(e) => setLoad(+e.target.value)} step="0.1" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Deflection Limit (L/n)</label>
                  <input type="number" value={deflLimit} onChange={(e) => setDeflLimit(+e.target.value)} className={inputClass} />
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

              <div className="grid gap-[13px] sm:grid-cols-4">
                <div>
                  <label className={labelClass}>{shape === "round-tube" ? "OD (mm)" : "H (mm)"}</label>
                  <input type="number" value={dimH} onChange={(e) => setDimH(+e.target.value)} className={inputClass} />
                </div>
                {shape !== "round-tube" && (
                  <div>
                    <label className={labelClass}>B (mm)</label>
                    <input type="number" value={dimB} onChange={(e) => setDimB(+e.target.value)} className={inputClass} />
                  </div>
                )}
                <div>
                  <label className={labelClass}>{shape === "i-beam" || shape === "channel" ? "tw (mm)" : "t (mm)"}</label>
                  <input type="number" value={dimTw} onChange={(e) => setDimTw(+e.target.value)} className={inputClass} />
                </div>
                {(shape === "i-beam" || shape === "channel") && (
                  <div>
                    <label className={labelClass}>tf (mm)</label>
                    <input type="number" value={dimTf} onChange={(e) => setDimTf(+e.target.value)} className={inputClass} />
                  </div>
                )}
              </div>

              {/* Basis line */}
              <p className="text-f11 text-t3">
                <strong>Material spec:</strong> {mat.standard} · <strong>Method:</strong> {dm.basis}
                {isFRP && <> · <strong>Env knockdown:</strong> ×{env.factor.toFixed(2)} ({env.note})</>}
              </p>
            </div>

            {/* Results panel */}
            <div className="space-y-[13px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <SectionTag>Results</SectionTag>

              {/* Material properties — orthotropic for FRP, isotropic for metals */}
              <div className="rounded-[6px] bg-white p-[13px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">
                  Material Properties {isFRP ? "(orthotropic)" : "(isotropic)"}
                </div>
                {isFRP ? (
                  <div className="mt-[8px] grid grid-cols-6 gap-[8px] text-center">
                    <div><div className="text-f15 font-extrabold text-t1">{mat.E}</div><div className="text-f11 text-t3">E_L (GPa)</div></div>
                    <div><div className="text-f15 font-extrabold text-t1">{mat.E_T}</div><div className="text-f11 text-t3">E_T (GPa)</div></div>
                    <div><div className="text-f15 font-extrabold text-t1">{mat.G_LT}</div><div className="text-f11 text-t3">G_LT (GPa)</div></div>
                    <div><div className="text-f15 font-extrabold text-t1">{mat.sigma}</div><div className="text-f11 text-t3">F_tL (MPa)</div></div>
                    <div><div className="text-f15 font-extrabold text-t1">{mat.tau}</div><div className="text-f11 text-t3">F_vLT (MPa)</div></div>
                    <div><div className="text-f15 font-extrabold text-t1">{mat.density}</div><div className="text-f11 text-t3">ρ (g/cm³)</div></div>
                  </div>
                ) : (
                  <div className="mt-[8px] grid grid-cols-3 gap-[8px] text-center">
                    <div><div className="text-f19 font-extrabold text-t1">{mat.E}</div><div className="text-f11 text-t3">E (GPa)</div></div>
                    <div><div className="text-f19 font-extrabold text-t1">{mat.sigma}</div><div className="text-f11 text-t3">σ_y (MPa)</div></div>
                    <div><div className="text-f19 font-extrabold text-t1">{mat.density}</div><div className="text-f11 text-t3">ρ (g/cm³)</div></div>
                  </div>
                )}
              </div>

              {/* Section properties */}
              <div className="rounded-[6px] bg-white p-[13px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Section Properties</div>
                <div className="mt-[8px] grid grid-cols-4 gap-[8px] text-center">
                  <div><div className="text-f15 font-bold text-t1">{(Ix / 1e4).toFixed(1)}</div><div className="text-f11 text-t3">Ix (cm⁴)</div></div>
                  <div><div className="text-f15 font-bold text-t1">{(Wx / 1e3).toFixed(1)}</div><div className="text-f11 text-t3">Wx (cm³)</div></div>
                  <div><div className="text-f15 font-bold text-t1">{(Aw / 100).toFixed(1)}</div><div className="text-f11 text-t3">A_w (cm²)</div></div>
                  <div><div className="text-f15 font-bold text-t1">{weightPerM.toFixed(2)}</div><div className="text-f11 text-t3">kg/m</div></div>
                </div>
              </div>

              {/* Three checks: bending / shear / deflection */}
              <div className="grid gap-[8px] sm:grid-cols-3">
                <div className={`rounded-[6px] p-[13px] ${stressOk ? "bg-teal/10 border border-teal/20" : "bg-red-50 border border-red-200"}`}>
                  <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Bending</div>
                  <div className={`mt-[5px] text-f19 font-extrabold ${stressOk ? "text-teal" : "text-red-600"}`}>{sigma_max.toFixed(1)} MPa</div>
                  <div className="text-f11 text-t3">{stressOk ? "✓" : "✗"} ≤ {F_b_allow.toFixed(1)} ({((sigma_max / F_b_allow) * 100).toFixed(0)}%)</div>
                </div>
                <div className={`rounded-[6px] p-[13px] ${shearOk ? "bg-teal/10 border border-teal/20" : "bg-red-50 border border-red-200"}`}>
                  <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Shear</div>
                  <div className={`mt-[5px] text-f19 font-extrabold ${shearOk ? "text-teal" : "text-red-600"}`}>{tau_max.toFixed(1)} MPa</div>
                  <div className="text-f11 text-t3">{shearOk ? "✓" : "✗"} ≤ {F_v_allow.toFixed(1)} ({((tau_max / F_v_allow) * 100).toFixed(0)}%)</div>
                </div>
                <div className={`rounded-[6px] p-[13px] ${deflOk ? "bg-teal/10 border border-teal/20" : "bg-red-50 border border-red-200"}`}>
                  <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Deflection</div>
                  <div className={`mt-[5px] text-f19 font-extrabold ${deflOk ? "text-teal" : "text-red-600"}`}>{defl.toFixed(1)} mm</div>
                  <div className="text-f11 text-t3">{deflOk ? "✓" : "✗"} L/{deflRatio.toFixed(0)} (limit L/{deflLimit})</div>
                </div>
              </div>

              {/* Load summary + shear-deflection contribution + slenderness advisory */}
              <div className="rounded-[6px] bg-white p-[13px] text-f13 text-t2 space-y-[5px]">
                <div className="grid grid-cols-2 gap-[8px]">
                  <div>Max moment (factored): <span className="font-bold text-t1">{(M_factored_Nmm / 1e6).toFixed(2)} kN·m</span></div>
                  <div>Max shear (factored): <span className="font-bold text-t1">{(V_factored_N / 1e3).toFixed(2)} kN</span></div>
                  <div>Service total force: <span className="font-bold text-t1">{totalForce.toFixed(1)} kN</span></div>
                  <div>Load factor γ: <span className="font-bold text-t1">×{dm.loadFactor}</span></div>
                </div>
                {isFRP && (
                  <div className="border-t border-border-default pt-[5px]">
                    <span className="text-t3">Shear deformation share of total deflection:</span>{" "}
                    <span className="font-bold text-t1">{deflShearPct.toFixed(1)}%</span>{" "}
                    <span className="text-t3">(via Timoshenko correction; E_L/G_LT ratio governs)</span>
                  </div>
                )}
                {slenderWarn && (
                  <div className="border-t border-red-200 pt-[5px] text-red-700">
                    ⚠ <strong>Local-buckling advisory:</strong> outstanding flange b/t = {slender.toFixed(1)} &gt; {SLENDERNESS_FLANGE_WARN}.
                    Pultruded FRP free flanges typically need b/t ≤ {SLENDERNESS_FLANGE_WARN} per ASCE/SEI 74-23 Ch.3 / CEN/TS 19101 §6.
                    Verify per the full local-buckling check or thicken the flange.
                  </div>
                )}
              </div>

              {/* Send-to-engineer actions */}
              <div className="grid gap-[8px] sm:grid-cols-2">
                <a
                  href={`mailto:f1frp2015@gmail.com?subject=${encodeURIComponent("FRP Profile Calc — Engineering Review Request")}&body=${encodeURIComponent(
                    `Please review this preliminary FRP profile calculation:\n\n` +
                    `Standard: ${mat.standard}\n` +
                    `Design method: ${dm.label}\n` +
                    `Environment: ${env.label} (×${env.factor})\n` +
                    `Material: ${mat.label}\n` +
                    `Profile: ${shape}, H=${dimH}mm, B=${dimB}mm, tw=${dimTw}mm, tf=${dimTf}mm\n` +
                    `Span: ${span}mm, Load type: ${lt.label}, Service load: ${load} ${isDistributed ? "kN/m" : "kN"}\n` +
                    `Deflection limit: L/${deflLimit}\n\n` +
                    `Calculator output:\n` +
                    `- Ix = ${(Ix / 1e4).toFixed(1)} cm⁴ · Wx = ${(Wx / 1e3).toFixed(1)} cm³ · A_w = ${(Aw / 100).toFixed(1)} cm²\n` +
                    `- Bending (factored): ${sigma_max.toFixed(1)} MPa vs ${F_b_allow.toFixed(1)} MPa allowable (${stressOk ? "OK" : "EXCEEDS"})\n` +
                    `- Shear (factored): ${tau_max.toFixed(1)} MPa vs ${F_v_allow.toFixed(1)} MPa allowable (${shearOk ? "OK" : "EXCEEDS"})\n` +
                    `- Deflection: ${defl.toFixed(1)} mm = L/${deflRatio.toFixed(0)} (${deflOk ? "OK" : "EXCEEDS"}); shear share ${deflShearPct.toFixed(1)}%\n` +
                    `- Weight: ${weightPerM.toFixed(2)} kg/m\n` +
                    (slenderWarn ? `- ⚠ Local-buckling advisory: flange b/t = ${slender.toFixed(1)} > ${SLENDERNESS_FLANGE_WARN}\n` : "") +
                    `\nApplication context (please add): ____\n` +
                    `Project location / corrosion environment: ____\n\nThanks.`
                  )}`}
                  className="rounded-[6px] bg-teal px-[16px] py-[10px] text-center text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
                >
                  📧 Email engineer for review
                </a>
                <a
                  href={`/ask?prefill=${encodeURIComponent(
                    `I just used the FRP profile calculator. Standard: ${mat.standard}. Design method: ${dm.label}. Environment: ${env.label}. Material: ${mat.label}. ${shape} ${dimH}×${dimB}mm spanning ${span}mm under ${load} ${isDistributed ? "kN/m" : "kN"}. Bending ${sigma_max.toFixed(1)}/${F_b_allow.toFixed(1)} MPa, shear ${tau_max.toFixed(1)}/${F_v_allow.toFixed(1)} MPa, deflection ${defl.toFixed(1)} mm (${deflShearPct.toFixed(0)}% shear share). Is this sized correctly? What grade/resin should I specify for [my application]?`
                  )}`}
                  className="rounded-[6px] border border-teal-border bg-teal-bg px-[16px] py-[10px] text-center text-f13 font-bold uppercase tracking-wide text-teal-text transition-colors hover:bg-teal/20"
                >
                  💬 Discuss results with AI
                </a>
              </div>

              <p className="text-f11 text-t3">
                Reference: EN 13706-3 · GB 50608-2020 / CECS 692:2020 · ASCE/SEI 74-23 · CEN/TS 19101:2022 · ASTM D3917.
                Calculator performs global bending, average shear, and Timoshenko-corrected deflection only.
                Local buckling, lateral-torsional buckling, web crippling, and connection design require dedicated analysis — contact F1 Composite engineering.
              </p>
            </div>
          </div>
        )}

        {mode === "equivalence" && (
          <div className="grid gap-[21px] lg:grid-cols-[1fr_1fr]">
            {/* Input */}
            <div className="space-y-[13px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <SectionTag>Source Profile (Replace This)</SectionTag>

              <div className="grid gap-[13px] sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Current Material</label>
                  <select value={eqSourceMat} onChange={(e) => setEqSourceMat(e.target.value)} className={selectClass}>
                    <optgroup label="Steel — EN">
                      <option value="steel-s235">S235 (EN 10025)</option>
                      <option value="steel-s355">S355 (EN 10025)</option>
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
                    <optgroup label="ASCE/SEI 74-23">
                      <option value="frp-asce-std">ASCE 74-23 Standard</option>
                      <option value="frp-asce-high">ASCE 74-23 High-Performance</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Profile Shape</label>
                <select value={eqShape} onChange={(e) => setEqShape(e.target.value)} className={selectClass}>
                  {profileShapes.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-[13px] sm:grid-cols-4">
                <div>
                  <label className={labelClass}>{eqShape === "round-tube" ? "OD (mm)" : "H (mm)"}</label>
                  <input type="number" value={eqH} onChange={(e) => setEqH(+e.target.value)} className={inputClass} />
                </div>
                {eqShape !== "round-tube" && (
                  <div>
                    <label className={labelClass}>B (mm)</label>
                    <input type="number" value={eqB} onChange={(e) => setEqB(+e.target.value)} className={inputClass} />
                  </div>
                )}
                <div>
                  <label className={labelClass}>{eqShape === "i-beam" || eqShape === "channel" ? "tw (mm)" : "t (mm)"}</label>
                  <input type="number" value={eqTw} onChange={(e) => setEqTw(+e.target.value)} className={inputClass} />
                </div>
                {(eqShape === "i-beam" || eqShape === "channel") && (
                  <div>
                    <label className={labelClass}>tf (mm)</label>
                    <input type="number" value={eqTf} onChange={(e) => setEqTf(+e.target.value)} className={inputClass} />
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-[13px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <SectionTag>FRP Equivalent</SectionTag>

              <div className="overflow-x-auto rounded-[6px] bg-white">
                <table className="w-full text-left text-f13">
                  <thead>
                    <tr className="border-b-2 border-border-default">
                      <th className="px-[13px] py-[10px] text-f11 font-bold uppercase tracking-wide text-t3">Property</th>
                      <th className="px-[13px] py-[10px] text-f11 font-bold uppercase tracking-wide text-t3">{srcMat.label}</th>
                      <th className="px-[13px] py-[10px] text-f11 font-bold uppercase tracking-wide text-teal">{tgtMat.label}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-default"><td className="px-[13px] py-[8px] text-t2">E (GPa)</td><td className="px-[13px] py-[8px] font-medium text-t1">{srcMat.E}</td><td className="px-[13px] py-[8px] font-medium text-teal">{tgtMat.E}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[13px] py-[8px] text-t2">σ (MPa)</td><td className="px-[13px] py-[8px] font-medium text-t1">{srcMat.sigma}</td><td className="px-[13px] py-[8px] font-medium text-teal">{tgtMat.sigma}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[13px] py-[8px] text-t2">Density (g/cm³)</td><td className="px-[13px] py-[8px] font-medium text-t1">{srcMat.density}</td><td className="px-[13px] py-[8px] font-medium text-teal">{tgtMat.density}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[13px] py-[8px] text-t2">Ix required (cm⁴)</td><td className="px-[13px] py-[8px] font-medium text-t1">{(srcIx / 1e4).toFixed(1)}</td><td className="px-[13px] py-[8px] font-medium text-teal">{(reqIx / 1e4).toFixed(1)}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[13px] py-[8px] text-t2">Wx required (cm³)</td><td className="px-[13px] py-[8px] font-medium text-t1">{(srcWx / 1e3).toFixed(1)}</td><td className="px-[13px] py-[8px] font-medium text-teal">{(reqWx / 1e3).toFixed(1)}</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="grid gap-[8px] sm:grid-cols-2">
                <div className="rounded-[6px] bg-white border border-border-default p-[13px]">
                  <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Equal Stiffness (EI)</div>
                  <div className="mt-[8px] grid grid-cols-2 gap-[8px] text-f13">
                    <div>H: <span className="font-bold text-t1">{stiffH} mm</span></div>
                    <div>B: <span className="font-bold text-t1">{stiffB} mm</span></div>
                  </div>
                  <p className="mt-[5px] text-f11 text-t3">k = (E_src/E_tgt)<sup>1/4</sup> = ×{stiffnessScale.toFixed(2)}</p>
                </div>
                <div className="rounded-[6px] bg-white border border-border-default p-[13px]">
                  <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Equal Strength (σW)</div>
                  <div className="mt-[8px] grid grid-cols-2 gap-[8px] text-f13">
                    <div>H: <span className="font-bold text-t1">{strengthH} mm</span></div>
                    <div>B: <span className="font-bold text-t1">{strengthB} mm</span></div>
                  </div>
                  <p className="mt-[5px] text-f11 text-t3">k = (σ_src/σ_tgt)<sup>1/3</sup> = ×{strengthScale.toFixed(2)}</p>
                </div>
              </div>

              <div className="rounded-[6px] bg-teal/10 border border-teal/20 p-[13px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Governing Criterion</div>
                <div className="mt-[5px] text-f15 font-bold text-t1">{governingCriterion} — use ×{governingScale.toFixed(2)}</div>
                <p className="mt-[5px] text-f11 text-t3">
                  The FRP profile must satisfy <em>both</em> limits; the larger scale factor governs.
                  {srcMat.group === "Metal" && srcMat.label.toLowerCase().includes("alum")
                    ? " For aluminum, stiffness and strength criteria are often comparable — check both before committing to a size."
                    : " For steel, stiffness almost always governs because FRP modulus is ~1/10 of steel."}
                </p>
              </div>

              <div className="grid gap-[8px] sm:grid-cols-3">
                <div className="rounded-[6px] bg-white p-[13px] text-center">
                  <div className="text-f19 font-extrabold text-t1">{srcWeight.toFixed(2)}</div>
                  <div className="text-f11 text-t3">Source (kg/m)</div>
                </div>
                <div className="rounded-[6px] bg-white p-[13px] text-center">
                  <div className="text-f19 font-extrabold text-teal">{tgtWeight.toFixed(2)}</div>
                  <div className="text-f11 text-t3">FRP — governing (kg/m)</div>
                </div>
                <div className="rounded-[6px] bg-teal/10 border border-teal/20 p-[13px] text-center">
                  <div className="text-f19 font-extrabold text-teal">{weightSaving.toFixed(0)}%</div>
                  <div className="text-f11 text-t3">Weight Saving</div>
                </div>
              </div>

              <p className="text-f11 text-t3">
                Geometrically similar scaling with both equal-stiffness (EI) and equal-strength (σW) checks per
                EN 13706-3, GB 50608-2020 / CECS 692:2020, ASCE/SEI 74-23, and CEN/TS 19101:2022 methodology.
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
