import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pagePath = "/technology/china-alternative-to-strongwell-fiberline-exel";

export const metadata: Metadata = buildPageMetadata({
  title: "China Alternative to Strongwell, Fiberline & Exel FRP",
  description:
    "F1-STRUX pultruded FRP profiles: a China alternative to Strongwell EXTREN, Fiberline, Creative Pultrusions and Exel — same EN 13706 / ASTM D3917 specs.",
  path: pagePath,
});

const comparisonRows: Array<{ dimension: string; f1: string; incumbents: string }> = [
  {
    dimension: "Product standards",
    f1: "EN 13706 E17/E23, ASTM D3917, ISO 9001:2015",
    incumbents: "EN 13706 / ASTM D3917 (same international specs)",
  },
  {
    dimension: "Structural range",
    f1: "Full range — I-beam, channel, angle, square/round tube, flat bar, rod, plus gratings, fenestration & custom",
    incumbents: "Full range (Strongwell, Creative, Fiberline); Exel focuses on fewer segments",
  },
  {
    dimension: "Sourcing model",
    f1: "Direct from the manufacturing factory — no regional distributor layer",
    incumbents: "Established Western brands sold largely through regional distributors / stocking partners",
  },
  {
    dimension: "Pricing basis",
    f1: "Factory-direct export pricing, no regional distributor markup",
    incumbents: "Regional list / distributor pricing",
  },
  {
    dimension: "Custom die / tooling lead time",
    f1: "3–6 weeks die fabrication; 6–10 weeks total first production",
    incumbents: "Varies by region and tooling queue",
  },
  {
    dimension: "Export terms",
    f1: "FOB or DDP to 30+ countries, export documentation handled in-house",
    incumbents: "Domestic-market focus; export via distributors where available",
  },
];

const faqItems = [
  {
    question: "Is there a China-based alternative to Strongwell EXTREN® pultruded profiles?",
    answer:
      "Yes. F1 Composite's F1-STRUX pultruded structural profiles are a direct, standards-equivalent China alternative to Strongwell EXTREN®. Both are produced to EN 13706 (E17/E23 grades) and ASTM D3917; F1-STRUX adds factory-direct export pricing without a regional distributor layer, and the full structural range — I-beams, channels, angles, square and round tubes, flat bars, and rods.",
  },
  {
    question: "How does F1 Composite compare with Creative Pultrusions, Fiberline, and Exel?",
    answer:
      "F1 Composite manufactures to the same EN 13706 / ASTM D3917 specifications as Creative Pultrusions (USA), Fiberline Composites (Denmark), and Exel Composites (Finland) under ISO 9001:2015 quality management. Like Strongwell, Creative, and Fiberline, F1 supplies the full structural range plus gratings, fenestration, and custom pultrusions. The difference is the route to market: F1 ships factory-direct for export on FOB or DDP terms rather than through regional distribution.",
  },
  {
    question: "Are Chinese pultruded FRP profiles made to the same standards as Western brands?",
    answer:
      "F1 Composite's profiles are tested and certified to the same international standards as the Western incumbents — EN 13706 for pultruded profiles (structural grades E17 and E23), ASTM D3917 for dimensional tolerance (±0.25 mm), and mechanical testing to ASTM D638 / D790 / D695, all under ISO 9001:2015. Mill test certificates are issued per production batch and third-party test reports are available on request, so specifying engineers can verify equivalence before purchase.",
  },
  {
    question: "Why source pultruded FRP profiles from China instead of a Western manufacturer?",
    answer:
      "The case for a China alternative is standards-parity at a factory-direct price: identical EN 13706 / ASTM D3917 compliance, the full structural and custom range from one supplier, custom-die tooling in 3–6 weeks, and export to 30+ countries on FOB or DDP terms — without regional distributor markups. For corrosion-critical or weight-critical projects, this lowers landed cost while keeping the same engineering specification.",
  },
];

export default function ChinaAlternativePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Technology", item: absoluteUrl("/technology") },
      {
        "@type": "ListItem",
        position: 3,
        name: "China Alternative to Strongwell, Fiberline & Exel",
        item: absoluteUrl(pagePath),
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PageHeader
        tag="Comparison · F1-STRUX"
        title="China alternative to Strongwell, Fiberline, Creative Pultrusions & Exel"
        description="F1 Composite's F1-STRUX line is a standards-equivalent, factory-direct China alternative to the established Western pultruded FRP brands — the same EN 13706 and ASTM D3917 specification, supplied direct for export without regional distributor markups."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "China Alternative to Western FRP Brands" },
        ]}
      />

      {/* Positioning intro */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The positioning</SectionTag>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Same specification, factory-direct from China
          </h2>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            Strongwell (EXTREN®, USA), Creative Pultrusions (USA), Fiberline
            Composites (Denmark), and Exel Composites (Finland) are the
            established Western names in pultruded FRP. They are excellent
            manufacturers — and they all build to the same international
            standards that{" "}
            <Link href="/pultruded-frp-profiles" className="font-semibold text-teal-text hover:text-teal">
              F1 Composite&apos;s pultruded FRP profiles
            </Link>{" "}
            are built to: <strong className="text-t1">EN 13706</strong> (E17/E23
            structural grades) and <strong className="text-t1">ASTM D3917</strong>,
            under ISO 9001:2015.
          </p>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            The reason buyers look for a China alternative is rarely the
            specification — it is the route to market. F1 Composite supplies its{" "}
            <Link href="/products/standard-profiles" className="font-semibold text-teal-text hover:text-teal">
              F1-STRUX structural profiles
            </Link>{" "}
            direct from the factory for export, on FOB or DDP terms to 30+
            countries, without the regional distributor layer that sits between
            the Western brands and an international project. For corrosion- or
            weight-critical work, that lowers landed cost while keeping the exact
            engineering specification a designer has already approved.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Side by side</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            F1-STRUX vs the Western incumbents
          </h2>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            A fair, specification-level comparison. Where a competitor figure
            varies by region or distributor, it is described rather than
            asserted.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Dimension</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-teal-text">F1 Composite (F1-STRUX)</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Strongwell · Creative · Fiberline · Exel</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.dimension} className="border-b border-border-default align-top">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{row.dimension}</td>
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-teal-text">{row.f1}</td>
                    <td className="py-[13px] text-f15 text-t2">{row.incumbents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-[21px] max-w-[900px] text-f13 text-t3">
            For the full material-level comparison (FRP vs steel and aluminum),
            see{" "}
            <Link href="/technology/frp-vs-traditional-materials" className="font-semibold text-teal-text hover:text-teal">
              FRP vs traditional materials
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[21px] text-f19 font-bold text-t1">Verify the equivalence</h2>
          <div className="flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/standard-profiles">F1-STRUX structural profiles</LinkArrow>
            <LinkArrow href="/pultruded-frp-profiles">Pultruded FRP profiles hub</LinkArrow>
            <LinkArrow href="/technology/quality-testing">Quality testing (EN 13706 / ASTM)</LinkArrow>
            <LinkArrow href="/technology/frp-vs-traditional-materials">FRP vs steel &amp; aluminum</LinkArrow>
            <LinkArrow href="/regions/frp-pultrusion-supplier-usa">FRP supplier for US projects</LinkArrow>
            <LinkArrow href="/resources/technical-data">Technical data &amp; test reports</LinkArrow>
          </div>
        </div>
      </section>

      <AnswerBlocks
        tag="China alternative FAQ"
        title="China alternative to Strongwell, Fiberline, Creative Pultrusions & Exel — FAQ"
        description="Specification-level answers for engineers and procurement teams evaluating a China-based pultruded FRP supplier against the Western incumbents."
        items={faqItems}
      />

      <InnerCTA title="Comparing suppliers? Send your spec for a like-for-like quote." />
    </>
  );
}
