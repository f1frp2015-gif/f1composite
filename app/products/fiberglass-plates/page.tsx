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
import {
  fiberglassPlateSourceNote,
  fiberglassPlateSpecs,
  type FiberglassPlateSpec,
} from "@/content/data/fiberglassPlateSpecs";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/fiberglass-plates";
const pageTitle = "Hollow & Multi-cell FRP Profiles | Section Drawings";
const pageDescription =
  "Compare 19 pultruded fiberglass plate profiles with hollow and multi-cell section drawings, nominal A/B/t1/t2 source values and source IDs.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-plates/opengraph-image",
});

const drawingGroups = fiberglassPlateSpecs.reduce<Array<{
  drawing: string;
  profiles: FiberglassPlateSpec[];
}>>((groups, spec) => {
  const existing = groups.find((group) => group.drawing === spec.drawing);
  if (existing) existing.profiles.push(spec);
  else groups.push({ drawing: spec.drawing, profiles: [spec] });
  return groups;
}, []);

const selectionChecks = [
  {
    title: "Match the section drawing",
    body: "Start with the cavity, return and edge geometry. Similar A/B values do not make two profiles interchangeable.",
  },
  {
    title: "Confirm every dimension",
    body: "The supplied table does not show a unit, tolerance or dimension definition. Confirm A, B and t1/t2 on the quotation drawing.",
  },
  {
    title: "State the actual duty",
    body: "Provide orientation, support spacing, loads, connection points, environment, fire requirement, finish and cut length.",
  },
  {
    title: "Release an approved profile",
    body: "Tooling status, laminate, resin, capacity and acceptance criteria are order-specific and must be fixed before production.",
  },
] as const;

const faqItems = [
  {
    question: "What is the difference between a fiberglass plate and a fiberglass sheet?",
    answer:
      "This catalog contains hollow, multi-cell and edge-formed pultruded profiles. The legacy Plate labels identify source drawings; they do not mean solid flat stock. For solid flat laminate, use the fiberglass sheets page. Specify the actual cross-section rather than relying on the word plate.",
  },
  {
    question: "How is this plate catalog different from the structural FRP deck-panel page?",
    answer:
      "This page is a geometry-led catalog of 19 plate profile references. The deck-panel page is application-led and treats a closed profile as part of a deck system with support, joint, connection and load requirements. A plate profile is not automatically approved as a walking or bridge deck.",
  },
  {
    question: "What do A, B and t1/t2 mean in the table?",
    answer:
      "They are the dimension labels shown on the supplied section drawings. Because the visible source does not state the unit, tolerance or formal dimension definitions, the values are reproduced without an inferred unit. The approved quotation drawing must define them.",
  },
  {
    question: "Why do Plates 07–09 and Plates 15–17 share drawings?",
    answer:
      "The source table uses one merged schematic cell for each of those groups while listing separate A, B, thickness and catalog-ID records. They remain separate products in the data table and share only the source schematic.",
  },
  {
    question: "Do the source IDs guarantee stocked tooling?",
    answer:
      "No stock, ownership or production-availability claim is made from the source table alone. Use the ID as a quotation reference; F1 confirms tooling status, minimum order, resin system, finish and lead time before accepting an order.",
  },
  {
    question: "Do the section drawings provide span or load capacity?",
    answer:
      "No. Section geometry and nominal thickness values do not establish structural capacity. Send the load case, span, support and deflection criteria so the selected laminate and profile can be checked for the project.",
  },
];

function drawingLabel(profiles: readonly FiberglassPlateSpec[]) {
  if (profiles.length === 1) return profiles[0].profile;
  return `${profiles[0].profile}–${profiles.at(-1)?.profile.replace("Plate ", "")}`;
}

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export default function FiberglassPlatesPage() {
  const quoteHref = buildRfqHref({ source: "plate-product-header", product: "Hollow & multi-cell fiberglass profile", productPath: pagePath });
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Hollow & Multi-cell Fiberglass Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/fiberglass-plates/plate-01.webp",
          category: "Hollow and multi-cell pultruded FRP plate profiles",
          productLine: "Drawing-led quotation program",
          schemaType: "CollectionPage",
          material: ["Glass fiber reinforced polymer"],
          additionalProperty: [
            { name: "Profile references", value: "19 catalog records" },
            { name: "Schematic families", value: "15 source drawings" },
            { name: "Published fields", value: "A, B, t1/t2 and source ID as supplied" },
            { name: "Release basis", value: "Approved quotation drawing and order-specific material specification" },
          ],
        })}
      />

      <PageHeader
        tag="Hollow & multi-cell"
        line={{ name: "F1-STRUX", label: "Hollow & multi-cell" }}
        title="Hollow & multi-cell fiberglass profiles"
        description="Compare hollow, multi-cell and edge-formed fiberglass plate sections by drawing, A/B/t1/t2 source values and source ID. Final dimensions, material, tooling status and capacity are confirmed on the approved quotation drawing."
        facts={[
          { label: "Profile records", value: String(fiberglassPlateSpecs.length) },
          { label: "Section drawings", value: String(drawingGroups.length) },
          { label: "Published values", value: "A, B, t1/t2" },
          { label: "Release", value: "Approved drawing" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: { label: `Compare all ${fiberglassPlateSpecs.length} profiles`, href: "#plate-profile-catalog", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title={drawingLabel(drawingGroups[0].profiles)} note="Source drawing" caption="Dimension labels as on the supplied drawing; the quotation drawing defines units and tolerances.">
            <Image
              src={drawingGroups[0].drawing}
              alt={`${drawingLabel(drawingGroups[0].profiles)} pultruded fiberglass plate section drawing`}
              width={700}
              height={240}
              sizes="(max-width: 1023px) 90vw, 42vw"
              className="h-auto w-full bg-white object-contain"
              preload
            />
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Fiberglass Plates" },
        ]}
      />

      <PageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "plate-profile-catalog", label: "Profiles", count: fiberglassPlateSpecs.length },
          { id: "selection", label: "Selection" },
          { id: "faq", label: "FAQ" },
          { id: "related", label: "Related" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="overview" title="Plate, sheet or deck?">
        <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[48px]">
          <div className="space-y-[14px] text-f16 leading-golden text-t2">
            <p className="text-f18 text-t1">
              These plates are constant-section pultrusions with cavities, internal webs and profile-specific edges. Select them from the section drawing first, then confirm the dimensions and laminate against the intended duty.
            </p>
            <p>
              Need solid flat stock for liners, covers or fabricated blanks? Use the separate{" "}
              <Link href="/products/fiberglass-sheets" className={link}>
                fiberglass sheets page
              </Link>
              . Need an engineered walking or bridge surface? Start with{" "}
              <Link href="/products/frp-deck-panels" className={link}>
                structural FRP deck panels
              </Link>
              , where support, joint and load requirements control selection.
            </p>
            <p>
              Some hollow or multi-cell plate geometries may also be reviewed for use as{" "}
              <Link href="/products/frp-sound-barrier-wall" className={link}>
                engineered FRP sound barrier wall panels
              </Link>
              . That use requires the joint, posts, laminate, loads, closures and any acoustic build-up to be checked together; a plate record alone does not establish an acoustic rating or span.
            </p>
          </div>
          <aside className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Source boundary</p>
            <h3 className="mt-[8px] text-f18 font-bold text-t1">Values are published exactly as supplied.</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">{fiberglassPlateSourceNote}</p>
          </aside>
        </div>
      </PageSection>

      <PageSection
        id="plate-profile-catalog"
        title={`${fiberglassPlateSpecs.length} plate records across ${drawingGroups.length} schematic families`}
        tone="muted"
        intro="Every catalog record is listed independently. Where the source merges one drawing across several rows, the shared schematic is shown once with each A/B/thickness/ID variant beneath it."
      >
        <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-2">
          {drawingGroups.map((group) => (
            <article key={group.drawing} className="overflow-hidden rounded-card border border-border-default bg-white">
              <div className="border-b border-border-default px-[14px] py-[8px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">
                <span className="font-sans text-f14 font-semibold normal-case tracking-normal text-t1">{drawingLabel(group.profiles)}</span>
                {group.profiles[0].drawingGroup ? <span className="ml-[8px]">{group.profiles[0].drawingGroup}</span> : null}
              </div>
              <div className="px-[14px] py-[18px]">
                <Image
                  src={group.drawing}
                  alt={`${drawingLabel(group.profiles)} pultruded fiberglass plate section drawing`}
                  width={700}
                  height={240}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="relative overflow-x-auto border-t border-border-default">
                <table className="spec-table w-full min-w-[440px] border-collapse text-left text-f14">
                  <thead>
                    <tr className="border-b border-border-default bg-bg2">
                      {["Profile", "A", "B", "t1 / t2", "Source ID"].map((heading) => (
                        <th key={heading} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {group.profiles.map((spec) => (
                      <tr key={spec.profile} className="border-b border-border-default last:border-b-0">
                        <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{spec.profile}</th>
                        <td className="px-[14px] py-[10px] text-t2">{spec.a}</td>
                        <td className="px-[14px] py-[10px] text-t2">{spec.b}</td>
                        <td className="px-[14px] py-[10px] text-t2">{spec.t1t2}</td>
                        <td className="px-[14px] py-[10px] font-semibold text-t1">{spec.catalogId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="selection" title="Four checks before a plate profile enters an RFQ">
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
            title: "Separate product families",
            links: [
              { href: "/products/frp-sound-barrier-wall", label: "FRP sound barrier wall panels" },
              { href: "/products/fiberglass-sheets", label: "Fiberglass sheets, solid flat stock" },
              { href: "/products/wind-turbine-blade-panels", label: "Wind turbine blade panels" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
              { href: "/products/fiberglass-structural-shapes/frp-flat-bar", label: "Fiberglass flat bars" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
            ],
          },
          {
            title: "Specify & verify",
            links: [
              { href: "/technology/pultrusion-resin-systems", label: "Resin system selection" },
              { href: "/technology/quality-testing", label: "Quality testing & order documentation" },
              { href: "/resources/downloads", label: "Downloads & CAD resources" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Quote a plate profile" tone="deep">
        <ProductRfq
          product="hollow and multi-cell fiberglass profiles"
          productPath={pagePath}
          quoteHref={quoteHref}
          intro="Send the source ID or drawing, the cut length and quantity, the duty and the destination."
          advisorPrompt="I need a pultruded fiberglass plate profile for [application]. Candidate source ID [ID or unsure], section drawing [Plate 01–19], confirm A/B/t1/t2 units and tolerances, cut length and quantity [details], orientation/support spacing/load [details], resin/exposure/fire/finish [details], destination [country/postcode]. Please identify missing inputs and the drawing/engineering checks needed before quotation."
        />
      </PageSection>
    </>
  );
}
