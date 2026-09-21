"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RebarInquiryFields from "@/components/RebarInquiryFields";
import { REBAR_DRAFT_KEY, buildRebarRfqHref, emptyRebarInquiry, parseRebarInquiry, rebarInquirySummary, type RebarInquiry } from "@/lib/rebarInquiry";

export default function RebarScheduleBuilder() {
  const router = useRouter();
  const [value, setValue] = useState<RebarInquiry>(() => emptyRebarInquiry("quote", "straight"));
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(REBAR_DRAFT_KEY);
      const draft = stored ? parseRebarInquiry(JSON.parse(stored)) : null;
      if (draft) startTransition(() => setValue(draft));
    } catch { /* Keep an empty editable schedule if this tab's draft is unavailable. */ }
  }, []);
  function continueToContact() {
    try {
      const data = parseRebarInquiry(value)!;
      try { sessionStorage.setItem(REBAR_DRAFT_KEY, JSON.stringify(data)); }
      catch { setError("This browser could not carry your draft. Copy the summary below into the contact form, or attach your schedule there."); return; }
      router.push(buildRebarRfqHref(data.stage, undefined, true));
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Please review your schedule."); }
  }
  return <div className="rounded-xl border border-border-default bg-white p-5 sm:p-8">
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4"><div><h3 className="text-f24 font-bold text-t1">Build your rebar schedule</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-t2">Organize the products you need. Your selection carries to the contact form, where you can add drawings and send the inquiry.</p></div><button type="button" onClick={() => { setValue(emptyRebarInquiry("quote", "straight")); setError(""); try { sessionStorage.removeItem(REBAR_DRAFT_KEY); } catch { /* Storage is optional. */ } }} className="min-h-11 text-sm font-semibold text-t2 underline underline-offset-4">Start a new schedule</button></div>
    <RebarInquiryFields value={value} onChange={next => { setValue(next); setError(""); }} />
    <details className="mt-6 rounded-lg bg-bg2 p-4" open={Boolean(error)}><summary className="cursor-pointer font-semibold text-t1">Review your inquiry summary</summary><pre className="mt-4 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-t2">{rebarInquirySummary(value)}</pre></details>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error} <Link className="underline" href={buildRebarRfqHref(value.stage)}>Open the contact form</Link></p>}
    <div className="mt-6 flex flex-wrap items-center gap-4"><button type="button" onClick={continueToContact} className="min-h-12 rounded-md bg-teal-text px-6 py-3 text-sm font-bold text-white hover:bg-teal">Continue to contact form →</button><a href="/downloads/f1-rebar-schedule-template.csv" download className="inline-flex min-h-11 items-center text-sm font-bold text-teal-text underline underline-offset-4">Download a blank schedule (CSV)</a></div>
    <p className="mt-3 text-xs leading-relaxed text-t3">This is an inquiry schedule. Grade, qualification, dimensions, quantities and delivery are reviewed before an order is released.</p>
  </div>;
}
