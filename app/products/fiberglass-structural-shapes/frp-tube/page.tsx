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

const LAST_UPDATED = "2026-10-11";
const quoteMessage = "Please review my fiberglass round tube requirements.\nOutside diameter / required inside diameter / wall thickness (with units):\nFinished length and piece count:\nFit, end cuts, holes or inserts (drawing reference):\nApplication, span and loads:\nResin or service environment and required evidence:\nDestination and target date:";

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
      "Pultruded FRP round tubes are used as members in handrail systems, structural columns and antenna masts. Select the section, laminate and connections for the loads and exposure. Pressure service, electrical conduit and insulating equipment each need their own specification and qualification; a structural tubing size does not establish those capabilities.",
  },
  {
    question: "How do I specify the inside diameter of fiberglass tubing?",
    answer:
      "For a nominal circular tube with a uniform wall, ID = OD − 2 × wall thickness. This is a geometry calculation, not a guaranteed fit. If the tube must accept a sleeve, insert or cable assembly, send the required clearance, mating-part drawing and tolerances for review, including any limits on ovality or straightness.",
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
        title="Fiberglass round tubes and tubing (FRP)"
        description="Circular hollow section pultruded fiberglass tubing from 25 mm to 150 mm OD, for handrails, guardrails and masts. Compare outside diameter and wall, then specify the bore fit, cut lengths and connection details for your project."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Outside diameter", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Catalog material reference", value: "EN 13706 E23" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "tube-product-header", product, productPath: pagePath, message: quoteMessage }) },
          secondary: { label: "Find a size", href: "#sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <>
            <ProfileFigure model="CHS 76×6.4" />
            <HeroPhotos
              photos={[
                { src: "/images/products/round-tube/frp-round-tube-photo.webp", alt: "Pultruded FRP round tube", caption: "Round tube", fit: "contain" },
                { src: "/images/f1-photos/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
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
          { id: "overview", label: "Supply scope" },
          { id: "sizes", label: "Sizes & units", count: sizes.length },
          { id: "documents", label: "Drawings & reports" },
          { id: "properties", label: "Material basis" },
          { id: "machining", label: "Machining & inspection" },
          { id: "applications", label: "Applications" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <ProductSection id="overview" title="Specify the tube and its supply scope">
        <div className="grid grid-cols-1 gap-[28px] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-relaxed text-t2">
            <p>
              Pultruded FRP round tubes suit members that need a circular grip or cross-section, including handrails, guardrails and masts. State whether you need tube lengths or finished parts with cutting, holes and end treatment. Start with the member load and connections, then select the diameter, wall and laminate. For flat mounting faces or frame joints, compare the <Link href="/products/fiberglass-structural-shapes/frp-square-tube" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">square and rectangular tube range</Link>.
            </p>
            <div className="rounded-card border border-border-default bg-bg2 px-[16px] py-[12px]">
              <h3 className="text-f16 font-bold text-t1">GRP tube for structural applications</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">
                GRP tube and fiberglass round tubing refer to the glass-reinforced pultrusions in this range. Pressure pipe needs a separately qualified specification. For electrical conduit or an insulating equipment part, provide the applicable product standard, voltage duty, environment and assembly details; a hollow shape or material property alone does not qualify the finished part.{" "}
                <Link href="/what-is-frp#terminology" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
                  FRP, GRP and GFRP explained
                </Link>
              </p>
            </div>
            <p className="rounded-card border border-border-default bg-bg2 px-[16px] py-[12px] text-f14 leading-golden">
              Comparing materials for a lightweight member? <Link href="/products/pultruded-carbon-fiber-tubes#carbon-vs-fiberglass" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Compare carbon fiber and fiberglass tubes</Link>. Carbon may suit high axial stiffness and low moving mass; fiberglass may suit cost-sensitive designs and electrical insulation needs. Compare the actual laminate, loads and connections, and qualify any electrical duty for the finished assembly.
            </p>
            <ul className="flex flex-wrap gap-[8px]">
              {["E23 material reference", "Handrails and guardrails", "Smooth bore", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
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
              { label: "Electrical component qualification", href: "/applications/frp-switchgear-insulation-components" },
              { label: "Infrastructure handrails", href: "/industries/infrastructure" },
            ]}
          />
        </div>
      </ProductSection>

      <ProductSection
        id="sizes"
        title="Select nominal dimensions and units"
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
        <div className="mt-[20px] grid gap-[12px] md:grid-cols-3">
          {[
            { title: "Outside diameter (OD)", text: "Use the table OD to shortlist a section. For a clamp or external fitting, send the mating dimensions and required fit with the drawing." },
            { title: "Inside diameter (ID) and wall", text: "Nominal ID = OD − 2 × wall. If an insert or sleeve must fit, specify the required clearance and tolerances; calculated ID is not an inspected bore dimension." },
            { title: "Cut length and end details", text: "List finished length and quantity for each part. Mark end angles, hole positions, inserts and cut-edge treatment, and identify dimensions that control assembly fit." },
          ].map((item) => (
            <div key={item.title} className="rounded-card border border-border-default bg-white px-[16px] py-[14px]">
              <h3 className="text-f16 font-bold text-t1">{item.title}</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t2">The internal catalog references identify nominal cross-sections on this website, not manufacturer SKUs or mold numbers. Each row uses its displayed default material dataset and published catalog mass; another resin needs its own mass and evidence review. No public report is mapped to an exact round-tube and formulation combination. <Link href="/resources/evidence?category=round-tube" className="font-semibold text-teal-text underline">Check evidence scope</Link>.</p>
        <p className="mt-[10px] max-w-[900px] text-f14 leading-golden text-t3">{commercialFacts.availability}</p>
        <p className="mt-[10px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/frp-span-tables#round-tube" className="underline underline-offset-4 hover:text-teal">
            Allowable loads by span
          </Link>
          <Link href="/products/custom-pultruded-profiles" className="underline underline-offset-4 hover:text-teal">
            A different size or an exact inch dimension: send a drawing
          </Link>
        </p>
      </ProductSection>

      <ProductSection id="documents" title="Match the drawing and reports to the selected tube" intro="A catalog drawing describes the nominal section. Check the material dataset and report scope separately before specifying a finished part or a performance requirement.">
        <p className="mb-[20px] max-w-[900px] text-f16 leading-golden text-t2">
          <Link href="/resources/evidence?category=round-tube" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Open the round-tube evidence package</Link> to review available references and items still to confirm. Identify the section and formulation where known; another resin or a similar diameter does not inherit an approval. Use the size row&apos;s Quote link to carry its catalog configuration into the inquiry.
        </p>
        <ProductDocuments productPaths={[pagePath, "/products/fiberglass-structural-shapes"]} family={{ label: "Round tube", datasheetsHref: "/datasheets#round-tube" }} sizes={sizes} />
      </ProductSection>

      <ProductSection id="properties" title="Review the material basis and load case">
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

      <ProductSection id="machining" title="Define the finished part and its inspection" tone="muted">
        <div className="max-w-[900px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>For cut or drilled tubing, supply a part drawing with its revision, units, cut list and hole or end details. Locate features from agreed datums and identify the bore, sleeve or clamp fit that controls assembly. Separate nominal tube dimensions from the limits required on the finished part.</p>
          <p>Agree measurement setup, edge treatment, sampling and any first-article fit check before production. A drawing requirement or blank inspection sheet is not an inspected result.</p>
          <p className="flex flex-wrap gap-x-[24px] gap-y-[8px]">
            <Link href="/technology/frp-profile-machining" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Prepare cutting and machining requirements</Link>
            <Link href="/technology/quality-testing#machining-records" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Plan the inspection record</Link>
          </p>
        </div>
      </ProductSection>

      <ProductSection id="applications" title="Applications" tone="muted">
        <ApplicationCards cards={familyApplications("round-tube")} />
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
          <Link href="/technology/frp-profile-machining" className="underline underline-offset-4 hover:text-teal">Specify cutting, drilled holes and machining tolerances</Link>
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
        <ProductRfq
          product="FRP round tubes"
          productPath={pagePath}
          quoteHref={buildRfqHref({ source: "tube-product-rfq", product, productPath: pagePath, message: quoteMessage })}
          intro="Send the selected catalog row or a dimensioned drawing, with the bore fit and finished-part requirements."
          items={[
            { title: "OD, ID and wall", text: "Include units, required clearances and mating-part dimensions. Mark which dimensions and tolerances are critical to fit." },
            { title: "Cut list and end processing", text: "Give finished lengths and piece counts, end cuts, holes, inserts and cut-edge treatment. State whether you need plain lengths or processed parts." },
            { title: "Service and evidence", text: "Describe loads, supports, chemicals, temperature and outdoor exposure. Identify any fire, pressure or electrical requirements for a separate applicability review." },
            { title: "Quantity and delivery", text: "Include trial and repeat quantities, destination and target date. Confirm tooling, material, sample arrangements, inspection documents and production timing in the quotation." },
          ]}
          links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]}
        />
      </ProductSection>
    </>
  );
}
