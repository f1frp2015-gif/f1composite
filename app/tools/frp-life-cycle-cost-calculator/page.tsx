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
import LifeCycleCostCalculator from "@/components/tools/LifeCycleCostCalculator";
import { GALVANIZING_THICKNESS, ZINC_CORROSIVITY } from "@/lib/lifeCycleCost";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools/frp-life-cycle-cost-calculator";
const pageDescription =
  "Compare the life-cycle cost of FRP with galvanized or painted steel as present values, with galvanizing life from ISO 9223 corrosion rates and your own quotes.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP vs Steel Life-Cycle Cost Calculator",
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "How is the life-cycle cost calculated?",
    answer:
      "Each cost is brought back to today with a real discount rate: a cost C in year t counts as C / (1 + r)^t. The total adds the installed cost, maintenance events, yearly inspection, replacements and the shutdown or access cost of each event, and takes off the unused life left at the end of the study, straight line. This is the present-value method of ISO 15686-5; ASTM E917 and AS/NZS 4536 do the same arithmetic.",
  },
  {
    question: "How long does hot-dip galvanizing last?",
    answer:
      "Roughly the coating thickness divided by the zinc corrosion rate. ISO 9223 gives a first-year rate for each atmospheric corrosivity category, for example 0.7 to 2.1 µm a year in C3 and 4.2 to 8.4 µm in C5, and ISO 1461 requires at least 85 µm on steel over 6 mm thick. That is 10 to 20 years in C5 and 40 years or more in C3. Zinc usually corrodes more slowly after the first year (ISO 9224), and splash zones, immersion and chemical fumes are outside these categories, so use site experience where you have it.",
  },
  {
    question: "Which discount rate should I use?",
    answer:
      "The real rate your organization uses to appraise investments, which excludes inflation. Public-sector guidance sets real rates of a few per cent, such as 3.5% in the UK Green Book. A higher rate makes later maintenance count for less and favors the option that is cheaper to install; try two or three rates to see whether the answer changes.",
  },
  {
    question: "Does FRP need maintenance?",
    answer:
      "It needs no corrosion protection, which is where the saving comes from in corrosive sites. Faces exposed to strong sunlight can weather and may need a UV-resistant coat after years of exposure, and every structure needs inspection. The example books one coat at 25 years; enter the interval and cost the supplier recommends for the resin and surface offered.",
  },
  {
    question: "When is steel the cheaper choice?",
    answer:
      "In mild, dry environments such as C2 and C3, where galvanizing outlasts the study period and nothing is spent after installation, galvanized steel usually costs less over its life as well as on day one. The case for FRP grows with the corrosivity of the site, the cost of access and shutdowns, and where weight or electrical insulation matters.",
  },
];

export default function LifeCycleCostPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP vs Steel Life-Cycle Cost Calculator",
          url: absoluteUrl(pagePath),
          description: pageDescription,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          publisher: { "@id": "https://www.f1composite.com/#organization" },
        }}
      />
      <PageHeader
        tag="Tools"
        title="FRP vs steel life-cycle cost calculator"
        description="Put your quotes for an FRP and a steel option side by side over the life of the project: installed cost, maintenance, inspection, replacement and shutdowns, as present values."
        facts={[
          { label: "Method", value: "Present value, ISO 15686-5" },
          { label: "Galvanizing life", value: "ISO 9223 · ISO 1461" },
          { label: "Costs", value: "Yours, any currency" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Life-cycle cost" }]}
      />

      <PageNav items={[{ id: "tool", label: "Calculator" }, { id: "galvanizing", label: "Galvanizing life" }, { id: "faq", label: "FAQ" }]} />

      <ToolSection label="FRP vs steel life-cycle cost calculator">
        <LifeCycleCostCalculator />
      </ToolSection>

      <PageSection
        id="galvanizing"
        title="Galvanizing life by corrosivity category"
        intro="Coating thickness divided by the ISO 9223 first-year zinc corrosion rate, for the ISO 1461 minimum coatings. The range runs from the fastest to the slowest rate in each category."
        tone="muted"
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Category</th>
                <th scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">Zinc loss (µm/year)</th>
                {GALVANIZING_THICKNESS.map((item) => (
                  <th key={item.id} scope="col" className="px-[14px] py-[8px] text-right font-semibold text-t1">{item.microns} µm coating</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ZINC_CORROSIVITY.map((category) => (
                <tr key={category.id} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{category.label}</th>
                  <td className="px-[14px] py-[10px] text-right tabular-nums text-t2">{category.minRate}–{category.maxRate}</td>
                  {GALVANIZING_THICKNESS.map((item) => {
                    const long = item.microns / category.minRate;
                    return (
                      <td key={item.id} className="px-[14px] py-[10px] text-right tabular-nums text-t2">
                        {Math.round(item.microns / category.maxRate)}–{long > 100 ? "100+" : Math.round(long)} years
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[820px] text-f14 leading-golden text-t2">
          ISO 1461 minimums: 85 µm on steel over 6 mm, 70 µm over 3 up to 6 mm, 55 µm from 1.5 to 3 mm. Actual coatings are often
          thicker, which lengthens the life in proportion. For the FRP side, see the{" "}
          <Link href="/technology/frp-vs-steel-gratings" className="font-semibold text-teal-text hover:underline">FRP vs steel grating comparison</Link>{" "}
          and the{" "}
          <Link href="/resources/blog/frp-grating-vs-steel-grating-cost-comparison" className="font-semibold text-teal-text hover:underline">worked grating cost example</Link>.
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
            { href: "/fiberglass-pultruded-profile-price", label: "Profile price estimator" },
            { href: "/tools/frp-cut-list-optimizer", label: "Cut list optimizer" },
          ] },
          { title: "Where FRP replaces steel", links: [
            { href: "/products/grating", label: "Fiberglass grating" },
            { href: "/products/frp-handrail-systems", label: "FRP handrail systems" },
            { href: "/applications/frp-cable-tray-supports", label: "FRP cable tray supports" },
          ] },
          { title: "Comparisons", links: [
            { href: "/technology/frp-vs-traditional-materials", label: "FRP vs traditional materials" },
            { href: "/technology/frp-vs-steel-gratings", label: "FRP vs steel gratings" },
            { href: "/technology/fiberglass-rebar-vs-steel", label: "Fiberglass rebar vs steel" },
          ] },
        ]}
      />
      <InnerCTA
        title="Replace the example with a real FRP quote"
        quoteHref="/contact?source=tool-life-cycle-cost&inquiry_type=rfq"
        text="Send the steel scope you are pricing; we quote the FRP equivalent so both columns hold real numbers."
      />
    </>
  );
}
