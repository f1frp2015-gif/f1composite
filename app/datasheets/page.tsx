// Customer-facing directory of every HTML datasheet. The route segment is
// intentionally noindex (see layout.tsx) because its DB pages share a template.

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionSvg from "@/components/datasheets/SectionSvg";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { getAllDatasheetPages } from "@/lib/catalog/public";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profile Datasheets — Section Properties & EN 13706 Data",
  description:
    "Technical datasheets for every F1 Composite pultruded FRP profile: exact section properties, EN 13706 mechanical data, dimensions, weights, and PDF downloads.",
  path: "/datasheets",
});

// Catalog category names are title case; the page names families in sentence case.
const FAMILY_NAMES: Record<string, string> = {
  "i-beam": "I-beams and wide flange",
  channel: "Channels",
  angle: "Angles",
  "square-tube": "Square and rectangular tubes",
  "round-tube": "Round tubes",
  rod: "Solid rods",
  "flat-bar": "Flat bars",
};

/** Published weights keep their own precision; the column aligns them on the decimal point. */
function Weight({ value }: { value: number }) {
  const [whole, fraction] = String(value).split(".");
  return (
    <span className="shrink-0 font-mono text-f12 text-t3 tabular-nums">
      <span className="inline-block min-w-[2ch] text-right">{whole}</span>
      <span className="inline-block w-[3ch]">{fraction ? `.${fraction}` : ""}</span> kg/m
    </span>
  );
}

export default async function DatasheetsIndexPage() {
  const all = await getAllDatasheetPages();

  // group by category, in catalog order
  const groups = new Map<string, typeof all>();
  for (const d of all) {
    const key = d.category?.slug ?? "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(d);
  }
  const families = [...groups.entries()].map(([slug, items]) => ({
    // Product pages link to their family's group, e.g. #i-beam.
    id: slug,
    name: FAMILY_NAMES[slug] ?? items[0].category?.name ?? "Other profiles",
    items,
    // A mid-range size draws the family's section.
    sample: items[Math.floor(items.length / 2)],
  }));

  const datasheetsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FRP Profile Technical Datasheets",
    url: absoluteUrl("/datasheets"),
    description:
      "Engineering datasheets for every F1 Composite pultruded FRP profile: exact section properties, EN 13706 mechanical data, dimensions, and weights.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: all.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${d.product.model} FRP profile datasheet`,
        url: absoluteUrl(`/datasheets/${d.slug}`),
      })),
    },
  };

  return (
    <>
      <JsonLd data={datasheetsSchema} />
      <PageHeader
        tag="Technical data"
        title="FRP profile datasheets"
        description="One datasheet for every standard pultruded profile: section properties computed from the geometry, EN 13706 mechanical data, allowable loads by span and a PDF export."
        facts={[
          { label: "Datasheets", value: String(all.length) },
          { label: "Profile families", value: String(families.length) },
          { label: "Weights", value: "Published, kg/m" },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Datasheets" },
        ]}
      />
      {families.length > 1 ? (
        <PageNav items={families.map((family) => ({ id: family.id, label: family.name, count: family.items.length }))} />
      ) : null}
      <section className="bg-bg2 py-[32px] md:py-[48px]">
        <div className="site-container">
          {all.length === 0 ? (
            <p className="text-f16 text-t2">
              The datasheet catalog is being populated. Meanwhile, see the{" "}
              <Link href="/resources/downloads" className="font-semibold text-teal-text hover:underline">
                downloads center
              </Link>
              .
            </p>
          ) : (
            // Columns rather than a grid: families of 9 to 30 sizes pack without gaps.
            <div className="gap-[20px] md:columns-2 lg:columns-3">
              {families.map((family) => (
                <section
                  key={family.id}
                  id={family.id}
                  aria-labelledby={`${family.id}-title`}
                  className="mb-[20px] scroll-mt-[136px] break-inside-avoid overflow-hidden rounded-card border border-border-default bg-white"
                >
                  <header className="flex items-center gap-[12px] border-b border-border-default px-[16px] py-[12px]">
                    {family.sample.product.geometry ? (
                      <SectionSvg geometry={family.sample.product.geometry} size={40} className="shrink-0" />
                    ) : null}
                    <div className="min-w-0">
                      <h2 id={`${family.id}-title`} className="text-f16 font-bold text-t1">{family.name}</h2>
                      <p className="font-mono text-f12 text-t3">
                        {family.items.length} {family.items.length === 1 ? "size" : "sizes"}
                      </p>
                    </div>
                  </header>
                  <ul className="divide-y divide-border-default">
                    {family.items.map((d) => (
                      <li key={d.slug}>
                        <Link
                          href={`/datasheets/${d.slug}`}
                          className="flex items-baseline justify-between gap-[12px] px-[16px] py-[8px] text-f14 text-t1 transition-colors hover:bg-teal-bg hover:text-teal-text"
                        >
                          <span>{d.product.model}</span>
                          {d.product.weight_per_m != null ? <Weight value={Number(d.product.weight_per_m)} /> : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>
      <InnerCTA
        title="Need certified data or a custom section?"
        text="Send the section, the data you need certified and the quantity."
      />
    </>
  );
}
