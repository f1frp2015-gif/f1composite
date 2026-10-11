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
  "Compare fiberglass I-beam sizes, catalog weights and nominal section properties. Define spans, loads, connections and material requirements for a project quote.";
const pagePath = "/products/fiberglass-structural-shapes/frp-i-beam";

const LAST_UPDATED = "2026-10-11";
const REVIEWER = { name: "Yifan Liu", title: "Application Engineer", href: "/about/authors/yifan-liu" };

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-i-beam/opengraph-image",
});

const specifyFrp = [
  "Exposure conditions justify reviewing a corrosion-resistant material",
  "Electrical or magnetic requirements can be assessed for the proposed laminate and assembly",
  "Member weight and a bolted assembly could improve the handling plan",
  "The available section depth and connections suit the required stiffness",
];

const compareAlternatives = [
  "Section depth is restricted or span and deflection requirements are demanding",
  "Temperature or fire requirements exceed the available material evidence",
  "The proposed connection or support detail cannot be qualified",
  "Project approvals, installed cost and maintenance favour another material",
];

// Preliminary member selection still requires the project's full design checks.
const sizingSteps = [
  {
    title: "Deflection first",
    body: "Use the proposed laminate's stiffness, the actual span and the project's deflection limit. Check bending and shear resistance separately; meeting a deflection limit does not establish either capacity.",
  },
  {
    title: "Add shear deflection",
    body: "Evaluate bending and shear deformation with the relevant moduli and section geometry. Their relative contributions change with the span, support and load case; a fixed percentage is not a reliable allowance.",
  },
  {
    title: "Check stability and sustained load",
    body: "Review flange and web slenderness, lateral restraint, local bearing and the effects of sustained loading. Apply the design basis and material data accepted for the project.",
  },
  {
    title: "Detail the connections",
    body: "Define supports, holes, fasteners, bearing areas and edge distances from the actual connection forces. Include the mating structure and exposure when specifying hardware and installation details.",
  },
];

const crosswalk = [
  { topic: "Structural design code", eu: "CEN/TS 19101", na: "ASCE/SEI 74-23 (LRFD)", cn: "GB 50608 / CECS 692" },
  { topic: "Profile grade / tolerance", eu: "EN 13706 E17 / E23", na: "ASTM D3917", cn: "GB/T 31539" },
  { topic: "Tensile test", eu: "EN ISO 527-4", na: "ASTM D638", cn: "GB/T 1447" },
  { topic: "Flexural test", eu: "EN ISO 14125", na: "ASTM D790", cn: "GB/T 1449" },
  { topic: "Fire classification / test", eu: "EN 13501-1", na: "ASTM E84", cn: "GB 8624" },
];

const faqItems = [
  {
    question: "How should I compare FRP and steel I-beams?",
    answer:
      "Compare the mass of sections selected for the same span, loads, deflection limit and design basis. Matching nominal depth alone does not establish equal stiffness or capacity. The table gives published FRP catalog mass per metre, not a tested steel-replacement saving. Include connections, bracing and handling requirements in the final assembly comparison.",
  },
  {
    question: "Where do I get the section properties (Ix, Sx) for design?",
    answer:
      "The size table lists Ix and Wx (the elastic section modulus, also written Sx), calculated from nominal section geometry. Linked datasheets provide further section information. Use the catalog for preliminary selection, then confirm the production geometry, tolerances and applicable material data for design; geometric properties alone do not give a load rating.",
  },
  {
    question: "Can FRP I-beams be used as primary structural members?",
    answer:
      "An I-beam can be evaluated for a primary-member role once the span, loads, environment, restraints and connections are defined. The design must address stiffness, strength, stability, sustained loading and the complete load path. Agree the component supply and engineering scope in the quotation, including the project engineer's approval requirements.",
  },
  {
    question: "What resin systems are available for I-beams?",
    answer:
      "The material guide describes polyester, vinyl ester, polyurethane and phenolic routes for review. Availability and properties must be confirmed for the selected section and formulation. Provide the chemical exposure, temperature and fire requirements so relevant material evidence can be identified; a resin family name alone does not establish performance or certification.",
  },
  {
    question: "Which standards and reports should an I-beam inquiry specify?",
    answer:
      "State the project design basis, profile grade, dimensional tolerances and required material or fire tests. EN 13706 and ASTM D3917 are references for different parts of that specification. Ask which documents apply to the offered section, formulation and test scope. A material-grade reference or company certificate does not establish the capacity or approval of a finished beam assembly.",
  },
  {
    question: "What is the lead time and minimum order for FRP I-beams?",
    answer: `Published planning ranges are ${weeks(supplyTerms.catalogLeadTimeWeeks)} for catalog sections, ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)} for an existing-die variant and ${weeks(supplyTerms.newDieLeadTimeWeeks)} for a new die. The published custom-run quantities are ${supplyTerms.customMoqMeters.firstRun} m for a first run and ${supplyTerms.customMoqMeters.repeat} m for repeats. Confirm quantity, tooling, formulation and schedule in the quotation. Standard lengths are ${supplyTerms.standardLengthM} m, with cut lengths reviewed against the order.`,
  },
];

const applications = [
  {
    href: "/case-studies/factory-access-staircase",
    kind: "Case study",
    title: "Factory access staircase",
    text: "A bolted FRP stair in our Chongqing plant, assembled by four people with hand tools: no welding, hot work or crane.",
    image: "/images/f1-photos/frp-factory-staircase-structural-view.webp",
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

  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP I-Beam Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/i-beam/frp-i-beam-profile-200x100x10mm.webp",
          category: "Pultruded FRP Structural Profiles",
          material: ["Glass-fiber-reinforced thermoset"],
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
        title="Fiberglass I-beam (FRP) profiles"
        description="Wide-flange pultruded fiberglass I-beams for project-specific member selection. Compare catalog dimensions, weights and nominal section properties, then define the loads, span, restraints, connections and material requirements."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Depth", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Section", value: "I / wide flange" },
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
                { src: "/images/products/i-beam/frp-i-beam-profile-200x100x10mm.webp", alt: "Pultruded FRP I-beam", caption: "I 200×100×10" },
                { src: "/images/f1-photos/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
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
              A pultruded FRP I-beam is a constant-section fiberglass profile with flanges and a web. Its geometry and laminate work together to resist the specified member loads; the proposed reinforcement, resin and surface finish belong in the material definition.
            </p>
            <p>
              For a steel-replacement study, compare sections selected against the same load cases, span and deflection limit. Matching the depth or comparing mass per metre alone does not establish equivalent performance. Include supports, bracing and connection components when comparing the finished assemblies.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["Nominal section properties", "Published catalog mass", `${supplyTerms.standardLengthM} m lengths or cut to size`, "Material and tolerances by specification"].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-[12px] sm:grid-cols-2">
            <div className="rounded-card border border-teal-border bg-teal-bg p-[18px]">
              <h3 className="text-f16 font-bold text-teal-text">Consider FRP when</h3>
              <ul className="mt-[8px] space-y-[8px] text-f14 leading-golden text-t2">
                {specifyFrp.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-border-default bg-bg2 p-[18px]">
              <h3 className="text-f16 font-bold text-t1">Compare alternatives when</h3>
              <ul className="mt-[8px] space-y-[8px] text-f14 leading-golden text-t2">
                {compareAlternatives.map((item) => (
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
        intro="Dimensions in mm, published catalog mass in kg/m. Ix and Wx are calculated from nominal section geometry for preliminary selection. Confirm finished-member dimensions, mass and material data for the proposed order."
        aside={
          <Link href="/tools/profile-finder?shape=i_beam" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Filter and compare in the profile finder
          </Link>
        }
      >
        <FamilySizeTable
          rows={sizes}
          caption="FRP I-beam catalog sizes, published mass and nominal section properties"
          product="FRP I-beam"
          productPath={pagePath}
          columns={[
            { key: "d", label: "H", unit: "mm" },
            { key: "b", label: "B", unit: "mm" },
            { key: "t", label: "t", unit: "mm" },
            { key: "mass", label: "Catalog mass", unit: "kg/m" },
            { key: "Ix", label: "Ix", unit: "cm⁴" },
            { key: "Wx", label: "Wx", unit: "cm³" },
          ]}
        />
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t3">
          For a replacement inquiry, include the existing steel section, loads, span and available construction depth. The selected FRP member and connection details determine the final mass comparison. {commercialFacts.availability}
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
        <LaminateProperties note="Use properties accepted for the proposed I-beam laminate and the project's design basis. Confirm the section and connection details before treating a preliminary calculation as a design input." />
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
              sub="An illustrative load case using the calculator's E23 reference material. Replace the example inputs with your project requirements; the result is a preliminary member check."
            />
            <details className="group rounded-card border border-border-default bg-white">
              <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-[12px] px-[16px] text-f16 font-bold text-t1 [&::-webkit-details-marker]:hidden">
                Reference standards by region: EU, US, China
                <span aria-hidden className="text-teal-text transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="border-t border-border-default px-[16px] py-[12px] text-f14 leading-golden text-t3">
                These references cover different scopes and are not interchangeable approvals. Confirm the applicable edition, test method and acceptance criteria with the project engineer.
              </p>
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
          <Link href="/applications/frp-cooling-tower-profiles" className="underline underline-offset-4 hover:text-teal">
            Cooling tower replacement and OEM members
          </Link>
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
        <ProductRfq
          product="FRP I-beams"
          productPath={pagePath}
          intro="Send the selected section or existing framing drawing, spans, loads and service conditions, with quantities and the delivery destination."
          items={[
            { title: "Section and quantity", text: "Catalog model or available envelope, cut lengths and quantities." },
            { title: "Loads and restraints", text: "Span, load cases, support arrangement, lateral restraint and deflection limit." },
            { title: "Connections and fabrication", text: "Hole patterns, bearing details, hardware and the agreed engineering scope." },
            { title: "Material and acceptance", text: "Exposure, temperature, required design basis and applicable material records." },
          ]}
          links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]}
        />
      </ProductSection>
    </>
  );
}
