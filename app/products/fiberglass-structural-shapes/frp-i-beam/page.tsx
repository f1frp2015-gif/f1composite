import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ProfileFigure from "@/components/datasheets/ProfileFigure";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import ApplicationCards from "@/components/products/ApplicationCards";
import FamilySizeTable from "@/components/products/FamilySizeTable";
import HeroPhotos from "@/components/products/HeroPhotos";
import LaminateProperties from "@/components/products/LaminateProperties";
import ProductDocuments from "@/components/products/ProductDocuments";
import ProductPageNav from "@/components/products/ProductPageNav";
import ProductRfq from "@/components/products/ProductRfq";
import ProductSection from "@/components/products/ProductSection";
import RelatedProfiles from "@/components/products/RelatedProfiles";
import { supplyTerms, weeks } from "@/content/data/company";
import { commercialFacts } from "@/content/data/engineeringEvidence";
import { loadFamilySizes } from "@/lib/catalog/familySizes";
import { profileFamilyFacts } from "@/lib/profileFacts";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

// Size table is DB-driven (catalog admin) with the published seed catalog as
// build-safe fallback; refreshed hourly.
export const revalidate = 3600;

const pageTitle = "Fiberglass I-Beam — Pultruded FRP Wide Flange Beams & Sizes";
const pageDescription =
  "Pultruded fiberglass I-beams (FRP) 76×38–305×305 mm, 1.2–16 kg/m, about 75% lighter than steel, EN 13706 E23. Size and steel-weight table, DDP USA.";
const pagePath = "/products/fiberglass-structural-shapes/frp-i-beam";

const LAST_UPDATED = "2026-09-26";
const REVIEWER = { name: "Yifan Liu", title: "Application Engineer", href: "/about/authors/yifan-liu" };

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-i-beam/opengraph-image",
});

// Standard European steel sections (IPE, UB, UC) at the same nominal depth:
// reference masses for the weight comparison, not supplied by F1 Composite.
const steelAtSameDepth: Record<string, { section: string; mass: number }> = {
  "I 76×38×6.4": { section: "IPE 80", mass: 6.0 },
  "I 100×50×6": { section: "IPE 100", mass: 8.1 },
  "I 120×60×6": { section: "IPE 120", mass: 10.4 },
  "I 152×76×6.4": { section: "UB 152×89", mass: 16.0 },
  "I 160×80×8": { section: "IPE 160", mass: 15.8 },
  "I 200×100×10": { section: "IPE 200", mass: 22.4 },
  "I 240×120×12": { section: "IPE 240", mass: 30.7 },
  "I 300×150×15": { section: "IPE 300", mass: 42.2 },
  "I 305×305×12.7": { section: "UC 305×305", mass: 96.9 },
};

const specifyFrp = [
  "Corrosive service: coastal, chemical, wastewater, de-icing salt",
  "Electrical insulation or a non-magnetic structure is required",
  "Crews lift members by hand, with no crane or hot work",
  "Decades of service without recoating",
];

const stayWithSteel = [
  "Dry, inland service with a horizon under 15 years",
  "Long spans that would need a very deep FRP section",
  "Continuous service above about 60 °C",
  "The certifying authority does not accept FRP for the element",
];

// Four checks, in the order that usually decides an FRP beam.
const sizingSteps = [
  {
    title: "Deflection first",
    body: "FRP modulus is 17–28 GPa, about a tenth of steel. A section that meets L/240 or L/360 usually has a large margin in bending and shear.",
  },
  {
    title: "Add shear deflection",
    body: "With a shear modulus of about 3 GPa, shear adds 15–25% to bending deflection on short spans. 5wL⁴/384EI alone under-predicts; the calculator includes shear.",
  },
  {
    title: "Check flange buckling",
    body: "Thin flanges can buckle before the bending capacity is reached. Keep the outstanding flange b/t at or below about 18; check to ASCE/SEI 74-23 Ch. 3 or CEN/TS 19101 §6.",
  },
  {
    title: "Detail the connections",
    body: "Transverse strength is about a quarter of longitudinal: edge distance and spacing of at least 4 bolt diameters, oversized washers, snug-tight A4-316 bolts.",
  },
];

const crosswalk = [
  { topic: "Structural design code", eu: "CEN/TS 19101", na: "ASCE/SEI 74-23 (LRFD)", cn: "GB 50608 / CECS 692" },
  { topic: "Profile grade / tolerance", eu: "EN 13706 E17 / E23", na: "ASTM D3917", cn: "GB/T 31539" },
  { topic: "Tensile test", eu: "EN ISO 527-4", na: "ASTM D638", cn: "GB/T 1447" },
  { topic: "Flexural test", eu: "EN ISO 14125", na: "ASTM D790", cn: "GB/T 1449" },
  { topic: "Fire — surface flame spread", eu: "EN 13501-1", na: "ASTM E84", cn: "GB 8624" },
];

const faqItems = [
  {
    question: "How much lighter are FRP I-beams compared to steel?",
    answer:
      "At the same nominal depth, a pultruded FRP I-beam weighs about 68–83% less than the steel section. An FRP I 200×100×10 is 5.8 kg/m against 22.4 kg/m for a steel IPE 200, a 74% cut in lifting weight and dead load. Because FRP modulus is about a tenth of steel, a deflection-equal FRP member is usually one or two depths larger than the steel it replaces; the installed weight still drops by roughly 70%.",
  },
  {
    question: "Where do I get the section properties (Ix, Sx) for design?",
    answer:
      "The size table lists A, Ix and Wx (the elastic section modulus, also written Sx) for every size, calculated from the nominal, sharp-cornered section. Each size's datasheet adds Iy, the radii of gyration and the torsion constant. Use them for preliminary sizing, and confirm the section properties on the production datasheet of the profile you order: corner radii and wall tolerances change them slightly.",
  },
  {
    question: "Can FRP I-beams be used as primary structural members?",
    answer:
      "Yes: for walkways, pedestrian bridges, platforms, cooling towers and building frames. Because the elastic modulus is about a tenth of steel, deflection usually governs the design rather than strength. F1 Composite supplies the E23 laminate data, span and load calculation support, and connection detailing.",
  },
  {
    question: "What resin systems are available for I-beams?",
    answer:
      "Isophthalic polyester for general structural use, vinyl ester for aggressive chemical, chlorine or marine service, polyurethane for toughness, and phenolic for fire-critical or rail (EN 45545-2) applications. Resin choice drives chemical resistance and fire performance, not stiffness.",
  },
  {
    question: "Which standards do F1 Composite I-beams meet?",
    answer:
      "Profiles are produced to EN 13706 grade E23 (a longitudinal modulus of at least 23 GPa) with dimensional tolerances to ASTM D3917. Fire-retardant grades are available, with ASTM E84 flame-spread reports on request, as is the ISO 9001 certificate. Design references: ASCE/SEI 74-23 (US LRFD), CEN/TS 19101 (EU), GB 50608 / CECS 692 (China).",
  },
  {
    question: "What is the lead time and minimum order for FRP I-beams?",
    answer: `Catalog sections ship in ${weeks(supplyTerms.catalogLeadTimeWeeks)}; a variant on an existing die takes ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)} and a new die ${weeks(supplyTerms.newDieLeadTimeWeeks)}. A first custom run starts at ${supplyTerms.customMoqMeters.firstRun} m and repeats at ${supplyTerms.customMoqMeters.repeat} m; catalog quantities are confirmed per order. Beams come in ${supplyTerms.standardLengthM} m lengths or cut to your length.`,
  },
];

const applications = [
  {
    href: "/case-studies/factory-access-staircase",
    kind: "Case study",
    title: "Factory access staircase",
    text: "A bolted FRP stair in our Chongqing plant, assembled by four people with hand tools: no welding, hot work or crane.",
    image: "/images/case-studies/frp-factory-staircase-structural-view.webp",
    imageAlt: "FRP I-beam stringers and pultruded profiles forming a staircase frame in F1 Composite's factory",
    used: "I-beam stringers and landing beams with square tubes, in vinyl ester",
  },
  {
    href: "/case-studies/beam-bridge",
    kind: "Design guide",
    title: "Beam bridge design",
    text: "Longitudinal I-beams, cross-members and a deck: the usual starting point for a pedestrian or cycle bridge cost study.",
    image: "/images/case-studies/beam-bridge/pedestrian-cycle-bridge-section.svg",
    imageAlt: "Cross-section of a pedestrian bridge: longitudinal I-girders under the deck, with barriers, drainage and bearings",
    fit: "contain" as const,
  },
  {
    href: "/applications/frp-chemical-plant-platforms",
    kind: "Application",
    title: "Chemical plant platforms",
    text: "I-beams and channels carry the floor; grating, stair treads and handrails complete an access system for acid splash and washdown.",
    image: "/images/case-studies/frp-chemical-plant-access-platform.jpg",
    imageAlt: "Chemical plant with access platforms, grating and handrails",
  },
];

export default async function IBeamPage() {
  const sizes = await loadFamilySizes("i-beam");
  const rows = sizes.map((size) => {
    const steel = steelAtSameDepth[size.model];
    const saving = steel && size.mass ? Math.round((1 - size.mass / steel.mass) * 100) : null;
    return { ...size, extra: steel ? { steel: steel.section, steelMass: steel.mass.toFixed(1), saving: saving == null ? "—" : `${saving}%` } : undefined };
  });

  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP I-Beam Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/i-beam/frp-i-beam-profile-200x100x10mm.webp",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin", "Phenolic resin"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
          reviewedBy: { name: REVIEWER.name, jobTitle: REVIEWER.title, path: REVIEWER.href },
        })}
      />
      <PageHeader
        tag="I-Beam"
        line={{ name: "F1-STRUX", label: "I-beam" }}
        updated={LAST_UPDATED}
        reviewer={REVIEWER}
        title="Fiberglass I-Beam (FRP) Profiles"
        description="Wide-flange pultruded fiberglass I-beams from 76×38 to 305×305 mm, 68–83% lighter than a steel section of the same depth. They do not rust, and deflection rather than strength usually decides the size."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Depth", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Grade", value: "EN 13706 E23" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "product-header", product: "FRP I-beams", productPath: pagePath }) },
          secondary: { label: "Find a size", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <>
            <ProfileFigure model="I 152×76×6.4" />
            <HeroPhotos
              photos={[
                { src: "/images/products/i-beam/frp-i-beam-profile-200x100x10mm.webp", alt: "Rendering of a pultruded FRP I-beam", caption: "I 200×100×10 · render" },
                { src: "/images/technology/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
              ]}
            />
          </>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/fiberglass-structural-shapes" },
          { label: "I-Beam" },
        ]}
      />

      <ProductPageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "sizes", label: "Sizes", count: sizes.length },
          { id: "properties", label: "Properties & design" },
          { id: "applications", label: "Applications" },
          { id: "documents", label: "Documents" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <ProductSection id="overview" title="Overview">
        <div className="grid grid-cols-1 gap-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-relaxed text-t2">
            <p>
              A pultruded FRP I-beam is a constant-section fiberglass wide-flange beam, pulled through resin and a heated die. Roving in the flanges gives bending stiffness, mat in the web carries shear, and a surface veil forms a resin-rich outer layer.
            </p>
            <p>
              It carries bending like a steel I-beam at a fraction of the weight, without rust. With about a tenth of the modulus of steel, it is sized by deflection.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["EN 13706 E23", "ASTM D3917 tolerances", `${supplyTerms.standardLengthM} m lengths or cut to size`, "Polyester, vinyl ester, PU, phenolic"].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-[12px] sm:grid-cols-2">
            <div className="rounded-card border border-teal-border bg-teal-bg p-[18px]">
              <h3 className="text-f16 font-bold text-teal-text">Specify FRP when</h3>
              <ul className="mt-[8px] space-y-[8px] text-f14 leading-golden text-t2">
                {specifyFrp.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-border-default bg-bg2 p-[18px]">
              <h3 className="text-f16 font-bold text-t1">Stay with steel when</h3>
              <ul className="mt-[8px] space-y-[8px] text-f14 leading-golden text-t2">
                {stayWithSteel.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="text-f14 text-t3 sm:col-span-2">
              Cost and lifecycle comparison:{" "}
              <Link href="/technology/frp-vs-traditional-materials" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
                FRP vs steel, aluminum and timber
              </Link>
            </p>
          </div>
        </div>
      </ProductSection>

      <ProductSection
        id="sizes"
        title="Sizes"
        count={`${sizes.length} catalog sizes`}
        tone="muted"
        intro="Dimensions in mm, mass in kg/m. Ix and Wx are calculated from the nominal section, for preliminary sizing; the steel columns compare IPE, UB and UC sections of the same depth, for reference."
        aside={
          <Link href="/tools/profile-finder?shape=i_beam" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Filter and compare in the profile finder
          </Link>
        }
      >
        <FamilySizeTable
          rows={rows}
          caption="FRP I-beam catalog sizes with nominal section properties and the steel section of the same depth"
          product="FRP I-beam"
          productPath={pagePath}
          columns={[
            { key: "d", label: "H", unit: "mm" },
            { key: "b", label: "B", unit: "mm" },
            { key: "t", label: "t", unit: "mm" },
            { key: "mass", label: "Mass", unit: "kg/m" },
            { key: "Ix", label: "Ix", unit: "cm⁴" },
            { key: "Wx", label: "Wx", unit: "cm³" },
          ]}
          extras={[
            { key: "steel", label: "Steel, same depth" },
            { key: "steelMass", label: "Steel", unit: "kg/m" },
            { key: "saving", label: "Lighter" },
          ]}
        />
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t3">
          A deflection-equal FRP section is usually one or two depths larger than the steel it replaces, and still about 70% lighter installed. {commercialFacts.availability}
        </p>
        <p className="mt-[10px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/frp-span-tables#i-beam" className="underline underline-offset-4 hover:text-teal">
            Allowable loads by span
          </Link>
          <Link href="/products/custom-pultruded-profiles" className="underline underline-offset-4 hover:text-teal">
            A size not listed: custom pultrusion
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="properties" title="Properties and design">
        <LaminateProperties />
        <div className="mt-[40px]">
          <h3 className="text-f18 font-bold text-t1">Sizing an FRP I-beam</h3>
          <ol className="mt-[12px] grid gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
            {sizingSteps.map((step, index) => (
              <li key={step.title} className="rounded-card border border-border-default bg-white p-[16px]">
                <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Check {index + 1}</span>
                <h4 className="mt-[4px] text-f16 font-bold text-t1">{step.title}</h4>
                <p className="mt-[6px] text-f14 leading-golden text-t2">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-[16px] grid grid-cols-1 items-start gap-[16px] lg:grid-cols-2">
            <CalculatorCTA
              href="/frp-profile-calculator#shape=i-beam&span=3000&load=5&env=outdoor&material=frp-e23&load_type=udl&defl=360"
              eyebrow="Worked example · 3 m walkway beam"
              title="Size a 3 m walkway I-beam at 5 kN/m, L/360, outdoor"
              sub="Opens the calculator with this load case on an E23 I-beam: which check governs, the steel-equivalent section and the deflection with shear included."
            />
            <details className="group rounded-card border border-border-default bg-white">
              <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-[12px] px-[16px] text-f16 font-bold text-t1 [&::-webkit-details-marker]:hidden">
                Standards by region: EU, US, China
                <span aria-hidden className="text-teal-text transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="relative overflow-x-auto border-t border-border-default">
                <table className="w-full border-collapse text-left text-f14">
                  <thead>
                    <tr className="border-b border-border-default bg-bg2">
                      {["Topic", "Europe", "North America", "China"].map((heading) => (
                        <th key={heading} scope="col" className="whitespace-nowrap px-[12px] py-[8px] font-semibold text-t1">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {crosswalk.map((row) => (
                      <tr key={row.topic} className="border-b border-border-default last:border-b-0">
                        <th scope="row" className="px-[12px] py-[8px] font-normal text-t1">{row.topic}</th>
                        <td className="px-[12px] py-[8px] text-t2">{row.eu}</td>
                        <td className="px-[12px] py-[8px] text-t2">{row.na}</td>
                        <td className="px-[12px] py-[8px] text-t2">{row.cn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </div>
      </ProductSection>

      <ProductSection id="applications" title="Applications" tone="muted">
        <ApplicationCards cards={applications} />
        <p className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/industries/infrastructure" className="underline underline-offset-4 hover:text-teal">
            Infrastructure and bridges
          </Link>
          <Link href="/applications/frp-bridge-deck-panels" className="underline underline-offset-4 hover:text-teal">
            Bridge deck panels
          </Link>
          <Link href="/industries/industrial" className="underline underline-offset-4 hover:text-teal">
            Industrial and chemical plants
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="documents" title="Documents">
        <ProductDocuments productPaths={[pagePath, "/products/fiberglass-structural-shapes"]} family={{ label: "I-beam", datasheetsHref: "/datasheets#i-beam" }} sizes={sizes} />
      </ProductSection>

      <ProductSection id="faq" title="Questions buyers ask" tone="muted">
        <div className="grid items-start gap-[12px] md:grid-cols-2">
          {faqItems.map((item) => (
            <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
        <p className="mt-[18px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/what-is-frp" className="underline underline-offset-4 hover:text-teal">
            What is FRP?
          </Link>
          <Link href="/resources/design-guides" className="underline underline-offset-4 hover:text-teal">
            Design guides (ASCE, EN 13706)
          </Link>
          <Link href="/resources/glossary" className="underline underline-offset-4 hover:text-teal">
            FRP and pultrusion glossary
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="related" title="Other standard profiles">
        <RelatedProfiles current={pagePath} />
      </ProductSection>

      <ProductSection id="quote" title="Quote FRP I-beams" tone="deep">
        <ProductRfq product="FRP I-beams" productPath={pagePath} links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]} />
      </ProductSection>
    </>
  );
}
