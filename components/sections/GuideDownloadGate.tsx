"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/components/calculators/leadCapture";

/* Reusable email-gated content download. The gate is soft (the file itself
   sits in /public, ungated) — capturing the email creates a real inquiry via
   the shared /api/contact pipeline (source-tagged), and the download link is
   revealed immediately on success so a submission hiccup never blocks access
   to a file that was never actually access-restricted. */
export function GuideDownloadGate({
  fileHref,
  fileLabel,
  fileDescription,
  source,
}: {
  fileHref: string;
  fileLabel: string;
  fileDescription: string;
  source: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErr("Enter a valid email address.");
      return;
    }
    setStatus("sending");
    setErr("");
    try {
      const fd = new FormData();
      fd.set("name", "Guide download");
      fd.set("email", email);
      fd.set("country", "(via content download)");
      fd.set("inquiry_type", `Content download — ${fileLabel}`);
      fd.set("message", `Requested download: ${fileLabel}`);
      fd.set("source", source);
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (res.ok) {
        setStatus("ok");
        track("guide_download_lead", { source });
      } else {
        const j = (await res.json().catch(() => ({}))) as { message?: string };
        setStatus("error");
        setErr(j?.message || "Could not submit.");
      }
    } catch {
      setStatus("error");
      setErr("Network error.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-[8px] border border-teal-border bg-teal-bg p-[21px]">
        <div className="text-f15 font-semibold text-t1">✓ You&rsquo;re in.</div>
        <p className="mt-[5px] text-f13 text-t2">Here&rsquo;s your copy of {fileLabel}.</p>
        <a
          href={fileHref}
          download
          onClick={() => track("guide_download_click", { source })}
          className="mt-[13px] inline-block rounded-[6px] bg-teal px-[21px] py-[10px] text-f13 font-bold text-white transition-colors hover:bg-teal-text"
        >
          Download PDF
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[8px] border border-teal-border bg-teal-bg p-[21px]">
      <div className="text-f15 font-semibold text-t1">Get the full {fileLabel} (PDF)</div>
      <p className="mt-[5px] max-w-[640px] text-f13 text-t2">{fileDescription}</p>
      <div className="mt-[13px] flex flex-col gap-[8px] sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Your email"
          className="w-full rounded-[6px] border border-border-default bg-white px-[13px] py-[10px] text-f13 text-t1 outline-none focus:border-teal sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="whitespace-nowrap rounded-[6px] bg-teal px-[21px] py-[10px] text-f13 font-bold text-white transition-colors hover:bg-teal-text disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Get the PDF"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-[8px] text-f11 text-red-600">
          {err}{" "}
          <a href={fileHref} download className="underline">
            Download directly instead
          </a>
          .
        </p>
      )}
    </form>
  );
}
