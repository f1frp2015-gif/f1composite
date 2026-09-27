import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import { profileSupplyItems } from "@/components/sections/ProfileSupplyGuide";
import RelatedLinks from "@/components/sections/RelatedLinks";
import SheetQuoteForm from "@/components/sections/SheetQuoteForm";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import JsonLd from "@/components/seo/JsonLd";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pageTitle = "Fiberglass Sheets Manufacturer — Cut-to-Size FRP Sheet";
const pageDescription =
  "Fiberglass sheets manufacturer supplying solid pultruded FRP sheet cut to size for liners, covers, baffles and fabricated parts, with global delivery.";
const pagePath = "/products/fiberglass-sheets";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-sheets/opengraph-image",
});

// Program ranges are typical and confirmed per order. This solid-sheet family
// has no published per-size weight catalog yet, so no weight table is inferred.
const faqItems = [
  {
    question: "Is pultruded fiberglass sheet the same as G10, FR4 or a roofing panel?",
    answer:
      "These names cover different product specifications. This page offers solid pultruded fiberglass flat stock for fabrication. A G10 or FR4 laminate, corrugated roof panel or decorative wall liner needs its own material and product specification. If your drawing names one of those products, include the exact grade and intended use for review rather than substituting by the word fiberglass alone.",
  },
  {
    question: "What thicknesses and sizes do fiberglass sheets come in?",
    answer:
      "The pultruded flat-sheet program typically runs 2–25 mm thick in panel widths up to about 1,000–1,220 mm, supplied cut to your part sizes rather than as fixed stock panels. Narrow solid sections up to 305×25 mm are a separate, catalogued product — see the fiberglass flat bar page with published sizes and weights. State the finished part dimensions and quantity in the RFQ; nesting and cutting are done in production.",
  },
  {
    question: "What is the difference between fiberglass sheet and FRP plate?",
    answer:
      "Suppliers sometimes use sheet and plate interchangeably for flat laminate. To keep the F1 catalog unambiguous, this page covers solid flat sheet at every offered thickness; the separate fiberglass plate page covers shaped hollow and multi-cell pultruded profiles. Send a cross-section when the geometry is not simply flat.",
  },
  {
    question: "Can the sheets be supplied with an anti-slip surface?",
    answer:
      "Yes — the gritted variant bonds a silica or aluminum-oxide grit surface to one face, which is exactly the material used for our stair tread covers and solid-top walkway plate. Smooth (veiled) both faces is standard for liners, baffles, and electrical applications; embossed and pigmented options are available per order.",
  },
  {
    question: "What are typical applications for pultruded FRP sheet?",
    answer:
      "Typical uses include tank and clarifier baffles, liners, wear pads and bearing strips, equipment covers, kick panels, electrical barriers and cut blanks that fabricators machine into brackets, spacers or connection parts. Suitability for a load-bearing cover or walking surface requires a project-specific thickness, support and load check.",
  },
  {
    question: "Which resin should I choose for fiberglass sheet?",
    answer:
      "Polyester and vinyl ester systems are available for review. State the chemical, concentration, temperature and exposure duration so the laminate can be selected for the actual service. Outdoor and fire-performance requirements also need a specified surface system and applicable test evidence; a resin name alone does not establish a fire classification or chemical compatibility.",
  },
  {
    question: "Do you publish mechanical data for the sheet program?",
    answer:
      "Sheet laminates are built on the same E-glass / resin systems as our profiles, and orders ship with batch mechanical certificates on request. Because sheet reinforcement is tailored per thickness and duty (more multidirectional glass than a unidirectional profile), we quote the laminate spec per order rather than publishing one generic table — send the load case and we return the laminate build-up with the quotation.",
  },
];

// The four fabrication jobs flat stock is cut for.
const uses = [
  {
    title: "Structural connection",
    text: "Cut blanks for gussets, splice parts, bearing pads and other fabricated connections, machined to the approved part drawing and load case.",
  },
  {
    title: "Corrosion barriers",
    text: "Tank and clarifier baffles, launder and trench covers, liners for bunds and splash zones: vinyl ester laminates in continuous chemical contact.",
  },
  {
    title: "Walking surfaces",
    text: "Gritted sheet for tread-cover overlays and other anti-slip surfaces. Load-bearing covers require separate support and capacity checks.",
    link: { label: "Stair tread covers", href: "/products/frp-stair-treads" },
  },
  {
    title: "Fabrication blanks",
    text: "Cut blanks that shops machine into brackets, spacers, wear pads and non-conductive panels, with carbide or diamond tooling as for any pultruded stock.",
  },
];

// The surfaces the FAQ describes, as a short list beside the edge photo.
const surfaces = [
  { name: "Smooth, veiled", text: "Standard on both faces for liners, baffles and electrical parts." },
  { name: "Gritted anti-slip", text: "Silica or aluminum-oxide grit bonded to one face, the material of the stair tread covers." },
  { name: "Embossed or pigmented", text: "Available per order; confirm on the drawing." },
];

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export default function FiberglassSheetsPage() {
  const quoteHref = buildRfqHref({ source: "sheet-product-header", product: "Solid pultruded fiberglass sheet", productPath: pagePath });
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass Sheets (Pultruded Solid Flat Stock)",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/fiberglass-sheets/pultruded-fiberglass-sheet-black-surface.webp",
          category: "Solid pultruded FRP sheet",
          productLine: "F1-FORM",
          material: ["E-glass fiber", "Isophthalic polyester resin", "Vinyl ester resin", "Fire-retardant polyester resin"],
          additionalProperty: [
            { name: "Thickness range", value: "2–25 mm typical, confirmed per order" },
            { name: "Panel width", value: "Up to ~1,000–1,220 mm, supplied cut to part size" },
            { name: "Surfaces", value: "Smooth veiled, gritted anti-slip, embossed; pigmented options" },
            { name: "Certificates", value: "Batch mechanical certificates on request; laminate spec quoted per duty" },
          ],
        })}
      />
      <PageHeader
        tag="Solid flat sheet"
        line={{ name: "F1-FORM", label: "Solid flat sheet" }}
        title="Fiberglass sheets manufacturer — solid FRP sheet cut to size"
        description="Solid flat fiberglass sheet from 2 to 25 mm typical thickness — smooth, gritted anti-slip, or embossed — cut to part size in polyester, vinyl ester, or fire-retardant resin systems."
        facts={[
          { label: "Thickness", value: "2–25 mm" },
          { label: "Panel width", value: "Up to 1,220 mm" },
          { label: "Finish", value: "Smooth or gritted" },
          { label: "Supply", value: "Cut to size" },
        ]}
        actions={{
          primary: { label: "Enter your sheet dimensions", href: "#sheet-quote" },
          secondary: { label: "Send a drawing", href: quoteHref, variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Solid sheet surface" note="Production photo" caption="Finished black pultruded fiberglass sheet surface during production." bleed>
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/products/fiberglass-sheets/pultruded-fiberglass-sheet-black-surface.webp"
                alt="Black pultruded fiberglass sheet with a finished surface on the production line"
                fill
                sizes="(max-width: 1023px) 94vw, 44vw"
                className="object-cover"
                preload
              />
            </div>
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Fiberglass Sheets" },
        ]}
      />

      <PageNav
        items={[
          { id: "applications", label: "Applications" },
          { id: "surface", label: "Surface & edges" },
          { id: "sheet-quote", label: "Cut list" },
          { id: "faq", label: "FAQ" },
          { id: "related", label: "Related" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection
        id="applications"
        title="Fiberglass sheet for four fabrication jobs"
        intro="As a fiberglass sheets manufacturer, F1 supplies pultruded flat stock as cut-to-size production parts rather than a one-size retail panel. Thickness, reinforcement, resin, surface finish, machining and nesting are confirmed from the finished-part drawing and service environment before quotation."
      >
        <ul className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {uses.map((use) => (
            <li key={use.title} className="flex flex-col rounded-card border border-border-default bg-white p-[20px]">
              <h3 className="text-f16 font-bold text-t1">{use.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{use.text}</p>
              {use.link ? (
                <Link href={use.link.href} className={`mt-auto pt-[12px] text-f14 ${link}`}>
                  {use.link.label}
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-[20px] max-w-[900px] text-f16 leading-golden text-t2">
          This page covers solid flat stock. Shaped hollow and multi-cell sections have a separate{" "}
          <Link href="/products/fiberglass-plates" className={link}>
            pultruded fiberglass plate profile catalog
          </Link>
          . Narrow solid rectangles with published sizes and per-meter weights remain in the{" "}
          <Link href="/products/fiberglass-structural-shapes/frp-flat-bar" className={link}>
            fiberglass flat-bar catalog
          </Link>{" "}
          (12×3 to 305×25 mm).
        </p>
      </PageSection>

      <PageSection
        id="surface"
        title="Surface and edge detail"
        tone="muted"
        intro="Color, surface, thickness and any shaped detail are confirmed against the order drawing; use the plate catalog when the cross-section is not flat."
      >
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[48px]">
          <Figure number={2} title="Formed-edge sample" note="Production photo" caption="Thin-wall sample with formed returns; confirm flat-sheet versus shaped-profile scope on the approved drawing." bleed>
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/products/fiberglass-sheets/pultruded-frp-sheet-formed-edge-sample.webp"
                alt="Black pultruded FRP sheet-program sample with thin walls and formed return edges"
                fill
                sizes="(max-width: 1023px) 94vw, 44vw"
                className="object-cover"
              />
            </div>
          </Figure>
          <dl className="divide-y divide-border-default border-y border-border-default">
            {surfaces.map((surface) => (
              <div key={surface.name} className="grid gap-[4px] py-[14px] sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-[16px]">
                <dt className="text-f16 font-bold text-t1">{surface.name}</dt>
                <dd className="text-f14 leading-golden text-t2">{surface.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PageSection>

      <PageSection
        id="sheet-quote"
        title="Request solid fiberglass sheet cut to size"
        intro="Start with one part size below. For several sizes, include a cutting list or drawing with your inquiry. The typical program is 2–25 mm thick; the available width, laminate and surface are confirmed for your order."
      >
        <SheetQuoteForm />
      </PageSection>

      <PageSection id="faq" title="Questions buyers ask" tone="muted">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related flat & structural stock",
            links: [
              { href: "/products/fiberglass-plates", label: "Fiberglass plate profiles (hollow & multi-cell)" },
              { href: "/products/wind-turbine-blade-panels", label: "Wind turbine blade panels (GFRP, CFRP & hybrid)" },
              { href: "/products/fiberglass-structural-shapes/frp-flat-bar", label: "Fiberglass flat bars (catalog sizes)" },
              { href: "/products/fiberglass-structural-shapes", label: "Fiberglass structural shapes catalog" },
              { href: "/products/frp-stair-treads", label: "Stair tread covers" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions" },
            ],
          },
          {
            title: "Specify & buy",
            links: [
              { href: "/technology/pultrusion-resin-systems", label: "Resin system selection" },
              { href: "/fiberglass-pultruded-profile-price", label: "Profile price estimator" },
              { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "DDP, tariffs & HS codes" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Quote fiberglass sheet" tone="deep">
        <ProductRfq
          product="solid pultruded fiberglass sheet"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={profileSupplyItems({ sheet: true })}
          intro="Send the finished part sizes, surface and service duty, the quantity and the destination."
          links={[
            { label: "Compare resin systems", href: "/technology/pultrusion-resin-systems" },
            { label: "Review supporting documents and scope", href: "/resources/evidence" },
          ]}
          advisorPrompt="I need solid pultruded fiberglass sheet: thickness [mm], finished part sizes and quantity, surface [smooth/gritted/embossed], service [chemical/electrical/liner/cover/fabricated blank], support/load if structural, resin preference [if any], destination [country/postcode]. What laminate and resin do you recommend, and what should the RFQ include?"
        />
      </PageSection>
    </>
  );
}
