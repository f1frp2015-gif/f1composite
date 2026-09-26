"use client";

import Link from "next/link";
import { useState } from "react";
import { formatLongDate } from "@/lib/dates";
import { DOCUMENT_TYPES, DOCUMENT_TYPE_LABELS, type DocumentType, type LibraryDocument } from "@/lib/documentTypes";
import { buildRfqHref } from "@/lib/rfq";

const ALL = "All";
const selectClass = "mt-[6px] block min-h-[44px] w-full rounded-control border border-border-default bg-white px-[10px] text-f14 text-t1";

/** The downloads page's documents, filtered by type, product and issuer. */
export default function DocumentLibrary({ documents }: { documents: LibraryDocument[] }) {
  const [type, setType] = useState<DocumentType | typeof ALL>(ALL);
  const [product, setProduct] = useState(ALL);
  const [issuer, setIssuer] = useState(ALL);

  const types = DOCUMENT_TYPES.filter((value) => documents.some((document) => document.type === value));
  const products = [...new Set(documents.map((document) => document.product))].sort((a, b) => (a === "All products" ? 1 : b === "All products" ? -1 : a.localeCompare(b)));
  const issuers = [...new Set(documents.flatMap((document) => (document.issuer ? [document.issuer] : [])))].sort((a, b) => (a === "F1 Composite" ? 1 : b === "F1 Composite" ? -1 : a.localeCompare(b)));
  const shown = documents.filter(
    (document) => (type === ALL || document.type === type) && (product === ALL || document.product === product) && (issuer === ALL || document.issuer === issuer),
  );
  const filtered = type !== ALL || product !== ALL || issuer !== ALL;

  return (
    <>
      <div className="grid gap-[14px] rounded-card border border-border-default bg-white p-[16px] md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-end">
        <fieldset>
          <legend className="font-mono text-f12 text-t3">Document type</legend>
          <div className="mt-[6px] flex flex-wrap gap-[6px]">
            {[ALL, ...types].map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={type === value}
                onClick={() => setType(value as DocumentType | typeof ALL)}
                className={`min-h-[36px] rounded-control border px-[10px] text-f14 ${type === value ? "border-teal bg-teal-bg2 font-semibold text-teal-text" : "border-border-default text-t2 hover:border-teal-border"}`}
              >
                {value === ALL ? "All types" : DOCUMENT_TYPE_LABELS[value as DocumentType]}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="font-mono text-f12 text-t3">
          Product
          <select value={product} onChange={(event) => setProduct(event.target.value)} className={`${selectClass} font-sans`}>
            <option value={ALL}>All products</option>
            {products.filter((value) => value !== "All products").map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label className="font-mono text-f12 text-t3">
          Issued by
          <select value={issuer} onChange={(event) => setIssuer(event.target.value)} className={`${selectClass} font-sans`}>
            <option value={ALL}>Any issuer</option>
            {issuers.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      <p role="status" className="mt-[14px] text-f14 text-t2">
        {shown.length} of {documents.length} documents
        {filtered ? (
          <>
            {" · "}
            <button
              type="button"
              onClick={() => {
                setType(ALL);
                setProduct(ALL);
                setIssuer(ALL);
              }}
              className="font-semibold text-teal-text hover:underline"
            >
              Clear filters
            </button>
          </>
        ) : null}
      </p>

      {shown.length === 0 ? (
        <p className="mt-[16px] rounded-card border border-border-default bg-white p-[20px] text-f16 text-t2">
          No document matches all three filters. Clear one, or{" "}
          <Link href={buildRfqHref({ source: "download-request", message: "Please tell me which documents are available for my product and project." })} className="font-semibold text-teal-text underline">
            ask which documents exist for your product
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-[16px] grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {shown.map((document) => (
            <li key={document.file ?? document.title} className="flex flex-col rounded-card border border-border-default bg-white p-[20px]">
              <div className="flex items-center justify-between gap-[8px]">
                <span className="rounded-tag bg-deep px-[8px] py-[3px] font-mono text-f12 uppercase tracking-[0.06em] text-white">{document.type}</span>
                <span className="text-f12 text-t3">{document.file ? `${document.format} · ${document.size}` : "On request"}</span>
              </div>
              <h3 className="mt-[12px] text-f16 font-bold text-t1">{document.title}</h3>
              <dl className="mt-[10px] grid grid-cols-[auto_minmax(0,1fr)] gap-x-[12px] gap-y-[3px] text-f14">
                {document.issuer ? (
                  <>
                    <dt className="font-mono text-f12 leading-[1.6] text-t3">Issued by</dt>
                    <dd className="text-t1">{document.issuer}</dd>
                  </>
                ) : null}
                {document.date ? (
                  <>
                    <dt className="font-mono text-f12 leading-[1.6] text-t3">{document.date.label}</dt>
                    <dd className="text-t1">
                      <time dateTime={document.date.value}>{formatLongDate(document.date.value)}</time>
                    </dd>
                  </>
                ) : null}
                <dt className="font-mono text-f12 leading-[1.6] text-t3">For</dt>
                <dd className="text-t1">
                  {document.productHref ? (
                    <Link href={document.productHref} className="hover:text-teal-text hover:underline">
                      {document.product}
                    </Link>
                  ) : (
                    document.product
                  )}
                </dd>
              </dl>
              <p className="mt-[10px] line-clamp-4 text-f14 leading-golden text-t2">{document.description}</p>
              <div className="mt-auto pt-[14px]">
                {document.file ? (
                  <a href={document.file} target="_blank" rel="noopener" className="text-f14 font-semibold text-teal-text hover:underline">
                    Download {document.format} <span aria-hidden>→</span>
                  </a>
                ) : (
                  <Link
                    href={buildRfqHref({ source: "download-request", product: document.title, message: `Please confirm availability and applicability of: ${document.title}` })}
                    className="text-f14 font-semibold text-teal-text hover:underline"
                  >
                    Request this document <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
