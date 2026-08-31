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
  frpFixedLadderCatalogSpecs,
  frpLadderCageComponents,
  frpLadderCageLayoutReferences,
  frpLadderManualImageAssets,
  frpLadderRungCoverGroups,
  type CatalogSpecRow,
} from "@/content/data/frpLadderSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/frp-ladders";
const seoTarget = getSeoQueryTarget(pagePath);
const publishedAt = "2026-08-30";
const updatedAt = "2026-08-30";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: "/products/frp-ladders/opengraph-image",
});

const selectionInputs = [
  {
    title: "Access geometry",
    body: "State vertical rise, lower and upper landing levels, step-across or walk-through exit, available wall stand-off and all nearby obstructions.",
  },
  {
    title: "Governing standard",
    body: "Name the jurisdiction, owner specification and fixed-ladder standard. Cage, ladder-safety and personal-fall-arrest requirements are not interchangeable.",
  },
  {
    title: "Support substrate",
    body: "Identify concrete, steel, masonry or FRP framing, plus edge distances and access behind the support. The substrate controls bracket and anchor design.",
  },
  {
    title: "Environment",
    body: "List chemicals, concentration, temperature, washdown, UV and electrical exposure so the resin, surface and metal hardware can be selected for the service.",
  },
  {
    title: "Fall-protection interface",
    body: "Confirm whether the design needs a cage, vertical ladder-safety system, personal fall-arrest interface, rest platform or a combination under the adopted rules.",
  },
  {
    title: "Release package",
    body: "Approve the elevation, bracket schedule, splice locations, top transition, rung arrangement, anchor schedule and bill of materials before fabrication.",
  },
] as const;

const faqItems = [
  {
    question: "Is this a portable fiberglass ladder or a fixed FRP access ladder?",
    answer:
      "This page covers permanently mounted industrial fixed ladders assembled from FRP side rails, fluted rungs, brackets and optional access-safety components. It does not cover consumer step ladders, extension ladders or FRP cable-ladder trays.",
  },
  {
    question: "What nominal dimensions are listed for the FRP fixed ladder?",
    answer:
      "The source catalog lists 500 mm outside rail-to-rail width, 300 mm rung spacing, 32 mm outside-diameter fluted rungs with 6.4 mm wall, and 50.8 × 50.8 × 6.4 mm square side rails. These are catalog references; the approved project drawing controls the released geometry.",
  },
  {
    question: "Does a fiberglass ladder cage satisfy the fall-protection requirement?",
    answer:
      "Not automatically. The required system depends on ladder height, installation date, jurisdiction and owner standard. For U.S. general-industry fixed ladders extending more than 24 ft, OSHA 1910.28(b)(9) addresses ladder-safety or personal-fall-arrest systems; a cage may coexist but must not be treated as a universal substitute. Confirm the adopted rule before release.",
  },
  {
    question: "Can the ladder be evaluated to OSHA or ISO 14122-4?",
    answer:
      "It can be evaluated when the RFQ identifies the applicable standard and supplies the full access geometry, support substrate, fall-protection concept and load basis. The catalog dimensions alone are not a compliance certificate, and ISO 14122-4 specifically addresses permanent access to machinery within its stated scope.",
  },
  {
    question: "What are the C-shape and U-shape fiberglass rung products?",
    answer:
      "They are thin gritted covers fitted over existing steel or timber rungs. They are separate from the complete ladder's 32 mm fluted FRP tube rung and do not establish a whole-ladder load rating. Adhesive, substrate preparation and slip-test requirements must be specified for the retrofit.",
  },
  {
    question: "What should an FRP ladder RFQ include?",
    answer:
      "Send the vertical rise, clear width and stand-off, top-exit detail, wall or frame substrate, bracket locations, exposure, governing standard, cage or fall-protection concept, color, quantity and destination. A marked elevation or CAD file is the fastest route to an approved BOM and fabrication drawing.",
  },
];

function SpecTable({ rows }: { rows: readonly CatalogSpecRow[] }) {
  return (
    <div className="overflow-x-auto rounded-[8px] border border-border-default bg-white">
      <table className="w-full border-collapse text-left">
        <thead className="bg-bg2">
          <tr>
            <th className="px-[16px] py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">Component / parameter</th>
            <th className="px-[16px] py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">Nominal catalog value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.item} className="border-t border-border-default">
              <th className="px-[16px] py-[13px] text-f14 font-semibold text-t1">{row.item}</th>
              <td className="px-[16px] py-[13px] text-f14 text-t2">{row.nominalValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default function FrpLaddersPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass Fixed Ladders and Industrial FRP Access Systems",
          description: seoTarget.description,
          path: pagePath,
          image: frpLadderManualImageAssets.hero,
          category: "Fiberglass fixed ladder systems",
          productLine: "F1-STRUX Access Systems",
          schemaType: "CollectionPage",
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: { name: author.fullName, jobTitle: author.jobTitle, path: `/about/authors/${author.slug}` },
          reviewedBy: { name: reviewer.fullName, jobTitle: reviewer.jobTitle, path: `/about/authors/${reviewer.slug}` },
          material: ["Pultruded fiberglass reinforced polymer", "Molded composite fittings"],
        })}
      />

      <PageHeader
        tag="Fixed Access Systems · F1-STRUX"
        title="Fiberglass Fixed Ladders and FRP Access Systems"
        description="Industrial fixed FRP / GRP ladder assemblies with pultruded side rails, fluted rungs, mounting brackets, optional cage components and separate C/U rung-cover retrofits. Nominal catalog dimensions are shown below; the approved project drawing controls fabrication and fall-protection interfaces."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "FRP Fixed Ladders" },
        ]}
      />

      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <figure>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[8px] bg-bg2">
              <Image
                src={frpLadderManualImageAssets.hero}
                alt="Yellow fiberglass fixed ladder with circular cage hoops and vertical cage strips"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                preload
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              Manual-derived product reference, cropped to remove all source branding. It illustrates a fixed ladder and cage arrangement, not an F1 project case study or a compliance certificate.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.1fr_0.9fr] lg:px-[34px]">
          <div>
            <SectionTag>Industrial Vertical Access</SectionTag>
            <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
              A complete FRP fixed ladder is a project assembly, not a loose profile
            </h2>
            <p className="mt-[21px] text-f17 leading-golden text-t2">
              The assembly combines square pultruded side rails, fluted round rungs, rung gaskets, splice bars and project-specific wall or floor brackets. Optional hoops and cage strips form one access-safety arrangement; a vertical ladder-safety or personal-fall-arrest interface may still govern under the adopted standard.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              This product page owns the fixed industrial ladder intent. For platform-edge protection, use the separate{" "}
              <Link href="/products/frp-handrail-systems" className="font-semibold text-teal-text hover:underline">
                fiberglass handrail and guardrail systems
              </Link>
              {" "}page; for walking surfaces, use FRP stair treads or grating.
            </p>
          </div>
          <aside className="rounded-[8px] border border-teal-border bg-teal-bg p-[21px] sm:p-[34px]">
            <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">Catalog boundary</p>
            <h2 className="mt-[8px] text-f21 font-bold text-t1">Nominal dimensions, then an approved drawing</h2>
            <p className="mt-[13px] text-f14 leading-golden text-t2">
              The manual gives geometry but no whole-ladder rated load, rung proof load, anchor capacity, resin grade, fire rating or slip-test value. F1 therefore releases each ladder only after the elevation, support, fall-protection concept, BOM and connection schedule are reviewed.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Fixed Ladder Specifications</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Manual-verified nominal ladder dimensions
          </h2>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            Values are transcribed from the product manual and rebuilt as accessible HTML. They are useful for early layout and RFQ comparison, but they are not a substitute for the approved ladder elevation, load verification or anchor design.
          </p>
          <div className="mt-[34px]">
            <SpecTable rows={frpFixedLadderCatalogSpecs} />
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <figure>
              <div className="relative aspect-[37/26] overflow-hidden rounded-[8px] border border-border-default bg-white">
                <Image
                  src={frpLadderManualImageAssets.cageLayout}
                  alt="Typical FRP fixed ladder cage arrangement with hoops, strips, brackets, walk-through and catalog dimensions"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                Manual-derived typical arrangement. The catalog dimensions shown here are not current legal requirements; the project standard and approved drawing control.
              </figcaption>
            </figure>
            <div>
              <SectionTag>Optional Cage Components</SectionTag>
              <h2 className="mt-[13px] text-f24 font-bold tracking-[-0.02em] text-t1">
                Hoops, cage strips and mounting references
              </h2>
              <div className="mt-[21px]">
                <SpecTable rows={frpLadderCageComponents} />
              </div>
              <div className="mt-[21px]">
                <SpecTable rows={frpLadderCageLayoutReferences} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Rung Retrofit Accessories</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            C-shape and U-shape fiberglass ladder rung covers
          </h2>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            These gritted covers fit over existing steel or timber rungs. They are a retrofit accessory—not the complete ladder&apos;s 32 mm fluted FRP tube rung—and require a substrate, adhesive, preparation and slip-performance specification.
          </p>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <figure>
              <div className="relative aspect-[137/65] overflow-hidden rounded-[8px] border border-border-default bg-white">
                <Image
                  src={frpLadderManualImageAssets.rungCovers}
                  alt="C-shape and U-shape gritted fiberglass covers for existing ladder rungs"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                Manual-derived, supplier-neutral product crop. The source does not publish a slip coefficient, wear test or adhesive system.
              </figcaption>
            </figure>
            <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-1">
              {frpLadderRungCoverGroups.map((group) => (
                <article key={group.shape} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                  <h3 className="text-f17 font-bold text-t1">{group.shape} cover</h3>
                  <p className="mt-[5px] text-f12 font-semibold uppercase tracking-wide text-t3">Reference: {group.fitReference}</p>
                  <ul className="mt-[13px] grid gap-[8px] sm:grid-cols-2">
                    {group.sizes.map((size) => (
                      <li key={size} className="rounded-[4px] bg-bg2 px-[12px] py-[8px] text-f13 font-medium text-t2">{size}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Specification Workflow</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Six inputs that turn a catalog ladder into a releasable system
          </h2>
          <div className="mt-[34px] grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
            {selectionInputs.map((input, index) => (
              <article key={input.title} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">0{index + 1}</p>
                <h3 className="mt-[8px] text-f17 font-bold text-t1">{input.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{input.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-[34px] rounded-[8px] border border-amber-200 bg-amber-50 p-[21px] text-f14 leading-golden text-t2">
            <strong className="text-t1">Safety-standard checkpoint.</strong>{" "}
            For U.S. general industry, review{" "}
            <a href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.23" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-text hover:underline">OSHA 1910.23</a>{" "}
            and{" "}
            <a href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.28" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-text hover:underline">OSHA 1910.28</a>.
            For permanent access to machinery, confirm whether{" "}
            <a href="https://www.iso.org/standard/61283.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-text hover:underline">ISO 14122-4:2016</a>{" "}
            is within scope. Catalog cage dimensions do not themselves establish compliance.
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Complete the access system",
            links: [
              { href: "/products/frp-handrail-systems", label: "FRP handrails for ladder landings" },
              { href: "/products/frp-stair-treads", label: "Fiberglass stair treads" },
              { href: "/products/molded-frp-grating", label: "Molded FRP platform grating" },
              { href: "/products/frp-gratings", label: "Pultruded FRP walkway grating" },
            ],
          },
          {
            title: "Profiles and engineering",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "Fiberglass square tubes" },
              { href: "/products/fiberglass-structural-shapes/frp-tube", label: "Fiberglass round tubes" },
              { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant access platforms" },
              { href: "/technology/quality-testing", label: "Quality and testing" },
            ],
          },
        ]}
      />

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard prefill="I need an industrial fiberglass fixed ladder: vertical rise [mm], lower/upper landing and top-exit geometry [describe or attach drawing], support substrate [concrete/steel/FRP], wall stand-off [mm], environment [chemical/coastal/electrical], governing standard [OSHA/ISO/local], and fall-protection concept [cage/ladder-safety system]. Build the RFQ checklist and flag what needs engineering approval." />
      <InnerCTA title="Send the ladder elevation — receive a drawing-led RFQ review." />
    </>
  );
}
