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
  frpStakeApplications,
  frpStakeImageAssets,
  frpStakePublicSources,
  frpStakeReferenceSizes,
} from "@/content/data/frpStakeSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/fiberglass-stakes";
const seoTarget = getSeoQueryTarget(pagePath);
const publishedAt = "2026-08-30";
const updatedAt = "2026-08-30";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: "/products/fiberglass-stakes/opengraph-image",
});

const quickFacts = [
  { value: "5–19 mm", label: "public-market diameter planning band" },
  { value: "1.07–1.83 m", label: "common listed length references" },
  { value: "5 colors", label: "green, blue-green, gray, white and orange" },
  { value: "2 surfaces", label: "smooth or optional handling veil" },
];

const selectionInputs = [
  {
    title: "Mature height and supported load",
    body: "Describe the mature plant, crop, marker or attachment—not only its current height. Fruit, foliage, snow and accessories can control the real demand.",
  },
  {
    title: "Wind and impact exposure",
    body: "State the site wind, row orientation, machinery clearance and expected contact. Flexibility is a design variable; it is not a universal impact rating.",
  },
  {
    title: "Soil and embedment",
    body: "Give soil type, available insertion depth, drainage and whether the end is driven, pre-augered or installed into a sleeve. The exposed height depends on embedment.",
  },
  {
    title: "Tie, clip or wire interface",
    body: "Name the attachment and its spacing. Soft horticultural ties, trellis wire, reflectors and fence insulators create different local loads and abrasion points.",
  },
  {
    title: "Surface and handling",
    body: "Choose a smooth resin-rich finish or request a surface veil when repeated handling and surface integrity matter. Confirm cut-end sealing and inspection criteria.",
  },
  {
    title: "Color, packing and destination",
    body: "Specify color, cut length, tapered or flat ends, bundle count, pallet limits, labeling, quantity, destination and Incoterm for a binding export quotation.",
  },
] as const;

const comparisonRows = [
  {
    topic: "Moisture and corrosion",
    frp: "Does not rust; resin and surface system still need to match UV, chemicals and temperature",
    natural: "Can absorb moisture, rot, split or vary from cane to cane",
    steel: "Can rust after coating damage or repeated wet exposure",
  },
  {
    topic: "Weight and handling",
    frp: "Low mass and consistent round geometry for bundled transport and repeated placement",
    natural: "Usually light, with natural variation in diameter and straightness",
    steel: "Higher density; long bundles and repeated field handling are heavier",
  },
  {
    topic: "Flexibility after contact",
    frp: "Diameter, fiber architecture and resin tune the response; qualify repeated-impact needs",
    natural: "May bend, split or snap depending on species, moisture and defects",
    steel: "High stiffness, but overload can leave permanent bends",
  },
  {
    topic: "Electrical behavior",
    frp: "Glass-fiber/polymer rod is normally insulating; wet contamination and attachments still need review",
    natural: "Generally low conductivity, but moisture content changes behavior",
    steel: "Electrically conductive",
  },
  {
    topic: "Surface consistency",
    frp: "Controlled color and finish; optional veil can improve handling-surface integrity",
    natural: "Knots, splinters and taper vary by plant and processing",
    steel: "Coating, rust and cut ends need handling controls",
  },
] as const;

const rfqInputs = [
  "Application and supported item",
  "Diameter or flexibility target",
  "Overall and exposed length",
  "Embedment and ground condition",
  "Smooth or surface-veil finish",
  "Tapered, flat or capped ends",
  "Color, reflector or identification",
  "Quantity, pack, destination and Incoterm",
] as const;

const faqItems = [
  {
    question: "What are fiberglass stakes made from?",
    answer:
      "Fiberglass stakes are normally pultruded solid round rods made from continuous glass fibers held in a thermoset polymer resin. A resin-rich surface or optional veil protects the outer fibers. The exact glass architecture, resin, UV package, color and finish must be tied to the quoted production grade.",
  },
  {
    question: "Which fiberglass stake sizes are available?",
    answer:
      "Public wholesale listings commonly span about 5 to 19 mm diameter and 1.07 to 1.83 m length. F1 uses that band for RFQ planning, then confirms the offered diameter, tolerance, cut length, end treatment, color, surface and pack count in the quotation. Do not treat the market table as a certified stock schedule.",
  },
  {
    question: "Are FRP stakes better than bamboo or wood stakes?",
    answer:
      "They are more consistent in diameter and straightness and do not rot or rust, which can support repeated outdoor use. Bamboo and wood may still be the lower-cost or biodegradable choice for short seasonal use. Compare the full program cost, handling, required stiffness and end-of-life plan instead of choosing by material name alone.",
  },
  {
    question: "Can fiberglass plant stakes be cut or sharpened?",
    answer:
      "Yes, but cutting FRP creates glass-fiber dust and exposes the composite end. Use suitable PPE, local dust extraction and carbide or diamond tooling, then deburr and seal the cut end with a compatible resin. A factory-tapered or finished end is preferable for repeat orders.",
  },
  {
    question: "Are fiberglass stakes electrically safe?",
    answer:
      "A clean glass-fiber/polymer rod is normally electrically insulating, unlike steel. That does not make an assembled stake system automatically safe around energized equipment: moisture, contamination, reflectors, fasteners, wires and minimum approach distances still require a site-specific electrical review.",
  },
  {
    question: "How long do fiberglass stakes last outdoors?",
    answer:
      "There is no defensible universal year count. Outdoor life depends on resin, UV stabilization, surface veil, color, temperature, chemicals, flexing, impact, cut ends and inspection. Put the service environment and acceptance criteria on the RFQ if a durability commitment is required.",
  },
  {
    question: "What should a wholesale fiberglass stake RFQ include?",
    answer:
      "Send the application, diameter or stiffness target, overall and exposed length, embedment method, color, surface veil, end treatment, ties or accessories, quantity, bundle and pallet limits, labeling, test requirements, destination and Incoterm. A sample approval is recommended before a volume production run.",
  },
];

export default function FiberglassStakesPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass Stakes for Plant Support and Site Marking",
          description: seoTarget.description,
          path: pagePath,
          image: frpStakeImageAssets.hero,
          category: "Pultruded fiberglass stakes and marker rods",
          productLine: "F1-STRUX Fiberglass Stakes",
          schemaType: "CollectionPage",
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: {
            name: author.fullName,
            jobTitle: author.jobTitle,
            path: `/about/authors/${author.slug}`,
          },
          reviewedBy: {
            name: reviewer.fullName,
            jobTitle: reviewer.jobTitle,
            path: `/about/authors/${reviewer.slug}`,
          },
          material: ["Pultruded glass fiber reinforced polymer", "Thermoset resin"],
        })}
      />

      <PageHeader
        tag="Plant Support & Site Marking · F1-STRUX"
        title="Fiberglass stakes for plants, trees, vineyards and marking"
        description="Factory-direct pultruded FRP stakes for plant support, nursery trees, vineyard training, garden crops and site identification. Start with the 5–19 mm public-market planning band below, then release the actual diameter, length, surface, color and end treatment by quotation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Fiberglass Stakes" },
        ]}
      />

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-[34px]">
          <div>
            <SectionTag>Fiberglass Stakes Manufacturer</SectionTag>
            <h2 className="mt-[13px] text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.08] text-t1">
              One pultruded rod platform, configured around the application
            </h2>
            <p className="mt-[21px] text-f17 leading-golden text-t2">
              Fiberglass stakes are solid pultruded rods built from continuous glass reinforcement and a polymer matrix. The controlled geometry, low weight and corrosion-free body make them a reusable alternative to irregular bamboo, wood stakes and steel markers when the diameter, surface and installation are selected together.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              F1 quotes <strong className="text-t1">fiberglass plant stakes</strong>, tree supports and general site-marker rods on this page. For reflective plow guides and driveway visibility programs, use the dedicated{" "}
              <Link href="/products/fiberglass-snow-markers" className="font-semibold text-teal-text hover:underline">
                fiberglass snow markers
              </Link>
              {" "}page. Each application needs its own stiffness, embedment, color and accessory set.
            </p>
            <div className="mt-[29px] flex flex-wrap gap-[13px]">
              <Link href="/contact" className="rounded-[4px] bg-teal px-[21px] py-[13px] text-f14 font-bold text-white transition-colors hover:bg-teal-text">
                Request a fiberglass stake quote
              </Link>
              <a href="#sizes" className="rounded-[4px] border border-border-default bg-white px-[21px] py-[13px] text-f14 font-bold text-t1 transition-colors hover:border-teal hover:text-teal-text">
                Compare reference sizes
              </a>
            </div>
          </div>
          <figure>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[8px] border border-border-default bg-bg2">
              <Image
                src={frpStakeImageAssets.hero}
                alt="Pultruded fiberglass stakes in multiple diameters, colors and tapered-end options"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              Product visualization of diameter, color and end-treatment options. The approved sample and order specification control the delivered stake.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg2 py-[34px]">
        <div className="mx-auto grid max-w-[1280px] gap-[13px] px-[20px] sm:grid-cols-2 sm:px-[28px] lg:grid-cols-4 lg:px-[34px]">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <p className="text-f24 font-extrabold text-teal-text">{fact.value}</p>
              <p className="mt-[5px] text-f13 leading-golden text-t2">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sizes" className="scroll-mt-[120px] bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Size & Finish Planning</SectionTag>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Common fiberglass stake sizes for RFQ planning
          </h2>
          <p className="mt-[13px] max-w-[940px] text-f15 leading-golden text-t2">
            The matrix reconciles current public wholesale listings into one buyer-friendly range. It helps translate an existing SKU or field sample into metric language; it is not an F1 stock promise, load table or certified design schedule.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead className="bg-bg2">
                <tr>
                  {[
                    "Nominal diameter",
                    "Metric reference",
                    "Listed length reference",
                    "Public pack reference",
                    "Surface / color",
                    "Planning use",
                  ].map((heading) => (
                    <th key={heading} className="px-[16px] py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {frpStakeReferenceSizes.map((row) => (
                  <tr key={row.nominalDiameter} className="border-t border-border-default align-top">
                    <th className="px-[16px] py-[14px] text-f14 font-bold text-t1">{row.nominalDiameter}</th>
                    <td className="px-[16px] py-[14px] text-f14 text-t2">{row.metricDiameter}</td>
                    <td className="px-[16px] py-[14px] text-f14 text-t2">{row.referenceLengths}</td>
                    <td className="px-[16px] py-[14px] text-f14 text-t2">{row.publicPackReference}</td>
                    <td className="px-[16px] py-[14px] text-f14 text-t2">{row.surfaceAndColor}</td>
                    <td className="px-[16px] py-[14px] text-f14 leading-golden text-t2">{row.planningUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-[21px] rounded-[8px] border border-teal-border bg-teal-bg p-[21px]">
            <p className="text-f13 font-bold uppercase tracking-[0.12em] text-teal-text">Source and release boundary</p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              Sources were accessed on August 30, 2026 and establish only a public market reference. They do not publish diameter tolerance, bending stiffness, breaking load, resin grade, fiber content or verified outdoor life. F1 confirms those requirements for the proposed production grade before order release.
            </p>
            <ul className="mt-[13px] grid gap-[8px] md:grid-cols-3">
              {frpStakePublicSources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer nofollow" className="text-f13 font-semibold text-teal-text hover:underline">
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Selection Workflow</SectionTag>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Six inputs that select the stake before diameter
          </h2>
          <div className="mt-[34px] grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
            {selectionInputs.map((input, index) => (
              <article key={input.title} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">0{index + 1}</p>
                <h3 className="mt-[8px] text-f17 font-bold text-t1">{input.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{input.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Application Examples</SectionTag>
          <h2 className="mt-[13px] max-w-[920px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            FRP plant stakes, fiberglass tree stakes and visible marker rods
          </h2>
          <p className="mt-[13px] max-w-[920px] text-f15 leading-golden text-t2">
            These two application visualizations show how the same solid round pultrusion changes role across vineyard and nursery programs. They are selection examples—not named F1 project case studies or installation certificates.
          </p>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
            {frpStakeApplications.map((application) => (
              <figure key={application.title} className="overflow-hidden rounded-[8px] border border-border-default bg-bg2">
                <div className="relative aspect-[3/2] overflow-hidden bg-white">
                  <Image src={application.image} alt={application.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <figcaption className="p-[21px]">
                  <p className="text-f12 font-bold uppercase tracking-[0.12em] text-teal-text">{application.query}</p>
                  <h3 className="mt-[5px] text-f19 font-bold text-t1">{application.title}</h3>
                  <p className="mt-[8px] text-f14 leading-golden text-t2">{application.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep py-[55px] text-white md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <p className="text-f12 font-bold uppercase tracking-[0.14em] text-teal-300">Material comparison</p>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15]">
            Fiberglass stakes vs bamboo, wood and steel markers
          </h2>
          <p className="mt-[13px] max-w-[940px] text-f15 leading-golden text-white/75">
            FRP is strongest where consistency, corrosion resistance, repeat handling and controlled visibility justify the change. Natural stakes may remain sensible for short seasonal programs; steel may remain appropriate when maximum local stiffness governs.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-white/15">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide">Topic</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide">Fiberglass / FRP stake</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide">Bamboo / wood stake</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide">Steel marker</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.topic} className="border-t border-white/15 align-top">
                    <th className="px-[21px] py-[16px] text-f14 font-bold">{row.topic}</th>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-white/85">{row.frp}</td>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-white/70">{row.natural}</td>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-white/70">{row.steel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[0.78fr_1.22fr] lg:px-[34px]">
          <div>
            <SectionTag>Wholesale & OEM RFQ</SectionTag>
            <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
              Define the finished stake, not only the raw rod
            </h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              A complete quote locks down the product that arrives at the field: geometry, handling surface, installed end, visibility, pack count and documentation. If you only need an unfinished solid round profile, compare the separate <Link href="/products/fiberglass-structural-shapes/frp-rod" className="font-semibold text-teal-text hover:underline">fiberglass rod</Link> page. FRP rebar is a different concrete-reinforcement product with bond surfaces and code requirements.
            </p>
          </div>
          <div className="grid gap-[13px] sm:grid-cols-2">
            {rfqInputs.map((input, index) => (
              <div key={input} className="flex items-start gap-[13px] rounded-[8px] border border-border-default bg-white p-[16px]">
                <span className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full bg-teal-bg2 text-f12 font-bold text-teal-text">{index + 1}</span>
                <p className="pt-[3px] text-f14 font-semibold leading-golden text-t1">{input}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Related product routes",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-rod", label: "Solid fiberglass rods and standard sizes" },
              { href: "/products/fiberglass-snow-markers", label: "Reflective fiberglass snow and driveway markers" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions, tooling and color" },
              { href: "/products/frp-rebar", label: "FRP rebar for concrete reinforcement" },
              { href: "/pultruded-frp-profiles", label: "Complete pultruded FRP product hub" },
            ],
          },
          {
            title: "Manufacturing and qualification",
            links: [
              { href: "/technology/pultrusion-process", label: "How fiberglass rods are pultruded" },
              { href: "/technology/pultrusion-resin-systems", label: "Select the resin and UV package" },
              { href: "/technology/quality-testing", label: "Quality inspection and test evidence" },
              { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "FOB, CIF and DDP export planning" },
            ],
          },
        ]}
      />

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard prefill="I need fiberglass stakes for [plant/tree/vineyard/nursery/site marking]. Target diameter or flexibility: [ ], overall and exposed length: [ ], embedment/soil: [ ], color and visibility: [ ], surface/end treatment: [ ], quantity and pack: [ ], destination and Incoterm: [ ]. Build a quote-ready specification and flag what needs sample or test confirmation." />
      <InnerCTA title="Send your stake use case — receive a size, finish and packing review." />
    </>
  );
}
