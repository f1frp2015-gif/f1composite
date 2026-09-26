import Image from "next/image";
import Link from "next/link";
import { productFamilies } from "@/content/data/productTaxonomy";
import SectionGlyph, { type GlyphShape } from "@/components/ui/SectionGlyph";
import LineTag from "@/components/ui/LineTag";

// Each family's section glyph and product line. Rebar and fittings have no
// line name yet, so they carry a plain label instead.
const FAMILY_MARKS: Record<string, { glyph: GlyphShape; line?: string; label: string }> = {
  standard: { glyph: "i_beam", line: "F1-STRUX", label: "Standard profiles" },
  custom: { glyph: "custom", line: "F1-FORM", label: "Custom profiles" },
  windows: { glyph: "window", line: "F1-THERM", label: "Windows & doors" },
  grating: { glyph: "grating", line: "F1-GRID", label: "Grating" },
  rebar: { glyph: "rebar", label: "GFRP reinforcement" },
  fasteners: { glyph: "fastener", label: "Connections" },
};

export default function ProductFamilyCards() {
  return (
    <div className="grid gap-[20px] md:grid-cols-2">
      {productFamilies.map((family, index) => {
        const mark = FAMILY_MARKS[family.id];
        return (
          <article
            key={family.id}
            id={family.id}
            className={`overflow-hidden rounded-card border border-border-default ${index < 2 ? "bg-white" : "bg-bg2"}`}
          >
            <div
              className={`grid ${index < 2 ? "sm:grid-cols-[0.85fr_1.15fr]" : "grid-cols-[100px_1fr] sm:grid-cols-[150px_1fr]"}`}
            >
              <Link
                href={family.href}
                className={`relative block bg-[#f1f4f5] ${index < 2 ? "min-h-[190px]" : "min-h-[150px]"}`}
                aria-label={`Explore ${family.label}`}
              >
                <Image
                  src={family.image}
                  alt={family.imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, 25vw"
                  className="object-contain p-[12px]"
                />
              </Link>
              <div className="p-[20px] sm:p-[24px]">
                <div className="flex items-start justify-between gap-[12px]">
                  {mark?.line ? (
                    <LineTag line={mark.line} />
                  ) : (
                    <p className="font-mono text-f12 font-medium uppercase tracking-[0.06em] text-teal-text">
                      {mark?.label ?? "Product range"}
                    </p>
                  )}
                  {mark ? <SectionGlyph shape={mark.glyph} size={36} /> : null}
                </div>
                <h3 className="mt-[8px] text-f24 font-bold leading-tight text-t1">
                  <Link href={family.href} className="hover:text-teal-text">
                    {family.label}
                  </Link>
                </h3>
                <p className="mt-[10px] text-f14 leading-relaxed text-t2">
                  {family.description}
                </p>
                <Link
                  href={family.href}
                  className="mt-[14px] inline-flex min-h-[36px] items-center text-f14 font-bold text-teal-text"
                >
                  Explore range →
                </Link>
              </div>
            </div>
            <ul className="flex flex-wrap gap-x-[18px] gap-y-[4px] border-t border-border-default px-[20px] py-[12px]">
              {family.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[36px] items-center text-f14 font-semibold text-t2 underline decoration-border-default underline-offset-4 hover:text-teal-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
