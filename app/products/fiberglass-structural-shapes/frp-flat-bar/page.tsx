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
  "Compare fiberglass flat bar sizes and catalog weights. Specify cut lengths, fit and machining for spacers, stiffeners and fabricated parts; request a quote.";
const pagePath = "/products/fiberglass-structural-shapes/frp-flat-bar";

const LAST_UPDATED = "2026-10-11";

const faqItems = [
  {
    question: "What are pultruded FRP flat bars used for?",
    answer:
      "Flat bars provide rectangular profile lengths for spacers, stiffeners and fabricated parts. State whether the part carries load, controls a fit or contacts a moving surface so its geometry, material and acceptance requirements can be reviewed. Structural splice plates and wear components need application-specific checks beyond a catalog width and thickness.",
  },
  {
    question: "How does FRP flat bar compare to steel flat bar?",
    answer:
      "Compare sections selected for the same loading, span, orientation and connection requirements. The table lists published catalog mass and nominal geometry, while stiffness and strength require data for the proposed laminate. Equal width and thickness do not establish an equivalent replacement for a steel part.",
  },
  {
    question: "What tolerances do F1 Composite flat bars hold?",
    answer:
      "Specify width, thickness, cut length, straightness and flatness where they affect fit. Include the mating detail and inspection method for critical dimensions. The drawing and quotation establish the agreed tolerances and any machining needed; a single fixed tolerance does not apply to every catalog size.",
  },
  {
    question: "Can FRP flat bars replace steel rebar in concrete?",
    answer:
      "Use the dedicated FRP rebar route for concrete reinforcement. A reinforcement or prestressing product needs a defined bond surface or anchorage, material properties and project acceptance criteria. A standard flat bar is not qualified for those roles by its shape or glass content alone.",
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
          material: ["Glass-fiber-reinforced thermoset"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Flat Bar"
        line={{ name: "F1-STRUX", label: "Flat bar" }}
        updated={LAST_UPDATED}
        title="Fiberglass flat bars (FRP bar stock)"
        description="Solid rectangular pultruded fiberglass bar stock for spacers, stiffeners and fabricated parts. Compare catalog sections, then specify cut lengths, tolerances, machining and the service requirements for your part."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Width", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Section", value: "Solid rectangular" },
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
                { src: "/images/f1-photos/f1-composite-pultrusion-hall-krauss-maffei-lines.webp", alt: "F1 Composite pultrusion hall with rows of pultrusion lines", caption: "Pultrusion hall" },
                { src: "/images/f1-photos/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
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
              Select flat bar stock by width, thickness and installed orientation. For a spacer or fitted part, identify the mating faces and required clearance. For a stiffener or splice, include the loads, holes and bearing details so the member and its connections can be assessed together.
            </p>
            <p>
              Agree dimensional tolerances and any machining on the part drawing. Concrete reinforcement belongs in the dedicated rebar inquiry route, with its own material, bond and acceptance requirements.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["Solid rectangular stock", "Specify fit and tolerances", "Machining to agreed drawing", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <UseList
            title="Applications and buying routes"
            items={[
              { label: "Industrial spacers and stiffeners", href: "/industries/industrial" },
              { label: "Custom fabricated-part inquiries", href: "/products/custom-pultruded-profiles" },
              { label: "Concrete reinforcement: FRP rebar", href: "/products/frp-rebar" },
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
        intro="Dimensions in mm, published catalog mass in kg/m. A, Ix and Iy are calculated from the nominal section: Ix for the bar standing on edge, Iy for the bar lying flat. Confirm tolerances and material requirements for the ordered part."
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
        <LaminateProperties note="Match the material data to the proposed flat bar and its installed orientation. Fabricated joints, wearing surfaces and fitted parts require acceptance criteria for their specific function." />
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
        <ProductRfq product="FRP flat bars" productPath={pagePath} intro="Send the width, thickness, cut lengths and quantities, with the fit, machining and service requirements for the part." />
      </ProductSection>
    </>
  );
}
