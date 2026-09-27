import type { Metadata } from "next";
import Image from "next/image";
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
const updatedAt = "2026-09-25";
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
      "For walkways, platforms, and bridges → FRP I-beam (max stiffness). For framing, cable trays, modular skids → FRP channel. For stiffeners, bracing, ledgers → FRP angle. For trusses, columns, frames → FRP square tube (max torsional rigidity). For handrails, antennas, conduits → FRP round tube. For concrete reinforcement requiring a bond surface and bar-specific qualification, use the dedicated FRP rebar range rather than a smooth structural rod. Use our AI sourcing assistant or send the span and load for an engineering review.",
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
      "Yes. Pultruded FRP profiles can be cut with a circular saw and carbide-tipped or diamond blade, drilled with carbide bits, and joined with stainless or FRP fasteners. Use of standard steel tools is acceptable; coolant is not required. We supply free fabrication guidelines covering bolt hole edge distances, post-cut sealing of cut edges, and recommended fastener torques.",
  },
  {
    question: "Who are the top pultruded FRP profile manufacturers, and where does F1 Composite fit?",
    answer:
      "The global market for pultruded FRP structural profiles includes Strongwell (EXTREN®, USA), Creative Pultrusions (USA), Fiberline Composites (Denmark), Exel Composites (Finland), and large manufacturers based in China. F1 Composite's F1-STRUX structural range (I-beams, channels, angles, tubes, flat bars and rods) is made to EN 13706 E17/E23 and ASTM D3917 requirements. Products ship directly from our factory in China without a regional distributor markup.",
  },
  {
    question: "Is there a China-based alternative to Strongwell, Creative Pultrusions, Fiberline, or Exel?",
    answer:
      "Compare the proposed geometry, material grade, mechanical properties, tolerances and inspection evidence against the original specification. A similar section or standard reference does not establish interchangeability. Send the project requirements for a product-specific comparison.",
  },
];

// The seven families in menu order, each with its catalog size range.
const profileTypes = [
  { slug: "frp-i-beam", name: "I-beams", sizes: "76×38 to 305×305 mm", brief: "Wide-flange sections with the most flexural stiffness, for walkways, bridges and platforms." },
  { slug: "frp-channel", name: "Channels", sizes: "38×13 to 360×108 mm", brief: "Open-section framing for cable supports and modular assemblies." },
  { slug: "frp-angle", name: "Angles", sizes: "25×25 to 152×152 mm", brief: "Equal and unequal legs, for stiffeners, bracing and ledger supports." },
  { slug: "frp-square-tube", name: "Square and rectangular tubes", sizes: "25×25 to 240×240 mm", brief: "Closed sections with high torsional stiffness for columns, trusses and frames." },
  { slug: "frp-tube", name: "Round tubes", sizes: "25 to 150 mm OD", brief: "For handrails, guardrails and structural tubing." },
  { slug: "frp-rod", name: "Solid rods", sizes: "Ø6 to Ø50 mm", brief: "Unidirectional rods for tie-rods, soil nails, rock bolts and stakes." },
  { slug: "frp-flat-bar", name: "Flat bars", sizes: "12×3 to 305×25 mm", brief: "Stiffeners, splice plates, wear strips and spacers." },
] as const;

const quoteHref = buildRfqHref({ source: "standard-profiles-hub", product: "FRP standard structural profiles", productPath: pagePath });

const tools = [
  { href: "/tools/profile-finder", title: "Profile finder", text: "Filter the standard sizes by shape, size, mass and stiffness, and compare up to four." },
  { href: "/frp-profile-calculator", title: "Profile calculator", text: "Bending, shear and deflection for a section, span and load, with the steel equivalent." },
  { href: "/frp-span-tables", title: "Span tables", text: "Allowable uniform loads for the published I-beams, channels and tubes over 1 to 6 m spans." },
  { href: "/fiberglass-pultruded-profile-price", title: "Price estimator", text: "Planning prices per meter by section, resin, finish and volume." },
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
            "Standard pultruded FRP structural shapes: I-beams, channels, angles, square tubes, round tubes, flat bars and rods, made to EN 13706 and ASTM D3917 in 6 m standard lengths.",
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
            { name: "Size Range", value: "12×3 mm to 305×305 mm" },
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
        description="F1 Composite's standard fiberglass structural shapes are pultruded I-beams from 76×38 to 305×305 mm, channels from 38×13 to 360×108 mm, angles from 25×25 to 152×152 mm, square and rectangular tubes from 25×25 to 240×240 mm, round tubes from 25 to 150 mm OD, flat bars and rods, supplied in 6 m standard lengths to EN 13706 E17/E23 and ASTM D3917 requirements. Each family lists dimensions and weights, with datasheets and DXF drawings for catalog sizes. Catalog sizes are standard options, not live stock: confirm resin, quantity and production timing in the quotation."
        facts={[
          { label: "Families", value: String(profileTypes.length) },
          { label: "Catalog sizes", value: CATALOG_TOTAL_SKUS },
          { label: "Standard length", value: `${supplyTerms.standardLengthM} m` },
          { label: "EN 13706 grades", value: "E17 / E23" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: { label: "Find a size", href: "/tools/profile-finder", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Standard sections" note="Rendering" caption="I-beam, channel, square tube and angle from the standard range. Every family has its own size table and section drawings." bleed>
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

      <PageSection id="tools" title="Check a section before you order" tone="muted" intro="Filter the catalog, check a span and load, and get a planning price, all against the same published section data.">
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
          advisorPrompt="I'm specifying FRP standard profiles (I-beams, channels, angles, tubes). What size do I need for a [span / load / environment] application, and how does it compare to equivalent steel section?"
        />
      </PageSection>
    </>
  );
}
