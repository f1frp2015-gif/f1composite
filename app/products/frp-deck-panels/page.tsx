import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { frpDeckPanelSourceNote, frpDeckPanelSpecs } from "@/content/data/frpDeckPanelSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";
import { buildRfqHref } from "@/lib/rfq";
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

// What a deck request needs; the section sheet carries no load data.
const requestItems = [
  { title: "Profile and drawing unit", text: "The candidate Profile 01–12, or the joint you need, with the unit for A, B and t1/t2 confirmed." },
  { title: "Spans and loads", text: "Clear support spacing, deck width and length, uniform, point and wheel loads, the load footprint and the deflection or vibration limit." },
  { title: "Exposure and surface", text: "Resin, outdoor or chemical exposure, anti-slip surface, fire requirement and colour." },
  { title: "Connections and delivery", text: "Hold-downs and support connections, the approval drawing or calculation package needed, quantity and destination." },
];

export default function FrpDeckPanelsPage() {
  const quoteHref = buildRfqHref({ source: "deck-product-header", product: "Structural FRP deck panels", productPath: pagePath });
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Structural FRP Deck Panels",
          description: seoTarget.description,
          path: pagePath,
          image: "/images/products/frp-structural-deck-panel-hero.webp",
          category: "Structural fiberglass deck panels and closed-profile decking",
          productLine: "F1-STRUX",
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
        updated={updatedAt}
        reviewer={{ name: reviewer.name, title: reviewer.jobTitle.replace(/ for .*$/, ""), href: `/about/authors/${reviewer.slug}` }}
        tag="Deck panels"
        line={{ name: "F1-STRUX", label: "Deck panels" }}
        title="Structural FRP Deck Panels — 12 Cross-Section Families"
        description="Closed-profile fiberglass deck panels separated from open pultruded grating — compare 12 neutral section drawings, nominal A/B/t1/t2 values, joint geometry and project-release requirements."
        facts={[
          { label: "Section families", value: String(frpDeckPanelSpecs.length) },
          { label: "Published values", value: "A, B, t1/t2" },
          { label: "Top surface", value: "Closed" },
          { label: "Release", value: "Approved drawing" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: { label: "Compare the sections", href: "#deck-panel-specifications", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Closed-profile deck panel" note="Rendering" caption="Final section, material, color and joint geometry follow the approved project drawing." bleed>
            <div className="relative aspect-[21/9]">
              <Image
                src="/images/products/frp-structural-deck-panel-hero.webp"
                alt="Concept rendering of a closed structural FRP deck panel with internal webs and an interlocking edge"
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
          { label: "Structural FRP Deck Panels" },
        ]}
      />

      <PageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "deck-panel-specifications", label: "Sections", count: frpDeckPanelSpecs.length },
          { id: "release", label: "Release checks" },
          { id: "faq", label: "FAQ" },
          { id: "related", label: "Related" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="overview" title="Deck sections are not open-mesh grating">
        <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-golden text-t2">
            <p className="text-f18 text-t1">
              Structural FRP deck panels use a continuous top surface, repeated underside webs and profile-specific edge geometry. They are evaluated as a deck system with support, joint and connection requirements — not as an I-bar or T-bar grating panel.
            </p>
            <p>
              The attached source sheet shows 12 variants. F1 has removed the source logo and internal identifiers and publishes only neutral Profile 01–12 references, the section images and the stated A/B/t1/t2 values. No tolerance, unit, material, load, span, fire or waterproofing claim is inferred.
            </p>
          </div>
          <aside className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Need open drainage?</p>
            <h3 className="mt-[8px] text-f18 font-bold text-t1">Use the separate pultruded FRP grating page.</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              It contains the manual-derived T-bar, I-bar, high-load and high-open specification tables plus M/J/T hold-downs.
            </p>
            <Link href="/products/frp-gratings" className="mt-[14px] inline-flex text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
              View pultruded FRP grating
            </Link>
          </aside>
        </div>
      </PageSection>

      <PageSection
        id="deck-panel-specifications"
        title="Twelve deck profile drawings and A/B/t1/t2 values"
        tone="muted"
        intro="Profiles are kept separate even when their numeric values match because the joint and edge geometry differs. The source did not state a unit, so the values below are intentionally unitless until confirmed on an approved drawing."
      >
        <p className="max-w-[900px] rounded-card border border-border-default bg-white px-[16px] py-[12px] text-f14 leading-golden text-t2">
          <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Source note </span>
          {frpDeckPanelSourceNote}
        </p>
        <div className="mt-[20px] grid grid-cols-1 gap-[16px] md:grid-cols-2 xl:grid-cols-3">
          {frpDeckPanelSpecs.map((spec) => (
            <article key={spec.profile} className="overflow-hidden rounded-card border border-border-default bg-white">
              <h3 className="border-b border-border-default px-[14px] py-[8px] text-f14 font-semibold text-t1">{spec.profile}</h3>
              <div className="px-[14px] py-[16px]">
                <Image
                  src={spec.drawing}
                  alt={`${spec.profile} structural FRP deck panel section drawing`}
                  width={350}
                  height={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="h-auto w-full object-contain"
                />
              </div>
              <dl className="grid grid-cols-3 gap-px border-t border-border-default bg-border-default">
                {[
                  ["A", spec.a],
                  ["B", spec.b],
                  ["t1 / t2", spec.t1t2],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white px-[14px] py-[10px]">
                    <dt className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{label}</dt>
                    <dd className="mt-[2px] text-f16 font-semibold text-t1">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-border-default px-[14px] py-[10px] text-f12 leading-golden text-t3">{spec.geometryNote}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="release" title="Four checks before selecting a deck section">
        <ol className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {selectionChecks.map((item, index) => (
            <li key={item.title} className="rounded-card border border-border-default bg-white p-[20px]">
              <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Check {index + 1}</span>
              <h3 className="mt-[4px] text-f16 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="faq" title="Questions buyers ask" tone="muted">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related FRP products",
            links: [
              { href: "/products/frp-gratings", label: "Pultruded FRP grating, open I-bar & T-bar panels" },
              { href: "/products/molded-frp-grating", label: "Molded FRP grating, square & mini mesh" },
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beam deck supports" },
              { href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" },
              { href: "/products/fiberglass-plates", label: "Pultruded FRP plate profiles" },
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
              { href: "/resources/design-guides", label: "FRP design guides" },
              { href: "/resources/technical-data", label: "Technical data & submittals" },
              { href: "/technology/quality-testing", label: "Quality testing & project documentation" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Quote structural deck panels" tone="deep">
        <ProductRfq
          product="structural FRP deck panels"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={requestItems}
          intro="Send the candidate profile, the spans and loads, the exposure and the destination."
          advisorPrompt="I need structural FRP deck panels for [application]. Candidate Profile [01-12 or unsure], confirm drawing unit [required], clear support spacing [value/unit], deck width and length [value/unit], uniform/point/wheel loads [details], load footprint [details], deflection/vibration criteria [details], resin/exposure/surface/fire requirements [details], and preferred joint/connection. Please identify missing inputs and the approval drawing/calculation package required."
        />
      </PageSection>
    </>
  );
}
