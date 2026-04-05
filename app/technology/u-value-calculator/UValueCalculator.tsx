"use client";

import { useState, useMemo } from "react";
import SectionTag from "@/components/ui/SectionTag";

/* ══════════════════════════════════════════════════════
   Data — Frame systems, glass configs, spacer types
   ══════════════════════════════════════════════════════ */

const frameSystems = [
  { id: "frp-60", label: "F1 FRP 60-Series (60 mm, 3-chamber)", Uf: 1.5, width: 70 },
  { id: "frp-70", label: "F1 FRP 70-Series (70 mm, 4-chamber)", Uf: 1.2, width: 75 },
  { id: "frp-80", label: "F1 FRP 80-Series (80 mm, 5-chamber)", Uf: 1.0, width: 80 },
  { id: "frp-90", label: "F1 FRP 90-Series (90 mm, 6-chamber)", Uf: 0.85, width: 85 },
  { id: "alu-no-break", label: "Aluminium (no thermal break)", Uf: 5.9, width: 65 },
  { id: "alu-break", label: "Aluminium (polyamide break)", Uf: 3.2, width: 70 },
  { id: "pvc-multi", label: "PVC Multi-chamber", Uf: 1.5, width: 70 },
  { id: "pvc-steel", label: "PVC Steel-reinforced", Uf: 1.8, width: 70 },
  { id: "timber", label: "Timber (softwood, 68 mm)", Uf: 1.4, width: 75 },
];

const glassConfigs = [
  { id: "dg-air", label: "Double — 4/12Air/4", Ug: 2.8, thickness: 20 },
  { id: "dg-ar", label: "Double — 4/16Ar/4 Low-E", Ug: 1.1, thickness: 24 },
  { id: "dg-ar-6", label: "Double — 6/20Ar/6 Low-E", Ug: 1.0, thickness: 32 },
  { id: "tg-ar", label: "Triple — 4/14Ar/4/14Ar/4 2×Low-E", Ug: 0.6, thickness: 40 },
  { id: "tg-kr", label: "Triple — 4/12Kr/4/12Kr/4 2×Low-E", Ug: 0.5, thickness: 36 },
  { id: "tg-ar-wide", label: "Triple — 4/18Ar/4/18Ar/4 2×Low-E", Ug: 0.55, thickness: 48 },
  { id: "qg-kr", label: "Quadruple — 3/12Kr/3/12Kr/3/12Kr/3 3×Low-E", Ug: 0.3, thickness: 48 },
];

const spacerTypes = [
  { id: "alu", label: "Aluminium spacer", psi: 0.08 },
  { id: "steel", label: "Steel spacer", psi: 0.06 },
  { id: "warm-basic", label: "Warm-edge (standard)", psi: 0.04 },
  { id: "warm-premium", label: "Warm-edge (premium / TGI / Swisspacer)", psi: 0.03 },
];

const windowTypes = [
  { id: "fixed", label: "Fixed light", frameRatio: 0.15 },
  { id: "casement", label: "Casement / Tilt-turn", frameRatio: 0.25 },
  { id: "sliding", label: "Sliding door", frameRatio: 0.20 },
  { id: "entrance", label: "Entrance door (glazed)", frameRatio: 0.40 },
];

/* ══════════════════════════════════════════════════════
   U-value calculation per EN ISO 10077-1
   Uw = (Ag·Ug + Af·Uf + lg·Ψg) / (Ag + Af)
   ══════════════════════════════════════════════════════ */

function calcUw(
  width: number,
  height: number,
  frameWidth: number,
  Uf: number,
  Ug: number,
  psi: number,
) {
  const Aw = width * height; // total window area (mm²)
  const glassW = width - 2 * frameWidth;
  const glassH = height - 2 * frameWidth;

  if (glassW <= 0 || glassH <= 0) return null;

  const Ag = glassW * glassH; // glass area
  const Af = Aw - Ag; // frame area
  const lg = 2 * (glassW + glassH); // glass perimeter

  const Uw = (Ag * Ug + Af * Uf + lg * psi) / (Ag + Af);
  return {
    Uw: Math.round(Uw * 100) / 100,
    Ag: Ag / 1e6, // m²
    Af: Af / 1e6,
    glassRatio: Math.round((Ag / Aw) * 100),
    lg: lg / 1000, // m
  };
}

/* ══════════════════════════════════════════════════════
   Rating helper
   ══════════════════════════════════════════════════════ */

function getRating(Uw: number) {
  if (Uw <= 0.8) return { label: "Passive House Premium", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" };
  if (Uw <= 1.0) return { label: "Passive House / nZEB", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
  if (Uw <= 1.3) return { label: "Low-Energy Building", color: "text-teal", bg: "bg-teal/5 border-teal-border" };
  if (Uw <= 1.8) return { label: "Standard Compliant", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" };
  if (Uw <= 2.5) return { label: "Basic / Renovation", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" };
  return { label: "Below Standard", color: "text-red-600", bg: "bg-red-50 border-red-200" };
}

/* ══════════════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════════════ */

export default function UValueCalculator() {
  const [frame, setFrame] = useState("frp-70");
  const [glass, setGlass] = useState("tg-ar");
  const [spacer, setSpacer] = useState("warm-basic");
  const [winType, setWinType] = useState("casement");
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(1400);

  const selFrame = frameSystems.find((f) => f.id === frame)!;
  const selGlass = glassConfigs.find((g) => g.id === glass)!;
  const selSpacer = spacerTypes.find((s) => s.id === spacer)!;

  const result = useMemo(
    () => calcUw(width, height, selFrame.width, selFrame.Uf, selGlass.Ug, selSpacer.psi),
    [width, height, selFrame, selGlass, selSpacer],
  );

  // Compare with aluminium no-break baseline
  const baseline = useMemo(
    () => calcUw(width, height, 65, 5.9, selGlass.Ug, 0.08),
    [width, height, selGlass],
  );

  const improvement =
    result && baseline
      ? Math.round(((baseline.Uw - result.Uw) / baseline.Uw) * 100)
      : 0;

  const selectClass =
    "w-full rounded-[6px] border border-border-default bg-white px-[12px] py-[10px] text-f13 text-t1 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal";
  const labelClass = "block text-f11 font-bold uppercase tracking-[2px] text-t3 mb-[6px]";
  const inputClass =
    "w-full rounded-[6px] border border-border-default bg-white px-[12px] py-[10px] text-f13 text-t1 text-center focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal";

  return (
    <section className="bg-bg2 py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <SectionTag>Calculator</SectionTag>
        <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
          Whole-Window U-Value Calculator
        </h2>
        <p className="mt-[13px] max-w-[800px] text-f15 leading-golden text-t2">
          Calculate the overall thermal transmittance (U<sub>w</sub>) of a window or door
          unit per{" "}
          <strong>EN ISO 10077-1</strong>. Select frame material, glass configuration,
          spacer type, and window dimensions.
        </p>

        <div className="mt-[34px] grid gap-[21px] lg:grid-cols-[1fr_380px]">
          {/* ── Input panel ── */}
          <div className="space-y-[21px] rounded-[8px] border border-border-default bg-white p-[34px]">
            {/* Row 1: Frame + Glass */}
            <div className="grid gap-[21px] sm:grid-cols-2">
              <div>
                <label className={labelClass}>Frame System</label>
                <select value={frame} onChange={(e) => setFrame(e.target.value)} className={selectClass}>
                  <optgroup label="F1 Composite FRP">
                    {frameSystems.filter((f) => f.id.startsWith("frp")).map((f) => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Comparison Materials">
                    {frameSystems.filter((f) => !f.id.startsWith("frp")).map((f) => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </optgroup>
                </select>
                <span className="mt-[4px] block text-[11px] text-t3">
                  U<sub>f</sub> = {selFrame.Uf} W/m²K
                </span>
              </div>

              <div>
                <label className={labelClass}>Glass Configuration</label>
                <select value={glass} onChange={(e) => setGlass(e.target.value)} className={selectClass}>
                  <optgroup label="Double-Glazed">
                    {glassConfigs.filter((g) => g.id.startsWith("dg")).map((g) => (
                      <option key={g.id} value={g.id}>{g.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Triple-Glazed">
                    {glassConfigs.filter((g) => g.id.startsWith("tg")).map((g) => (
                      <option key={g.id} value={g.id}>{g.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Quadruple-Glazed">
                    {glassConfigs.filter((g) => g.id.startsWith("qg")).map((g) => (
                      <option key={g.id} value={g.id}>{g.label}</option>
                    ))}
                  </optgroup>
                </select>
                <span className="mt-[4px] block text-[11px] text-t3">
                  U<sub>g</sub> = {selGlass.Ug} W/m²K · {selGlass.thickness} mm thick
                </span>
              </div>
            </div>

            {/* Row 2: Spacer + Window type */}
            <div className="grid gap-[21px] sm:grid-cols-2">
              <div>
                <label className={labelClass}>Edge Spacer</label>
                <select value={spacer} onChange={(e) => setSpacer(e.target.value)} className={selectClass}>
                  {spacerTypes.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <span className="mt-[4px] block text-[11px] text-t3">
                  Ψ<sub>g</sub> = {selSpacer.psi} W/mK
                </span>
              </div>

              <div>
                <label className={labelClass}>Window Type</label>
                <select value={winType} onChange={(e) => setWinType(e.target.value)} className={selectClass}>
                  {windowTypes.map((w) => (
                    <option key={w.id} value={w.id}>{w.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Dimensions */}
            <div>
              <label className={labelClass}>Window Dimensions (mm)</label>
              <div className="flex items-center gap-[13px]">
                <div className="flex-1">
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Math.max(200, Number(e.target.value)))}
                    min={200}
                    max={4000}
                    step={50}
                    className={inputClass}
                  />
                  <span className="mt-[2px] block text-center text-[11px] text-t3">Width</span>
                </div>
                <span className="text-t3">×</span>
                <div className="flex-1">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Math.max(200, Number(e.target.value)))}
                    min={200}
                    max={4000}
                    step={50}
                    className={inputClass}
                  />
                  <span className="mt-[2px] block text-center text-[11px] text-t3">Height</span>
                </div>
              </div>
            </div>

            {/* Formula reference */}
            <div className="rounded-[6px] bg-bg2 px-[13px] py-[10px] text-[12px] leading-relaxed text-t3">
              <strong>EN ISO 10077-1 formula:</strong>{" "}
              U<sub>w</sub> = (A<sub>g</sub>·U<sub>g</sub> + A<sub>f</sub>·U<sub>f</sub> + l<sub>g</sub>·Ψ<sub>g</sub>) / (A<sub>g</sub> + A<sub>f</sub>)
            </div>
          </div>

          {/* ── Results panel ── */}
          <div className="space-y-[13px]">
            {result ? (
              <>
                {/* Main result */}
                <div className={`rounded-[8px] border p-[34px] text-center ${getRating(result.Uw).bg}`}>
                  <span className="block text-f11 font-bold uppercase tracking-[2px] text-t3">
                    Whole-Window U<sub>w</sub>
                  </span>
                  <span className="mt-[8px] block text-[52px] font-extrabold leading-none tracking-[-0.02em] text-t1">
                    {result.Uw.toFixed(2)}
                  </span>
                  <span className="block text-f13 text-t3">W/m²K</span>
                  <span className={`mt-[13px] inline-block rounded-full px-[13px] py-[4px] text-[12px] font-bold ${getRating(result.Uw).color} ${getRating(result.Uw).bg}`}>
                    {getRating(result.Uw).label}
                  </span>
                </div>

                {/* Breakdown */}
                <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
                  <h4 className="mb-[13px] text-f11 font-bold uppercase tracking-[2px] text-t3">
                    Breakdown
                  </h4>
                  <dl className="space-y-[8px] text-f13">
                    <div className="flex justify-between">
                      <dt className="text-t3">Glass area (A<sub>g</sub>)</dt>
                      <dd className="font-medium text-t1">{result.Ag.toFixed(2)} m²</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-t3">Frame area (A<sub>f</sub>)</dt>
                      <dd className="font-medium text-t1">{result.Af.toFixed(2)} m²</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-t3">Glass ratio</dt>
                      <dd className="font-medium text-t1">{result.glassRatio}%</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-t3">Glass perimeter (l<sub>g</sub>)</dt>
                      <dd className="font-medium text-t1">{result.lg.toFixed(2)} m</dd>
                    </div>
                    <div className="flex justify-between border-t border-border-default pt-[8px]">
                      <dt className="text-t3">Frame U<sub>f</sub></dt>
                      <dd className="font-medium text-t1">{selFrame.Uf} W/m²K</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-t3">Glass U<sub>g</sub></dt>
                      <dd className="font-medium text-t1">{selGlass.Ug} W/m²K</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-t3">Spacer Ψ<sub>g</sub></dt>
                      <dd className="font-medium text-t1">{selSpacer.psi} W/mK</dd>
                    </div>
                  </dl>
                </div>

                {/* Comparison */}
                {baseline && improvement > 0 && (
                  <div className="rounded-[8px] border border-teal-border bg-teal/5 p-[21px]">
                    <h4 className="mb-[8px] text-f11 font-bold uppercase tracking-[2px] text-teal">
                      vs Aluminium (no break)
                    </h4>
                    <p className="text-f13 text-t2">
                      <strong className="text-teal">{improvement}% better</strong> thermal
                      performance compared to an aluminium frame without thermal break
                      (U<sub>w</sub> = {baseline.Uw.toFixed(2)} W/m²K).
                    </p>
                  </div>
                )}

                {/* Quick reference */}
                <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
                  <h4 className="mb-[8px] text-f11 font-bold uppercase tracking-[2px] text-t3">
                    Performance Thresholds
                  </h4>
                  <div className="space-y-[6px] text-[12px]">
                    {[
                      { label: "Passive House Premium", max: "≤ 0.80" },
                      { label: "Passive House / nZEB", max: "≤ 1.00" },
                      { label: "Low-Energy Building", max: "≤ 1.30" },
                      { label: "Standard (EN/GB)", max: "≤ 1.80" },
                    ].map((t) => (
                      <div key={t.label} className="flex justify-between">
                        <span className="text-t3">{t.label}</span>
                        <span className={`font-medium ${result.Uw <= parseFloat(t.max.replace("≤ ", "")) ? "text-emerald-600" : "text-t3"}`}>
                          {t.max} W/m²K {result.Uw <= parseFloat(t.max.replace("≤ ", "")) ? "✓" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-[8px] border border-red-200 bg-red-50 p-[21px] text-f13 text-red-700">
                Window dimensions too small for the selected frame width. Increase width or height.
              </div>
            )}
          </div>
        </div>

        {/* ── Frame comparison table ── */}
        <div className="mt-[55px]">
          <h3 className="text-f24 font-bold text-t1">Frame Material U<sub>f</sub> Comparison</h3>
          <p className="mt-[8px] max-w-[700px] text-f13 text-t2">
            Frame thermal transmittance values used in this calculator. FRP frames achieve low
            U<sub>f</sub> values inherently — no thermal break inserts required.
          </p>
          <div className="mt-[21px] overflow-x-auto">
            <table className="w-full text-f13">
              <thead>
                <tr className="border-b-2 border-border-default text-left">
                  <th className="pb-[8px] pr-[21px] font-bold text-t1">Frame Material</th>
                  <th className="pb-[8px] pr-[21px] font-bold text-t1">U<sub>f</sub> (W/m²K)</th>
                  <th className="pb-[8px] pr-[21px] font-bold text-t1">Frame Width (mm)</th>
                  <th className="pb-[8px] font-bold text-t1">Thermal Break Required</th>
                </tr>
              </thead>
              <tbody>
                {frameSystems.map((f) => (
                  <tr
                    key={f.id}
                    className={`border-b border-border-default ${f.id.startsWith("frp") ? "bg-teal/5" : ""}`}
                  >
                    <td className="py-[8px] pr-[21px] text-t1">{f.label}</td>
                    <td className="py-[8px] pr-[21px] font-medium text-t1">{f.Uf}</td>
                    <td className="py-[8px] pr-[21px] text-t2">{f.width}</td>
                    <td className="py-[8px] text-t2">
                      {f.id.startsWith("frp") || f.id === "timber"
                        ? "No — inherently insulating"
                        : f.id === "alu-break"
                          ? "Yes — polyamide strip"
                          : f.id === "pvc-steel"
                            ? "Steel core creates thermal bridge"
                            : f.id === "pvc-multi"
                              ? "No — but lower stiffness"
                              : "No — but very high conductivity"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
