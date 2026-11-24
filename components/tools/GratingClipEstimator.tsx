"use client";

import { useState } from "react";
import { buildRfqHref } from "@/lib/rfq";
import {
  C_CONNECTOR_SPACING_MM,
  MAX_HOLD_DOWN_SPACING_MM,
  MIN_HOLD_DOWNS_PER_PANEL,
  MIN_HOLD_DOWNS_PER_SUPPORT_LINE,
  estimateGratingClips,
  type GratingClipEstimateInput,
} from "@/lib/gratingClipEstimate";

const inputClass = "w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
const labelClass = "mb-[4px] block font-mono text-f12 uppercase tracking-[0.06em] text-t3";

/** Starting hold-down and connector quantities for a grating layout. */
export default function GratingClipEstimator({ productPath }: { productPath: string }) {
  const [form, setForm] = useState<GratingClipEstimateInput>({
    family: "molded",
    panels: 10,
    widthAlongSupportMm: 1220,
    supportLinesPerPanel: 2,
    jointLengthMm: 12000,
  });
  const result = estimateGratingClips(form);
  const set = (key: keyof GratingClipEstimateInput) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: key === "family" ? (event.target.value as GratingClipEstimateInput["family"]) : Number(event.target.value) });

  const summary = result
    ? `${form.family} grating, ${form.panels} panels, ${form.widthAlongSupportMm} mm along each support, ${form.supportLinesPerPanel} support lines per panel: about ${result.holdDownsTotal} hold-downs${result.connectors ? ` and ${result.connectors.low}–${result.connectors.high} C connectors` : ""} (starting quantity).`
    : "";

  return (
    <div className="grid gap-[20px] rounded-card border border-border-default bg-white p-[20px] sm:p-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      <form className="grid gap-[14px] sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="gc-family">Grating type</label>
          <select id="gc-family" value={form.family} onChange={set("family")} className={inputClass}>
            <option value="molded">Molded grating</option>
            <option value="pultruded">Pultruded grating</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="gc-panels">Number of panels</label>
          <input id="gc-panels" type="number" min="1" step="1" value={form.panels} onChange={set("panels")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="gc-lines">Support lines under each panel</label>
          <input id="gc-lines" type="number" min="1" step="1" value={form.supportLinesPerPanel} onChange={set("supportLinesPerPanel")} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="gc-width">Panel length along each support (mm)</label>
          <input id="gc-width" type="number" min="1" step="1" value={form.widthAlongSupportMm} onChange={set("widthAlongSupportMm")} className={inputClass} />
        </div>
        {form.family === "molded" ? (
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="gc-joint">Total panel-to-panel joint length (mm)</label>
            <input id="gc-joint" type="number" min="0" step="1" value={form.jointLengthMm} onChange={set("jointLengthMm")} className={inputClass} />
          </div>
        ) : null}
      </form>

      <div className="flex flex-col rounded-card border border-teal-border bg-teal-bg p-[20px]" aria-live="polite">
        <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Starting quantity</p>
        {result ? (
          <>
            <p className="mt-[6px] text-f32 font-bold leading-tight text-t1">{result.holdDownsTotal.toLocaleString("en-US")} hold-downs</p>
            <p className="mt-[4px] text-f14 leading-golden text-t2">
              {result.holdDownsPerSupportLine} per support line, {result.holdDownsPerPanel} per panel
              {form.family === "molded" ? " (M or J clips)" : " (M, J or T clips)"}
            </p>
            {result.connectors ? (
              <p className="mt-[10px] text-f16 font-semibold text-t1">
                {result.connectors.low}–{result.connectors.high} C panel connectors
              </p>
            ) : null}
          </>
        ) : (
          <p className="mt-[6px] text-f14 text-t2">Enter at least one panel, one support line and a panel length.</p>
        )}
        <p className="mt-[14px] text-f12 leading-golden text-t3">
          Rules used: at least {MIN_HOLD_DOWNS_PER_SUPPORT_LINE} hold-downs per support line and {MIN_HOLD_DOWNS_PER_PANEL} per panel, no more than {MAX_HOLD_DOWN_SPACING_MM} mm between hold-downs, clips at both ends of a run, and C connectors every {C_CONNECTOR_SPACING_MM.closest}–{C_CONNECTOR_SPACING_MM.widest} mm along molded joints. Add clips at cutouts, cut edges and unsupported panel edges. The approved project drawing sets the final quantity.
        </p>
        {result ? (
          <a
            href={buildRfqHref({ source: "grating-clip-estimator", product: "FRP grating clips", productPath, message: summary })}
            className="mt-auto inline-flex min-h-[44px] items-center justify-center rounded-control bg-teal-text px-[18px] py-[10px] text-f14 font-bold text-white hover:bg-teal"
          >
            Quote this clip kit
          </a>
        ) : null}
      </div>
    </div>
  );
}
