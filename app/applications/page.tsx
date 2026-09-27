import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import CollectionSchema from "@/components/seo/CollectionSchema";
import CoverCard from "@/components/ui/CoverCard";
import {
  applicationGroups,
  productFamilies,
} from "@/content/data/productTaxonomy";
import { coverFor } from "@/lib/covers";
import { buildPageMetadata } from "@/lib/seo";

const description =
  "Explore FRP applications in agriculture, plant support, platforms, bridges, cooling towers, cable supports and solar, with product and selection guidance.";
export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profile Applications | Components & Selection",
  description,
  path: "/applications",
});

const scope = [
  [
    "What is supplied?",
    "Identify raw profiles, cut or drilled components, grating panels, or an agreed assembly. Use of a profile in a bridge or plant does not mean complete project delivery is included.",
  ],
  [
    "What must it withstand?",
    "Provide loads, spans, connections, chemical concentrations, operating temperature, UV exposure and any fire or electrical requirements. Material performance must match the offered grade and test scope.",
  ],
  [
    "What is needed for a quote?",
    "Send drawings, lengths, quantities, installation interfaces, required documents and destination. Confirm fabrication, fasteners, assembly and packing separately.",
  ],
] as const;

export default function ApplicationsPage() {
  return (
    <>
      <CollectionSchema
        name="FRP Profile Applications"
        description={description}
        path="/applications"
        links={applicationGroups}
      />
      <PageHeader
        tag="Applications"
        title="Find FRP profiles by application"
        description="Start with the task: supporting a crop, building a platform, carrying cables or assembling a structure. Each application connects the use case to F1 products and the inputs needed for selection."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applications" }]}
      />

      <PageSection
        id="applications"
        title="One profile can serve several industries"
        count={`${applicationGroups.length} applications`}
        intro="An industry describes the customer or project sector; an application describes what the component does. A channel may support cables in a wastewater plant, a factory or a power facility. Its geometry, material, connections and exposure still need to be specified for that use."
        aside={
          <Link href="/industries" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Browse by industry instead
          </Link>
        }
      >
        <ul className="grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {applicationGroups.map((group, index) => {
            const cover = coverFor(group.href);
            const families = productFamilies.filter((family) => (group.products as readonly string[]).includes(family.id));
            return (
              <li key={group.label}>
                {cover ? (
                  <CoverCard
                    href={group.href}
                    cover={cover}
                    title={group.label}
                    text={group.description}
                    priority={index < 3}
                    footer={
                      <div className="border-t border-border-default px-[18px] py-[10px] sm:px-[20px]">
                        <ul className="flex flex-wrap gap-x-[16px] gap-y-[2px]">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} className="inline-flex min-h-[36px] items-center text-f14 font-semibold text-t2 underline decoration-border-default underline-offset-4 hover:text-teal-text">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-[4px] text-f14 text-t3">
                          <span className="font-mono text-f12 uppercase tracking-[0.06em]">Families </span>
                          {families.map((family, i) => (
                            <span key={family.id}>
                              {i ? " · " : ""}
                              <Link href={family.href} className="underline decoration-border-default underline-offset-4 hover:text-teal-text">{family.label}</Link>
                            </span>
                          ))}
                        </p>
                      </div>
                    }
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection id="scope" title="Define the supply and design scope" tone="muted">
        <div className="grid grid-cols-1 gap-[16px] md:grid-cols-3">
          {scope.map(([title, body]) => (
            <article key={title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">{title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{body}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <InnerCTA title="Discuss your application" quoteHref="/contact?source=applications&inquiry_type=rfq" />
    </>
  );
}
