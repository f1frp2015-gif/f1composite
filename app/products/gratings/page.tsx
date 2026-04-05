import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle = "FRP Gratings";
const pageDescription =
  "Molded and pultruded FRP gratings with anti-slip surfaces. Corrosion-proof, lightweight, high load capacity. Ideal for marine, chemical, industrial, and infrastructure platforms.";
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
      "Our standard isophthalic polyester gratings achieve ASTM E84 Class 1 fire rating with a flame spread index of 25 or less. For applications requiring enhanced fire performance such as offshore platforms, tunnels, and transit infrastructure, we offer gratings in phenolic resin that achieve flame spread indices below 10 and generate significantly lower smoke density and toxic gas emission. We can provide gratings tested to IMO Resolution MSC.307(88) for marine applications and EN 13501-1 Euroclass ratings for European building projects.",
  },
];

export default function GratingsPage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "FRP Gratings",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/plank-grating.png",
          category: "FRP Gratings",
          material: ["Glass fiber", "Isophthalic polyester resin", "Vinyl ester resin", "Phenolic resin"],
          additionalProperty: [
            { name: "Configurations", value: "Molded, pultruded, and solid-top cover plates" },
            { name: "Use Cases", value: "Marine, chemical, industrial, and infrastructure platforms" },
          ],
        })}
      />
      <PageHeader
        tag="Gratings"
        title="FRP Gratings for Industrial & Marine Environments"
        description="Corrosion-proof, lightweight fiber-reinforced polymer (FRP) gratings that eliminate the maintenance cycle of steel. Molded, pultruded, and solid-top configurations for every load class and environment."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Gratings" },
        ]}
      />

      {/* Grating Image */}
      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[8px]">
            <Image
              src="/images/products/plank-grating.png"
              alt="FRP plank grating panel showing anti-slip surface and cross-section"
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
              FRP (fiber-reinforced polymer) gratings, also known as GRP (glass-reinforced
              polymer) gratings, deliver the structural performance of steel gratings at a
              fraction of the weight and with zero corrosion risk. At F1 Composite, we
              manufacture both molded and pultruded grating systems alongside solid-top cover
              plates, providing a complete platform flooring solution for industrial plants,
              offshore platforms, marine vessels, wastewater treatment facilities, and public
              infrastructure.
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
          <SectionTag>Grating Types</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Three configurations for every application
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

      {/* Cross-links */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[21px] text-f19 font-bold text-t1">Related resources</h2>
          <div className="flex flex-col gap-[13px] sm:flex-row sm:gap-[34px]">
            <LinkArrow href="/industries/marine">
              Marine industry solutions
            </LinkArrow>
            <LinkArrow href="/industries/industrial">
              Industrial applications
            </LinkArrow>
            <LinkArrow href="/contact">
              Request a quotation
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Need gratings for your next project?" />
    </>
  );
}
