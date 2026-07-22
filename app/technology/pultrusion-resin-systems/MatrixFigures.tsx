import { GRAY, DARK, TEAL } from "@/components/sections/FrpProcessShowcase";

/**
 * Concept figures for the resin-systems page — pure inline SVG with SMIL,
 * zero JS, same pattern as components/sections/ConceptAnimations.tsx.
 */

const RESIN = "#e8a13c";
const RESIN_DEEP = "#c77f1e";
const HOT = "#dc2626";

/** Where the matrix forms: dry fiber → resin impregnation → cured composite. */
export function MatrixFormationFigure() {
  return (
    <figure className="rounded-[8px] border border-border-default bg-white p-[21px]">
      <svg
        viewBox="0 0 480 150"
        className="w-full"
        aria-label="Animated pultrusion sequence: dry glass rovings are impregnated with liquid resin, then cured in the heated die into a solid fiber-plus-matrix composite"
      >
        {/* dry rovings */}
        <text x="60" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>
          Dry fiber
        </text>
        {[52, 62, 72].map((y, i) => (
          <line
            key={y}
            x1="14"
            y1={y}
            x2="120"
            y2={y + 4}
            stroke={GRAY}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="9 5"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="28;0"
              dur={`${1.1 + i * 0.15}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* resin bath */}
        <rect x="120" y="34" width="110" height="66" fill="#fdf3e2" stroke={RESIN} strokeWidth="2.5" />
        <path
          d="M126 48 q9 -6 18 0 t18 0 t18 0 t18 0 t18 0"
          fill="none"
          stroke={RESIN}
          strokeWidth="2.2"
          strokeDasharray="6 5"
        >
          <animate attributeName="stroke-dashoffset" values="22;0" dur="2.2s" repeatCount="indefinite" />
        </path>
        {[62, 72, 82].map((y, i) => (
          <line
            key={y}
            x1="120"
            y1={y}
            x2="230"
            y2={y}
            stroke={RESIN_DEEP}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="9 5"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="28;0"
              dur={`${1.1 + i * 0.15}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
        <text x="175" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill={RESIN_DEEP}>
          Impregnation
        </text>
        <text x="175" y="118" textAnchor="middle" fontSize="8.5" fill={RESIN_DEEP}>
          liquid resin wets every filament
        </text>

        {/* heated die */}
        <rect x="258" y="52" width="96" height="40" fill={DARK} />
        <rect x="258" y="44" width="96" height="5" fill={HOT}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
        </rect>
        <rect x="258" y="95" width="96" height="5" fill={HOT}>
          <animate attributeName="opacity" values="1;0.5;1" dur="1.6s" repeatCount="indefinite" />
        </rect>
        <text x="306" y="76" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#ffffff">
          HEATED DIE
        </text>
        <text x="306" y="118" textAnchor="middle" fontSize="8.5" fill={DARK}>
          crosslinking: liquid → solid matrix
        </text>

        {/* cured profile */}
        <rect x="354" y="62" width="104" height="20" fill={TEAL} />
        <rect x="354" y="62" width="104" height="4" fill="#5bb030" />
        <text x="406" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill={TEAL}>
          Cured composite
        </text>
        <text x="406" y="118" textAnchor="middle" fontSize="8.5" fill={TEAL}>
          fiber + matrix, one structure
        </text>

        {/* pull arrow */}
        <path
          d="M462 72 h12 m0 0 l-5 -4 m5 4 l-5 4"
          stroke={DARK}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <text x="468" y="60" textAnchor="middle" fontSize="8.5" fill={GRAY}>
          pull
        </text>
      </svg>
      <figcaption className="mt-[13px] text-f13 leading-golden text-t2">
        The resin matrix is not applied to the profile — it is formed around every fiber
        filament during pultrusion. Dry rovings are wetted out in the impregnation stage,
        then the heated die crosslinks the liquid resin into the solid, irreversible matrix.
        The resin you choose here is the resin the profile lives with for decades.
      </figcaption>
    </figure>
  );
}

/** What the matrix does mechanically: re-routing load around a fiber break. */
export function LoadTransferFigure() {
  return (
    <figure className="rounded-[8px] border border-border-default bg-white p-[21px]">
      <svg
        viewBox="0 0 480 130"
        className="w-full"
        aria-label="Animated diagram: tensile load flowing along glass fibers detours through the resin matrix around a broken fiber and re-enters the neighboring fibers"
      >
        {/* matrix field */}
        <rect x="60" y="24" width="360" height="82" fill="#fdf3e2" stroke={RESIN} strokeWidth="1.5" />
        <text x="240" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill={RESIN_DEEP}>
          Resin matrix (shear transfer)
        </text>

        {/* intact fibers */}
        <line x1="60" y1="40" x2="420" y2="40" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        <line x1="60" y1="90" x2="420" y2="90" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        {/* broken middle fiber */}
        <line x1="60" y1="65" x2="228" y2="65" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        <line x1="252" y1="65" x2="420" y2="65" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        <text x="240" y="69" textAnchor="middle" fontSize="9" fontWeight="700" fill={HOT}>
          ✕
        </text>

        {/* load flow along middle fiber, detouring through the matrix */}
        <path
          d="M70 65 H 200 Q 216 65 222 52 Q 228 42 240 42 Q 252 42 258 52 Q 264 65 280 65 H 410"
          fill="none"
          stroke={TEAL}
          strokeWidth="2.6"
          strokeDasharray="10 7"
        >
          <animate attributeName="stroke-dashoffset" values="34;0" dur="1.4s" repeatCount="indefinite" />
        </path>
        <path
          d="M70 65 H 200 Q 216 65 222 78 Q 228 88 240 88 Q 252 88 258 78 Q 264 65 280 65 H 410"
          fill="none"
          stroke={TEAL}
          strokeWidth="2.6"
          strokeDasharray="10 7"
        >
          <animate attributeName="stroke-dashoffset" values="34;0" dur="1.4s" repeatCount="indefinite" />
        </path>

        {/* load arrows at ends */}
        <path d="M34 65 h18 m0 0 l-6 -5 m6 5 l-6 5" stroke={DARK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M446 65 h-18 m0 0 l6 -5 m-6 5 l6 5" stroke={DARK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <text x="26" y="55" fontSize="10" fontWeight="700" fill={DARK}>
          F
        </text>
        <text x="448" y="55" fontSize="10" fontWeight="700" fill={DARK}>
          F
        </text>
      </svg>
      <figcaption className="mt-[13px] text-f13 leading-golden text-t2">
        Fibers carry the load — until one breaks. The matrix then transfers that load in
        shear to the neighboring fibers within a fraction of a millimeter, which is why a
        composite fails gradually instead of snapping like a chain. Matrix shear strength,
        fiber-matrix adhesion, and toughness are resin properties — the reinforcement
        cannot compensate for a matrix that is wrong for the job.
      </figcaption>
    </figure>
  );
}
