"use client";

import { useState, useMemo, useEffect } from "react";
import { track, ResultLeadCapture } from "@/components/calculators/leadCapture";
import { buildToolStateHref, readToolStateParams } from "@/lib/toolStateUrl";
import { calcWindowUw } from "@/lib/windowUValue";

import {
  PHI_FRAME_ID,
  PHI_GLASS_ID,
  PHI_SPACER_ID,
  TARGET_COMPARISON,
  frameSystems,
  glassConfigs,
  spacerTypes,
  windowTypes,
} from "@/lib/windowUValueData";

/* F1 fenestration product page — the result routes here with the U-value spec
   carried into the RFQ. There is one fenestration page; the series is named in
   the message. */
const FENESTRATION_SLUG = "/products/frp-window-frames";
const FRP_SERIES: Record<string, string> = {
  "frp-65": "65-Series", "frp-70": "70-Series", "frp-80": "80-Series", "frp-90": "90-Series",
  [PHI_FRAME_ID]: "Fengdu Passive GFRP 90 certificate reference",
};

/* One-click scenarios. The "Aluminum → FRP upgrade" preset starts on an aluminum
   frame so the visitor sees the thermal gap and the FRP upsell card. */
type WinPreset = { id: string; label: string; frame: string; glass: string; spacer: string; winType: string; width: number; height: number };
const PRESETS: WinPreset[] = [
  { id: "phi-cert", label: "PHI certificate 2491wi03", frame: PHI_FRAME_ID, glass: PHI_GLASS_ID, spacer: PHI_SPACER_ID, winType: "fixed", width: 1230, height: 1480 },
  { id: "passive", label: "Passive house window", frame: "frp-90", glass: "tg-kr", spacer: "warm-premium", winType: "casement", width: 1200, height: 1400 },
  { id: "cold", label: "Cold-climate home", frame: "frp-80", glass: "tg-ar", spacer: "warm-basic", winType: "casement", width: 1200, height: 1400 },
  { id: "commercial", label: "Commercial fixed glazing", frame: "frp-70", glass: "dg-ar-6", spacer: "warm-basic", winType: "fixed", width: 1500, height: 2000 },
  { id: "upgrade", label: "Aluminum → FRP upgrade", frame: "alu-break", glass: "tg-ar", spacer: "warm-basic", winType: "casement", width: 1200, height: 1400 },
];

/* ══════════════════════════════════════════════════════
   U-value calculation per EN ISO 10077-1
   Uw = (Ag·Ug + Af·Uf + lg·Ψg) / (Ag + Af)
   ══════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   Calculation model — visualizes the EN ISO 10077-1 logic:
   a scaled window diagram (Ag / Af / lg), the three heat-loss
   channels, and the formula assembled with the live numbers.
   ══════════════════════════════════════════════════════ */

type CalcResult = NonNullable<ReturnType<typeof calcWindowUw>>;

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
    { key: "glass", label: "Glazing", term: <>A<sub>g</sub>·U<sub>g</sub></>, val: result.qGlass, color: "#38bdf8" },
    { key: "frame", label: "Frame + sash", term: <>A<sub>f</sub>·U<sub>f</sub></>, val: result.qFrame, color: "#0f766e" },
    { key: "edge", label: "Glass-edge bridge", term: <>l<sub>g</sub>·Ψ<sub>g</sub></>, val: result.qEdge, color: "#f59e0b" },
  ];
  const pct = (v: number) => (result.L > 0 ? (v / result.L) * 100 : 0);

  const fmt = (n: number, d = 2) => n.toFixed(d);

  return (
    <div className="mt-[48px]">
      <h3 className="text-f24 font-bold text-t1">How this U-value is built</h3>
      <p className="mt-[8px] text-f14 leading-golden text-t2">
        The whole-window U-value is an <strong>area-weighted average</strong> of three parallel
        heat-loss paths — through the glass, through the frame, and the extra leak at the glass
        edge where the spacer bridges the seal. This model updates live with your selection above.
      </p>

      <div className="mt-[20px] grid gap-[20px] lg:grid-cols-[minmax(0,360px)_1fr]">
        {/* ── 1. Scaled window diagram ── */}
        <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
          <h4 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3 mb-[12px]">
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
                A<tspan dy="3" fontSize="8">f</tspan>
                <tspan dy="-3"> frame {fmt(result.Af)} m²</tspan>
              </text>
              <text x={PAD + drawW / 2} y={PAD + drawH / 2} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">
                A<tspan dy="3" fontSize="9">g</tspan>
                <tspan dy="-3"> glass</tspan>
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
          <ul className="mt-[12px] space-y-[4px] text-f12 text-t2">
            <li className="flex items-center gap-[8px]">
              <span className="inline-block h-[10px] w-[10px] rounded-tag" style={{ background: "#38bdf8", opacity: 0.5 }} />
              <span>
                A<sub>g</sub> — glass area = {fmt(result.glassW)} × {fmt(result.glassH)} = <strong>{fmt(result.Ag)} m²</strong>
              </span>
            </li>
            <li className="flex items-center gap-[8px]">
              <span className="inline-block h-[10px] w-[10px] rounded-tag" style={{ background: "#0f766e", opacity: 0.4 }} />
              <span>
                A<sub>f</sub> — frame + sash area = <strong>{fmt(result.Af)} m²</strong>
              </span>
            </li>
            <li className="flex items-center gap-[8px]">
              <span className="inline-block h-[10px] w-[10px] rounded-tag" style={{ border: "2px dashed #f59e0b" }} />
              <span>
                l<sub>g</sub> — glass edge (spacer bridge) = <strong>{fmt(result.lg)} m</strong>
              </span>
            </li>
          </ul>
        </div>

        {/* ── 2. Heat-loss channels + 3. Formula assembly ── */}
        <div className="space-y-[20px]">
          {/* Heat-loss channels */}
          <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
            <h4 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3 mb-[4px]">
              2 · Where the heat escapes
            </h4>
            <p className="mb-[12px] text-f12 text-t3">
              Each path’s loss coefficient (W/K) = area (or length) × its U (or Ψ) value. Together
              they make the total window loss <strong>L = {fmt(result.L)} W/K</strong>.
            </p>

            {/* stacked bar */}
            <div className="flex h-[26px] w-full gap-[2px] overflow-hidden rounded-tag">
              {channels.map((c) => (
                <div
                  key={c.key}
                  style={{ width: `${pct(c.val)}%`, background: c.color }}
                  className="h-full"
                  title={`${c.label}: ${fmt(c.val)} W/K`}
                />
              ))}
            </div>

            <dl className="mt-[12px] space-y-[8px]">
              {channels.map((c) => (
                <div key={c.key} className="flex items-center justify-between gap-[8px] text-f14">
                  <dt className="flex items-center gap-[8px] text-t2">
                    <span className="inline-block h-[10px] w-[10px] rounded-tag" style={{ background: c.color }} />
                    {c.label}
                    <span className="text-f12 text-t3">({c.term})</span>
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
          <div className="rounded-card border border-teal-border bg-teal-bg p-[20px]">
            <h4 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3 mb-[12px]">
              3 · The formula, with your numbers
            </h4>
            {/* Each bracket stays whole; a narrow screen breaks the line at the division. */}
            <div className="space-y-[8px] font-mono text-f12 leading-relaxed text-t1 sm:text-f14">
              <p className="text-t3">
                <span className="whitespace-nowrap">
                  U<sub>w</sub> = (A<sub>g</sub>·U<sub>g</sub> + A<sub>f</sub>·U<sub>f</sub> + l<sub>g</sub>·Ψ<sub>g</sub>)
                </span>{" "}
                <span className="whitespace-nowrap">
                  / (A<sub>g</sub> + A<sub>f</sub>)
                </span>
              </p>
              <p>
                <span className="whitespace-nowrap">
                  <span className="text-t3">= (</span>
                  {fmt(result.Ag)}·{fmt(Ug)} + {fmt(result.Af)}·{fmt(Uf)} + {fmt(result.lg)}·{fmt(psi)}
                  <span className="text-t3">)</span>
                </span>{" "}
                <span className="whitespace-nowrap">
                  <span className="text-t3">/ (</span>
                  {fmt(result.Ag)} + {fmt(result.Af)}
                  <span className="text-t3">)</span>
                </span>
              </p>
              <p>
                <span className="text-t3">= (</span>
                {fmt(result.qGlass)} + {fmt(result.qFrame)} + {fmt(result.qEdge)}
                <span className="text-t3">) / </span>
                {fmt(result.Aw)}
              </p>
              <p>
                <span className="text-t3">= </span>
                {fmt(result.L)} / {fmt(result.Aw)}
              </p>
              <p className="border-t border-teal-border pt-[8px] text-f16 font-bold">
                U<sub>w</sub> = {result.Uw.toFixed(2)} W/m²·K
              </p>
            </div>
            <p className="mt-[12px] text-f12 leading-relaxed text-t3">
              Inputs — frame <strong>{frameLabel}</strong> (U<sub>f</sub> {fmt(Uf)}), glass{" "}
              <strong>{glassLabel}</strong> (U<sub>g</sub> {fmt(Ug)}), spacer <strong>{spacerLabel}</strong>{" "}
              (Ψ<sub>g</sub> {fmt(psi)}). Dimensions in m; areas m², perimeter m. Per EN ISO 10077-1 §5.2
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
  if (Uw <= 0.8) return { label: "At or below 0.80 target band", color: "text-teal-text", bg: "bg-teal-bg2 border-teal-border" };
  if (Uw <= 1.0) return { label: "0.81–1.00 performance band", color: "text-teal-text", bg: "bg-teal-bg border-teal-border" };
  if (Uw <= 1.3) return { label: "1.01–1.30 performance band", color: "text-t1", bg: "bg-bg2 border-border-default" };
  if (Uw <= 1.8) return { label: "1.31–1.80 performance band", color: "text-t1", bg: "bg-bg2 border-border-default" };
  if (Uw <= 2.5) return { label: "1.81–2.50 performance band", color: "text-warn", bg: "bg-warn-bg border-warn-border" };
  return { label: "Above 2.50 W/m²·K", color: "text-fail", bg: "bg-fail-bg border-fail-border" };
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
  const certificateMode = frame === PHI_FRAME_ID;

  const selFrame = frameSystems.find((f) => f.id === frame)!;
  const selGlass = glassConfigs.find((g) => g.id === glass)!;
  const selSpacer = spacerTypes.find((s) => s.id === spacer)!;
  const selWinType = windowTypes.find((w) => w.id === winType)!;

  const result = useMemo(
    () => calcWindowUw(width, height, selFrame.faceWidth, selFrame.Uf, selGlass.Ug, selSpacer.psi, selWinType.sashWidth),
    [width, height, selFrame, selGlass, selSpacer, selWinType],
  );

  // Compare with aluminum no-break baseline (fixed light, aluminum spacer)
  const baseline = useMemo(
    () => calcWindowUw(width, height, 50, 5.9, selGlass.Ug, 0.08, 0),
    [width, height, selGlass],
  );

  const improvement =
    result && baseline
      ? Math.round(((baseline.Uw - result.Uw) / baseline.Uw) * 100)
      : 0;

  const [copied, setCopied] = useState(false);

  /* Deep-link presets: prefer #frame&glass&spacer&type&w&h so presets do not
     create crawlable URL variants; legacy query-string links remain supported. */
  useEffect(() => {
    /* One-time URL hydration; this intentionally seeds controlled inputs after
       mount because window.location is unavailable during server rendering. */
    /* eslint-disable react-hooks/set-state-in-effect */
    const sp = readToolStateParams(window.location);
    if ([...sp.keys()].length === 0) return;
    const str = (k: string, set: (s: string) => void, allowed: string[]) => {
      const v = sp.get(k);
      if (v && allowed.includes(v)) set(v);
    };
    const num = (k: string, set: (n: number) => void) => {
      const v = sp.get(k);
      if (v != null && v !== "" && Number.isFinite(+v)) set(Math.min(4000, Math.max(200, +v)));
    };
    str("frame", setFrame, frameSystems.map((f) => f.id));
    str("glass", setGlass, glassConfigs.map((g) => g.id));
    str("spacer", setSpacer, spacerTypes.map((s) => s.id));
    str("type", setWinType, windowTypes.map((w) => w.id));
    num("w", setWidth); num("h", setHeight);
    if (sp.get("frame") === PHI_FRAME_ID) {
      setGlass(PHI_GLASS_ID); setSpacer(PHI_SPACER_ID); setWinType("fixed");
      setWidth(1230); setHeight(1480);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function changeFrame(next: string) {
    setFrame(next);
    if (next === PHI_FRAME_ID) {
      setGlass(PHI_GLASS_ID); setSpacer(PHI_SPACER_ID); setWinType("fixed");
      setWidth(1230); setHeight(1480);
    } else if (certificateMode) {
      setGlass("tg-ar"); setSpacer("warm-basic"); setWinType("casement");
      setWidth(1200); setHeight(1400);
    }
  }

  function applyPreset(p: WinPreset) {
    setFrame(p.frame); setGlass(p.glass); setSpacer(p.spacer); setWinType(p.winType);
    setWidth(p.width); setHeight(p.height);
    track("uvalue_preset", { preset: p.id });
  }

  function copyShareLink() {
    const sp = new URLSearchParams({
      frame, glass, spacer, type: winType, w: String(width), h: String(height),
    });
    const url = `${window.location.origin}${buildToolStateHref(
      "/technology/frp-u-value-calculator",
      Object.fromEntries(sp.entries()),
    )}`;
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
      `Frame: ${selFrame.label} (Uf ${selFrame.Uf} W/m²·K)\n` +
      `Glass: ${selGlass.label} (Ug ${selGlass.Ug} W/m²·K)\n` +
      `Spacer: ${selSpacer.label} (Ψg ${selSpacer.psi} W/m·K)\n` +
      `Window: ${selWinType.label}, ${width}×${height} mm, glass ratio ${result.glassRatio}%\n\n` +
      `Result: Uw = ${result.Uw.toFixed(2)} W/m²·K (${rating!.label})` +
      (certificateMode ? ` — read-only reproduction of PHI Component-ID 2491wi03 certificate inputs` : "") +
      (improvement > 0 ? `, ${improvement}% better than an aluminum-no-break baseline` : "") +
      `\n\nProject location / target standard (please add): ____\n` +
      `Quantities / sizes (please add): ____\n\nThanks.`
    : "";

  const selectClass =
    "w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
  const labelClass = "mb-[4px] block font-mono text-f12 uppercase tracking-[0.06em] text-t3";
  const inputClass =
    "w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";

  return (
    <div>
        {/* Explicit grid placement (not source order) drives the layout: inputs
            top-left, results span the right, the result-context cards fill the
            space under the inputs. This balances the two columns (killing the old
            blank area) while keeping the DOM order inputs → result → context, so
            the single-column mobile stack still leads with the result. */}
        <div className="grid items-start gap-[20px] lg:grid-cols-[1fr_380px]">
          {/* ── A · Input panel (top-left) ── */}
          <div className="space-y-[20px] rounded-card border border-border-default bg-bg2 p-[20px] lg:col-start-1 lg:row-start-1">
            {/* One-click scenario presets */}
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

            {certificateMode && (
              <div className="rounded-control border border-teal-border bg-teal-bg px-[12px] py-[10px] text-f12 leading-relaxed text-t2">
                <strong className="text-t1">Read-only certified reference.</strong> PHI Component-ID 2491wi03,
                Fengdu Passive GFRP 90 Series: test window 1230 × 1480 mm, U<sub>f</sub> 0.78,
                U<sub>g</sub> 0.70, frame width 109 mm, Ψ<sub>g</sub> 0.023. The simplified formula
                reproduces the certificate&apos;s U<sub>w</sub> 0.78 after rounding. Flying-mullion width
                133 mm and installation details remain in the certificate.{" "}
                <a href="/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-text hover:underline">
                  View certificate →
                </a>
              </div>
            )}

            {/* Row 1: Frame + Glass */}
            <div className="grid gap-[20px] sm:grid-cols-2">
              <div>
                <label className={labelClass}>Frame System</label>
                <select value={frame} onChange={(e) => changeFrame(e.target.value)} className={selectClass}>
                  <optgroup label="F1 Composite FRP">
                    {frameSystems.filter((f) => f.id.startsWith("frp") && !f.certifiedReference).map((f) => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="PHI certificate reference">
                    {frameSystems.filter((f) => f.certifiedReference).map((f) => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Comparison Materials">
                    {frameSystems.filter((f) => !f.id.startsWith("frp")).map((f) => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </optgroup>
                </select>
                <span className="mt-[4px] block text-f12 text-t3">
                  U<sub>f</sub> = {selFrame.Uf} W/m²·K · face {selFrame.faceWidth} mm
                </span>
              </div>

              <div>
                <label className={labelClass}>Glass Configuration</label>
                <select value={glass} onChange={(e) => setGlass(e.target.value)} disabled={certificateMode} className={`${selectClass} ${certificateMode ? "opacity-60" : ""}`}>
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
                  <optgroup label="Certified reference">
                    {glassConfigs.filter((g) => g.certifiedReference).map((g) => (
                      <option key={g.id} value={g.id}>{g.label}</option>
                    ))}
                  </optgroup>
                </select>
                <span className="mt-[4px] block text-f12 text-t3">
                  U<sub>g</sub> = {selGlass.Ug} W/m²·K · {selGlass.thickness} mm thick
                </span>
              </div>
            </div>

            {/* Row 2: Spacer + Window type */}
            <div className="grid gap-[20px] sm:grid-cols-2">
              <div>
                <label className={labelClass}>Edge Spacer</label>
                <select value={spacer} onChange={(e) => setSpacer(e.target.value)} disabled={certificateMode} className={`${selectClass} ${certificateMode ? "opacity-60" : ""}`}>
                  {spacerTypes.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <span className="mt-[4px] block text-f12 text-t3">
                  Ψ<sub>g</sub> = {selSpacer.psi} W/m·K
                </span>
              </div>

              <div>
                <label className={labelClass}>Window Type</label>
                <select value={winType} onChange={(e) => setWinType(e.target.value)} disabled={certificateMode} className={`${selectClass} ${certificateMode ? "opacity-60" : ""}`}>
                  {windowTypes.map((w) => (
                    <option key={w.id} value={w.id}>{w.label}</option>
                  ))}
                </select>
                <span className="mt-[4px] block text-f12 text-t3">
                  Sash width: {selWinType.sashWidth} mm {selWinType.sashWidth === 0 ? "(no sash)" : ""}
                </span>
              </div>
            </div>

            {/* Row 3: Dimensions */}
            <div>
              <label className={labelClass}>Window Dimensions (mm)</label>
              <div className="flex items-center gap-[12px]">
                <div className="flex-1">
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Math.min(4000, Math.max(200, Number(e.target.value))))}
                    disabled={certificateMode}
                    min={200}
                    max={4000}
                    step={50}
                    className={`${inputClass} ${certificateMode ? "opacity-60" : ""}`}
                  />
                  <span className="mt-[2px] block text-center text-f12 text-t3">Width</span>
                </div>
                <span className="text-t3">×</span>
                <div className="flex-1">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Math.min(4000, Math.max(200, Number(e.target.value))))}
                    disabled={certificateMode}
                    min={200}
                    max={4000}
                    step={50}
                    className={`${inputClass} ${certificateMode ? "opacity-60" : ""}`}
                  />
                  <span className="mt-[2px] block text-center text-f12 text-t3">Height</span>
                </div>
              </div>
            </div>

            {/* Formula reference */}
            <div className="rounded-control bg-white px-[12px] py-[10px] text-f12 leading-relaxed text-t3">
              <strong>EN ISO 10077-1:</strong>{" "}
              U<sub>w</sub> = (A<sub>g</sub>·U<sub>g</sub> + A<sub>f</sub>·U<sub>f</sub> + l<sub>g</sub>·Ψ<sub>g</sub>) / (A<sub>g</sub> + A<sub>f</sub>)
              <br />
              <span className="text-t3/70">
                Numeric targets compared for screening only: PHI (EU) · England · Germany · IECC / ENERGY STAR (US) · ENERGY STAR Canada / NBC · New Zealand · GB (China)
              </span>
            </div>
          </div>

          {/* ── B · Results panel (right column, spans both left rows) ── */}
          <div className="space-y-[12px] lg:col-start-2 lg:row-start-1 lg:row-span-2">
            {result ? (
              <>
                {/* Main result */}
                <div className={`rounded-card border p-[32px] text-center ${getRating(result.Uw).bg}`}>
                  <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3 block">
                    Whole-window U<sub>w</sub>
                  </span>
                  <span className="mt-[8px] block text-f56 font-extrabold leading-none tracking-[-0.02em] text-t1">
                    {result.Uw.toFixed(2)}
                  </span>
                  <span className="block text-f14 text-t3">W/m²·K</span>
                  <span className={`mt-[12px] inline-block rounded-full px-[12px] py-[4px] text-f12 font-bold ${getRating(result.Uw).color} ${getRating(result.Uw).bg}`}>
                    {getRating(result.Uw).label}
                  </span>
                </div>

                {/* Breakdown */}
                <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
                  <h4 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3 mb-[12px]">
                    Breakdown
                  </h4>
                  <dl className="space-y-[8px] text-f14">
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
                      <dd className="font-medium text-t1">{selFrame.Uf} W/m²·K</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-t3">Glass U<sub>g</sub></dt>
                      <dd className="font-medium text-t1">{selGlass.Ug} W/m²·K</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-t3">Spacer Ψ<sub>g</sub></dt>
                      <dd className="font-medium text-t1">{selSpacer.psi} W/m·K</dd>
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
                      className="block rounded-card border border-teal-border bg-white p-[20px] transition-colors hover:border-teal"
                    >
                      <div className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">
                        {certificateMode ? "Certified reference inputs" : series ? "F1 makes this frame" : "Switch to F1 FRP"}
                      </div>
                      <div className="mt-[4px] text-f14 text-t2">
                        {certificateMode ? (
                          <>PHI Component-ID 2491wi03 names the Fengdu Passive GFRP 90 Series and Chongqing Xianju New Material Co., Ltd. as manufacturer. Review the certificate before using this reference in a specification. </>
                        ) : series ? (
                          <>This is the F1 FRP <strong className="text-t1">{series}</strong> fenestration system — request a quote against your U<sub>w</sub> {result.Uw.toFixed(2)} spec. </>
                        ) : (
                          <>The published PHI 2491wi03 reference reaches U<sub>w</sub> <strong className="text-t1">0.78 W/m²·K</strong> for its certified size and inputs{improvement > 0 ? <> — numerically up to {improvement}% better than your selection</> : null}. </>
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
                  className="block rounded-control bg-teal-text px-[16px] py-[12px] text-center text-f14 font-bold text-white transition-colors hover:bg-teal"
                >
                  Get a window quote
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
                  className="w-full rounded-control border border-border-default bg-white px-[16px] py-[10px] text-center text-f14 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
                >
                  {copied ? "Link copied" : "Copy a link to this result"}
                </button>
              </>
            ) : (
              <div className="rounded-card border border-fail-border bg-fail-bg p-[20px] text-f14 text-fail">
                Window dimensions too small for the selected frame width. Increase width or height.
              </div>
            )}
          </div>

          {/* ── C · Result-context cards. Placed under the inputs on desktop to
                balance the columns; rendered after the result in the DOM so the
                mobile stack still leads with the U-value. ── */}
          {result && (
            <div className="space-y-[20px] lg:col-start-1 lg:row-start-2">
              {/* Comparison — vs aluminum baseline */}
              {baseline && improvement > 0 && (
                <div className="rounded-card border border-teal-border bg-teal-bg p-[20px]">
                  <h4 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3 mb-[8px]">
                    vs aluminum (no break)
                  </h4>
                  <p className="text-f14 text-t2">
                    <strong className="text-teal">{improvement}% better</strong> thermal
                    performance compared to an aluminum frame without thermal break
                    (U<sub>w</sub> = {baseline.Uw.toFixed(2)} W/m²·K).
                  </p>
                </div>
              )}

              {/* Numeric target comparison; method/certification caveats are explicit. */}
              <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
                <h4 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3 mb-[8px]">
                  Numeric target comparison, not compliance
                </h4>
                <div className="grid gap-x-[20px] gap-y-[6px] text-f12 sm:grid-cols-2 lg:grid-cols-1">
                  {TARGET_COMPARISON.map((t) => (
                    <div key={`${t.region}-${t.label}`} className="flex items-center justify-between gap-[4px]">
                      <span className="text-t3 truncate">
                        {t.region} {t.label}
                      </span>
                      <span className={`shrink-0 font-medium ${result.Uw <= t.max ? "text-teal-text" : "text-t3"}`}>
                        ≤ {t.max.toFixed(2)} · {result.Uw <= t.max ? "at/below" : "above"}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-[10px] text-f12 leading-relaxed text-t3">
                  This compares numbers only. EN ISO 10077-1 output is not an NFRC, CSA A440.2 or AFRC rating;
                  ENERGY STAR also requires SHGC and certified product data; England accepts a window energy
                  rating instead of the U-value for replacements; Chinese acceptance requires the applicable
                  project limit and GB/T 8484 test evidence.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Calculation model — visualizes the EN ISO 10077-1 logic ── */}
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
    </div>
  );
}
