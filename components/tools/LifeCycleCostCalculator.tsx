"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/components/calculators/leadCapture";
import {
  GALVANIZING_THICKNESS,
  ZINC_CORROSIVITY,
  calculateLcc,
  galvanizingLife,
  lccInputError,
  type CostOption,
  type LccResult,
} from "@/lib/lifeCycleCost";
import { buildRfqHref } from "@/lib/rfq";
import { buildToolStateHref, readToolStateParams } from "@/lib/toolStateUrl";

// Series colors: FRP takes the brand teal, steel the next categorical hue.
// The pair passes the dataviz palette checks on white (CVD ΔE 12, contrast ≥ 3:1).
const FRP_COLOR = "var(--color-teal)";
const STEEL_COLOR = "#eb6834";

const inputClass = "w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
const labelClass = "mb-[4px] block font-mono text-f12 uppercase tracking-[0.06em] text-t3";
const tileLabel = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

type SteelType = "galvanized" | "other";

const SCENARIOS = [
  { id: "C5", label: "Coastal or humid industrial (C5)" },
  { id: "C4", label: "Industrial or coastal (C4)" },
  { id: "C3", label: "Urban (C3)" },
  { id: "CX", label: "Offshore, extreme (CX)" },
] as const;

const money = (value: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: value >= 100 ? 0 : 1 }).format(value);

const DEFAULT_FRP: CostOption = { label: "FRP", initial: 130, firstMaintenanceYear: 25, maintenanceInterval: 25, maintenanceCost: 10, annualCost: 0, serviceLife: 0 };
const DEFAULT_STEEL: CostOption = { label: "Steel", initial: 100, firstMaintenanceYear: 13, maintenanceInterval: 15, maintenanceCost: 40, annualCost: 0, serviceLife: 0 };

function NumberInput({ id, label, value, onChange, step = "any" }: { id: string; label: string; value: number; onChange: (value: number) => void; step?: string }) {
  return (
    <div>
      <label className={labelClass} htmlFor={id}>{label}</label>
      <input id={id} type="number" min="0" step={step} value={Number.isFinite(value) ? value : ""} onChange={(e) => onChange(e.target.value === "" ? NaN : +e.target.value)} className={inputClass} />
    </div>
  );
}

function OptionFields({ prefix, option, setOption }: { prefix: string; option: CostOption; setOption: (next: CostOption) => void }) {
  const set = (key: keyof CostOption) => (value: number) => setOption({ ...option, [key]: value });
  return (
    <div className="grid grid-cols-2 items-end gap-[10px]">
      <div className="col-span-2">
        <NumberInput id={`${prefix}-initial`} label="Installed cost" value={option.initial} onChange={set("initial")} />
      </div>
      <NumberInput id={`${prefix}-first`} label="First maintenance (year)" value={option.firstMaintenanceYear} onChange={set("firstMaintenanceYear")} />
      <NumberInput id={`${prefix}-interval`} label="Then every (years)" value={option.maintenanceInterval} onChange={set("maintenanceInterval")} />
      <NumberInput id={`${prefix}-cost`} label="Cost per maintenance" value={option.maintenanceCost} onChange={set("maintenanceCost")} />
      <NumberInput id={`${prefix}-annual`} label="Inspection per year" value={option.annualCost} onChange={set("annualCost")} />
      <div className="col-span-2">
        <NumberInput id={`${prefix}-life`} label="Replaced after (years, 0 = not in the study)" value={option.serviceLife} onChange={set("serviceLife")} />
      </div>
    </div>
  );
}

export default function LifeCycleCostCalculator() {
  const [studyYears, setStudyYears] = useState(30);
  const [discountPercent, setDiscountPercent] = useState(3);
  const [downtime, setDowntime] = useState(0);
  const [residual, setResidual] = useState(true);
  const [frp, setFrp] = useState<CostOption>(DEFAULT_FRP);
  const [steel, setSteel] = useState<CostOption>(DEFAULT_STEEL);
  const [steelType, setSteelType] = useState<SteelType>("galvanized");
  const [corrosivity, setCorrosivity] = useState<string>("C5");
  const [thicknessId, setThicknessId] = useState<string>("gt6");
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    // Seed from a shared link once, after mount (window is not available during prerender).
    /* eslint-disable react-hooks/set-state-in-effect */
    const params = readToolStateParams(window.location);
    const num = (key: string, set: (value: number) => void) => {
      const value = params.get(key);
      if (value !== null && value !== "" && Number.isFinite(+value)) set(+value);
    };
    num("years", setStudyYears);
    num("rate", setDiscountPercent);
    num("down", setDowntime);
    if (params.get("residual") === "0") setResidual(false);
    const option = (prefix: string, base: CostOption) => {
      let next = { ...base };
      const keys: [string, Exclude<keyof CostOption, "label">][] = [["i", "initial"], ["f", "firstMaintenanceYear"], ["n", "maintenanceInterval"], ["c", "maintenanceCost"], ["a", "annualCost"], ["l", "serviceLife"]];
      for (const [short, key] of keys) {
        const value = params.get(`${prefix}${short}`);
        if (value !== null && value !== "" && Number.isFinite(+value)) next = { ...next, [key]: +value };
      }
      return next;
    };
    if ([...params.keys()].some((key) => /^[fs][ifncal]$/.test(key))) {
      setFrp(option("f", DEFAULT_FRP));
      setSteel(option("s", DEFAULT_STEEL));
    }
    const type = params.get("steel");
    if (type === "galvanized" || type === "other") setSteelType(type);
    const c = params.get("c");
    if (c && ZINC_CORROSIVITY.some((item) => item.id === c)) setCorrosivity(c);
    const t = params.get("t");
    if (t && GALVANIZING_THICKNESS.some((item) => item.id === t)) setThicknessId(t);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const microns = GALVANIZING_THICKNESS.find((item) => item.id === thicknessId)?.microns ?? 85;
  const life = galvanizingLife(corrosivity, microns);

  function applyGalvanizing(nextCorrosivity: string, nextThickness: string) {
    const nextMicrons = GALVANIZING_THICKNESS.find((item) => item.id === nextThickness)?.microns ?? 85;
    const estimate = galvanizingLife(nextCorrosivity, nextMicrons);
    setSteel((current) => ({ ...current, firstMaintenanceYear: Math.max(1, Math.round(estimate.midYears)) }));
  }

  function chooseScenario(id: string) {
    setSteelType("galvanized");
    setCorrosivity(id);
    applyGalvanizing(id, thicknessId);
    track("lcc_scenario", { corrosivity: id });
  }

  const input = { studyYears, discountPercent, downtimePerEvent: downtime, residualValue: residual, frp: { ...frp, label: "FRP" }, steel: { ...steel, label: "Steel" } };
  const error = lccInputError(input);
  const result = calculateLcc(input);

  async function share() {
    const state: Record<string, string | number> = { years: studyYears, rate: discountPercent, down: downtime, residual: residual ? 1 : 0, steel: steelType, c: corrosivity, t: thicknessId };
    for (const [prefix, option] of [["f", frp], ["s", steel]] as const) {
      Object.assign(state, { [`${prefix}i`]: option.initial, [`${prefix}f`]: option.firstMaintenanceYear, [`${prefix}n`]: option.maintenanceInterval, [`${prefix}c`]: option.maintenanceCost, [`${prefix}a`]: option.annualCost, [`${prefix}l`]: option.serviceLife });
    }
    const href = buildToolStateHref("/tools/frp-life-cycle-cost-calculator", state);
    window.history.replaceState(null, "", href);
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${href}`);
      setShareState("copied");
    } catch {
      setShareState("error");
    }
    window.setTimeout(() => setShareState("idle"), 2500);
    track("lcc_share", { corrosivity });
  }

  const summary = result
    ? `Life-cycle cost comparison (F1 Composite tool)\n` +
      `Study ${studyYears} years, real discount rate ${discountPercent}%${steelType === "galvanized" ? `, galvanized steel in ${corrosivity} (${microns} µm)` : ""}\n` +
      `FRP: installed ${frp.initial}, present-value total ${money(result.frp.total)}\n` +
      `Steel: installed ${steel.initial}, present-value total ${money(result.steel.total)}\n` +
      `Difference: ${result.saving >= 0 ? "FRP lower by" : "steel lower by"} ${money(Math.abs(result.saving))}\n`
    : "";

  return (
    <div className="space-y-[20px]">
      <div className="flex flex-wrap items-center gap-[6px]">
        <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Site:</span>
        {SCENARIOS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={steelType === "galvanized" && corrosivity === item.id}
            onClick={() => chooseScenario(item.id)}
            className={`rounded-full border px-[12px] py-[4px] text-f12 font-medium transition-colors ${steelType === "galvanized" && corrosivity === item.id ? "border-teal bg-teal-bg text-teal-text" : "border-border-default bg-white text-t2 hover:border-teal"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-[20px] lg:grid-cols-3">
        <div className="space-y-[10px] rounded-card border border-border-default bg-bg2 p-[20px]">
          <h2 className="text-f18 font-bold text-t1">Study</h2>
          <div className="grid grid-cols-2 gap-[10px]">
            <NumberInput id="lcc-years" label="Study period (years)" value={studyYears} onChange={(value) => setStudyYears(Math.round(value))} step="1" />
            <NumberInput id="lcc-rate" label="Real discount rate (%)" value={discountPercent} onChange={setDiscountPercent} step="0.5" />
            <div className="col-span-2">
              <NumberInput id="lcc-down" label="Shutdown or access cost per event" value={downtime} onChange={setDowntime} />
            </div>
          </div>
          <label className="flex items-center gap-[8px] text-f14 text-t2">
            <input type="checkbox" checked={residual} onChange={(e) => setResidual(e.target.checked)} />
            Credit unused life at the end of the study
          </label>
          <p className="text-f12 text-t3">
            Costs are in any one currency. The starting figures are an example on an index where the installed steel option
            costs 100; replace them with your quotes. A real discount rate excludes inflation.
          </p>
        </div>

        <div className="space-y-[10px] rounded-card border border-border-default bg-bg2 p-[20px]">
          <h2 className="flex items-center gap-[8px] text-f18 font-bold text-t1">
            <span aria-hidden className="inline-block h-[3px] w-[18px] rounded-full" style={{ background: STEEL_COLOR }} />
            Steel option
          </h2>
          <div>
            <label className={labelClass} htmlFor="lcc-steel-type">Protection</label>
            <select id="lcc-steel-type" value={steelType} onChange={(e) => setSteelType(e.target.value as SteelType)} className={inputClass}>
              <option value="galvanized">Hot-dip galvanized (ISO 1461)</option>
              <option value="other">Painted, stainless or other (enter the years)</option>
            </select>
          </div>
          {steelType === "galvanized" && (
            <div className="space-y-[8px] rounded-control border border-border-default bg-white p-[12px]">
              <div className="grid gap-[8px]">
                <div>
                  <label className={labelClass} htmlFor="lcc-c">Corrosivity (ISO 9223)</label>
                  <select id="lcc-c" value={corrosivity} onChange={(e) => { setCorrosivity(e.target.value); applyGalvanizing(e.target.value, thicknessId); }} className={inputClass}>
                    {ZINC_CORROSIVITY.map((item) => (
                      <option key={item.id} value={item.id}>{item.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="lcc-t">Coating (ISO 1461 minimum)</label>
                  <select id="lcc-t" value={thicknessId} onChange={(e) => { setThicknessId(e.target.value); applyGalvanizing(corrosivity, e.target.value); }} className={inputClass}>
                    {GALVANIZING_THICKNESS.map((item) => (
                      <option key={item.id} value={item.id}>{item.label}: {item.microns} µm</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-f12 text-t2">
                Zinc loses {life.category.minRate}–{life.category.maxRate} µm a year in {life.category.id}, so {microns} µm lasts about{" "}
                <strong className="text-t1">{Math.round(life.shortYears)}–{Math.round(life.longYears)} years</strong>; the first maintenance is set to the middle,{" "}
                {Math.round(life.midYears)} years. Atmospheric exposure only: splash, immersion and chemical service corrode faster.
              </p>
            </div>
          )}
          <OptionFields prefix="lcc-s" option={steel} setOption={setSteel} />
          <p className="text-f12 text-t3">ISO 12944-1 paint durability classes: L up to 7 years, M 7–15, H 15–25, VH over 25.</p>
        </div>

        <div className="space-y-[10px] rounded-card border border-border-default bg-bg2 p-[20px]">
          <h2 className="flex items-center gap-[8px] text-f18 font-bold text-t1">
            <span aria-hidden className="inline-block h-[3px] w-[18px] rounded-full" style={{ background: FRP_COLOR }} />
            FRP option
          </h2>
          <OptionFields prefix="lcc-f" option={frp} setOption={setFrp} />
          <p className="text-f12 text-t3">
            FRP needs no corrosion protection, but faces in strong sunlight can need a UV coat after years of exposure. The
            example books one at 25 years; use the interval and cost your supplier recommends.
          </p>
        </div>
      </div>

      {error || !result ? (
        <div className="rounded-control border border-fail-border bg-fail-bg p-[12px] text-f14 text-fail" role="alert">
          {error ?? "Check the inputs."}
        </div>
      ) : (
        <LccResults result={result} studyYears={studyYears} summary={summary} share={share} shareState={shareState} />
      )}
    </div>
  );
}

function LccResults({ result, studyYears, summary, share, shareState }: { result: LccResult; studyYears: number; summary: string; share: () => void; shareState: "idle" | "copied" | "error" }) {
  const frpLower = result.saving >= 0;
  const rows: { label: string; key: "initial" | "maintenance" | "annual" | "replacement" | "downtime" | "residual" }[] = [
    { label: "Installed cost", key: "initial" },
    { label: "Maintenance", key: "maintenance" },
    { label: "Inspection", key: "annual" },
    { label: "Replacement", key: "replacement" },
    { label: "Shutdown or access", key: "downtime" },
    { label: "Unused life credit", key: "residual" },
  ];
  return (
    <div className="grid items-start gap-[20px] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="min-w-0 rounded-card border border-border-default bg-white p-[20px]">
        <div className="flex flex-wrap items-baseline justify-between gap-[8px]">
          <h2 className="text-f18 font-bold text-t1">Cumulative cost, present value</h2>
          <div className="flex gap-[14px] text-f12 text-t2" aria-hidden>
            <span className="flex items-center gap-[6px]"><span className="inline-block h-[2px] w-[16px]" style={{ background: STEEL_COLOR }} />Steel</span>
            <span className="flex items-center gap-[6px]"><span className="inline-block h-[2px] w-[16px]" style={{ background: FRP_COLOR }} />FRP</span>
          </div>
        </div>
        <CostChart frp={result.frp.cumulative} steel={result.steel.cumulative} />
        <details className="mt-[8px] text-f12 text-t2">
          <summary className="cursor-pointer font-semibold text-t1">Year-by-year table</summary>
          <div className="mt-[8px] max-h-[260px] overflow-auto">
            <table className="w-full border-collapse text-left text-f12">
              <thead>
                <tr className="border-b border-border-default">
                  <th scope="col" className="px-[8px] py-[4px] font-semibold text-t1">Year</th>
                  <th scope="col" className="px-[8px] py-[4px] text-right font-semibold text-t1">Steel</th>
                  <th scope="col" className="px-[8px] py-[4px] text-right font-semibold text-t1">FRP</th>
                </tr>
              </thead>
              <tbody>
                {result.frp.cumulative.map((value, year) => (
                  <tr key={year} className="border-b border-border-default last:border-b-0">
                    <th scope="row" className="px-[8px] py-[3px] font-normal">{year}</th>
                    <td className="px-[8px] py-[3px] text-right tabular-nums">{money(result.steel.cumulative[year])}</td>
                    <td className="px-[8px] py-[3px] text-right tabular-nums">{money(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>

      <div className="space-y-[12px]">
        <div className={`rounded-control border p-[12px] ${frpLower ? "border-teal-border bg-teal-bg" : "border-border-default bg-bg2"}`}>
          <div className={tileLabel}>Over {studyYears} years</div>
          <div className="mt-[4px] text-f24 font-bold text-t1">
            {frpLower ? "FRP" : "Steel"} costs {money(Math.abs(result.saving))} less
          </div>
          <div className="text-f12 text-t2">
            {Math.abs((result.saving / result.steel.total) * 100).toFixed(0)}% of the steel total.{" "}
            {result.breakEvenYear !== null && result.breakEvenYear > 0 && frpLower
              ? `FRP's cumulative cost falls below steel's in year ${result.breakEvenYear}.`
              : result.breakEvenYear === 0
                ? "FRP costs less from the start."
                : "FRP does not catch up within the study."}
          </div>
        </div>

        <div className="overflow-hidden rounded-control border border-border-default bg-white">
          <table className="w-full border-collapse text-left text-f14">
            <caption className="px-[12px] pt-[10px] text-left font-mono text-f12 uppercase tracking-[0.06em] text-t3">Present value by item</caption>
            <thead>
              <tr className="border-b border-border-default">
                <th scope="col" className="px-[12px] py-[6px] font-semibold text-t1">Item</th>
                <th scope="col" className="px-[12px] py-[6px] text-right font-semibold text-t1">Steel</th>
                <th scope="col" className="px-[12px] py-[6px] text-right font-semibold text-t1">FRP</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-border-default">
                  <th scope="row" className="px-[12px] py-[5px] font-normal text-t2">{row.label}</th>
                  <td className="px-[12px] py-[5px] text-right tabular-nums text-t2">{row.key === "residual" && result.steel.residual ? "−" : ""}{money(result.steel[row.key])}</td>
                  <td className="px-[12px] py-[5px] text-right tabular-nums text-t2">{row.key === "residual" && result.frp.residual ? "−" : ""}{money(result.frp[row.key])}</td>
                </tr>
              ))}
              <tr className="border-b border-border-default bg-bg2">
                <th scope="row" className="px-[12px] py-[6px] font-semibold text-t1">Total</th>
                <td className="px-[12px] py-[6px] text-right font-semibold tabular-nums text-t1">{money(result.steel.total)}</td>
                <td className="px-[12px] py-[6px] text-right font-semibold tabular-nums text-t1">{money(result.frp.total)}</td>
              </tr>
              <tr>
                <th scope="row" className="px-[12px] py-[6px] font-normal text-t2">Equivalent per year</th>
                <td className="px-[12px] py-[6px] text-right tabular-nums text-t2">{money(result.steel.annualized)}</td>
                <td className="px-[12px] py-[6px] text-right tabular-nums text-t2">{money(result.frp.annualized)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-f12 text-t3">
          Steel events: {result.steel.events.length ? result.steel.events.map((event) => `${event.kind === "replacement" ? "replacement" : "maintenance"} year ${Math.round(event.year * 10) / 10}`).join(", ") : "none"}.
          FRP events: {result.frp.events.length ? result.frp.events.map((event) => `${event.kind === "replacement" ? "replacement" : "maintenance"} year ${Math.round(event.year * 10) / 10}`).join(", ") : "none"}.
        </p>

        <div className="grid gap-[8px] sm:grid-cols-2">
          <a
            href={buildRfqHref({ source: "life-cycle-cost-calculator", product: "FRP profiles, grating or handrail", productPath: "/products", message: summary + "\nApplication, quantities and site (please add): ____" })}
            onClick={() => track("lcc_quote_click", { saving: Math.round(result.saving) })}
            className="rounded-control bg-teal px-[16px] py-[10px] text-center text-f14 font-bold text-white transition-colors hover:bg-teal-text"
          >
            Get an FRP quote to compare
          </a>
          <button type="button" onClick={share} className="rounded-control border border-border-default bg-white px-[16px] py-[10px] text-center text-f14 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text">
            {shareState === "copied" ? "Link copied" : shareState === "error" ? "Link is in the address bar" : "Copy share link"}
          </button>
        </div>
        <Link href="/fiberglass-pultruded-profile-price" className="block rounded-control border border-teal/30 bg-white p-[12px] text-f14 text-t2 transition-colors hover:border-teal">
          <span className="block font-mono text-f12 uppercase tracking-[0.06em] text-t3">FRP installed cost</span>
          Planning prices per meter in the price estimator <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

const CHART_HEIGHT = 240;
const PAD = { top: 16, right: 56, bottom: 28, left: 48 };

function niceMax(value: number) {
  if (value <= 0) return 1;
  const power = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((candidate) => candidate * power >= value / 4) ?? 10;
  return Math.ceil(value / (step * power)) * step * power;
}

function CostChart({ frp, steel }: { frp: number[]; steel: number[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(280, Math.round(entry.contentRect.width))));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const years = frp.length - 1;
  const top = niceMax(Math.max(...frp, ...steel));
  const plotW = width - PAD.left - PAD.right;
  const plotH = CHART_HEIGHT - PAD.top - PAD.bottom;
  const x = (year: number) => PAD.left + (years > 0 ? (year / years) * plotW : 0);
  const y = (value: number) => PAD.top + plotH - (Math.max(0, value) / top) * plotH;
  // Costs arrive in steps, so the lines are drawn as steps: flat through the year, then up.
  const path = (series: number[]) => series.map((value, year) => (year === 0 ? `M${x(0)},${y(value)}` : `H${x(year)}V${y(value)}`)).join("");
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * top);
  const xTicks = Array.from({ length: years + 1 }, (_, year) => year).filter((year) => year % (years > 40 ? 10 : years > 15 ? 5 : 2) === 0 || year === years);

  function yearAt(clientX: number, rect: DOMRect) {
    const ratio = (clientX - rect.left - PAD.left) / plotW;
    return Math.min(years, Math.max(0, Math.round(ratio * years)));
  }

  const labelY = (value: number, other: number) => {
    const base = y(value);
    const gap = Math.abs(y(value) - y(other));
    return gap < 14 ? base + (value >= other ? -7 : 7) : base;
  };

  return (
    <div ref={wrapRef} className="relative mt-[8px]">
      <svg
        width={width}
        height={CHART_HEIGHT}
        role="img"
        aria-label={`Cumulative present-value cost over ${years} years: steel ends at ${money(steel[years])}, FRP at ${money(frp[years])}. Use the year-by-year table for every value.`}
        tabIndex={0}
        className="block touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-teal"
        onPointerMove={(e) => setHover(yearAt(e.clientX, e.currentTarget.getBoundingClientRect()))}
        onPointerLeave={() => setHover(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setHover((current) => Math.min(years, (current ?? -1) + 1));
          if (e.key === "ArrowLeft") setHover((current) => Math.max(0, (current ?? years + 1) - 1));
          if (e.key === "Escape") setHover(null);
        }}
        onBlur={() => setHover(null)}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={PAD.left + plotW} y1={y(tick)} y2={y(tick)} stroke="var(--color-border-default)" strokeWidth={1} />
            <text x={PAD.left - 8} y={y(tick)} textAnchor="end" dominantBaseline="middle" fontSize={11} fill="var(--color-t3)">{money(tick)}</text>
          </g>
        ))}
        {xTicks.map((year) => (
          <text key={year} x={x(year)} y={CHART_HEIGHT - 8} textAnchor="middle" fontSize={11} fill="var(--color-t3)">{year}</text>
        ))}
        <path d={path(steel)} fill="none" stroke={STEEL_COLOR} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        <path d={path(frp)} fill="none" stroke={FRP_COLOR} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={x(years)} cy={y(steel[years])} r={4} fill={STEEL_COLOR} stroke="white" strokeWidth={2} />
        <circle cx={x(years)} cy={y(frp[years])} r={4} fill={FRP_COLOR} stroke="white" strokeWidth={2} />
        <text x={x(years) + 8} y={labelY(steel[years], frp[years])} dominantBaseline="middle" fontSize={11} fill="var(--color-t2)">Steel</text>
        <text x={x(years) + 8} y={labelY(frp[years], steel[years])} dominantBaseline="middle" fontSize={11} fill="var(--color-t2)">FRP</text>
        {hover !== null && (
          <g pointerEvents="none">
            <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={PAD.top + plotH} stroke="var(--color-t3)" strokeWidth={1} />
            <circle cx={x(hover)} cy={y(steel[hover])} r={4} fill={STEEL_COLOR} stroke="white" strokeWidth={2} />
            <circle cx={x(hover)} cy={y(frp[hover])} r={4} fill={FRP_COLOR} stroke="white" strokeWidth={2} />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div
          role="status"
          className="pointer-events-none absolute top-[8px] rounded-control border border-border-default bg-white px-[10px] py-[6px] text-f12 text-t2 shadow-pop"
          style={{ left: Math.min(Math.max(0, x(hover) + 10), width - 150) }}
        >
          <div className="font-semibold text-t1">Year {hover}</div>
          <div className="flex items-center gap-[6px]"><span className="inline-block h-[2px] w-[12px]" style={{ background: STEEL_COLOR }} />Steel {money(steel[hover])}</div>
          <div className="flex items-center gap-[6px]"><span className="inline-block h-[2px] w-[12px]" style={{ background: FRP_COLOR }} />FRP {money(frp[hover])}</div>
        </div>
      )}
    </div>
  );
}
