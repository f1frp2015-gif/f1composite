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
import { buildRfqHref } from "@/lib/rfq";
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

const quoteHref = buildRfqHref({
  source: "fiberglass-snow-markers",
  product: "Fiberglass snow markers",
  productPath: pagePath,
  message: "Please quote fiberglass snow markers. I will send the construction, diameter, length, color, reflective bands, pack count and quantity.",
});

const requestItems = [
  { title: "Marker", text: "Solid or hollow, outside diameter, cut length, color, tip and cap detail." },
  { title: "Reflective bands", text: "Band count, width and position, and the tape grade or sheeting standard if one is required." },
  { title: "Packing", text: "Pack count, private label or barcode, carton and pallet limits." },
  { title: "Quantity and delivery", text: "Total quantity by size, destination and the date the markers must be on site or in store." },
];

const card = "rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]";

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
        tag="Snow markers"
        line={{ name: "Winter visibility", label: "Snow markers", mark: false }}
        title="Fiberglass snow markers for wholesale and project programs"
        description="Solid and hollow reflective driveway stakes configured by diameter, length, color, tape layout and pack count. Built for snow-removal contractors, property managers, retailers and seasonal infrastructure programs."
        facts={[
          { label: "Diameter", value: "1/4 or 5/16 in" },
          { label: "Length", value: "2–6 ft" },
          { label: "Construction", value: "Solid or hollow" },
          { label: "Reflective bands", value: "1–3" },
        ]}
        actions={{
          primary: { label: "Request a snow-marker quote", href: quoteHref },
          secondary: { label: "Review reference sizes", href: "#reference-sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Marker configurations" caption="Solid and hollow marker configurations. Final color, diameter, tape layout and end treatment follow the approved sample." bleed>
            <div className="relative aspect-[5/4]">
              <Image
                src={heroImage}
                alt="Orange, yellow, green, blue and red fiberglass snow markers with wraparound reflective bands and pointed tips"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Fiberglass Snow Markers" },
        ]}
      />
      <PageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "reference-sizes", label: "Reference sizes" },
          { id: "construction", label: "Solid or hollow" },
          { id: "applications", label: "Applications" },
          { id: "release", label: "Specification" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="overview" title="Specify the marker as a complete visibility system">
        <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-golden text-t2">
            <p className="text-f18 text-t1">
              F1 Composite supplies pultruded fiberglass snow stakes as solid rods or hollow tubes for wholesale packs and project quantities. A useful order defines the section, cut length, color, insertion tip, reflective-band layout and packaging together.
            </p>
            <p>
              Send the target sample or specification before pricing. We return a size-by-size offer with construction, tolerances, tape details, pack count, inspection points and delivery basis clearly separated.
            </p>
          </div>
          <aside className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Also called</p>
            <p className="mt-[8px] text-f16 leading-golden text-t1">Snow stakes, driveway markers, snow poles and plow guides.</p>
            <p className="mt-[10px] text-f14 leading-golden text-t2">
              For horticulture, the same pultruded rod construction is supplied as{" "}
              <Link href="/products/fiberglass-stakes" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">plant and tree stakes</Link>.
            </p>
          </aside>
        </div>
      </PageSection>

      <PageSection
        id="reference-sizes"
        title="Lock every visible and hidden detail before production"
        tone="muted"
        intro="Two markers can look identical in a listing while using different wall thicknesses, fiberglass content, tape grades or packaging. Use the matrix below as the minimum RFQ structure."
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-f14">
            <caption className="sr-only">Snow marker reference specification</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Specification item</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Reference starting point</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Order controls</th>
              </tr>
            </thead>
            <tbody>
              {specificationRows.map((row) => (
                <tr key={row.item} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{row.item}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t1">{row.standard}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.options}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[900px] text-f14 leading-golden text-t3">
          These dimensions and configurations are sourcing references, not an automatic stock commitment. The quotation and approved sample control the order-specific product.
        </p>
      </PageSection>

      <PageSection id="construction" title="Solid rod and hollow tube solve different buying priorities">
        <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-2">
          {constructionOptions.map((option) => (
            <article key={option.name} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[28px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{option.badge}</p>
              <h3 className="mt-[6px] text-f20 font-bold text-t1">{option.name}</h3>
              <p className="mt-[10px] text-f14 font-semibold leading-golden text-t1">{option.bestFor}</p>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{option.body}</p>
            </article>
          ))}
        </div>
        <div className="relative mt-[24px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14">
            <caption className="sr-only">Solid and hollow snow stakes compared</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Decision</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Solid stake</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Hollow stake</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.topic} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{row.topic}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.solid}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.hollow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        id="applications"
        title="Visibility before the first snowfall"
        tone="muted"
        intro="The best marker plan is installed before boundaries disappear. Color can separate route types, while reflective bands help an operator find the same reference under vehicle lighting and low-contrast weather."
      >
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[40px]">
          <Figure number={2} title="Road-edge markers after plowing" note="Illustrative photo" caption="High-visibility fiberglass stakes preserve the road-edge reference after plowing, even when the shoulder and drainage line are buried." bleed>
            <div className="relative aspect-[3/2]">
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
          </Figure>
          <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
            {applications.map((application) => (
              <article key={application.title} className={card}>
                <h3 className="text-f16 font-bold text-t1">{application.title}</h3>
                <p className="mt-[6px] text-f14 leading-golden text-t2">{application.body}</p>
              </article>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="release" title="Turn a generic snow pole into an order-ready specification">
        <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4">
          {selectionSteps.map((item, index) => (
            <li key={item.step} className={card}>
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p>
              <h3 className="mt-[6px] text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
            </li>
          ))}
        </ol>
        <aside className="mt-[16px] rounded-card border border-warn-border bg-warn-bg p-[20px] sm:p-[24px]">
          <h3 className="text-f16 font-bold text-t1">Public-road use needs a separate compliance decision</h3>
          <p className="mt-[6px] max-w-[900px] text-f14 leading-golden text-t2">
            A colored fiberglass stake with reflective tape is not automatically a traffic-control device. Public authorities may control geometry, color, retroreflective performance, placement and approvals. State those requirements explicitly rather than relying on a marketplace description.
          </p>
        </aside>
      </PageSection>

      <PageSection id="faq" title="Snow marker questions" tone="muted">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related profiles",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-rod", label: "Pultruded fiberglass round rod" },
              { href: "/products/fiberglass-structural-shapes/frp-tube", label: "Pultruded fiberglass round tube" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
              { href: "/products/fiberglass-stakes", label: "Fiberglass plant and tree stakes" },
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
            ],
          },
          {
            title: "Buyer resources",
            links: [
              { href: "/technology/pultrusion-process", label: "Pultrusion process" },
              { href: "/technology/pultrusion-resin-systems", label: "Resin-system selection" },
              { href: "/technology/quality-testing", label: "Quality testing" },
              { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "Supplier selection guide" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Send your snow-marker size, tape and pack specification" tone="deep">
        <ProductRfq
          product="Fiberglass snow markers"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={requestItems}
          intro="Send the target sample or specification. We return a size-by-size offer with construction, tolerances, tape details, pack count and delivery basis."
          advisorPrompt="I need fiberglass snow markers: [solid/hollow], diameter [1/4 or 5/16 in], length [ft], colors [list], reflective bands [count and position], pack count [pcs], quantity [pcs] and destination [country]. Build the RFQ checklist and flag anything I have not specified."
        />
      </PageSection>
    </>
  );
}
