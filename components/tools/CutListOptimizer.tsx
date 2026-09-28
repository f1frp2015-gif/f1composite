"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@/components/calculators/leadCapture";
import { buildProducts } from "@/lib/catalog/standardProfiles";
import { CUT_LIST_LIMITS, STOCK_OPTIONS, calculateCutList, cutListError, parsePieceList, type BarPattern, type CutListInput, type CutPiece } from "@/lib/cutList";
import { buildRfqHref } from "@/lib/rfq";
import { buildToolStateHref, readToolStateParams } from "@/lib/toolStateUrl";

type Unit = "mm" | "in";
type Row = { id: number; label: string; length: string; qty: string };

const MM_PER_IN = 25.4;
const PRODUCTS = buildProducts();
const CATEGORY_LABELS: Record<string, string> = {
  "i-beam": "I-beams",
  channel: "Channels",
  angle: "Angles",
  "square-tube": "Square and rectangular tubes",
  "round-tube": "Round tubes",
  rod: "Rods",
  "flat-bar": "Flat bars",
};

const inputClass = "w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
const labelClass = "mb-[4px] block font-mono text-f12 uppercase tracking-[0.06em] text-t3";
const tileLabel = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

const EXAMPLE: Omit<Row, "id">[] = [
  { label: "Handrail post", length: "1150", qty: "24" },
  { label: "Top rail", length: "2400", qty: "18" },
  { label: "Knee rail", length: "2350", qty: "18" },
  { label: "Toe board", length: "900", qty: "12" },
];

/** The plan on the chosen stock length, and the same pieces on each standard length. */
function planWithComparison(input: CutListInput) {
  const options: { id: string; lengthMm: number; label: string; note: string }[] = STOCK_OPTIONS.map((option) => ({ ...option }));
  if (input.stockLengthMm > 0 && !options.some((option) => Math.abs(option.lengthMm - input.stockLengthMm) < 0.5)) {
    options.push({ id: "custom", lengthMm: input.stockLengthMm, label: `${Math.round(input.stockLengthMm)} mm`, note: "Your stock length." });
  }
  return {
    result: calculateCutList(input),
    comparison: options.map((option) => {
      const variant = { ...input, stockLengthMm: option.lengthMm };
      return { ...option, result: calculateCutList(variant), error: cutListError(variant) };
    }),
  };
}

let nextId = 1;
const makeRow = (row: Omit<Row, "id">): Row => ({ id: nextId++, ...row });

function toMm(value: string, unit: Unit) {
  const number = Number(value.replace(",", "."));
  return unit === "in" ? number * MM_PER_IN : number;
}

function convertValue(value: string, from: Unit, to: Unit) {
  if (from === to || value.trim() === "") return value;
  const number = Number(value.replace(",", "."));
  if (!Number.isFinite(number)) return value;
  const converted = to === "in" ? number / MM_PER_IN : number * MM_PER_IN;
  const scale = to === "in" ? 1000 : 10;
  return String(Math.round(converted * scale) / scale);
}

export default function CutListOptimizer() {
  const [unit, setUnit] = useState<Unit>("mm");
  const [rows, setRows] = useState<Row[]>(() => EXAMPLE.map(makeRow));
  const [stockId, setStockId] = useState<string>("6000");
  const [customStock, setCustomStock] = useState("6000");
  const [kerf, setKerf] = useState("3");
  const [trim, setTrim] = useState("5");
  const [profile, setProfile] = useState("SHS 50×50×5");
  const [customKgM, setCustomKgM] = useState("");
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [pasteNote, setPasteNote] = useState("");
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    // Seed from a shared link once, after mount (window is not available during prerender).
    /* eslint-disable react-hooks/set-state-in-effect */
    const params = readToolStateParams(window.location);
    const u = params.get("unit");
    if (u === "mm" || u === "in") setUnit(u);
    const list = params.get("pieces");
    if (list) {
      const { pieces } = parsePieceList(list);
      if (pieces.length) setRows(pieces.map((piece) => makeRow({ label: piece.label ?? "", length: String(piece.lengthMm), qty: String(piece.qty) })));
    }
    const stock = params.get("stock");
    if (stock) {
      if (STOCK_OPTIONS.some((option) => option.id === stock)) setStockId(stock);
      else if (Number(stock) > 0) {
        setStockId("custom");
        setCustomStock(stock);
      }
    }
    const k = params.get("kerf");
    if (k !== null && Number.isFinite(+k)) setKerf(k);
    const t = params.get("trim");
    if (t !== null && Number.isFinite(+t)) setTrim(t);
    const p = params.get("profile");
    if (p && (p === "none" || p === "custom" || PRODUCTS.some((product) => product.model === p))) setProfile(p);
    const kg = params.get("kgm");
    if (kg !== null && Number(kg) > 0) setCustomKgM(kg);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const pieces: CutPiece[] = rows
    .filter((row) => row.length.trim() !== "" || row.qty.trim() !== "")
    .map((row) => ({ label: row.label.trim() || undefined, lengthMm: toMm(row.length, unit), qty: Number(row.qty) }));
  const stockMm = stockId === "custom" ? toMm(customStock, unit) : Number(stockId);
  const kerfMm = toMm(kerf, unit);
  const trimMm = toMm(trim, unit);
  const input = { stockLengthMm: stockMm, kerfMm, trimMm, pieces };
  const error = cutListError(input);
  // The React Compiler caches this per input change; a plan runs in a few ms.
  const { result, comparison } = planWithComparison(input);

  const product = PRODUCTS.find((item) => item.model === profile);
  const kgPerM = profile === "custom" ? Number(customKgM) || 0 : product?.weight ?? 0;

  const len = (mm: number) => (unit === "in" ? `${(mm / MM_PER_IN).toFixed(2)} in` : `${Number.isInteger(mm) ? mm : mm.toFixed(1)} mm`);
  const total = (mm: number) => (unit === "in" ? `${(mm / MM_PER_IN / 12).toFixed(1)} ft` : `${(mm / 1000).toFixed(1)} m`);
  const kg = (mm: number) => (kgPerM > 0 ? `${((mm / 1000) * kgPerM).toFixed(0)} kg` : null);

  function switchUnit(next: Unit) {
    if (next === unit) return;
    setRows((current) => current.map((row) => ({ ...row, length: convertValue(row.length, unit, next) })));
    setCustomStock((value) => convertValue(value, unit, next));
    setKerf((value) => convertValue(value, unit, next));
    setTrim((value) => convertValue(value, unit, next));
    setUnit(next);
  }

  function updateRow(id: number, field: keyof Omit<Row, "id">, value: string) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  }

  function applyPaste() {
    const { pieces: parsed, skipped } = parsePieceList(pasteText);
    if (parsed.length === 0) {
      setPasteNote("No lines with a length and a quantity were found.");
      return;
    }
    setRows(parsed.map((piece) => makeRow({ label: piece.label ?? "", length: String(piece.lengthMm), qty: String(piece.qty) })));
    setPasteNote(skipped.length ? `Added ${parsed.length} lines; skipped ${skipped.length} that did not start with a length and a quantity.` : `Added ${parsed.length} lines.`);
    track("cutlist_paste", { lines: parsed.length });
  }

  const pieceLines = pieces
    .filter((piece) => piece.lengthMm > 0 && piece.qty > 0)
    .map((piece) => `${Math.round(piece.lengthMm * 10) / 10} ${piece.qty}${piece.label ? ` ${piece.label}` : ""}`);

  async function share() {
    const href = buildToolStateHref("/tools/frp-cut-list-optimizer", {
      unit: "mm",
      pieces: pieceLines.join("\n"),
      stock: stockId === "custom" ? String(Math.round(stockMm * 10) / 10) : stockId,
      kerf: String(Math.round(kerfMm * 100) / 100),
      trim: String(Math.round(trimMm * 100) / 100),
      profile,
      ...(profile === "custom" ? { kgm: customKgM } : {}),
    });
    window.history.replaceState(null, "", href);
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${href}`);
      setShareState("copied");
    } catch {
      setShareState("error");
    }
    window.setTimeout(() => setShareState("idle"), 2500);
    track("cutlist_share", { pieces: result?.pieceCount ?? 0 });
  }

  function patternText(pattern: BarPattern) {
    return pattern.cuts.map((cut) => len(cut)).join(" + ");
  }

  const cutListText = result
    ? [
        `Cut list: ${result.bars} bars of ${len(stockMm)}${product ? `, ${product.model}` : ""}`,
        `Kerf ${len(kerfMm)}, end trim ${len(trimMm)} each end`,
        ...result.patterns.map((pattern) => `${pattern.count} × [${patternText(pattern)}]  offcut ${len(pattern.offcutMm)}`),
      ].join("\n")
    : "";

  function downloadCsv() {
    if (!result) return;
    const header = "bars,pieces (mm),pieces on bar,used (mm),offcut (mm)";
    const lines = result.patterns.map((pattern) => `${pattern.count},"${pattern.cuts.join(" + ")}",${pattern.cuts.length},${pattern.piecesMm},${pattern.offcutMm}`);
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "frp-cut-list.csv";
    link.click();
    URL.revokeObjectURL(url);
    track("cutlist_csv", { bars: result.bars });
  }

  const summary = result
    ? `Cut list plan (F1 Composite tool)\n` +
      `Profile: ${product ? `${product.model} (${product.weight} kg/m)` : profile === "custom" && kgPerM ? `custom, ${kgPerM} kg/m` : "not selected"}\n` +
      `Pieces (length mm, quantity, mark):\n${pieceLines.slice(0, 40).join("\n")}${pieceLines.length > 40 ? `\n… and ${pieceLines.length - 40} more lines` : ""}\n` +
      `Stock ${Math.round(stockMm)} mm, kerf ${kerfMm.toFixed(1)} mm, trim ${trimMm.toFixed(1)} mm per end\n` +
      `Plan: ${result.bars} bars (${(result.orderedMm / 1000).toFixed(1)} m${kg(result.orderedMm) ? `, about ${kg(result.orderedMm)}` : ""}), waste ${result.wastePercent.toFixed(1)}%\n`
    : "";

  return (
    <div className="grid gap-[20px] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
        <div className="flex flex-wrap items-center justify-between gap-[8px]">
          <span className={tileLabel}>Pieces to cut</span>
          <div role="group" aria-label="Units" className="flex rounded-full border border-border-default bg-white p-[2px] text-f12 font-medium">
            {(["mm", "in"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={unit === option}
                onClick={() => switchUnit(option)}
                className={`rounded-full px-[12px] py-[3px] transition-colors ${unit === option ? "bg-teal text-white" : "text-t2 hover:text-teal-text"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-[6px]">
          <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.7fr)_28px] gap-[6px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">
            <span>Mark</span>
            <span>Length ({unit})</span>
            <span>Qty</span>
            <span className="sr-only">Remove</span>
          </div>
          {rows.map((row, index) => (
            <div key={row.id} className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.7fr)_28px] items-center gap-[6px]">
              <input aria-label={`Mark, line ${index + 1}`} value={row.label} placeholder="optional" onChange={(e) => updateRow(row.id, "label", e.target.value)} className={inputClass} />
              <input aria-label={`Length in ${unit}, line ${index + 1}`} type="number" min="0" step="any" inputMode="decimal" value={row.length} onChange={(e) => updateRow(row.id, "length", e.target.value)} className={inputClass} />
              <input aria-label={`Quantity, line ${index + 1}`} type="number" min="1" step="1" inputMode="numeric" value={row.qty} onChange={(e) => updateRow(row.id, "qty", e.target.value)} className={inputClass} />
              <button
                type="button"
                aria-label={`Remove line ${index + 1}`}
                onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}
                className="h-[28px] w-[28px] rounded-full text-f16 text-t3 transition-colors hover:bg-white hover:text-fail"
              >
                ×
              </button>
            </div>
          ))}
          <div className="flex flex-wrap gap-[8px] pt-[4px]">
            <button type="button" onClick={() => setRows((current) => [...current, makeRow({ label: "", length: "", qty: "" })])} className="rounded-full border border-border-default bg-white px-[12px] py-[4px] text-f12 font-medium text-t2 transition-colors hover:border-teal">
              + Add a length
            </button>
            <button type="button" aria-expanded={pasteOpen} onClick={() => setPasteOpen((open) => !open)} className="rounded-full border border-border-default bg-white px-[12px] py-[4px] text-f12 font-medium text-t2 transition-colors hover:border-teal">
              Paste a list
            </button>
            <button type="button" onClick={() => setRows([makeRow({ label: "", length: "", qty: "" })])} className="rounded-full border border-border-default bg-white px-[12px] py-[4px] text-f12 font-medium text-t2 transition-colors hover:border-teal">
              Clear
            </button>
          </div>
          {pasteOpen && (
            <div className="space-y-[6px] rounded-control border border-border-default bg-white p-[12px]">
              <label className={labelClass} htmlFor="cl-paste">One piece per line: length, quantity, mark ({unit})</label>
              <textarea
                id="cl-paste"
                rows={5}
                value={pasteText}
                placeholder={unit === "in" ? "94.5 18 Top rail\n45.25 24 Post" : "2400 18 Top rail\n1150 24 Post"}
                onChange={(e) => setPasteText(e.target.value)}
                className={`${inputClass} font-mono`}
              />
              <p className="text-f12 text-t3">Columns copied from a spreadsheet work too. The pasted list replaces the lines above.</p>
              <div className="flex items-center gap-[10px]">
                <button type="button" onClick={applyPaste} className="rounded-control bg-teal px-[14px] py-[6px] text-f12 font-bold text-white transition-colors hover:bg-teal-text">Use this list</button>
                {pasteNote && <span className="text-f12 text-t2" role="status">{pasteNote}</span>}
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-[12px] sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="cl-stock">Stock length</label>
            <select id="cl-stock" value={stockId} onChange={(e) => setStockId(e.target.value)} className={inputClass}>
              {STOCK_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>{option.label}{unit === "in" ? ` (${(option.lengthMm / MM_PER_IN / 12).toFixed(1)} ft)` : ""}</option>
              ))}
              <option value="custom">Other length</option>
            </select>
          </div>
          {stockId === "custom" ? (
            <div>
              <label className={labelClass} htmlFor="cl-custom">Stock length ({unit})</label>
              <input id="cl-custom" type="number" min="1" step="any" value={customStock} onChange={(e) => setCustomStock(e.target.value)} className={inputClass} />
            </div>
          ) : (
            <p className="self-end pb-[6px] text-f12 text-t3">{STOCK_OPTIONS.find((option) => option.id === stockId)?.note}</p>
          )}
          <div>
            <label className={labelClass} htmlFor="cl-kerf">Saw kerf ({unit})</label>
            <input id="cl-kerf" type="number" min="0" step="any" value={kerf} onChange={(e) => setKerf(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="cl-trim">End trim, each end ({unit})</label>
            <input id="cl-trim" type="number" min="0" step="any" value={trim} onChange={(e) => setTrim(e.target.value)} className={inputClass} />
          </div>
        </div>
        <p className="text-f12 text-t3">
          A diamond or carbide blade on FRP typically removes about 3 mm ({(3 / MM_PER_IN).toFixed(2)} in). The end trim squares
          handling-damaged ends; enter 0 to use the factory-cut ends as they come.
        </p>

        <div className="grid gap-[12px] sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="cl-profile">Profile, for the weight</label>
            <select id="cl-profile" value={profile} onChange={(e) => setProfile(e.target.value)} className={inputClass}>
              <option value="none">No weight</option>
              <option value="custom">Other profile (enter kg/m)</option>
              {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
                <optgroup key={cat} label={label}>
                  {PRODUCTS.filter((item) => item.cat === cat).map((item) => (
                    <option key={item.model} value={item.model}>{item.model} · {item.weight} kg/m</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          {profile === "custom" && (
            <div>
              <label className={labelClass} htmlFor="cl-kgm">Mass (kg/m)</label>
              <input id="cl-kgm" type="number" min="0" step="any" value={customKgM} onChange={(e) => setCustomKgM(e.target.value)} className={inputClass} />
            </div>
          )}
        </div>
      </div>

      <div className="min-w-0 space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
        {error || !result ? (
          <div className="rounded-control border border-fail-border bg-fail-bg p-[12px] text-f14 text-fail" role="alert">
            {error ?? "Check the inputs."}
          </div>
        ) : (
          <>
            <div className="grid gap-[8px] sm:grid-cols-3">
              <div className="rounded-control border border-teal-border bg-teal-bg p-[12px]">
                <div className={tileLabel}>Bars to order</div>
                <div className="mt-[4px] text-f24 font-bold text-t1">{result.bars} × {len(stockMm)}</div>
                <div className="text-f12 text-t3">{total(result.orderedMm)}{kg(result.orderedMm) ? ` · ${kg(result.orderedMm)}` : ""}</div>
              </div>
              <div className="rounded-control bg-white p-[12px]">
                <div className={tileLabel}>Pieces</div>
                <div className="mt-[4px] text-f24 font-bold text-t1">{result.pieceCount}</div>
                <div className="text-f12 text-t3">{total(result.requiredMm)}{kg(result.requiredMm) ? ` · ${kg(result.requiredMm)}` : ""}</div>
              </div>
              <div className="rounded-control bg-white p-[12px]">
                <div className={tileLabel}>Waste</div>
                <div className="mt-[4px] text-f24 font-bold text-t1">{result.wastePercent.toFixed(1)}%</div>
                <div className="text-f12 text-t3">{total(result.wasteMm)} of trims, kerfs and offcuts</div>
              </div>
            </div>
            <p className="rounded-control bg-white p-[12px] text-f12 text-t2" role="status">
              {result.provenMinimum
                ? `No plan can use fewer bars: ${result.bars} is the lower bound for these pieces on this stock length.`
                : `The plan uses ${result.bars} bars; the lower bound is ${result.lowerBound}, so at most ${result.bars - result.lowerBound} ${result.bars - result.lowerBound === 1 ? "bar" : "bars"} could be saved by a better arrangement.`}
            </p>

            <div className="rounded-control bg-white p-[12px]">
              <div className={tileLabel}>Cutting patterns · {result.patterns.length}</div>
              <ol className="mt-[8px] space-y-[12px]">
                {result.patterns.map((pattern, index) => (
                  <li key={pattern.cuts.join("|")}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-[12px] text-f14">
                      <span className="font-semibold text-t1">{pattern.count} {pattern.count === 1 ? "bar" : "bars"} · pattern {index + 1}</span>
                      <span className="text-f12 text-t3">offcut {len(pattern.offcutMm)}</span>
                    </div>
                    <BarDiagram pattern={pattern} stockMm={stockMm} trimMm={trimMm} kerfMm={kerfMm} len={len} />
                    <p className="mt-[2px] text-f12 text-t2">{patternText(pattern)}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative overflow-x-auto rounded-control bg-white">
              <table className="w-full min-w-[420px] border-collapse text-left text-f12">
                <caption className="px-[12px] pt-[10px] text-left font-mono uppercase tracking-[0.06em] text-t3">Same list on other stock lengths</caption>
                <thead>
                  <tr className="border-b border-border-default">
                    <th scope="col" className="px-[12px] py-[6px] font-semibold text-t1">Stock</th>
                    <th scope="col" className="px-[12px] py-[6px] text-right font-semibold text-t1">Bars</th>
                    <th scope="col" className="px-[12px] py-[6px] text-right font-semibold text-t1">Ordered</th>
                    <th scope="col" className="px-[12px] py-[6px] text-right font-semibold text-t1">Waste</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((option) => (
                    <tr key={`${option.id}-${option.lengthMm}`} className={`border-b border-border-default last:border-b-0 ${Math.abs(option.lengthMm - stockMm) < 0.5 ? "bg-teal-bg" : ""}`}>
                      <th scope="row" className="px-[12px] py-[6px] font-semibold text-t1">
                        {unit === "in" ? `${(option.lengthMm / MM_PER_IN / 12).toFixed(1)} ft` : option.label}
                        <span className="block font-normal text-t3">{option.note}</span>
                      </th>
                      {option.result ? (
                        <>
                          <td className="px-[12px] py-[6px] text-right tabular-nums text-t2">{option.result.bars}</td>
                          <td className="px-[12px] py-[6px] text-right tabular-nums text-t2">{total(option.result.orderedMm)}</td>
                          <td className="px-[12px] py-[6px] text-right tabular-nums text-t2">{option.result.wastePercent.toFixed(1)}%</td>
                        </>
                      ) : (
                        <td colSpan={3} className="px-[12px] py-[6px] text-right text-t3">{option.error?.startsWith("Piece") ? "A piece is too long" : "n/a"}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-f12 text-t3">
              Pultrusion is continuous, so repeated pieces can also be cut to length in the factory: nothing is wasted on site and
              no offcuts are shipped. Ask for it with the quote when one length repeats in quantity.
            </p>

            <div className="grid gap-[8px] sm:grid-cols-3">
              <a
                href={buildRfqHref({ source: "cut-list-optimizer", product: product ? `${product.model} pultruded profile` : "Pultruded FRP profiles", productPath: "/products/fiberglass-structural-shapes", message: summary + "\nResin, color and delivery address (please add): ____" })}
                onClick={() => track("cutlist_quote_click", { bars: result.bars })}
                className="rounded-control bg-teal px-[16px] py-[10px] text-center text-f14 font-bold text-white transition-colors hover:bg-teal-text"
              >
                Quote these bars
              </a>
              <button type="button" onClick={downloadCsv} className="rounded-control border border-border-default bg-white px-[16px] py-[10px] text-center text-f14 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text">
                Download CSV
              </button>
              <button type="button" onClick={share} className="rounded-control border border-border-default bg-white px-[16px] py-[10px] text-center text-f14 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text">
                {shareState === "copied" ? "Link copied" : shareState === "error" ? "Link is in the address bar" : "Copy share link"}
              </button>
            </div>
            <details className="rounded-control bg-white p-[12px] text-f12 text-t2">
              <summary className="cursor-pointer font-semibold text-t1">Cut list as text</summary>
              <pre className="mt-[8px] overflow-x-auto whitespace-pre-wrap font-mono text-f12 text-t2">{cutListText}</pre>
            </details>
            <Link href="/products/fiberglass-structural-shapes" className="block rounded-control border border-teal/30 bg-white p-[12px] text-f14 text-t2 transition-colors hover:border-teal">
              <span className="block font-mono text-f12 uppercase tracking-[0.06em] text-t3">Standard profiles</span>
              I-beams, channels, angles, tubes, rods and flat bars in {STOCK_OPTIONS[1].label} lengths <span aria-hidden>→</span>
            </Link>
          </>
        )}
        <p className="text-f12 text-t3">Up to {CUT_LIST_LIMITS.maxPieces} pieces and {CUT_LIST_LIMITS.maxDistinctLengths} different lengths per list.</p>
      </div>
    </div>
  );
}

function BarDiagram({ pattern, stockMm, trimMm, kerfMm, len }: { pattern: BarPattern; stockMm: number; trimMm: number; kerfMm: number; len: (mm: number) => string }) {
  const pct = (mm: number) => `${(mm / stockMm) * 100}%`;
  const kerfs = pattern.cuts.length - 1 + (pattern.offcutMm > 0 ? 1 : 0);
  const kerfTotal = kerfs * kerfMm;
  return (
    <div className="mt-[4px] flex h-[26px] w-full overflow-hidden rounded-tag border border-border-default bg-bg2" aria-hidden>
      {trimMm > 0 && <div className="h-full shrink-0 bg-t3/30" style={{ width: pct(trimMm) }} />}
      {pattern.cuts.map((cut, index) => (
        <div
          key={index}
          className="flex h-full shrink-0 items-center justify-center overflow-hidden border-r-2 border-white bg-teal text-f12 font-medium text-white"
          style={{ width: pct(cut) }}
          title={len(cut)}
        >
          <span className="truncate px-[2px]">{cut / stockMm > 0.09 ? len(cut) : ""}</span>
        </div>
      ))}
      {kerfTotal > 0 && <div className="h-full shrink-0" style={{ width: pct(kerfTotal) }} />}
      {pattern.offcutMm > 0 && (
        <div className="h-full shrink-0 border border-dashed border-border-hover bg-white" style={{ width: pct(pattern.offcutMm) }} />
      )}
      {trimMm > 0 && <div className="ml-auto h-full shrink-0 bg-t3/30" style={{ width: pct(trimMm) }} />}
    </div>
  );
}
