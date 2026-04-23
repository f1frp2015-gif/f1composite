import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AskAICard from "@/components/ai/AskAICard";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle =
  "FRP Gratings & Decks — Molded, Pultruded & Structural Deck Panels";
const pageDescription =
  "Molded and pultruded fiberglass gratings plus FRP structural deck panels. Anti-slip surfaces for marine, chemical, and infrastructure platforms. Deck panels for pedestrian bridges and bridge deck replacement. Corrosion-proof, lightweight, full load tables and specifications.";
const pagePath = "/products/gratings";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/gratings/opengraph-image",
});

const gratingTypes = [
  {
    name: "Molded Gratings",
    description:
      "Molded FRP gratings are manufactured by laying continuous glass fiber roving in alternating directions within a mold and infusing with resin under controlled temperature and pressure. This bi-directional fiber architecture gives molded gratings near-equal strength in both the longitudinal and transverse directions, making them the preferred choice for applications where loads may be applied from any direction or where panels must be cut to fit irregular openings without significant loss of structural integrity. We produce molded gratings in isophthalic polyester and vinyl ester resin systems, with the vinyl ester option specified for chemical processing, wastewater treatment, and offshore marine environments where aggressive chemical exposure is expected.",
    specs: [
      { label: "Mesh sizes", value: "38 x 38 mm, 50 x 50 mm" },
      { label: "Panel thickness", value: "25 mm, 30 mm, 38 mm, 50 mm" },
      { label: "Standard panel size", value: "1220 x 3660 mm" },
      { label: "Resin systems", value: "Isophthalic polyester, vinyl ester" },
      { label: "Fire rating", value: "ASTM E84 Class 1 (flame spread index \u226425)" },
    ],
  },
  {
    name: "Pultruded Gratings",
    description:
      "Pultruded FRP gratings consist of pultruded I-bars or T-bars mechanically interlocked with cross-rods to form a rigid open-mesh panel. The unidirectional fiber architecture of the pultruded bearing bars provides superior strength and stiffness in the load-bearing direction compared to molded gratings of the same thickness, making pultruded gratings the optimal choice for long-span applications where deflection limits govern the design. Our pultruded gratings are assembled with precision-machined interlocking connections that eliminate the need for adhesive bonding, ensuring consistent panel flatness and simplifying field replacement of individual bars if impact damage occurs. We offer pultruded gratings with bearing bar depths from 25 mm to 65 mm, covering span requirements from 600 mm to over 2,400 mm depending on load class.",
    specs: [
      { label: "Bearing bar depth", value: "25 mm, 32 mm, 40 mm, 50 mm, 65 mm" },
      { label: "Bar spacing", value: "30 mm, 40 mm, 60 mm center-to-center" },
      { label: "Cross-rod spacing", value: "50 mm, 100 mm, 150 mm" },
      { label: "Standard panel width", value: "1000 mm, 1220 mm" },
      { label: "Maximum span", value: "2400 mm (65 mm bar, light pedestrian load)" },
    ],
  },
  {
    name: "Cover Plates (Solid Top)",
    description:
      "FRP cover plates, also known as solid-top gratings, combine a molded or pultruded grating base with a bonded solid FRP top surface. The solid top provides a continuous walking surface that prevents small objects, tools, and liquids from falling through the grating openings, making cover plates the required specification for platforms above occupied areas, food processing facilities, and pharmaceutical clean rooms. We manufacture cover plates with a gritted anti-slip surface that exceeds the BS 7976-2 pendulum test requirement for slip resistance in wet conditions. The solid top surface also provides a smooth substrate for directional marking, safety striping, and corporate branding using embedded pigments or applied coatings.",
    specs: [
      { label: "Base thickness", value: "25 mm, 38 mm" },
      { label: "Top plate thickness", value: "3 mm, 5 mm" },
      { label: "Total thickness", value: "28 mm, 43 mm" },
      { label: "Surface finish", value: "Fine grit, coarse grit, smooth" },
      { label: "Standard colors", value: "Grey (RAL 7035), Safety yellow (RAL 1023)" },
    ],
  },
  {
    name: "Structural Deck Panels",
    description:
      "FRP structural deck panels are pultruded, closed-top composite planks engineered as a continuous walking or driving surface. Unlike open-mesh gratings, deck panels provide a fully sealed top face that carries point loads without requiring a separate cover plate — making them the preferred specification for pedestrian bridge decks, observation platforms, elevated walkways, and FRP bridge deck replacement projects. Each plank incorporates internal webs that give the panel superior flexural stiffness relative to its depth, enabling longer clear spans than conventional molded grating. Deck panels are supplied with integrally pigmented UV-stable surfaces and a gritted anti-slip top, with interlocking tongue-and-groove joints that distribute wheel loads across adjacent planks and eliminate trip hazards. Typical applications include pedestrian bridges (5–12 m spans), vehicular access decks rated for light and medium vehicles, offshore helideck surrounds, solar farm walkways, and stadium platform decks where a clean architectural appearance is required alongside corrosion immunity.",
    specs: [
      { label: "Panel depth", value: "40 mm, 50 mm, 75 mm, 100 mm" },
      { label: "Panel width", value: "305 mm, 500 mm, 610 mm" },
      { label: "Maximum span", value: "Up to 3.6 m (100 mm panel, pedestrian load)" },
      { label: "Joint system", value: "Tongue-and-groove interlock, bonded and/or bolted" },
      { label: "Load classes", value: "AASHTO H-5 / H-10 / H-20 available for vehicular" },
      { label: "Resin systems", value: "Isophthalic polyester, vinyl ester, polyurethane" },
    ],
  },
];

const loadRatings = [
  { type: "Light pedestrian", load: "5 kN/m\u00B2", typical: "Walkways, inspection platforms" },
  { type: "Heavy pedestrian", load: "7.5 kN/m\u00B2", typical: "Public access areas, stairways" },
  { type: "Light vehicular", load: "15 kN/m\u00B2", typical: "Maintenance vehicle access, cart traffic" },
  { type: "Heavy industrial", load: "25 kN/m\u00B2", typical: "Forklift traffic, equipment platforms" },
  { type: "Concentrated point load", load: "4.5 kN (on 25x25 mm)", typical: "All grating types, worst-case design check" },
];

const antiSlipGrades = [
  {
    grade: "Standard Concave",
    pendulum: "\u226536 (low slip potential)",
    description:
      "The concave meniscus top surface of standard molded and pultruded gratings provides baseline slip resistance suitable for dry indoor environments and light industrial applications. No additional surface treatment is applied.",
  },
  {
    grade: "Fine Grit (FG)",
    pendulum: "\u226555 (moderate-high slip resistance)",
    description:
      "A layer of fine silica grit (0.5 - 1.0 mm) is bonded to the top surface of the grating bars during manufacture, providing enhanced slip resistance for outdoor platforms, wet areas, and moderately oily environments. Fine grit is our most commonly specified anti-slip surface.",
  },
  {
    grade: "Coarse Grit (CG)",
    pendulum: "\u226570 (high slip resistance)",
    description:
      "Coarse silica or aluminum oxide grit (1.0 - 2.5 mm) provides maximum slip resistance for the most demanding environments, including offshore platforms, vessel decks, oil and gas processing facilities, and any application where the grating surface is routinely exposed to water, oil, or chemical spillage.",
  },
];

const faqItems = [
  {
    question: "What is the difference between FRP gratings and FRP deck panels?",
    answer:
      "FRP gratings are open-mesh panels formed by bi-directional glass fiber (molded) or by interlocking pultruded bearing bars (pultruded). They provide high drainage, light transmission, and reduced wind load, but small objects can fall through the mesh. FRP deck panels (also called structural deck planks) are closed-top pultruded planks with internal webs and an integrally sealed top surface — they carry concentrated loads without requiring a cover plate, span longer than gratings of equivalent depth, and are the preferred specification for pedestrian bridge decks, vehicular access platforms, and FRP bridge deck replacement projects.",
  },
  {
    question: "What spans can FRP deck panels achieve?",
    answer:
      "F1 Composite pultruded FRP deck panels span up to 3.6 m under pedestrian load with a 100 mm panel depth. Shorter spans of 1.2–2.4 m are typical for panels rated to AASHTO H-10 or H-20 vehicular load. For longer pedestrian bridge decks, multiple panels are spliced with tongue-and-groove joints and supported on intermediate FRP or steel cross-beams. Full span/load/deflection tables are available on request for project-specific design.",
  },
  {
    question: "How do FRP gratings compare to steel gratings in terms of weight and load capacity?",
    answer:
      "FRP gratings weigh approximately 25-35% of an equivalent steel grating, which dramatically reduces structural support requirements, transport costs, and installation labor. A standard 38 mm molded FRP grating weighs approximately 18 kg/m\u00B2 compared to 55-65 kg/m\u00B2 for a comparable hot-dip galvanized steel grating. In terms of load capacity, FRP gratings are designed to the same load class specifications as steel, though the lower elastic modulus of FRP means that deflection often governs the design, particularly at longer spans.",
  },
  {
    question: "Are FRP gratings suitable for offshore and marine environments?",
    answer:
      "FRP gratings are the preferred specification for offshore platforms, vessels, and coastal infrastructure precisely because they are immune to the corrosion mechanisms that destroy steel gratings in marine environments: salt spray, immersion, wet-dry cycling, and galvanic corrosion from contact with dissimilar metals. Vinyl ester resin gratings provide the highest resistance to hydrolysis and chemical attack in marine applications. We supply gratings to major offshore operators and shipyards worldwide, with product certifications from DNV, Lloyd\u2019s, and ABS.",
  },
  {
    question: "Can FRP gratings be cut to fit on site?",
    answer:
      "Yes. Both molded and pultruded FRP gratings can be cut on site using standard carbide-tipped circular saws or reciprocating saws. Molded gratings are particularly easy to cut to irregular shapes because the bi-directional fiber architecture maintains structural integrity regardless of the cut direction. Pultruded gratings should ideally be cut so that bearing bars span the load direction, and we recommend that significant cut-outs be planned during the panel layout stage rather than executed in the field. Dust extraction and particulate respiratory protection are recommended during cutting.",
  },
  {
    question: "What fire performance ratings do your gratings achieve?",
    answer:
      "Our standard isophthalic polyester gratings achieve ASTM E84 Class 1 fire rating with a flame spread index of 25 or less. For applications requiring enhanced fire performance such as offshore platforms, tunnels, and transit infrastructure, we offer gratings in fire-retardant resin formulations that achieve flame spread indices below 10 and generate significantly lower smoke density and toxic gas emission. We can provide gratings tested to IMO Resolution MSC.307(88) for marine applications and EN 13501-1 Euroclass ratings for European building projects.",
  },
];

export default function GratingsPage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "FRP Gratings & Decks",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/plank-grating.png",
          category: "FRP Gratings & Structural Deck Panels",
          material: ["Glass fiber", "Isophthalic polyester resin", "Vinyl ester resin", "Phenolic resin", "Polyurethane resin"],
          additionalProperty: [
            { name: "Configurations", value: "Molded gratings, pultruded gratings, solid-top cover plates, structural deck panels" },
            { name: "Use Cases", value: "Marine, chemical, industrial platforms, pedestrian bridge decks, vehicular access decks" },
          ],
        })}
      />
      <PageHeader
        tag="Gratings & Decks"
        title="FRP Gratings & Structural Deck Panels"
        description="Corrosion-proof, lightweight fiber-reinforced polymer (FRP) gratings and structural deck panels — molded and pultruded gratings, solid-top cover plates, and closed-top deck planks for pedestrian bridges, vehicular decks, and industrial platforms."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Gratings & Decks" },
        ]}
      />

      {/* Grating Image */}
      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[8px]">
            <Image
              src="/images/products/frp-grating-industrial.jpg"
              alt="Industrial facility with grating platforms, walkways, and stairways — typical FRP grating applications"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="max-w-[780px]">
            <p className="text-f19 leading-golden text-t2">
              FRP (fiber-reinforced polymer) gratings and structural deck panels, also known
              as GRP (glass-reinforced polymer) gratings and FRP decking, deliver the
              structural performance of steel at a fraction of the weight and with zero
              corrosion risk. At F1 Composite, we manufacture molded and pultruded grating
              systems, solid-top cover plates, and pultruded structural deck panels — a
              complete platform and decking solution for industrial plants, offshore
              platforms, marine vessels, wastewater treatment facilities, pedestrian bridges,
              and FRP bridge deck replacement projects.
            </p>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              The economic case for FRP gratings extends far beyond the initial material cost.
              Steel gratings in corrosive environments typically require replacement every 8 to
              12 years, with annual maintenance costs for inspection, cleaning, and re-coating
              that can exceed the original purchase price within the first five years. Our FRP
              gratings deliver a documented service life exceeding 30 years in the harshest
              chemical and marine environments with zero maintenance, reducing the total cost
              of ownership by 40 to 60% compared to galvanized or stainless steel alternatives.
              The 65-75% weight reduction also translates directly into lower structural support
              costs, reduced transport expenses, and faster installation with smaller crews and
              lighter lifting equipment.
            </p>
          </div>
        </div>
      </section>

      {/* Grating Types */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Product Configurations</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Four configurations for every application
          </h2>

          <div className="mt-[34px] space-y-[34px]">
            {gratingTypes.map((grating) => (
              <div
                key={grating.name}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <h3 className="text-[19px] font-bold text-t1">{grating.name}</h3>
                <p className="mt-[13px] max-w-[700px] text-f15 leading-golden text-t2">
                  {grating.description}
                </p>
                <div className="mt-[21px] overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <tbody>
                      {grating.specs.map((spec) => (
                        <tr key={spec.label} className="border-b border-border-default">
                          <td className="py-[8px] pr-[21px] text-f13 font-semibold text-t1 whitespace-nowrap">
                            {spec.label}
                          </td>
                          <td className="py-[8px] text-f13 text-t2">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Load Ratings */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Load Ratings</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Design load classes
          </h2>
          <p className="mt-[13px] max-w-[560px] text-f15 leading-golden text-t2">
            We engineer gratings to satisfy the following standard load classes.
            Custom load ratings and span tables are available on request for
            project-specific requirements.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Load Class
                  </th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Uniform Load
                  </th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Typical Application
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadRatings.map((row) => (
                  <tr key={row.type} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">
                      {row.type}
                    </td>
                    <td className="py-[13px] pr-[21px] text-f15 text-teal-text font-semibold">
                      {row.load}
                    </td>
                    <td className="py-[13px] text-f15 text-t2">{row.typical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Anti-Slip Grades */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Anti-Slip Performance</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Surface treatment grades
          </h2>
          <p className="mt-[13px] max-w-[560px] text-f15 leading-golden text-t2">
            All anti-slip values measured using the BS 7976-2 pendulum test method
            in wet conditions. Higher values indicate greater slip resistance.
          </p>

          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {antiSlipGrades.map((grade) => (
              <div
                key={grade.grade}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <h3 className="text-[17px] font-bold text-t1">{grade.grade}</h3>
                <p className="mt-[5px] text-f13 font-semibold text-teal-text">
                  PTV: {grade.pendulum}
                </p>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{grade.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related FRP products",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/standard-profiles/i-beam", label: "FRP I-beam support" },
              { href: "/products/standard-profiles/channel", label: "FRP channel stringers" },
              { href: "/products/custom-pultrusions", label: "Custom grating bearing bars" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/marine", label: "Marine & offshore gratings" },
              { href: "/industries/industrial", label: "Chemical plant platforms" },
              { href: "/case-studies/coastal-marina-walkway", label: "Coastal marina case study" },
              { href: "/case-studies/chemical-plant-platform", label: "Chemical plant case study" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/technology/frp-vs-steel-gratings", label: "FRP vs steel gratings — full comparison" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminium, concrete" },
              { href: "/technology/quality-testing", label: "Fire & slip testing (BS 476 / AS 4586)" },
              { href: "/resources/technical-data", label: "Load tables & data sheets" },
              { href: "/resources/design-guides", label: "Grating design guides" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      {/* FAQ */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard
        prefill="I need FRP gratings/deck for [marine/chemical/industrial] application. Span [mm], live load [kN/m²], required slip resistance [R10/R11/R13], chemical exposure [list]. Molded or pultruded — which fits, and what's the panel size / weight?"
      />

      <InnerCTA title="Need FRP gratings or deck panels for your next project?" />
    </>
  );
}
