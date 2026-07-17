"use client";

import { useState, type FormEvent } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/** GA4 event helper — never throws if analytics isn't loaded yet. */
export function track(name: string, params?: Record<string, unknown>) {
  try {
    sendGAEvent("event", name, params ?? {});
  } catch {
    /* GA not ready — non-fatal */
  }
}

/* Result-moment lead capture shared by the engineering calculators. The
   single-field "email me this" converts the calc aha-moment without a page jump:
   it POSTs to the same inquiry pipeline as the contact form (source-tagged, with
   the full computed spec attached as JSONB context). */
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
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (res.ok) {
        setStatus("ok");
        track("calculator_lead", { source });
      } else {
        const j = (await res.json().catch(() => ({}))) as { message?: string };
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
      <div className="rounded-[6px] border border-teal/30 bg-teal/10 p-[13px] text-f13 text-teal-text">
        ✓ Sent. Our engineering team has your calculation and will reply with a matching product and quote within one business day.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[6px] border border-teal-border bg-teal-bg p-[13px]">
      <div className="text-f13 font-semibold text-t1">Email me this result + a matching quote</div>
      <p className="mt-[3px] text-f11 text-t3">Your inputs and results attach automatically — just add your email.</p>
      <div className="mt-[8px] flex gap-[8px]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Your email"
          className="w-full rounded-[6px] border border-border-default bg-white px-[13px] py-[8px] text-f13 text-t1 outline-none focus:border-teal"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="whitespace-nowrap rounded-[6px] bg-teal px-[16px] py-[8px] text-f13 font-bold text-white transition-colors hover:bg-teal-text disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
      </div>
      {status === "error" && <p className="mt-[5px] text-f11 text-red-600">{err}</p>}
    </form>
  );
}
