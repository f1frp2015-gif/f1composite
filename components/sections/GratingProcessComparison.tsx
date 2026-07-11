import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import { GRAY, DARK, TEAL, TEAL_SOFT } from "@/components/sections/FrpProcessShowcase";

/**
 * Molded vs pultruded grating: animated process figures + property
 * comparison + application fit. Pure inline SVG with SMIL — no JS,
 * same idiom as FrpProcessShowcase / ConceptAnimations.
 * Process data mirrors the production catalog behind the spec tables:
 * molded 30-35% glass, thermally cured in an open mold; pultruded
 * 60-65% glass, I/T bars drilled and bonded with cross-rods.
 */

const WARM = "#f59e0b";

/** Four-stage molded grating cycle: layup → wet-out → cure → demold. */
function MoldedProcessFigure() {
  return (
    <svg
      viewBox="0 0 480 132"
      className="w-full"
      role="img"
      aria-label="Molded FRP grating process: continuous rovings laid in an open mold, wetted out with resin, thermally cured, and demolded as a one-piece mesh panel"
    >
      {/* ① layup — alternating rovings appear in the mold grid */}
      <rect x="13" y="16" width="94" height="76" rx="3" fill="none" stroke={DARK} strokeWidth="2" />
      {[28, 44, 60, 76].map((y, i) => (
        <line key={`h${y}`} x1="19" y1={y} x2="101" y2={y} stroke={TEAL} strokeWidth="3" strokeLinecap="round" opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.88;1" dur="4.2s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
        </line>
      ))}
      {[31, 51, 71, 91].map((x, i) => (
        <line key={`v${x}`} x1={x} y1="22" x2={x} y2="86" stroke={TEAL} strokeWidth="3" strokeLinecap="round" opacity="0">
          <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.88;1" dur="4.2s" begin={`${1.4 + i * 0.35}s`} repeatCount="indefinite" />
        </line>
      ))}
      <text x="60" y="106" textAnchor="middle" fontSize="8.5" fill={DARK}>1 · Lay rovings both ways</text>

      {/* ② resin wet-out — level rises through the weave */}
      <rect x="133" y="16" width="94" height="76" rx="3" fill="none" stroke={DARK} strokeWidth="2" />
      {[30, 46, 62, 78].map((y) => (
        <line key={`g${y}`} x1="139" y1={y} x2="221" y2={y} stroke={GRAY} strokeWidth="2.5" opacity="0.35" />
      ))}
      <rect x="136" y="85" width="88" height="4" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="1">
        <animate attributeName="y" values="85;29;29;85" keyTimes="0;0.55;0.9;1" dur="4.2s" repeatCount="indefinite" />
        <animate attributeName="height" values="4;60;60;4" keyTimes="0;0.55;0.9;1" dur="4.2s" repeatCount="indefinite" />
      </rect>
      <circle cx="180" cy="10" r="3" fill={TEAL}>
        <animate attributeName="cy" values="8;24" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="0.9s" repeatCount="indefinite" />
      </circle>
      <text x="180" y="106" textAnchor="middle" fontSize="8.5" fill={DARK}>2 · Wet out with resin</text>

      {/* ③ thermal cure — heat pulses around the closed charge */}
      <rect x="253" y="30" width="94" height="48" rx="3" fill={DARK} />
      <rect x="258" y="44" width="84" height="20" rx="2" fill={TEAL}>
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
      </rect>
      {[0, 1, 2].map((i) => (
        <path key={`wb${i}`} d={`M${266 + i * 26} 90 q4 -6 8 0 t8 0`} stroke={WARM} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </path>
      ))}
      {[0, 1].map((i) => (
        <path key={`wt${i}`} d={`M${278 + i * 28} 22 q4 -6 8 0 t8 0`} stroke={WARM} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="1.6s" begin={`${0.2 + i * 0.5}s`} repeatCount="indefinite" />
        </path>
      ))}
      <text x="300" y="106" textAnchor="middle" fontSize="8.5" fill={DARK}>3 · Cure under heat</text>

      {/* ④ demold — one-piece mesh lifts out */}
      <ellipse cx="420" cy="94" rx="36" ry="4" fill="#0f172a" opacity="0.14">
        <animate attributeName="opacity" values="0.14;0.05;0.05;0.14" keyTimes="0;0.3;0.85;1" dur="3.4s" repeatCount="indefinite" />
      </ellipse>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 8; 0 0; 0 0; 0 8" keyTimes="0;0.3;0.85;1" dur="3.4s" repeatCount="indefinite" />
        <rect x="381" y="28" width="78" height="54" rx="2" fill={TEAL} />
        {[387, 405, 423, 441].map((x) =>
          [34, 52].map((y) => (
            <rect key={`m${x}-${y}`} x={x} y={y} width="12" height="12" rx="1" fill="#fff" />
          )),
        )}
      </g>
      <path d="M372 62 v-16 m0 0 l-4 5 m4 -5 l4 5" stroke={DARK} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <animate attributeName="opacity" values="0.2;1;1;0.2" keyTimes="0;0.3;0.85;1" dur="3.4s" repeatCount="indefinite" />
      </path>
      <text x="420" y="106" textAnchor="middle" fontSize="8.5" fill={DARK}>4 · Demold one-piece mesh</text>
    </svg>
  );
}

/** Continuous pultrusion line + panel assembly from bars and cross-rods. */
function PultrudedProcessFigure() {
  return (
    <svg
      viewBox="0 0 480 132"
      className="w-full"
      role="img"
      aria-label="Pultruded FRP grating process: rovings pulled through a resin bath and heated die into bearing bars, cut by a flying saw, then drilled and bonded with cross-rods into a panel"
    >
      {/* creel */}
      {[30, 52, 74].map((cy) => (
        <g key={cy}>
          <circle cx="14" cy={cy} r="5" fill="none" stroke={GRAY} strokeWidth="1.6" />
          <circle cx="14" cy={cy} r="1.4" fill={GRAY} />
        </g>
      ))}
      {/* rovings converging into the bath */}
      {["M19 30 C40 30 54 46 70 50", "M19 52 L70 52", "M19 74 C40 74 54 58 70 54"].map((d) => (
        <path key={d} d={d} stroke={GRAY} strokeWidth="1.6" fill="none" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" values="7;0" dur="0.7s" repeatCount="indefinite" />
        </path>
      ))}
      {/* resin bath */}
      <path d="M70 42 v18 q0 6 6 6 h26 q6 0 6 -6 v-18" fill="none" stroke={DARK} strokeWidth="2" />
      <rect x="73" y="52" width="32" height="12" rx="2" fill={TEAL_SOFT}>
        <animate attributeName="y" values="52;50;52" dur="2s" repeatCount="indefinite" />
      </rect>
      <line x1="73" y1="52" x2="105" y2="52" stroke={TEAL} strokeWidth="2" strokeDasharray="5 3">
        <animate attributeName="stroke-dashoffset" values="8;0" dur="0.8s" repeatCount="indefinite" />
      </line>
      {/* heated die */}
      <rect x="126" y="39" width="34" height="26" rx="2" fill={DARK} />
      <rect x="126" y="39" width="34" height="4" fill={TEAL}>
        <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
      </rect>
      <rect x="126" y="61" width="34" height="4" fill={TEAL}>
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </rect>
      {/* cured bar leaving the die */}
      <rect x="160" y="48" width="58" height="8" rx="1" fill={TEAL} />
      {/* puller rollers */}
      {[40, 64].map((cy) => (
        <circle key={cy} cx="192" cy={cy} r="6" fill="none" stroke={DARK} strokeWidth="1.8" strokeDasharray="3 3">
          <animateTransform attributeName="transform" type="rotate" values={`0 192 ${cy}; ${cy === 40 ? 360 : -360} 192 ${cy}`} dur="2s" repeatCount="indefinite" />
        </circle>
      ))}
      {/* flying saw */}
      <circle cx="232" cy="38" r="7" fill="none" stroke={DARK} strokeWidth="1.6" strokeDasharray="2.5 2.5">
        <animateTransform attributeName="transform" type="rotate" values="0 232 38; 360 232 38" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <line x1="232" y1="45" x2="232" y2="60" stroke={WARM} strokeWidth="2" strokeLinecap="round" opacity="0">
        <animate attributeName="opacity" values="0;1;0;0" keyTimes="0;0.12;0.3;1" dur="2.8s" repeatCount="indefinite" />
      </line>
      {/* cut bar segment carried away */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 36 0" dur="2.8s" repeatCount="indefinite" />
        <rect x="240" y="48" width="26" height="8" rx="1" fill={TEAL}>
          <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.75;1" dur="2.8s" repeatCount="indefinite" />
        </rect>
      </g>
      {/* assembly: bearing bars + cross-rods bonded into a panel */}
      {[330, 358, 386, 414].map((x) => (
        <rect key={x} x={x} y="22" width="7" height="72" rx="1" fill={TEAL} />
      ))}
      {[
        { y: 32, begin: "0s" },
        { y: 56, begin: "0.5s" },
        { y: 80, begin: "1s" },
      ].map((rod) => (
        <rect key={rod.y} x="318" y={rod.y} width="110" height="5" rx="2.5" fill={GRAY} opacity="0">
          <animateTransform attributeName="transform" type="translate" values="-26 0; 0 0; 0 0" keyTimes="0;0.35;1" dur="3.6s" begin={rod.begin} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.35;1" dur="3.6s" begin={rod.begin} repeatCount="indefinite" />
        </rect>
      ))}
      <rect x="314" y="18" width="118" height="80" rx="3" fill="none" stroke={TEAL} strokeWidth="1.5" opacity="0">
        <animate attributeName="opacity" values="0;0;0.8;0" keyTimes="0;0.55;0.8;1" dur="3.6s" begin="1s" repeatCount="indefinite" />
      </rect>
      {/* stage labels */}
      <text x="14" y="118" textAnchor="middle" fontSize="8.5" fill={DARK}>Creel</text>
      <text x="89" y="118" textAnchor="middle" fontSize="8.5" fill={DARK}>Resin bath</text>
      <text x="143" y="118" textAnchor="middle" fontSize="8.5" fill={DARK}>Heated die</text>
      <text x="215" y="118" textAnchor="middle" fontSize="8.5" fill={DARK}>Puller · saw</text>
      <text x="373" y="118" textAnchor="middle" fontSize="8.5" fill={DARK}>Drilled bars + bonded cross-rods</text>
    </svg>
  );
}

const moldedSteps = [
  "Continuous rovings laid in alternating directions in an open mold",
  "Resin wets out the full weave — 30-35% glass by weight, resin-rich surfaces",
  "Panel thermally cured in the mold as a single piece",
  "Demolded mesh carries near-equal strength in both directions",
];

const pultrudedSteps = [
  "Rovings pulled through a resin bath and heated die — 60-65% glass by weight",
  "Continuous cured bar cut to length by a flying saw",
  "Bearing bars drilled on a fixed cross-bar pitch",
  "Cross-rods inserted and epoxy-bonded into a rigid open panel",
];

const comparisonRows = [
  {
    attr: "Manufacturing route",
    molded: "One-shot woven layup, thermally cured in an open mold",
    pultruded: "Pultruded I/T bearing bars, drilled and bonded with cross-rods",
  },
  {
    attr: "Glass content (by weight)",
    molded: "30-35%",
    pultruded: "60-65%",
  },
  {
    attr: "Load-bearing behavior",
    molded: "Bi-directional — near-equal strength both ways",
    pultruded: "Unidirectional — strength concentrated along bearing bars",
  },
  {
    attr: "Span capability",
    molded: "Short to medium spans, supports on all sides",
    pultruded: "Long clear spans, deflection-governed designs",
  },
  {
    attr: "Open area range",
    molded: "30-82% depending on mesh",
    pultruded: "12-83% depending on series",
  },
  {
    attr: "Max standard panel",
    molded: "1524 x 4000 mm",
    pultruded: "1524 x 6100 mm",
  },
  {
    attr: "Field cutting & cutouts",
    molded: "Cut freely in any direction around penetrations",
    pultruded: "Plan cuts so bearing bars span the load direction",
  },
  {
    attr: "Chemical resistance",
    molded: "Highest — resin-rich construction (65-70% resin)",
    pultruded: "High — veil-protected, thinner resin-rich outer layer",
  },
  {
    attr: "Impact tolerance",
    molded: "Excellent, mesh redistributes damage both ways",
    pultruded: "Good — individual damaged bars can be replaced",
  },
  {
    attr: "Heel-proof / ADA options",
    molded: "19 x 19 mm mini mesh",
    pultruded: "T- and I-series types with openings of 13 mm or less",
  },
  {
    attr: "Forklift / vehicular",
    molded: "Limited — heavy-duty 50-65 mm meshes only",
    pultruded: "HI high-load series with AASHTO wheel-load span tables",
  },
  {
    attr: "Fire rating",
    molded: "ASTM E84 Class 1 (FSI ≤25)",
    pultruded: "ASTM E84 Class 1 (FSI ≤25)",
  },
];

const moldedFit = [
  "Chemical, wastewater, and marine platforms where corrosion is the number-one design driver",
  "Loads and foot traffic arriving from any direction, with support available on all sides",
  "Layouts with many penetrations, pipe openings, and irregular field cutouts",
  "Trench and drain covers, wet-area walkways, anti-slip retrofit over existing structure",
  "Heel-proof public areas using 19 x 19 mm mini mesh",
];

const pultrudedFit = [
  "Long clear spans: pipe-rack crossovers, elevated walkways, fewer support beams",
  "Cooling towers and airflow-critical decks — SI series with 73-83% open area",
  "ADA / DDA public walkways and pedestrian bridges — T-series with 13 mm openings",
  "Forklift and vehicle traffic — HI high-load series rated per AASHTO wheel loads",
  "Retrofits where the stiffness and sightlines of metal grating must be matched",
];

export default function GratingProcessComparison() {
  return (
    <section className="bg-white py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <SectionTag>Molded vs Pultruded</SectionTag>
        <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
          Molded vs pultruded FRP grating: process, properties, and best fit
        </h2>
        <p className="mt-[13px] max-w-[780px] text-f15 leading-golden text-t2">
          The two grating families start from the same glass-and-resin system
          but are made in opposite ways — one woven and cured as a single
          piece, one assembled from pultruded bars. That single difference
          drives almost every selection decision: strength direction, span,
          chemical resistance, and how the panels behave when you cut them.
        </p>

        {/* Animated process figures */}
        <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
          <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
            <h3 className="text-[17px] font-bold text-t1">How molded grating is made</h3>
            <div className="mt-[13px] rounded-[8px] bg-white p-[13px]">
              <MoldedProcessFigure />
            </div>
            <ol className="mt-[13px] space-y-[5px]">
              {moldedSteps.map((step, i) => (
                <li key={step} className="flex gap-[8px] text-f13 leading-golden text-t2">
                  <span className="font-bold text-teal-text">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
            <h3 className="text-[17px] font-bold text-t1">How pultruded grating is made</h3>
            <div className="mt-[13px] rounded-[8px] bg-white p-[13px]">
              <PultrudedProcessFigure />
            </div>
            <ol className="mt-[13px] space-y-[5px]">
              {pultrudedSteps.map((step, i) => (
                <li key={step} className="flex gap-[8px] text-f13 leading-golden text-t2">
                  <span className="font-bold text-teal-text">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Property comparison */}
        <div className="mt-[34px] overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-border-default">
                <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                  Property
                </th>
                <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                  Molded Grating
                </th>
                <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                  Pultruded Grating
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.attr} className="border-b border-border-default">
                  <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">
                    {row.attr}
                  </td>
                  <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.molded}</td>
                  <td className="py-[13px] text-f15 text-t2">{row.pultruded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Application fit */}
        <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
          <div className="rounded-[8px] border border-border-default bg-bg2 p-[34px]">
            <h3 className="text-[17px] font-bold text-t1">Choose molded grating when</h3>
            <ul className="mt-[13px] list-disc space-y-[8px] pl-[21px]">
              {moldedFit.map((item) => (
                <li key={item} className="text-f15 leading-golden text-t2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[8px] border border-border-default bg-bg2 p-[34px]">
            <h3 className="text-[17px] font-bold text-t1">Choose pultruded grating when</h3>
            <ul className="mt-[13px] list-disc space-y-[8px] pl-[21px]">
              {pultrudedFit.map((item) => (
                <li key={item} className="text-f15 leading-golden text-t2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[34px] flex flex-wrap gap-[13px]">
          <LinkArrow href="/technology/pultrusion-process">The pultrusion process in 6 stages</LinkArrow>
          <LinkArrow href="/technology/frp-vs-steel-gratings">FRP vs steel gratings</LinkArrow>
        </div>
      </div>
    </section>
  );
}
