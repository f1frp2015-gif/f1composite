import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const faqs = [
  {
    question: "Are these design guides free?",
    answer:
      "Yes. The design guides on this site are free to use. CAD details and editable specification clauses are released to specifiers working on a project that may use F1 Composite material; request them from inquiry@f1composite.com with the project name.",
  },
  {
    question: "Can your engineers stamp drawings?",
    answer:
      "We do not stamp drawings, but our team supports your engineer of record with material data, calculation methodology, and review of FRP-specific details. Where a local PE or CEng stamp is required, the stamping engineer is appointed locally, and we supply what they need to check the FRP elements.",
  },
  {
    question: "How do you keep these guides current with code updates?",
    answer:
      "Check the date, revision and cited standard editions on the document you use. Ask us to confirm the current reference and its applicability to your project; a published guide does not automatically incorporate later code changes.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Design Guides, Load Tables & Connection Details",
  description:
    "Engineering design guidance for FRP structural applications. Connection details, load tables, and best practices from F1 Composite.",
  path: "/resources/design-guides",
  image: "/resources/design-guides/opengraph-image",
});

const guides: Array<{
  title: string;
  description: string;
  status: "Available" | "On request" | "In preparation";
  file?: string;
  href?: string;
}> = [
  {
    title: "FRP profile machining: cutting, drilling, slots and notches",
    description:
      "Illustrated HTML guide to specifying finished features, datums, tolerances, support and edge treatment. Build a drawing review brief and agree first-article and inspection requirements before ordering machined profiles.",
    status: "Available",
    href: "/technology/frp-profile-machining",
  },
  {
    title: "FRP profile design manual (DOC-PF-2026-EN Rev. B)",
    description:
      "Reference compiled from the website's data: material references, resin systems, the calculator's screening basis, catalog section properties, uniform-load examples, applications, fabrication and inspection. Read the assumptions and evidence scope alongside every table; a catalog reference is not a report for each listed configuration. Supersedes the withdrawn Rev. A.",
    status: "Available",
    file: "/downloads/f1composite-frp-profile-design-manual-2026-rev-b.pdf",
  },
  {
    title: "FRP profile selection guide",
    description:
      "Step-by-step methodology for selecting the right pultruded FRP profile for structural applications, including load analysis, deflection criteria, and safety factors.",
    status: "On request",
  },
  {
    title: "Connection design for FRP structures",
    description:
      "Request the available details for your bolted, bonded or hybrid joint. Supply load direction, member geometry, fasteners, edge distances and service conditions so the relevant calculation or test evidence can be identified.",
    status: "On request",
  },
  {
    title: "Fire performance of FRP composites",
    description:
      "Overview of fire reaction and fire resistance properties of pultruded FRP profiles, including fire-retardant resin options and intumescent coating systems.",
    status: "In preparation",
  },
  {
    title: "Fenestration system installation manual",
    description:
      "Complete installation guide for F1 Composite 70/80/90-series FRP window and door frame systems, including anchoring details and weathersealing.",
    status: "In preparation",
  },
];

export default function DesignGuidesPage() {
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Design Guides",
    url: absoluteUrl("/resources/design-guides"),
    hasPart: guides.flatMap((guide) => {
      const href = guide.href ?? guide.file;
      return guide.status === "Available" && href ? [{
        "@type": "TechArticle",
        headline: guide.title,
        description: guide.description,
        url: absoluteUrl(href),
      }] : [];
    }),
  };

  return (
    <>
      <JsonLd data={guideSchema} />
      <PageHeader
        tag="Design Guides"
        title="Engineering design resources"
        description="Start with the task: select a section, define machining details, check a load table or agree the evidence needed for an order. Each resource has its own assumptions and product scope."
        actions={{ primary: { label: "Read the machining guide", href: "/technology/frp-profile-machining" }, secondary: { label: "Browse design resources", href: "#guides", variant: "secondary" } }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Design Guides" },
        ]}
      />

      <PageNav items={[{ id: "overview", label: "Overview" }, { id: "guides", label: "Guides" }, { id: "standards", label: "Standards" }, { id: "faq", label: "FAQ" }]} />

      <PageSection id="overview" title="Engineering guidance for pultruded FRP specification" tone="white">
        <div className="max-w-[860px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>
            Pultruded FRP properties depend on reinforcement direction, resin and section geometry. Select a resource for the decision you need to make, then confirm the material, load case and configuration it covers. The project engineer sets the design and acceptance requirements.
          </p>
          <p>
            <strong className="text-t1">Define a machined part.</strong> Use the <Link href="/technology/frp-profile-machining" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">cutting, drilling and machining guide</Link> for cut lengths, holes, slots, notches, datums and edge treatment. Send a drawing revision and identify the dimensions that control fit.
          </p>
          <p>
            <strong className="text-t1">Review a section or connection.</strong> Start with the <Link href="/frp-profile-calculator" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">profile calculator</Link> for its stated preliminary checks. Hole spacing, edge distance, bearing, fasteners and any adhesive contribution need a connection-specific review. A section calculation does not verify a joint, and generic glass-fiber and carbon-fiber composites do not have interchangeable electrical behavior.
          </p>
          <p>
            <strong className="text-t1">Check product evidence.</strong> Match test reports to the offered material and assembly in the <Link href="/resources/evidence" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">evidence library</Link>. Use the <Link href="/technology/quality-testing#machining-records" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">blank inspection checklist</Link> to agree first-article and production records. For grating, read the <Link href="/resources/blog/how-to-read-frp-grating-load-table" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">load-table guide</Link> before applying a span or load value.
          </p>
        </div>
      </PageSection>

      <PageSection id="guides" title="Design guides" count={`${guides.length} guides`} tone="muted">
        <ul className="grid gap-[12px] md:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.title} className="flex flex-col rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{guide.status}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{guide.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{guide.description}</p>
              {guide.href ? (
                <Link href={guide.href} className="mt-auto inline-flex min-h-[44px] items-center pt-[8px] text-f14 font-semibold text-teal-text hover:underline">
                  Read the illustrated guide <span aria-hidden="true" className="ml-[4px]">→</span>
                </Link>
              ) : guide.file ? (
                <a href={guide.file} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-[44px] items-center pt-[8px] text-f14 font-semibold text-teal-text hover:underline">
                  Download the PDF <span aria-hidden="true" className="ml-[4px]">→</span>
                </a>
              ) : guide.status === "On request" ? (
                <Link href={buildRfqHref({ source: "design-guides", message: `Please confirm the available ${guide.title}.\nProject: \nDrawing / revision: \nRequired standard and edition: ` })} className="mt-auto inline-flex min-h-[44px] items-center pt-[8px] text-f14 font-semibold text-teal-text hover:underline">
                  Request this guide <span aria-hidden="true" className="ml-[4px]">→</span>
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="standards" title="Standards and code references" tone="white" intro="Confirm the edition and scope applicable to your project. A material specification, a design document and a test method answer different questions; citing one does not certify a product or assembly.">
        <dl className="divide-y divide-border-default border-y border-border-default">
          {[
            ["ASCE/SEI 74-23", "Load and Resistance Factor Design of Pultruded Fiber Reinforced Polymer Structures (builds on the 2010 ASCE Pre-Standard)"],
            ["CEN/TS 19101:2022", "Design of fibre-polymer composite structures (European technical specification)"],
            ["EN 13706, parts 1–3", "Reinforced plastics composites: specifications for pultruded profiles"],
            ["ASTM D2344, D790, D695, D2583, D5379", "Material property test methods"],
            ["AS 2047", "Windows and external glazed doors in buildings (Australia)"],
            ["PHI component 2491wi03", "Passive House component reference: phB efficiency class, cool-temperate configuration"],
            ["ASTM E84", "Surface burning characteristics"],
          ].map(([code, scope]) => (
            <div key={code} className="grid gap-[4px] py-[14px] md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-[32px]">
              <dt className="text-f16 font-bold text-t1">{code}</dt>
              <dd className="text-f16 leading-golden text-t2">{scope}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={faqs} />
      </PageSection>

      <InnerCTA title="Need custom engineering support?" />
    </>
  );
}
