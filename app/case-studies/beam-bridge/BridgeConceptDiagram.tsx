type Point = readonly [number, number];
type Variant = "A" | "B" | "C" | "D";

const ink = "#102657";
const blue = "#255cdb";
const teal = "#087e8b";
const timber = "#d5b58d";
const add = (a: Point, b: Point): Point => [a[0] + b[0], a[1] + b[1]];
const scale = (p: Point, value: number): Point => [p[0] * value, p[1] * value];
const points = (...values: Point[]) => values.map((p) => p.join(",")).join(" ");

function Dimension({
  from,
  to,
  label,
  offset = 0,
}: {
  from: Point;
  to: Point;
  label: string;
  offset?: number;
}) {
  const length = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const unit: Point = [(to[0] - from[0]) / length, (to[1] - from[1]) / length];
  const normal: Point = [-unit[1], unit[0]];
  const start = add(from, scale(normal, offset));
  const end = add(to, scale(normal, offset));
  const middle = scale(add(start, end), 0.5);
  const arrow = (at: Point, direction: number) =>
    points(
      at,
      add(add(at, scale(unit, 8 * direction)), scale(normal, 3)),
      add(add(at, scale(unit, 8 * direction)), scale(normal, -3)),
    );
  return (
    <g stroke={blue} strokeWidth="1.1" fill="none">
      {offset !== 0 && (
        <>
          <path
            d={`M ${from} L ${add(start, scale(normal, offset > 0 ? 6 : -6))}`}
            opacity=".45"
          />
          <path
            d={`M ${to} L ${add(end, scale(normal, offset > 0 ? 6 : -6))}`}
            opacity=".45"
          />
        </>
      )}
      <path d={`M ${start} L ${end}`} />
      <polygon points={arrow(start, 1)} fill={blue} stroke="none" />
      <polygon points={arrow(end, -1)} fill={blue} stroke="none" />
      <text
        x={middle[0]}
        y={middle[1] - 10}
        fill={blue}
        stroke="none"
        fontSize="17"
        fontWeight="600"
        textAnchor="middle"
        transform={`rotate(${(Math.atan2(unit[1], unit[0]) * 180) / Math.PI} ${middle[0]} ${middle[1] - 10})`}
      >
        {label}
      </text>
    </g>
  );
}

function Deck({
  origin,
  length,
  width,
  planks = 32,
}: {
  origin: Point;
  length: Point;
  width: Point;
  planks?: number;
}) {
  const end = add(origin, length);
  const near = add(origin, width);
  const down: Point = [0, 7];
  return (
    <g stroke={ink} strokeWidth="1.15" strokeLinejoin="round">
      <polygon
        points={points(
          near,
          add(end, width),
          add(add(end, width), down),
          add(near, down),
        )}
        fill="#a5805e"
      />
      <polygon
        points={points(origin, near, add(near, down), add(origin, down))}
        fill="#bd956b"
      />
      <polygon
        points={points(origin, end, add(end, width), near)}
        fill={timber}
      />
      {Array.from({ length: planks - 1 }, (_, i) => {
        const start = add(origin, scale(length, (i + 1) / planks));
        return (
          <path
            key={i}
            d={`M ${start} L ${add(start, width)}`}
            stroke="#9b7655"
            strokeWidth=".65"
          />
        );
      })}
      <path
        d={`M ${add(origin, scale(width, 0.05))} L ${add(end, scale(width, 0.05))}`}
        stroke="#eddcc7"
        strokeWidth="1.8"
      />
    </g>
  );
}

function Railing({
  origin,
  length,
  width,
  count = 9,
}: {
  origin: Point;
  length: Point;
  width: Point;
  count?: number;
}) {
  const height: Point = [0, -37];
  return (
    <g fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round">
      {[origin, add(origin, width)].map((start, side) => (
        <g key={side} opacity={side === 0 ? 0.48 : 0.83}>
          <path
            d={`M ${add(start, height)} L ${add(add(start, length), height)}`}
            strokeWidth="2.4"
          />
          <path
            d={`M ${add(start, scale(height, 0.46))} L ${add(add(start, length), scale(height, 0.46))}`}
            strokeWidth="1"
          />
          {Array.from({ length: count }, (_, i) => {
            const base = add(start, scale(length, i / (count - 1)));
            return (
              <path
                key={i}
                d={`M ${base} L ${add(base, height)}`}
                strokeWidth="1.65"
              />
            );
          })}
        </g>
      ))}
    </g>
  );
}

function Support({
  origin,
  width,
  height = 52,
}: {
  origin: Point;
  width: Point;
  height?: number;
}) {
  const end = add(origin, width);
  const top: Point = [12, -4];
  return (
    <g stroke="#acbac7" strokeWidth="1.1" strokeLinejoin="round">
      <polygon
        points={points(
          origin,
          end,
          add(end, [0, height]),
          add(origin, [0, height]),
        )}
        fill="#dce3e9"
      />
      <polygon
        points={points(
          end,
          add(end, top),
          add(add(end, top), [0, height]),
          add(end, [0, height]),
        )}
        fill="#becbd6"
      />
      <polygon
        points={points(origin, add(origin, top), add(end, top), end)}
        fill="#f5f7fa"
      />
    </g>
  );
}

function BoxGirder({
  origin,
  length,
  width,
  depth,
}: {
  origin: Point;
  length: Point;
  width: Point;
  depth: number;
}) {
  const end = add(origin, length);
  const near = add(origin, width);
  const section = (u: number, v: number): Point =>
    add(add(origin, scale(width, u * (1 - 0.15 * v) + 0.075 * v)), [
      0,
      depth * v,
    ]);
  const nearBottom = section(1, 1);
  return (
    <g stroke={ink} strokeWidth="1.2" strokeLinejoin="round">
      <polygon
        points={points(
          near,
          add(end, width),
          add(nearBottom, length),
          nearBottom,
        )}
        fill="#42678a"
      />
      <path
        d={`M ${add(near, [0, depth * 0.16])} L ${add(add(end, width), [0, depth * 0.16])}`}
        stroke="#7296b5"
        strokeWidth=".9"
      />
      <polygon
        points={points(
          section(0, 0),
          section(1, 0),
          section(1, 1),
          section(0, 1),
        )}
        fill="#d9e6ee"
      />
      {Array.from({ length: 5 }, (_, i) => (
        <polygon
          key={i}
          points={points(
            section(i / 5 + 0.018, 0.14),
            section((i + 1) / 5 - 0.018, 0.14),
            section((i + 1) / 5 - 0.018, 0.88),
            section(i / 5 + 0.018, 0.88),
          )}
          fill="#f9fcff"
          stroke="#58748e"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

function SectionInset({ deep = false }: { deep?: boolean }) {
  const x = 506;
  const y = deep ? 353 : 376;
  const height = deep ? 58 : 23;
  return (
    <g>
      <text
        x={x}
        y={y - 24}
        fill="#72839b"
        fontSize="11"
        letterSpacing="1.6"
        fontFamily="monospace"
      >
        SECTION / INDICATIVE
      </text>
      <path
        d={`M ${x} ${y} H ${x + 156} L ${x + 146} ${y + height} H ${x + 10} Z`}
        fill="#e1eaf0"
        stroke={ink}
        strokeWidth="1.5"
      />
      {Array.from({ length: 5 }, (_, i) => (
        <path
          key={i}
          d={`M ${x + 12 + i * 28} ${y + 5} H ${x + 32 + i * 28} L ${x + 30 + i * 28} ${y + height - 5} H ${x + 14 + i * 28} Z`}
          fill="#fff"
          stroke="#698099"
          strokeWidth=".85"
        />
      ))}
      <path
        d={`M ${x - 4} ${y - 4} H ${x + 160}`}
        stroke={timber}
        strokeWidth="6"
      />
      <path
        d={`M ${x + 169} ${y} H ${x + 181} M ${x + 175} ${y} V ${y + height} M ${x + 169} ${y + height} H ${x + 181}`}
        stroke={blue}
        strokeWidth="1"
      />
      <text
        x={x + 78}
        y={y + height + 24}
        fill={ink}
        fontSize="13"
        textAnchor="middle"
      >
        {deep ? "≈ 970 mm reference depth" : "≈ 250 mm reference depth"}
      </text>
    </g>
  );
}

function ModularBridge() {
  const nodes: Point[] = [
    [74, 244],
    [246, 173],
    [408, 190],
    [580, 112],
  ];
  const width: Point = [79, 46];
  return (
    <>
      <path
        d="M 53 320 C 236 254 430 324 699 204"
        fill="none"
        stroke="#dceaf0"
        strokeWidth="50"
        opacity=".65"
      />
      {nodes.map((point, i) => (
        <Support
          key={i}
          origin={add(point, [-7, 21])}
          width={add(width, [15, 8])}
          height={48}
        />
      ))}
      {nodes.slice(0, 3).map((point, i) => {
        const length: Point = [
          nodes[i + 1][0] - point[0],
          nodes[i + 1][1] - point[1],
        ];
        return (
          <g key={i}>
            <BoxGirder
              origin={add(point, [0, 6])}
              length={length}
              width={width}
              depth={20}
            />
            <Deck origin={point} length={length} width={width} planks={13} />
            <Railing origin={point} length={length} width={width} count={5} />
            <Dimension
              from={add(point, [0, -42])}
              to={add(point, add(length, [0, -42]))}
              label="4 m"
              offset={-21}
            />
          </g>
        );
      })}
      <g fill={teal} fontSize="13" fontFamily="monospace">
        {nodes.map((point, i) => (
          <text key={i} x={point[0] + 4} y={point[1] + 100}>
            P{i + 1}
          </text>
        ))}
      </g>
      <SectionInset />
    </>
  );
}

function DeepBridge() {
  const origin: Point = [84, 188];
  const length: Point = [438, -104];
  const width: Point = [132, 75];
  return (
    <>
      <Support origin={[97, 284]} width={[111, 64]} height={31} />
      <Support origin={[528, 181]} width={[111, 64]} height={31} />
      <BoxGirder
        origin={add(origin, [0, 7])}
        length={length}
        width={width}
        depth={80}
      />
      <Deck origin={origin} length={length} width={width} />
      <Railing origin={origin} length={length} width={width} />
      <Dimension
        from={add(origin, [0, -47])}
        to={add(add(origin, length), [0, -47])}
        offset={-17}
        label="12 m"
      />
      <path
        d="M 223 302 L 347 348 H 448"
        stroke="#7290aa"
        strokeWidth="1.1"
        fill="none"
      />
      <circle cx="223" cy="302" r="3" fill={teal} />
      <text x="345" y="373" fill={ink} fontSize="13" textAnchor="middle">
        Multicell box
      </text>
      <SectionInset deep />
    </>
  );
}

function IBeam({
  origin,
  length,
  width = 25,
  depth = 42,
}: {
  origin: Point;
  length: Point;
  width?: number;
  depth?: number;
}) {
  const w: Point = [width, width * 0.56];
  const at = (u: number, z: number): Point =>
    add(add(origin, scale(w, u)), [0, z]);
  const outline = [
    at(0, 0),
    at(1, 0),
    at(1, 5),
    at(0.62, 5),
    at(0.62, depth - 5),
    at(1, depth - 5),
    at(1, depth),
    at(0, depth),
    at(0, depth - 5),
    at(0.38, depth - 5),
    at(0.38, 5),
    at(0, 5),
  ];
  return (
    <g stroke={ink} strokeWidth="1.05" strokeLinejoin="round">
      <polygon
        points={points(
          at(0, depth - 5),
          add(at(0, depth - 5), length),
          add(at(1, depth - 5), length),
          at(1, depth - 5),
        )}
        fill="#6994b1"
      />
      <polygon
        points={points(
          at(1, depth - 5),
          add(at(1, depth - 5), length),
          add(at(1, depth), length),
          at(1, depth),
        )}
        fill="#1c466c"
      />
      <polygon
        points={points(
          at(0.62, 5),
          add(at(0.62, 5), length),
          add(at(0.62, depth - 5), length),
          at(0.62, depth - 5),
        )}
        fill="#346582"
      />
      <polygon
        points={points(
          at(0, 0),
          add(at(0, 0), length),
          add(at(1, 0), length),
          at(1, 0),
        )}
        fill="#91b7ce"
      />
      <polygon
        points={points(
          at(1, 0),
          add(at(1, 0), length),
          add(at(1, 5), length),
          at(1, 5),
        )}
        fill="#315f84"
      />
      <polygon points={points(...outline)} fill="#d5e6ef" />
      <path
        d={`M ${at(0.1, 1)} L ${add(at(0.1, 1), length)}`}
        stroke="#c4dfe9"
        strokeWidth="1.1"
      />
    </g>
  );
}

function BeamAssembly({ hero }: { hero: boolean }) {
  const origin: Point = [78, 152];
  const length: Point = [432, -100];
  const width: Point = [146, 82];
  const beamOrigin = add(origin, [10, 128]);
  return (
    <>
      <g fill="none" stroke="#a6bfce" strokeDasharray="4 6" strokeWidth="1">
        {[
          origin,
          add(origin, width),
          add(origin, length),
          add(add(origin, length), width),
        ].map((p, i) => (
          <path key={i} d={`M ${add(p, [0, 7])} v 158`} />
        ))}
      </g>
      {[0.02, 0.42, 0.82].map((n) => (
        <IBeam
          key={n}
          origin={add(beamOrigin, scale(width, n))}
          length={scale(length, 0.96)}
        />
      ))}
      {[0.06, 0.34, 0.63, 0.93].map((n) => {
        const p = add(add(origin, [0, 75]), scale(length, n));
        const end = add(p, width);
        const thickness: Point = [9, -2];
        return (
          <g key={n} stroke="#335371" strokeWidth="1.1" strokeLinejoin="round">
            <polygon
              points={points(p, end, add(end, [0, 14]), add(p, [0, 14]))}
              fill="#99b2c3"
            />
            <polygon
              points={points(p, add(p, thickness), add(end, thickness), end)}
              fill="#eef4f7"
            />
            <polygon
              points={points(
                end,
                add(end, thickness),
                add(add(end, thickness), [0, 14]),
                add(end, [0, 14]),
              )}
              fill="#62819c"
            />
          </g>
        );
      })}
      <Deck origin={origin} length={length} width={width} planks={34} />
      {hero && (
        <Railing origin={origin} length={length} width={width} count={10} />
      )}
      <Dimension from={[246, 432]} to={[659, 336]} label="12 m bridge body" />
      <g fill="none" stroke={teal} strokeWidth="1.1">
        <path d="M 217 343 L 117 380 H 69" />
        <circle cx="217" cy="343" r="3" fill={teal} />
      </g>
      <text x="69" y="403" fill={ink} fontSize="14">
        Pultruded GRP
      </text>
      <text x="69" y="422" fill="#6b7f94" fontSize="12">
        Longitudinal I-beams
      </text>
      <g fill="none" stroke={teal} strokeWidth="1.1">
        <path d="M 622 143 L 700 155 V 167" />
        <circle cx="622" cy="143" r="3" fill={teal} />
      </g>
      <text x="724" y="185" fill={ink} fontSize="13" textAnchor="end">
        Deck finish
      </text>
      <text x="724" y="203" fill="#6b7f94" fontSize="11" textAnchor="end">
        Illustrative
      </text>
    </>
  );
}

const curve = (t: number): Point => {
  const p: Point[] = [
    [78, 223],
    [246, 63],
    [352, 292],
    [618, 125],
  ];
  const u = 1 - t;
  return [
    u ** 3 * p[0][0] +
      3 * u ** 2 * t * p[1][0] +
      3 * u * t ** 2 * p[2][0] +
      t ** 3 * p[3][0],
    u ** 3 * p[0][1] +
      3 * u ** 2 * t * p[1][1] +
      3 * u * t ** 2 * p[2][1] +
      t ** 3 * p[3][1],
  ];
};

function CurvedBridge() {
  const width: Point = [78, 44];
  const top =
    "M 78 223 C 246 63 352 292 618 125 L 696 169 C 430 336 324 107 156 267 Z";
  return (
    <>
      <Support origin={[81, 267]} width={[78, 44]} height={46} />
      <Support origin={[615, 171]} width={[83, 47]} height={37} />
      <path
        d="M 156 267 C 324 107 430 336 696 169 L 696 216 C 430 383 324 154 156 314 Z"
        fill="#426c8c"
        stroke={ink}
        strokeWidth="1.2"
      />
      <path
        d="M 156 275 C 324 115 430 344 696 177"
        fill="none"
        stroke="#8eb0c7"
        strokeWidth="1.3"
      />
      <path
        d="M 78 229 L 156 273 V 314 L 78 270 Z"
        fill="#d8e7ef"
        stroke={ink}
        strokeWidth="1.2"
      />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M ${84 + i * 18} ${238 + i * 10.15} l 13 7.35 v 27 l -13 -7.35 Z`}
          fill="#f8fcff"
          stroke="#4f7291"
          strokeWidth=".85"
        />
      ))}
      <path d={top} fill={timber} stroke={ink} strokeWidth="1.2" />
      {Array.from({ length: 38 }, (_, i) => {
        const p = curve((i + 1) / 39);
        return (
          <path
            key={i}
            d={`M ${p} L ${add(p, width)}`}
            stroke="#987552"
            strokeWidth=".65"
          />
        );
      })}
      <g stroke={ink} fill="none" strokeLinejoin="round" strokeLinecap="round">
        {[0, 1].map((side) => (
          <g
            key={side}
            transform={`translate(${side * width[0]} ${side * width[1]})`}
            opacity={side ? 0.85 : 0.48}
          >
            <path d="M 78 186 C 246 26 352 255 618 88" strokeWidth="2.5" />
            <path d="M 78 205 C 246 45 352 274 618 107" strokeWidth="1" />
            {Array.from({ length: 12 }, (_, i) => {
              const p = curve(i / 11);
              return <path key={i} d={`M ${p} v -37`} strokeWidth="1.6" />;
            })}
          </g>
        ))}
      </g>
      <path
        d="M 75 162 C 227 11 365 223 613 62"
        fill="none"
        stroke={blue}
        strokeWidth="1.1"
        strokeDasharray="4 4"
      />
      <text
        x="364"
        y="92"
        fill={blue}
        fontSize="17"
        fontWeight="600"
        textAnchor="middle"
      >
        12 m along the curve
      </text>
      <path
        d="M 451 295 L 498 357 H 647"
        stroke={teal}
        strokeWidth="1.1"
        fill="none"
      />
      <circle cx="451" cy="295" r="3" fill={teal} />
      <text x="496" y="383" fill={ink} fontSize="14">
        Custom mould + laminate
      </text>
      <text x="496" y="404" fill="#6b7f94" fontSize="12">
        Bonded internal webs
      </text>
    </>
  );
}

const descriptions: Record<Variant, string> = {
  A: "Concept A: three straight four-metre GRP modules on four indicative supports, with a shallow multicell section. Approximately 250 mm is reference geometry only.",
  B: "Concept B: a straight twelve-metre bridge body with a deep GRP multicell box. Approximately 970 mm is reference geometry only.",
  C: "Concept C: exploded assembly of an illustrative deck, transverse cross-members and three pultruded GRP longitudinal I-beams. Twelve-metre total body length; actual supports and member sizes require design.",
  D: "Concept D: a curved twelve-metre hand-laid GRP body, using a custom mould, laminate and bonded internal webs. Manufacturing route and supports require project-specific review.",
};

export default function BridgeConceptDiagram({
  variant,
  className,
  hero = false,
}: {
  variant: Variant;
  className?: string;
  hero?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 760 460"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={descriptions[variant]}
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      <desc>
        Architectural concept illustration. Target width 2.15 m for all routes.
        Geometry and timber-look deck finish are illustrative; not a
        construction drawing.
      </desc>
      <g fill="none" stroke="#dfe8f0" strokeWidth=".65" opacity=".62">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M ${47 + i * 94} ${360 + i * 9} l 245 -59`} />
        ))}
        <path d="M 85 358 l 108 63 M 216 326 l 140 80 M 347 294 l 172 99 M 478 263 l 189 107" />
      </g>
      <ellipse
        cx="386"
        cy="340"
        rx="232"
        ry="21"
        transform="rotate(-12 386 340)"
        fill="#2c668c"
        opacity=".035"
      />
      <g fontFamily="Arial, Helvetica, sans-serif">
        {variant === "A" && <ModularBridge />}
        {variant === "B" && <DeepBridge />}
        {variant === "C" && <BeamAssembly hero={hero} />}
        {variant === "D" && <CurvedBridge />}
      </g>
    </svg>
  );
}
