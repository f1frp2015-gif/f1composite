"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@/components/calculators/leadCapture";
import {
  ACI_440_11,
  BAR_SIZES,
  BAR_SYSTEMS,
  F1_GFRP_DIAMETERS,
  barSize,
  gfrpDesignValues,
  gfrpUnitMass,
  matchGfrpSize,
  type BarSystem,
} from "@/lib/gfrpRebar";
import { buildRfqHref } from "@/lib/rfq";

const inputClass = "w-full rounded-control border border-border-default bg-white px-[13px] py-[8px] text-f14 text-t1 outline-none focus:border-teal";
const labelClass = "mb-[5px] block text-f12 font-bold uppercase tracking-[0.06em] text-t3";

export default function GfrpRebarCalculator() {
  const [system, setSystem] = useState<BarSystem>("astm");
  const [designation, setDesignation] = useState("No. 5");
  const [gfrpDiameter, setGfrpDiameter] = useState(16);
  const [strength, setStrength] = useState("");
  const [modulus, setModulus] = useState("");
  const [density, setDensity] = useState(2.1);
  const [lengthM, setLengthM] = useState(6);
  const [count, setCount] = useState(100);

  const steel = barSize(system, designation);
  const match = steel ? matchGfrpSize(steel.diameterMm) : null;
  const area = Math.round((Math.PI * gfrpDiameter * gfrpDiameter) / 4);
  const design = strength !== "" && modulus !== "" ? gfrpDesignValues({ guaranteedStrengthMPa: +strength, modulusGPa: +modulus, areaMm2: area }) : null;
  const unitMass = gfrpUnitMass(area, density);
  const totalMass = unitMass * lengthM * count;

  function chooseSystem(next: BarSystem) {
    setSystem(next);
    const first = BAR_SIZES.find((size) => size.system === next);
    if (first) setDesignation(first.designation);
  }

  function applyMatch() {
    if (!match) return;
    setGfrpDiameter(match.f1DiameterMm);
    track("gfrp_use_match", { from: designation });
  }

  const summary =
    `GFRP rebar check (F1 Composite tool)\n` +
    (steel && match ? `Steel bar in the drawing: ${designation} (${BAR_SYSTEMS[system]}), Ø${steel.diameterMm} mm; closest F1 GFRP size Ø${match.f1DiameterMm} mm (ASTM D7957 ${match.astm.designation})\n` : "") +
    `GFRP bar: Ø${gfrpDiameter} mm, nominal area ${area} mm²\n` +
    (design ? `Certificate: f*fu ${strength} MPa, Ef ${modulus} GPa → ffu ${design.designStrengthMPa.toFixed(0)} MPa, sustained limit ${design.sustainedLimitMPa.toFixed(0)} MPa\n` : "") +
    `Quantity: ${count} × ${lengthM} m, about ${totalMass.toFixed(0)} kg at ${density} g/cm³\n`;

  return (
    <div className="grid gap-[21px] lg:grid-cols-[1fr_1fr]">
      <div className="space-y-[21px]">
        <div className="space-y-[13px] rounded-card border border-border-default bg-bg2 p-[21px]">
          <h2 className="text-f18 font-bold text-t1">1. Match a steel bar size</h2>
          <div className="grid gap-[13px] sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="gr-system">Bar system in the drawing</label>
              <select id="gr-system" value={system} onChange={(e) => chooseSystem(e.target.value as BarSystem)} className={inputClass}>
                {Object.entries(BAR_SYSTEMS).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="gr-size">Bar size</label>
              <select id="gr-size" value={designation} onChange={(e) => setDesignation(e.target.value)} className={inputClass}>
                {BAR_SIZES.filter((size) => size.system === system).map((size) => (
                  <option key={size.designation} value={size.designation}>{size.designation} (Ø{size.diameterMm} mm)</option>
                ))}
              </select>
            </div>
          </div>
          {steel && match && (
            <div className="rounded-control bg-white p-[13px] text-f14 text-t2">
              {designation}: Ø{steel.diameterMm} mm, {steel.areaMm2} mm². Closest F1 GFRP size{" "}
              <strong className="text-t1">Ø{match.f1DiameterMm} mm</strong> ({match.f1AreaMm2} mm²); closest ASTM D7957 designation{" "}
              <strong className="text-t1">{match.astm.designation}</strong> (Ø{match.astm.diameterMm} mm).
              <button type="button" onClick={applyMatch} className="ml-[8px] font-semibold text-teal-text underline">Use Ø{match.f1DiameterMm}</button>
              <p className="mt-[5px] text-f12 text-t3">
                A size match only. GFRP is about a quarter as stiff as steel, so bar area, spacing, cover and laps are
                redesigned by the engineer of record.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-[13px] rounded-card border border-border-default bg-bg2 p-[21px]">
          <h2 className="text-f18 font-bold text-t1">2. Design values to ACI CODE-440.11-22</h2>
          <div className="grid gap-[13px] sm:grid-cols-3">
            <div>
              <label className={labelClass} htmlFor="gr-dia">GFRP diameter</label>
              <select id="gr-dia" value={gfrpDiameter} onChange={(e) => setGfrpDiameter(+e.target.value)} className={inputClass}>
                {F1_GFRP_DIAMETERS.map((d) => (
                  <option key={d} value={d}>Ø{d} mm</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="gr-fu">Guaranteed f*fu (MPa)</label>
              <input id="gr-fu" type="number" min="0" value={strength} placeholder="certificate" onChange={(e) => setStrength(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="gr-ef">Modulus Ef (GPa)</label>
              <input id="gr-ef" type="number" min="0" value={modulus} placeholder="certificate" onChange={(e) => setModulus(e.target.value)} className={inputClass} />
            </div>
          </div>
          <p className="text-f12 text-t3">
            Enter the guaranteed tensile strength and modulus from the certificate of the bar offered for the project. The
            tool does not assume a grade.
          </p>
        </div>

        <div className="space-y-[13px] rounded-card border border-border-default bg-bg2 p-[21px]">
          <h2 className="text-f18 font-bold text-t1">3. Weight for shipping</h2>
          <div className="grid gap-[13px] sm:grid-cols-3">
            <div>
              <label className={labelClass} htmlFor="gr-rho">Density (g/cm³)</label>
              <input id="gr-rho" type="number" min="1" max="3" step="0.05" value={density} onChange={(e) => setDensity(+e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="gr-len">Bar length (m)</label>
              <input id="gr-len" type="number" min="0" step="0.1" value={lengthM} onChange={(e) => setLengthM(+e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="gr-count">Number of bars</label>
              <input id="gr-count" type="number" min="0" step="1" value={count} onChange={(e) => setCount(+e.target.value)} className={inputClass} />
            </div>
          </div>
          <p className="text-f12 text-t3">Nominal area × density. The supplier&apos;s declared unit mass replaces this once a grade is offered.</p>
        </div>
      </div>

      <div className="space-y-[13px] rounded-card border border-border-default bg-bg2 p-[21px]">
        <div className="rounded-control bg-white p-[13px]">
          <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Selected GFRP bar</div>
          <div className="mt-[4px] text-f24 font-bold text-t1">Ø{gfrpDiameter} mm · {area} mm²</div>
        </div>

        {design ? (
          <div className="grid gap-[8px] sm:grid-cols-2">
            <div className="rounded-control bg-white p-[13px]">
              <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Design tensile strength</div>
              <div className="mt-[4px] text-f20 font-bold text-t1">{design.designStrengthMPa.toFixed(0)} MPa</div>
              <div className="text-f12 text-t3">C_E {ACI_440_11.environmentalFactor} × f*fu · {design.designForceKn.toFixed(1)} kN per bar</div>
            </div>
            <div className="rounded-control bg-white p-[13px]">
              <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Sustained stress limit</div>
              <div className="mt-[4px] text-f20 font-bold text-t1">{design.sustainedLimitMPa.toFixed(0)} MPa</div>
              <div className="text-f12 text-t3">{ACI_440_11.sustainedStressRatio} × ffu · {design.sustainedForceKn.toFixed(1)} kN per bar</div>
            </div>
            <div className="rounded-control bg-white p-[13px]">
              <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Design rupture strain</div>
              <div className="mt-[4px] text-f20 font-bold text-t1">{(design.ruptureStrain * 100).toFixed(2)}%</div>
              <div className="text-f12 text-t3">ffu / Ef</div>
            </div>
            <div className="rounded-control bg-white p-[13px]">
              <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Stiffness vs steel</div>
              <div className="mt-[4px] text-f20 font-bold text-t1">{(design.stiffnessRatio * 100).toFixed(0)}%</div>
              <div className="text-f12 text-t3">Ef / 200 GPa</div>
            </div>
          </div>
        ) : (
          <div className="rounded-control bg-white p-[13px] text-f14 text-t2">Enter the certificate values in step 2 to see the design values.</div>
        )}

        <div className="rounded-control bg-white p-[13px] text-f14 text-t2">
          <div className="text-f12 font-bold uppercase tracking-[0.06em] text-t3">Weight</div>
          <p className="mt-[5px]">
            {unitMass.toFixed(3)} kg/m; {count} bars × {lengthM} m ≈ <strong className="text-t1">{totalMass.toFixed(0)} kg</strong>.
          </p>
        </div>

        <p className="text-f12 text-t3">
          ACI CODE-440.11-22 strength reduction factors for reference: φ = {ACI_440_11.phiTensionControlled} (tension-controlled)
          to {ACI_440_11.phiCompressionControlled} (compression-controlled) for moment and axial load, {ACI_440_11.phiShear} for shear.
          Crack width, deflection, development length and bent-bar strength are checked in the member design.
        </p>

        <Link href="/products/frp-rebar" className="block rounded-control border border-teal/30 bg-white p-[13px] text-f14 text-t2 transition-colors hover:border-teal">
          <span className="block text-f12 font-bold uppercase tracking-[0.06em] text-teal-text">F1 GFRP rebar</span>
          Straight bars, factory-formed stirrups and mesh, with a bar schedule builder <span aria-hidden>→</span>
        </Link>
        <a
          href={buildRfqHref({ source: "gfrp-rebar-calculator", product: "GFRP rebar", productPath: "/products/frp-rebar", message: `${summary}Project standard and edition, bar schedule and destination (please add): ____` })}
          onClick={() => track("gfrp_quote_click", { diameter: gfrpDiameter })}
          className="block rounded-control bg-teal px-[16px] py-[10px] text-center text-f14 font-bold text-white transition-colors hover:bg-teal-text"
        >
          Send to engineering
        </a>
      </div>
    </div>
  );
}
