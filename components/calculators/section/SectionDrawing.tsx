import { useId } from "react";
import { sectionPath, type Section } from "./geometry";

const C_DIM = "#00857e";
const C_FAINT = "#6e7189";
const C_INK = "#0d0f24";
const FONT = "ui-monospace, SFMono-Regular, Menlo, monospace";

const fmt = (v: number) => `${Math.round(v * 10) / 10}`;

/**
 * Dimensioned 2-D cross-section drawing, ported from DimViz (dimviz.com):
 * outline + section hatch + overall width/height dimension lines + centroid
 * mark. Rendered directly from the polygon, so every dimension is exactly the
 * input geometry. All labels in mm.
 */
export default function SectionDrawing({
  section,
  centroid,
  className,
}: {
  section: Section;
  centroid: { cx: number; cy: number };
  className?: string;
}) {
  const uid = useId();
  const holes = section.holes ?? [];
  const xs = section.outer.map((p) => p[0]);
  const ys = section.outer.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = maxX - minX;
  const height = maxY - minY;
  const span = Math.max(width, height);

  // screen-space extents (y flipped)
  const sTop = -maxY;
  const sBot = -minY;
  const off = span * 0.12;
  const ext = off * 1.35;
  const fs = span * 0.058;
  const thin = span * 0.004;
  const arrow = span * 0.02;
  const hatchId = `hatch-${uid}`;

  const box = {
    x: minX - ext - span * 0.17,
    y: sTop - ext - span * 0.13,
    w: 0,
    h: 0,
  };
  box.w = maxX + span * 0.07 - box.x;
  box.h = sBot + span * 0.07 - box.y;

  const dimStroke = { stroke: C_DIM, strokeWidth: thin, fill: "none" as const };
  const extStroke = { stroke: C_FAINT, strokeWidth: thin * 0.8, fill: "none" as const };

  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      className={className}
      role="img"
      aria-label="Dimensioned cross-section drawing"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern
          id={hatchId}
          width={span * 0.03}
          height={span * 0.03}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2={span * 0.03} stroke="#c9ccd9" strokeWidth={thin * 0.7} />
        </pattern>
      </defs>

      {/* section fill + hatch */}
      <path d={sectionPath(section.outer, holes)} fill="#f6f7fa" fillRule="evenodd" />
      <path
        d={sectionPath(section.outer, holes)}
        fill={`url(#${hatchId})`}
        fillRule="evenodd"
        opacity="0.6"
      />
      <path
        d={sectionPath(section.outer, holes)}
        fill="none"
        fillRule="evenodd"
        stroke={C_INK}
        strokeWidth={thin * 1.6}
        strokeLinejoin="round"
      />

      {/* centroid crosshair */}
      <g stroke={C_DIM} strokeWidth={thin} fill="none">
        <circle cx={centroid.cx} cy={-centroid.cy} r={span * 0.022} />
        <line
          x1={centroid.cx - span * 0.04}
          y1={-centroid.cy}
          x2={centroid.cx + span * 0.04}
          y2={-centroid.cy}
        />
        <line
          x1={centroid.cx}
          y1={-centroid.cy - span * 0.04}
          x2={centroid.cx}
          y2={-centroid.cy + span * 0.04}
        />
      </g>

      {/* width dimension (top) */}
      <g>
        <line x1={minX} y1={sTop} x2={minX} y2={sTop - ext} {...extStroke} />
        <line x1={maxX} y1={sTop} x2={maxX} y2={sTop - ext} {...extStroke} />
        <line x1={minX} y1={sTop - off} x2={maxX} y2={sTop - off} {...dimStroke} />
        <Arrow x={minX} y={sTop - off} dir={1} size={arrow} horizontal />
        <Arrow x={maxX} y={sTop - off} dir={-1} size={arrow} horizontal />
        <text
          x={(minX + maxX) / 2}
          y={sTop - off - fs * 0.5}
          fontSize={fs}
          fill={C_INK}
          textAnchor="middle"
          fontFamily={FONT}
        >
          {fmt(width)}
        </text>
      </g>

      {/* height dimension (left) */}
      <g>
        <line x1={minX} y1={sTop} x2={minX - ext} y2={sTop} {...extStroke} />
        <line x1={minX} y1={sBot} x2={minX - ext} y2={sBot} {...extStroke} />
        <line x1={minX - off} y1={sTop} x2={minX - off} y2={sBot} {...dimStroke} />
        <Arrow x={minX - off} y={sTop} dir={1} size={arrow} />
        <Arrow x={minX - off} y={sBot} dir={-1} size={arrow} />
        <text
          x={minX - off - fs * 0.5}
          y={(sTop + sBot) / 2}
          fontSize={fs}
          fill={C_INK}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(-90 ${minX - off - fs * 0.5} ${(sTop + sBot) / 2})`}
          fontFamily={FONT}
        >
          {fmt(height)}
        </text>
      </g>

      {/* unit tag */}
      <text
        x={maxX}
        y={sBot + span * 0.055}
        fontSize={fs * 0.82}
        fill={C_FAINT}
        textAnchor="end"
        fontFamily={FONT}
      >
        mm
      </text>
    </svg>
  );
}

function Arrow({
  x,
  y,
  dir,
  size,
  horizontal = false,
}: {
  x: number;
  y: number;
  dir: number;
  size: number;
  horizontal?: boolean;
}) {
  const d = horizontal
    ? `M${x} ${y} L${x + dir * size} ${y - size * 0.42} L${x + dir * size} ${y + size * 0.42} Z`
    : `M${x} ${y} L${x - size * 0.42} ${y + dir * size} L${x + size * 0.42} ${y + dir * size} Z`;
  return <path d={d} fill={C_DIM} />;
}
