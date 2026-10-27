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
import JsonLd from "@/components/seo/JsonLd";
import CoverCard from "@/components/ui/CoverCard";
import CoverLink from "@/components/ui/CoverLink";
import Figure from "@/components/ui/Figure";
import { company, supplyTerms, weeks } from "@/content/data/company";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { prefillForHub } from "@/lib/aiPrefill";
import { authorsBySlug, reviewerCredit } from "@/lib/authors";
import { loadFamilySizes, type ProfileCategory } from "@/lib/catalog/familySizes";
import { applicationCovers, coverFor, toolCovers } from "@/lib/covers";
import { assembleDocuments } from "@/lib/documents";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

// The size summary reads the same catalog as the family pages (DB-backed,
// seed fallback); refresh hourly like them.
export const revalidate = 3600;

const pagePath = "/pultruded-frp-profiles";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

// One owner per query: this page owns "pultruded FRP profiles". It shows the
// catalog at a glance and sends each topic to the page that owns it
// (process, materials, grades, glossary, comparisons) instead of repeating it.

// The seven standard families, in catalog order. The range column reads the
// dimension each family page uses for its own header facts.
const standardFamilies: Array<{ category: ProfileCategory; name: string; measure: string; prefix?: string; href: string }> = [
  { category: "i-beam", name: "I-beam / wide flange", measure: "Depth", href: "/products/fiberglass-structural-shapes/frp-i-beam" },
  { category: "channel", name: "Channel (C and U)", measure: "Depth", href: "/products/fiberglass-structural-shapes/frp-channel" },
  { category: "angle", name: "Angle (L)", measure: "Leg", href: "/products/fiberglass-structural-shapes/frp-angle" },
  { category: "square-tube", name: "Square & rectangular tube", measure: "Outer size", href: "/products/fiberglass-structural-shapes/frp-square-tube" },
  { category: "round-tube", name: "Round tube", measure: "Outside diameter", href: "/products/fiberglass-structural-shapes/frp-tube" },
  { category: "rod", name: "Solid rod", measure: "Diameter", prefix: "Ø", href: "/products/fiberglass-structural-shapes/frp-rod" },
  { category: "flat-bar", name: "Flat bar", measure: "Width", href: "/products/fiberglass-structural-shapes/frp-flat-bar" },
];

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

// Products built from these profiles. The product hub keeps a link to each
// specialist page so buyers who start from the use find the profile.
const applicationProducts = [
  { href: "/products/fiberglass-dog-bone", title: "Fiberglass dog bone profiles" },
  { href: "/products/frp-solar-mounting-systems", title: "Solar frames and supports" },
  { href: "/products/wind-turbine-blade-panels", title: "Wind turbine blade panels" },
  { href: "/products/frp-rebar", title: "GFRP rebar" },
  { href: "/products/frp-gratings", title: "Pultruded grating" },
  { href: "/products/frp-handrail-systems", title: "Handrails" },
  { href: "/products/frp-ladders", title: "Ladders" },
  { href: "/products/frp-sound-barrier-wall", title: "Sound barrier profiles" },
  { href: "/products/fiberglass-stakes", title: "Fiberglass stakes" },
  { href: "/products/fiberglass-snow-markers", title: "Fiberglass driveway markers" },
] as const;

const applicationLinks = [
  {
    href: "/applications/frp-cable-tray-supports",
    title: "FRP cable tray supports",
    description: "Non-conductive pultruded channels, angles and brackets for substations, tunnels and corrosive cable routing.",
  },
  {
    href: "/applications/frp-cooling-tower-profiles",
    title: "FRP cooling tower profiles",
    description: "Vinyl ester beams, tubes, louvers and access members for wet, chlorinated, high-humidity cooling tower structures.",
  },
  {
    href: "/applications/frp-bridge-deck-panels",
    title: "FRP bridge deck panels",
    description: "Closed-top deck planks, gratings and support profiles for pedestrian bridges and lightweight deck replacement.",
  },
  {
    href: "/applications/frp-solar-mounting-profiles",
    title: "FRP solar mounting profiles",
    description: "UV-stable pultruded beams, channels and posts for solar farms where weight, corrosion and electrical isolation matter.",
  },
  {
    href: "/applications/frp-chemical-plant-platforms",
    title: "FRP chemical plant platforms",
    description: "Corrosion-resistant beams, gratings, stair treads and handrails for acid splash zones and process access platforms.",
  },
  {
    href: "/applications/frp-pedestrian-bridge-superstructures",
    title: "FRP pedestrian bridges",
    description: "I-beam girders, cross-members and deck panels for footbridges and cycle bridges with a bolted assembly.",
  },
];

const hubDownloads = [
  "/downloads/f1composite-frp-profile-design-manual-2026-rev-b.pdf",
  "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf",
  "/downloads/f1composite-wind-energy-pultruded-laminate-datasheet.pdf",
  "/downloads/f1composite-epd-carbon-footprint-frp-profiles-2025.pdf",
];
const designManualHref = hubDownloads[0];

const tools = [
  { href: "/tools/profile-finder", title: "Profile finder", text: "Filter the standard sizes by shape, size, mass and stiffness." },
  { href: "/frp-profile-calculator", title: "Profile calculator", text: "Bending, shear and deflection for a section, span and load, with the steel equivalent." },
  { href: "/frp-span-tables", title: "Span tables", text: "Allowable uniform loads for every standard I-beam, channel and tube over 1–6 m." },
  { href: "/fiberglass-pultruded-profile-price", title: "Price estimator", text: "A budget price range per meter, with quantity breaks." },
] as const;

// Where each topic lives. The hub states the fact in one line and links out.
const topicLinks = [
  { href: "/technology/pultrusion-process", title: "Pultrusion process", text: "Reinforcement, resin impregnation, the heated die and cut-off, step by step." },
  { href: "/technology/pultrusion-resin-systems", title: "Resin systems", text: "Isophthalic polyester, vinyl ester, polyurethane, phenolic and epoxy: where each is specified." },
  { href: "/technology/quality-testing", title: "EN 13706 grades and testing", text: "What E17 and E23 mean, the test methods behind each property, and the reports supplied." },
  { href: "/technology/frp-vs-traditional-materials", title: "FRP vs steel, aluminum and timber", text: "Density, strength, modulus, conductivity and installed cost, with a worked comparison." },
  { href: "/resources/how-to-choose-frp-pultrusion-supplier", title: "Choosing a pultrusion supplier", text: "What to check before ordering from any FRP manufacturer: documents, samples, inspection and terms." },
  { href: "/resources/glossary", title: "Pultrusion glossary", text: "Roving, mat, veil, Barcol hardness and the other terms on a profile datasheet." },
] as const;

// Five purchasing questions, each answered in under 50 words.
const faqItems = [
  {
    question: "What are pultruded FRP profiles?",
    answer:
      "Continuous fiberglass structural shapes made by pulling glass reinforcement through a resin bath and a heated steel die. The cross-section is constant along the length: I-beams, channels, angles, tubes, rods and flat bars, with 65–70% glass fiber by weight.",
  },
  {
    question: "Which standards do the profiles meet?",
    answer:
      "Standard structural profiles are made to EN 13706 grade E23 (full-section flexural modulus of at least 23 GPa) with dimensional tolerances to ASTM D3917. Mechanical tests follow ASTM D638, D790 and D695. ISO 9001 and fire-test reports are supplied with the holder, number and scope.",
  },
  {
    question: "What is the lead time for pultruded FRP profiles?",
    answer: `Catalog sections ship in ${weeks(supplyTerms.catalogLeadTimeWeeks)}. A variant on existing tooling takes ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)}; a new die ${weeks(supplyTerms.newDieLeadTimeWeeks)} including die manufacture. The standard length is ${supplyTerms.standardLengthM} m, with cut lengths on request. Production timing is confirmed in the quotation.`,
  },
  {
    question: "Is there a minimum order quantity?",
    answer: `Catalog sections have no fixed minimum. Custom profiles start at ${supplyTerms.customMoqMeters.firstRun} linear meters for the first production run and ${supplyTerms.customMoqMeters.repeat} m for repeat orders; tooling is quoted separately.`,
  },
  {
    question: "Can I order in inches and buy direct?",
    answer: `Yes. The size summary on this page shows inches beside millimeters, and drawings in either unit are accepted. F1 Composite sells direct from the FengDu production network, FOB or DDP, to ${company.exportCountries} countries. Send the section, length, quantity and destination for a quote.`,
  },
];

const LAST_UPDATED = "2026-10-27";
const REVIEWER = { name: "Yifan Liu", title: "Application Engineer", slug: "yifan-liu" };
const AUTHOR = { name: "Dr. Haifeng Gong", title: "R&D Lead, Materials & Standards", slug: "haifeng-gong" };
const quoteHref = buildRfqHref({ source: "pultruded-profiles-hub", product: "Pultruded FRP profiles", productPath: pagePath });
const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const th = "px-[14px] py-[8px] font-semibold text-t1";

const trim = (value: number) => String(Number(value.toFixed(1)));
const range = (values: number[]) => {
  const valid = values.filter((value) => Number.isFinite(value) && value > 0);
  return valid.length ? ([Math.min(...valid), Math.max(...valid)] as const) : null;
};
const kgPerMToLbPerFt = (value: number) => value * 0.67197;
// A range reads better at one decimal than the three the per-size tables use.
const inches = (mm: number) => trim(mm / 25.4);

export default async function PultrudedFRPProfilesHubPage() {
  const families = await Promise.all(
    standardFamilies.map(async (family) => {
      const sizes = await loadFamilySizes(family.category);
      return {
        ...family,
        count: sizes.length,
        dims: range(sizes.map((size) => size.d)),
        mass: range(sizes.map((size) => size.mass ?? NaN)),
      };
    }),
  );
  const sizeCount = families.reduce((sum, family) => sum + family.count, 0);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pultruded FRP Profiles — Standard Sizes & Custom Sections",
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
        title="Pultruded FRP profiles"
        description={`Fiberglass (GRP) structural sections, standard and custom: ${sizeCount} catalog sizes in seven shapes, plus sheets, hollow plates, deck panels, window lineals and custom dies. Made to EN 13706 E23 and ASTM D3917, sized in mm and inches, shipped FOB or DDP to ${company.exportCountries} countries.`}
        facts={[
          { label: "Catalog sizes", value: String(sizeCount) },
          { label: "Standards", value: "EN 13706 E23 · ASTM D3917" },
          { label: "Catalog lead time", value: weeks(supplyTerms.catalogLeadTimeWeeks) },
          { label: "Custom MOQ", value: `${supplyTerms.customMoqMeters.firstRun} m first run` },
        ]}
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: { label: "Download design manual (PDF)", href: designManualHref, variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Finished pultruded profiles" caption="Pultruded sections on the inspection tables of a FengDu plant: the production network F1 Composite exports from." bleed>
            <Image src="/images/f1-photos/f1-composite-pultrusion-plant-floor.webp" alt="Finished pultruded FRP profiles on inspection tables in a FengDu pultrusion plant" width={2000} height={832} preload sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" />
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pultruded FRP Profiles" },
        ]}
      />
      <PageNav
        items={[
          { id: "sizes", label: "Sizes" },
          { id: "families", label: "Families" },
          { id: "tools", label: "Tools" },
          { id: "applications", label: "Applications" },
          { id: "buy", label: "How to buy" },
          { id: "downloads", label: "Downloads" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection
        id="sizes"
        title="Standard sizes at a glance"
        count={`${sizeCount} catalog sizes`}
        tone="muted"
        intro="The seven standard shapes, with the catalog range of each. Open a shape for every size with dimensions, mass and section properties, or filter all of them in the profile finder."
        aside={
          <Link href="/tools/profile-finder" className={link}>
            Filter and compare in the profile finder
          </Link>
        }
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-f14 tabular-nums">
            <caption className="sr-only">Standard pultruded FRP profile families with catalog size ranges and mass</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={th}>Shape</th>
                <th scope="col" className={th}>Sizes</th>
                <th scope="col" className={th}>Range</th>
                <th scope="col" className={th}>Mass</th>
                <th scope="col" className={th}><span className="sr-only">Open</span></th>
              </tr>
            </thead>
            <tbody>
              {families.map((family) => (
                <tr key={family.category} className="group border-b border-border-default align-top last:border-b-0 hover:bg-bg2">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">
                    <Link href={family.href} className="text-teal-text underline decoration-teal-border underline-offset-4 hover:text-teal">{family.name}</Link>
                  </th>
                  <td className="px-[14px] py-[10px] text-t1">{family.count}</td>
                  <td className="px-[14px] py-[10px] text-t1">
                    {family.dims ? (
                      <>
                        <span className="text-t3">{family.measure} </span>
                        {family.prefix}{trim(family.dims[0])}–{trim(family.dims[1])} mm
                        <span className="block whitespace-nowrap text-f12 text-t3">≈ {inches(family.dims[0])}–{inches(family.dims[1])} in</span>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-[14px] py-[10px] text-t1">
                    {family.mass ? (
                      <>
                        {trim(family.mass[0])}–{trim(family.mass[1])} kg/m
                        <span className="block whitespace-nowrap text-f12 text-t3">≈ {trim(kgPerMToLbPerFt(family.mass[0]))}–{trim(kgPerMToLbPerFt(family.mass[1]))} lb/ft</span>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-[14px] py-[6px]">
                    <Link href={family.href} className="inline-flex min-h-[36px] items-center rounded-control border border-border-default px-[10px] text-f14 font-semibold text-teal-text hover:bg-teal-bg">
                      Sizes & datasheets
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t3">
          Dimensions are nominal catalog values in millimeters with approximate inches; mass is the published catalog value. {supplyTerms.standardLengthM} m standard length, cut to length on request. A size not listed is quoted as a{" "}
          <Link href="/products/custom-pultruded-profiles" className={link}>custom pultruded profile</Link>.
        </p>
      </PageSection>

      <PageSection
        id="families"
        title="Standard sections and custom pultruded profiles"
        count={`${profileFamily.length} families`}
        intro="Each family has its own page with published geometry, selection inputs and the details a quotation needs. Pultrusion pulls glass reinforcement and resin through a heated die, so every profile has a constant cross-section along its length; the same sections are also specified as GRP or fiberglass structural shapes."
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
        <div className="mt-[24px] grid grid-cols-1 gap-[16px] text-f14 leading-golden text-t2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-[40px]">
          <p>
            F1 Composite supplies these profiles{" "}
            <Link href="/products/frp-pultrusion-manufacturer-factory-direct" className={link}>direct from the FengDu production network</Link>
            {" "}({company.production.lines} pultrusion lines, {company.production.bases} manufacturing bases). The four product lines group them for ordering:{" "}
            <Link href="/products/fiberglass-structural-shapes" className={link}>F1-STRUX</Link> structural profiles,{" "}
            <Link href="/products/product-lines" className={link}>F1-GRID</Link> gratings and deck panels,{" "}
            <Link href="/products/frp-window-frames" className={link}>F1-THERM</Link> window frames and{" "}
            <Link href="/products/custom-pultruded-profiles" className={link}>F1-FORM</Link> custom pultrusions.
          </p>
          <p>
            New to the material? Start with{" "}
            <Link href="/resources/blog/fiberglass-reinforced-plastic" className={link}>what fiberglass reinforced plastic is</Link>
            {" "}and the{" "}
            <Link href="/what-is-frp#terminology" className={link}>FRP, GRP and GFRP terminology</Link>. Carbon and carbon-glass hybrid pultrusions are{" "}
            <Link href="/products/pultrusion-carbon-fiber" className={link}>listed separately</Link>.
          </p>
        </div>
      </PageSection>

      <PageSection id="tools" title="Size a pultruded FRP profile in your browser" tone="muted" intro="Check a section against your span and load, compare it with a steel or aluminum member, and get a planning price, all from the published section data.">
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

      <PageSection
        id="applications"
        title="Start from the structure you need to build"
        intro="Engineers often search by application before they know the profile geometry. These guides translate a use into profile families, resin systems, standards and the inputs a quotation needs."
      >
        <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-3">
          {applicationLinks.map((item) => (
            <li key={item.href}>
              <CoverLink href={item.href} cover={applicationCovers[item.href]} title={item.title} text={item.description} />
            </li>
          ))}
        </ul>
        <div className="mt-[24px] grid grid-cols-1 gap-[16px] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-[40px]">
          <div>
            <h3 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Products made from these profiles</h3>
            <ul className="mt-[8px] flex flex-wrap gap-x-[16px] gap-y-[6px] text-f14 font-semibold">
              {applicationProducts.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-teal-text hover:underline">{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-f14 leading-golden text-t2">
            By sector:{" "}
            <Link href="/industries" className={link}>industries</Link> for construction, infrastructure, energy, marine, water and industrial projects, and{" "}
            <Link href="/applications" className={link}>all applications</Link>.
          </p>
        </div>
      </PageSection>

      <PageSection id="buy" title="How to buy pultruded FRP profiles" tone="muted" intro={commercialFacts.pricing}>
        <dl className="grid grid-cols-1 gap-x-[32px] gap-y-[16px] md:grid-cols-2 lg:grid-cols-3">
          {quotationChecklist.map((item) => (
            <div key={item.topic} className="border-t border-border-default pt-[12px]">
              <dt className="text-f16 font-bold text-t1">{item.topic}</dt>
              <dd className="mt-[6px] text-f14 leading-golden text-t2">{item.requirement}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-[20px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold">
          {[
            { href: "/fiberglass-pultruded-profile-price", label: "Budget price range per meter" },
            { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "FOB and DDP delivery terms" },
            { href: "/technology/china-alternative-to-strongwell-fiberline-exel", label: "Compared with Strongwell, Fiberline and Exel" },
            { href: "/resources/evidence", label: "Test reports and certificates" },
          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="downloads" title="Datasheets, design data and reference pages">
        <ul className="grid grid-cols-1 gap-[12px] md:grid-cols-2 lg:grid-cols-4">
          {documents.map((document) => (
            <li key={document.file}>
              <DocumentCard card={libraryCard(document)} compact />
            </li>
          ))}
        </ul>
        <ul className="mt-[20px] grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
          {topicLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group flex h-full flex-col rounded-card border border-border-default bg-white p-[16px] transition-colors hover:border-teal">
                <span className="text-f16 font-bold text-t1 group-hover:text-teal-text">{item.title}</span>
                <span className="mt-[6px] text-f14 leading-golden text-t2">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-[14px] text-f14 text-t2">
          Per-size datasheets: <Link href="/datasheets" className={link}>datasheets by size</Link> · All files: <Link href="/resources/downloads" className={link}>downloads</Link>
        </p>
      </PageSection>

      <AnswerBlocks
        title="Pultruded FRP profiles — frequently asked questions"
        description="Short answers for specifying engineers, procurement managers and contractors."
        items={faqItems}
        tone="muted"
      />

      <PageSection id="quote" title="Specify pultruded FRP profiles for your next project" tone="deep">
        <ProductRfq product="Pultruded FRP profiles" productPath={pagePath} quoteHref={quoteHref} advisorPrompt={prefillForHub()} />
      </PageSection>
    </>
  );
}
