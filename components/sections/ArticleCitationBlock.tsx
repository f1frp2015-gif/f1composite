"use client";

import { useState } from "react";
import { buildArticleCitations, type CitationInput } from "@/lib/citation";

type Style = "IEEE" | "APA" | "BibTeX";

/**
 * "How to cite this article": reference-list entries that name the article's
 * own URL, author and date, for student papers and design reports.
 */
export default function ArticleCitationBlock({
  variant = "inline",
  ...props
}: CitationInput & {
  /** "inline" sits inside an article column; "standalone" is its own full-width page band. */
  variant?: "inline" | "standalone";
}) {
  const citations = buildArticleCitations(props);
  const [copyState, setCopyState] = useState<"idle" | Style | "error">("idle");

  async function copyCitation(style: Style) {
    try {
      await navigator.clipboard.writeText(citations[style]);
      setCopyState(style);
      window.setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("error");
    }
  }

  const card = (
    <section aria-labelledby="cite-this-article" className={`${variant === "inline" ? "mt-[40px] " : ""}rounded-card border border-border-default bg-bg2 p-[20px] md:p-[24px]`}>
      <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Citable engineering resource</p>
      <h2 id="cite-this-article" className="mt-[4px] text-f20 font-bold text-t1">{variant === "inline" ? "How to cite this article" : "How to cite this page"}</h2>
      <p className="mt-[8px] text-f14 leading-golden text-t2">
        For a thesis, journal paper or design report. Cite this page&apos;s URL rather than the home page, and add the
        date you accessed it if your style requires one.
      </p>

      <div className="mt-[16px] space-y-[12px]">
        {(Object.keys(citations) as Style[]).map((style) => (
          <div key={style} className="min-w-0 rounded-card border border-border-default bg-white p-[16px]">
            <div className="flex items-center justify-between gap-[12px]">
              <h3 className="text-f16 font-bold text-t1">{style}</h3>
              <button
                type="button"
                onClick={() => copyCitation(style)}
                className="shrink-0 rounded-control border border-border-default px-[10px] py-[6px] text-f12 font-bold text-teal-text transition-colors hover:border-teal hover:bg-teal-bg"
              >
                {copyState === style ? "Copied" : `Copy ${style}`}
              </button>
            </div>
            <pre className="mt-[12px] min-w-0 max-w-full whitespace-pre-wrap break-words font-mono text-f12 leading-relaxed text-t2">
              {citations[style]}
            </pre>
          </div>
        ))}
      </div>

      <p role="status" className="mt-[8px] min-h-[20px] text-f12 text-t3">
        {copyState === "error" ? "Clipboard access was blocked. Select the citation text and copy it manually." : ""}
      </p>
    </section>
  );

  if (variant === "inline") return card;
  return (
    <div className="border-t border-border-default bg-white py-[40px] md:py-[56px]">
      <div className="site-container"><div className="max-w-[960px]">{card}</div></div>
    </div>
  );
}
