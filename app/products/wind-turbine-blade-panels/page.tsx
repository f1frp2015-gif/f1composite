import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AskAICard from "@/components/ai/AskAICard";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import {
  gfpWe20FatigueDesignTable,
  gfpWe20Report,
  gfpWe20SourceBoundary,
  windBladePanelImages,
  windBladePanelPrograms,
} from "@/content/data/windTurbineBladePanelSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/wind-turbine-blade-panels";
const seoTarget = getSeoQueryTarget(pagePath);

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: "/products/wind-turbine-blade-panels/opengraph-image",
});

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
        tag="Wind Energy · Pultruded Laminate Program"
        title="Wind Turbine Blade Panels — GFRP, CFRP & Carbon-Glass Hybrid"
        description="Pultruded composite panels for wind turbine blade spar caps and reinforcement programs, supplied in glass fiber, carbon fiber and carbon-glass hybrid architectures with project-specific cut lengths."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Wind Turbine Blade Panels" },
        ]}
      />

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-[34px]">
          <div>
            <SectionTag>Engineered-to-Order Panel Supply</SectionTag>
            <h2 className="mt-[13px] max-w-[760px] text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.08] text-t1">
              Release the laminate, cut length and qualification together
            </h2>
            <p className="mt-[21px] max-w-[760px] text-f17 leading-golden text-t2">
              Wind-blade panels are axial reinforcement products, not generic construction sheet.
              F1 coordinates the fiber system, resin, laminate architecture, section, surface,
              dimensional controls and mechanical evidence against the blade program.
            </p>
            <div className="mt-[29px] rounded-[8px] border border-teal/30 bg-teal-pale p-[21px]">
              <p className="text-f12 font-bold uppercase tracking-[0.12em] text-teal-text">
                Cut to the required length
              </p>
              <p className="mt-[8px] text-f16 font-bold leading-golden text-t1">
                Wind-turbine-blade-grade panels can be cut to the finished length specified in your approved order drawing.
              </p>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                Include cut-length tolerance, end trim, handling, packing and transport constraints.
                F1 confirms manufacturing and shipment limits before order release.
              </p>
            </div>
            <div className="mt-[29px] flex flex-wrap gap-[13px]">
              <Link
                href="/contact?source=wind-turbine-blade-panels&inquiry_type=rfq"
                className="rounded-[4px] bg-teal px-[21px] py-[13px] text-f14 font-bold text-white transition-colors hover:bg-teal-text"
              >
                Request a panel review
              </Link>
              <a
                href="#gfp-we20-test-data"
                className="rounded-[4px] border border-border-default bg-white px-[21px] py-[13px] text-f14 font-bold text-t1 transition-colors hover:border-teal hover:text-teal-text"
              >
                Review GFP-WE20 data
              </a>
            </div>
          </div>
          <figure>
            <div className="relative aspect-[16/7] overflow-hidden rounded-[8px] border border-border-default bg-bg2">
              <Image
                src={windBladePanelImages.submittedPanel}
                alt="GFP-WE20 pultruded fiberglass panel submitted for fatigue characterization"
                fill
                preload
                sizes="(max-width: 1024px) calc(100vw - 40px), 46vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              GFP-WE20 panel submitted for report {gfpWe20Report.reportNumber}; the handwritten sample identification is retained from the report image.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Three Material Programs</SectionTag>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.12] text-t1">
            Select the reinforcement architecture before comparing numbers
          </h2>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            The images below are representative supplier program images. Final color, surface,
            geometry, laminate and acceptance data follow the approved sample and order documents.
            The GFP-WE20 results later on this page apply only to the reported glass-fiber material.
          </p>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {windBladePanelPrograms.map((program) => (
              <article key={program.name} className="overflow-hidden rounded-[8px] border border-border-default bg-white">
                <div className="relative aspect-[16/9] bg-white">
                  <Image
                    src={program.image}
                    alt={program.alt}
                    fill
                    sizes="(max-width: 1024px) calc(100vw - 40px), 32vw"
                    className="object-contain"
                  />
                </div>
                <div className="border-t border-border-default p-[21px]">
                  <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">
                    {program.shortName}
                  </p>
                  <h3 className="mt-[8px] text-f19 font-bold text-t1">{program.name}</h3>
                  <p className="mt-[8px] text-f14 leading-golden text-t2">{program.summary}</p>
                  <p className="mt-[13px] border-l-2 border-teal pl-[13px] text-f12 leading-golden text-t3">
                    {program.release}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gfp-we20-test-data" className="scroll-mt-[90px] bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Report-Scoped Test Evidence</SectionTag>
          <h2 className="mt-[13px] max-w-[950px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.12] text-t1">
            GFP-WE20 tension–tension fatigue and fiber-content results
          </h2>
          <p className="mt-[13px] max-w-[950px] text-f15 leading-golden text-t2">
            {gfpWe20Report.laboratory} issued report <strong className="text-t1">{gfpWe20Report.reportNumber}</strong> on {gfpWe20Report.issueDate} for the received {gfpWe20Report.material}. The reported material used {gfpWe20Report.resin}/{gfpWe20Report.hardener} with {gfpWe20Report.reinforcement} reinforcement.
          </p>

          <div className="mt-[29px] grid gap-[13px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["m", gfpWe20Report.fatigue.slopeExponent, "S–N slope exponent"],
              ["A", gfpWe20Report.fatigue.amplitudeAtOneCycle, "Stress amplitude at N = 1"],
              ["Wf", gfpWe20Report.physical.fiberMassContent, "Average fiber mass content"],
              ["Vf", gfpWe20Report.physical.fiberVolumeContent, "Calculated average fiber volume"],
            ].map(([symbol, value, label]) => (
              <div key={symbol} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <p className="text-f11 font-bold uppercase tracking-[0.12em] text-t3">{symbol}</p>
                <p className="mt-[5px] text-[clamp(24px,3vw,34px)] font-extrabold leading-none text-teal-text">{value}</p>
                <p className="mt-[8px] text-f12 leading-golden text-t2">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            <figure className="rounded-[8px] border border-border-default bg-white p-[13px]">
              <div className="relative mx-auto aspect-[669/981] max-h-[620px] overflow-hidden bg-bg2">
                <Image
                  src={windBladePanelImages.beforeTest}
                  alt="Fifteen machined GFP-WE20 waisted fatigue specimens before tension-tension testing"
                  fill
                  sizes="(max-width: 1024px) calc(100vw - 66px), 46vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                Fifteen labeled, waisted specimens before testing. The report states that machining used CNC and a diamond saw in accordance with the test specifications.
              </figcaption>
            </figure>
            <figure className="rounded-[8px] border border-border-default bg-white p-[13px]">
              <div className="relative mx-auto aspect-[1037/979] max-h-[620px] overflow-hidden bg-bg2">
                <Image
                  src={windBladePanelImages.afterTest}
                  alt="GFP-WE20 fatigue specimens after tension-tension testing with visible longitudinal fiber failure"
                  fill
                  sizes="(max-width: 1024px) calc(100vw - 66px), 46vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                Specimens after testing. The fit used 12 valid results; #13 and #14 had the wrong setup, while #15 was a run-out at 10,001,236 cycles and was excluded from the statistics.
              </figcaption>
            </figure>
          </div>

          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h3 className="text-f19 font-bold text-t1">Fatigue test basis</h3>
              <dl className="mt-[13px] divide-y divide-border-default text-f13">
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
                  <div key={term} className="grid gap-[4px] py-[10px] sm:grid-cols-[145px_1fr]">
                    <dt className="font-bold text-t1">{term}</dt>
                    <dd className="leading-golden text-t2">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <h3 className="text-f19 font-bold text-t1">Reported statistical and physical summary</h3>
              <dl className="mt-[13px] divide-y divide-border-default text-f13">
                {[
                  ["50% S–N regression", gfpWe20Report.fatigue.regression],
                  ["Correlation coefficient", gfpWe20Report.fatigue.correlation],
                  ["Goodness of fit", gfpWe20Report.fatigue.goodnessOfFit],
                  ["Fiber-content standard", gfpWe20Report.physical.standard],
                  ["Average resin mass content", gfpWe20Report.physical.resinMassContent],
                  ["Average specimen density", gfpWe20Report.physical.density],
                ].map(([term, detail]) => (
                  <div key={term} className="grid gap-[4px] py-[10px] sm:grid-cols-[190px_1fr]">
                    <dt className="font-bold text-t1">{term}</dt>
                    <dd className="leading-golden text-t2">{detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-[21px] rounded-[6px] border border-amber-300 bg-amber-50 p-[13px] text-f12 leading-golden text-amber-950">
                {gfpWe20SourceBoundary}
              </p>
            </div>
          </div>

          <div className="mt-[34px] overflow-hidden rounded-[8px] border border-border-default">
            <div className="bg-t1 px-[21px] py-[16px] text-white">
              <h3 className="text-f19 font-bold">Reported P50 and P95 S–N regression values</h3>
              <p className="mt-[5px] text-f12 leading-golden text-white/75">
                Stress values in MPa. In the report, P95 denotes 95% survival probability at 95% confidence; these are fitted values, not a universal design allowable.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full border-collapse text-left text-f13">
                <thead className="bg-bg2 text-t1">
                  <tr>
                    <th scope="col" className="px-[16px] py-[13px] font-bold">Cycles N</th>
                    <th scope="col" className="px-[16px] py-[13px] font-bold">P50 σa</th>
                    <th scope="col" className="px-[16px] py-[13px] font-bold">P50 σmax</th>
                    <th scope="col" className="px-[16px] py-[13px] font-bold text-teal-text">P95 σa</th>
                    <th scope="col" className="px-[16px] py-[13px] font-bold text-teal-text">P95 σmax</th>
                  </tr>
                </thead>
                <tbody>
                  {gfpWe20FatigueDesignTable.map((row) => (
                    <tr key={row.cycles} className="border-t border-border-default bg-white">
                      <th scope="row" className="px-[16px] py-[12px] font-bold text-t1">{row.cycles}</th>
                      <td className="px-[16px] py-[12px] text-t2">{row.p50Amplitude}</td>
                      <td className="px-[16px] py-[12px] text-t2">{row.p50Maximum}</td>
                      <td className="px-[16px] py-[12px] font-semibold text-teal-text">{row.p95Amplitude}</td>
                      <td className="px-[16px] py-[12px] font-semibold text-teal-text">{row.p95Maximum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[72px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>RFQ Release Package</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Put the finished length beside the laminate and evidence requirements
          </h2>
          <div className="mt-[29px] grid gap-[13px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Geometry & length", "Panel drawing, finished cut length, tolerance, end trim, straightness and quantity."],
              ["02", "Material definition", "Fiber family and grade, resin, hybrid layup if applicable, fiber content and surface preparation."],
              ["03", "Qualification", "Design allowables, test methods, conditioning, sampling, witness points and acceptance criteria."],
              ["04", "Delivery", "Traceability documents, packing/handling limits, destination, Incoterm and required delivery date."],
            ].map(([index, title, body]) => (
              <div key={index} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <p className="text-f11 font-bold tracking-[0.12em] text-teal-text">{index}</p>
                <h3 className="mt-[8px] text-f16 font-bold text-t1">{title}</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Related products",
            links: [
              { href: "/products/fiberglass-sheets", label: "Fiberglass sheets — general flat stock" },
              { href: "/products/fiberglass-plates", label: "Fiberglass plate profiles — hollow & multi-cell" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions" },
              { href: "/industries/energy", label: "Energy & power applications" },
            ],
          },
          {
            title: "Engineering & documents",
            links: [
              { href: "/datasheets", label: "Technical datasheets" },
              { href: "/technology/quality-testing", label: "Manufacturing quality & testing" },
              { href: "/resources/technical-data", label: "Technical data center" },
              { href: "/contact?source=wind-turbine-blade-panels&inquiry_type=rfq", label: "Submit a blade-panel RFQ" },
            ],
          },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard prefill="I need pultruded wind turbine blade panels: material family [GFRP/CFRP/carbon-glass hybrid], drawing/section, finished cut length and tolerance, quantity, fiber/resin requirements, surface and bonding preparation, mechanical and fatigue qualification requirements, packing constraints, destination and target delivery date. Help me prepare the RFQ and identify missing release data." />

      <InnerCTA title="Send the panel drawing, finished cut length and qualification plan." />
    </>
  );
}
