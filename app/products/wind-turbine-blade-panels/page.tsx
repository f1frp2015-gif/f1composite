import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import {
  gfpWe20FatigueDesignTable,
  gfpWe20Report,
  gfpWe20SourceBoundary,
  windBladePanelImages,
  windBladePanelPrograms,
} from "@/content/data/windTurbineBladePanelSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/wind-turbine-blade-panels";
const seoTarget = getSeoQueryTarget(pagePath);

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: "/products/wind-turbine-blade-panels/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "wind-turbine-blade-panels",
  product: "Wind turbine blade panels",
  productPath: pagePath,
  message: "Please review pultruded blade panels for my program. I will send the material family, panel drawing, finished cut length and tolerance, quantity and qualification plan.",
});

// The release package, as the quote block lists it.
const requestItems = [
  { title: "Geometry and length", text: "Panel drawing, finished cut length, tolerance, end trim, straightness and quantity." },
  { title: "Material definition", text: "Fiber family and grade, resin, hybrid layup if applicable, fiber content and surface preparation." },
  { title: "Qualification", text: "Design allowables, test methods, conditioning, sampling, witness points and acceptance criteria." },
  { title: "Delivery", text: "Traceability documents, packing and handling limits, destination, Incoterm and required delivery date." },
];

const faqItems = [
  {
    question: "Are these wind turbine blade panels supplied to a fixed stock length?",
    answer:
      "No fixed public stock length controls the program. Wind-blade-grade pultruded panels can be cut to the finished length specified in the approved order drawing. State the length, tolerance, end trim, quantity and packing or transport constraints in the RFQ; manufacturability and shipment handling are confirmed before order release.",
  },
  {
    question: "Which panel material should a blade designer select?",
    answer:
      "GFRP is commonly selected when stiffness-to-cost and high glass content lead the decision; CFRP when axial stiffness and weight dominate; and carbon-glass hybrid when the laminate architecture is being tuned between those objectives. The blade designer and certification plan still control the grade, allowables, environmental reductions and qualification program.",
  },
  {
    question: "Do the published GFP-WE20 fatigue results apply to every GFRP panel?",
    answer:
      "No. They apply only to the GFP-WE20 specimens described in report R-L23011205a2.Rev00.EN: AP3280A/AP3280B resin system with TM+ Glass, tested under the stated ISO methods and conditions. They are not universal guaranteed minima or values for the carbon and hybrid programs.",
  },
  {
    question: "What does the P95 fatigue line mean on this page?",
    answer:
      "In the cited report, P95 is the fitted S-N line for 95% survival probability at a 95% confidence level. It is a statistical result for the tested specimens. Project design must apply the governing blade standard, material factors, environmental reductions and qualification evidence selected by the designer or certification body.",
  },
  {
    question: "Can F1 provide batch-level quality documents?",
    answer:
      "Yes. Define the required material certificate, fiber and resin traceability, dimensional inspection, mechanical test frequency, witness points and acceptance limits in the RFQ. The order-specific inspection and test plan governs the documents delivered with each production lot.",
  },
  {
    question: "What information should be included in a wind-blade panel RFQ?",
    answer:
      "Send material family, drawing or section, finished cut length and tolerance, quantity, fiber and resin requirements, surface and bonding preparation, straightness, mechanical allowables, fatigue or static qualification plan, inspection documents, packing concept, destination and required delivery date.",
  },
];

export default function WindTurbineBladePanelsPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Pultruded Composite Panels for Wind Turbine Blades",
          description: seoTarget.description,
          path: pagePath,
          image: windBladePanelImages.hybrid,
          category: "Wind turbine blade spar-cap and reinforcement laminates",
          productLine: "Wind-energy pultruded laminate program",
          material: [
            "Glass fiber reinforced polymer (GFRP)",
            "Carbon fiber reinforced polymer (CFRP)",
            "Carbon-glass hybrid composite",
          ],
          additionalProperty: [
            { name: "Manufacturing process", value: "Continuous pultrusion" },
            { name: "Cut length", value: "Cut to the approved project requirement" },
            { name: "GFRP report basis", value: gfpWe20Report.reportNumber },
            { name: "Qualification", value: "Grade-, lot- and project-specific" },
          ],
        })}
      />

      <PageHeader
        tag="Wind blade panels"
        line={{ name: "Wind energy", label: "Blade panels", mark: false }}
        title="Wind Turbine Blade Panels — GFRP, CFRP & Carbon-Glass Hybrid"
        description="Pultruded composite panels for wind turbine blade spar caps and reinforcement programs, supplied in glass fiber, carbon fiber and carbon-glass hybrid architectures with project-specific cut lengths."
        facts={[
          { label: "Programs", value: "GFRP, CFRP, hybrid" },
          { label: "Length", value: "Cut to drawing" },
          { label: "Fatigue report", value: "GFP-WE20" },
          { label: "Qualification", value: "Per project" },
        ]}
        actions={{
          primary: { label: "Request a panel review", href: quoteHref },
          secondary: { label: "Review GFP-WE20 data", href: "#gfp-we20-test-data", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="GFP-WE20 test panel" note="Report photo" caption={`GFP-WE20 panel submitted for report ${gfpWe20Report.reportNumber}; the handwritten sample identification is retained from the report image.`} bleed>
            <Image
              src={windBladePanelImages.submittedPanel}
              alt="GFP-WE20 pultruded fiberglass panel submitted for fatigue characterization"
              width={1638}
              height={454}
              preload
              sizes="(max-width: 1023px) 94vw, 44vw"
              className="h-auto w-full"
            />
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Wind Turbine Blade Panels" },
        ]}
      />
      <PageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "programs", label: "Programs" },
          { id: "gfp-we20-test-data", label: "Test data" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="overview" title="Release the laminate, cut length and qualification together">
        <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[48px]">
          <p className="text-f18 leading-golden text-t1">
            Wind-blade panels are axial reinforcement products, not generic construction sheet. F1 coordinates the fiber system, resin, laminate architecture, section, surface, dimensional controls and mechanical evidence against the blade program.
          </p>
          <aside className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Cut to the required length</p>
            <p className="mt-[8px] text-f16 font-semibold leading-golden text-t1">
              Wind-turbine-blade-grade panels can be cut to the finished length specified in your approved order drawing.
            </p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              Include cut-length tolerance, end trim, handling, packing and transport constraints. F1 confirms manufacturing and shipment limits before order release.
            </p>
          </aside>
        </div>
      </PageSection>

      <PageSection
        id="programs"
        title="Select the reinforcement architecture before comparing numbers"
        tone="muted"
        intro="The images below are representative supplier program images. Final color, surface, geometry, laminate and acceptance data follow the approved sample and order documents. The GFP-WE20 results later on this page apply only to the reported glass-fiber material."
      >
        <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
          {windBladePanelPrograms.map((program) => (
            <article key={program.name} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white">
              <div className="relative aspect-[16/9] border-b border-border-default bg-white">
                <Image src={program.image} alt={program.alt} fill sizes="(max-width: 1024px) calc(100vw - 40px), 32vw" className="object-contain" />
                <span className="absolute right-[8px] top-[8px] rounded-tag bg-white/90 px-[6px] py-[2px] font-mono text-f12 uppercase tracking-[0.06em] text-t2">Supplier photo</span>
              </div>
              <div className="flex flex-1 flex-col p-[20px] sm:p-[24px]">
                <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{program.shortName}</p>
                <h3 className="mt-[6px] text-f18 font-bold text-t1">{program.name}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{program.summary}</p>
                <div className="mt-auto pt-[16px]">
                  <p className="border-t border-border-default pt-[12px] text-f14 leading-golden text-t3">{program.release}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="gfp-we20-test-data"
        title="GFP-WE20 tension–tension fatigue and fiber-content results"
        intro={
          <>
            {gfpWe20Report.laboratory} issued report <strong className="font-semibold text-t1">{gfpWe20Report.reportNumber}</strong> on {gfpWe20Report.issueDate} for the received {gfpWe20Report.material}. The reported material used {gfpWe20Report.resin}/{gfpWe20Report.hardener} with {gfpWe20Report.reinforcement} reinforcement.
          </>
        }
      >
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border-default bg-border-default lg:grid-cols-4">
          {([
            ["m", <>m</>, gfpWe20Report.fatigue.slopeExponent, "S–N slope exponent"],
            ["A", <>A</>, gfpWe20Report.fatigue.amplitudeAtOneCycle, "Stress amplitude at N = 1"],
            ["Wf", <>W<sub>f</sub></>, gfpWe20Report.physical.fiberMassContent, "Average fiber mass content"],
            ["Vf", <>V<sub>f</sub></>, gfpWe20Report.physical.fiberVolumeContent, "Calculated average fiber volume"],
          ] as const).map(([key, symbol, value, label]) => (
            <div key={key} className="bg-white px-[16px] py-[14px] sm:px-[20px] sm:py-[16px]">
              {/* The symbol keeps its case; only the label is set in capitals. */}
              <dt className="font-mono text-f12 tracking-[0.06em] text-t3"><span className="italic">{symbol}</span> · <span className="uppercase">{label}</span></dt>
              <dd className="mt-[6px] text-[clamp(24px,3vw,32px)] font-extrabold leading-none text-t1">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-[24px] grid grid-cols-1 gap-[16px] lg:grid-cols-2">
          <Figure number={2} title="Specimens before testing" note="Report photo" caption="Fifteen labeled, waisted specimens before testing. The report states that machining used CNC and a diamond saw in accordance with the test specifications.">
            <Image src={windBladePanelImages.beforeTest} alt="Fifteen machined GFP-WE20 waisted fatigue specimens before tension-tension testing" width={669} height={981} sizes="(max-width: 1024px) calc(100vw - 66px), 40vw" className="mx-auto h-auto max-h-[560px] w-auto" />
          </Figure>
          <Figure number={3} title="Specimens after testing" note="Report photo" caption="Specimens after testing. The fit used 12 valid results; #13 and #14 had the wrong setup, while #15 was a run-out at 10,001,236 cycles and was excluded from the statistics.">
            <Image src={windBladePanelImages.afterTest} alt="GFP-WE20 fatigue specimens after tension-tension testing with visible longitudinal fiber failure" width={1037} height={979} sizes="(max-width: 1024px) calc(100vw - 66px), 40vw" className="mx-auto h-auto max-h-[560px] w-auto" />
          </Figure>
        </div>

        <div className="mt-[24px] grid grid-cols-1 gap-[16px] lg:grid-cols-2">
          <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">Fatigue test basis</h3>
            <dl className="mt-[12px] divide-y divide-border-default border-y border-border-default text-f14">
              {[
                ["Specimen ID", gfpWe20Report.fatigue.specimenId],
                ["Standard", gfpWe20Report.fatigue.standard],
                ["Conditioning", gfpWe20Report.fatigue.conditioning],
                ["Test atmosphere", gfpWe20Report.fatigue.atmosphere],
                ["Frequency", gfpWe20Report.fatigue.frequency],
                ["Load ratio", gfpWe20Report.fatigue.loadRatio],
                ["Control", gfpWe20Report.fatigue.control],
                ["Nominal geometry", gfpWe20Report.fatigue.specimenGeometry],
              ].map(([term, detail]) => (
                <div key={term} className="grid gap-[4px] py-[10px] sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-[12px]">
                  <dt className="font-semibold text-t1">{term}</dt>
                  <dd className="leading-golden text-t2">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">Reported statistical and physical summary</h3>
            <dl className="mt-[12px] divide-y divide-border-default border-y border-border-default text-f14">
              {[
                ["50% S–N regression", gfpWe20Report.fatigue.regression],
                ["Correlation coefficient", gfpWe20Report.fatigue.correlation],
                ["Goodness of fit", gfpWe20Report.fatigue.goodnessOfFit],
                ["Fiber-content standard", gfpWe20Report.physical.standard],
                ["Average resin mass content", gfpWe20Report.physical.resinMassContent],
                ["Average specimen density", gfpWe20Report.physical.density],
              ].map(([term, detail]) => (
                <div key={term} className="grid gap-[4px] py-[10px] sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-[12px]">
                  <dt className="font-semibold text-t1">{term}</dt>
                  <dd className="leading-golden text-t2">{detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-[16px] rounded-control border border-warn-border bg-warn-bg px-[14px] py-[12px] text-f14 leading-golden text-t2">
              {gfpWe20SourceBoundary}
            </p>
          </div>
        </div>

        <h3 className="mt-[32px] text-f20 font-bold text-t1">Reported P50 and P95 S–N regression values</h3>
        <p className="mt-[8px] max-w-[820px] text-f14 leading-golden text-t2">
          Stress values in MPa. In the report, P95 denotes 95% survival probability at 95% confidence; these are fitted values, not a universal design allowable.
        </p>
        <div className="relative mt-[16px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="spec-table w-full min-w-[640px] border-collapse text-left text-f14">
            <caption className="sr-only">Reported P50 and P95 S–N regression values for GFP-WE20</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Cycles N</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">P50 σa</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">P50 σmax</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">P95 σa</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">P95 σmax</th>
              </tr>
            </thead>
            <tbody>
              {gfpWe20FatigueDesignTable.map((row) => (
                <tr key={row.cycles} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.cycles}</th>
                  <td className="px-[14px] py-[10px] text-t2">{row.p50Amplitude}</td>
                  <td className="px-[14px] py-[10px] text-t2">{row.p50Maximum}</td>
                  <td className="px-[14px] py-[10px] font-semibold text-t1">{row.p95Amplitude}</td>
                  <td className="px-[14px] py-[10px] font-semibold text-t1">{row.p95Maximum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="faq" title="Wind blade panel questions" tone="muted">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related products",
            links: [
              { href: "/products/fiberglass-sheets", label: "Fiberglass sheets, general flat stock" },
              { href: "/products/fiberglass-plates", label: "Fiberglass plate profiles, hollow and multi-cell" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions" },
              { href: "/industries/energy", label: "Energy and power applications" },
            ],
          },
          {
            title: "Engineering and documents",
            links: [
              { href: "/datasheets", label: "Technical datasheets" },
              { href: "/technology/quality-testing", label: "Manufacturing quality and testing" },
              { href: "/resources/technical-data", label: "Technical data center" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Send the panel drawing, finished cut length and qualification plan" tone="deep">
        <ProductRfq
          product="Wind turbine blade panels"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={requestItems}
          intro="Put the finished length beside the laminate and evidence requirements. We confirm manufacturability, the inspection and test plan and shipment limits before order release."
          advisorPrompt="I need pultruded wind turbine blade panels: material family [GFRP/CFRP/carbon-glass hybrid], drawing/section, finished cut length and tolerance, quantity, fiber/resin requirements, surface and bonding preparation, mechanical and fatigue qualification requirements, packing constraints, destination and target delivery date. Help me prepare the RFQ and identify missing release data."
        />
      </PageSection>
    </>
  );
}
