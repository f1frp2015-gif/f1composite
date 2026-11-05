"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { finishedWindowCatalog, finishedWindowSystems, type FinishedWindowSystem } from "@/content/data/finishedWindowSystems";
import { buildWindowRfqHref } from "@/lib/windowInquiry";
import { trackEvent } from "@/lib/analytics";

const filters = [["all", "All 11 systems"], ["window", "Windows (8)"], ["door", "Doors (3)"]] as const;
const cell = "px-[14px] py-[10px] align-top text-f14 leading-golden text-t2";
const heading = "px-[14px] py-[10px] text-left align-top text-f14 font-semibold text-t1";
const performanceLabels = { wind: "Wind resistance", water: "Watertightness", air: "Airtightness", sound: "Airborne sound insulation" };
const dataNote = "Catalogue-stated performance. Test standards, specimen sizes and acoustic rating methods are not specified; no international class conversion is implied. Confirm evidence for your final configuration.";

function GlazingTable({ system }: { system: FinishedWindowSystem }) {
  return <>
    <p className="text-f14 font-semibold text-t1">Whole-{system.kind} U-value · W/(m²·K)</p>
    <div className="mt-[8px] overflow-x-auto rounded-control border border-border-default">
      <table className="w-full text-left">
        <thead className="bg-bg2"><tr><th scope="col" className={heading}>{system.id === "pu-entry" ? "Assembly" : "Glazing build-up"}</th><th scope="col" className={heading}>U-value</th></tr></thead>
        <tbody>{system.glazing.map((row) => <tr key={row.buildUp} className="border-t border-border-default"><td className={`${cell} break-words`}>{row.buildUp}</td><td className={`${cell} whitespace-nowrap font-mono`}>{row.uValue}</td></tr>)}</tbody>
      </table>
    </div>
    <p className="mt-[8px] text-f12 leading-golden text-t3">{system.id === "pu-entry" ? "No glazing build-up is specified for this entrance-door assembly." : "Paired U-values and A/Ar notation are retained as listed. The individual conditions are not defined; pairs are not ranges or assigned to a gas fill."}</p>
  </>;
}

export default function FinishedWindowExplorer({ productPath = "/products/fiberglass-windows-doors" }: { productPath?: string }) {
  const [filter, setFilter] = useState<string>("all");
  const [compared, setCompared] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const visible = finishedWindowSystems.filter((system) => filter === "all" || system.kind === filter);
  const selected = finishedWindowSystems.filter((system) => compared.includes(system.id));
  const quoteHref = (id: string) => buildWindowRfqHref({ mode: "finished", series: id, productPath, source: "finished-window-series" });

  function toggleComparison(system: FinishedWindowSystem) {
    const removing = compared.includes(system.id);
    if (!removing && compared.length >= 3) {
      setFeedback("You can compare up to three systems. Remove one from your comparison to add another.");
      return;
    }
    setCompared(removing ? compared.filter((id) => id !== system.id) : [...compared, system.id]);
    setFeedback(`${system.name} ${removing ? "removed from" : "added to"} comparison.`);
    trackEvent("window_series_compare", { mode: "finished", series: system.id, action: removing ? "remove" : "add" });
  }

  return <div className="min-w-0">
    <div className="flex flex-wrap items-center justify-between gap-[12px]">
      <div role="group" aria-label="Filter finished window and door systems" className="flex flex-wrap gap-[6px]">
        {filters.map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => { setFilter(value); trackEvent("window_series_filter", { mode: "finished", filter: value }); }} className={`min-h-[44px] rounded-control border px-[12px] text-f14 ${filter === value ? "border-teal bg-teal-bg2 font-semibold text-teal-text" : "border-border-default bg-white text-t2 hover:border-teal-border"}`}>{label}</button>)}
      </div>
      <p role="status" className="text-f14 text-t3">{visible.length} systems shown · {compared.length}/3 selected</p>
    </div>
    <p className="mt-[10px] text-f14 text-t2">Select up to three systems to compare. Your selection stays when you filter.</p>
    <p role="status" aria-live="polite" className="mt-[6px] text-f14 font-semibold text-teal-text">{feedback || (compared.length === 3 ? "Comparison full. Remove a system to add another." : "")}</p>

    {selected.length > 0 && <section aria-label="Selected finished system comparison" className="mt-[20px] min-w-0 rounded-card border border-teal-border bg-teal-bg p-[16px] sm:p-[24px]">
      <div className="flex flex-wrap items-center justify-between gap-[12px]">
        <h3 className="text-f18 font-bold text-t1">Your comparison · {selected.length}/3</h3>
        <button type="button" className="min-h-[44px] text-f14 font-semibold text-teal-text underline underline-offset-4" onClick={() => { setCompared([]); setFeedback("Comparison cleared."); }}>Clear comparison</button>
      </div>
      <div role="region" aria-label="System comparison table, scroll horizontally on small screens" tabIndex={0} className="relative mt-[12px] overflow-x-auto rounded-control border border-border-default bg-white">
        <table className="w-full min-w-[640px] text-left"><caption className="sr-only">Selected systems, configurations and catalogue-stated performance</caption>
          <thead className="bg-bg2"><tr><th scope="col" className={heading}>System</th>{selected.map((system) => <th key={system.id} scope="col" className={heading}>{system.name}<button type="button" aria-label={`Remove ${system.name} from comparison`} onClick={() => toggleComparison(system)} className="mt-[4px] block min-h-[44px] text-f12 font-normal text-teal-text underline">Remove</button></th>)}</tr></thead>
          <tbody>
            <tr className="border-t border-border-default"><th scope="row" className={heading}>Application</th>{selected.map((system) => <td key={system.id} className={cell}>{system.applications}</td>)}</tr>
            <tr className="border-t border-border-default"><th scope="row" className={heading}>Glazing / assembly &amp; U-value</th>{selected.map((system) => <td key={system.id} className={cell}><GlazingTable system={system} /></td>)}</tr>
            {Object.entries(performanceLabels).map(([key, label]) => <tr key={key} className="border-t border-border-default"><th scope="row" className={heading}>{label}{key !== "sound" && <span className="block text-f12 font-normal text-t3">Catalogue-stated class</span>}</th>{selected.map((system) => <td key={system.id} className={cell}>{system.performance[key as keyof typeof performanceLabels]}</td>)}</tr>)}
            <tr className="border-t border-border-default"><th scope="row" className={heading}>Project review</th>{selected.map((system) => <td key={system.id} className={cell}><Link href={quoteHref(system.id)} className="inline-flex min-h-[44px] items-center font-semibold text-teal-text underline">Quote this system<span className="sr-only">: {system.name}</span></Link></td>)}</tr>
          </tbody>
        </table>
      </div>
      <p className="mt-[12px] text-f12 leading-golden text-t3">{dataNote} Compare the complete opening, glazing, hardware and installation requirements before selecting a system.</p>
    </section>}

    <div className="mt-[20px] grid items-start gap-[16px] md:grid-cols-2 xl:grid-cols-3">
      {visible.map((system) => <article key={system.id} id={`system-${system.id}`} className="min-w-0 scroll-mt-[128px] overflow-hidden rounded-card border border-border-default bg-white">
        <div className="relative aspect-[4/3] border-b border-border-default bg-white"><Image src={system.image} alt={system.imageAlt} fill sizes="(max-width: 767px) 94vw, (max-width: 1279px) 46vw, 380px" className="object-contain p-[16px]" /></div>
        <div className="px-[18px] pb-[8px] pt-[16px] sm:px-[20px]">
          <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{system.kind === "window" ? "Window system" : "Door system"} · {system.series === "Entry" ? "Insulated entrance" : `Series ${system.series}`}</p>
          <h3 className="mt-[6px] text-f18 font-bold leading-snug text-t1">{system.name}</h3>
          <p className="mt-[8px] text-f14 leading-golden text-t2">{system.summary}</p>
          <div className="mt-[12px] flex items-center justify-between gap-[8px] border-t border-border-default">
            <label className="flex min-h-[44px] cursor-pointer items-center gap-[8px] text-f14 text-t1"><input type="checkbox" checked={compared.includes(system.id)} onChange={() => toggleComparison(system)} className="h-[16px] w-[16px] accent-teal-text" />Compare<span className="sr-only"> {system.name}</span></label>
            <Link href={quoteHref(system.id)} onClick={() => trackEvent("window_series_select", { mode: "finished", series: system.id })} className="inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text hover:text-teal">Quote units<span className="sr-only">: {system.name}</span><span aria-hidden className="ml-[4px]">→</span></Link>
          </div>
          <details className="group border-t border-border-default">
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-[12px] text-f14 font-semibold text-t1">Glazing &amp; performance<span className="sr-only">: {system.name}</span><span aria-hidden className="text-f18 text-teal-text group-open:rotate-45">+</span></summary>
            <div className="pb-[16px]">
              <GlazingTable system={system} />
              <dl className="mt-[16px] grid grid-cols-2 gap-[12px]">{Object.entries(performanceLabels).map(([key, label]) => <div key={key}><dt className="text-f12 text-t3">{label}</dt><dd className="mt-[2px] text-f14 font-semibold text-t1">{system.performance[key as keyof typeof performanceLabels]}</dd></div>)}</dl>
              <p className="mt-[10px] text-f12 leading-golden text-t3">{dataNote}</p>
              <h4 className="mt-[16px] text-f14 font-semibold text-t1">System features</h4>
              <ul className="mt-[6px] list-disc space-y-[4px] pl-[18px] text-f14 leading-golden text-t2">{system.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <h4 className="mt-[12px] text-f14 font-semibold text-t1">Applications</h4>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{system.applications}</p>
              <a href={`${finishedWindowCatalog}#page=${system.catalogPage}`} className="mt-[8px] inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text underline underline-offset-4">View catalogue page {system.catalogPage} (PDF)<span className="sr-only">: {system.name}</span></a>
            </div>
          </details>
        </div>
      </article>)}
    </div>
    <p className="mt-[16px] text-f12 leading-golden text-t3">Images illustrate catalogue configurations. Final opening layout, dimensions, finish and hardware are confirmed for each project. Series numbers are product identifiers.</p>
  </div>;
}
