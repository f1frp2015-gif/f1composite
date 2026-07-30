import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import AskAICard from "@/components/ai/AskAICard";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pageTitle = "Fiberglass Sheets Manufacturer — Pultruded FRP Plate";
const pageDescription =
  "Fiberglass sheets manufacturer supplying pultruded FRP plate cut to size for panels, liners, covers and fabricated parts, with global project delivery.";
const pagePath = "/products/fiberglass-sheets";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

// Program ranges are typical and confirmed per order — this family has no
// published per-size weight catalog yet, so the page carries no weight table
// (data-integrity rule; the flat-bar catalog covers narrow solid sections).
const faqItems = [
  {
    question: "What thicknesses and sizes do fiberglass sheets come in?",
    answer:
      "The pultruded flat-sheet program typically runs 2–25 mm thick in panel widths up to about 1,000–1,220 mm, supplied cut to your part sizes rather than as fixed stock panels. Narrow solid sections up to 305×25 mm are a separate, catalogued product — see the fiberglass flat bar page with published sizes and weights. State the finished part dimensions and quantity in the RFQ; nesting and cutting are done in production.",
  },
  {
    question: "What is the difference between fiberglass sheet and FRP plate?",
    answer:
      "Commercially they are the same family: 'fiberglass sheet' usually means the thinner end (2–6 mm — liners, covers, kick panels), 'FRP plate' or 'structural plate' the thicker end (10–25 mm — gusset plates, base plates, wear pads). Both are E-glass laminates in a polyester or vinyl ester matrix; the thicker plates carry more multidirectional reinforcement so bolted connections load evenly.",
  },
  {
    question: "Can the sheets be supplied with an anti-slip surface?",
    answer:
      "Yes — the gritted variant bonds a silica or aluminum-oxide grit surface to one face, which is exactly the material used for our stair tread covers and solid-top walkway plate. Smooth (veiled) both faces is standard for liners, baffles, and electrical applications; embossed and pigmented options are available per order.",
  },
  {
    question: "What are typical applications for FRP flat sheet and plate?",
    answer:
      "Gusset and splice plates in FRP structures (bolted with the same 316 SS hardware as the profiles), tank and clarifier baffles, wear pads and bearing strips between FRP and steel, equipment covers and kick panels, trench and drain covers in gritted plate, and cut blanks that fabricators machine into brackets and spacers. In corrosive service it replaces coated steel plate; in electrical rooms it replaces conductive metal panels.",
  },
  {
    question: "Which resin should I choose for sheet and plate?",
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
          name: "Fiberglass Sheets & FRP Plate (Pultruded Flat Sheet)",
          description: pageDescription,
          path: pagePath,
          image: "/opengraph-image",
          category: "FRP Sheets & Plate",
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
        tag="Sheets & Plate · F1-FORM"
        title="Fiberglass sheets manufacturer — FRP plate cut to size"
        description="Flat fiberglass sheet from 2 mm liners to 25 mm structural plate — smooth, gritted anti-slip, or embossed — cut to your part sizes in E-glass with polyester, vinyl ester, or fire-retardant resin systems. The flat material behind gussets, baffles, wear pads, covers, and tread plates."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Fiberglass Sheets" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Where Flat Stock Fits</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Fiberglass sheets and FRP plate for four fabrication jobs
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
                Gusset, splice, and base plates for FRP frames — drilled and bolted with
                the same stainless hardware as the profiles, no galvanic pair against the
                laminate.
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
                Gritted plate for solid-top walkways, trench covers, and the{" "}
                <Link href="/products/frp-stair-treads" className="font-semibold text-teal-text hover:underline">
                  stair tread covers
                </Link>{" "}
                program — anti-slip where open grating is not wanted.
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
          <p className="mt-[21px] max-w-[860px] text-f15 leading-golden text-t2">
            Narrower solid rectangles with published sizes and per-meter weights are a
            catalog product of their own — see{" "}
            <Link href="/products/fiberglass-structural-shapes/frp-flat-bar" className="font-semibold text-teal-text hover:underline">
              fiberglass flat bars
            </Link>{" "}
            (12×3 to 305×25 mm). This page covers the wide-format sheet and plate program
            supplied cut to part size.
          </p>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Related flat & structural stock",
            links: [
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
              { href: "/resources/ddp-tariff-hs-code-guide", label: "DDP, tariffs & HS codes" },
            ],
          },
        ]}
      />

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard prefill="I need FRP flat sheet/plate: thickness [mm], part sizes and quantity, surface [smooth/gritted/embossed], service [chemical/electrical/walkway], resin preference if any. What laminate and resin do you recommend, and what should the RFQ include?" />

      <InnerCTA title="Send part sizes and duty — sheet quote in 24 hours." />
    </>
  );
}
