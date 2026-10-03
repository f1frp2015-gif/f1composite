
import type { ReactNode } from "react";
import { AnimatedConcept } from "@/components/ui/AnimatedConcept";
import { GRAY, DARK, TEAL, TEAL_SOFT, PultrusionIcon, FilamentWindingIcon } from "@/components/sections/FrpProcessShowcase";

const COLD = "#3b82f6";
const WARM = "#f59e0b";

/** Arrow speed is identical: count/width are qualitative, never a heat-flow measurement. */
function HeatArrows({ lower = false }: { lower?: boolean }) {
  return <>{(lower ? [69] : [49, 69, 89]).map((y) => (
    <g key={y}>
      <animateTransform begin="indefinite" attributeName="transform" type="translate" values="0 0;-140 0" dur="3s" repeatCount="indefinite" />
      <path d={`M184 ${y}h-16m0 0l5 -4m-5 4l5 4`} stroke={WARM} strokeWidth={lower ? 1.5 : 2.4} fill="none" strokeLinecap="round" />
    </g>
  ))}</>;
}

const heatCaption = "For equal idealized geometry and temperature difference, lower conductivity reduces conductive heat flow; it does not stop it. Arrow count and width are illustrative, not measured rates. Material conductivity is not whole-window U-value. Condensation occurs when a surface is below the adjacent air's dew point.";
const coreCaption = "Candidate inserts in a uPVC chamber. A lower-conductivity GRP core can reduce the insert's contribution to heat transfer; heat still passes through the assembly. Section stiffness, connections and whole-frame U-value need separate verification. Arrows are qualitative.";

function ThermalDiagrams({ core = false }: { core?: boolean }) {
  return <div className="grid gap-[20px] sm:grid-cols-2">
    {[false, true].map((lower) => (
      <svg key={String(lower)} viewBox="0 0 220 138" className="w-full" role="img"
        aria-label={`${lower ? "Fiberglass" : core ? "Steel" : "Unbroken aluminum"} ${core ? "insert" : "material section"} with finite heat flow from warm right to cold left; qualitative illustration`}>
        <text x="110" y="13" textAnchor="middle" fontSize="10" fontWeight="700" fill={lower ? TEAL : DARK}>
          {core ? lower ? "GRP insert" : "Steel insert" : lower ? "Fiberglass material" : "Unbroken aluminum material"}
        </text>
        <text x="17" y="32" fontSize="9" fill={COLD}>Colder</text>
        <text x="168" y="32" fontSize="9" fill={WARM}>Warmer</text>
        {core ? <>
          <rect x="40" y="39" width="140" height="66" rx="5" fill="none" stroke={GRAY} strokeWidth="2.5" />
          <path d="M78 51v42h64V51" stroke={lower ? TEAL : "#64748b"} strokeWidth="7" fill="none" />
        </> : <rect x="92" y="39" width="36" height="66" fill={lower ? TEAL_SOFT : "#cbd5e1"} stroke={lower ? TEAL : GRAY} strokeWidth="2" />}
        <HeatArrows lower={lower} />
        <text x="110" y="122" textAnchor="middle" fontSize="8.5" fill={DARK}>
          {lower ? "Lower conduction • heat still passes" : "Higher material conduction"}
        </text>
        <text x="110" y="135" textAnchor="middle" fontSize="8" fill={GRAY}>Equal geometry / temperature difference</text>
      </svg>
    ))}
  </div>;
}

export function HeatFlowFrameComparison({ bare = false }: { bare?: boolean } = {}) {
  const drawing = <AnimatedConcept label="heat-flow comparison"><ThermalDiagrams /></AnimatedConcept>;
  return bare ? drawing : <figure className="rounded-card border border-border-default bg-white p-[20px]">
    {drawing}<figcaption className="mt-[12px] text-f14 leading-golden text-t2">{heatCaption}</figcaption>
  </figure>;
}

export function SteelVsFrpChamberCore({ bare = false }: { bare?: boolean } = {}) {
  const drawing = <AnimatedConcept label="reinforcement heat flow"><ThermalDiagrams core /></AnimatedConcept>;
  return bare ? drawing : <figure className="rounded-card border border-border-default bg-white p-[20px]">
    {drawing}<figcaption className="mt-[12px] text-f14 leading-golden text-t2">{coreCaption}</figcaption>
  </figure>;
}

/* ---- window opening types ---- */

function OpeningFrame({ children, label, sub }: { children: ReactNode; label: string; sub: string }) {
  return (
    <div className="rounded-card border border-border-default bg-bg2 p-[12px]">
      <AnimatedConcept label={`${label} opening`}><svg role="img" viewBox="0 0 170 130" className="w-full" aria-label={`${label} window opening animation`}>
        {children}
      </svg></AnimatedConcept>
      <p className="mt-[8px] text-f14 font-bold text-t1">{label}</p>
      <p className="text-f12 leading-golden text-t2">{sub}</p>
    </div>
  );
}

/** All the ways a window opens — animated opening-type guide. */
export function WindowOpeningTypes() {
  const frame = <rect x="45" y="16" width="80" height="100" rx="3" fill="none" stroke={DARK} strokeWidth="3" />;
  return (
    <figure className="rounded-card border border-border-default bg-white p-[20px]">
      <div className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
        {/* Casement — side-hung, swings like a door */}
        <OpeningFrame label="Casement" sub="Side-hung sash; front projection shows the fixed hinge edge.">
          {frame}
          <circle cx="53" cy="30" r="2.4" fill={DARK} />
          <circle cx="53" cy="102" r="2.4" fill={DARK} />
          <rect x="53" y="24" width="64" height="84" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5">
            <animate begin="indefinite" attributeName="width" values="64;26;26;64" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </rect>
          <path d="M117 66 q22 0 26 -22" stroke={GRAY} strokeWidth="1.4" fill="none" strokeDasharray="4 3" opacity="0">
            <animate begin="indefinite" attributeName="opacity" values="0;1;1;0" keyTimes="0;0.3;0.7;1" dur="4.5s" repeatCount="indefinite" />
          </path>
        </OpeningFrame>

        {/* Awning — top-hung, bottom swings out */}
        <OpeningFrame label="Awning (top-hung)" sub="Top hinge remains fixed; projected sash height shortens as it opens.">
          {frame}
          <circle cx="57" cy="24" r="2.4" fill={DARK} />
          <circle cx="113" cy="24" r="2.4" fill={DARK} />
          <rect x="53" y="24" width="64" height="84" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5">
            <animate begin="indefinite" attributeName="height" values="84;48;48;84" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </rect>
          {/* air out the bottom */}
          <path d="M76 112 q-4 8 -10 10 M96 112 q4 8 10 10" stroke={GRAY} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0">
            <animate begin="indefinite" attributeName="opacity" values="0;1;1;0" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </path>
        </OpeningFrame>

        {/* Tilt & Turn — two motions from one handle */}
        <OpeningFrame label="Tilt & Turn" sub="Bottom-hung tilt, return to closed, then side-hung turn.">
          {frame}
          <rect x="53" y="24" width="64" height="84" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5">
            {/* phase 1: tilt — top leans in (bottom edge fixed) */}
            <animate begin="indefinite" attributeName="y" values="24;42;24;24;24;24" keyTimes="0;0.14;0.28;0.5;0.9;1" dur="7s" repeatCount="indefinite" />
            <animate begin="indefinite" attributeName="height" values="84;66;84;84;84;84" keyTimes="0;0.14;0.28;0.5;0.9;1" dur="7s" repeatCount="indefinite" />
            {/* phase 2: turn — swings on side hinges */}
            <animate begin="indefinite" attributeName="width" values="64;64;64;26;26;64" keyTimes="0;0.28;0.5;0.64;0.82;1" dur="7s" repeatCount="indefinite" />
          </rect>
          <text x="85" y="12" textAnchor="middle" fontSize="8.5" fill={GRAY}>
            tilt → turn
          </text>
        </OpeningFrame>

        {/* Single hung — bottom sash slides up */}
        <OpeningFrame label="Single Hung" sub="Fixed top sash; lower sash slides upward on a separate track.">
          {frame}
          <rect x="53" y="24" width="64" height="40" rx="2" fill="none" stroke={GRAY} strokeWidth="2" />
          <text x="85" y="46" textAnchor="middle" fontSize="8" fill={GRAY}>fixed</text>
          <rect x="53" y="66" width="64" height="42" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5">
            <animate begin="indefinite" attributeName="y" values="66;36;36;66" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </rect>
        </OpeningFrame>

        {/* Double hung — both sashes slide */}
        <OpeningFrame label="Double Hung" sub="Two sashes travel on separate tracks; overlap is shown in projection.">
          {frame}
          <rect x="53" y="24" width="64" height="42" rx="2" fill="none" stroke={TEAL} strokeWidth="2.5">
            <animate begin="indefinite" attributeName="y" values="24;46;46;24" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </rect>
          <rect x="53" y="66" width="64" height="42" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5">
            <animate begin="indefinite" attributeName="y" values="66;44;44;66" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </rect>
        </OpeningFrame>

        {/* Lift & Slide — panel lifts then glides */}
        <OpeningFrame label="Lift & Slide" sub="The active panel lifts, then slides in front of the fixed panel.">
          <rect x="15" y="34" width="140" height="72" rx="3" fill="none" stroke={DARK} strokeWidth="3" />
          <rect x="21" y="40" width="62" height="60" rx="2" fill="none" stroke={GRAY} strokeWidth="2" />
          <g>
            <animateTransform begin="indefinite"               attributeName="transform"
              type="translate"
              values="0 0; 0 -3; -58 -3; -58 -3; 0 -3; 0 0"
              keyTimes="0;0.1;0.4;0.6;0.9;1"
              dur="6.5s"
              repeatCount="indefinite"
            />
            <rect x="87" y="40" width="62" height="60" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5" />
          </g>
        </OpeningFrame>
      </div>
      <figcaption className="mt-[12px] text-f14 leading-golden text-t2">
        Schematic front projections, not hardware drawings. Hinged sash dimensions only shorten in projection.
        Hardware, seals, opening limits and thermal paths depend on the complete window system.
      </figcaption>
    </figure>
  );
}



/** Endpoint restraints and the load tip stay in contact throughout the illustrative cycle. */
export function BeamDeflection({ bare = false }: { bare?: boolean } = {}) {
  const drawing = <AnimatedConcept label="beam deflection">
    <svg viewBox="0 0 240 110" className="mx-auto w-full max-w-[560px]" role="img" aria-label="Simply supported beam on a pin and roller under a central downward load; deformation exaggerated">
      <path d="M24 44H216" stroke={GRAY} strokeWidth="1" strokeDasharray="3 2" />
      <g>
        <animateTransform begin="indefinite" attributeName="transform" type="translate" values="0 0;0 13;0 0" dur="3s" repeatCount="indefinite" />
        <path d="M120 15V41m0 0l-5 -6m5 6l5 -6" stroke={DARK} strokeWidth="2" fill="none" />
        <text x="130" y="26" fontSize="10" fontWeight="700" fill={DARK}>F</text>
      </g>
      <path d="M24 44Q120 44 216 44" stroke={TEAL} strokeWidth="6" fill="none">
        <animate begin="indefinite" attributeName="d" values="M24 44Q120 44 216 44;M24 44Q120 70 216 44;M24 44Q120 44 216 44" dur="3s" repeatCount="indefinite" />
      </path>
      <line x1="120" y1="44" x2="120" y2="44" stroke={GRAY} strokeWidth="1.2">
        <animate begin="indefinite" attributeName="y2" values="44;57;44" dur="3s" repeatCount="indefinite" />
      </line>
      <text x="127" y="65" fontSize="9" fill={GRAY}>δ (exaggerated)</text>
      <path d="M24 47l-8 12h16Z M216 47l-8 12h16Z" fill={GRAY} />
      <path d="M10 60H38M202 68H230" stroke={GRAY} strokeWidth="1.4" />
      <circle cx="211" cy="63" r="3" fill="none" stroke={GRAY} /><circle cx="221" cy="63" r="3" fill="none" stroke={GRAY} />
      <path d="M24 82H216M24 78v8M216 78v8" stroke={GRAY} fill="none" />
      <text x="120" y="98" textAnchor="middle" fontSize="9" fill={GRAY}>span L • schematic shape</text>
    </svg>
  </AnimatedConcept>;
  return bare ? drawing : <figure className="rounded-card border border-border-default bg-white p-[20px]">
    {drawing}<figcaption className="mt-[8px] text-f14 leading-golden text-t2">An illustrative central point-load case with pin and roller supports. Deflection is exaggerated; the drawing is not a computed deformation or load rating. Check strength, stability, connections and serviceability separately.</figcaption>
  </figure>;
}

/** Extrusion icon — melt pushed through a die (for the process trio). */
function ExtrusionIcon() {
  return (
    <svg viewBox="0 0 120 80" className="h-[104px] w-full" aria-hidden="true">
      {/* hopper with pellets */}
      <path d="M28 12 h20 l-5 12 h-10 z" fill="none" stroke={DARK} strokeWidth="2" />
      <circle cx="38" cy="18" r="1.8" fill={GRAY}>
        <animate begin="indefinite" attributeName="cy" values="14;26" dur="0.9s" repeatCount="indefinite" />
        <animate begin="indefinite" attributeName="opacity" values="1;0" dur="0.9s" repeatCount="indefinite" />
      </circle>
      {/* barrel */}
      <rect x="16" y="24" width="64" height="26" rx="4" fill="none" stroke={DARK} strokeWidth="2" />
      {/* screw flights pushing right */}
      {[24, 36, 48, 60].map((x) => (
        <line key={x} x1={x} y1="33" x2={x + 8} y2="47" stroke={GRAY} strokeWidth="2">
          <animate begin="indefinite" attributeName="x1" values={`${x};${x + 12}`} dur="1s" repeatCount="indefinite" />
          <animate begin="indefinite" attributeName="x2" values={`${x + 8};${x + 20}`} dur="1s" repeatCount="indefinite" />
        </line>
      ))}
      {/* die + emerging profile */}
      <rect x="80" y="26" width="10" height="28" rx="2" fill={DARK} />
      <rect x="90" y="34" width="28" height="12" rx="2" fill={TEAL} />
      <path d="M95 40h15m-4 -3l4 3l-4 3" stroke="white" strokeWidth="1.5" fill="none">
        <animateTransform begin="indefinite" attributeName="transform" type="translate" values="0 0;5 0" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

/** Three continuous processes side by side: pull vs push vs wind. */
export function ProcessTrio({ bare = false }: { bare?: boolean } = {}) {
  const items = [
    { label: "Pultrusion — fibers PULLED", note: "continuous reinforcement, thermoset", icon: <PultrusionIcon />, highlight: true },
    { label: "Extrusion — melt PUSHED", note: "conventional thermoplastic example", icon: <ExtrusionIcon /> },
    { label: "Filament winding — fibers WOUND", note: "hollow rotational parts", icon: <FilamentWindingIcon /> },
  ];
  const cards = (
      <div className="grid gap-[20px] sm:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.label}
            className={`rounded-card p-[12px] ${it.highlight ? "border-2 border-teal bg-teal-bg" : "border border-border-default bg-bg2"}`}
          >
            {it.icon}
            <p className={`mt-[8px] text-f14 font-bold ${it.highlight ? "text-teal-text" : "text-t1"}`}>{it.label}</p>
            <p className="text-f12 text-t2">{it.note}</p>
          </div>
        ))}
      </div>
  );
  if (bare) return <AnimatedConcept label="manufacturing processes">{cards}</AnimatedConcept>;
  return (
    <figure className="rounded-card border border-border-default bg-white p-[20px]">
      <AnimatedConcept label="manufacturing processes">{cards}</AnimatedConcept>
      <figcaption className="mt-[12px] text-f14 leading-golden text-t2">
        The verb is the whole difference: pultrusion <strong>pulls</strong> continuous fibers through a
        die for a constant section, conventional extrusion <strong>pushes</strong> molten plastic,
        and filament winding <strong>wraps</strong> fibers around a mandrel. These are simplified process concepts.
      </figcaption>
    </figure>
  );
}



/** Generic coupon mechanics; specimen and standard are selected for the actual material. */
export function TensileFlexuralTest() {
  return <figure className="rounded-card border border-border-default bg-white p-[20px]">
    <AnimatedConcept label="coupon test mechanics"><div className="grid gap-[20px] sm:grid-cols-2">
      <svg viewBox="0 0 220 130" className="w-full" role="img" aria-label="Tensile coupon with finite neck width, connected to a moving upper grip and fixed lower grip">
        <text x="110" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>Tensile concept</text>
        <path d="M98 35H122V45Q116 50 116 58V77Q116 85 122 89V103H98V89Q104 85 104 77V58Q104 50 98 45Z" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2">
          <animate begin="indefinite" attributeName="d" values="M98 35H122V45Q116 50 116 58V77Q116 85 122 89V103H98V89Q104 85 104 77V58Q104 50 98 45Z;M98 29H122V39Q116 44 116 52V77Q116 85 122 89V103H98V89Q104 85 104 77V52Q104 44 98 39Z;M98 35H122V45Q116 50 116 58V77Q116 85 122 89V103H98V89Q104 85 104 77V58Q104 50 98 45Z" dur="3s" repeatCount="indefinite" />
        </path>
        <g>
          <animateTransform begin="indefinite" attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="3s" repeatCount="indefinite" />
          <rect x="91" y="29" width="38" height="12" fill={DARK} />
          <path d="M110 29V20m0 0l-4 4m4 -4l4 4" stroke={TEAL} strokeWidth="2" fill="none" />
        </g>
        <rect x="91" y="97" width="38" height="12" fill={DARK} />
        <text x="110" y="125" textAnchor="middle" fontSize="8.5" fill={GRAY}>Schematic elongation, not a test result</text>
      </svg>
      <svg viewBox="0 0 220 130" className="w-full" role="img" aria-label="Three point flexural coupon between two support rollers and a loading nose that stays in contact">
        <text x="110" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>Three-point flexure concept</text>
        <g>
          <animateTransform begin="indefinite" attributeName="transform" type="translate" values="0 0;0 8;0 0" dur="3s" repeatCount="indefinite" />
          <path d="M110 30V48" stroke={DARK} strokeWidth="4" />
          <circle cx="110" cy="50.5" r="5" fill={DARK} />
        </g>
        <path d="M46 58Q110 58 174 58" stroke={TEAL} strokeWidth="5" fill="none">
          <animate begin="indefinite" attributeName="d" values="M46 58Q110 58 174 58;M46 58Q110 74 174 58;M46 58Q110 58 174 58" dur="3s" repeatCount="indefinite" />
        </path>
        <circle cx="46" cy="65.5" r="5" fill={GRAY} /><circle cx="174" cy="65.5" r="5" fill={GRAY} />
        <path d="M46 70.5V77M174 70.5V77M34 77H58M162 77H186" stroke={GRAY} strokeWidth="2" />
        <text x="110" y="125" textAnchor="middle" fontSize="8.5" fill={GRAY}>Schematic bending; deformation exaggerated</text>
      </svg>
    </div></AnimatedConcept>
    <figcaption className="mt-[12px] text-f14 leading-golden text-t2">
      Illustrative coupon loading only. Choose the test standard, specimen, orientation, conditioning and sampling plan for the actual composite. These drawings do not establish batch testing, certified values or a component load rating.
    </figcaption>
  </figure>;
}
