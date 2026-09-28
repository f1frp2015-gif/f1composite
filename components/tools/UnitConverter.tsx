"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@/components/calculators/leadCapture";
import { buildRfqHref } from "@/lib/rfq";
import { readToolStateParams } from "@/lib/toolStateUrl";
import { INCH_SHAPES, QUANTITIES, convertAll, formatValue, inchSizeToCatalog, parseInches, quantity, type InchShape } from "@/lib/unitConverter";

const inputClass = "w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
const labelClass = "mb-[4px] block font-mono text-f12 uppercase tracking-[0.06em] text-t3";
const tileLabel = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

const pct = (value: number) => `${value >= 0 ? "+" : ""}${(value * 100).toFixed(1)}%`;

export default function UnitConverter() {
  const [quantityId, setQuantityId] = useState("stress");
  const [value, setValue] = useState("240");
  const [fromId, setFromId] = useState("MPa");
  const [shape, setShape] = useState<InchShape>("square-tube");
  const [depth, setDepth] = useState("4");
  const [width, setWidth] = useState("4");
  const [thickness, setThickness] = useState("1/4");

  useEffect(() => {
    // Open on a quantity from a link such as #q=modulus (window is not available during prerender).
    /* eslint-disable react-hooks/set-state-in-effect */
    const params = readToolStateParams(window.location);
    const q = quantity(params.get("q") ?? "");
    if (q) {
      setQuantityId(q.id);
      setFromId(q.units[0].id);
      setValue(String(q.examples[0]?.value ?? 1));
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const current = quantity(quantityId) ?? QUANTITIES[0];
  const number = Number(value.replace(",", "."));
  const rows = value.trim() === "" ? [] : convertAll(current.id, number, fromId);

  function chooseQuantity(id: string) {
    const next = quantity(id);
    if (!next) return;
    setQuantityId(next.id);
    setFromId(next.units[0].id);
    setValue(String(next.examples[0]?.value ?? 1));
    track("units_quantity", { quantity: next.id });
  }

  const inchShape = INCH_SHAPES.find((item) => item.id === shape) ?? INCH_SHAPES[0];
  const depthIn = parseInches(depth);
  const widthIn = shape === "round-tube" ? depthIn : parseInches(width);
  const thicknessIn = parseInches(thickness);
  const match = depthIn !== null && widthIn !== null && thicknessIn !== null ? inchSizeToCatalog(shape, depthIn, widthIn, thicknessIn) : null;
  const inchLabel = `${depth.trim()}${shape === "round-tube" ? "" : ` × ${width.trim()}`} × ${thickness.trim()} in ${inchShape.label.toLowerCase()}`;

  return (
    <div className="grid gap-[20px] lg:grid-cols-2">
      <div className="space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
        <h2 className="text-f18 font-bold text-t1">Convert a value</h2>
        <div className="flex flex-wrap gap-[6px]" role="group" aria-label="Quantity">
          {QUANTITIES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === current.id}
              onClick={() => chooseQuantity(item.id)}
              className={`rounded-full border px-[12px] py-[4px] text-f12 font-medium transition-colors ${item.id === current.id ? "border-teal bg-teal-bg text-teal-text" : "border-border-default bg-white text-t2 hover:border-teal"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-[12px]">
          <div>
            <label className={labelClass} htmlFor="uc-value">Value</label>
            <input id="uc-value" type="number" step="any" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="uc-from">From</label>
            <select id="uc-from" value={fromId} onChange={(e) => setFromId(e.target.value)} className={inputClass}>
              {current.units.map((unit) => (
                <option key={unit.id} value={unit.id}>{unit.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-control bg-white" aria-live="polite">
          <table className="w-full border-collapse text-left text-f14">
            <caption className="sr-only">{current.label} in every unit</caption>
            <tbody>
              {rows.map((row) => (
                <tr key={row.unit.id} className={`border-b border-border-default last:border-b-0 ${row.unit.id === fromId ? "bg-teal-bg" : ""}`}>
                  <td className="px-[12px] py-[8px] text-right font-semibold tabular-nums text-t1">{formatValue(row.value)}</td>
                  <th scope="row" className="px-[12px] py-[8px] font-normal text-t2">{row.unit.label}</th>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="px-[12px] py-[8px] text-t3">Enter a number.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {current.examples.length > 0 && (
          <div className="flex flex-wrap items-center gap-[6px]">
            <span className={tileLabel}>Try:</span>
            {current.examples.map((example) => (
              <button
                key={example.label}
                type="button"
                onClick={() => {
                  setValue(String(example.value));
                  setFromId(example.unit);
                }}
                className="rounded-full border border-border-default bg-white px-[10px] py-[3px] text-f12 text-t2 transition-colors hover:border-teal hover:text-teal-text"
              >
                {example.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
        <h2 className="text-f18 font-bold text-t1">Inch profile size to a metric catalog size</h2>
        <p className="text-f14 text-t2">
          Enter the size from a US drawing, in decimals or fractions such as 1/4 or 1-1/2, and see the closest F1 catalog
          size of the same shape.
        </p>
        <div>
          <label className={labelClass} htmlFor="uc-shape">Shape</label>
          <select id="uc-shape" value={shape} onChange={(e) => setShape(e.target.value as InchShape)} className={inputClass}>
            {INCH_SHAPES.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className={`grid gap-[12px] ${shape === "round-tube" ? "grid-cols-2" : "grid-cols-3"}`}>
          <div>
            <label className={labelClass} htmlFor="uc-d">{inchShape.dims[0]} (in)</label>
            <input id="uc-d" value={depth} inputMode="decimal" onChange={(e) => setDepth(e.target.value)} className={inputClass} />
          </div>
          {shape !== "round-tube" && (
            <div>
              <label className={labelClass} htmlFor="uc-b">{inchShape.dims[1]} (in)</label>
              <input id="uc-b" value={width} inputMode="decimal" onChange={(e) => setWidth(e.target.value)} className={inputClass} />
            </div>
          )}
          <div>
            <label className={labelClass} htmlFor="uc-t">{inchShape.dims[2]} (in)</label>
            <input id="uc-t" value={thickness} inputMode="decimal" onChange={(e) => setThickness(e.target.value)} className={inputClass} />
          </div>
        </div>

        {!match ? (
          <div className="rounded-control border border-fail-border bg-fail-bg p-[12px] text-f14 text-fail" role="alert">
            Enter each dimension as a number or a fraction, for example 4, 0.25 or 1/4.
          </div>
        ) : (
          <div className="space-y-[8px]" aria-live="polite">
            <div className="rounded-control bg-white p-[12px] text-f14 text-t2">
              <div className={tileLabel}>In millimeters</div>
              <p className="mt-[4px] text-f18 font-bold text-t1">
                {match.mm.h.toFixed(1)}{shape === "round-tube" ? "" : ` × ${match.mm.b.toFixed(1)}`} × {match.mm.t.toFixed(2)} mm
              </p>
            </div>
            {match.product && match.nominal ? (
              <div className={`rounded-control border p-[12px] text-f14 ${match.exact ? "border-teal-border bg-teal-bg" : match.maxDeviation <= 0.1 ? "border-border-default bg-white" : "border-warn-border bg-warn-bg"}`}>
                <div className={tileLabel}>{match.exact ? "Catalog equivalent" : "Closest catalog size"}</div>
                <p className="mt-[4px] text-f18 font-bold text-t1">{match.product.model} · {match.product.weight} kg/m</p>
                <p className="mt-[2px] text-f12 text-t2">
                  Depth {pct(match.nominal.h / match.mm.h - 1)}
                  {shape === "round-tube" ? "" : `, width ${pct(match.nominal.b / match.mm.b - 1)}`}, wall {pct(match.nominal.t / match.mm.t - 1)} against the inch size.
                  {match.exact
                    ? " Within 2% on every dimension: a direct substitute for sizing."
                    : match.maxDeviation <= 0.1
                      ? " Check the section properties before substituting."
                      : " Not a close match: ask for the inch size or a custom die."}
                </p>
              </div>
            ) : (
              <div className="rounded-control border border-warn-border bg-warn-bg p-[12px] text-f14 text-t1">No catalog size of this shape; ask for a custom profile.</div>
            )}
            <div className="grid gap-[8px] sm:grid-cols-2">
              <a
                href={buildRfqHref({ source: "unit-converter", product: match.product ? `${match.product.model} pultruded profile` : "Pultruded FRP profile", productPath: "/products/fiberglass-structural-shapes", message: `Inch size on our drawing: ${inchLabel} (${match.mm.h.toFixed(1)} × ${match.mm.b.toFixed(1)} × ${match.mm.t.toFixed(2)} mm).\nClosest catalog size shown: ${match.product?.model ?? "none"}.\nQuantity, lengths and destination (please add): ____` })}
                onClick={() => track("units_quote_click", { shape })}
                className="rounded-control bg-teal px-[16px] py-[10px] text-center text-f14 font-bold text-white transition-colors hover:bg-teal-text"
              >
                Ask about this size
              </a>
              <Link href="/tools/profile-finder" className="rounded-control border border-border-default bg-white px-[16px] py-[10px] text-center text-f14 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text">
                Compare in the profile finder
              </Link>
            </div>
          </div>
        )}
        <p className="text-f12 text-t3">
          A metric section of nearly the same size is not automatically equivalent: check it with the{" "}
          <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:underline">FRP profile calculator</Link>{" "}
          or the{" "}
          <Link href="/tools/frp-column-calculator" className="font-semibold text-teal-text hover:underline">column calculator</Link>.
        </p>
      </div>
    </div>
  );
}
