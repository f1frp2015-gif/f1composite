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

const pageTitle = "Fiberglass Angle — Pultruded FRP L-Profile Manufacturer";
const pageDescription =
  "Pultruded fiberglass angle (FRP L-profiles) 25×25–152×152 mm, equal & unequal. EN 13706 / ASTM D3917. Bracing, ledgers, stiffeners. DDP USA · Section 301.";
const pagePath = "/products/fiberglass-structural-shapes/frp-angle";

const LAST_UPDATED = "2026-09-26";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-angle/opengraph-image",
});

const faqItems = [
  {
    question: "Are unequal-leg FRP angles available?",
    answer:
      "Yes. In addition to our standard equal-leg range, we can produce unequal-leg angles via custom pultrusion. Common unequal-leg sizes include 75×50, 100×75, and 150×100 mm. Contact our engineering team for custom specifications.",
  },
  {
    question: "Can FRP angles be used in concrete-embedded connections?",
    answer:
      "They can, but the detail needs design. Along the profile, pultruded GFRP expands about 7–9 × 10⁻⁶/°C, close to concrete and steel (about 10–12 × 10⁻⁶/°C); across the profile it expands two to three times as much, and FRP is far less stiff than steel. Check anchorage, bearing and edge distances, and choose a resin suited to the alkaline concrete environment, usually vinyl ester. Send us the detail and we will review it.",
  },
];

export default async function AnglePage() {
  const sizes = await loadFamilySizes("angle");
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Angle Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/angle/frp-angle-profile-100x100x10mm.webp",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Angle"
        line={{ name: "F1-STRUX", label: "Angle" }}
        updated={LAST_UPDATED}
        title="Fiberglass Angle (FRP) Profiles"
        description="Equal-leg pultruded fiberglass L-profiles from 25×25 mm to 152×152 mm, with unequal legs made to order. Used as stiffeners, bracing, ledgers and connection angles where steel would corrode."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Leg", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Grade", value: "EN 13706 E23" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "product-header", product: "FRP angles", productPath: pagePath }) },
          secondary: { label: "Find a size", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <>
            <ProfileFigure model="L 100×100×8" />
            <HeroPhotos
              photos={[
                { src: "/images/products/angle/frp-angle-profile-100x100x10mm.webp", alt: "Rendering of a pultruded FRP angle", caption: "L 100×100×10 · render" },
                { src: "/images/technology/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
              ]}
            />
          </>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/fiberglass-structural-shapes" },
          { label: "Angle" },
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
              FRP angles serve as stiffeners, bracing members, ledger supports and connection elements in structural and architectural work. A balanced fiber architecture gives both legs near-equal properties, so bolted connections transfer load consistently.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["EN 13706 E23", "Equal legs; unequal to order", "Non-conductive", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <UseList
            items={[
              { label: "Construction bracing and stiffeners", href: "/industries/construction" },
              { label: "Industrial frames", href: "/industries/industrial" },
              { label: "Energy and solar mounting", href: "/industries/energy" },
              { label: "Infrastructure", href: "/industries/infrastructure" },
            ]}
          />
        </div>
      </ProductSection>

      <ProductSection
        id="sizes"
        title="Sizes"
        count={`${sizes.length} catalog sizes`}
        tone="muted"
        intro="Dimensions in mm, mass in kg/m. Ix and Wx are calculated from the nominal section, about the centroidal axis parallel to a leg, for preliminary sizing."
        aside={
          <Link href="/tools/profile-finder?shape=angle" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Filter and compare in the profile finder
          </Link>
        }
      >
        <FamilySizeTable
          rows={sizes}
          caption="FRP angle catalog sizes with nominal section properties"
          product="FRP angle"
          productPath={pagePath}
          columns={[
            { key: "d", label: "a", unit: "mm" },
            { key: "b", label: "b", unit: "mm" },
            { key: "t", label: "t", unit: "mm" },
            { key: "mass", label: "Mass", unit: "kg/m" },
            { key: "Ix", label: "Ix", unit: "cm⁴" },
            { key: "Wx", label: "Wx", unit: "cm³" },
          ]}
        />
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t3">{commercialFacts.availability}</p>
        <p className="mt-[10px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/products/custom-pultruded-profiles" className="underline underline-offset-4 hover:text-teal">
            Unequal legs or a size not listed: custom pultrusion
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="properties" title="Properties">
        <LaminateProperties />
        <div className="mt-[24px] max-w-[640px]">
          <CalculatorCTA
            href="/frp-profile-calculator#shape=angle"
            eyebrow="Free tool · angle preset"
            title="Size an FRP angle: bending, shear and deflection"
            sub="Opens the profile calculator on an angle. Check bending, shear and deflection with shear included against your span and load, and find the steel-equivalent section."
          />
        </div>
      </ProductSection>

      <ProductSection id="applications" title="Applications" tone="muted">
        <ApplicationCards cards={familyApplications("angle")} />
      </ProductSection>

      <ProductSection id="documents" title="Documents">
        <ProductDocuments productPaths={[pagePath, "/products/fiberglass-structural-shapes"]} family={{ label: "Angle", datasheetsHref: "/datasheets#angle" }} sizes={sizes} />
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

      <ProductSection id="quote" title="Quote FRP angles" tone="deep">
        <ProductRfq product="FRP angles" productPath={pagePath} links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]} />
      </ProductSection>
    </>
  );
}
