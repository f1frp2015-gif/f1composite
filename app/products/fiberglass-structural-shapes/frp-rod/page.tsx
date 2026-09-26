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
  "Pultruded fiberglass rod Ø6–Ø50 mm with 65–70% unidirectional glass. Non-magnetic, non-conductive solid FRP rods. Soil nails, rock bolts, tie-rods. DDP USA.";
const pagePath = "/products/fiberglass-structural-shapes/frp-rod";

const LAST_UPDATED = "2026-09-26";

const faqItems = [
  {
    question: "What are pultruded FRP round rods used for?",
    answer:
      "Pultruded FRP solid round rods are used for soil nails, rock bolts, ground anchors, marine tie-rods, FRP rebar in concrete, electrical insulator cores, antenna masts, and tooling shafts. The combination of high tensile strength, non-magnetic and non-conductive properties, and zero corrosion makes them the standard choice in environments where steel cannot survive.",
  },
  {
    question: "What is the tensile strength of FRP round rods?",
    answer:
      "Pultruded FRP round rods with 65–70% unidirectional glass roving have axial tensile strength of 700–1100 MPa — significantly higher than mild steel (400 MPa) on a strength-per-weight basis. Modulus is 40–55 GPa. Specific values depend on resin system and fiber loading; full datasheets available on request.",
  },
  {
    question: "Are FRP rods non-magnetic and non-conductive?",
    answer:
      "Yes. Glass-reinforced pultruded FRP rods are electrically non-conductive (volume resistivity > 10¹² Ω·cm), magnetically transparent, and RF-transparent. This makes them the preferred choice for MRI room reinforcement, transformer spacers, electrified railway tie-rods, and antenna structural elements where steel would short, arc, or distort EM fields.",
  },
  {
    question: "Can FRP round rods be used as rebar in concrete?",
    answer:
      "Yes. Sand-coated or helically wound FRP rods are used as non-corrosive concrete reinforcement, particularly in marine structures, bridge decks, parking decks, and chemically aggressive slabs. They remove the cause of corrosion-induced concrete spalling, which extends the service life of the structure. Bond strength is comparable to deformed steel rebar when surface treatment is specified correctly.",
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
          material: ["Unidirectional glass roving", "Polyester resin", "Vinyl ester resin"],
          productLine: "F1-STRUX",
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Round Rod"
        line={{ name: "F1-STRUX", label: "Round rod" }}
        updated={LAST_UPDATED}
        title="Fiberglass Rods (Solid FRP)"
        description="Solid pultruded fiberglass rods from Ø6 to Ø50 mm with 65–70% unidirectional glass. Non-magnetic and non-conductive, for soil nails, rock bolts, tie-rods and plant stakes."
        facts={[
          ...profileFamilyFacts({ count: sizes.length, rangeLabel: "Diameter", values: sizes.map((size) => size.d), prefix: "Ø", weights: sizes.map((size) => size.mass ?? NaN) }),
          { label: "Glass", value: "65–70% unidirectional" },
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
              Rods are pultruded with 65–70% unidirectional glass roving, so nearly all of their strength runs along the axis. They serve as soil nails, rock bolts, guy-wire replacements and marine tie-rods, where a non-magnetic, non-conductive rod that cannot rust has the edge over steel.
            </p>
            <ul className="flex flex-wrap gap-[8px] pt-[4px]">
              {["65–70% unidirectional glass", "Non-magnetic", "Smooth, sand-coated or wound", `${supplyTerms.standardLengthM} m lengths or cut to size`].map((chip) => (
                <li key={chip} className="rounded-tag border border-border-default bg-bg2 px-[10px] py-[4px] text-f14 text-t2">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <UseList
            items={[
              { label: "Fiberglass stakes for plants and trees", href: "/products/fiberglass-stakes" },
              { label: "FRP rebar for concrete", href: "/products/frp-rebar" },
              { label: "Soil nails and rock bolts", href: "/industries/infrastructure" },
              { label: "Marine tie-rods", href: "/industries/marine" },
              { label: "Solar tracker shafts", href: "/industries/energy" },
            ]}
          />
        </div>
      </ProductSection>

      <ProductSection
        id="sizes"
        title="Sizes"
        count={`${sizes.length} catalog sizes`}
        tone="muted"
        intro="Diameter in mm, mass in kg/m. A and Ix are calculated from the nominal section. Surface options: smooth, sand-coated or helically wound, selected to suit the bond you need."
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
        <LaminateProperties note="Rods are mostly unidirectional roving, so their axial strength and modulus run well above these grade minimums. Ask for measured values for the diameter and resin you need." />
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
        <ProductRfq product="FRP round rods" productPath={pagePath} />
      </ProductSection>
    </>
  );
}
