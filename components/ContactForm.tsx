"use client";

import { useActionState } from "react";
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
  const res = await fetch("/api/contact", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return { success: res.ok, message: data.message };
}

const inputCls =
  "w-full rounded-[5px] border border-border-default bg-white px-[13px] py-[13px] text-f15 text-t1 outline-none transition-colors duration-[0.34s] placeholder:text-t3 focus:border-teal-border";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitForm, initialState);

  if (state.success) {
    return (
      <div className="rounded-[8px] border border-teal-border bg-teal-bg p-[34px]">
        <h3 className="text-f24 font-bold text-t1">Thank you for reaching out</h3>
        <p className="mt-[13px] text-f15 leading-golden text-t2">
          {state.message || "We have received your inquiry and will respond within one business day."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-[21px]">
      {state.message && !state.success && (
        <div className="rounded-[5px] border border-red-200 bg-red-50 p-[13px] text-f13 text-red-700">
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
          <select id="country" name="country" required className={inputCls}>
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
          <select id="inquiry_type" name="inquiry_type" required className={inputCls}>
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
          placeholder="Describe your project requirements, desired profile specifications, or questions..."
          className={inputCls}
        />
      </div>

      <Button type="submit" className={isPending ? "opacity-60 pointer-events-none" : ""}>
        {isPending ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}
