import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import InnerCTA from "@/components/sections/InnerCTA";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { applicationPages } from "@/lib/applicationPages";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Applications - Pultruded Fiberglass Profiles by Use Case",
  description:
    "Application guides for pultruded FRP profiles: cable tray supports, cooling towers, bridge decks, solar mounting and chemical plant platforms.",
  path: "/applications",
});

const faqs = [
  {
    question: "My application is not listed here — do you still serve it?",
    answer:
      "Yes. The five categories above account for ~70% of F1 Composite shipments by volume; the remaining 30% spans industrial enclosures, antenna supports, water-treatment screens, military and rail applications, and more. Custom inquiries: sales@f1composite.com.",
  },
  {
    question: "Are the connection details in each application page free to use?",
    answer:
      "Yes — the typical connection drawings on each application page are free for use in specifications. CAD files (DWG/STEP) are available in Downloads.",
  },
  {
    question: "Do you offer fabrication, or only profile supply?",
    answer:
      "Both. For the application categories above, we typically supply pre-fabricated assemblies (cut-to-length, drilled, fastener kits, panels) ready for site installation. Bare profile supply is also available for fabricators who prefer to fabricate locally.",
  },
  {
    question: "How do you certify resin selection for chemical exposure?",
    answer:
      "We test against the customer's chemical exposure spec (concentration, temperature, exposure cycle) using ASTM C581 immersion testing or equivalent, with a 6-month or 12-month exposure period before issuing a written compatibility statement. For standard chemicals, our pre-tested Chemical Resistance Chart is referenced.",
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.f1composite.com/applications#collection",
  url: "https://www.f1composite.com/applications",
  name: "FRP Applications by Structure and Environment",
  description:
    "Application guides for pultruded FRP profiles: cable tray supports, cooling towers, bridge decks, solar mounting, and chemical plant platforms.",
  isPartOf: { "@id": "https://www.f1composite.com/#website" },
  publisher: { "@id": "https://www.f1composite.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.f1composite.com/" },
      { "@type": "ListItem", position: 2, name: "Applications", item: "https://www.f1composite.com/applications" },
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    name: "FRP Application Guides",
    numberOfItems: applicationPages.length,
    itemListElement: applicationPages.map((page, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.f1composite.com/applications/${page.slug}`,
      name: page.shortTitle,
    })),
  },
};

export default function ApplicationsPage() {
  return (
    <>
      <JsonLd data={collectionSchema} />
      <PageHeader
        tag="Applications"
        title="FRP applications by structure and environment"
        description="Use-case pages for engineers and buyers evaluating pultruded fiberglass profiles by application, exposure, standards, and RFQ inputs."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Applications" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[900px] px-[34px]">
          <SectionTag>Pultruded FRP Profiles Across Industrial Applications</SectionTag>
          <div className="mt-[21px] space-y-[21px] text-f17 leading-golden text-t2">
            <p>
              Pultruded fiberglass profiles are not a single product — they are a fabrication platform. The same wide-flange beam can carry a chemical plant walkway, a coastal marina decking, or a solar farm support, but the resin system, fiber architecture, surface finish, and connection strategy change between those uses. The five application categories below are F1 Composite&apos;s most-deployed configurations, each backed by reference projects and engineering data.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Application guides</SectionTag>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {applicationPages.map((page) => (
              <Link
                key={page.slug}
                href={`/applications/${page.slug}`}
                className="rounded-[8px] border border-border-default bg-white p-[24px] transition-colors hover:border-teal"
              >
                <h2 className="text-f19 font-bold text-t1">{page.shortTitle}</h2>
                <p className="mt-[8px] text-f15 leading-golden text-t2">{page.description}</p>
                <span className="mt-[13px] inline-block text-f13 font-bold text-teal-text">
                  View guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[900px] px-[34px]">
          <SectionTag>Choosing the Right Application Configuration</SectionTag>
          <div className="mt-[21px] space-y-[21px] text-f17 leading-golden text-t2">
            <p>Three questions decide most of the specification:</p>
            <ol className="list-decimal space-y-[13px] pl-[21px]">
              <li>
                <strong>What is the chemical and thermal environment?</strong> Vinyl ester resin handles 60% sodium hypochlorite and dilute sulfuric acid where isophthalic resin will degrade. Continuous service above 80°C requires verification — our standard isophthalic system is rated to 80°C, vinyl ester to 100°C, and high-temp epoxy to 150°C.
              </li>
              <li>
                <strong>What is the fire performance requirement?</strong> ASTM E84 Class 1 is achievable; Class 1 with smoke-developed index &lt;50 requires a specific resin system; full FRA (Fire Reaction Approval) per IMO requires further. We classify our standard profiles by fire class on every datasheet.
              </li>
              <li>
                <strong>What connections are involved?</strong> Are you mating to existing carbon steel (galvanic isolation needed), to other FRP (bolted or bonded), or to concrete (chemical anchor + epoxy bedding)? The application detail pages cover the typical connection sets.
              </li>
            </ol>
            <p>
              <strong>Application versus industry</strong>: <Link href="/industries" className="text-teal-text hover:underline">Industries</Link> describe <em>who buys</em> (construction, energy, marine, etc.). Applications describe <em>what gets built</em> (cable tray, cooling tower, bridge deck, etc.). One industry buys multiple applications; one application serves multiple industries. If you know your project type but not your industry classification, this is the section to start with.
            </p>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <InnerCTA title="Need an FRP recommendation for your application?" />
    </>
  );
}
