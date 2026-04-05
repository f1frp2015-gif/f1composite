"use client";

import { useState } from "react";
import SectionTag from "@/components/ui/SectionTag";

/* ── Material database (EN 13706, ASTM, standard metals) ── */
const materials: Record<string, { label: string; E: number; sigma: number; density: number; group: string }> = {
  // FRP grades per EN 13706-3
  "frp-e17": { label: "FRP EN 13706 E17", E: 17, sigma: 170, density: 1.9, group: "FRP" },
  "frp-e23": { label: "FRP EN 13706 E23", E: 23, sigma: 240, density: 1.9, group: "FRP" },
  // ASCE Pre-Standard typical grades
  "frp-standard": { label: "FRP ASCE Standard Grade", E: 17.2, sigma: 207, density: 1.8, group: "FRP" },
  "frp-high": { label: "FRP ASCE High Performance", E: 27.6, sigma: 345, density: 1.9, group: "FRP" },
  // GB/T 31539-2015 Chinese standard for pultruded FRP profiles
  "frp-gb-i": { label: "FRP GB/T 31539 Grade I", E: 20, sigma: 200, density: 1.9, group: "FRP" },
  "frp-gb-ii": { label: "FRP GB/T 31539 Grade II", E: 15, sigma: 150, density: 1.8, group: "FRP" },
  // Metals
  "steel-s235": { label: "Steel S235 (EN 10025)", E: 210, sigma: 235, density: 7.85, group: "Metal" },
  "steel-s355": { label: "Steel S355 (EN 10025)", E: 210, sigma: 355, density: 7.85, group: "Metal" },
  "steel-q235": { label: "Steel Q235 (GB/T 700)", E: 206, sigma: 235, density: 7.85, group: "Metal" },
  "steel-q345": { label: "Steel Q345 (GB/T 1591)", E: 206, sigma: 345, density: 7.85, group: "Metal" },
  "alu-6061": { label: "Aluminium 6061-T6", E: 69, sigma: 276, density: 2.7, group: "Metal" },
  "alu-6063": { label: "Aluminium 6063-T5", E: 69, sigma: 186, density: 2.7, group: "Metal" },
};

const loadTypes = [
  { id: "udl", label: "Uniform Distributed Load (UDL)", factor_M: 1 / 8, factor_d: 5 / 384 },
  { id: "point-mid", label: "Point Load at Midspan", factor_M: 1 / 4, factor_d: 1 / 48 },
  { id: "cantilever-point", label: "Cantilever — Point Load at Tip", factor_M: 1, factor_d: 1 / 3 },
  { id: "cantilever-udl", label: "Cantilever — Uniform Load", factor_M: 1 / 2, factor_d: 1 / 8 },
];

const profileShapes = [
  { id: "i-beam", label: "I-Beam / Wide Flange" },
  { id: "channel", label: "Channel (U-Profile)" },
  { id: "angle", label: "Angle (L-Profile)" },
  { id: "square-tube", label: "Square / Rectangular Tube" },
  { id: "round-tube", label: "Round Tube" },
];

function calcIx(shape: string, h: number, b: number, tw: number, tf: number): number {
  // Returns second moment of area Ix in mm⁴
  if (shape === "i-beam") {
    return (b * h ** 3 - (b - tw) * (h - 2 * tf) ** 3) / 12;
  }
  if (shape === "channel") {
    return (b * h ** 3 - (b - tw) * (h - 2 * tf) ** 3) / 12;
  }
  if (shape === "angle") {
    // Equal-leg angle: Ix about centroidal axis parallel to one leg
    // Approximation: two rectangles (vertical leg h×t, horizontal leg (b-t)×t)
    const t = tw;
    const yBar = (h * t * h / 2 + (b - t) * t * t / 2) / (h * t + (b - t) * t);
    const Iv = (t * h ** 3) / 12 + h * t * (h / 2 - yBar) ** 2;
    const Ih = ((b - t) * t ** 3) / 12 + (b - t) * t * (yBar - t / 2) ** 2;
    return Iv + Ih;
  }
  if (shape === "square-tube") {
    return (b * h ** 3 - (b - 2 * tw) * (h - 2 * tw) ** 3) / 12;
  }
  if (shape === "round-tube") {
    const Ro = h / 2;
    const Ri = Ro - tw;
    return (Math.PI / 4) * (Ro ** 4 - Ri ** 4);
  }
  return 0;
}

function calcWx(Ix: number, h: number, shape?: string, b?: number, tw?: number): number {
  if (shape === "angle" && b && tw) {
    // Distance to extreme fiber from centroid
    const t = tw;
    const yBar = (h * t * h / 2 + (b - t) * t * t / 2) / (h * t + (b - t) * t);
    const maxDist = Math.max(yBar, h - yBar);
    return Ix / maxDist;
  }
  return Ix / (h / 2);
}

function calcArea(shape: string, h: number, b: number, tw: number, tf: number): number {
  if (shape === "i-beam") return 2 * b * tf + (h - 2 * tf) * tw;
  if (shape === "channel") return 2 * b * tf + (h - 2 * tf) * tw;
  if (shape === "angle") return h * tw + (b - tw) * tw;
  if (shape === "square-tube") return b * h - (b - 2 * tw) * (h - 2 * tw);
  if (shape === "round-tube") {
    const Ro = h / 2;
    const Ri = Ro - tw;
    return Math.PI * (Ro ** 2 - Ri ** 2);
  }
  return 0;
}

type Mode = "beam" | "equivalence";

export default function ProfileCalculator() {
  const [mode, setMode] = useState<Mode>("beam");

  // Beam calc state
  const [matKey, setMatKey] = useState("frp-e23");
  const [loadType, setLoadType] = useState("udl");
  const [span, setSpan] = useState(3000);
  const [load, setLoad] = useState(5); // kN/m for UDL, kN for point
  const [shape, setShape] = useState("i-beam");
  const [dimH, setDimH] = useState(200);
  const [dimB, setDimB] = useState(100);
  const [dimTw, setDimTw] = useState(10);
  const [dimTf, setDimTf] = useState(10);
  const [deflLimit, setDeflLimit] = useState(250);

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
  const Ix = calcIx(shape, dimH, dimB, dimTw, dimTf);
  const Wx = calcWx(Ix, dimH, shape, dimB, dimTw);
  const area = calcArea(shape, dimH, dimB, dimTw, dimTf);

  const isDistributed = loadType === "udl" || loadType === "cantilever-udl";
  const totalForce = isDistributed ? load * (span / 1000) : load;
  const M_max = isDistributed
    ? lt.factor_M * load * (span / 1000) * (span / 1000) * 1e6
    : lt.factor_M * load * span * 1000;
  // Bending stress in MPa
  const sigma_max = Wx > 0 ? M_max / Wx : 0;
  // Deflection in mm
  const defl = isDistributed
    ? (lt.factor_d * load * (span ** 4)) / (mat.E * 1000 * Ix)
    : (lt.factor_d * load * 1000 * (span ** 3)) / (mat.E * 1000 * Ix);
  const deflRatio = span / (defl || 1);
  const weightPerM = (area / 1e6) * mat.density; // kg/m

  const stressOk = sigma_max <= mat.sigma;
  const deflOk = deflRatio >= deflLimit;

  /* ── Equivalence calculation ── */
  const srcMat = materials[eqSourceMat];
  const tgtMat = materials[eqTargetMat];
  const srcIx = calcIx(eqShape, eqH, eqB, eqTw, eqTf);
  const srcWx = calcWx(srcIx, eqH, eqShape, eqB, eqTw);
  const srcArea = calcArea(eqShape, eqH, eqB, eqTw, eqTf);

  // Equal strength: W_target = W_source * (σ_source / σ_target)
  const reqWx = srcWx * (srcMat.sigma / tgtMat.sigma);
  // Equal stiffness: I_target = I_source * (E_source / E_target)
  const reqIx = srcIx * (srcMat.E / tgtMat.E);
  // Scale factor (approximate: assuming similar shape, scale h by cube root ratio)
  const stiffnessScale = Math.pow(srcMat.E / tgtMat.E, 1 / 3);
  const suggestedH = Math.round(eqH * stiffnessScale);
  const suggestedB = Math.round(eqB * stiffnessScale);

  const srcWeight = (srcArea / 1e6) * srcMat.density;
  const tgtAreaApprox = calcArea(eqShape, suggestedH, suggestedB, Math.round(eqTw * stiffnessScale), Math.round(eqTf * stiffnessScale));
  const tgtWeight = (tgtAreaApprox / 1e6) * tgtMat.density;
  const weightSaving = srcWeight > 0 ? ((1 - tgtWeight / srcWeight) * 100) : 0;

  const inputClass = "w-full rounded-[6px] border border-border-default bg-white px-[13px] py-[8px] text-f13 text-t1 outline-none focus:border-teal";
  const selectClass = "w-full rounded-[6px] border border-border-default bg-white px-[13px] py-[8px] text-f13 text-t1 outline-none focus:border-teal";
  const labelClass = "block text-f11 font-bold uppercase tracking-[2px] text-t3 mb-[5px]";

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
            Steel → FRP Equivalence
          </button>
        </div>

        {mode === "beam" && (
          <div className="grid gap-[21px] lg:grid-cols-[1fr_1fr]">
            {/* Input panel */}
            <div className="space-y-[13px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <SectionTag>Input Parameters</SectionTag>

              <div className="grid gap-[13px] sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Material</label>
                  <select value={matKey} onChange={(e) => setMatKey(e.target.value)} className={selectClass}>
                    <optgroup label="FRP — EN 13706">
                      <option value="frp-e17">EN 13706 Grade E17</option>
                      <option value="frp-e23">EN 13706 Grade E23</option>
                    </optgroup>
                    <optgroup label="FRP — GB/T 31539-2015">
                      <option value="frp-gb-i">GB/T 31539 Grade I</option>
                      <option value="frp-gb-ii">GB/T 31539 Grade II</option>
                    </optgroup>
                    <optgroup label="FRP — ASCE Pre-Standard">
                      <option value="frp-standard">ASCE Standard Grade</option>
                      <option value="frp-high">ASCE High Performance</option>
                    </optgroup>
                    <optgroup label="Steel — EN">
                      <option value="steel-s235">S235 (EN 10025)</option>
                      <option value="steel-s355">S355 (EN 10025)</option>
                    </optgroup>
                    <optgroup label="Steel — GB">
                      <option value="steel-q235">Q235 (GB/T 700)</option>
                      <option value="steel-q345">Q345 (GB/T 1591)</option>
                    </optgroup>
                    <optgroup label="Aluminium">
                      <option value="alu-6061">6061-T6</option>
                      <option value="alu-6063">6063-T5</option>
                    </optgroup>
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
                  <label className={labelClass}>{isDistributed ? "Load (kN/m)" : "Load (kN)"}</label>
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
            </div>

            {/* Results panel */}
            <div className="space-y-[13px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <SectionTag>Results</SectionTag>

              {/* Material properties */}
              <div className="rounded-[6px] bg-white p-[13px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Material Properties</div>
                <div className="mt-[8px] grid grid-cols-3 gap-[8px] text-center">
                  <div>
                    <div className="text-f19 font-extrabold text-t1">{mat.E}</div>
                    <div className="text-f11 text-t3">E (GPa)</div>
                  </div>
                  <div>
                    <div className="text-f19 font-extrabold text-t1">{mat.sigma}</div>
                    <div className="text-f11 text-t3">σ (MPa)</div>
                  </div>
                  <div>
                    <div className="text-f19 font-extrabold text-t1">{mat.density}</div>
                    <div className="text-f11 text-t3">ρ (g/cm³)</div>
                  </div>
                </div>
              </div>

              {/* Section properties */}
              <div className="rounded-[6px] bg-white p-[13px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Section Properties</div>
                <div className="mt-[8px] grid grid-cols-3 gap-[8px] text-center">
                  <div>
                    <div className="text-f15 font-bold text-t1">{(Ix / 1e4).toFixed(1)}</div>
                    <div className="text-f11 text-t3">Ix (cm⁴)</div>
                  </div>
                  <div>
                    <div className="text-f15 font-bold text-t1">{(Wx / 1e3).toFixed(1)}</div>
                    <div className="text-f11 text-t3">Wx (cm³)</div>
                  </div>
                  <div>
                    <div className="text-f15 font-bold text-t1">{weightPerM.toFixed(2)}</div>
                    <div className="text-f11 text-t3">kg/m</div>
                  </div>
                </div>
              </div>

              {/* Check results */}
              <div className="grid gap-[8px] sm:grid-cols-2">
                <div className={`rounded-[6px] p-[13px] ${stressOk ? "bg-teal/10 border border-teal/20" : "bg-red-50 border border-red-200"}`}>
                  <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Bending Stress</div>
                  <div className={`mt-[5px] text-f24 font-extrabold ${stressOk ? "text-teal" : "text-red-600"}`}>
                    {sigma_max.toFixed(1)} MPa
                  </div>
                  <div className="text-f11 text-t3">
                    {stressOk ? "✓" : "✗"} Limit: {mat.sigma} MPa ({((sigma_max / mat.sigma) * 100).toFixed(0)}%)
                  </div>
                </div>
                <div className={`rounded-[6px] p-[13px] ${deflOk ? "bg-teal/10 border border-teal/20" : "bg-red-50 border border-red-200"}`}>
                  <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Deflection</div>
                  <div className={`mt-[5px] text-f24 font-extrabold ${deflOk ? "text-teal" : "text-red-600"}`}>
                    {defl.toFixed(1)} mm
                  </div>
                  <div className="text-f11 text-t3">
                    {deflOk ? "✓" : "✗"} L/{deflRatio.toFixed(0)} (limit L/{deflLimit})
                  </div>
                </div>
              </div>

              <div className="rounded-[6px] bg-white p-[13px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Load Summary</div>
                <div className="mt-[8px] grid grid-cols-2 gap-[8px] text-f13 text-t2">
                  <div>Max moment: <span className="font-bold text-t1">{(M_max / 1e6).toFixed(2)} kNm</span></div>
                  <div>Total force: <span className="font-bold text-t1">{totalForce.toFixed(1)} kN</span></div>
                </div>
              </div>

              <p className="text-f11 text-t3">
                Reference: EN 13706-3, GB/T 31539-2015, ASTM D3917, ASCE Pre-Standard for LRFD of FRP Structures. Results are for preliminary sizing only — always verify with project-specific engineering analysis.
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
                      <option value="steel-q345">Q345 (GB/T 1591)</option>
                    </optgroup>
                    <optgroup label="Aluminium">
                      <option value="alu-6061">6061-T6</option>
                      <option value="alu-6063">6063-T5</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Target FRP Grade</label>
                  <select value={eqTargetMat} onChange={(e) => setEqTargetMat(e.target.value)} className={selectClass}>
                    <optgroup label="EN 13706">
                      <option value="frp-e17">EN 13706 E17</option>
                      <option value="frp-e23">EN 13706 E23</option>
                    </optgroup>
                    <optgroup label="GB/T 31539-2015">
                      <option value="frp-gb-i">GB/T 31539 Grade I</option>
                      <option value="frp-gb-ii">GB/T 31539 Grade II</option>
                    </optgroup>
                    <optgroup label="ASCE">
                      <option value="frp-standard">ASCE Standard</option>
                      <option value="frp-high">ASCE High Performance</option>
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

              {/* Comparison table */}
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
                    <tr className="border-b border-border-default">
                      <td className="px-[13px] py-[8px] text-t2">E (GPa)</td>
                      <td className="px-[13px] py-[8px] font-medium text-t1">{srcMat.E}</td>
                      <td className="px-[13px] py-[8px] font-medium text-teal">{tgtMat.E}</td>
                    </tr>
                    <tr className="border-b border-border-default">
                      <td className="px-[13px] py-[8px] text-t2">σ (MPa)</td>
                      <td className="px-[13px] py-[8px] font-medium text-t1">{srcMat.sigma}</td>
                      <td className="px-[13px] py-[8px] font-medium text-teal">{tgtMat.sigma}</td>
                    </tr>
                    <tr className="border-b border-border-default">
                      <td className="px-[13px] py-[8px] text-t2">Density (g/cm³)</td>
                      <td className="px-[13px] py-[8px] font-medium text-t1">{srcMat.density}</td>
                      <td className="px-[13px] py-[8px] font-medium text-teal">{tgtMat.density}</td>
                    </tr>
                    <tr className="border-b border-border-default">
                      <td className="px-[13px] py-[8px] text-t2">Ix required (cm⁴)</td>
                      <td className="px-[13px] py-[8px] font-medium text-t1">{(srcIx / 1e4).toFixed(1)}</td>
                      <td className="px-[13px] py-[8px] font-medium text-teal">{(reqIx / 1e4).toFixed(1)}</td>
                    </tr>
                    <tr className="border-b border-border-default">
                      <td className="px-[13px] py-[8px] text-t2">Wx required (cm³)</td>
                      <td className="px-[13px] py-[8px] font-medium text-t1">{(srcWx / 1e3).toFixed(1)}</td>
                      <td className="px-[13px] py-[8px] font-medium text-teal">{(reqWx / 1e3).toFixed(1)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Suggested dimensions */}
              <div className="rounded-[6px] bg-teal/10 border border-teal/20 p-[13px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Suggested FRP Dimensions (Equal Stiffness)</div>
                <div className="mt-[8px] grid grid-cols-2 gap-[8px] text-f15">
                  <div>H: <span className="font-bold text-t1">{suggestedH} mm</span></div>
                  <div>B: <span className="font-bold text-t1">{suggestedB} mm</span></div>
                </div>
                <p className="mt-[5px] text-f11 text-t3">
                  Scale factor ×{stiffnessScale.toFixed(2)} applied to match flexural stiffness (EI).
                  Strength check may allow smaller dimensions.
                </p>
              </div>

              {/* Weight comparison */}
              <div className="grid gap-[8px] sm:grid-cols-3">
                <div className="rounded-[6px] bg-white p-[13px] text-center">
                  <div className="text-f19 font-extrabold text-t1">{srcWeight.toFixed(2)}</div>
                  <div className="text-f11 text-t3">Source (kg/m)</div>
                </div>
                <div className="rounded-[6px] bg-white p-[13px] text-center">
                  <div className="text-f19 font-extrabold text-teal">{tgtWeight.toFixed(2)}</div>
                  <div className="text-f11 text-t3">FRP (kg/m)</div>
                </div>
                <div className="rounded-[6px] bg-teal/10 border border-teal/20 p-[13px] text-center">
                  <div className="text-f19 font-extrabold text-teal">{weightSaving.toFixed(0)}%</div>
                  <div className="text-f11 text-t3">Weight Saving</div>
                </div>
              </div>

              <p className="text-f11 text-t3">
                Based on equal-stiffness substitution per EN 13706-3, GB/T 31539-2015, and ASCE Pre-Standard methodology.
                FRP profiles governed by deflection (E·I), not yield strength. Consult F1 Composite engineering for project-specific verification.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
