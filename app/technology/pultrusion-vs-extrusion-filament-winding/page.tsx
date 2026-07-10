import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { ProcessTrio } from "@/components/sections/ConceptAnimations";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "Pultrusion vs Extrusion vs Filament Winding";
const pageDescription =
  "Pultrusion vs extrusion vs filament winding: process, fiber orientation, achievable shapes, and mechanical properties compared for FRP and plastic profiles.";
const pagePath = "/technology/pultrusion-vs-extrusion-filament-winding";
const publishedAt = "2026-07-03";
const updatedAt = "2026-07-03";
const authorName = "Haifeng Gong, Ph.D.";
const authorRole = "R&D Lead — composite materials, pultrusion process development, and standards";
const authorHref = "/about/authors/haifeng-gong";
const reviewedBy = "Yifan Liu, Application Engineer";
const referencedStandards = ["ASTM D3917", "ASTM D638", "ASTM D2996"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

interface CompRow {
  property: string;
  pultrusion: string;
  extrusion: string;
  filamentWinding: string;
}

const comparisonData: CompRow[] = [
  {
    property: "Reinforcement",
    pultrusion: "Continuous fiber (E-glass, carbon, aramid), pulled through the die",
    extrusion: "None, or short/chopped fiber filler dispersed in the melt",
    filamentWinding: "Continuous fiber, wound onto a rotating mandrel at a controlled angle",
  },
  {
    property: "Matrix material",
    pultrusion: "Thermoset resin (polyester, vinyl ester, PU, phenolic) — cures in the die",
    extrusion: "Thermoplastic (PVC, ABS, nylon, aluminum) — cools and solidifies after the die",
    filamentWinding: "Thermoset resin (epoxy, vinyl ester) — cures on or off the mandrel",
  },
  {
    property: "Fiber orientation",
    pultrusion: "Primarily longitudinal (0°), plus optional multi-axial mat for cross-strength",
    extrusion: "None (unreinforced) or randomly dispersed short fiber",
    filamentWinding: "Helical / hoop-dominant, angle set by the winding pattern",
  },
  {
    property: "Achievable shapes",
    pultrusion: "Open or closed constant cross-section: I-beam, channel, angle, tube, flat bar, rod",
    extrusion: "Constant cross-section, open or closed, typically thin-wall",
    filamentWinding: "Hollow, rotationally symmetric shapes: pipe, tank, pressure vessel",
  },
  {
    property: "Continuous open sections (I-beam, channel, angle)?",
    pultrusion: "Yes — this is pultrusion's core capability",
    extrusion: "Yes, in aluminum or rigid PVC — but without continuous-fiber reinforcement",
    filamentWinding: "No — winding a fiber tow onto a mandrel cannot produce an open section",
  },
  {
    property: "Longitudinal tensile strength (typical)",
    pultrusion: "350–700 MPa (E-glass/polyester), directional along the pull axis",
    extrusion: "35–55 MPa for unreinforced rigid PVC; higher with short-glass fill, still well below continuous-fiber FRP",
    filamentWinding: "Very high in the hoop/wind direction; low axially unless dedicated axial fiber is added",
  },
  {
    property: "Typical products",
    pultrusion: "Structural profiles, gratings, window/door frames, cable tray, crossarms",
    extrusion: "PVC/aluminum window and door frames, aluminum extrusions, plastic tubing",
    filamentWinding: "FRP pressure pipe, chemical storage tanks, pressure vessels",
  },
];

const faqs = [
  {
    question: "Is pultrusion the same as extrusion?",
    answer:
      "No. Both processes push or pull material through a shaping die to produce a constant cross-section, which is why the names sound similar, but the material physics are different. Pultrusion pulls continuous fiber reinforcement through a resin bath and then a heated die, where a thermoset resin cures into a rigid, fiber-reinforced composite. Extrusion pushes a heated thermoplastic (or a thermoplastic with short/chopped fiber filler) through a die under pressure, then cools it to solidify — there is no continuous fiber running the length of the part. The result: pultruded FRP achieves substantially higher longitudinal tensile strength and stiffness-to-weight than an extruded plastic profile of the same cross-section.",
  },
  {
    question: "Can extrusion produce the same structural shapes as pultrusion?",
    answer:
      "Aluminum and rigid PVC extrusion can produce visually similar open shapes — I-beams, channels, angles, window frames. The limitation is material, not geometry: without continuous fiber reinforcement, an extruded profile's longitudinal strength and stiffness are governed by the base material alone (aluminum's modulus, or unreinforced/short-fiber-filled thermoplastic's much lower strength). For structural spans, corrosion-critical environments, or electrical/thermal insulation requirements, pultruded FRP outperforms extruded alternatives at a comparable or lighter cross-section.",
  },
  {
    question: "Why can't filament winding make an I-beam or channel?",
    answer:
      "Filament winding wraps a resin-wetted fiber tow around a rotating mandrel. The mandrel geometry has to allow the finished part to be removed or dissolved after cure, which restricts the process to hollow, rotationally symmetric shapes — pipes, tanks, pressure vessels. There is no mandrel geometry that produces an open cross-section like an I-beam or channel, so filament winding and pultrusion serve different shape families rather than competing on the same part.",
  },
  {
    question: "Which process gives the highest fiber-direction strength?",
    answer:
      "It depends on the load path the part needs to carry, not on one process being universally \"stronger.\" Pultrusion's unidirectional roving gives the highest longitudinal (0°) strength for open, beam-like sections under bending or axial load. Filament winding's helical and hoop windings give the highest circumferential strength for pressure vessels and pipe under internal pressure. Choosing between them starts from the part's actual loading, not the process in isolation.",
  },
  {
    question: "Does F1 Composite manufacture filament-wound products?",
    answer:
      "No — F1 Composite specializes in pultrusion: continuous, constant-cross-section structural profiles, gratings, and fenestration systems (I-beams, channels, angles, tubes, flat bars, rods, and custom sections). We do not filament-wind pipe or pressure vessels, and we do not pretend otherwise. If a project needs a filament-wound tank or large-diameter pressure pipe, that requires a different specialist process; our custom pultrusion capability covers open and closed constant-cross-section geometries instead.",
  },
];

export default function PultrusionVsExtrusionFilamentWindingPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    image: absoluteUrl(`${pagePath}/opengraph-image`),
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@type": "Organization", name: authorName },
    editor: { "@type": "Organization", name: reviewedBy },
    publisher: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
    about: [
      { "@type": "Thing", name: "Pultrusion" },
      { "@type": "Thing", name: "Plastic extrusion" },
      { "@type": "Thing", name: "Filament winding" },
    ],
    citation: referencedStandards,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        tag="Manufacturing Process Comparison"
        title="Pultrusion vs Extrusion vs Filament Winding"
        description="Three continuous composite/plastic manufacturing processes are often confused because they all push or pull material through a die or mandrel. Here's how they actually differ — and which shapes each one can and cannot make."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Pultrusion vs Extrusion vs Filament Winding" },
        ]}
      />

      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName={authorName}
        authorRole={authorRole}
        authorHref={authorHref}
        reviewedBy={reviewedBy}
        standards={referencedStandards}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The Short Answer</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-f24 font-bold text-t1 md:text-f31">
            Same-sounding names, three different shape and property envelopes
          </h2>
          <p className="mt-[21px] max-w-[860px] text-f15 leading-golden text-t2">
            Pultrusion, extrusion, and filament winding are all continuous manufacturing processes that shape material by moving it through (or around) a tool. That surface similarity is where the resemblance ends. Pultrusion pulls continuous fiber through a heated die to make open or closed constant-cross-section structural profiles. Extrusion pushes a thermoplastic melt through a die to make thin-wall profiles with no continuous fiber reinforcement. Filament winding wraps continuous fiber around a rotating mandrel to build hollow, rotationally symmetric shapes like pipe and tanks — geometrically incapable of producing an open section such as an I-beam.
          </p>
          <p className="mt-[13px] max-w-[860px] text-f15 leading-golden text-t2">
            Confusing the three usually happens at the RFQ stage — a buyer searches for &ldquo;pultruded pipe&rdquo; when what they actually need is a filament-wound pressure pipe, or specifies &ldquo;extruded FRP&rdquo; when the intent is a pultruded structural section. Getting the process right up front avoids quoting delays and, more importantly, avoids a fabricator accepting an order they cannot physically produce.
          </p>
          <div className="mt-[21px] max-w-[860px]">
            <ProcessTrio />
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Process Comparison</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Side-by-side: pultrusion, extrusion, and filament winding
          </h2>
          <p className="mt-[13px] max-w-[800px] text-f15 leading-golden text-t2">
            Property ranges are representative figures for typical material combinations in each process (E-glass/polyester pultrusion, rigid PVC or aluminum extrusion, E-glass/epoxy filament winding) — not a single-product datasheet.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full min-w-[900px] border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-border-default bg-bg2">
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Property</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-teal-text">Pultrusion</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Extrusion</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Filament Winding</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.property} className={`border-b border-border-default ${i % 2 === 0 ? "bg-white" : "bg-bg2/40"}`}>
                    <td className="px-[13px] py-[13px] font-semibold text-t1">{row.property}</td>
                    <td className="px-[13px] py-[13px] font-medium text-teal-text">{row.pultrusion}</td>
                    <td className="px-[13px] py-[13px] text-t2">{row.extrusion}</td>
                    <td className="px-[13px] py-[13px] text-t2">{row.filamentWinding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Pultrusion vs Extrusion</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-f24 font-bold text-t1 md:text-f31">
            Same die concept, different material physics
          </h2>
          <p className="mt-[21px] max-w-[860px] text-f15 leading-golden text-t2">
            Both processes force material through a fixed-geometry die to produce a constant cross-section — this is why the two get confused, and why &ldquo;pull&rdquo; and &ldquo;extrusion&rdquo; were combined to name pultrusion in the first place. The difference is what goes into the die. Pultrusion pulls continuous fiber roving through a resin bath and then the heated die, where the thermoset resin cures irreversibly. Extrusion pushes a thermoplastic melt (with no continuous fiber, or only short/chopped fiber filler) through the die and cools it to solidify — a reversible physical change, which is also why extruded thermoplastics can be reground and re-extruded, while cured thermoset FRP cannot.
          </p>
          <p className="mt-[13px] max-w-[860px] text-f15 leading-golden text-t2">
            The practical consequence for a specifying engineer: an extruded aluminum or PVC profile and a pultruded FRP profile can look identical on a drawing, but they are not interchangeable on load-bearing, corrosion, or electrical-insulation performance. Aluminum extrusion is genuinely strong and stiff (see the{" "}
            <Link href="/technology/frp-vs-traditional-materials" className="text-teal-text hover:underline">
              full FRP vs aluminum property comparison
            </Link>
            ) but conducts electricity and heat and corrodes in coastal/chemical environments. Unreinforced or short-fiber-filled thermoplastic extrusions are lighter-duty still, and are chosen for cost and formability rather than structural performance.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Pultrusion vs Filament Winding</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-f24 font-bold text-t1 md:text-f31">
            Open sections vs hollow rotational shapes
          </h2>
          <p className="mt-[21px] max-w-[860px] text-f15 leading-golden text-t2">
            Pultrusion and filament winding both lay continuous fiber into a thermoset matrix, so the raw materials can be nearly identical — the difference is entirely in the tooling geometry and fiber path. Pultrusion pulls fiber lengthwise through a stationary die, which is why it can produce open sections (I-beams, channels, angles) as easily as closed ones (tubes, rods). Filament winding wraps fiber around a rotating mandrel at a controlled helix or hoop angle, which only works for hollow, axisymmetric parts that can be slid or dissolved off the mandrel after cure — pipe, tanks, and pressure vessels.
          </p>
          <p className="mt-[13px] max-w-[860px] text-f15 leading-golden text-t2">
            This is a hard geometric boundary, not a cost or quality trade-off: no amount of tooling investment lets filament winding produce an I-beam, and pultrusion cannot economically produce a large-diameter pressure vessel with hoop-dominant fiber orientation. F1 Composite&rsquo;s process is pultrusion — see{" "}
            <Link href="/technology/pultrusion-process" className="text-teal-text hover:underline">
              how our pultrusion lines work
            </Link>{" "}
            and our{" "}
            <Link href="/products/custom-pultrusions" className="text-teal-text hover:underline">
              custom pultrusion capability
            </Link>{" "}
            for open and closed constant-cross-section geometries.
          </p>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqs} />
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Composite manufacturing processes",
            links: [
              { href: "/technology/pultrusion-process", label: "How pultrusion works" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum, timber, concrete" },
              { href: "/resources/glossary#extrusion-plastics", label: "Glossary: Extrusion (plastics)" },
              { href: "/resources/glossary#filament-winding", label: "Glossary: Filament winding" },
            ],
          },
          {
            title: "F1 Composite capabilities",
            links: [
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
              { href: "/products/standard-profiles", label: "Standard pultruded profiles" },
              { href: "/technology/quality-testing", label: "Quality & testing standards" },
              { href: "/pultruded-frp-profiles", label: "Pultruded FRP profiles hub" },
            ],
          },
          {
            title: "Deeper reading",
            links: [
              { href: "/resources/glossary", label: "Full pultrusion glossary" },
              { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "How to choose a pultrusion supplier" },
              { href: "/technology/china-alternative-to-strongwell-fiberline-exel", label: "China alternative to Strongwell / Exel" },
            ],
          },
        ]}
      />

      <InnerCTA title="Need a pultruded profile engineered to your load case?" />
    </>
  );
}
