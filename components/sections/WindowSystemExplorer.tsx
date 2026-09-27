"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import systems from "@/content/data/windowSystems.json";
import { buildWindowRfqHref } from "@/lib/windowInquiry";
import { trackEvent } from "@/lib/analytics";

const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";
const kinds: Record<string, string> = { casement: "Casement / tilt-and-turn", sliding: "Sliding window", "compression-sliding": "Sliding door" };

/**
 * The nine window and door systems as selection cards: a filter by operation,
 * compare up to three, and per card the section list and a quote link that
 * carries the series into the RFQ.
 */
export default function WindowSystemExplorer({ mode = "profiles", productPath }: { mode?: "profiles" | "finished"; productPath?: string }) {
  const [filter, setFilter] = useState("all");
  const [compared, setCompared] = useState<string[]>([]);
  const visible = systems.series.filter((series) => filter === "all" || series.kind === filter);
  const compareSeries = systems.series.filter((series) => compared.includes(series.id));
  const filters = [["all", "All 9 systems"], ["casement", "Casement & tilt-and-turn"], ["sliding", "90 sliding"], ["compression-sliding", "140 compression-seal"]];
  const th = "px-[14px] py-[8px] font-semibold text-t1";
  const td = "px-[14px] py-[10px] align-top leading-golden text-t2";
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-[24px] gap-y-[10px]">
        <div role="group" aria-label="Filter window systems" className="flex flex-wrap gap-[6px]">
          {filters.map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => { setFilter(value); trackEvent("window_series_filter", { mode, filter: value }); }} className={`min-h-[36px] rounded-control border px-[10px] text-f14 ${filter === value ? "border-teal bg-teal-bg2 font-semibold text-teal-text" : "border-border-default bg-white text-t2 hover:border-teal-border"}`}>{label}</button>)}
        </div>
        <p className="text-f14 text-t3" role="status">{visible.length} {visible.length === 1 ? "system" : "systems"} shown · compare up to three</p>
      </div>
      <div className="mt-[16px] grid items-start gap-[16px] md:grid-cols-2 xl:grid-cols-3">
        {visible.map((series) => <article key={series.id} id={`system-${series.id}`} className="scroll-mt-[128px] overflow-hidden rounded-card border border-border-default bg-white">
          <div className="relative aspect-[4/3] border-b border-border-default bg-white">
            <Image src={series.image} alt={series.imageAlt} fill sizes="(max-width: 767px) 94vw, (max-width: 1279px) 46vw, 380px" className="object-contain p-[16px]" />
            <span className="absolute right-[8px] top-[8px] rounded-tag bg-white/90 px-[6px] py-[2px] font-mono text-f12 uppercase tracking-[0.06em] text-t2">Rendering</span>
          </div>
          <div className="px-[18px] pb-[8px] pt-[16px] sm:px-[20px]">
            <p className={mono}>{series.depthMm} mm frame · {kinds[series.kind]}</p>
            <h3 className="mt-[6px] text-f18 font-bold leading-snug text-t1">{series.name}</h3>
            <p className="mt-[6px] text-f14 leading-golden text-t2">{series.kind === "compression-sliding" ? "Side-pressure sealing for sliding doors. Confirm the panel arrangement, hardware and threshold for your opening." : series.kind === "sliding" ? "A separate sliding system, with CP001–CP005 profile references. Request current drawings before choosing individual sections." : `${series.depthMm} mm system for ${series.openingTypes.slice(0, 2).join(" and ").toLowerCase()} configurations. Match glass, hardware and interfaces as a set.`}</p>
            <div className="mt-[12px] flex items-center justify-between gap-[8px] border-t border-border-default">
              <label className={`flex min-h-[44px] cursor-pointer items-center gap-[8px] text-f14 ${compared.length >= 3 && !compared.includes(series.id) ? "text-t3" : "text-t1"}`}><input type="checkbox" checked={compared.includes(series.id)} disabled={compared.length >= 3 && !compared.includes(series.id)} onChange={(event) => setCompared((current) => event.target.checked ? [...current, series.id] : current.filter((id) => id !== series.id))} className="h-[16px] w-[16px] accent-teal-text" />Compare<span className="sr-only"> {series.name}</span></label>
              <Link href={buildWindowRfqHref({ mode, productPath, series: series.id, source: "window-series" })} onClick={() => trackEvent("window_series_select", { mode, series: series.id })} className="inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text hover:text-teal">{mode === "profiles" ? "Quote profiles" : "Quote units"} <span aria-hidden className="ml-[4px]">→</span></Link>
            </div>
            <details className="group border-t border-border-default">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-[12px] text-f14 font-semibold text-t1">Sections &amp; configuration<span className="sr-only">: {series.name}</span><span aria-hidden className="text-f18 font-bold text-teal-text transition-transform group-open:rotate-45">+</span></summary>
              <div className="pb-[12px]">
                <p className="text-f14 leading-golden text-t2">Catalog opening references: {series.openingTypes.join(" · ")}. Review the proposed size and hardware before ordering.</p>
                <dl className="mt-[12px] grid grid-cols-2 gap-[12px] text-f14"><div><dt className="text-f12 text-t3">Reference load-bearing wall</dt><dd className="mt-[2px] font-semibold text-t1">{series.wallThicknessMm} mm</dd></div><div><dt className="text-f12 text-t3">Catalog leaf-load reference</dt><dd className="mt-[2px] font-semibold text-t1">{series.referenceMaxLeafKg} kg*</dd></div></dl>
                <p className="mt-[8px] text-f12 leading-golden text-t3">*Configuration-dependent catalog information, not an approved operating limit. Confirm the drawing, hardware, glazing and verification scope.</p>
                {series.sectionImage && <figure className="mt-[12px] rounded-card border border-border-default bg-white p-[12px]"><Image src={series.sectionImage} alt={series.sectionImageAlt || `${series.name} section outlines`} width={1200} height={380} sizes="(max-width: 767px) 85vw, 360px" className="h-auto w-full" /><figcaption className="mt-[8px] text-f12 leading-golden text-t3">Section outlines follow the code list below, from left to right. Request dimensioned drawings before fabrication.</figcaption></figure>}
                <ul className="mt-[12px] divide-y divide-border-default rounded-card border border-border-default">
                  {series.profiles.map((profile) => <li key={profile.code} className="px-[12px] py-[8px] text-f14 text-t2"><strong className="mr-[8px] font-mono text-f12 font-medium text-teal-text">{profile.code}</strong>{profile.label}</li>)}
                </ul>
                {series.id === "90-sliding" && <p className="mt-[10px] text-f14 leading-golden text-t2">Ask for the current section drawings and component mapping for CP001–CP005. The codes alone do not confirm a mating profile set.</p>}
                {series.id === "140" && <p className="mt-[10px] text-f14 leading-golden text-t2">CP006–CP011 identify the compression-seal series. Confirm current assembly drawings; a historical lift-sliding test report does not automatically cover this system.</p>}
                <Link href={buildWindowRfqHref({ mode, productPath, series: series.id, stage: "sample", source: "window-sample" })} className="mt-[4px] inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text hover:text-teal">{mode === "profiles" ? "Discuss a profile sample" : "Discuss a sample unit"} <span aria-hidden className="ml-[4px]">→</span></Link>
              </div>
            </details>
          </div>
        </article>)}
      </div>
      {compareSeries.length > 0 && <section aria-label="Selected system comparison" className="mt-[24px] rounded-card border border-teal-border bg-teal-bg p-[16px] sm:p-[24px]">
        <div className="flex flex-wrap items-center justify-between gap-[12px]"><h3 className="text-f18 font-bold text-t1">Your comparison <span className="ml-[6px] font-mono text-f12 font-normal text-t3">{compareSeries.length}/3</span></h3><button type="button" className="min-h-[44px] text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal" onClick={() => setCompared([])}>Clear comparison</button></div>
        <div className="mt-[12px] overflow-x-auto rounded-card border border-border-default bg-white"><table className="w-full min-w-[560px] border-collapse text-left text-f14"><thead><tr className="border-b border-border-default bg-bg2"><th scope="col" className={th}>Decision</th>{compareSeries.map((series) => <th scope="col" className={th} key={series.id}>{series.name}</th>)}</tr></thead><tbody>
          <tr className="border-b border-border-default"><th scope="row" className={`${th} align-top`}>Frame depth</th>{compareSeries.map((series) => <td className={td} key={series.id}>{series.depthMm} mm</td>)}</tr>
          <tr className="border-b border-border-default"><th scope="row" className={`${th} align-top`}>Opening references</th>{compareSeries.map((series) => <td className={td} key={series.id}>{series.openingTypes.join(", ")}</td>)}</tr>
          <tr className="border-b border-border-default"><th scope="row" className={`${th} align-top`}>Section references</th>{compareSeries.map((series) => <td className={`${td} font-mono text-f12`} key={series.id}>{series.profiles.map((p) => p.code).join(", ")}</td>)}</tr>
          <tr><th scope="row" className={`${th} align-top`}>Next step</th>{compareSeries.map((series) => <td className={td} key={series.id}><Link className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal" href={buildWindowRfqHref({ mode, productPath, series: series.id, source: "window-compare" })}>Review this system</Link></td>)}</tr>
        </tbody></table></div>
        <p className="mt-[12px] text-f14 leading-golden text-t2">Frame depth does not rank whole-window performance. Match the opening, glass, hardware, size and project requirements before making a selection.</p>
      </section>}
    </div>
  );
}
