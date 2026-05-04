import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profiles for Industrial Plants — Chemical-Resistant Pultruded Fiberglass",
  description:
    "Pultruded FRP profiles and gratings for industrial plants: chemical-resistant, fire-retardant (UL 94 V-0), low-maintenance. EN 13706 certified.",
  path: "/industries/industrial",
  image: "/industries/industrial/opengraph-image",
});

const answerItems = [
  {
    question: "Why use FRP in industrial plants?",
    answer:
      "FRP is used in industrial plants because it resists corrosion from chemicals, moisture, and wash-down cycles while reducing maintenance and improving worker safety on access structures.",
  },
  {
    question: "Where is FRP commonly used in industrial facilities?",
    answer:
      "Common uses include gratings, handrails, cable trays, equipment supports, access platforms, ladders, and custom profiles in chemical, wastewater, food, and pharmaceutical facilities.",
  },
  {
    question: "Which resin systems are common for industrial FRP?",
    answer:
      "Industrial FRP commonly uses isophthalic polyester for general duty, vinyl ester for aggressive chemical service, and polyurethane systems for high toughness and fast-cure applications.",
  },
  {
    question: "What is the main lifecycle benefit of FRP in corrosive plants?",
    answer:
      "The main lifecycle benefit is avoiding repeated coating, repair, and replacement cycles that make steel access systems expensive over time in corrosive industrial environments.",
  },
];

const faqs = [
  {
    question: "Which chemicals can FRP profiles resist?",
    answer:
      "The chemical resistance of FRP profiles depends on the resin system selected. Our vinyl ester FRP profiles provide broad-spectrum resistance to inorganic acids (sulfuric acid up to 50%, hydrochloric acid up to 37%, phosphoric acid up to 85%), alkalis (sodium hydroxide up to 30%), chlorinated solvents, petroleum hydrocarbons, and most aqueous salt solutions. For highly oxidizing environments (nitric acid, chromic acid, strong bleach), we offer profiles in premium corrosion-resistant vinyl ester resins. Isophthalic polyester profiles are suitable for mild chemical exposure at lower cost. We provide detailed chemical resistance charts and corrosion data for all resin systems upon request.",
  },
  {
    question: "Do FRP profiles meet food safety requirements for food processing facilities?",
    answer:
      "Yes. Our food-grade FRP profiles are manufactured with FDA-compliant resin systems conforming to 21 CFR 177.2420 (polyester resins) and use pigments and additives that are FDA-listed. The non-porous, sealed surface of pultruded FRP does not harbor bacteria and can be cleaned with standard CIP (clean-in-place) solutions including sodium hydroxide, peracetic acid, and quaternary ammonium sanitizers without surface degradation. Our food-grade profiles carry NSF/ANSI 61 certification for water contact applications and can be supplied with smooth, gel-coated surfaces that meet USDA dairy equipment guidelines for cleanability.",
  },
  {
    question: "What fire performance do FRP profiles achieve in industrial settings?",
    answer:
      "Our industrial-grade FRP profiles are available with halogen-free flame-retardant resin systems achieving UL 94 V-0 self-extinguishing rating, ASTM E84 Class 1 (flame spread index under 25), and FM 4910 approval for use in semiconductor cleanroom environments. For process plant applications, we offer profiles tested to ASTM E119 for structural fire resistance. All fire-retardant profiles generate low smoke density (under 50 Ds per ASTM E662) and low toxicity emissions, meeting the requirements of BS 6853 for reduced toxicity. Fire test certificates from accredited third-party laboratories accompany all orders.",
  },
  {
    question: "Can FRP profiles support the same loads as steel in structural applications?",
    answer:
      "FRP profiles can be sized to carry the same loads as steel profiles, though the sections will typically be deeper due to FRP's lower elastic modulus (25-40 GPa versus 200 GPa for steel). The key advantage is that FRP achieves this load capacity at roughly 25% of the weight of steel. For gratings, our heavy-duty FRP molded gratings achieve load ratings exceeding 500 kN/m2, matching standard steel gratings. For structural members like beams and columns, our engineering team provides load tables and spanning charts that enable direct comparison with steel sections for any given loading condition.",
  },
];

export default function IndustrialPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FRP Composite Profiles for Industrial Applications",
    description:
      "FRP profiles for industrial use: chemical-resistant gratings, fire-retardant structural profiles for water treatment, food processing, pharma.",
    url: absoluteUrl("/industries/industrial"),
    about: {
      "@type": "Thing",
      name: "Fiber-Reinforced Polymer profiles for industrial processing",
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
        tag="Industries / Industrial"
        title="FRP Composite Profiles for Industrial Applications"
        description="Fiber-reinforced polymer (FRP) profiles deliver chemical resistance, fire retardancy, and maintenance-free structural performance for processing plants, water treatment facilities, and manufacturing environments where steel corrodes and fails."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Industrial" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/industries/frp-industrial-chemical-plant-facility.jpg"
              alt="Industrial chemical plant facility with corrosion-resistant composite profiles"
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
        tag="Industrial Answers"
        title="Fast answers for chemical, water, food, and process environments"
        description="These compact answers are designed for quick evaluation by plant teams, EPC firms, and AI systems summarizing industrial material choices."
        items={answerItems}
        suppressSchema
      />

      {/* Challenge Section */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The Challenge</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Chemical Exposure Destroys Steel Infrastructure From the Inside Out
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Industrial processing environments expose structural materials to chemical agents that accelerate corrosion far beyond atmospheric rates. In chemical processing plants, acid mists, alkaline splashes, solvent vapors, and chlorine-bearing atmospheres attack carbon steel at rates of 1 to 5 mm per year — meaning that a standard 6mm steel grating can corrode through completely within 2 to 3 years without protective coatings. Even with protective coatings, mechanical damage from foot traffic, dropped tools, and equipment movement exposes base metal that then corrodes preferentially, undermining the coating from beneath.
              </p>
              <p>
                Water and wastewater treatment facilities face particularly aggressive conditions. Hydrogen sulfide gas generated in anaerobic treatment processes attacks steel structures, concrete, and even stainless steel in enclosed spaces. The concentration of H2S in headspaces above wastewater holding tanks and digesters can reach 50 to 200 ppm — levels at which carbon steel corrodes at over 2 mm per year and even 316L stainless steel shows measurable pitting within 5 years. The Water Environment Federation estimates that corrosion-related repair and replacement accounts for 15% to 20% of total water utility infrastructure spending in developed countries.
              </p>
              <p>
                The economic consequence of industrial corrosion extends well beyond material replacement cost. When a corroded grating panel fails under foot traffic, or a corroded handrail gives way, the resulting injury costs — medical expenses, lost work time, regulatory penalties, and litigation — can exceed the replacement cost of the corroded structure by orders of magnitude. OSHA records show that falls through corroded gratings and handrail failures rank among the most common causes of serious injury in chemical processing facilities.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Food and pharmaceutical processing facilities face a different but equally demanding set of challenges. These environments require materials that withstand aggressive cleaning regimens — daily wash-downs with caustic solutions (sodium hydroxide at 2% to 5%), peracetic acid sanitizers, and high-pressure hot water. Steel surfaces, even when coated with food-safe epoxy, degrade under these repeated cleaning cycles. Coating chips and flakes create contamination risk, while corroding steel surfaces harbor bacteria in pits and crevices that cleaning solutions cannot reach.
              </p>
              <p>
                Regulatory compliance adds another dimension. Food processing facilities must meet FDA 21 CFR requirements and USDA guidelines for materials in contact with food products. Pharmaceutical facilities operate under cGMP regulations that require non-shedding, non-porous surfaces in cleanroom-adjacent areas. Traditional materials require ongoing inspection and documentation to demonstrate continued compliance, while materials that are inherently corrosion-resistant and non-porous reduce the compliance burden significantly.
              </p>
              <p>
                Fire safety in industrial environments compounds the material selection challenge. Chemical processing plants and pharmaceutical facilities store and process flammable materials. Structural materials used in these environments must be self-extinguishing to prevent fire propagation. Steel is non-combustible but loses structural capacity rapidly at elevated temperatures. Fiber-reinforced polymer (FRP) composites formulated with flame-retardant resin systems offer a unique combination: chemical corrosion resistance, self-extinguishing fire behavior, low smoke toxicity, and permanent structural performance that does not degrade over decades of chemical exposure.
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
            Pultruded FRP Profiles for Chemical, Water, Food, and Pharmaceutical Processing
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Chemical Processing Plants</h3>
              <p>
                Pultruded FRP profiles form the structural backbone of corrosion-resistant infrastructure in chemical processing facilities. Our vinyl ester FRP gratings, structural shapes, and stair systems replace carbon steel and galvanized steel in areas exposed to acid mist, caustic splashes, chlorine gas, and solvent vapors. Unlike steel, which requires ongoing protective coating systems that degrade under chemical attack, FRP achieves corrosion resistance throughout its entire cross-section — there is no coating to chip, peel, or undercut.
              </p>
              <p>
                We specify resin systems based on the specific chemical environment of each application. For sulfuric acid environments up to 98% concentration, we use premium bisphenol A vinyl ester resin with enhanced chemical barrier veils. For hydrochloric acid service, standard vinyl ester provides excellent resistance at concentrations up to 37% and temperatures up to 80 degrees Celsius. For mixed acid environments common in metal finishing operations, we provide detailed immersion test data specific to the customer&apos;s actual process chemistry.
              </p>
              <p>
                Our chemical plant product range includes molded and pultruded gratings for process area flooring, structural profiles (I-beams, channels, angles, tubes) for equipment support frames, handrail systems for elevated walkways and tank access, and ladder systems for vertical access. All components are designed to bolt together with stainless steel fasteners, requiring no welding or hot work — a critical advantage in facilities where hot work permits are difficult to obtain and ignition sources must be minimized.
              </p>
              <LinkArrow href="/products/gratings">
                Browse chemical-resistant gratings
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Water and Wastewater Treatment</h3>
              <p>
                Water treatment plants and wastewater facilities deploy FRP profiles in some of the most corrosive conditions in any industrial sector. Clarifier weirs, scum baffles, launders, and channel covers fabricated from FRP provide permanent resistance to the hydrogen sulfide, chlorine, and biogenic sulfuric acid that destroy steel and concrete in these environments.
              </p>
              <p>
                FRP gratings serve as walkway surfaces over treatment basins, filter galleries, and chemical storage areas. Their non-slip surfaces maintain traction even when wet with process water, and their corrosion resistance eliminates the grating replacement cycles that plague steel installations. A typical municipal wastewater plant replacing steel gratings on a 10-year cycle can expect FRP gratings to last 30+ years without replacement, delivering a lifecycle cost reduction of 40% to 55% even though the initial material cost of FRP exceeds steel by approximately 2 to 3 times.
              </p>
              <p>
                FRP handrail and guardrail systems protect workers along basin edges, elevated walkways, and chemical dosing platforms. Our water treatment handrail systems meet OSHA 1910.23 and IBC 2021 guard loading requirements, and they are supplied with permanently colored surfaces (RAL or custom color matching) that never require repainting. The elimination of painting maintenance is particularly valuable in water treatment environments, where paint flakes from corroding handrails fall into open treatment basins and create contamination concerns.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Food Processing Facilities</h3>
              <p>
                FRP profiles in food processing applications must satisfy three simultaneous requirements: corrosion resistance against aggressive cleaning chemicals, compliance with food safety regulations, and structural performance under the dynamic loads of production environments. Our food-grade FRP profiles meet all three.
              </p>
              <p>
                The non-porous surface of pultruded FRP prevents bacterial harbor that occurs in the pits and crevices of corroding steel. Independent laboratory testing per ASTM E2180 (antimicrobial surface test) confirms that our smooth-surface FRP profiles support less than 0.1% bacterial retention after standard CIP cleaning cycles — compared to 2% to 5% retention on corroded steel surfaces cleaned by the same protocol. This difference is significant for HACCP compliance and for meeting microbial count targets in production zone environmental monitoring programs.
              </p>
              <p>
                We supply food-grade FRP structural profiles for equipment support frames, conveyor support structures, and mezzanine framing in production areas. Our food-grade gratings with sealed top surfaces serve as floor systems in wet processing areas, providing both drainage and anti-slip safety. All food-grade profiles are available in light colors (white, cream, light gray) that facilitate visual cleanliness inspection.
              </p>
              <LinkArrow href="/products/custom-pultrusions">
                Explore custom industrial profiles
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Pharmaceutical and Cleanroom Environments</h3>
              <p>
                Pharmaceutical manufacturing facilities require structural materials that do not shed particles, do not support microbial growth, and can be decontaminated with aggressive cleaning agents. FRP profiles meet these requirements inherently. The closed, resin-rich surface of pultruded FRP does not generate particulate shedding under normal mechanical loads, making it suitable for ISO Class 7 and Class 8 cleanroom-adjacent areas.
              </p>
              <p>
                For cleanroom construction, our FRP profiles provide framing for modular wall systems, ceiling grids, and equipment platforms. FRP&apos;s dimensional stability — it does not expand, contract, or warp with humidity changes — maintains the tight tolerances required for cleanroom envelope integrity. This stability is particularly valuable in facilities with adjacent areas at different pressure differentials, where even slight dimensional changes in framing can compromise room pressurization.
              </p>
              <p>
                Our pharmaceutical-grade FRP profiles are available with FM 4910 approval for use in semiconductor and pharmaceutical cleanroom environments, meeting the maximum fire propagation and smoke generation limits required for materials installed in clean manufacturing spaces.
              </p>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Quantified Performance Advantages</h3>
              <ul className="list-none space-y-[13px]">
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Broad chemical resistance</strong> — vinyl ester FRP resists acids, alkalis, and solvents at concentrations that destroy steel within months</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">40-55% lifecycle cost reduction</strong> versus steel gratings on a 30-year basis in corrosive environments</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">UL 94 V-0 self-extinguishing</strong> fire rating with low smoke and low toxicity emissions</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">FDA 21 CFR compliant</strong> resin systems available for food and pharmaceutical contact applications</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Less than 0.1% bacterial retention</strong> after CIP cleaning — 20-50x better than corroded steel surfaces</span>
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
            Products and Resources for Industrial Projects
          </h2>
          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/products/gratings"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Industrial Gratings</h3>
              <p className="text-f13 leading-golden text-t2">
                Chemical-resistant molded and pultruded FRP gratings for process areas, walkways, and platforms.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View product →
              </span>
            </Link>
            <Link
              href="/products/custom-pultrusions"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Custom Pultrusions</h3>
              <p className="text-f13 leading-golden text-t2">
                Bespoke FRP profile cross-sections designed for specific chemical, thermal, and structural requirements.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View product →
              </span>
            </Link>
            <Link
              href="/case-studies/chemical-plant-platform"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Case Study: Chemical Plant Platform</h3>
              <p className="text-f13 leading-golden text-t2">
                FRP platforms and walkways in aggressive chemical environment — vinyl ester resin, zero maintenance.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                Read case study →
              </span>
            </Link>
            <Link
              href="/technology/frp-vs-steel-gratings"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">FRP vs Steel Gratings</h3>
              <p className="text-f13 leading-golden text-t2">
                Corrosion, load capacity, slip resistance, electrical safety, and 30-year lifecycle cost compared between FRP and hot-dip galvanized steel gratings.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                Read comparison →
              </span>
            </Link>
          </div>

          <FAQ items={faqs} suppressSchema />
        </div>
      </section>

      <InnerCTA title="Need chemical-resistant FRP for your facility?" />
    </>
  );
}
