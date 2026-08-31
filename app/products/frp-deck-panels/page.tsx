import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AskAICard from "@/components/ai/AskAICard";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import { frpDeckPanelSourceNote, frpDeckPanelSpecs } from "@/content/data/frpDeckPanelSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/frp-deck-panels";
const seoTarget = getSeoQueryTarget(pagePath);
const publishedAt = "2026-08-30";
const updatedAt = "2026-08-30";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: "/products/frp-deck-panels/opengraph-image",
});

const selectionChecks = [
  {
    title: "Confirm drawing units",
    body: "The source sheet does not state a unit. Confirm the unit for A, B and t1/t2 before using any value in an RFQ, model or approval drawing.",
  },
  {
    title: "Select the joint geometry",
    body: "Profiles with matching A/B/t values can still have different edge returns, cavities and interlocks. Choose from the section image, not dimensions alone.",
  },
  {
    title: "Define the structural duty",
    body: "Provide span, support width, uniform and patch loads, load footprint, deflection limit, vibration and any fatigue requirement. The section sheet is not a load table.",
  },
  {
    title: "Issue an approved section",
    body: "Resin, reinforcement, surface, tolerance, fire, slip, connection and capacity must be stated on the project-approved F1 drawing and order datasheet.",
  },
] as const;

const faqItems = [
  {
    question: "What is the difference between an FRP deck panel and pultruded FRP grating?",
    answer:
      "A deck panel is a closed-surface or closed-profile section with internal webs and project-specific edge geometry. Pultruded grating is an open-drainage panel assembled from one-way I-bar or T-bar bearing members and cross-rods. Their dimensions, joints, connections and design checks are different, so F1 now documents them on separate product pages.",
  },
  {
    question: "What do A, B and t1/t2 mean on the deck section cards?",
    answer:
      "They are the dimension labels used by the supplied source drawing. The source does not define their engineering meaning or measurement unit. F1 therefore reproduces the nominal values without assigning a unit or interpretation; the approved project drawing must define every dimension.",
  },
  {
    question: "Why are Profiles 09, 11 and 12 kept separate when their values match?",
    answer:
      "All three show A 450, B 40 and t1/t2 2.8/4, but their edge and joint geometries are different. They cannot be merged or substituted based on the numeric columns alone.",
  },
  {
    question: "Are these 12 deck profiles stocked F1 SKUs?",
    answer:
      "No stock or tooling claim is made by this page. Profile 01–12 are neutral public references derived from the supplied section sheet after removing its internal IDs. F1 confirms tooling status, minimum order, material system and production availability during quotation.",
  },
  {
    question: "Do these section drawings provide span or load capacity?",
    answer:
      "No. The source sheet provides only the section image and A/B/t1/t2 values. A project needs a separate load/deflection table or engineering calculation tied to the selected material, reinforcement, support condition and load footprint.",
  },
  {
    question: "Can structural FRP deck panels be used on pedestrian bridges?",
    answer:
      "They can be evaluated for pedestrian bridges, access decks and replacement-deck systems, but the product section alone does not establish suitability. The bridge engineer must check the governing loads, deflection, vibration, joint load transfer, anti-slip surface, drainage, fire requirements and support connections.",
  },
  {
    question: "Are the deck panels waterproof?",
    answer:
      "This page does not claim a waterproof assembly. A closed top reduces through-openings, but water tightness depends on panel joints, end closures, penetrations, sealants, slope, drainage and tested assembly details.",
  },
];

export default function FrpDeckPanelsPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Structural FRP Deck Panels",
          description: seoTarget.description,
          path: pagePath,
          image: "/images/products/frp-structural-deck-panel-hero.webp",
          category: "Structural fiberglass deck panels and closed-profile decking",
          productLine: "F1-GRID-P",
          schemaType: "CollectionPage",
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: { name: author.fullName, jobTitle: author.jobTitle, path: `/about/authors/${author.slug}` },
          reviewedBy: { name: reviewer.fullName, jobTitle: reviewer.jobTitle, path: `/about/authors/${reviewer.slug}` },
          material: ["Glass fiber reinforced polymer"],
          additionalProperty: [
            { name: "Cross-section families", value: "12 neutral profile references" },
            { name: "Published fields", value: "A, B and t1/t2 nominal source values" },
            { name: "Release basis", value: "Approved project drawing and order-specific engineering data" },
          ],
        })}
      />

      <PageHeader
        tag="Structural Deck Panels · F1-GRID-P"
        title="Structural FRP Deck Panels — 12 Cross-Section Families"
        description="Closed-profile fiberglass deck panels separated from open pultruded grating — compare 12 neutral section drawings, nominal A/B/t1/t2 values, joint geometry and project-release requirements."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Structural FRP Deck Panels" },
        ]}
      />

      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <figure>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[8px] bg-bg2">
              <Image
                src="/images/products/frp-structural-deck-panel-hero.webp"
                alt="Concept rendering of a closed structural FRP deck panel with internal webs and an interlocking edge"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                preload
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              Concept rendering of a closed-profile deck panel. Final section, material, color and joint geometry follow the approved project drawing.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.05fr_0.95fr] lg:px-[34px]">
          <div>
            <SectionTag>Closed-Profile Decking</SectionTag>
            <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
              Deck sections are not open-mesh grating
            </h2>
            <p className="mt-[13px] text-f19 leading-golden text-t2">
              Structural FRP deck panels use a continuous top surface, repeated underside webs and profile-specific edge geometry. They are evaluated as a deck system with support, joint and connection requirements — not as an I-bar or T-bar grating panel.
            </p>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              The attached source sheet shows 12 variants. F1 has removed the source logo and internal identifiers and publishes only neutral Profile 01–12 references, the section images and the stated A/B/t1/t2 values. No tolerance, unit, material, load, span, fire or waterproofing claim is inferred.
            </p>
          </div>

          <aside className="rounded-[8px] border border-teal-border bg-teal-bg p-[21px] sm:p-[34px]">
            <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">Need open drainage?</p>
            <h3 className="mt-[8px] text-f19 font-bold text-t1">Use the separate pultruded FRP grating page.</h3>
            <p className="mt-[8px] text-f13 leading-golden text-t2">
              It now contains the manual-derived T-bar, I-bar, high-load and high-open specification tables plus M/J/T hold-downs.
            </p>
            <Link
              href="/products/frp-gratings"
              className="mt-[16px] inline-flex min-h-[44px] items-center justify-center rounded-[7px] bg-teal-text px-[18px] py-[10px] text-f13 font-bold text-white transition-colors hover:bg-teal"
            >
              View pultruded FRP grating
            </Link>
          </aside>
        </div>
      </section>

      <section id="deck-panel-specifications" className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Nominal Section References</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Twelve deck profile drawings and A/B/t1/t2 values
          </h2>
          <p className="mt-[13px] max-w-[980px] text-f15 leading-golden text-t2">
            Profiles are kept separate even when their numeric values match because the joint and edge geometry differs. The source did not state a unit, so the values below are intentionally unitless until confirmed on an approved drawing.
          </p>
          <p className="mt-[13px] max-w-[980px] rounded-[6px] border-l-[3px] border-teal bg-white px-[13px] py-[10px] text-f13 leading-golden text-t2">
            {frpDeckPanelSourceNote}
          </p>

          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 xl:grid-cols-3">
            {frpDeckPanelSpecs.map((spec) => (
              <article key={spec.profile} className="overflow-hidden rounded-[8px] border border-border-default bg-white">
                <div className="border-b border-border-default bg-white p-[13px]">
                  <Image
                    src={spec.drawing}
                    alt={`${spec.profile} structural FRP deck panel section drawing`}
                    width={350}
                    height={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="p-[21px]">
                  <h3 className="text-f17 font-bold text-t1">{spec.profile}</h3>
                  <dl className="mt-[13px] grid grid-cols-3 gap-[8px]">
                    <div className="rounded-[6px] bg-bg2 p-[10px]">
                      <dt className="text-f11 font-bold uppercase tracking-wide text-t3">A</dt>
                      <dd className="mt-[3px] text-f14 font-semibold text-t1">{spec.a}</dd>
                    </div>
                    <div className="rounded-[6px] bg-bg2 p-[10px]">
                      <dt className="text-f11 font-bold uppercase tracking-wide text-t3">B</dt>
                      <dd className="mt-[3px] text-f14 font-semibold text-t1">{spec.b}</dd>
                    </div>
                    <div className="rounded-[6px] bg-bg2 p-[10px]">
                      <dt className="text-f11 font-bold uppercase tracking-wide text-t3">t1 / t2</dt>
                      <dd className="mt-[3px] text-f13 font-semibold text-t1">{spec.t1t2}</dd>
                    </div>
                  </dl>
                  <p className="mt-[13px] text-f12 leading-golden text-t3">{spec.geometryNote}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Project Release Checks</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Four checks before selecting a deck section
          </h2>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-4">
            {selectionChecks.map((item, index) => (
              <article key={item.title} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-teal text-f12 font-bold text-white">{index + 1}</span>
                <h3 className="mt-[13px] text-f17 font-bold text-t1">{item.title}</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Related FRP products",
            links: [
              { href: "/products/frp-gratings", label: "Pultruded FRP grating — open I-bar & T-bar panels" },
              { href: "/products/molded-frp-grating", label: "Molded FRP grating — square & mini mesh" },
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beam deck supports" },
              { href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" },
            ],
          },
          {
            title: "Deck applications",
            links: [
              { href: "/applications/frp-bridge-deck-panels", label: "FRP bridge deck panels" },
              { href: "/applications/frp-pedestrian-bridge-superstructures", label: "Pedestrian bridge superstructures" },
              { href: "/industries/infrastructure", label: "Infrastructure applications" },
              { href: "/case-studies/beam-bridge", label: "Beam bridge design & verified case studies" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "#deck-panel-specifications", label: "Deck cross-section references" },
              { href: "/resources/design-guides", label: "FRP design guides" },
              { href: "/resources/technical-data", label: "Technical data & submittals" },
              { href: "/technology/quality-testing", label: "Quality testing & project documentation" },
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
        prefill="I need structural FRP deck panels for [application]. Candidate Profile [01-12 or unsure], confirm drawing unit [required], clear support spacing [value/unit], deck width and length [value/unit], uniform/point/wheel loads [details], load footprint [details], deflection/vibration criteria [details], resin/exposure/surface/fire requirements [details], and preferred joint/connection. Please identify missing inputs and the approval drawing/calculation package required."
      />

      <InnerCTA title="Need an FRP deck section and project-specific approval drawing?" />
    </>
  );
}
