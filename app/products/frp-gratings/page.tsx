import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AskAICard from "@/components/ai/AskAICard";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import RelatedLinks from "@/components/sections/RelatedLinks";
import GratingSelectionGuide from "@/components/sections/GratingSelectionGuide";
import GratingClipGuide from "@/components/sections/GratingClipGuide";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";

const pagePath = "/products/frp-gratings";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const publishedAt = "2026-04-04";
const updatedAt = "2026-08-29";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/frp-gratings/opengraph-image",
});

const gratingTypes = [
  {
    name: "Molded Gratings",
    description:
      "Molded FRP gratings are manufactured by laying continuous glass fiber roving in alternating directions within a mold and infusing with resin under controlled temperature and pressure. This bi-directional fiber architecture gives molded gratings near-equal strength in both the longitudinal and transverse directions, making them the preferred choice for applications where loads may be applied from any direction or where panels must be cut to fit irregular openings without significant loss of structural integrity. We produce molded gratings in isophthalic polyester and vinyl ester resin systems, with the vinyl ester option specified for chemical processing, wastewater treatment, and offshore marine environments where aggressive chemical exposure is expected.",
    specs: [
      { label: "Mesh sizes", value: "38 x 38 mm, 40 x 40 mm, 50 x 50 mm; 19 x 19 mm heel-proof mini mesh" },
      { label: "Panel thickness", value: "13, 15, 25, 30, 38, 40, 50 mm" },
      { label: "Standard panel sizes", value: "1220 x 3660, 1220 x 2440, 921 x 3050, 1524 x 4000 mm" },
      { label: "Resin systems", value: "Isophthalic polyester, vinyl ester" },
      { label: "Fire rating", value: "ASTM E84 Class 1 (flame spread index \u226425)" },
    ],
  },
  {
    name: "Pultruded Gratings",
    description:
      "Pultruded FRP gratings consist of pultruded I-bars or T-bars mechanically interlocked with cross-rods to form a rigid open-mesh panel. The unidirectional fiber architecture of the pultruded bearing bars provides superior strength and stiffness in the load-bearing direction compared to molded gratings of the same thickness, making pultruded gratings the optimal choice for long-span applications where deflection limits govern the design. Our pultruded gratings are assembled with precision-machined interlocking connections that eliminate the need for adhesive bonding, ensuring consistent panel flatness and simplifying field replacement of individual bars if impact damage occurs. We offer pultruded gratings with bearing bar depths from 25 mm to 65 mm, covering span requirements from 600 mm to over 2,400 mm depending on load class.",
    specs: [
      { label: "Bearing bar depth", value: "25 mm, 32 mm, 38 mm, 50 mm, 64 mm, 76 mm" },
      { label: "Bearing bar centers", value: "25.4 - 61 mm center-to-center" },
      { label: "Cross-bar centers", value: "152.4 mm (6 in)" },
      { label: "Maximum panel size", value: "1524 x 6100 mm" },
      { label: "Open area", value: "12% - 83% depending on series" },
    ],
  },
  {
    name: "Cover Plates (Solid Top)",
    description:
      "FRP cover plates, also known as solid-top gratings, combine a molded or pultruded grating base with a bonded solid FRP top surface. The solid top provides a continuous walking surface that prevents small objects, tools, and liquids from falling through the grating openings, making cover plates the required specification for platforms above occupied areas, food processing facilities, and pharmaceutical clean rooms. F1 cover plates use a gritted anti-slip surface engineered for wet-service slip resistance. The solid top surface also provides a smooth substrate for directional marking, safety striping, and corporate branding using embedded pigments or applied coatings.",
    specs: [
      { label: "Base thickness", value: "25 mm, 38 mm" },
      { label: "Top plate thickness", value: "3 mm, 5 mm" },
      { label: "Total thickness", value: "28 mm, 43 mm" },
      { label: "Surface finish", value: "Fine grit, coarse grit, smooth" },
      { label: "Standard colors", value: "Gray (RAL 7035), Safety yellow (RAL 1023)" },
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

// Common production configurations from F1's grating supply program.
// Values are nominal manufacturer data — certified datasheets on request.
const moldedGratingSpecs = [
  { mesh: "38.1 x 38.1", depth: "25", bar: "6.5 / 5.0", open: "68", weight: "12.3", panels: "1524 x 4000, 1220 x 3660, 1220 x 2440, 921 x 3050" },
  { mesh: "38.1 x 38.1", depth: "30", bar: "6.5 / 5.0", open: "68", weight: "14.6", panels: "1524 x 4000, 1220 x 3660, 1220 x 2440, 921 x 3050" },
  { mesh: "38.1 x 38.1", depth: "38", bar: "7.0 / 5.0", open: "68", weight: "19.5", panels: "1524 x 4000, 1220 x 3660, 1220 x 2440, 921 x 3050" },
  { mesh: "40 x 40", depth: "40", bar: "7.0 / 5.0", open: "67", weight: "19.2", panels: "1007 x 3007, 1007 x 4007" },
  { mesh: "50.8 x 50.8", depth: "25", bar: "7.5 / 6.0", open: "78", weight: "11.8", panels: "1220 x 3660, 1220 x 2440" },
  { mesh: "50.8 x 50.8", depth: "40", bar: "7.0 / 5.0", open: "78", weight: "17.8", panels: "1220 x 3660, 1220 x 2440, 921 x 3050" },
  { mesh: "19.05 x 19.05 mini", depth: "30", bar: "6.5 / 5.0", open: "30", weight: "18.5", panels: "1524 x 4000, 1220 x 3660, 1220 x 2440, 921 x 3050" },
];

const pultrudedGratingSpecs = [
  { type: "T-2510", series: "Pedestrian T-bar", depth: "25", centers: "50.8", open: "25", weight: "13.6", ada: true },
  { type: "T-3810", series: "Pedestrian T-bar", depth: "25", centers: "61.0", open: "38", weight: "10.2", ada: false },
  { type: "T-2515", series: "Pedestrian T-bar", depth: "38", centers: "50.8", open: "25", weight: "16.7", ada: true },
  { type: "I-4010", series: "Industrial I-bar", depth: "25", centers: "25.4", open: "40", weight: "17.1", ada: true },
  { type: "I-5015", series: "Industrial I-bar", depth: "38", centers: "30.5", open: "50", weight: "19.1", ada: false },
  { type: "I-6015", series: "Industrial I-bar", depth: "38", centers: "37.1", open: "60", weight: "16.1", ada: false },
  { type: "HI-4720", series: "High-load I-bar", depth: "50", centers: "30.2", open: "47", weight: "54.5", ada: false },
  { type: "SI-8315", series: "Standard I-bar (cooling tower)", depth: "38", centers: "47.6", open: "83", weight: "12.0", ada: false },
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
    question: "Molded vs pultruded FRP grating — which should I choose?",
    answer:
      "Choose molded grating when loads arrive from both directions, the layout needs many field cutouts, or maximum chemical resistance is the priority: its woven, resin-rich construction (30-35% glass by weight) gives near-equal two-way strength and the best corrosion performance. Choose pultruded grating when the design is span-driven: its unidirectional bearing bars (60-65% glass) carry significantly longer clear spans with fewer supports, and dedicated series cover ADA pedestrian surfaces, 73-83% open cooling-tower decks, and forklift-rated high-load platforms. Both families are produced to ASTM E84 Class 1 flame spread (FSI ≤25).",
  },
  {
    question: "Is fiberglass grating ADA compliant?",
    answer:
      "The dedicated pedestrian series are. ADA/ABA surface rules require walking-surface openings of 13 mm (1/2 in) or less in the dominant direction of travel; our T-2510 and T-2515 pedestrian T-bar gratings (12.7 mm slot at 50.8 mm bar centers) and the I-4010 industrial I-bar (≈10 mm slot at 25.4 mm centers) meet that limit and are marked ADA in the specification table on this page. Open-mesh industrial and cooling-tower series (38-83% open area) prioritize drainage and airflow instead and are not intended for ADA-governed pedestrian routes — specify by series, not by material family.",
  },
  {
    question: "What is the difference between FRP gratings and FRP deck panels?",
    answer:
      "FRP gratings are open-mesh panels formed by bi-directional glass fiber (molded) or by interlocking pultruded bearing bars (pultruded). They provide high drainage, light transmission, and reduced wind load, but small objects can fall through the mesh. FRP deck panels (also called structural deck planks) are closed-top pultruded planks with internal webs and an integrally sealed top surface — they carry concentrated loads without requiring a cover plate, span longer than gratings of equivalent depth, and are the preferred specification for pedestrian bridge decks, vehicular access platforms, and FRP bridge deck replacement projects.",
  },
  {
    question: "What CSI MasterFormat section covers FRP gratings?",
    answer:
      "In North American construction specifications, fiberglass reinforced gratings are specified under CSI MasterFormat Section 06 74 13 (Fiberglass Reinforced Gratings), within Division 06 — distinct from metal gratings, which sit in Division 05 (05 53 00). Specifying under 06 74 13 keeps the corrosion-resistance, load-deflection, and fire-rating requirements in a section written for composites rather than forcing FRP into a steel-grating spec. F1 supports 06 74 13 submittals with load tables, ASTM E84 flame-spread data, and batch material test reports.",
  },
  {
    question: "What spans can FRP deck panels achieve?",
    answer:
      "F1 Composite pultruded FRP deck panels span up to 3.6 m under pedestrian load with a 100 mm panel depth. Shorter spans of 1.2–2.4 m are typical for panels rated to AASHTO H-10 or H-20 vehicular load. For longer pedestrian bridge decks, multiple panels are spliced with tongue-and-groove joints and supported on intermediate FRP or steel cross-beams. Full span/load/deflection tables are available on request for project-specific design.",
  },
  {
    question: "How do FRP gratings compare to steel gratings in terms of weight and load capacity?",
    answer:
      "FRP gratings weigh approximately 25-35% of an equivalent steel grating, which dramatically reduces structural support requirements, transport costs, and installation labor. A standard 38 mm molded FRP grating weighs approximately 19.5 kg/m\u00B2 compared to 55-65 kg/m\u00B2 for a comparable hot-dip galvanized steel grating. In terms of load capacity, FRP gratings are designed to the same load class specifications as steel, though the lower elastic modulus of FRP means that deflection often governs the design, particularly at longer spans.",
  },
  {
    question: "Are FRP gratings suitable for offshore and marine environments?",
    answer:
      "FRP gratings are the preferred specification for offshore platforms, vessels, and coastal infrastructure precisely because they are immune to the corrosion mechanisms that destroy steel gratings in marine environments: salt spray, immersion, wet-dry cycling, and galvanic corrosion from contact with dissimilar metals. Vinyl ester resin gratings provide the highest resistance to hydrolysis and chemical attack in marine applications. We supply gratings to major offshore operators and shipyards worldwide, with product certifications from DNV, Lloyd\u2019s, and ABS.",
  },
  {
    question: "Can FRP gratings be cut to fit on site?",
    answer:
      "Yes. Both molded and pultruded FRP gratings can be cut on site using standard carbide-tipped circular saws or reciprocating saws. Molded gratings are particularly easy to cut to irregular shapes because the bi-directional fiber architecture maintains structural integrity regardless of the cut direction. Pultruded gratings should ideally be cut so that bearing bars span the load direction, and we recommend that significant cut-outs be planned during the panel layout stage rather than executed in the field. Dust extraction and particulate respiratory protection are recommended during cutting. After any field cut, re-check support bearing, cut-edge support, sealed cut surfaces, and the hold-down layout against the approved installation drawing.",
  },
  {
    question: "Which FRP grating clip should I use — M, C, J, or T?",
    answer:
      "Use an M clip as the general top-saddle hold-down for compatible molded or pultruded grating, a C clip to align adjacent molded-panel edges, a J clamp where a lower hook can grip a support that should not be drilled, and an F1 T-type clip for the specified pultruded bearing-bar series. A C clip is only a panel-edge connector: it does not replace structural support or each panel's independent hold-downs. Because clip letters are not standardized across manufacturers, select by the F1 SKU, panel family and approved project drawing rather than by the letter alone.",
  },
  {
    question: "Are the M, C, J and T grating clips supplied in 316 stainless steel?",
    answer:
      "Yes. The F1 M/C/J/T clip kits listed on this page are specified in 316 stainless steel for corrosion-exposed grating installations. Final clip geometry, bolt length, quantity and spacing are matched to the molded or pultruded panel depth, mesh or bearing-bar series, support flange and installation access, then confirmed on the approved project drawing before supply.",
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
        data={buildProductFamilyPageSchema({
          name: "FRP Gratings & Decks",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/plank-grating.png",
          category: "FRP Gratings & Structural Deck Panels",
          productLine: "F1-GRID",
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
          // Indicative USD/m² band for the grating range (basis: ~18 kg/m² molded
          // grating; consistent with published regional grating quotes). Routes to
          // /contact for a firm price — satisfies Google's "offers required" rule.
          priceRange: { lowPrice: "35", highPrice: "90", offerCount: "20", unitText: "square meter" },
          material: ["Glass fiber", "Isophthalic polyester resin", "Vinyl ester resin", "Phenolic resin", "Polyurethane resin"],
          additionalProperty: [
            { name: "Configurations", value: "Molded gratings, pultruded gratings, solid-top cover plates, structural deck panels" },
            { name: "Use Cases", value: "Marine, chemical, industrial platforms, pedestrian bridge decks, vehicular access decks" },
          ],
          // Design load classes the grating range is engineered to satisfy
          // (light pedestrian 5 → heavy industrial 25 kN/m²), as a typed range.
          measurements: [
            { propertyID: "loadCapacity", value: "5-25", unitText: "kN/m²" },
          ],
        })}
      />
      <PageHeader
        tag="Gratings & Decks · F1-GRID"
        title="FRP Grating Manufacturer — Molded, Pultruded & Structural Deck Panels"
        description="Corrosion-proof, lightweight fiberglass gratings and structural deck panels — molded and pultruded FRP grating, solid-top cover plates, and closed-top deck planks for pedestrian bridges, vehicular decks, and industrial platforms."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Gratings & Decks" },
        ]}
      />

      {/* Grating Image */}
      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[8px]">
            <Image
              src="/images/products/frp-structural-deck-panel-hero.webp"
              alt="Pultruded FRP structural deck panel with a closed top, internal reinforcing webs, and an interlocking edge profile"
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
          <div>
            <p className="text-f19 leading-golden text-t2">
              FRP (fiber-reinforced polymer) gratings and structural deck panels, also known
              as GRP (glass-reinforced polymer) gratings and FRP decking, deliver the
              structural performance of steel at a fraction of the weight and with zero
              corrosion risk. F1 Composite supplies molded and pultruded grating systems,
              solid-top cover plates, and pultruded structural deck panels — a
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
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              We ship grating panels worldwide on DDP and CIF terms. For projects in
              the Gulf region, see our dedicated{" "}
              <Link
                href="/regions/frp-grating-supplier-saudi-arabia"
                className="font-semibold text-teal-text hover:text-teal"
              >
                FRP grating supply program for Saudi Arabia — Riyadh, Jeddah, and Dammam
              </Link>{" "}
              covering by-city supply notes for the KSA market and project
              documentation aligned with Aramco SAEP / SAES requirements.
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
                <p className="mt-[13px] text-f15 leading-golden text-t2">
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

          {/* Standard specification tables */}
          <div className="mt-[55px]">
            <h3 className="text-[clamp(20px,2.4vw,26px)] font-extrabold leading-[1.15] text-t1">
              Standard specification tables
            </h3>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The tables below list the most frequently ordered production
              configurations from our grating program — nominal metric data taken
              from series-production tooling, not made-to-order estimates. Further
              mesh sizes, depths, panel formats, and resin systems are available;
              request the certified datasheet for design values.
            </p>

            <div className="mt-[34px] rounded-[8px] border border-border-default bg-white p-[34px]">
              <h4 className="text-[17px] font-bold text-t1">
                Molded grating — common mesh and depth combinations
              </h4>
              <div className="mt-[21px] overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-border-default">
                      <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1 whitespace-nowrap">Mesh (mm)</th>
                      <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1 whitespace-nowrap">Depth (mm)</th>
                      <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1 whitespace-nowrap">Bar Width Top/Bottom (mm)</th>
                      <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1 whitespace-nowrap">Open Area</th>
                      <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1 whitespace-nowrap">Weight (kg/m{"²"})</th>
                      <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Standard Panel Sizes (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moldedGratingSpecs.map((row) => (
                      <tr key={`${row.mesh}-${row.depth}`} className="border-b border-border-default">
                        <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1 whitespace-nowrap">{row.mesh}</td>
                        <td className="py-[13px] pr-[21px] text-f15 text-teal-text font-semibold">{row.depth}</td>
                        <td className="py-[13px] pr-[21px] text-f15 text-t2 whitespace-nowrap">{row.bar}</td>
                        <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.open}%</td>
                        <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.weight}</td>
                        <td className="py-[13px] text-f15 text-t2">{row.panels}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-[13px] text-f13 leading-golden text-t3">
                Mini-mesh (19.05 x 19.05 mm) meets heel-proof opening requirements
                for public walkways. Additional depths from 13 mm to 65 mm and
                covered (solid-top) variants are produced on the same tooling.
              </p>
            </div>

            <div className="mt-[21px] rounded-[8px] border border-border-default bg-white p-[34px]">
              <h4 className="text-[17px] font-bold text-t1">
                Pultruded grating — common bearing bar types
              </h4>
              <div className="mt-[21px] overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-border-default">
                      <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1 whitespace-nowrap">Type</th>
                      <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Series</th>
                      <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1 whitespace-nowrap">Depth (mm)</th>
                      <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1 whitespace-nowrap">Bar Centers (mm)</th>
                      <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1 whitespace-nowrap">Open Area</th>
                      <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1 whitespace-nowrap">Weight (kg/m{"²"})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pultrudedGratingSpecs.map((row) => (
                      <tr key={row.type} className="border-b border-border-default">
                        <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1 whitespace-nowrap">
                          {row.type}
                          {row.ada && <span className="ml-[8px] rounded-[4px] bg-bg2 px-[8px] py-[2px] text-f11 font-semibold text-teal-text whitespace-nowrap">ADA</span>}
                        </td>
                        <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.series}</td>
                        <td className="py-[13px] pr-[21px] text-f15 text-teal-text font-semibold">{row.depth}</td>
                        <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.centers}</td>
                        <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.open}%</td>
                        <td className="py-[13px] text-f15 text-t2">{row.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-[13px] text-f13 leading-golden text-t3">
                All types: cross-bar centers 152.4 mm (6 in), maximum panel size
                1524 x 6100 mm, 60-65% glass content. Types marked ADA provide
                openings of 13 mm or less in one direction, compliant with the
                Americans with Disabilities Act walking-surface rule. High-load
                (HI) series is rated for forklift and vehicular traffic — span
                tables per AASHTO wheel loads available on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Molded vs pultruded: process animations + comparison + fit */}
      <GratingSelectionGuide />

      {/* 316SS M/C/J/T installation hardware and clip selection */}
      <GratingClipGuide />

      {/* Load Ratings */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Load Ratings</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Design load classes
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
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
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Anti-Slip Performance</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Surface treatment grades
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
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
        groups={[
          {
            title: "Related FRP products",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/frp-stair-treads", label: "Stair tread covers & grating treads" },
              { href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" },
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beam support" },
              { href: "/products/fiberglass-structural-shapes/frp-channel", label: "FRP channel stringers" },
              { href: "/products/custom-pultruded-profiles", label: "Custom grating bearing bars" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/regions/frp-grating-supplier-saudi-arabia", label: "FRP grating Saudi Arabia — Riyadh · Jeddah · Dammam" },
              { href: "/industries/marine", label: "Marine & offshore gratings" },
              { href: "/industries/industrial", label: "Chemical plant platforms" },
              { href: "/case-studies/coastal-marina-walkway", label: "Coastal marina case study" },
              { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant platform design" },
              { href: "/applications/frp-pedestrian-bridge-superstructures", label: "Pedestrian bridge superstructures" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "#grating-clips", label: "M/C/J/T grating clips & 316SS hardware" },
              { href: "/technology/frp-vs-steel-gratings", label: "FRP vs steel gratings — full comparison" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum, concrete" },
              { href: "/technology/quality-testing", label: "Fire & slip testing (BS 476 / AS 4586)" },
              { href: "/resources/technical-data", label: "Load tables & data sheets" },
              { href: "/resources/design-guides", label: "Grating design guides" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      {/* FAQ */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <AskAICard
        prefill="I need FRP grating for [application]. Panel family/depth [molded or pultruded / mm], span [mm], live load [kN/m²], support material/flange [details], underside access [yes/no], chemical exposure [list]. Please select the M/C/J/T 316SS clip kit (or advise if unsure), quantity and required installation/CAD detail."
      />

      <InnerCTA title="Need FRP gratings, deck panels, or 316SS clip kits?" />
    </>
  );
}
