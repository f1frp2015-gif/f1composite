import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import AskAICard from "@/components/ai/AskAICard";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import { buildPageMetadata, buildProductFamilyPageSchema, absoluteUrl, priceRangeFromWeights } from "@/lib/seo";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";

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
const updatedAt = "2026-07-30";
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
      "For walkways, platforms, and bridges → FRP I-beam (max stiffness). For framing, cable trays, modular skids → FRP channel. For stiffeners, bracing, ledgers → FRP angle. For trusses, columns, frames → FRP square tube (max torsional rigidity). For handrails, antennas, conduits → FRP round tube. For splice plates and rebar → FRP flat bar or round rod. Use our AI sourcing assistant or request a 24-hour engineering review.",
  },
  {
    question: "Are F1 Composite standard profiles certified to EN 13706 and ASTM D3917?",
    answer:
      "Yes. All standard pultruded FRP profiles are produced under ISO 9001:2015 quality management and tested to EN 13706 (Reinforced plastics composites — Specifications for pultruded profiles) and ASTM D3917 (Standard Specification for Dimensional Tolerance of Pultruded Shapes). Mill test certificates are issued per production batch and full third-party test reports are available on request.",
  },
  {
    question: "What are typical lead times for stock FRP profiles?",
    answer:
      "Common standard profiles (I-beams, channels, angles, square tubes, round tubes, flat bars, rods in popular sizes) ship from stock in 2–4 weeks for full-container orders, including ocean freight booking. Less-common sizes are produced on a 4–6 week lead time. Custom pultruded profiles requiring new tooling take 6–10 weeks total (3–6 weeks die fabrication + production).",
  },
  {
    question: "Can FRP profiles be cut, drilled, and bolted on-site?",
    answer:
      "Yes. Pultruded FRP profiles can be cut with a circular saw and carbide-tipped or diamond blade, drilled with carbide bits, and joined with stainless or FRP fasteners. Use of standard steel tools is acceptable; coolant is not required. We supply free fabrication guidelines covering bolt hole edge distances, post-cut sealing of cut edges, and recommended fastener torques.",
  },
  {
    question: "Who are the top pultruded FRP profile manufacturers, and where does F1 Composite fit?",
    answer:
      "The global market for pultruded FRP structural profiles includes Strongwell (EXTREN®, USA), Creative Pultrusions (USA), Fiberline Composites (Denmark), Exel Composites (Finland), and large manufacturers based in China. F1 Composite manufactures the complete F1-STRUX structural range — I-beams, channels, angles, tubes, flat bars, and rods — to EN 13706 E17/E23 and ASTM D3917 requirements. Products ship directly from our factory in China without a regional distributor markup.",
  },
  {
    question: "Is there a China-based alternative to Strongwell, Creative Pultrusions, Fiberline, or Exel?",
    answer:
      "Yes. F1 Composite's F1-STRUX structural profiles are a direct, standards-equivalent China alternative to EXTREN® (Strongwell), Creative Pultrusions, Fiberline, and Exel — produced to EN 13706 and ASTM D3917 under ISO 9001:2015, with custom-die tooling in 3–6 weeks and factory-direct export to 30+ countries on FOB or DDP terms. See the full comparison: China alternative to Strongwell, Fiberline & Exel.",
  },
];

const profileTypes: Array<{
  slug: string;
  name: string;
  subtitle: string;
  image: string;
  sizes: string;
  brief: string;
  imagePosition?: string;
}> = [
  {
    slug: "frp-i-beam",
    name: "I-Beam",
    subtitle: "Wide Flange Profiles",
    image: "/images/products/i-beam/frp-i-beam-photo.png",
    sizes: "76×38 mm — 305×305 mm",
    brief: "Up to 75% lighter than steel. Maximum flexural stiffness for walkways, bridges, and platforms.",
  },
  {
    slug: "frp-angle",
    name: "Angle",
    subtitle: "L-Profiles",
    image: "/images/products/angle/frp-angle-photo.webp",
    sizes: "25×25 mm — 152×152 mm",
    brief: "Equal and unequal-leg options. Ideal as stiffeners, bracing, and ledger supports.",
  },
  {
    slug: "frp-channel",
    name: "Channel",
    subtitle: "U-Profiles",
    image: "/images/products/channel/frp-channel-photo.webp",
    sizes: "38×13 mm — 305×89 mm",
    brief: "Versatile open-section framing for cable management and modular assemblies.",
  },
  {
    slug: "frp-square-tube",
    name: "Square Tube",
    subtitle: "SHS & RHS Profiles",
    image: "/images/products/square-tube/frp-square-tube-photo.webp",
    sizes: "25×25 mm — 240×240 mm",
    brief: "Superior torsional rigidity for columns, trusses, and frame structures.",
  },
  {
    slug: "frp-tube",
    name: "Round Tube",
    subtitle: "Circular Hollow Sections",
    image: "/images/products/round-tube/frp-round-tube-photo.png",
    sizes: "25 mm — 150 mm OD",
    brief: "Handrails, guardrails, and structural tubes with smooth interior bore.",
  },
  {
    slug: "frp-flat-bar",
    name: "Flat Bar",
    subtitle: "Solid Rectangular Sections",
    image: "/images/products/flat-bar/frp-flat-bar-photo.png",
    sizes: "12×3 mm — 305×25 mm",
    brief: "Stiffeners, splice plates, wear strips. High-modulus options up to 70% glass.",
  },
];

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
            "Stock pultruded FRP structural shapes — I-beams, channels, angles, square tubes, round tubes, flat bars, and rods. EN 13706 and ASTM D3917 compliant, ISO 9001 manufactured, 6 m standard lengths.",
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
            { name: "Lead Time (stock sizes)", value: "2–4 weeks" },
          ],
        })}
      />
      <PageHeader
        tag="Standard Profiles · F1-STRUX"
        title="Fiberglass structural shapes catalog — FRP sizes, weights & section data"
        description="Dimensions, weight per meter, and section properties for F1-STRUX stock profiles — I-beams, channels, angles, tubes, flat bars, and rods to EN 13706 and ASTM D3917. This catalog is for engineers who already know the shape and need the numbers; for the complete product family and applications, start with the pultruded FRP profiles overview."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles" },
        ]}
      />

      {/* Profile Grid */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="max-w-[920px]">
            <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
              Fiberglass structural shapes — standard profile range
            </h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              F1 Composite manufactures 114 stock fiberglass structural shapes across the
              I-beam, channel, angle, square and rectangular tube, round tube, flat bar, and
              rod families. Each family page below lists the available dimensions, published
              weight per meter, section drawing, and downloadable datasheets needed for an
              initial specification.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              These pultruded fiberglass structural shapes use continuous E-glass
              reinforcement and resin systems selected for the service environment. Standard
              production is controlled to EN 13706 and ASTM D3917 requirements; project
              engineers should combine the catalog geometry with the applicable material
              data, load combinations, environmental factors, connection design, and local
              code checks.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              Use the <Link href="/frp-span-tables" className="font-semibold text-teal-text hover:underline">FRP span tables</Link>{" "}
              for preliminary member screening, the <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:underline">FRP profile calculator</Link>{" "}
              for section-property and design checks, or review the <Link href="/resources/technical-data" className="font-semibold text-teal-text hover:underline">FRP technical data</Link>{" "}
              before selecting a stock size. Custom dimensions and fiber architectures are
              handled through the custom pultrusion program.
            </p>
          </div>

          <h2 className="mt-[55px] text-f24 font-bold text-t1">
            Browse fiberglass structural shapes by section family
          </h2>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            {profileTypes.map((profile) => (
              <Link
                key={profile.slug}
                href={`/products/fiberglass-structural-shapes/${profile.slug}`}
                className="group overflow-hidden rounded-[8px] border border-border-default bg-white transition-all duration-300 hover:border-teal hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={profile.image}
                    alt={`Pultruded FRP ${profile.name} profile by F1 Composite`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={
                      profile.imagePosition
                        ? { objectPosition: profile.imagePosition }
                        : undefined
                    }
                  />
                </div>
                <div className="p-[21px]">
                  <h3 className="text-f19 font-bold text-t1">{profile.name}</h3>
                  <p className="text-f13 font-medium text-teal-text">{profile.subtitle}</p>
                  <p className="mt-[8px] text-f13 text-t3">
                    <span className="font-semibold">Sizes:</span> {profile.sizes}
                  </p>
                  <p className="mt-[8px] text-f15 leading-golden text-t2">{profile.brief}</p>
                  <span className="mt-[13px] inline-block text-f13 font-bold text-teal-text transition-colors group-hover:text-teal">
                    View all sizes →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AskAICard
        prefill="I'm specifying FRP standard profiles (I-beams, channels, angles, tubes). What size do I need for a [span / load / environment] application, and how does it compare to equivalent steel section?"
      />

      <RelatedLinks
        groups={[
          {
            title: "Product range",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beams" },
              { href: "/products/fiberglass-structural-shapes/frp-channel", label: "FRP channels" },
              { href: "/products/fiberglass-structural-shapes/frp-angle", label: "FRP angles" },
              { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "FRP square tubes" },
              { href: "/products/fiberglass-structural-shapes/frp-tube", label: "FRP round tubes" },
              { href: "/products/fiberglass-structural-shapes/frp-flat-bar", label: "FRP flat bars" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusion services" },
              { href: "/products/fiberglass-sheets", label: "Fiberglass sheets & FRP plate" },
              { href: "/products/product-lines", label: "F1-STRUX / GRID / THERM / FORM product lines" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
            ],
          },
          {
            title: "Industries using standard profiles",
            links: [
              { href: "/industries/construction", label: "Construction & building envelopes" },
              { href: "/industries/infrastructure", label: "Infrastructure & bridges" },
              { href: "/industries/energy", label: "Energy, solar & transmission" },
              { href: "/industries/marine", label: "Marine & coastal structures" },
              { href: "/industries/industrial", label: "Industrial platforms & plants" },
              { href: "/industries/vehicle", label: "Vehicle & rail" },
              { href: "/regions/frp-cable-tray-uae-oil-gas", label: "FRP cable tray · UAE oil & gas" },
              { href: "/regions/pultruded-frp-solar-mounting-australia", label: "Solar mounting profiles · Australia" },
              { href: "/case-studies/european-bridge-deck", label: "Case: Netherlands bridge deck" },
              { href: "/case-studies/solar-farm-mounting", label: "Case: 50 MW solar mounting" },
              { href: "/case-studies/factory-access-staircase", label: "Case: FRP access staircase" },
              { href: "/applications/frp-pedestrian-bridge-superstructures", label: "FRP pedestrian bridge superstructures" },
            ],
          },
          {
            title: "Technology & resources",
            links: [
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum, concrete" },
              { href: "/technology/china-alternative-to-strongwell-fiberline-exel", label: "China alternative to Strongwell / Exel" },
              { href: "/technology/pultrusion-process", label: "Pultrusion process explained" },
              { href: "/technology/quality-testing", label: "Quality testing (EN 13706)" },
              { href: "/frp-span-tables", label: "FRP span tables — allowable loads by profile" },
              { href: "/frp-profile-calculator", label: "FRP load & deflection calculator" },
              { href: "/resources/technical-data", label: "Material properties & data sheets" },
              { href: "/resources/design-guides", label: "Design guides" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      <AnswerBlocks
        tag="Buyer FAQ"
        title="Standard FRP profiles — frequently asked questions"
        description="Quick answers for engineers and procurement teams comparing pultruded fiberglass structural shapes against steel and aluminum options."
        items={faqItems}

      />

      <section className="bg-white pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <CalculatorCTA
            href="/frp-profile-calculator"
            eyebrow="Free tool · no login"
            title="Size and verify an FRP profile in your browser"
            sub="Pick a shape — I-beam, channel, angle, square tube, or round tube — enter your span and load, and get bending, shear, and Timoshenko-corrected deflection plus the steel/aluminum-equivalent section, then quote against your spec."
          />
        </div>
      </section>

      <InnerCTA title="Need engineering data or a quotation for standard profiles?" />
    </>
  );
}
