"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function SpanTablesContent({ families }: { families: SpanFamily[] }) {
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
      {families.map((family) => (
        <section key={family.id} id={family.id} className="bg-white py-[34px]">
          <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[34px]">
            <h2 className="text-f24 font-bold text-t1">{family.title}</h2>
            <p className="mt-[8px] max-w-[800px] text-f15 leading-golden text-t2">{family.intro}</p>
            <div className="mt-[21px] overflow-x-auto rounded-[8px] border border-border-default">
              <table className="w-full min-w-[1200px] border-collapse text-f13">
                <thead>
                  <tr className="bg-slate-50 text-left text-t1">
                    <th className="whitespace-nowrap px-[13px] py-[10px] font-semibold">Section (mm)</th>
                    <th className="whitespace-nowrap px-[13px] py-[10px] font-semibold">kg/m</th>
                    <th className="whitespace-nowrap px-[13px] py-[10px] font-semibold">Ix ×10⁶ mm⁴</th>
                    {SPANS_MM.map((L) => (
                      <th key={L} className="whitespace-nowrap px-[13px] py-[10px] text-right font-semibold">
                        {formatSpan(L)} m
                      </th>
                    ))}
                    <th className="px-[13px] py-[10px]" />
                  </tr>
                </thead>
                <tbody>
                  {family.rows.map((row) => (
                    <tr key={row.model} className="border-t border-border-default/70 text-t2">
                      <td className="whitespace-nowrap px-[13px] py-[8px] font-medium text-t1">{row.model}</td>
                      <td className="whitespace-nowrap px-[13px] py-[8px]">{row.weightKgPerM}</td>
                      <td className="whitespace-nowrap px-[13px] py-[8px]">{(row.IxMm4 / 1e6).toFixed(2)}</td>
                      {row.cells.map((cell, i) => {
                        const span = SPANS_MM[i];
                        const anchor = valueAnchor(row.model, span);
                        return (
                          <td id={anchor} key={span} className="scroll-mt-[100px] whitespace-nowrap px-[10px] py-[7px] text-right tabular-nums">
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
                                  aria-label={`Copy citation for ${row.model} at ${formatSpan(span)} metre span, ASCE/SEI 74-23 design basis`}
                                  title="Cite this value (ASCE/SEI 74-23 design basis)"
                                  className="rounded-[5px] border border-border-default bg-white px-[6px] py-[3px] text-[10px] font-bold text-teal-text transition-colors hover:border-teal hover:bg-teal-bg"
                                >
                                  {copiedValue?.key === anchor ? "✓ Copied" : "📋 Cite"}
                                </button>
                              </div>
                            )}
                          </td>
                        );
                      })}
                      <td className="whitespace-nowrap px-[13px] py-[8px] text-right">
                        <Link
                          href={row.calculatorHref}
                          target="_blank"
                          rel="noopener"
                          className="text-teal-text hover:underline"
                        >
                          Check →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {copiedValue && (
        <div
          role="status"
          className="fixed bottom-[21px] left-[21px] right-[21px] z-50 rounded-[8px] border border-teal-border bg-white p-[16px] shadow-xl sm:left-auto sm:max-w-[560px]"
        >
          <div className="flex items-start justify-between gap-[13px]">
            <div>
              <p className="text-f13 font-bold text-t1">{copyError ? "Copy this citation manually" : "✓ Citation copied"}</p>
              <p className="mt-[6px] break-words text-f12 leading-relaxed text-t2">{copiedValue.citation}</p>
            </div>
            <button
              type="button"
              onClick={() => setCopiedValue(null)}
              aria-label="Close citation message"
              className="shrink-0 text-f19 leading-none text-t3 hover:text-t1"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
