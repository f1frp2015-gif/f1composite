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

const pageTitle = "Fiberglass Square & Rectangular Tube | Pultruded FRP";
const pageDescription =
  "Compare pultruded fiberglass square tube and rectangular tubing sizes, walls and weights. Select a section and request cut lengths, resin options and a quote.";
const pagePath = "/products/fiberglass-structural-shapes/frp-square-tube";
const product = "Pultruded fiberglass square and rectangular tubing";

const LAST_UPDATED = "2026-10-11";
const quoteMessage = "Please review my fiberglass square or rectangular tube requirements.\nSection H × B × wall thickness (with units):\nInstalled orientation, span and loads:\nFinished length and piece count:\nConnection / hole / insert drawing reference:\nResin or service environment and required evidence:\nDestination and target date:";

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
      "A closed section provides flat mounting faces and can be useful where a frame member carries bending and torsion. Compare the actual geometry, laminate and load case with an I-beam or channel; the shape name alone does not establish capacity. Check local bearing and access to the inside face before choosing a bolted connection.",
  },
  {
    question: "Are rectangular hollow sections (RHS) available?",
    answer:
      "Yes. The catalog includes rectangular hollow sections such as 80×60, 100×60 and 120×60 mm alongside square sections. Confirm tooling, material, production quantity and timing in your quotation. Send a drawing for a custom rectangular size.",
  },
  {
    question: "Can I use these tubes in a cooling tower frame?",
    answer:
      "Square and rectangular tubes can be considered as frame members when the section, laminate and connections meet the project requirements. Send water chemistry, maximum service temperature, member loads, bracing and connection drawings. The cooling tower application guide covers the specification inputs; a catalog section is not an approved tower structure.",
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
        title="Fiberglass square and rectangular tubes (FRP)"
        description="Pultruded fiberglass square and rectangular tubing (SHS / RHS) from 25×25 mm to 240×240 mm for columns, posts and frames. Select H × B × wall thickness, then confirm the installed orientation, connection details and cut list."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Outer size", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Catalog material reference", value: "EN 13706 E23" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "tube-product-header", product, productPath: pagePath, message: quoteMessage }) },
          secondary: { label: "Find a size", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <>
            <ProfileFigure model="SHS 100×100×8" />
            <HeroPhotos
              photos={[
                { src: "/images/products/square-tube/frp-square-tube-100x100x6mm.webp", alt: "Pultruded FRP square tube", caption: "SHS 100×100×6" },
                { src: "/images/f1-photos/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
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
          { id: "connections", label: "Connections" },
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
              FRP square and rectangular tubes provide flat faces for posts, frames and equipment supports. Square hollow sections (SHS) have equal outside height and width; rectangular hollow sections (RHS) have unequal sides. Both use the same catalog below, with H, B and wall thickness identified separately. Specify the laminate and complete connection for the service conditions; a hollow structural profile does not establish an electrical conduit rating.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["E23 material reference", "Square and rectangular", "Smooth bore", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
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
              { label: "Cooling tower frames and supports", href: "/applications/frp-cooling-tower-profiles" },
              { label: "Solar racking posts", href: "/industries/energy" },
              { label: "Utility crossarm design guide", href: "/applications/frp-utility-crossarms" },
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
        <div className="mb-[20px] grid gap-[12px] md:grid-cols-2">
          <div className="rounded-card border border-border-default bg-white px-[16px] py-[14px]">
            <h3 className="text-f16 font-bold text-t1">Square tubing: H = B</h3>
            <p className="mt-[6px] text-f14 leading-golden text-t2">Use equal outside dimensions for a square post or frame member. Check wall thickness and the internal space needed for sleeves or inserts; outside dimensions alone do not define the connection fit.</p>
          </div>
          <div className="rounded-card border border-border-default bg-white px-[16px] py-[14px]">
            <h3 className="text-f16 font-bold text-t1">Rectangular tubing: H ≠ B</h3>
            <p className="mt-[6px] text-f14 leading-golden text-t2">Mark which side is vertical in the installed member. Rotating an RHS changes its bending properties relative to the load; use the section properties for that orientation when comparing spans and deflection.</p>
          </div>
        </div>
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

      <ProductSection id="connections" title="Specify the connections and installation interfaces">
        <div className="grid gap-[16px] md:grid-cols-3">
          {[
            { title: "Holes and fastener access", text: "Send hole positions, diameters and edge distances on a controlled drawing. Show whether the installer can reach both sides of the connection, and whether the joint includes an insert, sleeve or bracket." },
            { title: "Bearing and clamping", text: "Identify local loads at bolts, bases and clamps. The connection design must check wall bearing and crushing; agree the reinforcement detail and tightening procedure instead of transferring a steel-tube detail unchanged." },
            { title: "Site work and environment", text: "Separate factory cutting and drilling from work left to the installer. Specify cut-edge treatment, drainage where relevant, hardware compatibility and inspection. For cooling towers, include water chemistry and service temperature." },
          ].map((item) => (
            <div key={item.title} className="rounded-card border border-border-default bg-bg2 px-[16px] py-[16px]">
              <h3 className="text-f16 font-bold text-t1">{item.title}</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/technology/frp-profile-machining" className="underline underline-offset-4 hover:text-teal">Specify cutting, drilled holes and machining tolerances</Link>
          <Link href="/resources/design-guides" className="underline underline-offset-4 hover:text-teal">Review fabrication and connection guidance</Link>
          <Link href="/applications/frp-cooling-tower-profiles" className="underline underline-offset-4 hover:text-teal">Cooling tower specification inputs</Link>
        </p>
      </ProductSection>

      <ProductSection id="properties" title="Properties">
        <LaminateProperties />
        <div className="mt-[24px] grid grid-cols-1 items-start gap-[16px] lg:grid-cols-2">
          <E40EvidenceLink />
          <div>
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
        <ProductRfq
          product="FRP square and rectangular tubes"
          productPath={pagePath}
          quoteHref={buildRfqHref({ source: "square-tube-product-rfq", product, productPath: pagePath, message: quoteMessage })}
          intro="Send H × B × wall thickness, the installed orientation and a cut list, with the connection drawing where available."
          items={[
            { title: "Section and fit", text: "Identify the catalog row or required H × B × wall, units and tolerances. Include the clearance needed for any mating insert or sleeve." },
            { title: "Cut list and connections", text: "List finished lengths and piece counts, holes, brackets, inserts and end treatment. Identify factory processing and work to be completed on site." },
            { title: "Loads and service", text: "Give span, support and bracing details, installed orientation, loads and allowable deflection. Include chemical, temperature, outdoor and fire requirements." },
            { title: "Order and evidence", text: "State trial and repeat quantities, destination and target date. Confirm tooling, material, samples, applicable reports, inspection documents and production timing in the quotation." },
          ]}
          links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]}
        />
      </ProductSection>
    </>
  );
}
