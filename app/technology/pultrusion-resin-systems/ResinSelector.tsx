"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Interactive resin-system selection matrix. Ratings are relative 1–5 bands
 * across the five thermoset families we pultrude — they encode the standard
 * industry trade-offs (see the published-range table on the page for the
 * underlying numbers), not lab measurements of a specific formulation.
 */

interface ResinSystem {
  key: string;
  name: string;
  shortName: string;
  color: string;
  /** [corrosion, mechanical, heat, fire, cost efficiency, line speed] */
  ratings: [number, number, number, number, number, number];
  specs: Array<{ label: string; value: string }>;
  verdict: string;
  typicalUse: string;
  link?: { href: string; label: string };
}

const AXES = [
  "Corrosion",
  "Mechanical",
  "Heat",
  "Fire & smoke",
  "Cost eff.",
  "Line speed",
];

const SYSTEMS: ResinSystem[] = [
  {
    key: "polyester",
    name: "Isophthalic Polyester",
    shortName: "Polyester",
    color: "#65a30d",
    ratings: [3, 3, 3, 2, 5, 5],
    specs: [
      { label: "HDT (typical)", value: "80–110 °C" },
      { label: "Chemical duty", value: "General atmospheric, mild chemical" },
      { label: "Relative resin cost", value: "$ — baseline" },
      { label: "Fire route", value: "ATH-filled grades reach ASTM E84 Class A" },
    ],
    verdict:
      "The cost-efficient workhorse — the default matrix for general structural profiles unless the environment or the spec says otherwise.",
    typicalUse:
      "Standard structural shapes, gratings, cable tray, ladder rail, general fabrication stock.",
    link: { href: "/products/standard-profiles", label: "Standard profiles" },
  },
  {
    key: "vinylester",
    name: "Vinyl Ester",
    shortName: "Vinyl ester",
    color: "#00a199",
    ratings: [5, 4, 4, 3, 3, 4],
    specs: [
      { label: "HDT (typical)", value: "100–150 °C" },
      { label: "Chemical duty", value: "Acids, chlorides, caustics, marine splash" },
      { label: "Relative resin cost", value: "$$ — ~1.5–2× polyester" },
      { label: "Fire route", value: "Brominated + ATH grades, Class A available" },
    ],
    verdict:
      "The corrosion-duty default. Specify it whenever the service environment involves chemical exposure, chloride spray, or immersion.",
    typicalUse:
      "Chemical plant platforms, wastewater treatment, marine walkways, cooling towers, splash zones.",
    link: { href: "/industries/marine", label: "Marine applications" },
  },
  {
    key: "polyurethane",
    name: "Polyurethane (PU)",
    shortName: "Polyurethane",
    color: "#2563eb",
    ratings: [3, 5, 3, 3, 3, 4],
    specs: [
      { label: "HDT (typical)", value: "80–110 °C" },
      { label: "Signature property", value: "Transverse strength & impact toughness" },
      { label: "Relative resin cost", value: "$$ — needs closed injection box" },
      { label: "Fire route", value: "FR grades emerging; verify per project" },
    ],
    verdict:
      "The toughness specialist — its transverse strength allows thinner walls and better screw retention, which is why it dominates fenestration lineals.",
    typicalUse:
      "Window and door lineals, thin-wall profiles, parts that take fasteners or impact.",
    link: { href: "/technology/polyurethane-pultrusion-windows", label: "PU pultrusion windows" },
  },
  {
    key: "epoxy",
    name: "Epoxy",
    shortName: "Epoxy",
    color: "#7c3aed",
    ratings: [4, 5, 5, 2, 2, 2],
    specs: [
      { label: "Tg (typical)", value: "120–180 °C" },
      { label: "Signature property", value: "Fatigue life, low cure shrinkage" },
      { label: "Relative resin cost", value: "$$$ — plus slower line speeds" },
      { label: "Fire route", value: "Add-on FR systems only" },
    ],
    verdict:
      "The performance ceiling — chosen when fatigue, temperature, or dimensional stability requirements rule the others out, and the budget follows the spec.",
    typicalUse:
      "Insulator rod, tool handles, carbon-fiber pultrusions, high-cycle structural parts.",
  },
  {
    key: "phenolic",
    name: "Phenolic",
    shortName: "Phenolic",
    color: "#dc2626",
    ratings: [3, 3, 5, 5, 3, 2],
    specs: [
      { label: "Service temp.", value: "Highest of the five families" },
      { label: "Signature property", value: "Low flame spread, low smoke & toxicity" },
      { label: "Relative resin cost", value: "$$ — slower, wetter process" },
      { label: "Fire route", value: "Inherent — the resin chemistry itself" },
    ],
    verdict:
      "The fire specialist — specified where low smoke and toxicity are code requirements, not preferences: tunnels, rolling stock, offshore.",
    typicalUse:
      "Rail interiors (EN 45545-2), metro and tunnel walkways, offshore platforms, mining.",
  },
];

const CX = 180;
const CY = 150;
const R = 104;
const N = AXES.length;

function point(axis: number, value: number): [number, number] {
  const angle = -Math.PI / 2 + (axis * 2 * Math.PI) / N;
  return [CX + Math.cos(angle) * R * (value / 5), CY + Math.sin(angle) * R * (value / 5)];
}

function polygonPoints(values: readonly number[]): string {
  return values.map((v, i) => point(i, v).join(",")).join(" ");
}

export default function ResinSelector() {
  const [activeKey, setActiveKey] = useState("vinylester");
  const active = SYSTEMS.find((s) => s.key === activeKey) ?? SYSTEMS[1];

  return (
    <section className="bg-bg2 py-[55px]" id="resin-selector">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <h2 className="text-f24 font-bold text-t1 md:text-f31">
          Interactive resin selection matrix
        </h2>
        <p className="mt-[13px] max-w-[800px] text-f15 leading-golden text-t2">
          Pick a resin system to compare its trade-off profile. Ratings are relative
          bands (1–5) across the five thermoset families used in pultrusion — use them
          to shortlist, then confirm against the datasheet values below.
        </p>

        <div
          className="mt-[21px] flex flex-wrap gap-[8px]"
          role="group"
          aria-label="Resin system selector"
        >
          {SYSTEMS.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={s.key === active.key}
              onClick={() => setActiveKey(s.key)}
              className={`rounded-[8px] border px-[16px] py-[8px] text-f13 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal ${
                s.key === active.key
                  ? "border-t1 bg-t1 text-white"
                  : "border-border-default bg-white text-t2 hover:border-t2"
              }`}
            >
              {s.shortName}
            </button>
          ))}
        </div>

        <div className="mt-[21px] grid gap-[34px] rounded-[8px] border border-border-default bg-white p-[21px] lg:grid-cols-[1fr_1.1fr]">
          <svg
            viewBox="0 0 360 312"
            className="mx-auto w-full max-w-[420px]"
            role="img"
            aria-label={`Radar chart: ${active.name} rated across corrosion, mechanical, heat, fire, cost, and line speed`}
          >
            {[1, 2, 3, 4, 5].map((ring) => (
              <polygon
                key={ring}
                points={polygonPoints(AXES.map(() => ring))}
                fill="none"
                stroke="#e3e6ef"
                strokeWidth="1"
              />
            ))}
            {AXES.map((axis, i) => {
              const [ex, ey] = point(i, 5);
              const [lx, ly] = point(i, 6.3);
              return (
                <g key={axis}>
                  <line x1={CX} y1={CY} x2={ex} y2={ey} stroke="#e3e6ef" strokeWidth="1" />
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="600"
                    fill="#4b4f6a"
                  >
                    {axis}
                  </text>
                </g>
              );
            })}
            <polygon
              points={polygonPoints(active.ratings)}
              fill={`${active.color}26`}
              stroke={active.color}
              strokeWidth="2.5"
            />
            {active.ratings.map((v, i) => {
              const [x, y] = point(i, v);
              return <circle key={AXES[i]} cx={x} cy={y} r="4" fill={active.color} />;
            })}
          </svg>

          <div>
            <h3 className="text-f19 font-bold" style={{ color: active.color }}>
              {active.name}
            </h3>
            <p className="mt-[8px] text-f15 leading-golden text-t2">{active.verdict}</p>
            <table className="mt-[13px] w-full border-collapse text-f13">
              <tbody>
                {active.specs.map((row) => (
                  <tr key={row.label} className="border-b border-border-default">
                    <td className="py-[8px] pr-[13px] font-semibold uppercase tracking-[0.05em] text-t2">
                      {row.label}
                    </td>
                    <td className="py-[8px] text-t1">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-[13px] text-f13 leading-golden text-t2">
              <strong className="text-t1">Typical use:</strong> {active.typicalUse}
            </p>
            <div className="mt-[13px] flex flex-wrap gap-[13px]">
              {active.link && (
                <Link
                  href={active.link.href}
                  className="text-f13 font-semibold text-teal-text hover:underline"
                >
                  → {active.link.label}
                </Link>
              )}
              <Link href="/contact" className="text-f13 font-semibold text-teal-text hover:underline">
                → Request a quote with this resin system
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
