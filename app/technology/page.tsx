import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import CoverCard from "@/components/ui/CoverCard";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import InnerCTA from "@/components/sections/InnerCTA";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { coverFor } from "@/lib/covers";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pultrusion Technology & FRP Engineering Know-How",
  description:
    "Technical resources for specifiers: the pultrusion process, FRP compared with steel and aluminum, resin selection, and quality testing to EN 13706 and ASTM.",
  path: "/technology",
  image: "/technology/opengraph-image",
});

const areas = [
  {
    tag: "Performance",
    title: "Pultruded profile performance",
    description:
      "Dimensions, physical and mechanical properties, thermal behavior, electrical insulation, fire and chemical resistance: specify the test methods, conditions and supporting evidence for your profile.",
    href: "/technology/pultruded-profile-performance",
  },
  {
    tag: "Process",
    title: "The pultrusion process",
    description:
      "Continuous manufacturing of constant-cross-section FRP profiles through fiber reinforcement, resin impregnation, heated die forming, and precision pulling. Our lines deliver repeatable mechanical properties at industrial throughput.",
    href: "/technology/pultrusion-process",
  },
  {
    tag: "Materials",
    title: "FRP vs traditional materials",
    description:
      "How FRP compares with steel, aluminum, timber and concrete on weight, corrosion, insulation and stiffness, property by property, with the limits of each.",
    href: "/technology/frp-vs-traditional-materials",
  },
  {
    tag: "Evidence",
    title: "Fiberglass rebar vs steel",
    description:
      "Compare GFRP and steel reinforcement using FHWA, MnDOT, university-lab and ASTM evidence on tensile behavior, stiffness, corrosion, cracking and lifecycle cost.",
    href: "/technology/fiberglass-rebar-vs-steel",
  },
  {
    tag: "Materials",
    title: "Pultrusion resin systems",
    description:
      "Polyester, vinyl ester, polyurethane, epoxy, or phenolic? The resin matrix decides corrosion, fire, and temperature behavior. Compare all five systems with an interactive selection matrix and typical property ranges.",
    href: "/technology/pultrusion-resin-systems",
  },
  {
    tag: "Materials",
    title: "Polyurethane pultrusion windows",
    description:
      "GFRP-PU window frame technology: why polyurethane resin outperforms polyester on cross-fiber strength, thin walls, and deep-cold toughness, the chemistry behind our PHI-certified 90-series and the Qinling Antarctic windows.",
    href: "/technology/polyurethane-pultrusion-windows",
  },
  {
    tag: "Quality",
    title: "Quality and testing",
    description:
      "Match test reports and certificates to the product you are buying, and agree the inspection records for the order.",
    href: "/technology/quality-testing",
  },
  {
    tag: "Services",
    title: "Know-how and services",
    description:
      "From consulting engagements to full turnkey pultrusion line installations, our engineering team transfers decades of composite manufacturing expertise to your operation.",
    href: "/technology/knowhow-services",
  },
  {
    tag: "Tool",
    title: "FRP profile calculator",
    description:
      "Check beam deflection and bending stress, and find FRP sections to compare with a steel or aluminum member.",
    href: "/frp-profile-calculator",
  },
  {
    tag: "Tool",
    title: "Window U-value calculator",
    description:
      "Calculate whole-window thermal transmittance (Uw) per EN ISO 10077-1. Compare FRP, aluminum, PVC, and timber frames with double, triple, and quadruple glazing.",
    href: "/technology/frp-u-value-calculator",
  },
];

export default function TechnologyPage() {
  const technologySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Technology",
    url: absoluteUrl("/technology"),
    hasPart: areas.map((area) => ({
      "@type": "TechArticle",
      headline: area.title,
      description: area.description,
      url: absoluteUrl(area.href),
    })),
  };

  return (
    <>
      <JsonLd data={technologySchema} />
      <PageHeader
        tag="Technology"
        title="Pultrusion technology and engineering data"
        description="How pultruded FRP is made, how it compares with steel, aluminum and concrete, which resin to choose, and how to specify and test a profile, with the calculators that go with them."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology" },
        ]}
      />

      <PageSection
        id="areas"
        title="Pultrusion engineering resources"
        count={`${areas.length - 2} guides`}
        intro="Process control sets the material properties, testing confirms them, and the know-how transfer programs pass the method on to other producers."
      >
        <ul className="grid grid-cols-2 gap-[12px] lg:grid-cols-4 lg:gap-[16px]">
          {areas.filter((area) => area.tag !== "Tool").map((area, index) => {
            const cover = coverFor(area.href);
            return cover ? (
              <li key={area.href}>
                <CoverCard href={area.href} cover={cover} label={<span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{area.tag}</span>} title={area.title} text={area.description} action="Read the guide" priority={index < 3} compact sizes="(max-width: 1023px) 46vw, 290px" />
              </li>
            ) : null;
          })}
        </ul>
        <h3 className="mt-[40px] text-f20 font-bold text-t1">Calculators</h3>
        <ul className="mt-[16px] grid grid-cols-1 gap-[12px] md:grid-cols-2">
          {areas.filter((area) => area.tag === "Tool").map((area) => (
            <li key={area.href}>
              <CalculatorCTA href={area.href} eyebrow="Free tool" title={area.title} sub={area.description} />
            </li>
          ))}
        </ul>
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          {
            title: "Product references",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/fiberglass-structural-shapes", label: "Standard FRP structural profiles" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions" },
              { href: "/products/frp-window-frames", label: "FRP window frames" },
              { href: "/products/frp-gratings", label: "Pultruded FRP grating" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
              { href: "/products/molded-frp-grating", label: "Molded FRP grating" },
            ],
          },
          {
            title: "Deeper technical reading",
            links: [
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
              { href: "/technology/pultrusion-process", label: "Pultrusion process (6 stages)" },
              { href: "/technology/pultrusion-resin-systems", label: "Resin systems: polyester vs vinyl ester vs PU" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum, concrete" },
              { href: "/technology/fiberglass-rebar-vs-steel", label: "Fiberglass rebar vs steel (test data)" },
              { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum window frames" },
              { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC window frames" },
              { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion windows (GFRP-PU)" },
              { href: "/technology/frp-vs-steel-gratings", label: "FRP vs steel gratings" },
              { href: "/technology/quality-testing", label: "Quality testing (EN 13706 / ASTM)" },
              { href: "/resources/design-guides", label: "Engineering design guides" },
              { href: "/resources/blog/engineers-most-asked-questions-pultruded-frp", label: "10 questions engineers ask before specifying FRP" },
              { href: "/resources/blog/thermoset-frp-recycling-breakthrough", label: "Recycling thermoset FRP by chemical recovery" },
              { href: "/resources/blog/pultrusion-industry-trends-2026", label: "Pultrusion industry trends 2026" },
            ],
          },
          {
            title: "Applications & proof",
            links: [
              { href: "/industries", label: "All industries served" },
              { href: "/case-studies", label: "Case studies (30+ countries)" },
              { href: "/resources/blog", label: "Engineering blog" },
              { href: "/resources/technical-data", label: "Technical data sheets" },
              { href: "/ask", label: "Ask the AI engineering assistant" },
            ],
          },
        ]}
      />

      <AnswerBlocks
        title="FRP engineering: short technical answers"
        description="Concise, citation-ready responses to the questions our engineering team is asked most often. For deeper context, see the pultrusion process, FRP vs traditional materials, and quality testing pages."
        items={[
          {
            question: "What design code governs pultruded FRP structures?",
            answer:
              "In North America, ASCE/SEI 74-23 (Pre-Standard for LRFD of Pultruded FRP Structures) is the primary reference. In Europe, EN 13706-1/2/3 defines grades E17 and E23 and test methods. Additional references include the EUROCOMP Design Code and ACI 440 guidelines for FRP rebar.",
          },
          {
            question: "What tolerance can pultrusion achieve?",
            answer:
              "Cross-section tolerances follow the profile standard, EN 13706-2 or ASTM D3917, by dimension and wall thickness; straightness and twist are specified per meter of length. The tolerances for an order are those on the approved drawing, checked by dimensional inspection of the production run.",
          },
          {
            question: "What fiber content is typical in pultruded FRP?",
            answer:
              "45–65% glass fiber by weight in general structural profiles, verified by burn-off testing per ASTM D2584. Unidirectional-dominant sections (e.g. flat bar, rod) can reach 70% glass for maximum stiffness-to-weight.",
          },
          {
            question: "What is the typical elastic modulus of pultruded FRP?",
            answer:
              "Longitudinal elastic modulus is 17–28 GPa for E-glass/polyester pultruded profiles, compared with 200 GPa for steel and 69 GPa for aluminum. Because modulus is lower, deflection (L/360 limit) typically governs FRP design rather than strength.",
          },
          {
            question: "How are FRP profiles connected on site?",
            answer:
              "Bolted connections (stainless steel A2/A4 or FRP bolts) are most common, with minimum edge distance 4× bolt diameter and torque M12 = 20–30 Nm. Adhesive bonding (methacrylate or epoxy) or hybrid bolted-bonded joints are used for load-critical connections. No welding: thermoset FRP cannot be welded or heated.",
          },
          {
            question: "What fire performance can FRP achieve?",
            answer:
              "Standard polyester FRP is not fire-retardant. Fire-retardant resin systems are used where a surface-burning class such as ASTM E84 Class 1 is required, and phenolic profiles where low smoke and toxicity matter, as in rail interiors under EN 45545-2. Fire reports are issued for a specified formulation and profile, so name the classification your project needs.",
          },
        ]}
      />

      <InnerCTA title="Need technical guidance for your FRP project?" />
    </>
  );
}
