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
  title: "FRP for Marine",
  description:
    "FRP profiles for marine: corrosion-proof docks, offshore gratings, ship interiors, walkways. Withstands continuous saltwater exposure.",
  path: "/industries/marine",
  image: "/industries/marine/opengraph-image",
});

const faqs = [
  {
    question: "How does FRP resist saltwater corrosion compared to stainless steel?",
    answer:
      "FRP is fundamentally immune to the chloride-induced corrosion mechanisms that attack even marine-grade stainless steels. While 316L stainless steel resists general corrosion in seawater, it remains susceptible to pitting, crevice corrosion, and stress corrosion cracking — failure modes that account for the majority of stainless steel failures in marine service. FRP has no metallic content and therefore cannot corrode by any electrochemical mechanism. Immersion tests per ASTM C581 confirm that our vinyl ester FRP profiles retain over 95% of their mechanical properties after 10 years of continuous saltwater immersion at temperatures up to 60 degrees Celsius.",
  },
  {
    question: "Can FRP gratings support heavy vehicle loads on dock surfaces?",
    answer:
      "Yes. Our heavy-duty molded FRP gratings with 50mm depth and 38mm x 38mm mesh achieve load ratings exceeding 500 kN/m2 under uniform distributed loading, suitable for forklift and light vehicle traffic on dock surfaces. For concentrated wheel loads, pultruded FRP grating panels with solid top surfaces provide point-load capacities exceeding 45 kN (approximately 10,000 lbf) per ASTM E2979. All marine grating products are supplied with anti-slip surfaces achieving a pendulum test value (PTV) above 55, exceeding the HSE threshold for low-slip risk in wet conditions.",
  },
  {
    question: "What fire ratings are available for FRP in ship interior applications?",
    answer:
      "Our marine-interior FRP profiles and panels are formulated to meet IMO Resolution MSC.307(88) — the FTP Code for fire testing of marine materials. Specific products achieve surface spread of flame ratings per IMO Part 5 (limited flame spread), smoke and toxicity ratings per IMO Part 2, and non-combustibility where required per IMO Part 1 using phenolic resin systems. These certifications enable FRP to be used in passenger vessel cabins, corridors, stairways, and public spaces per SOLAS Chapter II-2 fire safety requirements. Classification society type approvals from Lloyd's Register, DNV, and Bureau Veritas are available.",
  },
  {
    question: "What is the weight savings of FRP versus steel in offshore platform structures?",
    answer:
      "FRP structural profiles weigh approximately 75% less than equivalent steel sections and 35% less than aluminum. On an offshore platform, replacing steel gratings, handrails, cable trays, and secondary structures with FRP typically reduces topside structural weight by 15-25%. This weight reduction has cascading benefits: lighter topside structures require smaller jacket structures, lighter foundations, and less installation crane capacity. For a typical medium-sized offshore platform, FRP substitution of secondary steelwork has been estimated to save $2-5 million in total installed cost through these cascading weight reductions.",
  },
];

export default function MarinePage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FRP Composite Profiles for Marine Applications",
    description:
      "FRP profiles for marine: corrosion-proof docks, offshore gratings, ship interiors, walkways. Withstands continuous saltwater exposure.",
    url: absoluteUrl("/industries/marine"),
    about: {
      "@type": "Thing",
      name: "Fiber-Reinforced Polymer profiles for marine environments",
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
        tag="Industries / Marine"
        title="FRP Composite Profiles for Marine Applications"
        description="Fiber-reinforced polymer (FRP) profiles provide permanent saltwater corrosion resistance for dock structures, offshore platforms, vessel interiors, and coastal walkways — eliminating the maintenance cycle that plagues steel in marine environments."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Marine" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/industries/frp-marine-harbor-dock-structure.jpg"
              alt="Harbor dock and marina walkway structures for marine corrosion-resistant applications"
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
        tag="Marine Answers"
        title="Quick answers for docks, offshore structures, and vessels"
        description="These direct answer blocks help buyers and search engines understand why FRP is frequently selected for saltwater and coastal applications."
        items={[
          {
            question: "Why use FRP in marine environments?",
            answer:
              "FRP is used in marine environments because it is immune to saltwater corrosion, much lighter than steel, and requires far less maintenance on docks, offshore platforms, and vessel structures.",
          },
          {
            question: "Where is FRP commonly used in marine projects?",
            answer:
              "Common marine uses include dock framing, walkways, gratings, handrails, offshore secondary structures, coastal boardwalks, and interior vessel components.",
          },
          {
            question: "How does FRP compare with marine-grade steel or stainless steel?",
            answer:
              "FRP avoids the pitting, crevice corrosion, and coating maintenance issues that still affect marine-grade steels and stainless steels in splash-zone or salt-laden service.",
          },
          {
            question: "What is a major economic reason to specify FRP offshore?",
            answer:
              "A major economic reason is that lower weight and lower corrosion maintenance can reduce topside structural cost, installation complexity, and long-term offshore service campaigns.",
          },
        ]}
      />

      {/* Challenge Section */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>The Challenge</SectionTag>
          <h2 className="mt-[21px] max-w-[640px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Saltwater Is the Most Aggressive Corrosion Environment for Structural Materials
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Marine environments represent the most severe corrosion challenge that structural materials face in service. Seawater containing approximately 3.5% dissolved salts creates an electrolyte that aggressively attacks carbon steel, galvanized steel, and even many grades of stainless steel through pitting, crevice corrosion, and microbiologically influenced corrosion (MIC). The corrosion rate of unprotected carbon steel in seawater splash zones reaches 0.3 to 1.0 mm per year — meaning a 10mm steel plate can lose half its cross-section within a decade.
              </p>
              <p>
                Protective coatings extend the service life of steel in marine environments, but they carry their own limitations. Marine paint systems typically require reapplication every 5 to 8 years for structures in splash zones and tidal areas. Each recoating cycle involves abrasive blasting to remove degraded coatings, containment of blast debris (which may contain lead and other regulated substances from legacy paint systems), application of multiple coating layers, and curing time before the structure can return to service. The cost of recoating a single dock structure can exceed $200 per square meter when access scaffolding, surface preparation, coating materials, and environmental containment are included.
              </p>
              <p>
                Hot-dip galvanizing provides somewhat longer protection — typically 15 to 25 years in marine atmospheres — but the zinc coating is sacrificial by design. Once consumed, the underlying steel corrodes rapidly. More critically, galvanizing cannot be effectively applied to field-welded connections, leaving joints as corrosion initiation points. In the splash zone, where structures experience the most severe corrosion, galvanized coatings degrade approximately three times faster than in atmospheric exposure.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Weight compounds the corrosion problem on vessels and offshore structures. Steel gratings, handrails, and secondary structures add significant topside weight to offshore platforms and vessels. Every ton of topside weight requires additional structural steel in the platform jacket or hull, additional foundation capacity, and additional crane capacity during installation. The offshore industry uses a weight multiplier of approximately 5:1 to 8:1 — meaning every kilogram of topside weight reduction saves 5 to 8 kilograms of support structure, with proportional cost savings.
              </p>
              <p>
                On vessels, topside weight directly affects stability, freeboard, and fuel consumption. The International Maritime Organization (IMO) energy efficiency requirements (EEDI/EEXI) are driving naval architects to minimize structural weight wherever possible. Lightweight materials that maintain structural performance are not optional improvements — they are increasingly necessary for regulatory compliance.
              </p>
              <p>
                Timber has historically served marine applications well — dock decking, fender systems, and vessel interiors — but sustainability concerns and declining availability of naturally durable tropical hardwoods have reduced its viability. Treated softwoods leach preservative chemicals into marine environments, creating regulatory conflicts with water quality standards. Tropical hardwood alternatives face FSC certification requirements and supply chain uncertainties that complicate long-term specification.
              </p>
              <p>
                These combined pressures — relentless corrosion, weight constraints, maintenance costs, and material sustainability — create a compelling case for fiber-reinforced polymer (FRP) composites. Pultruded FRP profiles are inherently immune to saltwater corrosion, weigh approximately 75% less than steel, and deliver a design life of 50+ years with zero maintenance in the most aggressive marine exposure conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FRP Solutions Section */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>FRP Solutions</SectionTag>
          <h2 className="mt-[21px] max-w-[640px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Pultruded FRP Profiles for Docks, Offshore Platforms, Vessels, and Coastal Infrastructure
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Dock Structures and Marina Infrastructure</h3>
              <p>
                FRP structural profiles — I-beams, wide-flange sections, channels, and tubes — provide the primary and secondary framing for dock structures, marina finger piers, and waterfront boardwalks. Our vinyl ester resin FRP profiles are specifically formulated for continuous saltwater immersion and splash zone exposure, retaining over 95% of their structural properties after decades of marine service.
              </p>
              <p>
                FRP dock framing eliminates the greatest maintenance burden in marina operations: structural corrosion repair. A survey by the American Society of Marina Engineers found that corrosion-related maintenance accounts for 35% to 45% of total annual dock maintenance budgets. Replacing steel substructure with FRP shifts the maintenance profile from structural repair to cosmetic cleaning only, reducing annual maintenance costs by an estimated 60% to 70% over a 30-year period.
              </p>
              <p>
                FRP dock structures are also inherently resistant to marine borers (Teredo, Limnoria) that destroy timber pilings and substructure. Unlike timber, FRP does not provide a food source or habitat for these organisms. This eliminates the need for toxic anti-fouling treatments and provides permanent protection in warm-water environments where marine borer activity is intense.
              </p>
              <LinkArrow href="/products/standard-profiles">
                Browse structural profiles for marine use
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Offshore Platform Structures</h3>
              <p>
                On offshore oil, gas, and wind platforms, FRP replaces carbon steel in gratings, handrails, stairways, cable trays, and secondary structural members. These are the components that corrode most rapidly in the offshore environment because they are fully exposed to salt spray, wave splash, and atmospheric moisture with minimal protection. Replacing them with FRP eliminates a major category of offshore maintenance — one that typically requires crane-supported scaffolding access, hot work permits, and crew boat mobilization at costs of $50,000 to $200,000 per maintenance campaign.
              </p>
              <p>
                The weight savings of FRP on offshore platforms deliver compounding economic benefits. Replacing steel gratings and handrails with FRP typically reduces topside secondary structural weight by 15% to 25%. Applied across a medium-sized platform with 2,000 square meters of grating and 500 linear meters of handrail, this translates to approximately 40 to 60 tonnes of weight reduction. At an offshore weight cost multiplier of $15,000 to $25,000 per tonne (including cascading structural and foundation savings), the economic benefit ranges from $600,000 to $1.5 million — often exceeding the incremental material cost of FRP over steel.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <h3 className="text-f19 font-bold text-t1">Ship Interiors and Vessel Components</h3>
              <p>
                FRP profiles and panels serve the interior outfitting of commercial vessels, naval ships, ferries, and luxury yachts. In vessel interiors, FRP provides structural framing for partition walls, ceiling systems, furniture support, and equipment foundations. The material&apos;s combination of fire performance (meeting IMO FTP Code requirements), corrosion resistance, and lightweight density makes it particularly valuable in areas where weight savings directly improve vessel performance.
              </p>
              <p>
                For naval vessels, FRP profiles offer the additional advantage of non-magnetic signatures. Minesweepers and mine countermeasure vessels require minimal magnetic signature to avoid triggering magnetic influence mines. FRP structural profiles and gratings contribute zero magnetic signature, unlike steel and even many stainless steel grades. The Royal Navy, US Navy, and other NATO navies have specified FRP extensively in mine countermeasure vessel construction.
              </p>
              <p>
                In ferry and cruise ship applications, FRP interior framing reduces deadweight by up to 40% compared to steel alternatives. This weight reduction can be converted to either increased passenger capacity or reduced fuel consumption — both of which directly impact vessel economics. A typical 100-meter ferry that replaces interior steel framing with FRP can achieve fuel savings of 3% to 5% through reduced displacement.
              </p>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Walkways, Gratings, and Access Platforms</h3>
              <p>
                FRP gratings are the single most widely adopted FRP product in marine applications worldwide. Our molded and pultruded gratings serve dock surfaces, platform walkways, vessel deck areas, and coastal access structures. Marine-grade FRP gratings with vinyl ester resin provide permanent corrosion resistance in splash zones, tidal areas, and submerged installations.
              </p>
              <p>
                Anti-slip surfaces are critical in marine environments where wet, oily, and salt-crusted conditions create fall hazards. Our marine gratings incorporate bonded silica grit surfaces that achieve pendulum test values (PTV) exceeding 55 in wet conditions — significantly exceeding the HSE threshold of 36 for low-slip risk. This slip resistance is permanent, embedded in the grating surface rather than applied as a coating that can wear off.
              </p>
              <LinkArrow href="/products/gratings">
                Explore marine grating solutions
              </LinkArrow>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Quantified Performance Advantages</h3>
              <ul className="list-none space-y-[13px]">
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Zero corrosion</strong> in continuous saltwater immersion and splash zone exposure for 50+ years</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">75% lighter than steel</strong> — reduces topside weight, improves vessel stability, and lowers fuel consumption</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">60-70% reduction in maintenance costs</strong> versus steel dock structures over a 30-year lifecycle</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">IMO FTP Code compliant</strong> fire ratings for passenger vessel interior applications</span>
                </li>
                <li className="flex items-start gap-[8px]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
                  <span><strong className="text-t1">Non-magnetic signature</strong> — essential for naval mine countermeasure vessels</span>
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
          <h2 className="mt-[21px] max-w-[640px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Products and Resources for Marine Projects
          </h2>
          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/products/gratings"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Marine Gratings</h3>
              <p className="text-f13 leading-golden text-t2">
                Anti-slip FRP gratings for dock surfaces, platform walkways, and vessel deck areas with permanent corrosion resistance.
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
                I-beams, channels, angles, and tubes in vinyl ester formulations for marine structural framing.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                View product →
              </span>
            </Link>
            <Link
              href="/case-studies/coastal-marina-walkway"
              className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
            >
              <h3 className="mb-[8px] text-[17px] font-bold text-t1">Case Study: Coastal Marina Walkway</h3>
              <p className="text-f13 leading-golden text-t2">
                FRP gratings and profiles in saltwater marina environment — zero corrosion after 10+ years.
              </p>
              <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                Read case study →
              </span>
            </Link>
          </div>

          <FAQ items={faqs} />
        </div>
      </section>

      <InnerCTA title="Need FRP solutions for a marine project?" />
    </>
  );
}
