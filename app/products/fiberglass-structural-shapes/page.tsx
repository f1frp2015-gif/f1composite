import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import { E40EvidenceLink } from "@/components/sections/E40TestEvidence";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import CoverCard from "@/components/ui/CoverCard";
import Figure from "@/components/ui/Figure";
import { supplyTerms } from "@/content/data/company";
import { commercialFacts } from "@/content/data/engineeringEvidence";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug, reviewerCredit } from "@/lib/authors";
import { productCovers, toolCovers } from "@/lib/covers";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema, absoluteUrl, priceRangeFromWeights } from "@/lib/seo";

// Real lightest/heaviest SKU across all 7 standard-profile families (rod Ø6
// at 0.05 kg/m; SHS 240×240×12 square tube at 16.8 kg/m — see each
// sub-category page's own size table). This hub page doesn't fetch the
// catalog DB itself, so the band is pinned to these two real extremes rather
// than derived live; update them if a new size ever pushes past either end.
const CATALOG_WEIGHT_EXTREMES_KG_PER_M = [0.05, 16.8];
const CATALOG_TOTAL_SKUS = "114";
const pagePath = "/products/fiberglass-structural-shapes";
const seoTarget = getSeoQueryTarget(pagePath);
const publishedAt = "2026-04-04";
const updatedAt = "2026-10-11";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/opengraph-image",
});

const faqItems = [
  {
    question: "Which FRP profile do I need for my application?",
    answer:
      "Start with the member's task: beams and channels for spanning supports; square or rectangular tubes for posts and frames; round tubes for circular grips and masts; angles for brackets and bracing; flat bars for strips and splice details. Compare the actual section, laminate, load direction, supports and connections before choosing a size. Smooth structural rods are separate from qualified concrete rebar. Send the span, loads and assembly drawing if the family is not yet clear.",
  },
  {
    question: "Are F1 Composite standard profiles certified to EN 13706 and ASTM D3917?",
    answer:
      commercialFacts.compliance,
  },
  {
    question: "Are catalog sections available from stock?",
    answer:
      commercialFacts.availability,
  },
  {
    question: "Can FRP profiles be cut, drilled, and bolted on-site?",
    answer:
      "Pultruded FRP can be fabricated, but agree the cutting, drilling, dust-control and cut-edge treatment procedure for the proposed material. The connection drawing should establish hole positions, edge distances, bearing details and the tightening procedure. Specify which work is included in supply and which remains with the installer; use the design guides as a starting reference for project review.",
  },
  {
    question: "How should I compare quotations for pultruded FRP structural shapes?",
    answer:
      "Compare the same section drawing, laminate, tolerances, finished lengths, quantity and processing scope. Separate tooling, samples, inspection documents, packing and delivery terms. A standard designation or matching outside size is not enough to establish equivalent performance; request evidence that applies to the offered configuration.",
  },
  {
    question: "Is there a China-based alternative to Strongwell, Creative Pultrusions, Fiberline, or Exel?",
    answer:
      "Compare the proposed geometry, material grade, mechanical properties, tolerances and inspection evidence against the original specification. A similar section or standard reference does not establish interchangeability. Send the project requirements for a product-specific comparison.",
  },
];

// The seven families in menu order, each with its catalog size range.
const profileTypes = [
  { slug: "frp-i-beam", name: "I-beams", sizes: "76×38 to 305×305 mm", brief: "Wide-flange spanning members for walkways, bridges and platforms." },
  { slug: "frp-channel", name: "Channels", sizes: "38×13 to 360×108 mm", brief: "Open-section framing for cable supports and modular assemblies." },
  { slug: "frp-angle", name: "Angles", sizes: "25×25 to 152×152 mm", brief: "Equal-leg catalog angles for bracing and ledgers; unequal legs reviewed as custom sections." },
  { slug: "frp-square-tube", name: "Square and rectangular tubes", sizes: "25×25 to 240×240 mm", brief: "Closed sections with flat mounting faces for columns, trusses and frames." },
  { slug: "frp-tube", name: "Round tubes", sizes: "25 to 150 mm OD", brief: "For handrails, guardrails and structural tubing." },
  { slug: "frp-rod", name: "Solid rods", sizes: "Ø6 to Ø50 mm", brief: "Smooth solid sections for stakes, spacers and component blanks; specify end connections separately." },
  { slug: "frp-flat-bar", name: "Flat bars", sizes: "12×3 to 305×25 mm", brief: "Stiffeners, splice plates, wear strips and spacers." },
] as const;

const quoteHref = buildRfqHref({
  source: "standard-profiles-hub",
  product: "FRP standard structural profiles",
  productPath: pagePath,
  message: "Please review my FRP structural profile requirements.\nMember task / application:\nSection or drawing reference (with units):\nSpan, loads and connection details:\nLengths and quantities:\nPlain lengths / processed parts / custom cross-section:\nMaterial, environment and evidence requirements:\nDestination and target date:",
});

const memberTasks = [
  { task: "Span between supports", family: "I-beams", href: "/products/fiberglass-structural-shapes/frp-i-beam", alternative: { family: "Channels", href: "/products/fiberglass-structural-shapes/frp-channel" }, check: "Span, load direction, lateral restraint, deflection and bearing at supports." },
  { task: "Form a post or frame", family: "Square or rectangular tubes", href: "/products/fiberglass-structural-shapes/frp-square-tube", check: "Installed orientation, unsupported length, bracing and access for connections." },
  { task: "Provide a circular grip or mast", family: "Round tubes", href: "/products/fiberglass-structural-shapes/frp-tube", check: "Outside diameter, bore fit, wall, fittings and complete assembly loads." },
  { task: "Connect, brace or support an edge", family: "Angles", href: "/products/fiberglass-structural-shapes/frp-angle", alternative: { family: "Channels", href: "/products/fiberglass-structural-shapes/frp-channel" }, check: "Leg or flange dimensions, eccentric loads, fastener layout and bearing." },
  { task: "Make a strip, spacer or splice detail", family: "Flat bars", href: "/products/fiberglass-structural-shapes/frp-flat-bar", check: "Width, thickness, hole pattern and load transfer through the joint." },
  { task: "Use a smooth solid round section", family: "Solid rods", href: "/products/fiberglass-structural-shapes/frp-rod", check: "Diameter, straightness, finished length and end attachment; not a rebar substitution." },
] as const;

const tools = [
  { href: "/tools/profile-finder", title: "Profile finder", text: "Filter the standard sizes by shape, size, mass and stiffness, and compare up to four." },
  { href: "/frp-profile-calculator", title: "Profile calculator", text: "Bending, shear and deflection for a section, span and load, with the steel equivalent." },
  { href: "/tools/frp-column-calculator", title: "Column buckling", text: "Global and local buckling and crushing of I-beams and tubes, with the lightest sizes that pass." },
  { href: "/frp-span-tables", title: "Span tables", text: "Allowable uniform loads for the published I-beams, channels and tubes over 1 to 6 m spans." },
  { href: "/tools/frp-cut-list-optimizer", title: "Cut list optimizer", text: "Nest piece lengths into 6 m or 12 m bars and see the bars to order, waste and weight." },
  { href: "/tools/frp-unit-converter", title: "Unit converter", text: "Metric and US units, and inch profile sizes matched to the closest catalog size." },
  { href: "/fiberglass-pultruded-profile-price", title: "Price estimator", text: "Planning prices per meter by section, resin, finish and volume." },
  { href: "/tools/frp-life-cycle-cost-calculator", title: "Life-cycle cost", text: "FRP against galvanized or painted steel over the life of the project, as present values." },
] as const;

export default function StandardProfilesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Standard FRP Structural Profiles",
    itemListElement: profileTypes.map((profile, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/products/fiberglass-structural-shapes/${profile.slug}`),
      name: profile.name,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Pultruded FRP Standard Structural Profiles",
          description:
            "Compare standard pultruded FRP structural shapes by member task, section dimensions and supply scope: I-beams, channels, angles, square and rectangular tubes, round tubes, flat bars and rods.",
          path: "/products/fiberglass-structural-shapes",
          image: "/images/products/i-beam/frp-i-beam-cover.jpg",
          category: "Pultruded FRP Structural Profiles",
          productLine: "F1-STRUX",
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
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin", "Polyurethane resin"],
          priceRange: (() => {
            const r = priceRangeFromWeights(CATALOG_WEIGHT_EXTREMES_KG_PER_M, 2.2, 4.5);
            return r ? { ...r, offerCount: CATALOG_TOTAL_SKUS } : undefined;
          })(),
          additionalProperty: [
            { name: "Profile Types", value: "I-beam, channel, angle, square tube, round tube, flat bar, round rod" },
            { name: "Size Range", value: "Ø6 mm rod and 12×3 mm flat bar up to I 305×305 mm and U 360×108 mm" },
            { name: "Standard Length", value: "6 m (custom lengths on request)" },
            { name: "Production timing", value: "Confirm in quotation" },
          ],
        })}
      />
      <PageHeader
        updated={updatedAt}
        reviewer={reviewerCredit(reviewer)}
        tag="Standard profiles"
        line={{ name: "F1-STRUX", label: "Standard profiles" }}
        title="Fiberglass structural shapes & sizes"
        description="Compare pultruded fiberglass I-beams, channels, angles, square and rectangular tubes, round tubes, flat bars and rods. Choose a family for the member's task, then compare dimensions, weights, drawings and material evidence. Catalog sections can be quoted as standard lengths or processed parts; a new cross-section starts from your drawing. Confirm the laminate, tolerances, quantity and production timing for the order."
        facts={[
          { label: "Families", value: String(profileTypes.length) },
          { label: "Catalog sizes", value: CATALOG_TOTAL_SKUS },
          { label: "Standard length", value: `${supplyTerms.standardLengthM} m` },
          { label: "Grade references", value: "EN 13706 E17 / E23" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: { label: "Find a size", href: "/tools/profile-finder", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Standard sections" caption="I-beam, channel, square tube and angle from the standard range. Every family has its own size table and section drawings." bleed>
            <Image src={productCovers["/products/fiberglass-structural-shapes"].src} alt="Pultruded fiberglass I-beam, channel, square tube and angle" width={1200} height={750} preload sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" />
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          { label: "Pultruded FRP Profiles", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles" },
        ]}
      />
      <PageNav
        items={[
          { id: "families", label: "Families" },
          { id: "selection", label: "Choose a family" },
          { id: "supply", label: "Supply options" },
          { id: "tools", label: "Tools" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="families" title="Browse fiberglass structural shapes by section family" count={`${profileTypes.length} families · ${CATALOG_TOTAL_SKUS} sizes`}>
        <ul className="grid grid-cols-2 gap-[10px] sm:gap-[12px] lg:grid-cols-4">
          {profileTypes.map((profile, index) => {
            const href = `/products/fiberglass-structural-shapes/${profile.slug}`;
            return (
              <li key={profile.slug}>
                <CoverCard href={href} cover={productCovers[href as keyof typeof productCovers]} title={profile.name} text={profile.brief} facts={[profile.sizes]} action="View all sizes" priority={index < 4} compact sizes="(max-width: 1024px) 50vw, 300px" />
              </li>
            );
          })}
          <li>
            <CoverCard href="/products/custom-pultruded-profiles" cover={productCovers["/products/custom-pultruded-profiles"]} title="Custom profiles" text="A section the catalog does not cover, developed from your drawing." facts={["Up to 600 × 300 mm"]} action="Start a custom profile" compact sizes="(max-width: 1024px) 50vw, 300px" />
          </li>
        </ul>
      </PageSection>

      <PageSection id="selection" title="Choose the family by the member's task" tone="muted" intro="These are starting points for selection. Capacity depends on the actual section, laminate, supports and connections; the family name does not establish a load rating.">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] text-left text-f14 leading-golden">
            <caption className="sr-only">Structural member tasks, starting profile families and information needed for selection</caption>
            <thead className="bg-bg2 text-t1">
              <tr>
                <th scope="col" className="px-[18px] py-[14px]">Member task</th>
                <th scope="col" className="px-[18px] py-[14px]">Start with</th>
                <th scope="col" className="px-[18px] py-[14px]">Bring to the design review</th>
              </tr>
            </thead>
            <tbody>
              {memberTasks.map((item) => (
                <tr key={item.task} className="border-t border-border-default">
                  <th scope="row" className="px-[18px] py-[14px] font-semibold text-t1">{item.task}</th>
                  <td className="px-[18px] py-[14px]">
                    <Link href={item.href} className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">{item.family}</Link>
                    {"alternative" in item ? <>{" / "}<Link href={item.alternative.href} className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">{item.alternative.family}</Link></> : null}
                  </td>
                  <td className="px-[18px] py-[14px] text-t2">{item.check}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="supply" title="Define what arrives at your site">
        <div className="grid gap-[16px] md:grid-cols-3">
          {[
            { title: "Standard cross-section", text: `Select a catalog row and specify the resin, finish and quantity. Request ${supplyTerms.standardLengthM} m standard lengths or a cut list. The quotation confirms tooling, material, tolerances and production timing; a listed size is not a stock commitment.` },
            { title: "Processed parts", text: "Keep the catalog cross-section and add drawing-controlled cutting, holes, end details or assembly interfaces. Confirm processing feasibility, inspection requirements and which fittings or installation work are included." },
            { title: "Custom cross-section", text: "Send a section drawing, mating-part envelope and performance requirements. Review tooling, laminate, samples and acceptance criteria before production. Treat sample approval and repeat-order supply as separate stages." },
          ].map((item) => (
            <div key={item.title} className="rounded-card border border-border-default bg-bg2 px-[18px] py-[18px]">
              <h3 className="text-f16 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/products/custom-pultruded-profiles" className="underline underline-offset-4 hover:text-teal">Start a custom section</Link>
          <Link href="/resources/evidence#structural-design" className="underline underline-offset-4 hover:text-teal">Check report scope before specifying a grade</Link>
          <Link href="/applications/frp-cooling-tower-profiles" className="underline underline-offset-4 hover:text-teal">Specify members for a cooling tower</Link>
        </p>
      </PageSection>

      <PageSection id="tools" title="Check a section before you order" tone="muted" intro="Filter the catalog, screen a beam or column, and plan the cut list and cost. Check each tool's stated data and assumptions against the offered section; preliminary results still need project review.">
        <ul className="grid grid-cols-2 gap-[10px] sm:gap-[12px] lg:grid-cols-4">
          {tools.map((item) => (
            <li key={item.href}>
              <CoverCard href={item.href} cover={toolCovers[item.href]} title={item.title} text={item.text} action="Open the tool" compact sizes="(max-width: 1024px) 50vw, 300px" />
            </li>
          ))}
        </ul>
        <div className="mt-[16px]">
          <E40EvidenceLink />
        </div>
      </PageSection>

      <AnswerBlocks
        title="Standard FRP profiles — frequently asked questions"
        description="Quick answers for engineers and procurement teams comparing pultruded fiberglass structural shapes against steel and aluminum options."
        items={faqItems}
      />

      <RelatedLinks
        groups={[
          {
            title: "Product range",
            links: [
              { href: "/products/frp-rebar", label: "FRP rebar for concrete reinforcement" },
              { href: "/products/fiberglass-sheets", label: "Fiberglass sheets (solid flat stock)" },
              { href: "/products/fiberglass-plates", label: "Fiberglass plate profiles (hollow and multi-cell)" },
              { href: "/products/product-lines", label: "F1-STRUX, GRID, THERM and FORM product lines" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
            ],
          },
          {
            title: "Industries and projects",
            links: [
              { href: "/industries/construction", label: "Construction and building envelopes" },
              { href: "/industries/infrastructure", label: "Infrastructure and bridges" },
              { href: "/industries/energy", label: "Energy, solar and transmission" },
              { href: "/industries/marine", label: "Marine and coastal structures" },
              { href: "/industries/industrial", label: "Industrial platforms and plants" },
              { href: "/industries/vehicle", label: "Vehicle and rail" },
              { href: "/regions/frp-cable-tray-uae-oil-gas", label: "FRP cable tray, UAE oil and gas" },
              { href: "/regions/pultruded-frp-solar-mounting-australia", label: "Solar mounting profiles, Australia" },
              { href: "/case-studies/european-bridge-deck", label: "Case: Netherlands bridge deck" },
              { href: "/case-studies/chongqing-rooftop-pv-frp-rail", label: "Case: Chongqing rooftop PV rail" },
              { href: "/case-studies/factory-access-staircase", label: "Case: FRP access staircase" },
              { href: "/applications/frp-pedestrian-bridge-superstructures", label: "FRP pedestrian bridge superstructures" },
            ],
          },
          {
            title: "Technology and resources",
            links: [
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum and concrete" },
              { href: "/technology/china-alternative-to-strongwell-fiberline-exel", label: "China alternative to Strongwell and Exel" },
              { href: "/technology/pultrusion-process", label: "Pultrusion process explained" },
              { href: "/technology/quality-testing", label: "Quality testing (EN 13706)" },
              { href: "/resources/technical-data", label: "Material properties and data sheets" },
              { href: "/resources/design-guides", label: "Design guides" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Need engineering data or a quotation for standard profiles?" tone="deep">
        <ProductRfq
          product="FRP standard structural profiles"
          productPath={pagePath}
          quoteHref={quoteHref}
          intro="Send the member's task and section drawing, then identify whether you need plain lengths, processed parts or a custom cross-section."
          items={[
            { title: "Section and member task", text: "Include a catalog reference or drawing, units, span, loads, support conditions and connections." },
            { title: "Delivery scope", text: "List finished lengths, quantities, holes and end details. Identify supplied fittings and any fabrication or installation left to others." },
            { title: "Material and acceptance", text: "Describe service exposure, required grade and tolerances. Agree which reports, sample checks and inspection documents apply to the offered product." },
            { title: "Order and destination", text: "Give trial and repeat quantities, destination and target date. Confirm tooling, sampling, packing, production and shipping in the quotation." },
          ]}
          advisorPrompt="I'm specifying FRP standard profiles (I-beams, channels, angles, tubes). What size do I need for a [span / load / environment] application, and how does it compare to equivalent steel section?"
        />
      </PageSection>
    </>
  );
}
