import Link from "next/link";
import { productFamilies } from "@/content/data/productTaxonomy";
import { supplyTerms } from "@/content/data/company";
import { rebarCatalog } from "@/content/data/frpRebar";
import { threadedRodSeries } from "@/content/data/frpFasteners";
import windowSystems from "@/content/data/windowSystems.json";
import SectionGlyph, { type GlyphShape } from "@/components/ui/SectionGlyph";
import LineTag from "@/components/ui/LineTag";
import { PROFILE_FAMILIES } from "@/lib/catalog/profileFamilies";
import type { ShapeId } from "@/lib/catalog/shapes";
import { buildProducts } from "@/lib/catalog/standardProfiles";

// Key figures for each family, read from the catalog and data files so a card
// never states more than its product page.
function familyFigures(): Record<string, string[]> {
  const sizes = buildProducts();
  const families = new Set(sizes.map((product) => PROFILE_FAMILIES[product.geometry.shape as ShapeId].url)).size;
  const series = windowSystems.series.map((item) => Number(item.name.match(/^\d+/)?.[0])).filter(Boolean);
  const diameters = rebarCatalog.diameters;
  const unc = threadedRodSeries.filter((rod) => rod.thread.endsWith(" UNC")).map((rod) => rod.thread.split("–")[0]);
  const metric = threadedRodSeries.filter((rod) => /^M\d+$/.test(rod.thread)).map((rod) => rod.thread);
  const [dieMin, dieMax] = supplyTerms.newDieLeadTimeWeeks;
  return {
    standard: [`${sizes.length} sizes`, `${families} section families`, "EN 13706 E23"],
    custom: [`New die in ${dieMin}–${dieMax} weeks`, `First run from ${supplyTerms.customMoqMeters.firstRun} m`],
    windows: [`${Math.min(...series)}–${Math.max(...series)} series`, "Profiles or finished units"],
    grating: ["Molded mesh", "Pultruded bars", "Clips and fixings"],
    rebar: [`${diameters.length} diameters`, `Ø${diameters[0]}–${diameters[diameters.length - 1]} mm`, "Bars, bends, mesh"],
    fasteners: [`UNC ${unc[0]}–${unc[unc.length - 1]}`, `${metric[0]}–${metric[metric.length - 1]}`, "Rods, nuts, washers"],
  };
}

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

/**
 * The product families as the site's product cards: product line, section
 * glyph, what the family is, its key figures, and links into the range.
 */
export default function ProductFamilyCards() {
  const figures = familyFigures();
  return (
    <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2 xl:grid-cols-3">
      {productFamilies.map((family) => {
        const mark = FAMILY_MARKS[family.id];
        return (
          <article key={family.id} id={family.id} className="flex flex-col rounded-card border border-border-default bg-white">
            <Link href={family.href} className="group flex flex-1 flex-col p-[20px] sm:p-[24px]">
              <div className="flex items-start justify-between gap-[12px]">
                {mark?.line ? (
                  <LineTag line={mark.line} />
                ) : (
                  <LineTag line={mark?.label ?? "Product range"} mark={false} />
                )}
                {mark ? <SectionGlyph shape={mark.glyph} size={56} /> : null}
              </div>
              <h3 className="mt-[4px] text-f24 font-bold leading-tight text-t1 group-hover:text-teal-text">{family.label}</h3>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">{family.description}</p>
              {figures[family.id]?.length ? (
                <ul className="mt-[14px] flex flex-wrap gap-[6px]" aria-label={`${family.label} key figures`}>
                  {figures[family.id].map((figure) => (
                    <li key={figure} className="rounded-tag border border-border-default bg-bg2 px-[8px] py-[3px] font-mono text-f12 text-t1">
                      {figure}
                    </li>
                  ))}
                </ul>
              ) : null}
              <span className="mt-auto pt-[16px] text-f14 font-bold text-teal-text">Explore range →</span>
            </Link>
            <ul className="flex flex-wrap gap-x-[16px] gap-y-[2px] border-t border-border-default px-[20px] py-[8px] sm:px-[24px]">
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
