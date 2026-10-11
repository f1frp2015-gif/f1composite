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

const pageTitle = "Fiberglass Rod — Pultruded Solid FRP Round Rod Ø6–50 mm";
const pageDescription =
  "Compare solid fiberglass rod sizes and catalog weights. Specify cut lengths, tolerances and machining, with separate routes for rebar and electrical parts.";
const pagePath = "/products/fiberglass-structural-shapes/frp-rod";

const LAST_UPDATED = "2026-10-11";

const faqItems = [
  {
    question: "What are pultruded FRP round rods used for?",
    answer:
      "This page covers solid round profile lengths and blanks for further fabrication. Specify the diameter, cut length, fit, end details and service conditions for your part. Plant stakes, concrete reinforcement, rock bolts and electrical components have their own purchasing and qualification requirements; use the linked product routes for those inquiries.",
  },
  {
    question: "Which material properties should I request for an FRP rod?",
    answer:
      "Request properties for the proposed rod, reinforcement and resin formulation, including the test direction and specimen conditions. The E23-ISO table on this page is a material reference, not measured performance for every catalog diameter. Agree the relevant strength, stiffness and acceptance evidence before using values for final design.",
  },
  {
    question: "Can a standard rod be ordered as an electrical insulation core?",
    answer:
      "An insulation core or live-line tool component requires its own material, surface, end-fitting and test requirements. A catalog diameter or a generic non-conductive material description does not establish suitability. Send the component drawing and qualification basis through the relevant electrical product route.",
  },
  {
    question: "Can FRP round rods be used as rebar in concrete?",
    answer:
      "Concrete reinforcement should be specified through the FRP rebar route. Rebar requires an identified reinforcement product, bond surface, mechanical properties and acceptance basis. Adding a coating or winding to an ordinary rod does not by itself qualify it as rebar. Rock bolts likewise need an agreed anchoring assembly and project requirements.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-rod/opengraph-image",
});

export default async function RodPage() {
  const sizes = await loadFamilySizes("rod");
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Round Rods",
          description: pageDescription,
          path: pagePath,
          image: "/products/fiberglass-structural-shapes/frp-rod/opengraph-image",
          category: "Pultruded FRP Structural Profiles",
          material: ["Glass-fiber-reinforced thermoset"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Round Rod"
        line={{ name: "F1-STRUX", label: "Round rod" }}
        updated={LAST_UPDATED}
        title="Fiberglass rods (solid FRP)"
        description="Solid pultruded fiberglass round rods for cut lengths and fabricated blanks. Compare catalog diameters and weights, then specify the fit, end machining, material and service conditions for your part."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Diameter", values: sizes.map((size) => size.d), prefix: "Ø", weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Section", value: "Solid round" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "product-header", product: "FRP round rods", productPath: pagePath }) },
          secondary: { label: "Find a size", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <>
            <ProfileFigure model="Rod Ø25" />
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
          { label: "Round Rod" },
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
              A solid round rod provides a constant-section blank for a fabricated part. Start with its diameter and cut length, then identify the surfaces that control fit, any drilled or machined ends, and the loads and environment it will see.
            </p>
            <p>
              State whether you need a plain length or a finished component. Use the purpose-specific routes alongside this page for stakes, reinforcement, anchoring and electrical parts, where the surface, fittings and acceptance requirements form part of the product specification.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["Solid round section", "Specify diameter and fit", "Machining to agreed drawing", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <UseList
            title="Purpose-specific rod inquiries"
            items={[
              { label: "Fiberglass stakes for plants and trees", href: "/products/fiberglass-stakes" },
              { label: "FRP rebar for concrete", href: "/products/frp-rebar" },
              { label: "FRP rock bolts and anchoring", href: "/products/frp-rock-bolts" },
              { label: "Live-line tool rods and tubes", href: "/products/fiberglass-live-line-tool-tubes-rods" },
              { label: "Switchgear insulating components", href: "/products/frp-switchgear-insulating-profiles" },
              { label: "Composite conductor core development", href: "/products/composite-conductor-core-rods" },
            ]}
          />
        </div>
      </ProductSection>

      <ProductSection
        id="sizes"
        title="Sizes"
        count={`${sizes.length} catalog sizes`}
        tone="muted"
        intro="Diameter in mm, published catalog mass in kg/m. A and Ix are calculated from the nominal section. Confirm the proposed material, finished diameter, tolerances and surface condition in the quotation."
        aside={
          <Link href="/tools/profile-finder?shape=rod" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Filter and compare in the profile finder
          </Link>
        }
      >
        <FamilySizeTable
          rows={sizes}
          caption="FRP solid rod catalog sizes with nominal section properties"
          product="FRP round rod"
          productPath={pagePath}
          columns={[
            { key: "d", label: "D", unit: "mm" },
            { key: "mass", label: "Mass", unit: "kg/m" },
            { key: "A", label: "A", unit: "mm²" },
            { key: "Ix", label: "Ix", unit: "cm⁴" },
          ]}
        />
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t3">{commercialFacts.availability}</p>
        <p className="mt-[10px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/products/custom-pultruded-profiles" className="underline underline-offset-4 hover:text-teal">
            A diameter not listed: custom pultrusion
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="properties" title="Properties">
        <LaminateProperties note="For a rod inquiry, identify the diameter, reinforcement, resin and surface condition together. Request the data and acceptance criteria that apply to that configuration and the finished part." />
      </ProductSection>

      <ProductSection id="applications" title="Applications" tone="muted">
        <ApplicationCards cards={familyApplications("rod")} />
      </ProductSection>

      <ProductSection id="documents" title="Documents">
        <ProductDocuments productPaths={[pagePath, "/products/fiberglass-structural-shapes"]} family={{ label: "Rod", datasheetsHref: "/datasheets#rod" }} sizes={sizes} />
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

      <ProductSection id="quote" title="Quote FRP round rods" tone="deep">
        <ProductRfq
          product="FRP round rods"
          productPath={pagePath}
          intro="Send the rod diameter, cut lengths, quantities and part drawing, with the intended service and delivery destination."
          items={[
            { title: "Diameter and fit", text: "Nominal diameter, tolerance, straightness and mating-part requirements." },
            { title: "Cut length and machining", text: "Lengths, end details, holes and responsibility for further fabrication." },
            { title: "Material and acceptance", text: "Loads, environment and the properties or inspections required for the part." },
            { title: "Quantity and destination", text: "Quantity by length, repeat demand and delivery location." },
          ]}
        />
      </ProductSection>
    </>
  );
}
