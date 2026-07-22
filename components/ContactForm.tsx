"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";

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
    return { success: res.ok, message: data.message };
  } catch {
    return {
      success: false,
      message: "The inquiry could not be sent. Please check your connection or email inquiry@f1composite.com.",
    };
  }
}

const inputCls =
  "w-full rounded-[7px] border border-border-default bg-white px-[13px] py-[12px] text-f15 text-t1 outline-none transition-colors duration-[0.24s] placeholder:text-t3 focus:border-teal focus:ring-2 focus:ring-teal/10";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitForm, initialState);
  const [attachmentName, setAttachmentName] = useState("");
  const searchParams = useSearchParams();
  const prefillRef = searchParams.get("ref");
  const prefillCompany = searchParams.get("company") ?? "";
  const prefillCountry = searchParams.get("country") ?? "";
  const prefillInquiryType = searchParams.get("inquiry_type") ?? "";
  const prefillMessage = searchParams.get("message") ?? "";
  const prefillSource = searchParams.get("source") ?? prefillRef ?? "contact";
  const prefillContext = searchParams.get("context") ?? "";
  const isFromAiSourcing = prefillRef === "ai-sourcing";

  if (state.success) {
    return (
      <div role="status" aria-live="polite" className="rounded-[8px] border border-teal-border bg-teal-bg p-[34px]">
        <h3 className="text-f24 font-bold text-t1">Thank you for reaching out</h3>
        <p className="mt-[13px] text-f15 leading-golden text-t2">
          {state.message || "We have received your inquiry and will respond within one business day."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-[19px] rounded-[11px] border border-border-default bg-white p-[20px] shadow-[0_12px_32px_rgba(11,24,56,0.05)] sm:p-[28px]">
      <input type="hidden" name="source" defaultValue={prefillSource} />
      {prefillContext && <input type="hidden" name="context" defaultValue={prefillContext} />}
      {isFromAiSourcing && (
        <div className="rounded-[5px] border border-teal-border bg-teal-bg p-[13px] text-f13 leading-golden text-t1">
          <span className="font-bold text-teal-text">Pre-filled from AI Sourcing.</span> Review the project description below, add your contact information, and submit the form. We&rsquo;ll respond with a formal quote within 24 hours.
        </div>
      )}

      {state.message && !state.success && (
        <div role="alert" className="rounded-[5px] border border-red-200 bg-red-50 p-[13px] text-f13 text-red-700">
          {state.message}
        </div>
      )}

      <div className="grid gap-[21px] sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-[5px] block text-f13 font-semibold text-t1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-[5px] block text-f13 font-semibold text-t1">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            defaultValue={prefillCompany}
            placeholder="Company name"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-[21px] sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-[5px] block text-f13 font-semibold text-t1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-[5px] block text-f13 font-semibold text-t1">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-[21px] sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="mb-[5px] block text-f13 font-semibold text-t1">
            Country <span className="text-red-500">*</span>
          </label>
          <select id="country" name="country" required defaultValue={prefillCountry} className={inputCls}>
            <option value="">Select your country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="inquiry_type" className="mb-[5px] block text-f13 font-semibold text-t1">
            Inquiry Type <span className="text-red-500">*</span>
          </label>
          <select id="inquiry_type" name="inquiry_type" required defaultValue={prefillInquiryType} className={inputCls}>
            <option value="">Select inquiry type</option>
            {inquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-[5px] block text-f13 font-semibold text-t1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          defaultValue={prefillMessage}
          placeholder="Describe your project requirements, desired profile specifications, or questions..."
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="attachment" className="mb-[5px] block text-f13 font-semibold text-t1">
          Drawing or specification file <span className="font-normal text-t3">(optional)</span>
        </label>
        <div className="flex min-h-[47px] items-center gap-[12px] rounded-[7px] border border-border-default bg-white px-[10px] py-[8px] transition-colors duration-[0.24s] focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/10">
          <input
            id="attachment"
            name="attachment"
            type="file"
            accept=".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.zip,.jpg,.jpeg,.png"
            className="sr-only"
            aria-label="Choose an attachment"
            aria-describedby="attachment-selection attachment-help"
            onChange={(event) => setAttachmentName(event.currentTarget.files?.[0]?.name ?? "")}
          />
          <label
            htmlFor="attachment"
            className="shrink-0 cursor-pointer rounded-[5px] border border-border-default bg-bg2 px-[12px] py-[7px] text-f13 font-bold text-t1 transition-colors hover:border-teal hover:text-teal-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Choose File
          </label>
          <span id="attachment-selection" className="min-w-0 truncate text-f14 text-t2" aria-live="polite">
            {attachmentName || "No file selected"}
          </span>
        </div>
        <p id="attachment-help" className="mt-[5px] text-f11 text-t3">PDF, DWG, DXF, STEP, IGES, ZIP, JPG, or PNG · 4 MB maximum</p>
      </div>

      <div className="flex flex-col gap-[9px] sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={isPending} className={isPending ? "pointer-events-none opacity-60" : ""}>
          {isPending ? "Sending..." : "Send for Engineering Review"}
        </Button>
        <p className="max-w-[300px] text-f11 leading-relaxed text-t3">
          Your project information is used only to review and respond to this inquiry.
        </p>
      </div>
    </form>
  );
}
