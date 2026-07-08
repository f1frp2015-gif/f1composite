import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";

/**
 * Animated icon showcase of the six FRP manufacturing processes.
 * Pure inline SVG with SMIL animations — no JS, no animation library,
 * nothing render-blocking. The pultrusion card is the funnel: it is the
 * process F1 actually runs, so it links to the process page and product hub.
 */

const GRAY = "#94a3b8";
const DARK = "#475569";
const TEAL = "#00a199";
const TEAL_SOFT = "rgba(0,161,153,0.18)";

function PultrusionIcon() {
  return (
    <svg viewBox="0 0 120 80" className="h-[104px] w-full" aria-hidden="true">
      {/* converging fiber lines, dashes flowing toward the die */}
      {[
        "M4 16 L46 34",
        "M4 30 L46 38",
        "M4 50 L46 42",
        "M4 64 L46 46",
      ].map((d) => (
        <path key={d} d={d} stroke={GRAY} strokeWidth="1.6" fill="none" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" values="7;0" dur="0.7s" repeatCount="indefinite" />
        </path>
      ))}
      {/* heated die */}
      <rect x="46" y="26" width="22" height="28" rx="2" fill={DARK} />
      <rect x="46" y="26" width="22" height="4" fill={TEAL}>
        <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
      </rect>
      <rect x="46" y="50" width="22" height="4" fill={TEAL}>
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </rect>
      {/* emerging I-beam profile, sliding right */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 10 0; 0 0" dur="2.4s" repeatCount="indefinite" />
        <path d="M72 30 h30 v5 h-11 v10 h11 v5 h-30 v-5 h11 v-10 h-11 z" fill={TEAL} />
      </g>
      {/* pull direction arrow */}
      <path d="M104 40 h9 m0 0 l-4 -3 m4 3 l-4 3" stroke={DARK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function FilamentWindingIcon() {
  return (
    <svg viewBox="0 0 120 80" className="h-[104px] w-full" aria-hidden="true">
      {/* mandrel */}
      <rect x="18" y="30" width="84" height="20" rx="10" fill="none" stroke={DARK} strokeWidth="2" />
      {/* helical winding, dashes flowing */}
      {["M22 48 L46 32", "M42 48 L66 32", "M62 48 L86 32", "M82 48 L100 34"].map((d) => (
        <path key={d} d={d} stroke={TEAL} strokeWidth="2" fill="none" strokeDasharray="5 3">
          <animate attributeName="stroke-dashoffset" values="8;0" dur="0.9s" repeatCount="indefinite" />
        </path>
      ))}
      {/* traversing fiber carriage */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 56 0; 0 0" dur="3.6s" repeatCount="indefinite" />
        <rect x="20" y="14" width="10" height="7" rx="1.5" fill={DARK} />
        <line x1="25" y1="21" x2="25" y2="30" stroke={GRAY} strokeWidth="1.4" />
      </g>
      {/* rotation hint */}
      <path d="M10 40 a8 8 0 0 1 6 -8 m0 16 a8 8 0 0 1 -6 -8" stroke={GRAY} strokeWidth="1.4" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" values="0 14 40; 360 14 40" dur="3s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function HandLayupIcon() {
  return (
    <svg viewBox="0 0 120 80" className="h-[104px] w-full" aria-hidden="true">
      {/* mold */}
      <path d="M14 62 Q60 40 106 62" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* laminate layer */}
      <path d="M22 58 Q60 38 98 58" stroke={TEAL} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* roller travelling along the mold */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-24 6; 24 -2; -24 6"
          keyTimes="0; 0.5; 1"
          dur="3s"
          repeatCount="indefinite"
        />
        <circle cx="60" cy="42" r="6" fill="none" stroke={DARK} strokeWidth="2" />
        <line x1="64" y1="37" x2="76" y2="22" stroke={DARK} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function CompressionMoldingIcon() {
  return (
    <svg viewBox="0 0 120 80" className="h-[104px] w-full" aria-hidden="true">
      {/* press column */}
      <rect x="56" y="4" width="8" height="10" fill={GRAY} />
      {/* top platen, cycling down */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 14; 0 14; 0 0"
          keyTimes="0; 0.35; 0.65; 1"
          dur="2.6s"
          repeatCount="indefinite"
        />
        <rect x="30" y="14" width="60" height="12" rx="2" fill={DARK} />
      </g>
      {/* charge being compressed */}
      <rect x="42" y="44" width="36" height="10" rx="3" fill={TEAL}>
        <animate attributeName="height" values="10;6;6;10" keyTimes="0;0.35;0.65;1" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="y" values="44;48;48;44" keyTimes="0;0.35;0.65;1" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="width" values="36;48;48;36" keyTimes="0;0.35;0.65;1" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="x" values="42;36;36;42" keyTimes="0;0.35;0.65;1" dur="2.6s" repeatCount="indefinite" />
      </rect>
      {/* bottom die */}
      <rect x="30" y="54" width="60" height="12" rx="2" fill={DARK} />
    </svg>
  );
}

function VacuumInfusionIcon() {
  return (
    <svg viewBox="0 0 120 80" className="h-[104px] w-full" aria-hidden="true">
      {/* tool plate */}
      <rect x="12" y="52" width="96" height="6" rx="2" fill={DARK} />
      {/* vacuum bag */}
      <path d="M12 52 Q18 36 34 36 L86 36 Q102 36 108 52" stroke={GRAY} strokeWidth="1.8" fill="none" />
      {/* resin front advancing through the laminate */}
      <rect x="16" y="42" width="0" height="10" rx="2" fill={TEAL_SOFT} stroke={TEAL} strokeWidth="1">
        <animate attributeName="width" values="0;88;88;0" keyTimes="0;0.6;0.85;1" dur="3.2s" repeatCount="indefinite" />
      </rect>
      {/* inlet drop */}
      <circle cx="16" cy="30" r="3" fill={TEAL}>
        <animate attributeName="cy" values="26;38" dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="0.8s" repeatCount="indefinite" />
      </circle>
      {/* vacuum port with suction ticks */}
      <rect x="102" y="26" width="5" height="14" rx="2" fill={GRAY} />
      {[0, 1].map((i) => (
        <line key={i} x1={96 - i * 6} y1={30 + i * 4} x2={100 - i * 6} y2={30 + i * 4} stroke={GRAY} strokeWidth="1.4">
          <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </line>
      ))}
    </svg>
  );
}

function RtmIcon() {
  return (
    <svg viewBox="0 0 120 80" className="h-[104px] w-full" aria-hidden="true">
      {/* closed matched mold */}
      <path d="M24 34 h72 q6 0 6 6 v4 q0 6 -6 6 h-72 q-6 0 -6 -6 v-4 q0 -6 6 -6 z" fill="none" stroke={DARK} strokeWidth="2.4" />
      {/* resin filling the cavity */}
      <rect x="24" y="38" width="0" height="8" rx="3" fill={TEAL}>
        <animate attributeName="width" values="0;72;72;0" keyTimes="0;0.55;0.85;1" dur="3s" repeatCount="indefinite" />
      </rect>
      {/* injection inlet */}
      <path d="M8 42 h8 m0 0 l-3.5 -2.5 m3.5 2.5 l-3.5 2.5" stroke={TEAL} strokeWidth="2" fill="none" strokeLinecap="round">
        <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
      </path>
      {/* clamp bolts */}
      {[36, 60, 84].map((x) => (
        <g key={x}>
          <line x1={x} y1="28" x2={x} y2="34" stroke={GRAY} strokeWidth="2" />
          <line x1={x} y1="50" x2={x} y2="56" stroke={GRAY} strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

const otherProcesses = [
  {
    name: "Filament winding",
    icon: <FilamentWindingIcon />,
    body: "Continuous fibers wound helically around a rotating mandrel — the route to pipes, tanks, and pressure vessels.",
    href: "/technology/pultrusion-vs-extrusion-filament-winding",
    linkLabel: "vs pultrusion",
  },
  {
    name: "Compression molding (SMC/BMC)",
    icon: <CompressionMoldingIcon />,
    body: "Pre-compounded sheet or bulk charge pressed in a heated matched die — high-volume parts like enclosures and covers.",
  },
  {
    name: "Hand lay-up",
    icon: <HandLayupIcon />,
    body: "Fabric laid into an open mold and wetted out by hand roller — low tooling cost, one-off and large parts.",
  },
  {
    name: "Vacuum infusion",
    icon: <VacuumInfusionIcon />,
    body: "Dry fabric stack under a vacuum bag, resin drawn through by vacuum — boat hulls, blades, large panels.",
  },
  {
    name: "RTM (resin transfer molding)",
    icon: <RtmIcon />,
    body: "Resin injected into a closed matched mold under pressure — two finished faces, mid-volume structural parts.",
  },
];

export default function FrpProcessShowcase() {
  return (
    <section id="processes" className="bg-white py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <SectionTag>Manufacturing Processes</SectionTag>
        <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
          How is FRP made? Six processes at a glance
        </h2>
        <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
          The same glass-fiber-plus-resin material becomes very different
          products depending on how it is formed. Six processes cover most of
          the FRP world — and one of them, pultrusion, is the route to every
          structural profile, window frame, and grating on this site.
        </p>

        <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
          {/* Pultrusion — the funnel card */}
          <Link
            href="/technology/pultrusion-process"
            className="group relative rounded-[8px] border-2 border-teal bg-teal-bg p-[21px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,161,153,0.12)] sm:col-span-2 lg:col-span-1"
          >
            <span className="absolute right-[13px] top-[13px] rounded-[4px] bg-teal px-[8px] py-[3px] text-f11 font-bold uppercase tracking-[1px] text-white">
              Our process · 370 lines
            </span>
            <PultrusionIcon />
            <h3 className="mt-[13px] text-[17px] font-bold text-t1">Pultrusion</h3>
            <p className="mt-[8px] text-f13 leading-golden text-t2">
              Continuous fibers pulled through a resin bath and a heated die —
              constant cross-sections at industrial throughput. This is the
              process behind every F1 profile, from I-beams to PHI-certified
              window frames.
            </p>
            <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-80 transition-opacity duration-[0.34s] group-hover:opacity-100">
              See the process step by step →
            </span>
          </Link>

          {otherProcesses.map((p) => (
            <div key={p.name} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              {p.icon}
              <h3 className="mt-[13px] text-[17px] font-bold text-t1">{p.name}</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">{p.body}</p>
              {p.href ? (
                <Link
                  href={p.href}
                  className="mt-[8px] inline-block text-f13 font-semibold text-teal-text hover:underline"
                >
                  How it compares {p.linkLabel} →
                </Link>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-[34px] flex flex-wrap gap-[13px]">
          <LinkArrow href="/technology/pultrusion-process">The pultrusion process in 6 stages</LinkArrow>
          <LinkArrow href="/pultruded-frp-profiles">Browse pultruded FRP profiles</LinkArrow>
          <LinkArrow href="/technology/pultrusion-vs-extrusion-filament-winding">
            Pultrusion vs extrusion vs filament winding
          </LinkArrow>
        </div>
      </div>
    </section>
  );
}
