"use client";

import { useState } from "react";

type ToolCitationBlockProps = {
  toolTitle: string;
  canonicalPath: string;
  bibtexKey: string;
  medium: "Web application" | "Data set";
};

const SITE_URL = "https://www.f1composite.com";
const PUBLISHER = "Chongqing F1 Composites Co., Ltd.";
const YEAR = 2026;

export default function ToolCitationBlock({
  toolTitle,
  canonicalPath,
  bibtexKey,
  medium,
}: ToolCitationBlockProps) {
  const [copyState, setCopyState] = useState<"idle" | "APA" | "MLA" | "BibTeX" | "error">("idle");
  const url = `${SITE_URL}${canonicalPath}`;
  const citations = {
    APA: `F1 Composite. (${YEAR}). ${toolTitle} [${medium}]. ${PUBLISHER} ${url}`,
    MLA: `F1 Composite. “${toolTitle}.” ${PUBLISHER}, ${YEAR}, ${url}.`,
    BibTeX: `@misc{${bibtexKey},\n  author       = {{F1 Composite}},\n  title        = {${toolTitle}},\n  year         = {${YEAR}},\n  howpublished = {\\url{${url}}},\n  note         = {${medium}}\n}`,
  } as const;

  async function copyCitation(style: keyof typeof citations) {
    try {
      await navigator.clipboard.writeText(citations[style]);
      setCopyState(style);
      window.setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-[10px] border border-border-default bg-bg2 p-[21px] md:p-[34px]">
      <p className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Citable engineering resource</p>
      <h2 className="mt-[8px] text-f24 font-bold text-t1">📚 How to cite this tool in your design report</h2>
      <p className="mt-[10px] max-w-[800px] text-f15 leading-golden text-t2">
        Use the format required by your client, university, or document-control system. The permanent URL below
        always points to the current maintained version of the tool.
      </p>

      <div className="mt-[21px] grid gap-[13px] lg:grid-cols-3">
        {(Object.keys(citations) as (keyof typeof citations)[]).map((style) => (
          <div key={style} className="flex min-w-0 flex-col rounded-[8px] border border-border-default bg-white p-[16px]">
            <div className="flex items-center justify-between gap-[13px]">
              <h3 className="text-f15 font-bold text-t1">{style}</h3>
              <button
                type="button"
                onClick={() => copyCitation(style)}
                className="shrink-0 rounded-[6px] border border-border-default px-[10px] py-[6px] text-f11 font-bold text-teal-text transition-colors hover:border-teal hover:bg-teal-bg"
              >
                {copyState === style ? "✓ Copied" : `📋 Copy ${style}`}
              </button>
            </div>
            <pre className="mt-[13px] min-w-0 max-w-full flex-1 whitespace-pre-wrap break-all font-mono text-f11 leading-relaxed text-t2">
              {citations[style]}
            </pre>
          </div>
        ))}
      </div>

      <p role="status" className="mt-[10px] min-h-[20px] text-f12 text-t3">
        {copyState === "error" ? "Clipboard access was blocked. Select the citation text and copy it manually." : ""}
      </p>
    </section>
  );
}
