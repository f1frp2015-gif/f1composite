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
import { gratingClipTypicalStartingLayout } from "@/content/data/gratingClips";
import { moldedGratingManualImageAssets, moldedGratingSpecGroups } from "@/content/data/moldedGratingSpecs";
import { pultrudedGratingManualImages, pultrudedGratingSpecGroups } from "@/content/data/pultrudedGratingSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { WALKWAY_LOADS } from "@/lib/accessGeometry";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/fiberglass-catwalk-grating";
const seoTarget = getSeoQueryTarget(pagePath);
const LAST_UPDATED = "2026-11-25";
const product = "Fiberglass catwalk grating";

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const cell = "px-[12px] py-[10px] align-top";

// Catwalk candidates taken unchanged from the molded and pultruded spec tables:
// the 38 mm square mesh in walkway depths, and the pultruded I-bar series.
const CATWALK_MESH = "38.1 × 38.1 mm square mesh";
const CATWALK_DEPTHS = ["25", "30", "38"];
const moldedRows = moldedGratingSpecGroups
  .filter((group) => group.mesh === CATWALK_MESH)
  .flatMap((group) => group.rows.filter((row) => CATWALK_DEPTHS.includes(row.depth)).map((row) => ({ family: "Molded", series: "38 × 38 mm square mesh", depth: row.depth, openArea: row.openArea, weight: row.weight, note: "Spans both ways; cut-outs can be made on site without losing the panel" })));
const pultrudedRows = pultrudedGratingSpecGroups
  .flatMap((group) => group.rows)
  .filter((row) => /^I-\d/.test(row.type))
  .map((row) => ({ family: "Pultruded", series: `${row.type} I-bar`, depth: row.depth, openArea: row.openArea, weight: row.weight, note: `Bearing bars at ${row.bearingBarCenter} mm centers; spans one way, across the stringers` }));
const candidates = [...moldedRows, ...pultrudedRows];

const catwalkLoads = WALKWAY_LOADS.filter((row) => !row.rule.startsWith("NBC"));

function CatwalkSectionFigure() {
  return (
    <svg viewBox="0 0 480 300" className="h-auto w-full" role="img" aria-labelledby="catwalk-fig-title catwalk-fig-desc">
      <title id="catwalk-fig-title">Cross-section of a fiberglass grating catwalk</title>
      <desc id="catwalk-fig-desc">A grating panel spans between two stringers, held by clips at each support, with a toe board and a guardrail post on each side. Dimensions shown are the common rule values, not a design. Not to scale.</desc>
      <rect x="0" y="0" width="480" height="300" fill="#f8fafc" />
      {/* guardrail posts and rails */}
      {[110, 366].map((x) => <rect key={x} x={x} y="46" width="6" height="150" fill="#334155" />)}
      {[46, 118].map((y) => <rect key={y} x="104" y={y} width="274" height="5" fill="#334155" opacity={y === 46 ? 1 : 0.55} />)}
      {/* toe boards */}
      {[118, 352].map((x) => <rect key={x} x={x} y="176" width="8" height="20" fill="#f59e0b" />)}
      {/* grating */}
      <rect x="104" y="196" width="274" height="12" fill="#0f8a83" />
      {Array.from({ length: 13 }, (_, index) => <rect key={index} x={112 + index * 20} y="196" width="3" height="12" fill="#f8fafc" opacity="0.7" />)}
      {/* stringers */}
      {[112, 344].map((x) => (
        <g key={x}>
          <rect x={x} y="208" width="24" height="6" fill="#64748b" />
          <rect x={x + 9} y="214" width="6" height="40" fill="#64748b" />
          <rect x={x} y="254" width="24" height="6" fill="#64748b" />
        </g>
      ))}
      {/* dimensions */}
      <path d="M128 232 H352" stroke="#334155" strokeWidth="1.5" />
      <path d="M128 226 v12 M352 226 v12" stroke="#334155" strokeWidth="1.5" />
      <text x="240" y="248" textAnchor="middle" fontSize="12" fill="#334155">grating span between stringers</text>
      <path d="M126 168 H352" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="240" y="162" textAnchor="middle" fontSize="12" fill="#334155">clear width ≥ 600 mm (ISO 14122-2, AS 1657)</text>
      <path d="M412 46 V196" stroke="#334155" strokeWidth="1.5" />
      <path d="M406 46 h12 M406 196 h12" stroke="#334155" strokeWidth="1.5" />
      <text x="424" y="116" fontSize="12" fill="#334155">42 in</text>
      <text x="424" y="131" fontSize="12" fill="#334155">± 3 in</text>
      <text x="424" y="146" fontSize="12" fill="#334155">(OSHA)</text>
      <text x="20" y="190" fontSize="12" fill="#334155">toe board</text>
      <path d="M78 186 H116" stroke="#334155" strokeWidth="1" />
      <text x="20" y="282" fontSize="12" fill="#334155">clips at every support line</text>
      <path d="M124 270 V212" stroke="#334155" strokeWidth="1" />
    </svg>
  );
}

const faqItems = [
  {
    question: "What is fiberglass catwalk grating?",
    answer: "It is molded or pultruded FRP grating used as the walking surface of a catwalk: a narrow elevated walkway for maintenance and service access along process lines, tank tops, roofs and pipe racks. The panels sit on stringers or existing steel and are held down with clips.",
  },
  {
    question: "What load does catwalk grating have to carry?",
    answer: "The load comes from the rule that governs the structure. ASCE 7-22 Table 4.3-1 and IBC Table 1607.1 list 40 psf with a 300 lb concentrated load for catwalks used for maintenance and service access, and 60 psf for walkways and elevated platforms other than exitways. EN ISO 14122-2 uses 2 kN/m² on the structure and 1.5 kN on a 200 × 200 mm area of the flooring.",
  },
  {
    question: "How wide should a catwalk be?",
    answer: "EN ISO 14122-2 asks for a clear width of at least 600 mm, recommends 800 mm, and 1,000 mm where several people pass. AS 1657 also sets 600 mm as the minimum. Guardrail posts and toe boards take up width, so set the grating panel wider than the clear walking width.",
  },
  {
    question: "Molded or pultruded grating for a catwalk?",
    answer: "Molded grating carries load in both directions, so it suits catwalks with cut-outs, angled ends and irregular supports. Pultruded grating has more glass along the bearing bars and spans further one way, which reduces the number of supports on a long straight run. Both are held with the same family of clips.",
  },
  {
    question: "How is catwalk grating fixed down?",
    answer: `With stainless steel hold-down clips at the supports. As a starting layout, use at least ${gratingClipTypicalStartingLayout[1].value.replace("Minimum ", "").replace(" panel-to-support hold-downs", "")} hold-downs per panel and at least ${gratingClipTypicalStartingLayout[0].value.replace("Minimum ", "").replace(" panel-to-support hold-downs", "")} on each support line, with a bearing length of 38 mm (1.5 in) or more. The approved layout drawing sets the final quantity.`,
  },
  {
    question: "Do you supply the catwalk structure as well as the grating?",
    answer: "Yes. Stringers and cross members come from the pultruded channel, I-beam and square tube catalog, guardrails from the handrail system, and stairs from the stair tread range. Send the layout and loads; the structure is designed for the project by the responsible engineer.",
  },
];

export default function CatwalkGratingPage() {
  const keyFacts = [
    { label: "What it is", value: "FRP grating used as the deck of a narrow elevated walkway for maintenance and service access." },
    { label: "Molded rows", value: `38 × 38 mm square mesh, ${CATWALK_DEPTHS.join(", ")} mm deep, ${moldedRows[0]?.weight ?? ""} to ${moldedRows[moldedRows.length - 1]?.weight ?? ""} kg/m² nominal.` },
    { label: "Pultruded rows", value: "I-bar series in 25, 30 and 38 mm depths with 40%, 50% or 60% open area." },
    { label: "Catwalk load", value: "ASCE 7-22: 40 psf (1.92 kPa) with a 300 lb (1.33 kN) concentrated load for maintenance catwalks." },
    { label: "Clear width", value: "EN ISO 14122-2 and AS 1657: at least 600 mm." },
    { label: "Fixing", value: "316 stainless steel clips, at least four hold-downs per panel as a starting layout." },
  ];

  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Fiberglass catwalk grating",
          description: seoTarget.description,
          path: pagePath,
          image: pultrudedGratingManualImages.hero,
          imageAlt: "Pultruded FRP grating laid as a rooftop walkway",
          category: "FRP grating for catwalks and walkways",
          material: ["Glass-fiber-reinforced thermoset"],
          productLine: "F1-GRID",
          datePublished: LAST_UPDATED,
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Catwalk grating"
        line={{ name: "F1-GRID", label: "Catwalks and walkways" }}
        updated={LAST_UPDATED}
        title="Fiberglass catwalk grating"
        description="Molded and pultruded FRP grating panels for maintenance catwalks and service walkways: the loads and widths the rules ask for, the catalog rows used most often, and the supports, clips and edge protection that complete the walkway."
        facts={[
          { label: "Catwalk load", value: "40 psf + 300 lb" },
          { label: "Clear width", value: "≥ 600 mm" },
          { label: "Molded", value: "38 × 38 mesh" },
          { label: "Pultruded", value: "I-bar, 25–38 mm" },
        ]}
        actions={{
          primary: { label: "Request a quote", href: buildRfqHref({ source: "product-header", product, productPath: pagePath }) },
          secondary: { label: "See catwalk rows", href: "#rows", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Catwalk cross-section" note="Diagram · not to scale" bleed>
            <CatwalkSectionFigure />
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Grating", href: "/products/grating" },
          { label: "Catwalk Grating" },
        ]}
      />
      <PageNav
        items={[
          { id: "key-facts", label: "Key facts" },
          { id: "rules", label: "Loads and widths" },
          { id: "rows", label: "Catwalk rows" },
          { id: "build", label: "Supports and fixing" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <KeyFacts
        title="Fiberglass catwalk grating: key facts"
        tone="muted"
        summary="Fiberglass catwalk grating is molded or pultruded FRP grating laid on stringers as the deck of a maintenance walkway. Most catwalks use a 38 × 38 mm molded mesh 25 to 38 mm deep, or a pultruded I-bar panel where the supports are further apart, fixed with stainless steel clips."
        facts={keyFacts}
      />

      <PageSection id="rules" title="Loads and widths a catwalk is designed to">
        <div className="grid gap-[20px] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="overflow-x-auto rounded-card border border-border-default bg-white">
            <table className="w-full min-w-[620px] border-collapse text-left text-f14 leading-golden">
              <caption className="sr-only">Reference floor loads for catwalks and walkways</caption>
              <thead>
                <tr className="border-b border-border-default bg-bg2">
                  {["Rule", "Applies to", "Load"].map((heading) => <th key={heading} scope="col" className={`${cell} whitespace-nowrap font-semibold text-t1`}>{heading}</th>)}
                </tr>
              </thead>
              <tbody>
                {catwalkLoads.map((row) => (
                  <tr key={`${row.rule}-${row.use}`} className="border-b border-border-default last:border-b-0">
                    <th scope="row" className={`${cell} font-semibold text-t1`}>{row.rule}</th>
                    <td className={`${cell} text-t2`}>{row.use}</td>
                    <td className={`${cell} text-t2`}>{row.load}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-[12px] text-f16 leading-golden text-t2">
            <p>
              A catwalk used only for maintenance carries a lighter floor load than a general platform, but the 300 lb concentrated load and the deflection limit usually decide the grating depth and the support spacing.
            </p>
            <p>
              Edge protection follows a separate rule. OSHA 1910.28 requires fall protection where a walking-working surface has an unprotected edge 4 ft (1.2 m) or more above a lower level, and 1910.29 sets the guardrail top edge at 42 in ± 3 in with a toeboard at least 3.5 in high where objects could fall on people below.
            </p>
            <p>
              Check the geometry of a layout in the <Link href="/tools/access-geometry-checker" className={link}>access geometry checker</Link>.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="rows" title="Grating rows used for catwalks" tone="muted" intro="Rows taken from the molded and pultruded specification tables. Depth in mm, nominal weight in kg/m². The load table for the offered panel is sent with the quotation and checked against your span, load and deflection limit.">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">Molded and pultruded FRP grating rows used for catwalks</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Type", "Mesh or series", "Depth", "Open area", "Weight", "Use on a catwalk"].map((heading) => <th key={heading} scope="col" className={`${cell} whitespace-nowrap font-semibold text-t1`}>{heading}</th>)}
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
        <div className="mt-[20px] grid gap-[16px] md:grid-cols-2">
          <Figure number={2} title="Molded grating walkway" note="Catalog photo">
            <div className="relative aspect-[16/9]">
              <Image src={moldedGratingManualImageAssets.hero} alt="Molded FRP grating walkway with handrails in a coastal setting" fill sizes="(max-width: 767px) 94vw, 46vw" className="object-cover" />
            </div>
          </Figure>
          <Figure number={3} title="Pultruded grating walkway" note="Catalog photo">
            <div className="relative aspect-[16/9]">
              <Image src={pultrudedGratingManualImages.hero} alt="Pultruded FRP grating laid as a rooftop walkway" fill sizes="(max-width: 767px) 94vw, 46vw" className="object-cover" />
            </div>
          </Figure>
        </div>
        <p className="mt-[14px] text-f14 leading-golden text-t2">
          Full tables and panel sizes: <Link href="/products/molded-frp-grating" className={link}>molded FRP grating</Link> and <Link href="/products/frp-gratings" className={link}>pultruded FRP grating</Link>. All grating families: <Link href="/products/grating" className={link}>fiberglass grating</Link>. Choosing between the two: <Link href="/technology/molded-vs-pultruded-frp-grating" className={link}>molded vs pultruded grating</Link>.
        </p>
      </PageSection>

      <PageSection id="build" title="Supports, fixing and edge protection">
        <div className="grid gap-[12px] md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Stringers", body: <>Two or more stringers run the length of the catwalk and set the grating span. They are usually pultruded channel, I-beam or <Link href="/products/fiberglass-structural-shapes/frp-square-tube" className={link}>fiberglass square tube</Link>, or the existing steel.</> },
            { title: "Clips", body: <>Hold-downs go at every support line: at least four per panel and no more than 1,200 mm apart along a support as a starting layout. See <Link href="/products/frp-grating-clips" className={link}>fiberglass grating clips</Link>.</> },
            { title: "Guardrail and toe board", body: <>Posts, rails and toe boards come from the <Link href="/products/frp-handrail-systems" className={link}>fiberglass handrail systems</Link> page and bolt to the stringers, not to the grating.</> },
            { title: "Access", body: <>Stairs, ladders and crossovers that reach the catwalk are covered under <Link href="/products/frp-access-platforms-stairs" className={link}>FRP access platforms and stairs</Link>.</> },
          ].map((item) => (
            <div key={item.title} className="rounded-card border border-border-default bg-bg2 p-[16px]">
              <h3 className="text-f16 font-bold text-t1">{item.title}</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-[16px] max-w-[900px] text-f14 leading-golden text-t2">
          Lay pultruded panels with the bearing bars across the stringers. Support every cut edge and every panel end, and re-check the clip layout after cut-outs for pipes or columns. A gritted top is the usual surface for a catwalk that gets wet or oily.
        </p>
      </PageSection>

      <PageSection id="faq" title="Catwalk grating questions" tone="muted">
        <div className="grid items-start gap-[12px] md:grid-cols-2">
          {faqItems.map((item) => (
            <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </PageSection>

      <PageSection id="quote" title="Quote catwalk grating" tone="deep">
        <ProductRfq
          product={product}
          productPath={pagePath}
          intro="Send the catwalk layout with support spacing, the load rule and the exposure. We return the panel series and depth, a panel layout and the clip count."
          items={[
            { title: "Layout", text: "Length, clear width, support positions and spacing, cut-outs and changes of direction." },
            { title: "Load rule", text: "ASCE 7, EN ISO 14122, AS 1657 or the project value, with the deflection limit." },
            { title: "Exposure", text: "Chemicals, temperature, outdoor UV, and any fire or conductivity requirement." },
            { title: "Scope", text: "Grating only, or grating with stringers, handrail, toe board, stairs and clips." },
          ]}
        />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "Grating", links: [{ href: "/products/grating", label: "Fiberglass grating overview" }, { href: "/products/molded-frp-grating", label: "Molded FRP grating" }, { href: "/products/frp-gratings", label: "Pultruded FRP grating" }] },
          { title: "Specify", links: [{ href: "/resources/blog/how-to-read-frp-grating-load-table", label: "How to read a grating load table" }, { href: "/tools/frp-grating-selector", label: "FRP grating selector" }, { href: "/products/ada-frp-grating", label: "ADA small-opening grating" }] },
          { title: "Structure", links: [{ href: "/products/frp-access-platforms-stairs", label: "Access platforms and stairs" }, { href: "/products/frp-handrail-systems", label: "Industrial handrail systems" }, { href: "/products/frp-stair-treads", label: "Stair treads" }] },
        ]}
      />
    </>
  );
}
