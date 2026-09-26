"use client";

import { useState } from "react";
import { sheetInquiry, sheetInquiryPath, type SheetSelection } from "@/lib/productInquiry";
import Button from "@/components/ui/Button";

const inputClass = "mt-[6px] min-h-[46px] w-full rounded-control border border-border-default bg-white px-[12px] text-f16 text-t1 focus:outline-2 focus:outline-offset-2 focus:outline-teal";

export default function SheetQuoteForm() {
  const [selection, setSelection] = useState<SheetSelection>({ thickness: "", width: "", length: "", quantity: "", unit: "mm", surface: "Please advise" });
  const inquiry = sheetInquiry(selection);

  return (
    <form action="/contact" method="get" className="mt-[24px] rounded-card border border-border-default bg-white p-[21px] sm:p-[28px]" aria-label="Prepare a fiberglass sheet inquiry">
      <input type="hidden" name="source" value="sheet-specification" />
      <input type="hidden" name="inquiry_type" value="rfq" />
      <input type="hidden" name="product" value="Solid pultruded fiberglass sheet" />
      <input type="hidden" name="product_path" value={sheetInquiryPath} />
      <input type="hidden" name="specification" value={inquiry.specification} />
      <input type="hidden" name="message" value={inquiry.message} />
      <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        <label htmlFor="sheet-unit" className="text-f14 font-semibold text-t1">Dimension units
          <select id="sheet-unit" value={selection.unit} onChange={(event) => setSelection({ ...selection, unit: event.target.value as SheetSelection["unit"] })} className={inputClass} aria-describedby="sheet-unit-help">
            <option value="mm">Millimetres (mm)</option><option value="in">Inches (in)</option>
          </select>
        </label>
        {([
          ["length", "Finished length"], ["width", "Finished width"], ["thickness", "Thickness"], ["quantity", "Quantity (pieces)"],
        ] as const).map(([key, label]) => (
          <label key={key} htmlFor={`sheet-${key}`} className="text-f14 font-semibold text-t1">
            {label}{key !== "quantity" ? ` (${selection.unit})` : ""} <span aria-hidden>*</span>
            <input id={`sheet-${key}`} type="number" required min={key === "quantity" ? "1" : "0.001"} step={key === "quantity" ? "1" : "any"} value={selection[key]} onChange={(event) => setSelection({ ...selection, [key]: event.target.value })} className={inputClass} />
          </label>
        ))}
        <label htmlFor="sheet-surface" className="text-f14 font-semibold text-t1">Surface preference
          <select id="sheet-surface" value={selection.surface} onChange={(event) => setSelection({ ...selection, surface: event.target.value })} className={inputClass}>
            <option>Please advise</option><option>Smooth</option><option>Gritted anti-slip</option><option>Embossed</option>
          </select>
        </label>
      </div>
      <p id="sheet-unit-help" className="mt-[16px] text-f12 text-t2">Choose units before entering dimensions. Changing units changes their meaning; it does not convert the numbers.</p>
      <p className="mt-[8px] text-f14 leading-golden text-t2">These are your requested part dimensions. We confirm the laminate, feasible sizes and production quantity after review. Add a drawing, service conditions and delivery details on the next page.</p>
      <div className="mt-[20px]"><Button type="submit">Continue to quote →</Button></div>
      <noscript><p className="mt-[12px] text-f14">Enable JavaScript to carry these dimensions into your inquiry, or use the product quotation link above and include them in your message.</p></noscript>
    </form>
  );
}
