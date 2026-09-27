"use client";

import { useState } from "react";

interface ArticleSummarizerProps {
  title: string;
  content: string;
}

export default function ArticleSummarizer({ title, content }: ArticleSummarizerProps) {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<"idle" | "streaming" | "done" | "error">("idle");

  const run = async () => {
    setSummary("");
    setStatus("streaming");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok || !res.body) {
        setStatus("error");
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setSummary(acc);
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-card border border-teal-border bg-teal-bg px-[16px] py-[12px]">
      <div className="flex flex-wrap items-center justify-between gap-[12px]">
        <div className="flex items-center gap-[10px]">
          <div aria-hidden="true" className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-teal-text text-white">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="10" cy="10" r="3" fill="currentColor" />
            </svg>
          </div>
          <p className="text-f14 font-semibold text-t1">
            AI summary: three engineering takeaways
          </p>
        </div>
        {status === "idle" && (
          <button
            type="button"
            onClick={run}
            className="inline-flex min-h-[36px] items-center rounded-control bg-teal-text px-[14px] text-f14 font-bold text-white transition-colors hover:bg-teal"
          >
            Generate summary
          </button>
        )}
        {status === "streaming" && (
          <span className="text-f14 italic text-t3">Streaming…</span>
        )}
        {status === "done" && (
          <button
            type="button"
            onClick={run}
            className="min-h-[36px] text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal"
          >
            Regenerate
          </button>
        )}
      </div>
      {(status === "streaming" || status === "done") && summary && (
        <pre className="mt-[12px] whitespace-pre-wrap font-sans text-f14 leading-golden text-t2">
          {summary}
        </pre>
      )}
      {status === "error" && (
        <p className="mt-[12px] text-f14 text-fail">
          Summary failed. Please try again or read the full article below.
        </p>
      )}
    </div>
  );
}
