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
  "FRP Window Frames — Pultruded Fiberglass Fenestration Systems";
const pageDescription =
  "Pultruded fiberglass window frames — 65/70/80/90/140-series FRP fenestration systems. Frame U-values from 0.78 W/m\u00B2\u00B7K, zero thermal bridging. Superior alternative to aluminum and PVC window frames. PHI (Passive House Institute) certified.";
const pagePath = "/products/fenestration-systems";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fenestration-systems/opengraph-image",
});

const systemSeries = [
  {
    name: "65-Series",
    frameDepth: "65 mm",
    chambers: 2,
    kValue: "1.3 - 1.5 W/m\u00B2K",
    glassRange: "24 - 38 mm",
    applications: "Residential windows, light commercial projects, renovation and retrofit",
    description:
      "The 65-series is our entry-level fenestration system, designed for residential and light commercial applications where thermal performance must exceed aluminum but project budgets are tightly controlled. The 65 mm frame depth accommodates double-glazed insulating glass units with cavities up to 18 mm, delivering whole-window K-values of 1.3 to 1.5 W/m\u00B2K depending on glass specification. Despite being our most compact system, the 65-series leverages the inherently low thermal conductivity of pultruded FRP (approximately 0.3 W/mK, compared to 160 W/mK for aluminum) to achieve thermal performance that aluminum systems can only match with complex multi-chamber thermal break inserts. The two-chamber frame design provides structural rigidity sufficient for window units up to 1,800 mm in height without steel reinforcement, eliminating the hidden thermal bridge that steel-reinforced PVC frames introduce.",
  },
  {
    name: "70-Series",
    frameDepth: "70 mm",
    chambers: 3,
    kValue: "1.1 - 1.3 W/m\u00B2K",
    glassRange: "28 - 44 mm",
    applications: "Residential, commercial, passive house compatible",
    description:
      "Our 70-series system is the workhorse of our fenestration range, balancing high thermal performance with broad architectural applicability. The 70 mm frame depth and three-chamber internal geometry accommodate triple-glazed insulating glass units with argon or krypton gas fills, achieving whole-window K-values of 1.1 to 1.3 W/m\u00B2K. This places the 70-series within the performance envelope required by most passive house certification bodies when combined with appropriate glazing. The profile set includes fixed-light frames, tilt-and-turn sash profiles, casement sash profiles, and dedicated mullion and transom sections that allow fabricators to build complex window wall configurations from a single system. All profiles feature a co-pultruded EPDM gasket channel that provides a continuous weatherseal without the need for secondary gasket adhesion, improving long-term air-tightness and simplifying fabrication.",
  },
  {
    name: "80-Series",
    frameDepth: "80 mm",
    chambers: 3,
    kValue: "0.9 - 1.1 W/m\u00B2K",
    glassRange: "36 - 52 mm",
    applications: "High-performance commercial, curtain wall, near-zero-energy buildings",
    description:
      "The 80-series targets high-performance commercial and near-zero-energy building projects where fenestration thermal performance is a critical factor in achieving energy compliance. The 80 mm frame depth with three internal chambers provides exceptional thermal isolation, and the increased glazing rebate depth accommodates quadruple-glazed units or triple-glazed units with wide cavities for maximum gas-fill performance. We engineer the 80-series profiles with a hybrid fiber architecture that combines unidirectional E-glass roving for longitudinal stiffness with +/- 45-degree multiaxial fabric for corner rigidity and impact resistance. This architecture allows the 80-series to span larger openings without supplementary steel reinforcement, maintaining the thermal integrity that makes FRP fenestration superior to aluminum and PVC alternatives. The 80-series also includes a dedicated curtain wall framing system with pressure-equalized drainage and structural silicone glazing compatibility.",
  },
  {
    name: "90-Series",
    frameDepth: "90 mm",
    chambers: 3,
    kValue: "0.78 - 0.95 W/m\u00B2K",
    glassRange: "44 - 60 mm",
    applications: "Ultra-low-energy buildings, arctic and extreme climate zones, institutional projects",
    description:
      "Our flagship 90-series represents the pinnacle of pultruded FRP fenestration performance, engineered for projects in extreme climate zones and ultra-low-energy building standards such as Passive House Premium and MINERGIE-P. The 90 mm frame depth and three-chamber geometry provide a thermal barrier equivalent to approximately 100 mm of mineral wool insulation, achieving certified whole-window K-values as low as 0.78 W/m\u00B2K with appropriate glazing selection. The 90-series profile set includes entrance door frame and leaf profiles capable of supporting door leaves weighing up to 130 kg on concealed hinges, as well as lift-and-slide door tracks rated for leaves up to 400 kg. All 90-series profiles are manufactured in vinyl ester resin as standard, providing superior long-term dimensional stability and resistance to the moisture cycling that can compromise PVC frames in high-humidity environments.",
  },
];

const thermalComparison = [
  { material: "Aluminum (no break)", kFrame: "5.0 - 7.0", conductivity: "160" },
  { material: "Aluminum (thermal break)", kFrame: "2.5 - 4.0", conductivity: "160 / 0.3 (insert)" },
  { material: "PVC (multi-chamber)", kFrame: "1.2 - 1.8", conductivity: "0.17" },
  { material: "PVC (steel reinforced)", kFrame: "1.4 - 2.2", conductivity: "0.17 / 50 (steel)" },
  { material: "Pultruded FRP (F1)", kFrame: "0.8 - 1.6", conductivity: "0.3" },
  { material: "Timber (softwood)", kFrame: "1.2 - 1.6", conductivity: "0.13" },
];

const glassConfigurations = [
  {
    name: "Double-Glazed IGU",
    structure: "4/16Ar/4 to 6/20Ar/6",
    kCenter: "1.0 - 1.1 W/m\u00B2K",
    description:
      "Standard double-glazed insulating glass units with low-emissivity coating and argon gas fill. Suitable for the 65-series and 70-series frames in mild and moderate climates. We recommend a minimum 16 mm cavity with 90% argon fill for optimal thermal performance within the double-glazed format.",
  },
  {
    name: "Triple-Glazed IGU",
    structure: "4/14Ar/4/14Ar/4 to 4/18Kr/4/18Kr/4",
    kCenter: "0.5 - 0.7 W/m\u00B2K",
    description:
      "Triple-glazed units with two low-e coatings and argon or krypton gas fill deliver the thermal performance required for passive house and near-zero-energy building standards. Compatible with our 70-series, 80-series, and 90-series frames. Krypton fill reduces the required cavity width, allowing thinner and lighter glass units at the same thermal performance level.",
  },
  {
    name: "Quadruple-Glazed IGU",
    structure: "3/12Kr/3/12Kr/3/12Kr/3",
    kCenter: "0.3 - 0.4 W/m\u00B2K",
    description:
      "Quadruple-glazed units represent the highest commercially available glazing thermal performance, with center-of-glass K-values approaching 0.3 W/m\u00B2K. These units are compatible with our 80-series and 90-series frames and are specified for extreme climate zones and buildings targeting net-zero or energy-positive performance. The increased glass weight requires careful frame engineering, which is why we offer structural analysis as a standard service for quadruple-glazed projects.",
  },
];

const faqItems = [
  {
    question: "What is the difference between FRP window frames and FRP window profiles?",
    answer:
      "FRP window profiles are the individual pultruded fiberglass sections — frame, sash, mullion, transom, glazing bead — that a fabricator cuts, welds or bolts together and pairs with glazing and hardware. FRP window frames (also called FRP fenestration systems) are the finished assemblies built from those profiles. F1 Composite manufactures the profiles; fabricators assemble them into frames. Both terms refer to the same pultruded fiberglass window product line (65/70/80/90/140-series).",
  },
  {
    question: "How does FRP fenestration compare to aluminum in terms of thermal performance?",
    answer:
      "Pultruded FRP frames conduct heat at approximately 1/500th the rate of aluminum. In practical terms, this means an FRP frame achieves K-values of 0.8 to 1.6 W/m\u00B2K without any thermal break inserts, while aluminum frames require complex polyamide or polyurethane thermal break strips to reach K-values of 2.5 to 4.0 W/m\u00B2K. The structural thermal break in FRP is continuous and inherent to the material, not a bolted-in insert that creates potential condensation pathways.",
  },
  {
    question: "Can FRP window frames be painted or finished in custom colors?",
    answer:
      "Yes. We supply frames in standard RAL 7035 (light grey) or RAL 9016 (traffic white) as standard production colors. Custom RAL colors are available for minimum order quantities of 200 linear meters per color. Additionally, FRP frames accept architectural-grade acrylic and polyurethane topcoats with excellent adhesion, allowing fabricators or installers to apply field coatings if project-specific color matching is required. The surface veil on our profiles provides a smooth, resin-rich substrate that holds paint finishes without primer.",
  },
  {
    question: "Are your fenestration systems certified to European and international standards?",
    answer:
      "Our fenestration profiles are tested and characterized in accordance with EN 12608 (PVC-U profiles, adapted for FRP), EN 14024 (thermal barrier profiles), and EN ISO 10077-2 (thermal transmittance calculation). Complete window and door systems fabricated from our profiles have been tested to EN 14351-1 for CE marking, including air permeability, water tightness, wind resistance, and operating forces. We provide fabricators with all test reports and technical documentation required for project-specific certification submissions.",
  },
  {
    question: "What is the expected service life of FRP window frames?",
    answer:
      "Pultruded FRP window frames have an expected service life exceeding 60 years based on accelerated weathering tests and field performance data from installations dating back to the early 1980s. Unlike PVC, FRP does not become brittle with age or UV exposure, and unlike aluminum, it cannot corrode. The dimensional stability of FRP over temperature cycles (-40\u00B0C to +80\u00B0C) is superior to PVC, maintaining seal compression and air-tightness throughout the life of the building.",
  },
];

export default function FenestrationSystemsPage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "Pultruded FRP Window Frames",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/window-door/frp-window-door-frame-80-series-tilt-turn.png",
          category: "FRP Window Frames and Fenestration Systems",
          material: ["E-glass roving", "Continuous strand mat", "Vinyl ester resin", "Isophthalic polyester resin"],
          additionalProperty: [
            { name: "Also known as", value: "FRP window profiles, pultruded fiberglass window frames, GRP window frames" },
            { name: "Series", value: "65 / 70 / 80 / 90 / 140" },
            { name: "Frame U-value", value: "From 0.78 W/m²·K (90-series)" },
            { name: "Certification", value: "PHI (Passive House Institute)" },
            { name: "Thermal conductivity", value: "0.3 W/m·K (vs aluminum 160 W/m·K)" },
          ],
        })}
      />
      <PageHeader
        tag="FRP Window Frames"
        title="Pultruded FRP Window Frames"
        description="Pultruded fiberglass window frames for passive house, low-energy, and extreme-climate buildings. Our 65/70/80/90/140-series fenestration systems deliver the thermal insulation, structural integrity, and dimensional stability that aluminum and PVC cannot match."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Fenestration Systems" },
        ]}
      />

      {/* Window & Door Frame Images */}
      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] grid-cols-2 md:grid-cols-5">
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/window-door/frp-window-frame-65-series-corner-section.webp"
                alt="FRP window frame 65-series corner cross-section showing dual-chamber insulation structure"
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="w-full rounded-[8px]"
                priority
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">65-Series</p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/window-door/frp-window-frame-70-series-corner-section.webp"
                alt="FRP window frame 70-series corner cross-section showing three-chamber insulation design"
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="w-full rounded-[8px]"
                priority
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">70-Series</p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/window-door/frp-window-door-frame-80-series-tilt-turn.png"
                alt="FRP window and door frame 80-series tilt and turn system"
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="w-full rounded-[8px]"
                priority
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">80-Series</p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/window-door/frp-window-frame-90-series-corner-section.webp"
                alt="FRP window frame 90-series corner cross-section for passive house fenestration"
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="w-full rounded-[8px]"
                priority
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">90-Series</p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/window-door/frp-window-door-frame-140-series-sliding.png"
                alt="FRP window and door frame 140-series sliding system"
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="w-full rounded-[8px]"
                priority
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">140-Series</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="max-w-[780px]">
            <p className="text-f19 leading-golden text-t2">
              <strong className="text-t1">FRP window frames</strong> are a generational
              advancement over aluminum and PVC. F1 Composite manufactures the pultruded
              fiberglass window profiles — frame, sash, mullion, transom, glazing bead — that
              fabricators assemble into complete window and door systems. Our profiles combine
              the structural strength, thermal insulation, and long-term dimensional stability
              that only fiber composites can deliver, reaching whole-window K-values as low as
              0.78 W/m{"\u00B2"}·K without the thermal break inserts, steel reinforcement, or
              multi-material laminations that aluminum and PVC require to approach similar
              performance.
            </p>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              The range covers five series — four tilt-and-turn frame depths (65, 70, 80,
              90) plus the 140-series lift-and-slide system — each matched to a specific
              performance tier, from residential renovation to Passivhaus and extreme-climate
              projects. Every profile is manufactured on our continuous pultrusion lines,
              ensuring dimensional consistency across production runs of tens of thousands of
              linear meters.
            </p>
          </div>
        </div>
      </section>

      {/* System Series */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>System Overview</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Tilt-and-turn frame series — 65 to 90
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            The four frame-depth tiers below are tilt-and-turn window and door systems. The
            140-series lift-and-slide system is documented separately on request.
          </p>

          <div className="mt-[34px] space-y-[21px]">
            {systemSeries.map((series) => (
              <div
                key={series.name}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <div className="flex flex-col gap-[13px] md:flex-row md:items-start md:gap-[34px]">
                  <div className="shrink-0">
                    <h3 className="text-[24px] font-extrabold text-teal-text">{series.name}</h3>
                    <div className="mt-[8px] space-y-[3px] text-f13 text-t2">
                      <p><span className="font-semibold text-t1">Frame depth:</span> {series.frameDepth}</p>
                      <p><span className="font-semibold text-t1">Chambers:</span> {series.chambers}</p>
                      <p><span className="font-semibold text-t1">K-value:</span> {series.kValue}</p>
                      <p><span className="font-semibold text-t1">Glass range:</span> {series.glassRange}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-f13 font-semibold text-teal-text">{series.applications}</p>
                    <p className="mt-[8px] text-f15 leading-golden text-t2">{series.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thermal Performance */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Thermal Performance</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Frame material thermal comparison
          </h2>
          <p className="mt-[13px] max-w-[560px] text-f15 leading-golden text-t2">
            The thermal conductivity of the frame material determines the baseline
            performance of the fenestration system. FRP delivers the best
            combination of structural strength and thermal insulation of any
            frame material available today.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Frame Material
                  </th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    K-frame (W/m{"\u00B2"}K)
                  </th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Conductivity (W/mK)
                  </th>
                </tr>
              </thead>
              <tbody>
                {thermalComparison.map((row) => (
                  <tr key={row.material} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">
                      {row.material}
                    </td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.kFrame}</td>
                    <td className="py-[13px] text-f15 text-t2">{row.conductivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Glass Configurations */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Glazing Options</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Glass configuration options
          </h2>
          <p className="mt-[13px] max-w-[560px] text-f15 leading-golden text-t2">
            Our fenestration systems are designed to accommodate a wide range of
            insulating glass unit configurations. The optimal glass specification
            depends on the system series, climate zone, and project energy targets.
          </p>

          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {glassConfigurations.map((config) => (
              <div
                key={config.name}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <h3 className="text-[17px] font-bold text-t1">{config.name}</h3>
                <div className="mt-[8px] space-y-[3px]">
                  <p className="text-f13 text-teal-text">
                    <span className="font-semibold">Structure:</span> {config.structure}
                  </p>
                  <p className="text-f13 text-teal-text">
                    <span className="font-semibold">K-center:</span> {config.kCenter}
                  </p>
                </div>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{config.description}</p>
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
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
              { href: "/products/standard-profiles", label: "Standard FRP profiles" },
              { href: "/products/gratings", label: "FRP gratings" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/construction", label: "Passive house construction" },
              { href: "/case-studies/fenestration-residential", label: "Residential tower case study" },
              { href: "/case-studies", label: "All case studies" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/technology/u-value-calculator", label: "Window U-value calculator" },
              { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum window frames" },
              { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC window frames" },
              { href: "/technology/quality-testing", label: "Quality testing (PHI / BS 476)" },
              { href: "/resources/design-guides", label: "Fenestration design guides" },
              { href: "/resources/downloads", label: "Data sheets & certificates" },
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
        prefill="I'm specifying FRP fenestration for a [residential/commercial/passive house] project in [climate zone / country]. Window types needed: [casement/sliding/fixed]. Target U-value [W/m²K]. Which series (65/70/80/90/140) fits, and what's the typical cost vs aluminum?"
      />

      <InnerCTA title="Specify FRP fenestration for your next building project" />
    </>
  );
}
