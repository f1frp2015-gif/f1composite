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
import {
  fiberglassPlateSourceNote,
  fiberglassPlateSpecs,
  type FiberglassPlateSpec,
} from "@/content/data/fiberglassPlateSpecs";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/fiberglass-plates";
const pageTitle = "Pultruded FRP Plate Profiles — 19 Section Drawings";
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
      "On these F1 pages, plate refers to a shaped pultruded section with closed cavities, internal webs or formed edges. Sheet means solid flat laminate supplied cut to size. The distinction prevents a hollow profile drawing from being mistaken for ordinary flat stock.",
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

export default function FiberglassPlatesPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Pultruded Fiberglass Plate Profiles",
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
        tag="Drawing-Led Plate Profiles"
        title="Pultruded FRP Plate — 19 Hollow Profile References"
        description="Compare hollow, multi-cell and edge-formed fiberglass plate sections by drawing, A/B/t1/t2 source values and source ID. Final dimensions, material, tooling status and capacity are confirmed on the approved quotation drawing."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Fiberglass Plates" },
        ]}
      />

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.05fr_0.95fr] lg:px-[34px]">
          <div>
            <SectionTag>Plate, Sheet, or Deck?</SectionTag>
            <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
              A profile catalog—not a flat-sheet or deck-system claim
            </h2>
            <p className="mt-[13px] text-f19 leading-golden text-t2">
              These plates are constant-section pultrusions with cavities, internal webs
              and profile-specific edges. Select them from the section drawing first,
              then confirm the dimensions and laminate against the intended duty.
            </p>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              Need solid flat stock for liners, covers or fabricated blanks? Use the
              separate{" "}
              <Link href="/products/fiberglass-sheets" className="font-semibold text-teal-text hover:underline">
                fiberglass sheets page
              </Link>
              . Need an engineered walking or bridge surface? Start with{" "}
              <Link href="/products/frp-deck-panels" className="font-semibold text-teal-text hover:underline">
                structural FRP deck panels
              </Link>
              , where support, joint and load requirements control selection.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              Some hollow or multi-cell plate geometries may also be reviewed for use as{" "}
              <Link
                href="/products/frp-sound-barrier-wall"
                className="font-semibold text-teal-text hover:underline"
              >
                engineered FRP sound barrier wall panels
              </Link>
              . That use requires the joint, posts, laminate, loads, closures and any acoustic build-up
              to be checked together; a plate record alone does not establish an acoustic rating or span.
            </p>
          </div>

          <aside className="rounded-[8px] border border-teal-border bg-teal-bg p-[21px] sm:p-[34px]">
            <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">Source boundary</p>
            <h3 className="mt-[8px] text-f19 font-bold text-t1">Values are published exactly as supplied.</h3>
            <p className="mt-[8px] text-f13 leading-golden text-t2">{fiberglassPlateSourceNote}</p>
            <a
              href="#plate-profile-catalog"
              className="mt-[16px] inline-flex min-h-[44px] items-center justify-center rounded-[7px] bg-teal-text px-[18px] py-[10px] text-f13 font-bold text-white transition-colors hover:bg-teal"
            >
              Compare all 19 profiles
            </a>
          </aside>
        </div>
      </section>

      <section id="plate-profile-catalog" className="scroll-mt-[89px] bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Catalog Drawings</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            19 plate records across 15 schematic families
          </h2>
          <p className="mt-[13px] max-w-[980px] text-f15 leading-golden text-t2">
            Every catalog record is listed independently. Where the source merges one drawing
            across several rows, the shared schematic is shown once with each A/B/thickness/ID variant beneath it.
          </p>
          <p className="mt-[13px] max-w-[980px] rounded-[6px] border-l-[3px] border-teal bg-white px-[13px] py-[10px] text-f13 leading-golden text-t2">
            {fiberglassPlateSourceNote}
          </p>

          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            {drawingGroups.map((group) => (
              <article key={group.drawing} className="overflow-hidden rounded-[8px] border border-border-default bg-white">
                <div className="border-b border-border-default bg-white px-[13px] py-[21px]">
                  <Image
                    src={group.drawing}
                    alt={`${drawingLabel(group.profiles)} pultruded fiberglass plate section drawing`}
                    width={700}
                    height={240}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="p-[21px]">
                  <h3 className="text-f17 font-bold text-t1">{drawingLabel(group.profiles)}</h3>
                  {group.profiles[0].drawingGroup ? (
                    <p className="mt-[4px] text-f12 leading-golden text-t3">{group.profiles[0].drawingGroup}</p>
                  ) : null}
                  <div className="mt-[13px] overflow-x-auto">
                    <table className="w-full min-w-[510px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-border-default">
                          {[
                            "Profile",
                            "A",
                            "B",
                            "t1 / t2",
                            "Source ID",
                          ].map((heading) => (
                            <th key={heading} className="pb-[8px] pr-[13px] text-f11 font-bold uppercase tracking-wide text-t3 last:pr-0">
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {group.profiles.map((spec) => (
                          <tr key={spec.profile} className="border-b border-border-default last:border-0">
                            <td className="py-[10px] pr-[13px] text-f13 font-bold text-t1">{spec.profile.replace("Plate ", "")}</td>
                            <td className="py-[10px] pr-[13px] text-f13 text-t2">{spec.a}</td>
                            <td className="py-[10px] pr-[13px] text-f13 text-t2">{spec.b}</td>
                            <td className="py-[10px] pr-[13px] text-f13 text-t2">{spec.t1t2}</td>
                            <td className="py-[10px] text-f13 font-semibold text-teal-text">{spec.catalogId}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <SectionTag>Selection Workflow</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Four checks before a plate profile enters an RFQ
          </h2>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-4">
            {selectionChecks.map((item, index) => (
              <article key={item.title} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-teal text-f12 font-bold text-white">
                  {index + 1}
                </span>
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
            title: "Separate product families",
            links: [
              {
                href: "/products/frp-sound-barrier-wall",
                label: "FRP sound barrier wall panels — engineered assemblies",
              },
              { href: "/products/fiberglass-sheets", label: "Fiberglass sheets — solid flat stock" },
              { href: "/products/wind-turbine-blade-panels", label: "Wind turbine blade panels — GFRP, CFRP & hybrid" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
              { href: "/products/fiberglass-structural-shapes/frp-flat-bar", label: "Fiberglass flat bars" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
            ],
          },
          {
            title: "Specify & verify",
            links: [
              { href: "#plate-profile-catalog", label: "Plate profile drawings & source values" },
              { href: "/technology/pultrusion-resin-systems", label: "Resin system selection" },
              { href: "/technology/quality-testing", label: "Quality testing & order documentation" },
              { href: "/resources/downloads", label: "Downloads & CAD resources" },
            ],
          },
        ]}
      />

      <section className="bg-bg2 py-[55px] md:py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard prefill="I need a pultruded fiberglass plate profile for [application]. Candidate source ID [ID or unsure], section drawing [Plate 01–19], confirm A/B/t1/t2 units and tolerances, cut length and quantity [details], orientation/support spacing/load [details], resin/exposure/fire/finish [details], destination [country/postcode]. Please identify missing inputs and the drawing/engineering checks needed before quotation." />

      <InnerCTA title="Choose a plate drawing—then release the right laminate and dimensions." />
    </>
  );
}
