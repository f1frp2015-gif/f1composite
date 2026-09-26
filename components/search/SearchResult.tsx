// One search result: icon, title (with the matched size highlighted), one
// summary line and a short badge. Shared by the search palette and /search;
// the caller wraps it in its own link.

import SectionGlyph, { type GlyphShape } from "@/components/ui/SectionGlyph";
import type { SearchEntry, SearchKind } from "@/lib/search/types";

// Product pages show the section of their family.
const PRODUCT_GLYPHS: [RegExp, GlyphShape][] = [
  [/frp-i-beam/, "i_beam"],
  [/frp-channel/, "channel"],
  [/frp-angle/, "angle"],
  [/frp-square-tube/, "shs"],
  [/frp-tube/, "tube"],
  [/frp-rod/, "rod"],
  [/frp-flat-bar/, "flat"],
  [/fiberglass-sheets/, "sheet"],
  [/fiberglass-plates|deck-panels/, "multicell"],
  [/grating|stair-treads/, "grating"],
  [/window|door/, "window"],
  [/rebar/, "rebar"],
  [/fasteners/, "fastener"],
];

// Other kinds use a drawn icon in the glyphs' 48-unit box and line weight.
const KIND_ICONS: Partial<Record<SearchKind, { fill: string; lines: string }>> = {
  document: { fill: "M12 6H30L38 14V42H12Z", lines: "M30 6V14H38M17 22H33M17 28H33M17 34H27" },
  tool: { fill: "M6 30H42V36H6Z", lines: "M10 30C16 22 32 22 38 30M24 10V20M20 16L24 20L28 16" },
  article: { fill: "M8 12C14 10 20 11 24 14C28 11 34 10 40 12V38C34 36 28 37 24 40C20 37 14 36 8 38Z", lines: "M24 14V40" },
  industry: { fill: "M6 40V22L16 28V22L26 28V14H34V40Z", lines: "M12 34H14M20 34H22M29 34H31" },
  glossary: { fill: "M10 10H38V34H22L14 40V34H10Z", lines: "M16 18H32M16 24H28" },
  company: { fill: "M12 8H36V42H12Z", lines: "M18 15H20M28 15H30M18 23H20M28 23H30M18 31H20M28 31H30M22 42V36H26V42" },
};

function ResultIcon({ entry }: { entry: SearchEntry }) {
  if (entry.size) return <SectionGlyph shape={entry.size.glyph as GlyphShape} size={28} />;
  if (entry.kind === "product") {
    const glyph = PRODUCT_GLYPHS.find(([pattern]) => pattern.test(entry.url))?.[1] ?? "custom";
    return <SectionGlyph shape={glyph} size={28} />;
  }
  const icon = KIND_ICONS[entry.kind] ?? KIND_ICONS.article!;
  return (
    <svg viewBox="0 0 48 48" width={28} height={28} className="shrink-0 text-deep" aria-hidden>
      <path d={icon.fill} className="fill-teal/15" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <path d={icon.lines} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Title({ text, highlight }: { text: string; highlight?: string | null }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <mark className="rounded-tag bg-lime/40 px-[1px] text-t1">{highlight}</mark>
      {text.slice(at + highlight.length)}
    </>
  );
}

export default function SearchResult({ entry, highlight }: { entry: SearchEntry; highlight?: string | null }) {
  return (
    <span className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-[12px]">
      <ResultIcon entry={entry} />
      <span className="min-w-0">
        <span className="block truncate text-f14 font-semibold text-t1">
          <Title text={entry.title} highlight={highlight} />
        </span>
        <span className="block truncate text-f12 text-t3">{entry.summary}</span>
      </span>
      {entry.badge ? <span className="hidden font-mono text-f12 uppercase tracking-[0.06em] text-teal-text sm:inline">{entry.badge}</span> : null}
    </span>
  );
}
