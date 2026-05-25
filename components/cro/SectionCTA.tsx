"use client";

import Link from "next/link";
import { trackEvent, type CtaIntentLayer } from "@/lib/analytics";

interface SectionCTAProps {
  /** Section id this CTA sits inside — fired as `page_section`. */
  sectionId: string;
  /** Page slug (e.g. "what-is-frp") fired as `cta_location` prefix. */
  pageId: string;
  /** Short headline appearing above the CTA. */
  headline: string;
  /** Primary CTA label. */
  ctaLabel: string;
  /** Primary CTA destination. May be /ask?prefill=... or any internal route. */
  href: string;
  /** Optional secondary CTA. */
  secondary?: { label: string; href: string };
  /** Funnel layer for analytics. */
  intent?: CtaIntentLayer;
  /** Visual variant — `subtle` matches the body bg, `teal` stands out. */
  variant?: "subtle" | "teal";
  /** Optional one-line description above the buttons. */
  description?: string;
}

/**
 * Compact, in-flow CTA card placed at the end of a long-form section.
 *
 * The intent is to catch the reader at the moment they finished a specific
 * sub-topic (e.g. Limitations) — when their next-step question is concrete —
 * instead of waiting for the page-end CTA. Tracked separately per section so
 * we can see which content drives the most conversions.
 */
export default function SectionCTA({
  sectionId,
  pageId,
  headline,
  ctaLabel,
  href,
  secondary,
  intent = "explore",
  variant = "subtle",
  description,
}: SectionCTAProps) {
  const handleClick = (label: string, dest: string) => () =>
    trackEvent("cta_click", {
      cta_label: label,
      cta_location: `${pageId}:section:${sectionId}`,
      page_section: sectionId,
      intent_layer: intent,
      destination_url: dest,
    });

  const wrapper =
    variant === "teal"
      ? "mt-[34px] rounded-[8px] border border-teal-border bg-teal-bg p-[24px]"
      : "mt-[34px] rounded-[8px] border border-border-default bg-bg2 p-[24px]";

  return (
    <aside className={wrapper}>
      <div className="flex flex-col items-start gap-[13px] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-f15 font-bold text-t1">{headline}</p>
          {description ? (
            <p className="mt-[5px] max-w-[680px] text-f13 leading-golden text-t2">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-[13px]">
          <Link
            href={href}
            onClick={handleClick(ctaLabel, href)}
            className="inline-flex items-center gap-[8px] rounded-[8px] bg-teal px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
          >
            {ctaLabel}
            <span aria-hidden>→</span>
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              onClick={handleClick(secondary.label, secondary.href)}
              className="text-f13 font-semibold text-teal-text hover:text-teal"
            >
              {secondary.label} →
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
