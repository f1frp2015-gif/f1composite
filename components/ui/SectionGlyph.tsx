// Cross-section glyphs: the site's icon language for product families. The
// eight catalog shapes are drawn by the same section builder as the web and PDF
// datasheets, so an icon and the datasheet drawing always agree; the other
// families (grating, rebar, window profiles …) are drawn by hand in the same
// 48-unit box, line weight and fill.

import { buildSection, type ShapeId } from "@/lib/catalog/shapes";

export type GlyphShape =
  | ShapeId
  | "sheet"
  | "multicell"
  | "grating"
  | "rebar"
  | "window"
  | "custom"
  | "fastener";

// Representative proportions for each catalog shape, not a specific size.
const PRESETS: Record<ShapeId, Record<string, number>> = {
  i_beam: { H: 100, B: 66, tf: 10, tw: 10 },
  channel: { H: 100, B: 52, tf: 10, tw: 10 },
  angle: { a: 90, b: 90, t: 12 },
  shs: { D: 90, t: 12 },
  rhs: { H: 62, B: 100, t: 11 },
  tube: { OD: 90, t: 12 },
  rod: { D: 72 },
  flat: { H: 20, B: 100 },
};

// Hand-drawn families, in a 48 × 48 box.
const DRAWN: Record<Exclude<GlyphShape, ShapeId>, { fill: string; lines?: string }> = {
  sheet: { fill: "M5 21H43V27H5Z", lines: "M9 14H39M9 34H39" },
  multicell: { fill: "M4 16H44V32H4Z M8 20V28H15V20Z M19 20V28H29V20Z M33 20V28H40V20Z" },
  grating: { fill: "M7 13h5v22h-5Z M17 13h5v22h-5Z M26 13h5v22h-5Z M36 13h5v22h-5Z", lines: "M4 24H44" },
  rebar: { fill: "M24 13a11 11 0 1 0 0.01 0Z", lines: "M13.4 9.4l3 3M34.6 9.4l-3 3M9.4 34.6l3-3M38.6 34.6l-3-3M24 7V9M24 39v2M7 24H9M39 24h2" },
  window: { fill: "M6 9H42V39H6Z M10 13V35H18V13Z M22 13V22H30V13Z M22 26V35H30V26Z M34 13V35H38V13Z" },
  custom: { fill: "M7 33L13 12H26L30 20H42V37H19Z", lines: "M21 27a3 3 0 1 0 0.01 0" },
  fastener: { fill: "M17 6H31L35 12L31 18H17L13 12Z M20 18H28V42H20Z", lines: "M20 24L28 22M20 29L28 27M20 34L28 32M20 39L28 37" },
};

function ring(points: readonly (readonly [number, number])[], map: (p: readonly [number, number]) => [number, number]) {
  return points.map((p, i) => {
    const [x, y] = map(p);
    return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ") + "Z";
}

function catalogPath(shape: ShapeId) {
  const section = buildSection({ kind: "parametric", shape, dims: PRESETS[shape] });
  const xs = section.outer.map(([x]) => x);
  const ys = section.outer.map(([, y]) => y);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const scale = 36 / Math.max(maxX - minX, maxY - minY);
  const map = ([x, y]: readonly [number, number]): [number, number] => [
    24 + (x - (minX + maxX) / 2) * scale,
    24 - (y - (minY + maxY) / 2) * scale,
  ];
  return [section.outer, ...(section.holes ?? [])].map((points) => ring(points, map)).join(" ");
}

export default function SectionGlyph({
  shape,
  size = 40,
  title,
  className = "",
}: {
  shape: GlyphShape;
  size?: number;
  /** Accessible name; omit when the glyph sits next to a visible label. */
  title?: string;
  className?: string;
}) {
  const drawn = shape in DRAWN ? DRAWN[shape as keyof typeof DRAWN] : null;
  const fill = drawn ? drawn.fill : catalogPath(shape as ShapeId);
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={`shrink-0 text-deep ${className}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={fill} fillRule="evenodd" className="fill-teal/15" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {drawn?.lines ? <path d={drawn.lines} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" /> : null}
    </svg>
  );
}
