"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@/components/calculators/leadCapture";
import {
  LADDER_CODES,
  STAIR_CODES,
  WALKWAY_LOADS,
  checkLadder,
  checkStair,
  checkWalkway,
  ladderInputError,
  moldedGratingClearOpening,
  stairAngle,
  stairInputError,
  type FallProtection,
  type GeometryCheck,
  type LadderCode,
  type StairCode,
} from "@/lib/accessGeometry";
import { buildRfqHref } from "@/lib/rfq";

type Tab = "ladder" | "stair" | "walkway";

const inputClass = "w-full rounded-control border border-border-default bg-white px-[13px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
const labelClass = "mb-[5px] block text-f12 font-bold uppercase tracking-[0.06em] text-t3";

// Square-mesh molded grating from the F1 catalog: pitch and top bar width, mm.
const GRATING_MESHES = [
  { id: "38", label: "Molded 38.1 × 38.1 mesh (6.0 mm top bar)", pitch: 38.1, topBar: 6.0 },
  { id: "40", label: "Molded 40 × 40 mesh (7.0 mm top bar)", pitch: 40, topBar: 7.0 },
  { id: "50", label: "Molded 50.8 × 50.8 mesh (6.0 mm top bar)", pitch: 50.8, topBar: 6.0 },
];

function NumberField({ id, label, value, onChange, step = "1" }: { id: string; label: string; value: number; onChange: (value: number) => void; step?: string }) {
  return (
    <div>
      <label className={labelClass} htmlFor={id}>{label}</label>
      <input id={id} type="number" min="0" step={step} value={value} onChange={(e) => onChange(+e.target.value)} className={inputClass} />
    </div>
  );
}

function Results({ checks, error }: { checks: GeometryCheck[]; error: string | null }) {
  if (error) {
    return <div className="rounded-control border border-red-200 bg-red-50 p-[13px] text-f14 text-red-700" role="alert">{error}</div>;
  }
  const failed = checks.filter((check) => check.status === "fail").length;
  return (
    <div className="space-y-[8px]">
      <div className={`rounded-control border p-[13px] text-f16 font-bold ${failed ? "border-red-200 bg-red-50 text-red-700" : "border-teal/20 bg-teal/10 text-teal-text"}`}>
        {failed ? `${failed} requirement${failed > 1 ? "s" : ""} not met` : "All checked requirements met"}
      </div>
      <ul className="space-y-[8px]">
        {checks.map((check) => (
          <li key={check.label} className="rounded-control bg-white p-[13px] text-f14 text-t2">
            <div className="flex flex-wrap items-baseline justify-between gap-[8px]">
              <span className="font-bold text-t1">{check.label}</span>
              <span
                className={`rounded-tag px-[8px] py-[2px] text-f12 font-bold uppercase tracking-[0.06em] ${check.status === "pass" ? "bg-teal-bg text-teal-text" : check.status === "fail" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-800"}`}
              >
                {check.status === "pass" ? "Meets" : check.status === "fail" ? "Does not meet" : "Check"}
              </span>
            </div>
            <div className="mt-[4px]">{check.value}</div>
            <div className="mt-[2px] text-f12 text-t3">{check.requirement} · {check.clause}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AccessGeometryChecker() {
  const [tab, setTab] = useState<Tab>("ladder");

  const [ladder, setLadder] = useState({
    code: "osha" as LadderCode,
    rungPitchMm: 300,
    clearWidthMm: 420,
    toeClearanceMm: 180,
    heightMm: 6000,
    railExtensionMm: 1070,
    fallProtection: "none" as FallProtection,
    newInstallation: true,
  });
  const [stair, setStair] = useState({ code: "osha-standard" as StairCode, riserMm: 200, goingMm: 250, widthMm: 800, headroomMm: 2300, flightRiseMm: 2800 });
  const [walkway, setWalkway] = useState({ widthMm: 800, headroomMm: 2200, clearOpeningMm: 32.1, peopleBelow: false });
  const [meshId, setMeshId] = useState("38");

  const ladderChecks = checkLadder(ladder);
  const stairChecks = checkStair(stair);
  const walkwayChecks = checkWalkway(walkway);

  function chooseMesh(id: string) {
    setMeshId(id);
    const mesh = GRATING_MESHES.find((item) => item.id === id);
    if (mesh) setWalkway((w) => ({ ...w, clearOpeningMm: Number(moldedGratingClearOpening(mesh.pitch, mesh.topBar).toFixed(1)) }));
  }

  const checks = tab === "ladder" ? ladderChecks : tab === "stair" ? stairChecks : walkwayChecks;
  const product = tab === "ladder"
    ? { name: "FRP fixed ladders", href: "/products/frp-ladders" }
    : tab === "stair"
      ? { name: "FRP stair treads", href: "/products/frp-stair-treads" }
      : { name: "FRP grating", href: "/products/grating" };
  const summary =
    `Access geometry check (F1 Composite tool): ${tab}\n` +
    checks.map((check) => `- ${check.label}: ${check.value} (${check.status === "pass" ? "meets" : check.status === "fail" ? "does not meet" : "check"}; ${check.requirement}, ${check.clause})`).join("\n");

  const tabs: { id: Tab; label: string }[] = [
    { id: "ladder", label: "Fixed ladder" },
    { id: "stair", label: "Stair" },
    { id: "walkway", label: "Walkway & grating" },
  ];

  return (
    <div>
      <div className="mb-[21px] flex flex-wrap gap-[8px]" role="tablist" aria-label="Access system">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => { setTab(item.id); track("access_tab", { tab: item.id }); }}
            className={`rounded-control px-[21px] py-[8px] text-f14 font-semibold transition-colors ${tab === item.id ? "bg-teal text-white" : "bg-bg2 text-t2 hover:bg-teal-bg"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-[21px] lg:grid-cols-[1fr_1fr]">
        <div className="space-y-[13px] rounded-card border border-border-default bg-bg2 p-[21px]">
          {tab === "ladder" && (
            <>
              <div>
                <label className={labelClass} htmlFor="ag-ladder-code">Rule</label>
                <select id="ag-ladder-code" value={ladder.code} onChange={(e) => setLadder({ ...ladder, code: e.target.value as LadderCode })} className={inputClass}>
                  {Object.entries(LADDER_CODES).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-[13px] sm:grid-cols-2">
                <NumberField id="ag-pitch" label="Rung spacing (mm)" value={ladder.rungPitchMm} onChange={(v) => setLadder({ ...ladder, rungPitchMm: v })} />
                <NumberField id="ag-width" label="Clear width between rails (mm)" value={ladder.clearWidthMm} onChange={(v) => setLadder({ ...ladder, clearWidthMm: v })} />
                <NumberField id="ag-toe" label="Clearance behind rungs (mm)" value={ladder.toeClearanceMm} onChange={(v) => setLadder({ ...ladder, toeClearanceMm: v })} />
                <NumberField id="ag-ext" label="Rail extension above landing (mm)" value={ladder.railExtensionMm} onChange={(v) => setLadder({ ...ladder, railExtensionMm: v })} />
                <NumberField id="ag-height" label={ladder.code === "osha" ? "Height above lower level (mm)" : "Fall height (mm)"} value={ladder.heightMm} onChange={(v) => setLadder({ ...ladder, heightMm: v })} />
                <div>
                  <label className={labelClass} htmlFor="ag-fall">Fall protection</label>
                  <select id="ag-fall" value={ladder.fallProtection} onChange={(e) => setLadder({ ...ladder, fallProtection: e.target.value as FallProtection })} className={inputClass}>
                    <option value="none">None</option>
                    <option value="cage">Cage</option>
                    <option value="ladder-safety-system">Ladder safety system / guided fall arrester</option>
                    <option value="personal-fall-arrest">Personal fall arrest system</option>
                  </select>
                </div>
              </div>
              {ladder.code === "osha" && (
                <label className="flex items-center gap-[8px] text-f14 text-t2">
                  <input type="checkbox" checked={ladder.newInstallation} onChange={(e) => setLadder({ ...ladder, newInstallation: e.target.checked })} />
                  Installed on or after 19 November 2018
                </label>
              )}
              <p className="text-f12 text-t3">
                Clear width is measured between the inside faces of the side rails, so it is the overall width minus both
                rails. Australia and New Zealand (AS 1657:2018) and Canadian provincial rules are not encoded; check their
                limits on the drawing.
              </p>
            </>
          )}

          {tab === "stair" && (
            <>
              <div>
                <label className={labelClass} htmlFor="ag-stair-code">Rule</label>
                <select id="ag-stair-code" value={stair.code} onChange={(e) => setStair({ ...stair, code: e.target.value as StairCode })} className={inputClass}>
                  {Object.entries(STAIR_CODES).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-[13px] sm:grid-cols-2">
                <NumberField id="ag-riser" label="Riser height h (mm)" value={stair.riserMm} onChange={(v) => setStair({ ...stair, riserMm: v })} />
                <NumberField id="ag-going" label="Going / tread depth g (mm)" value={stair.goingMm} onChange={(v) => setStair({ ...stair, goingMm: v })} />
                <NumberField id="ag-swidth" label="Clear width (mm)" value={stair.widthMm} onChange={(v) => setStair({ ...stair, widthMm: v })} />
                <NumberField id="ag-head" label="Headroom (mm)" value={stair.headroomMm} onChange={(v) => setStair({ ...stair, headroomMm: v })} />
                <NumberField id="ag-flight" label="Rise of one flight (mm)" value={stair.flightRiseMm} onChange={(v) => setStair({ ...stair, flightRiseMm: v })} />
                <div className="rounded-control bg-white p-[10px] text-f14 text-t2">
                  <div className={labelClass}>Angle</div>
                  {stair.riserMm > 0 && stair.goingMm > 0 ? `${stairAngle(stair.riserMm, stair.goingMm).toFixed(1)}°` : "—"}
                </div>
              </div>
              <p className="text-f12 text-t3">
                The FRP stair tread depth is the going. AS 1657:2018 (Australia, New Zealand) is not encoded; check its angle,
                riser and going limits on the drawing.
              </p>
            </>
          )}

          {tab === "walkway" && (
            <>
              <div className="grid gap-[13px] sm:grid-cols-2">
                <NumberField id="ag-wwidth" label="Clear width (mm)" value={walkway.widthMm} onChange={(v) => setWalkway({ ...walkway, widthMm: v })} />
                <NumberField id="ag-whead" label="Headroom (mm)" value={walkway.headroomMm} onChange={(v) => setWalkway({ ...walkway, headroomMm: v })} />
                <div>
                  <label className={labelClass} htmlFor="ag-mesh">F1 grating mesh</label>
                  <select id="ag-mesh" value={meshId} onChange={(e) => chooseMesh(e.target.value)} className={inputClass}>
                    {GRATING_MESHES.map((mesh) => (
                      <option key={mesh.id} value={mesh.id}>{mesh.label}</option>
                    ))}
                    <option value="custom">Other opening</option>
                  </select>
                </div>
                <NumberField id="ag-open" label="Largest clear opening (mm)" step="0.1" value={walkway.clearOpeningMm} onChange={(v) => { setMeshId("custom"); setWalkway({ ...walkway, clearOpeningMm: v }); }} />
              </div>
              <label className="flex items-center gap-[8px] text-f14 text-t2">
                <input type="checkbox" checked={walkway.peopleBelow} onChange={(e) => setWalkway({ ...walkway, peopleBelow: e.target.checked })} />
                People or workstations below the walkway
              </label>
              <p className="text-f12 text-t3">
                Clear opening of a molded grating = mesh pitch minus the top bar width. Where the ball test fails, a solid
                top or a cover plate closes the openings. Geometry follows EN ISO 14122-2; the floor loads below are for the
                grating load table.
              </p>
              <div className="overflow-x-auto rounded-control bg-white">
                <table className="w-full min-w-[520px] text-f12">
                  <thead className="text-left text-t1">
                    <tr><th className="p-[8px]">Rule</th><th className="p-[8px]">Use</th><th className="p-[8px]">Design load</th></tr>
                  </thead>
                  <tbody>
                    {WALKWAY_LOADS.map((row) => (
                      <tr key={`${row.rule}-${row.use}`} className="border-t border-border-default align-top text-t2">
                        <td className="p-[8px]">{row.rule}</td><td className="p-[8px]">{row.use}</td><td className="p-[8px]">{row.load}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div className="space-y-[13px] rounded-card border border-border-default bg-bg2 p-[21px]">
          <Results
            checks={checks}
            error={tab === "ladder" ? ladderInputError(ladder) : tab === "stair" ? stairInputError(stair) : checks.length ? null : "Enter positive dimensions in millimetres."}
          />
          <Link href={product.href} className="block rounded-control border border-teal/30 bg-white p-[13px] text-f14 text-t2 transition-colors hover:border-teal">
            <span className="block text-f12 font-bold uppercase tracking-[0.06em] text-teal-text">Related product</span>
            {product.name} <span aria-hidden>→</span>
          </Link>
          <a
            href={buildRfqHref({ source: "access-geometry-checker", product: product.name, productPath: product.href, message: `${summary}\nDrawing, jurisdiction and quantities (please add): ____` })}
            onClick={() => track("access_quote_click", { tab })}
            className="block rounded-control bg-teal px-[16px] py-[10px] text-center text-f14 font-bold text-white transition-colors hover:bg-teal-text"
          >
            Send to engineering
          </a>
          <p className="text-f12 text-t3">
            A geometry check against the listed clauses only. Loads, fixings, the fall protection system and the complete
            drawing are reviewed for the rule adopted on the site.
          </p>
        </div>
      </div>
    </div>
  );
}
