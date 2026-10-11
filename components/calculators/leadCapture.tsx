"use client";

import { useState, type FormEvent } from "react";
import { trackEvent, trackInquirySuccess } from "@/lib/analytics";
import { appendAcquisition } from "@/lib/acquisitionClient";

export const track = trackEvent;

/* Send a review request with the calculator context through the inquiry pipeline.
   Acceptance does not mean an automated result email or quotation was sent. */
export function ResultLeadCapture({
  context,
  summary,
  source,
  inquiryType = "Calculator quote request",
}: {
  context: Record<string, unknown>;
  summary: string;
  source: string;
  inquiryType?: string;
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
      fd.set("name", "Calculator lead");
      fd.set("email", email);
      fd.set("country", "(via calculator)");
      fd.set("inquiry_type", inquiryType);
      fd.set("message", summary);
      fd.set("source", source);
      fd.set("context", JSON.stringify(context));
      appendAcquisition(fd);
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.accepted === true && j.receiptId) {
        trackInquirySuccess(j.receiptId, source, "", inquiryType);
        setStatus("ok");
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
      <div className="text-f14 font-semibold text-t1">Send this calculation for engineering review</div>
      <p className="mt-[3px] text-f12 text-t3">The calculation details attach to your request. Add your email for the team’s reply; quotation follows specification review.</p>
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
          className="whitespace-nowrap rounded-control bg-teal px-[16px] py-[8px] text-f14 font-bold text-white transition-colors hover:bg-teal-text disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Request review"}
        </button>
      </div>
      {status === "error" && <p className="mt-[5px] text-f12 text-fail">{err}</p>}
    </form>
  );
}
