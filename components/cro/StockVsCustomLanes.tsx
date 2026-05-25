"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface LaneSpec {
  id: "stock" | "custom";
  label: string;
  headline: string;
  description: string;
  bullets: string[];
  cta: { label: string; href: string };
  /** Optional secondary inline link, e.g. "or chat with Doris on WhatsApp". */
  secondary?: { label: string; href: string };
}

const lanes: LaneSpec[] = [
  {
    id: "stock",
    label: "Stock catalog",
    headline: "Ship in 2–4 weeks · no MOQ · 7 standard geometries",
    description:
      "I-beams, channels, angles, square / round tubes, flat bar, and rod in our published EN 13706 D / ASTM size chart.",
    bullets: [
      "Stock standard profiles ship in 2–4 weeks",
      "EN 13706 D, ASTM D3917 ±0.25 mm, ISO 9001 documentation in every shipment",
      "Mix 1 container across geometries — no MOQ per SKU",
    ],
    cta: { label: "Browse stock catalog", href: "/products/standard-profiles" },
    secondary: { label: "Request a quote", href: "/contact" },
  },
  {
    id: "custom",
    label: "Custom pultrusion",
    headline: "New die in 6–10 weeks · 500 lm first run · up to 600×300 mm cross-section",
    description:
      "Bespoke cross-sections for fenestration, EV battery trays, rail interiors, solar mounting, and structural replacements.",
    bullets: [
      "3–6 weeks for tooling, then trial run + production",
      "500 linear meter MOQ on the first run; 200 lm on repeat orders",
      "In-house die design, NDA on cross-section IP",
    ],
    cta: { label: "Start a custom project", href: "/products/custom-pultrusions" },
    secondary: { label: "Talk through specs first", href: "/ask?prefill=I%20need%20a%20custom%20pultruded%20FRP%20profile.%20Approximate%20cross-section%20%5Bfill%20in%5D%2C%20annual%20quantity%20%5Bfill%20in%5D%2C%20target%20market%20%5Bfill%20in%5D.%20Walk%20me%20through%20the%20tooling%20lead%20time%2C%20MOQ%2C%20and%20the%20spec%20inputs%20F1%20needs." },
  },
];

interface StockVsCustomLanesProps {
  pageId: string;
}

/**
 * Two-lane choice card placed right under the hero on
 * `/pultruded-frp-profiles`. Splits visitors into the two real-world buying
 * journeys (stock SKU vs custom tooling) before they get lost in the 9-card
 * product grid.
 */
export default function StockVsCustomLanes({ pageId }: StockVsCustomLanesProps) {
  const handleLane = (lane: LaneSpec, target: "primary" | "secondary") => {
    const link = target === "primary" ? lane.cta : lane.secondary;
    if (!link) return;
    trackEvent("lane_click", {
      cta_label: link.label,
      cta_location: `${pageId}:stock-vs-custom`,
      destination_url: link.href,
      intent_layer: "transact",
      note: lane.id,
      value: target === "primary" ? 3 : 2,
    });
  };

  return (
    <section className="bg-white py-[55px]" aria-label="Stock vs custom pultrusion pathways">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <p className="text-f13 font-semibold uppercase tracking-wide text-t3">Two ways to buy from F1</p>
        <h2 className="mt-[8px] text-f24 font-bold text-t1">
          Stock catalog or custom pultrusion — pick your lane
        </h2>
        <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
          {lanes.map((lane) => (
            <article
              key={lane.id}
              className="flex flex-col gap-[13px] rounded-[12px] border border-border-default bg-bg2 p-[29px]"
            >
              <p className="text-f11 font-bold uppercase tracking-wide text-teal-text">{lane.label}</p>
              <h3 className="text-f19 font-bold leading-[1.25] text-t1">{lane.headline}</h3>
              <p className="text-f13 leading-golden text-t2">{lane.description}</p>
              <ul className="mt-[5px] space-y-[5px] text-f13 text-t2">
                {lane.bullets.map((b) => (
                  <li key={b} className="flex gap-[8px]">
                    <span aria-hidden className="text-teal-text">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-[8px] flex flex-wrap items-center gap-[13px]">
                <Link
                  href={lane.cta.href}
                  onClick={() => handleLane(lane, "primary")}
                  className="inline-flex items-center gap-[8px] rounded-[8px] bg-teal px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white hover:bg-teal-text"
                >
                  {lane.cta.label}
                  <span aria-hidden>→</span>
                </Link>
                {lane.secondary ? (
                  <Link
                    href={lane.secondary.href}
                    onClick={() => handleLane(lane, "secondary")}
                    className="text-f13 font-semibold text-teal-text hover:text-teal"
                  >
                    {lane.secondary.label} →
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
