"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { plantingApplications } from "@/content/data/agricultureStakes";
import { agricultureStages, buildAgricultureInquiry, type AgricultureBrief, type AgricultureStage } from "@/lib/agricultureInquiry";

const fields: { key: keyof AgricultureBrief; label: string; placeholder: string; multiline?: boolean }[] = [
  { key: "crop", label: "Crop / plant and growth stage", placeholder: "e.g. young grapevines, first planting season" },
  { key: "dimensions", label: "Dimensions or existing stake", placeholder: "Diameter, total length, exposed height, insertion depth; or “help me select”" },
  { key: "environment", label: "Field conditions & attachments", placeholder: "Soil, wind, ties, trellis wire or shelter model", multiline: true },
  { key: "quantity", label: "Quantity / order program", placeholder: "e.g. 5,000 pieces initially; annual repeat order" },
  { key: "destination", label: "Delivery country / port", placeholder: "e.g. France / Marseille" },
  { key: "timing", label: "Required arrival / planting date", placeholder: "e.g. arrive before March planting" },
];
const inputClass = "mt-2 w-full rounded-[6px] border border-border-default bg-white px-3 py-3 text-sm text-t1 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20";

export default function AgricultureInquiryPlanner() {
  const router = useRouter();
  const [stage, setStage] = useState<AgricultureStage>("selection");
  const [brief, setBrief] = useState<AgricultureBrief>({});

  function continueInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(buildAgricultureInquiry(stage, brief));
  }

  return (
    <form onSubmit={continueInquiry} className="rounded-[12px] border border-border-default bg-white p-6 sm:p-8" aria-label="Planting project brief">
      <fieldset>
        <legend className="text-f18 font-bold text-t1">What would help you move forward?</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {(Object.entries(agricultureStages) as [AgricultureStage, string][]).map(([value, label]) => (
            <label key={value} className={`flex cursor-pointer items-center gap-3 rounded-[7px] border p-4 text-sm font-semibold ${stage === value ? "border-teal bg-teal/5 text-teal-text" : "border-border-default text-t2"}`}>
              <input type="radio" name="request-stage" value={value} checked={stage === value} onChange={() => setStage(value)} className="accent-teal-text" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-5 text-sm leading-relaxed text-t2">All project details below are optional. Add what you know; your contact details come on the next page.</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-t1" htmlFor="planting-application">
          Growing application
          <select id="planting-application" value={brief.application ?? ""} onChange={(event) => setBrief({ ...brief, application: event.target.value })} className={inputClass}>
            <option value="">Help me define the application</option>
            {plantingApplications.map((item) => <option key={item.title}>{item.title}</option>)}
            <option>Other planting project</option>
          </select>
        </label>
        {fields.map((field) => (
          <label key={field.key} htmlFor={`planting-${field.key}`} className={`text-sm font-semibold text-t1 ${field.multiline ? "sm:col-span-2" : ""}`}>
            {field.label}
            {field.multiline ? (
              <textarea id={`planting-${field.key}`} rows={3} maxLength={400} value={brief[field.key] ?? ""} onChange={(event) => setBrief({ ...brief, [field.key]: event.target.value })} placeholder={field.placeholder} className={inputClass} />
            ) : (
              <input id={`planting-${field.key}`} type="text" maxLength={180} value={brief[field.key] ?? ""} onChange={(event) => setBrief({ ...brief, [field.key]: event.target.value })} placeholder={field.placeholder} className={inputClass} />
            )}
          </label>
        ))}
      </div>
      <button type="submit" className="mt-6 min-h-[48px] w-full rounded-[7px] bg-teal-text px-6 py-3 font-bold text-white hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal sm:w-auto">Continue to contact details →</button>
      <p className="mt-3 text-xs leading-relaxed text-t3">Your brief will be prefilled for review. Nothing is sent until you submit the contact form. You can attach drawings or photos there.</p>
    </form>
  );
}
