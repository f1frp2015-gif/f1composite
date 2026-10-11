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
  "Compare pultruded fiberglass C and U channel sizes and catalog weights. Specify cut lengths, drilled supports and connection details for a project quote.";
const pagePath = "/products/fiberglass-structural-shapes/frp-channel";

const LAST_UPDATED = "2026-10-11";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-channel/opengraph-image",
});

const faqItems = [
  {
    question: "Is a fiberglass channel the same as a strut channel or cable tray?",
    answer:
      "This page lists plain pultruded C and U sections. A slotted strut requires defined slot geometry, compatible fittings and support loads. A complete cable tray or ladder also needs side rails, rungs or a base, splices and system documentation. State whether your inquiry covers profile lengths, fabricated supports or a complete cable system so the offered scope can be confirmed.",
  },
  {
    question: "What colors are available for FRP channels?",
    answer:
      "State the required color or RAL reference and whether the channel will be used outdoors. Color, surface veil or coating, quantity and delivery are confirmed for the proposed formulation. Agree a sample and surface specification where appearance or UV exposure matters.",
  },
  {
    question: "Can FRP channels be bolted to dissimilar materials?",
    answer:
      "Bolted connections can be evaluated using the channel and mating-part drawings. Specify fastener material, hole pattern, washers, bearing surfaces and exposure conditions. Check the complete connection for load transfer and corrosion of its metallic parts; selecting an FRP channel does not remove those checks.",
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
          material: ["Glass-fiber-reinforced thermoset"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Channel"
        line={{ name: "F1-STRUX", label: "Channel" }}
        updated={LAST_UPDATED}
        title="Fiberglass channel (FRP) profiles"
        description="Pultruded fiberglass C and U sections for secondary framing and fabricated supports. Compare dimensions and catalog weights, then define cut lengths, holes, connections and the required material."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Depth", values: sizes.map((size) => size.d), weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Section", value: "Open C / U" },
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
                { src: "/images/products/channel/frp-channel-profile-200x60x12mm.webp", alt: "Pultruded FRP channel", caption: "U 200×60×12" },
                { src: "/images/f1-photos/f1-composite-pultrusion-plant-floor.webp", alt: "F1 Composite pultrusion plant floor with finished profiles on inspection tables", caption: "Pultrusion plant floor" },
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
              A plain pultruded channel is a profile length that can be specified for framing or fabricated into a support. Define the bearing faces, unsupported length, load direction and connection details before selecting a section from the table.
            </p>
            <p>
              For a slotted strut, include the slot pattern and mating hardware. For cable routes, distinguish a support bracket from the tray or ladder it carries. The cable-system guide sets out the components and documentation needed to review a complete package.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["Plain C and U sections", "Specify holes and fittings", "Color and surface by agreement", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <UseList
            items={[
              { label: "Cable trays, ladders and support scope", href: "/applications/frp-cable-tray-supports" },
              { label: "Industrial platform framing", href: "/applications/frp-chemical-plant-platforms" },
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
        <LaminateProperties note="Specify the channel formulation and surface finish with the support drawing. Confirm applicable material evidence and connection checks for the proposed section." />
        <div className="mt-[24px] max-w-[640px]">
          <CalculatorCTA
            href="/frp-profile-calculator#shape=channel"
            eyebrow="Free tool · channel preset"
            title="Size an FRP channel: bending, shear and deflection"
            sub="Enter your span and loads for a preliminary member check. Connection details and complete tray or strut-system performance require their own review."
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
        <ProductRfq
          product="FRP channels"
          productPath={pagePath}
          intro="Send the channel size, lengths and quantities. Identify whether you need plain sections, fabricated supports or a cable-system package."
          items={[
            { title: "Section and lengths", text: "Catalog model or drawing, cut lengths and quantities." },
            { title: "Holes and fittings", text: "Hole or slot layout, mating hardware and fabrication scope." },
            { title: "Support requirements", text: "Load direction, spacing, connection details and service environment." },
            { title: "Material and delivery", text: "Resin, surface finish, required records and destination." },
          ]}
          links={[{ label: "Estimate a price first", href: "/fiberglass-pultruded-profile-price" }]}
        />
      </ProductSection>
    </>
  );
}
