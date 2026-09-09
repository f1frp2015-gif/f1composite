"use client";

import { useId, useState } from "react";
import {
  calculateBeamBridge,
  DEFAULT_BEAM_BRIDGE_INPUTS,
  getBeamBridgeInputError,
  type BeamBridgeInputs,
  type BeamBridgeResult,
} from "@/lib/engineering/beam-bridge";

const fields = [
  ["spanM", "Support span L", "m", 0.1, "any"],
  ["widthM", "Loaded deck width b", "m", 0.1, "any"],
  ["girderCount", "Identical girders n", "no.", 1, 1],
  ["permanentLoadKNm2", "Permanent load g", "kN/m²", 0, "any"],
  ["variableLoadKNm2", "Variable load q", "kN/m²", 0, "any"],
  ["longitudinalModulusGPa", "Longitudinal modulus E", "GPa", 0.1, "any"],
  ["secondMomentMm4", "Single-girder inertia I", "×10⁶ mm⁴", 0.1, "any"],
  ["deflectionLimitDenominator", "Reference deflection L /", "ratio", 1, "any"],
] as const;

type FieldKey = keyof BeamBridgeInputs;
function initialValues(): Record<FieldKey, string> {
  return Object.fromEntries(
    fields.map(([key]) => [
      key,
      String(
        DEFAULT_BEAM_BRIDGE_INPUTS[key] / (key === "secondMomentMm4" ? 1e6 : 1),
      ),
    ]),
  ) as Record<FieldKey, string>;
}
const f = (value: number, digits = 2) =>
  Math.abs(value) >= 1e9
    ? value.toExponential(2)
    : value.toLocaleString("en-US", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      });

export default function BeamExplorer() {
  const id = useId();
  const [values, setValues] = useState(initialValues);
  const input = Object.fromEntries(
    fields.map(([key]) => [
      key,
      values[key].trim() === ""
        ? NaN
        : Number(values[key]) * (key === "secondMomentMm4" ? 1e6 : 1),
    ]),
  ) as BeamBridgeInputs;
  let error = getBeamBridgeInputError(input);
  let result: BeamBridgeResult | null = null;
  let comparison: Array<{ spanM: number; result: BeamBridgeResult }> = [];
  try {
    if (!error) {
      result = calculateBeamBridge(input);
      comparison = [4, 6, 12].map((spanM) => ({
        spanM,
        result: calculateBeamBridge({ ...input, spanM }),
      }));
    }
  } catch (caught) {
    result = null;
    comparison = [];
    error =
      caught instanceof Error ? caught.message : "Check the input values.";
  }
  const maxI = Math.max(
    ...comparison.map((item) => item.result.requiredSecondMomentMm4),
    1,
  );

  return (
    <div className="bb-explorer">
      <div className="bb-explorer-top">
        <div>
          <span className="bb-live-dot" /> LIVE WORKED EXAMPLE
        </div>
        <button
          type="button"
          className="bb-reset"
          onClick={() => setValues(initialValues())}
        >
          Reset example ↺
        </button>
      </div>
      <div className="bb-explorer-layout">
        <div className="bb-inputs">
          <h3>Define one supported span.</h3>
          <p className="bb-small">
            Illustrative service loads and properties. Replace every assumption
            with project data.
          </p>
          <div
            className="bb-presets"
            role="group"
            aria-label="Example support spans"
          >
            {[4, 6, 12].map((span) => (
              <button
                type="button"
                aria-pressed={input.spanM === span}
                key={span}
                onClick={() => setValues({ ...values, spanM: String(span) })}
              >
                {span} m span
              </button>
            ))}
          </div>
          <div className="bb-field-grid">
            {fields.map(([key, label, unit, min, step]) => (
              <label className="bb-field" key={key} htmlFor={`${id}-${key}`}>
                <span>{label}</span>
                <div>
                  <input
                    id={`${id}-${key}`}
                    type="number"
                    min={min}
                    step={step}
                    value={values[key]}
                    inputMode="decimal"
                    aria-describedby={`${id}-basis${error ? ` ${id}-error` : ""}`}
                    onChange={(event) =>
                      setValues({ ...values, [key]: event.target.value })
                    }
                  />
                  <span>{unit}</span>
                </div>
              </label>
            ))}
          </div>
          <p className="bb-small" id={`${id}-basis`}>
            g includes all permanent weight, including girders, deck and
            finishes, spread over the loaded area. b is the loaded width; it is
            not automatically the clear width between barriers.
          </p>
          {error && (
            <p id={`${id}-error`} role="alert" className="bb-input-error">
              {error}
            </p>
          )}
        </div>
        <div className="bb-calc-output" aria-live="polite" aria-atomic="true">
          {result ? (
            <>
              <div className="bb-calc-model">
                <svg
                  viewBox="0 0 520 135"
                  role="img"
                  aria-label={`Simply supported girder under uniform load, span ${input.spanM} metres. Pin at left, roller at right.`}
                >
                  <path d="M45 30H475" stroke="#477ed6" fill="none" />
                  {Array.from({ length: 12 }, (_, i) => (
                    <g key={i} stroke="#477ed6" fill="none">
                      <path d={`M${45 + i * 39} 30v31m-4-5 4 5 4-5`} />
                    </g>
                  ))}
                  <path d="M45 70H475" stroke="#132e59" strokeWidth="8" />
                  <path
                    d="m45 76-11 19h22Zm430 0-11 19h22Z"
                    fill="#fff"
                    stroke="#132e59"
                    strokeWidth="2"
                  />
                  <path d="M30 101h30m400 4h30" stroke="#132e59" />
                  <circle
                    cx="470"
                    cy="100"
                    r="3"
                    fill="none"
                    stroke="#132e59"
                  />
                  <circle
                    cx="481"
                    cy="100"
                    r="3"
                    fill="none"
                    stroke="#132e59"
                  />
                  <path
                    d="M60 120H460m-6-4 6 4-6 4M66 116l-6 4 6 4"
                    stroke="#8191a9"
                    fill="none"
                  />
                  <text
                    x="260"
                    y="17"
                    textAnchor="middle"
                    fill="#285ab5"
                    fontSize="16"
                  >
                    w = {f(result.perGirderLineLoadKNm)} kN/m per girder
                  </text>
                  <rect x="212" y="109" width="96" height="24" fill="#f5f8fd" />
                  <text
                    x="260"
                    y="128"
                    textAnchor="middle"
                    fill="#132e59"
                    fontSize="16"
                  >
                    L = {f(input.spanM, 1)} m
                  </text>
                </svg>
              </div>
              <ol className="bb-equations">
                <li>
                  <span>01</span>
                  <div>
                    <h4>Area load → girder load</h4>
                    <p>w = (g + q) × b / n</p>
                    <small>
                      ({f(input.permanentLoadKNm2)} +{" "}
                      {f(input.variableLoadKNm2)}) × {f(input.widthM)} /{" "}
                      {input.girderCount} ={" "}
                      <strong>{f(result.perGirderLineLoadKNm)} kN/m</strong>
                    </small>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h4>Load → bending and reaction</h4>
                    <p>
                      M<sub>max</sub> = wL² / 8{" "}
                      <b>{f(result.perGirderMaxMomentKNm)} kN·m</b>
                    </p>
                    <small>
                      R = V<sub>max</sub> = wL / 2 ={" "}
                      <strong>
                        {f(result.perGirderEndReactionKN)} kN per girder, at
                        each end
                      </strong>
                    </small>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h4>Stiffness → bending deflection</h4>
                    <p>
                      δ<sub>b</sub> = 5wL⁴ / (384EI){" "}
                      <b>{f(result.bendingDeflectionMm)} mm</b>
                    </p>
                    <small>
                      Use w = {f(result.perGirderLineLoadNmm)} N/mm, L ={" "}
                      {f(result.spanMm, 0)} mm, E = {f(result.modulusMPa, 0)}{" "}
                      N/mm² and I = {f(input.secondMomentMm4, 0)} mm⁴.
                    </small>
                  </div>
                </li>
              </ol>
              <div className="bb-reference-result">
                <span>
                  Bending-only I for the chosen L/
                  {input.deflectionLimitDenominator} reference
                </span>
                <strong>
                  {f(result.requiredSecondMomentMm4 / 1e6)}{" "}
                  <small>×10⁶ mm⁴ / girder</small>
                </strong>
                <p>
                  δ<sub>ref</sub> = {f(result.referenceDeflectionMm)} mm · I
                  <sub>req</sub> = 5wL⁴ / (384Eδ<sub>ref</sub>)
                </p>
              </div>
              {result.bendingDeflectionMm / result.spanMm > 0.01 && (
                <p className="bb-calc-caution">
                  Large movement relative to span: use this linear result to
                  understand sensitivity. Reassess stiffness and model
                  assumptions before applying it to a bridge.
                </p>
              )}
            </>
          ) : (
            <div className="bb-empty-result">
              Enter valid values to show the calculation. Results are withheld
              while an input is incomplete.
            </div>
          )}
        </div>
      </div>
      <div className="bb-span-comparison">
        <div>
          <p className="bb-eyebrow">THE SPAN EFFECT</p>
          <h3>Same section. Very different demand.</h3>
          <p className="bb-small">
            Hold loads, E, I and girder count fixed. Each row models an
            independent simple span.
          </p>
          <p className="bb-small bb-model-note">
            Bending-only, small-deflection theory. A large result signals a need
            to reassess the section and model; it is not a usable bridge
            deflection prediction.
          </p>
        </div>
        <div
          className="bb-comparison-rows"
          aria-label="Bending stiffness demand by support span"
        >
          {comparison.map(({ spanM, result: item }) => (
            <div className="bb-comparison-row" key={spanM}>
              <strong>{spanM} m</strong>
              <div>
                <div className="bb-comparison-track">
                  <span
                    style={{
                      width: `${(item.requiredSecondMomentMm4 / maxI) * 100}%`,
                    }}
                  />
                </div>
                <span>
                  I<sub>req</sub> {f(item.requiredSecondMomentMm4 / 1e6)} ×10⁶
                  mm⁴
                </span>
              </div>
              <span>
                δ<sub>b</sub> {f(item.bendingDeflectionMm)} mm
              </span>
            </div>
          ))}
          <p className="bb-small">
            4 → 12 m:{" "}
            <strong>
              9× bending moment · 81× bending deflection · 27× required I
            </strong>{" "}
            for the same L/ratio reference and nonzero load.
          </p>
        </div>
      </div>
      <details className="bb-method-details">
        <summary>
          Model assumptions, units and limits <span aria-hidden="true">+</span>
        </summary>
        <div>
          <p>
            One straight, prismatic, simply supported girder; full-span uniform
            service load; short-term, linear elastic bending. Identical girders
            share the total deck load equally. This does not analyse transverse
            distribution, continuous spans or the curved and multicell concepts
            above. E and I belong to one girder; no composite deck action is
            assumed.
          </p>
          <p>
            1 kN/m = 1 N/mm; 1 GPa = 1,000 N/mm². Reactions shown are at one end
            of one girder. An interior support carrying two separate simple
            spans receives both adjacent end reactions. For a whole-span
            support, sum the reactions of all girders.
          </p>
          <p>
            Shear deformation, creep and connection slip add movement and are
            excluded. The L/300 default is an illustrative reference, not a
            governing bridge criterion. Strength, buckling, vibration, fatigue,
            concentrated loads, barriers, bearings and foundations remain
            separate checks. This tool does not validate the 250 mm or 970 mm
            concept sections.
          </p>
        </div>
      </details>
    </div>
  );
}
