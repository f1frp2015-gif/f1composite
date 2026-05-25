"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface Row {
  property: string;
  f1: string;
  strongwell: string;
  fiberline: string;
  creative: string;
}

const rows: Row[] = [
  {
    property: "Manufacturing scale",
    f1: "370 pultrusion lines · 150,000 t/year",
    strongwell: "~25 lines · USA",
    fiberline: "~15 lines · Denmark",
    creative: "~20 lines · USA",
  },
  {
    property: "Standards compliance",
    f1: "EN 13706 D · ASTM D3917 · ISO 9001",
    strongwell: "EN 13706 · ASTM D3917",
    fiberline: "EN 13706 E23",
    creative: "ASTM D3917",
  },
  {
    property: "Stock lead time",
    f1: "2–4 weeks (China factory)",
    strongwell: "1–3 weeks (US warehouse)",
    fiberline: "2–4 weeks (EU warehouse)",
    creative: "1–2 weeks (US warehouse)",
  },
  {
    property: "Custom die lead time",
    f1: "6–10 weeks total · 500 lm MOQ",
    strongwell: "12–16 weeks · higher MOQ",
    fiberline: "10–14 weeks · higher MOQ",
    creative: "10–14 weeks · higher MOQ",
  },
  {
    property: "Indicative cost vs F1 (per linear meter)",
    f1: "Baseline",
    strongwell: "1.6 – 2.2× F1",
    fiberline: "1.7 – 2.3× F1",
    creative: "1.5 – 2.0× F1",
  },
  {
    property: "Engineering / Knowhow service",
    f1: "In-house pull-mat design, resin selection, FEA — included on RFQ",
    strongwell: "Yes (regional engineers)",
    fiberline: "Yes (EU engineers)",
    creative: "Yes (US engineers)",
  },
  {
    property: "Best for",
    f1: "Global EPCs, exporters to 30+ countries, custom tooling at scale",
    strongwell: "North America domestic projects",
    fiberline: "EU domestic projects, Passive House",
    creative: "North America domestic projects",
  },
];

interface VsCompetitorTableProps {
  pageId: string;
}

/**
 * Side-by-side comparison of F1 Composite with the three Western pultrusion
 * majors. Rendered on `/pultruded-frp-profiles`. Numbers are F1's own
 * positioning — they are the differentiation a buyer comparing F1 vs
 * Strongwell / Fiberline / Creative is actually looking for.
 *
 * Rows are intentionally directional, not absolute — "indicative cost"
 * intentionally avoids quoting a single number.
 */
export default function VsCompetitorTable({ pageId }: VsCompetitorTableProps) {
  const handleAsk = (competitor: string) => () =>
    trackEvent("vs_table_row_click", {
      cta_label: `Ask F1 vs ${competitor}`,
      cta_location: `${pageId}:vs-competitors`,
      intent_layer: "explore",
      note: competitor,
      value: 3,
    });

  return (
    <section id="vs-competitors" className="bg-white py-[89px]" aria-label="F1 Composite vs Western pultrusion majors">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <p className="text-f13 font-semibold uppercase tracking-wide text-t3">Vendor comparison</p>
        <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
          F1 Composite vs Strongwell, Fiberline, and Creative Pultrusions
        </h2>
        <p className="mt-[13px] max-w-[800px] text-f15 leading-golden text-t2">
          The honest positioning when buyers are comparing the four scaled pultrusion houses.
          Same EN 13706 / ASTM specifications across vendors — the differentiators are scale,
          MOQ flexibility, custom tooling turnaround, and landed cost into your region.
        </p>

        <div className="mt-[34px] overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-border-default">
                <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                  Dimension
                </th>
                <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-teal-text">
                  F1 Composite (CN)
                </th>
                <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                  Strongwell (US)
                </th>
                <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                  Fiberline (DK)
                </th>
                <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                  Creative Pultrusions (US)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.property} className="border-b border-border-default">
                  <td className="py-[13px] pr-[21px] align-top text-f13 font-semibold text-t1">{row.property}</td>
                  <td className="py-[13px] pr-[21px] align-top text-f13 font-medium text-teal-text">{row.f1}</td>
                  <td className="py-[13px] pr-[21px] align-top text-f13 text-t2">{row.strongwell}</td>
                  <td className="py-[13px] pr-[21px] align-top text-f13 text-t2">{row.fiberline}</td>
                  <td className="py-[13px] align-top text-f13 text-t2">{row.creative}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-[34px] flex flex-wrap gap-[13px]">
          {(["Strongwell", "Fiberline", "Creative"] as const).map((c) => (
            <Link
              key={c}
              href={`/ask?prefill=I%20currently%20use%20${c}%20and%20I%27m%20comparing%20with%20F1%20Composite.%20Compare%20on%20size%20range%2C%20EN%2013706%20%2F%20ASTM%20compliance%2C%20lead%20time%2C%20and%20landed%20cost%20to%20my%20port.%20Be%20honest%20about%20what%20F1%20cannot%20match.`}
              onClick={handleAsk(c)}
              className="inline-flex items-center gap-[8px] rounded-full border border-border-default bg-bg2 px-[21px] py-[10px] text-f13 font-semibold text-t1 hover:border-teal hover:bg-teal-bg hover:text-teal-text"
            >
              Ask F1 vs {c} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
