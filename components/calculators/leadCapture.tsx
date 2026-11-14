"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { trackEvent, trackInquirySuccess } from "@/lib/analytics";
import { appendAcquisition } from "@/lib/acquisitionClient";
import { forgetToolResult, rememberToolResult } from "@/lib/toolResultMemory";

export const track = trackEvent;

/* Send a review request with the tool result through the inquiry pipeline: the
   visitor adds an email and the result reaches the team as an inquiry email.
   Acceptance does not mean an automated result email or quotation was sent.
   The result is also kept for this tab, so the contact form can include it. */
export function ResultLeadCapture({
  context,
  summary,
  source,
  inquiryType = "Calculator quote request",
  heading = "Send this result to our team",
  hint = "The result above attaches to your request. Add your email for the team’s reply; quotation follows specification review.",
}: {
  context: Record<string, unknown>;
  summary: string;
  source: string;
  inquiryType?: string;
  heading?: string;
  hint?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");
  // Keep the result only once the visitor has used the page, not the default example.
  const firstSummary = useRef(summary);
  const contextJson = JSON.stringify(context);
  useEffect(() => {
    const used = summary !== firstSummary.current || (typeof navigator !== "undefined" && navigator.userActivation?.hasBeenActive);
    if (used) rememberToolResult({ source, summary, context: JSON.parse(contextJson) });
  }, [source, summary, contextJson]);

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
      fd.set("name", email.split("@")[0].slice(0, 80) || "Tool user");
      fd.set("email", email);
      fd.set("inquiry_type", inquiryType);
      fd.set("message", note.trim() ? `${note.trim()}\n\n${summary}` : summary);
      fd.set("source", source);
      fd.set("context", JSON.stringify(context));
      appendAcquisition(fd);
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.accepted === true && j.receiptId) {
        trackInquirySuccess(j.receiptId, source, "", inquiryType, undefined, { email });
        setStatus("ok");
        forgetToolResult();
        track("calculator_lead", { source });
      } else {
        setStatus("error");
        setErr(j?.message || "Could not send — please use the quote button instead.");
      }
    } catch {
      setStatus("error");
      setErr("Network error — please use the quote button instead.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-control border border-teal/30 bg-teal-bg p-[13px] text-f14 text-teal-text">
        ✓ Review request received. Your calculation is attached for our engineering team. The team will reply to the email you provided after reviewing your requirements; no automatic result email or quotation has been issued.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-control border border-teal-border bg-teal-bg p-[13px]">
      <div className="text-f14 font-semibold text-t1">{heading}</div>
      <p className="mt-[3px] text-f12 text-t3">{hint}</p>
      <div className="mt-[8px] flex gap-[8px]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Your email"
          className="w-full rounded-control border border-border-default bg-white px-[13px] py-[8px] text-f14 text-t1 outline-none focus:border-teal"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="whitespace-nowrap rounded-control bg-teal-text px-[16px] py-[8px] text-f14 font-bold text-white transition-colors hover:bg-teal disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Request review"}
        </button>
      </div>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={1000}
        placeholder="Quantity, destination or a note (optional)"
        aria-label="Quantity, destination or a note (optional)"
        className="mt-[8px] w-full rounded-control border border-border-default bg-white px-[13px] py-[8px] text-f14 text-t1 outline-none focus:border-teal"
      />
      {status === "error" && <p className="mt-[5px] text-f12 text-fail">{err}</p>}
    </form>
  );
}
