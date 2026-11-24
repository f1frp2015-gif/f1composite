import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import KeyFacts from "@/components/sections/KeyFacts";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ProductRfq from "@/components/products/ProductRfq";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import Figure from "@/components/ui/Figure";
import JsonLd from "@/components/seo/JsonLd";
import { moldedAdditionalMeshSpecGroups } from "@/content/data/moldedGratingAdditionalSpecs";
import { moldedGratingSpecGroups } from "@/content/data/moldedGratingSpecs";
import { pultrudedGratingManualImages, pultrudedGratingSpecGroups } from "@/content/data/pultrudedGratingSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/ada-frp-grating";
const seoTarget = getSeoQueryTarget(pagePath);
const LAST_UPDATED = "2026-11-24";
const adaSource = "https://www.access-board.gov/ada/#ada-302_3";

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const cell = "px-[12px] py-[10px] align-top";

// Small-opening rows taken unchanged from the molded and pultruded spec tables.
const SMALL_MESH = ["13 × 13 / 40 × 40 mm mini mesh", "19.05 × 19.05 / 38.1 × 38.1 mm mini mesh"];
const moldedRows = [...moldedGratingSpecGroups, ...moldedAdditionalMeshSpecGroups]
  .filter((group) => SMALL_MESH.includes(group.mesh))
  .sort((a, b) => SMALL_MESH.indexOf(a.mesh) - SMALL_MESH.indexOf(b.mesh))
  .flatMap((group) => group.rows.map((row) => ({ family: "Molded", series: group.mesh, depth: row.depth, openArea: row.openArea, weight: row.weight, note: group.mesh.startsWith("13 ×") ? "13 mm nominal top mesh: measure the clear opening" : "Top mesh above 13 mm: heel-resistant, check against the ADA limit" })));
const pultrudedRows = pultrudedGratingSpecGroups
  .flatMap((group) => group.rows)
  .filter((row) => row.type.startsWith("T-") && Number.parseFloat(row.openArea) <= 18)
  .map((row) => ({ family: "Pultruded", series: `${row.type} T-bar`, depth: row.depth, openArea: row.openArea, weight: row.weight, note: `Bars at ${row.bearingBarCenter} mm centers: confirm the gap between T tops` }));
const candidates = [...moldedRows, ...pultrudedRows];

function OpeningRuleFigure() {
  return (
    <svg viewBox="0 0 480 260" className="h-auto w-full" role="img" aria-labelledby="ada-fig-title ada-fig-desc">
      <title id="ada-fig-title">ADA opening rule for floor grating</title>
      <desc id="ada-fig-desc">Plan view of a grating with elongated openings running across the direction of travel, and a half-inch (13 mm) sphere that must not pass through any opening. Not to scale.</desc>
      <rect x="0" y="0" width="480" height="260" fill="#f8fafc" />
      {Array.from({ length: 9 }, (_, index) => (
        <rect key={index} x="40" y={30 + index * 22} width="300" height="12" rx="2" fill="#0f8a83" opacity="0.85" />
      ))}
      {[90, 190, 290].map((x) => <rect key={x} x={x} y="30" width="6" height="188" fill="#334155" opacity="0.5" />)}
      <circle cx="402" cy="96" r="14" fill="#f59e0b" stroke="#334155" strokeWidth="2" />
      <text x="402" y="128" textAnchor="middle" fontSize="12" fill="#334155">½ in (13 mm)</text>
      <text x="402" y="144" textAnchor="middle" fontSize="12" fill="#334155">sphere must</text>
      <text x="402" y="160" textAnchor="middle" fontSize="12" fill="#334155">not pass</text>
      <path d="M190 238 v-14 m0 0 l-6 7 m6 -7 l6 7" stroke="#334155" strokeWidth="2" fill="none" />
      <text x="190" y="254" textAnchor="middle" fontSize="12" fill="#334155">direction of travel</text>
      <text x="40" y="20" fontSize="12" fill="#334155">long side of each opening runs across the route</text>
    </svg>
  );
}

const faqItems = [
  {
    question: "What does the ADA require for grating openings?",
    answer: "Section 302.3 of the 2010 ADA Standards says openings in floor or ground surfaces must not let a sphere more than ½ in (13 mm) in diameter pass, and elongated openings must run with their long dimension perpendicular to the dominant direction of travel. It applies to surfaces on an accessible route.",
  },
  {
    question: "Is fiberglass grating ADA compliant?",
    answer: "A grating panel can satisfy the opening rule when its clear opening at the walking surface is no more than ½ in and it is laid in the right direction. Compliance is a property of the installed route, so measure the opening of the offered panel and check the orientation on the layout drawing; a mesh name alone is not proof.",
  },
  {
    question: "Which F1 grating has the smallest openings?",
    answer: "The molded 13 × 13 / 40 × 40 mm mini mesh, in 22, 30 and 40 mm depths, and the pultruded T-1210 and T-1215 T-bar series at 12% open area. Request the clear-opening dimension for the exact panel before specifying it on an accessible route.",
  },
  {
    question: "Is heel-proof grating the same as ADA grating?",
    answer: "Not necessarily. Heel-resistant grating has small enough openings to stop most narrow shoe heels catching, which a 19 mm mini mesh can do, but the ADA limit for an accessible route is ½ in (13 mm). Check which requirement the project actually needs.",
  },
  {
    question: "Do small openings reduce drainage?",
    answer: "Yes. The small-opening rows listed here have 12% to 30% open area, while most standard industrial rows in the catalog run from about 40% up to 84%. Plan drainage, debris and cleaning with that in mind, especially outdoors.",
  },
];

export default function AdaGratingPage() {
  const keyFacts = [
    { label: "The rule", value: "2010 ADA Standards §302.3: openings in walking surfaces on an accessible route must not pass a ½ in (13 mm) sphere, with elongated openings perpendicular to the direction of travel." },
    { label: "Molded option", value: "13 × 13 / 40 × 40 mm mini mesh, 22, 30 and 40 mm deep, 30% open area, 15.0 to 25.0 kg/m² nominal." },
    { label: "Pultruded option", value: "Wide-top T-bar series T-1210 and T-1215 at 12% open area; the T-bar tops leave narrow slots that run across the bearing bars." },
    { label: "Heel-resistant", value: "The 19.05 × 19.05 mm mini mesh resists narrow heels but its top mesh is above the ADA ½ in limit." },
    { label: "Verify", value: "Compliance belongs to the installed route: measure the clear opening of the offered panel and show the bar direction on the layout drawing." },
  ];

  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "ADA and small-opening FRP grating",
          description: seoTarget.description,
          path: pagePath,
          image: pultrudedGratingManualImages.closeup,
          imageAlt: "Close-up of pultruded FRP grating: parallel T-bar bearing bars joined by cross-rods",
          category: "Small-opening fiberglass grating",
          material: ["Glass-fiber-reinforced thermoset"],
          productLine: "F1-GRID",
          datePublished: LAST_UPDATED,
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="ADA grating"
        line={{ name: "F1-GRID", label: "Small opening" }}
        updated={LAST_UPDATED}
        title="ADA fiberglass grating: small-opening FRP panels"
        description="Grating for accessible routes, pedestrian areas and heel traffic: the ½ in (13 mm) opening rule, the molded mini mesh and pultruded T-bar rows with the smallest openings, and how to check a panel before it goes on the drawing."
        facts={[
          { label: "ADA opening", value: "≤ ½ in (13 mm)" },
          { label: "Molded", value: "13 × 13 mini mesh" },
          { label: "Pultruded", value: "T-1210 / T-1215" },
          { label: "Open area", value: "12–30%" },
        ]}
        actions={{
          primary: { label: "Request opening data", href: buildRfqHref({ source: "product-header", product: "ADA / small-opening FRP grating", productPath: pagePath }) },
          secondary: { label: "See candidate rows", href: "#candidates", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="The opening rule" note="Diagram · not to scale" bleed>
            <OpeningRuleFigure />
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Grating", href: "/products/grating" },
          { label: "ADA Grating" },
        ]}
      />
      <PageNav
        items={[
          { id: "key-facts", label: "Key facts" },
          { id: "rule", label: "The rule" },
          { id: "candidates", label: "Candidate rows" },
          { id: "verify", label: "How to verify" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <KeyFacts
        title="ADA fiberglass grating: key facts"
        tone="muted"
        summary="ADA fiberglass grating is FRP grating whose openings at the walking surface are small enough, no more than ½ in (13 mm), for an accessible route. F1's smallest-opening rows are the molded 13 × 13 mm mini mesh and the pultruded T-1210 and T-1215 T-bar series; the clear opening of the offered panel is confirmed before it is specified."
        facts={keyFacts}
      />

      <PageSection id="rule" title="What the ADA opening rule asks of a grating">
        <div className="grid gap-[20px] lg:grid-cols-2">
          <div className="space-y-[12px] text-f16 leading-golden text-t2">
            <p>
              The <a href={adaSource} className={link} target="_blank" rel="noopener noreferrer">2010 ADA Standards, section 302.3</a>, limits openings in floor and ground surfaces on an accessible route: a sphere of ½ in (13 mm) diameter must not pass through, and elongated openings are laid with the long side across the main direction of travel so that wheels and cane tips do not drop in.
            </p>
            <p>
              For grating this means two checks: the clear opening at the top surface, which depends on the bar width as well as the mesh, and the panel direction on the layout drawing. Industrial access codes use a different test, for example a 35 mm ball, or 20 mm where people work below, under EN ISO 14122-2.
            </p>
          </div>
          <Figure number={2} title="Pultruded T-bar surface" note="Catalog photo">
            <div className="relative aspect-[16/9]">
              <Image src={pultrudedGratingManualImages.closeup} alt="Close-up of pultruded FRP grating: parallel T-bar bearing bars joined by cross-rods" fill sizes="(max-width: 1023px) 94vw, 46vw" className="object-cover" />
            </div>
          </Figure>
        </div>
      </PageSection>

      <PageSection id="candidates" title="Small-opening rows in the F1 catalog" tone="muted" intro="Rows taken from the molded and pultruded specification tables. Depth in mm, nominal weight in kg/m². The clear opening at the walking surface is confirmed per panel.">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">Small-opening molded and pultruded FRP grating rows</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Type", "Mesh or series", "Depth", "Open area", "Weight", "Opening check"].map((heading) => <th key={heading} scope="col" className={`${cell} whitespace-nowrap font-semibold text-t1`}>{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {candidates.map((row) => (
                <tr key={`${row.series}-${row.depth}`} className="border-b border-border-default last:border-b-0">
                  <td className={`${cell} text-t2`}>{row.family}</td>
                  <th scope="row" className={`${cell} font-semibold text-t1`}>{row.series}</th>
                  <td className={`${cell} text-t2`}>{row.depth}</td>
                  <td className={`${cell} text-t2`}>{row.openArea}</td>
                  <td className={`${cell} text-t2`}>{row.weight}</td>
                  <td className={`${cell} text-t2`}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[14px] text-f14 leading-golden text-t2">
          Full tables: <Link href="/products/molded-frp-grating" className={link}>molded FRP grating</Link> and <Link href="/products/frp-gratings" className={link}>FRP pultruded grating</Link>. Hold-downs for both: <Link href="/products/frp-grating-clips" className={link}>fiberglass grating clips</Link>.
        </p>
      </PageSection>

      <PageSection id="verify" title="How to verify a panel for an accessible route">
        <ol className="grid gap-[12px] md:grid-cols-4">
          {[
            { title: "Ask for the clear opening", body: "Request the measured opening at the walking surface for the exact mesh or series, depth and surface finish, not only the mesh pitch." },
            { title: "Fix the direction", body: "Mark the bearing-bar or long-opening direction on the panel layout so slots run across the route." },
            { title: "Check transitions", body: "Keep changes in level at panel joints, landings and edges within the route's tolerance; grit surfaces add height." },
            { title: "Keep the evidence", body: "File the opening data and the approved layout with the handover documents for the inspector." },
          ].map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-bg2 p-[16px]">
              <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Check {index + 1}</span>
              <h3 className="mt-[4px] text-f16 font-bold text-t1">{step.title}</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-[16px] text-f14 leading-golden text-t2">
          Choosing between the two families: <Link href="/technology/molded-vs-pultruded-frp-grating" className={link}>molded vs pultruded FRP grating</Link>. Stairs and platforms on the same route: <Link href="/products/frp-access-platforms-stairs" className={link}>FRP access platforms and stairs</Link>.
        </p>
      </PageSection>

      <PageSection id="faq" title="ADA grating questions" tone="muted">
        <div className="grid items-start gap-[12px] md:grid-cols-2">
          {faqItems.map((item) => (
            <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </PageSection>

      <PageSection id="quote" title="Quote small-opening grating" tone="deep">
        <ProductRfq
          product="ADA / small-opening FRP grating"
          productPath={pagePath}
          intro="Send the route layout, the accessibility rule it must meet, spans and loads, surface and the exposure. We confirm the clear opening of the offered panel with the quotation."
          items={[
            { title: "Route", text: "Plan with the direction of travel, panel layout, landings and transitions." },
            { title: "Rule", text: "ADA 2010 §302.3, a local accessibility code or a heel-resistance requirement." },
            { title: "Structure", text: "Spans, supports, loads and deflection limit." },
            { title: "Surface and site", text: "Grit or plain surface, outdoor exposure, drainage and cleaning." },
          ]}
        />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "Grating", links: [{ href: "/products/grating", label: "Fiberglass grating overview" }, { href: "/products/molded-frp-grating", label: "Molded FRP grating" }, { href: "/products/frp-gratings", label: "Pultruded FRP grating" }] },
          { title: "Specify", links: [{ href: "/resources/blog/frp-grating-specification-guide", label: "Grating specification guide" }, { href: "/tools/frp-grating-selector", label: "FRP grating selector" }, { href: "/tools/access-geometry-checker", label: "Access geometry checker" }] },
          { title: "Route", links: [{ href: "/products/frp-access-platforms-stairs", label: "Access platforms and stairs" }, { href: "/products/frp-stair-treads", label: "Stair treads" }, { href: "/products/frp-handrail-systems", label: "Industrial handrail systems" }] },
        ]}
      />
    </>
  );
}
