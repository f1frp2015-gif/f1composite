import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import { applicationNavigation } from "@/content/data/applicationNavigation";
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
  "Pultruded FRP and CFRP applications in power, water treatment, rail, civil and ground works, fencing, pools and precision machines, with specification guidance.";
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
        description="Start with the component's job: carrying a load, controlling flow, providing electrical separation or supporting moving equipment. Each guide connects the application to material choices, design interfaces, standards and a project specification."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applications" }]}
      />

      <PageNav items={applicationNavigation.map((category) => ({ id: category.id, label: category.label, count: category.links.length }))} />
      {applicationNavigation.map((category, categoryIndex) => (
      <PageSection
        key={category.id}
        id={category.id}
        title={category.label}
        count={`${category.links.length} applications`}
        intro={category.description}
        tone={categoryIndex % 2 ? "muted" : "white"}
        aside={
          <Link href="/industries" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Browse by industry instead
          </Link>
        }
      >
        <ul className="grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {category.links.map((destination, index) => {
            const group = applicationGroups.find((group) => group.href === destination.href);
            if (!group) return null;
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
                    priority={categoryIndex === 0 && index < 3}
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
      ))}

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
