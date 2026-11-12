import type { ReactNode } from "react";
import PageSection from "@/components/layout/PageSection";
import { formatShortDate } from "@/lib/dates";

export interface KeyFact {
  label: string;
  /** One or two complete sentences that still read correctly when quoted on their own. */
  value: ReactNode;
}

/**
 * A short answer and a list of labelled facts near the top of a hub page.
 * Each line is written to be quoted on its own by a search snippet or an AI
 * answer, so the values come from the page's own data and the vetted
 * statements in content/data; do not add a claim here that the page body
 * does not support.
 */
export default function KeyFacts({
  id = "key-facts",
  title,
  summary,
  facts,
  updated,
  tone = "white",
}: {
  id?: string;
  title: string;
  /** The direct answer: what the product is and what F1 supplies, in one or two sentences. */
  summary: ReactNode;
  facts: readonly KeyFact[];
  /** Only for pages without a PageHeader date. Keep it equal to the page's JSON-LD dateModified. */
  updated?: string;
  tone?: "white" | "muted";
}) {
  return (
    <PageSection id={id} title={title} tone={tone}>
      <p className="max-w-[860px] text-f18 leading-relaxed text-t1">{summary}</p>
      <dl className="mt-[24px] max-w-[980px] border-t border-border-default">
        {facts.map((fact) => (
          <div key={fact.label} className="grid gap-[4px] border-b border-border-default py-[14px] sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:gap-[24px]">
            <dt className="text-f14 font-semibold text-t1">{fact.label}</dt>
            <dd className="text-f14 leading-golden text-t2">{fact.value}</dd>
          </div>
        ))}
      </dl>
      {updated ? (
        <p className="mt-[12px] text-f14 text-t3">
          Last updated <time dateTime={updated}>{formatShortDate(updated)}</time>
        </p>
      ) : null}
    </PageSection>
  );
}
