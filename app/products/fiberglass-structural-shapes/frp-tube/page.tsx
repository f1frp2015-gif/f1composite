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

const pageTitle = "Fiberglass Round Tube | Pultruded FRP & GRP Tubing";
const pageDescription =
  "Pultruded fiberglass round tube, also called GRP tube, in 25–150 mm OD. Compare nominal walls and weights for structural tubing and request a drawing-led quote.";
const pagePath = "/products/fiberglass-structural-shapes/frp-tube";
const product = "Pultruded fiberglass round tubing";

const LAST_UPDATED = "2026-09-26";

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
    question: "What are pultruded FRP round tubes used for?",
    answer:
      "Pultruded FRP round tubes are used as members in handrail systems, structural columns, antenna masts, conduits and insulating stand-offs. Their low density, resin-selected corrosion resistance and dielectric material properties can suit marine, chemical and electrical service, but the finished assembly, exposure and any metal hardware still require project review.",
  },
  {
    question: "FRP round tube vs FRP square tube — which should I use?",
    answer:
      "Round tubing suits circular grips and members such as handrails and masts. Square and rectangular tubing provides flat bearing faces for frames and bolted connections. Compare the actual section properties, laminate, span and load case; the shape name alone does not establish which section is stiffer or stronger. Structural tubing is not a pressure-pipe specification.",
  },
  {
    question: "Can FRP round tubes be used outdoors with UV exposure?",
    answer:
      "Outdoor configurations can use a UV-stabilized resin, surface veil and, where specified, a compatible coating. Appearance and mechanical-property retention depend on resin, pigment, surface system, climate and exposure duration, so state the project location and design life and request the applicable weathering evidence.",
  },
  {
    question: "What's the load capacity of FRP handrail tubes?",
    answer:
      "A round tube by itself cannot establish the capacity or compliance of a handrail. The complete posts, top and middle rails, fittings, splices, bases, anchors and supporting substrate must be evaluated together against the governing load and deflection criteria. Use the complete fiberglass handrail systems page for the catalog assembly and project-release boundary.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-tube/opengraph-image",
});

export default async function TubePage() {
  const sizes = await loadFamilySizes("round-tube");
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Round Tubes",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/round-tube/frp-round-tube-photo.webp",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Round Tube"
        line={{ name: "F1-STRUX", label: "Round tube" }}
        updated={LAST_UPDATED}
        title="Fiberglass Round Tubes & Tubing (FRP)"
        description="Circular hollow section pultruded fiberglass tubing from 25 mm to 150 mm OD, for handrails, guardrails, masts and conduit. The dimensions define a structural section, not a pressure rating."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Outside diameter", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Grade", value: "EN 13706 E23" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "tube-product-header", product, productPath: pagePath }) },
          secondary: { label: "Find a size", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <>
            <ProfileFigure model="CHS 76×6.4" />
            <HeroPhotos
              photos={[
                { src: "/images/products/round-tube/frp-round-tube-photo.webp", alt: "Rendering of a pultruded FRP round tube", caption: "Round tube · render", fit: "contain" },
                { src: "/images/technology/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
              ]}
            />
          </>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/fiberglass-structural-shapes" },
          { label: "Round Tube" },
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
              Pultruded FRP round tubes are members in handrail systems, guardrails and structures that need a circular section; the smooth bore also suits conduit. Electrical and corrosion performance depend on the specified laminate, the exposure and the complete assembly, and catalog tube data do not qualify a finished safety system.
            </p>
            <div className="rounded-card border border-border-default bg-bg2 px-[16px] py-[12px]">
              <h3 className="text-f16 font-bold text-t1">GRP tube for structural applications</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">
                GRP tube and fiberglass round tubing refer to the glass-reinforced pultrusions in this range. Select outside diameter, wall thickness and resin against the design load. Structural tube dimensions do not establish a pressure rating; pressure pipe needs a separately qualified specification.{" "}
                <Link href="/what-is-frp#terminology" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
                  FRP, GRP and GFRP explained
                </Link>
              </p>
            </div>
            <ul className="flex flex-wrap gap-[8px]">
              {["EN 13706 E23", "Handrails and guardrails", "Smooth bore", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <UseList
            items={[
              { label: "Complete fiberglass handrail systems", href: "/products/frp-handrail-systems" },
              { label: "Marine handrails and antennas", href: "/industries/marine" },
              { label: "Handrails and guardrails", href: "/industries/construction" },
              { label: "Non-conductive standoffs", href: "/industries/energy" },
              { label: "Infrastructure handrails", href: "/industries/infrastructure" },
            ]}
          />
        </div>
      </ProductSection>

      <ProductSection
        id="sizes"
        title="Sizes"
        count={`${sizes.length} catalog sizes`}
        tone="muted"
        intro="Nominal millimetres with approximate decimal inches below each value; the inch figures are references, not separate inch tooling or tolerances. Ix and Wx are calculated from the nominal section."
        aside={
          <Link href="/tools/profile-finder?shape=tube" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Filter and compare in the profile finder
          </Link>
        }
      >
        <FamilySizeTable
          rows={sizes}
          caption="FRP round tube catalog sizes with nominal section properties"
          product={product}
          productPath={pagePath}
          quoteSource="tube-size-selection"
          columns={[
            { key: "d", label: "OD", unit: "mm", inches: true },
            { key: "t", label: "Wall", unit: "mm", inches: true },
            { key: "mass", label: "Mass", unit: "kg/m" },
            { key: "Ix", label: "Ix", unit: "cm⁴" },
            { key: "Wx", label: "Wx", unit: "cm³" },
          ]}
        />
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t3">{commercialFacts.availability}</p>
        <p className="mt-[10px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/frp-span-tables#round-tube" className="underline underline-offset-4 hover:text-teal">
            Allowable loads by span
          </Link>
          <Link href="/products/custom-pultruded-profiles" className="underline underline-offset-4 hover:text-teal">
            A different size or an exact inch dimension: send a drawing
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="properties" title="Properties">
        <LaminateProperties />
        <div className="mt-[24px] max-w-[640px]">
          <CalculatorCTA
            href="/frp-profile-calculator#shape=round-tube"
            eyebrow="Free tool · round tube preset"
            title="Size an FRP round tube: bending, shear and deflection"
            sub="Opens the profile calculator on a round tube. Check bending, shear and deflection with shear included against your span and load, and find the steel-equivalent section."
          />
        </div>
      </ProductSection>

      <ProductSection id="applications" title="Applications" tone="muted">
        <ApplicationCards cards={familyApplications("round-tube")} />
      </ProductSection>

      <ProductSection id="documents" title="Documents">
        <ProductDocuments productPaths={[pagePath, "/products/fiberglass-structural-shapes"]} family={{ label: "Round tube", datasheetsHref: "/datasheets#round-tube" }} sizes={sizes} />
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

      <ProductSection id="quote" title="Quote FRP round tubes" tone="deep">
        <ProductRfq product="FRP round tubes" productPath={pagePath} links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]} />
      </ProductSection>
    </>
  );
}
