import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import RelatedLinks from "@/components/sections/RelatedLinks";
import GfrpRebarCalculator from "@/components/tools/GfrpRebarCalculator";
import { BAR_SIZES, BAR_SYSTEMS, GFRP_STANDARDS_BY_MARKET, matchGfrpSize, type BarSystem } from "@/lib/gfrpRebar";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools/gfrp-rebar-calculator";
const pageDescription =
  "Match steel bar sizes to GFRP rebar, work out ACI CODE-440.11-22 design strength and the sustained-stress limit, and see the GFRP standards for each market.";

export const metadata: Metadata = buildPageMetadata({
  title: "GFRP Rebar Calculator | Sizes & ACI 440.11 Values",
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Can I replace a steel bar with the same size of GFRP bar?",
    answer:
      "Not as a design decision. The size match helps you read a drawing and prepare an inquiry, but GFRP has roughly a quarter of the stiffness of steel, no yield plateau and its own bond, development and bend rules. The engineer of record redesigns the reinforcement to ACI CODE-440.11-22, CSA S806 or the code adopted for the project.",
  },
  {
    question: "How does ACI CODE-440.11-22 reduce the bar strength?",
    answer:
      "The design tensile strength is the guaranteed tensile strength multiplied by the environmental factor C_E = 0.85. Under sustained load the bar stress is limited to 0.30 of that design strength to guard against creep rupture. The tool applies both to the certificate values you enter.",
  },
  {
    question: "Which edition of ASTM D7957 applies?",
    answer:
      "The one named in the project specification. ACI CODE-440.11-22 was written around ASTM D7957/D7957M-22, while ASTM has since published later editions. Qualification reports should state the edition they were run against.",
  },
  {
    question: "Which standards apply outside the United States?",
    answer:
      "Canada uses CSA S807 for the bars and CSA S806 or CSA S6 for design. Australia has AS 5204:2023 for FRP bars, and state road authorities such as Queensland TMR publish their own specifications. In Europe, bars are CE marked through a European Technical Assessment, and EN 1992-1-1:2023 has an informative annex on FRP reinforcement. The table on this page lists them by market.",
  },
];

const SYSTEM_ORDER: BarSystem[] = ["astm", "en", "asnzs", "csa"];

export default function GfrpRebarCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "GFRP Rebar Size and Design Value Calculator",
          url: absoluteUrl(pagePath),
          description: pageDescription,
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          publisher: { "@id": "https://www.f1composite.com/#organization" },
        }}
      />
      <PageHeader
        tag="Tools"
        title="GFRP rebar calculator"
        description="Read a steel bar size from any drawing standard and find the closest GFRP bar, work out the ACI CODE-440.11-22 design values from the bar's certificate, and estimate the shipping weight."
        facts={[
          { label: "Bar systems", value: "ASTM · EN · AS/NZS · CSA" },
          { label: "GFRP sizes", value: "Ø6–Ø36 mm" },
          { label: "Design basis", value: "ACI CODE-440.11-22" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "GFRP rebar calculator" }]}
      />

      <PageNav items={[{ id: "tool", label: "Calculator" }, { id: "standards", label: "Standards" }, { id: "bar-sizes", label: "Bar sizes" }, { id: "faq", label: "FAQ" }]} />

      <ToolSection label="GFRP rebar calculator">
        <GfrpRebarCalculator />
      </ToolSection>

      <PageSection id="standards" title="GFRP reinforcement standards by market" tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[820px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Market</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Design</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Bars</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Notes</th>
              </tr>
            </thead>
            <tbody>
              {GFRP_STANDARDS_BY_MARKET.map((row) => (
                <tr key={row.market} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.market}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.design}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.product}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t3">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        id="bar-sizes"
        title="Bar size cross-reference"
        intro="Nominal diameters and areas of the steel bar series, with the closest GFRP diameter on the F1 inquiry list. ASTM D7957 GFRP bars use the ASTM A615 designations."
        tone="white"
      >
        <div className="grid gap-[16px] md:grid-cols-2">
          {SYSTEM_ORDER.map((system) => (
            <div key={system} className="relative overflow-x-auto rounded-card border border-border-default bg-white">
              <table className="w-full border-collapse text-left text-f14">
                <caption className="border-b border-border-default px-[14px] py-[10px] text-left text-f16 font-bold text-t1">{BAR_SYSTEMS[system]}</caption>
                <thead>
                  <tr className="border-b border-border-default bg-bg2">
                    <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Size</th>
                    <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">Ø mm</th>
                    <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">Area mm²</th>
                    <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">GFRP Ø</th>
                  </tr>
                </thead>
                <tbody>
                  {BAR_SIZES.filter((size) => size.system === system).map((size) => (
                    <tr key={size.designation} className="border-b border-border-default last:border-b-0">
                      <th scope="row" className="px-[14px] py-[8px] font-semibold text-t1">{size.designation}</th>
                      <td className="px-[14px] py-[8px] text-right tabular-nums text-t2">{size.diameterMm}</td>
                      <td className="px-[14px] py-[8px] text-right tabular-nums text-t2">{size.areaMm2}</td>
                      <td className="px-[14px] py-[8px] text-right tabular-nums text-t2">{matchGfrpSize(size.diameterMm)?.f1DiameterMm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <p className="mt-[16px] max-w-[860px] text-f14 leading-golden text-t2">
          Specification practice is covered in the{" "}
          <Link href="/resources/blog/gfrp-rebar-specification-guide-aci-440-astm-d7957" className="font-semibold text-teal-text hover:underline">GFRP rebar specification guide</Link>, and the bar forms and schedule builder are on the{" "}
          <Link href="/products/frp-rebar" className="font-semibold text-teal-text hover:underline">FRP rebar page</Link>.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "GFRP reinforcement", links: [
            { href: "/products/frp-rebar", label: "FRP rebar: bars, stirrups and mesh" },
            { href: "/technology/fiberglass-rebar-vs-steel", label: "Fiberglass rebar vs steel" },
            { href: "/resources/blog/gfrp-bent-bars-stirrups-mesh-ordering-guide", label: "GFRP stirrups and bent bars" },
          ] },
          { title: "Other tools", links: [
            { href: "/tools/thermal-expansion-calculator", label: "Thermal expansion calculator" },
            { href: "/frp-density-calculator", label: "Density and weight calculator" },
            { href: "/tools", label: "All engineering tools" },
          ] },
          { title: "Guides", links: [
            { href: "/resources/blog/gfrp-rebar-specification-guide-aci-440-astm-d7957", label: "GFRP rebar specification guide" },
            { href: "/resources/blog/how-to-install-gfrp-rebar", label: "How to install GFRP rebar" },
            { href: "/industries/infrastructure", label: "FRP for infrastructure" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the bar schedule with your RFQ"
        quoteHref="/contact?source=tool-gfrp-rebar&inquiry_type=rfq"
        text="Send the bar schedule or drawings, diameters, bends and quantities, and the design code for the project."
      />
    </>
  );
}
