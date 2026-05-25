"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface IntentChip {
  id: string;
  /** Plain-language statement the user can identify with. */
  label: string;
  /** Destination URL when clicked. */
  href: string;
  /** Funnel layer for analytics — info / explore / transact. */
  intent: "info" | "explore" | "transact";
}

interface IntentChipsProps {
  /** Page slug (e.g. "what-is-frp") used in event params. */
  pageId: string;
  /** Override the default chip set. */
  chips?: IntentChip[];
}

const defaultChips: IntentChip[] = [
  {
    id: "explore-materials",
    label: "I'm comparing materials",
    href: "/technology/frp-vs-traditional-materials",
    intent: "explore",
  },
  {
    id: "spec-now",
    label: "I'm spec'ing a profile now",
    href: "/pultruded-frp-profiles",
    intent: "transact",
  },
  {
    id: "ask-ai",
    label: "I have a quick question",
    href: "/ask",
    intent: "info",
  },
];

/**
 * Three-chip intent splitter rendered directly after the page intro on
 * top-of-funnel content. Routes 80% of educational traffic to the right
 * downstream page in one click, instead of forcing them to scroll the whole
 * long-form guide first.
 */
export default function IntentChips({ pageId, chips = defaultChips }: IntentChipsProps) {
  return (
    <section className="bg-bg2 py-[34px]" aria-label="Choose your next step">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <p className="text-f13 font-semibold uppercase tracking-wide text-t3">
          I&apos;m on this page because&nbsp;…
        </p>
        <div className="mt-[13px] flex flex-wrap gap-[13px]">
          {chips.map((chip) => (
            <Link
              key={chip.id}
              href={chip.href}
              onClick={() =>
                trackEvent("intent_chip_select", {
                  cta_label: chip.label,
                  cta_location: `${pageId}:intent-chips`,
                  intent_layer: chip.intent,
                  destination_url: chip.href,
                  chip_id: chip.id,
                })
              }
              className="group inline-flex items-center gap-[8px] rounded-full border border-border-default bg-white px-[21px] py-[13px] text-f13 font-semibold text-t1 transition-colors hover:border-teal hover:bg-teal-bg hover:text-teal-text"
            >
              {chip.label}
              <span aria-hidden className="text-teal-text transition-transform group-hover:translate-x-[3px]">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
