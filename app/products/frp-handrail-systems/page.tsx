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
  frpHandrailCatalogSystems,
  frpHandrailManualImageAssets,
  type HandrailCatalogSystem,
} from "@/content/data/frpHandrailSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/frp-handrail-systems";
const seoTarget = getSeoQueryTarget(pagePath);
const publishedAt = "2026-04-04";
const updatedAt = "2026-08-30";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: "/products/frp-handrail-systems/opengraph-image",
});

const specificationInputs = [
  {
    title: "Layout and terminology",
    body: "Mark straight runs, corners, gates, stair flights, returns and openings. State whether each run functions as a handrail, guardrail or combined stair-rail system under the adopted code.",
  },
  {
    title: "Load basis",
    body: "Provide the governing point load, line load, infill load and deflection criteria. Post spacing, rail section, joints, bases and substrate must be checked together.",
  },
  {
    title: "Base and substrate",
    body: "Identify concrete, steel, FRP framing or side-mount conditions, with slab edge distance and available fixing depth. Catalog anchor sizes are not a universal anchorage design.",
  },
  {
    title: "Exposure and finish",
    body: "List chemicals, concentration, temperature, outdoor UV, washdown and electrical conditions. Resin, color, veil and metal hardware are then selected for the actual service.",
  },
  {
    title: "Kick plate and openings",
    body: "State toe-board requirements, platform edge detail, allowable openings and interfaces with grating, deck panels, ladders and stair treads.",
  },
  {
    title: "Approved release set",
    body: "Release the post schedule, tube system, fitting types, splice locations, base details, anchor schedule and BOM before production or field drilling.",
  },
] as const;

const faqItems = [
  {
    question: "What is the difference between an FRP handrail and an FRP guardrail?",
    answer:
      "A handrail provides a graspable support along a stair or walking route. A guardrail protects an exposed edge and includes top rail, intermediate protection and sometimes a toe board. One assembly can perform both functions only when its geometry, graspability, loads and mounting satisfy the governing requirements for both.",
  },
  {
    question: "What square-tube fiberglass handrail sizes are listed?",
    answer:
      "The source catalog lists 50 × 50 × 6.4 mm square top and middle rails, a 38 × 38 × 6.4 mm insert splice, 100 × 14 × 3 mm kick plate, 1,500 mm maximum post spacing and 1,220 mm maximum height. These are nominal catalog references, not a blanket load-compliance statement.",
  },
  {
    question: "What round-tube FRP handrail components are listed?",
    answer:
      "The catalog lists 50 × 5 mm round-tube notation for posts, top rails and middle rails, a 101 × 14 × 3 mm kick plate, and molded elbow, tee, cross and foot-base fittings. Final tube interpretation, fitting detail, fastener material and base anchorage are confirmed on the approved BOM and drawing.",
  },
  {
    question: "Do the fiberglass handrail systems comply with OSHA or ISO 14122-3?",
    answer:
      "They can be configured and evaluated against a stated project basis, but the catalog dimensions alone do not prove compliance. OSHA 1910.29, for example, evaluates the completed guardrail under specified forces; ISO 14122-3 has a defined machinery-access scope. Post spacing, rail section, joints, bases, anchors and substrate all affect the result.",
  },
  {
    question: "Should I choose round or square FRP handrail?",
    answer:
      "Choose from the required handrail function, project geometry, fitting strategy, visual preference and approved load check. The round system uses molded tee, elbow and cross fittings; the square system uses internal splices and fabricated corner details. Do not swap components between the two catalog systems without a revised BOM.",
  },
  {
    question: "What information is needed for an industrial FRP handrail quote?",
    answer:
      "Send total run, plan and elevations, stair slopes, height and post-spacing limits, governing load standard, base substrate, kick-plate requirement, exposure, color, gates and delivery destination. A marked drawing lets F1 return a coordinated post, rail, fitting, base and anchor schedule.",
  },
];

function SystemSpecification({ system }: { system: HandrailCatalogSystem }) {
  return (
    <article className="overflow-hidden rounded-[8px] border border-border-default bg-white">
      <div className="border-b border-border-default bg-bg2 p-[21px] sm:p-[24px]">
        <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">{system.shortName} system</p>
        <h3 className="mt-[5px] text-f21 font-bold text-t1">{system.name}</h3>
        <p className="mt-[8px] text-f14 leading-golden text-t2">{system.description}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="px-[16px] py-[12px] text-f11 font-bold uppercase tracking-wide text-t1">Component</th>
              <th className="px-[16px] py-[12px] text-f11 font-bold uppercase tracking-wide text-t1">Nominal catalog value</th>
            </tr>
          </thead>
          <tbody>
            {system.rows.map((row) => (
              <tr key={row.item} className="border-t border-border-default">
                <th className="px-[16px] py-[12px] text-f13 font-semibold text-t1">{row.item}</th>
                <td className="px-[16px] py-[12px] text-f13 text-t2">{row.nominalValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-amber-200 bg-amber-50 px-[16px] py-[13px] text-f12 leading-golden text-t2">
        <strong className="text-t1">Release note:</strong> {system.releaseNote}
      </p>
    </article>
  );
}
export default function HandrailSystemsPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass Handrail and Industrial FRP Guardrail Systems",
          description: seoTarget.description,
          path: pagePath,
          image: frpHandrailManualImageAssets.hero,
          category: "Fiberglass handrail and guardrail systems",
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
        tag="Edge Protection Systems · F1-STRUX"
        title="Fiberglass Handrail and Guardrail Systems"
        description="Industrial FRP handrail systems in square- and round-tube configurations, with posts, top and middle rails, kick plates, splices, molded fittings and base options. Manual-verified nominal specifications are separated from the project load, connection and anchor design."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "FRP Handrail Systems" },
        ]}
      />

      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <figure>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[8px] bg-bg2">
              <Image
                src={frpHandrailManualImageAssets.hero}
                alt="Yellow fiberglass handrail and guardrail systems installed around industrial platforms and stairs"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              Manual-derived application reference, cropped to remove all source branding. It demonstrates system context and is not presented as an F1 project case study.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.08fr_0.92fr] lg:px-[34px]">
          <div>
            <SectionTag>Complete Edge-Protection Assemblies</SectionTag>
            <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
              Specify the rail, post, fitting, kick plate and base as one system
            </h2>
            <p className="mt-[21px] text-f17 leading-golden text-t2">
              A fiberglass railing is not qualified by a tube size alone. The finished assembly transfers top-rail and intermediate-member loads through posts, splices, corner fittings, bases, anchors and the supporting substrate. F1 therefore keeps the catalog geometry visible while making the project load basis and release drawing explicit.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              This page owns the industrial handrail and guardrail intent. For vertical access, use the separate{" "}
              <Link href="/products/frp-ladders" className="font-semibold text-teal-text hover:underline">
                fiberglass fixed ladder systems
              </Link>
              {" "}page; for raw profile stock, use the round- and square-tube pages.
            </p>
          </div>
          <aside className="rounded-[8px] border border-teal-border bg-teal-bg p-[21px] sm:p-[34px]">
            <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">What the catalog establishes</p>
            <dl className="mt-[13px] grid gap-[13px] sm:grid-cols-2 lg:grid-cols-1">
              <div><dt className="text-f12 font-bold text-t1">Two systems</dt><dd className="mt-[3px] text-f14 text-t2">Square-tube and round-tube configurations</dd></div>
              <div><dt className="text-f12 font-bold text-t1">Layout references</dt><dd className="mt-[3px] text-f14 text-t2">1,500 mm maximum post spacing; 1,220 mm maximum height</dd></div>
              <div><dt className="text-f12 font-bold text-t1">Still project-specific</dt><dd className="mt-[3px] text-f14 text-t2">Loads, anchors, resin, fastener material, joints and substrate</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Manual-Verified Specifications</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Square and round FRP handrail system specifications
          </h2>
          <p className="mt-[13px] max-w-[920px] text-f15 leading-golden text-t2">
            The source tables are rebuilt below as accessible, supplier-neutral HTML. Suspect or internally conflicting fields are not silently corrected; they are withheld or carried into a release note until an approved BOM resolves them.
          </p>
          <div className="mt-[34px] grid gap-[21px] xl:grid-cols-2 xl:items-start">
            {frpHandrailCatalogSystems.map((system) => <SystemSpecification key={system.shortName} system={system} />)}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-2">
            <article>
              <SectionTag>Square-System Connections</SectionTag>
              <h2 className="mt-[13px] text-f24 font-bold tracking-[-0.02em] text-t1">Internal splices, corners and kick-plate details</h2>
              <figure className="mt-[21px]">
                <div className="relative aspect-[71/53] overflow-hidden rounded-[8px] border border-border-default bg-white">
                  <Image src={frpHandrailManualImageAssets.squareSystem} alt="Square fiberglass handrail system connection concept with splices, corner details, kick plate and optional base" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" />
                </div>
                <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                  Manual-derived connection concept. Because one illustrated middle-rail detail conflicts with the source table, the approved BOM—not this image—controls the released geometry.
                </figcaption>
              </figure>
            </article>
            <article>
              <SectionTag>Round-System Components</SectionTag>
              <h2 className="mt-[13px] text-f24 font-bold tracking-[-0.02em] text-t1">Tube, tee, elbow, cross, foot base and kick plate</h2>
              <figure className="mt-[21px]">
                <div className="relative aspect-[292/207] overflow-hidden rounded-[8px] border border-border-default bg-white">
                  <Image src={frpHandrailManualImageAssets.roundSystem} alt="Round fiberglass handrail assembly with numbered tube, tee, elbow, cross, foot-base and kick-plate components" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" />
                </div>
                <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                  Manual-derived round-system component reference. Diagram numbers identify component types only; they are not public SKUs.
                </figcaption>
              </figure>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>From Layout to Release</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Six inputs for a coordinated industrial handrail system
          </h2>
          <div className="mt-[34px] grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
            {specificationInputs.map((input, index) => (
              <article key={input.title} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">0{index + 1}</p>
                <h3 className="mt-[8px] text-f17 font-bold text-t1">{input.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{input.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-[34px] rounded-[8px] border border-amber-200 bg-amber-50 p-[21px] text-f14 leading-golden text-t2">
            <strong className="text-t1">Load-basis checkpoint.</strong>{" "}
            <a href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.29" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-text hover:underline">OSHA 1910.29</a>{" "}
            applies criteria to completed guardrail systems, while{" "}
            <a href="https://www.iso.org/standard/61282.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-text hover:underline">ISO 14122-3:2016</a>{" "}
            covers stairs, stepladders and guardrails within its machinery-access scope. Neither standard can be claimed from catalog tube sizes or post spacing alone.
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Complete the access package",
            links: [
              { href: "/products/frp-ladders", label: "Fiberglass fixed ladders for vertical access" },
              { href: "/products/frp-stair-treads", label: "FRP stair treads and covers" },
              { href: "/products/molded-frp-grating", label: "Molded FRP platform grating" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
            ],
          },
          {
            title: "System components",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-tube", label: "Fiberglass round tubes" },
              { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "Fiberglass square tubes" },
              { href: "/products/fiberglass-structural-shapes/frp-flat-bar", label: "FRP flat bars and kick plates" },
              { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant platform systems" },
            ],
          },
        ]}
      />

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard prefill="I need an industrial fiberglass handrail / guardrail system: total run and layout [attach plan/elevation], straight/stair/corner/gate conditions, governing load standard, target height and post-spacing limit, base substrate, kick-plate requirement, environment, color and destination. Compare square and round systems and list the drawing/BOM checks required before release." />
      <InnerCTA title="Send the platform or stair layout — receive a system-led RFQ review." />
    </>
  );
}
