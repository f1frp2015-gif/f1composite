import type { ReactNode } from "react";
import {
  GRAY,
  DARK,
  TEAL,
  TEAL_SOFT,
  PultrusionIcon,
  FilamentWindingIcon,
} from "@/components/sections/FrpProcessShowcase";

/**
 * Shared concept animations — pure inline SVG with SMIL, zero JS.
 * Each component is a self-contained explainer figure used on the
 * educational/comparison pages so a reader grasps the physics or the
 * mechanism in two seconds before reading the numbers.
 */

const COLD = "#3b82f6";
const WARM = "#f59e0b";

/** Heat streaming through an aluminum frame vs stopped by an FRP frame. */
export function HeatFlowFrameComparison() {
  return (
    <figure className="rounded-[8px] border border-border-default bg-white p-[21px]">
      <div className="grid gap-[21px] sm:grid-cols-2">
        {/* Aluminum */}
        <svg viewBox="0 0 220 120" className="w-full" aria-label="Heat flowing rapidly through an aluminum window frame, causing interior condensation">
          <text x="110" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>Aluminum · 160 W/m·K</text>
          <text x="18" y="30" fontSize="9" fill={COLD} fontWeight="600">−20°C</text>
          <text x="174" y="30" fontSize="9" fill={WARM} fontWeight="600">+21°C</text>
          {/* frame section */}
          <rect x="92" y="24" width="36" height="88" rx="3" fill={GRAY} />
          <rect x="106" y="24" width="8" height="88" fill="#cbd5e1" />
          {/* heat arrows racing outward (interior -> exterior) */}
          {[38, 62, 86].map((y, i) => (
            <g key={y}>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; -120 0"
                dur="1.1s"
                begin={`${i * 0.35}s`}
                repeatCount="indefinite"
              />
              <path d={`M168 ${y} h-16 m0 0 l5 -4 m-5 4 l5 4`} stroke={WARM} strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </g>
          ))}
          {/* condensation drips on the interior face */}
          {[44, 72].map((y, i) => (
            <circle key={y} cx="132" cy={y} r="2.6" fill={COLD}>
              <animate attributeName="cy" values={`${y};${y + 22}`} dur="1.4s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="1.4s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text x="110" y="118" textAnchor="middle" fontSize="8.5" fill={COLD}>cold interior face → condensation</text>
        </svg>

        {/* FRP */}
        <svg viewBox="0 0 220 120" className="w-full" aria-label="Heat blocked by an insulating pultruded FRP window frame, interior face stays warm and dry">
          <text x="110" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill={TEAL}>Pultruded FRP · 0.3 W/m·K</text>
          <text x="18" y="30" fontSize="9" fill={COLD} fontWeight="600">−20°C</text>
          <text x="174" y="30" fontSize="9" fill={WARM} fontWeight="600">+21°C</text>
          <rect x="92" y="24" width="36" height="88" rx="3" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2" />
          {/* single slow arrow that dies inside the frame */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0; -52 0" dur="4s" repeatCount="indefinite" />
            <path d="M168 62 h-14 m0 0 l5 -4 m-5 4 l5 4" stroke={WARM} strokeWidth="2.4" fill="none" strokeLinecap="round">
              <animate attributeName="opacity" values="1;0.15" dur="4s" repeatCount="indefinite" />
            </path>
          </g>
          {/* warm, dry interior face */}
          <line x1="130" y1="28" x2="130" y2="108" stroke={WARM} strokeWidth="2.4" strokeLinecap="round">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
          </line>
          <text x="110" y="118" textAnchor="middle" fontSize="8.5" fill={TEAL}>warm interior face → stays dry</text>
        </svg>
      </div>
      <figcaption className="mt-[13px] text-f13 leading-golden text-t2">
        Same winter night, same glazing — the only variable is the frame material. Aluminum conducts
        heat ~500× faster, so its interior face drops below the dew point; the FRP face stays warm and dry.
      </figcaption>
    </figure>
  );
}

/** Steel insert (thermal bridge) vs pultruded GRP core inside a uPVC chamber. */
export function SteelVsFrpChamberCore() {
  return (
    <figure className="rounded-[8px] border border-border-default bg-white p-[21px]">
      <div className="grid gap-[21px] sm:grid-cols-2">
        {/* Steel insert */}
        <svg viewBox="0 0 220 110" className="w-full" aria-label="Galvanized steel insert inside a uPVC window chamber conducting heat straight through">
          <text x="110" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>Steel insert · ≈50 W/m·K</text>
          {/* uPVC profile outline */}
          <rect x="40" y="22" width="140" height="72" rx="6" fill="none" stroke={GRAY} strokeWidth="2.5" />
          {/* steel U-channel */}
          <path d="M78 38 v40 h64 v-40" stroke="#64748b" strokeWidth="8" fill="none" />
          {/* heat arrows crossing via the steel */}
          {[0, 1].map((i) => (
            <g key={i}>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; -96 0"
                dur="1.2s"
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
              />
              <path d="M186 58 h-14 m0 0 l5 -4 m-5 4 l5 4" stroke={WARM} strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </g>
          ))}
          <text x="110" y="106" textAnchor="middle" fontSize="8.5" fill={COLD}>continuous cold bridge through the chamber</text>
        </svg>

        {/* GRP core */}
        <svg viewBox="0 0 220 110" className="w-full" aria-label="Pultruded fiberglass core inside a uPVC window chamber blocking the heat path">
          <text x="110" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill={TEAL}>GRP core · ≈0.3 W/m·K</text>
          <rect x="40" y="22" width="140" height="72" rx="6" fill="none" stroke={GRAY} strokeWidth="2.5" />
          {/* fiberglass core */}
          <rect x="76" y="40" width="68" height="36" rx="3" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5" />
          {/* arrow dying inside the core */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0; -48 0" dur="3.6s" repeatCount="indefinite" />
            <path d="M186 58 h-14 m0 0 l5 -4 m-5 4 l5 4" stroke={WARM} strokeWidth="2.4" fill="none" strokeLinecap="round">
              <animate attributeName="opacity" values="1;0.1" dur="3.6s" repeatCount="indefinite" />
            </path>
          </g>
          <text x="110" y="106" textAnchor="middle" fontSize="8.5" fill={TEAL}>same stiffness job, no thermal bridge</text>
        </svg>
      </div>
      <figcaption className="mt-[13px] text-f13 leading-golden text-t2">
        Both cores do the same structural job inside the same uPVC chamber. The steel one re-installs
        the thermal bridge the plastic frame was supposed to avoid; the pultruded core does not.
      </figcaption>
    </figure>
  );
}

/* ---- window opening types ---- */

function OpeningFrame({ children, label, sub }: { children: ReactNode; label: string; sub: string }) {
  return (
    <div className="rounded-[8px] border border-border-default bg-bg2 p-[13px]">
      <svg viewBox="0 0 170 130" className="w-full" aria-label={`${label} window opening animation`}>
        {children}
      </svg>
      <p className="mt-[8px] text-f13 font-bold text-t1">{label}</p>
      <p className="text-f12 leading-golden text-t2">{sub}</p>
    </div>
  );
}

/** All the ways a window opens — animated opening-type guide. */
export function WindowOpeningTypes() {
  const frame = <rect x="45" y="16" width="80" height="100" rx="3" fill="none" stroke={DARK} strokeWidth="3" />;
  return (
    <figure className="rounded-[8px] border border-border-default bg-white p-[21px]">
      <div className="grid gap-[13px] sm:grid-cols-2 lg:grid-cols-3">
        {/* Casement — side-hung, swings like a door */}
        <OpeningFrame label="Casement" sub="Side-hung — swings like a door; full opening, maximum airflow.">
          {frame}
          <circle cx="49" cy="28" r="2.4" fill={DARK} />
          <circle cx="49" cy="104" r="2.4" fill={DARK} />
          <rect x="53" y="24" width="64" height="84" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5">
            <animate attributeName="width" values="64;26;26;64" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </rect>
          <path d="M117 66 q22 0 26 -22" stroke={GRAY} strokeWidth="1.4" fill="none" strokeDasharray="4 3">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.3;0.7;1" dur="4.5s" repeatCount="indefinite" />
          </path>
        </OpeningFrame>

        {/* Awning — top-hung, bottom swings out */}
        <OpeningFrame label="Awning (top-hung)" sub="Hinged at the top, opens outward — sheds rain while ventilating.">
          {frame}
          <circle cx="57" cy="20" r="2.4" fill={DARK} />
          <circle cx="113" cy="20" r="2.4" fill={DARK} />
          <rect x="53" y="24" width="64" height="84" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5">
            <animate attributeName="height" values="84;48;48;84" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </rect>
          {/* air out the bottom */}
          <path d="M76 112 q-4 8 -10 10 M96 112 q4 8 10 10" stroke={GRAY} strokeWidth="1.6" fill="none" strokeLinecap="round">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </path>
        </OpeningFrame>

        {/* Tilt & Turn — two motions from one handle */}
        <OpeningFrame label="Tilt & Turn" sub="One handle, two openings: tilt to ventilate, turn to clean.">
          {frame}
          <rect x="53" y="24" width="64" height="84" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5">
            {/* phase 1: tilt — top leans in (bottom edge fixed) */}
            <animate attributeName="y" values="24;42;24;24;24;24" keyTimes="0;0.14;0.28;0.5;0.9;1" dur="7s" repeatCount="indefinite" />
            <animate attributeName="height" values="84;66;84;84;84;84" keyTimes="0;0.14;0.28;0.5;0.9;1" dur="7s" repeatCount="indefinite" />
            {/* phase 2: turn — swings on side hinges */}
            <animate attributeName="width" values="64;64;64;26;26;64" keyTimes="0;0.28;0.5;0.64;0.82;1" dur="7s" repeatCount="indefinite" />
          </rect>
          <text x="85" y="12" textAnchor="middle" fontSize="8.5" fill={GRAY}>
            tilt → turn
          </text>
        </OpeningFrame>

        {/* Single hung — bottom sash slides up */}
        <OpeningFrame label="Single Hung" sub="Fixed top sash; bottom sash slides up. The classic North American style.">
          {frame}
          <rect x="53" y="24" width="64" height="40" rx="2" fill="none" stroke={GRAY} strokeWidth="2" />
          <text x="85" y="46" textAnchor="middle" fontSize="8" fill={GRAY}>fixed</text>
          <rect x="53" y="66" width="64" height="42" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5">
            <animate attributeName="y" values="66;36;36;66" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </rect>
        </OpeningFrame>

        {/* Double hung — both sashes slide */}
        <OpeningFrame label="Double Hung" sub="Both sashes slide — vent top and bottom at once for convective airflow.">
          {frame}
          <rect x="53" y="24" width="64" height="42" rx="2" fill="none" stroke={TEAL} strokeWidth="2.5">
            <animate attributeName="y" values="24;46;46;24" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </rect>
          <rect x="53" y="66" width="64" height="42" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="2.5">
            <animate attributeName="y" values="66;44;44;66" keyTimes="0;0.35;0.65;1" dur="4.5s" repeatCount="indefinite" />
          </rect>
        </OpeningFrame>

        {/* Lift & Slide — panel lifts then glides */}
        <OpeningFrame label="Lift & Slide" sub="Handle lifts the panel off its seals, then it glides — large terrace openings.">
          <rect x="15" y="34" width="140" height="72" rx="3" fill="none" stroke={DARK} strokeWidth="3" />
          <rect x="21" y="40" width="62" height="60" rx="2" fill="none" stroke={GRAY} strokeWidth="2" />
          <g>
            <animateTransform
              attributeName="transform"
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
      <figcaption className="mt-[13px] text-f13 leading-golden text-t2">
        How each opening type moves. Whatever the motion, the sealing principle in an FRP system is the
        same: multi-point locking pulls the sash into continuous EPDM gasket compression, and the
        insulating frame carries no metallic path for heat to escape through.
      </figcaption>
    </figure>
  );
}

/** Simply-supported beam deflecting under a cycling midspan load. */
export function BeamDeflection() {
  return (
    <figure className="rounded-[8px] border border-border-default bg-white p-[21px]">
      <svg viewBox="0 0 240 100" className="mx-auto w-full max-w-[560px]" aria-label="Simply supported beam deflecting under a midspan load, showing the deflection the calculator computes">
        {/* load arrow */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 8; 0 0" dur="2.6s" repeatCount="indefinite" />
          <path d="M120 12 v14 m0 0 l-5 -6 m5 6 l5 -6" stroke={DARK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <text x="130" y="22" fontSize="10" fontWeight="700" fill={DARK}>F</text>
        </g>
        {/* beam flexing */}
        <path d="M24 44 Q120 44 216 44" stroke={TEAL} strokeWidth="6" fill="none" strokeLinecap="round">
          <animate
            attributeName="d"
            values="M24 44 Q120 44 216 44; M24 44 Q120 70 216 44; M24 44 Q120 44 216 44"
            dur="2.6s"
            repeatCount="indefinite"
          />
        </path>
        {/* deflection dimension */}
        <line x1="120" y1="47" x2="120" y2="57" stroke={GRAY} strokeWidth="1.2" strokeDasharray="3 2">
          <animate attributeName="y2" values="47;57;47" dur="2.6s" repeatCount="indefinite" />
        </line>
        <text x="127" y="60" fontSize="9" fill={GRAY} fontStyle="italic">δ</text>
        {/* supports */}
        <path d="M24 47 l-8 12 h16 z" fill={GRAY} />
        <path d="M216 47 l-8 12 h16 z" fill={GRAY} />
        <line x1="8" y1="60" x2="232" y2="60" stroke={GRAY} strokeWidth="1.4" />
        {/* span dimension */}
        <path d="M24 74 h192" stroke={GRAY} strokeWidth="1" />
        <path d="M24 70 v8 M216 70 v8" stroke={GRAY} strokeWidth="1" />
        <text x="120" y="86" textAnchor="middle" fontSize="9" fill={GRAY}>span L</text>
      </svg>
      <figcaption className="mt-[8px] text-center text-f13 leading-golden text-t2">
        Deflection — not strength — usually governs FRP design. The calculator below solves δ, bending
        stress, and the pass/fail against your deflection limit for real F1 sections.
      </figcaption>
    </figure>
  );
}

/** Extrusion icon — melt pushed through a die (for the process trio). */
function ExtrusionIcon() {
  return (
    <svg viewBox="0 0 120 80" className="h-[104px] w-full" aria-hidden="true">
      {/* hopper with pellets */}
      <path d="M28 12 h20 l-5 12 h-10 z" fill="none" stroke={DARK} strokeWidth="2" />
      <circle cx="38" cy="18" r="1.8" fill={GRAY}>
        <animate attributeName="cy" values="14;26" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="0.9s" repeatCount="indefinite" />
      </circle>
      {/* barrel */}
      <rect x="16" y="30" width="64" height="20" rx="4" fill="none" stroke={DARK} strokeWidth="2" />
      {/* screw flights pushing right */}
      {[24, 36, 48, 60].map((x) => (
        <line key={x} x1={x} y1="33" x2={x + 8} y2="47" stroke={GRAY} strokeWidth="2">
          <animate attributeName="x1" values={`${x};${x + 12}`} dur="1s" repeatCount="indefinite" />
          <animate attributeName="x2" values={`${x + 8};${x + 20}`} dur="1s" repeatCount="indefinite" />
        </line>
      ))}
      {/* die + emerging profile */}
      <rect x="80" y="26" width="10" height="28" rx="2" fill={DARK} />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 8 0; 0 0" dur="2.4s" repeatCount="indefinite" />
        <rect x="90" y="34" width="22" height="12" rx="2" fill={TEAL} />
      </g>
    </svg>
  );
}

/** Three continuous processes side by side: pull vs push vs wind. */
export function ProcessTrio() {
  const items = [
    { label: "Pultrusion — fibers PULLED", note: "continuous reinforcement, thermoset", icon: <PultrusionIcon />, highlight: true },
    { label: "Extrusion — melt PUSHED", note: "no continuous fibers, thermoplastic", icon: <ExtrusionIcon /> },
    { label: "Filament winding — fibers WOUND", note: "hollow rotational parts", icon: <FilamentWindingIcon /> },
  ];
  return (
    <figure className="rounded-[8px] border border-border-default bg-white p-[21px]">
      <div className="grid gap-[21px] sm:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.label}
            className={`rounded-[8px] p-[13px] ${it.highlight ? "border-2 border-teal bg-teal-bg" : "border border-border-default bg-bg2"}`}
          >
            {it.icon}
            <p className={`mt-[8px] text-f13 font-bold ${it.highlight ? "text-teal-text" : "text-t1"}`}>{it.label}</p>
            <p className="text-f12 text-t2">{it.note}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-[13px] text-f13 leading-golden text-t2">
        The verb is the whole difference: pultrusion <strong>pulls</strong> continuous fibers through a
        die (structural, constant section), extrusion <strong>pushes</strong> molten plastic (no continuous
        reinforcement), filament winding <strong>wraps</strong> fibers around a mandrel (hollow shapes).
      </figcaption>
    </figure>
  );
}

/** Tensile and 3-point flexural coupon tests. */
export function TensileFlexuralTest() {
  return (
    <figure className="rounded-[8px] border border-border-default bg-white p-[21px]">
      <div className="grid gap-[21px] sm:grid-cols-2">
        {/* Tensile */}
        <svg viewBox="0 0 220 120" className="w-full" aria-label="Tensile test: dogbone coupon stretched between grips per ASTM D638">
          <text x="110" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>Tensile · ASTM D638</text>
          {/* fixed lower grip */}
          <rect x="92" y="96" width="36" height="10" rx="2" fill={DARK} />
          {/* moving upper grip + coupon top */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0; 0 -8; 0 0" dur="2.8s" repeatCount="indefinite" />
            <rect x="92" y="22" width="36" height="10" rx="2" fill={DARK} />
            <path d="M110 32 v6" stroke={GRAY} strokeWidth="6" strokeLinecap="round" />
            <path d="M110 22 v-8 m0 0 l-4 4 m4 -4 l4 4" stroke={TEAL} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>
          {/* dogbone coupon stretching */}
          <path d="M102 40 q8 4 8 14 v12 q0 10 -8 14 M118 40 q-8 4 -8 14 v12 q0 10 8 14" stroke={TEAL} strokeWidth="3" fill="none">
            <animate
              attributeName="d"
              values="M102 40 q8 4 8 14 v12 q0 10 -8 14 M118 40 q-8 4 -8 14 v12 q0 10 8 14;
                      M102 34 q8 4 8 16 v18 q0 12 -8 16 M118 34 q-8 4 -8 16 v18 q0 12 8 16;
                      M102 40 q8 4 8 14 v12 q0 10 -8 14 M118 40 q-8 4 -8 14 v12 q0 10 8 14"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>
          <text x="110" y="118" textAnchor="middle" fontSize="8.5" fill={GRAY}>240–400 MPa longitudinal</text>
        </svg>

        {/* Flexural */}
        <svg viewBox="0 0 220 120" className="w-full" aria-label="Three-point flexural test: coupon bending under a center load per ASTM D790">
          <text x="110" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>Flexural · ASTM D790</text>
          {/* loading nose */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0; 0 9; 0 0" dur="2.8s" repeatCount="indefinite" />
            <path d="M110 26 v14" stroke={DARK} strokeWidth="4" strokeLinecap="round" />
            <circle cx="110" cy="44" r="5" fill={DARK} />
          </g>
          {/* coupon bending */}
          <path d="M46 58 Q110 58 174 58" stroke={TEAL} strokeWidth="5" fill="none" strokeLinecap="round">
            <animate
              attributeName="d"
              values="M46 58 Q110 58 174 58; M46 58 Q110 74 174 58; M46 58 Q110 58 174 58"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>
          {/* supports */}
          <circle cx="52" cy="68" r="5" fill={GRAY} />
          <circle cx="168" cy="68" r="5" fill={GRAY} />
          <line x1="36" y1="76" x2="184" y2="76" stroke={GRAY} strokeWidth="1.4" />
          <text x="110" y="118" textAnchor="middle" fontSize="8.5" fill={GRAY}>flexural modulus per batch, mill certificate</text>
        </svg>
      </div>
      <figcaption className="mt-[13px] text-f13 leading-golden text-t2">
        The two coupon tests behind every mill certificate: tensile (ASTM D638) and three-point flexural
        (ASTM D790), run per production batch so the datasheet numbers stay tied to the material you receive.
      </figcaption>
    </figure>
  );
}
