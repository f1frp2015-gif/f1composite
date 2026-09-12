import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import CollectionSchema from "@/components/seo/CollectionSchema";
import {
  applicationGroups,
  productFamilies,
} from "@/content/data/productTaxonomy";
import { buildPageMetadata } from "@/lib/seo";

const description =
  "Explore FRP profile applications in platforms, bridges, cooling towers, cable supports, solar and facades, with product links and specification guidance.";
export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profile Applications | Components & Selection",
  description,
  path: "/applications",
});
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
        tag="Industries & Applications"
        title="Find FRP profiles by application"
        description="Start with the part you need to build: a support frame, a walking surface, a cable support or an architectural component. Each application connects the use case to profiles, grating and the inputs needed for selection."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applications" }]}
      />
      <section className="bg-white py-[48px]">
        <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
          <div className="max-w-[920px]">
            <h2 className="text-f24 font-bold text-t1">
              One profile can serve several industries
            </h2>
            <p className="mt-[12px] text-f15 leading-relaxed text-t2">
              An industry describes the customer or project sector; an
              application describes what the component does. A channel may
              support cables in a wastewater plant, a factory or a power
              facility. Its geometry, material, connections and exposure still
              need to be specified for that use.
            </p>
            <Link
              href="/industries"
              className="mt-[12px] inline-block text-f14 font-bold text-teal-text"
            >
              Prefer to browse by industry? →
            </Link>
          </div>
          <div className="mt-[30px] grid gap-[20px] md:grid-cols-2">
            {applicationGroups.map((group) => (
              <article
                key={group.label}
                className="rounded-[10px] border border-border-default bg-bg2 p-[24px]"
              >
                <h2 className="text-f24 font-bold text-t1">{group.label}</h2>
                <p className="mt-[10px] text-f15 leading-relaxed text-t2">
                  {group.description}
                </p>
                <ul className="mt-[18px] space-y-[10px]">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-f14 font-semibold text-teal-text hover:underline"
                      >
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-[18px] border-t border-border-default pt-[14px]">
                  <p className="text-f12 font-bold text-t3">
                    Related product families
                  </p>
                  <div className="mt-[8px] flex flex-wrap gap-[14px]">
                    {productFamilies
                      .filter((family) =>
                        (group.products as readonly string[]).includes(
                          family.id,
                        ),
                      )
                      .map((family) => (
                        <Link
                          key={family.id}
                          href={family.href}
                          className="text-f13 text-teal-text underline underline-offset-4"
                        >
                          {family.label}
                        </Link>
                      ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-bg2 py-[48px]">
        <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
          <h2 className="text-f24 font-bold text-t1">
            Define the supply and design scope
          </h2>
          <div className="mt-[20px] grid gap-[22px] md:grid-cols-3">
            {[
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
            ].map(([title, body]) => (
              <div key={title}>
                <h3 className="text-f19 font-bold text-t1">{title}</h3>
                <p className="mt-[10px] text-f15 leading-relaxed text-t2">
                  {body}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/contact?source=applications&inquiry_type=rfq"
            className="mt-[24px] inline-block text-f15 font-bold text-teal-text"
          >
            Discuss your application →
          </Link>
        </div>
      </section>
    </>
  );
}
