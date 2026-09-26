import Link from "next/link";
import { formatLongDate } from "@/lib/dates";
import type { LibraryDocument } from "@/lib/documentTypes";
import { buildRfqHref } from "@/lib/rfq";

export interface DocumentCardData {
  /** Document type, shown as the dark tag. */
  type: string;
  title: string;
  /** Top-right note: format and size, "On request", a count … */
  meta: string;
  issuer?: string | null;
  date?: { label: string; value: string };
  product?: string;
  productHref?: string;
  description?: string;
  action: { label: string; href: string; file?: boolean };
}

/** Card data for a document from the library (lib/documents.ts). */
export function libraryCard(document: LibraryDocument, source = "download-request"): DocumentCardData {
  return {
    type: document.type,
    title: document.title,
    meta: document.file ? `${document.format} · ${document.size}` : "On request",
    issuer: document.issuer,
    date: document.date,
    product: document.product,
    productHref: document.productHref,
    description: document.description,
    action: document.file
      ? { label: `Download ${document.format}`, href: document.file, file: true }
      : {
          label: "Request this document",
          href: buildRfqHref({ source, product: document.title, message: `Please confirm availability and applicability of: ${document.title}` }),
        },
  };
}

/**
 * The site's document card: type, issuer, date, product and scope, then one
 * action. Compact cards show only type, title and action on phones.
 */
export default function DocumentCard({ card, compact = false }: { card: DocumentCardData; compact?: boolean }) {
  return (
    <div className={`flex h-full flex-col rounded-card border border-border-default bg-white ${compact ? "p-[16px] sm:p-[20px]" : "p-[20px]"}`}>
      <div className="flex items-center justify-between gap-[8px]">
        <span className="rounded-tag bg-deep px-[8px] py-[3px] font-mono text-f12 uppercase tracking-[0.06em] text-white">{card.type}</span>
        <span className="text-f12 text-t3">{card.meta}</span>
      </div>
      <h3 className="mt-[12px] text-f16 font-bold text-t1">{card.title}</h3>
      {card.issuer || card.date || card.product ? (
        <dl className={`mt-[10px] grid grid-cols-[auto_minmax(0,1fr)] gap-x-[12px] gap-y-[3px] text-f14 ${compact ? "max-sm:hidden" : ""}`}>
          {card.issuer ? (
            <>
              <dt className="font-mono text-f12 leading-[1.6] text-t3">Issued by</dt>
              <dd className="text-t1">{card.issuer}</dd>
            </>
          ) : null}
          {card.date ? (
            <>
              <dt className="font-mono text-f12 leading-[1.6] text-t3">{card.date.label}</dt>
              <dd className="text-t1">
                <time dateTime={card.date.value}>{formatLongDate(card.date.value)}</time>
              </dd>
            </>
          ) : null}
          {card.product ? (
            <>
              <dt className="font-mono text-f12 leading-[1.6] text-t3">For</dt>
              <dd className="text-t1">
                {card.productHref ? (
                  <Link href={card.productHref} className="hover:text-teal-text hover:underline">
                    {card.product}
                  </Link>
                ) : (
                  card.product
                )}
              </dd>
            </>
          ) : null}
        </dl>
      ) : null}
      {card.description ? <p className={`mt-[10px] line-clamp-4 text-f14 leading-golden text-t2 ${compact ? "max-sm:hidden" : ""}`}>{card.description}</p> : null}
      <div className="mt-auto pt-[14px]">
        {card.action.file ? (
          <a href={card.action.href} target="_blank" rel="noopener" className="text-f14 font-semibold text-teal-text hover:underline">
            {card.action.label} <span aria-hidden>→</span>
          </a>
        ) : (
          <Link href={card.action.href} className="text-f14 font-semibold text-teal-text hover:underline">
            {card.action.label} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
