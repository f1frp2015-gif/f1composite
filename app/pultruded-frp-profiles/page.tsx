import { commercialFacts, quotationChecklist } from "@/content/data/engineeringEvidence";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import DocumentCard, { libraryCard } from "@/components/downloads/DocumentCard";
import ProductRfq from "@/components/products/ProductRfq";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import CoverCard from "@/components/ui/CoverCard";
import CoverLink from "@/components/ui/CoverLink";
import Figure from "@/components/ui/Figure";
import { supplyTerms, weeks } from "@/content/data/company";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { industries } from "@/content/data/industries";
import { prefillForHub } from "@/lib/aiPrefill";
import { authorsBySlug, reviewerCredit } from "@/lib/authors";
import { applicationCovers, coverFor, industryCovers, toolCovers } from "@/lib/covers";
import { assembleDocuments } from "@/lib/documents";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pagePath = "/pultruded-frp-profiles";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

// Every family that runs as a pultruded profile, in menu order. Covers come
// from lib/covers.ts; the keyword is the name buyers also search for.
const profileFamily: Array<{
  slug: string;
  name: string;
  keyword: string;
  sizes: string;
  summary: string;
  href: string;
  rangeLabel?: string;
}> = [
  {
    slug: "i-beam",
    name: "FRP I-Beam / Wide Flange",
    keyword: "GRP I-beam",
    sizes: "76×38 mm to 305×305 mm",
    summary: "Primary structural beams for walkways, platforms and short-span bridges.",
    href: "/products/fiberglass-structural-shapes/frp-i-beam",
  },
  {
    slug: "channel",
    name: "FRP Channel (C and U)",
    keyword: "GRP channel",
    sizes: "38×13 mm to 360×108 mm",
    summary: "Open-section framing for cable trays, stringers, modular skids and stair stringers.",
    href: "/products/fiberglass-structural-shapes/frp-channel",
  },
  {
    slug: "angle",
    name: "FRP Angle (L-profile)",
    keyword: "GRP angle",
    sizes: "25×25 mm to 152×152 mm",
    summary: "Equal and unequal-leg angles for stiffeners, bracing, ledger supports and frame connectors.",
    href: "/products/fiberglass-structural-shapes/frp-angle",
  },
  {
    slug: "square-tube",
    name: "FRP Square & Rectangular Tube",
    keyword: "GRP box section",
    sizes: "25×25 mm to 240×240 mm",
    summary: "Torsionally stiff sections for columns, trusses, frames, guardrails and solar posts.",
    href: "/products/fiberglass-structural-shapes/frp-square-tube",
  },
  {
    slug: "tube",
    name: "FRP Round Tube",
    keyword: "GRP round tube",
    sizes: "25 mm to 150 mm OD",
    summary: "Circular hollow sections for handrails, antenna masts and insulating stand-offs.",
    href: "/products/fiberglass-structural-shapes/frp-tube",
  },
  {
    slug: "rod",
    name: "FRP Solid Rod",
    keyword: "fiberglass rod",
    sizes: "Ø6 mm to Ø50 mm",
    summary: "Solid circular pultrusions for supports, spacers and fabricated rods. Reinforcing rebar has a separate specification.",
    href: "/products/fiberglass-structural-shapes/frp-rod",
  },
  {
    slug: "flat-bar",
    name: "FRP Flat Bar",
    keyword: "fiberglass flat bar",
    sizes: "12×3 mm to 305×25 mm",
    summary: "Solid rectangular sections for stiffeners, splice plates and wear strips.",
    href: "/products/fiberglass-structural-shapes/frp-flat-bar",
  },
  {
    slug: "fiberglass-sheets",
    name: "Pultruded Fiberglass Sheets",
    keyword: "solid fiberglass sheet",
    sizes: "2–25 mm thick, cut to size",
    summary: "Solid flat stock for liners, covers, baffles and fabricated blanks, smooth, gritted or embossed.",
    href: "/products/fiberglass-sheets",
  },
  {
    slug: "fiberglass-plates",
    name: "Hollow & Multi-cell Profiles",
    keyword: "multi-cell FRP plate",
    sizes: "19 records, 15 schematics",
    summary: "Drawing-led hollow, multi-cell and edge-formed plate profiles with A/B/t1/t2 values and source IDs.",
    href: "/products/fiberglass-plates",
    rangeLabel: "Catalog scope",
  },
  {
    slug: "deck-panels",
    name: "Structural FRP Deck Panels",
    keyword: "fiberglass deck panel",
    sizes: "12 cross-sections",
    summary: "Closed-profile deck sections with neutral A/B/t drawing values and distinct edge geometries.",
    href: "/products/frp-deck-panels",
  },
  {
    slug: "window-door-profiles",
    name: "Window & Door Profiles",
    keyword: "fiberglass window profile",
    sizes: "9 series, 50–140 mm",
    summary: "Frame, sash, mullion and sill lineals for window and door fabricators.",
    href: "/products/window-door-profiles",
  },
  {
    slug: "custom",
    name: "Custom Pultruded Profiles",
    keyword: "custom pultrusion",
    sizes: "Up to 600×300 mm",
    summary: `A die for your own section, with first delivery in ${weeks(supplyTerms.newDieLeadTimeWeeks)}.`,
    href: "/products/custom-pultruded-profiles",
  },
];

// Products built from these profiles for one application.
const applicationProducts = [
  { href: "/products/frp-solar-mounting-systems", title: "Solar frames and supports" },
  { href: "/products/wind-turbine-blade-panels", title: "Wind turbine blade panels" },
  { href: "/products/frp-rebar", title: "GFRP rebar" },
  { href: "/products/frp-gratings", title: "Pultruded grating" },
  { href: "/products/frp-handrail-systems", title: "Handrails" },
  { href: "/products/frp-ladders", title: "Ladders" },
  { href: "/products/frp-sound-barrier-wall", title: "Sound barrier profiles" },
  { href: "/products/fiberglass-stakes", title: "Fiberglass stakes" },
  { href: "/products/fiberglass-snow-markers", title: "Snow markers" },
] as const;

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
      "Corrosion-resistant beams, gratings, stair treads, and handrails for acid splash zones and process access platforms.",
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
    frp: "Resin- and exposure-dependent",
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
    frp: "Project-specific design and inspection plan",
    steel: "Exposure and protection dependent",
    aluminum: "Alloy and exposure dependent",
  },
];

const faqItems = [
  {
    question: "What are pultruded FRP profiles?",
    answer:
      "Pultruded FRP (fiber-reinforced polymer) profiles are continuous fiberglass structural shapes produced by pulling reinforcing fibers through a resin bath and a heated steel die. The result is a profile with a constant cross-section, such as an I-beam, channel, angle, tube or rod, with 60–70% glass fiber by weight, a high strength-to-weight ratio and chemical resistance that depends on the resin.",
  },
  {
    question: "How do pultruded FRP profiles compare with steel?",
    answer:
      "Pultruded FRP is approximately 75% lighter than steel (density 1.9 vs 7.85 g/cm³), has comparable tensile strength (240–400 MPa vs 400 MPa for A36), but lower elastic modulus (~25 GPa vs 200 GPa). FRP does not rust like steel; chemical and electrical performance depend on the material and exposure, and has thermal conductivity ~170× lower than steel. Stiffness or deflection usually governs FRP design rather than strength.",
  },
  {
    question: "Are pultruded FRP profiles certified to international standards?",
    answer:
      "Profiles are supplied to EN 13706-1/2/3 (the European pultruded profile standard, grades E17 and E23) and ASTM D3917 (dimensional tolerances), and mechanical testing follows ASTM D638 (tensile), D790 (flexural) and D695 (compression). ISO 9001 and fire test reports for fire-retardant formulations (BS 476, ASTM E84, EN 45545-2) are provided on request with the holder, number and scope.",
  },
  {
    question: "What CSI MasterFormat section covers pultruded FRP structural shapes?",
    answer:
      "In North American construction specifications, pultruded FRP structural shapes are specified under CSI MasterFormat Division 06, most often Section 06 50 00 (Structural Plastics) and Section 06 51 00 (Structural Plastic Shapes and Plates). FRP gratings are typically specified under Section 06 74 13 (Fiberglass Reinforced Gratings). F1 Composite supports spec-section submittals with EN 13706 / ASTM D3917 compliance data, mechanical test reports (ASTM D638 / D790 / D695), and material test reports (MTRs) for each production batch. These are the documents an engineer of record usually asks to review.",
  },
  {
    question: "What is the typical lead time for pultruded FRP profiles?",
    answer:
      "Stock standard profiles: 2–4 weeks. Custom profiles using existing tooling: 4–6 weeks. Custom profiles requiring new dies: 6–10 weeks total (3–6 weeks for die manufacturing + trial + production). Fenestration system projects: 6–12 weeks depending on volume.",
  },
  {
    question: "Is FRP more expensive than steel?",
    answer:
      "On a per-meter basis, pultruded FRP costs 50–100% more than carbon steel. However, installed cost is often comparable or lower due to 40–60% lower freight, no hot-work permits, 20–40% less labor, and no cranes for most members. Over a 30-year period in corrosive environments, published comparisons put FRP lifecycle cost (TCO) 20–40% below steel, mainly because FRP needs no recoating.",
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
      "F1 Composite sells pultruded FRP profiles direct from the production network, without a distributor, and exports to 30+ countries on FOB or DDP terms. For a quote, send the profile geometry or a drawing, the quantity, resin system and destination port. Catalog sections ship in 2–4 weeks; profiles that need a new die take 6–10 weeks. Buyers sourcing pultruded profiles from China usually ask for EN 13706 or ASTM D3917 test data, a Barcol hardness and glass content report, and a pre-shipment inspection; we provide these on request.",
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
  { term: "Pultrusion", def: "A continuous process that pulls fiber reinforcement through a resin bath and a heated die to form a profile with a constant cross-section. The name combines “pull” and “extrusion.”" },
  { term: "E-glass roving", def: "Continuous bundles of electrical-grade glass filaments that carry the longitudinal load in a pultruded profile." },
  { term: "Continuous strand mat (CSM)", def: "A randomly-oriented glass mat layered between rovings to build transverse (cross-direction) strength." },
  { term: "Surfacing veil", def: "A thin veil at the surface that creates a resin-rich, UV- and corrosion-resistant outer layer." },
  { term: "EN 13706 E17 / E23", def: "European grades for pultruded structural profiles, defined by minimum full-section flexural modulus: 17 GPa (E17) and 23 GPa (E23)." },
  { term: "ASTM D3917", def: "The dimensional-tolerance standard for pultruded shapes; F1 Composite holds ±0.25 mm." },
  { term: "Vinyl ester resin", def: "A corrosion-grade resin for acid, alkali, chlorine and marine service, one step up from general-purpose isophthalic polyester." },
  { term: "Barcol hardness", def: "A surface-indentation test (ASTM D2583) used as a quick proxy for adequate cure of a pultruded profile." },
];

const hubDownloads = [
  "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf",
  "/downloads/f1composite-wind-energy-pultruded-laminate-datasheet.pdf",
  "/downloads/f1composite-epd-carbon-footprint-frp-profiles-2025.pdf",
];

const tools = [
  { href: "/tools/profile-finder", title: "Profile finder", text: "Filter the standard sizes by shape, size, mass and stiffness." },
  { href: "/frp-profile-calculator", title: "Profile calculator", text: "Bending, shear and deflection to ASCE/SEI 74-23, CEN/TS 19101 or GB 50608." },
  { href: "/frp-span-tables", title: "Span tables", text: "Allowable uniform loads for every standard I-beam, channel and tube over 1–6 m." },
  { href: "/fiberglass-pultruded-profile-price", title: "Price estimator", text: "A budget price range per meter, with quantity breaks." },
] as const;

const LAST_UPDATED = "2026-09-24";
const REVIEWER = { name: "Yifan Liu", title: "Application Engineer", slug: "yifan-liu" };
const AUTHOR = { name: "Dr. Haifeng Gong", title: "R&D Lead, Materials & Standards", slug: "haifeng-gong" };
const quoteHref = buildRfqHref({ source: "pultruded-profiles-hub", product: "Pultruded FRP profiles", productPath: pagePath });
const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const th = "px-[14px] py-[8px] font-semibold text-t1";

export default function PultrudedFRPProfilesHubPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pultruded FRP Profiles — Standard & Custom Sections",
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

  const documents = assembleDocuments().filter((document) => document.file && hubDownloads.includes(document.file));

  return (
    <>
      <JsonLd data={collectionSchema} />

      <PageHeader
        updated={LAST_UPDATED}
        reviewer={reviewerCredit(authorsBySlug[REVIEWER.slug])}
        tag="Pultruded profiles"
        title="Pultruded FRP & GRP profiles"
        description="Find glass-reinforced plastic (GRP) profiles, also specified as fiberglass or glass-fiber FRP: standard sections and custom cross-sections. Review geometry, materials and supply requirements, then open the detailed specification page."
        facts={[
          { label: "Glass content", value: "60–70% by weight" },
          { label: "EN 13706 grades", value: "E17 / E23" },
          { label: "Tolerance", value: "±0.25 mm" },
          { label: "Catalog lead time", value: weeks(supplyTerms.catalogLeadTimeWeeks) },
        ]}
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: { label: "Browse the families", href: "#families", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Pultruded sections" caption="Tubes, rods, channels and flat sections, all made by pulling glass fiber through a resin bath and a heated die." bleed>
            <Image src="/images/hero/frp-composite-material-hero.webp" alt="Pultruded fiberglass tubes, rods, channels and flat sections standing upright" width={1280} height={807} preload sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" />
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pultruded FRP Profiles" },
        ]}
      />
      <PageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "families", label: "Families" },
          { id: "applications", label: "Applications" },
          { id: "resins", label: "Resins" },
          { id: "comparison", label: "vs steel" },
          { id: "grades", label: "Grades" },
          { id: "tools", label: "Tools" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="overview" title="Pultruded FRP profiles: fiberglass structural shapes, continuously manufactured">
        <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-golden text-t2">
            <p className="text-f18 text-t1">
              Pultrusion is a continuous manufacturing process in which E-glass roving, continuous strand mat, and surfacing veil are pulled through a resin bath and then through a heated steel die. The resin cures inside the die, producing a constant cross-section pultruded fiberglass profile with 60–70% glass content by weight.
            </p>
            <p>
              Throughput is typically 0.3–1.5 m/min. Profiles can be made to any length; standard lengths are 6 m and 12 m. The same products are also sold as composite pultruded profiles or pultruded fiberglass profiles. F1 Composite supplies them{" "}
              <Link href="/products/frp-pultrusion-manufacturer-factory-direct" className={link}>direct from the FengDu production network</Link>.
            </p>
            <p>
              Looking for <strong className="font-semibold text-t1">GRP profiles</strong>? Our glass-reinforced sections are the products also described as fiberglass structural shapes or GFRP profiles. Match the shape, resin and required performance, rather than the abbreviation. Carbon and carbon-glass hybrid products are identified separately.{" "}
              <Link href="/what-is-frp#terminology" className={link}>Compare FRP, GRP and GFRP terminology</Link>.
            </p>
            <p>
              Pultruded fiberglass reinforced polymer (also called GRP, glass reinforced plastic, or fiber reinforced plastic) <strong className="font-semibold text-t1">weighs about 75% less than steel</strong>, <strong className="font-semibold text-t1">does not rust</strong>, <strong className="font-semibold text-t1">does not conduct electricity</strong>, and <strong className="font-semibold text-t1">conducts heat about 170 times less than steel</strong>. Pultruded FRP is used in bridges, walkways, cooling towers, offshore platforms, chemical plants, rail, solar farms, and passive-house window systems worldwide.
            </p>
          </div>
          <aside className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Four product lines</p>
            <dl className="mt-[12px] divide-y divide-border-default border-y border-border-default text-f14">
              {[
                ["F1-STRUX", "Structural profiles", "/products/fiberglass-structural-shapes"],
                ["F1-GRID", "Gratings and deck panels", "/products/product-lines"],
                ["F1-THERM", "Window frames and fenestration", "/products/frp-window-frames"],
                ["F1-FORM", "Custom pultrusions", "/products/custom-pultruded-profiles"],
              ].map(([line, label, href]) => (
                <div key={line} className="flex items-baseline justify-between gap-[12px] py-[10px]">
                  <dt className="font-mono text-f12 font-medium tracking-[0.06em] text-teal-text">{line}</dt>
                  <dd><Link href={href} className="font-semibold text-t1 hover:text-teal-text">{label}</Link></dd>
                </div>
              ))}
            </dl>
            <p className="mt-[12px] text-f14 leading-golden text-t2">Product-specific pages and approved order documents define the applicable process, material, tooling and standard.</p>
            <ul className="mt-[14px] flex flex-wrap gap-[6px]">
              {["EN 13706 E17 / E23", "ASTM D3917 ±0.25 mm", "Certificates on request", "ASCE/SEI 74-23 LRFD", "PHI 2491wi03 (90-series window)"].map((item) => (
                <li key={item} className="rounded-tag border border-border-default bg-white px-[8px] py-[3px] text-f12 font-medium text-t1">{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </PageSection>

      <PageSection
        id="families"
        title="Standard sections and custom pultruded profiles"
        count={`${profileFamily.length} families`}
        tone="muted"
        intro="Each family is an F1 manufacturing or drawing-led quotation program. Open one for the published geometry, selection inputs and RFQ data; tooling status, material and production availability are confirmed where the product page says order release is required."
      >
        <ul className="grid grid-cols-2 gap-[10px] sm:gap-[12px] lg:grid-cols-4">
          {profileFamily.map((item, index) => (
            <li key={item.slug}>
              <CoverCard
                href={item.href}
                cover={coverFor(item.href)!}
                label={<span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{item.keyword}</span>}
                title={item.name}
                text={item.summary}
                facts={[item.sizes]}
                action="Explore"
                priority={index < 4}
                compact
                sizes="(max-width: 1024px) 50vw, 300px"
              />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="applications"
        title="Start from the structure you need to replace"
        intro="Engineers often search by application before they know the profile geometry. These pages translate common use cases into resin systems, profile families, standards and RFQ inputs."
      >
        <h3 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Application guides</h3>
        <ul className="mt-[10px] grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-3">
          {applicationLinks.map((item) => (
            <li key={item.href}>
              <CoverLink href={item.href} cover={applicationCovers[item.href]} title={item.title} text={item.description} />
            </li>
          ))}
        </ul>
        <h3 className="mt-[28px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">Products made from these profiles</h3>
        <ul className="mt-[10px] grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
          {applicationProducts.map((item) => (
            <li key={item.href}>
              <CoverLink href={item.href} cover={coverFor(item.href)!} title={item.title} />
            </li>
          ))}
        </ul>
        <h3 className="mt-[28px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">Industries</h3>
        <ul className="mt-[10px] grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.href}>
              <CoverLink href={industry.href} cover={industryCovers[industry.href]} title={industry.title} />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="resins"
        title="Five resin systems, chosen by environment and code"
        tone="muted"
        intro="All pultruded FRP profiles in the F1 Composite range can be produced with the resin system required for your environment. Resin selection drives chemical resistance, fire performance, and long-term stiffness."
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14">
            <caption className="sr-only">Resin systems for pultruded FRP profiles</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={th}>Resin system</th>
                <th scope="col" className={th}>Typical use</th>
                <th scope="col" className={th}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {resinOptions.map((row) => (
                <tr key={row.system} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{row.system}</th>
                  <td className="px-[14px] py-[10px] text-t1">{row.use}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        id="comparison"
        title="Pultruded FRP vs steel vs aluminum"
        intro="Typical property bands for E-glass/polyester pultruded profiles compared with A36 carbon steel and 6061-T6 aluminum. Actual values vary by resin system, fiber architecture, and cross-section. Use this table as a first-pass material selection reference."
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14 tabular-nums">
            <caption className="sr-only">Pultruded FRP compared with carbon steel and aluminum</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={th}>Property</th>
                <th scope="col" className={th}>Pultruded FRP</th>
                <th scope="col" className={th}>Carbon steel</th>
                <th scope="col" className={th}>Aluminum</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.property} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.property}</th>
                  <td className="px-[14px] py-[10px] font-semibold text-t1">{row.frp}</td>
                  <td className="px-[14px] py-[10px] text-t2">{row.steel}</td>
                  <td className="px-[14px] py-[10px] text-t2">{row.aluminum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] text-f14 leading-golden text-t2">
          For a detailed comparison including cost analysis and lifecycle economics, see{" "}
          <Link href="/technology/frp-vs-traditional-materials" className={link}>FRP vs traditional materials</Link>.
        </p>
      </PageSection>

      <PageSection id="grades" title="What the EN 13706 grades E17 and E23 mean" tone="muted">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-[48px]">
          <div className="space-y-[12px] text-f16 leading-golden text-t2">
            <p>
              EN 13706-3 classifies pultruded structural profiles by their minimum full-section flexural modulus: <strong className="font-semibold text-t1">grade E17 = 17 GPa</strong> and <strong className="font-semibold text-t1">grade E23 = 23 GPa</strong> (the standard also requires the axial tensile modulus to meet the grade number). The grade is a minimum, not a typical value.
            </p>
            <p>
              F1 Composite&rsquo;s standard structural profiles are made to <strong className="font-semibold text-t1">E23</strong>, and sections with a high fiber content are stiffer than the 23 GPa minimum. Each property is paired with the test method that produces it.
            </p>
          </div>
          <div>
            <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
              <table className="w-full min-w-[560px] border-collapse text-left text-f14 tabular-nums">
                <caption className="sr-only">EN 13706 grades E17 and E23 with test methods</caption>
                <thead>
                  <tr className="border-b border-border-default bg-bg2">
                    <th scope="col" className={th}>Property</th>
                    <th scope="col" className={th}>Test method</th>
                    <th scope="col" className={th}>E17</th>
                    <th scope="col" className={th}>E23</th>
                  </tr>
                </thead>
                <tbody>
                  {en13706Rows.map((row) => (
                    <tr key={row.property} className="border-b border-border-default align-top last:border-b-0">
                      <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.property}</th>
                      <td className="whitespace-nowrap px-[14px] py-[10px] text-t3">{row.method}</td>
                      <td className="whitespace-nowrap px-[14px] py-[10px] text-t2">{row.e17}</td>
                      <td className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{row.e23}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-[12px] text-f14 leading-golden text-t3">
              Modulus rows are the EN 13706 grade definition; strength, density, glass content, and hardness are F1 characteristic values per the cited method. Per-size section properties (A, I<sub>x</sub>, S<sub>x</sub>, weight/m) are published on each{" "}
              <Link href="/products/fiberglass-structural-shapes" className={link}>shape datasheet</Link>, or compute them live in the{" "}
              <Link href="/frp-profile-calculator" className={link}>FRP profile calculator</Link>.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="quotations" title="Compare the same specification and delivery scope" intro={commercialFacts.pricing}>
        <dl className="grid grid-cols-1 gap-x-[32px] gap-y-[16px] md:grid-cols-2 lg:grid-cols-3">
          {quotationChecklist.map((item) => (
            <div key={item.topic} className="border-t border-border-default pt-[12px]">
              <dt className="text-f16 font-bold text-t1">{item.topic}</dt>
              <dd className="mt-[6px] text-f14 leading-golden text-t2">{item.requirement}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-[20px] max-w-[820px] text-f14 leading-golden text-t2">
          {commercialFacts.response}{" "}
          <Link href="/resources/evidence" className={link}>Review product evidence and document scope</Link>.
        </p>
      </PageSection>

      <PageSection id="glossary" title="Pultruded FRP terms, defined" tone="muted">
        <dl className="grid grid-cols-1 gap-x-[32px] md:grid-cols-2">
          {hubGlossary.map((g) => (
            <div key={g.term} className="border-t border-border-default py-[12px]">
              <dt className="text-f16 font-bold text-t1">{g.term}</dt>
              <dd className="mt-[4px] text-f14 leading-golden text-t2">{g.def}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-[16px] text-f14 text-t2">
          Full glossary: <Link href="/resources/glossary" className={link}>FRP and pultrusion terminology</Link>
        </p>
        <h3 className="mt-[40px] text-f20 font-bold text-t1">Datasheets and design data</h3>
        <ul className="mt-[16px] grid grid-cols-1 gap-[12px] md:grid-cols-3">
          {documents.map((document) => (
            <li key={document.file}>
              <DocumentCard card={libraryCard(document)} compact />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="tools" title="Size a pultruded FRP profile in your browser" intro="Check a section against your span and load, compare it with a steel or aluminum member, and get a planning price, all from the published section data.">
        <ul className="grid grid-cols-2 gap-[10px] sm:gap-[12px] lg:grid-cols-4">
          {tools.map((item) => (
            <li key={item.href}>
              <CoverCard href={item.href} cover={toolCovers[item.href]} title={item.title} text={item.text} action="Open the tool" compact sizes="(max-width: 1024px) 50vw, 300px" />
            </li>
          ))}
        </ul>
        <p className="mt-[16px] text-f14 leading-golden text-t2">
          Span tables by family:{" "}
          <Link href="/frp-span-tables#i-beam" className={link}>fiberglass I-beam</Link>,{" "}
          <Link href="/frp-span-tables#channel" className={link}>channel</Link> and{" "}
          <Link href="/frp-span-tables#square-tube" className={link}>tube</Link>, over simple spans of 1–6 m on an EN 13706 E23 basis with deflection checked.
        </p>
      </PageSection>

      <AnswerBlocks
        title="Pultruded FRP profiles — frequently asked questions"
        description="Short answers for specifying engineers, procurement managers, and contractors evaluating pultruded fiberglass profiles."
        items={faqItems}
        tone="muted"
      />

      <RelatedLinks
        title="Technical resources"
        background="white"
        groups={[
          {
            title: "Products",
            links: [
              { href: "/products/product-lines", label: "F1-STRUX, GRID, THERM and FORM lines" },
              { href: "/resources/blog/fiberglass-reinforced-plastic", label: "What fiberglass reinforced plastic is" },
              { href: "/technology/china-alternative-to-strongwell-fiberline-exel", label: "China alternative to Strongwell and Exel" },
              { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "How to choose an FRP supplier" },
              { href: "/about", label: "About F1 Composite" },
            ],
          },
          {
            title: "Engineering",
            links: [
              { href: "/technology/pultrusion-process", label: "Pultrusion process explained" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum and timber" },
              { href: "/technology/quality-testing", label: "Quality testing (EN 13706 and ASTM)" },
              { href: "/technology/pultruded-profile-performance", label: "Profile performance and standards" },
              { href: "/resources/design-guides", label: "Design guides" },
            ],
          },
          {
            title: "Data",
            links: [
              { href: "/resources/technical-data", label: "Data sheets and mechanical data" },
              { href: "/resources/downloads", label: "Downloads" },
              { href: "/datasheets", label: "Datasheets by size" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Specify pultruded FRP profiles for your next project" tone="deep">
        <ProductRfq product="Pultruded FRP profiles" productPath={pagePath} quoteHref={quoteHref} advisorPrompt={prefillForHub()} />
      </PageSection>
    </>
  );
}
