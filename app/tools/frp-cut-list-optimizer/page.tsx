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
import CutListOptimizer from "@/components/tools/CutListOptimizer";
import { STOCK_OPTIONS } from "@/lib/cutList";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools/frp-cut-list-optimizer";
const pageDescription =
  "Nest FRP profile cut lengths into 6 m, 12 m or container-length stock bars with saw kerf and end trim. See bars to order, waste, weight and a CSV cut list.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Cut List Optimizer | Stock Bars & Waste",
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "How does the optimizer arrange the pieces?",
    answer:
      "It runs three packing methods and keeps the plan with the fewest bars: filling each bar as full as possible from the pieces still to cut, the same with the longest piece placed first on every bar, and best-fit decreasing. It also works out a lower bound from the total length of pieces and kerfs. When the plan reaches that bound, no arrangement can use fewer bars; otherwise the page says how many bars could at most be saved.",
  },
  {
    question: "What saw kerf and end trim should I enter?",
    answer:
      "Enter the width of the blade you will cut with; carbide and diamond blades used on FRP usually remove about 2.5 to 3.5 mm. The end trim squares the ends of each bar where handling may have chipped them. Enter 0 to use the factory-cut ends as they arrive, or a few millimeters per end if the bars will be stored or moved on site first.",
  },
  {
    question: "Which stock length should I order?",
    answer:
      "F1 standard profiles come in 6 m lengths, and other lengths can be made because pultrusion is continuous. The container matters: a 20 ft container is about 5.90 m long inside, so 6 m bars need a 40 ft container, and a 40 ft container is about 12.03 m long inside, so 11.8 m is the usual long export length. The table under the result compares the same pieces on each stock length.",
  },
  {
    question: "Can the pieces be cut to length in the factory instead?",
    answer:
      "Yes, on request. Factory cutting removes site offcuts and the freight on them, and suits pieces that repeat in quantity, such as handrail posts, ladder rungs or cable tray supports. Send the cut list with the quote request and state the length tolerance the drawing needs.",
  },
  {
    question: "What should be done with the cut ends?",
    answer:
      "Cut with carbide or diamond tooling, local dust extraction and suitable PPE, then deburr and seal the cut end with a compatible resin, especially for outdoor, wet or chemical service. Offcuts are FRP waste; check the local disposal route before the job starts.",
  },
];

export default function CutListOptimizerPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Profile Cut List Optimizer",
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
        title="FRP cut list optimizer"
        description="Enter the piece lengths from your drawing and see how many stock bars of pultruded FRP profile to order, how to cut each bar, and how much ends up as offcut."
        facts={[
          { label: "Stock lengths", value: STOCK_OPTIONS.map((option) => option.label).join(" · ") },
          { label: "Units", value: "mm or inches" },
          { label: "Export", value: "CSV cut list" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Cut list optimizer" }]}
      />

      <PageNav items={[{ id: "tool", label: "Optimizer" }, { id: "stock", label: "Stock lengths" }, { id: "faq", label: "FAQ" }]} />

      <ToolSection label="Cut list optimizer">
        <CutListOptimizer />
      </ToolSection>

      <PageSection
        id="stock"
        title="Stock lengths and shipping"
        intro="The bar length decides both the offcut and the container. Inside lengths of ISO containers are about 5.90 m (20 ft) and 12.03 m (40 ft and 40 ft high cube), so bars are often cut to 5.8 m or 11.8 m for export."
        tone="muted"
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Stock length</th>
                <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">Feet</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Shipping</th>
              </tr>
            </thead>
            <tbody>
              {STOCK_OPTIONS.map((option) => (
                <tr key={option.id} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{option.label}</th>
                  <td className="px-[14px] py-[10px] text-right tabular-nums text-t2">{(option.lengthMm / 304.8).toFixed(1)} ft</td>
                  <td className="px-[14px] py-[10px] text-t2">{option.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[820px] text-f14 leading-golden text-t2">
          Check the section first with the{" "}
          <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:underline">FRP profile calculator</Link>{" "}
          or the{" "}
          <Link href="/frp-span-tables" className="font-semibold text-teal-text hover:underline">span tables</Link>, and find a size in the{" "}
          <Link href="/tools/profile-finder" className="font-semibold text-teal-text hover:underline">profile finder</Link>. Container and
          incoterm questions are covered in the{" "}
          <Link href="/resources/frp-pultrusion-fob-ddp-export-guide" className="font-semibold text-teal-text hover:underline">FOB to DDP export guide</Link>.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "Other tools", links: [
            { href: "/tools", label: "All engineering tools" },
            { href: "/tools/profile-finder", label: "Profile finder" },
            { href: "/frp-density-calculator", label: "Density and weight calculator" },
          ] },
          { title: "Profiles", links: [
            { href: "/products/fiberglass-structural-shapes", label: "Fiberglass structural shapes" },
            { href: "/products/frp-handrail-systems", label: "FRP handrail systems" },
            { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
          ] },
          { title: "Buying", links: [
            { href: "/fiberglass-pultruded-profile-price", label: "Profile price estimator" },
            { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "FOB, CIF, DAP and DDP explained" },
            { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "How to choose a pultrusion supplier" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the cut list with your RFQ"
        quoteHref="/contact?source=tool-cut-list&inquiry_type=rfq"
        text="Send the profile, the cut list and the delivery address; we quote stock bars or factory-cut pieces."
      />
    </>
  );
}
