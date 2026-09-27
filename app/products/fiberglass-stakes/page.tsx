import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import {
  frpStakeApplications,
  frpStakeImageAssets,
  frpStakePublicSources,
  frpStakeReferenceSizes,
} from "@/content/data/frpStakeSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug, reviewerCredit } from "@/lib/authors";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/fiberglass-stakes";
const seoTarget = getSeoQueryTarget(pagePath);
const publishedAt = "2026-08-30";
const updatedAt = "2026-09-21";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: "/products/fiberglass-stakes/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "fiberglass-stakes",
  product: "Fiberglass stakes",
  productPath: pagePath,
  message: "Please quote fiberglass stakes. I will send the application, diameter, length, color, surface, end treatment, pack and quantity.",
});

const requestItems = [
  { title: "Application", text: "What the stake supports (plant, tree, vine, marker) and the diameter or flexibility target." },
  { title: "Length and ground", text: "Overall and exposed length, embedment method and the soil condition." },
  { title: "Finish", text: "Color, smooth or surface-veil finish, tapered, flat or capped ends and any reflector." },
  { title: "Quantity and delivery", text: "Quantity, bundle and pallet limits, labelling, destination and Incoterm." },
];

const card = "rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]";
const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

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
        updated={updatedAt}
        reviewer={reviewerCredit(reviewer)}
        tag="Fiberglass stakes"
        line={{ name: "F1-STRUX", label: "Fiberglass stakes" }}
        title="Fiberglass stakes for plants, trees, vineyards and marking"
        description="Factory-direct pultruded FRP stakes for plant support, nursery trees, vineyard training, garden crops and site identification. Start with the 5–19 mm public-market planning band below, then release the actual diameter, length, surface, color and end treatment by quotation."
        facts={[
          { label: "Diameter band", value: "5–19 mm" },
          { label: "Lengths", value: "1.07–1.83 m" },
          { label: "Surface", value: "Smooth or veil" },
          { label: "Ends", value: "Tapered or flat" },
        ]}
        actions={{
          primary: { label: "Request a stake quote", href: quoteHref },
          secondary: { label: "Compare reference sizes", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Diameters, colors and ends" note="Visualization" caption="Product visualization of diameter, color and end-treatment options. The approved sample and order specification control the delivered stake." bleed>
            <div className="relative aspect-[3/2]">
              <Image
                src={frpStakeImageAssets.hero}
                alt="Pultruded fiberglass stakes in multiple diameters, colors and tapered-end options"
                fill
                preload
                sizes="(max-width: 1023px) 94vw, 44vw"
                className="object-cover"
              />
            </div>
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Fiberglass Stakes" },
        ]}
      />
      <PageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "sizes", label: "Sizes" },
          { id: "selection", label: "Selection" },
          { id: "applications", label: "Applications" },
          { id: "comparison", label: "Materials" },
          { id: "checklist", label: "Checklist" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="overview" title="One pultruded rod platform, configured around the application">
        <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-golden text-t2">
            <p className="text-f18 text-t1">
              Fiberglass stakes are solid pultruded rods built from continuous glass reinforcement and a polymer matrix. The controlled geometry, low weight and corrosion-free body make them a reusable alternative to irregular bamboo, wood stakes and steel markers when the diameter, surface and installation are selected together.
            </p>
            <p>
              F1 quotes fiberglass plant stakes, tree supports and general site-marker rods on this page. For reflective plow guides and driveway visibility programs, use the dedicated{" "}
              <Link href="/products/fiberglass-snow-markers" className={link}>fiberglass snow markers</Link> page. Each application needs its own stiffness, embedment, color and accessory set.
            </p>
          </div>
          <aside className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Planning a growing program?</p>
            <p className="mt-[8px] text-f16 leading-golden text-t1">
              The agriculture and horticulture guide covers crop-specific selection inputs, field trials and a step-by-step route to bulk supply.
            </p>
            <Link href="/applications/agriculture-horticulture-stakes" className={`mt-[12px] inline-block text-f14 ${link}`}>
              Read the application guide
            </Link>
          </aside>
        </div>
      </PageSection>

      <PageSection
        id="sizes"
        title="Common fiberglass stake sizes for RFQ planning"
        tone="muted"
        intro="The matrix reconciles current public wholesale listings into one buyer-friendly range. It helps translate an existing SKU or field sample into metric language; it is not an F1 stock promise, load table or certified design schedule."
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[920px] border-collapse text-left text-f14">
            <caption className="sr-only">Common fiberglass stake sizes from public wholesale listings</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Nominal diameter", "Metric reference", "Listed length reference", "Public pack reference", "Surface / color", "Planning use"].map((heading) => (
                  <th key={heading} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {frpStakeReferenceSizes.map((row) => (
                <tr key={row.nominalDiameter} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{row.nominalDiameter}</th>
                  <td className="whitespace-nowrap px-[14px] py-[10px] text-t1">{row.metricDiameter}</td>
                  <td className="px-[14px] py-[10px] text-t2">{row.referenceLengths}</td>
                  <td className="px-[14px] py-[10px] text-t2">{row.publicPackReference}</td>
                  <td className="px-[14px] py-[10px] text-t2">{row.surfaceAndColor}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.planningUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-[16px] grid grid-cols-1 items-start gap-[16px] rounded-card border border-border-default bg-white p-[20px] sm:p-[24px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-[40px]">
          <div>
            <h3 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Source and release boundary</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              Sources were accessed on August 30, 2026 and establish only a public market reference. They do not publish diameter tolerance, bending stiffness, breaking load, resin grade, fiber content or verified outdoor life. F1 confirms those requirements for the proposed production grade before order release.
            </p>
          </div>
          <ul className="divide-y divide-border-default border-y border-border-default">
            {frpStakePublicSources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer nofollow" className="flex min-h-[44px] items-center justify-between gap-[12px] py-[10px] text-f14 font-semibold text-t1 transition-colors hover:text-teal-text">
                  {source.label}
                  <span aria-hidden className="text-teal-text">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection id="selection" title="Six inputs that select the stake before diameter">
        <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {selectionInputs.map((input, index) => (
            <li key={input.title} className={card}>
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Input {index + 1}</p>
              <h3 className="mt-[6px] text-f18 font-bold text-t1">{input.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{input.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        id="applications"
        title="FRP plant stakes, fiberglass tree stakes and visible marker rods"
        tone="muted"
        intro="These two application visualizations show how the same solid round pultrusion changes role across vineyard and nursery programs. They are selection examples, not named F1 project case studies or installation certificates."
      >
        <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
          {frpStakeApplications.map((application, index) => (
            <Figure key={application.title} number={index + 2} title={application.title} note="Visualization" caption={application.body} bleed>
              <div className="relative aspect-[3/2]">
                <Image src={application.image} alt={application.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </Figure>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="comparison"
        title="Fiberglass stakes vs bamboo, wood and steel markers"
        intro="FRP is strongest where consistency, corrosion resistance, repeat handling and controlled visibility justify the change. Natural stakes may remain sensible for short seasonal programs; steel may remain appropriate when maximum local stiffness governs."
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[920px] border-collapse text-left text-f14">
            <caption className="sr-only">Fiberglass stakes compared with bamboo, wood and steel</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Topic</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Fiberglass / FRP stake</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Bamboo / wood stake</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Steel marker</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.topic} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[12px] font-semibold text-t1">{row.topic}</th>
                  <td className="px-[14px] py-[12px] leading-golden text-t1">{row.frp}</td>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{row.natural}</td>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{row.steel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="checklist" title="Define the finished stake, not only the raw rod" tone="muted">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[48px]">
          <p className="text-f16 leading-golden text-t2">
            A complete quote locks down the product that arrives at the field: geometry, handling surface, installed end, visibility, pack count and documentation. If you only need an unfinished solid round profile, compare the separate{" "}
            <Link href="/products/fiberglass-structural-shapes/frp-rod" className={link}>fiberglass rod</Link> page. FRP rebar is a different concrete-reinforcement product with bond surfaces and code requirements.
          </p>
          <ol className="grid grid-cols-1 gap-x-[24px] sm:grid-cols-2">
            {rfqInputs.map((input, index) => (
              <li key={input} className="flex items-baseline gap-[12px] border-b border-border-default py-[12px]">
                <span className="font-mono text-f12 text-t3">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-f14 font-semibold text-t1">{input}</span>
              </li>
            ))}
          </ol>
        </div>
      </PageSection>

      <PageSection id="faq" title="Fiberglass stake questions">
        <FAQList items={faqItems} />
      </PageSection>

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

      <PageSection id="quote" title="Send your stake use case" tone="deep">
        <ProductRfq
          product="Fiberglass stakes"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={requestItems}
          intro="Describe the use and the stake you have now. We return a size, finish and packing review, with a sample before a volume run."
          advisorPrompt="I need fiberglass stakes for [plant/tree/vineyard/nursery/site marking]. Target diameter or flexibility: [ ], overall and exposed length: [ ], embedment/soil: [ ], color and visibility: [ ], surface/end treatment: [ ], quantity and pack: [ ], destination and Incoterm: [ ]. Build a quote-ready specification and flag what needs sample or test confirmation."
        />
      </PageSection>
    </>
  );
}
