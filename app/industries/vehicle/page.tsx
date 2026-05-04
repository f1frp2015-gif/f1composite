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
  title: "FRP for Vehicle & Transport",
  description:
    "Lightweight pultruded FRP profiles for commercial vehicles, buses, rail cars, and specialty transport — 75% lighter than steel, corrosion-free.",
  path: "/industries/vehicle",
  image: "/industries/vehicle/opengraph-image",
});

const answerItems = [
  {
    question: "Why use FRP in vehicle construction?",
    answer:
      "FRP is 75% lighter than steel with comparable strength, does not corrode, and requires no protective coatings. This reduces vehicle weight, extends service life, and lowers maintenance costs across the vehicle lifecycle.",
  },
  {
    question: "Where is FRP used in vehicles?",
    answer:
      "Body framing members, floor cross-beams, roof bows, side pillars, cable conduits, interior panel supports, luggage rack structures, exterior cladding supports, and underframe components.",
  },
  {
    question: "Is FRP suitable for electric vehicles?",
    answer:
      "Yes. The weight savings extend battery range, and the electrical insulation property provides inherent isolation between battery systems and vehicle structure — reducing high-voltage safety engineering complexity.",
  },
  {
    question: "Does FRP meet fire safety standards for rail?",
    answer:
      "Yes. Phenolic and modified acrylic resin FRP profiles meet EN 45545-2 fire, smoke, and toxicity requirements for rail vehicle interior and exterior applications.",
  },
];

const faqs = [
  {
    question: "How much weight can FRP profiles save in vehicle applications?",
    answer:
      "Pultruded FRP profiles are approximately 75% lighter than steel and 30% lighter than aluminum at equivalent structural performance. For a typical bus body structure, replacing steel framing with FRP can reduce body-in-white weight by 300 to 600 kg — translating directly to increased payload capacity, reduced fuel consumption, or extended battery range in electric vehicles. Every 100 kg of weight reduction in a commercial vehicle saves approximately 0.3 to 0.5 liters of diesel per 100 km, or extends electric range by 1 to 2 km per charge cycle.",
  },
  {
    question: "Are FRP profiles suitable for structural vehicle body framing?",
    answer:
      "Yes. Pultruded FRP profiles achieve tensile strength of 240 to 400 MPa and flexural modulus of 15 to 25 GPa depending on fiber architecture and resin system. These properties are sufficient for secondary and tertiary structural members in vehicle bodies — longitudinal rails, cross-members, roof bows, side pillars, and floor support beams. For primary crash structures, FRP is typically used in combination with metallic members in a hybrid design approach that optimizes both weight and energy absorption.",
  },
  {
    question: "How does FRP perform in rail vehicle applications?",
    answer:
      "FRP profiles meet fire, smoke, and toxicity (FST) requirements per EN 45545-2 when manufactured with fire-retardant or modified acrylic resin systems. They are used in rail vehicle interior panel framing, cable conduits, window surrounds, luggage rack structures, and exterior body cladding supports. The non-conductive property of FRP is particularly valuable in electric rail vehicles where stray current corrosion and electrical insulation are critical design considerations. FRP also provides excellent vibration damping — 5 to 10 times higher than steel — reducing noise transmission in passenger compartments.",
  },
  {
    question: "What is the corrosion advantage of FRP in vehicle applications?",
    answer:
      "Vehicles operating in environments with road salt, coastal exposure, agricultural chemicals, or industrial atmospheres suffer accelerated steel corrosion that shortens vehicle life and increases maintenance cost. FRP profiles are immune to all forms of electrochemical corrosion, galvanic corrosion, and chemical attack from road salts, de-icing fluids, and cleaning chemicals. This makes FRP particularly valuable for bus underframes, truck body structures operating in corrosive environments, and rail vehicles in coastal or tunnel service where condensation and salt exposure are chronic.",
  },
];

export default function VehiclePage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FRP Composite Profiles for Vehicle and Transport Applications",
    description:
      "Lightweight pultruded FRP profiles for commercial vehicles, buses, rail cars, and specialty transport.",
    url: absoluteUrl("/industries/vehicle"),
    about: {
      "@type": "Thing",
      name: "Fiber-Reinforced Polymer profiles for vehicle and transport applications",
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
        tag="Industries / Vehicle"
        title="FRP Composite Profiles for Vehicle & Transport"
        description="Pultruded FRP profiles deliver 75% weight savings over steel with zero corrosion maintenance — enabling lighter, more durable, and more efficient commercial vehicles, buses, rail cars, and specialty transport."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Vehicle" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/industries/frp-vehicle-transport-applications.jpg"
              alt="Modern high-speed train representing advanced composite applications in rail and transport"
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
        tag="Vehicle Answers"
        title="Short answers for transport engineers and vehicle designers"
        description="Quick-reference answers for evaluating FRP profiles in vehicle body structures, rail interiors, and specialty transport."
        items={answerItems}
        suppressSchema
      />

      {/* Challenge Section */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The Challenge</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Weight, Corrosion, and Lifecycle Cost in Commercial Transport
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Commercial vehicles, buses, and rail cars face a fundamental tension between structural performance and weight. Every kilogram of vehicle structure is a kilogram that cannot carry passengers or cargo. In an era of tightening emission standards and accelerating electrification, weight reduction has moved from a competitive advantage to an engineering imperative.
              </p>
              <p>
                Steel remains the dominant structural material in commercial vehicle bodies, but its density penalty is severe. A typical steel-framed bus body weighs 2,500 to 3,500 kg — structure that carries no passengers and consumes fuel with every kilometer. For electric buses, this dead weight directly reduces battery range: every 100 kg of unnecessary structure costs 1 to 2 km of range per charge cycle, compounding over hundreds of thousands of kilometers of service life.
              </p>
              <p>
                Aluminum reduces weight by approximately 40% versus steel but introduces galvanic corrosion at joints with steel fasteners and is significantly more expensive. Aluminum bus bodies also require specialized welding capabilities that increase manufacturing cost and limit the supply base.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Corrosion is the primary life-limiting factor for commercial vehicle bodies. Buses and trucks operating in regions with road salt, coastal exposure, or industrial atmospheres develop structural corrosion that requires expensive remediation or forces premature retirement. The average city bus in northern climates requires body structural repair within 8 to 12 years of service — well before its mechanical drivetrain reaches end of life.
              </p>
              <p>
                Rail vehicles face similar challenges. Metro and commuter rail cars operating in tunnel environments with chronic condensation and salt-laden air from coastal locations suffer underframe and body structure corrosion that drives major mid-life overhaul programs. Fire safety adds another constraint: rail interior materials must meet EN 45545-2 fire, smoke, and toxicity (FST) requirements that exclude many lightweight alternatives to steel.
              </p>
              <p>
                The transport industry needs a material that simultaneously delivers steel-class structural performance, aluminum-class weight, zero corrosion maintenance, and compliance with fire safety standards. Pultruded FRP composites address this full specification.
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
            Pultruded FRP Profiles for Vehicle and Transport Applications
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Bus and Coach Body Structures</h3>
              <p>
                Pultruded FRP profiles replace steel in bus body framing — longitudinal rails, cross-members, roof bows, side pillars, and floor support beams. At 75% lighter than steel with comparable flexural strength, FRP framing reduces body-in-white weight by 300 to 600 kg. For electric buses, this weight saving translates directly to 3 to 12 km of additional range per charge cycle.
              </p>
              <p>
                The corrosion immunity of FRP eliminates the primary life-limiting factor for bus bodies. While steel-framed buses in salt-exposure environments require structural repair within 8 to 12 years, FRP-framed buses maintain full structural integrity for 25+ years with zero corrosion maintenance. This enables fleet operators to align body life with drivetrain life, maximizing asset utilization.
              </p>
              <LinkArrow href="/products/standard-profiles">
                Browse structural profiles
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Rail Vehicle Applications</h3>
              <p>
                FRP profiles serve as interior panel framing, cable conduits, window surrounds, luggage rack structures, and exterior body cladding supports in rail vehicles. Phenolic resin FRP profiles meet EN 45545-2 hazard levels HL2 and HL3 for fire, smoke, and toxicity — qualifying them for metro, commuter, and intercity rail applications.
              </p>
              <p>
                The vibration damping of FRP is 5 to 10 times higher than steel, measurably reducing noise transmission through structural connections into passenger compartments. For electric rail vehicles, the non-conductive property provides inherent isolation against stray current paths that cause corrosion of track infrastructure and adjacent metallic components.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Commercial Truck and Specialty Vehicles</h3>
              <p>
                Pultruded FRP profiles are used in refrigerated truck body framing, utility vehicle platforms, fire truck equipment mounts, and military vehicle structural components. The combination of lightweight strength, corrosion immunity, and thermal insulation makes FRP particularly effective for refrigerated transport — where reduced body weight increases payload capacity and the low thermal conductivity of FRP (0.3 W/m·K versus 50 W/m·K for steel) reduces refrigeration energy consumption.
              </p>
              <p>
                For utility vehicles operating in corrosive industrial environments — waste collection, chemical transport, agricultural service — FRP body structures eliminate the chronic corrosion maintenance that shortens the service life of steel-framed vehicles.
              </p>
              <LinkArrow href="/products/custom-pultrusions">
                Custom profiles for vehicle applications
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Quantified Performance Advantages</h3>
              <ul className="list-none space-y-[13px]">
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">75% lighter than steel</strong> — 300-600 kg body weight reduction per vehicle</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Zero corrosion</strong> — eliminates the primary life-limiting factor for vehicle bodies in salt/chemical environments</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">EN 45545-2 compliant</strong> — fire-retardant FRP meets rail fire, smoke, and toxicity requirements</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">5-10x vibration damping</strong> versus steel — measurable noise reduction in passenger compartments</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Electrically insulating</strong> — inherent HV isolation for electric vehicle battery compartment structures</span>
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
            Products for Vehicle Applications
          </h2>
          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/products/standard-profiles"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Standard Profiles</h3>
              <p className="text-f13 leading-golden text-t2">
                I-beams, channels, angles, and tubes for vehicle body framing and structural applications.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View products →
              </span>
            </Link>
            <Link
              href="/products/custom-pultrusions"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Custom Pultrusions</h3>
              <p className="text-f13 leading-golden text-t2">
                Application-specific cross-sections optimized for vehicle body geometry, load paths, and mounting interfaces.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View capabilities →
              </span>
            </Link>
            <Link
              href="/technology/frp-vs-traditional-materials"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">FRP vs Traditional Materials</h3>
              <p className="text-f13 leading-golden text-t2">
                Property-by-property comparison of FRP against steel, aluminum, timber, and concrete.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View comparison →
              </span>
            </Link>
          </div>

          <FAQ items={faqs} suppressSchema />
        </div>
      </section>

      <InnerCTA title="Need FRP profiles for your vehicle or transport project?" />
    </>
  );
}
