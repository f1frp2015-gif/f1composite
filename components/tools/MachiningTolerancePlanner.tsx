"use client";

import { useState } from "react";
import Link from "next/link";
import { machiningLimits } from "@/lib/machiningTolerance";
import { buildRfqHref } from "@/lib/rfq";

export default function MachiningTolerancePlanner() {
  const [feature, setFeature] = useState("Cut length");
  const [nominal, setNominal] = useState("100");
  const [lower, setLower] = useState("-0.5");
  const [upper, setUpper] = useState("0.5");
  const [datum, setDatum] = useState("");
  const filled = [nominal, lower, upper].every(value => value.trim() !== "");
  const limits = filled ? machiningLimits(Number(nominal), Number(lower), Number(upper)) : null;
  const fieldClass = "mt-[6px] min-h-[44px] w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f16 text-t1";
  const href = limits ? buildRfqHref({
    source: "machining-tolerance-planner",
    product: "Machined FRP profiles",
    productPath: "/technology/frp-profile-machining",
    message: `Please review this requested machining requirement (not a confirmed capability).\nFeature: ${feature}\nNominal: ${nominal} mm\nLower / upper deviation: ${lower} / ${upper} mm\nRequested limits: ${limits.lower} to ${limits.upper} mm\nDatum / measurement state: ${datum || "To be defined"}\nProfile / material: \nDrawing revision: \nQuantity / cut list: \nMating component: \nEdge treatment: \nFirst-article and inspection records: `,
    context: { version: "machining-requirement-v1", status: "buyer-request-unconfirmed", feature, units: "mm", nominal: Number(nominal), lowerDeviation: Number(lower), upperDeviation: Number(upper), limits, datum: datum || null },
  }) : null;
  return <div className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
    <h3 className="text-f20 font-bold text-t1">Prepare a dimension for your RFQ</h3>
    <p className="mt-[8px] max-w-[760px] text-f14 leading-relaxed text-t2">Edit the illustrative values to express your required limits in millimetres. This tool calculates a tolerance band; it does not select an industry grade, check a fit or confirm F1 machining capability.</p>
    <div className="mt-[20px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
      <label className="text-f14 font-semibold text-t1">Controlled feature<select value={feature} onChange={event => setFeature(event.target.value)} className={fieldClass}>{["Cut length", "Hole diameter", "Distance from datum", "Slot width", "Notch depth"].map(option => <option key={option}>{option}</option>)}</select></label>
      <label className="text-f14 font-semibold text-t1">Nominal dimension (mm)<input type="number" min="0.001" max="100000" step="any" value={nominal} onChange={event => setNominal(event.target.value)} className={fieldClass} /></label>
      <label className="text-f14 font-semibold text-t1">Lower deviation (mm)<input type="number" step="any" value={lower} onChange={event => setLower(event.target.value)} className={fieldClass} /></label>
      <label className="text-f14 font-semibold text-t1">Upper deviation (mm)<input type="number" step="any" value={upper} onChange={event => setUpper(event.target.value)} className={fieldClass} /></label>
    </div>
    <label className="mt-[16px] block max-w-[760px] text-f14 font-semibold text-t1">Datum and measurement state<input maxLength={180} value={datum} onChange={event => setDatum(event.target.value)} placeholder="For example: from datum C; after edge treatment" className={fieldClass} /></label>
    <div aria-live="polite" className="mt-[20px]">
      {limits ? <dl className="grid gap-[12px] sm:grid-cols-3">{[["Lower limit", limits.lower], ["Upper limit", limits.upper], ["Total tolerance band", limits.band]].map(([label, value]) => <div key={label} className="rounded-control border border-border-default bg-white p-[16px]"><dt className="text-f14 text-t2">{label}</dt><dd className="mt-[4px] text-f20 font-bold text-t1">{value} mm</dd></div>)}</dl> : <p role="alert" className="text-f14 text-t1">Enter finite values, a positive nominal dimension up to 100,000 mm, a positive lower limit and an upper deviation at least equal to the lower deviation. A nonzero band must be distinguishable at the displayed precision.</p>}
    </div>
    <p className="mt-[12px] text-f14 leading-relaxed text-t2">Formula: lower/upper limit = nominal + lower/upper deviation. For example, 100 mm with −0.5 / +0.5 mm deviations gives 99.5–100.5 mm. Geometric position, angular tolerances and measurement uncertainty need separate review.</p>
    {href ? <Link href={href} className="mt-[20px] inline-flex min-h-[44px] items-center rounded-control bg-teal px-[18px] py-[10px] text-f14 font-semibold text-white hover:bg-teal-text">Include this requirement in an RFQ →</Link> : null}
  </div>;
}
