import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pagePath = "/resources/how-to-choose-frp-pultrusion-supplier";

export const metadata: Metadata = buildPageMetadata({
  title: "How to Choose an FRP Pultrusion Supplier (Buyer Guide)",
  description:
    "How to choose and vet a pultruded FRP profile supplier or Chinese FRP manufacturer: standards, QA, test data, export record, and an RFQ checklist.",
  path: pagePath,
});

const checklist: Array<{ title: string; body: string }> = [
  {
    title: "Manufacturer, not trader",
    body: "Confirm the supplier owns and operates its own pultrusion lines — ask for line photos, a video walk-through, or a factory-audit slot. Traders relabel third-party stock and cannot control quality, tolerances, or lead time. An in-house manufacturer can show its dies, resin bath, and QC lab.",
  },
  {
    title: "Standards & certification",
    body: "Require EN 13706 (pultruded profiles, structural grades E17/E23) and/or ASTM D3917 (dimensional tolerance), plus ISO 9001:2015 quality management. For fire, marine, or rail, ask for BS 476 / ASTM E84 / EN 45545-2 / DNV as relevant. Certificates should name the supplier, not a generic group.",
  },
  {
    title: "Real test data",
    body: "Ask for batch mill test certificates and third-party test reports for the exact profile you are buying: tensile (ASTM D638), flexural (D790), Barcol hardness (D2583), glass content by burn-off (D2584), and water absorption. A credible manufacturer issues these per production run.",
  },
  {
    title: "Process control (IPQC)",
    body: "A serious pultruder controls die temperature zones, pull speed, fiber tension, and cure, and runs first-article plus patrol inspections. Ask how they monitor and document in-process quality — not just final inspection.",
  },
  {
    title: "Export track record",
    body: "For an overseas project, confirm the supplier has shipped to your region, understands Incoterms (FOB / CIF / DDP), handles export documentation, and can advise on HS classification and tariff exposure. Ask for reference shipments to comparable markets.",
  },
  {
    title: "MOQ, lead time & tooling",
    body: "Get stock-size lead time (typically 2–4 weeks), custom-die lead time (commonly 6–10 weeks total), and minimum order quantities in writing. Clarify who owns custom tooling and the repeat-order MOQ before committing.",
  },
];

const faqItems = [
  {
    question: "How do I verify that a Chinese FRP manufacturer is genuine and not a trader?",
    answer:
      "Ask to see the pultrusion lines directly. Request dated photos of the lines, a live video walkthrough, the dies for your profile, and the quality-control lab, or book a third-party factory audit through a firm such as SGS, Bureau Veritas, or TÜV. A manufacturer can show production and issue batch-specific mill test certificates in its own name; a trading company cannot. Cross-check the business license, ISO 9001 certificate, and export records against the company named in your contract.",
  },
  {
    question: "What certifications should a pultruded FRP profile supplier have?",
    answer:
      "At minimum EN 13706 (pultruded profiles, grades E17/E23) and/or ASTM D3917 (dimensional tolerance), under an ISO 9001:2015 quality system. Application-specific certifications may be required: BS 476 / ASTM E84 for fire, EN 45545-2 for rail, AS 4586 slip resistance for gratings, PHI / NFRC for fenestration, and DNV / Lloyd's for marine. Certificates should name the manufacturing entity, and be backed by batch test reports.",
  },
  {
    question: "What documents should I request before placing an FRP profile order?",
    answer:
      "Request: a quotation tied to a drawing or spec, the relevant EN 13706 / ASTM D3917 compliance statement, batch mill test certificates, third-party test reports, ISO 9001 and product certificates, a pre-shipment inspection plan, packing and Incoterms (FOB / CIF / DDP), and — for imports — HS code and any tariff or trade-remedy exposure. Free fabrication and installation guidance is a sign of a manufacturer that supports the spec.",
  },
  {
    question: "Is it cheaper to source pultruded FRP profiles from China?",
    answer:
      "Sourcing direct from a Chinese manufacturer can lower landed cost when the supplier ships factory-direct (no regional distributor markup) on FOB or DDP terms, provided the profiles meet the same EN 13706 / ASTM D3917 specification. The savings only hold if you verify standards-equivalence and quality up front — a low price against an unverified or trader-supplied product is a false economy. Compare on specification, not just unit price.",
  },
];

export default function ChooseSupplierGuidePage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to choose and vet an FRP pultrusion supplier",
    description:
      "A buyer's checklist for selecting a pultruded FRP profile supplier or Chinese FRP manufacturer — verifying manufacturing, standards, test data, process control, export capability, and commercial terms.",
    url: absoluteUrl(pagePath),
    step: checklist.map((item, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: item.title,
      text: item.body,
    })),
  };

  return (
    <>
      <JsonLd data={howToSchema} />
      <PageHeader
        tag="Buyer Guide"
        title="How to choose an FRP pultrusion supplier"
        description="A practical checklist for engineers and procurement teams evaluating a pultruded FRP profile supplier — or vetting a Chinese FRP manufacturer — before requesting a quote. Verify on specification, not just unit price."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Choosing an FRP supplier" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Why it matters</SectionTag>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Vet the manufacturer before you vet the price
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Pultruded FRP is a specified structural material — its performance
            depends on fiber architecture, resin system, and cure, none of which
            are visible in a finished profile. The cheapest quote against an
            unverified or trader-supplied product is the most expensive mistake
            in the project. The checklist below is what separates a real
            manufacturer from a relabeler, and a defensible specification from a
            risk. It applies to any supplier; it matters most when{" "}
            <Link href="/technology/china-alternative-to-strongwell-fiberline-exel" className="font-semibold text-teal-text hover:text-teal">
              sourcing a China alternative
            </Link>{" "}
            to a Western brand.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The checklist</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Six things to verify before you order
          </h2>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {checklist.map((item, i) => (
              <article
                key={item.title}
                className="rounded-[8px] border border-border-default bg-white p-[29px]"
              >
                <span className="text-f13 font-bold text-teal-text">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-[8px] text-f19 font-bold text-t1">{item.title}</h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[21px] text-f19 font-bold text-t1">Verify F1 Composite against this list</h2>
          <div className="flex flex-wrap gap-[13px]">
            <LinkArrow href="/technology/quality-testing">Quality testing (EN 13706 / ASTM)</LinkArrow>
            <LinkArrow href="/resources/technical-data">Test reports &amp; data sheets</LinkArrow>
            <LinkArrow href="/products/standard-profiles">F1-STRUX structural profiles</LinkArrow>
            <LinkArrow href="/technology/china-alternative-to-strongwell-fiberline-exel">China alternative to Strongwell / Exel</LinkArrow>
            <LinkArrow href="/about">About F1 Composite</LinkArrow>
            <LinkArrow href="/contact">Request a quote &amp; documents</LinkArrow>
          </div>
        </div>
      </section>

      <AnswerBlocks
        tag="Supplier-selection FAQ"
        title="Choosing an FRP pultrusion supplier — frequently asked questions"
        description="What engineers and procurement teams should verify before ordering pultruded FRP profiles from any manufacturer, in China or elsewhere."
        items={faqItems}
      />

      <InnerCTA title="Ready to vet a real manufacturer? Send your spec and document checklist." />
    </>
  );
}
