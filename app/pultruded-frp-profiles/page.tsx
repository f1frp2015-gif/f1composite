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
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { prefillForHub } from "@/lib/aiPrefill";

const pageTitle =
  "Pultruded FRP Profiles — Fiberglass Structural Shapes Manufacturer";
const pageDescription =
  "Pultruded FRP profiles manufacturer for structural shapes, window frames, gratings and custom pultrusions. EN 13706, ASTM D3917, 370 lines, global export.";
const pagePath = "/pultruded-frp-profiles";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const profileFamily: Array<{
  slug: string;
  name: string;
  keyword: string;
  sizes: string;
  summary: string;
  href: string;
  image: string;
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
      "Yes. F1 Composite manufactures to EN 13706-1/2/3 (European pultruded profile standard, E17 and E23 grades) and ASTM D3917 (dimensional tolerances). Mechanical testing follows ASTM D638 (tensile), D790 (flexural), and D695 (compression). The company holds ISO 9001:2015, and fire-rated products are certified to BS 476, ASTM E84, and EN 45545-2.",
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
      "F1 Composite manufactures to the same EN 13706 / ASTM D3917 specifications as Strongwell (EXTREN®), Fiberline Composites, and Creative Pultrusions (SuperStrut®). The differentiators are scale (370 pultrusion lines, 150,000 t/year), direct-from-factory pricing without regional distributor markups, and custom tooling turnaround for export markets.",
  },
];

export default function PultrudedFRPProfilesHubPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pultruded FRP Profiles — Complete Product Range",
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
  };

  return (
    <>
      <JsonLd data={collectionSchema} />

      <PageHeader
        tag="Pultruded FRP Profiles"
        title="Pultruded FRP profiles manufacturer — complete product hub"
        description="F1 Composite manufactures the full pultruded fiberglass profile range: standard structural shapes, custom pultrusions, FRP window frames, gratings, and structural deck panels. Standard shapes are listed in the stock catalog; this hub maps the complete product family, standards, applications, and quote path."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pultruded FRP Profiles" },
        ]}
      />

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
                length — standard packaging is 6 m or 12 m.
              </p>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                Compared to conventional materials, pultruded fiberglass reinforced
                polymer (also called GRP — glass reinforced polymer — or fibre
                reinforced plastic) is approximately{" "}
                <strong className="text-t1">75% lighter than steel</strong>,{" "}
                <strong className="text-t1">corrosion-immune</strong>,{" "}
                <strong className="text-t1">electrically non-conductive</strong>,
                and has <strong className="text-t1">thermal conductivity 170× lower than steel</strong>.
                Pultruded FRP is used in bridges, walkways, cooling towers, offshore
                platforms, chemical plants, rail, solar farms, and passive-house
                window systems worldwide.
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
          <p className="mt-[21px] max-w-[800px] text-f15 leading-golden text-t2">
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
          <p className="mt-[13px] max-w-[760px] text-f15 leading-golden text-t2">
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
          <p className="mt-[21px] max-w-[800px] text-f15 leading-golden text-t2">
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
          <p className="mt-[21px] max-w-[800px] text-f15 leading-golden text-t2">
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
            <LinkArrow href="/technology/pultrusion-process">Pultrusion process explained</LinkArrow>
            <LinkArrow href="/technology/frp-vs-traditional-materials">FRP vs steel / aluminum / timber</LinkArrow>
            <LinkArrow href="/technology/quality-testing">Quality testing (EN 13706 / ASTM)</LinkArrow>
            <LinkArrow href="/technology/calculator">Deflection & load calculator</LinkArrow>
            <LinkArrow href="/resources/technical-data">Data sheets &amp; mechanical data</LinkArrow>
            <LinkArrow href="/resources/design-guides">Design guides</LinkArrow>
            <LinkArrow href="/resources/downloads">Downloads</LinkArrow>
            <LinkArrow href="/about">About F1 Composite</LinkArrow>
          </div>
        </div>
      </section>

      <AnswerBlocks
        tag="Buyer FAQ"
        title="Pultruded FRP profiles — frequently asked questions"
        description="Short answers for specifying engineers, procurement managers, and contractors evaluating pultruded fiberglass profiles."
        items={faqItems}
        suppressSchema
      />

      <AskAICard
        title="Not sure which profile family fits your project?"
        description="Describe your application and the FRP Engineering Advisor will recommend the right product family, resin system, standards, and quote path."
        prefill={prefillForHub()}
      />

      <InnerCTA title="Specify pultruded FRP profiles for your next project" />
    </>
  );
}
