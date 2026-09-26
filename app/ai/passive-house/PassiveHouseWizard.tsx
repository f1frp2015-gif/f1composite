"use client";

import { useState } from "react";

type Climate = "arctic" | "cold" | "cool" | "warm" | "hot" | "";
type WindowType = "casement" | "tilt-turn" | "sliding" | "compression-seal" | "fixed-facade" | "";

const climateOptions: Array<{ value: Climate; label: string; help: string }> = [
  { value: "arctic", label: "Arctic", help: "−40 °C design low — Scandinavia, N. Canada, Antarctica, Tibet" },
  { value: "cold", label: "Cold", help: "−16 °C design low — Germany, Poland, N. China, UK" },
  { value: "cool", label: "Cool-temperate", help: "−8 °C design low — Netherlands, N. US, Japan, S. China" },
  { value: "warm", label: "Warm-temperate", help: "Mild — S. Europe, Spain, Mediterranean, S. US" },
  { value: "hot", label: "Hot", help: "Middle East, tropical SE Asia, N. Australia" },
];

const typeOptions: Array<{ value: WindowType; label: string; seriesFit: string }> = [
  { value: "casement", label: "Casement — direction depends on series", seriesFit: "50 / 55 / 60 / 65 / 70 / 80 / 90 casement" },
  { value: "tilt-turn", label: "Tilt-turn", seriesFit: "50 / 55 / 60 / 65 / 70 / 80 / 90 casement" },
  { value: "sliding", label: "Sliding window", seriesFit: "90 sliding" },
  { value: "compression-seal", label: "Compression-seal sliding door", seriesFit: "140" },
  { value: "fixed-facade", label: "Fixed window combination", seriesFit: "confirm the proposed combination" },
];

export default function PassiveHouseWizard({ embedded = false }: { embedded?: boolean }) {
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

Please shortlist an appropriate F1 Composite series (50, 55, 60, 65, 70, 80, 90 casement, 90 sliding, or 140 compression-seal sliding) against the opening and project requirements. Distinguish profile supply from finished units. PHI Component-ID 2491wi03 covers the stated Fengdu Passive GFRP 90 Series configuration only: phB, cool-temperate, Uw 0.78 with Ug 0.70 W/(m²·K). Do not extend that certificate to other configurations or apply the historical Intertek lift-sliding report to the current 140 compression-seal door. Identify missing dimensions, glazing and evidence before proposing a quote or lead time.`;
    const advisorUrl = `/ask?prefill=${encodeURIComponent(prompt)}`;
    if (embedded) {
      window.open(advisorUrl, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = advisorUrl;
  };

  const selectedType = typeOptions.find((t) => t.value === windowType);

  return (
    <div className="mt-[34px] rounded-card border border-border-default bg-white p-[21px] shadow-card">
      <div className="grid gap-[21px]">
        {/* Climate */}
        <div>
          <label className="block text-f14 font-bold uppercase tracking-[2px] text-t3">
            1. Climate class (PHI)
          </label>
          <div className="mt-[8px] grid gap-[5px] sm:grid-cols-2 lg:grid-cols-5">
            {climateOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setClimate(opt.value)}
                className={`rounded-control border px-[13px] py-[10px] text-left transition-colors ${
                  climate === opt.value
                    ? "border-teal bg-teal-bg"
                    : "border-border-default bg-white hover:border-teal"
                }`}
              >
                <div className="text-f14 font-bold text-t1">{opt.label}</div>
                <div className="text-f12 leading-golden text-t3">{opt.help}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Window type */}
        <div>
          <label className="block text-f14 font-bold uppercase tracking-[2px] text-t3">
            2. Window type
          </label>
          <div className="mt-[8px] grid gap-[5px] sm:grid-cols-2">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setWindowType(opt.value)}
                className={`rounded-control border px-[13px] py-[10px] text-left transition-colors ${
                  windowType === opt.value
                    ? "border-teal bg-teal-bg"
                    : "border-border-default bg-white hover:border-teal"
                }`}
              >
                <div className="text-f14 font-bold text-t1">{opt.label}</div>
                <div className="text-f12 text-t3">Series: {opt.seriesFit}</div>
              </button>
            ))}
          </div>
          {selectedType && (
            <p className="mt-[8px] text-f12 text-t3">
              Initial series shortlist: {selectedType.seriesFit}. Confirm opening, glazing and hardware against the project requirements.
            </p>
          )}
        </div>

        {/* Target U-value + units */}
        <div className="grid gap-[13px] sm:grid-cols-2">
          <div>
            <label className="block text-f14 font-bold uppercase tracking-[2px] text-t3">
              3. Target U_w (W/m²K)
            </label>
            <input
              type="number"
              step="0.1"
              value={targetU}
              onChange={(e) => setTargetU(e.target.value)}
              className="mt-[8px] w-full rounded-control border border-border-default bg-white px-[13px] py-[10px] text-f14 outline-none focus:border-teal"
            />
            <p className="mt-[4px] text-f12 text-t3">
              Enter the project target. Whole-window performance depends on dimensions, glazing, spacer and frame configuration.
            </p>
          </div>
          <div>
            <label className="block text-f14 font-bold uppercase tracking-[2px] text-t3">
              4. Project size (units)
            </label>
            <input
              type="text"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="e.g. 200, or 'not yet'"
              className="mt-[8px] w-full rounded-control border border-border-default bg-white px-[13px] py-[10px] text-f14 outline-none focus:border-teal"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={launch}
          disabled={!canLaunch}
          className="rounded-card bg-teal px-[21px] py-[13px] text-f14 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text disabled:cursor-not-allowed disabled:opacity-40"
        >
          Get AI-matched FRP series →
        </button>
      </div>
    </div>
  );
}
