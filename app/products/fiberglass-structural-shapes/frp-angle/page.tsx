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
  "Compare equal-leg fiberglass angle sizes and catalog weights. Request custom unequal-leg sections or fabricated cleats with your drawing and connection details.";
const pagePath = "/products/fiberglass-structural-shapes/frp-angle";

const LAST_UPDATED = "2026-10-11";

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
      "The table lists catalog sections. An unequal-leg or unlisted angle can be submitted for custom pultrusion review with leg dimensions, thickness, radii, tolerances, material and expected quantity. Tooling availability, feasibility and sample requirements are confirmed against that drawing before a production offer.",
  },
  {
    question: "Does a catalog angle qualify as a structural connection cleat?",
    answer:
      "A catalog angle defines a section, while a cleat also needs cut length, holes, fasteners, bearing surfaces and a load case. The connection review must cover the actual load path, including local bearing, pull-through and loads applied away from the section centre. Include the mating parts and required acceptance basis with your inquiry.",
  },
  {
    question: "Can FRP angles be used in concrete-embedded connections?",
    answer:
      "An embedded detail requires assessment of anchorage, concrete bearing, movement and the proposed laminate's compatibility with the exposure. Send the concrete and angle geometry, load directions and environmental conditions. Use material data and connection evidence relevant to that detail instead of assuming that a standard angle or resin name qualifies the assembly.",
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
          material: ["Glass-fiber-reinforced thermoset"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Angle"
        line={{ name: "F1-STRUX", label: "Angle" }}
        updated={LAST_UPDATED}
        title="Fiberglass angle (FRP) profiles"
        description="Equal-leg pultruded fiberglass L-profiles for bracing, ledgers and fabricated supports. Compare catalog sections, or submit an unequal-leg drawing for custom review. Define holes and load transfer separately for connection cleats."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Leg", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Section", value: "L-profile" },
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
                { src: "/images/products/angle/frp-angle-profile-100x100x10mm.webp", alt: "Pultruded FRP angle", caption: "L 100×100×10" },
                { src: "/images/f1-photos/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
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
              FRP angles can form bracing members, edge supports and ledgers when the section and connections are designed for the application. Choose the leg dimensions and thickness, then define how each leg bears against or attaches to the surrounding structure.
            </p>
            <p>
              A cut or drilled angle used as a cleat needs its own fabrication drawing and connection check. For unequal legs or an unlisted section, send the required geometry and quantity so tooling and manufacture can be reviewed.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["Equal-leg catalog sections", "Unequal legs: custom review", "Specify cleat and hole details", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <UseList
            items={[
              { label: "Construction bracing and stiffeners", href: "/industries/construction" },
              { label: "Platform ledgers and edge supports", href: "/applications/frp-chemical-plant-platforms" },
              { label: "Cable-support cleats and bracing", href: "/applications/frp-cable-tray-supports" },
              { label: "Unequal-leg and custom sections", href: "/products/custom-pultruded-profiles" },
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
        <LaminateProperties note="For a connection angle, confirm the proposed laminate and assess the fasteners, holes, bearing surfaces and load direction together. Nominal section properties alone do not establish cleat capacity." />
        <div className="mt-[24px] max-w-[640px]">
          <CalculatorCTA
            href="/frp-profile-calculator#shape=angle"
            eyebrow="Free tool · angle preset"
            title="Size an FRP angle: bending, shear and deflection"
            sub="Enter your span and loads for a preliminary member check. Cleats, eccentric loading, fasteners and anchorage need a connection-specific assessment."
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
        <ProductRfq
          product="FRP angles"
          productPath={pagePath}
          intro="Send the catalog section or custom leg dimensions, cut lengths and quantities, with a drawing for any fabricated connection."
          items={[
            { title: "Catalog or custom section", text: "Leg dimensions, thickness, radii and dimensional tolerances." },
            { title: "Fabrication drawing", text: "Cut length, holes, edge distances and mating components." },
            { title: "Connection and service", text: "Loads on each leg, bearing surfaces, fasteners and exposure." },
            { title: "Quantity and acceptance", text: "Quantity by part, material requirements, required records and destination." },
          ]}
          links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]}
        />
      </ProductSection>
    </>
  );
}
