"use client";

import { useState } from "react";

/**
 * Interactive laminate micrograph — fibers embedded in the resin matrix,
 * rendered as SVG from a deterministic seeded layout (stable between server
 * render and hydration). The slider changes fiber volume fraction and the
 * readout applies the rule of mixtures as an idealized UD upper bound.
 */

const W = 560;
const H = 360;
const FIBER_R = 5.2;

const E_GLASS_GPA = 72; // E-glass fiber modulus, published typical
const E_RESIN_GPA = 3.4; // thermoset matrix modulus, published typical
const RHO_GLASS = 2.56; // g/cm³
const RHO_RESIN = 1.2; // g/cm³

/** Deterministic PRNG so SSR and client render the same figure. */
function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

interface Strand {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function buildStrands(): Strand[] {
  const rng = seededRng(42);
  const zones: Array<[number, number]> = [
    [32, 66],
    [H - 66, H - 32],
  ];
  const strands: Strand[] = [];
  for (const [top, bottom] of zones) {
    for (let i = 0; i < 64; i++) {
      const x = rng() * W;
      const y = top + rng() * (bottom - top);
      const angle = rng() * Math.PI;
      const len = 14 + rng() * 22;
      strands.push({
        x1: x - (Math.cos(angle) * len) / 2,
        y1: y - (Math.sin(angle) * len) / 4,
        x2: x + (Math.cos(angle) * len) / 2,
        y2: y + (Math.sin(angle) * len) / 4,
      });
    }
  }
  return strands;
}

const STRANDS = buildStrands();

function buildFibers(vf: number): Array<{ cx: number; cy: number }> {
  // Hexagonal packing pitch from target fiber volume fraction.
  const pitch = FIBER_R * Math.sqrt(Math.PI / ((vf / 100) * (Math.sqrt(3) / 2)));
  const rng = seededRng(7);
  const fibers: Array<{ cx: number; cy: number }> = [];
  const top = 78;
  const bottom = H - 78;
  let row = 0;
  for (let y = top; y <= bottom; y += pitch * 0.866) {
    const offset = row % 2 === 1 ? pitch / 2 : 0;
    for (let x = 10 + offset; x < W - 8; x += pitch) {
      const jx = (rng() - 0.5) * pitch * 0.22;
      const jy = (rng() - 0.5) * pitch * 0.22;
      fibers.push({ cx: x + jx, cy: y + jy });
    }
    row++;
  }
  return fibers;
}

export default function LaminateMicrograph() {
  const [vf, setVf] = useState(55);
  const fibers = buildFibers(vf);

  const vfFrac = vf / 100;
  // Rule of mixtures — idealized unidirectional upper bound.
  const axialModulus = vfFrac * E_GLASS_GPA + (1 - vfFrac) * E_RESIN_GPA;
  const glassMass = vfFrac * RHO_GLASS;
  const weightPct = (glassMass / (glassMass + (1 - vfFrac) * RHO_RESIN)) * 100;

  return (
    <figure className="rounded-[8px] border border-border-default bg-white p-[21px]">
      <div className="flex flex-wrap items-center gap-[16px]">
        <label htmlFor="vf-slider" className="text-f13 font-semibold text-t1">
          Fiber volume fraction
        </label>
        <input
          id="vf-slider"
          type="range"
          min={35}
          max={70}
          step={1}
          value={vf}
          onChange={(e) => setVf(Number(e.target.value))}
          className="w-[180px] accent-teal"
        />
        <span className="text-f13 font-bold tabular-nums text-teal-text">{vf} % vol</span>
        <span className="text-f13 tabular-nums text-t2">≈ {weightPct.toFixed(0)} % by weight</span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-[13px] w-full rounded-[4px]"
        role="img"
        aria-label="Cross-section of a pultruded FRP laminate: surface veil, continuous filament mat layers, and unidirectional glass rovings embedded in the resin matrix"
      >
        <rect width={W} height={H} fill="#e8a13c" />
        <rect width={W} height={26} fill="#f3c67d" />
        <rect y={H - 26} width={W} height={26} fill="#f3c67d" />
        {STRANDS.map((s, i) => (
          <line
            key={i}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke="#d9b98a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
        {fibers.map((f, i) => (
          <circle
            key={i}
            cx={f.cx}
            cy={f.cy}
            r={FIBER_R}
            fill="#eef2f7"
            stroke="rgba(13,15,36,0.18)"
            strokeWidth="1"
          />
        ))}
        <text x="10" y="17" fontSize="10" fontWeight="700" fill="#8a5c10">
          SURFACE VEIL — matrix-rich corrosion barrier
        </text>
        <text x="10" y="50" fontSize="10" fontWeight="700" fill="#7a5a22">
          CFM — random mat, transverse strength
        </text>
        <text x="10" y={H / 2 + 3} fontSize="10" fontWeight="700" fill="#0d0f24">
          UD ROVING CORE — axial load path
        </text>
        <line x1={W - 92} y1={H - 12} x2={W - 22} y2={H - 12} stroke="#0d0f24" strokeWidth="2" />
        <text x={W - 88} y={H - 18} fontSize="10" fill="#0d0f24">
          ~0.5 mm
        </text>
      </svg>

      <div className="mt-[13px] grid gap-[13px] sm:grid-cols-2">
        <div className="rounded-[8px] bg-bg2 p-[13px]">
          <p className="text-f12 font-semibold uppercase tracking-[0.08em] text-t2">
            Idealized UD axial modulus (rule of mixtures)
          </p>
          <p className="mt-[3px] text-f19 font-bold tabular-nums text-t1">
            ≈ {axialModulus.toFixed(0)} GPa
          </p>
          <p className="text-f12 leading-golden text-t2">
            E<sub>1</sub> = V<sub>f</sub>·72 + (1−V<sub>f</sub>)·3.4 GPa — upper bound for the
            roving core only, not the full section.
          </p>
        </div>
        <div className="rounded-[8px] bg-bg2 p-[13px]">
          <p className="text-f12 font-semibold uppercase tracking-[0.08em] text-t2">
            Full-section reality check (EN 13706)
          </p>
          <p className="mt-[3px] text-f19 font-bold text-t1">E17 / E23 grades</p>
          <p className="text-f12 leading-golden text-t2">
            Mats and veil dilute the axial number: a certified profile guarantees ≥17 or
            ≥23 GPa measured on the full cross-section, not the UD ideal.
          </p>
        </div>
      </div>

      <figcaption className="mt-[13px] text-f13 leading-golden text-t2">
        What a pultruded laminate looks like in cross-section. The white circles are glass
        fibers carrying axial load; everything amber is the resin matrix — transferring
        shear between fibers, stopping buckling, and forming the corrosion barrier at the
        surface. Drag the slider: more fiber means more stiffness but less matrix to
        protect and bind it — pultrusion typically runs 55–72 % fiber by volume in the core.
      </figcaption>
    </figure>
  );
}
