"use client";

import { useState } from "react";
import Link from "next/link";
import { engineeringEvidence } from "@/content/data/engineeringEvidence";
import { buildRfqHref } from "@/lib/rfq";
import { trackEvent } from "@/lib/analytics";

export default function EvidenceExplorer() {
  const [kind, setKind] = useState("All");
  const [product, setProduct] = useState("All");
  const records = engineeringEvidence.filter((item) => (kind === "All" || item.kind === kind) && (product === "All" || item.productLabel === product));
  return <>
    <div className="mb-[24px] flex flex-wrap items-end gap-[18px]">
      <label className="text-f13 font-bold">Document type<select className="mt-[6px] block min-h-[44px] rounded border border-border-default bg-white px-[12px]" value={kind} onChange={(e) => setKind(e.target.value)}>{["All", ...new Set(engineeringEvidence.map((item) => item.kind))].map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="text-f13 font-bold">Product family<select className="mt-[6px] block min-h-[44px] rounded border border-border-default bg-white px-[12px]" value={product} onChange={(e) => setProduct(e.target.value)}>{["All", ...new Set(engineeringEvidence.map((item) => item.productLabel))].map((value) => <option key={value}>{value}</option>)}</select></label>
      <p role="status" className="py-[10px] text-f13 text-t2">{records.length} documents</p>
    </div>
    {records.length === 0 && <p className="py-[24px] text-t2">No documents match both filters. Choose another document type or product family.</p>}
    <div className="space-y-[18px]">{records.map((item) => <article id={item.id} key={item.id} className="scroll-mt-[100px] rounded-[8px] border border-border-default bg-white p-[22px]">
      <p className="text-f11 font-bold text-teal-text">{item.kind} · {item.reference}</p><h2 className="mt-[8px] text-f24 font-bold">{item.title}</h2><p className="mt-[10px] max-w-[880px] text-f15 text-t2">{item.scope}</p>
      <div className="mt-[16px] flex flex-wrap gap-x-[22px] gap-y-[12px] text-f13 font-bold text-teal-text">
        <a href={item.file} className="inline-flex min-h-[44px] items-center underline underline-offset-4" onClick={() => trackEvent("download_evidence", { evidence_id: item.id, product_path: item.product })}>Open document (PDF)</a>
        <Link className="inline-flex min-h-[44px] items-center underline underline-offset-4" href={item.product}>{item.productLabel}</Link>
        <Link className="inline-flex min-h-[44px] items-center underline underline-offset-4" href={buildRfqHref({ source: "evidence-library", evidenceId: item.id, product: item.productLabel, productPath: item.product, message: `Please confirm whether ${item.reference} applies to my proposed ${item.productLabel.toLowerCase()} configuration. I will provide the dimensions, quantity and project requirements below.` })}>Check applicability to my project</Link>
      </div>
    </article>)}</div>
  </>;
}
