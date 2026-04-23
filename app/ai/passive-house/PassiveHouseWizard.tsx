"use client";

import { useState } from "react";

type Climate = "arctic" | "cold" | "cool" | "warm" | "hot" | "";
type WindowType = "casement" | "tilt-turn" | "sliding" | "fixed-facade" | "";

const climateOptions: Array<{ value: Climate; label: string; help: string }> = [
  { value: "arctic", label: "Arctic (phA)", help: "−40 °C design low — Scandinavia, N. Canada, Antarctica, Tibet" },
  { value: "cold", label: "Cold (phB)", help: "−16 °C design low — Germany, Poland, N. China, UK" },
  { value: "cool", label: "Cool-temperate (phC)", help: "−8 °C design low — Netherlands, N. US, Japan, S. China" },
  { value: "warm", label: "Warm-temperate (phD)", help: "Mild — S. Europe, Spain, Mediterranean, S. US" },
  { value: "hot", label: "Hot (phE/F)", help: "Middle East, tropical SE Asia, N. Australia" },
];

const typeOptions: Array<{ value: WindowType; label: string; seriesFit: string }> = [
  { value: "casement", label: "Casement (inward / outward)", seriesFit: "65 / 70 / 80 / 90" },
  { value: "tilt-turn", label: "Tilt-turn", seriesFit: "80 / 90 / 140" },
  { value: "sliding", label: "Sliding / lift-slide", seriesFit: "90 / 140" },
  { value: "fixed-facade", label: "Fixed facade / curtain wall", seriesFit: "90 series frames" },
];

export default function PassiveHouseWizard() {
  const [climate, setClimate] = useState<Climate>("");
  const [windowType, setWindowType] = useState<WindowType>("");
  const [targetU, setTargetU] = useState("0.8");
  const [units, setUnits] = useState("");

  const canLaunch = climate && windowType && targetU;

  const launch = () => {
    const climateLabel = climateOptions.find((c) => c.value === climate)?.label ?? "";
    const typeLabel = typeOptions.find((t) => t.value === windowType)?.label ?? "";
    const prompt = `[Passive House Selector] I'm specifying Passive House fenestration with these requirements:

- Climate class: ${climateLabel}
- Window type: ${typeLabel}
- Target U_w: ${targetU} W/m²K
- Project size: ${units || "not yet determined"} units

Please recommend the appropriate F1 Composite FRP series (65 / 70 / 80 / 90 / 140) with justification, explain the relevant PHI Component-ID 2491wi03 (phA arctic) certification, reference one of our comparable delivered projects, and outline the quote + lead-time path for my region.`;
    window.location.href = `/ask?prefill=${encodeURIComponent(prompt)}`;
  };

  const selectedType = typeOptions.find((t) => t.value === windowType);

  return (
    <div className="mt-[34px] rounded-[12px] border border-border-default bg-white p-[21px] shadow-sm">
      <div className="grid gap-[21px]">
        {/* Climate */}
        <div>
          <label className="block text-f13 font-bold uppercase tracking-[2px] text-t3">
            1. Climate class (PHI)
          </label>
          <div className="mt-[8px] grid gap-[5px] sm:grid-cols-2 lg:grid-cols-5">
            {climateOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setClimate(opt.value)}
                className={`rounded-[6px] border px-[13px] py-[10px] text-left transition-colors ${
                  climate === opt.value
                    ? "border-teal bg-teal-bg"
                    : "border-border-default bg-white hover:border-teal"
                }`}
              >
                <div className="text-f13 font-bold text-t1">{opt.label}</div>
                <div className="text-f11 leading-golden text-t3">{opt.help}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Window type */}
        <div>
          <label className="block text-f13 font-bold uppercase tracking-[2px] text-t3">
            2. Window type
          </label>
          <div className="mt-[8px] grid gap-[5px] sm:grid-cols-2">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setWindowType(opt.value)}
                className={`rounded-[6px] border px-[13px] py-[10px] text-left transition-colors ${
                  windowType === opt.value
                    ? "border-teal bg-teal-bg"
                    : "border-border-default bg-white hover:border-teal"
                }`}
              >
                <div className="text-f13 font-bold text-t1">{opt.label}</div>
                <div className="text-f11 text-t3">Series: {opt.seriesFit}</div>
              </button>
            ))}
          </div>
          {selectedType && (
            <p className="mt-[8px] text-f11 text-t3">
              F1 recommends {selectedType.seriesFit} for {selectedType.label.toLowerCase()}.
            </p>
          )}
        </div>

        {/* Target U-value + units */}
        <div className="grid gap-[13px] sm:grid-cols-2">
          <div>
            <label className="block text-f13 font-bold uppercase tracking-[2px] text-t3">
              3. Target U_w (W/m²K)
            </label>
            <input
              type="number"
              step="0.1"
              value={targetU}
              onChange={(e) => setTargetU(e.target.value)}
              className="mt-[8px] w-full rounded-[6px] border border-border-default bg-white px-[13px] py-[10px] text-f13 outline-none focus:border-teal"
            />
            <p className="mt-[4px] text-f11 text-t3">
              Passivhaus reqs: typically ≤0.8 (cold) / ≤1.0 (cool-temperate). Chinese JGJ 75: ≤1.6.
            </p>
          </div>
          <div>
            <label className="block text-f13 font-bold uppercase tracking-[2px] text-t3">
              4. Project size (units)
            </label>
            <input
              type="text"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="e.g. 200, or 'not yet'"
              className="mt-[8px] w-full rounded-[6px] border border-border-default bg-white px-[13px] py-[10px] text-f13 outline-none focus:border-teal"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={launch}
          disabled={!canLaunch}
          className="rounded-[8px] bg-teal px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text disabled:cursor-not-allowed disabled:opacity-40"
        >
          Get AI-matched FRP series →
        </button>
      </div>
    </div>
  );
}
