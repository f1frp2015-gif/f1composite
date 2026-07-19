"use client";

import { useState, useMemo, useEffect } from "react";
import SectionTag from "@/components/ui/SectionTag";
import { track, ResultLeadCapture } from "@/components/calculators/leadCapture";

/* ══════════════════════════════════════════════════════
   Data — Frame systems, glass configs, spacer types
   ══════════════════════════════════════════════════════ */

const frameSystems = [
  { id: "frp-65", label: "F1 FRP 65-Series (65 mm, 2-chamber)", Uf: 1.4, depth: 65, faceWidth: 54 },
  { id: "frp-70", label: "F1 FRP 70-Series (70 mm, 3-chamber)", Uf: 1.2, depth: 70, faceWidth: 58 },
  { id: "frp-80", label: "F1 FRP 80-Series (80 mm, 3-chamber)", Uf: 1.0, depth: 80, faceWidth: 65 },
  { id: "frp-90", label: "F1 FRP 90-Series (90 mm, 3-chamber)", Uf: 0.85, depth: 90, faceWidth: 72 },
  { id: "alu-no-break", label: "Aluminum (no thermal break)", Uf: 5.9, depth: 65, faceWidth: 50 },
  { id: "alu-break", label: "Aluminum (polyamide break)", Uf: 3.2, depth: 70, faceWidth: 55 },
  { id: "pvc-multi", label: "PVC Multi-chamber", Uf: 1.5, depth: 70, faceWidth: 62 },
  { id: "pvc-steel", label: "PVC Steel-reinforced", Uf: 1.8, depth: 70, faceWidth: 65 },
  { id: "timber", label: "Timber (softwood, 68 mm)", Uf: 1.4, depth: 75, faceWidth: 65 },
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
  { id: "alu", label: "Aluminum spacer", psi: 0.08 },
  { id: "steel", label: "Steel spacer", psi: 0.06 },
  { id: "warm-basic", label: "Warm-edge (standard)", psi: 0.04 },
  { id: "warm-premium", label: "Warm-edge (premium / TGI / Swisspacer)", psi: 0.03 },
];

const windowTypes = [
  { id: "fixed", label: "Fixed light", sashWidth: 0 },
  { id: "casement", label: "Casement / Tilt-turn", sashWidth: 58 },
  { id: "sliding", label: "Sliding door", sashWidth: 70 },
  { id: "entrance", label: "Entrance door (glazed)", sashWidth: 85 },
];

/* F1 fenestration product page — the result routes here with the U-value spec
   carried into the RFQ. There is one fenestration page; the series is named in
   the message. */
const FENESTRATION_SLUG = "/products/fenestration-systems";
const FRP_SERIES: Record<string, string> = {
  "frp-65": "65-Series", "frp-70": "70-Series", "frp-80": "80-Series", "frp-90": "90-Series",
};

/* One-click scenarios. The "Aluminum → FRP upgrade" preset starts on an aluminum
   frame so the visitor sees the thermal gap and the FRP upsell card. */
type WinPreset = { id: string; label: string; frame: string; glass: string; spacer: string; winType: string; width: number; height: number };
const PRESETS: WinPreset[] = [
  { id: "passive", label: "Passive house window", frame: "frp-90", glass: "tg-kr", spacer: "warm-premium", winType: "casement", width: 1200, height: 1400 },
  { id: "cold", label: "Cold-climate home", frame: "frp-80", glass: "tg-ar", spacer: "warm-basic", winType: "casement", width: 1200, height: 1400 },
  { id: "commercial", label: "Commercial fixed glazing", frame: "frp-70", glass: "dg-ar-6", spacer: "warm-basic", winType: "fixed", width: 1500, height: 2000 },
  { id: "upgrade", label: "Aluminum → FRP upgrade", frame: "alu-break", glass: "tg-ar", spacer: "warm-basic", winType: "casement", width: 1200, height: 1400 },
];

/* ══════════════════════════════════════════════════════
   U-value calculation per EN ISO 10077-1
   Uw = (Ag·Ug + Af·Uf + lg·Ψg) / (Ag + Af)
   ══════════════════════════════════════════════════════ */

function calcUw(
  width: number,
  height: number,
  faceWidth: number,
  Uf: number,
  Ug: number,
  psi: number,
  sashWidth: number,
) {
  // All dimensions in mm, convert to m for calculation
  const W = width / 1000; // m
  const H = height / 1000; // m
  const fw = faceWidth / 1000; // projected frame face width (m)
  const sw = sashWidth / 1000; // projected sash face width (m)
  const totalFrameW = fw + sw; // total projected width from window edge to glass (m)

  const Aw = W * H; // total window area (m²)
  const glassW = W - 2 * totalFrameW;
  const glassH = H - 2 * totalFrameW;

  if (glassW <= 0 || glassH <= 0) return null;

  const Ag = glassW * glassH; // glass area (m²)
  const Af = Aw - Ag; // frame area (m²)
  const lg = 2 * (glassW + glassH); // glass perimeter (m)

  // EN ISO 10077-1: Uw = (Ag·Ug + Af·Uf + lg·Ψg) / (Ag + Af)
  // Numerator splits into three physical heat-loss channels (units W/K):
  const qGlass = Ag * Ug; // heat lost through the glazing
  const qFrame = Af * Uf; // heat lost through the frame + sash
  const qEdge = lg * psi; // extra loss at the glass-edge thermal bridge (spacer)
  const L = qGlass + qFrame + qEdge; // total window heat-loss coefficient (W/K)
  const Uw = L / Aw;
  return {
    Uw: Math.round(Uw * 1000) / 1000,
    Aw,
    Ag,
    Af,
    glassRatio: Math.round((Ag / Aw) * 100),
    lg,
    glassW,
    glassH,
    totalFrameW,
    qGlass,
    qFrame,
    qEdge,
    L,
  };
}

/* ══════════════════════════════════════════════════════
   Calculation model — visualises the EN ISO 10077-1 logic:
   a scaled window diagram (Ag / Af / lg), the three heat-loss
   channels, and the formula assembled with the live numbers.
   ══════════════════════════════════════════════════════ */

type CalcResult = NonNullable<ReturnType<typeof calcUw>>;

function CalculationModel({
  result,
  Uf,
  Ug,
  psi,
  frameLabel,
  glassLabel,
  spacerLabel,
  width,
  height,
}: {
  result: CalcResult;
  Uf: number;
  Ug: number;
  psi: number;
  frameLabel: string;
  glassLabel: string;
  spacerLabel: string;
  width: number;
  height: number;
}) {
  /* ---- SVG geometry: scale the real window into a fixed viewbox ---- */
  const PAD = 46; // px padding for dimension labels
  const MAXW = 300;
  const MAXH = 300;
  const ar = width / height;
  let drawW = MAXW;
  let drawH = MAXW / ar;
  if (drawH > MAXH) {
    drawH = MAXH;
    drawW = MAXH * ar;
  }
  // frame band thickness in the drawing, proportional to the real frame width
  const bandX = (result.totalFrameW / (width / 1000)) * drawW;
  const bandY = (result.totalFrameW / (height / 1000)) * drawH;
  const svgW = drawW + PAD * 2;
  const svgH = drawH + PAD * 2;

  /* ---- heat-loss channel shares (of the numerator) ---- */
  const channels = [
    { key: "glass", label: "Glazing", term: "Aᵍ·Uᵍ", val: result.qGlass, color: "#38bdf8" },
    { key: "frame", label: "Frame + sash", term: "Aᶠ·Uᶠ", val: result.qFrame, color: "#0f766e" },
    { key: "edge", label: "Glass-edge bridge", term: "lᵍ·Ψᵍ", val: result.qEdge, color: "#f59e0b" },
  ];
  const pct = (v: number) => (result.L > 0 ? (v / result.L) * 100 : 0);

  const fmt = (n: number, d = 2) => n.toFixed(d);

  return (
    <div className="mt-[55px]">
      <h3 className="text-f24 font-bold text-t1">How this U-value is built</h3>
      <p className="mt-[8px] text-f13 leading-golden text-t2">
        The whole-window U-value is an <strong>area-weighted average</strong> of three parallel
        heat-loss paths — through the glass, through the frame, and the extra leak at the glass
        edge where the spacer bridges the seal. This model updates live with your selection above.
      </p>

      <div className="mt-[21px] grid gap-[21px] lg:grid-cols-[minmax(0,360px)_1fr]">
        {/* ── 1. Scaled window diagram ── */}
        <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
          <h4 className="mb-[13px] text-f11 font-bold uppercase tracking-[2px] text-t3">
            1 · Window geometry
          </h4>
          <div className="flex justify-center">
            <svg
              width="100%"
              viewBox={`0 0 ${svgW} ${svgH}`}
              style={{ maxWidth: svgW }}
              role="img"
              aria-label="Scaled window diagram showing glass area, frame area and glass edge perimeter"
            >
              {/* frame band = whole unit */}
              <rect x={PAD} y={PAD} width={drawW} height={drawH} fill="#0f766e" opacity={0.14} stroke="#0f766e" strokeWidth={1.5} />
              {/* glass */}
              <rect
                x={PAD + bandX}
                y={PAD + bandY}
                width={Math.max(0, drawW - 2 * bandX)}
                height={Math.max(0, drawH - 2 * bandY)}
                fill="#38bdf8"
                opacity={0.28}
              />
              {/* glass-edge perimeter (spacer thermal bridge) — dashed highlight */}
              <rect
                x={PAD + bandX}
                y={PAD + bandY}
                width={Math.max(0, drawW - 2 * bandX)}
                height={Math.max(0, drawH - 2 * bandY)}
                fill="none"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 3"
              />
              {/* labels */}
              <text x={PAD + drawW / 2} y={PAD + bandY / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f766e">
                Aᶠ frame {fmt(result.Af)} m²
              </text>
              <text x={PAD + drawW / 2} y={PAD + drawH / 2} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">
                Aᵍ glass
              </text>
              <text x={PAD + drawW / 2} y={PAD + drawH / 2 + 16} textAnchor="middle" fontSize="11" fill="#0369a1">
                {fmt(result.Ag)} m² · {result.glassRatio}%
              </text>
              {/* width dimension (top) */}
              <text x={PAD + drawW / 2} y={PAD - 16} textAnchor="middle" fontSize="11" fill="#64748b">
                W = {width} mm
              </text>
              <line x1={PAD} y1={PAD - 8} x2={PAD + drawW} y2={PAD - 8} stroke="#94a3b8" strokeWidth={1} />
              {/* height dimension (left, rotated) */}
              <text x={PAD - 14} y={PAD + drawH / 2} textAnchor="middle" fontSize="11" fill="#64748b" transform={`rotate(-90 ${PAD - 14} ${PAD + drawH / 2})`}>
                H = {height} mm
              </text>
              <line x1={PAD - 8} y1={PAD} x2={PAD - 8} y2={PAD + drawH} stroke="#94a3b8" strokeWidth={1} />
            </svg>
          </div>
          <ul className="mt-[13px] space-y-[5px] text-[12px] text-t2">
            <li className="flex items-center gap-[8px]">
              <span className="inline-block h-[10px] w-[10px] rounded-[2px]" style={{ background: "#38bdf8", opacity: 0.5 }} />
              Aᵍ — glass area = {fmt(result.glassW)} × {fmt(result.glassH)} = <strong>{fmt(result.Ag)} m²</strong>
            </li>
            <li className="flex items-center gap-[8px]">
              <span className="inline-block h-[10px] w-[10px] rounded-[2px]" style={{ background: "#0f766e", opacity: 0.4 }} />
              Aᶠ — frame + sash area = <strong>{fmt(result.Af)} m²</strong>
            </li>
            <li className="flex items-center gap-[8px]">
              <span className="inline-block h-[10px] w-[10px] rounded-[2px]" style={{ border: "2px dashed #f59e0b" }} />
              lᵍ — glass edge (spacer bridge) = <strong>{fmt(result.lg)} m</strong>
            </li>
          </ul>
        </div>

        {/* ── 2. Heat-loss channels + 3. Formula assembly ── */}
        <div className="space-y-[21px]">
          {/* Heat-loss channels */}
          <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
            <h4 className="mb-[4px] text-f11 font-bold uppercase tracking-[2px] text-t3">
              2 · Where the heat escapes
            </h4>
            <p className="mb-[13px] text-[12px] text-t3">
              Each path’s loss coefficient (W/K) = area (or length) × its U (or Ψ) value. Together
              they make the total window loss <strong>L = {fmt(result.L)} W/K</strong>.
            </p>

            {/* stacked bar */}
            <div className="flex h-[26px] w-full overflow-hidden rounded-[4px]">
              {channels.map((c) => (
                <div
                  key={c.key}
                  style={{ width: `${pct(c.val)}%`, background: c.color }}
                  className="h-full"
                  title={`${c.label}: ${fmt(c.val)} W/K`}
                />
              ))}
            </div>

            <dl className="mt-[13px] space-y-[9px]">
              {channels.map((c) => (
                <div key={c.key} className="flex items-center justify-between gap-[8px] text-f13">
                  <dt className="flex items-center gap-[8px] text-t2">
                    <span className="inline-block h-[10px] w-[10px] rounded-[2px]" style={{ background: c.color }} />
                    {c.label}
                    <span className="text-[11px] text-t3">({c.term})</span>
                  </dt>
                  <dd className="shrink-0 font-medium text-t1">
                    {fmt(c.val)} W/K
                    <span className="ml-[8px] inline-block w-[42px] text-right text-t3">{fmt(pct(c.val), 0)}%</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Formula assembly */}
          <div className="rounded-[8px] border border-teal-border bg-teal/5 p-[21px]">
            <h4 className="mb-[13px] text-f11 font-bold uppercase tracking-[2px] text-teal-text">
              3 · The formula, with your numbers
            </h4>
            <div className="space-y-[8px] font-mono text-[13px] leading-relaxed text-t1">
              <div className="text-t3">
                Uᵂ = (Aᵍ·Uᵍ + Aᶠ·Uᶠ + lᵍ·Ψᵍ) / (Aᵍ + Aᶠ)
              </div>
              <div>
                <span className="text-t3">= (</span>
                {fmt(result.Ag)}·{fmt(Ug)} + {fmt(result.Af)}·{fmt(Uf)} + {fmt(result.lg)}·{fmt(psi)}
                <span className="text-t3">) / (</span>
                {fmt(result.Ag)} + {fmt(result.Af)}
                <span className="text-t3">)</span>
              </div>
              <div>
                <span className="text-t3">= (</span>
                <span style={{ color: "#0284c7" }}>{fmt(result.qGlass)}</span> +{" "}
                <span style={{ color: "#0f766e" }}>{fmt(result.qFrame)}</span> +{" "}
                <span style={{ color: "#d97706" }}>{fmt(result.qEdge)}</span>
                <span className="text-t3">) / </span>
                {fmt(result.Aw)}
              </div>
              <div>
                <span className="text-t3">= </span>
                {fmt(result.L)} / {fmt(result.Aw)}
              </div>
              <div className="border-t border-teal-border pt-[8px] text-[15px] font-bold">
                Uᵂ = {result.Uw.toFixed(2)} W/m²K
              </div>
            </div>
            <p className="mt-[13px] text-[11px] leading-relaxed text-t3">
              Inputs — frame <strong>{frameLabel}</strong> (Uᶠ {fmt(Uf)}), glass{" "}
              <strong>{glassLabel}</strong> (Uᵍ {fmt(Ug)}), spacer <strong>{spacerLabel}</strong>{" "}
              (Ψᵍ {fmt(psi)}). Dimensions in m; areas m², perimeter m. Per EN ISO 10077-1 §5.2
              the window U-value is this area-weighted mean of the frame and glazing, plus the
              linear edge term.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Rating helper
   ══════════════════════════════════════════════════════ */

function getRating(Uw: number) {
  if (Uw <= 0.8) return { label: "Passive House (PHI target)", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" };
  if (Uw <= 1.0) return { label: "Near-Passive / nZEB", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
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
  const selWinType = windowTypes.find((w) => w.id === winType)!;

  const result = useMemo(
    () => calcUw(width, height, selFrame.faceWidth, selFrame.Uf, selGlass.Ug, selSpacer.psi, selWinType.sashWidth),
    [width, height, selFrame, selGlass, selSpacer, selWinType],
  );

  // Compare with aluminum no-break baseline (fixed light, aluminum spacer)
  const baseline = useMemo(
    () => calcUw(width, height, 50, 5.9, selGlass.Ug, 0.08, 0),
    [width, height, selGlass],
  );

  const improvement =
    result && baseline
      ? Math.round(((baseline.Uw - result.Uw) / baseline.Uw) * 100)
      : 0;

  const [copied, setCopied] = useState(false);

  /* Deep-link presets: read ?frame&glass&spacer&type&w&h on mount so other pages
     and AI agents can link into a pre-filled U-value calc. */
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if ([...sp.keys()].length === 0) return;
    const str = (k: string, set: (s: string) => void, allowed: string[]) => {
      const v = sp.get(k);
      if (v && allowed.includes(v)) set(v);
    };
    const num = (k: string, set: (n: number) => void) => {
      const v = sp.get(k);
      if (v != null && v !== "" && Number.isFinite(+v)) set(Math.max(200, +v));
    };
    str("frame", setFrame, frameSystems.map((f) => f.id));
    str("glass", setGlass, glassConfigs.map((g) => g.id));
    str("spacer", setSpacer, spacerTypes.map((s) => s.id));
    str("type", setWinType, windowTypes.map((w) => w.id));
    num("w", setWidth); num("h", setHeight);
  }, []);

  function applyPreset(p: WinPreset) {
    setFrame(p.frame); setGlass(p.glass); setSpacer(p.spacer); setWinType(p.winType);
    setWidth(p.width); setHeight(p.height);
    track("uvalue_preset", { preset: p.id });
  }

  function copyShareLink() {
    const sp = new URLSearchParams({
      frame, glass, spacer, type: winType, w: String(width), h: String(height),
    });
    const url = `${window.location.origin}/technology/u-value-calculator?${sp.toString()}`;
    navigator.clipboard?.writeText(url).then(
      () => { setCopied(true); setTimeout(() => setCopied(false), 2000); },
      () => {},
    );
    track("uvalue_share", { frame });
  }

  // Shared spec payload for the result-moment RFQ surfaces (only when computable).
  const rating = result ? getRating(result.Uw) : null;
  const specContext = result
    ? {
        tool: "u-value", frame: selFrame.label, Uf: selFrame.Uf, glass: selGlass.label, Ug: selGlass.Ug,
        spacer: selSpacer.label, psi: selSpacer.psi, windowType: selWinType.label,
        width_mm: width, height_mm: height, Uw: result.Uw, rating: rating!.label,
        glass_ratio_pct: result.glassRatio, vs_aluminum_pct: improvement,
      }
    : {};
  const specMessage = result
    ? `Please review this whole-window U-value calculation (EN ISO 10077-1):\n\n` +
      `Frame: ${selFrame.label} (Uf ${selFrame.Uf} W/m²K)\n` +
      `Glass: ${selGlass.label} (Ug ${selGlass.Ug} W/m²K)\n` +
      `Spacer: ${selSpacer.label} (Ψg ${selSpacer.psi} W/mK)\n` +
      `Window: ${selWinType.label}, ${width}×${height} mm, glass ratio ${result.glassRatio}%\n\n` +
      `Result: Uw = ${result.Uw.toFixed(2)} W/m²K (${rating!.label})` +
      (improvement > 0 ? `, ${improvement}% better than an aluminum-no-break baseline` : "") +
      `\n\nProject location / target standard (please add): ____\n` +
      `Quantities / sizes (please add): ____\n\nThanks.`
    : "";

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
        <p className="mt-[13px] text-f15 leading-golden text-t2">
          Calculate the overall thermal transmittance (U<sub>w</sub>) of a window or door
          unit per{" "}
          <strong>EN ISO 10077-1</strong>. Select frame material, glass configuration,
          spacer type, and window dimensions.
        </p>

        {/* Explicit grid placement (not source order) drives the layout: inputs
            top-left, results span the right, the result-context cards fill the
            space under the inputs. This balances the two columns (killing the old
            blank area) while keeping the DOM order inputs → result → context, so
            the single-column mobile stack still leads with the result. */}
        <div className="mt-[34px] grid items-start gap-[21px] lg:grid-cols-[1fr_380px]">
          {/* ── A · Input panel (top-left) ── */}
          <div className="space-y-[21px] rounded-[8px] border border-border-default bg-white p-[34px] lg:col-start-1 lg:row-start-1">
            {/* One-click scenario presets */}
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
                  U<sub>f</sub> = {selFrame.Uf} W/m²K · face {selFrame.faceWidth} mm
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
                <span className="mt-[4px] block text-[11px] text-t3">
                  Sash width: {selWinType.sashWidth} mm {selWinType.sashWidth === 0 ? "(no sash)" : ""}
                </span>
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
              <strong>EN ISO 10077-1:</strong>{" "}
              U<sub>w</sub> = (A<sub>g</sub>·U<sub>g</sub> + A<sub>f</sub>·U<sub>f</sub> + l<sub>g</sub>·Ψ<sub>g</sub>) / (A<sub>g</sub> + A<sub>f</sub>)
              <br />
              <span className="text-t3/70">
                Compliance targets compared: IECC / ENERGY STAR (US) · NRCan ENERGY STAR (Canada) · EPBD (EU) · GB 55015 / GB 50189 (China)
              </span>
            </div>
          </div>

          {/* ── B · Results panel (right column, spans both left rows) ── */}
          <div className="space-y-[13px] lg:col-start-2 lg:row-start-1 lg:row-span-2">
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

                {/* F1 fenestration product match — routes a finished calc to the product page */}
                {(() => {
                  const series = FRP_SERIES[frame];
                  return (
                    <a
                      href={`${FENESTRATION_SLUG}?source=u-value-calculator`}
                      onClick={() => track("uvalue_product_click", { frame, isFRP: !!series })}
                      className="block rounded-[8px] border border-teal/30 bg-white p-[21px] transition-colors hover:border-teal"
                    >
                      <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                        {series ? "F1 makes this frame" : "Switch to F1 FRP"}
                      </div>
                      <div className="mt-[4px] text-f13 text-t2">
                        {series ? (
                          <>This is the F1 FRP <strong className="text-t1">{series}</strong> fenestration system — request a quote against your U<sub>w</sub> {result.Uw.toFixed(2)} spec. </>
                        ) : (
                          <>F1 FRP frames reach U<sub>w</sub> as low as <strong className="text-t1">0.78 W/m²·K</strong> (PHI-certified 90-Series){improvement > 0 ? <> — up to {improvement}% better than your selection</> : null}. </>
                        )}
                        View FRP fenestration <span aria-hidden>→</span>
                      </div>
                    </a>
                  );
                })()}

                {/* Quote CTA carrying the computed U-value spec into the RFQ */}
                <a
                  href={`/contact?source=u-value-calculator&inquiry_type=rfq&context=${encodeURIComponent(JSON.stringify(specContext))}&message=${encodeURIComponent(specMessage)}`}
                  onClick={() => track("uvalue_quote_click", { frame })}
                  className="block rounded-[8px] bg-teal px-[16px] py-[12px] text-center text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
                >
                  📧 Get a fenestration quote
                </a>

                {/* Result-moment email capture — convert without a page jump */}
                <ResultLeadCapture
                  source="u-value-calculator"
                  inquiryType="Fenestration quote request"
                  summary={specMessage}
                  context={specContext}
                />

                {/* Shareable deep link to this U-value result */}
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="w-full rounded-[8px] border border-border-default bg-white px-[16px] py-[10px] text-center text-f12 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
                >
                  {copied ? "✓ Link copied" : "🔗 Copy a shareable link to this result"}
                </button>
              </>
            ) : (
              <div className="rounded-[8px] border border-red-200 bg-red-50 p-[21px] text-f13 text-red-700">
                Window dimensions too small for the selected frame width. Increase width or height.
              </div>
            )}
          </div>

          {/* ── C · Result-context cards. Placed under the inputs on desktop to
                balance the columns; rendered after the result in the DOM so the
                mobile stack still leads with the U-value. ── */}
          {result && (
            <div className="space-y-[21px] lg:col-start-1 lg:row-start-2">
              {/* Comparison — vs aluminum baseline */}
              {baseline && improvement > 0 && (
                <div className="rounded-[8px] border border-teal-border bg-teal/5 p-[21px]">
                  <h4 className="mb-[8px] text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                    vs Aluminum (no break)
                  </h4>
                  <p className="text-f13 text-t2">
                    <strong className="text-teal">{improvement}% better</strong> thermal
                    performance compared to an aluminum frame without thermal break
                    (U<sub>w</sub> = {baseline.Uw.toFixed(2)} W/m²K).
                  </p>
                </div>
              )}

              {/* Standards compliance — live ✓ against the current Uw */}
              <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <h4 className="mb-[8px] text-f11 font-bold uppercase tracking-[2px] text-t3">
                  Standards Compliance
                </h4>
                <div className="grid gap-x-[21px] gap-y-[6px] text-[12px] sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    { region: "🇪🇺 EU", label: "Passive House (PHI, cool-temperate)", max: 0.80, std: "EN ISO 10077" },
                    { region: "🇪🇺 EU", label: "nZEB (typical member state)", max: 1.30, std: "EPBD" },
                    { region: "🇺🇸 US", label: "ENERGY STAR v7.0 Northern", max: 1.25, std: "NFRC" },
                    { region: "🇺🇸 US", label: "ENERGY STAR v7.0 Southern", max: 1.82, std: "NFRC" },
                    { region: "🇺🇸 US", label: "IECC 2024 Zones 5–6", max: 1.53, std: "IECC/IRC" },
                    { region: "🇨🇦 CA", label: "ENERGY STAR (all Canada, 2020+)", max: 1.22, std: "NRCan" },
                    { region: "🇨🇳 CN", label: "Severe Cold public, WWR ≤ 0.2", max: 2.70, std: "GB 50189" },
                    { region: "🇨🇳 CN", label: "Severe Cold public, WWR 0.3–0.4", max: 2.20, std: "GB 50189" },
                  ].map((t) => (
                    <div key={`${t.region}-${t.label}`} className="flex items-center justify-between gap-[4px]">
                      <span className="text-t3 truncate">
                        {t.region} {t.label}
                      </span>
                      <span className={`shrink-0 font-medium ${result.Uw <= t.max ? "text-emerald-600" : "text-t3"}`}>
                        ≤ {t.max.toFixed(2)} {result.Uw <= t.max ? "✓" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Calculation model — visualises the EN ISO 10077-1 logic ── */}
        {result && (
          <CalculationModel
            result={result}
            Uf={selFrame.Uf}
            Ug={selGlass.Ug}
            psi={selSpacer.psi}
            frameLabel={selFrame.label}
            glassLabel={selGlass.label}
            spacerLabel={selSpacer.label}
            width={width}
            height={height}
          />
        )}

        {/* ── Frame comparison table ── */}
        <div className="mt-[55px]">
          <h3 className="text-f24 font-bold text-t1">Frame Material U<sub>f</sub> Comparison</h3>
          <p className="mt-[8px] text-f13 text-t2">
            Frame thermal transmittance values used in this calculator. FRP frames achieve low
            U<sub>f</sub> values inherently — no thermal break inserts required.
          </p>
          <div className="mt-[21px] overflow-x-auto">
            <table className="w-full text-f13">
              <thead>
                <tr className="border-b-2 border-border-default text-left">
                  <th className="pb-[8px] pr-[21px] font-bold text-t1">Frame Material</th>
                  <th className="pb-[8px] pr-[21px] font-bold text-t1">U<sub>f</sub> (W/m²K)</th>
                  <th className="pb-[8px] pr-[21px] font-bold text-t1">Profile Depth (mm)</th>
                  <th className="pb-[8px] pr-[21px] font-bold text-t1">Face Width (mm)</th>
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
                    <td className="py-[8px] pr-[21px] text-t2">{f.depth}</td>
                    <td className="py-[8px] pr-[21px] text-t2">{f.faceWidth}</td>
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
        {/* ── National standards reference ── */}
        <div className="mt-[55px]">
          <h3 className="text-f24 font-bold text-t1">Window U-Value Requirements by Standard</h3>
          <p className="mt-[8px] text-f13 text-t2">
            Maximum allowable whole-window thermal transmittance (U<sub>w</sub>) under major
            international building energy codes. Values shown are for residential windows unless noted.
          </p>
          <div className="mt-[21px] overflow-x-auto">
            <table className="w-full text-f13">
              <thead>
                <tr className="border-b-2 border-border-default text-left">
                  <th className="pb-[8px] pr-[13px] font-bold text-t1">Region</th>
                  <th className="pb-[8px] pr-[13px] font-bold text-t1">Standard</th>
                  <th className="pb-[8px] pr-[13px] font-bold text-t1">Climate Zone / Tier</th>
                  <th className="pb-[8px] pr-[13px] font-bold text-t1">Max U<sub>w</sub> (W/m²K)</th>
                  <th className="pb-[8px] font-bold text-t1">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { region: "Europe", std: "EN ISO 10077-1 / PHI", zone: "Passive House window (cool-temperate)", uw: "≤ 0.80", note: "PHI component criterion; U_w,installed ≤ 0.85" },
                  { region: "Europe", std: "EPBD / national codes", zone: "nZEB (Central Europe, typical)", uw: "≤ 1.30", note: "Member-state specific — always check the national annex" },
                  { region: "Europe", std: "EN 14351-1", zone: "CE Marking baseline", uw: "Declared", note: "No max limit — declared value for CE marking" },
                  { region: "USA", std: "IECC 2024 / IRC N1102", zone: "Zone 4 (New York)", uw: "≤ 1.70", note: "U ≤ 0.30 Btu/h·ft²·°F; mixed humid" },
                  { region: "USA", std: "IECC 2024 / IRC N1102", zone: "Zones 5–6 (Chicago)", uw: "≤ 1.53", note: "U ≤ 0.27 — tightened from 0.30 in IECC 2021" },
                  { region: "USA", std: "IECC 2024 / IRC N1102", zone: "Zones 7–8 (Alaska)", uw: "≤ 1.25", note: "U ≤ 0.22 — tightened from 0.30 in IECC 2021" },
                  { region: "USA", std: "ENERGY STAR v7.0 (2023)", zone: "Northern Zone", uw: "≤ 1.25", note: "U ≤ 0.22; SHGC ≥ 0.17 prescriptive path; most stringent US program" },
                  { region: "USA", std: "ENERGY STAR v7.0 (2023)", zone: "North-Central Zone", uw: "≤ 1.42", note: "U ≤ 0.25; SHGC ≤ 0.40" },
                  { region: "USA", std: "ENERGY STAR v7.0 (2023)", zone: "South-Central Zone", uw: "≤ 1.59", note: "U ≤ 0.28; SHGC ≤ 0.23" },
                  { region: "USA", std: "ENERGY STAR v7.0 (2023)", zone: "Southern Zone", uw: "≤ 1.82", note: "U ≤ 0.32; SHGC ≤ 0.23 primary" },
                  { region: "Canada", std: "NRCan ENERGY STAR v5.0", zone: "All Canada (single zone since 2020)", uw: "≤ 1.22", note: "Or Energy Rating ER ≥ 34; former A/B/C climate zones retired" },
                  { region: "Canada", std: "NBC 2020 / NECB", zone: "Prescriptive, climate-zone dependent", uw: "Varies", note: "See NBC 9.36 / NECB tables for the project climate zone" },
                  { region: "China", std: "GB 55015-2021", zone: "All zones — mandatory since Apr 2022", uw: "Zone / WWR dependent", note: "General code; supersedes the thermal provisions of GB 50189-2015" },
                  { region: "China", std: "GB 50189-2015", zone: "Severe Cold A/B, public, WWR ≤ 0.2", uw: "≤ 2.70", note: "Limits tighten with window-to-wall ratio (2.5 / 2.2 …)" },
                  { region: "China", std: "GB 50189-2015", zone: "Severe Cold C, public, WWR ≤ 0.2", uw: "≤ 2.90", note: "Shape factor ≤ 0.3 column; tightens with WWR" },
                  { region: "China", std: "GB/T 8484-2020", zone: "Test method", uw: "—", note: "Hot-box test method for window thermal performance" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border-default">
                    <td className="py-[8px] pr-[13px] text-t1 font-medium">{row.region}</td>
                    <td className="py-[8px] pr-[13px] text-t2 whitespace-nowrap">{row.std}</td>
                    <td className="py-[8px] pr-[13px] text-t1">{row.zone}</td>
                    <td className="py-[8px] pr-[13px] font-medium text-t1">{row.uw}</td>
                    <td className="py-[8px] text-t3 text-[12px]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-[21px] rounded-[6px] bg-bg2 px-[21px] py-[13px] text-[12px] leading-relaxed text-t3">
            <strong>Calculation standard:</strong> This calculator uses the EN ISO 10077-1 simplified method.
            For NFRC (US/Canada) ratings, use NFRC 100 simulation software (THERM + WINDOW) — NFRC model sizes
            and boundary conditions differ, so values are not interchangeable.
            For Chinese compliance, U-values are verified per GB/T 8484-2020 hot-box test against the limits of
            the mandatory GB 55015-2021. Values above are indicative — always confirm with the applicable edition
            and local authority.
          </div>
        </div>
      </div>
    </section>
  );
}
