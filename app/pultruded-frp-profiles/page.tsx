import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import AskAICard from "@/components/ai/AskAICard";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { prefillForHub } from "@/lib/aiPrefill";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";

const pagePath = "/pultruded-frp-profiles";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
  }),
  keywords: [
    "F1 pultruded profiles",
    "F1 Composite pultruded profiles",
    "F1 FRP profiles",
    "pultruded FRP profiles",
    "pultruded fiberglass profiles",
    "fiberglass structural shapes",
    "FRP profiles manufacturer",
    "custom pultrusion services",
    "pultruded profiles EN 13706",
  ],
};

const profileFamily: Array<{
  slug: string;
  name: string;
  keyword: string;
  sizes: string;
  summary: string;
  href: string;
  image: string;
  /** CSS object-position override for images whose subject sits off-center. */
  imagePosition?: string;
}> = [
  {
    slug: "i-beam",
    name: "FRP I-Beam / Wide Flange",
    keyword: "fiberglass I-beam",
    sizes: "76×38 mm — 305×305 mm",
    summary:
      "Primary structural beams for walkways, platforms, and short-span bridges. Up to 75% lighter than a comparable A36 steel wide flange.",
    href: "/products/standard-profiles/i-beam",
    image: "/images/products/i-beam/frp-i-beam-photo.png",
  },
  {
    slug: "channel",
    name: "FRP Channel (C and U)",
    keyword: "fiberglass channel",
    sizes: "38×13 mm — 305×89 mm",
    summary:
      "Open-section framing for cable trays, stringers, modular skids, and stair stringers. Easy on-site fabrication with carbide tooling.",
    href: "/products/standard-profiles/channel",
    image: "/images/products/channel/frp-channel-photo.webp",
  },
  {
    slug: "angle",
    name: "FRP Angle (L-profile)",
    keyword: "fiberglass angle",
    sizes: "25×25 mm — 152×152 mm",
    summary:
      "Equal and unequal-leg angles for stiffeners, bracing, ledger supports, and frame connectors. Isophthalic polyester or vinyl ester resin.",
    href: "/products/standard-profiles/angle",
    image: "/images/products/angle/frp-angle-photo.webp",
  },
  {
    slug: "square-tube",
    name: "FRP Square & Rectangular Tube",
    keyword: "fiberglass square tube",
    sizes: "25×25 mm — 240×240 mm",
    summary:
      "Superior torsional rigidity for columns, trusses, and free-standing frames. Also used for guardrails and solar racking posts.",
    href: "/products/standard-profiles/square-tube",
    image: "/images/products/square-tube/frp-square-tube-photo.webp",
  },
  {
    slug: "tube",
    name: "FRP Round Tube",
    keyword: "fiberglass tube",
    sizes: "25 mm — 150 mm OD",
    summary:
      "Circular hollow sections for handrails, antenna masts, insulating stand-offs, and fluid-conveying applications with smooth interior bore.",
    href: "/products/standard-profiles/tube",
    image: "/images/products/round-tube/frp-round-tube-photo.png",
  },
  {
    slug: "flat-bar",
    name: "FRP Flat Bar",
    keyword: "fiberglass flat bar",
    sizes: "12×3 mm — 305×25 mm",
    summary:
      "Solid rectangular sections for stiffeners, splice plates, wear strips. Unidirectional architecture up to 70% glass for high-modulus applications.",
    href: "/products/standard-profiles/flat-bar",
    image: "/images/products/flat-bar/frp-flat-bar-photo.png",
  },
  {
    slug: "fenestration",
    name: "FRP Window Frames & Fenestration Profiles",
    keyword: "FRP window frames / FRP window profiles",
    sizes: "65 / 70 / 80 / 90 / 140-series frame depths",
    summary:
      "Pultruded fiberglass window frames and FRP window profiles — frame, sash, mullion, transom, glazing bead. Whole-window U-values down to 0.78 W/m²·K. PHI passive house certified. Direct replacement for aluminum and PVC window systems.",
    href: "/products/fenestration-systems",
    image: "/images/products/window-door/frp-window-frame-70-series-inward-hero.webp",
    // Square cross-section render whose informative detail sits low — keep the
    // multi-chamber section inside the 4:3 crop instead of the default center.
    imagePosition: "center 68%",
  },
  {
    slug: "solar-mounting",
    name: "FRP Solar Module Frames & Mounting",
    keyword: "fiberglass solar panel frames / PV mounting rails",
    sizes: "30×30 mm — 100×50 mm catalog sections; custom module frames",
    summary:
      "Pultruded composite module-frame profiles, ground and floating PV support members, and lightweight rooftop rails with matched clamps and splice hardware.",
    href: "/products/solar-mounting-systems",
    image: "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
  },
  {
    slug: "custom",
    name: "Custom Pultruded Profiles",
    keyword: "custom fiberglass pultrusion services",
    sizes: "Up to 600×300 mm cross-section",
    summary:
      "Bespoke dies for EV battery trays, solar mounting, rail interiors, architectural trim, and structural replacements. 6–10 week turnaround.",
    href: "/products/custom-pultrusions",
    image: "/images/products/custom-frp-profile-engineering-drawing-3d-render.jpg",
  },
  {
    slug: "gratings",
    name: "FRP Gratings & Deck Panels",
    keyword: "fiberglass grating and decking",
    sizes: "25 – 100 mm thickness",
    summary:
      "Molded and pultruded gratings, solid-top cover plates, and structural FRP deck panels for chemical plants, offshore platforms, pedestrian bridges, and vehicular access decks.",
    href: "/products/gratings",
    image: "/images/products/frp-grating-industrial.jpg",
  },
];

const resinOptions: Array<{ system: string; use: string; notes: string }> = [
  {
    system: "Isophthalic polyester",
    use: "General structural (default)",
    notes: "Best cost / performance balance. ASTM E84 Class II flame spread available.",
  },
  {
    system: "Vinyl ester",
    use: "Marine, chemical, wastewater",
    notes: "Superior resistance to hydrolysis, chlorides, and osmotic blistering.",
  },
  {
    system: "Polyurethane (PU)",
    use: "High-toughness, fast-cure",
    notes: "3–5× flexural toughness of polyester. Used in rail interiors and EV trays.",
  },
  {
    system: "Phenolic",
    use: "Fire-critical (BS 476 / EN 45545-2)",
    notes: "Low smoke, low toxicity, Class 1 surface spread of flame.",
  },
  {
    system: "Epoxy",
    use: "High mechanical performance",
    notes: "Used when tensile or fatigue properties need to approach steel equivalents.",
  },
];

const applicationLinks = [
  {
    href: "/applications/frp-cable-tray-supports",
    title: "FRP cable tray supports",
    description:
      "Non-conductive pultruded channels, angles, and brackets for substations, tunnels, and corrosive cable routing.",
  },
  {
    href: "/applications/frp-cooling-tower-profiles",
    title: "FRP cooling tower profiles",
    description:
      "Vinyl ester beams, tubes, louvers, and access members for wet, chlorinated, and high-humidity cooling tower structures.",
  },
  {
    href: "/applications/frp-bridge-deck-panels",
    title: "FRP bridge deck panels",
    description:
      "Closed-top deck planks, gratings, and support profiles for pedestrian bridges and lightweight deck replacement.",
  },
  {
    href: "/applications/frp-solar-mounting-profiles",
    title: "FRP solar mounting profiles",
    description:
      "UV-stable pultruded beams, channels, and posts for solar farms where weight, corrosion, and electrical isolation matter.",
  },
  {
    href: "/applications/frp-chemical-plant-platforms",
    title: "FRP chemical plant platforms",
    description:
      "Corrosion-proof beams, gratings, stair treads, and handrails for acid splash zones and process access platforms.",
  },
];

const comparisonRows: Array<{
  property: string;
  frp: string;
  steel: string;
  aluminum: string;
}> = [
  {
    property: "Density (g/cm³)",
    frp: "1.8 – 2.1",
    steel: "7.85",
    aluminum: "2.70",
  },
  {
    property: "Tensile strength (MPa)",
    frp: "240 – 400",
    steel: "400 (A36)",
    aluminum: "240 (6061-T6)",
  },
  {
    property: "Elastic modulus (GPa)",
    frp: "17 – 28",
    steel: "200",
    aluminum: "69",
  },
  {
    property: "Thermal conductivity (W/m·K)",
    frp: "0.3",
    steel: "≈50",
    aluminum: "≈160",
  },
  {
    property: "Corrosion",
    frp: "Immune",
    steel: "Requires galvanizing / painting",
    aluminum: "Galvanic & chloride pitting",
  },
  {
    property: "Electrical conductivity",
    frp: "Non-conductive",
    steel: "Conductive",
    aluminum: "Conductive",
  },
  {
    property: "Typical service life",
    frp: "50–100 years (no maintenance)",
    steel: "25–40 years (re-coat every 5–7 yrs)",
    aluminum: "25–50 years",
  },
];

const competitorComparison: Array<{
  manufacturer: string;
  products: string;
  certification: string;
  pricing: string;
  sourcing: string;
}> = [
  {
    manufacturer: "F1 Composite",
    products: "Full range (I-beam, channel, angle, tube, flat bar, window frames, gratings, custom)",
    certification: "EN 13706 E17/E23 · ASTM D3917 · ISO 9001:2015 · PHI certified",
    pricing: "Direct-from-factory · 30–50% below regional distributors",
    sourcing: "Direct from China · FOB/CIF/DDP · 370 pultrusion lines · 150,000 t/year capacity",
  },
  {
    manufacturer: "Strongwell (EXTREN®)",
    products: "I-beam, channel, angle, tube, flat bar, gratings, custom",
    certification: "EN 13706 · ASTM D3917 · ISO 9001",
    pricing: "Regional distributor markup · 40–60% above factory pricing",
    sourcing: "US-based · Regional distributors · No direct factory access",
  },
  {
    manufacturer: "Fiberline Composites",
    products: "I-beam, channel, angle, tube, flat bar, panels, custom",
    certification: "EN 13706 · DIBt certification · ISO 9001",
    pricing: "European distributor network · 30–50% above factory pricing",
    sourcing: "Denmark-based · Regional distributors · Limited custom capacity",
  },
  {
    manufacturer: "Creative Pultrusions (SuperStrut®)",
    products: "I-beam, channel, angle, tube, flat bar, gratings, custom",
    certification: "EN 13706 · ASTM D3917 · ISO 9001",
    pricing: "North American distributor markup · 35–55% above factory pricing",
    sourcing: "US-based · Regional distributors · Limited export focus",
  },
  {
    manufacturer: "Bedford Reinforced Plastics",
    products: "I-beam, channel, angle, tube, flat bar, gratings, custom",
    certification: "ASTM D3917 · ISO 9001 · UL listed",
    pricing: "Regional distributor markup · 30–50% above factory pricing",
    sourcing: "US-based · Regional distributors · Limited international reach",
  },
];

const faqItems = [
  {
    question: "What are pultruded FRP profiles?",
    answer:
      "Pultruded FRP (fiber-reinforced polymer) profiles are continuous fiberglass structural shapes produced by pulling reinforcing fibers through a resin bath and a heated steel die. The result is a constant cross-section profile — I-beams, channels, angles, tubes, rods — with 60–70% glass fiber content by weight, high strength-to-weight ratio, and full corrosion resistance.",
  },
  {
    question: "How do pultruded FRP profiles compare with steel?",
    answer:
      "Pultruded FRP is approximately 75% lighter than steel (density 1.9 vs 7.85 g/cm³), has comparable tensile strength (240–400 MPa vs 400 MPa for A36), but lower elastic modulus (~25 GPa vs 200 GPa). FRP does not corrode, does not conduct electricity, and has thermal conductivity ~170× lower than steel. Stiffness or deflection usually governs FRP design rather than strength.",
  },
  {
    question: "Are pultruded FRP profiles certified to international standards?",
    answer:
      "Yes. F1 Composite supplies to EN 13706-1/2/3 (European pultruded profile standard, E17 and E23 grades) and ASTM D3917 (dimensional tolerances). Mechanical testing follows ASTM D638 (tensile), D790 (flexural), and D695 (compression). The company holds ISO 9001:2015, and fire-rated products are certified to BS 476, ASTM E84, and EN 45545-2.",
  },
  {
    question: "What CSI MasterFormat section covers pultruded FRP structural shapes?",
    answer:
      "In North American construction specifications, pultruded FRP structural shapes are specified under CSI MasterFormat Division 06 — most commonly Section 06 50 00 (Structural Plastics) and Section 06 51 00 (Structural Plastic Shapes and Plates). FRP gratings are typically specified under Section 06 74 13 (Fiberglass Reinforced Gratings). F1 Composite supports spec-section submittals with EN 13706 / ASTM D3917 compliance data, mechanical test reports (ASTM D638 / D790 / D695), and material test reports (MTRs) issued per production batch — the documentation package a PE stamping the spec expects to receive.",
  },
  {
    question: "What is the typical lead time for pultruded FRP profiles?",
    answer:
      "Stock standard profiles: 2–4 weeks. Custom profiles using existing tooling: 4–6 weeks. Custom profiles requiring new dies: 6–10 weeks total (3–6 weeks for die manufacturing + trial + production). Fenestration system projects: 6–12 weeks depending on volume.",
  },
  {
    question: "Is FRP more expensive than steel?",
    answer:
      "On a per-meter basis, pultruded FRP costs 50–100% more than carbon steel. However, installed cost is often comparable or lower due to 40–60% lower freight, no hot-work permits, 20–40% less labor, and no cranes for most members. Over a 30-year life in corrosive environments, FRP lifecycle cost (TCO) is 20–40% lower than steel because FRP needs no recoating.",
  },
  {
    question: "Can FRP profiles be used for primary structural members?",
    answer:
      "Yes. FRP is widely used for primary structural members in walkways, pedestrian bridges, platforms, cooling tower framing, solar mounting, and cable tray support. Design follows ASCE/SEI 74-23 LRFD Pre-Standard for Pultruded FRP Structures or EN 13706. Local and global buckling checks are essential because of the lower modulus.",
  },
  {
    question: "What is the minimum order quantity for custom FRP profiles?",
    answer:
      "F1 Composite's minimum order quantity for custom pultruded profiles is 500 linear meters for the first production run; repeat orders start from 200 meters. Stock standard profiles have no MOQ.",
  },
  {
    question: "How does FRP compare to Strongwell, Fiberline, and Creative Pultrusions?",
    answer:
      "F1 Composite supplies to the same EN 13706 / ASTM D3917 specifications as Strongwell (EXTREN®), Fiberline Composites, and Creative Pultrusions (SuperStrut®). The differentiators are the scale of the FengDu manufacturing base it exports from (370 pultrusion lines, 150,000 t/year), direct-from-factory pricing without regional distributor markups, and custom tooling turnaround for export markets.",
  },
  {
    question:
      "Where can I buy pultruded FRP profiles, and how do I source FRP pultruded profiles from China?",
    answer:
      "F1 Composite sells pultruded FRP profiles direct from the factory — no distributor markup — and exports to 30+ countries on FOB or DDP terms. Send your profile geometry (or a drawing), quantity, resin system, and destination port for a quote: stock standard sections ship in 2–4 weeks and custom-die profiles in 6–10 weeks. Buyers sourcing FRP pultruded profiles from China typically request EN 13706 / ASTM D3917 test data, a Barcol-hardness and glass-content report, and a pre-shipment inspection — all supplied by F1 Composite as standard.",
  },
];

// EN 13706-3 grade table. Modulus rows ARE the grade definition (E17 = 17 GPa,
// E23 = 23 GPa min full-section flexural modulus); strength / density / glass /
// hardness are F1 characteristic values per the cited test method.
const en13706Rows = [
  { property: "Full-section flexural modulus (grade definition)", method: "EN ISO 14125", e17: "≥ 17 GPa", e23: "≥ 23 GPa" },
  { property: "Axial tensile modulus", method: "EN ISO 527-4", e17: "≥ 17 GPa", e23: "≥ 23 GPa" },
  { property: "Axial tensile strength", method: "EN ISO 527-4", e17: "170 MPa", e23: "240 MPa" },
  { property: "In-plane shear strength", method: "EN ISO 14130", e17: "25 MPa", e23: "30 MPa" },
  { property: "Density", method: "EN ISO 1183", e17: "1.9 g/cm³", e23: "1.9 g/cm³" },
  { property: "Glass content (by weight)", method: "ISO 1172", e17: "60–65%", e23: "65–70%" },
  { property: "Barcol hardness (cure proxy)", method: "ASTM D2583", e17: "≥ 40", e23: "≥ 40" },
];

const hubGlossary = [
  { term: "Pultrusion", def: "A continuous process that pulls fiber reinforcement through a resin bath and a heated die to form a constant cross-section profile — a portmanteau of “pull” and “extrusion.”" },
  { term: "E-glass roving", def: "Continuous bundles of electrical-grade glass filaments that carry the longitudinal load in a pultruded profile." },
  { term: "Continuous strand mat (CSM)", def: "A randomly-oriented glass mat layered between rovings to build transverse (cross-direction) strength." },
  { term: "Surfacing veil", def: "A thin veil at the surface that creates a resin-rich, UV- and corrosion-resistant outer layer." },
  { term: "EN 13706 E17 / E23", def: "European grades for pultruded structural profiles, defined by minimum full-section flexural modulus — 17 GPa (E17) and 23 GPa (E23)." },
  { term: "ASTM D3917", def: "The dimensional-tolerance standard for pultruded shapes; F1 Composite holds ±0.25 mm." },
  { term: "Vinyl ester resin", def: "A corrosion-grade matrix for acid, alkali, chlorine, and marine service — a step above general-purpose isophthalic polyester." },
  { term: "Barcol hardness", def: "A surface-indentation test (ASTM D2583) used as a quick proxy for adequate cure of a pultruded profile." },
];

const keyFacts = [
  { label: "Glass content", value: "60–70% by weight" },
  { label: "Weight vs steel", value: "~75% lighter" },
  { label: "Grades", value: "EN 13706 E17 / E23" },
  { label: "Tolerance", value: "ASTM D3917 · ±0.25 mm" },
  { label: "Corrosion", value: "Immune · zero coating" },
  { label: "Design life", value: "50–100 years" },
  { label: "Standard shapes", value: "I-beam, channel, angle, SHS/RHS, tube, rod, flat bar" },
  { label: "Lead time", value: "Stock 2–4 wk · custom 4–8 wk" },
];

const hubDownloads = [
  { title: "FRP Profile Design Manual — 2026 (E23 grade, 24 pp)", file: "/downloads/f1composite-frp-profile-design-manual-2026.pdf" },
  { title: "PU-GF Pultruded Profile — Mechanical Data Sheet", file: "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf" },
  { title: "Wind-Energy Pultruded Laminate — GFRP/CFRP Data Sheet", file: "/downloads/f1composite-wind-energy-pultruded-laminate-datasheet.pdf" },
  { title: "EPD & Carbon-Footprint Analysis — Pultruded GFRP Profiles", file: "/downloads/f1composite-epd-carbon-footprint-frp-profiles-2025.pdf" },
];

const LAST_UPDATED = "2026-07-19";
const REVIEWER = { name: "Yifan Liu", title: "Application Engineer", slug: "yifan-liu" };
const AUTHOR = { name: "Dr. Haifeng Gong", title: "R&D Lead — Materials & Standards", slug: "haifeng-gong" };

export default function PultrudedFRPProfilesHubPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pultruded FRP Profiles — Complete Product Range",
    alternateName: [
      "F1 pultruded profiles",
      "F1 Composite pultruded profiles",
      "F1 FRP profiles",
    ],
    url: absoluteUrl(pagePath),
    description: pageDescription,
    isPartOf: {
      "@type": "WebSite",
      name: "F1 Composite",
      url: "https://www.f1composite.com",
    },
    about: {
      "@type": "Thing",
      name: "Pultruded Fiber-Reinforced Polymer Profiles",
      sameAs: "https://en.wikipedia.org/wiki/Pultrusion",
    },
    hasPart: profileFamily.map((item) => ({
      "@type": "WebPage",
      name: item.name,
      url: absoluteUrl(item.href),
      description: item.summary,
    })),
    dateModified: LAST_UPDATED,
    lastReviewed: LAST_UPDATED,
    reviewedBy: {
      "@type": "Person",
      name: REVIEWER.name,
      jobTitle: REVIEWER.title,
      url: absoluteUrl(`/about/authors/${REVIEWER.slug}`),
    },
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      jobTitle: AUTHOR.title,
      url: absoluteUrl(`/about/authors/${AUTHOR.slug}`),
    },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />

      <PageHeader
        tag="Pultruded FRP Profiles"
        title="Pultruded FRP profiles & fiberglass structural shapes — complete product hub"
        description="F1 Composite supplies the full pultruded fiberglass range: FRP structural shapes (wide flange beams, channels, angles, tubes), custom pultrusions, FRP window frames, gratings, and structural deck panels. Standard shapes are listed in the stock catalog; this hub maps the complete product family, standards (CSI 06 50 00 / 06 51 00), applications, and quote path."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pultruded FRP Profiles" },
        ]}
      />

      {/* Key facts (TL;DR) + review byline */}
      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="rounded-[8px] border border-border-default bg-bg2 p-[24px]">
            <div className="flex flex-wrap items-baseline justify-between gap-[8px]">
              <h2 className="text-f13 font-bold uppercase tracking-[2px] text-teal-text">Key facts</h2>
              <p className="text-f12 text-t3">
                Authored by{" "}
                <Link href={`/about/authors/${AUTHOR.slug}`} className="font-semibold text-teal-text hover:text-teal">
                  {AUTHOR.name}, {AUTHOR.title}
                </Link>
                · Reviewed by{" "}
                <Link href={`/about/authors/${REVIEWER.slug}`} className="font-semibold text-teal-text hover:text-teal">
                  {REVIEWER.name}, {REVIEWER.title}
                </Link>
                · Last updated {LAST_UPDATED}
              </p>
            </div>
            <dl className="mt-[16px] grid gap-x-[34px] gap-y-[13px] sm:grid-cols-2 lg:grid-cols-4">
              {keyFacts.map((f) => (
                <div key={f.label}>
                  <dt className="text-f11 font-bold uppercase tracking-[1px] text-t3">{f.label}</dt>
                  <dd className="mt-[3px] text-f15 font-semibold text-t1">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Intro / Hero */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[55px] lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div>
              <SectionTag>What is pultrusion?</SectionTag>
              <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Pultruded FRP profiles: fiberglass structural shapes, continuously manufactured
              </h2>
              <p className="mt-[21px] text-f15 leading-golden text-t2">
                Pultrusion is a continuous manufacturing process in which E-glass
                roving, continuous strand mat, and surfacing veil are pulled through
                a resin bath and then through a heated steel die. The resin cures
                inside the die, producing a constant cross-section pultruded
                fiberglass profile with 60–70% glass content by weight. Throughput
                is typically 0.3–1.5 m/min, and profiles can be produced in any
                length — standard packaging is 6 m or 12 m. As a category these are
                known interchangeably as pultruded profiles, composite pultruded
                profiles, or pultruded fiberglass profiles — F1 Composite is a
                direct-factory pultruded profiles manufacturer across all of them,
                and this catalog is referred to collectively as{" "}
                <strong className="text-t1">F1 pultruded profiles</strong>.
              </p>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                Compared to conventional materials, pultruded fiberglass reinforced
                polymer (also called GRP — glass reinforced polymer — or fiber
                reinforced plastic) is approximately{" "}
                <strong className="text-t1">75% lighter than steel</strong>,{" "}
                <strong className="text-t1">corrosion-immune</strong>,{" "}
                <strong className="text-t1">electrically non-conductive</strong>,
                and has <strong className="text-t1">thermal conductivity 170× lower than steel</strong>.
                Pultruded FRP is used in bridges, walkways, cooling towers, offshore
                platforms, chemical plants, rail, solar farms, and passive-house
                window systems worldwide.
              </p>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                F1 Composite organizes its pultruded FRP range into four branded
                product lines:{" "}
                <Link href="/products/standard-profiles" className="font-semibold text-teal-text hover:text-teal">F1‑STRUX</Link>{" "}
                (structural profiles),{" "}
                <Link href="/products/gratings" className="font-semibold text-teal-text hover:text-teal">F1‑GRID</Link>{" "}
                (gratings &amp; deck panels),{" "}
                <Link href="/products/fenestration-systems" className="font-semibold text-teal-text hover:text-teal">F1‑THERM</Link>{" "}
                (window frames &amp; fenestration), and{" "}
                <Link href="/products/custom-pultrusions" className="font-semibold text-teal-text hover:text-teal">F1‑FORM</Link>{" "}
                (custom pultrusions) — all manufactured in-house to EN 13706 and ASTM D3917.
              </p>
              <div className="mt-[21px] flex flex-wrap gap-[13px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">EN 13706 E17 / E23</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">ASTM D3917 ±0.25 mm</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">ISO 9001:2015</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">ASCE/SEI 74-23 LRFD</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">PHI (passive house) certified</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-neutral-50">
              <Image
                src="/images/hero/frp-composite-material-hero.webp"
                alt="Pultruded FRP profiles manufactured by F1 Composite — fiberglass structural shapes"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Profile Family Grid */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Profile family</SectionTag>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Nine pultruded fiberglass product families under one factory
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Every geometry listed below is produced in-house at F1 Composite — no
            trading, no relabeling. Click through to each product for the full
            size chart, mechanical data, FAQ, and ready-to-quote specifications.
          </p>

          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            {profileFamily.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="group overflow-hidden rounded-[8px] border border-border-default bg-white transition-all duration-300 hover:border-teal hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt={`${item.name} — pultruded fiberglass profile by F1 Composite`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={
                      item.imagePosition
                        ? { objectPosition: item.imagePosition }
                        : undefined
                    }
                  />
                </div>
                <div className="p-[21px]">
                  <p className="text-f13 font-medium text-teal-text">{item.keyword}</p>
                  <h3 className="mt-[5px] text-f19 font-bold text-t1">{item.name}</h3>
                  <p className="mt-[8px] text-f13 text-t3">
                    <span className="font-semibold">Size range:</span> {item.sizes}
                  </p>
                  <p className="mt-[8px] text-f15 leading-golden text-t2">{item.summary}</p>
                  <span className="mt-[13px] inline-block text-f13 font-bold text-teal-text transition-colors group-hover:text-teal">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Application entry points</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
            Start from the structure you need to replace
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            Engineers often search by application before they know the profile geometry.
            These pages translate common use cases into resin systems, profile families,
            standards, and RFQ inputs.
          </p>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {applicationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[8px] border border-border-default bg-bg2 p-[24px] transition-colors hover:border-teal"
              >
                <h3 className="text-f19 font-bold text-t1">{item.title}</h3>
                <p className="mt-[8px] text-f15 leading-golden text-t2">{item.description}</p>
                <span className="mt-[13px] inline-block text-f13 font-bold text-teal-text">
                  View application →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resin systems */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Resin systems</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Five resin systems — matched to environment and code
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            All pultruded FRP profiles in the F1 Composite range can be produced
            with the resin system required for your environment. Resin selection
            drives chemical resistance, fire performance, and long-term stiffness.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Resin system</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Typical use</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Notes</th>
                </tr>
              </thead>
              <tbody>
                {resinOptions.map((row) => (
                  <tr key={row.system} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] align-top text-f15 font-medium text-t1">{row.system}</td>
                    <td className="py-[13px] pr-[21px] align-top text-f15 text-t2">{row.use}</td>
                    <td className="py-[13px] align-top text-f15 text-t2">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Material comparison */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Material comparison</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Pultruded FRP vs steel vs aluminum
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Typical property bands for E-glass/polyester pultruded profiles
            compared with A36 carbon steel and 6061-T6 aluminum. Actual values
            vary by resin system, fiber architecture, and cross-section. Use this
            table as a first-pass material selection reference.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Property</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-teal-text">Pultruded FRP</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Carbon steel</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Aluminum</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.property} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] align-top text-f15 font-medium text-t1">{row.property}</td>
                    <td className="py-[13px] pr-[21px] align-top text-f15 font-medium text-teal-text">{row.frp}</td>
                    <td className="py-[13px] pr-[21px] align-top text-f15 text-t2">{row.steel}</td>
                    <td className="py-[13px] align-top text-f15 text-t2">{row.aluminum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-[21px] text-f13 text-t3">
            For a detailed comparison including cost analysis and lifecycle
            economics, see{" "}
            <Link
              href="/technology/frp-vs-traditional-materials"
              className="font-semibold text-teal-text hover:text-teal"
            >
              FRP vs traditional materials
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Competitor comparison */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Manufacturer comparison</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            How F1 Composite compares to other pultrusion manufacturers
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Direct-from-factory pricing eliminates regional distributor markup. All manufacturers listed produce to EN 13706 and ASTM D3917 standards.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-teal-text">Manufacturer</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Product range</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Certification</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Pricing structure</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Sourcing model</th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((row, index) => (
                  <tr
                    key={row.manufacturer}
                    className={`border-b border-border-default ${
                      index === 0 ? 'bg-teal/5' : ''
                    }`}
                  >
                    <td className={`py-[13px] pr-[21px] align-top ${index === 0 ? 'font-bold text-teal-text' : 'text-f15 font-medium text-t1'}`}>
                      {row.manufacturer}
                      {index === 0 && <span className="ml-[8px] rounded-[4px] bg-teal px-[8px] py-[2px] text-[10px] font-bold uppercase text-white">Recommended</span>}
                    </td>
                    <td className="py-[13px] pr-[21px] align-top text-f13 text-t2">{row.products}</td>
                    <td className="py-[13px] pr-[21px] align-top text-f13 text-t2">{row.certification}</td>
                    <td className={`py-[13px] pr-[21px] align-top ${index === 0 ? 'font-medium text-teal-text' : 'text-f13 text-t2'}`}>{row.pricing}</td>
                    <td className="py-[13px] align-top text-f13 text-t2">{row.sourcing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-[21px] rounded-[8px] border-2 border-teal bg-bg2 p-[21px]">
            <p className="text-f15 font-bold text-teal-text">Key advantage: Direct factory pricing + full product range</p>
            <p className="mt-[8px] text-f13 leading-golden text-t2">
              F1 Composite delivers the same EN 13706/ASTM D3917 compliance as Strongwell, Fiberline, and Creative Pultrusions — but at 30–50% lower landed cost by shipping direct from our FengDu manufacturing base (370 pultrusion lines, 150,000 t/year capacity). No distributor markup, full traceability, and 48-hour RFQ response.
            </p>
          </div>
        </div>
      </section>

      {/* EN 13706 grades */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Standards &amp; grades</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            EN 13706 E17 and E23 — what the grades mean
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            EN 13706-3 classifies pultruded structural profiles by their minimum
            full-section flexural modulus:{" "}
            <strong className="text-t1">grade E17 = 17 GPa</strong> and{" "}
            <strong className="text-t1">grade E23 = 23 GPa</strong> (the standard also
            requires the axial tensile modulus to meet the grade number). The grade
            is a floor, not the typical value — F1 Composite standard structural
            profiles are produced to <strong className="text-t1">E23</strong>, and
            high-fiber-content sections run stiffer than the 23 GPa minimum. Each
            property below is paired with the test method that produces it.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Property</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Test method</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">E17</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-teal-text">E23</th>
                </tr>
              </thead>
              <tbody>
                {en13706Rows.map((row) => (
                  <tr key={row.property} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] align-top text-f15 font-medium text-t1">{row.property}</td>
                    <td className="py-[13px] pr-[21px] align-top text-f13 text-t3">{row.method}</td>
                    <td className="py-[13px] pr-[21px] align-top text-f15 text-t2">{row.e17}</td>
                    <td className="py-[13px] align-top text-f15 font-medium text-teal-text">{row.e23}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-[21px] text-f13 text-t3">
            Modulus rows are the EN 13706 grade definition; strength, density, glass
            content, and hardness are F1 characteristic values per the cited method.
            Per-size section properties (A, I<sub>x</sub>, S<sub>x</sub>, weight/m) are
            published on each{" "}
            <Link href="/products/standard-profiles" className="font-semibold text-teal-text hover:text-teal">
              shape datasheet
            </Link>
            , or compute them live in the{" "}
            <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:text-teal">
              FRP profile calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Applications</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Where pultruded fiberglass profiles replace steel and aluminum
          </h2>

          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Infrastructure",
                href: "/industries/infrastructure",
                body: "FRP bridge decks, pedestrian bridges, walkways, handrails, and cable trays in coastal and de-icing-salt environments.",
              },
              {
                title: "Construction",
                href: "/industries/construction",
                body: "Curtain wall mullions, fenestration systems, façade support, rooftop platforms, and PV mounting in urban projects.",
              },
              {
                title: "Energy & Power",
                href: "/industries/energy",
                body: "Transmission cross-arms, substation equipment, solar tracker frames, and non-conductive standoffs.",
              },
              {
                title: "Marine & Offshore",
                href: "/industries/marine",
                body: "Gratings, dock decking, offshore platform handrails, and fender-system parts in saltwater splash zones.",
              },
              {
                title: "Industrial & Chemical",
                href: "/industries/industrial",
                body: "Chemical plant platforms, cooling towers, cable trays, and pipe supports for chlorine, caustic, and acid service.",
              },
              {
                title: "Vehicle & Rail",
                href: "/industries/vehicle",
                body: "Bus/coach body panels, commercial truck floors, rail interior profiles, and EV battery tray structures.",
              },
            ].map((app) => (
              <Link
                key={app.title}
                href={app.href}
                className="group rounded-[8px] border border-border-default bg-bg2 p-[29px] transition-colors hover:border-teal"
              >
                <h3 className="text-f19 font-bold text-t1 group-hover:text-teal-text">
                  {app.title}
                </h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{app.body}</p>
                <span className="mt-[13px] inline-block text-f13 font-bold text-teal-text">
                  View case studies →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Resources */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[21px] text-f19 font-bold text-t1">Technical resources</h2>
          <div className="flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/product-lines">F1-STRUX / GRID / THERM / FORM lines</LinkArrow>
            <LinkArrow href="/resources/how-to-choose-frp-pultrusion-supplier">How to choose an FRP supplier</LinkArrow>
            <LinkArrow href="/technology/pultrusion-process">Pultrusion process explained</LinkArrow>
            <LinkArrow href="/technology/frp-vs-traditional-materials">FRP vs steel / aluminum / timber</LinkArrow>
            <LinkArrow href="/technology/quality-testing">Quality testing (EN 13706 / ASTM)</LinkArrow>
            <LinkArrow href="/frp-profile-calculator">Deflection & load calculator</LinkArrow>
            <LinkArrow href="/resources/technical-data">Data sheets &amp; mechanical data</LinkArrow>
            <LinkArrow href="/resources/design-guides">Design guides</LinkArrow>
            <LinkArrow href="/resources/downloads">Downloads</LinkArrow>
            <LinkArrow href="/about">About F1 Composite</LinkArrow>
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Glossary</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Pultruded FRP terms, defined
          </h2>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
            {hubGlossary.map((g) => (
              <div key={g.term} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <h3 className="text-f15 font-bold text-t1">{g.term}</h3>
                <p className="mt-[6px] text-f13 leading-golden text-t2">{g.def}</p>
              </div>
            ))}
          </div>
          <p className="mt-[21px] text-f13 text-t3">
            Full glossary:{" "}
            <Link href="/resources/glossary" className="font-semibold text-teal-text hover:text-teal">
              FRP &amp; pultrusion terminology →
            </Link>
          </p>
        </div>
      </section>

      {/* Datasheets & downloads */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[8px] text-f19 font-bold text-t1">Datasheets &amp; design data</h2>
          <p className="mb-[21px] text-f13 text-t2">
            Published mechanical data and design references for pultruded FRP profiles.
          </p>
          <div className="grid gap-[13px] sm:grid-cols-2">
            {hubDownloads.map((d) => (
              <a
                key={d.file}
                href={d.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[10px] rounded-[8px] border border-border-default bg-white p-[16px] text-f13 font-medium text-t1 transition-colors hover:border-teal"
              >
                <span aria-hidden>⬇</span>
                <span>{d.title} <span className="text-t3">(PDF)</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <AnswerBlocks
        tag="Buyer FAQ"
        title="Pultruded FRP profiles — frequently asked questions"
        description="Short answers for specifying engineers, procurement managers, and contractors evaluating pultruded fiberglass profiles."
        items={faqItems}
      />

      <AskAICard
        title="Not sure which profile family fits your project?"
        description="Describe your application and the FRP Engineering Advisor will recommend the right product family, resin system, standards, and quote path."
        prefill={prefillForHub()}
      />

      <section className="bg-white pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <CalculatorCTA
            href="/frp-profile-calculator"
            eyebrow="Free tool · no login"
            title="Size a pultruded FRP profile in your browser"
            sub="Run bending, shear, and Timoshenko-corrected deflection on any standard shape to ASCE/SEI 74-23, CEN/TS 19101, GB 50608, or ASD — and find the section that replaces a steel or aluminum member at equal stiffness, then quote against your spec."
          />
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            Looking up rather than computing? The{" "}
            <Link href="/frp-span-tables" className="font-semibold text-teal-text hover:underline">
              FRP span tables
            </Link>{" "}
            publish the allowable uniform load for every standard{" "}
            <Link href="/frp-span-tables#i-beam" className="text-teal-text hover:underline">fiberglass I-beam</Link>,{" "}
            <Link href="/frp-span-tables#channel" className="text-teal-text hover:underline">channel</Link>, and{" "}
            <Link href="/frp-span-tables#square-tube" className="text-teal-text hover:underline">tube</Link>{" "}
            over 1–6 m simple spans — EN 13706 E23 basis, deflection-checked. Once the
            section is fixed, the{" "}
            <Link href="/fiberglass-pultruded-profile-price" className="font-semibold text-teal-text hover:underline">
              fiberglass pultruded profile price estimator
            </Link>{" "}
            turns it into a budgetary USD-per-meter range with quantity breaks.
          </p>
        </div>
      </section>

      <InnerCTA title="Specify pultruded FRP profiles for your next project" />
    </>
  );
}
