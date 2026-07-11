import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "Polyurethane Pultrusion Windows — GFRP-PU Frame Guide";
const pageDescription =
  "What GFRP-PU polyurethane pultrusion windows are, why PU resin frames outperform polyester on strength and thin walls, and how F1 supplies them.";
const pagePath = "/technology/polyurethane-pultrusion-windows";
const publishedAt = "2026-07-07";
const updatedAt = "2026-07-07";
const authorName = "F1 Composite Fenestration Engineering Team";
const authorRole = "Polyurethane pultrusion process, window system design, and U-value modeling specialists";
const reviewedBy = "Technical Applications Group";
const referencedStandards = ["EN 14351-1", "EN ISO 10077-1", "EN ISO 10077-2", "PHI Component Criteria (2491wi03)"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

interface ResinRow {
  property: string;
  pu: string;
  vinylester: string;
  polyester: string;
  puBetter?: boolean;
}

const resinComparison: ResinRow[] = [
  {
    property: "Transverse (cross-fiber) strength",
    pu: "Highest — tough matrix bonds fibers in every direction",
    vinylester: "Good",
    polyester: "Baseline — weakest across the fiber",
    puBetter: true,
  },
  {
    property: "Achievable glass content",
    pu: "Up to ~80% by weight",
    vinylester: "~65–75%",
    polyester: "~60–70%",
    puBetter: true,
  },
  {
    property: "Minimum practical wall thickness",
    pu: "~2 mm — slimmer sightlines, lighter sash",
    vinylester: "~3 mm",
    polyester: "~3 mm",
    puBetter: true,
  },
  {
    property: "Impact toughness at −40°C",
    pu: "Highest — PU stays ductile in deep cold",
    vinylester: "Good",
    polyester: "Adequate",
    puBetter: true,
  },
  {
    property: "Screw / hardware pull-out retention",
    pu: "Highest — critical for multi-point locking hardware",
    vinylester: "Good",
    polyester: "Adequate",
    puBetter: true,
  },
  {
    property: "Styrene emission in processing",
    pu: "None — closed injection box, styrene-free chemistry",
    vinylester: "Styrene-based",
    polyester: "Styrene-based",
    puBetter: true,
  },
  {
    property: "Thermal conductivity",
    pu: "≈ 0.3 W/m·K",
    vinylester: "≈ 0.3 W/m·K",
    polyester: "≈ 0.3 W/m·K",
  },
  {
    property: "Relative profile cost",
    pu: "Highest of the three",
    vinylester: "Mid",
    polyester: "Lowest",
    puBetter: false,
  },
];

const faqs = [
  {
    question: "What are polyurethane pultrusion windows?",
    answer:
      "Polyurethane pultrusion windows are windows whose frame and sash profiles are pultruded from continuous glass fiber and a polyurethane (PU) resin matrix instead of the conventional polyester or vinyl ester resin. The material is abbreviated GFRP-PU (glass-fiber-reinforced polyurethane), sometimes written GFRPU or PU fiberglass. The pultrusion process is the same continuous pull-through-a-heated-die method used for all FRP profiles; the difference is the resin chemistry, which is injected into a closed box rather than picked up in an open bath. The result is a window profile with higher cross-fiber strength, higher achievable glass content, and thinner walls than a standard polyester pultrusion — while keeping the ~0.3 W/m·K thermal conductivity that makes fiberglass frames insulate roughly 500× better than aluminum.",
  },
  {
    question: "What does GFRP-PU (or GFRPU) stand for?",
    answer:
      "GFRP-PU stands for glass-fiber-reinforced polymer with a polyurethane matrix. You will see the same material written GFRPU, PU-FRP, or PU fiberglass in specifications — they all refer to pultruded profiles where continuous E-glass reinforcement is bonded by polyurethane resin. In fenestration, a 'GFRPU fixed window system' or 'GFRP-PU tilt-and-turn window' simply means the frame, sash, mullion, and transom profiles are polyurethane pultrusions. F1 Composite's severe-cold window references — including the Qinling Station Antarctic installation and the Wanhua Yantai zero-carbon community — are GFRP-PU systems.",
  },
  {
    question: "How is polyurethane pultrusion different from polyester or vinyl ester pultrusion?",
    answer:
      "Three practical differences drive window design. First, strength across the fiber direction: PU's tougher matrix gives the profile markedly higher transverse and interlaminar strength, which is what resists screw pull-out at hinges and multi-point locks, and corner-joint stress in an assembled sash. Second, wall thickness: because the matrix is tougher, PU profiles can be pultruded with walls down to roughly 2 mm and glass content up to about 80% by weight — slimmer sightlines and lighter sash for the same stiffness. Third, processing: PU is injected in a closed die box with styrene-free chemistry. The trade-off is cost — PU resin systems price above polyester and vinyl ester, which is why F1 reserves them for performance-critical fenestration rather than commodity structural profiles.",
  },
  {
    question: "Who supplies polyurethane pultruded window profiles?",
    answer:
      "A small group of pultruders worldwide run polyurethane window lines, because PU requires dedicated closed-injection equipment and tighter process control than open-bath polyester. F1 Composite manufactures GFRP-PU window profiles on its own continuous pultrusion lines in Chongqing, China, and supplies them two ways: as profile sets — window lineals, in North American trade terms (frame, sash, mullion, transom, glazing bead, with EPDM gasketing and fabrication drawings) — for local window fabricators, or as complete factory-assembled, glazed, and leak-tested window and door units delivered DDP. The same GFRP-PU profile set sits behind our PHI Component Certificate 2491wi03 (U_w 0.78 W/m²·K, phA arctic class).",
  },
  {
    question: "Are polyurethane pultrusion windows suitable for Passive House projects?",
    answer:
      "Yes — they are one of the few frame technologies certified at the coldest Passive House component class. F1's 90-series GFRP-PU frame holds PHI Component Certificate 2491wi03 at U_w 0.78 W/m²·K in the phA (arctic) climate class, and the same system is installed at Qinling Station in Antarctica against a −60°C design low. Because the polyurethane matrix keeps its impact strength in deep cold and the profile needs no steel reinforcement, the frame carries no metallic thermal bridge — the failure point that limits aluminum and steel-reinforced PVC frames in passive house detailing.",
  },
  {
    question: "Do polyurethane pultrusion windows cost more than standard FRP windows?",
    answer:
      "At the profile level, yes: polyurethane resin systems are the most expensive of the three common pultrusion matrices, above vinyl ester and polyester. At the installed-window level the gap narrows, because PU's thinner walls use less material per meter, the sash needs no steel reinforcement, and the higher hardware pull-out strength simplifies corner and lock detailing. For projects where the driver is certified passive-house performance, deep-cold durability, or slim sightlines, the PU premium is typically small against the whole-window cost, which is dominated by glazing and hardware. For budget-driven projects in mild climates, a polyester or vinyl ester FRP frame — or PVC — remains the economical choice.",
  },
];

export default function PolyurethanePultrusionWindowsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pageTitle,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@type": "Organization", name: authorName },
    editor: { "@type": "Organization", name: reviewedBy },
    publisher: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/f1-logo.png") },
    },
    description: pageDescription,
    mainEntityOfPage: absoluteUrl(pagePath),
    about: [
      { "@type": "Thing", name: "Polyurethane pultrusion windows" },
      { "@type": "Thing", name: "GFRP-PU window profiles" },
      { "@type": "Thing", name: "Glass fiber reinforced polyurethane" },
      { "@type": "Thing", name: "Pultruded fiberglass window frames" },
    ],
    citation: referencedStandards,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <PageHeader
        tag="Material Technology"
        title="Polyurethane Pultrusion Windows (GFRP-PU)"
        description="Why polyurethane resin is displacing polyester in high-performance pultruded fiberglass window frames: higher cross-fiber strength, thinner walls, deep-cold toughness — and the certified passive-house results it delivers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Polyurethane Pultrusion Windows" },
        ]}
      />

      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName={authorName}
        authorRole={authorRole}
        reviewedBy={reviewedBy}
        standards={referencedStandards}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The Short Answer</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-f24 font-bold text-t1 md:text-f31">
            Same pultrusion process, tougher matrix — the frame technology behind arctic-class windows
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            A polyurethane pultrusion window uses the same continuous pultruded-fiberglass frame concept as any FRP window — but replaces the conventional polyester or vinyl ester resin with a polyurethane (PU) matrix, injected into a closed die box. The PU matrix bonds the glass fibers with far greater toughness across the fiber direction, which is exactly where window profiles are stressed: at screw fixings, corner joints, and multi-point lock keeps. That lets a GFRP-PU profile carry more glass fiber (up to roughly 80% by weight), run thinner walls (down to about 2 mm), and keep its impact strength at −40°C and below.
          </p>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            F1 Composite manufactures GFRP-PU window profiles as standard for its 90-series fenestration system — the frame behind PHI Component Certificate 2491wi03 (U_w 0.78 W/m²·K, phA arctic class) and the windows installed at Qinling Station, Antarctica. This page explains what the PU chemistry changes, when it is worth the premium, and how the profiles are supplied.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Resin Comparison</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Polyurethane vs vinyl ester vs polyester in a pultruded window profile
          </h2>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            All three matrices produce an insulating fiberglass frame at ≈ 0.3 W/m·K conductivity. The differences show up in mechanical performance and manufacturability. Highlighted rows show where polyurethane leads.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-border-default bg-bg2">
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Property</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Polyurethane (GFRP-PU)</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Vinyl ester</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Polyester</th>
                </tr>
              </thead>
              <tbody>
                {resinComparison.map((row) => (
                  <tr
                    key={row.property}
                    className={`border-b border-border-default ${row.puBetter ? "bg-teal/5" : ""}`}
                  >
                    <td className="px-[13px] py-[13px] font-medium text-t1">{row.property}</td>
                    <td className={`px-[13px] py-[13px] ${row.puBetter ? "font-semibold text-teal-text" : "text-t2"}`}>
                      {row.pu}
                    </td>
                    <td className="px-[13px] py-[13px] text-t2">{row.vinylester}</td>
                    <td className="px-[13px] py-[13px] text-t2">{row.polyester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[13px] text-f13 leading-golden text-t3">
            Figures are typical ranges for continuous E-glass pultrusion; exact values depend on fiber architecture and profile geometry. F1 runs 90-series window profiles in polyurethane or vinyl ester as standard, and polyester or vinyl ester for the 65/70/80-series where the mechanical demand allows.
          </p>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Where It Is Proven</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-f24 font-bold text-t1 md:text-f31">
            Three GFRP-PU window installations, from the Antarctic to production residential
          </h2>
          <div className="mt-[34px] max-w-[860px] space-y-[21px]">
            <Link
              href="/case-studies/qinling-station-antarctic-passive-windows"
              className="group block rounded-[8px] border border-border-default bg-bg2 p-[34px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-[17px] font-bold text-t1">Qinling Station, Antarctica — −60°C design low</h3>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                90-series GFRP-PU passive windows certified to PHI Component-ID 2491wi03 at the phA arctic class, factory-assembled and leak-tested before a single-summer Antarctic installation window, against 45 m/s katabatic winds.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text">Read the case study →</span>
            </Link>
            <Link
              href="/case-studies/chemical-plant-platform"
              className="group block rounded-[8px] border border-border-default bg-bg2 p-[34px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-[17px] font-bold text-t1">Baotou Industrial Park — −25°C plus chemical exposure</h3>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                70/80/90-series GFRP-PU windows on a severe-cold-zone manufacturing campus, chosen to beat an aluminum thermal-bridge penalty while resisting acid mist and chloride aerosol without a recoating cycle.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text">Read the case study →</span>
            </Link>
            <Link
              href="/case-studies/fenestration-residential"
              className="group block rounded-[8px] border border-border-default bg-bg2 p-[34px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-[17px] font-bold text-t1">Wanhua Yantai Zero-Carbon Community — 13,657 m² of GFRP-PU fenestration</h3>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                Verified whole-window U_w 0.99 W/m²·K and N50 = 1.0 air changes on a near-zero-energy residential development — passive-house air-tightness delivered at production scale with polyurethane pultrusion frames.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text">Read the case study →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>How To Buy</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-f24 font-bold text-t1 md:text-f31">
            Profiles for your fabrication line, or finished GFRP-PU units
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            F1 supplies polyurethane pultruded window profiles the same two ways as the rest of the{" "}
            <Link href="/products/fenestration-systems" className="text-teal-text hover:underline">
              fenestration range
            </Link>
            : as a profile set — frame, sash, mullion, transom, and glazing bead with co-extruded EPDM gasketing, corner kits, and fabrication drawings — for window fabricators who assemble locally, or as complete factory-assembled units, glazed, hardware-fitted, and leak-tested before shipment, delivered DDP with duty pre-itemized. The profiles are identical in both models; only the assembly location changes.
          </p>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqs} suppressSchema />
        </div>
      </section>

      <section className="bg-bg2 pt-[55px] pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <CalculatorCTA
            href="/technology/u-value-calculator?frame=frp-90&glass=tg-kr&spacer=warm-premium&type=casement&w=1200&h=1400"
            eyebrow="Free tool · GFRP-PU 90-Series preset"
            title="Check the whole-window U-value of a GFRP-PU 90-Series window"
            sub="Opens the U-value calculator pre-loaded with the PHI-certified 90-Series polyurethane frame and triple glazing — see the EN ISO 10077-1 Uw and the pass/fail against Passive House, ENERGY STAR, CSA, and GB targets."
          />
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "FRP fenestration products",
            links: [
              { href: "/products/fenestration-systems", label: "Fiberglass windows & doors (65–140 series)" },
              { href: "/products/custom-pultrusions", label: "Custom pultruded window profiles" },
              { href: "/technology/u-value-calculator", label: "U-value calculator (EN ISO 10077-1)" },
              { href: "/technology/pultrusion-process", label: "The pultrusion process explained" },
            ],
          },
          {
            title: "Material comparisons",
            links: [
              { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum window frames" },
              { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC window frames" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum, concrete" },
            ],
          },
          {
            title: "Deeper reading",
            links: [
              { href: "/resources/blog/frp-fenestration-passivhaus-certification", label: "Blog: Passivhaus certification path" },
              { href: "/resources/blog/frp-fenestration-thermal-performance", label: "Blog: Thermal performance of FRP fenestration" },
              { href: "/regions/frp-passive-house-windows-canada", label: "FRP passive house windows — Canada" },
              { href: "/regions/frp-passive-house-windows-germany", label: "FRP passive house windows — Germany" },
            ],
          },
        ]}
      />

      <InnerCTA title="Specify GFRP-PU polyurethane pultrusion windows for your project" />
    </>
  );
}
