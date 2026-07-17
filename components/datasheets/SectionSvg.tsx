// Server-rendered inline SVG of a product cross-section — same geometry
// engine as the PDF drawing, so the web datasheet and the PDF always agree.

import type { Geometry } from "@/lib/catalog/shapes";
import { buildSection } from "@/lib/catalog/shapes";

function ringToPath(ring: readonly (readonly [number, number])[]): string {
  return (
    ring.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ") +
    " Z"
  );
}

export default function SectionSvg({
  geometry,
  size = 260,
  className,
}: {
  geometry: Geometry;
  size?: number;
  className?: string;
}) {
  const section = buildSection(geometry);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of section.outer) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  const w = maxX - minX;
  const h = maxY - minY;
  const pad = Math.max(w, h) * 0.08;
  const scale = size / (Math.max(w, h) + 2 * pad);
  const tx = (x: number) => (x - (minX + maxX) / 2) * scale + size / 2;
  const ty = (y: number) => size / 2 - (y - (minY + maxY) / 2) * scale;
  const mapRing = (ring: readonly (readonly [number, number])[]) =>
    ring.map(([x, y]) => [tx(x), ty(y)] as const);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Profile cross-section drawing"
    >
      <path d={ringToPath(mapRing(section.outer))} fill="#e0e7ff" stroke="#031697" strokeWidth={1.5} />
      {(section.holes ?? []).map((hole, i) => (
        <path key={i} d={ringToPath(mapRing(hole))} fill="#ffffff" stroke="#031697" strokeWidth={1.2} />
      ))}
    </svg>
  );
}
