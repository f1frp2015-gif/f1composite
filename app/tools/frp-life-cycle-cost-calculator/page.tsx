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
import { GALVANIZING_THICKNESS, ZINC_CORROSIVITY, calculateLcc } from "@/lib/lifeCycleCost";
import { lifeCycleCostExample } from "@/content/data/lifeCycleCostExample";
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
      "Each cost is brought back to today with a real discount rate: a cost C in year t counts as C / (1 + r)^t. The total adds installed cost, maintenance events, yearly inspection, replacements and the shutdown or access cost of each event. When residual credit is enabled and a replacement life is defined, the model deducts the discounted straight-line value of the unused life at the end of the study. The calculation uses present-value life-cycle costing; the project appraisal defines the assumptions.",
  },
  {
    question: "How long does hot-dip galvanizing last?",
    answer:
      "Coating thickness divided by a zinc corrosion rate gives an arithmetic screening estimate. ISO 9223 first-year rates include 0.7 to 2.1 µm/year in C3 and 4.2 to 8.4 µm/year in C5. For non-centrifuged steel articles over 6 mm thick, the ISO 1461 minimum mean coating thickness is 85 µm. Using that 85 µm example gives about 10–20 years in C5 and 40–121 years in C3; these are not guaranteed coating or structure lives. First-year rates are not long-term rates, and splash, immersion and specific chemical conditions require a separate assessment.",
  },
  {
    question: "Which discount rate should I use?",
    answer:
      "Use the real rate required by your organization's project appraisal, consistent with the tool's constant-price costs. It excludes inflation. A higher rate reduces the present value of later costs, so compare several rates alongside maintenance and replacement assumptions to see whether the result changes.",
  },
  {
    question: "Does FRP need maintenance?",
    answer:
      "FRP requires inspection and a maintenance plan for the offered resin, finish, exposure and connections. Surface renewal or other work may be needed. The example puts a surface-care event at year 25 to demonstrate the arithmetic, not to predict a coating life. Replace it with the interval and cost supported for your project.",
  },
  {
    question: "When is steel the cheaper choice?",
    answer:
      "Steel can be cheaper when its installed quote is lower and the project's future maintenance and replacement costs do not offset that difference. Test both options using equivalent performance and scope, then vary maintenance timing, access costs and the discount rate. An atmospheric category alone does not decide the result.",
  },
];

export default function LifeCycleCostPage() {
  const example = calculateLcc(lifeCycleCostExample)!;
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

      <PageNav items={[{ id: "tool", label: "Calculator" }, { id: "basis", label: "Comparison basis" }, { id: "example", label: "Worked example" }, { id: "galvanizing", label: "Galvanizing life" }, { id: "faq", label: "FAQ" }]} />

      <ToolSection label="FRP vs steel life-cycle cost calculator">
        <LifeCycleCostCalculator />
      </ToolSection>

      <PageSection id="basis" title="Compare two options that deliver the same function" tone="white">
        <p className="text-f16 leading-golden text-t2">First establish equivalent usable area or member duty, span, loads, deflection, environment and required service period. Each quote should include its own designed supports, fixings, fabrication, protection, transport and installation. This cost tool does not establish structural equivalence.</p>
        <p className="mt-[12px] text-f16 leading-golden text-t2">Use one currency and one price-date basis. The model adds installed cost, recurring maintenance, annual inspection, replacement and a common downtime/access cost per event, then optionally credits unused replacement life. Future costs are discounted by C / (1 + r)<sup>t</sup> using a real rate and constant-price assumptions.</p>
        <p className="mt-[12px] text-f16 leading-golden text-t2">Taxes, financing, inflation, disposal and carbon impacts are not separate model inputs. Replacements repeat the initial installed cost and maintenance pattern; residual credit is straight-line. An event exactly at the end of the study is excluded. Check whether those assumptions suit your appraisal and compare sensitivities.</p>
      </PageSection>

      <PageSection id="example" title="Worked example using the tool's starting cost index" tone="muted" intro="These are chosen arithmetic inputs, not market quotations, supplier maintenance recommendations or a completed project.">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-f14">
            <thead><tr className="border-b border-border-default bg-bg2"><th scope="col" className="px-[14px] py-[10px]">Input or result</th><th scope="col" className="px-[14px] py-[10px]">FRP option</th><th scope="col" className="px-[14px] py-[10px]">Steel option</th></tr></thead>
            <tbody>{[
              ["Installed cost index", lifeCycleCostExample.frp.initial, lifeCycleCostExample.steel.initial],
              ["Maintenance cost per event", lifeCycleCostExample.frp.maintenanceCost, lifeCycleCostExample.steel.maintenanceCost],
              ["Maintenance years within the study", example.frp.events.map(event => event.year).join(", "), example.steel.events.map(event => event.year).join(", ")],
              ["Present-value total cost index", example.frp.total.toFixed(2), example.steel.total.toFixed(2)],
            ].map(([label, frp, steel]) => <tr key={label} className="border-b border-border-default last:border-b-0"><th scope="row" className="px-[14px] py-[12px] font-semibold text-t1">{label}</th><td className="px-[14px] py-[12px] text-t2">{frp}</td><td className="px-[14px] py-[12px] text-t2">{steel}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-[16px] text-f14 leading-golden text-t2">Study: {lifeCycleCostExample.studyYears} years; real discount rate: {lifeCycleCostExample.discountPercent}%; annual inspection and downtime costs: zero; no replacement within the study, hence no residual credit. FRP total = 130 + 10 / 1.03²⁵. Steel total = 100 + 40 / 1.03¹³ + 40 / 1.03²⁸. Those assumptions make FRP lower by {example.saving.toFixed(2)} index points. Change the inputs above to see whether the conclusion holds for your project.</p>
      </PageSection>

      <PageSection
        id="galvanizing"
        title="Galvanizing life by corrosivity category"
        intro="Coating thickness divided by the ISO 9223 first-year zinc corrosion rate, using ISO 1461 minimum mean coatings for non-centrifuged steel articles. The range runs from the fastest to the slowest rate in each category."
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
          ISO 1461 minimum mean coatings for non-centrifuged steel articles: 85 µm over 6 mm thick, 70 µm over 3 up to 6 mm, 55 µm from 1.5 to 3 mm. See the <a href="https://galvanizing.org.uk/galvanizing-standards/iso-1461/" className="font-semibold text-teal-text hover:underline">Galvanizers Association scope and table</a>. Actual coatings can be
          thicker, which lengthens this arithmetic estimate in proportion. First-year rates do not predict a whole structure&apos;s life; splash, immersion and chemical fumes require a different review. For the FRP side, see the{" "}
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
        text="Send the steel scope, loads and environment you are pricing. We can review an FRP option and define the supply and evidence needed for a comparable quote."
      />
    </>
  );
}
