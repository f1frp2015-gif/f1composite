import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import AskAICard from "@/components/ai/AskAICard";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Standard FRP Profiles — Pultruded Fiberglass Structural Shapes",
  description:
    "Stock pultruded fiberglass structural shapes: FRP I-beams, channels, angles, square tubes, round tubes, flat bars, rods. EN 13706 / ASTM D3917, 75% lighter than steel, 6 m stock lengths. Free samples.",
  path: "/products/standard-profiles",
  image: "/products/standard-profiles/opengraph-image",
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
    slug: "i-beam",
    name: "I-Beam",
    subtitle: "Wide Flange Profiles",
    image: "/images/products/i-beam/frp-i-beam-photo.png",
    sizes: "76×38 mm — 305×305 mm",
    brief: "Up to 75% lighter than steel. Maximum flexural stiffness for walkways, bridges, and platforms.",
  },
  {
    slug: "angle",
    name: "Angle",
    subtitle: "L-Profiles",
    image: "/images/products/angle/frp-angle-photo.png",
    sizes: "25×25 mm — 152×152 mm",
    brief: "Equal and unequal-leg options. Ideal as stiffeners, bracing, and ledger supports.",
  },
  {
    slug: "channel",
    name: "Channel",
    subtitle: "U-Profiles",
    image: "/images/products/channel/frp-channel-photo.png",
    sizes: "38×13 mm — 305×89 mm",
    brief: "Versatile open-section framing for cable management and modular assemblies.",
  },
  {
    slug: "square-tube",
    name: "Square Tube",
    subtitle: "SHS & RHS Profiles",
    image: "/images/products/square-tube/frp-square-tube-photo.png",
    sizes: "25×25 mm — 240×240 mm",
    brief: "Superior torsional rigidity for columns, trusses, and frame structures.",
  },
  {
    slug: "tube",
    name: "Round Tube",
    subtitle: "Circular Hollow Sections",
    image: "/images/products/round-tube/frp-round-tube-photo.png",
    sizes: "25 mm — 150 mm OD",
    brief: "Handrails, guardrails, and structural tubes with smooth interior bore.",
  },
  {
    slug: "flat-bar",
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
      url: absoluteUrl(`/products/standard-profiles/${profile.slug}`),
      name: profile.name,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <PageHeader
        tag="Standard Profiles"
        title="Pultruded FRP Structural Profiles"
        description="Seven core profile geometries engineered to replace steel and aluminium — corrosion-free, 75% lighter, ISO 9001 certified."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Standard Profiles" },
        ]}
      />

      {/* Profile Grid */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            {profileTypes.map((profile) => (
              <Link
                key={profile.slug}
                href={`/products/standard-profiles/${profile.slug}`}
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
              { href: "/products/standard-profiles/i-beam", label: "FRP I-beams" },
              { href: "/products/standard-profiles/channel", label: "FRP channels" },
              { href: "/products/standard-profiles/angle", label: "FRP angles" },
              { href: "/products/standard-profiles/square-tube", label: "FRP square tubes" },
              { href: "/products/standard-profiles/tube", label: "FRP round tubes" },
              { href: "/products/standard-profiles/flat-bar", label: "FRP flat bars" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
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
              { href: "/case-studies/european-bridge-deck", label: "Case: Netherlands bridge deck" },
              { href: "/case-studies/solar-farm-mounting", label: "Case: 50 MW solar mounting" },
              { href: "/case-studies/factory-access-staircase", label: "Case: FRP access staircase" },
            ],
          },
          {
            title: "Technology & resources",
            links: [
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminium, concrete" },
              { href: "/technology/pultrusion-process", label: "Pultrusion process explained" },
              { href: "/technology/quality-testing", label: "Quality testing (EN 13706)" },
              { href: "/technology/calculator", label: "FRP load & deflection calculator" },
              { href: "/resources/technical-data", label: "Load tables & data sheets" },
              { href: "/resources/design-guides", label: "Design guides" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      <AnswerBlocks
        tag="Buyer FAQ"
        title="Standard FRP profiles — frequently asked questions"
        description="Quick answers for engineers and procurement teams comparing pultruded fiberglass structural shapes against steel and aluminium options."
        items={faqItems}
      />

      <InnerCTA title="Need engineering data or a quotation for standard profiles?" />
    </>
  );
}
