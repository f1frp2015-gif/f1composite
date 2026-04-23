import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import RelatedLinks from "@/components/sections/RelatedLinks";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP for Infrastructure",
  description:
    "FRP profiles for infrastructure: bridge decks, pedestrian bridges, handrails, utility poles. 75+ year design life, zero corrosion.",
  path: "/industries/infrastructure",
  image: "/industries/infrastructure/opengraph-image",
});

const answerItems = [
  {
    question: "Why use FRP in infrastructure projects?",
    answer:
      "FRP is used in infrastructure projects because it reduces dead load, resists corrosion from de-icing salts and coastal exposure, and lowers lifecycle maintenance compared with steel and reinforced concrete.",
  },
  {
    question: "Where is FRP used in infrastructure?",
    answer:
      "Common infrastructure uses include bridge decks, pedestrian bridges, utility poles, cable trays, handrails, guardrails, and walkway structures in corrosive or weight-sensitive environments.",
  },
  {
    question: "How long can FRP infrastructure components last?",
    answer:
      "Properly specified FRP infrastructure components are commonly designed for 75 to 100 years of service life, with far lower corrosion-related maintenance than steel alternatives.",
  },
  {
    question: "What is the main economic advantage of FRP for bridge rehabilitation?",
    answer:
      "The main economic advantage is lifecycle savings: FRP bridge and access components reduce maintenance shutdowns, coatings, and replacement cycles while also lowering installation cost through lighter weight.",
  },
];

const faqs = [
  {
    question: "How do FRP bridge decks compare to concrete in load-carrying capacity?",
    answer:
      "Pultruded FRP bridge decks are engineered to carry HL-93 highway loading per AASHTO LRFD specifications, the same design loads applied to concrete decks. A typical FRP deck panel weighs between 80 and 100 kg/m2, compared to 500-600 kg/m2 for a 200mm reinforced concrete deck. This 80% weight reduction directly increases the live load capacity of existing bridges during rehabilitation, or allows lighter substructures in new construction. FRP decks have been independently load-tested to failure loads exceeding 3.5 times their design capacity, confirming robust safety factors.",
  },
  {
    question: "What is the expected service life of FRP in infrastructure applications?",
    answer:
      "FRP infrastructure components carry a design life of 75 to 100 years under normal service conditions. This is supported by accelerated aging data, real-world performance monitoring of installations dating to the 1990s, and predictive durability models published by the Federal Highway Administration (FHWA). Unlike steel, FRP does not corrode. Unlike concrete, it does not suffer freeze-thaw spalling or chloride-induced rebar deterioration. The Virginia Department of Transportation reported that FRP bridge deck panels installed in 2001 showed no measurable degradation after 20 years of continuous service under highway traffic.",
  },
  {
    question: "Can FRP handrails and guardrails meet code requirements?",
    answer:
      "Yes. Our FRP handrail and guardrail systems are tested and certified to meet the loading requirements of IBC 2021 Section 1607.8 (200 lbf concentrated load, 50 plf distributed load), OSHA 1910.29, and EN 1991-1-1 for pedestrian barriers. All handrail systems undergo third-party structural testing and are supplied with engineering certification letters. FRP guardrails also offer the advantage of electrical non-conductivity, which is critical on rail bridges and in industrial settings near live electrical equipment.",
  },
  {
    question: "Are FRP utility poles as strong as wood or steel poles?",
    answer:
      "FRP utility poles are engineered to match the load-carrying capacity of wood and steel poles at equivalent classifications per ANSI O5.1. A Class 2 FRP pole carries the same tip load as a Class 2 wood pole but weighs approximately 60% less, dramatically reducing transportation and installation costs. FRP poles do not rot, are immune to woodpecker damage, and do not require chemical preservative treatments. In hurricane-prone regions, FRP poles have demonstrated superior resilience — the Florida Power & Light network reported 0% failure rate on FRP poles during Category 4 hurricane impacts, versus 8-12% failure on wood poles.",
  },
];

export default function InfrastructurePage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FRP Composite Profiles for Infrastructure",
    description:
      "FRP profiles for infrastructure: bridge decks, pedestrian bridges, handrails, utility poles. 75+ year design life, zero corrosion.",
    url: absoluteUrl("/industries/infrastructure"),
    about: {
      "@type": "Thing",
      name: "Fiber-Reinforced Polymer profiles for infrastructure projects",
    },
    provider: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...answerItems, ...faqs].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={faqSchema} />
      <PageHeader
        tag="Industries / Infrastructure"
        title="FRP Composite Profiles for Infrastructure"
        description="Fiber-reinforced polymer (FRP) profiles deliver 75+ year design life for bridge decks, pedestrian structures, handrails, and utility infrastructure — eliminating the corrosion cycle that degrades steel and concrete assets."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Infrastructure" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/industries/frp-infrastructure-bridge-structure.jpg"
              alt="Bridge infrastructure with composite structural profiles for long-span applications"
              width={1280}
              height={600}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <AnswerBlocks
        tag="Infrastructure Answers"
        title="Direct answers for bridge, walkway, and utility asset teams"
        description="These short answers are written to be easy for engineers, owners, and answer engines to quote when evaluating FRP for infrastructure applications."
        items={answerItems}
        suppressSchema
      />

      {/* Challenge Section */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The Challenge</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Infrastructure Is Aging Faster Than It Can Be Replaced
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Civil infrastructure worldwide faces a compounding durability crisis. The American Society of Civil Engineers rates 42% of all bridges in the United States as structurally deficient or functionally obsolete. In Europe, the European Commission estimates that over 60,000 bridges require significant rehabilitation or replacement within the next two decades. The primary cause in both regions is identical: corrosion of steel reinforcement within concrete, and corrosion of exposed steel structural members.
              </p>
              <p>
                De-icing salts accelerate this deterioration dramatically. Chloride ions from road salt penetrate concrete cover and initiate rebar corrosion within 15 to 25 years, far short of the 75 to 100 year design life that infrastructure codes assume. Once corrosion begins, expansion of rust products causes concrete spalling, which exposes more steel, which accelerates further corrosion in a self-reinforcing cycle. Repairing one square meter of a corroded bridge deck can cost between $500 and $2,000 depending on access conditions — and the repair itself often lasts only 10 to 15 years before the cycle repeats.
              </p>
              <p>
                Weight is another critical constraint. Many existing bridges were designed for lighter vehicle loads than those they now carry. Strengthening these bridges with additional steel or concrete adds dead load to structures already operating near capacity. Infrastructure engineers need materials that can increase live load capacity without increasing dead load — a requirement that only composite materials can fulfill efficiently.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Pedestrian infrastructure faces parallel challenges. Steel handrails and guardrails on bridges, boardwalks, and elevated walkways corrode visibly within 5 to 10 years in coastal and urban environments, creating both aesthetic degradation and safety concerns. Routine painting and galvanizing extend life somewhat, but these maintenance cycles are expensive when performed at height or over water, and they introduce environmental concerns from coating removal and application.
              </p>
              <p>
                Utility infrastructure — power distribution poles, lighting standards, and communications towers — must contend with the same forces. Wood utility poles, which still account for over 120 million units in the United States alone, suffer from rot, insect damage, and woodpecker attack. Their preservative treatments (pentachlorophenol, creosote, CCA) are increasingly restricted on environmental grounds. Steel poles corrode at ground line, and their high conductivity creates electrocution hazards during fault conditions.
              </p>
              <p>
                These systemic challenges across bridge, pedestrian, and utility infrastructure share a common thread: the limitations of steel, concrete, and timber in corrosive and exposed environments. Fiber-reinforced polymer (FRP) composites produced through the pultrusion process offer a fundamentally different performance profile — one that eliminates corrosion entirely while reducing installed weight by 60% to 80%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FRP Solutions Section */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>FRP Solutions</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Pultruded FRP Profiles for Bridges, Walkways, and Utility Structures
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Bridge Decks and Superstructures</h3>
              <p>
                Pultruded FRP bridge deck panels provide a direct replacement for deteriorated concrete decks on steel or concrete girder bridges. Weighing between 80 and 100 kg/m2 — compared to 500 to 600 kg/m2 for conventional reinforced concrete — FRP decks reduce dead load by approximately 80%. This weight reduction directly translates to increased live load capacity, often allowing bridges to be upgraded from restricted load ratings to full highway loading without girder replacement.
              </p>
              <p>
                Installation speed is another decisive advantage. FRP deck panels are manufactured to precise dimensions in factory conditions and arrive on site ready for placement. A typical two-lane bridge deck can be installed in 2 to 3 days versus 30 to 45 days for cast-in-place concrete. This compression of construction time reduces traffic disruption, lane closure costs, and exposure to weather delays. The New York State DOT documented a 90% reduction in construction time when replacing concrete decks with FRP panels on state highway bridges.
              </p>
              <p>
                For new pedestrian and cycling bridges, pultruded FRP profiles enable full superstructure solutions. FRP truss bridges spanning up to 40 meters have been deployed across Europe and North America. These structures are light enough to be transported and installed as complete assemblies by modest crane equipment, eliminating the need for temporary falsework and in-water construction activities.
              </p>
              <LinkArrow href="/products/custom-pultrusions">
                Explore custom bridge profiles
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Handrails and Guardrail Systems</h3>
              <p>
                FRP handrail systems combine structural performance with complete corrosion immunity. Our standard handrail profiles are designed as modular kits — posts, top rails, mid rails, and kick plates — that assemble with stainless steel fasteners using conventional hand tools. No welding, no hot work permits, no grinding or painting after installation.
              </p>
              <p>
                The non-conductive property of FRP handrails provides a critical safety advantage in electrified environments. On railway bridges, near substations, and along electrified transit corridors, metallic handrails can become energized during fault conditions, creating lethal contact hazards. FRP eliminates this risk entirely, which is why Network Rail (UK), Deutsche Bahn (Germany), and numerous North American transit agencies now specify FRP handrails as standard.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Utility Poles and Lighting Standards</h3>
              <p>
                Pultruded and filament-wound FRP utility poles are replacing wood and steel poles across distribution and transmission networks. An FRP distribution pole weighing approximately 150 kg replaces a treated wood pole weighing 400 to 500 kg, reducing transportation costs and enabling installation with lighter equipment. In remote locations accessible only by helicopter, the weight savings can reduce installation cost by over $10,000 per pole.
              </p>
              <p>
                FRP poles provide inherent electrical insulation, reducing fault current propagation and improving line worker safety. They do not burn in wildfire zones — a critical advantage in regions where wood pole ignition has been identified as a wildfire initiation vector. Pacific Gas & Electric and other western US utilities have begun deploying FRP poles in high fire-threat districts specifically for this reason.
              </p>
              <p>
                Our FRP lighting standards and signal poles serve municipal and highway applications. These poles resist salt spray corrosion in coastal environments and de-icing chemical exposure along roadways, maintaining their structural integrity and appearance for 50+ years without repainting or retreatment.
              </p>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Cable Trays and Conduit Systems</h3>
              <p>
                Pultruded FRP cable trays and conduit support systems serve infrastructure tunnels, bridges, and utility corridors where corrosion from moisture, chemicals, or de-icing salt runoff would degrade metal alternatives. FRP cable trays weigh roughly 40% less than steel equivalents, reducing structural load on suspended mounting systems and simplifying overhead installation. Their electrical non-conductivity provides inherent cable fault isolation and eliminates the need for separate grounding systems required by metallic trays.
              </p>
              <p>
                We supply ladder-type, solid-bottom, and ventilated trough cable tray configurations in standard widths from 150mm to 900mm. All trays are manufactured with fire-retardant resin systems meeting UL 94 V-0 self-extinguishing requirements.
              </p>
              <LinkArrow href="/technology/frp-vs-traditional-materials">
                Compare FRP to traditional materials
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Quantified Performance Advantages</h3>
              <ul className="list-none space-y-[13px]">
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">80% dead load reduction</strong> in bridge deck replacement versus reinforced concrete</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">75+ year design life</strong> with zero corrosion maintenance in de-icing salt and coastal environments</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">90% faster installation</strong> for bridge deck panels versus cast-in-place concrete</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Electrically non-conductive</strong> — eliminates electrocution hazards on rail bridges and near substations</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">60% lighter utility poles</strong> — reduced transport cost and helicopter-installable in remote locations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Products and Resources for Infrastructure Projects
          </h2>
          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/products/custom-pultrusions"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Custom Pultrusions</h3>
              <p className="text-f13 leading-golden text-t2">
                Bespoke FRP profile cross-sections engineered for specific bridge, handrail, and infrastructure applications.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View product →
              </span>
            </Link>
            <Link
              href="/technology/frp-vs-traditional-materials"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">FRP vs. Traditional Materials</h3>
              <p className="text-f13 leading-golden text-t2">
                Detailed comparison of FRP composites against steel, aluminum, concrete, and timber in infrastructure applications.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                Read comparison →
              </span>
            </Link>
            <Link
              href="/case-studies/european-bridge-deck"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Case Study: European Bridge Deck</h3>
              <p className="text-f13 leading-golden text-t2">
                FRP deck replacement on a European bridge — 75% weight reduction, 50+ year design life.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                Read case study →
              </span>
            </Link>
          </div>

          <FAQ items={faqs} suppressSchema />
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "FRP profiles for infrastructure",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/standard-profiles/i-beam", label: "FRP I-beams for bridges" },
              { href: "/products/standard-profiles/channel", label: "FRP channels for stringers" },
              { href: "/products/gratings", label: "FRP gratings & bridge deck panels" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusions for infrastructure" },
              { href: "/products/standard-profiles/rod", label: "FRP rods for soil nails & rock bolts" },
            ],
          },
          {
            title: "Technical reference",
            links: [
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
              { href: "/technology/pultrusion-process", label: "Pultrusion process" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel / concrete" },
              { href: "/technology/frp-vs-steel-gratings", label: "FRP vs steel gratings — detailed" },
              { href: "/resources/design-guides", label: "Bridge & handrail design guides" },
              { href: "/resources/technical-data", label: "Load tables & data sheets" },
            ],
          },
          {
            title: "Proof & related industries",
            links: [
              { href: "/case-studies/european-bridge-deck", label: "European bridge deck case study" },
              { href: "/case-studies/water-treatment-cable-tray", label: "Water treatment cable tray case study" },
              { href: "/industries/construction", label: "Construction sector" },
              { href: "/industries/marine", label: "Marine & offshore" },
              { href: "/industries/energy", label: "Energy & solar" },
            ],
          },
        ]}
      />

      <InnerCTA title="Planning an infrastructure project with FRP?" />
    </>
  );
}
