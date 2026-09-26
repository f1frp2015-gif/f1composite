"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import systems from "@/content/data/windowSystems.json";
import { buildWindowRfqHref } from "@/lib/windowInquiry";
import { trackEvent } from "@/lib/analytics";

export default function WindowSystemExplorer({ mode = "profiles", productPath }: { mode?: "profiles" | "finished"; productPath?: string }) {
  const [filter, setFilter] = useState("all");
  const [compared, setCompared] = useState<string[]>([]);
  const visible = systems.series.filter((series) => filter === "all" || series.kind === filter);
  const compareSeries = systems.series.filter((series) => compared.includes(series.id));
  const filters = [["all", "All 9 systems"], ["casement", "Casement & tilt-and-turn"], ["sliding", "90 sliding"], ["compression-sliding", "140 compression-seal"]];
  return (
    <div>
      <div aria-label="Filter window systems" className="mb-7 flex flex-wrap gap-2">
        {filters.map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => { setFilter(value); trackEvent("window_series_filter", { mode, filter: value }); }} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filter === value ? "border-deep bg-deep text-white" : "border-border-default bg-white text-t2 hover:border-teal hover:text-teal-text"}`}>{label}</button>)}
      </div>
      <p className="mb-5 text-sm text-t2" role="status">{visible.length} systems shown. Compare up to three; open a card for sections and supply details.</p>
      <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((series) => <article key={series.id} id={`system-${series.id}`} className="scroll-mt-28 overflow-hidden rounded-card border border-border-default bg-white">
          <div className="relative aspect-[4/3] bg-white">
            <Image src={series.image} alt={series.imageAlt} fill sizes="(max-width: 768px) 90vw, (max-width: 1280px) 44vw, 29vw" className="object-contain p-4" />
            <span className="absolute left-4 top-4 rounded-tag bg-white/95 px-2.5 py-1 text-xs font-bold text-teal-text">{series.depthMm} mm frame depth</span>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold leading-snug text-t1">{series.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-t2">{series.kind === "compression-sliding" ? "Side-pressure sealing for sliding doors. Confirm the panel arrangement, hardware and threshold for your opening." : series.kind === "sliding" ? "A separate sliding system, with CP001–CP005 profile references. Request current drawings before choosing individual sections." : `${series.depthMm} mm system for ${series.openingTypes.slice(0, 2).join(" and ").toLowerCase()} configurations. Match glass, hardware and interfaces as a set.`}</p>
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-border-default pt-4">
              <label className={`flex min-h-10 items-center gap-2 text-sm ${compared.length >= 3 && !compared.includes(series.id) ? "text-t3" : "text-t1"}`}><input type="checkbox" checked={compared.includes(series.id)} disabled={compared.length >= 3 && !compared.includes(series.id)} onChange={(event) => setCompared((current) => event.target.checked ? [...current, series.id] : current.filter((id) => id !== series.id))} className="h-4 w-4 accent-teal-text" />Compare<span className="sr-only"> {series.name}</span></label>
              <Link href={buildWindowRfqHref({ mode, productPath, series: series.id, source: "window-series" })} onClick={() => trackEvent("window_series_select", { mode, series: series.id })} className="py-2 text-sm font-bold text-teal-text">{mode === "profiles" ? "Quote profiles" : "Quote units"} →</Link>
            </div>
            <details className="mt-2 border-t border-border-default pt-1">
              <summary className="cursor-pointer py-3 text-sm font-semibold text-t1">Sections &amp; configuration<span className="sr-only">: {series.name}</span></summary>
              <p className="text-xs leading-relaxed text-t2">Catalog opening references: {series.openingTypes.join(" · ")}. Review the proposed size and hardware before ordering.</p>
              <dl className="my-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-t3">Reference load-bearing wall</dt><dd className="mt-1 font-semibold">{series.wallThicknessMm} mm</dd></div><div><dt className="text-t3">Catalog leaf-load reference</dt><dd className="mt-1 font-semibold">{series.referenceMaxLeafKg} kg*</dd></div></dl>
              <p className="mb-3 text-xs text-t3">*Configuration-dependent catalog information, not an approved operating limit. Confirm the drawing, hardware, glazing and verification scope.</p>
              {series.sectionImage && <figure className="mb-4 rounded-card border border-border-default bg-white p-3"><Image src={series.sectionImage} alt={series.sectionImageAlt || `${series.name} section outlines`} width={1200} height={380} sizes="(max-width: 768px) 85vw, 400px" className="h-auto w-full" /><figcaption className="mt-2 text-xs leading-relaxed text-t3">Section outlines follow the code list below, from left to right. Request dimensioned drawings before fabrication.</figcaption></figure>}
              <ul className="divide-y divide-border-default rounded-card border border-border-default">
                {series.profiles.map((profile) => <li key={profile.code} className="px-3 py-2 text-xs"><strong className="mr-2 font-mono text-teal-text">{profile.code}</strong>{profile.label}</li>)}
              </ul>
              {series.id === "90-sliding" && <p className="mt-3 text-xs text-t2">Ask for the current section drawings and component mapping for CP001–CP005. The codes alone do not confirm a mating profile set.</p>}
              {series.id === "140" && <p className="mt-3 text-xs text-t2">CP006–CP011 identify the compression-seal series. Confirm current assembly drawings; a historical lift-sliding test report does not automatically cover this system.</p>}
              <Link href={buildWindowRfqHref({ mode, productPath, series: series.id, stage: "sample", source: "window-sample" })} className="mt-4 inline-block py-2 text-sm font-semibold text-teal-text">{mode === "profiles" ? "Discuss a profile sample" : "Discuss a sample unit"} →</Link>
            </details>
          </div>
        </article>)}
      </div>
      {compareSeries.length > 0 && <section aria-label="Selected system comparison" className="mt-8 rounded-card border border-teal-border bg-teal-bg p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-lg font-bold text-t1">Your comparison ({compareSeries.length}/3)</h3><button type="button" className="min-h-11 text-sm font-semibold text-teal-text underline" onClick={() => setCompared([])}>Clear comparison</button></div>
        <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead><tr><th className="p-3">Decision</th>{compareSeries.map((series) => <th className="p-3" key={series.id}>{series.name}</th>)}</tr></thead><tbody>
          <tr className="border-t border-teal-border"><th className="p-3">Frame depth</th>{compareSeries.map((series) => <td className="p-3" key={series.id}>{series.depthMm} mm</td>)}</tr>
          <tr className="border-t border-teal-border"><th className="p-3">Opening references</th>{compareSeries.map((series) => <td className="p-3 align-top" key={series.id}>{series.openingTypes.join(", ")}</td>)}</tr>
          <tr className="border-t border-teal-border"><th className="p-3">Section references</th>{compareSeries.map((series) => <td className="p-3 align-top font-mono text-xs" key={series.id}>{series.profiles.map((p) => p.code).join(", ")}</td>)}</tr>
          <tr className="border-t border-teal-border"><th className="p-3">Next step</th>{compareSeries.map((series) => <td className="p-3" key={series.id}><Link className="font-bold text-teal-text underline" href={buildWindowRfqHref({ mode, productPath, series: series.id, source: "window-compare" })}>Review this system →</Link></td>)}</tr>
        </tbody></table></div>
        <p className="mt-4 text-xs text-t2">Frame depth does not rank whole-window performance. Match the opening, glass, hardware, size and project requirements before making a selection.</p>
      </section>}
    </div>
  );
}
