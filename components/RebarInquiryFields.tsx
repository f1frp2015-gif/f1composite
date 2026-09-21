"use client";

import { REBAR_FORMS, REBAR_STAGES, emptyRebarLine, type RebarInquiry, type RebarLine, type RebarStage, type RebarForm } from "@/lib/rebarInquiry";

const input = "mt-2 block w-full min-w-0 rounded-md border border-border-default bg-white px-3 py-3 text-sm font-normal text-t1 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20";
const label = "block min-w-0 text-sm font-semibold text-t1";
export default function RebarInquiryFields({ value, onChange }: { value: RebarInquiry; onChange: (value: RebarInquiry) => void }) {
  const field = (key: "application" | "standard" | "documents" | "delivery", text: string, placeholder: string, maxLength: number) => (
    <label className={label}>{text}<textarea rows={2} value={value[key]} maxLength={maxLength} placeholder={placeholder} onChange={event => onChange({ ...value, [key]: event.target.value })} className={input} /></label>
  );
  function updateLine(index: number, patch: Partial<RebarLine>) {
    onChange({ ...value, lines: value.lines.map((line, i) => i === index ? { ...line, ...patch } : line) });
  }
  return <fieldset className="min-w-0 space-y-5">
    <legend className="mb-3 text-lg font-bold text-t1">Rebar requirements <span className="text-sm font-normal text-t2">— fill in what you know</span></legend>
    <label className={label}>Requested next step<select value={value.stage} onChange={event => onChange({ ...value, stage: event.target.value as RebarStage })} className={input}>{Object.entries(REBAR_STAGES).map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select></label>
    <div className="grid gap-4 sm:grid-cols-2">
      {field("application", "Application & service environment", "e.g. precast coastal panels; chloride exposure", 500)}
      {field("standard", "Project standard & edition", "Specify your code or approval requirement, or leave blank", 500)}
    </div>
    <p className="text-sm leading-relaxed text-t2">Add up to 20 items, or attach your existing schedule on the contact form. Blank details remain to be confirmed.</p>
    {value.lines.map((line, index) => <fieldset key={index} className="min-w-0 rounded-lg border border-border-default bg-bg2 p-4 sm:p-5">
      <legend className="px-2 font-bold text-t1">Item {index + 1}</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>Supply form<select value={line.form} onChange={event => { const form = event.target.value as RebarForm; updateLine(index, { form, length: "", quantityUnit: form === "mesh" ? "sheets" : "pieces", details: "" }); }} className={input}>{Object.entries(REBAR_FORMS).map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select></label>
        <label className={label}>Bar mark / drawing reference<input value={line.mark} maxLength={60} onChange={event => updateLine(index, { mark: event.target.value })} placeholder="e.g. B01 / drawing revision C" className={input} /></label>
        <label className={label}>Diameter / bar designation<input value={line.diameter} maxLength={60} onChange={event => updateLine(index, { diameter: event.target.value })} placeholder={line.form === "mesh" ? "Both directions, e.g. 8 mm / 8 mm" : "e.g. 12 mm or project designation #4"} className={input} /></label>
        {line.form === "straight" && <div className="grid grid-cols-2 gap-3">
          <label className={label}>Cut length<input type="number" min="0.001" max="1000000000" step="any" value={line.length} onChange={event => updateLine(index, { length: event.target.value })} placeholder="To confirm" className={input} /></label>
          <label className={label}>Length unit<select value={line.lengthUnit} onChange={event => updateLine(index, { lengthUnit: event.target.value as RebarLine["lengthUnit"] })} className={input}>{["m", "mm", "ft", "in"].map(unit => <option key={unit}>{unit}</option>)}</select></label>
        </div>}
        <div className="grid grid-cols-2 gap-3">
          <label className={label}>Quantity<input type="number" min={line.quantityUnit === "pieces" || line.quantityUnit === "sheets" ? "1" : "0.001"} max="1000000000" step={line.quantityUnit === "pieces" || line.quantityUnit === "sheets" ? "1" : "any"} value={line.quantity} onChange={event => updateLine(index, { quantity: event.target.value })} placeholder="To confirm" className={input} /></label>
          <label className={label}>Quantity unit<select value={line.quantityUnit} onChange={event => updateLine(index, { quantityUnit: event.target.value as RebarLine["quantityUnit"] })} className={input}>{["pieces", "metres", "feet", "sheets"].map(unit => <option key={unit}>{unit}</option>)}</select></label>
        </div>
      </div>
      <label className={`${label} mt-4`}>{line.form === "bends" ? "Shape dimensions, inside radius & drawing revision" : line.form === "mesh" ? "Spacing, sheet dimensions, intersections & laps" : "Surface, resin or other line requirements"}<textarea rows={2} value={line.details} maxLength={500} onChange={event => updateLine(index, { details: event.target.value })} placeholder={line.form === "bends" ? "State dimension units and whether dimensions are inside, outside or centerline." : line.form === "mesh" ? "Give both directions and dimension units; attach the layout if available." : "Leave unknown details blank for technical review."} className={input} /></label>
      <button type="button" onClick={() => onChange({ ...value, lines: value.lines.filter((_, i) => i !== index) })} className="mt-3 min-h-11 text-sm font-semibold text-t2 underline underline-offset-4" aria-label={`Remove item ${index + 1}`}>Remove item</button>
    </fieldset>)}
    <button type="button" disabled={value.lines.length >= 20} onClick={() => onChange({ ...value, lines: [...value.lines, emptyRebarLine()] })} className="min-h-11 rounded-md border border-teal-border bg-white px-4 py-2 text-sm font-bold text-teal-text disabled:opacity-50">Add line item</button>
    <div className="grid gap-4 sm:grid-cols-2">
      {field("documents", "Technical documents needed", "e.g. tensile / bond / alkali reports, bend details, batch records. Availability will be confirmed.", 1000)}
      {field("delivery", "Destination & delivery requirements", "Country / port, requested date, shipment phases or distributor quantities", 500)}
    </div>
  </fieldset>;
}
