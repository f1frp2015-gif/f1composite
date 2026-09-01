import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import AskAICard from "@/components/ai/AskAICard";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
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
      "Isophthalic polyester is the general-purpose default. Move to vinyl ester for acid, caustic, hypochlorite, and marine immersion — tank internals and wastewater baffles are the classic cases. Fire-retardant polyester (the ASTM E84 Class 1 family) covers escape routes and enclosed spaces; UV-stabilized systems with surface veil are the right call for outdoor exposure.",
  },
  {
    question: "Do you publish mechanical data for the sheet program?",
    answer:
      "Sheet laminates are built on the same E-glass / resin systems as our profiles, and orders ship with batch mechanical certificates on request. Because sheet reinforcement is tailored per thickness and duty (more multidirectional glass than a unidirectional profile), we quote the laminate spec per order rather than publishing one generic table — send the load case and we return the laminate build-up with the quotation.",
  },
];

export default function FiberglassSheetsPage() {
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
        tag="Solid Flat Sheet · F1-FORM"
        title="Fiberglass sheets manufacturer — solid FRP sheet cut to size"
        description="Solid flat fiberglass sheet from 2 to 25 mm typical thickness — smooth, gritted anti-slip, or embossed — cut to part size in polyester, vinyl ester, or fire-retardant resin systems."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Fiberglass Sheets" },
        ]}
      />

      <section className="bg-white pt-[55px] md:pt-[72px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Production & Edge Detail</SectionTag>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            See the solid sheet surface and an order-specific edge form
          </h2>
          <p className="mt-[13px] max-w-[860px] text-f15 leading-golden text-t2">
            These production photos show the finished black surface and a thin-wall sample
            with formed returns. Color, surface, thickness and any shaped detail are confirmed
            against the order drawing; use the Plate catalog when the cross-section is not flat.
          </p>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-bg2">
                <Image
                  src="/images/products/fiberglass-sheets/pultruded-fiberglass-sheet-black-surface.webp"
                  alt="Black pultruded fiberglass sheet with a finished surface on the production line"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 610px"
                  className="object-cover object-center"
                  preload
                />
              </div>
              <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                Finished black pultruded fiberglass sheet surface during production.
              </figcaption>
            </figure>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-bg2">
                <Image
                  src="/images/products/fiberglass-sheets/pultruded-frp-sheet-formed-edge-sample.webp"
                  alt="Black pultruded FRP sheet-program sample with thin walls and formed return edges"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 610px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                Thin-wall sample with formed returns; confirm flat-sheet versus shaped-profile scope on the approved drawing.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Where Flat Stock Fits</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Fiberglass sheet for four fabrication jobs
          </h2>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            As a fiberglass sheets manufacturer, F1 supplies pultruded flat stock as
            cut-to-size production parts rather than a one-size retail panel. Thickness,
            reinforcement, resin, surface finish, machining, and nesting are confirmed from
            the finished-part drawing and service environment before quotation.
          </p>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h3 className="text-f15 font-bold text-t1">Structural connection</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                Cut blanks for gussets, splice parts, bearing pads and other fabricated
                connections — machined to the approved part drawing and load case.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h3 className="text-f15 font-bold text-t1">Corrosion barriers</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                Tank and clarifier baffles, launder and trench covers, liners for bunds
                and splash zones — vinyl ester laminates in continuous chemical contact.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h3 className="text-f15 font-bold text-t1">Walking surfaces</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                Gritted sheet for tread-cover overlays and other anti-slip surfaces,
                including the{" "}
                <Link href="/products/frp-stair-treads" className="font-semibold text-teal-text hover:underline">
                  stair tread covers
                </Link>{" "}
                program. Load-bearing covers require separate support and capacity checks.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h3 className="text-f15 font-bold text-t1">Fabrication blanks</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                Cut blanks that shops machine into brackets, spacers, wear pads, and
                non-conductive panels — carbide or diamond tooling, the same shop rules
                as any pultruded stock.
              </p>
            </div>
          </div>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            This page covers solid flat stock. Shaped hollow and multi-cell sections now
            have a separate{" "}
            <Link href="/products/fiberglass-plates" className="font-semibold text-teal-text hover:underline">
              pultruded fiberglass plate profile catalog
            </Link>
            . Narrow solid rectangles with published sizes and per-meter weights remain in the{" "}
            <Link href="/products/fiberglass-structural-shapes/frp-flat-bar" className="font-semibold text-teal-text hover:underline">
              fiberglass flat-bar catalog
            </Link>{" "}
            (12×3 to 305×25 mm).
          </p>
        </div>
      </section>

      <RelatedLinks
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

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard prefill="I need solid pultruded fiberglass sheet: thickness [mm], finished part sizes and quantity, surface [smooth/gritted/embossed], service [chemical/electrical/liner/cover/fabricated blank], support/load if structural, resin preference [if any], destination [country/postcode]. What laminate and resin do you recommend, and what should the RFQ include?" />

      <InnerCTA title="Send the flat-sheet part sizes, surface and service duty." />
    </>
  );
}
