"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@/components/calculators/leadCapture";
import { buildRfqHref } from "@/lib/rfq";
import { buildToolStateHref, readToolStateParams } from "@/lib/toolStateUrl";
import {
  SEALANT_CLASSES,
  THERMAL_MATERIALS,
  calculateThermalMovement,
  thermalMovementError,
} from "@/lib/thermalMovement";

type Preset = {
  id: string;
  label: string;
  member: string;
  substrate: string;
  lengthMm: number;
  installC: number;
  minC: number;
  maxC: number;
  href: string;
  product: string;
};

// Member temperatures, not air temperatures: a dark profile in full sun runs
// well above the shade temperature, so the outdoor presets use a wide range.
const PRESETS: Preset[] = [
  { id: "handrail", label: "Handrail run on a steel platform", member: "gfrp-pultruded-longitudinal", substrate: "steel-carbon", lengthMm: 6000, installC: 15, minC: -20, maxC: 60, href: "/products/frp-handrail-systems", product: "FRP handrail systems" },
  { id: "cable-tray", label: "Cable tray run, outdoor", member: "gfrp-pultruded-longitudinal", substrate: "concrete", lengthMm: 30000, installC: 20, minC: -15, maxC: 65, href: "/applications/frp-cable-tray-supports", product: "FRP cable tray supports" },
  { id: "window", label: "Window frame head vs glass", member: "gfrp-pultruded-longitudinal", substrate: "glass-soda-lime", lengthMm: 2400, installC: 20, minC: -20, maxC: 70, href: "/products/frp-window-frames", product: "FRP window frames" },
  { id: "solar", label: "Solar purlin on a steel frame", member: "gfrp-pultruded-longitudinal", substrate: "steel-carbon", lengthMm: 12000, installC: 20, minC: -10, maxC: 75, href: "/products/frp-solar-mounting-systems", product: "FRP solar mounting systems" },
  { id: "pvc-compare", label: "PVC-U frame for comparison", member: "pvc-u", substrate: "glass-soda-lime", lengthMm: 2400, installC: 20, minC: -20, maxC: 70, href: "/technology/frp-vs-pvc-windows", product: "FRP vs PVC windows" },
];

const inputClass = "w-full rounded-control border border-border-default bg-white px-[13px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
const labelClass = "mb-[5px] block text-f12 font-bold uppercase tracking-[0.06em] text-t3";

const mm = (value: number) => `${value.toFixed(value < 10 ? 2 : 1)} mm`;

export default function ThermalExpansionCalculator() {
  const [member, setMember] = useState("gfrp-pultruded-longitudinal");
  const [substrate, setSubstrate] = useState("steel-carbon");
  const [lengthMm, setLengthMm] = useState(6000);
  const [installC, setInstallC] = useState(15);
  const [minC, setMinC] = useState(-20);
  const [maxC, setMaxC] = useState(60);
  const [areaMm2, setAreaMm2] = useState(1128);
  const [sealant, setSealant] = useState<string>(SEALANT_CLASSES[0].id);
  const [presetId, setPresetId] = useState("handrail");
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    // Seed from a shared link once, after mount (window is not available during prerender).
    /* eslint-disable react-hooks/set-state-in-effect */
    const params = readToolStateParams(window.location);
    const num = (key: string, set: (value: number) => void) => {
      const value = params.get(key);
      if (value !== null && value !== "" && Number.isFinite(+value)) set(+value);
    };
    const ids = THERMAL_MATERIALS.map((material) => material.id as string);
    const m = params.get("member");
    if (m && ids.includes(m)) setMember(m);
    const s = params.get("substrate");
    if (s && (s === "none" || ids.includes(s))) setSubstrate(s);
    const seal = params.get("sealant");
    if (seal && SEALANT_CLASSES.some((option) => option.id === seal)) setSealant(seal);
    num("l", setLengthMm);
    num("ti", setInstallC);
    num("tmin", setMinC);
    num("tmax", setMaxC);
    num("a", setAreaMm2);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const preset = PRESETS.find((item) => item.id === presetId);
  const capability = SEALANT_CLASSES.find((option) => option.id === sealant)?.capability;
  const input = {
    lengthMm,
    memberId: member,
    substrateId: substrate === "none" ? undefined : substrate,
    installC,
    minC,
    maxC,
    areaMm2: areaMm2 > 0 ? areaMm2 : undefined,
    sealantCapability: capability,
  };
  const error = thermalMovementError(input);
  const result = calculateThermalMovement(input);

  function applyPreset(next: Preset) {
    setPresetId(next.id);
    setMember(next.member);
    setSubstrate(next.substrate);
    setLengthMm(next.lengthMm);
    setInstallC(next.installC);
    setMinC(next.minC);
    setMaxC(next.maxC);
    track("thermal_preset", { preset: next.id });
  }

  async function share() {
    const href = buildToolStateHref("/tools/thermal-expansion-calculator", {
      member, substrate, l: lengthMm, ti: installC, tmin: minC, tmax: maxC, a: areaMm2, sealant,
    });
    window.history.replaceState(null, "", href);
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${href}`);
      setShareState("copied");
    } catch {
      setShareState("error");
    }
    window.setTimeout(() => setShareState("idle"), 2500);
    track("thermal_share", { member });
  }

  const summary = result
    ? `Thermal movement check (F1 Composite tool)\n` +
      `Member: ${result.member.label} (α ${result.member.alpha} × 10⁻⁶/K), length ${lengthMm} mm between fixed points\n` +
      `Temperatures: install ${installC} °C, min ${minC} °C, max ${maxC} °C\n` +
      `Expansion ${mm(result.expansionMm)}, contraction ${mm(result.contractionMm)}, total range ${mm(result.totalRangeMm)}\n` +
      (result.substrate ? `Differential vs ${result.substrate.label}: ${mm(result.differentialHotMm ?? 0)} hot, ${mm(result.differentialColdMm ?? 0)} cold\n` : "") +
      (result.sealantJointMm ? `Minimum sealant joint width: ${mm(result.sealantJointMm)}\n` : "")
    : "";

  return (
    <div className="grid gap-[21px] lg:grid-cols-[1fr_1fr]">
      <div className="space-y-[13px] rounded-card border border-border-default bg-bg2 p-[21px]">
        <div className="flex flex-wrap items-center gap-[6px]">
          <span className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Examples:</span>
          {PRESETS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => applyPreset(item)}
              className={`rounded-full border px-[12px] py-[5px] text-f12 font-medium transition-colors ${presetId === item.id ? "border-teal bg-teal-bg text-teal-text" : "border-border-default bg-white text-t2 hover:border-teal"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-[13px] sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="te-member">Member material</label>
            <select id="te-member" value={member} onChange={(e) => setMember(e.target.value)} className={inputClass}>
              {THERMAL_MATERIALS.map((material) => (
                <option key={material.id} value={material.id}>{material.label} (α {material.alpha})</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="te-substrate">Fixed to</label>
            <select id="te-substrate" value={substrate} onChange={(e) => setSubstrate(e.target.value)} className={inputClass}>
              <option value="none">Nothing (free movement only)</option>
              {THERMAL_MATERIALS.map((material) => (
                <option key={material.id} value={material.id}>{material.label} (α {material.alpha})</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="te-length">Length between fixed points or joints (mm)</label>
          <input id="te-length" type="number" min="1" value={lengthMm} onChange={(e) => setLengthMm(+e.target.value)} className={inputClass} />
        </div>

        <div className="grid gap-[13px] sm:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="te-install">Installed at (°C)</label>
            <input id="te-install" type="number" value={installC} onChange={(e) => setInstallC(+e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="te-min">Coldest member (°C)</label>
            <input id="te-min" type="number" value={minC} onChange={(e) => setMinC(+e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="te-max">Hottest member (°C)</label>
            <input id="te-max" type="number" value={maxC} onChange={(e) => setMaxC(+e.target.value)} className={inputClass} />
          </div>
        </div>
        <p className="text-f12 text-t3">
          Use the member temperature, not the air temperature. A dark profile in full sun runs well above the shade
          temperature; take the local design values from EN 1991-1-5, ASHRAE or the project climate data.
        </p>

        <div className="grid gap-[13px] sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="te-area">Section area (mm²), for restrained force</label>
            <input id="te-area" type="number" min="0" value={areaMm2} onChange={(e) => setAreaMm2(+e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="te-sealant">Sealant movement class</label>
            <select id="te-sealant" value={sealant} onChange={(e) => setSealant(e.target.value)} className={inputClass}>
              {SEALANT_CLASSES.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-[13px] rounded-card border border-border-default bg-bg2 p-[21px]">
        {error || !result ? (
          <div className="rounded-control border border-red-200 bg-red-50 p-[13px] text-f14 text-red-700" role="alert">
            {error ?? "Check the inputs."}
          </div>
        ) : (
          <>
            <div className="grid gap-[8px] sm:grid-cols-3">
              <div className="rounded-control bg-white p-[13px]">
                <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Expands</div>
                <div className="mt-[4px] text-f24 font-bold text-t1">{mm(result.expansionMm)}</div>
                <div className="text-f12 text-t3">{installC} → {maxC} °C</div>
              </div>
              <div className="rounded-control bg-white p-[13px]">
                <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Contracts</div>
                <div className="mt-[4px] text-f24 font-bold text-t1">{mm(result.contractionMm)}</div>
                <div className="text-f12 text-t3">{installC} → {minC} °C</div>
              </div>
              <div className="rounded-control border border-teal/20 bg-teal/10 p-[13px]">
                <div className="text-f12 font-bold uppercase tracking-[0.06em] text-teal-text">Total range</div>
                <div className="mt-[4px] text-f24 font-bold text-t1">{mm(result.totalRangeMm)}</div>
                <div className="text-f12 text-t3">α = {result.member.alpha} × 10⁻⁶/K</div>
              </div>
            </div>

            {result.substrate && (
              <div className="rounded-control bg-white p-[13px] text-f14 text-t2">
                <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Movement relative to {result.substrate.label.toLowerCase()}</div>
                <p className="mt-[5px]">
                  Hot: <strong className="text-t1">{mm(Math.abs(result.differentialHotMm ?? 0))}</strong>{" "}
                  {(result.differentialHotMm ?? 0) >= 0 ? "more growth in the member" : "more growth in the substrate"}.
                  Cold: <strong className="text-t1">{mm(Math.abs(result.differentialColdMm ?? 0))}</strong>{" "}
                  {(result.differentialColdMm ?? 0) >= 0 ? "more shrinkage in the member" : "more shrinkage in the substrate"}.
                </p>
                <p className="mt-[5px] text-f12 text-t3">
                  Slotted holes or sliding brackets at all but one fixing must take this relative movement, plus the bolt clearance.
                </p>
              </div>
            )}

            <div className="rounded-control bg-white p-[13px] text-f14 text-t2">
              <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">If both ends were fully restrained</div>
              <p className="mt-[5px]">
                Axial stress about <strong className="text-t1">{result.restrainedHotMPa.toFixed(1)} MPa</strong> compression when hot and{" "}
                <strong className="text-t1">{result.restrainedColdMPa.toFixed(1)} MPa</strong> tension when cold
                {result.restrainedForceKn !== undefined ? <>, a force of about <strong className="text-t1">{result.restrainedForceKn.toFixed(1)} kN</strong> on the fixings</> : null}.
              </p>
              <p className="mt-[5px] text-f12 text-t3">
                Upper bound: E · α · ΔT with E = {result.member.E} GPa. Restraint also puts compression members at risk of buckling, so provide movement rather than rely on the section.
              </p>
            </div>

            {result.sealantJointMm !== undefined && (
              <div className="rounded-control bg-white p-[13px] text-f14 text-t2">
                <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Sealed butt joint at one end</div>
                <p className="mt-[5px]">
                  Minimum joint width at installation: <strong className="text-t1">{mm(result.sealantJointMm)}</strong>{" "}
                  (larger of the opening and closing movement divided by the sealant class).
                </p>
                <p className="mt-[5px] text-f12 text-t3">Add construction tolerance, and follow the sealant maker&apos;s width-to-depth ratio.</p>
              </div>
            )}

            {preset && (
              <Link href={preset.href} className="block rounded-control border border-teal/30 bg-white p-[13px] text-f14 text-t2 transition-colors hover:border-teal">
                <span className="block text-f12 font-bold uppercase tracking-[0.06em] text-teal-text">Related product</span>
                {preset.product} <span aria-hidden>→</span>
              </Link>
            )}

            <div className="grid gap-[8px] sm:grid-cols-2">
              <a
                href={buildRfqHref({ source: "thermal-expansion-calculator", product: preset?.product, productPath: preset?.href, message: summary + "\nApplication and fixing details (please add): ____" })}
                onClick={() => track("thermal_quote_click", { member })}
                className="rounded-control bg-teal px-[16px] py-[10px] text-center text-f14 font-bold text-white transition-colors hover:bg-teal-text"
              >
                Send to engineering
              </a>
              <button
                type="button"
                onClick={share}
                className="rounded-control border border-border-default bg-white px-[16px] py-[10px] text-center text-f14 font-medium text-t2 transition-colors hover:border-teal hover:text-teal-text"
              >
                {shareState === "copied" ? "Link copied" : shareState === "error" ? "Link is in the address bar" : "Copy share link"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
