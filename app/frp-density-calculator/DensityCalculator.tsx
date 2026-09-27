"use client";

import { useState } from "react";
import Link from "next/link";
import DensityPlayground from "./DensityPlayground";
import LayupFields from "./LayupFields";
import {
  calculateLayup,
  sectionPerimeters,
  exampleLayers,
  exampleRovings,
} from "@/lib/frpLayup";
import RecipeFields from "./RecipeFields";
import {
  calculateMixture,
  exampleRecipe,
  type MixtureBasis,
} from "@/lib/frpMixture";
import {
  calculateDensity,
  densityFactors,
  weightPerMeterFactors,
  type DensityShape,
  type DensityUnit,
} from "@/lib/frpDensity";

const shapes: Record<DensityShape, string> = {
  "rect-tube": "Square / rectangular tube",
  "round-tube": "Round tube",
  rod: "Solid round rod",
  flat: "Flat bar / plate",
  angle: "L-angle",
  channel: "C-channel",
  "i-beam": "I-beam",
  custom: "Custom net area",
};
const defaults = {
  h: "50",
  b: "50",
  t: "5",
  tf: "5",
  area: "900",
  length: "6",
  quantity: "10",
  density: "1.9",
  mass: "10.26",
};
type Field = keyof typeof defaults;
// Density in g/cm³ and mass per meter keep four decimals; the rest are shown
// to the precision the inputs can support.
const fmt = (value: number, digits = 4) =>
  value.toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });

function SectionSketch({ shape }: { shape: DensityShape }) {
  const paths: Record<DensityShape, string> = {
    "rect-tube": "M40 20H160V130H40Z M55 35V115H145V35Z",
    "round-tube":
      "M100 15A60 60 0 1 1 99.99 15Z M100 30A45 45 0 1 0 100.01 30Z",
    rod: "M100 15A60 60 0 1 1 99.99 15Z",
    flat: "M30 60H170V95H30Z",
    angle: "M40 20H60V110H160V130H40Z",
    channel: "M40 20H160V40H60V110H160V130H40Z",
    "i-beam": "M35 20H165V40H110V110H165V130H35V110H90V40H35Z",
    custom: "M40 20H160V60H110V130H40Z",
  };
  return (
    <svg
      viewBox="0 0 200 150"
      className="h-[144px] w-full"
      role="img"
      aria-label={`${shapes[shape]} schematic; shaded area is solid material, not to scale`}
    >
      <path
        d={paths[shape]}
        fill="currentColor"
        fillRule="evenodd"
        className="text-teal"
      />
      <path
        d="M25 145H175"
        stroke="currentColor"
        className="text-t3"
        strokeDasharray="3 4"
      />
    </svg>
  );
}

export default function DensityCalculator() {
  const [mode, setMode] = useState<"weight" | "density" | "recipe" | "layup">(
    "layup",
  );
  const [shape, setShape] = useState<DensityShape>("rect-tube");
  const [values, setValues] = useState(defaults);
  const [massUnit, setMassUnit] =
    useState<keyof typeof weightPerMeterFactors>("kg/m");
  const [unit, setUnit] = useState<DensityUnit>("g/cm³");
  const [rows, setRows] = useState(exampleRecipe);
  const [basis, setBasis] = useState<MixtureBasis>("weight");
  const [voids, setVoids] = useState("0");
  const mixture = calculateMixture(rows, basis, voids);
  const [layers, setLayers] = useState(exampleLayers);
  const [rovings, setRovings] = useState(exampleRovings);
  const [matrix, setMatrix] = useState("1.2");
  const [layupVoids, setLayupVoids] = useState("0");
  const geometry = calculateDensity({
    h: Number(values.h),
    b: Number(values.b),
    t: Number(values.t),
    tf: Number(values.tf),
    area: Number(values.area),
    length: 1,
    quantity: 1,
    density: 1,
    mass: 1,
    shape,
    mode: "weight",
    densityUnit: "g/cm³",
  });
  const perimeters = sectionPerimeters(
    shape,
    Number(values.h),
    Number(values.b),
    Number(values.t),
  );
  const layup = calculateLayup(
    geometry.area ?? 0,
    perimeters,
    layers,
    rovings,
    matrix,
    layupVoids,
  );
  const result: ReturnType<typeof calculateDensity> =
    mode === "layup" && (geometry.error || layup.error)
      ? { error: geometry.error || layup.error || "Invalid layup." }
      : mode === "recipe" && mixture.error
        ? { error: mixture.error }
        : calculateDensity({
            h: Number(values.h),
            b: Number(values.b),
            t: Number(values.t),
            tf: Number(values.tf),
            area: Number(values.area),
            length: Number(values.length),
            quantity: Number(values.quantity),
            density:
              mode === "layup"
                ? layup.density!
                : mode === "recipe"
                  ? mixture.adjusted!
                  : Number(values.density),
            mass: Number(values.mass),
            shape,
            mode: mode === "density" ? "density" : "weight",
            densityUnit: mode === "recipe" || mode === "layup" ? "g/cm³" : unit,
          });
  const dimensions: [Field, string][] =
    shape === "custom"
      ? [["area", "Net material area (mm²)"]]
      : shape === "rod"
        ? [["h", "Diameter (mm)"]]
        : shape === "round-tube"
          ? [
              ["h", "Outside diameter (mm)"],
              ["t", "Wall thickness (mm)"],
            ]
          : shape === "flat"
            ? [
                ["b", "Width (mm)"],
                ["h", "Thickness (mm)"],
              ]
            : [
                ["h", "Outside height / leg H (mm)"],
                ["b", "Outside width / leg B (mm)"],
                [
                  "t",
                  shape === "i-beam" || shape === "channel"
                    ? "Web thickness (mm)"
                    : "Wall / leg thickness (mm)",
                ],
                ...(shape === "i-beam" || shape === "channel"
                  ? [["tf", "Flange thickness (mm)"] as [Field, string]]
                  : []),
              ];
  const control =
    "mt-[4px] w-full rounded-control border border-border-default bg-white px-[12px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
  const labelText = "block font-mono text-f12 uppercase tracking-[0.06em] text-t3";
  const stepText = "block text-f16 font-bold text-t1";
  const field = ([key, label]: [Field, string]) => (
    <label key={key} htmlFor={`density-${key}`} className="block">
      <span className={labelText}>{label}</span>
      <input
        id={`density-${key}`}
        type="number"
        inputMode={key === "quantity" ? "numeric" : "decimal"}
        min={key === "quantity" ? "1" : "0"}
        step={key === "quantity" ? "1" : "any"}
        value={values[key]}
        onChange={(e) => setValues({ ...values, [key]: e.target.value })}
        className={control}
      />
    </label>
  );
  const summary = !result.error
    ? `${shapes[shape]}; ${dimensions.map(([key, label]) => `${label}: ${values[key]}`).join("; ")}. Length: ${values.length} m; quantity: ${values.quantity}. Density: ${fmt(result.densityKg!, 0)} kg/m³ (${mode === "density" ? `inferred from one sample weighing ${values.mass} kg` : mode === "recipe" ? `theoretical formulation estimate; ${voids}% void volume` : mode === "layup" ? `layup volume-balance estimate; ${layupVoids}% void volume` : "assumed input"}). Estimated mass: ${fmt(result.kgPerM!)} kg/m; ${fmt(result.totalKg!, 2)} kg total. Please confirm profile dimensions, laminate density and quotation. Destination: [...].`
    : "";
  return (
    <>
        <div className="mb-[12px] flex justify-end">
          <button
            type="button"
            onClick={() => {
              setValues(defaults);
              setShape("rect-tube");
              setMode("layup");
              setLayers(exampleLayers);
              setRovings(exampleRovings);
              setMatrix("1.2");
              setLayupVoids("0");
              setRows(exampleRecipe);
              setBasis("weight");
              setVoids("0");
              setUnit("g/cm³");
              setMassUnit("kg/m");
            }}
            className="rounded-control border border-border-default bg-white px-[16px] py-[8px] text-f14 font-semibold text-t1 transition-colors hover:border-teal-border hover:text-teal-text"
          >
            Reset example
          </button>
        </div>
        <div className="grid gap-[24px] lg:grid-cols-[1.25fr_1fr]">
          <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
            <fieldset>
              <legend className="mb-[12px] text-f16 font-bold text-t1">
                1. What do you want to calculate?
              </legend>
              <div className="grid gap-[8px] sm:grid-cols-2">
                {(
                  [
                    ["layup", "Density from reinforcement layup"],
                    ["recipe", "Density from formulation"],
                    ["weight", "Weight from density"],
                    ["density", "Density from sample mass"],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center gap-[8px] rounded-control border p-[12px] text-f14 font-semibold ${mode === value ? "border-teal bg-teal-bg text-teal-text" : "border-border-default bg-white text-t2"}`}
                  >
                    <input
                      type="radio"
                      name="density-mode"
                      checked={mode === value}
                      onChange={() => setMode(value)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            {mode === "recipe" && (
              <RecipeFields
                rows={rows}
                basis={basis}
                voids={voids}
                onRows={setRows}
                onBasis={setBasis}
                onVoids={setVoids}
              />
            )}
            <label className="mt-[24px] block" htmlFor="density-shape">
              <span className={stepText}>2. Profile cross-section</span>
              <select
                id="density-shape"
                value={shape}
                onChange={(e) => setShape(e.target.value as DensityShape)}
                className={control}
              >
                {Object.entries(shapes).map(([value, name]) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-[20px] grid gap-[16px] sm:grid-cols-2">
              {dimensions.map(field)}
            </div>
            <p className="mt-[12px] text-f12 leading-relaxed text-t3">
              Use actual dimensions in mm. Ideal sections exclude corner radii,
              coatings and fittings. For complex profiles, enter the net area
              from CAD.
            </p>
            {mode === "layup" && (
              <LayupFields
                layers={layers}
                rovings={rovings}
                matrix={matrix}
                voids={layupVoids}
                perimeters={perimeters}
                onLayers={setLayers}
                onRovings={setRovings}
                onMatrix={setMatrix}
                onVoids={setLayupVoids}
              />
            )}
            <fieldset className="mt-[24px]">
              <legend className="text-f16 font-bold text-t1">
                3.{" "}
                {mode === "density" ? "Sample & quantity" : "Material & order"}
              </legend>
              <div className="mt-[12px] grid gap-[16px] sm:grid-cols-2">
                {mode === "weight" ? (
                  <>
                    {field(["density", `Material density (${unit})`])}
                    <label htmlFor="density-unit" className="block">
                      <span className={labelText}>Density unit</span>
                      <select
                        id="density-unit"
                        value={unit}
                        onChange={(e) => {
                          const next = e.target.value as DensityUnit;
                          setValues({
                            ...values,
                            density:
                              values.density === ""
                                ? ""
                                : String(
                                    Number(
                                      (
                                        (Number(values.density) *
                                          densityFactors[unit]) /
                                        densityFactors[next]
                                      ).toPrecision(12),
                                    ),
                                  ),
                          });
                          setUnit(next);
                        }}
                        className={control}
                      >
                        {Object.keys(densityFactors).map((u) => (
                          <option key={u}>{u}</option>
                        ))}
                      </select>
                    </label>
                  </>
                ) : mode === "density" ? (
                  field(["mass", "Measured mass of ONE sample (kg)"])
                ) : null}
                {field([
                  "length",
                  mode === "density"
                    ? "Measured sample length (m)"
                    : "Length per piece (m)",
                ])}
                {field(["quantity", "Number of identical pieces"])}
              </div>
            </fieldset>
            <p className="mt-[12px] text-f12 leading-relaxed text-t3">
              {mode === "weight"
                ? "1.9 g/cm³ is an editable estimating assumption. Use your supplier’s laminate density for purchasing."
                : mode === "recipe"
                  ? "The formulation density above feeds directly into profile weight. Adjust section dimensions and quantity below."
                  : mode === "layup"
                    ? "Density and weight are calculated from retained reinforcement mass and residual matrix volume."
                    : "Weigh the bare profile without packaging or fittings. Quantity scales total mass only; it does not change inferred density."}
            </p>
          </div>
          <div
            id="material-results"
            className="scroll-mt-[96px] rounded-card border border-border-default bg-bg2 p-[20px]"
          >
            <SectionSketch shape={shape} />
            <p className="text-center text-f12 text-t3">
              Shaded = net material area · schematic only
            </p>
            <div className="lg:sticky lg:top-[112px]">
              {mode === "layup" && (
                <DensityPlayground
                  result={geometry.error ? { error: geometry.error } : layup}
                  area={geometry.area ?? 0}
                  layers={layers}
                  rovings={rovings}
                  voids={layupVoids}
                  onLayers={setLayers}
                  onRovings={setRovings}
                  onVoids={setLayupVoids}
                />
              )}
              <div aria-live="polite" aria-atomic="true" className="mt-[24px]">
                {result.error ? (
                  <p
                    role="alert"
                    className="rounded-control border border-fail-border bg-fail-bg p-[12px] text-f14 text-fail"
                  >
                    {result.error}
                  </p>
                ) : (
                  <>
                    <div className="rounded-control border border-teal-border bg-teal-bg p-[16px]">
                      <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">
                        {mode === "layup"
                          ? "Layup-derived density · volume balance"
                          : mode === "recipe"
                            ? "Formulation density · with entered voids"
                            : mode === "weight"
                              ? "Estimated mass per meter"
                              : "Inferred material density"}
                      </p>
                      <p className="mt-[4px] break-words text-f32 font-bold tabular-nums text-t1">
                        {fmt(
                          mode === "weight"
                            ? result.kgPerM!
                            : result.densityKg! / 1000,
                        )}{" "}
                        <span className="text-f18 font-normal text-t2">
                          {mode === "weight" ? "kg/m" : "g/cm³"}
                        </span>
                      </p>
                      <p className="mt-[4px] text-f14 text-t2">
                        {fmt(result.densityKg!, 0)} kg/m³ ·{" "}
                        {fmt(result.densityKg! / densityFactors["lb/in³"])}{" "}
                        lb/in³
                      </p>
                    </div>
                    {mode === "recipe" && !mixture.error && (
                      <div className="mt-[12px] rounded-control bg-white p-[12px] text-f14 text-t2">
                        <p>
                          Void-free theoretical density:{" "}
                          <strong>{fmt(mixture.theoretical!)} g/cm³</strong>
                        </p>
                        <p className="mt-[8px]">
                          Entered void volume: <strong>{voids}%</strong>
                        </p>
                        <p className="mt-[8px]">
                          Model estimate using constituent densities and
                          additive volumes. Actual production density requires
                          measurement.
                        </p>
                        <details className="mt-[12px]">
                          <summary className="cursor-pointer font-semibold text-teal-text">
                            Weight / solid volume breakdown
                          </summary>
                          <ul className="mt-[8px] space-y-[8px]">
                            {mixture.fractions!.map((row, index) => (
                              <li key={index}>
                                {row.name}: {fmt(row.weightPercent, 1)} wt% ·{" "}
                                {fmt(row.solidVolumePercent, 1)} vol%
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    )}
                    {mode === "layup" && !layup.error && (
                      <div className="mt-[12px] rounded-control bg-white p-[12px] text-f14 text-t2">
                        <p>
                          Retained reinforcement:{" "}
                          <strong>{fmt(layup.reinforcementGrams!, 1)} g/m</strong>{" "}
                          · {fmt(layup.reinforcementWeightPercent!, 1)} wt%
                        </p>
                        <p className="mt-[8px]">
                          Reinforcement volume:{" "}
                          {fmt(layup.reinforcementVolumePercent!, 1)}% · voids:{" "}
                          {layupVoids}%
                        </p>
                        <p className="mt-[8px]">
                          Remaining matrix: {fmt(layup.matrixArea!, 1)} mm² ·{" "}
                          {fmt(layup.matrixGrams!, 1)} g/m
                        </p>
                        <details className="mt-[12px]">
                          <summary className="cursor-pointer font-semibold text-teal-text">
                            Per-layer mass & occupied area
                          </summary>
                          <ul className="mt-[8px] space-y-[8px]">
                            {layup.breakdown!.map((row, index) => (
                              <li key={index}>
                                {row.name}: {fmt(row.grams, 1)} g/m ·{" "}
                                {fmt(row.area, 1)} mm²
                                {row.width !== undefined && (
                                  <> · {fmt(row.width, 1)} mm retained width/ply</>
                                )}
                              </li>
                            ))}
                          </ul>
                        </details>
                        <p className="mt-[12px] text-f12">
                          A positive resin remainder is a volume balance, not
                          proof that the proposed reinforcement can be packed,
                          wetted or pultruded. Verify real layer paths and
                          production data.
                        </p>
                      </div>
                    )}
                    <div className="mt-[12px] rounded-control bg-white p-[12px]">
                      <label
                        htmlFor="weight-per-meter-unit"
                        className="flex flex-wrap items-center justify-between gap-[8px] font-mono text-f12 uppercase tracking-[0.06em] text-t3"
                      >
                        Weight per meter / unit length
                        <select
                          id="weight-per-meter-unit"
                          value={massUnit}
                          onChange={(e) =>
                            setMassUnit(
                              e.target
                                .value as keyof typeof weightPerMeterFactors,
                            )
                          }
                          className="rounded-control border border-border-default bg-white px-[8px] py-[4px] font-sans text-f14 normal-case tracking-normal text-t1"
                        >
                          {Object.keys(weightPerMeterFactors).map((u) => (
                            <option key={u}>{u}</option>
                          ))}
                        </select>
                      </label>
                      <p className="mt-[4px] break-words text-f24 font-bold tabular-nums text-t1">
                        {fmt(result.kgPerM! * weightPerMeterFactors[massUnit])}{" "}
                        <span className="text-f16">{massUnit}</span>
                      </p>
                      <p className="mt-[4px] text-f12 text-t3">
                        Weight per meter = net area × material density. Changing
                        display units preserves the same profile.
                      </p>
                    </div>
                    <dl className="mt-[20px] grid grid-cols-2 gap-[16px]">
                      {[
                        ["Net section area", `${fmt(result.area!, 1)} mm²`],
                        ["Weight per meter", `${fmt(result.kgPerM!)} kg/m`],
                        ["Mass per piece", `${fmt(result.pieceKg!, 2)} kg`],
                        ["Total profile mass", `${fmt(result.totalKg!, 2)} kg`],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-control bg-white p-[12px]">
                          <dt className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{label}</dt>
                          <dd className="mt-[4px] break-words text-f18 font-bold text-t1">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-[16px] text-f12 leading-relaxed text-t3">
                      Net profile mass only. Packaging, pallets, fasteners, cut
                      waste and manufacturing tolerances are excluded.
                      Sample-derived density is a geometric estimate, not a
                      laboratory test result.
                    </p>
                    {(result.densityKg! < 1700 || result.densityKg! > 2100) && (
                      <p className="mt-[12px] rounded-control border border-warn-border bg-warn-bg p-[12px] text-f14 text-warn">
                        This density is outside the 1.7–2.1 g/cm³ estimating
                        range used here for pultruded glass-fiber profiles.
                        Check units, hollow area and laminate data; other FRP
                        materials can differ.
                      </p>
                    )}
                  </>
                )}
              </div>
              {!result.error && (
                <Link
                  href={`/contact?${new URLSearchParams({ source: "frp-density-calculator", inquiry_type: "rfq", message: summary })}`}
                  className="mt-[20px] flex min-h-[46px] w-full items-center justify-center rounded-control bg-teal-text px-[22px] py-[11px] text-f14 font-bold text-white transition-colors hover:bg-teal"
                >
                  Request a quote with these results
                </Link>
              )}
              <p className="mt-[12px] text-center text-f12 text-t3">
                Section inputs and results are carried into the inquiry form.
                Formulation ingredient details are not included.
              </p>
            </div>
          </div>
        </div>
      <div data-page-bottom-bar className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-[12px] border-t border-border-default bg-white px-[16px] py-[12px] shadow-card lg:hidden">
        <div className="text-f14 text-t1" aria-live="polite">
          {result.error ? (
            "Check calculation inputs"
          ) : (
            <>
              <strong>{fmt(result.kgPerM!)} kg/m</strong>
              <span className="ml-[12px] text-f12 text-t2">
                {fmt(result.densityKg! / 1000)} g/cm³
              </span>
            </>
          )}
        </div>
        <a
          href="#material-results"
          className="shrink-0 rounded-control bg-teal-text px-[12px] py-[8px] text-f12 font-semibold text-white"
        >
          Results & sliders
        </a>
      </div>
    </>
  );
}
