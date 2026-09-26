"use client";

import { useState, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerReducedMotion = () => true;

type WindowType =
  | "casement"
  | "awning"
  | "tilt-turn"
  | "fixed"
  | "sliding"
  | "compression-seal";

const windowTypes: ReadonlyArray<{
  type: WindowType;
  name: string;
  description: string;
}> = [
  {
    type: "casement",
    name: "Casement",
    description: "Side-hung; full opening and strong compression sealing.",
  },
  {
    type: "awning",
    name: "Awning",
    description: "Top-hung; ventilates while helping shed light rain.",
  },
  {
    type: "tilt-turn",
    name: "Tilt & turn",
    description: "Tilt ventilation plus inward opening for access and cleaning.",
  },
  {
    type: "fixed",
    name: "Fixed light",
    description: "Fixed window combination; available series and glazing require project review.",
  },
  {
    type: "sliding",
    name: "90 Series Sliding",
    description: "Horizontal sliding window; confirm the 90 sliding configuration.",
  },
  {
    type: "compression-seal",
    name: "140 Series Compression-Seal Sliding Door",
    description: "Schematic: slide horizontally, then press toward the seal when closing. Hardware geometry requires confirmation.",
  },
];

const FRAME = "#0b1730";
const TEAL = "#0a9b91";
const GLASS = "rgba(10, 155, 145, 0.08)";
const GUIDE = "rgba(11, 23, 48, 0.28)";
const DURATION = "5.4s";

function OuterFrame({ wide = false }: { wide?: boolean }) {
  return wide ? (
    <rect x="25" y="13" width="110" height="60" rx="3" fill="white" stroke={FRAME} strokeWidth="2.5" />
  ) : (
    <rect x="51" y="9" width="58" height="68" rx="3" fill="white" stroke={FRAME} strokeWidth="2.5" />
  );
}

function WindowTypeAnimation({ type, name, animate }: { type: WindowType; name: string; animate: boolean }) {
  const timing = "0;0.18;0.52;0.72;1";

  return (
    <svg
      viewBox="0 0 160 86"
      className="h-full w-full"
      role="img"
      aria-label={`${name} opening principle schematic`}
    >
      {type === "casement" && (
        <>
          <OuterFrame />
          <circle cx="55" cy="23" r="2" fill={FRAME} />
          <circle cx="55" cy="63" r="2" fill={FRAME} />
          <path d="M105 17 A48 48 0 0 1 70 69" fill="none" stroke={GUIDE} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M56 14 H104 V72 H56 Z" fill={GLASS} stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round">
            {animate && (<animate
              attributeName="d"
              values="M56 14 H104 V72 H56 Z;M56 14 H104 V72 H56 Z;M56 14 L76 23 V63 L56 72 Z;M56 14 L76 23 V63 L56 72 Z;M56 14 H104 V72 H56 Z"
              keyTimes={timing}
              dur={DURATION}
              repeatCount="indefinite"
            />)}
          </path>
        </>
      )}

      {type === "awning" && (
        <>
          <OuterFrame />
          <circle cx="63" cy="13" r="2" fill={FRAME} />
          <circle cx="97" cy="13" r="2" fill={FRAME} />
          <path d="M56 14 H104 V72 H56 Z" fill={GLASS} stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round">
            {animate && (<animate
              attributeName="d"
              values="M56 14 H104 V72 H56 Z;M56 14 H104 V72 H56 Z;M56 14 H104 L96 50 H64 Z;M56 14 H104 L96 50 H64 Z;M56 14 H104 V72 H56 Z"
              keyTimes={timing}
              dur={DURATION}
              repeatCount="indefinite"
            />)}
          </path>
          <path d="M57 72 Q80 82 103 72" fill="none" stroke={GUIDE} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M70 77 L65 72 M90 77 L95 72" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round">
            {animate && (<animate attributeName="opacity" values="0;0;1;1;0" keyTimes={timing} dur={DURATION} repeatCount="indefinite" />)}
          </path>
        </>
      )}

      {type === "tilt-turn" && (
        <>
          <OuterFrame />
          <circle cx="55" cy="23" r="2" fill={FRAME} />
          <circle cx="55" cy="63" r="2" fill={FRAME} />
          <path d="M56 14 H104 V72 H56 Z" fill={GLASS} stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round">
            {animate && (<animate
              attributeName="d"
              values="M56 14 H104 V72 H56 Z;M65 29 H95 L104 72 H56 Z;M56 14 H104 V72 H56 Z;M56 14 L76 23 V63 L56 72 Z;M56 14 H104 V72 H56 Z"
              keyTimes="0;0.2;0.42;0.7;1"
              dur="7.2s"
              repeatCount="indefinite"
            />)}
          </path>
          <path d="M62 21 L68 27 M98 21 L92 27" fill="none" stroke={GUIDE} strokeWidth="1.5" strokeLinecap="round">
            {animate && (<animate attributeName="opacity" values="0;1;0;0;0" keyTimes="0;0.2;0.42;0.7;1" dur="7.2s" repeatCount="indefinite" />)}
          </path>
        </>
      )}

      {type === "fixed" && (
        <>
          <defs>
            <clipPath id="fixed-light-glass-clip">
              <rect x="56" y="14" width="48" height="58" rx="1" />
            </clipPath>
          </defs>
          <OuterFrame />
          <rect x="56" y="14" width="48" height="58" rx="1" fill={GLASS} stroke={TEAL} strokeWidth="2.5" />
          <g opacity="0.45" clipPath="url(#fixed-light-glass-clip)">
            <path d="M60 50 L84 18" stroke="white" strokeWidth="5" strokeLinecap="round" />
            <path d="M70 66 L101 25" stroke="white" strokeWidth="2" strokeLinecap="round" />
            {animate && (<animateTransform
              attributeName="transform"
              type="translate"
              values="-30 0;-30 0;28 0;28 0;-30 0"
              keyTimes={timing}
              dur={DURATION}
              repeatCount="indefinite"
            />)}
          </g>
          <path d="M64 43 H96" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
          <path d="M80 22 V64" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        </>
      )}

      {type === "sliding" && (
        <>
          <OuterFrame wide />
          <rect x="30" y="18" width="50" height="50" fill="white" stroke={GUIDE} strokeWidth="2" />
          <rect x="80" y="18" width="50" height="50" fill={GLASS} stroke={TEAL} strokeWidth="2.5">
            {animate && (<animate attributeName="x" values="80;80;32;32;80" keyTimes={timing} dur={DURATION} repeatCount="indefinite" />)}
          </rect>
          <path d="M107 80 H61 M61 80 L67 76 M61 80 L67 84" fill="none" stroke={TEAL} strokeWidth="1.5" />
        </>
      )}

      {type === "compression-seal" && (
        <>
          <text x="80" y="11" textAnchor="middle" fontSize="8" fill={FRAME}>PLAN VIEW · SCHEMATIC</text>
          <path d="M25 27 H135 M25 29 V64 M135 29 V64" fill="none" stroke={FRAME} strokeWidth="2.5" />
          <path d="M82 32 H130" stroke={TEAL} strokeWidth="3" strokeDasharray="3 2" />
          <rect x="30" y="36" width="49" height="8" fill="white" stroke={GUIDE} strokeWidth="2" />
          <rect x="81" y="36" width="49" height="8" fill={GLASS} stroke={TEAL} strokeWidth="2.5">
            {animate && (<animate attributeName="x" values="81;81;81;30;30;81;81" keyTimes="0;0.12;0.22;0.52;0.7;0.9;1" dur="7s" repeatCount="indefinite" />)}
            {animate && (<animate attributeName="y" values="36;36;51;51;51;51;36" keyTimes="0;0.12;0.22;0.52;0.7;0.9;1" dur="7s" repeatCount="indefinite" />)}
          </rect>
          <path d="M108 66 V46 M108 46 L104 51 M108 46 L112 51" fill="none" stroke={TEAL} strokeWidth="1.5" />
          <text x="80" y="81" textAnchor="middle" fontSize="8" fill={FRAME}>Seal compression across track</text>
        </>
      )}
    </svg>
  );
}

export default function WindowTypesGrid() {
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, getReducedMotion, getServerReducedMotion);
  const [playing, setPlaying] = useState(false);
  const animate = playing && !reducedMotion;
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button type="button" aria-pressed={animate} disabled={reducedMotion} onClick={() => setPlaying((current) => !current)} className="min-h-11 rounded-lg border border-border-default px-4 py-2 text-sm font-semibold text-teal-text disabled:cursor-default disabled:text-t3">
          {animate ? "Stop motion" : "Play opening diagrams"}
        </button>
        <p className="text-xs text-t3">{reducedMotion ? "Static diagrams shown to respect your reduced-motion preference." : "Motion is optional. Stopping returns each diagram to its closed position."}</p>
      </div>
      <div className="grid gap-[13px] sm:grid-cols-2 lg:grid-cols-3">
      {windowTypes.map(({ type, name, description }) => (
        <div key={type} className="rounded-[8px] border border-border-default bg-white p-[16px]">
          <div className="mb-[13px] flex h-[86px] items-center justify-center overflow-hidden rounded-[6px] bg-bg2">
            <WindowTypeAnimation type={type} name={name} animate={animate} />
          </div>
          <h3 className="text-f16 font-bold text-t1">{name}</h3>
          <p className="mt-[5px] text-f14 leading-golden text-t2">{description}</p>
        </div>
      ))}
      </div>
    </div>
  );
}
