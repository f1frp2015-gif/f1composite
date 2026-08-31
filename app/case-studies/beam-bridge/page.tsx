import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AskAICard from "@/components/ai/AskAICard";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/case-studies/beam-bridge";

const title = "Beam Bridge: Design, Diagram & 3 Case Studies";
const description =
  "Beam bridge guide with load-path diagrams and three verified cases, including Australia's 504 m Avon River bridge and two documented FRP girder projects.";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

const sourceUrls = {
  definition:
    "https://bigbuild.vic.gov.au/projects/gippsland-line-upgrade/construction/avon-river-bridge/learning-resources/bridge-match",
  bending:
    "https://www.fhwa.dot.gov/publications/research/infrastructure/structures/04098/05.cfm",
  bridgeTypes:
    "https://www.environment.fhwa.dot.gov/env_topics/historic_pres/post1945_engineering/this_bridge.aspx?AspxAutoDetectCookieSupport=1",
  avon:
    "https://bigbuild.vic.gov.au/projects/gippsland-line-upgrade/construction/avon-river-bridge",
  avonConstruction:
    "https://bigbuild.vic.gov.au/news/regional-rail-revival/gippsland/new-rail-bridge-taking-shape-in-stratford",
  horseTrough:
    "https://www.tmr.qld.gov.au/_/media/busind/techstdpubs/technical-notes/bridges-other-structures/tn54fibecompositeprojects.pdf?extension=pdf&hash=1D27F48BEF1AA1BBF639DB1667DF8DFC&rev=7a724cf075114c62869247c5c38a9202&sc_lang=en&size=602575",
  route601: "https://vtrc.virginia.gov/media/vtrc/vtrc-pdf/vtrc-pdf/06-cr5.pdf",
  fhwaFrp: "https://www.fhwa.dot.gov/bridge/composite/str.cfm",
  causeway: "https://thecauseway.us/about-the-bridge/",
  guinness:
    "https://www.guinnessworldrecords.com/world-records/97851-longest-bridge-over-water-continuous",
  as5100: "https://www.standards.org.au/news/new-australian-bridge-code-helps-to-build-australia",
  ats5880: "https://austroads.gov.au/publications/test-methods/ats-5880",
  mrts59:
    "https://www.tmr.qld.gov.au/_/media/busind/techstdpubs/specifications-and-drawings/specifications/2-bridges-and-structures/mrts59.pdf?extension=pdf&hash=ADCCC0DE13B8C1EBE3C6DF4E2770458A&rev=8aec8e84caf749b58a49b4ce6951fac9&sc_lang=en&size=237899",
} as const;

const caseStudies = [
  {
    id: "avon-river",
    number: "01",
    name: "Avon River Rail Bridge",
    location: "Stratford, Victoria, Australia",
    system: "Precast concrete beam bridge",
    image: "/images/case-studies/beam-bridge/avon-river-beam-bridge-case-study.svg",
    alt: "Engineering illustration of the Avon River precast concrete beam bridge in Victoria",
    summary:
      "A 504 m rail bridge assembled from 36 precast concrete beams in 18 pairs. It is a useful Australian example of repetition, off-site fabrication and multi-span beam construction.",
    stats: [
      ["Overall length", "504 m"],
      ["Precast beams", "36"],
      ["Typical beam", "28 m · 60 t"],
      ["Completed", "December 2020"],
    ],
    lessons: [
      "More than 100 precast concrete piles support the repeated spans.",
      "Beam pairs allowed major structural elements to be produced off site and placed in sequence.",
      "The new alignment carries trains at up to 90 km/h while the original heritage-listed bridge remains beside it.",
    ],
    source: sourceUrls.avonConstruction,
    sourceLabel: "Victoria's Big Build project record",
  },
  {
    id: "horse-trough-creek",
    number: "02",
    name: "Horse Trough Creek Bridge",
    location: "Queensland, Australia",
    system: "Pultruded composite primary girders",
    image:
      "/images/case-studies/beam-bridge/horse-trough-creek-frp-girder-case-study.svg",
    alt: "Engineering illustration of two pultruded composite girders at Horse Trough Creek Bridge",
    summary:
      "Queensland's transport agency documented a replacement bridge using two lightweight pultruded composite girders. It shows where FRP can move beyond deck panels into the primary beam system.",
    stats: [
      ["Girder length", "9.7 m each"],
      ["Girder mass", "~700 kg each"],
      ["Main girders", "2 pultruded FRP"],
      ["Opened", "10 May 2005"],
    ],
    lessons: [
      "Low member mass changes handling and installation planning, but it does not remove the need to check stability and connections.",
      "The case is a Queensland TMR industry reference, not an F1 Composite supply project.",
      "Current Australian specifications should be checked instead of copying a 2005 project detail into a new design.",
    ],
    source: sourceUrls.horseTrough,
    sourceLabel: "Queensland TMR Technical Note 54",
  },
  {
    id: "route-601",
    number: "03",
    name: "Route 601 over Dickey Creek",
    location: "Sugar Grove, Virginia, USA",
    system: "Pultruded FRP double-web beams",
    image: "/images/case-studies/beam-bridge/route-601-frp-beam-bridge-case-study.svg",
    alt: "Engineering illustration of the Route 601 bridge with eight pultruded FRP double-web beams",
    summary:
      "This 39 ft vehicular bridge was the first documented use of Strongwell's 36 in deep pultruded double-web beam in a bridge superstructure, according to VTRC.",
    stats: [
      ["Clear span", "39 ft (11.9 m)"],
      ["FRP beams", "8"],
      ["Beam spacing", "3.5 ft (1.07 m)"],
      ["Beam placement", "4 hours"],
    ],
    lessons: [
      "A small crane placed all eight beams before the timber deck was installed.",
      "The measured maximum deflection was L/1110, smaller than the then-current L/800 design limit.",
      "The report also recorded higher material cost and a lack of standardised FRP bridge design guidance at the time—important context, not a footnote.",
    ],
    source: sourceUrls.route601,
    sourceLabel: "Virginia Transportation Research Council report 06-CR5",
  },
] as const;

const faqs = [
  {
    question: "What is a beam bridge?",
    answer:
      "A beam bridge carries its deck on one or more horizontal beams or girders spanning between abutments, piers or both. Traffic and self-weight bend the beams; bearings and supports transfer the resulting reactions into the substructure and foundations.",
  },
  {
    question: "How does a beam bridge work?",
    answer:
      "Loads move from the deck into cross-members or directly into the main beams, then through bearings to piers or abutments and finally the ground. Under normal downward bending, the beam's upper region is mainly in compression and its lower region mainly in tension, while shear is highest near the supports.",
  },
  {
    question: "What are the advantages and disadvantages of a beam bridge?",
    answer:
      "Advantages include a direct load path, repeatable components, familiar construction and efficient short-to-medium spans. Limitations include increasing beam depth or intermediate supports as spans grow, bending-driven material demand, bearing and joint maintenance, and strict deflection or vibration requirements.",
  },
  {
    question: "What materials are used for beam bridges?",
    answer:
      "Common systems use reinforced or prestressed concrete, structural steel, timber, steel-concrete composite girders, and—on selected projects—FRP girders, decks or internal reinforcement. These composite categories are not interchangeable and require different design and qualification routes.",
  },
  {
    question: "How long can a beam bridge span?",
    answer:
      "There is no universal maximum. Practical span depends on material, girder depth, continuity, deck interaction, loads, deflection, vibration, transport and code requirements. A long bridge may use many economical beam spans rather than one long unsupported beam.",
  },
  {
    question: "What is a famous beam bridge example?",
    answer:
      "The Lake Pontchartrain Causeway in Louisiana is a famous multi-span example. Its two crossings use thousands of repeated precast, prestressed concrete spans. Guinness lists the longer crossing at 38.422 km as the longest bridge over water (continuous), not the longest single beam span.",
  },
  {
    question: "Can FRP be used for a beam bridge?",
    answer:
      "Yes. Public projects have used FRP as primary girders, deck modules or reinforcement inside concrete members. Lower elastic modulus often makes deflection, vibration, buckling and connection behaviour decisive. Final member selection must follow the owner's code, project testing and an appointed bridge engineer's design.",
  },
];

const images = [
  "/images/case-studies/beam-bridge/beam-bridge-load-path-diagram.svg",
  "/images/case-studies/beam-bridge/beam-bridge-types-diagram.svg",
  ...caseStudies.map((caseStudy) => caseStudy.image),
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${absoluteUrl(pagePath)}#article`,
      headline: title,
      name: "Beam Bridge: Design, Load Path & 3 Verified Case Studies",
      description,
      url: absoluteUrl(pagePath),
      mainEntityOfPage: absoluteUrl(pagePath),
      datePublished: "2026-08-31",
      dateModified: "2026-08-31",
      image: images.map(absoluteUrl),
      author: {
        "@type": "Person",
        name: "Yifan Liu",
        jobTitle: "Senior Application Engineer",
        url: absoluteUrl("/about/authors/yifan-liu"),
      },
      reviewedBy: {
        "@type": "Person",
        name: "Haifeng Gong, Ph.D.",
        url: absoluteUrl("/about/authors/haifeng-gong"),
      },
      publisher: { "@id": `${absoluteUrl("/")}#organization` },
      about: [
        { "@type": "Thing", name: "Beam bridge" },
        { "@type": "Thing", name: "Girder bridge" },
        { "@type": "Thing", name: "Pultruded FRP girder" },
      ],
      citation: Object.values(sourceUrls),
    },
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl(pagePath)}#case-studies`,
      name: "Verified beam bridge case studies",
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((caseStudy, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${absoluteUrl(pagePath)}#${caseStudy.id}`,
        item: {
          "@type": "CreativeWork",
          name: caseStudy.name,
          description: caseStudy.summary,
          contentLocation: caseStudy.location,
          citation: caseStudy.source,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: "Case Studies",
          item: absoluteUrl("/case-studies"),
        },
        { "@type": "ListItem", position: 3, name: "Beam Bridge" },
      ],
    },
  ],
};

const externalLinkClass =
  "font-semibold text-teal-text underline decoration-teal-border underline-offset-4 transition-colors hover:text-teal";

export default function BeamBridgeCaseStudiesPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageHeader
        tag="Engineering Guide + Public Case Studies"
        title="Beam Bridge: Design, Load Path & 3 Verified Case Studies"
        description="A visual guide to beam bridge behaviour, types, materials and design trade-offs—grounded in documented Australian and US projects, including two pultruded FRP girder bridges."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: "Beam Bridge" },
        ]}
        actions={{
          primary: {
            label: "Discuss an FRP Bridge Concept",
            href: "/contact?source=beam-bridge-guide&inquiry_type=engineering",
          },
          secondary: {
            label: "View FRP I-Beams",
            href: "/products/fiberglass-structural-shapes/frp-i-beam",
            variant: "secondary",
          },
          note: "Preliminary material guidance only; final bridge design remains with the project engineer.",
        }}
      />

      <ArticleSignals
        publishedAt="2026-08-31"
        updatedAt="2026-08-31"
        authorName="Yifan Liu"
        authorRole="Senior Application Engineer — pultruded FRP structural applications"
        authorHref="/about/authors/yifan-liu"
        reviewedBy="Haifeng Gong, Ph.D."
        standards={["AS 5100:2017", "Austroads ATS 5880-25", "Queensland MRTS59"]}
      />

      <main>
        <section className="bg-white py-[42px] md:py-[64px]">
          <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-[34px]">
            <div>
              <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">
                Direct answer
              </p>
              <h2 className="mt-[10px] text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.03em] text-t1">
                What is a beam bridge?
              </h2>
              <p className="mt-[16px] text-f19 leading-relaxed text-t1">
                A <dfn className="font-bold not-italic">beam bridge</dfn> carries its deck on
                horizontal beams or girders spanning between abutments, piers, or both. Downward
                loads bend the beams; the top is mainly compressed, the bottom is mainly in
                tension, and the supports pass reactions into the foundations.
              </p>
              <p className="mt-[13px] text-f13 leading-golden text-t2">
                This definition and the diagram align with the public explanations from{" "}
                <a className={externalLinkClass} href={sourceUrls.definition} target="_blank" rel="noreferrer">
                  Victoria&apos;s Big Build
                </a>{" "}
                and the{" "}
                <a className={externalLinkClass} href={sourceUrls.bending} target="_blank" rel="noreferrer">
                  FHWA bending reference
                </a>
                .
              </p>
              <nav aria-label="On this page" className="mt-[24px] rounded-[8px] border border-border-default bg-bg2 p-[18px]">
                <p className="text-f11 font-bold uppercase tracking-[0.14em] text-t3">On this page</p>
                <div className="mt-[10px] flex flex-wrap gap-x-[18px] gap-y-[8px] text-f13 font-semibold">
                  <a className="text-teal-text hover:text-teal" href="#how-it-works">How it works</a>
                  <a className="text-teal-text hover:text-teal" href="#types">Types</a>
                  <a className="text-teal-text hover:text-teal" href="#advantages">Pros &amp; cons</a>
                  <a className="text-teal-text hover:text-teal" href="#case-studies">Case studies</a>
                  <a className="text-teal-text hover:text-teal" href="#frp-design">FRP design</a>
                  <a className="text-teal-text hover:text-teal" href="#sources">Sources</a>
                </div>
              </nav>
            </div>

            <figure className="overflow-hidden rounded-[12px] border border-border-default bg-[#f7faf9] shadow-[0_14px_40px_rgba(11,24,56,0.08)]">
              <Image
                src="/images/case-studies/beam-bridge/beam-bridge-load-path-diagram.svg"
                alt="Beam bridge diagram showing downward loads, support reactions, top compression and bottom tension"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 58vw"
                preload
                className="h-auto w-full"
              />
              <figcaption className="border-t border-border-default bg-white px-[16px] py-[10px] text-f11 leading-relaxed text-t3">
                Original F1 engineering illustration. Load path is simplified and not to scale.
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-[110px] bg-bg2 py-[55px] md:py-[78px]">
          <div className="mx-auto max-w-[1120px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="grid gap-[34px] lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">Load path</p>
                <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em] text-t1">
                  How does a beam bridge work?
                </h2>
              </div>
              <div className="text-f15 leading-golden text-t2">
                <p>
                  Gravity and traffic loads first enter the deck. The deck distributes them to
                  longitudinal beams or girders, sometimes through cross-beams. Those members
                  develop bending and shear, then deliver reactions through bearings to piers and
                  abutments. The foundations finally spread the forces into the ground.
                </p>
                <p className="mt-[13px]">
                  A simply supported span has its largest positive bending moment near midspan and
                  high shear near the supports. A continuous beam redistributes bending across
                  several supports, which can reduce midspan demand but introduces negative moment
                  over the piers. Real designs also check lateral stability, fatigue, vibration,
                  thermal movement, bearings, joints and accidental actions.
                </p>
              </div>
            </div>

            <div className="mt-[34px] grid gap-[13px] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["1", "Deck", "Receives wheel, pedestrian, wind and self-weight loads."],
                ["2", "Beams", "Carry bending and shear across each clear span."],
                ["3", "Bearings", "Transfer reactions while allowing designed movement."],
                ["4", "Substructure", "Piers, abutments and foundations deliver load to ground."],
              ].map(([step, label, copy]) => (
                <div key={step} className="rounded-[8px] border border-border-default bg-white p-[20px]">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-teal-bg text-f13 font-extrabold text-teal-text">
                    {step}
                  </span>
                  <h3 className="mt-[13px] text-f17 font-bold text-t1">{label}</h3>
                  <p className="mt-[6px] text-f13 leading-golden text-t2">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="types" className="scroll-mt-[110px] bg-white py-[55px] md:py-[89px]">
          <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-2 lg:items-center lg:px-[34px]">
            <figure className="overflow-hidden rounded-[12px] border border-border-default bg-bg2">
              <Image
                src="/images/case-studies/beam-bridge/beam-bridge-types-diagram.svg"
                alt="Comparison diagram of simple, continuous, I-girder and box-girder beam bridges"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full"
              />
              <figcaption className="border-t border-border-default bg-white px-[16px] py-[10px] text-f11 leading-relaxed text-t3">
                Beam bridge describes structural action; I-girder and box-girder describe member geometry.
              </figcaption>
            </figure>
            <div>
              <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">Forms and terminology</p>
              <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em] text-t1">
                Beam bridge types and materials
              </h2>
              <p className="mt-[16px] text-f15 leading-golden text-t2">
                A simple beam spans between two supports. A continuous beam crosses three or more
                supports. Main members may be solid rectangular beams, I-girders, T-girders or
                closed box girders. Engineers often use <em>beam</em> and <em>girder</em>
                interchangeably; in practice, girder often means a larger primary member. The FHWA
                gives the same practical distinction in its{" "}
                <a className={externalLinkClass} href={sourceUrls.bridgeTypes} target="_blank" rel="noreferrer">
                  bridge-type overview
                </a>
                .
              </p>
              <div className="mt-[21px] space-y-[13px]">
                {[
                  ["Concrete", "Reinforced and prestressed beams; durable mass-produced solutions for repeated spans."],
                  ["Steel", "Rolled or fabricated I-girders and box girders; high stiffness with corrosion and fatigue detailing needs."],
                  ["Timber", "Solid, glued-laminated or engineered beams for selected road and pedestrian applications."],
                  ["FRP composites", "Pultruded or moulded girders, modular decks, or reinforcement; light and corrosion resistant but often stiffness-governed."],
                ].map(([material, copy]) => (
                  <div key={material} className="grid grid-cols-[110px_1fr] gap-[13px] border-t border-border-default pt-[13px]">
                    <h3 className="text-f13 font-bold text-t1">{material}</h3>
                    <p className="text-f13 leading-golden text-t2">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="advantages" className="scroll-mt-[110px] bg-[#0b1838] py-[55px] text-white md:py-[78px]">
          <div className="mx-auto max-w-[1120px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="max-w-[760px]">
              <p className="text-f11 font-bold uppercase tracking-[0.18em] text-[#62d8cf]">Balanced assessment</p>
              <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em]">
                Beam bridge advantages and disadvantages
              </h2>
            </div>
            <div className="mt-[28px] grid gap-[18px] md:grid-cols-2">
              <div className="rounded-[10px] border border-white/15 bg-white/[0.06] p-[24px]">
                <h3 className="text-f19 font-bold text-[#7be3da]">Where the form works well</h3>
                <ul className="mt-[16px] space-y-[10px] text-f15 leading-relaxed text-white/80">
                  <li>• Direct, legible load path and familiar analysis methods</li>
                  <li>• Repeatable girders support prefabrication and staged erection</li>
                  <li>• Efficient solutions for many short-to-medium spans</li>
                  <li>• Straightforward inspection access for exposed main members</li>
                </ul>
              </div>
              <div className="rounded-[10px] border border-white/15 bg-white/[0.06] p-[24px]">
                <h3 className="text-f19 font-bold text-[#ffcb83]">What can govern the design</h3>
                <ul className="mt-[16px] space-y-[10px] text-f15 leading-relaxed text-white/80">
                  <li>• Structural depth and bending demand rise as unsupported span grows</li>
                  <li>• Deflection, vibration or lateral stability can govern before strength</li>
                  <li>• Multiple piers may increase waterway, geotechnical and environmental work</li>
                  <li>• Bearings, joints, drainage and connections need lifecycle access</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-[55px] md:py-[78px]">
          <div className="mx-auto max-w-[1120px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="rounded-[12px] border border-border-default bg-[linear-gradient(125deg,#f4fbfa_0%,#ffffff_58%)] p-[24px] md:p-[34px]">
              <div className="grid gap-[26px] md:grid-cols-[0.72fr_1.28fr] md:items-center">
                <div>
                  <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">Famous example</p>
                  <p className="mt-[10px] text-[clamp(42px,7vw,78px)] font-extrabold leading-none tracking-[-0.05em] text-t1">38.422 km</p>
                  <p className="mt-[8px] text-f13 font-semibold text-t3">Longer Lake Pontchartrain crossing</p>
                </div>
                <div>
                  <h2 className="text-f28 font-extrabold tracking-[-0.025em] text-t1">
                    Is the Lake Pontchartrain Causeway a beam bridge?
                  </h2>
                  <p className="mt-[13px] text-f15 leading-golden text-t2">
                    Yes—the two crossings use thousands of short, repeated precast prestressed
                    concrete girder-and-deck spans. The official Causeway record lists 2,246 spans
                    on the southbound crossing and 1,506 on the northbound crossing. Guinness lists
                    the 38.422 km northbound bridge as the longest bridge over water (continuous).
                    That record describes total crossing length, not one unsupported beam span.
                  </p>
                  <p className="mt-[13px] text-f13 text-t3">
                    Sources:{" "}
                    <a className={externalLinkClass} href={sourceUrls.causeway} target="_blank" rel="noreferrer">Greater New Orleans Expressway Commission</a>{" "}
                    and{" "}
                    <a className={externalLinkClass} href={sourceUrls.guinness} target="_blank" rel="noreferrer">Guinness World Records</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="case-studies" className="scroll-mt-[110px] bg-bg2 py-[55px] md:py-[89px]">
          <div className="mx-auto max-w-[1180px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="max-w-[820px]">
              <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">Evidence-led examples</p>
              <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em] text-t1">
                Three verified beam bridge case studies
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                These bridges are publicly documented engineering references. They are not
                represented as F1 Composite projects. Project names, measurements and outcomes
                below come from the linked owner or transport-agency records.
              </p>
            </div>

            <div className="mt-[34px] space-y-[28px]">
              {caseStudies.map((caseStudy) => (
                <article
                  id={caseStudy.id}
                  key={caseStudy.id}
                  className="scroll-mt-[110px] overflow-hidden rounded-[12px] border border-border-default bg-white shadow-[0_12px_34px_rgba(11,24,56,0.05)]"
                >
                  <div className="grid lg:grid-cols-[0.96fr_1.04fr]">
                    <figure className="bg-[#eef6f5] lg:border-r lg:border-border-default">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.alt}
                        width={1600}
                        height={900}
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="h-auto w-full"
                      />
                      <figcaption className="border-t border-border-default bg-white px-[16px] py-[10px] text-f11 leading-relaxed text-t3">
                        Original engineering illustration based on the cited public record; not to scale.
                      </figcaption>
                    </figure>
                    <div className="p-[24px] md:p-[30px]">
                      <div className="flex flex-wrap items-center gap-[8px]">
                        <span className="text-f11 font-extrabold tracking-[0.16em] text-teal-text">CASE {caseStudy.number}</span>
                        <span className="rounded-full border border-[#e5bd7b] bg-[#fff8e9] px-[9px] py-[3px] text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a4c08]">
                          Public reference · not an F1 project
                        </span>
                      </div>
                      <h3 className="mt-[10px] text-f28 font-extrabold tracking-[-0.025em] text-t1">{caseStudy.name}</h3>
                      <p className="mt-[5px] text-f13 font-semibold text-t3">{caseStudy.location} · {caseStudy.system}</p>
                      <p className="mt-[14px] text-f15 leading-golden text-t2">{caseStudy.summary}</p>

                      <dl className="mt-[20px] grid grid-cols-2 gap-[8px]">
                        {caseStudy.stats.map(([label, value]) => (
                          <div key={label} className="rounded-[7px] border border-border-default bg-bg2 p-[12px]">
                            <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-t3">{label}</dt>
                            <dd className="mt-[3px] text-f15 font-extrabold text-t1">{value}</dd>
                          </div>
                        ))}
                      </dl>

                      <h4 className="mt-[20px] text-f13 font-bold uppercase tracking-[0.08em] text-t1">What the record shows</h4>
                      <ul className="mt-[10px] space-y-[8px] text-f13 leading-golden text-t2">
                        {caseStudy.lessons.map((lesson) => <li key={lesson}>• {lesson}</li>)}
                      </ul>
                      <a className={`${externalLinkClass} mt-[16px] inline-block text-f13`} href={caseStudy.source} target="_blank" rel="noreferrer">
                        Read the primary source: {caseStudy.sourceLabel} ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="frp-design" className="scroll-mt-[110px] bg-white py-[55px] md:py-[89px]">
          <div className="mx-auto max-w-[1120px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="grid gap-[34px] lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">Material decision</p>
                <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em] text-t1">
                  Where pultruded FRP fits—and where it does not
                </h2>
              </div>
              <div>
                <p className="text-f15 leading-golden text-t2">
                  FRP can reduce member mass and avoid steel corrosion, making it relevant to
                  difficult-access sites, replacement timber bridges, corrosive environments and
                  prefabricated pedestrian structures. It is not an automatic one-for-one steel
                  substitution. Lower elastic modulus means section depth, deflection, vibration,
                  local buckling and connection deformation can govern.
                </p>
                <p className="mt-[13px] text-f15 leading-golden text-t2">
                  Australian projects start with the governing bridge code and owner requirements.
                  Standards Australia describes{" "}
                  <a className={externalLinkClass} href={sourceUrls.as5100} target="_blank" rel="noreferrer">AS 5100:2017</a>{" "}
                  as a nine-part bridge standard. Austroads published{" "}
                  <a className={externalLinkClass} href={sourceUrls.ats5880} target="_blank" rel="noreferrer">ATS 5880-25</a>{" "}
                  for FRP bridge members in 2025, while Queensland&apos;s{" "}
                  <a className={externalLinkClass} href={sourceUrls.mrts59} target="_blank" rel="noreferrer">MRTS59</a>{" "}
                  covers FRP composite girders. Scope, edition and project amendments still need to
                  be confirmed by the bridge owner and appointed engineer.
                </p>
              </div>
            </div>

            <div className="mt-[30px] grid gap-[13px] md:grid-cols-2 lg:grid-cols-3">
              {[
                ["Loads & combinations", "Dead, traffic, impact, pedestrian, wind, seismic, thermal, fatigue and accidental actions."],
                ["Serviceability", "Vertical and lateral deflection, vibration, camber, creep and deck-girder compatibility."],
                ["Member stability", "Local flange/web buckling, lateral stability, bracing and distortional response."],
                ["Connections", "Bolt bearing, net section, block shear, adhesive durability, slip and inspection access."],
                ["Durability & fire", "Resin system, UV barrier, moisture, temperature, fire performance and damage tolerance."],
                ["Delivery", "Transport envelope, lift points, temporary bracing, bearing tolerances and erection sequence."],
              ].map(([heading, copy]) => (
                <div key={heading} className="rounded-[8px] border border-border-default bg-bg2 p-[20px]">
                  <h3 className="text-f15 font-bold text-t1">{heading}</h3>
                  <p className="mt-[7px] text-f13 leading-golden text-t2">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-[30px] rounded-[10px] border-l-[4px] border-teal-text bg-teal-bg p-[20px] md:p-[24px]">
              <h3 className="text-f17 font-bold text-t1">Start with a screen, not a catalogue substitution</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                Use the F1{" "}
                <Link className="font-semibold text-teal-text underline underline-offset-4" href="/frp-profile-calculator">FRP beam calculator</Link>{" "}
                and{" "}
                <Link className="font-semibold text-teal-text underline underline-offset-4" href="/frp-span-tables">span tables</Link>{" "}
                for preliminary screening only. A bridge RFQ should identify span, width, load model,
                deflection and vibration criteria, exposure, fire requirements, bearings, connections,
                transport limits and governing owner specification.
              </p>
            </div>

            <FAQ items={faqs} />
          </div>
        </section>

        <section id="sources" className="scroll-mt-[110px] border-t border-border-default bg-bg2 py-[55px]">
          <div className="mx-auto max-w-[1120px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <h2 className="text-f24 font-extrabold text-t1">Sources and image methodology</h2>
            <p className="mt-[10px] max-w-[850px] text-f13 leading-golden text-t2">
              Measurements were transcribed from the primary records below. The five diagrams on
              this page are original F1 illustrations—not project drawings or photographic proof.
              They simplify geometry to explain structural action and reported case facts.
            </p>
            <ol className="mt-[18px] grid gap-[10px] text-f13 leading-golden text-t2 md:grid-cols-2">
              {[
                ["Victoria's Big Build — beam bridge definition", sourceUrls.definition],
                ["FHWA — bending stress in beams", sourceUrls.bending],
                ["Victoria's Big Build — Avon River Bridge", sourceUrls.avon],
                ["Victoria's Big Build — Avon construction record", sourceUrls.avonConstruction],
                ["Queensland TMR — Fibre Composite Projects, TN54", sourceUrls.horseTrough],
                ["VTRC — Route 601 FRP bridge report 06-CR5", sourceUrls.route601],
                ["FHWA — FRP composite bridge research portal", sourceUrls.fhwaFrp],
                ["Lake Pontchartrain Causeway — bridge facts", sourceUrls.causeway],
                ["Guinness World Records — continuous bridge over water", sourceUrls.guinness],
                ["Austroads — ATS 5880 FRP Bridge Members", sourceUrls.ats5880],
              ].map(([label, href], index) => (
                <li key={href} className="rounded-[7px] border border-border-default bg-white p-[13px]">
                  <span className="mr-[6px] font-bold text-t3">{index + 1}.</span>
                  <a className={externalLinkClass} href={href} target="_blank" rel="noreferrer">{label} ↗</a>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <AskAICard
        title="Screen an FRP beam bridge concept"
        description="Give the advisor your span, width, load model, exposure and governing standard. It will organise the missing inputs and point to relevant F1 profile data; it does not replace the bridge engineer."
        prefill="I am evaluating an FRP beam bridge. Help me structure the preliminary design inputs, serviceability checks, material data and RFQ package without treating the result as final bridge design."
        ctaLabel="Start the engineering screen →"
      />

      <RelatedLinks
        groups={[
          {
            title: "Bridge applications",
            links: [
              { href: "/applications/frp-bridge-deck-panels", label: "FRP bridge deck panels" },
              { href: "/applications/frp-pedestrian-bridge-superstructures", label: "FRP pedestrian bridge superstructures" },
              { href: "/industries/infrastructure", label: "FRP for infrastructure" },
            ],
          },
          {
            title: "Products",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "Pultruded FRP I-beams" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
            ],
          },
          {
            title: "Engineering resources",
            links: [
              { href: "/resources/blog/frp-bridge-deck-design-guide", label: "FRP bridge deck design guide" },
              { href: "/frp-profile-calculator", label: "FRP beam calculator" },
              { href: "/frp-span-tables", label: "FRP span tables" },
            ],
          },
        ]}
      />
      <InnerCTA title="Planning a beam bridge or deck replacement?" />
    </>
  );
}
