import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/fiberglass-snow-markers";
const pageTitle = "Fiberglass Snow Markers & Driveway Stakes Manufacturer";
const pageDescription =
  "Wholesale fiberglass snow markers and reflective driveway stakes in solid or hollow 6.35–7.9 mm profiles, multiple lengths, colors and tape layouts.";
const heroImage =
  "/images/products/fiberglass-snow-markers/fiberglass-snow-markers-reflective-stakes.webp";
const applicationImage =
  "/images/products/fiberglass-snow-markers/reflective-fiberglass-snow-markers-winter-road.webp";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: heroImage,
});

const portfolioFacts = [
  { value: '1/4" & 5/16"', label: "common reference diameters" },
  { value: "2–6 ft", label: "reference cut-length range" },
  { value: "Solid / hollow", label: "two profile constructions" },
  { value: "1–3 bands", label: "typical reflective-tape layouts" },
];

const specificationRows = [
  {
    item: "Construction",
    standard: "Pultruded fiberglass solid rod or hollow tube",
    options: "Construction selected for stiffness, impact reserve, weight and target cost",
  },
  {
    item: "Outside diameter",
    standard: '6.35 mm (1/4 in) and 7.9 mm (5/16 in)',
    options: "Other diameters require tooling and commercial review",
  },
  {
    item: "Cut length",
    standard: "610, 914, 1,219, 1,524 and 1,829 mm",
    options: "Equivalent 2, 3, 4, 5 and 6 ft programs; custom cut lengths by MOQ",
  },
  {
    item: "Color",
    standard: "Safety orange, yellow, green, blue or red",
    options: "Pigment, surface finish and color tolerance approved against a sample",
  },
  {
    item: "Reflective treatment",
    standard: "One, two or three wraparound reflective bands",
    options: "Band width, position, color and sheeting grade stated on the purchase specification",
  },
  {
    item: "End treatment",
    standard: "Pointed insertion end with finished or capped top",
    options: "Tip geometry and tube-cap requirement matched to installation method",
  },
  {
    item: "Packing",
    standard: "Counted bundles or cartons for wholesale programs",
    options: "Pack count, label, barcode, pallet and retail-ready requirements by order",
  },
  {
    item: "Inspection",
    standard: "Diameter, length, color, tape position, quantity and appearance",
    options: "Golden sample, batch records and project-specific acceptance plan",
  },
];

const constructionOptions = [
  {
    name: "Solid fiberglass stakes",
    badge: "Contractor starting point",
    bestFor: "Repeated seasonal installation, commercial snow routes and firmer ground",
    body: "A solid pultruded rod provides more material through the section and is the conservative starting point where installation abuse, plow contact or repeated reuse is expected.",
  },
  {
    name: "Hollow fiberglass stakes",
    badge: "Weight and cost control",
    bestFor: "Residential packs, landscaped edges and high-count property programs",
    body: "A hollow tube reduces mass and material use. Wall thickness, cap design and impact acceptance should be confirmed instead of treating every tube with the same outside diameter as equivalent.",
  },
];

const applications = [
  {
    title: "Driveways and private roads",
    body: "Keep pavement edges, turning radii and culvert approaches visible after the surface is buried by snow.",
  },
  {
    title: "Snow-plow routes",
    body: "Mark curbs, islands, fire hydrants, drainage ditches and other damage-sensitive boundaries for operators.",
  },
  {
    title: "Parking and commercial sites",
    body: "Build a repeatable marker plan for entrances, walkways, loading areas and seasonal snow-storage zones.",
  },
  {
    title: "Landscape protection",
    body: "Identify lawn edges, sprinkler heads, garden beds and young plantings before winter maintenance begins.",
  },
  {
    title: "Resorts and winter facilities",
    body: "Use high-visibility color coding around service roads, paths and temporary operating boundaries.",
  },
  {
    title: "Temporary site marking",
    body: "Create removable visual references for construction, utility, survey and event layouts where permanent posts are unnecessary.",
  },
];

const selectionSteps = [
  {
    step: "01",
    title: "Map the hazards",
    body: "List every curb, drain, hydrant, edge, obstruction and route transition that must remain visible after snowfall.",
  },
  {
    step: "02",
    title: "Choose the profile",
    body: "Set solid or hollow construction, outside diameter and length from expected impact, ground condition and reuse cycle.",
  },
  {
    step: "03",
    title: "Define visibility",
    body: "Specify rod color plus the number, width, position and required grade of reflective bands. Do not accept “reflective” as the complete tape specification.",
  },
  {
    step: "04",
    title: "Approve the pack",
    body: "Lock the sample, bundle count, labels, barcodes, pallet limits and inspection plan before mass production.",
  },
];

const comparisonRows = [
  {
    topic: "Section",
    solid: "Full round fiberglass section",
    hollow: "Tubular section with controlled wall thickness",
  },
  {
    topic: "Impact reserve",
    solid: "Higher-material starting point for repeated handling",
    hollow: "Must be evaluated with wall thickness and cap detail",
  },
  {
    topic: "Shipping weight",
    solid: "Higher for the same outside diameter and length",
    hollow: "Lower, useful for high-count retail and property packs",
  },
  {
    topic: "Ground condition",
    solid: "Preferred starting point for firmer or frequently frozen ground",
    hollow: "Best where soil and installation method limit tip damage",
  },
  {
    topic: "Commercial fit",
    solid: "Contractor, municipal and reusable fleet programs",
    hollow: "Cost-sensitive wholesale and seasonal programs",
  },
];

const faqItems = [
  {
    question: "What is a fiberglass snow marker?",
    answer:
      "A fiberglass snow marker is a slender pultruded rod or tube installed before snowfall to keep driveways, curbs, hydrants, drains and other boundaries visible. It is also called a snow stake, driveway marker, snow pole or plow guide.",
  },
  {
    question: "Should I choose a solid or hollow snow stake?",
    answer:
      "Use solid rod as the conservative starting point for contractor fleets, repeated installation and higher handling abuse. Hollow tube can reduce weight and cost for high-count or residential programs, but wall thickness, cap detail and impact acceptance must be specified.",
  },
  {
    question: "Which diameters and lengths are available?",
    answer:
      "The reference program covers 6.35 mm (1/4 in) and 7.9 mm (5/16 in) outside diameters with 610 to 1,829 mm (2 to 6 ft) cut lengths. The released quotation confirms the exact construction, tolerance and available pack quantity for each size.",
  },
  {
    question: "Does reflective tape make a snow marker road-compliant?",
    answer:
      "Not by itself. Tape appearance does not prove a regulated retroreflective-sheeting class or approval for public-road traffic control. If an authority or project requires a specific sheeting standard, color, photometric value or marking, put it on the RFQ and require supporting evidence for the offered tape.",
  },
  {
    question: "How should fiberglass driveway markers be installed?",
    answer:
      "Use a suitable pilot hole or installation tool for hard, rocky or frozen ground and keep the rod supported during insertion. Do not strike an unsupported fiberglass tube or force it against buried utilities. Final embedment and spacing depend on soil, snow depth, visibility and the site hazard plan.",
  },
  {
    question: "What belongs in a wholesale snow-marker RFQ?",
    answer:
      "State solid or hollow construction, diameter, cut length, color, tip and cap detail, reflective-band count and position, tape grade, pack count, total quantity, private-label or barcode requirements, pallet limits, destination and required delivery date.",
  },
];

export default function FiberglassSnowMarkersPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass Snow Markers and Reflective Driveway Stakes",
          description: pageDescription,
          path: pagePath,
          image: heroImage,
          category: "Fiberglass Snow Markers",
          material: [
            "Pultruded fiberglass reinforced polymer",
            "Glass fiber reinforced polymer",
            "Reflective sheeting",
          ],
          schemaType: "ItemPage",
          datePublished: "2026-08-30",
          dateModified: "2026-08-30",
        })}
      />

      <PageHeader
        tag="Winter Visibility Products"
        title="Fiberglass snow markers for wholesale and project programs"
        description="Solid and hollow reflective driveway stakes configured by diameter, length, color, tape layout and pack count. Built for snow-removal contractors, property managers, retailers and seasonal infrastructure programs."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Fiberglass Snow Markers" },
        ]}
      />

      <section className="bg-white py-[55px] lg:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[34px] lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div>
            <SectionTag>Snow Stakes · Driveway Markers · Plow Guides</SectionTag>
            <h2 className="mt-[21px] max-w-[720px] text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.08] text-t1">
              Specify the marker as a complete visibility system
            </h2>
            <p className="mt-[21px] max-w-[720px] text-f15 leading-golden text-t2">
              F1 Composite supplies pultruded fiberglass snow stakes as solid rods or
              hollow tubes for wholesale packs and project quantities. A useful order
              defines the section, cut length, color, insertion tip, reflective-band
              layout and packaging together.
            </p>
            <p className="mt-[13px] max-w-[720px] text-f15 leading-golden text-t2">
              Send the target sample or specification before pricing. We return a
              size-by-size offer with construction, tolerances, tape details, pack
              count, inspection points and delivery basis clearly separated.
            </p>
            <div className="mt-[29px] flex flex-wrap gap-[13px]">
              <Link
                href="/contact"
                className="rounded-[4px] bg-teal px-[21px] py-[13px] text-f14 font-bold text-white transition-colors hover:bg-teal-text"
              >
                Request a snow-marker quote
              </Link>
              <a
                href="#reference-sizes"
                className="rounded-[4px] border border-border-default bg-white px-[21px] py-[13px] text-f14 font-bold text-t1 transition-colors hover:border-teal hover:text-teal-text"
              >
                Review reference sizes
              </a>
            </div>
          </div>

          <figure>
            <div className="relative aspect-square overflow-hidden rounded-[8px] border border-border-default bg-bg2">
              <Image
                src={heroImage}
                alt="Orange, yellow, green, blue and red fiberglass snow markers with wraparound reflective bands and pointed tips"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              Catalog visualization of solid and hollow marker configurations. Final
              color, diameter, tape layout and end treatment follow the approved sample.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg2 py-[34px]">
        <div className="mx-auto grid max-w-[1280px] gap-[13px] px-[34px] sm:grid-cols-2 lg:grid-cols-4">
          {portfolioFacts.map((fact) => (
            <div key={fact.label} className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <p className="text-f24 font-extrabold text-teal-text">{fact.value}</p>
              <p className="mt-[5px] text-f13 leading-golden text-t2">{fact.label}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-[13px] max-w-[1280px] px-[34px] text-f12 leading-golden text-t3">
          These dimensions and configurations are sourcing references, not an
          automatic stock commitment. The quotation and approved sample control the
          order-specific product.
        </p>
      </section>

      <section id="reference-sizes" className="scroll-mt-[120px] bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Reference product matrix</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Lock every visible and hidden detail before production
          </h2>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            Two markers can look identical in a listing while using different wall
            thicknesses, fiberglass content, tape grades or packaging. Use the matrix
            below as the minimum RFQ structure.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead className="bg-bg2">
                <tr>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Specification item</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Reference starting point</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Order controls</th>
                </tr>
              </thead>
              <tbody>
                {specificationRows.map((row) => (
                  <tr key={row.item} className="border-t border-border-default align-top">
                    <th className="px-[21px] py-[16px] text-f14 font-bold text-t1">{row.item}</th>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-t2">{row.standard}</td>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-t2">{row.options}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Construction choice</SectionTag>
          <h2 className="mt-[21px] max-w-[860px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Solid rod and hollow tube solve different buying priorities
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            {constructionOptions.map((option) => (
              <article key={option.name} className="rounded-[8px] border border-border-default bg-white p-[29px]">
                <p className="text-f12 font-bold uppercase tracking-[0.12em] text-teal-text">{option.badge}</p>
                <h3 className="mt-[8px] text-f19 font-extrabold text-t1">{option.name}</h3>
                <p className="mt-[13px] text-f13 font-semibold leading-golden text-t1">{option.bestFor}</p>
                <p className="mt-[13px] text-f14 leading-golden text-t2">{option.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-white">
                <tr>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Decision</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Solid stake</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Hollow stake</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.topic} className="border-t border-border-default align-top">
                    <th className="px-[21px] py-[16px] text-f14 font-bold text-t1">{row.topic}</th>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-t2">{row.solid}</td>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-t2">{row.hollow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionTag>Applications</SectionTag>
              <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Visibility before the first snowfall
              </h2>
              <p className="mt-[21px] text-f15 leading-golden text-t2">
                The best marker plan is installed before boundaries disappear. Color
                can separate route types, while reflective bands help an operator find
                the same reference under vehicle lighting and low-contrast weather.
              </p>
              <figure className="mt-[29px]">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[8px] border border-border-default bg-bg2">
                  <Image
                    src={applicationImage}
                    alt="Orange fiberglass snow markers lining a plowed mountain road after heavy snowfall"
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 1024px) calc(100vw - 68px), 40vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                  High-visibility fiberglass stakes preserve the road-edge reference
                  after plowing, even when the shoulder and drainage line are buried.
                </figcaption>
              </figure>
            </div>
            <div className="grid gap-[13px] sm:grid-cols-2">
              {applications.map((application) => (
                <article key={application.title} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                  <h3 className="text-f15 font-bold text-t1">{application.title}</h3>
                  <p className="mt-[8px] text-f14 leading-golden text-t2">{application.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deep py-[89px] text-white">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <p className="text-f12 font-bold uppercase tracking-[0.14em] text-teal-300">Four-step release</p>
          <h2 className="mt-[13px] max-w-[840px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15]">
            Turn a generic snow pole into an order-ready specification
          </h2>
          <div className="mt-[34px] grid gap-[13px] md:grid-cols-2 xl:grid-cols-4">
            {selectionSteps.map((item) => (
              <article key={item.step} className="rounded-[8px] border border-white/15 bg-white/5 p-[21px]">
                <p className="text-f13 font-extrabold text-teal-300">{item.step}</p>
                <h3 className="mt-[8px] text-f17 font-bold">{item.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-white/70">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-[21px] rounded-[8px] border border-amber-300/35 bg-amber-300/10 p-[21px]">
            <p className="text-f14 font-bold text-white">Public-road use needs a separate compliance decision</p>
            <p className="mt-[8px] text-f14 leading-golden text-white/75">
              A colored fiberglass stake with reflective tape is not automatically a
              traffic-control device. Public authorities may control geometry, color,
              retroreflective performance, placement and approvals. State those
              requirements explicitly rather than relying on a marketplace description.
            </p>
          </div>
        </div>
      </section>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related profiles",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-rod", label: "Pultruded fiberglass round rod" },
              { href: "/products/fiberglass-structural-shapes/frp-tube", label: "Pultruded fiberglass round tube" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
              { href: "/products/frp-rebar", label: "FRP rebar" },
              { href: "/pultruded-frp-profiles", label: "All FRP products" },
            ],
          },
          {
            title: "Application markets",
            links: [
              { href: "/industries/infrastructure", label: "Infrastructure" },
              { href: "/industries/construction", label: "Construction" },
              { href: "/industries/industrial", label: "Industrial facilities" },
              { href: "/regions/frp-pultrusion-supplier-usa", label: "North America supply" },
              { href: "/contact", label: "Wholesale inquiry" },
            ],
          },
          {
            title: "Buyer resources",
            links: [
              { href: "/technology/pultrusion-process", label: "Pultrusion process" },
              { href: "/technology/pultrusion-resin-systems", label: "Resin-system selection" },
              { href: "/technology/quality-testing", label: "Quality testing" },
              { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "Supplier selection guide" },
              { href: "/contact", label: "Send a target sample" },
            ],
          },
        ]}
      />

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Send your snow-marker size, tape and pack specification for quotation" />
    </>
  );
}
