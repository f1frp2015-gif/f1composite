import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AskAICard from "@/components/ai/AskAICard";
import PageHeader from "@/components/layout/PageHeader";
import GratingClipGuide from "@/components/sections/GratingClipGuide";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import {
  moldedAdditionalMeshFamilies,
  moldedGratingManualImageAssets,
  moldedGratingSpecGroups,
} from "@/content/data/moldedGratingSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/molded-frp-grating";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const publishedAt = "2026-08-29";
const updatedAt = "2026-08-29";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/molded-frp-grating/opengraph-image",
});

const moldedAdvantages = [
  {
    label: "Load path",
    value: "Bidirectional molded reinforcement",
    detail: "Square-mesh panels can be oriented or field-cut without creating a single pultrusion load direction.",
  },
  {
    label: "Catalog depth range",
    value: "13–65 mm",
    detail: "Standard and high-depth rows are listed by mesh, bar thickness, panel format, nominal weight and open area.",
  },
  {
    label: "Catalog glass content",
    value: "30–35% by total weight",
    detail: "The supplied manual describes interlaced glass roving thermally cured in a resin-filled mold.",
  },
  {
    label: "Walking surfaces",
    value: "Square mesh · mini mesh · grit top",
    detail: "Select the opening and surface against drainage, heel resistance, slip, cleaning and project access rules.",
  },
];

const faqItems = [
  {
    question: "What is molded FRP grating?",
    answer:
      "Molded FRP grating is a one-piece panel made by placing continuous glass-fiber reinforcement in both directions of a mold and curing it in a resin matrix. That two-way architecture is the key difference from pultruded grating, whose bearing bars primarily carry load in one direction.",
  },
  {
    question: "Which molded grating mesh should I specify?",
    answer:
      "Use 38.1 × 38.1 mm or 40 × 40 mm square mesh for general industrial platforms; 50.8 × 50.8 mm or 83 × 83 mm when higher open area is important; and mini-mesh configurations when the top opening must be reduced for pedestrian access. The final choice must also satisfy the required load table, support spacing, drainage, slip resistance and local accessibility rules.",
  },
  {
    question: "Are the panel sizes and weights on this page certified design values?",
    answer:
      "They are nominal production-catalog values transcribed from the supplied molded-grating manual. Use them for product selection and logistics planning. The F1 quotation, approved panel-layout drawing and order-specific certified datasheet control final dimensions, tolerances, resin, surface, load capacity and delivered weight.",
  },
  {
    question: "Can molded fiberglass grating be cut around pipes and equipment?",
    answer:
      "Yes. Its bidirectional reinforcement makes molded grating well suited to field cutouts and irregular layouts. Every cut still needs adequate bearing and cut-edge support; seal exposed cut surfaces with a compatible resin and re-check the hold-down layout on the approved installation drawing.",
  },
  {
    question: "Which clips are used with molded FRP grating?",
    answer:
      "F1 uses M hold-down clips for compatible panel-to-support connections, C connectors between adjacent molded-panel edges, and J support-hook assemblies where the approved detail clamps around a support flange without drilling it. C clips do not replace structural support or each panel's independent hold-downs.",
  },
  {
    question: "Are molded grating clips available in 316 stainless steel?",
    answer:
      "Yes. The F1 M/C/J clip kits shown here are specified in 316 stainless steel. Clip geometry, bolt length, complete fastener assembly, quantity and spacing are selected against the panel depth, mesh, support flange and installation access, then issued on the approved project drawing.",
  },
  {
    question: "When should I choose pultruded instead of molded grating?",
    answer:
      "Choose pultruded FRP grating when the design is governed by longer one-way spans, higher stiffness in the bearing-bar direction, dedicated I-bar or T-bar series, or structural deck-panel options. Use the separate pultruded FRP grating page so its bearing-bar data and M/J/T clips are not mixed with molded mesh specifications.",
  },
];

export default function MoldedFrpGratingPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Molded FRP Grating",
          description: pageDescription,
          path: pagePath,
          image: moldedGratingManualImageAssets.hero,
          category: "Molded fiberglass reinforced plastic grating",
          productLine: "F1-GRID-M",
          schemaType: "CollectionPage",
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: {
            name: author.fullName,
            jobTitle: author.jobTitle,
            path: `/about/authors/${author.slug}`,
          },
          reviewedBy: {
            name: reviewer.fullName,
            jobTitle: reviewer.jobTitle,
            path: `/about/authors/${reviewer.slug}`,
          },
          material: ["Glass fiber", "Isophthalic polyester resin", "Vinyl ester resin"],
          additionalProperty: [
            { name: "Mesh families", value: "Square mesh, mini mesh, rectangular mesh, large-open mesh" },
            { name: "Catalog depth range", value: "13–65 mm" },
            { name: "Compatible F1 clips", value: "M, C and J clip kits in 316 stainless steel" },
          ],
        })}
      />

      <PageHeader
        tag="Molded Grating · F1-GRID-M"
        title="Molded FRP Grating Manufacturer — Square Mesh, Mini Mesh & 316SS Clips"
        description="Molded fiberglass grating in square mesh, mini mesh and rectangular mesh configurations — with manual-verified panel sizes, nominal weights, open area and matched M/C/J installation clips."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Molded FRP Grating" },
        ]}
      />

      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <figure>
            <div className="relative aspect-[83/54] w-full overflow-hidden rounded-[8px] bg-bg2">
              <Image
                src={moldedGratingManualImageAssets.hero}
                alt="Molded FRP grating installed as a corrosion-resistant coastal observation walkway"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                preload
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              Molded open-mesh grating used as an outdoor walking surface. Image isolated from the supplied product manual without catalog branding.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.05fr_0.95fr] lg:px-[34px]">
          <div>
            <SectionTag>Two-Way Molded Construction</SectionTag>
            <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
              Molded mesh for cutouts, corrosive duty and multidirectional layouts
            </h2>
            <p className="mt-[13px] text-f19 leading-golden text-t2">
              Molded fiberglass grating is cured as one panel with glass reinforcement running in both directions. It is the F1-GRID choice when the layout contains frequent penetrations, loads can approach from more than one direction, or the project needs resin-rich corrosion performance with a wide choice of square and mini meshes.
            </p>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              The supplied manual describes interlaced glass roving in a polyester-resin mold, thermally cured to a finished panel with 30–35% glass content by total weight. Its fire-retardant formulation is described as ASTM E84 Class 1 with a flame-spread index of 25 or less. Those are catalog construction references; the resin, fire report and batch documentation named in the F1 order govern the delivered product.
            </p>
          </div>

          <figure className="self-center">
            <div className="relative aspect-[123/46] overflow-hidden rounded-[8px] bg-bg2">
              <Image
                src={moldedGratingManualImageAssets.closeup}
                alt="Close-up of green molded fiberglass grating with square mesh and a bonded grit walking surface"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              Catalog close-up showing the molded square mesh and gritted anti-slip surface.
            </figcaption>
          </figure>
        </div>

        <div className="mx-auto mt-[34px] grid max-w-[1280px] gap-[13px] px-[20px] sm:grid-cols-2 sm:px-[28px] lg:grid-cols-4 lg:px-[34px]">
          {moldedAdvantages.map((item) => (
            <article key={item.label} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <p className="text-f11 font-bold uppercase tracking-[0.1em] text-teal-text">{item.label}</p>
              <h3 className="mt-[8px] text-f17 font-bold text-t1">{item.value}</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="molded-grating-specifications" className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Manual-Verified Specifications</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Molded grating mesh, depth, panel size, weight and open area
          </h2>
          <p className="mt-[13px] max-w-[980px] text-f15 leading-golden text-t2">
            The matrix below transcribes the principal square-mesh and mini-mesh production rows from the supplied molded-grating manual. Dimensions are millimeters; weight is nominal kg/m². Use these values to shortlist tooling, then obtain the F1 quotation, certified datasheet and approved panel-layout drawing for the project release.
          </p>

          <div className="mt-[34px] space-y-[13px]">
            {moldedGratingSpecGroups.map((group, index) => (
              <details
                key={group.mesh}
                open={index < 2}
                className="group rounded-[8px] border border-border-default bg-white"
              >
                <summary className="cursor-pointer list-none px-[21px] py-[16px] sm:px-[34px]">
                  <div className="flex items-center justify-between gap-[13px]">
                    <div>
                      <h3 className="text-f17 font-bold text-t1">{group.mesh}</h3>
                      {group.note && <p className="mt-[4px] text-f12 leading-golden text-t3">{group.note}</p>}
                    </div>
                    <span aria-hidden="true" className="text-f19 font-bold text-teal-text transition-transform group-open:rotate-45">+</span>
                  </div>
                </summary>
                <div className="border-t border-border-default px-[13px] pb-[21px] sm:px-[34px] sm:pb-[34px]">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[820px] border-collapse text-left">
                      <thead>
                        <tr className="border-b-2 border-border-default">
                          <th className="py-[13px] pr-[21px] text-f12 font-bold uppercase tracking-wide text-t1">Depth (mm)</th>
                          <th className="py-[13px] pr-[21px] text-f12 font-bold uppercase tracking-wide text-t1">Bar top / bottom (mm)</th>
                          <th className="py-[13px] pr-[21px] text-f12 font-bold uppercase tracking-wide text-t1">Standard panel sizes (mm)</th>
                          <th className="py-[13px] pr-[21px] text-f12 font-bold uppercase tracking-wide text-t1">Weight (kg/m²)</th>
                          <th className="py-[13px] text-f12 font-bold uppercase tracking-wide text-t1">Open area</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.rows.map((row) => (
                          <tr key={`${group.mesh}-${row.depth}-${row.barThickness}`} className="border-b border-border-default last:border-b-0">
                            <td className="py-[11px] pr-[21px] text-f14 font-semibold text-teal-text">{row.depth}</td>
                            <td className="py-[11px] pr-[21px] text-f14 text-t2">{row.barThickness}</td>
                            <td className="py-[11px] pr-[21px] text-f14 text-t2">{row.panelSizes}</td>
                            <td className="py-[11px] pr-[21px] text-f14 text-t2">{row.weight}</td>
                            <td className="py-[11px] text-f14 text-t2">{row.openArea}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-[34px] rounded-[8px] border border-border-default bg-white p-[21px] sm:p-[34px]">
            <h3 className="text-f17 font-bold text-t1">Additional catalog mesh families</h3>
            <p className="mt-[8px] text-f13 leading-golden text-t2">
              These additional molds appear in the supplied manual. Request the exact row and project load table before specifying.
            </p>
            <div className="mt-[16px] grid gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
              {moldedAdditionalMeshFamilies.map((item) => (
                <div key={item.mesh} className="rounded-[6px] border border-border-default bg-bg2 px-[13px] py-[10px]">
                  <p className="text-f13 font-semibold text-t1">{item.mesh}</p>
                  <p className="mt-[3px] text-f12 text-t3">Catalog depths: {item.depths}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionTag>Catalog Hardware Reference</SectionTag>
              <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Molded grating connectors and hold-down hardware
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                The catalog hardware photograph shows the wider grating-fastener family. For this molded-grating page, F1 publishes only the applicable M hold-down, C panel connector and J support-hook functions below. The photograph is a visual reference, not a promise that every pictured geometry is a stocked F1 SKU.
              </p>
            </div>
            <figure>
              <div className="relative aspect-[167/61] overflow-hidden rounded-[8px] border border-border-default bg-bg2">
                <Image
                  src={moldedGratingManualImageAssets.hardware}
                  alt="Reference layout of stainless-steel grating clip and clamp geometries"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
                Hardware-family photograph isolated from the supplied manual without supplier marks.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <GratingClipGuide family="molded" />

      <section className="bg-deep py-[55px] text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-[21px] px-[20px] sm:px-[28px] lg:flex-row lg:items-center lg:justify-between lg:px-[34px]">
          <div>
            <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal">Separate product family</p>
            <h2 className="mt-[8px] text-[clamp(22px,3vw,30px)] font-extrabold">Need longer one-way spans or I-bar / T-bar panels?</h2>
            <p className="mt-[8px] max-w-[760px] text-f14 leading-golden text-white/75">
              Pultruded grating now has its own page, specification table and M/J/T clip selection so its bearing-bar data is not mixed with molded mesh.
            </p>
          </div>
          <Link
            href="/products/frp-gratings"
            className="inline-flex min-h-[46px] items-center justify-center rounded-[7px] bg-teal-text px-[21px] py-[11px] text-f13 font-bold text-white transition-colors hover:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            View pultruded FRP grating
          </Link>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Related FRP products",
            links: [
              { href: "/products/frp-gratings", label: "Pultruded FRP grating" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
              { href: "/products/frp-stair-treads", label: "Molded grating stair treads" },
              { href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" },
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beam supports" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant platforms" },
              { href: "/industries/industrial", label: "Industrial & wastewater access" },
              { href: "/industries/marine", label: "Marine & coastal walkways" },
              { href: "/regions/frp-grating-supplier-saudi-arabia", label: "FRP grating supply for Saudi Arabia" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "#molded-grating-specifications", label: "Molded grating specification matrix" },
              { href: "#grating-clips", label: "M/C/J clips & 316SS hardware" },
              { href: "/technology/frp-vs-steel-gratings", label: "FRP grating vs steel" },
              { href: "/resources/design-guides", label: "Grating design guides" },
            ],
          },
        ]}
      />

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard
        prefill="I need molded FRP grating for [application]. Mesh/depth [mm], panel quantity or layout [details], clear support spacing [mm], design load [kN/m² or point load], resin/chemical exposure [details], surface [concave/fine grit/coarse grit], support flange and underside access [details]. Please confirm the catalog row, M/C/J 316SS clips, panel layout and required approval documents."
      />

      <InnerCTA title="Need molded FRP grating panels and matched 316SS clip kits?" />
    </>
  );
}
