import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
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
      "Each guide carries a revision date. We re-issue a guide when a standard it relies on is revised, and the revision date changes with it. Ask for the current revision when you request a guide.",
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
  status: "On request" | "In preparation";
  file?: string;
}> = [
  {
    title: "FRP profile selection guide",
    description:
      "Step-by-step methodology for selecting the right pultruded FRP profile for structural applications, including load analysis, deflection criteria, and safety factors.",
    status: "On request",
  },
  {
    title: "Connection design for FRP structures",
    description:
      "Detailed guidance on bolted, bonded, and hybrid connections for pultruded FRP profiles, with worked examples and capacity tables per EN 13706.",
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
    hasPart: guides.map((guide) => ({
      "@type": "TechArticle",
      headline: guide.title,
      description: guide.description,
      ...(guide.file ? { url: absoluteUrl(guide.file) } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={guideSchema} />
      <PageHeader
        tag="Design Guides"
        title="Engineering Design Resources"
        description="Practical design guidance developed by our engineering team to help you specify and detail FRP composite structures with confidence."
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
            Specifying pultruded FRP is not the same as specifying steel or aluminum. The material is highly anisotropic (longitudinal modulus can be 4–6× the transverse), so the connection detail, not the cross-section, often decides whether a structure performs. The guidance is written by F1 Composite&apos;s engineering team and reviewed against field problems our engineers have investigated. It assumes a structural engineer or fabricator who knows steel or aluminum and is approaching FRP for the first or second time.
          </p>
          <p>
            <strong className="text-t1">Connection design</strong> covers bolted, bonded and hybrid joints with minimum edge distances (3d for through-bolts, 4d for blind fasteners), bearing strength factors per fiber direction, and when to bond as well as bolt (for fatigue-loaded joints; mostly static joints do not need it). <strong className="text-t1">Load tables</strong> give allowable loads (deflection-limited at L/180, L/240 and L/360) and ultimate capacity for the standard wide-flange beams, channels, angles, square and round tubes and flat bars. <strong className="text-t1">Corrosion-zone specification language</strong> provides clauses to drop into chemical-plant specifications.
          </p>
          <p>
            <strong className="text-t1">FRP-to-steel galvanic isolation</strong> covers isolation washer types, sleeve specifications and acceptance criteria: most &ldquo;FRP corrosion&rdquo; complaints trace to a galvanic path through an unprotected steel fastener, not to the FRP. <strong className="text-t1">Fenestration engineering</strong> for AS 2047 (Australia) and PHI (Passive House) is the working document behind the Yancheng talent apartment and Qinling Station deliveries: frame composition, transverse reinforcement, thermal-break detail, glazing rebate, and air, water and wind test procedures.
          </p>
          <p>
            <strong className="text-t1">Solar mounting profile design</strong> covers wind uplift load paths, expansion joint spacing for racks over 12 m, UV-stable resin selection and AS/NZS 1170 wind loading. <strong className="text-t1">Bridge deck connection</strong> covers bonded panel-to-panel splice plates, mechanical lap splices and the moisture-management detail at the deck-to-girder interface.
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
              {guide.file ? (
                <a href={guide.file} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-[44px] items-center pt-[8px] text-f14 font-semibold text-teal-text hover:underline">
                  Download the PDF <span aria-hidden="true" className="ml-[4px]">→</span>
                </a>
              ) : guide.status === "On request" ? (
                <Link href={`/contact?source=design-guides&inquiry_type=technical&message=${encodeURIComponent(`Please send the ${guide.title}.\nProject: `)}`} className="mt-auto inline-flex min-h-[44px] items-center pt-[8px] text-f14 font-semibold text-teal-text hover:underline">
                  Request this guide <span aria-hidden="true" className="ml-[4px]">→</span>
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="standards" title="Standards and code references" tone="white" intro="The guides cite specific clauses of these documents where they apply.">
        <dl className="divide-y divide-border-default border-y border-border-default">
          {[
            ["ASCE Pre-Standard (2010)", "Load and Resistance Factor Design of Pultruded Fiber Reinforced Polymer Structures"],
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
