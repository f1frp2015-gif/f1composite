"use client";

import { useState, useEffect } from "react";
import SectionTag from "@/components/ui/SectionTag";
import { track, ResultLeadCapture } from "@/components/calculators/leadCapture";
import SectionPreview from "@/components/calculators/section/SectionPreview";
import { calcArea, calcIx, calcShearArea, calcWx } from "@/lib/frpSectionProperties";
import { buildToolStateHref, readToolStateParams } from "@/lib/toolStateUrl";

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
  // GB 50608-2020 (China FRP application code) / T/CECS 692-2020 (pultruded profile regulation)
  "frp-gb50608-i":  { label: "FRP GB 50608 Class I",  group: "FRP", standard: "GB 50608-2020 / T/CECS 692-2020", E: 23, E_T: 7, G_LT: 3.5, sigma: 240, sigma_c: 200, tau: 30, density: 1.9 },
  "frp-gb50608-ii": { label: "FRP GB 50608 Class II", group: "FRP", standard: "GB 50608-2020 / T/CECS 692-2020", E: 17, E_T: 5, G_LT: 3,   sigma: 170, sigma_c: 140, tau: 25, density: 1.9 },
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

/* User-defined ("custom") FRP grade. Lets the user enter a grade that isn't in
   the preset table — e.g. E40 (Austroads ATS5880's bridge-loadbearing tier;
   above the EN 13706 E17/E23 range, needs high glass content or carbon hybrid).
   These are the USER's own numbers, treated as a characteristic-level FRP grade;
   not a published standard row. Defaults are an E40-representative starting point. */
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
    <div className="rounded-[6px] border border-teal/30 bg-white p-[13px] space-y-[8px]">
      <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
        Custom FRP grade — your parameters (e.g. E40)
      </div>
      <div className="grid grid-cols-2 gap-[8px] sm:grid-cols-4">
        {CUSTOM_FIELDS.map((f) => (
          <div key={f.key}>
            <label className={labelClass}>{f.label}</label>
            <input
              type="number"
              step={f.step}
              value={mat[f.key]}
              onChange={(e) => setMat((m) => ({ ...m, [f.key]: +e.target.value }))}
              className={inputClass}
            />
          </div>
        ))}
      </div>
      <p className="text-f11 text-t3">
        These are your own characteristic values — not a published standard row.
        E40 example: E_L ≈ 40 GPa (Austroads ATS5880 bridge-loadbearing tier; above
        EN 13706 E17/E23, needs high glass content or a carbon hybrid). Confirm with
        F1 Composite engineering before design use.
      </p>
    </div>
  );
}

/* Design framework — resistance / partial factors
   Sources: ASCE/SEI 74-23 §1.4 ; CEN/TS 19101:2022 §4 ; GB 50608-2020 §3.3 */
type DesignMethod = "lrfd-asce" | "lrfd-cents19101" | "lrfd-gb50608" | "asd";

/* Load factors use the variable-action (live-load-dominated) value of each code
   family — the calculator's scenarios (walkways, platforms, purlins) are live-
   load governed, so γ_Q applies: 1.6 (ASCE 7), 1.5 (EN 1990), 1.5 (GB 55001).
   ASCE 74-23's time-effect factor λ for sustained loads is NOT modeled. */
const designMethods: Record<DesignMethod, { label: string; phiFlex: number; phiShear: number; loadFactor: number; basis: string }> = {
  "lrfd-asce":       { label: "LRFD — ASCE/SEI 74-23",            phiFlex: 0.65,   phiShear: 0.65,   loadFactor: 1.6,  basis: "ASCE/SEI 74-23 — φ·R_n ≥ γ·Q (γ_Q = 1.6 live-dominated; λ not modeled)" },
  "lrfd-cents19101": { label: "Partial-factor — CEN/TS 19101:2022", phiFlex: 1/1.5,  phiShear: 1/1.5,  loadFactor: 1.5,  basis: "CEN/TS 19101 §4 — R_k/γ_M ≥ γ_F·E_k (γ_Q = 1.5 variable actions, EN 1990)" },
  "lrfd-gb50608":    { label: "LRFD — GB 50608-2020",              phiFlex: 1/1.6,  phiShear: 1/1.6,  loadFactor: 1.5,  basis: "GB 50608-2020 §3.3 — R_k/γ_R ≥ γ_G·G_k + γ_Q·Q_k (γ_Q = 1.5, GB 55001-2021)" },
  "asd":             { label: "ASD — Allowable Stress (legacy)",   phiFlex: 1/2.5,  phiShear: 1/3.0,  loadFactor: 1.0,  basis: "Allowable Stress Design — σ_allow = F_u / FS (FS≈2.5 bending, 3.0 shear)" },
};

/* Environmental knockdown — multiplied onto FRP characteristic strengths.
   Values per ASCE/SEI 74-23 §3.5 Ω_E and CEN/TS 19101 §5 η_c × η_t × η_M. */
const envFactors = [
  { id: "indoor-dry", label: "Indoor, dry, ≤30°C",                factor: 1.00, note: "Reference — no knockdown" },
  { id: "outdoor",    label: "Outdoor, exposed (UV + humidity)",  factor: 0.85, note: "Long-term UV + moisture exposure" },
  { id: "wet",        label: "Wet / immersion",                   factor: 0.80, note: "Continuous moisture absorption" },
  { id: "chemical",   label: "Mild chemical (acid/alkali)",       factor: 0.75, note: "Chemical class — see T/CECS 692-2020 Annex" },
  { id: "hot",        label: "Elevated temp (30–60°C)",           factor: 0.70, note: "Approaching T_g — see ASCE/SEI 74-23 §3.5.4" },
];

/* factor_s = load-case constant c in the exact shear-deflection ratio
   δ_shear/δ_bending = c·E·I / (G·A_v·L²), derived from each case's closed-form
   δ_s (UDL midspan: wL²/8GA_v ÷ 5wL⁴/384EI → 9.6; midspan point: 12;
   cantilever tip point: 3; cantilever UDL: 4). */
const loadTypes = [
  { id: "udl", label: "Uniform Distributed Load (UDL)", factor_M: 1 / 8, factor_d: 5 / 384, factor_V: 0.5, factor_s: 9.6 },
  { id: "point-mid", label: "Point Load at Midspan", factor_M: 1 / 4, factor_d: 1 / 48, factor_V: 0.5, factor_s: 12 },
  { id: "cantilever-point", label: "Cantilever — Point Load at Tip", factor_M: 1, factor_d: 1 / 3, factor_V: 1.0, factor_s: 3 },
  { id: "cantilever-udl", label: "Cantilever — Uniform Load", factor_M: 1 / 2, factor_d: 1 / 8, factor_V: 1.0, factor_s: 4 },
];

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

/* Discrete F1 catalog depths (mm) for shapes whose standard series is published,
   used to name the closest stock size. Shapes not listed fall back to the family
   name without inventing a size. */
const STANDARD_SIZES: Record<string, { label: string; H: number }[]> = {
  "i-beam": [
    { label: "I 76×38×6.4", H: 76 }, { label: "I 100×50×6", H: 100 }, { label: "I 120×60×6", H: 120 },
    { label: "I 152×76×6.4", H: 152 }, { label: "I 160×80×8", H: 160 }, { label: "I 200×100×10", H: 200 },
    { label: "I 240×120×12", H: 240 }, { label: "I 300×150×15", H: 300 },
  ],
  "square-tube": [
    { label: "SHS 25×25", H: 25 }, { label: "SHS 38×38", H: 38 }, { label: "SHS 50×50", H: 50 },
    { label: "SHS 60×60", H: 60 }, { label: "SHS 75×75", H: 75 }, { label: "SHS 100×100", H: 100 },
    { label: "SHS 120×120", H: 120 }, { label: "SHS 150×150", H: 150 }, { label: "SHS 200×200", H: 200 },
  ],
};

function nearestStandardSize(shape: string, H: number): { label: string; H: number } | null {
  const list = STANDARD_SIZES[shape];
  if (!list || !Number.isFinite(H)) return null;
  return list.reduce((best, s) => (Math.abs(s.H - H) < Math.abs(best.H - H) ? s : best));
}

/* One-click scenarios that pre-load the most common FRP selection problems —
   lowers activation energy and each maps to a real F1 application. */
type Preset = {
  id: string; label: string; shape: string; span: number; load: number; loadType: string;
  matKey: string; envKey: string; deflLimit: number;
  dimH: number; dimB: number; dimTw: number; dimTf: number; designMethod: DesignMethod;
};
const PRESETS: Preset[] = [
  { id: "walkway", label: "Walkway beam", shape: "i-beam", span: 3000, load: 5, loadType: "udl", matKey: "frp-e23", envKey: "outdoor", deflLimit: 360, dimH: 240, dimB: 120, dimTw: 12, dimTf: 12, designMethod: "lrfd-asce" },
  { id: "solar", label: "Solar purlin", shape: "square-tube", span: 2200, load: 2.5, loadType: "udl", matKey: "frp-e23", envKey: "outdoor", deflLimit: 180, dimH: 100, dimB: 100, dimTw: 5, dimTf: 5, designMethod: "lrfd-asce" },
  { id: "cabletray", label: "Cable-tray support", shape: "channel", span: 1500, load: 2, loadType: "udl", matKey: "frp-e23", envKey: "chemical", deflLimit: 200, dimH: 100, dimB: 50, dimTw: 6, dimTf: 6, designMethod: "lrfd-asce" },
  { id: "platform", label: "Platform bearer", shape: "i-beam", span: 1800, load: 10, loadType: "udl", matKey: "frp-e23", envKey: "outdoor", deflLimit: 360, dimH: 200, dimB: 100, dimTw: 10, dimTf: 10, designMethod: "lrfd-asce" },
];

// Wall-slenderness advisory for local-buckling review. Outstanding (one-edge-
// supported) elements — I/C flanges, angle legs — use b/t ≤ ~18 per ASCE/SEI
// 74-23 Ch.3 / CEN/TS 19101 §6 for E-glass pultrusions. Box flats are supported
// on both edges and round tubes are shells, so both get a separate ~40 advisory
// limit (D/t for tubes). Round tube deliberately ignores B (hidden input).
function slendernessCheck(shape: string, h: number, b: number, tw: number, tf: number): { ratio: number; limit: number; label: string } {
  if (shape === "i-beam") return { ratio: b / 2 / tf, limit: 18, label: "outstanding flange b/t" };
  if (shape === "channel") return { ratio: b / tf, limit: 18, label: "outstanding flange b/t" };
  if (shape === "angle") return { ratio: Math.max(h, b) / tw, limit: 18, label: "leg b/t" };
  if (shape === "square-tube") return { ratio: (Math.max(h, b) - 2 * tw) / tw, limit: 40, label: "box flat-width b/t" };
  if (shape === "round-tube") return { ratio: h / tw, limit: 40, label: "tube D/t" };
  return { ratio: 0, limit: 18, label: "b/t" };
}

// Numeric-path guard mirroring geometry.ts: reject degenerate dimensions
// (walls thicker than the section allows) that would otherwise yield silently
// wrong section properties — e.g. tw > B makes the inner term negative and
// inflates Ix instead of failing.
function dimsValid(shape: string, h: number, b: number, tw: number, tf: number): boolean {
  const pos = (...vals: number[]) => vals.every((v) => Number.isFinite(v) && v > 0);
  if (shape === "i-beam" || shape === "channel") return pos(h, b, tw, tf) && tf * 2 < h && tw < b;
  if (shape === "angle") return pos(h, b, tw) && tw < h && tw < b;
  if (shape === "square-tube") return pos(h, b, tw) && tw * 2 < Math.min(h, b);
  if (shape === "round-tube") return pos(h, tw) && tw < h / 2;
  return false;
}

/* Standard wall thicknesses (mm) offered as quick-select, per material family.
   Steel/aluminum feed the SOURCE profile; FRP feeds the equivalence TARGET
   (a chosen FRP wall then reverse-solves the H×B — FRP is sold in specific
   wall thicknesses, so sizing to a real wall beats an arbitrary scaled one). */
const STD_WALLS = {
  steel: [3, 4, 5, 6, 8, 10, 12, 16],
  alu: [2, 2.5, 3, 4, 5, 6, 8, 10],
  frp: [3, 4, 5, 6, 8, 10, 12],
};

/* Reverse-solve the minimum section height H (walls fixed at t, width B = k·H)
   whose section property (Ix or Wx) reaches `target`. Ix and Wx increase
   monotonically with H, so a bisection converges. Used by the equivalence mode
   when the user pins the target FRP wall thickness. */
function solveHForProperty(
  shape: string, target: number, prop: "Ix" | "Wx", t: number, k: number,
): number {
  const propAt = (H: number): number => {
    const B = shape === "round-tube" || shape === "square-tube" ? H : Math.max(k * H, 2 * t + 2);
    const Ix = calcIx(shape, H, B, t, t);
    return prop === "Ix" ? Ix : calcWx(Ix, H, shape, B, t);
  };
  let lo = 2 * t + 2;
  let hi = 20000; // mm — generous ceiling
  if (propAt(hi) < target) return hi; // unreachable even at ceiling (degenerate)
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    if (propAt(mid) >= target) hi = mid;
    else lo = mid;
  }
  return hi;
}

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
  const [copied, setCopied] = useState(false);

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
    str("material", setMatKey, [...Object.keys(materials), "custom"]);
    str("env", setEnvKey, envFactors.map((e) => e.id));
    str("load_type", setLoadType, loadTypes.map((l) => l.id));
    str("method", (v) => setDesignMethod(v as DesignMethod), Object.keys(designMethods));
    num("span", setSpan); num("load", setLoad); num("defl", setDeflLimit);
    num("h", setDimH); num("b", setDimB); num("tw", setDimTw); num("tf", setDimTf);
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

  function copyShareLink() {
    const sp = new URLSearchParams({
      shape, material: matKey, env: envKey, load_type: loadType, method: designMethod,
      span: String(span), load: String(load), defl: String(deflLimit),
      h: String(dimH), b: String(dimB), tw: String(dimTw), tf: String(dimTf),
    });
    // Carry the user-defined grade params so a shared custom calc restores exactly.
    if (matKey === "custom") {
      sp.set("cE", String(customMat.E)); sp.set("cET", String(customMat.E_T));
      sp.set("cG", String(customMat.G_LT)); sp.set("cFt", String(customMat.sigma));
      sp.set("cFc", String(customMat.sigma_c)); sp.set("cFv", String(customMat.tau));
      sp.set("cRho", String(customMat.density));
    }
    const url = `${window.location.origin}${buildToolStateHref(
      "/frp-profile-calculator",
      Object.fromEntries(sp.entries()),
    )}`;
    navigator.clipboard?.writeText(url).then(
      () => { setCopied(true); setTimeout(() => setCopied(false), 2000); },
      () => {},
    );
    track("calculator_share", { shape });
  }

  function printResultReport() {
    track("calculator_print_report", { shape, material: matKey, mode });
    window.print();
  }

  /* ── Beam calculation ── */
  const mat: Material =
    matKey === "custom"
      ? { label: "Custom FRP grade (user-defined)", group: "FRP", standard: "User-defined (e.g. E40)", ...customMat }
      : materials[matKey];
  const lt = loadTypes.find((l) => l.id === loadType)!;
  const dm = designMethods[designMethod];
  const env = envFactors.find((e) => e.id === envKey)!;
  const isFRP = mat.group === "FRP";
  const sectionLook = isFRP ? "frp" : matKey.startsWith("alu") ? "alu" : "steel";

  const dimsOk = dimsValid(shape, dimH, dimB, dimTw, dimTf);
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

  // Allowables — apply resistance factor + (for FRP) environmental knockdown.
  // Bending uses min(F_tL, F_cL): pultruded FRP typically fails on the
  // compression face first (F_cL < F_tL), so tensile strength alone is
  // unconservative by ~20% on EN 13706 grades.
  const envFac = isFRP ? env.factor : 1.0;
  const F_b_char = isFRP ? Math.min(mat.sigma, mat.sigma_c ?? mat.sigma) : mat.sigma;
  const F_b_allow = dm.phiFlex * F_b_char * envFac;
  const F_v_char = isFRP ? (mat.tau ?? 30) : mat.sigma * 0.6;  // metals ≈ 0.6σy for shear
  const F_v_allow = dm.phiShear * F_v_char * envFac;

  // Deflection — bending + shear (Timoshenko). Exact per load case:
  // δ_shear/δ_bending = c·E·I / (G·A_v·L²) with c = lt.factor_s (9.6 UDL,
  // 12 midspan point, 3 cantilever tip, 4 cantilever UDL) and A_v = the
  // shear area already computed (web for I/C, walls for tubes, k = 1).
  const E_mpa = mat.E * 1000;
  const G_mpa = (mat.G_LT ?? mat.E / (2 * 1.3)) * 1000;        // metals: ν≈0.3 → G = E/2.6
  const defl_bending = isDistributed
    ? (lt.factor_d * load * span ** 4) / (E_mpa * Ix)
    : (lt.factor_d * load * 1000 * span ** 3) / (E_mpa * Ix);
  const shearCorrection = Aw > 0 && span > 0 ? 1 + (lt.factor_s * E_mpa * Ix) / (G_mpa * Aw * span ** 2) : 1;
  const defl = defl_bending * shearCorrection;
  const deflShearPct = ((shearCorrection - 1) * 100);
  const deflRatio = span / (defl || 1);
  const weightPerM = (area * mat.density) / 1000; // mm² × g/cm³ → kg/m

  // Checks
  const stressOk = sigma_max <= F_b_allow;
  const shearOk = tau_max <= F_v_allow;
  const deflOk = deflRatio >= deflLimit;

  // Local-buckling slenderness warning (advisory)
  const slender = slendernessCheck(shape, dimH, dimB, dimTw, dimTf);
  const slenderWarn = isFRP && dimsOk && slender.ratio > slender.limit;

  /* ── Equivalence calculation ── */
  const srcMat = materials[eqSourceMat];
  // Equivalence target can also be the user-defined custom recipe (same customMat
  // as beam mode) — e.g. compute a steel → E40-FRP replacement.
  const tgtMat: Material =
    eqTargetMat === "custom"
      ? { label: "Custom FRP grade (user-defined)", group: "FRP", standard: "User-defined (e.g. E40)", ...customMat }
      : materials[eqTargetMat];
  const eqDimsOk = dimsValid(eqShape, eqH, eqB, eqTw, eqTf);
  const srcIx = calcIx(eqShape, eqH, eqB, eqTw, eqTf);
  const srcWx = calcWx(srcIx, eqH, eqShape, eqB, eqTw);
  const srcArea = calcArea(eqShape, eqH, eqB, eqTw, eqTf);

  // FRP strength for the equal-strength comparison = min(F_tL, F_cL) — the
  // compression face governs pultruded bending. Still characteristic-level
  // (metal yield vs FRP characteristic, no φ/env factors) — disclosed below.
  const tgtSigma = Math.min(tgtMat.sigma, tgtMat.sigma_c ?? tgtMat.sigma);
  const reqWx = srcWx * (srcMat.sigma / tgtSigma);
  const reqIx = srcIx * (srcMat.E / tgtMat.E);

  const stiffnessScale = Math.pow(srcMat.E / tgtMat.E, 1 / 4);
  const strengthScale = Math.pow(srcMat.sigma / tgtSigma, 1 / 3);

  // Wall-thickness mode: "auto" scales all dims proportionally (legacy); a pinned
  // FRP wall reverse-solves H (walls = tWall, width = aspect·H) to reach the
  // required Ix (stiffness) / Wx (strength) — a manufacturable FRP section.
  const fixedWall = eqTargetWall !== "auto";
  const tWall = fixedWall ? (eqTargetWall as number) : 0;
  const aspectK = eqH > 0 ? eqB / eqH : 1;
  const bFromH = (H: number): number =>
    eqShape === "round-tube" || eqShape === "square-tube" ? H : Math.round(aspectK * H);

  const stiffH = fixedWall
    ? Math.ceil(solveHForProperty(eqShape, reqIx, "Ix", tWall, aspectK))
    : Math.round(eqH * stiffnessScale);
  const stiffB = fixedWall ? bFromH(stiffH) : Math.round(eqB * stiffnessScale);
  const stiffTw = fixedWall ? tWall : Math.max(1, Math.round(eqTw * stiffnessScale));
  const stiffTf = fixedWall ? tWall : Math.max(1, Math.round(eqTf * stiffnessScale));

  const strengthH = fixedWall
    ? Math.ceil(solveHForProperty(eqShape, reqWx, "Wx", tWall, aspectK))
    : Math.round(eqH * strengthScale);
  const strengthB = fixedWall ? bFromH(strengthH) : Math.round(eqB * strengthScale);
  const strengthTw = fixedWall ? tWall : Math.max(1, Math.round(eqTw * strengthScale));
  const strengthTf = fixedWall ? tWall : Math.max(1, Math.round(eqTf * strengthScale));

  // Which criterion governs: for fixed-wall, the larger solved H; for auto, the
  // larger scale factor. (Both reduce to "the section that satisfies both".)
  const stiffGoverns = fixedWall ? stiffH >= strengthH : stiffnessScale >= strengthScale;
  const governingScale = Math.max(stiffnessScale, strengthScale);
  const governingCriterion = stiffGoverns ? "Stiffness (EI)" : "Strength (σW)";

  const srcWeight = (srcArea * srcMat.density) / 1000; // mm² × g/cm³ → kg/m
  const stiffArea = calcArea(eqShape, stiffH, stiffB, stiffTw, stiffTf);
  const strengthArea = calcArea(eqShape, strengthH, strengthB, strengthTw, strengthTf);
  const stiffWeight = (stiffArea * tgtMat.density) / 1000;
  const strengthWeight = (strengthArea * tgtMat.density) / 1000;
  const tgtWeight = stiffGoverns ? stiffWeight : strengthWeight;
  const weightSaving = srcWeight > 0 ? ((1 - tgtWeight / srcWeight) * 100) : 0;

  // Shared spec payload for beam-mode RFQ surfaces (quote button + email capture).
  const specContext = {
    standard: mat.standard, designMethod: dm.label, environment: env.label, material: mat.label,
    shape, H_mm: dimH, B_mm: dimB, tw_mm: dimTw, tf_mm: dimTf, span_mm: span, load,
    Ix_cm4: +(Ix / 1e4).toFixed(1), Wx_cm3: +(Wx / 1e3).toFixed(1),
    bending_MPa: +sigma_max.toFixed(1), bending_allow_MPa: +F_b_allow.toFixed(1),
    shear_MPa: +tau_max.toFixed(1), shear_allow_MPa: +F_v_allow.toFixed(1),
    defl_mm: +defl.toFixed(1), weight_kg_m: +weightPerM.toFixed(2),
  };
  const specMessage =
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
    (slenderWarn ? `- ⚠ Local-buckling advisory: ${slender.label} = ${slender.ratio.toFixed(1)} > ${slender.limit}\n` : "") +
    `\nApplication context (please add): ____\n` +
    `Project location / corrosion environment: ____\n\nThanks.`;

  // Equivalence-mode RFQ payload.
  const eqFrpH = stiffGoverns ? stiffH : strengthH;
  const eqFrpB = stiffGoverns ? stiffB : strengthB;
  const eqFrpWall = fixedWall ? tWall : stiffGoverns ? stiffTw : strengthTw;
  const eqContext = {
    mode: "equivalence", replacing: srcMat.label, targetFRP: tgtMat.label, shape: eqShape,
    source_H_mm: eqH, source_B_mm: eqB, governing: governingCriterion, frp_wall_mm: eqFrpWall,
    frp_H_mm: eqFrpH, frp_B_mm: eqFrpB, weight_saving_pct: +weightSaving.toFixed(0),
    source_weight_kg_m: +srcWeight.toFixed(2), frp_weight_kg_m: +tgtWeight.toFixed(2),
  };
  const eqMessage =
    `FRP equivalence — replacing ${srcMat.label} with ${tgtMat.label}:\n\n` +
    `Source ${eqShape}: H=${eqH}mm, B=${eqB}mm, wall=${eqTw}mm (${srcWeight.toFixed(2)} kg/m)\n` +
    `FRP equivalent (${governingCriterion} governs): H≈${eqFrpH}mm, B≈${eqFrpB}mm, wall=${eqFrpWall}mm${fixedWall ? " (wall pinned)" : " (proportional)"} (${tgtWeight.toFixed(2)} kg/m)\n` +
    `Weight saving: ${weightSaving.toFixed(0)}%\n\n` +
    `Application / corrosion environment (please add): ____\n\nThanks.`;

  const inputClass = "w-full rounded-[6px] border border-border-default bg-white px-[13px] py-[8px] text-f13 text-t1 outline-none focus:border-teal";
  const selectClass = inputClass;
  const labelClass = "block text-f11 font-bold uppercase tracking-[2px] text-t3 mb-[5px]";

  const MaterialOptions = (
    <>
      <optgroup label="FRP — EN 13706-3">
        <option value="frp-e17">EN 13706 Grade E17</option>
        <option value="frp-e23">EN 13706 Grade E23</option>
      </optgroup>
      <optgroup label="FRP — GB 50608-2020 / T/CECS 692-2020">
        <option value="frp-gb50608-i">GB 50608 Class I (E≈23 GPa)</option>
        <option value="frp-gb50608-ii">GB 50608 Class II (E≈17 GPa)</option>
      </optgroup>
      <optgroup label="FRP — ASCE/SEI 74-23">
        <option value="frp-asce-std">ASCE 74-23 Standard</option>
        <option value="frp-asce-high">ASCE 74-23 High-Performance</option>
      </optgroup>
      <optgroup label="FRP — Custom / advanced">
        <option value="custom">Custom grade — define parameters (e.g. E40)</option>
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
      <div className="mx-auto max-w-[1280px] px-[34px]">
        {/* Mode tabs */}
        <div className="calculator-mode-tabs mb-[21px] flex gap-[8px]">
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
          <div className="calculator-grid grid gap-[21px] lg:grid-cols-[1fr_1fr]">
            {/* Input panel */}
            <div className="calculator-input-panel space-y-[13px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <SectionTag>Input Parameters</SectionTag>

              {/* One-click scenario presets — lower activation energy */}
              <div className="flex flex-wrap items-center gap-[6px]">
                <span className="text-f11 font-bold uppercase tracking-[2px] text-t3">Quick start:</span>
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="rounded-full border border-border-default bg-white px-[12px] py-[5px] text-f11 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

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

              {/* Custom (user-defined) FRP grade parameters — e.g. an E40 grade
                  above the EN 13706 E17/E23 presets. Editable characteristic values. */}
              {matKey === "custom" && (
                <CustomGradeInputs mat={customMat} setMat={setCustomMat} inputClass={inputClass} labelClass={labelClass} />
              )}

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

              {/* Live visual of the section the dims above describe */}
              <SectionPreview shape={shape} H={dimH} B={dimB} tw={dimTw} tf={dimTf} look={sectionLook} />

              {/* Basis line */}
              <p className="text-f11 text-t3">
                <strong>Material spec:</strong> {mat.standard} · <strong>Method:</strong> {dm.basis}
                {isFRP && <> · <strong>Env knockdown:</strong> ×{env.factor.toFixed(2)} ({env.note})</>}
              </p>
            </div>

            {/* Results panel */}
            <div className="calculator-results-panel space-y-[13px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <SectionTag>Results</SectionTag>

              {!dimsOk ? (
                <div className="rounded-[6px] border border-red-200 bg-red-50 p-[13px] text-f13 text-red-700">
                  Invalid section dimensions — wall thicknesses must fit inside the section
                  (t_w &lt; B and 2·t_f &lt; H). Results are hidden until the geometry is valid.
                </div>
              ) : (<>

              {/* Material properties — orthotropic for FRP, isotropic for metals */}
              <div className="rounded-[6px] bg-white p-[13px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">
                  Material Properties {isFRP ? "(orthotropic)" : "(isotropic)"}
                </div>
                {isFRP ? (
                  <div className="mt-[8px] grid grid-cols-7 gap-[8px] text-center">
                    <div><div className="text-f15 font-extrabold text-t1">{mat.E}</div><div className="text-f11 text-t3">E_L (GPa)</div></div>
                    <div><div className="text-f15 font-extrabold text-t1">{mat.E_T}</div><div className="text-f11 text-t3">E_T (GPa)</div></div>
                    <div><div className="text-f15 font-extrabold text-t1">{mat.G_LT}</div><div className="text-f11 text-t3">G_LT (GPa)</div></div>
                    <div><div className="text-f15 font-extrabold text-t1">{mat.sigma}</div><div className="text-f11 text-t3">F_tL (MPa)</div></div>
                    <div><div className="text-f15 font-extrabold text-t1">{mat.sigma_c}</div><div className="text-f11 text-t3">F_cL (MPa)</div></div>
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
                    ⚠ <strong>Local-buckling advisory:</strong> {slender.label} = {slender.ratio.toFixed(1)} &gt; {slender.limit}.
                    Pultruded FRP walls typically need {slender.label} ≤ {slender.limit} per ASCE/SEI 74-23 Ch.3 / CEN/TS 19101 §6.
                    Verify per the full local-buckling check or thicken the wall.
                  </div>
                )}
              </div>

              {/* F1 product match — routes a finished calc to the matching product page */}
              {isFRP && PRODUCT_BY_SHAPE[shape] && (() => {
                const prod = PRODUCT_BY_SHAPE[shape];
                const near = nearestStandardSize(shape, dimH);
                return (
                  <a
                    href={`/products/fiberglass-structural-shapes/${prod.slug}?source=calculator`}
                    onClick={() => track("calculator_product_click", { shape, slug: prod.slug })}
                    className="block rounded-[6px] border border-teal/30 bg-white p-[13px] transition-colors hover:border-teal"
                  >
                    <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">F1 makes this profile</div>
                    <div className="mt-[3px] text-f13 text-t2">
                      {near ? (
                        <>Closest stock size to your {dimH} mm section: <strong className="text-t1">{near.label}</strong>. </>
                      ) : null}
                      View the {prod.family} <span aria-hidden>→</span>
                    </div>
                  </a>
                );
              })()}

              {/* Send-to-engineer actions */}
              <div className="grid gap-[8px] sm:grid-cols-2">
                <a
                  href={`/contact?source=calculator&inquiry_type=rfq&context=${encodeURIComponent(JSON.stringify(specContext))}&message=${encodeURIComponent(specMessage)}`}
                  onClick={() => track("calculator_quote_click", { shape })}
                  className="rounded-[6px] bg-teal px-[16px] py-[10px] text-center text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
                >
                  📧 Send to engineering for a quote
                </a>
                <a
                  href={`/ask?prefill=${encodeURIComponent(
                    `I just used the FRP profile calculator. Standard: ${mat.standard}. Design method: ${dm.label}. Environment: ${env.label}. Material: ${mat.label}. ${shape} ${dimH}×${dimB}mm spanning ${span}mm under ${load} ${isDistributed ? "kN/m" : "kN"}. Bending ${sigma_max.toFixed(1)}/${F_b_allow.toFixed(1)} MPa, shear ${tau_max.toFixed(1)}/${F_v_allow.toFixed(1)} MPa, deflection ${defl.toFixed(1)} mm (${deflShearPct.toFixed(0)}% shear share). Is this sized correctly? What grade/resin should I specify for [my application]?`
                  )}`}
                  onClick={() => track("calculator_ai_click", { shape })}
                  className="rounded-[6px] border border-teal-border bg-teal-bg px-[16px] py-[10px] text-center text-f13 font-bold uppercase tracking-wide text-teal-text transition-colors hover:bg-teal/20"
                >
                  💬 Discuss results with AI
                </a>
              </div>

              {/* Result-moment email capture — convert at the aha-moment, no page jump */}
              <ResultLeadCapture source="calculator" summary={specMessage} context={specContext} />

              {/* Share + print/PDF actions keep the computed result portable. */}
              <div className="calculator-print-hide grid gap-[8px] sm:grid-cols-2">
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="w-full rounded-[6px] border border-border-default bg-white px-[16px] py-[8px] text-center text-f12 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
                >
                  {copied ? "✓ Link copied" : "🔗 Copy shareable result link"}
                </button>
                <button
                  type="button"
                  onClick={printResultReport}
                  className="w-full rounded-[6px] border border-border-default bg-white px-[16px] py-[8px] text-center text-f12 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
                >
                  Print / Save result as PDF
                </button>
              </div>

              </>)}

              <p className="text-f11 text-t3">
                Reference: EN 13706-3 · GB 50608-2020 / T/CECS 692-2020 · ASCE/SEI 74-23 · CEN/TS 19101:2022 · ASTM D3917.
                Calculator performs global bending (vs min tensile/compressive strength), average shear, and load-case-matched Timoshenko deflection only.
                Not modeled: local buckling, lateral-torsional buckling, web crippling, long-term creep deflection, the ASCE 74-23 time-effect factor λ,
                principal-axis bending of single angles, and connection design — these require dedicated analysis; contact F1 Composite engineering.
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

              {/* Standard wall-thickness quick-select for the source metal profile
                  — fills web + flange (still editable above). */}
              <div className="flex flex-wrap items-center gap-[6px]">
                <span className="text-f11 font-bold uppercase tracking-[2px] text-t3">
                  {eqSourceMat.startsWith("alu") ? "Alu" : "Steel"} std wall:
                </span>
                {(eqSourceMat.startsWith("alu") ? STD_WALLS.alu : STD_WALLS.steel).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => { setEqTw(w); setEqTf(w); }}
                    className={`rounded-full border px-[10px] py-[4px] text-f11 font-medium transition-colors ${
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
            <div className="space-y-[13px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <SectionTag>FRP Equivalent</SectionTag>

              {!eqDimsOk ? (
                <div className="rounded-[6px] border border-red-200 bg-red-50 p-[13px] text-f13 text-red-700">
                  Invalid section dimensions — wall thicknesses must fit inside the section
                  (t_w &lt; B and 2·t_f &lt; H). Results are hidden until the geometry is valid.
                </div>
              ) : (<>

              <div className="overflow-x-auto rounded-[6px] bg-white">
                <table className="w-full text-left text-f13">
                  <thead>
                    <tr className="border-b-2 border-border-default">
                      <th className="px-[13px] py-[10px] text-f11 font-bold uppercase tracking-wide text-t3">Property</th>
                      <th className="px-[13px] py-[10px] text-f11 font-bold uppercase tracking-wide text-t3">{srcMat.label}</th>
                      <th className="px-[13px] py-[10px] text-f11 font-bold uppercase tracking-wide text-teal-text">{tgtMat.label}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-default"><td className="px-[13px] py-[8px] text-t2">E (GPa)</td><td className="px-[13px] py-[8px] font-medium text-t1">{srcMat.E}</td><td className="px-[13px] py-[8px] font-medium text-teal">{tgtMat.E}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[13px] py-[8px] text-t2">σ (MPa) — metal σ_y / FRP min(F_tL, F_cL)</td><td className="px-[13px] py-[8px] font-medium text-t1">{srcMat.sigma}</td><td className="px-[13px] py-[8px] font-medium text-teal">{tgtSigma}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[13px] py-[8px] text-t2">Density (g/cm³)</td><td className="px-[13px] py-[8px] font-medium text-t1">{srcMat.density}</td><td className="px-[13px] py-[8px] font-medium text-teal">{tgtMat.density}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[13px] py-[8px] text-t2">Ix required (cm⁴)</td><td className="px-[13px] py-[8px] font-medium text-t1">{(srcIx / 1e4).toFixed(1)}</td><td className="px-[13px] py-[8px] font-medium text-teal">{(reqIx / 1e4).toFixed(1)}</td></tr>
                    <tr className="border-b border-border-default"><td className="px-[13px] py-[8px] text-t2">Wx required (cm³)</td><td className="px-[13px] py-[8px] font-medium text-t1">{(srcWx / 1e3).toFixed(1)}</td><td className="px-[13px] py-[8px] font-medium text-teal">{(reqWx / 1e3).toFixed(1)}</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="grid gap-[8px] sm:grid-cols-2">
                <div className="rounded-[6px] bg-white border border-border-default p-[13px]">
                  <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Equal Stiffness (EI)</div>
                  <div className="mt-[8px] grid grid-cols-3 gap-[8px] text-f13">
                    <div>H: <span className="font-bold text-t1">{stiffH} mm</span></div>
                    <div>B: <span className="font-bold text-t1">{stiffB} mm</span></div>
                    <div>t: <span className="font-bold text-t1">{stiffTw} mm</span></div>
                  </div>
                  <p className="mt-[5px] text-f11 text-t3">
                    {fixedWall ? `wall t = ${tWall} mm pinned; H solved for required Ix` : <>k = (E_src/E_tgt)<sup>1/4</sup> = ×{stiffnessScale.toFixed(2)}</>}
                  </p>
                </div>
                <div className="rounded-[6px] bg-white border border-border-default p-[13px]">
                  <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Equal Strength (σW)</div>
                  <div className="mt-[8px] grid grid-cols-3 gap-[8px] text-f13">
                    <div>H: <span className="font-bold text-t1">{strengthH} mm</span></div>
                    <div>B: <span className="font-bold text-t1">{strengthB} mm</span></div>
                    <div>t: <span className="font-bold text-t1">{strengthTw} mm</span></div>
                  </div>
                  <p className="mt-[5px] text-f11 text-t3">
                    {fixedWall ? `wall t = ${tWall} mm pinned; H solved for required Wx` : <>k = (σ_src/σ_tgt)<sup>1/3</sup> = ×{strengthScale.toFixed(2)}</>}
                  </p>
                </div>
              </div>

              <div className="rounded-[6px] bg-teal/10 border border-teal/20 p-[13px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Governing Criterion</div>
                <div className="mt-[5px] text-f15 font-bold text-t1">
                  {governingCriterion}{fixedWall ? ` — FRP ${eqFrpH}×${eqFrpB} mm @ ${tWall} mm wall` : ` — use ×${governingScale.toFixed(2)}`}
                </div>
                <p className="mt-[5px] text-f11 text-t3">
                  The FRP profile must satisfy <em>both</em> limits; the {fixedWall ? "larger reverse-solved section" : "larger scale factor"} governs.
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

              {/* Product match + result-moment lead capture for the FRP-vs-metal surface */}
              {PRODUCT_BY_SHAPE[eqShape] && (
                <a
                  href={`/products/fiberglass-structural-shapes/${PRODUCT_BY_SHAPE[eqShape].slug}?source=calculator`}
                  onClick={() => track("calculator_product_click", { shape: eqShape, slug: PRODUCT_BY_SHAPE[eqShape].slug, mode: "equivalence" })}
                  className="block rounded-[6px] bg-teal px-[16px] py-[10px] text-center text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
                >
                  View matching {PRODUCT_BY_SHAPE[eqShape].family} <span aria-hidden>→</span>
                </a>
              )}
              <ResultLeadCapture source="calculator-equivalence" summary={eqMessage} context={eqContext} />

              </>)}

              <p className="text-f11 text-t3">
                Geometrically similar scaling with both equal-stiffness (EI) and equal-strength (σW) checks per
                EN 13706-3, GB 50608-2020 / T/CECS 692-2020, ASCE/SEI 74-23, and CEN/TS 19101:2022 methodology.
                The strength comparison is at characteristic level (metal yield vs FRP min(F_tL, F_cL)) with no
                resistance or environmental factors, and equal EI does not include FRP shear deflection or creep —
                treat results as sizing guidance and confirm with the Beam Analysis tab&apos;s factored checks.
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
