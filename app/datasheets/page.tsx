// Datasheet index — crawlable directory of every HTML datasheet (GEO surface).

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
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

export default async function DatasheetsIndexPage() {
  const all = await getAllDatasheetPages();

  // group by category name
  const groups = new Map<string, typeof all>();
  for (const d of all) {
    const key = d.category?.name ?? "Other profiles";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(d);
  }

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
        tag="Datasheets"
        title="FRP Profile Technical Datasheets"
        description="Live engineering datasheets for every standard pultruded profile — section properties computed exactly from geometry, EN 13706 mechanical data, and PDF export."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Datasheets" },
        ]}
      />
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          {all.length === 0 ? (
            <p className="text-f15 text-t2">
              The datasheet catalog is being populated — meanwhile, see{" "}
              <Link href="/resources/downloads" className="text-teal-text hover:underline">
                the downloads center
              </Link>
              .
            </p>
          ) : (
            <div className="grid gap-[34px] md:grid-cols-2 lg:grid-cols-3">
              {[...groups.entries()].map(([name, items]) => (
                <div key={name}>
                  <SectionTag>{name}</SectionTag>
                  <ul className="mt-[13px] space-y-[4px]">
                    {items.map((d) => (
                      <li key={d.slug}>
                        <Link
                          href={`/datasheets/${d.slug}`}
                          className="flex items-baseline justify-between gap-[8px] rounded-[4px] px-[8px] py-[6px] text-f15 text-t1 hover:bg-teal-bg"
                        >
                          <span>{d.product.model}</span>
                          {d.product.weight_per_m != null && (
                            <span className="text-f12 text-t3">
                              {Number(d.product.weight_per_m)} kg/m
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <InnerCTA title="Need certified data or a custom section?" />
    </>
  );
}
