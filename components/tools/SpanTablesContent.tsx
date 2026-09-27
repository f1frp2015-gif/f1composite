"use client";

import { useState } from "react";
import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import { SPANS_MM, type GoverningCheck, type SpanFamily } from "@/lib/spanTables";

const SITE_URL = "https://www.f1composite.com";
const GOVERNS_MARK = { deflection: "d", bending: "b", shear: "v" } as const;

function formatLoad(w: number): string {
  if (w < 0.05) return "—";
  if (w < 1) return w.toFixed(2);
  return w.toFixed(1);
}

function formatSpan(spanMm: number): string {
  return (spanMm / 1000).toFixed(1).replace(/\.0$/, "");
}

function valueAnchor(model: string, spanMm: number): string {
  const modelSlug = model
    .toLowerCase()
    .replaceAll("×", "x")
    .replaceAll(".", "-")
    .replace(/[^a-z0-9-]/g, "");
  return `${modelSlug}-span-${spanMm}`;
}

function buildValueCitation(model: string, spanMm: number, load: number, governs: GoverningCheck): string {
  const anchor = valueAnchor(model, spanMm);
  return `Source: F1 Composite FRP Span Table — ${model}, span ${formatSpan(spanMm)} m, allowable UDL ${formatLoad(load)} kN/m (${governs} governs). Design basis: EN 13706 E23; LRFD per ASCE/SEI 74-23. Available at: ${SITE_URL}/frp-span-tables#${anchor}`;
}

export default function SpanTablesContent({
  families,
  datasheetHrefs = {},
  variant = "embed",
}: {
  families: SpanFamily[];
  /** "page" renders each family as a section of the template page; "embed" keeps the compact iframe layout. */
  variant?: "page" | "embed";
  /** Model → datasheet URL, built on the server so the catalog stays out of the client bundle. */
  datasheetHrefs?: Record<string, string>;
}) {
  const [copiedValue, setCopiedValue] = useState<{ key: string; citation: string } | null>(null);
  const [copyError, setCopyError] = useState(false);

  async function copyValueCitation(model: string, spanMm: number, load: number, governs: GoverningCheck) {
    const key = valueAnchor(model, spanMm);
    const citation = buildValueCitation(model, spanMm, load, governs);
    try {
      await navigator.clipboard.writeText(citation);
      setCopyError(false);
      setCopiedValue({ key, citation });
    } catch {
      setCopyError(true);
      setCopiedValue({ key, citation });
    }
  }

  return (
    <>
      {families.map((family, index) => {
        const table = (
          <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
            <table className="w-full min-w-[1200px] border-collapse text-left text-f14">
              <thead>
                <tr className="border-b border-border-default bg-bg2">
                  <th scope="col" className="whitespace-nowrap px-[12px] py-[8px] font-semibold text-t1">Section (mm)</th>
                  <th scope="col" className="whitespace-nowrap px-[12px] py-[8px] font-semibold text-t1">kg/m</th>
                  <th scope="col" className="whitespace-nowrap px-[12px] py-[8px] font-semibold text-t1">Ix ×10⁶ mm⁴</th>
                  {SPANS_MM.map((L) => (
                    <th scope="col" key={L} className="whitespace-nowrap px-[12px] py-[8px] text-right font-semibold text-t1">
                      {formatSpan(L)} m
                    </th>
                  ))}
                  <th scope="col" className="px-[12px] py-[8px]"><span className="sr-only">Calculator</span></th>
                </tr>
              </thead>
              <tbody>
                {family.rows.map((row) => (
                  <tr key={row.model} className="border-b border-border-default text-t2 last:border-b-0">
                    <th scope="row" className="whitespace-nowrap px-[12px] py-[8px] font-semibold text-t1">
                      {datasheetHrefs[row.model] ? (
                        <Link href={datasheetHrefs[row.model]} prefetch={false} className="text-teal-text underline decoration-teal-border underline-offset-4 hover:text-teal">
                          {row.model}
                        </Link>
                      ) : (
                        row.model
                      )}
                    </th>
                    <td className="whitespace-nowrap px-[12px] py-[8px] tabular-nums">{row.weightKgPerM}</td>
                    <td className="whitespace-nowrap px-[12px] py-[8px] tabular-nums">{(row.IxMm4 / 1e6).toFixed(2)}</td>
                    {row.cells.map((cell, i) => {
                      const span = SPANS_MM[i];
                      const anchor = valueAnchor(row.model, span);
                      return (
                        <td id={anchor} key={span} className="scroll-mt-[100px] whitespace-nowrap px-[10px] py-[6px] text-right tabular-nums">
                          {cell.w < 0.05 ? (
                            "—"
                          ) : (
                            <div className="flex items-center justify-end gap-[6px]">
                              <span>
                                {formatLoad(cell.w)}
                                <sup className="text-t3">{GOVERNS_MARK[cell.governs]}</sup>
                              </span>
                              <button
                                type="button"
                                onClick={() => copyValueCitation(row.model, span, cell.w, cell.governs)}
                                aria-label={`Copy citation for ${row.model} at ${formatSpan(span)} meter span, ASCE/SEI 74-23 design basis`}
                                title="Cite this value (ASCE/SEI 74-23 design basis)"
                                className="rounded-control border border-border-default bg-white px-[6px] py-[2px] text-f12 font-bold text-teal-text transition-colors hover:border-teal hover:bg-teal-bg"
                              >
                                {copiedValue?.key === anchor ? "Copied" : "Cite"}
                              </button>
                            </div>
                          )}
                        </td>
                      );
                    })}
                    <td className="whitespace-nowrap px-[12px] py-[8px] text-right">
                      <Link href={row.calculatorHref} target="_blank" rel="noopener" className="font-semibold text-teal-text hover:underline">
                        Check <span aria-hidden="true">→</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        return variant === "page" ? (
          <PageSection key={family.id} id={family.id} title={family.title} intro={family.intro} tone={index % 2 === 0 ? "muted" : "white"}>
            {table}
          </PageSection>
        ) : (
          <section key={family.id} id={family.id} className="bg-white py-[32px]">
            <div className="site-container">
              <h2 className="text-f24 font-bold text-t1">{family.title}</h2>
              <p className="mt-[8px] max-w-[800px] text-f16 leading-golden text-t2">{family.intro}</p>
              <div className="mt-[20px]">{table}</div>
            </div>
          </section>
        );
      })}

      {copiedValue && (
        <div
          role="status"
          data-page-bottom-bar
          className="fixed bottom-[20px] left-[20px] right-[20px] z-50 rounded-card border border-teal-border bg-white p-[16px] shadow-pop sm:left-auto sm:max-w-[560px]"
        >
          <div className="flex items-start justify-between gap-[12px]">
            <div>
              <p className="text-f14 font-bold text-t1">{copyError ? "Copy this citation manually" : "✓ Citation copied"}</p>
              <p className="mt-[6px] break-words text-f12 leading-relaxed text-t2">{copiedValue.citation}</p>
            </div>
            <button
              type="button"
              onClick={() => setCopiedValue(null)}
              aria-label="Close citation message"
              className="shrink-0 text-f18 leading-none text-t3 hover:text-t1"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
