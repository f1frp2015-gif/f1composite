type WindowType =
  | "casement"
  | "awning"
  | "tilt-turn"
  | "fixed"
  | "single-hung"
  | "lift-slide";

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
    description: "Maximum glazed area and the lowest whole-window U-value.",
  },
  {
    type: "single-hung",
    name: "Single hung",
    description: "A familiar North American format with one moving sash.",
  },
  {
    type: "lift-slide",
    name: "Lift & slide",
    description: "Large glazed door leaves with a sealed closed position.",
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

function WindowTypeAnimation({ type, name }: { type: WindowType; name: string }) {
  const timing = "0;0.18;0.52;0.72;1";

  return (
    <svg
      viewBox="0 0 160 86"
      className="h-full w-full"
      role="img"
      aria-label={`${name} opening motion`}
    >
      {type === "casement" && (
        <>
          <OuterFrame />
          <circle cx="55" cy="23" r="2" fill={FRAME} />
          <circle cx="55" cy="63" r="2" fill={FRAME} />
          <path d="M105 17 A48 48 0 0 1 70 69" fill="none" stroke={GUIDE} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M56 14 H104 V72 H56 Z" fill={GLASS} stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round">
            <animate
              attributeName="d"
              values="M56 14 H104 V72 H56 Z;M56 14 H104 V72 H56 Z;M56 14 L76 23 V63 L56 72 Z;M56 14 L76 23 V63 L56 72 Z;M56 14 H104 V72 H56 Z"
              keyTimes={timing}
              dur={DURATION}
              repeatCount="indefinite"
            />
          </path>
        </>
      )}

      {type === "awning" && (
        <>
          <OuterFrame />
          <circle cx="63" cy="13" r="2" fill={FRAME} />
          <circle cx="97" cy="13" r="2" fill={FRAME} />
          <path d="M56 14 H104 V72 H56 Z" fill={GLASS} stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round">
            <animate
              attributeName="d"
              values="M56 14 H104 V72 H56 Z;M56 14 H104 V72 H56 Z;M56 14 H104 L96 50 H64 Z;M56 14 H104 L96 50 H64 Z;M56 14 H104 V72 H56 Z"
              keyTimes={timing}
              dur={DURATION}
              repeatCount="indefinite"
            />
          </path>
          <path d="M57 72 Q80 82 103 72" fill="none" stroke={GUIDE} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M70 77 L65 72 M90 77 L95 72" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={timing} dur={DURATION} repeatCount="indefinite" />
          </path>
        </>
      )}

      {type === "tilt-turn" && (
        <>
          <OuterFrame />
          <circle cx="55" cy="23" r="2" fill={FRAME} />
          <circle cx="55" cy="63" r="2" fill={FRAME} />
          <path d="M56 14 H104 V72 H56 Z" fill={GLASS} stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round">
            <animate
              attributeName="d"
              values="M56 14 H104 V72 H56 Z;M65 29 H95 L104 72 H56 Z;M56 14 H104 V72 H56 Z;M56 14 L76 23 V63 L56 72 Z;M56 14 H104 V72 H56 Z"
              keyTimes="0;0.2;0.42;0.7;1"
              dur="7.2s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M62 21 L68 27 M98 21 L92 27" fill="none" stroke={GUIDE} strokeWidth="1.5" strokeLinecap="round">
            <animate attributeName="opacity" values="0;1;0;0;0" keyTimes="0;0.2;0.42;0.7;1" dur="7.2s" repeatCount="indefinite" />
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
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-30 0;-30 0;28 0;28 0;-30 0"
              keyTimes={timing}
              dur={DURATION}
              repeatCount="indefinite"
            />
          </g>
          <path d="M64 43 H96" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
          <path d="M80 22 V64" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        </>
      )}

      {type === "single-hung" && (
        <>
          <OuterFrame />
          <rect x="56" y="14" width="48" height="28" rx="1" fill="white" stroke={TEAL} strokeWidth="2.5" />
          <path d="M80 18 V38" stroke={TEAL} strokeWidth="1.25" opacity="0.45" />
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0;0 0;0 -27;0 -27;0 0"
              keyTimes={timing}
              dur={DURATION}
              repeatCount="indefinite"
            />
            <rect x="56" y="44" width="48" height="28" rx="1" fill={GLASS} stroke={TEAL} strokeWidth="2.5" />
            <path d="M80 48 V68" stroke={TEAL} strokeWidth="1.25" opacity="0.45" />
          </g>
          <path d="M111 62 V43 M111 43 L107 48 M111 43 L115 48" fill="none" stroke={GUIDE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={timing} dur={DURATION} repeatCount="indefinite" />
          </path>
        </>
      )}

      {type === "lift-slide" && (
        <>
          <OuterFrame wide />
          <rect x="30" y="18" width="50" height="50" rx="1" fill="white" stroke={GUIDE} strokeWidth="2" />
          <path d="M55 19 V67" stroke={GUIDE} strokeWidth="1.2" opacity="0.55" />
          <path d="M30 77 H130" stroke={GUIDE} strokeWidth="1.5" strokeLinecap="round" />
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0;0 0;0 -4;-48 -4;-48 -4;0 -4;0 0"
              keyTimes="0;0.12;0.22;0.52;0.7;0.92;1"
              dur="6.6s"
              repeatCount="indefinite"
            />
            <rect x="80" y="18" width="50" height="50" rx="1" fill={GLASS} stroke={TEAL} strokeWidth="2.5" />
            <path d="M105 19 V67" stroke={TEAL} strokeWidth="1.25" opacity="0.45" />
            <circle cx="86" cy="44" r="1.8" fill={FRAME} />
          </g>
          <path d="M107 80 H61 M61 80 L67 76 M61 80 L67 84" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={timing} dur="6.6s" repeatCount="indefinite" />
          </path>
        </>
      )}
    </svg>
  );
}

export default function WindowTypesGrid() {
  return (
    <div className="grid gap-[13px] sm:grid-cols-2 lg:grid-cols-3">
      {windowTypes.map(({ type, name, description }) => (
        <div key={type} className="rounded-[8px] border border-border-default bg-white p-[16px]">
          <div className="mb-[13px] flex h-[86px] items-center justify-center overflow-hidden rounded-[6px] bg-bg2">
            <WindowTypeAnimation type={type} name={name} />
          </div>
          <h3 className="text-f15 font-bold text-t1">{name}</h3>
          <p className="mt-[5px] text-f13 leading-golden text-t2">{description}</p>
        </div>
      ))}
    </div>
  );
}
