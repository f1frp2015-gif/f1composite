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

const pageTitle = "Fiberglass Channel — Pultruded FRP C & U Channels";
const pageDescription =
  "Pultruded fiberglass C and U channels, 38×13–360×108 mm. EN 13706 and ASTM D3917; 75% lighter than steel and nonconductive. DDP USA quotes.";
const pagePath = "/products/fiberglass-structural-shapes/frp-channel";

const LAST_UPDATED = "2026-09-26";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-channel/opengraph-image",
});

const faqItems = [
  {
    question: "What colors are available for FRP channels?",
    answer:
      "Standard colors are gray and safety yellow. Custom RAL colors are available for orders that meet the minimum quantity, typically 200 linear meters. Every channel includes a UV-protective surface veil.",
  },
  {
    question: "Can FRP channels be bolted to dissimilar materials?",
    answer:
      "Yes. The non-conductive nature of FRP eliminates galvanic corrosion risk when bolted to aluminum, stainless steel, or other metals — a common failure mode in traditional multi-material assemblies.",
  },
];

export default async function ChannelPage() {
  const sizes = await loadFamilySizes("channel");
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Channel Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/channel/frp-channel-profile-200x60x12mm.webp",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Channel"
        line={{ name: "F1-STRUX", label: "Channel" }}
        updated={LAST_UPDATED}
        title="Fiberglass Channel (FRP) Profiles"
        description="Pultruded fiberglass U-profiles from 38×13 mm to 360×108 mm for secondary framing, cable supports and modular frames. Every channel has a UV-protective surface veil and can be bolted to other metals without galvanic corrosion."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Depth", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Grade", value: "EN 13706 E23" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "product-header", product: "FRP channels", productPath: pagePath }) },
          secondary: { label: "Find a size", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <>
            <ProfileFigure model="U 152×43×6.4" />
            <HeroPhotos
              photos={[
                { src: "/images/products/channel/frp-channel-profile-200x60x12mm.webp", alt: "Rendering of a pultruded FRP channel", caption: "U 200×60×12 · render" },
                { src: "/images/technology/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
              ]}
            />
          </>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/fiberglass-structural-shapes" },
          { label: "Channel" },
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
              Pultruded channels frame secondary structural members, cable management systems and modular assemblies. The open U-shape simplifies field connections with mechanical fasteners, and the non-conductive section can be bolted to aluminum or stainless steel without galvanic corrosion.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["EN 13706 E23", "UV-protective surface veil", "Gray, safety yellow or RAL", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <UseList
            items={[
              { label: "Cable trays and substations", href: "/industries/energy" },
              { label: "Industrial skids and platforms", href: "/industries/industrial" },
              { label: "Construction framing", href: "/industries/construction" },
              { label: "Infrastructure stringers", href: "/industries/infrastructure" },
            ]}
          />
        </div>
      </ProductSection>

      <ProductSection
        id="sizes"
        title="Sizes"
        count={`${sizes.length} catalog sizes`}
        tone="muted"
        intro="Dimensions in mm, mass in kg/m. Ix and Wx are calculated from the nominal section, for preliminary sizing."
        aside={
          <Link href="/tools/profile-finder?shape=channel" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Filter and compare in the profile finder
          </Link>
        }
      >
        <FamilySizeTable
          rows={sizes}
          caption="FRP channel catalog sizes with nominal section properties"
          product="FRP channel"
          productPath={pagePath}
          columns={[
            { key: "d", label: "H", unit: "mm" },
            { key: "b", label: "B", unit: "mm" },
            { key: "t", label: "t", unit: "mm" },
            { key: "mass", label: "Mass", unit: "kg/m" },
            { key: "Ix", label: "Ix", unit: "cm⁴" },
            { key: "Wx", label: "Wx", unit: "cm³" },
          ]}
        />
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t3">{commercialFacts.availability}</p>
        <p className="mt-[10px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/frp-span-tables#channel" className="underline underline-offset-4 hover:text-teal">
            Allowable loads by span
          </Link>
          <Link href="/products/custom-pultruded-profiles" className="underline underline-offset-4 hover:text-teal">
            A size not listed: custom pultrusion
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="properties" title="Properties">
        <LaminateProperties />
        <div className="mt-[24px] max-w-[640px]">
          <CalculatorCTA
            href="/frp-profile-calculator#shape=channel"
            eyebrow="Free tool · channel preset"
            title="Size an FRP channel: bending, shear and deflection"
            sub="Opens the profile calculator on a channel. Check bending, shear and deflection with shear included against your span and load, and find the steel-equivalent section."
          />
        </div>
      </ProductSection>

      <ProductSection id="applications" title="Applications" tone="muted">
        <ApplicationCards cards={familyApplications("channel")} />
      </ProductSection>

      <ProductSection id="documents" title="Documents">
        <ProductDocuments productPaths={[pagePath, "/products/fiberglass-structural-shapes"]} family={{ label: "Channel", datasheetsHref: "/datasheets#channel" }} sizes={sizes} />
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

      <ProductSection id="quote" title="Quote FRP channels" tone="deep">
        <ProductRfq product="FRP channels" productPath={pagePath} links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]} />
      </ProductSection>
    </>
  );
}
