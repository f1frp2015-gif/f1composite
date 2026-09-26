import Link from "next/link";
import SectionGlyph from "@/components/ui/SectionGlyph";
import LineTag from "@/components/ui/LineTag";
import { mainNav } from "@/content/data/navigation";
import { PROFILE_FAMILIES } from "@/lib/catalog/profileFamilies";
import type { ShapeId } from "@/lib/catalog/shapes";
import { buildProducts } from "@/lib/catalog/standardProfiles";

// The standard profile families with their own pages, labelled and drawn as in
// the Products menu, with their catalog size counts.
const standardProfiles = mainNav[0].sections[0].links.filter((link) => link.href.startsWith("/products/fiberglass-structural-shapes/"));

function sizeCounts() {
  const counts = new Map<string, number>();
  for (const product of buildProducts()) {
    const url = PROFILE_FAMILIES[product.geometry.shape as ShapeId].url;
    counts.set(url, (counts.get(url) ?? 0) + 1);
  }
  return counts;
}

/** The other F1-STRUX families, the custom route and the range overview. */
export default function RelatedProfiles({ current }: { current: string }) {
  const counts = sizeCounts();
  return (
    <>
      <ul className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 lg:grid-cols-4">
        {standardProfiles
          .filter((link) => link.href !== current)
          .map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="flex h-full items-center gap-[12px] rounded-card border border-border-default bg-white p-[14px] transition-colors hover:border-teal-border">
                <SectionGlyph shape={link.glyph} size={40} />
                <span>
                  <span className="block text-f14 font-bold text-t1">{link.label}</span>
                  <span className="block text-f12 text-t3">{counts.get(link.href) ?? 0} catalog sizes</span>
                </span>
              </Link>
            </li>
          ))}
        <li>
          <Link href="/products/custom-pultruded-profiles" className="flex h-full items-center gap-[12px] rounded-card border border-border-default bg-white p-[14px] transition-colors hover:border-teal-border">
            <SectionGlyph shape="custom" size={40} />
            <span>
              <span className="block text-f14 font-bold text-t1">Custom profiles</span>
              <span className="mt-[2px] block">
                <LineTag line="F1-FORM" />
              </span>
            </span>
          </Link>
        </li>
      </ul>
      <p className="mt-[16px] text-f14 font-semibold text-teal-text">
        <Link href="/products/fiberglass-structural-shapes" className="underline underline-offset-4 hover:text-teal">
          Compare all standard profiles
        </Link>
      </p>
    </>
  );
}
