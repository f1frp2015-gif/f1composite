"use client";

import { WINDOW_FIELDS, WINDOW_OPTION_LABELS, type WindowInquiry, windowInquirySummary } from "@/lib/windowInquiry";

const input = "mt-2 w-full rounded-md border border-border-default bg-white px-3 py-3 text-sm text-t1 focus:border-teal";
const labels = WINDOW_OPTION_LABELS;
export default function WindowInquiryFields({ value, onChange, step, onStep }: { value: WindowInquiry; onChange: (data: WindowInquiry) => void; step: number; onStep: (step: number) => void }) {
  const field = (key: string, placeholder?: string) => {
    const spec = WINDOW_FIELDS[key];
    const preferredRoles = value.mode === "profiles" ? ["fabricator", "oem", "profile-distributor", "specifier"] : ["contractor", "finished-distributor", "architect", "specifier", "owner"];
    const options = key === "role" ? [...preferredRoles, ...spec.values!.filter(option => !preferredRoles.includes(option))] : spec.values;
    return <label key={key} className="block text-sm font-semibold text-t1">{spec.label}{spec.values ? <select className={input} value={value[key] || ""} onChange={e => onChange({ ...value, [key]: e.target.value })}><option value="">To be confirmed</option>{options!.map(option => <option key={option} value={option}>{labels[option] || option}</option>)}</select> : <textarea className={input} rows={key === "sections" || key === "schedule" ? 4 : 2} value={value[key] || ""} maxLength={spec.max} placeholder={placeholder || "Optional — leave blank if not yet known"} onChange={e => onChange({ ...value, [key]: e.target.value })} />}</label>;
  };
  return <section aria-label="Window project inquiry" className="space-y-5">
    <input type="hidden" name="window_inquiry" value={JSON.stringify(value)} />
    <h3 className="text-xl font-bold">Tell us what you need</h3>
    <ol className="flex flex-wrap gap-3 text-sm">{["1. Buying intent", "2. Requirements", "3. Contact & review"].map((label, index) => <li key={label}><button type="button" aria-current={step === index ? "step" : undefined} className={`rounded-md border px-3 py-2 ${step === index ? "border-teal bg-teal-bg font-bold" : "border-border-default"}`} onClick={() => onStep(index)}>{label}</button></li>)}</ol>
    <div hidden={step !== 0} className="space-y-4">
      <fieldset><legend className="mb-2 font-semibold">I am buying</legend><div className="grid gap-3 sm:grid-cols-2">{(["profiles", "finished"] as const).map(mode => <label key={mode} className={`cursor-pointer rounded-md border p-4 ${value.mode === mode ? "border-teal bg-teal-bg" : "border-border-default"}`}><input type="radio" name="window_mode_ui" checked={value.mode === mode} onChange={() => onChange({ ...value, mode })} className="mr-2" />{labels[mode]}</label>)}</div></fieldset>
      <div className="grid gap-4 sm:grid-cols-2">{field("role")}{field("stage")}{field("series")}</div>
      <p className="text-sm text-t2">Select any known details. A sample request or early discussion does not require completed drawings. Series 140 is a compression-seal sliding door system.</p>
    </div>
    <div hidden={step !== 1} className="space-y-4">
      <p className="text-sm text-t2">{labels[value.mode]} · Series {labels[value.series] || value.series || "to be confirmed"}. All requirements below are optional; we will clarify missing specifications.</p>
      {field("city", "Project city, region or delivery port")}
      {value.mode === "profiles" ? <>{field("sections", "For each section: drawing / section code, cut length with unit, quantity. 90 sliding: CP001–CP005; 140: CP006–CP011.")}{field("profileUnit")}{field("fabricationScope", "Stock lengths or cut / machined profiles; gaskets, connectors and other accessories required")}{field("interfaces", "Glass / gasket grooves, hardware interfaces, fit and tolerance requirements, or attach your drawing")}{field("sampleType")}{field("demand", "First order quantity and estimated annual demand, with units; estimates are welcome")}</> : <>{field("schedule", "For each opening: ID, width × height, quantity and room / location. You can also attach a window schedule.")}<div className="grid gap-4 sm:grid-cols-2">{field("dimensionBasis")}{field("dimensionUnit")}</div>{field("handing", "Opening type and left / right handing; specify viewed from inside or outside, or ask for review.")}{field("glass")}{field("hardware")}{field("installation", "Supply only, fixing details, site installation by others, or scope to be discussed")}</>}
      {field("colors")}{field("performance", "Thermal, wind / water / air, fire or other project targets; requested test reports or compliance documents. We will confirm scope and availability.")}{field("delivery")}
    </div>
    {step === 2 && <details open className="rounded-md bg-bg2 p-4"><summary className="cursor-pointer font-semibold">Review your window requirements</summary><pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm">{windowInquirySummary(value)}</pre></details>}
    <div className="flex flex-wrap gap-3">{step > 0 && <button className="rounded-md border px-4 py-3 text-sm" type="button" onClick={() => onStep(step - 1)}>Back</button>}{step < 2 && <button className="rounded-md bg-teal px-4 py-3 text-sm font-bold text-white" type="button" onClick={() => onStep(step + 1)}>{step === 0 ? "Continue to requirements" : "Continue to contact & review"}</button>}{step === 0 && <button className="px-2 py-3 text-sm underline" type="button" onClick={() => onStep(2)}>Discuss my project first</button>}</div>
  </section>;
}
