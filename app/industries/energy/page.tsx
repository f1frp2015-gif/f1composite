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
  title: "FRP for Energy & Power",
  description:
    "FRP profiles for substations, transmission cross-arms, cable trays, solar mounting, wind turbines, and transformer spacers. Non-conductive, non-magnetic, maintenance-free.",
  path: "/industries/energy",
  image: "/industries/energy/opengraph-image",
});

const faqs = [
  {
    question: "What dielectric strength do FRP profiles provide for electrical insulation?",
    answer:
      "Our pultruded FRP profiles achieve a dielectric strength of 12 to 16 kV/mm (perpendicular to fibers) per ASTM D149, which is sufficient for insulation applications up to medium-voltage switchgear environments (36 kV class). For high-voltage applications, we offer profiles with enhanced resin systems achieving 20+ kV/mm. All electrical-grade profiles are tested to IEC 62217 and IEEE C57.19 standards as applicable. Unlike metals, FRP does not conduct fault currents, eliminating arc flash propagation risk in cable management systems.",
  },
  {
    question: "Can FRP profiles withstand prolonged UV exposure in outdoor energy installations?",
    answer:
      "Yes. Our energy-grade FRP profiles incorporate UV-stabilized polyester or vinyl ester resin systems with integrated UV absorbers and hindered amine light stabilizers (HALS). Accelerated weathering tests per ASTM G154 (Cycle 1, 2000 hours) show less than 5% reduction in flexural strength and negligible color change (Delta E under 3). Field installations in desert solar farms and equatorial locations have demonstrated stable performance for over 20 years. For the most demanding UV environments, we offer profiles with factory-applied acrylic or polyurethane surface veils that provide additional UV and weathering protection.",
  },
  {
    question: "Are FRP cable trays approved for use in power generation facilities?",
    answer:
      "Our FRP cable trays are manufactured to comply with NEMA VE 1 (Cable Tray Systems) and are UL classified per UL 2433 (FRP Cable Tray Systems). They meet the fire performance requirements of IEEE 383 flame test and NRC Regulatory Guide 1.75 for nuclear power plant applications. FRP cable trays are installed in thermal power stations, nuclear facilities, hydroelectric dams, and renewable energy plants worldwide. Their non-conductive, non-sparking properties make them preferred in environments where metallic trays would require additional grounding and create fault current paths.",
  },
  {
    question: "How do FRP profiles perform in high-temperature environments near transformers?",
    answer:
      "Standard pultruded FRP profiles with polyester resin retain full mechanical properties at continuous operating temperatures up to 120 degrees Celsius. For applications near transformers, switchgear, or other heat-generating equipment, we offer profiles with high-temperature vinyl ester resin systems rated for continuous operation at 150 to 180 degrees Celsius. Our transformer spacer and standoff profiles are specifically formulated to maintain dimensional stability and dielectric performance under combined thermal and electrical stress over a 30+ year service life.",
  },
  {
    question: "How do FRP cross-arms compare to wood and steel in transmission lines?",
    answer:
      "FRP cross-arms weigh 60-70% less than wood equivalents, do not rot or attract woodpeckers, and maintain consistent dielectric properties over 50+ years. Unlike wood, FRP does not absorb moisture, so its insulation value remains stable in rain, fog, and high-humidity conditions. Compared to steel cross-arms, FRP eliminates the need for separate post insulators and grounding systems. Lifecycle cost analysis typically shows 30-40% savings over wood and 50%+ savings over steel when maintenance, replacement, and outage costs are included.",
  },
  {
    question: "Can FRP replace steel in substation structural frameworks?",
    answer:
      "FRP is increasingly used for substation bus support structures, equipment stands, lightning mast poles, and cable trench covers. The non-conductive property eliminates touch potential and step potential hazards during fault events — a significant safety advantage over grounded steel structures. FRP substation structures also eliminate induced currents and magnetic interference that affect protection relays and metering equipment. For seismic zones, the 75% weight reduction versus steel significantly reduces foundation requirements and improves earthquake resilience.",
  },
];

export default function EnergyPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FRP Composite Profiles for the Energy Sector",
    description:
      "FRP profiles for energy: insulating cable ladders, UV-resistant solar frames, non-magnetic transformer spacers, wind turbine components.",
    url: absoluteUrl("/industries/energy"),
    about: {
      "@type": "Thing",
      name: "Fiber-Reinforced Polymer profiles for energy applications",
    },
    provider: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <PageHeader
        tag="Industries / Energy & Power"
        title="FRP Composite Profiles for Energy & Electric Power"
        description="Fiber-reinforced polymer (FRP) profiles combine electrical insulation, UV resistance, and non-magnetic properties for substations, transmission lines, power generation, and renewable energy installations."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Energy" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/industries/frp-energy-solar-power-installation.jpg"
              alt="Solar power installation with composite mounting systems for renewable energy applications"
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
        tag="Energy Answers"
        title="Short answers for power, cable management, and renewables"
        description="These answer blocks are tuned for electrical, renewable, and utility contexts where insulation, UV stability, and non-magnetic behavior matter."
        items={[
          {
            question: "Why use FRP in energy applications?",
            answer:
              "FRP is used in energy applications because it provides electrical insulation, corrosion resistance, low weight, and good long-term performance in outdoor and high-voltage environments.",
          },
          {
            question: "Where is FRP commonly used in the energy sector?",
            answer:
              "Common uses include cable trays, ladders, transformer spacers, insulating supports, solar mounting elements, wind turbine components, and substation structures.",
          },
          {
            question: "What is the main safety advantage of FRP in power facilities?",
            answer:
              "The main safety advantage is that FRP is non-conductive, so it does not create the same fault-current and grounding issues that metallic support systems can introduce.",
          },
          {
            question: "Why is FRP attractive for renewable energy projects?",
            answer:
              "FRP is attractive for renewables because it combines UV durability, low maintenance, corrosion resistance, and reduced structural weight over long service periods.",
          },
        ]}
      />

      {/* Challenge Section */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The Challenge</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Material Limitations in Modern Energy Infrastructure
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                The energy sector operates under a unique combination of material stresses that disqualify most traditional materials from critical applications. Electrical conductivity, magnetic permeability, corrosion from chemical exposure, UV degradation from outdoor installation, and extreme temperature cycling create an environment where steel, aluminum, and timber each fail in specific and predictable ways.
              </p>
              <p>
                Steel cable trays and support structures in power generation facilities conduct fault currents, creating arc flash hazards that endanger maintenance personnel and can propagate electrical failures across systems. The National Fire Protection Association (NFPA) estimates that arc flash incidents cause over 2,000 injuries per year in the United States alone. Metallic cable management systems require elaborate grounding, bonding, and fault current calculations that add engineering cost and installation complexity.
              </p>
              <p>
                In transformer and switchgear environments, steel structural supports create magnetic interference that affects sensitive monitoring and protection equipment. Eddy currents induced in steel members near high-current conductors generate localized heating, reducing both the efficiency and lifespan of surrounding equipment. Non-magnetic materials like aluminum address this concern but introduce their own problems: galvanic corrosion where aluminum contacts copper conductors, and significantly lower strength-to-weight ratio than steel.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Renewable energy installations face distinct challenges. Solar farm mounting structures must withstand 25+ years of uninterrupted UV exposure, thermal cycling from -40 to +85 degrees Celsius, and corrosive ground conditions — often in coastal, desert, or agricultural environments where soil chemistry accelerates metal corrosion. Galvanized steel mounting rails lose their zinc coating within 10 to 15 years in aggressive environments, after which base metal corrosion begins.
              </p>
              <p>
                Wind turbine nacelle components operate under sustained vibration, cyclic loading, and exposure to salt-laden air in offshore installations. Lightning strike protection requires careful management of conductive pathways, and any structural material used in nacelle interiors or blade roots must be both lightweight and non-conductive to avoid creating unintended current paths.
              </p>
              <p>
                Cable management in energy facilities presents particular complexity. Underground cable vaults flood periodically, substation cable trays are exposed to transformer oil mist, and offshore platform cable routes face continuous salt spray. In each environment, steel cable trays corrode, galvanized coatings degrade, and stainless steel adds prohibitive cost. These converging requirements — electrical insulation, non-magnetic behavior, corrosion immunity, UV stability, and lightweight strength — point directly to fiber-reinforced polymer (FRP) composites as the optimal material solution.
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
            Pultruded FRP Profiles for Power, Renewables, and Energy Infrastructure
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Cable Ladders and Cable Tray Systems</h3>
              <p>
                Pultruded FRP cable ladders and trays provide the backbone of cable management in power generation and distribution facilities. Our cable tray systems are manufactured from continuous glass fiber reinforcement in fire-retardant polyester or vinyl ester resin, achieving load capacities matching steel trays at approximately 40% of the weight. A standard 600mm FRP cable tray weighs roughly 6 kg/m versus 14 kg/m for equivalent galvanized steel, reducing structural load on overhead support systems and simplifying installation in confined spaces.
              </p>
              <p>
                The electrical non-conductivity of FRP cable trays eliminates fault current paths, removing the need for grounding conductors, bonding jumpers, and the associated engineering calculations required by NEC Article 392. In a typical power plant cable routing, this saves approximately 15% on total cable tray system installed cost when grounding materials and labor are included. More importantly, it eliminates the arc flash risk that metallic cable trays create during cable insulation failure events.
              </p>
              <p>
                Our cable tray systems are available in ladder, solid-bottom, and ventilated trough configurations, in widths from 150mm to 900mm and side rail heights from 50mm to 150mm. All systems include matching covers, reducers, tees, elbows, and vertical risers for complete routing solutions.
              </p>
              <LinkArrow href="/products/gratings">
                Browse cable tray and grating systems
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Transformer Spacers and Insulating Standoffs</h3>
              <p>
                FRP profiles serve as structural spacers, coil supports, and insulating standoffs within power transformers and switchgear enclosures. These components must simultaneously provide mechanical support, electrical insulation, and thermal stability under the combined stress of electromagnetic forces, heat generation, and dielectric loading.
              </p>
              <p>
                Our transformer-grade FRP profiles are pultruded from E-glass reinforcement in high-temperature vinyl ester resin systems, providing continuous operating temperature ratings of 150 to 180 degrees Celsius. Dielectric strength exceeds 16 kV/mm perpendicular to the fiber direction, with arc resistance of over 180 seconds per ASTM D495. These properties are maintained throughout a design life of 30+ years under continuous thermal and electrical stress.
              </p>
              <p>
                The non-magnetic nature of FRP eliminates eddy current heating that steel spacers would generate in the intense magnetic fields within transformer cores. This reduces parasitic losses and prevents localized hot spots that degrade insulating oil and adjacent paper insulation. Transformer manufacturers who have switched from steel to FRP spacers report measurable improvements in transformer efficiency and reduced dissolved gas levels in oil analysis.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Wind Turbine Components</h3>
              <p>
                Pultruded FRP profiles are used in wind turbine nacelle structural frames, blade root inserts, and tower internal platforms. In nacelle applications, FRP profiles provide structural support for equipment mounting without creating conductive paths that could channel lightning strike energy. The material&apos;s high specific strength — tensile strength divided by density — exceeds that of structural steel by a factor of three, enabling lighter nacelle structures that reduce loads on the tower and foundation.
              </p>
              <p>
                For offshore wind installations, FRP&apos;s immunity to saltwater corrosion eliminates the maintenance access challenges that corroding steel internal structures create. Offshore turbine maintenance visits cost $50,000 to $150,000 per occurrence due to vessel mobilization; any reduction in maintenance frequency delivers outsized economic benefit. FRP nacelle components and access platforms require zero corrosion maintenance over their full 25+ year turbine design life.
              </p>
              <LinkArrow href="/products/standard-profiles">
                Explore standard structural profiles
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Solar Panel Frames and Mounting Systems</h3>
              <p>
                FRP profiles for solar installations address the durability gap in conventional aluminum and galvanized steel mounting systems. In utility-scale solar farms, ground-mounted racking systems face 25 to 30 years of continuous UV exposure, thermal cycling, and soil chemistry corrosion. Pultruded FRP mounting rails and support posts are immune to these degradation mechanisms.
              </p>
              <p>
                The coefficient of thermal expansion of FRP (8 to 10 x 10^-6 /K) closely matches that of glass and silicon, reducing thermal stress on panel attachment points during daily temperature cycling. This minimizes micro-cracking in solar cells at mounting locations — a failure mode that causes gradual power output degradation in panels mounted on high-CTE aluminum frames.
              </p>
              <p>
                For floating solar installations on reservoirs and retention ponds, FRP&apos;s corrosion immunity and lightweight density make it the preferred framing material. A floating solar array framed in FRP weighs approximately 30% less than an equivalent aluminum-framed system, reducing pontoon buoyancy requirements and enabling higher panel density per float unit.
              </p>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Substation Structures and Transmission Cross-Arms</h3>
              <p>
                Pultruded FRP I-beams, channels, and angles serve as bus support structures, equipment stands, and cable trench covers in substations from 33 kV to 500 kV. The inherent non-conductivity eliminates touch and step potential hazards during fault events. For a typical 220 kV substation, this removes $200,000-$500,000 in grounding infrastructure.
              </p>
              <p>
                FRP transmission line cross-arms replace wood and steel from 11 kV to 220 kV. Unlike wood, FRP does not absorb moisture — maintaining full insulation value in rain, fog, and ice conditions. FRP cross-arms weigh 60-70% less than wood, last 50+ years with zero maintenance, and eliminate the 15-25 year replacement cycle and associated planned outages.
              </p>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Quantified Performance Advantages</h3>
              <ul className="list-none space-y-[13px]">
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Dielectric strength of 12-16 kV/mm</strong> — inherent electrical insulation eliminates arc flash risk in cable management</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">40% weight reduction</strong> in cable tray systems versus galvanized steel, with matching load capacity</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Non-magnetic permeability</strong> — eliminates eddy current losses and magnetic interference near transformers</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">25+ year UV stability</strong> confirmed by accelerated weathering with less than 5% strength reduction</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Continuous operating temperature to 180 degrees Celsius</strong> with high-temperature vinyl ester resin systems for transformer applications</span>
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
            Products and Resources for Energy Applications
          </h2>
          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/products/standard-profiles"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Standard Profiles</h3>
              <p className="text-f13 leading-golden text-t2">
                Structural FRP profiles for nacelle framing, equipment support, and solar mounting systems.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View product →
              </span>
            </Link>
            <Link
              href="/products/gratings"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Gratings and Cable Trays</h3>
              <p className="text-f13 leading-golden text-t2">
                Non-conductive FRP cable trays and platform gratings for substations, power plants, and renewable energy facilities.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View product →
              </span>
            </Link>
            <Link
              href="/case-studies/solar-farm-mounting"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Case Study: Solar Farm Mounting</h3>
              <p className="text-f13 leading-golden text-t2">
                FRP mounting structures for solar farms — non-conductive, corrosion-free, 30+ year service life.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                Read case study →
              </span>
            </Link>
          </div>

          <FAQ items={faqs} />
        </div>
      </section>

      <InnerCTA title="Need FRP solutions for your energy project?" />
    </>
  );
}
