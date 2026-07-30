import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pagePath = "/technology/china-alternative-to-tencom-creative-pultrusions-windows";

export const metadata: Metadata = buildPageMetadata({
  title: "China Alternative to Tencom & Creative Pultrusions Windows",
  description:
    "F1-THERM pultruded fiberglass window profiles: a China alternative to Tencom, Creative Pultrusions and Inline — PHI-certified, EN 14351-1 / NAFS tested, DDP.",
  path: pagePath,
});

const comparisonRows: Array<{ dimension: string; f1: string; incumbents: string }> = [
  {
    dimension: "Window-profile specialization",
    f1: "Dedicated fenestration line (F1-THERM): 65/70/80/90/140-series frame, sash, mullion, transom, glazing bead",
    incumbents: "Tencom and Creative Pultrusions run fenestration lineals within broader custom-pultrusion programs; Inline supplies lineals alongside its own finished windows",
  },
  {
    dimension: "Resin systems for window profiles",
    f1: "Polyurethane (GFRP-PU) or vinyl ester standard on 90-series; polyester / vinyl ester on 65–80",
    incumbents: "Typically polyester / vinyl ester lineals; PU offerings vary by manufacturer",
  },
  {
    dimension: "Thermal certification",
    f1: "PHI Component Certificate 2491wi03 — U_w 0.78 W/m²·K, phA arctic class",
    incumbents: "Varies by system; certification is usually carried by the window fabricator, not the profile supplier",
  },
  {
    dimension: "Unit-level testing",
    f1: "EN 14351-1 (CE) and NAFS — AAMA/WDMA/CSA 101/I.S.2/A440 test reports ship with finished units",
    incumbents: "Profile suppliers generally leave unit testing to the fabricator",
  },
  {
    dimension: "Dimensional consistency",
    f1: "ASTM D3917 tolerances (±0.25 mm class), batch mill certificates, co-pultruded gasket channels for repeatable seal fit",
    incumbents: "Established pultruders hold comparable tolerance classes; verify per supplier and per die",
  },
  {
    dimension: "Supply models",
    f1: "Profile sets for fabricators, or complete factory-assembled, glazed, leak-tested units",
    incumbents: "Primarily profile/lineal supply (Tencom, Creative); Inline also sells finished windows in North America",
  },
  {
    dimension: "Sourcing model",
    f1: "Direct from the manufacturing factory, FOB or DDP export to 30+ countries",
    incumbents: "North-America-centric supply; export reach varies",
  },
];

const faqItems = [
  {
    question: "Is there a China-based alternative to Tencom fiberglass window profiles?",
    answer:
      "Yes. F1 Composite's F1-THERM fenestration line is a China-based alternative to Tencom's fiberglass window and door lineals. F1 pultrudes the full window profile set — frame, sash, mullion, transom, and glazing bead in 65/70/80/90/140-series frame depths — with co-pultruded EPDM gasket channels, and supplies either the profiles alone for local fabrication or complete factory-assembled units. Profiles are held to ASTM D3917 dimensional tolerances with batch mill certificates, and the 90-series system carries PHI Component Certificate 2491wi03 (U_w 0.78 W/m²·K).",
  },
  {
    question: "How does F1 Composite compare with Creative Pultrusions and Inline Fiberglass on window profiles?",
    answer:
      "Creative Pultrusions (part of Creative Composites Group, USA) and Inline Fiberglass (Canada) are established, capable manufacturers of fiberglass window lineals. F1 Composite supplies to the same pultrusion fundamentals — continuous E-glass reinforcement, thermoset matrix, heated-die forming — with two differences in emphasis: a dedicated fenestration system (rather than lineals within a broader custom program) that includes polyurethane-resin 90-series profiles certified by PHI at the phA arctic class, and a factory-direct export model on FOB or DDP terms rather than North-America-centric distribution.",
  },
  {
    question: "How consistent are Chinese pultruded window profiles across production runs?",
    answer:
      "Consistency is a fair concern when qualifying any new pultrusion supplier, and it should be verified with data rather than promised. F1 Composite holds window profiles to ASTM D3917 dimensional tolerance classes (±0.25 mm on critical dimensions), issues mill test certificates per production batch, and pultrudes gasket channels co-continuously with the profile so seal fit does not drift between runs. For qualification, we support third-party inspection (SGS/BV), pre-shipment dimensional reports against the die drawing, and staged orders — a first article run, then production volumes — so a fabricator can verify run-to-run repeatability on their own equipment before committing.",
  },
  {
    question: "What certifications back F1's window profiles compared to North American suppliers?",
    answer:
      "F1's fenestration system carries certification at both the component and the unit level: PHI Component Certificate 2491wi03 (whole-window U_w 0.78 W/m²·K, phA arctic climate class) on the 90-series frame, EN 14351-1 testing for CE marking, and NAFS (AAMA/WDMA/CSA 101/I.S.2/A440) testing for North American specification. Profile-level properties are characterized to EN ISO 10077-2 for thermal simulation. Most North American lineal suppliers leave unit-level certification to the window fabricator; F1 can supply either model — certified finished units, or profiles plus the simulation data a fabricator needs for its own certification path.",
  },
  {
    question: "Why source fiberglass window profiles from China instead of a North American pultruder?",
    answer:
      "The case is specification-parity at factory-direct economics, plus system depth: a complete five-series fenestration profile family (65–140 mm frame depths) from one supplier, polyurethane-resin profiles where the performance tier demands it, PHI/EN 14351-1/NAFS certification already in place, and export on FOB or DDP terms with duty pre-itemized. For fabricators, that means one qualified source for the whole window system rather than assembling lineals, gaskets, and simulation data from separate suppliers. North American pultruders remain the right choice where local content rules, short freight, or existing die ownership dominate the decision.",
  },
];

export default function ChinaAlternativeWindowsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Technology", item: absoluteUrl("/technology") },
      {
        "@type": "ListItem",
        position: 3,
        name: "China Alternative to Tencom & Creative Pultrusions Window Profiles",
        item: absoluteUrl(pagePath),
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PageHeader
        tag="Comparison · F1-THERM"
        title="China alternative to Tencom, Creative Pultrusions & Inline window profiles"
        description="F1 Composite's F1-THERM fenestration line is a standards-equivalent, factory-direct China alternative to the established North American fiberglass window lineal suppliers — with PHI component certification, EN 14351-1 and NAFS unit testing, and both profile-set and finished-unit supply models."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "China Alternative — Window Profiles" },
        ]}
      />

      {/* Positioning intro */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The positioning</SectionTag>
          <h2 className="mt-[13px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Same pultrusion fundamentals, a deeper window system, factory-direct
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Tencom (Ohio, USA), Creative Pultrusions (part of Creative Composites
            Group, USA), and Inline Fiberglass (Toronto, Canada) are the names
            North American window fabricators know for pultruded fiberglass
            lineals. They are capable manufacturers — and they work from the same
            physics that{" "}
            <Link href="/products/frp-window-frames" className="font-semibold text-teal-text hover:text-teal">
              F1 Composite&apos;s fiberglass window profiles
            </Link>{" "}
            are built on: continuous E-glass reinforcement in a thermoset matrix,
            conductivity ≈ 0.3 W/m·K, and the dimensional stability that lets a
            frame move with its glass instead of against it.
          </p>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            The reason fabricators evaluate a China alternative is usually not
            the material — it is system depth and route to market. F1 supplies a
            complete five-series fenestration family (65–140 mm frame depths)
            including{" "}
            <Link href="/technology/polyurethane-pultrusion-windows" className="font-semibold text-teal-text hover:text-teal">
              polyurethane (GFRP-PU) profiles
            </Link>{" "}
            on the performance tier, with PHI component certification and EN
            14351-1 / NAFS unit testing already in place, shipped factory-direct
            on FOB or DDP terms — and offers both supply models: profiles for
            your fabrication line, or complete factory-assembled units.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Side by side</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            F1-THERM vs the North American lineal suppliers
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            A fair, specification-level comparison. Where a competitor detail
            varies by program or die, it is described rather than asserted —
            verify per supplier during qualification.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Dimension</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-teal-text">F1 Composite (F1-THERM)</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Tencom · Creative Pultrusions · Inline</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.dimension} className="border-b border-border-default align-top">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{row.dimension}</td>
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-teal-text">{row.f1}</td>
                    <td className="py-[13px] text-f15 text-t2">{row.incumbents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-[21px] text-f13 text-t3">
            For the frame-material comparison behind these systems, see{" "}
            <Link href="/technology/frp-vs-aluminum-windows" className="font-semibold text-teal-text hover:text-teal">
              FRP vs aluminum
            </Link>{" "}
            and{" "}
            <Link href="/technology/frp-vs-pvc-windows" className="font-semibold text-teal-text hover:text-teal">
              FRP vs PVC window frames
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[21px] text-f19 font-bold text-t1">Verify the equivalence</h2>
          <div className="flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/frp-window-frames">Fiberglass windows &amp; doors (65–140 series)</LinkArrow>
            <LinkArrow href="/technology/polyurethane-pultrusion-windows">Polyurethane pultrusion windows (GFRP-PU)</LinkArrow>
            <LinkArrow href="/technology/frp-u-value-calculator">Window U-value calculator</LinkArrow>
            <LinkArrow href="/technology/quality-testing">Quality testing (EN 13706 / ASTM)</LinkArrow>
            <LinkArrow href="/regions/frp-passive-house-windows-canada">FRP passive house windows — Canada</LinkArrow>
            <LinkArrow href="/resources/technical-data">Technical data &amp; test reports</LinkArrow>
          </div>
        </div>
      </section>

      <AnswerBlocks
        tag="China alternative FAQ"
        title="China alternative to Tencom, Creative Pultrusions & Inline — window profile FAQ"
        description="Specification-level answers for window fabricators and procurement teams evaluating a China-based fiberglass window profile supplier against the North American incumbents."
        items={faqItems}
      />

      <InnerCTA title="Qualifying a window-profile supplier? Send your die drawing or spec for a like-for-like quote." />
    </>
  );
}
