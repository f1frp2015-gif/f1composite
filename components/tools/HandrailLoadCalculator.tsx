"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@/components/calculators/leadCapture";
import { ENV_FACTORS, type DesignMethod } from "@/lib/frpDesignBasis";
import {
  GUARD_LOAD_CASES,
  GUARD_SECTIONS,
  checkGuardrail,
  guardInputError,
  guardLoadCase,
  type TubeSection,
} from "@/lib/guardrailLoads";
import { buildRfqHref } from "@/lib/rfq";
import { buildToolStateHref, readToolStateParams } from "@/lib/toolStateUrl";

const METHODS: { id: DesignMethod; label: string }[] = [
  { id: "lrfd-asce", label: "ASCE/SEI 74-23 LRFD screen (γ 1.6, φ 0.65, λ 0.8)" },
  { id: "lrfd-cents19101", label: "CEN/TS 19101 screen (γ 1.5, γ_M 1.5)" },
  { id: "asd", label: "Allowable stress screen (F/2.5 bending, F/3 shear)" },
];

const REGIONS = [
  { id: "US", label: "United States" },
  { id: "EU", label: "European Union" },
  { id: "UK", label: "United Kingdom" },
  { id: "CA", label: "Canada" },
  { id: "AU", label: "Australia" },
  { id: "NZ", label: "New Zealand" },
] as const;

const inputClass = "w-full rounded-control border border-border-default bg-white px-[13px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
const labelClass = "mb-[5px] block text-f12 font-bold uppercase tracking-[0.06em] text-t3";

function SectionPicker({ id, label, sectionId, setSectionId, custom, setCustom }: {
  id: string;
  label: string;
  sectionId: string;
  setSectionId: (value: string) => void;
  custom: TubeSection;
  setCustom: (value: TubeSection) => void;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={id}>{label}</label>
      <select id={id} value={sectionId} onChange={(e) => setSectionId(e.target.value)} className={inputClass}>
        {GUARD_SECTIONS.map((option) => (
          <option key={option.id} value={option.id}>{option.label}</option>
        ))}
        <option value="custom">Other tube size</option>
      </select>
      {sectionId === "custom" && (
        <div className="mt-[8px] grid grid-cols-3 gap-[8px]">
          <select aria-label={`${label} shape`} value={custom.shape} onChange={(e) => setCustom({ ...custom, shape: e.target.value as TubeSection["shape"] })} className={inputClass}>
            <option value="square-tube">Square</option>
            <option value="round-tube">Round</option>
          </select>
          <input aria-label={`${label} outside size in mm`} type="number" min="1" value={custom.d} onChange={(e) => setCustom({ ...custom, d: +e.target.value })} className={inputClass} />
          <input aria-label={`${label} wall thickness in mm`} type="number" min="0.5" step="0.1" value={custom.t} onChange={(e) => setCustom({ ...custom, t: +e.target.value })} className={inputClass} />
        </div>
      )}
    </div>
  );
}

function Utilisation({ label, value }: { label: string; value: number }) {
  const ok = value <= 1;
  return (
    <div className={`rounded-control border p-[13px] ${ok ? "border-teal/20 bg-teal/10" : "border-red-200 bg-red-50"}`}>
      <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">{label}</div>
      <div className={`mt-[4px] text-f24 font-bold ${ok ? "text-teal-text" : "text-red-700"}`}>{(value * 100).toFixed(0)}%</div>
      <div className="text-f12 text-t3">{ok ? "within the screen" : "exceeds the screen"}</div>
    </div>
  );
}

export default function HandrailLoadCalculator() {
  const [region, setRegion] = useState<string>("US");
  const [caseId, setCaseId] = useState("us-osha");
  const [heightMm, setHeightMm] = useState(1067);
  const [spacingMm, setSpacingMm] = useState(1500);
  const [postId, setPostId] = useState("shs-50-6.4");
  const [railId, setRailId] = useState("shs-50-6.4");
  const [customPost, setCustomPost] = useState<TubeSection>({ shape: "square-tube", d: 60, t: 5 });
  const [customRail, setCustomRail] = useState<TubeSection>({ shape: "square-tube", d: 50, t: 5 });
  const [materialId, setMaterialId] = useState("frp-e23");
  const [method, setMethod] = useState<DesignMethod>("lrfd-asce");
  const [envId, setEnvId] = useState("outdoor");
  const [endPost, setEndPost] = useState(false);
  const [lineEntry, setLineEntry] = useState<string>("");
  const [pointEntry, setPointEntry] = useState<string>("");
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    // Seed from a shared link once, after mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    const params = readToolStateParams(window.location);
    const rule = params.get("rule");
    const loadCase = rule ? guardLoadCase(rule) : undefined;
    if (loadCase) {
      setRegion(loadCase.region);
      setCaseId(loadCase.id);
      setMethod(loadCase.method);
    }
    const num = (key: string, set: (value: number) => void) => {
      const value = params.get(key);
      if (value !== null && value !== "" && Number.isFinite(+value)) set(+value);
    };
    num("h", setHeightMm);
    num("s", setSpacingMm);
    const sections = GUARD_SECTIONS.map((option) => option.id as string);
    const post = params.get("post");
    if (post && sections.includes(post)) setPostId(post);
    const rail = params.get("rail");
    if (rail && sections.includes(rail)) setRailId(rail);
    const env = params.get("env");
    if (env && ENV_FACTORS.some((item) => item.id === env)) setEnvId(env);
    const m = params.get("method");
    if (m && METHODS.some((item) => item.id === m)) setMethod(m as DesignMethod);
    const line = params.get("w");
    if (line) setLineEntry(line);
    const point = params.get("p");
    if (point) setPointEntry(point);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const loadCase = guardLoadCase(caseId) ?? GUARD_LOAD_CASES[0];
  const casesInRegion = GUARD_LOAD_CASES.filter((item) => item.region === region);
  const post = postId === "custom" ? customPost : GUARD_SECTIONS.find((option) => option.id === postId)!.section;
  const rail = railId === "custom" ? customRail : GUARD_SECTIONS.find((option) => option.id === railId)!.section;
  const input = {
    caseId,
    lineKnPerM: loadCase.userEntry && lineEntry !== "" ? +lineEntry : undefined,
    pointKn: loadCase.userEntry && pointEntry !== "" ? +pointEntry : undefined,
    heightMm,
    spacingMm,
    post,
    rail,
    materialId,
    method,
    envId,
    endPost,
  };
  const error = guardInputError(input);
  const result = checkGuardrail(input);

  function chooseRegion(next: string) {
    setRegion(next);
    const first = GUARD_LOAD_CASES.find((item) => item.region === next);
    if (first) chooseCase(first.id);
  }

  function chooseCase(next: string) {
    const item = guardLoadCase(next);
    if (!item) return;
    setCaseId(item.id);
    setMethod(item.method);
    if (item.heightMinMm) setHeightMm(item.id === "us-osha" ? 1067 : item.heightMinMm);
    track("handrail_rule", { rule: item.id });
  }

  async function share() {
    const state: Record<string, string | number> = { rule: caseId, h: heightMm, s: spacingMm, post: postId, rail: railId, env: envId, method };
    if (loadCase.userEntry) {
      state.w = lineEntry;
      state.p = pointEntry;
    }
    const href = buildToolStateHref("/tools/handrail-load-calculator", state);
    window.history.replaceState(null, "", href);
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${href}`);
      setShareState("copied");
    } catch {
      setShareState("error");
    }
    window.setTimeout(() => setShareState("idle"), 2500);
    track("handrail_share", { rule: caseId });
  }

  const describe = (section: TubeSection) => `${section.shape === "round-tube" ? "round" : "square"} tube ${section.d} × ${section.t} mm`;
  const summary = result
    ? `Handrail / guardrail load check (F1 Composite tool)\n` +
      `Rule: ${loadCase.label} (${loadCase.clause})\n` +
      `Loads: line ${result.lineKnPerM.toFixed(2)} kN/m, point ${result.pointKn.toFixed(2)} kN; height ${heightMm} mm; post spacing ${spacingMm} mm${endPost ? " (end post)" : ""}\n` +
      `Post: ${describe(post)}, utilisation ${(result.post.utilisation * 100).toFixed(0)}%; rail: ${describe(rail)}, utilisation ${(result.rail.utilisation * 100).toFixed(0)}%\n` +
      `Top-rail deflection ${result.deflectionMm.toFixed(1)} mm (${result.deflectionCase})\n` +
      `Base reactions per post (service): ${result.base.serviceShearKn.toFixed(2)} kN, ${result.base.serviceMomentKnm.toFixed(2)} kN·m\n`
    : "";

  return (
    <div className="grid gap-[21px] lg:grid-cols-[1fr_1fr]">
      <div className="space-y-[13px] rounded-card border border-border-default bg-bg2 p-[21px]">
        <div className="grid gap-[13px] sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="hr-region">Project location</label>
            <select id="hr-region" value={region} onChange={(e) => chooseRegion(e.target.value)} className={inputClass}>
              {REGIONS.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="hr-rule">Load rule</label>
            <select id="hr-rule" value={caseId} onChange={(e) => chooseCase(e.target.value)} className={inputClass}>
              {casesInRegion.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-f12 text-t3">{loadCase.clause}</p>

        {loadCase.userEntry && (
          <div className="grid gap-[13px] rounded-control border border-teal/30 bg-white p-[13px] sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="hr-w">Line load at the top (kN/m)</label>
              <input id="hr-w" type="number" min="0" step="0.01" value={lineEntry} placeholder="from the clause above" onChange={(e) => setLineEntry(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="hr-p">Concentrated load (kN)</label>
              <input id="hr-p" type="number" min="0" step="0.01" value={pointEntry} placeholder="from the clause above" onChange={(e) => setPointEntry(e.target.value)} className={inputClass} />
            </div>
            <p className="text-f12 text-t3 sm:col-span-2">{loadCase.notes[0]}</p>
          </div>
        )}

        <div className="grid gap-[13px] sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="hr-height">Top-rail height above the post base (mm)</label>
            <input id="hr-height" type="number" min="1" value={heightMm} onChange={(e) => setHeightMm(+e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="hr-spacing">Post spacing (mm)</label>
            <input id="hr-spacing" type="number" min="1" value={spacingMm} onChange={(e) => setSpacingMm(+e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid gap-[13px] sm:grid-cols-2">
          <SectionPicker id="hr-post" label="Post" sectionId={postId} setSectionId={setPostId} custom={customPost} setCustom={setCustomPost} />
          <SectionPicker id="hr-rail" label="Top rail" sectionId={railId} setSectionId={setRailId} custom={customRail} setCustom={setCustomRail} />
        </div>

        <div className="grid gap-[13px] sm:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="hr-material">Material</label>
            <select id="hr-material" value={materialId} onChange={(e) => setMaterialId(e.target.value)} className={inputClass}>
              <option value="frp-e23">EN 13706 E23</option>
              <option value="frp-e17">EN 13706 E17</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="hr-env">Environment</label>
            <select id="hr-env" value={envId} onChange={(e) => setEnvId(e.target.value)} className={inputClass}>
              {ENV_FACTORS.map((env) => (
                <option key={env.id} value={env.id}>{env.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="hr-method">Design screen</label>
            <select id="hr-method" value={method} onChange={(e) => setMethod(e.target.value as DesignMethod)} className={inputClass}>
              {METHODS.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
        <label className="flex items-center gap-[8px] text-f14 text-t2">
          <input type="checkbox" checked={endPost} onChange={(e) => setEndPost(e.target.checked)} />
          End or corner post (half the tributary line load)
        </label>

        <ul className="space-y-[5px] border-t border-border-default pt-[10px] text-f12 text-t2">
          {loadCase.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-[13px] rounded-card border border-border-default bg-bg2 p-[21px]">
        {error || !result ? (
          <div className="rounded-control border border-red-200 bg-red-50 p-[13px] text-f14 text-red-700" role="alert">
            {error ?? "Check the inputs."}
          </div>
        ) : (
          <>
            <div className="rounded-control bg-white p-[13px] text-f14 text-t2">
              Service loads: line <strong className="text-t1">{result.lineKnPerM.toFixed(2)} kN/m</strong>, concentrated{" "}
              <strong className="text-t1">{result.pointKn.toFixed(2)} kN</strong>
              {loadCase.pointPerSpacingKnPerM !== undefined ? " (300 N/m × post spacing)" : ""}; not applied together.
              Strength demand × {result.loadFactor}{method === "lrfd-asce" ? `, λ ${result.lambda}` : ""}.
            </div>

            <div className="grid gap-[8px] sm:grid-cols-2">
              <Utilisation label="Post at the base" value={result.post.utilisation} />
              <Utilisation label="Top rail between posts" value={result.rail.utilisation} />
            </div>

            <div className="rounded-control bg-white p-[13px] text-f14 text-t2">
              <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Post</div>
              <p className="mt-[5px]">
                {result.post.serviceForceKn.toFixed(2)} kN at the rail ({result.post.governingLoad} load governs), base moment{" "}
                {result.post.serviceMomentKnm.toFixed(2)} kN·m. Bending {result.post.bendingStressMPa.toFixed(0)} MPa against{" "}
                {result.post.bendingAllowableMPa.toFixed(0)} MPa.
              </p>
              <p className="mt-[5px] text-f12 text-t3">
                Characteristic capacity at rail height, without design factors: {result.post.characteristicCapacityKn.toFixed(2)} kN,{" "}
                {result.post.capacityRatio.toFixed(1)} × the applied load. A without-failure test such as OSHA&apos;s sees this margin;
                the percentages above include the design factors.
              </p>
            </div>

            <div className={`rounded-control p-[13px] text-f14 ${result.flags.deflectionExceeds ? "border border-red-200 bg-red-50 text-red-700" : "bg-white text-t2"}`}>
              <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Top-rail deflection</div>
              <p className="mt-[5px]">
                <strong>{result.deflectionMm.toFixed(1)} mm</strong> under the {result.deflectionCase}
                {loadCase.deflectionLimitMm !== undefined ? `; limit ${loadCase.deflectionLimitMm} mm` : ""}. Post fixed at the base; plate and anchor rotation add to this.
              </p>
              {result.loadedHeightMm !== undefined && (
                <p className={`mt-[5px] ${result.flags.loadedHeightBelowMin ? "text-red-700" : ""}`}>
                  Under the downward load the rail sits at {result.loadedHeightMm.toFixed(0)} mm; it must stay at or above {loadCase.minLoadedHeightMm} mm (39 in).
                </p>
              )}
            </div>

            <div className="rounded-control bg-white p-[13px] text-f14 text-t2">
              <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Base reactions per post, for the anchors</div>
              <p className="mt-[5px]">
                Service: {result.base.serviceShearKn.toFixed(2)} kN and {result.base.serviceMomentKnm.toFixed(2)} kN·m. Factored:{" "}
                {result.base.factoredShearKn.toFixed(2)} kN and {result.base.factoredMomentKnm.toFixed(2)} kN·m.
              </p>
            </div>

            {(result.flags.heightBelowMin || result.flags.heightAboveMax || result.flags.spacingAboveMax || result.flags.slenderWall) && (
              <ul className="space-y-[5px] rounded-control border border-amber-200 bg-amber-50 p-[13px] text-f14 text-amber-800">
                {result.flags.heightBelowMin && <li>Rail height is below the {loadCase.heightMinMm} mm minimum of this rule.</li>}
                {result.flags.heightAboveMax && <li>Rail height is above the {loadCase.heightMaxMm} mm maximum of this rule.</li>}
                {result.flags.spacingAboveMax && <li>Post spacing is above {loadCase.maxPostSpacingMm} mm.</li>}
                {result.flags.slenderWall && <li>Thin tube wall: check local buckling and the fitting connection.</li>}
              </ul>
            )}

            <Link href="/products/frp-handrail-systems" className="block rounded-control border border-teal/30 bg-white p-[13px] text-f14 text-t2 transition-colors hover:border-teal">
              <span className="block text-f12 font-bold uppercase tracking-[0.06em] text-teal-text">F1 handrail systems</span>
              Square and round post-and-rail systems, fittings and kick plates <span aria-hidden>→</span>
            </Link>

            <div className="grid gap-[8px] sm:grid-cols-2">
              <a
                href={buildRfqHref({ source: "handrail-load-calculator", product: "FRP handrail systems", productPath: "/products/frp-handrail-systems", message: summary + "\nLayout, substrate and quantities (please add): ____" })}
                onClick={() => track("handrail_quote_click", { rule: caseId })}
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
