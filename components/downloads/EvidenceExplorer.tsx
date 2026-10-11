"use client";

import { useState } from "react";
import Link from "next/link";
import { engineeringEvidence } from "@/content/data/engineeringEvidence";
import { reportVerifications, verificationPath } from "@/content/data/reportVerification";
import { buildRfqHref } from "@/lib/rfq";
import { trackEvent } from "@/lib/analytics";
import { catalogRfqContext, type CatalogConfiguration } from "@/lib/catalog/identity";
import { applicabilityRevision, assessDocumentApplicability, catalogEvidenceProductPath, documentApplicabilityLabels, documentScope, type CatalogEvidenceInput } from "@/content/data/evidenceApplicability";

const verificationHrefs = new Map(reportVerifications.map((item) => [item.evidenceId, verificationPath(item.slug)]));

export default function EvidenceExplorer({ target = null, configuration, asOf }: { target?: CatalogEvidenceInput | null; configuration?: CatalogConfiguration; asOf: string }) {
  const [kind, setKind] = useState("All");
  const [product, setProduct] = useState("All");
  const records = engineeringEvidence.filter((item) => (kind === "All" || item.kind === kind) && (product === "All" || item.productLabel === product));
  return <>
    <div className="mb-[24px] flex flex-wrap items-end gap-[18px]">
      <label className="text-f14 font-bold">Document type<select className="mt-[6px] block min-h-[44px] rounded-tag border border-border-default bg-white px-[12px]" value={kind} onChange={(e) => setKind(e.target.value)}>{["All", ...new Set(engineeringEvidence.map((item) => item.kind))].map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="text-f14 font-bold">Product family<select className="mt-[6px] block min-h-[44px] rounded-tag border border-border-default bg-white px-[12px]" value={product} onChange={(e) => setProduct(e.target.value)}>{["All", ...new Set(engineeringEvidence.map((item) => item.productLabel))].map((value) => <option key={value}>{value}</option>)}</select></label>
      <p role="status" className="py-[10px] text-f14 text-t2">{records.length} documents</p>
    </div>
    {records.length === 0 && <p className="py-[24px] text-t2">No documents match both filters. Choose another document type or product family.</p>}
    <div className="space-y-[18px]">{records.map((item) => {
      const scope = documentScope(item);
      const assessment = target ? assessDocumentApplicability(item.id, target, asOf) : null;
      return <article id={item.id} key={item.id} className="scroll-mt-[100px] rounded-card border border-border-default bg-white p-[22px]">
      <p className="text-f12 font-bold text-teal-text">{item.kind} · {item.reference}</p><h2 className="mt-[8px] text-f24 font-bold">{item.title}</h2><p className="mt-[10px] max-w-[880px] text-f16 text-t2">{item.scope}</p>
      <dl className="mt-[12px] grid gap-x-[20px] gap-y-[6px] text-f14 sm:grid-cols-[auto_1fr]">
        <dt className="font-semibold">Evidence scope</dt><dd>{scope.scopeType}</dd>
        <dt className="font-semibold">Holder / publisher</dt><dd>{scope.holder}</dd>
        {scope.issued && <><dt className="font-semibold">Issued</dt><dd><time dateTime={scope.issued}>{scope.issued}</time></dd></>}
        {scope.validUntil && <><dt className="font-semibold">Valid until</dt><dd><time dateTime={scope.validUntil}>{scope.validUntil}</time></dd></>}
      </dl>
      {assessment && <div className="mt-[14px] rounded-tag bg-bg2 p-[14px] text-f14"><p className="font-semibold">{documentApplicabilityLabels[assessment.status]}</p><p className="mt-[4px] leading-golden text-t2">{assessment.reason}</p></div>}
      <div className="mt-[16px] flex flex-wrap gap-x-[22px] gap-y-[12px] text-f14 font-bold text-teal-text">
        <a href={item.file} className="inline-flex min-h-[44px] items-center underline underline-offset-4" onClick={() => trackEvent("download_evidence", { evidence_id: item.id, product_path: item.product })}>Open document (PDF)</a>
        {verificationHrefs.has(item.id) && <Link className="inline-flex min-h-[44px] items-center underline underline-offset-4" href={verificationHrefs.get(item.id)!}>Verify this document</Link>}
        {item.contextHref && <Link className="inline-flex min-h-[44px] items-center underline underline-offset-4" href={item.contextHref}>Read test results and scope notes</Link>}
        <Link className="inline-flex min-h-[44px] items-center underline underline-offset-4" href={item.product}>{item.productLabel}</Link>
        <Link className="inline-flex min-h-[44px] items-center underline underline-offset-4" href={buildRfqHref({ source: "evidence-library", evidenceId: item.id, product: target ? `${target.categorySlug} configuration` : item.productLabel, productPath: target ? catalogEvidenceProductPath(target.categorySlug) : item.product, ...(target ? { context: { ...(configuration ? catalogRfqContext([configuration]) : {}), evidenceRequest: { ...target, ...(configuration ? { catalogKey: configuration.catalogKey, catalogRevision: configuration.catalogRevision } : {}), evidenceId: item.id, status: assessment?.status, scopeRevision: applicabilityRevision } } } : {}), message: `Please confirm whether ${item.reference} applies to my proposed ${target ? `${target.categorySlug}, catalog section ${configuration?.catalogKey ?? target.sectionId ?? "to confirm"}, formulation ${target.formulationCode ?? "to confirm"}` : item.productLabel.toLowerCase()} configuration. I will provide the dimensions, quantity and project requirements below.` })}>Check applicability to my project</Link>
      </div>
    </article>; })}</div>
  </>;
}
