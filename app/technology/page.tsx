import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import RelatedLinks from "@/components/sections/RelatedLinks";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pultrusion Technology & FRP Engineering Know-How",
  description:
    "Pultrusion manufacturing process, FRP vs steel comparison, quality testing to EN 13706 & ASTM standards, and composite material engineering expertise. Technical resources for engineers.",
  path: "/technology",
  image: "/technology/opengraph-image",
});

const areas = [
  {
    tag: "Process",
    title: "Pultrusion Process",
    description:
      "Continuous manufacturing of constant-cross-section FRP profiles through fiber reinforcement, resin impregnation, heated die forming, and precision pulling. Our lines deliver repeatable mechanical properties at industrial throughput.",
    href: "/technology/pultrusion-process",
  },
  {
    tag: "Materials",
    title: "FRP vs Traditional Materials",
    description:
      "Fiber-reinforced polymers outperform steel, aluminium, timber, and concrete across weight, corrosion resistance, electrical insulation, and lifecycle cost. See the full property-by-property comparison.",
    href: "/technology/frp-vs-traditional-materials",
  },
  {
    tag: "Quality",
    title: "Quality & Testing",
    description:
      "ISO 9001 certified production with EN 13706 and ASTM compliance. Every profile undergoes tensile, flexural, impact, and Barcol hardness testing before shipment.",
    href: "/technology/quality-testing",
  },
  {
    tag: "Services",
    title: "Know-How & Services",
    description:
      "From consulting engagements to full turnkey pultrusion line installations, our engineering team transfers decades of composite manufacturing expertise to your operation.",
    href: "/technology/knowhow-services",
  },
  {
    tag: "Tool",
    title: "FRP Profile Calculator",
    description:
      "Calculate beam deflection, bending stress, and find equivalent FRP replacements for steel and aluminium sections. EN 13706 and ASTM compliant.",
    href: "/technology/calculator",
  },
  {
    tag: "Tool",
    title: "Window U-Value Calculator",
    description:
      "Calculate whole-window thermal transmittance (Uw) per EN ISO 10077-1. Compare FRP, aluminium, PVC, and timber frames with double, triple, and quadruple glazing.",
    href: "/technology/u-value-calculator",
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
        title="Engineering Excellence in Pultruded Composites"
        description="We combine advanced pultrusion process control, rigorous material science, and decades of application engineering to deliver FRP profiles that outperform traditional materials in the most demanding environments."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/technology/frp-profile-engineering-drawing-3d-render.jpg"
              alt="Pultruded FRP profile with engineering cross-section drawings showing dimensional tolerances and 3D render"
              width={1280}
              height={640}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-contain bg-white"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Technology Areas</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Four Pillars of Our Technical Capability
          </h2>
          <p className="mt-[13px] max-w-[800px] text-f15 leading-golden text-t2">
            Each discipline reinforces the others — precise process control enables
            superior material performance, validated by comprehensive testing, and
            made accessible through our know-how transfer programs.
          </p>

          <div className="mt-[55px] grid gap-[21px] sm:grid-cols-2">
            {areas.map((area) => (
              <div
                key={area.href}
                className="group relative overflow-hidden rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:border-teal-border"
              >
                <div className="card-topbar absolute left-0 right-0 top-0" />
                <SectionTag>{area.tag}</SectionTag>
                <h3 className="mt-[13px] text-f24 font-bold text-t1">
                  {area.title}
                </h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">
                  {area.description}
                </p>
                <div className="mt-[21px]">
                  <LinkArrow href={area.href}>Learn more</LinkArrow>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Product references",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/standard-profiles", label: "Standard FRP structural profiles" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusions" },
              { href: "/products/fenestration-systems", label: "FRP window frames" },
              { href: "/products/gratings", label: "FRP gratings & deck panels" },
            ],
          },
          {
            title: "Deeper technical reading",
            links: [
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
              { href: "/technology/pultrusion-process", label: "Pultrusion process (6 stages)" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum, concrete" },
              { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum window frames" },
              { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC window frames" },
              { href: "/technology/frp-vs-steel-gratings", label: "FRP vs steel gratings" },
              { href: "/technology/quality-testing", label: "Quality testing (EN 13706 / ASTM)" },
              { href: "/resources/design-guides", label: "Engineering design guides" },
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
        tag="Engineering quick answers"
        title="FRP engineering — short technical answers"
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
              "Dimensional tolerance is typically ±0.25 mm on cross-section (EN 13706 / ASTM D3917), straightness 1.5 mm/m, and twist 2°/m. F1 Composite verifies every production run with SPC monitoring and dimensional inspection per ASTM D3917.",
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
              "Bolted connections (stainless steel A2/A4 or FRP bolts) are most common, with minimum edge distance 4× bolt diameter and torque M12 = 20–30 Nm. Adhesive bonding (methacrylate or epoxy) or hybrid bolted-bonded joints are used for load-critical connections. No welding — thermoset FRP cannot be welded or heated.",
          },
          {
            question: "What fire performance can FRP achieve?",
            answer:
              "Standard polyester FRP is self-extinguishing (UL 94 V-0). With fire-retardant additives, FRP achieves ASTM E84 Class I surface burning. Phenolic-resin pultruded profiles achieve Class 1 surface spread of flame (BS 476 Part 7), low smoke, and low toxicity — qualified for rail interiors per EN 45545-2 and offshore applications.",
          },
        ]}
      />

      <InnerCTA title="Need technical guidance for your FRP project?" />
    </>
  );
}
