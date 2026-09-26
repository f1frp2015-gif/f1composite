import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ProfileFigure from "@/components/datasheets/ProfileFigure";
import JsonLd from "@/components/seo/JsonLd";
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

const pageTitle = "Fiberglass Flat Bar — Pultruded FRP Bar Stock Manufacturer";
const pageDescription =
  "Pultruded fiberglass flat bars, 12×3–305×25 mm. ±0.25 mm tolerance, 70% glass content, EN 13706, and ASTM D3917. DDP USA quotes.";
const pagePath = "/products/fiberglass-structural-shapes/frp-flat-bar";

const LAST_UPDATED = "2026-09-26";

const faqItems = [
  {
    question: "What are pultruded FRP flat bars used for?",
    answer:
      "FRP flat bars are used as stiffeners, splice plates, wear strips, spacer elements, and rebar replacements in corrosive environments. High-modulus pultruded flat bars (up to 70% glass content) are also used in concrete reinforcement and pre-stressed structural applications where steel rebar would corrode.",
  },
  {
    question: "How does FRP flat bar compare to steel flat bar?",
    answer:
      "Pultruded FRP flat bar is approximately 75% lighter than equivalent steel flat bar (1.9 g/cm³ vs 7.85 g/cm³), does not rust, and is non-conductive and non-magnetic. Tensile strength is comparable to mild steel (240–400 MPa for FRP vs 400 MPa for A36), so per kilogram FRP is stronger. Stiffness is roughly 1/10 that of steel, so deflection often governs design.",
  },
  {
    question: "What tolerances do F1 Composite flat bars hold?",
    answer:
      "Standard tolerances are ±0.25 mm on thickness and ±0.5 mm on width, in line with EN 13706 and ASTM D3917. Lengths are typically supplied at 6 m (or per cut order) with ±5 mm length tolerance. Tighter tolerances are available for precision applications on request.",
  },
  {
    question: "Can FRP flat bars replace steel rebar in concrete?",
    answer:
      "Yes. Pultruded FRP flat bars and rods with 65–70% unidirectional glass roving are used as non-corrosive reinforcement in concrete, especially in marine structures, parking decks, MRI rooms, and chemically exposed slabs. They cannot rust, so they remove corrosion-induced cracking; the design life comes from the project's design and exposure. Sand-coated or helically wound surfaces improve concrete bond.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-flat-bar/opengraph-image",
});

export default async function FlatBarPage() {
  const sizes = await loadFamilySizes("flat-bar");
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Flat Bars",
          description: pageDescription,
          path: pagePath,
          image: "/products/fiberglass-structural-shapes/frp-flat-bar/opengraph-image",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Flat Bar"
        line={{ name: "F1-STRUX", label: "Flat bar" }}
        updated={LAST_UPDATED}
        title="Fiberglass Flat Bars (FRP Bar Stock)"
        description="Solid rectangular pultruded fiberglass bars from 12×3 mm to 305×25 mm, held to ±0.25 mm on thickness. Used as stiffeners, splice plates, wear strips and spacers."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Width", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Tolerance", value: "±0.25 mm thickness" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "product-header", product: "FRP flat bars", productPath: pagePath }) },
          secondary: { label: "Find a size", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <>
            <ProfileFigure model="FB 100×10" />
            <HeroPhotos
              photos={[
                { src: "/images/technology/f1-composite-pultrusion-hall-krauss-maffei-lines.webp", alt: "F1 Composite pultrusion hall with rows of pultrusion lines", caption: "Pultrusion hall" },
                { src: "/images/technology/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
              ]}
            />
          </>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/fiberglass-structural-shapes" },
          { label: "Flat Bar" },
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
              FRP flat bars serve as stiffeners, splice plates, wear strips and spacers. High-modulus bars with up to 70% glass are used for concrete reinforcement and pre-stressed work. Tolerances of ±0.25 mm on thickness and ±0.5 mm on width give a reliable fit-up.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["±0.25 mm on thickness", "Up to 70% glass", "EN 13706 and ASTM D3917", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <UseList
            items={[
              { label: "Wear strips and stiffeners", href: "/industries/industrial" },
              { label: "Solar module clamps", href: "/industries/energy" },
              { label: "Splice plates", href: "/industries/infrastructure" },
              { label: "Rooftop supports", href: "/industries/construction" },
              { label: "Fiberglass sheets for wider flat stock", href: "/products/fiberglass-sheets" },
            ]}
          />
        </div>
      </ProductSection>

      <ProductSection
        id="sizes"
        title="Sizes"
        count={`${sizes.length} catalog sizes`}
        tone="muted"
        intro="Dimensions in mm, mass in kg/m. A, Ix and Iy are calculated from the nominal section: Ix for the bar standing on edge, Iy for the bar lying flat."
        aside={
          <Link href="/tools/profile-finder?shape=flat" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Filter and compare in the profile finder
          </Link>
        }
      >
        <FamilySizeTable
          rows={sizes}
          caption="FRP flat bar catalog sizes with nominal section properties"
          product="FRP flat bar"
          productPath={pagePath}
          columns={[
            { key: "d", label: "Width", unit: "mm" },
            { key: "t", label: "Thickness", unit: "mm" },
            { key: "mass", label: "Mass", unit: "kg/m" },
            { key: "A", label: "A", unit: "mm²" },
            { key: "Ix", label: "Ix", unit: "cm⁴" },
            { key: "Iy", label: "Iy", unit: "cm⁴" },
          ]}
        />
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t3">{commercialFacts.availability}</p>
        <p className="mt-[10px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/products/fiberglass-sheets" className="underline underline-offset-4 hover:text-teal">
            Wider than 305 mm: fiberglass sheets
          </Link>
          <Link href="/products/custom-pultruded-profiles" className="underline underline-offset-4 hover:text-teal">
            A size not listed: custom pultrusion
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="properties" title="Properties">
        <LaminateProperties />
      </ProductSection>

      <ProductSection id="applications" title="Applications" tone="muted">
        <ApplicationCards cards={familyApplications("flat-bar")} />
      </ProductSection>

      <ProductSection id="documents" title="Documents">
        <ProductDocuments productPaths={[pagePath, "/products/fiberglass-structural-shapes"]} family={{ label: "Flat bar", datasheetsHref: "/datasheets#flat-bar" }} sizes={sizes} />
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

      <ProductSection id="quote" title="Quote FRP flat bars" tone="deep">
        <ProductRfq product="FRP flat bars" productPath={pagePath} />
      </ProductSection>
    </>
  );
}
