import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ProfileFigure from "@/components/datasheets/ProfileFigure";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import { E40EvidenceLink } from "@/components/sections/E40TestEvidence";
import ApplicationCards from "@/components/products/ApplicationCards";
import FamilySizeTable from "@/components/products/FamilySizeTable";
import HeroPhotos from "@/components/products/HeroPhotos";
import LaminateProperties from "@/components/products/LaminateProperties";
import ProductDocuments from "@/components/products/ProductDocuments";
import ProductPageNav from "@/components/products/ProductPageNav";
import ProductRfq from "@/components/products/ProductRfq";
import ProductSection from "@/components/products/ProductSection";
import RelatedProfiles from "@/components/products/RelatedProfiles";
import UseList from "@/components/products/UseList";
import { supplyTerms } from "@/content/data/company";
import { commercialFacts } from "@/content/data/engineeringEvidence";
import { loadFamilySizes } from "@/lib/catalog/familySizes";
import { familyApplications } from "@/lib/familyApplications";
import { profileFamilyFacts } from "@/lib/profileFacts";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

// Size table is DB-driven (catalog admin) with the published seed catalog as
// build-safe fallback; refreshed hourly.
export const revalidate = 3600;

const pageTitle = "Fiberglass Square Tube & Tubing — Pultruded FRP SHS & RHS";
const pageDescription =
  "Compare pultruded fiberglass square tube and rectangular tubing sizes, walls and weights. Select a section and request cut lengths, resin options and a quote.";
const pagePath = "/products/fiberglass-structural-shapes/frp-square-tube";
const product = "Pultruded fiberglass square and rectangular tubing";

const LAST_UPDATED = "2026-09-26";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-square-tube/opengraph-image",
});

const faqItems = [
  {
    question: "Can I order fiberglass tubing cut to length?",
    answer: "Include finished length per piece, piece count, end cuts or holes, and tolerances with your selected section. We review the cutting and machining scope, material and packing before confirming the quotation. Catalog dimensions are section options, not a live stock list.",
  },
  {
    question: "What is the minimum order quantity and lead time?",
    answer: "Minimum quantity and timing are confirmed for the section, resin, tooling and processing required. Send your trial quantity, expected repeat demand, destination and target date. Ask for sample arrangements and production and shipping timing to be listed separately in the quotation.",
  },
  {
    question: "What is the advantage of FRP square tubes over open profiles?",
    answer:
      "Closed-section square tubes deliver superior torsional rigidity compared to I-beams or channels, making them ideal for columns, trusses, and structures that resist combined bending and torsion. The smooth interior bore also allows use as conduits or cable enclosures.",
  },
  {
    question: "Are rectangular hollow sections (RHS) available?",
    answer:
      "Yes. The catalog includes rectangular hollow sections such as 80×60, 100×60 and 120×60 mm alongside square sections. Confirm tooling, material, production quantity and timing in your quotation. Send a drawing for a custom rectangular size.",
  },
];

export default async function SquareTubePage() {
  const sizes = await loadFamilySizes("square-tube");
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Square and Rectangular Tubes",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/square-tube/frp-square-tube-100x100x6mm.webp",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Square Tube"
        line={{ name: "F1-STRUX", label: "Square & rectangular tube" }}
        updated={LAST_UPDATED}
        title="Fiberglass Square & Rectangular Tubes (FRP)"
        description="Pultruded fiberglass square and rectangular tubing (SHS / RHS) from 25×25 mm to 240×240 mm. The closed section resists torsion, which suits columns, trusses, posts and frames."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Outer size", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Grade", value: "EN 13706 E23" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "tube-product-header", product, productPath: pagePath }) },
          secondary: { label: "Find a size", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <>
            <ProfileFigure model="SHS 100×100×8" />
            <HeroPhotos
              photos={[
                { src: "/images/products/square-tube/frp-square-tube-100x100x6mm.webp", alt: "Rendering of a pultruded FRP square tube", caption: "SHS 100×100×6 · render" },
                { src: "/images/technology/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
              ]}
            />
          </>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/fiberglass-structural-shapes" },
          { label: "Square Tube" },
        ]}
      />

      <ProductPageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "sizes", label: "Sizes", count: sizes.length },
          { id: "properties", label: "Properties" },
          { id: "applications", label: "Applications" },
          { id: "documents", label: "Documents" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <ProductSection id="overview" title="Overview">
        <div className="grid grid-cols-1 gap-[28px] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-relaxed text-t2">
            <p>
              FRP square and rectangular tubes give closed-section torsional rigidity to columns, trusses and frames. Multi-axial reinforcement can carry transverse demands, and the smooth bore allows use as a conduit or cable enclosure. Electrical insulation depends on the specified laminate, moisture and contamination, joints and any metal hardware.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["EN 13706 E23", "Square and rectangular", "Smooth bore", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <UseList
            items={[
              { label: "Complete fiberglass handrail systems", href: "/products/frp-handrail-systems" },
              { label: "Complete fiberglass fixed ladder systems", href: "/products/frp-ladders" },
              { label: "Infrastructure trusses", href: "/industries/infrastructure" },
              { label: "Construction columns", href: "/industries/construction" },
              { label: "Solar racking posts", href: "/industries/energy" },
            ]}
          />
        </div>
      </ProductSection>

      <ProductSection
        id="sizes"
        title="Sizes"
        count={`${sizes.length} catalog sizes`}
        tone="muted"
        intro="Nominal millimetres with approximate decimal inches below each value; the inch figures are references, not separate inch tooling or tolerances. Ix and Wx are calculated from the nominal section, for bending about the axis parallel to B."
        aside={
          <Link href="/tools/profile-finder?shape=shs,rhs" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Filter and compare in the profile finder
          </Link>
        }
      >
        <FamilySizeTable
          rows={sizes}
          caption="FRP square and rectangular tube catalog sizes with nominal section properties"
          product={product}
          productPath={pagePath}
          quoteSource="tube-size-selection"
          columns={[
            { key: "d", label: "H", unit: "mm", inches: true },
            { key: "b", label: "B", unit: "mm", inches: true },
            { key: "t", label: "Wall", unit: "mm", inches: true },
            { key: "mass", label: "Mass", unit: "kg/m" },
            { key: "Ix", label: "Ix", unit: "cm⁴" },
            { key: "Wx", label: "Wx", unit: "cm³" },
          ]}
        />
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t3">{commercialFacts.availability}</p>
        <p className="mt-[10px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/frp-span-tables#square-tube" className="underline underline-offset-4 hover:text-teal">
            Allowable loads by span
          </Link>
          <Link href="/products/custom-pultruded-profiles" className="underline underline-offset-4 hover:text-teal">
            A different size or an exact inch dimension: send a drawing
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="properties" title="Properties">
        <LaminateProperties />
        <div className="mt-[24px] grid grid-cols-1 items-start gap-[16px] lg:grid-cols-2">
          <E40EvidenceLink />
          <div className="lg:py-[21px]">
            <CalculatorCTA
              href="/frp-profile-calculator#shape=square-tube"
              eyebrow="Free tool · square tube preset"
              title="Size an FRP square tube: bending, shear and deflection"
              sub="Opens the profile calculator on a square or rectangular tube. Check bending, shear and deflection with shear included against your span and load, and find the steel-equivalent section."
            />
          </div>
        </div>
      </ProductSection>

      <ProductSection id="applications" title="Applications" tone="muted">
        <ApplicationCards cards={familyApplications("square-tube")} />
      </ProductSection>

      <ProductSection id="documents" title="Documents">
        <ProductDocuments productPaths={[pagePath, "/products/fiberglass-structural-shapes"]} family={{ label: "Square and rectangular tube", datasheetsHref: "/datasheets#square-tube" }} sizes={sizes} />
      </ProductSection>

      <ProductSection id="faq" title="Questions buyers ask" tone="muted">
        <div className="grid items-start gap-[12px] md:grid-cols-2">
          {faqItems.map((item) => (
            <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
        <p className="mt-[18px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/technology/frp-vs-traditional-materials" className="underline underline-offset-4 hover:text-teal">
            FRP vs steel comparison
          </Link>
          <Link href="/resources/design-guides" className="underline underline-offset-4 hover:text-teal">
            Design guides
          </Link>
          <Link href="/what-is-frp" className="underline underline-offset-4 hover:text-teal">
            What is FRP?
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="related" title="Other standard profiles">
        <RelatedProfiles current={pagePath} />
      </ProductSection>

      <ProductSection id="quote" title="Quote FRP square and rectangular tubes" tone="deep">
        <ProductRfq product="FRP square and rectangular tubes" productPath={pagePath} links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]} />
      </ProductSection>
    </>
  );
}
