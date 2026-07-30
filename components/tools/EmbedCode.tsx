"use client";

import { useState } from "react";

type EmbedCodeProps = {
  toolName: string;
  embedPath: string;
  canonicalPath: string;
  height?: number;
  attribution: string;
};

const SITE_URL = "https://www.f1composite.com";

export default function EmbedCode({
  toolName,
  embedPath,
  canonicalPath,
  height = 840,
  attribution,
}: EmbedCodeProps) {
  const [expanded, setExpanded] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const campaignUrl = `${SITE_URL}${canonicalPath}?utm_source=embed&utm_medium=referral&utm_campaign=frp_tool_embed`;
  const code = `<!-- ${toolName} by F1 Composite -->\n<iframe\n  src="${SITE_URL}${embedPath}"\n  width="100%"\n  height="${height}"\n  loading="lazy"\n  style="border:1px solid #dfe3ea;border-radius:8px;"\n  title="${toolName}">\n</iframe>\n<p style="font:12px/1.5 system-ui,sans-serif;color:#667085;">\n  Tool by <a href="${campaignUrl}" target="_blank" rel="nofollow noopener">${attribution}</a>\n</p>`;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-[10px] border border-border-default bg-bg2 p-[21px] md:p-[34px]">
      <div className="flex flex-col gap-[16px] md:flex-row md:items-start md:justify-between">
        <div className="max-w-[760px]">
          <p className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Free to embed</p>
          <h2 className="mt-[8px] text-f24 font-bold text-t1">Embed this tool on your website</h2>
          <p className="mt-[10px] text-f15 leading-golden text-t2">
            Add the live engineering tool to a course page, design guide, distributor resource center, or internal
            wiki. The iframe stays updated when the calculation engine changes; no API key or account is required.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-[7px] bg-teal-text px-[18px] text-f13 font-bold text-white transition-colors hover:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          {expanded ? "Hide embed code" : "Embed This Tool"}
        </button>
      </div>

      {expanded && (
        <div className="mt-[21px] border-t border-border-default pt-[21px]">
          <label htmlFor={`embed-${embedPath.replaceAll("/", "-")}`} className="text-f13 font-semibold text-t1">
            Copy and paste this HTML where you want the tool to appear
          </label>
          <textarea
            id={`embed-${embedPath.replaceAll("/", "-")}`}
            readOnly
            value={code}
            rows={11}
            onFocus={(event) => event.currentTarget.select()}
            className="mt-[8px] w-full rounded-[7px] border border-border-default bg-white p-[13px] font-mono text-f12 leading-relaxed text-t2 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          />
          <div className="mt-[10px] flex flex-wrap items-center gap-[13px]">
            <button
              type="button"
              onClick={copyCode}
              className="inline-flex min-h-[42px] items-center rounded-[7px] border border-border-default bg-white px-[16px] text-f13 font-bold text-t1 transition-colors hover:border-teal hover:text-teal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              {copyState === "copied" ? "Copied" : "Copy HTML"}
            </button>
            <p role="status" className="text-f12 text-t3">
              {copyState === "error"
                ? "Clipboard access was blocked. Select the code and copy it manually."
                : "Keep the attribution link so readers can open the full tool and methodology."}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
