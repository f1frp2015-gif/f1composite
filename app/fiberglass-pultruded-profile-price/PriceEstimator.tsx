"use client";

// Live price estimator for /fiberglass-pultruded-profile-price.
// Pure form UI — every number comes from POST /api/profile-price so the
// pricing constants stay server-side. Debounced so the range updates as
// parameters change without a submit button.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type ProfileType = "i_beam" | "channel" | "angle" | "square" | "rect" | "round";

type ApiResult = {
  usdPerMeterLow: number;
  usdPerMeterHigh: number;
  usdPerKgLow: number;
  usdPerKgHigh: number;
  usdTotalLow: number;
  usdTotalHigh: number;
  kgPerMeter: number;
  warnings: string[];
  engineVersion: string;
};

const PROFILE_LABELS: Record<ProfileType, string> = {
  i_beam: "I-beam / wide flange",
  channel: "Channel (U)",
  angle: "Angle (L)",
  square: "Square tube (SHS)",
  rect: "Rectangular tube (RHS)",
  round: "Round tube",
};

// Sensible catalog-aligned defaults per shape so the first render shows a
// realistic mid-size section.
const DEFAULT_DIMS: Record<ProfileType, Record<string, number>> = {
  i_beam: { h: 152, bf: 76, tf: 6.4, tw: 6.4 },
  channel: { h: 100, w: 50, t: 6 },
  angle: { leg: 50, t: 6 },
  square: { side: 50, t: 5 },
  rect: { w: 100, h: 50, t: 5 },
  round: { od: 50, id: 40 },
};

const DIM_FIELDS: Record<ProfileType, { key: string; label: string }[]> = {
  i_beam: [
    { key: "h", label: "Depth H (mm)" },
    { key: "bf", label: "Flange width (mm)" },
    { key: "tf", label: "Flange thk (mm)" },
    { key: "tw", label: "Web thk (mm)" },
  ],
  channel: [
    { key: "h", label: "Depth H (mm)" },
    { key: "w", label: "Flange width (mm)" },
    { key: "t", label: "Thickness (mm)" },
  ],
  angle: [
    { key: "leg", label: "Leg (mm)" },
    { key: "t", label: "Thickness (mm)" },
  ],
  square: [
    { key: "side", label: "Side (mm)" },
    { key: "t", label: "Wall (mm)" },
  ],
  rect: [
    { key: "w", label: "Width (mm)" },
    { key: "h", label: "Height (mm)" },
    { key: "t", label: "Wall (mm)" },
  ],
  round: [
    { key: "od", label: "OD (mm)" },
    { key: "id", label: "ID (mm)" },
  ],
};

const inputClass =
  "w-full rounded-[6px] border border-border-default bg-white px-[13px] py-[8px] text-f13 text-t1 outline-none focus:border-teal";
const selectClass = inputClass;
const labelClass = "block text-f11 font-bold uppercase tracking-[2px] text-t3 mb-[5px]";

function fmtUsd(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: n < 100 ? 2 : 0 });
}

export default function PriceEstimator() {
  const [profileType, setProfileType] = useState<ProfileType>("i_beam");
  const [dims, setDims] = useState<Record<string, number>>(DEFAULT_DIMS.i_beam);
  const [fiber, setFiber] = useState("e_glass");
  const [resin, setResin] = useState("up");
  const [fireRetardant, setFireRetardant] = useState(false);
  const [weatherproof, setWeatherproof] = useState(false);
  const [surfaceVeil, setSurfaceVeil] = useState(false);
  const [totalMeters, setTotalMeters] = useState(1000);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seq = useRef(0);

  const changeType = (t: ProfileType) => {
    setProfileType(t);
    setDims(DEFAULT_DIMS[t]);
  };

  const fetchEstimate = useCallback(() => {
    const mySeq = ++seq.current;
    setLoading(true);
    fetch("/api/profile-price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        geometry: { type: profileType, ...dims },
        fiber,
        resin,
        fireRetardant,
        weatherproof,
        surfaceVeil,
        totalMeters,
      }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: ApiResult) => {
        if (seq.current !== mySeq) return;
        setResult(data);
        setError(null);
      })
      .catch(() => {
        if (seq.current !== mySeq) return;
        setError("Check the dimensions — the estimator could not price this section.");
      })
      .finally(() => {
        if (seq.current === mySeq) setLoading(false);
      });
  }, [profileType, dims, fiber, resin, fireRetardant, weatherproof, surfaceVeil, totalMeters]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(fetchEstimate, 400);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [fetchEstimate]);

  return (
    <div className="grid gap-[21px] lg:grid-cols-[1fr_380px]">
      {/* Inputs */}
      <div className="rounded-[13px] border border-border-default bg-white p-[21px]">
        <div className="grid gap-[13px] sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="pe-type">Profile type</label>
            <select
              id="pe-type"
              value={profileType}
              onChange={(e) => changeType(e.target.value as ProfileType)}
              className={selectClass}
            >
              {(Object.keys(PROFILE_LABELS) as ProfileType[]).map((t) => (
                <option key={t} value={t}>{PROFILE_LABELS[t]}</option>
              ))}
            </select>
          </div>

          {DIM_FIELDS[profileType].map((f) => (
            <div key={f.key}>
              <label className={labelClass} htmlFor={`pe-${f.key}`}>{f.label}</label>
              <input
                id={`pe-${f.key}`}
                type="number"
                value={dims[f.key] ?? 0}
                onChange={(e) => setDims((d) => ({ ...d, [f.key]: +e.target.value }))}
                className={inputClass}
              />
            </div>
          ))}

          <div>
            <label className={labelClass} htmlFor="pe-fiber">Fiber</label>
            <select id="pe-fiber" value={fiber} onChange={(e) => setFiber(e.target.value)} className={selectClass}>
              <option value="e_glass">E-glass (standard)</option>
              <option value="ecr_glass">ECR-glass (corrosion grade)</option>
              <option value="carbon">Carbon fiber</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="pe-resin">Resin system</label>
            <select id="pe-resin" value={resin} onChange={(e) => setResin(e.target.value)} className={selectClass}>
              <option value="up">Polyester (GP)</option>
              <option value="ve">Vinyl ester</option>
              <option value="epoxy">Epoxy</option>
              <option value="pu">Polyurethane</option>
              <option value="phenolic">Phenolic</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="pe-qty">Order quantity (total meters)</label>
            <input
              id="pe-qty"
              type="number"
              value={totalMeters}
              min={1}
              onChange={(e) => setTotalMeters(Math.max(1, +e.target.value))}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col justify-end gap-[5px]">
            <label className="flex items-center gap-[8px] text-f13 text-t2">
              <input type="checkbox" checked={fireRetardant} onChange={(e) => setFireRetardant(e.target.checked)} />
              Fire-retardant resin
            </label>
            <label className="flex items-center gap-[8px] text-f13 text-t2">
              <input type="checkbox" checked={weatherproof} onChange={(e) => setWeatherproof(e.target.checked)} />
              UV / weathering package
            </label>
            <label className="flex items-center gap-[8px] text-f13 text-t2">
              <input type="checkbox" checked={surfaceVeil} onChange={(e) => setSurfaceVeil(e.target.checked)} />
              Surface veil
            </label>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-[13px] border border-teal/30 bg-bg2 p-[21px]">
        <p className={labelClass}>Indicative export price (FOB China)</p>
        {error ? (
          <p className="mt-[13px] text-f15 text-t2">{error}</p>
        ) : result ? (
          <>
            <p className={`text-[clamp(28px,3vw,40px)] font-extrabold leading-[1.1] text-t1 ${loading ? "opacity-50" : ""}`}>
              ${fmtUsd(result.usdPerMeterLow)}&ndash;${fmtUsd(result.usdPerMeterHigh)}
              <span className="text-f15 font-bold text-t3"> / meter</span>
            </p>
            <ul className="mt-[13px] space-y-[5px] text-f13 text-t2">
              <li>&asymp; ${fmtUsd(result.usdPerKgLow)}&ndash;${fmtUsd(result.usdPerKgHigh)} per kg</li>
              <li>Section mass: {result.kgPerMeter} kg/m</li>
              <li>
                Order total ({totalMeters.toLocaleString("en-US")} m): ${fmtUsd(result.usdTotalLow)}&ndash;$
                {fmtUsd(result.usdTotalHigh)}
              </li>
            </ul>
            {result.warnings.length > 0 && (
              <ul className="mt-[13px] space-y-[3px] text-f11 text-amber-700">
                {result.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="mt-[13px] text-f15 text-t2">Calculating&hellip;</p>
        )}
        <p className="mt-[13px] text-f11 leading-golden text-t3">
          Budgetary estimate, &plusmn;15% band, excludes ocean freight and import duty. Section
          mass is computed from the nominal rectangular section; where a published datasheet
          weight exists, the datasheet prevails in quotations. Firm pricing comes from a written
          quotation against your drawing and quantity.
        </p>
        <Link
          href="/contact?source=price-estimator&inquiry_type=rfq"
          className="mt-[13px] inline-block rounded-[6px] bg-teal px-[21px] py-[10px] text-f13 font-bold text-white hover:opacity-90"
        >
          Get a firm quote &rarr;
        </Link>
      </div>
    </div>
  );
}
