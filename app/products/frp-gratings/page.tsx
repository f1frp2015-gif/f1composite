import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AskAICard from "@/components/ai/AskAICard";
import PageHeader from "@/components/layout/PageHeader";
import GratingClipGuide from "@/components/sections/GratingClipGuide";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import {
  pultrudedGratingManualImages,
  pultrudedGratingSpecGroups,
} from "@/content/data/pultrudedGratingSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/frp-gratings";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const publishedAt = "2026-04-04";
const updatedAt = "2026-08-31";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/frp-gratings/opengraph-image",
});

const pultrudedConfigurations = [
  {
    name: "Pedestrian T-Bar Grating",
    description:
      "Wide-top T-shaped bearing bars create a comfortable walking surface while retaining open drainage. Dedicated series reduce the dominant opening for pedestrian and accessibility-governed routes.",
    specs: [
      { label: "Bearing-bar form", value: "Pultruded T-bar" },
      { label: "Catalog depths", value: "25 and 38 mm" },
      { label: "Typical uses", value: "Walkways, platforms, mezzanines, public-access routes" },
    ],
  },
  {
    name: "Industrial I-Bar Grating",
    description:
      "Pultruded I-shaped bearing bars concentrate continuous glass reinforcement in the span direction. Select the series from support spacing, deflection limit, open area and project load case.",
    specs: [
      { label: "Bearing-bar form", value: "Pultruded I-bar" },
      { label: "Catalog depths", value: "25, 38 and 50 mm listed below" },
      { label: "Typical uses", value: "Industrial access, chemical plants, offshore walkways, cooling towers" },
    ],
  },
  {
    name: "High-Load & Cooling-Tower Series",
    description:
      "High-load rows use deeper or more closely spaced bearing bars; cooling-tower rows prioritize open area and airflow. Neither label replaces the project-specific load/deflection table.",
    specs: [
      { label: "High-load reference", value: "HI-4720" },
      { label: "High-open reference", value: "SI-8315 · 83% nominal open area" },
      { label: "Release requirement", value: "Approved span, support, load and deflection schedule" },
    ],
  },
] as const;

const selectionChecks = [
  {
    title: "Confirm bearing-bar direction",
    body: "Pultruded grating is a one-way spanning product. Mark the span direction on the panel-layout drawing and support every cut bearing-bar end.",
  },
  {
    title: "Check service and deflection",
    body: "Select resin, bar depth and spacing against the chemical environment, temperature, support spacing, concentrated load and governing deflection limit.",
  },
  {
    title: "Choose the walking surface",
    body: "Match open area and slot direction to drainage, airflow, accessibility and dropped-object requirements; then specify concave, fine-grit or coarse-grit top treatment.",
  },
  {
    title: "Issue the clip layout",
    body: "Choose M, J or series-specific T hold-downs from the bearing-bar profile and support access. The approved drawing controls quantity, spacing and complete fastener assembly.",
  },
] as const;

const antiSlipGrades = [
  {
    grade: "Standard Concave",
    description:
      "An uncoated pultruded walking surface for dry indoor and light-duty access where the project does not require an added grit layer.",
  },
  {
    grade: "Fine Grit",
    description:
      "A bonded fine-grit surface for outdoor platforms, wet areas and routine industrial access. Confirm the project slip-test method and acceptance value in the order specification.",
  },
  {
    grade: "Coarse Grit",
    description:
      "A more aggressive surface for offshore, process-water, oily or chemical-splash duty. Cleaning method and footwear exposure should be reviewed with slip performance.",
  },
] as const;

const faqItems = [
  {
    question: "What is pultruded FRP grating?",
    answer:
      "Pultruded FRP grating is assembled from continuous-fiber I-bars or T-bars connected by cross-rods. Most reinforcement runs along the bearing bars, producing high stiffness and strength in the designed span direction. It must be oriented and supported as a one-way spanning panel.",
  },
  {
    question: "Are pultruded fiberglass grating and pultruded FRP grating the same product?",
    answer:
      "For F1's glass-reinforced products, yes. Both terms refer here to open, one-way GFRP panels assembled from pultruded I-bar or T-bar bearing members and cross-rods. FRP is a broader material term, so the project specification should still define the glass reinforcement, resin system, series, surface and load/deflection requirements. Molded FRP grating and closed structural FRP deck panels are separate product families.",
  },
  {
    question: "How is pultruded grating different from molded grating?",
    answer:
      "Pultruded grating is selected for longer one-way spans and higher directional stiffness. Molded grating is cured as a bidirectional mesh panel and is generally more forgiving when a layout needs many irregular cutouts. Molded mesh sizes, nominal panel weights and M/C/J clips are now documented on the separate molded FRP grating page.",
  },
  {
    question: "How is pultruded grating different from a structural FRP deck panel?",
    answer:
      "Pultruded grating is an open-drainage assembly of one-way I-bar or T-bar bearing members and cross-rods. A structural deck panel has a continuous top surface, internal webs and profile-specific edge geometry. Deck sections, joints and A/B/t values are documented on the separate FRP deck-panels page.",
  },
  {
    question: "Which pultruded grating series are suitable for pedestrian routes?",
    answer:
      "Start with the dedicated T-bar pedestrian rows or the I-4010 row shown in the specification table, then verify the actual clear opening and direction of travel against the accessibility code adopted by the project. A series label or a pedestrian badge does not replace the project authority's opening and surface review.",
  },
  {
    question: "Can pultruded FRP grating be cut on site?",
    answer:
      "Yes, using carbide- or diamond-tipped tools with dust extraction and suitable PPE. Keep the bearing bars in the designed span direction, provide support under cut bearing-bar ends, seal cut surfaces with compatible resin and re-check the hold-down arrangement.",
  },
  {
    question: "Which clips are used with pultruded grating?",
    answer:
      "F1 uses compatible M saddle hold-downs, J support-hook assemblies and series-specific T hold-downs. Clip letters are not universal across manufacturers, so order by F1 SKU, bearing-bar series and approved drawing rather than by the letter alone.",
  },
  {
    question: "Are the M, J and T clips supplied in 316 stainless steel?",
    answer:
      "Yes. The F1 pultruded-grating clip kits listed on this page are specified in 316 stainless steel. Final geometry, bolt length, complete fastener assembly, quantity, spacing and tightening requirements are issued for the selected panel and support detail.",
  },
  {
    question: "Where can I get a pultruded grating load table?",
    answer:
      "Send the series, clear span, support width, uniform and concentrated loads, load footprint and deflection limit. F1 will return the applicable project load/deflection table and panel-layout assumptions. Do not substitute a generic load-class label for the selected bearing-bar row.",
  },
];

export default function PultrudedGratingsPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Pultruded FRP Grating",
          description: pageDescription,
          path: pagePath,
          image: pultrudedGratingManualImages.hero,
          category: "Pultruded fiberglass I-bar and T-bar grating",
          productLine: "F1-GRID-P",
          schemaType: "CollectionPage",
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: { name: author.fullName, jobTitle: author.jobTitle, path: `/about/authors/${author.slug}` },
          reviewedBy: { name: reviewer.fullName, jobTitle: reviewer.jobTitle, path: `/about/authors/${reviewer.slug}` },
          material: ["Glass fiber", "Polyester resin", "Vinyl ester resin", "Polyurethane resin"],
          additionalProperty: [
            { name: "Bearing-bar forms", value: "Pultruded I-bar and T-bar" },
            { name: "Series", value: "Pedestrian T-bar, industrial I-bar, high-load HI/HL, high-open SI" },
            { name: "Compatible F1 clips", value: "M, J and T clip kits in 316 stainless steel" },
          ],
        })}
      />

      <PageHeader
        tag="Pultruded Grating · F1-GRID-P"
        title="Pultruded FRP Grating Manufacturer — T-Bar, I-Bar & High-Load Series"
        description="Open pultruded fiberglass grating with one-way T-bar and I-bar bearing systems, manual-verified pedestrian, industrial, high-load and high-open series, plus matched M/J/T 316SS clips."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Pultruded FRP Grating" },
        ]}
      />

      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[8px] bg-bg2">
            <Image
              src={pultrudedGratingManualImages.hero}
              alt="Open pultruded FRP grating installed as a rooftop walking surface"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              preload
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <div>
              <SectionTag>Directional Stiffness · Longer Spans</SectionTag>
              <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Pultruded bearing bars for open, span-driven grating layouts
              </h2>
              <p className="mt-[13px] text-f19 leading-golden text-t2">
                For F1&apos;s glass-reinforced products, pultruded fiberglass grating means an open, one-way glass-fiber-reinforced polymer (GFRP) panel assembled from pultruded I-bar or T-bar bearing members and cross-rods. Project specifications often call the same product pultruded FRP grating; the quoted series, resin system, surface and load/deflection table still control.
              </p>
              <p className="mt-[21px] text-f15 leading-golden text-t2">
                Every selection starts with the clear span and bearing-bar direction. Match the series to load, deflection, resin, fire, slip and opening requirements; then issue the panel cut plan and M/J/T hold-down arrangement on the approved project drawing.
              </p>
            </div>

            <aside className="space-y-[13px] rounded-[8px] border border-teal-border bg-teal-bg p-[21px] sm:p-[34px]">
              <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">Other surface families</p>
              <div>
                <h3 className="text-f17 font-bold text-t1">Need bidirectional molded mesh?</h3>
                <Link href="/products/molded-frp-grating" className="mt-[8px] inline-flex text-f13 font-bold text-teal-text hover:text-teal">
                  View molded FRP grating →
                </Link>
              </div>
              <div className="border-t border-teal-border pt-[13px]">
                <h3 className="text-f17 font-bold text-t1">Need a continuous closed-profile surface?</h3>
                <Link href="/products/frp-deck-panels" className="mt-[8px] inline-flex text-f13 font-bold text-teal-text hover:text-teal">
                  View structural FRP deck panels →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <figure>
            <div className="relative aspect-[125/41] overflow-hidden rounded-[8px] bg-bg2">
              <Image
                src={pultrudedGratingManualImages.closeup}
                alt="Close-up of yellow pultruded FRP grating bearing bars with a rough walking surface and transverse cross-rods"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              Manual-derived pultruded grating close-up. The photograph shows bar and cross-rod construction but does not establish a specific series, resin or slip rating.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Pultruded Product Configurations</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">T-bar, I-bar, high-load and high-open systems</h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            {pultrudedConfigurations.map((configuration) => (
              <article key={configuration.name} className="rounded-[8px] border border-border-default bg-white p-[21px] sm:p-[34px]">
                <h3 className="text-f19 font-bold text-t1">{configuration.name}</h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{configuration.description}</p>
                <dl className="mt-[21px]">
                  {configuration.specs.map((spec) => (
                    <div key={spec.label} className="grid gap-[4px] border-t border-border-default py-[9px] sm:grid-cols-[150px_1fr] sm:gap-[13px]">
                      <dt className="text-f11 font-bold uppercase tracking-wide text-t3">{spec.label}</dt>
                      <dd className="text-f13 leading-golden text-t2">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pultruded-grating-specifications" className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Pultruded Series Data</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Common I-bar and T-bar production configurations</h2>
          <p className="mt-[13px] max-w-[980px] text-f15 leading-golden text-t2">
            The 36 rows below are transcribed from the manual overview table. They are nominal catalog data for series selection, not certified order values. Detailed cards in the same manual contain internal conflicts, so the F1 quotation, approved drawing and order-specific datasheet control.
          </p>
          <div className="mt-[34px] space-y-[13px]">
            {pultrudedGratingSpecGroups.map((group, index) => (
              <details key={group.name} open={index < 2} className="group rounded-[8px] border border-border-default bg-white">
                <summary className="cursor-pointer list-none px-[21px] py-[16px] sm:px-[34px]">
                  <div className="flex items-center justify-between gap-[13px]">
                    <div>
                      <h3 className="text-f17 font-bold text-t1">{group.name}</h3>
                      <p className="mt-[4px] text-f12 leading-golden text-t3">{group.description}</p>
                    </div>
                    <span aria-hidden="true" className="text-f19 font-bold text-teal-text transition-transform group-open:rotate-45">+</span>
                  </div>
                </summary>
                <div className="border-t border-border-default px-[13px] pb-[21px] sm:px-[34px] sm:pb-[34px]">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] border-collapse text-left">
                      <thead>
                        <tr className="border-b-2 border-border-default">
                          <th className="py-[13px] pr-[21px] text-f12 font-bold uppercase tracking-wide text-t1">Type</th>
                          <th className="py-[13px] pr-[21px] text-f12 font-bold uppercase tracking-wide text-t1">Depth (mm)</th>
                          <th className="py-[13px] pr-[21px] text-f12 font-bold uppercase tracking-wide text-t1">Bearing-bar center (mm)</th>
                          <th className="py-[13px] pr-[21px] text-f12 font-bold uppercase tracking-wide text-t1">Cross-bar center (mm)</th>
                          <th className="py-[13px] pr-[21px] text-f12 font-bold uppercase tracking-wide text-t1">Open area</th>
                          <th className="py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">Weight (kg/m²)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.rows.map((row) => (
                          <tr key={row.type} className="border-b border-border-default last:border-b-0">
                            <td className="py-[11px] pr-[21px] text-f14 font-semibold text-t1">{row.type}</td>
                            <td className="py-[11px] pr-[21px] text-f14 font-semibold text-teal-text">{row.depth}</td>
                            <td className="py-[11px] pr-[21px] text-f14 text-t2">{row.bearingBarCenter}</td>
                            <td className="py-[11px] pr-[21px] text-f14 text-t2">{row.crossBarCenter}</td>
                            <td className="py-[11px] pr-[21px] text-f14 text-t2">{row.openArea}</td>
                            <td className="py-[11px] text-f14 text-t2">{row.weight}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>
            ))}
          </div>
          <p className="mt-[13px] text-f12 leading-golden text-t3">
            Cross-bar center is listed as 152.40 mm throughout the overview table. Accessibility, maximum panel size, stock status, resin, surface and load capacity require separate order confirmation.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Selection & Approval Checks</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Four checks before releasing a pultruded grating layout</h2>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-4">
            {selectionChecks.map((item, index) => (
              <article key={item.title} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-teal text-f12 font-bold text-white">{index + 1}</span>
                <h3 className="mt-[13px] text-f17 font-bold text-t1">{item.title}</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GratingClipGuide family="pultruded" />

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Walking Surface Options</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Concave, fine-grit and coarse-grit pultruded surfaces</h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {antiSlipGrades.map((grade) => (
              <article key={grade.grade} className="rounded-[8px] border border-border-default bg-white p-[21px] sm:p-[34px]">
                <h3 className="text-f17 font-bold text-t1">{grade.grade}</h3>
                <p className="mt-[13px] text-f14 leading-golden text-t2">{grade.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks groups={[
        { title: "Related FRP products", links: [
          { href: "/products/frp-deck-panels", label: "Structural FRP deck panels — closed-profile surface" },
          { href: "/products/molded-frp-grating", label: "Molded FRP grating — square & mini mesh" },
          { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
          { href: "/products/frp-stair-treads", label: "Pultruded T-bar stair treads" },
          { href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" },
          { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beam supports" },
        ]},
        { title: "Applications", links: [
          { href: "/applications/frp-pedestrian-bridge-superstructures", label: "Pedestrian bridge superstructures" },
          { href: "/industries/marine", label: "Marine & offshore gratings" },
          { href: "/industries/industrial", label: "Industrial access platforms" },
          { href: "/case-studies/coastal-marina-walkway", label: "Coastal marina walkway" },
        ]},
        { title: "Technical resources", links: [
          { href: "#pultruded-grating-specifications", label: "Pultruded I-bar & T-bar specifications" },
          { href: "#grating-clips", label: "M/J/T clips & 316SS hardware" },
          { href: "/technology/frp-vs-steel-gratings", label: "FRP grating vs steel" },
          { href: "/resources/design-guides", label: "Grating design guides" },
          { href: "/resources/technical-data", label: "Load tables & technical data" },
        ]},
      ]} />

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]"><FAQ items={faqItems} /></div>
      </section>

      <AskAICard prefill="I need pultruded FRP grating for [application]. Candidate I-bar/T-bar series [or unsure], clear span [mm], support width [mm], uniform and point loads [details], deflection limit [L/...], opening/accessibility requirement [details], resin/chemical exposure [details], support flange and underside access [details]. Please select the panel series, M/J/T 316SS clips and required load-table/approval documents." />

      <InnerCTA title="Need pultruded I-bar or T-bar grating with matched 316SS clip kits?" />
    </>
  );
}
