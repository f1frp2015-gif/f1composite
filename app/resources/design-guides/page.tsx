import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const faqs = [
  {
    question: "Are these design guides free?",
    answer:
      "Yes — the design guides on this site are free to use. CAD details and editable specification clauses are released to specifiers actively working on a project that may use F1 Composite material; request them from inquiry@f1composite.com with the project name.",
  },
  {
    question: "Can your engineers stamp drawings?",
    answer:
      "We do not stamp drawings, but our team supports your engineer-of-record with material data, calculation methodology, and review of FRP-specific details. For projects where local PE/CEng stamp is required, we work with partner consultancies in Australia, the US, the EU, and the GCC.",
  },
  {
    question: "How do you keep these guides current with code updates?",
    answer:
      "Each guide carries a 'Revised' date in the footer. We re-issue when an underlying standard updates (e.g. EN 13706:2024 update was incorporated within 60 days). Subscribe via the Resources newsletter to receive change notifications.",
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
  status: "Available" | "Coming Soon";
  file?: string;
}> = [
  {
    title: "FRP Profile Design Manual — 2026 Edition (E23 Grade)",
    description:
      "24-page engineering reference for F1 Composite pultruded structural profiles. Covers equal angle (50–152 mm), square box (50–101 mm), channel (100–254 mm), tube and top rail, and wide flange beam (152–305 mm), with full dimensions, section properties, E23-grade material data per EN 13706-2, point-load and UDL mid-span deflection tables across 500 mm to 6 m spans, chemical resistance data, fire performance per BS 476, MSDS, on-site handling, and maintenance. Doc no. DOC-PF-2026-EN Rev. A.",
    status: "Available",
    file: "/downloads/f1composite-frp-profile-design-manual-2026.pdf",
  },
  {
    title: "FRP Profile Selection Guide",
    description:
      "Step-by-step methodology for selecting the right pultruded FRP profile for structural applications, including load analysis, deflection criteria, and safety factors.",
    status: "Available",
  },
  {
    title: "Connection Design for FRP Structures",
    description:
      "Detailed guidance on bolted, bonded, and hybrid connections for pultruded FRP profiles, with worked examples and capacity tables per EN 13706.",
    status: "Available",
  },
  {
    title: "Fire Performance of FRP Composites",
    description:
      "Overview of fire reaction and fire resistance properties of pultruded FRP profiles, including fire-retardant resin options and intumescent coating systems.",
    status: "Coming Soon",
  },
  {
    title: "Fenestration System Installation Manual",
    description:
      "Complete installation guide for F1 Composite 70/80/90-series FRP window and door frame systems, including anchoring details and weathersealing.",
    status: "Coming Soon",
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

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Engineering Guidance for Pultruded FRP Specification</SectionTag>
          <div className="mt-[21px] space-y-[21px] text-f17 leading-golden text-t2">
            <p>
              Specifying pultruded FRP is not the same as specifying steel or aluminum. The material is highly anisotropic — longitudinal modulus can be 4-6× higher than transverse — meaning the connection detail, not the cross-section, often determines whether your structure performs. The guides below are written by F1 Composite&apos;s engineering team and reviewed against real failures from our 20-year service history. Each guide assumes the reader is a structural engineer or fabricator who has worked with steel or aluminum and is approaching FRP for the first or second time.
            </p>
            <p>
              <strong>Connection Design</strong> covers bolted, bonded, and hybrid joints with minimum edge distances (3d for through-bolt, 4d for blind fastener), bearing strength factors per fiber direction, and the long-running question of whether to bond + bolt (yes, for fatigue-loaded joints; not necessary for mostly-static joints). <strong>Load Tables</strong> publish allowable load (deflection-limited L/180, L/240, L/360) and ultimate capacity for every standard wide-flange beam, channel, angle, square tube, round tube, and flat bar. <strong>Corrosion-Zone Specification Language</strong> provides drop-in CFC and CRP clauses tested against Aramco SAES-W-018, SABIC, ADNOC, and US EPA chemical-plant specs.
            </p>
            <p>
              <strong>FRP-to-Steel Galvanic Isolation</strong> covers isolation washer types, sleeve specifications, and acceptance criteria — most &quot;FRP corrosion&quot; complaints we trace to a galvanic path through an unprotected steel fastener, not the FRP itself. <strong>Fenestration Engineering</strong> for AS 2047 (Australia) and PHI (Passive House) is the working document behind our Yancheng talent apartment and Antarctic Qinling Station deployments — frame composition, transverse reinforcement strategy, thermal break detail, glazing rebate, and air/water/wind test procedures.
            </p>
            <p>
              <strong>Solar Mounting Profile Design</strong> covers wind uplift load paths, expansion joint spacing for &gt;12 m racks, UV-stable resin selection, and AS/NZS 1170 wind compliance. <strong>Bridge Deck Connection</strong> covers panel-to-panel bonded splice plates, mechanical lap splices, and the moisture-management detail at deck-to-girder interfaces — drawn from European refurbishment project experience.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="space-y-[21px]">
            {guides.map((guide) => (
              <div
                key={guide.title}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <div className="flex items-start justify-between gap-[21px]">
                  <div>
                    <h3 className="text-f19 font-bold text-t1">{guide.title}</h3>
                    <p className="mt-[8px] text-f15 leading-golden text-t2">
                      {guide.description}
                    </p>
                  </div>
                  {guide.file ? (
                    <a
                      href={guide.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 rounded-[4px] bg-teal px-[21px] py-[8px] text-f11 font-bold uppercase tracking-[1px] text-white hover:bg-teal-text"
                    >
                      Download PDF
                    </a>
                  ) : guide.status === "Available" ? (
                    <Link
                      href="/contact"
                      className="flex-shrink-0 rounded-[4px] bg-teal px-[21px] py-[8px] text-f11 font-bold uppercase tracking-[1px] text-white hover:bg-teal-text"
                    >
                      Request Access
                    </Link>
                  ) : (
                    <span className="flex-shrink-0 rounded-[4px] bg-bg2 px-[21px] py-[8px] text-f11 font-bold uppercase tracking-[1px] text-t3">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Standards and Code References</SectionTag>
          <div className="mt-[21px] space-y-[13px] text-f17 leading-golden text-t2">
            <p>Design Guides reference the following codes (we cite specific clauses where applicable):</p>
            <ul className="list-disc space-y-[8px] pl-[21px]">
              <li><strong>ASCE Pre-Standard</strong> for Load and Resistance Factor Design of Pultruded Fiber Reinforced Polymer Structures (2010)</li>
              <li><strong>EN 13706</strong> Reinforced plastics composites — Specifications for pultruded profiles (Parts 1-3)</li>
              <li><strong>ASTM D2344, D790, D695, D2583, D5379</strong> for material property test methods</li>
              <li><strong>AS 2047</strong> Windows and external glazed doors in buildings (Australia)</li>
              <li><strong>PHI Passive House Component certification</strong> Class A+/A</li>
              <li><strong>ASTM E84</strong> Surface burning characteristics</li>
            </ul>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <InnerCTA title="Need custom engineering support?" />
    </>
  );
}
