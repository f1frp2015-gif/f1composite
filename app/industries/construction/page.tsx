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
  title: "FRP for Construction",
  description:
    "FRP profiles for construction: corrosion-free facades, FRP window frames and FRP window profiles, thermally broken fenestration systems, lightweight cladding support. Outperforms steel, aluminum, and PVC.",
  path: "/industries/construction",
  image: "/industries/construction/opengraph-image",
});

const answerItems = [
  {
    question: "Why use FRP in construction?",
    answer:
      "FRP is used in construction because it combines low thermal conductivity, corrosion resistance, and high specific strength, making it well suited to facades, fenestration, and lightweight support structures.",
  },
  {
    question: "Can FRP replace aluminium in window and facade systems?",
    answer:
      "Yes. FRP can replace aluminium in many window, curtain wall, and facade support applications where thermal bridging, corrosion, or galvanic compatibility are major design constraints.",
  },
  {
    question: "What is the main thermal advantage of FRP?",
    answer:
      "The main thermal advantage is that FRP is inherently insulating, so it can provide structural framing without the separate thermal break assemblies required by aluminium systems.",
  },
  {
    question: "Where is FRP most valuable in buildings?",
    answer:
      "FRP is most valuable in thermally demanding envelopes, coastal buildings, corrosive environments, and modular systems where lower weight and lower maintenance improve project economics.",
  },
];

const faqs = [
  {
    question: "Can FRP profiles replace aluminum in curtain wall systems?",
    answer:
      "Yes. Pultruded FRP profiles match or exceed the structural performance of aluminum extrusions in curtain wall mullions and transoms, while delivering thermal conductivity that is roughly 1/500th that of aluminum. This eliminates the need for separate thermal break inserts and simplifies fabrication. Our fenestration-grade profiles are engineered to meet EN 14024 and AAMA 507 performance requirements for curtain wall framing.",
  },
  {
    question: "What fire rating can FRP profiles achieve in buildings?",
    answer:
      "Our construction-grade FRP profiles are formulated with halogen-free flame-retardant resin systems that achieve Class B-s1, d0 reaction to fire per EN 13501-1, equivalent to Euroclass B. For specific projects requiring additional compliance, we offer profiles tested to ASTM E84 Class A (flame spread index under 25, smoke-developed index under 450). Fire performance data sheets are available upon request.",
  },
  {
    question: "How do FRP profiles perform in seismic zones?",
    answer:
      "FRP profiles offer significant advantages in seismic design. At roughly one-quarter the density of steel, FRP reduces dead load on structural connections and foundations, lowering seismic forces proportionally. The material also absorbs vibration energy effectively due to its viscoelastic resin matrix. Our profiles have been specified in seismic retrofit projects across Japan, Turkey, and the western United States.",
  },
  {
    question: "What is the expected lifespan of FRP in a building envelope?",
    answer:
      "Pultruded FRP profiles carry a design life of 50 to 75 years in building envelope applications when specified correctly. Unlike aluminum, FRP does not corrode in coastal or industrial atmospheres. Unlike timber, it does not rot or attract insects. Accelerated aging tests per ASTM G154 and ISO 4892-3 confirm that UV-stabilized FRP profiles retain over 90% of their flexural strength after the equivalent of 30 years of outdoor exposure.",
  },
];

export default function ConstructionPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FRP Composite Profiles for Construction",
    description:
      "FRP profiles for construction: corrosion-free facades, FRP window frames and FRP window profiles, thermally broken fenestration systems, lightweight cladding support. Outperforms steel, aluminum, and PVC.",
    url: absoluteUrl("/industries/construction"),
    about: {
      "@type": "Thing",
      name: "Fiber-Reinforced Polymer profiles for the construction industry",
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
        tag="Industries / Construction"
        title="FRP Composite Profiles for Construction"
        description="Fiber-reinforced polymer (FRP) profiles are redefining how architects and structural engineers approach building envelopes, facades, and structural framing — replacing steel and aluminum with corrosion-free, thermally efficient alternatives."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Construction" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/industries/frp-construction-modern-building-facade.jpg"
              alt="Modern building facade with composite structural profiles for construction applications"
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
        tag="Construction Answers"
        title="Short answers for facade, envelope, and framing decisions"
        description="These answer blocks make the construction use case easier to quote, summarize, and reuse in search and AI-generated responses."
        items={answerItems}
        suppressSchema
      />

      {/* Challenge Section */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The Challenge</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Why Traditional Materials Fall Short in Modern Construction
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Modern construction demands materials that perform across multiple axes simultaneously: structural capacity, thermal efficiency, corrosion resistance, design flexibility, and long-term durability. Traditional materials — steel, aluminum, and timber — excel in some of these areas but fall critically short in others. Steel corrodes aggressively in coastal and industrial atmospheres, requiring ongoing maintenance cycles that drive lifecycle costs well above initial material savings. Aluminum, while corrosion-resistant, conducts heat at roughly 200 W/mK, creating thermal bridges that undermine building envelope performance and violate increasingly stringent energy codes.
              </p>
              <p>
                Thermal bridging alone accounts for up to 30% of total heat loss through a building facade, according to research published by the Passive House Institute. In curtain wall and window framing applications, aluminum extrusions require complex polyamide thermal break inserts to meet modern U-value targets. These multi-piece assemblies increase fabrication cost, introduce potential failure points at adhesive bonds, and still conduct more heat than a monolithic FRP profile.
              </p>
              <p>
                Weight is another persistent challenge. Steel facade support structures add significant dead load to the primary structure, increasing foundation requirements and material quantities throughout the building. In high-rise construction, every kilogram of facade dead load translates directly to additional steel tonnage in the structural frame and increased concrete volume in foundations.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Corrosion represents perhaps the most insidious cost driver. A 2019 study by the National Association of Corrosion Engineers estimated that corrosion costs the global construction industry over $2.5 trillion annually. Steel window lintels, balcony connections, and facade brackets embedded in concrete are particularly vulnerable — once corrosion initiates behind cladding or within wall cavities, remediation requires partial facade disassembly, creating disruption and expense that far exceeds the original material cost.
              </p>
              <p>
                Moisture management compounds the problem. Galvanic corrosion occurs wherever dissimilar metals contact each other — a common scenario in facade assemblies that combine steel structure, aluminum cladding support, and stainless steel fixings. Isolating these materials with nylon washers and neoprene gaskets adds labor and still leaves residual risk.
              </p>
              <p>
                These converging challenges — thermal performance, weight, corrosion, and galvanic compatibility — create a clear engineering case for a material that addresses all four simultaneously. Fiber-reinforced polymer (FRP) composites, produced through the pultrusion process, deliver exactly that combination.
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
            Pultruded FRP Profiles for Building Envelopes and Structural Framing
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Window Frames and Fenestration Systems</h3>
              <p>
                FRP window and door frames offer a thermal conductivity of approximately 0.3 W/mK — roughly 1/500th that of aluminum and comparable to high-performance timber. This means an FRP frame achieves Passive House-level thermal performance without the complex multi-chamber polyamide break inserts that aluminum systems require. A single FRP extrusion replaces what would otherwise be a three-piece aluminum and thermal break assembly.
              </p>
              <p>
                Our fenestration-grade profiles are engineered with a coefficient of thermal expansion (CTE) closely matching that of glass at approximately 8 x 10^-6 /K. This thermal compatibility reduces stress on sealant joints and minimizes the risk of seal failure over repeated heating and cooling cycles. By contrast, aluminum frames expand at roughly three times the rate of glass, placing constant cyclic stress on perimeter seals.
              </p>
              <p>
                The dimensional stability of pultruded FRP profiles also means tighter manufacturing tolerances. Our fenestration profiles hold straightness to within 1mm per meter and cross-sectional dimensions to +/- 0.15mm, enabling precise mitre joints and reliable hardware mounting without the shimming and adjustment that field-bent aluminum sometimes requires.
              </p>
              <LinkArrow href="/products/fenestration-systems">
                Explore fenestration systems
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Cladding Support and Facade Brackets</h3>
              <p>
                Pultruded FRP angles, channels, and custom brackets replace galvanized steel and aluminum in rainscreen and ventilated facade support systems. At approximately 1.8 g/cm3, FRP is roughly 75% lighter than steel and 35% lighter than aluminum, reducing dead load on the primary structure and simplifying installation logistics.
              </p>
              <p>
                FRP cladding support is inherently immune to both atmospheric corrosion and galvanic corrosion. This is particularly valuable in ventilated facade cavities where condensation is common and different metals traditionally require isolation. An FRP bracket can directly contact aluminum cladding, stainless steel fixings, or concrete embedments without any risk of galvanic reaction. This eliminates isolator gaskets and simplifies detailing.
              </p>
              <p>
                We supply standard L-angles, T-profiles, and U-channels suitable for common facade systems, alongside custom-pultruded bracket profiles designed to specific project geometries and load requirements. All cladding support profiles are available with UV-stabilized surfaces or factory-applied coatings for exposed applications.
              </p>
              <LinkArrow href="/products/standard-profiles">
                Browse standard profiles
              </LinkArrow>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Structural Profiles for Framing and Reinforcement</h3>
              <p>
                Pultruded FRP I-beams, H-sections, tubes, and box profiles provide structural framing solutions for applications where corrosion, thermal performance, or electromagnetic transparency is critical. While FRP has a lower elastic modulus than steel (typically 25-40 GPa versus 200 GPa for steel), its high strength-to-weight ratio means that appropriately sized FRP members can match the load-carrying capacity of steel sections at roughly 20% of the weight.
              </p>
              <p>
                In concrete reinforcement applications, FRP rebar and dowel bars eliminate corrosion-induced spalling — the single largest cause of concrete structure deterioration in coastal and de-icing salt environments. FRP-reinforced concrete balcony slabs and parapets are increasingly specified by structural engineers who need to eliminate cold bridges at slab edges. Because FRP has thermal conductivity comparable to concrete itself, an FRP connection through an insulation layer does not create the thermal bridge that a steel connection would.
              </p>
              <p>
                We also supply FRP structural profiles for modular building systems. Our profiles can be drilled, cut, and bolted using conventional tools and standard stainless steel fasteners, with no welding required. This makes FRP framing particularly efficient for prefabricated facade panels, modular bathroom pods, and other off-site construction methods where factory assembly speed directly affects project economics.
              </p>
              <LinkArrow href="/products/standard-profiles">
                View structural profiles
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Quantified Performance Advantages</h3>
              <ul className="list-none space-y-[13px]">
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">75% weight reduction</strong> versus steel in facade support brackets, enabling faster installation and reduced crane time</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Thermal conductivity of 0.3 W/mK</strong> — eliminates the need for separate thermal break inserts in window and curtain wall framing</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Zero corrosion maintenance</strong> for 50+ years, even in coastal and industrial atmospheres</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">CTE matching glass</strong> at 8 x 10^-6 /K, reducing sealant stress and improving long-term weathertightness</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Class B-s1, d0 fire rating</strong> available per EN 13501-1 for facade and interior applications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products and Cross-links */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Products and Resources for Construction Projects
          </h2>
          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/products/fenestration-systems"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Fenestration Systems</h3>
              <p className="text-f13 leading-golden text-t2">
                Thermally broken FRP window and door frame profiles for Passive House and high-performance building envelopes.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View product →
              </span>
            </Link>
            <Link
              href="/products/standard-profiles"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Standard Profiles</h3>
              <p className="text-f13 leading-golden text-t2">
                I-beams, angles, channels, and tubes for structural framing and facade support in construction applications.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View product →
              </span>
            </Link>
            <Link
              href="/case-studies/fenestration-residential"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Case Study: Residential Fenestration</h3>
              <p className="text-f13 leading-golden text-t2">
                FRP window and door frames delivering thermal performance and durability in residential construction.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View case studies →
              </span>
            </Link>
            <Link
              href="/technology/frp-vs-aluminum-windows"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">FRP vs Aluminum Windows</h3>
              <p className="text-f13 leading-golden text-t2">
                U-value, thermal bridging, condensation, and passive-house suitability compared between pultruded FRP and thermally-broken aluminum frames.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                Read comparison →
              </span>
            </Link>
            <Link
              href="/technology/frp-vs-pvc-windows"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">FRP vs PVC Windows</h3>
              <p className="text-f13 leading-golden text-t2">
                Thermal performance, structural capacity, UV stability, and fire safety compared between pultruded FRP and triple-chamber uPVC window frames.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                Read comparison →
              </span>
            </Link>
          </div>

          <FAQ items={faqs} suppressSchema />
        </div>
      </section>

      <InnerCTA title="Planning a construction project with FRP?" />
    </>
  );
}
