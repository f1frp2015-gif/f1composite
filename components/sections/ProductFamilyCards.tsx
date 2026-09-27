import Link from "next/link";
import { productFamilies } from "@/content/data/productTaxonomy";
import { supplyTerms } from "@/content/data/company";
import { rebarCatalog } from "@/content/data/frpRebar";
import { threadedRodSeries } from "@/content/data/frpFasteners";
import windowSystems from "@/content/data/windowSystems.json";
import CoverCard from "@/components/ui/CoverCard";
import LineTag from "@/components/ui/LineTag";
import { productCovers } from "@/lib/covers";
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

// Each family's product line. Rebar and fittings have no line name yet, so
// they carry a plain label instead.
const FAMILY_MARKS: Record<string, { line?: string; label: string }> = {
  standard: { line: "F1-STRUX", label: "Standard profiles" },
  custom: { line: "F1-FORM", label: "Custom profiles" },
  windows: { line: "F1-THERM", label: "Windows & doors" },
  grating: { line: "F1-GRID", label: "Grating" },
  rebar: { label: "GFRP reinforcement" },
  fasteners: { label: "Connections" },
};

/**
 * The product families as the site's product cards: the family's own product
 * as the cover, the product line, what the family is, its key figures, and
 * links into the range. Used on the home page and /products/product-lines.
 */
export default function ProductFamilyCards() {
  const figures = familyFigures();
  return (
    <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2 xl:grid-cols-3">
      {productFamilies.map((family) => {
        const mark = FAMILY_MARKS[family.id];
        return (
          <div key={family.id} id={family.id} className="scroll-mt-[128px]">
            <CoverCard
              href={family.href}
              cover={productCovers[family.href as keyof typeof productCovers]}
              label={mark?.line ? <LineTag line={mark.line} /> : <LineTag line={mark?.label ?? "Product range"} mark={false} />}
              title={family.label}
              text={family.description}
              facts={figures[family.id]}
              action="Explore range"
              footer={
                <ul className="flex flex-wrap gap-x-[16px] gap-y-[2px] border-t border-border-default px-[18px] py-[8px] sm:px-[20px]">
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
              }
            />
          </div>
        );
      })}
    </div>
  );
}
