"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@/components/calculators/leadCapture";
import {
  COLUMN_PRODUCTS,
  END_CONDITIONS,
  WEAK_AXIS_BRACING,
  catalogColumnSection,
  checkColumn,
  columnInputError,
  lightestPassing,
  maxColumnLength,
  type ColumnSection,
  type ColumnShape,
} from "@/lib/frpColumn";
import { DESIGN_MATERIALS, ENV_FACTORS, LOAD_DURATIONS, type DesignMethod } from "@/lib/frpDesignBasis";
import { buildRfqHref } from "@/lib/rfq";
import { buildToolStateHref, readToolStateParams } from "@/lib/toolStateUrl";

const METHODS: { id: DesignMethod; label: string }[] = [
  { id: "lrfd-asce", label: "ASCE/SEI 74-23 style LRFD screen (φ 0.65, λ)" },
  { id: "lrfd-cents19101", label: "CEN/TS 19101 style screen (γ_M 1.5, γ_Q 1.5)" },
  { id: "asd", label: "Allowable stress screen (factor of safety 2.5)" },
];

const FRP_MATERIALS = Object.entries(DESIGN_MATERIALS).filter(([, material]) => material.group === "FRP");

const SHAPE_GROUPS: { shape: ColumnShape; label: string }[] = [
  { shape: "i-beam", label: "I-beams" },
  { shape: "rect-tube", label: "Square and rectangular tubes" },
  { shape: "round-tube", label: "Round tubes" },
];

const inputClass = "w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
const labelClass = "mb-[4px] block font-mono text-f12 uppercase tracking-[0.06em] text-t3";
const tileLabel = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

const kn = (value: number) => `${value >= 100 ? value.toFixed(0) : value.toFixed(1)} kN`;

export default function ColumnCalculator() {
  const [profile, setProfile] = useState("SHS 100×100×8");
  const [custom, setCustom] = useState<ColumnSection>({ shape: "i-beam", h: 200, b: 100, tf: 10, tw: 10 });
  const [lengthM, setLengthM] = useState(3);
  const [endId, setEndId] = useState<string>("pinned-pinned");
  const [bracingId, setBracingId] = useState<string>("none");
  const [loadKn, setLoadKn] = useState(20);
  const [materialId, setMaterialId] = useState("frp-e23");
  const [method, setMethod] = useState<DesignMethod>("lrfd-asce");
  const [envId, setEnvId] = useState("outdoor");
  const [durationId, setDurationId] = useState("occupancy");
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    // Seed from a shared link once, after mount (window is not available during prerender).
    /* eslint-disable react-hooks/set-state-in-effect */
    const params = readToolStateParams(window.location);
    const p = params.get("profile");
    if (p && (p === "custom" || COLUMN_PRODUCTS.some((product) => product.model === p))) setProfile(p);
    const num = (key: string, set: (value: number) => void) => {
      const value = params.get(key);
      if (value !== null && value !== "" && Number.isFinite(+value)) set(+value);
    };
    num("l", setLengthM);
    num("p", setLoadKn);
    const shape = params.get("shape");
    if (shape === "i-beam" || shape === "rect-tube" || shape === "round-tube") {
      setCustom({ shape, h: +(params.get("h") ?? 200), b: +(params.get("b") ?? 100), tf: +(params.get("tf") ?? 10), tw: +(params.get("tw") ?? 10) });
    }
    const end = params.get("end");
    if (end && END_CONDITIONS.some((item) => item.id === end)) setEndId(end);
    const brace = params.get("brace");
    if (brace && WEAK_AXIS_BRACING.some((item) => item.id === brace)) setBracingId(brace);
    const m = params.get("material");
    if (m && FRP_MATERIALS.some(([id]) => id === m)) setMaterialId(m);
    const method = params.get("method");
    if (method && METHODS.some((item) => item.id === method)) setMethod(method as DesignMethod);
    const env = params.get("env");
    if (env && ENV_FACTORS.some((item) => item.id === env)) setEnvId(env);
    const duration = params.get("duration");
    if (duration && LOAD_DURATIONS.some((item) => item.id === duration)) setDurationId(duration);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const product = COLUMN_PRODUCTS.find((item) => item.model === profile);
  const section = product ? catalogColumnSection(product)! : custom;
  const end = END_CONDITIONS.find((item) => item.id === endId) ?? END_CONDITIONS[0];
  const bracing = WEAK_AXIS_BRACING.find((item) => item.id === bracingId) ?? WEAK_AXIS_BRACING[0];
  const common = { lengthMm: lengthM * 1000, K: end.K, weakAxisDivisor: bracing.divisor, loadKn, materialId, method, envId, durationId };
  const input = { ...common, section };
  const error = columnInputError(input);
  const result = checkColumn(input);
  const maxLength = result ? maxColumnLength(input) : null;
  const suggestions = result ? lightestPassing(common, 4) : [];
  const ok = result ? result.utilisation <= 1 : false;
  const describe = product ? product.model : `${custom.shape === "round-tube" ? `CHS ${custom.h}×${custom.tf}` : custom.shape === "rect-tube" ? `tube ${custom.h}×${custom.b}×${custom.tf}` : `I ${custom.h}×${custom.b}×${custom.tf}/${custom.tw}`} (custom)`;

  async function share() {
    const state: Record<string, string | number> = { profile, l: lengthM, p: loadKn, end: endId, brace: bracingId, material: materialId, method, env: envId, duration: durationId };
    if (profile === "custom") Object.assign(state, { shape: custom.shape, h: custom.h, b: custom.b, tf: custom.tf, tw: custom.tw });
    const href = buildToolStateHref("/tools/frp-column-calculator", state);
    window.history.replaceState(null, "", href);
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${href}`);
      setShareState("copied");
    } catch {
      setShareState("error");
    }
    window.setTimeout(() => setShareState("idle"), 2500);
    track("column_share", { profile });
  }

  const summary = result
    ? `FRP column screen (F1 Composite tool)\n` +
      `Section: ${describe}; ${DESIGN_MATERIALS[materialId].label}; ${ENV_FACTORS.find((env) => env.id === envId)?.label}\n` +
      `Length ${lengthM} m, ${end.label} (K ${end.K}), ${bracing.label.toLowerCase()}\n` +
      `Axial service load ${loadKn} kN, factored ${result.factoredLoadKn.toFixed(1)} kN; ${METHODS.find((item) => item.id === method)?.label}\n` +
      `Governing: ${result.governing.label}, design capacity ${result.governing.designKn.toFixed(1)} kN, utilization ${(result.utilisation * 100).toFixed(0)}%\n`
    : "";

  return (
    <div className="grid gap-[20px] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
        <div>
          <label className={labelClass} htmlFor="col-profile">Section</label>
          <select id="col-profile" value={profile} onChange={(e) => setProfile(e.target.value)} className={inputClass}>
            {SHAPE_GROUPS.map((group) => (
              <optgroup key={group.shape} label={group.label}>
                {COLUMN_PRODUCTS.filter((item) => catalogColumnSection(item)?.shape === group.shape).map((item) => (
                  <option key={item.model} value={item.model}>{item.model} · {item.weight} kg/m</option>
                ))}
              </optgroup>
            ))}
            <option value="custom">Other size</option>
          </select>
        </div>
        {profile === "custom" && (
          <div className="grid grid-cols-2 gap-[8px] rounded-control border border-border-default bg-white p-[12px] sm:grid-cols-5">
            <div className="col-span-2 sm:col-span-1">
              <label className={labelClass} htmlFor="col-shape">Shape</label>
              <select id="col-shape" value={custom.shape} onChange={(e) => setCustom({ ...custom, shape: e.target.value as ColumnShape })} className={inputClass}>
                <option value="i-beam">I-beam</option>
                <option value="rect-tube">Tube</option>
                <option value="round-tube">Round</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="col-h">{custom.shape === "round-tube" ? "OD mm" : "Depth mm"}</label>
              <input id="col-h" type="number" min="1" value={custom.h} onChange={(e) => setCustom({ ...custom, h: +e.target.value })} className={inputClass} />
            </div>
            {custom.shape !== "round-tube" && (
              <div>
                <label className={labelClass} htmlFor="col-b">Width mm</label>
                <input id="col-b" type="number" min="1" value={custom.b} onChange={(e) => setCustom({ ...custom, b: +e.target.value })} className={inputClass} />
              </div>
            )}
            <div>
              <label className={labelClass} htmlFor="col-tf">{custom.shape === "i-beam" ? "Flange t mm" : "Wall t mm"}</label>
              <input id="col-tf" type="number" min="0.5" step="0.1" value={custom.tf} onChange={(e) => setCustom({ ...custom, tf: +e.target.value, tw: custom.shape === "i-beam" ? custom.tw : +e.target.value })} className={inputClass} />
            </div>
            {custom.shape === "i-beam" && (
              <div>
                <label className={labelClass} htmlFor="col-tw">Web t mm</label>
                <input id="col-tw" type="number" min="0.5" step="0.1" value={custom.tw} onChange={(e) => setCustom({ ...custom, tw: +e.target.value })} className={inputClass} />
              </div>
            )}
          </div>
        )}

        <div className="grid gap-[12px] sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="col-length">Column length (m)</label>
            <input id="col-length" type="number" min="0.1" step="0.1" value={lengthM} onChange={(e) => setLengthM(+e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="col-load">Axial service load (kN)</label>
            <input id="col-load" type="number" min="0" step="0.5" value={loadKn} onChange={(e) => setLoadKn(+e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="col-end">End conditions</label>
            <select id="col-end" value={endId} onChange={(e) => setEndId(e.target.value)} className={inputClass}>
              {END_CONDITIONS.map((item) => (
                <option key={item.id} value={item.id}>{item.label} (K {item.K})</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="col-brace">Weak-axis bracing</label>
            <select id="col-brace" value={bracingId} onChange={(e) => setBracingId(e.target.value)} className={inputClass}>
              {WEAK_AXIS_BRACING.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-f12 text-t3">
          K values are the recommended design values for ideal ends. Real pinned FRP connections sit between the ideal
          cases; when in doubt, use the larger K.
        </p>

        <div className="grid gap-[12px] sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="col-material">Material</label>
            <select id="col-material" value={materialId} onChange={(e) => setMaterialId(e.target.value)} className={inputClass}>
              {FRP_MATERIALS.map(([id, material]) => (
                <option key={id} value={id}>{material.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="col-env">Environment</label>
            <select id="col-env" value={envId} onChange={(e) => setEnvId(e.target.value)} className={inputClass}>
              {ENV_FACTORS.map((env) => (
                <option key={env.id} value={env.id}>{env.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="col-method">Design screen</label>
            <select id="col-method" value={method} onChange={(e) => setMethod(e.target.value as DesignMethod)} className={inputClass}>
              {METHODS.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
          {method === "lrfd-asce" && (
            <div>
              <label className={labelClass} htmlFor="col-duration">
                Load duration <span className="normal-case tracking-normal">(λ)</span>
              </label>
              <select id="col-duration" value={durationId} onChange={(e) => setDurationId(e.target.value)} className={inputClass}>
                {LOAD_DURATIONS.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}, λ {item.lambda}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <p className="text-f12 text-t3">
          {DESIGN_MATERIALS[materialId].label}: E<sub>L</sub> {DESIGN_MATERIALS[materialId].E} GPa, E<sub>T</sub> {DESIGN_MATERIALS[materialId].E_T} GPa,
          G<sub>LT</sub> {DESIGN_MATERIALS[materialId].G_LT} GPa, compressive strength {DESIGN_MATERIALS[materialId].sigma_c} MPa ({DESIGN_MATERIALS[materialId].standard}).
          Replace them with the supplier&apos;s certified values for final design.
        </p>
      </div>

      <div className="min-w-0 space-y-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
        {error || !result ? (
          <div className="rounded-control border border-fail-border bg-fail-bg p-[12px] text-f14 text-fail" role="alert">
            {error ?? "Check the inputs."}
          </div>
        ) : (
          <>
            <div className="grid gap-[8px] sm:grid-cols-2">
              <div className={`rounded-control border p-[12px] ${ok ? "border-teal-border bg-teal-bg" : "border-fail-border bg-fail-bg"}`}>
                <div className={tileLabel}>Utilization</div>
                <div className={`mt-[4px] text-f32 font-bold ${ok ? "text-teal-text" : "text-fail"}`}>{Number.isFinite(result.utilisation) ? `${(result.utilisation * 100).toFixed(0)}%` : "—"}</div>
                <div className="text-f12 text-t3">{ok ? "within the screen" : "exceeds the screen"}</div>
              </div>
              <div className="rounded-control bg-white p-[12px]">
                <div className={tileLabel}>Governing mode</div>
                <div className="mt-[4px] text-f18 font-bold text-t1">{result.governing.label}</div>
                <div className="text-f12 text-t3">
                  {kn(result.factoredLoadKn)} factored against {kn(result.governing.designKn)} design capacity
                </div>
              </div>
            </div>

            <div className="relative overflow-x-auto rounded-control bg-white">
              <table className="w-full min-w-[440px] border-collapse text-left text-f12">
                <caption className="px-[12px] pt-[10px] text-left font-mono uppercase tracking-[0.06em] text-t3">Each limit state</caption>
                <thead>
                  <tr className="border-b border-border-default">
                    <th scope="col" className="px-[12px] py-[6px] font-semibold text-t1">Mode</th>
                    <th scope="col" className="px-[12px] py-[6px] text-right font-semibold text-t1">Critical stress</th>
                    <th scope="col" className="px-[12px] py-[6px] text-right font-semibold text-t1">Nominal</th>
                    <th scope="col" className="px-[12px] py-[6px] text-right font-semibold text-t1">Design</th>
                  </tr>
                </thead>
                <tbody>
                  {result.modes.map((mode) => (
                    <tr key={mode.mode} className={`border-b border-border-default last:border-b-0 ${mode === result.governing ? "bg-teal-bg" : ""}`}>
                      <th scope="row" className="px-[12px] py-[6px] font-semibold text-t1">{mode.label}</th>
                      <td className="px-[12px] py-[6px] text-right tabular-nums text-t2">{mode.stressMPa.toFixed(1)} MPa</td>
                      <td className="px-[12px] py-[6px] text-right tabular-nums text-t2">{kn(mode.nominalKn)}</td>
                      <td className="px-[12px] py-[6px] text-right tabular-nums text-t2">{kn(mode.designKn)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-[12px] pb-[10px] text-f12 text-t3">
                Design = nominal × {result.resistanceFactor.toFixed(2)}{method === "lrfd-asce" ? ` × λ ${result.lambda}` : ""}; factored load = service × {result.loadFactor}.
              </p>
            </div>

            <div className="rounded-control bg-white p-[12px] text-f14 text-t2">
              <div className={tileLabel}>Slenderness and length</div>
              <p className="mt-[4px]">
                KL/r {result.slenderness.x.toFixed(0)} about x and {result.slenderness.y.toFixed(0)} about y
                {result.flags.slender ? "; above 200, the limit commonly recommended for compression members" : ""}.{" "}
                {maxLength !== null
                  ? <>Longest length that passes with these inputs: <strong className="text-t1">{(maxLength / 1000).toFixed(2)} m</strong>.</>
                  : result.utilisation > 1 && result.governing.mode.startsWith("global")
                    ? "No length passes: shorten the column, brace it or choose a larger section."
                    : result.utilisation > 1
                      ? "Local buckling or crushing governs, so a shorter column does not help; choose a thicker wall or a larger section."
                      : "Passes at every length up to 30 m."}
              </p>
            </div>

            {(result.flags.interaction || result.flags.roundTubeLocalNotChecked) && (
              <ul className="space-y-[6px] rounded-control border border-warn-border bg-warn-bg p-[12px] text-f12 text-t1">
                {result.flags.interaction && (
                  <li>The lowest local and global buckling loads are within 30% of each other. Where the modes interact, the capacity can fall below both; confirm with test data or a code interaction check.</li>
                )}
                {result.flags.roundTubeLocalNotChecked && (
                  <li>Local buckling of a round tube wall is not calculated. Pultruded round tubes are usually thick-walled (D/t {(section.h / section.tf).toFixed(0)} here); check thin tubes with the supplier.</li>
                )}
              </ul>
            )}

            {suggestions.length > 0 && (
              <div className="rounded-control bg-white p-[12px]">
                <div className={tileLabel}>Lightest catalog sections that pass</div>
                <ul className="mt-[6px] divide-y divide-border-default">
                  {suggestions.map((item) => (
                    <li key={item.product.model} className="flex flex-wrap items-center justify-between gap-[8px] py-[6px] text-f14">
                      <span className="text-t1">
                        <strong>{item.product.model}</strong> <span className="text-t3">· {item.product.weight} kg/m · {(item.utilisation * 100).toFixed(0)}%</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setProfile(item.product.model);
                          track("column_use_suggestion", { profile: item.product.model });
                        }}
                        className="rounded-full border border-border-default px-[10px] py-[2px] text-f12 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
                      >
                        Use
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid gap-[8px] sm:grid-cols-2">
              <a
                href={buildRfqHref({ source: "column-calculator", product: product ? `${product.model} pultruded profile` : "Pultruded FRP column", productPath: "/products/fiberglass-structural-shapes", message: summary + "\nConnections, bracing and quantity (please add): ____" })}
                onClick={() => track("column_quote_click", { profile })}
                className="rounded-control bg-teal px-[16px] py-[10px] text-center text-f14 font-bold text-white transition-colors hover:bg-teal-text"
              >
                Send to engineering
              </a>
              <button type="button" onClick={share} className="rounded-control border border-border-default bg-white px-[16px] py-[10px] text-center text-f14 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text">
                {shareState === "copied" ? "Link copied" : shareState === "error" ? "Link is in the address bar" : "Copy share link"}
              </button>
            </div>
            <Link href="/frp-profile-calculator" className="block rounded-control border border-teal/30 bg-white p-[12px] text-f14 text-t2 transition-colors hover:border-teal">
              <span className="block font-mono text-f12 uppercase tracking-[0.06em] text-t3">Beams</span>
              Bending, shear and deflection in the FRP profile calculator <span aria-hidden>→</span>
            </Link>
          </>
        )}
        <p className="text-f12 text-t3">
          Concentric axial load only. Eccentric load, combined bending, flexural–torsional buckling of channels and angles,
          connections and creep under sustained load are outside this screen.
        </p>
      </div>
    </div>
  );
}
