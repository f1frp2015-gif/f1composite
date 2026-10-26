// Line icons for the ten GFRP rebar application segments, keyed by the anchor
// each segment uses on the applications page (marine, precast, flatwork …).
// Same 48-unit box and line weight as the family glyphs (SectionGlyph), so a
// segment card and the matching applications section carry one mark.

export type RebarSegmentId = "marine" | "precast" | "flatwork" | "bridges" | "mri" | "soft-eye" | "water" | "buildings" | "flood" | "walls";

const PATHS: Record<RebarSegmentId, string> = {
  // seawall with waves against it
  marine: "M8 12h10v28H8z M22 27c3-3 6-3 9 0s6 3 9 0 M22 35c3-3 6-3 9 0s6 3 9 0",
  // stacked precast panels
  precast: "M6 10h36v7H6z M6 21h36v7H6z M6 32h36v7H6z",
  // slab on grade in perspective with a bar grid
  flatwork: "M6 34l10-16h26L32 34z M11 26h26 M19 18l-5 16 M30 18l-5 16 M4 40h40",
  // deck, piers and an arch
  bridges: "M4 18h40 M12 18v16 M36 18v16 M8 36c6-14 26-14 32 0",
  // bore magnet and the table beneath it
  mri: "M24 10a14 14 0 1 0 0 28a14 14 0 1 0 0-28z M24 17a7 7 0 1 0 0 14a7 7 0 1 0 0-14z M4 42h40",
  // tunnel portal with a cutterhead in the eye
  "soft-eye": "M8 40V24a16 16 0 0 1 32 0v16 M24 24m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0 M24 17v-5 M24 36v-5 M17 24h-5 M36 24h-5",
  // tank with a water line
  water: "M8 14h32v24H8z M8 26c4-3 8-3 12 0s8 3 12 0s5-3 8 0 M14 9h20",
  // two buildings and the ground line
  buildings: "M6 42V16h16v26 M22 42V8h20v34 M10 22h4 M10 28h4 M10 34h4 M28 14h4 M28 20h4 M28 26h4 M28 32h4 M4 42h40",
  // box culvert with water inside
  flood: "M6 40V14h36v26 M12 40V20h24v20 M15 32c3-3 6-3 9 0s6 3 9 0",
  // running-bond wall
  walls: "M6 14h36v24H6z M6 22h36 M6 30h36 M18 14v8 M30 14v8 M12 22v8 M24 22v8 M36 22v8 M18 30v8 M30 30v8",
};

export function isRebarSegmentId(value: string): value is RebarSegmentId {
  return Object.hasOwn(PATHS, value);
}

export default function RebarSegmentIcon({ id, className = "h-[40px] w-[40px]" }: { id: RebarSegmentId; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[id]} />
    </svg>
  );
}
