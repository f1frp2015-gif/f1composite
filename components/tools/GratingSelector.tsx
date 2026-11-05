"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { buildGratingRows, filterGratingRows, gratingAreaWeight, KG_M2_TO_LB_FT2, M2_PER_FT2, type GratingFilter, type GratingRow } from "@/lib/gratingSelector";

const inputClass = "w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
const labelClass = "mb-[4px] block font-mono text-f12 uppercase tracking-[0.06em] text-t3";

const SORTS = {
  weight: "Lightest first",
  depth: "Shallowest first",
  open: "Most open first",
} as const;
type SortKey = keyof typeof SORTS;

interface FormState {
  family: GratingFilter["family"];
  depthMin: string;
  depthMax: string;
  openMin: string;
  weightMax: string;
  openingMax: string;
  area: string;
  areaUnit: "m2" | "ft2";
  sort: SortKey;
}

const DEFAULTS: FormState = { family: "all", depthMin: "", depthMax: "", openMin: "", weightMax: "", openingMax: "", area: "", areaUnit: "m2", sort: "weight" };

const PRESETS: { id: string; label: string; state: Partial<FormState> }[] = [
  { id: "walkway", label: "Pedestrian walkway, 25–38 mm", state: { family: "all", depthMin: "25", depthMax: "38", openMin: "", weightMax: "", openingMax: "" } },
  { id: "airflow", label: "Airflow: 70%+ open", state: { family: "all", depthMin: "", depthMax: "", openMin: "70", weightMax: "", openingMax: "" } },
  { id: "small-opening", label: "Molded mesh, top opening ≤ 35 mm", state: { family: "molded", depthMin: "", depthMax: "", openMin: "", weightMax: "", openingMax: "35" } },
  { id: "deep", label: "Pultruded, 50 mm and deeper", state: { family: "pultruded", depthMin: "50", depthMax: "", openMin: "", weightMax: "", openingMax: "" } },
];

const value = (text: string) => (text.trim() === "" ? undefined : Number(text));
const fmt = (n: number, digits = 1) => n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

function sortRows(rows: GratingRow[], key: SortKey) {
  const copy = [...rows];
  if (key === "weight") copy.sort((a, b) => a.weightKgM2 - b.weightKgM2 || a.depthMm - b.depthMm);
  if (key === "depth") copy.sort((a, b) => a.depthMm - b.depthMm || a.weightKgM2 - b.weightKgM2);
  if (key === "open") copy.sort((a, b) => b.openAreaPct - a.openAreaPct || a.weightKgM2 - b.weightKgM2);
  return copy;
}

export default function GratingSelector() {
  const allRows = useMemo(() => buildGratingRows(), []);
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const [presetId, setPresetId] = useState<string | null>(null);
  const set = (patch: Partial<FormState>) => { setForm((current) => ({ ...current, ...patch })); setPresetId(null); };

  const rows = useMemo(() => {
    const filtered = filterGratingRows(allRows, {
      family: form.family,
      depthMin: value(form.depthMin),
      depthMax: value(form.depthMax),
      openMin: value(form.openMin),
      weightMax: value(form.weightMax),
      openingMax: value(form.openingMax),
      includeUnknownOpening: false,
    });
    return sortRows(filtered, form.sort);
  }, [allRows, form]);

  const areaInput = value(form.area);
  const areaM2 = areaInput !== undefined && Number.isFinite(areaInput) && areaInput > 0 ? (form.areaUnit === "m2" ? areaInput : areaInput * M2_PER_FT2) : null;

  return (
    <div className="grid gap-[20px]">
      <div className="space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
        <div className="flex flex-wrap items-center gap-[6px]">
          <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Start from:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-pressed={presetId === preset.id}
              onClick={() => { setForm({ ...DEFAULTS, ...preset.state, area: form.area, areaUnit: form.areaUnit, sort: form.sort }); setPresetId(preset.id); }}
              className={`rounded-full border px-[12px] py-[4px] text-f12 font-medium transition-colors ${presetId === preset.id ? "border-teal bg-teal-bg text-teal-text" : "border-border-default bg-white text-t2 hover:border-teal"}`}
            >
              {preset.label}
            </button>
          ))}
          <button type="button" onClick={() => { setForm(DEFAULTS); setPresetId(null); }} className="rounded-full border border-border-default bg-white px-[12px] py-[4px] text-f12 font-medium text-t2 hover:border-teal">
            Show all
          </button>
        </div>

        <div className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelClass} htmlFor="gs-family">Grating type</label>
            <select id="gs-family" value={form.family} onChange={(e) => set({ family: e.target.value as FormState["family"] })} className={inputClass}>
              <option value="all">Molded and pultruded</option>
              <option value="molded">Molded mesh (two-way)</option>
              <option value="pultruded">Pultruded bearing bar (one-way)</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="gs-depth-min">Depth from (mm)</label>
            <input id="gs-depth-min" type="number" min="0" inputMode="decimal" value={form.depthMin} onChange={(e) => set({ depthMin: e.target.value })} className={inputClass} placeholder="13" />
          </div>
          <div>
            <label className={labelClass} htmlFor="gs-depth-max">Depth to (mm)</label>
            <input id="gs-depth-max" type="number" min="0" inputMode="decimal" value={form.depthMax} onChange={(e) => set({ depthMax: e.target.value })} className={inputClass} placeholder="76" />
          </div>
          <div>
            <label className={labelClass} htmlFor="gs-open">Open area at least (%)</label>
            <input id="gs-open" type="number" min="0" max="100" inputMode="decimal" value={form.openMin} onChange={(e) => set({ openMin: e.target.value })} className={inputClass} placeholder="any" />
          </div>
          <div>
            <label className={labelClass} htmlFor="gs-weight">Weight at most (kg/m²)</label>
            <input id="gs-weight" type="number" min="0" inputMode="decimal" value={form.weightMax} onChange={(e) => set({ weightMax: e.target.value })} className={inputClass} placeholder="any" />
          </div>
          <div>
            <label className={labelClass} htmlFor="gs-opening">Top opening at most (mm)</label>
            <input id="gs-opening" type="number" min="0" inputMode="decimal" value={form.openingMax} onChange={(e) => set({ openingMax: e.target.value })} className={inputClass} placeholder="any" aria-describedby="gs-opening-note" />
          </div>
          <div>
            <label className={labelClass} htmlFor="gs-area">Floor area (optional)</label>
            <div className="flex gap-[6px]">
              <input id="gs-area" type="number" min="0" inputMode="decimal" value={form.area} onChange={(e) => setForm((current) => ({ ...current, area: e.target.value }))} className={inputClass} placeholder="e.g. 120" />
              <select aria-label="Area unit" value={form.areaUnit} onChange={(e) => setForm((current) => ({ ...current, areaUnit: e.target.value as FormState["areaUnit"] }))} className={`${inputClass} w-auto`}>
                <option value="m2">m²</option>
                <option value="ft2">ft²</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="gs-sort">Sort</label>
            <select id="gs-sort" value={form.sort} onChange={(e) => setForm((current) => ({ ...current, sort: e.target.value as SortKey }))} className={inputClass}>
              {Object.entries(SORTS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </div>
        </div>
        <p id="gs-opening-note" className="text-f12 leading-golden text-t3">
          Top opening is calculated for single square molded meshes only (mesh pitch minus top bar width). Pultruded and mini-mesh rows are excluded when you set it; confirm their clear openings on the order drawing.
        </p>
      </div>

      <div>
        <p className="text-f14 text-t2" aria-live="polite">
          <strong className="text-t1">{rows.length}</strong> of {allRows.length} published configurations match.
          {areaM2 !== null ? <> Weights are for {fmt(areaM2, 1)} m² of grating, before clips, cut waste and packing.</> : null}
        </p>
        <div className="relative mt-[12px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[860px] border-collapse text-left text-f14">
            <caption className="sr-only">FRP grating configurations matching the filters</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[12px] py-[8px] font-semibold text-t1">Configuration</th>
                <th scope="col" className="px-[12px] py-[8px] text-right font-semibold text-t1">Depth</th>
                <th scope="col" className="px-[12px] py-[8px] text-right font-semibold text-t1">Open area</th>
                <th scope="col" className="px-[12px] py-[8px] text-right font-semibold text-t1">Weight</th>
                <th scope="col" className="px-[12px] py-[8px] text-right font-semibold text-t1">Spacing / opening</th>
                {areaM2 !== null ? <th scope="col" className="px-[12px] py-[8px] text-right font-semibold text-t1">Area weight</th> : null}
                <th scope="col" className="px-[12px] py-[8px]"><span className="sr-only">Quotation</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const total = areaM2 !== null ? gratingAreaWeight(row.weightKgM2, areaM2) : null;
                return (
                  <tr key={row.id} className="border-b border-border-default align-top last:border-b-0">
                    <th scope="row" className="px-[12px] py-[8px] font-normal text-t2">
                      <span className="block font-semibold text-t1">{row.family === "molded" ? "Molded" : `Pultruded ${row.type}`}</span>
                      <span className="block text-f12 text-t3">{row.group}{row.heavyDuty ? " · HD" : ""}</span>
                    </th>
                    <td className="px-[12px] py-[8px] text-right tabular-nums text-t1">{fmt(row.depthMm, 0)} mm<span className="block text-f12 text-t3">≈ {fmt(row.depthMm / 25.4, 2)} in</span></td>
                    <td className="px-[12px] py-[8px] text-right tabular-nums text-t1">{row.openAreaPct}%</td>
                    <td className="px-[12px] py-[8px] text-right tabular-nums text-t1">{fmt(row.weightKgM2)} kg/m²<span className="block text-f12 text-t3">{fmt(row.weightKgM2 * KG_M2_TO_LB_FT2, 2)} lb/ft²</span></td>
                    <td className="px-[12px] py-[8px] text-right tabular-nums text-t2">
                      {row.family === "pultruded" ? <>Bars at {fmt(row.bearingBarCenterMm ?? NaN)} mm</> : row.clearOpeningMm !== null ? <>≈ {fmt(row.clearOpeningMm)} mm top</> : <>Bars {row.barThickness} mm</>}
                    </td>
                    {total ? <td className="px-[12px] py-[8px] text-right tabular-nums text-t1">{fmt(total.kg, 0)} kg<span className="block text-f12 text-t3">{fmt(total.lb, 0)} lb</span></td> : null}
                    <td className="px-[12px] py-[8px] text-right">
                      <Link href={row.quoteHref} className="relative inline-flex min-h-[44px] items-center whitespace-nowrap text-f14 font-bold text-teal-text underline underline-offset-4">
                        Quote this spec<span className="sr-only">: {row.family === "molded" ? `${row.group}, ${row.depthMm} mm` : `${row.type}, ${row.depthMm} mm`}</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {rows.length === 0 ? <p className="px-[14px] py-[16px] text-f14 text-t2">No published configuration matches. Widen a filter, or send the requirement for a project-specific selection.</p> : null}
        </div>
        <p className="mt-[12px] max-w-[860px] text-f12 leading-golden text-t3">
          Nominal catalog values. This list does not rate load or span: send the clear span, support width, loads and deflection limit with the quotation so the applicable load table can be checked.
        </p>
      </div>
    </div>
  );
}
