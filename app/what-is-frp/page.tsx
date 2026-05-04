import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import AskAICard from "@/components/ai/AskAICard";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { prefillForWhatIsFRP } from "@/lib/aiPrefill";

const pageTitle =
  "What is FRP? Complete Guide to Fiberglass Reinforced Polymer Composites";
const pageDescription =
  "FRP (fiberglass reinforced polymer) composites explained — materials, pultrusion process, properties, standards (EN 13706, ASTM D3917), applications, and how advanced composites compare with steel and aluminum.";
const pagePath = "/what-is-frp";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const toc = [
  { id: "definition", label: "What is FRP?" },
  { id: "terminology", label: "FRP vs GRP vs composites" },
  { id: "components", label: "Materials and composition" },
  { id: "pultrusion", label: "How pultruded FRP is made" },
  { id: "properties", label: "Mechanical & physical properties" },
  { id: "advantages", label: "Advantages over steel and aluminum" },
  { id: "limitations", label: "Limitations and design considerations" },
  { id: "standards", label: "Standards and certification" },
  { id: "applications", label: "Advanced composites applications" },
  { id: "faq", label: "FAQ" },
];

const faqItems = [
  {
    question: "What does FRP stand for?",
    answer:
      "FRP stands for Fiber Reinforced Polymer (sometimes written Fibre Reinforced Plastic). It refers to a composite material made of a polymer matrix — typically polyester, vinyl ester, polyurethane, epoxy, or phenolic resin — reinforced with high-strength fibers, most commonly E-glass. FRP is also called GRP (Glass Reinforced Polymer) in British and European usage.",
  },
  {
    question: "Is FRP the same as fiberglass?",
    answer:
      "Fiberglass is the reinforcement material (glass fiber) used inside FRP composites. Everyday use often treats 'fiberglass' and 'FRP' as synonymous, but strictly speaking fiberglass is the raw fiber and FRP is the finished composite that combines fiberglass with a polymer resin. A fiberglass I-beam is therefore a pultruded FRP I-beam made with E-glass reinforcement.",
  },
  {
    question: "Are FRP composites considered advanced composites?",
    answer:
      "Yes. Pultruded FRP profiles are classified as advanced composites because they use engineered fiber architectures (unidirectional roving, continuous strand mat, woven fabric) and controlled fiber-volume fractions of 60–70%. Advanced composites are distinguished from short-fiber or filled plastics by their tailored directional properties and structural-grade mechanical performance.",
  },
  {
    question: "Is FRP stronger than steel?",
    answer:
      "Pultruded FRP has tensile strength of 240–400 MPa, comparable to A36 structural steel (400 MPa), but at about one quarter of the weight. Per kilogram, FRP is significantly stronger than steel. However, the elastic modulus of FRP (17–28 GPa) is roughly 1/10 that of steel (200 GPa), so stiffness and deflection usually govern design rather than strength.",
  },
  {
    question: "Does FRP rust or corrode?",
    answer:
      "No. FRP does not rust, pit, or suffer galvanic corrosion. The polymer matrix is inert to most acids, bases, salts, and chlorinated environments. Vinyl ester resin is specified for aggressive chemical or marine environments, and vinyl ester FRP shows negligible property degradation after 30+ years of service in saltwater splash zones.",
  },
  {
    question: "Is FRP flammable?",
    answer:
      "Standard polyester FRP is self-extinguishing (UL 94 V-0). With fire-retardant additives or phenolic resin, pultruded FRP achieves Class 1 surface spread of flame (BS 476 Part 7), low smoke, and low toxicity, and is approved for offshore platforms, tunnels, and rail interiors under EN 45545-2. Composites for rail and passenger transport use phenolic or modified acrylic systems.",
  },
  {
    question: "How long do FRP composites last?",
    answer:
      "Pultruded FRP structures have a design life of 50–100 years with negligible maintenance when specified correctly (UV-stable surface, appropriate resin). Real-world installations in chemical plants, bridges, and marine environments have demonstrated 30+ years of service without measurable loss of mechanical properties.",
  },
  {
    question: "Can FRP be recycled?",
    answer:
      "Thermoset FRP cannot be melted and re-formed like metals. Current end-of-life options include mechanical grinding to filler for cement or concrete (widely commercial), co-processing in cement kilns (energy recovery plus calcium oxide input), and emerging solvolysis/pyrolysis fiber-recovery routes. Non-hazardous landfill is permitted — FRP contains no heavy metals or toxic leachates.",
  },
];

const toolingLeadTime = [
  { step: "Cross-section design & approval", duration: "1–2 weeks" },
  { step: "Steel die manufacturing", duration: "3–6 weeks" },
  { step: "Trial run & sample approval", duration: "1 week" },
  { step: "First production batch", duration: "1–2 weeks" },
];

export default function WhatIsFrpPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "What is FRP? Complete Guide to Fiberglass Reinforced Polymer Composites",
    description: pageDescription,
    url: absoluteUrl(pagePath),
    mainEntityOfPage: absoluteUrl(pagePath),
    datePublished: "2026-04-14",
    dateModified: "2026-04-14",
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: "F1 Composite",
      url: "https://www.f1composite.com",
    },
    publisher: {
      "@type": "Organization",
      name: "F1 Composite",
      url: "https://www.f1composite.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.f1composite.com/brand/f1-logo.png",
      },
    },
    about: [
      {
        "@type": "Thing",
        name: "Fiber-Reinforced Polymer",
        sameAs: "https://en.wikipedia.org/wiki/Fibre-reinforced_plastic",
      },
      {
        "@type": "Thing",
        name: "Pultrusion",
        sameAs: "https://en.wikipedia.org/wiki/Pultrusion",
      },
      {
        "@type": "Thing",
        name: "Composite material",
        sameAs: "https://en.wikipedia.org/wiki/Composite_material",
      },
    ],
    citation: [
      "ASTM D3917 — Standard Specification for Dimensional Tolerance of Thermosetting Glass-Reinforced Plastic Pultruded Shapes",
      "EN 13706 — Reinforced plastics composites — Specifications for pultruded profiles",
      "ASCE/SEI 74-23 — Pre-Standard for LRFD of Pultruded FRP Structures",
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        tag="FRP Guide"
        title="What is FRP? A complete guide to fiberglass reinforced polymer composites"
        description="FRP — fiber reinforced polymer, also known as fiberglass reinforced polymer or GRP — is a structural composite made of glass fiber reinforcement and a polymer resin matrix. This guide explains the materials, the pultrusion process, properties, standards, and how advanced FRP composites compare with steel and aluminum."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "What is FRP?" },
        ]}
      />

      {/* Table of Contents */}
      <section className="bg-white py-[34px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="rounded-[8px] border border-border-default bg-bg2 p-[29px]">
            <h2 className="text-f13 font-bold uppercase tracking-wide text-t2">On this page</h2>
            <ul className="mt-[13px] grid gap-[8px] sm:grid-cols-2 lg:grid-cols-3">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-f13 text-teal-text hover:text-teal"
                  >
                    → {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section id="definition" className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Definition</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            What is FRP?
          </h2>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            <strong className="text-t1">FRP (fiber reinforced polymer)</strong> is
            a structural composite material that combines two constituents: a
            thermoset polymer resin matrix (polyester, vinyl ester, polyurethane,
            phenolic, or epoxy) and a high-performance fiber reinforcement
            (typically E-glass, also called fiberglass). The fibers carry the
            mechanical load; the resin transfers the load between fibers and
            protects them from the environment.
          </p>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            The resulting fiberglass reinforced polymer is lighter than aluminum,
            stronger per kilogram than steel, immune to rust, electrically
            non-conductive, and thermally insulating. FRP composites are used
            wherever corrosion, weight, electromagnetic transparency, or thermal
            efficiency is critical — from chemical plant platforms and offshore
            grating to passive-house window systems and pedestrian bridges.
          </p>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            When the FRP is produced by the{" "}
            <Link
              href="/technology/pultrusion-process"
              className="font-semibold text-teal-text hover:text-teal"
            >
              pultrusion process
            </Link>
            , it is called <strong className="text-t1">pultruded FRP</strong>. The
            full F1 Composite pultruded product range is documented on the{" "}
            <Link
              href="/pultruded-frp-profiles"
              className="font-semibold text-teal-text hover:text-teal"
            >
              pultruded FRP profiles hub
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Terminology */}
      <section id="terminology" className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Terminology</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            FRP, GRP, fiberglass, composites — same thing?
          </h2>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            The terminology around fiber composites is regional and often
            overlapping. In engineering practice:
          </p>
          <ul className="mt-[21px] max-w-[900px] space-y-[13px] text-f15 leading-golden text-t2">
            <li>
              <strong className="text-t1">FRP</strong> — Fiber Reinforced Polymer.
              The generic North American term. Can use glass, carbon, aramid, or
              basalt fibers.
            </li>
            <li>
              <strong className="text-t1">GRP / GFRP</strong> — (Glass) Fiber
              Reinforced Polymer / Plastic. Common in the UK, EU, and Australia.
              Specifies glass-fiber reinforcement.
            </li>
            <li>
              <strong className="text-t1">Fiberglass</strong> — Informal North
              American term. Refers either to the raw E-glass fiber or to the
              finished glass-FRP composite.
            </li>
            <li>
              <strong className="text-t1">Composites</strong> — Umbrella term for
              any material combining two or more constituents. In structural use,
              usually means continuous-fiber FRP.
            </li>
            <li>
              <strong className="text-t1">Advanced composites</strong> — Composites
              with engineered fiber architectures and controlled fiber fractions
              (≥ 50% by weight). Pultruded FRP profiles qualify.
            </li>
            <li>
              <strong className="text-t1">Pultruded composites / pultruded
              profiles</strong> — FRP composites manufactured by the pultrusion
              process — the focus of F1 Composite.
            </li>
          </ul>
        </div>
      </section>

      {/* Components */}
      <section id="components" className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Composition</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            What is inside a pultruded FRP profile?
          </h2>

          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div>
              <h3 className="text-f19 font-bold text-t1">Reinforcement (60–70% by weight)</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li>
                  <strong className="text-t1">E-glass roving</strong> —
                  unidirectional fiber bundles carrying axial load. The dominant
                  reinforcement by mass.
                </li>
                <li>
                  <strong className="text-t1">Continuous strand mat (CSM)</strong> —
                  randomly oriented glass mat that adds transverse strength and
                  through-thickness integrity.
                </li>
                <li>
                  <strong className="text-t1">Woven roving / biaxial fabric</strong> —
                  used in custom profiles requiring balanced in-plane stiffness.
                </li>
                <li>
                  <strong className="text-t1">Surfacing veil</strong> — polyester
                  or C-glass veil that gives a resin-rich, UV-stable outer
                  surface. Typically 0.2–0.4 mm thick.
                </li>
                <li>
                  <strong className="text-t1">ECR-glass / carbon / basalt /
                  aramid</strong> — optional reinforcements for enhanced corrosion
                  resistance, high modulus, or specialty requirements.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-f19 font-bold text-t1">Polymer matrix (30–40% by weight)</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li>
                  <strong className="text-t1">Isophthalic polyester</strong> —
                  general structural use. Best cost / performance balance.
                </li>
                <li>
                  <strong className="text-t1">Vinyl ester</strong> — superior
                  chemical, chloride, and hydrolysis resistance. Preferred for
                  marine and chemical environments.
                </li>
                <li>
                  <strong className="text-t1">Polyurethane (PU)</strong> — 3–5×
                  the flexural toughness of polyester; fast cure; used in rail
                  interiors and EV battery trays.
                </li>
                <li>
                  <strong className="text-t1">Phenolic</strong> — Class 1 fire
                  performance (BS 476 / EN 45545-2). Low smoke, low toxicity.
                </li>
                <li>
                  <strong className="text-t1">Epoxy</strong> — highest mechanical
                  properties; specified when tensile or fatigue requirements
                  approach steel equivalents.
                </li>
                <li>
                  <strong className="text-t1">Additives</strong> — UV stabilizers,
                  flame retardants, pigments, release agents, and catalysts (MEKP
                  for polyester; BPO for vinyl ester).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pultrusion Process */}
      <section id="pultrusion" className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Manufacturing</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            How pultruded FRP is made
          </h2>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            Pultrusion is a continuous, automated process that produces
            constant-cross-section FRP profiles. Invented in the 1950s and
            standardized in the 1970s, it is now the dominant manufacturing route
            for structural FRP shapes worldwide.
          </p>

          <ol className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "1. Creel",
                body: "Thousands of E-glass roving packages are fed from a creel frame, aligned in the longitudinal direction.",
              },
              {
                step: "2. Resin impregnation",
                body: "Fibers are pulled through an open resin bath or closed injection chamber, fully wetted with liquid thermoset resin.",
              },
              {
                step: "3. Pre-former",
                body: "Impregnated fibers pass through guide plates that compact the material into the required cross-section geometry.",
              },
              {
                step: "4. Heated die",
                body: "The compacted fiber/resin bundle enters a heated steel die (typically 120–180 °C) where the resin cures.",
              },
              {
                step: "5. Pullers",
                body: "Reciprocating or caterpillar pullers draw the cured profile at 0.3–1.5 m/min, providing the continuous 'pulling' action that names the process.",
              },
              {
                step: "6. Cut-off",
                body: "A synchronized flying saw cuts profiles to length — typically 6 m or 12 m for shipping — and they are stacked for inspection.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-[8px] border border-border-default bg-white p-[21px]"
              >
                <h3 className="text-f15 font-bold text-teal-text">{item.step}</h3>
                <p className="mt-[8px] text-f15 leading-golden text-t2">{item.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-[34px] rounded-[8px] bg-white p-[29px]">
            <h3 className="text-f19 font-bold text-t1">Custom die lead time</h3>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              Creating a new custom profile typically takes 6–10 weeks total:
            </p>
            <ul className="mt-[13px] space-y-[5px] text-f15 text-t2">
              {toolingLeadTime.map((row) => (
                <li key={row.step} className="flex justify-between gap-[21px] border-b border-border-default py-[8px]">
                  <span>{row.step}</span>
                  <span className="font-medium text-t1">{row.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Properties */}
      <section id="properties" className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Properties</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Mechanical and physical properties of pultruded FRP
          </h2>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            Typical values for E-glass / isophthalic-polyester pultruded
            structural profiles at 23 °C. Properties are directional — the table
            below gives longitudinal (L) values unless noted. Vinyl ester and
            polyurethane systems provide 10–25% higher strength.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Property</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Value</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Test standard</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Density", "1.8 – 2.1 g/cm³", "—"],
                  ["Tensile strength (L)", "240 – 400 MPa", "ASTM D638"],
                  ["Tensile modulus (L)", "17 – 28 GPa", "ASTM D638"],
                  ["Flexural strength (L)", "200 – 350 MPa", "ASTM D790"],
                  ["Flexural modulus (L)", "12 – 20 GPa", "ASTM D790"],
                  ["Compressive strength (L)", "200 – 300 MPa", "ASTM D695"],
                  ["Interlaminar shear strength", "20 – 30 MPa", "ASTM D2344"],
                  ["Barcol hardness", "40 – 55", "ASTM D2583"],
                  ["Coefficient of thermal expansion (L)", "8 × 10⁻⁶ / °C", "ASTM E831"],
                  ["Thermal conductivity", "0.3 W/m·K", "ASTM C177"],
                  ["Dielectric strength", "10 – 14 kV/mm", "ASTM D149"],
                  ["Water absorption (24 h)", "< 0.6%", "ASTM D570"],
                  ["Glass fiber content by weight", "60 – 70%", "ASTM D2584 (burn-off)"],
                  ["Dimensional tolerance", "±0.25 mm typical", "EN 13706 / ASTM D3917"],
                ].map(([prop, val, std]) => (
                  <tr key={prop} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] align-top text-f15 font-medium text-t1">{prop}</td>
                    <td className="py-[13px] pr-[21px] align-top text-f15 text-teal-text font-medium">{val}</td>
                    <td className="py-[13px] align-top text-f13 text-t3">{std}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Advantages</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Why engineers specify FRP over steel and aluminum
          </h2>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "75% lighter than steel",
                body: "Density 1.8–2.1 g/cm³ vs 7.85 g/cm³ for steel. Enables manual handling, smaller cranes, and lower freight cost.",
              },
              {
                title: "Corrosion-immune",
                body: "No rust, no galvanic corrosion, no chloride pitting. Ideal for marine, chemical, and de-icing-salt environments.",
              },
              {
                title: "Electrically non-conductive",
                body: "Dielectric strength 10–14 kV/mm. Used for electrical substations, rail insulators, and RF-transparent structures.",
              },
              {
                title: "Thermally insulating",
                body: "Conductivity 0.3 W/m·K — about 1/170 of steel and 1/530 of aluminum. Enables passive-house-grade window systems.",
              },
              {
                title: "Low maintenance",
                body: "50–100 year design life with no painting, galvanizing, or recoating cycles. Zero-maintenance TCO advantage over 30 years.",
              },
              {
                title: "Easy fabrication",
                body: "Cut with carbide blade, drill with diamond bit, connect with stainless bolts or adhesive. No hot work permits, no welding.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[8px] border border-border-default bg-white p-[29px]"
              >
                <h3 className="text-f19 font-bold text-t1">{item.title}</h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section id="limitations" className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Limitations</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            When FRP is not the right choice
          </h2>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            FRP is not a universal substitute for steel. Engineering considerations
            that frequently disqualify or complicate a pultruded FRP specification:
          </p>
          <ul className="mt-[21px] max-w-[900px] space-y-[13px] text-f15 leading-golden text-t2">
            <li>
              <strong className="text-t1">Low elastic modulus.</strong> FRP
              stiffness is ~1/10 of steel. For long-span primary beams, deflection
              often governs. Hybrid FRP–concrete or FRP–steel designs can be the
              right answer for spans beyond 10–12 m.
            </li>
            <li>
              <strong className="text-t1">Creep under sustained load.</strong>
              Polyester-matrix FRP creeps under long-term high stress; design
              allowables typically apply a 0.25–0.35 reduction factor for
              permanent loads.
            </li>
            <li>
              <strong className="text-t1">No welding.</strong> Thermoset FRP
              cannot be welded, heated, or bent after manufacture. All
              connections are bolted or adhesive bonded.
            </li>
            <li>
              <strong className="text-t1">Temperature limits.</strong> Isophthalic
              polyester has a heat deflection temperature (HDT) of 90–100 °C.
              Vinyl ester 105–120 °C. Phenolic 140–160 °C. For higher service
              temperatures, specialty resins or alternative materials are needed.
            </li>
            <li>
              <strong className="text-t1">Upfront cost.</strong> Per meter, FRP is
              50–100% more expensive than carbon steel. Lifecycle economics
              favour FRP in corrosive environments, but marginal-environment
              projects may not justify the premium.
            </li>
            <li>
              <strong className="text-t1">UV degradation of resin-starved
              surfaces.</strong> Always specify a surfacing veil and a pigmented
              or UV-stabilized resin for outdoor service. Properly specified FRP
              shows less than 5% property loss after 20 years of direct UV exposure.
            </li>
          </ul>
        </div>
      </section>

      {/* Standards */}
      <section id="standards" className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Standards</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            FRP composites — key standards and certification
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Standard</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Scope</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["ISO 9001:2015", "Quality management system. F1 Composite certified."],
                  ["EN 13706-1/2/3", "European pultruded profile standard. Defines structural grades E17 and E23, test methods, and classification."],
                  ["ASTM D3917", "Standard specification for dimensional tolerance of thermosetting glass-reinforced plastic pultruded shapes."],
                  ["ASTM D638 / D790 / D695 / D2344", "Test methods for tensile, flexural, compressive, and interlaminar shear properties."],
                  ["ASCE/SEI 74-23", "Pre-Standard for LRFD Design of Pultruded FRP Structures (United States)."],
                  ["EUROCOMP Design Code", "Structural design of polymer composites (Europe)."],
                  ["ASTM E84 / BS 476", "Fire: surface burning characteristics and fire tests on building materials."],
                  ["EN 45545-2", "Fire: railway rolling stock — fire protection."],
                  ["AS 4586", "Slip resistance classification for pedestrian surface materials (gratings)."],
                  ["PHI (Passive House Institute)", "Thermal performance certification for fenestration systems."],
                  ["DNV / Lloyd's Register", "Marine certification for offshore structural FRP."],
                ].map(([std, scope]) => (
                  <tr key={std} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] align-top text-f15 font-medium text-t1">{std}</td>
                    <td className="py-[13px] align-top text-f15 text-t2">{scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section id="applications" className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Applications</SectionTag>
          <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Where advanced FRP composites are specified
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="rounded-[8px] bg-bg2 p-[29px]">
              <h3 className="text-f19 font-bold text-t1">Infrastructure &amp; transport</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li>→ Pedestrian bridges and bridge deck panels</li>
                <li>→ Rail platform canopies and sub-structures</li>
                <li>→ Cable trays and pipe supports for utility corridors</li>
                <li>→ Highway noise barriers in corrosive environments</li>
              </ul>
            </div>
            <div className="rounded-[8px] bg-bg2 p-[29px]">
              <h3 className="text-f19 font-bold text-t1">Energy &amp; utilities</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li>→ Transmission cross-arms and substation equipment</li>
                <li>→ Solar mounting frames (utility-scale and rooftop)</li>
                <li>→ Wind-turbine secondary structures</li>
                <li>→ Oil &amp; gas access platforms and ladders</li>
              </ul>
            </div>
            <div className="rounded-[8px] bg-bg2 p-[29px]">
              <h3 className="text-f19 font-bold text-t1">Chemical &amp; marine</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li>→ Chemical plant walkways and handrails</li>
                <li>→ Cooling tower structural elements</li>
                <li>→ Wastewater and desalination plant gratings</li>
                <li>→ Offshore platforms and floating docks</li>
              </ul>
            </div>
            <div className="rounded-[8px] bg-bg2 p-[29px]">
              <h3 className="text-f19 font-bold text-t1">Building &amp; construction</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li>
                  → <Link href="/products/fenestration-systems" className="text-teal-text hover:text-teal">
                    FRP window frames &amp; FRP window profiles
                  </Link>{" "}
                  (passive-house, low-energy buildings)
                </li>
                <li>→ Façade support profiles and curtain-wall mullions</li>
                <li>→ Building rooftop platforms and antenna masts</li>
                <li>→ Rebar for reinforced concrete in corrosive service</li>
              </ul>
            </div>
          </div>

          <p className="mt-[34px] text-f15 leading-golden text-t2">
            For a deeper overview by industry, see the{" "}
            <Link href="/industries" className="font-semibold text-teal-text hover:text-teal">
              industries
            </Link>{" "}
            section. For live case studies including before/after weight, cost,
            and delivered lead-time data, see our{" "}
            <Link href="/case-studies" className="font-semibold text-teal-text hover:text-teal">
              case studies
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[21px] text-f19 font-bold text-t1">Keep exploring</h2>
          <div className="flex flex-wrap gap-[13px]">
            <LinkArrow href="/pultruded-frp-profiles">Pultruded FRP profiles hub</LinkArrow>
            <LinkArrow href="/technology/pultrusion-process">Pultrusion process explained</LinkArrow>
            <LinkArrow href="/technology/frp-vs-traditional-materials">FRP vs steel vs aluminum</LinkArrow>
            <LinkArrow href="/products/custom-pultrusions">Custom pultrusion services</LinkArrow>
            <LinkArrow href="/resources/technical-data">Technical data sheets</LinkArrow>
            <LinkArrow href="/resources/design-guides">Design guides</LinkArrow>
            <LinkArrow href="/ask">Ask the AI engineering assistant</LinkArrow>
          </div>
        </div>
      </section>

      <div id="faq">
        <AnswerBlocks
          tag="FRP FAQ"
          title="FRP composites — frequently asked questions"
          description="Quick reference answers for engineers, specifiers, and procurement professionals new to advanced FRP composites."
          items={faqItems}
        />
      </div>

      <AskAICard
        title="Ready to apply this to your project?"
        description="Open the FRP Engineering Advisor and get a profile family, resin system, and standards mapped to what you're building."
        prefill={prefillForWhatIsFRP()}
      />

      <InnerCTA title="Talk to our FRP engineers about your project" />
    </>
  );
}
