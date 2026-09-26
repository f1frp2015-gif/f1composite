"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import WindowInquiryFields from "./WindowInquiryFields";
import RebarInquiryFields from "./RebarInquiryFields";
import { REBAR_DRAFT_KEY, REBAR_FORMS, REBAR_STAGES, emptyRebarInquiry, parseRebarInquiry, rebarInquirySummary, type RebarInquiry, type RebarStage, type RebarForm } from "@/lib/rebarInquiry";
import { WINDOW_FIELDS, WINDOW_OPTION_LABELS, parseWindowInquiry, type WindowInquiry, windowInquirySummary } from "@/lib/windowInquiry";
import { SUMMARY_KEY } from "@/lib/gratingProjectStorage";
import dynamic from "next/dynamic";
const GratingInquiryReview = dynamic(() => import("./GratingInquiryReview"));
import Button from "@/components/ui/Button";
import { trackEvent, trackInquirySuccess } from "@/lib/analytics";
import { attributionPath, attributionToken } from "@/lib/rfq";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Netherlands",
  "Italy",
  "Spain",
  "Australia",
  "New Zealand",
  "Japan",
  "South Korea",
  "India",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Vietnam",
  "Indonesia",
  "Philippines",
  "Saudi Arabia",
  "United Arab Emirates",
  "Turkey",
  "Brazil",
  "Mexico",
  "South Africa",
  "Nigeria",
  "Egypt",
  "Other",
];

const inquiryTypes = [
  { value: "rfq", label: "Request for Quotation (RFQ)" },
  { value: "technical", label: "Technical Consultation" },
  { value: "partnership", label: "Partnership Inquiry" },
  { value: "general", label: "General Inquiry" },
];

interface FormState {
  success: boolean;
  message: string;
  receiptId?: string;
}

const initialState: FormState = { success: false, message: "" };

async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    const data = await res.json().catch(() => ({
      message: "The inquiry could not be processed. Please check the attachment size and try again.",
    }));
    const success = res.ok && data.accepted === true && Boolean(data.receiptId);
    if (success) {
      let windowContext: WindowInquiry | null = null;
      try { windowContext = parseWindowInquiry(JSON.parse(String(formData.get("window_inquiry") || "null"))); } catch { /* Invalid client context must not affect an accepted receipt. */ }
      trackInquirySuccess(data.receiptId, String(formData.get("source") ?? "contact"), String(formData.get("product_path") ?? ""), String(formData.get("inquiry_type") ?? "general"), windowContext || undefined);
    }
    return { success, message: data.message, receiptId: data.receiptId };
  } catch {
    return {
      success: false,
      message: "The inquiry could not be sent. Please check your connection or email inquiry@f1composite.com.",
    };
  }
}

const inputCls =
  "w-full rounded-[7px] border border-border-default bg-white px-[13px] py-[12px] text-f16 text-t1 outline-none transition-colors duration-[0.24s] placeholder:text-t3 focus:border-teal focus:ring-2 focus:ring-teal/10";

export default function ContactForm() {
  const searchParams = useSearchParams();
  return <ContactFormContent key={searchParams.toString()} />;
}

function ContactFormContent() {
  const [state, formAction, isPending] = useActionState(submitForm, initialState);
  const [attachmentName, setAttachmentName] = useState("");
  const started = useRef(false);
  // Set after mount; the API treats a sub-second submission as automated.
  const mountedAt = useRef(0);
  useEffect(() => { mountedAt.current = Date.now(); }, []);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const searchParams = useSearchParams();
  const windowMode = searchParams.get("window_mode");
  const rebarStage = searchParams.get("rebar_stage");
  const hasRebarDraft = searchParams.get("rebar_draft") === "1";
  const [rebarInquiry, setRebarInquiry] = useState<RebarInquiry | null>(() => {
    if (!rebarStage || !Object.hasOwn(REBAR_STAGES, rebarStage)) return null;
    const form = searchParams.get("rebar_form");
    return emptyRebarInquiry(rebarStage as RebarStage, form && Object.hasOwn(REBAR_FORMS, form) ? form as RebarForm : undefined);
  });
  const [rebarDraftNotice, setRebarDraftNotice] = useState("");
  useEffect(() => {
    if (!hasRebarDraft || !rebarStage || !Object.hasOwn(REBAR_STAGES, rebarStage)) return;
    try {
      const stored = sessionStorage.getItem(REBAR_DRAFT_KEY);
      const draft = stored ? parseRebarInquiry(JSON.parse(stored)) : null;
      if (!draft) throw new Error("Missing draft");
      startTransition(() => setRebarInquiry(draft));
    } catch {
      startTransition(() => setRebarDraftNotice("Your schedule is unavailable in this tab. Add the details below or attach your bar schedule; you can still send an inquiry."));
    }
  }, [hasRebarDraft, rebarStage]);
  const [windowInquiry, setWindowInquiry] = useState<WindowInquiry | null>(() => {
    if (windowMode !== "profiles" && windowMode !== "finished") return null;
    const data: WindowInquiry = { mode: windowMode };
    for (const key of ["series", "stage", "role"]) {
      const value = searchParams.get(`window_${key}`);
      if (value && WINDOW_FIELDS[key].values?.includes(value)) data[key] = value;
    }
    return data;
  });
  const prefillRef = searchParams.get("ref");
  const prefillCompany = searchParams.get("company") ?? "";
  const prefillCountry = searchParams.get("country") ?? "";
  const prefillInquiryType = searchParams.get("inquiry_type") ?? "";
  const prefillMessage = searchParams.get("message") ?? "";
  const gratingProject = searchParams.get("grating_project") === "1";
  const messageRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!gratingProject || !messageRef.current) return;
    try {
      const summary = sessionStorage.getItem(SUMMARY_KEY);
      messageRef.current.value = summary || "My grating project draft is unavailable in this tab. Please contact me to discuss my requirements.";
    } catch { messageRef.current.value = "Please contact me to discuss my grating requirements."; }
  }, [gratingProject]);
  const prefillSource = searchParams.get("source") ?? prefillRef ?? "contact";
  const prefillContext = searchParams.get("context") ?? "";
  const product = searchParams.get("product") ?? "";
  const productPath = attributionPath(searchParams.get("product_path") ?? "");
  const specification = searchParams.get("specification") ?? "";
  const evidenceId = searchParams.get("evidence_id") ?? "";
  let inheritedContext: unknown = null;
  try { inheritedContext = prefillContext ? JSON.parse(prefillContext) : null; } catch { inheritedContext = { raw: prefillContext }; }
  const context = JSON.stringify({ ...(inheritedContext && typeof inheritedContext === "object" && !Array.isArray(inheritedContext) ? inheritedContext : { inheritedContext }), product, productPath, specification, evidenceId });
  const isFromAiSourcing = prefillRef === "ai-sourcing";

  if (state.success) {
    return (
      <div role="status" aria-live="polite" className="rounded-[8px] border border-teal-border bg-teal-bg p-[34px]">
        <h3 className="text-f24 font-bold text-t1">Thank you for reaching out</h3>
        <p className="mt-[13px] text-f16 leading-golden text-t2">
          {state.message || "We have received your inquiry and will respond within one business day."}
        </p>
        {state.receiptId && <p className="mt-[13px] font-semibold text-t1">Reference: {state.receiptId}</p>}
        <p className="mt-5 text-sm text-t2">Our team will contact you to clarify any missing details and help with your quote. You do not need to complete anything else now.</p>
        {submittedMessage && <details className="mt-5"><summary className="cursor-pointer py-3 font-semibold">View submitted requirements</summary><pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words font-sans text-sm">{submittedMessage}</pre></details>}
        <p className="mt-4 text-sm">Need to add a drawing or correction? Email <a className="font-bold underline" href="mailto:inquiry@f1composite.com">inquiry@f1composite.com</a> and include your reference.</p>
      </div>
    );
  }

  return (
    <form aria-label="Request a quote" onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if (mountedAt.current) data.set("form_elapsed_ms", String(Date.now() - mountedAt.current));
      setSubmittedMessage([messageRef.current?.value || "", windowInquiry ? windowInquirySummary(windowInquiry) : "", rebarInquiry ? rebarInquirySummary(rebarInquiry) : ""].filter(Boolean).join("\n\n"));
      startTransition(() => formAction(data));
    }} onFocusCapture={() => { if (!started.current) { started.current = true; trackEvent("rfq_start", { source: attributionToken(prefillSource), product_path: productPath }); } }} className="space-y-[19px] rounded-[11px] border border-border-default bg-white p-[20px] shadow-[0_12px_32px_rgba(11,24,56,0.05)] sm:p-[28px]">
      <input type="hidden" name="source" defaultValue={prefillSource} />
      {/* Spam trap: off-screen and out of the tab order, so only bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name="context" value={context} />
      <input type="hidden" name="product_path" value={productPath} />
      <input type="hidden" name="inquiry_type" value={rebarInquiry ? (rebarInquiry.stage === "technical" ? "technical" : "rfq") : inquiryTypes.some(type => type.value === prefillInquiryType) ? prefillInquiryType : "rfq"} />
      {rebarInquiry && <input type="hidden" name="rebar_inquiry" value={JSON.stringify(rebarInquiry)} />}
      {rebarDraftNotice && <p role="status" className="rounded-md bg-amber-50 p-4 text-sm text-t1">{rebarDraftNotice}</p>}
      {windowInquiry && <p className="rounded-md bg-teal-bg px-4 py-3 text-sm text-t1">Included: {WINDOW_OPTION_LABELS[windowInquiry.mode]}{windowInquiry.series ? ` · Series ${windowInquiry.series}` : ""}{windowInquiry.stage ? ` · ${WINDOW_OPTION_LABELS[windowInquiry.stage] || windowInquiry.stage}` : ""}</p>}
      {gratingProject && <details><summary className="cursor-pointer py-2 text-sm font-semibold">Your grating configuration is included · View details</summary><GratingInquiryReview /></details>}
      {!gratingProject && (product || specification || evidenceId) && <div className="rounded-[5px] border border-teal-border bg-teal-bg p-[13px] text-f14 text-t1"><p className="font-bold">Included with your inquiry</p>{product && <p>Product: {product}</p>}{specification && <p>Specification: {specification}</p>}{evidenceId && <p>Document reference: {evidenceId}</p>}<p className="mt-[5px]">Your product selection is included automatically. Add a note if you wish.</p></div>}
      {isFromAiSourcing && (
        <div className="rounded-[5px] border border-teal-border bg-teal-bg p-[13px] text-f14 leading-golden text-t1">
          <span className="font-bold text-teal-text">Pre-filled from AI Sourcing.</span> Your project details are included. Just add your name and email to get started.
        </div>
      )}

      {state.message && !state.success && (
        <div role="alert" className="rounded-[5px] border border-red-200 bg-red-50 p-[13px] text-f14 text-red-700">
          {state.message}
        </div>
      )}

      <p className="text-sm leading-relaxed text-t2">Only your name and email are required. No drawings or complete specifications needed to get started.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="name" className="mb-2 block text-sm font-semibold text-t1">Name <span className="text-red-500">*</span></label><input id="name" name="name" type="text" autoComplete="name" required maxLength={200} placeholder="Your name" className={inputCls} /></div>
        <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-t1">Email <span className="text-red-500">*</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={inputCls} /></div>
      </div>
      <div><label htmlFor="message" className="mb-2 block text-sm font-semibold text-t1">What do you need? <span className="font-normal text-t3">(optional)</span></label><textarea ref={messageRef} id="message" name="message" rows={3} maxLength={16000} defaultValue={prefillMessage} placeholder="A short note is enough. We can work out the details together." className={inputCls} /></div>
      <details open={Boolean(rebarInquiry)} className="rounded-lg border border-border-default px-4">
        <summary className="cursor-pointer py-3 text-sm font-semibold text-t1">Add company, delivery details or a file (optional)</summary>
        <div className="space-y-4 pb-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="company" className="mb-2 block text-sm font-semibold">Company</label><input id="company" name="company" autoComplete="organization" defaultValue={prefillCompany} maxLength={200} className={inputCls} /></div>
            <div><label htmlFor="phone" className="mb-2 block text-sm font-semibold">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={100} className={inputCls} /></div>
          </div>
          <div><label htmlFor="country" className="mb-2 block text-sm font-semibold">Country</label><select id="country" name="country" autoComplete="country-name" defaultValue={prefillCountry} className={inputCls}><option value="">To be confirmed</option>{countries.map(country => <option key={country} value={country}>{country}</option>)}</select></div>
      <div>
        <label htmlFor="attachment" className="mb-[5px] block text-f14 font-semibold text-t1">
          Drawing or specification file <span className="font-normal text-t3">(optional)</span>
        </label>
        <div className="flex min-h-[47px] items-center gap-[12px] rounded-[7px] border border-border-default bg-white px-[10px] py-[8px] transition-colors duration-[0.24s] focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/10">
          <input
            id="attachment"
            name="attachment"
            type="file"
            accept=".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.zip,.jpg,.jpeg,.png,.xlsx,.csv"
            className="sr-only"
            aria-label="Choose an attachment"
            aria-describedby="attachment-selection attachment-help"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              event.currentTarget.setCustomValidity(file && file.size > 4 * 1024 * 1024 ? "The attachment exceeds the 4 MB limit. Please send a smaller file or ZIP bundle." : "");
              setAttachmentName(file?.name ?? "");
              event.currentTarget.reportValidity();
            }}
          />
          <label
            htmlFor="attachment"
            className="shrink-0 cursor-pointer rounded-[5px] border border-border-default bg-bg2 px-[12px] py-[7px] text-f14 font-bold text-t1 transition-colors hover:border-teal hover:text-teal-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Choose File
          </label>
          <span id="attachment-selection" className="min-w-0 truncate text-f14 text-t2" aria-live="polite">
            {attachmentName || "No file selected"}
          </span>
        </div>
        <p id="attachment-help" className="mt-[5px] text-f12 text-t3">PDF, DWG, DXF, STEP, IGES, XLSX, CSV, ZIP, JPG, or PNG · One file or ZIP bundle · 4 MB maximum</p>
      </div>
        </div>
      </details>
      {windowInquiry && <WindowInquiryFields value={windowInquiry} onChange={setWindowInquiry} />}
      {rebarInquiry && <RebarInquiryFields value={rebarInquiry} onChange={next => { setRebarInquiry(next); if (hasRebarDraft) { try { sessionStorage.setItem(REBAR_DRAFT_KEY, JSON.stringify(next)); } catch { /* Submission still carries the current form state. */ } } }} />}
      <Button type="submit" disabled={isPending} className={`w-full sm:w-auto ${isPending ? "pointer-events-none opacity-60" : ""}`}>
        {isPending ? "Sending..." : "Send Inquiry"}
      </Button>
      <p className="text-sm leading-relaxed text-t2">We will respond within one business day and help confirm the details for your quote.</p>
      <p className="text-f12 leading-relaxed text-t3">Your information is used only to respond to this inquiry.</p>
    </form>
  );
}
