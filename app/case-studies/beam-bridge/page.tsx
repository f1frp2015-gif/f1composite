import type { Metadata } from "next";
import type { ReactNode } from "react";
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

const title = "Beam Bridge Design: Pedestrian & Cycle Bridge Guide";
const description =
  "Beam bridge design guide for pedestrian and cycle crossings: load paths, width, vibration, FRP detailing and three source-backed bridge case studies.";

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
  tmrGuide:
    "https://www.tmr.qld.gov.au/-/media/busind/techstdpubs/Bridges-marine-and-other-structures/Options-for-Designers-of-Pedestrian-Cyclist-Bridges/Option_Design_Ped_Cyc_Bridges.pdf?hash=18C0BC79B5B71A7DC5AE4E947287A857&la=en",
  tmrCriteria:
    "https://www.tmr.qld.gov.au/-/media/busind/techstdpubs/Bridges-marine-and-other-structures/Bridge-design-and-assessment-criteria-manual/DesignCriteriaforBridgesandOtherStructures.pdf",
  austroadsPart6A: "https://austroads.gov.au/publications/road-design/agrd06a",
  nswToolbox:
    "https://www.transport.nsw.gov.au/system/files/media/documents/2023/Cycleway-Design-Toolbox-Web.pdf",
  jrcVibration: "https://publications.jrc.ec.europa.eu/repository/handle/JRC53442",
  monashResearch: "https://www.open-access.bcu.ac.uk/14288/",
  moggill:
    "https://www.tmr.qld.gov.au/travel-and-transport/cycling/infrastructure-projects/moggill-road-cycle-bridge",
  saoSilvestre:
    "https://www.sciencedirect.com/science/article/pii/S0263822314003997",
  saoSilvestreDynamic: "https://onlinelibrary.wiley.com/doi/full/10.1002/stc.3137",
  aashtoFrp: "https://store.transportation.org/Item/PublicationDetail?ID=5405",
  ats5880: "https://austroads.gov.au/publications/test-methods/ats-5880",
  pontresina:
    "https://research.birmingham.ac.uk/en/publications/durability-of-pultruded-fibre-polymer-composite-structures-under-/",
  as5100: "https://www.standards.org.au/sector-case-studies/construction",
} as const;

type BridgeIconName =
  | "deck"
  | "girder"
  | "bearing"
  | "foundation"
  | "width"
  | "barrier"
  | "drainage"
  | "joint"
  | "vibration"
  | "wind"
  | "vehicle"
  | "connection"
  | "durability"
  | "fire"
  | "inspection"
  | "delivery"
  | "check";

const iconPaths: Record<BridgeIconName, ReactNode> = {
  deck: (
    <>
      <path d="M3 9h18v4H3z" />
      <path d="M6 17h12M8 13v4m8-4v4" />
    </>
  ),
  girder: (
    <>
      <path d="M5 4h14M5 20h14M9 4v16m6-16v16" />
      <path d="M9 8h6m-6 8h6" />
    </>
  ),
  bearing: (
    <>
      <path d="M5 5h14v4H5zM7 15h10v4H7z" />
      <path d="m8 15 2-6m6 6-2-6" />
    </>
  ),
  foundation: (
    <>
      <path d="M7 4h10v7H7zM5 11h14v4H5zM3 20h18" />
      <path d="M7 15v5m5-5v5m5-5v5" />
    </>
  ),
  width: (
    <>
      <path d="M4 12h16M4 12l3-3m-3 3 3 3m13-3-3-3m3 3-3 3" />
      <path d="M4 5v14m16-14v14" />
    </>
  ),
  barrier: (
    <>
      <path d="M5 20V5m14 15V5M5 8h14M5 13h14" />
      <path d="M9 8v12m6-12v12" />
    </>
  ),
  drainage: (
    <>
      <path d="M4 8h16l-4 4H8zM12 12v8" />
      <path d="m9 17 3 3 3-3" />
    </>
  ),
  joint: (
    <>
      <path d="M3 8h7v8H3zM14 8h7v8h-7z" />
      <path d="m10 12 2-2 2 2-2 2z" />
    </>
  ),
  vibration: (
    <>
      <path d="M3 13c2.2-7 4.4 7 6.6 0s4.4-7 6.6 0 3.2 2 4.8-1" />
      <path d="M4 5h16M4 19h16" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h12c3.5 0 3.5-5 0-5-1.4 0-2.3.8-2.7 1.8M3 12h17c2.7 0 2.7 4 0 4-1.2 0-2-.7-2.3-1.5M3 16h9" />
    </>
  ),
  vehicle: (
    <>
      <path d="M4 15V9h11l4 4v2" />
      <path d="M3 15h18M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM15 9v4h4" />
    </>
  ),
  connection: (
    <>
      <path d="M4 7h7v10H4zM13 7h7v10h-7z" />
      <path d="M9 10h6m-6 4h6" />
      <circle cx="12" cy="10" r="1" />
      <circle cx="12" cy="14" r="1" />
    </>
  ),
  durability: (
    <>
      <path d="M12 3 5 6v5c0 4.5 2.7 7.9 7 10 4.3-2.1 7-5.5 7-10V6z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  fire: (
    <>
      <path d="M13 3c1 4-2 5-2 8 0 1.6 1 2.6 2.3 2.6 2.2 0 3.7-2.1 2.7-5.1 3 2.2 4 5 2.7 8-1.1 2.7-3.6 4.5-6.7 4.5-4.4 0-7-2.8-7-6.4 0-3.1 1.8-5.8 4.5-8.4-.1 3.2 1.2 4.2 2.3 3.4C13 8.7 14 6.5 13 3Z" />
    </>
  ),
  inspection: (
    <>
      <circle cx="10" cy="10" r="5" />
      <path d="m14 14 6 6M8 10h4m-2-2v4" />
    </>
  ),
  delivery: (
    <>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
};

function BridgeIcon({ name, className = "h-[24px] w-[24px]" }: { name: BridgeIconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

const loadPathSteps = [
  {
    icon: "deck" as const,
    label: "Deck and surface",
    copy: "Pedestrians, cycles, barriers, wind and self-weight first act on the deck system.",
  },
  {
    icon: "girder" as const,
    label: "Distribution and girders",
    copy: "Deck action and cross-members distribute load into the longitudinal beams or girders.",
  },
  {
    icon: "bearing" as const,
    label: "Bearings or end connections",
    copy: "Support details transfer reactions while accommodating the movement defined by the design.",
  },
  {
    icon: "foundation" as const,
    label: "Substructure and ground",
    copy: "Abutments, piers and foundations complete the load path into competent ground.",
  },
] as const;

const activeUseDecisions = [
  {
    icon: "width" as const,
    title: "Clear width and user mix",
    copy: "Measure between barriers and size for forecast peak demand, operating envelope, passing and any pedestrian–cycle separation.",
  },
  {
    icon: "barrier" as const,
    title: "Barriers and handrails",
    copy: "Cyclist edge protection, accessible handrails, openings, pannier clearance and post setbacks are separate geometric decisions.",
  },
  {
    icon: "joint" as const,
    title: "Joints and ride quality",
    copy: "Keep the wheel path free of abrupt lips, unsafe gaps and loose cover plates; coordinate movement with a smooth surface detail.",
  },
  {
    icon: "drainage" as const,
    title: "Surface and drainage",
    copy: "Coordinate slip resistance, crossfall, scuppers, kerbs and discharge so water does not pond or create hazards below.",
  },
  {
    icon: "vehicle" as const,
    title: "Maintenance vehicle decision",
    copy: "Explicitly include or exclude service and emergency vehicles in the design brief and drawings; do not leave the load model implicit.",
  },
  {
    icon: "inspection" as const,
    title: "Inspection access",
    copy: "Bearings, cross-members, drainage and concealed connections need a safe inspection and replacement strategy from day one.",
  },
] as const;

const caseStudies = [
  {
    id: "moggill-road-cycle-bridge",
    number: "01",
    name: "Moggill Road Cycle Bridge",
    location: "Indooroopilly, Brisbane, Australia",
    system: "Prestressed-concrete T-girder cycle bridge",
    image: "/images/case-studies/beam-bridge/moggill-road-cycle-bridge-case-study.svg",
    alt: "Engineering schematic of the nine-span Moggill Road prestressed-concrete T-girder cycle bridge",
    summary:
      "A cycle-only crossing that demonstrates how a conventional repeated-girder system can be designed around rider continuity, off-site fabrication and maintenance access—not just structural capacity.",
    stats: [
      ["Overall length", "218 m"],
      ["Structural layout", "9 spans"],
      ["Span range", "17–32 m"],
      ["2016 use", "820 riders/day"],
    ],
    lessons: [
      "The superstructure uses prestressed-concrete T-girders, a reinforced-concrete deck and precast kerbs.",
      "Girders weighing up to 103 t were prefabricated off site and installed with 350 t and 500 t mobile cranes.",
      "The deck expansion joint was selected specifically to avoid gaps or bumps and maintain a smooth cycle path.",
      "Barrier, lighting and inspection access were treated as maintainable parts of the bridge system.",
    ],
    source: sourceUrls.moggill,
    sourceLabel: "Queensland TMR project case study",
  },
  {
    id: "coronation-drive-frp-cycleway",
    number: "02",
    name: "Coronation Drive FRP Cycleway Crossing",
    location: "Bicentennial Bikeway, Brisbane, Australia",
    system: "Glued pultruded-FRP girder system",
    image: "/images/case-studies/beam-bridge/coronation-drive-frp-cycleway-case-study.svg",
    alt: "Engineering schematic of the lightweight FRP girder bridge on the Coronation Drive cycleway",
    summary:
      "Queensland TMR documents a cycleway bridge using glued pultruded-FRP hollow sections with an engineered cementitious composite plate deck—a useful short-span reference where access and lifting mass matter.",
    stats: [
      ["Overall width", "3,000 mm"],
      ["Effective width", "2,720 mm"],
      ["Main girders", "6 at 575 mm c/c"],
      ["Longitudinal span", "Not published"],
    ],
    lessons: [
      "Low transport mass can be valuable at constrained sites, but temporary stability and lift points remain design actions.",
      "TMR describes this bridge type as useful for difficult-access short spans up to about 12 m; that is system guidance, not the verified span of this bridge.",
      "The documented section combines glued FRP hollow-section girders with an ECC plate deck; it is a hybrid system, not an all-FRP bridge.",
      "Adhesive joints, drainage, fire exposure, bearings and inspection access still require project-specific qualification.",
      "The record is evidence of an FRP beam concept in public service, not a generic approval of catalogue profiles.",
    ],
    source: sourceUrls.tmrGuide,
    sourceLabel: "Queensland TMR active-user bridge guideline",
  },
  {
    id: "sao-silvestre-footbridge",
    number: "03",
    name: "São Silvestre Footbridge",
    location: "Ovar, Portugal",
    system: "Hybrid GFRP–SFRSCC simply supported beam bridge",
    image: "/images/case-studies/beam-bridge/sao-silvestre-gfrp-footbridge-case-study.svg",
    alt: "Engineering schematic of the São Silvestre hybrid GFRP and concrete pedestrian beam bridge",
    summary:
      "Developed through Portuguese university–industry research, this full-scale bridge links laboratory static, dynamic and creep testing with an in-service pedestrian beam system monitored after installation.",
    stats: [
      ["Overall length", "11 m"],
      ["Installed span", "10 m"],
      ["Deck width", "2 m"],
      ["Main girders", "2 pultruded GFRP"],
    ],
    lessons: [
      "Each main I-girder is 400 × 200 × 15 mm; the steel-fibre-reinforced self-compacting concrete deck is 37.5 mm thick.",
      "The hybrid interface combines an epoxy layer with mechanical detailing, while local concrete jackets protect the thin webs near concentrated support reactions.",
      "The earlier full-scale prototype was tested at a 10.5 m support span; the 2022 in-service study records a 10.0 m installed span.",
      "The research programme tested static, dynamic and creep behaviour before the bridge entered service in 2015.",
      "Later operational modal research reinforces a central lesson: damping and vibration results belong to the complete bridge system, not to GFRP as a universal material constant.",
    ],
    source: sourceUrls.saoSilvestre,
    sourceLabel: "Composite Structures research paper",
    secondarySource: sourceUrls.saoSilvestreDynamic,
    secondarySourceLabel: "2022 operational modal study",
  },
] as const;

const frpChecks = [
  {
    icon: "girder" as const,
    title: "Orthotropic member properties",
    copy: "Use direction-specific tension, compression, bending and shear data. Thin webs and flanges also need local buckling and support checks.",
  },
  {
    icon: "vibration" as const,
    title: "Deflection and vibration",
    copy: "Lower modulus and low mass can make serviceability govern. Include bending, shear deformation, creep, modal mass, damping and acceleration.",
  },
  {
    icon: "connection" as const,
    title: "Connections and local loads",
    copy: "Qualify bolt bearing, net section, adhesive durability, slip, deck-to-girder transfer, barrier anchors and concentrated bearing reactions.",
  },
  {
    icon: "durability" as const,
    title: "Exposure and durability",
    copy: "Define resin, UV protection, temperature and moisture reductions, wear surface, drainage and a damage-tolerant inspection plan.",
  },
  {
    icon: "fire" as const,
    title: "Fire and accidental actions",
    copy: "Fire response depends on resin, geometry, protection, exposed faces and load. Treat vandalism, impact and replacement access explicitly.",
  },
  {
    icon: "delivery" as const,
    title: "Manufacture and erection",
    copy: "Specify traceability, production verification, lift points, temporary bracing, transport envelope, tolerances and bearing installation.",
  },
] as const;

const faqs = [
  {
    question: "What is a beam bridge?",
    answer:
      "A beam bridge carries its deck on one or more horizontal beams or girders spanning between abutments, piers or both. Deck loads reach the main members through deck action or cross-members, then pass through bearings or end connections into the substructure and foundations.",
  },
  {
    question: "Is a girder bridge the same as a beam bridge?",
    answer:
      "The terms are often used interchangeably. In practice, girder usually describes a larger primary beam, while I-girder, T-girder and box-girder identify member geometry. The structural family is still governed by beam action: bending and shear between supports.",
  },
  {
    question: "How wide should a pedestrian or cycle bridge be?",
    answer:
      "There is no universal width. Clear width is measured between barriers and must follow the owner, jurisdiction, forecast peak flow, user mix and separation strategy. Queensland lists 3.0 m minimum clear width for two-way cycling and shared use, while the Transport for NSW toolbox gives a 4.0 m desired minimum for a shared path—showing why the jurisdiction must be stated.",
  },
  {
    question: "Why do footbridges need a vibration check?",
    answer:
      "People can excite vertical, lateral and torsional modes through walking, running and crowd movement. Natural frequency is only a screening variable; modal mass, damping, mode shape, pedestrian density and peak acceleration determine comfort. In the Australian framework, vertical frequencies below 5 Hz trigger investigation and lateral frequencies below 1.5 Hz require special consideration.",
  },
  {
    question: "Can an FRP beam bridge be maintenance-free?",
    answer:
      "No bridge should be specified as maintenance-free. FRP avoids conventional steel-corrosion mechanisms in the composite member, but surfacing, joints, drainage, bearings, bolts, adhesive interfaces, UV protection, fire damage and concealed deck-to-girder connections still need planned inspection and repair access.",
  },
  {
    question: "Can a maintenance vehicle use a pedestrian bridge?",
    answer:
      "Only when the design brief and governing load model include it. The owner should deliberately include or exclude maintenance and emergency vehicles, state the decision on the drawings and control physical access accordingly.",
  },
  {
    question: "How long can a pedestrian beam bridge span?",
    answer:
      "There is no single material limit. Span is a system decision involving girder depth, continuity, deck action, vibration, transport, erection and owner criteria. Queensland TMR describes multi-beam FRP systems as a practical short-span option around 12 m, while longer active-user beam bridges commonly use steel or prestressed concrete; neither figure is a universal maximum.",
  },
];

const images = [
  "/images/case-studies/beam-bridge/pedestrian-cycle-beam-bridge-load-path.svg",
  "/images/case-studies/beam-bridge/pedestrian-cycle-bridge-section.svg",
  "/images/case-studies/beam-bridge/footbridge-vibration-serviceability.svg",
  ...caseStudies.map((caseStudy) => caseStudy.image),
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${absoluteUrl(pagePath)}#article`,
      headline: title,
      name: "Beam Bridge Design for Pedestrian and Cycle Bridges",
      description,
      url: absoluteUrl(pagePath),
      mainEntityOfPage: absoluteUrl(pagePath),
      datePublished: "2026-08-31",
      dateModified: "2026-09-01",
      isAccessibleForFree: true,
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
        { "@type": "Thing", name: "Pedestrian bridge" },
        { "@type": "Thing", name: "Cycle bridge" },
        { "@type": "Thing", name: "Pultruded GFRP girder" },
        { "@type": "Thing", name: "Footbridge vibration serviceability" },
      ],
      citation: Object.values(sourceUrls),
    },
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl(pagePath)}#case-studies`,
      name: "Pedestrian and cycle beam bridge case studies",
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
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
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

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className={externalLinkClass} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function CheckList({ items, inverted = false }: { items: readonly string[]; inverted?: boolean }) {
  return (
    <ul className={`space-y-[10px] text-f13 leading-golden ${inverted ? "text-white/80" : "text-t2"}`}>
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[22px_1fr] gap-[8px]">
          <span
            aria-hidden="true"
            className={`mt-[2px] flex h-[19px] w-[19px] items-center justify-center rounded-full ${
              inverted ? "bg-white/10 text-[#7be3da]" : "bg-teal-bg text-teal-text"
            }`}
          >
            <BridgeIcon name="check" className="h-[13px] w-[13px]" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function BeamBridgeCaseStudiesPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageHeader
        tag="Engineering Guide + Public Research Cases"
        title="Beam Bridge Design for Pedestrian and Cycle Bridges"
        description="A source-backed guide to active-user beam bridges: load paths, clear width, barriers, joints, vibration, FRP detailing and three public case studies."
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
          note: "Concept screening only. The bridge owner and appointed engineer define the governing code, loads and acceptance criteria.",
        }}
      />

      <ArticleSignals
        publishedAt="2026-08-31"
        updatedAt="2026-09-01"
        authorName="Yifan Liu"
        authorRole="Senior Application Engineer — pultruded FRP structural applications"
        authorHref="/about/authors/yifan-liu"
        reviewedBy="Haifeng Gong, Ph.D."
        standards={["AS/NZS 5100:2017", "Austroads ATS 5880-25", "AASHTO FRP Guide, 2nd Ed. (2025)"]}
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
                horizontal beams or girders between supports. On a pedestrian or cycle crossing,
                the load path normally runs from the deck through cross-members or deck action into
                the longitudinal girders, then through bearings or end connections to the
                substructure, foundations and ground.
              </p>
              <p className="mt-[13px] text-f13 leading-golden text-t2">
                The structural definition follows public explanations from{" "}
                <SourceLink href={sourceUrls.definition}>Victoria&apos;s Big Build</SourceLink> and the{" "}
                <SourceLink href={sourceUrls.bending}>FHWA beam-bending reference</SourceLink>.
                The animated diagram is conceptual, not a project design.
              </p>
              <nav
                aria-label="On this page"
                className="mt-[24px] rounded-[8px] border border-border-default bg-bg2 p-[18px]"
              >
                <p className="text-f11 font-bold uppercase tracking-[0.14em] text-t3">
                  On this page
                </p>
                <div className="mt-[10px] flex flex-wrap gap-x-[18px] gap-y-[8px] text-f13 font-semibold">
                  <a className="text-teal-text hover:text-teal" href="#load-path">
                    Load path
                  </a>
                  <a className="text-teal-text hover:text-teal" href="#active-use-design">
                    Active-use design
                  </a>
                  <a className="text-teal-text hover:text-teal" href="#vibration">
                    Vibration
                  </a>
                  <a className="text-teal-text hover:text-teal" href="#case-studies">
                    Case studies
                  </a>
                  <a className="text-teal-text hover:text-teal" href="#frp-design">
                    FRP design
                  </a>
                  <a className="text-teal-text hover:text-teal" href="#sources">
                    Sources
                  </a>
                </div>
              </nav>
            </div>

            <figure className="overflow-hidden rounded-[12px] border border-border-default bg-[#f7faf9] shadow-[0_14px_40px_rgba(11,24,56,0.08)]">
              <Image
                src="/images/case-studies/beam-bridge/pedestrian-cycle-beam-bridge-load-path.svg"
                alt="Animated engineering diagram showing pedestrian and cycle deck loads transferring through beam bridge girders, bearings and supports"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 58vw"
                preload
                className="h-auto w-full"
              />
              <figcaption className="border-t border-border-default bg-white px-[16px] py-[10px] text-f11 leading-relaxed text-t3">
                Original one-shot engineering animation. Motion is disabled when reduced motion is
                requested. Illustrative only; not to scale.
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="load-path" className="scroll-mt-[110px] bg-bg2 py-[55px] md:py-[78px]">
          <div className="mx-auto max-w-[1120px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="grid gap-[30px] lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">
                  Structural behaviour
                </p>
                <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em] text-t1">
                  The complete beam bridge load path
                </h2>
              </div>
              <div className="text-f15 leading-golden text-t2">
                <p>
                  Downward loading bends the main girders: the upper region is generally in
                  compression and the lower region in tension, with high shear demand toward the
                  supports. A continuous bridge also develops negative bending over intermediate
                  supports. The deck, connections, bearings and substructure are not secondary
                  annotations—they are the links that make the path complete.
                </p>
                <p className="mt-[13px]">
                  Lateral load follows a different route through the deck diaphragm, cross-frames,
                  bearings or restraints and substructure. Wind on a high barrier or screen can
                  alter both force and aerodynamic response, so the edge system must be included in
                  the structural model.
                </p>
              </div>
            </div>

            <ol className="mt-[32px] grid gap-[13px] sm:grid-cols-2 lg:grid-cols-4">
              {loadPathSteps.map((step, index) => (
                <li key={step.label} className="rounded-[8px] border border-border-default bg-white p-[20px]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-teal-bg text-teal-text">
                      <BridgeIcon name={step.icon} />
                    </span>
                    <span className="text-f11 font-extrabold tracking-[0.12em] text-t3">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-[14px] text-f17 font-bold text-t1">{step.label}</h3>
                  <p className="mt-[6px] text-f13 leading-golden text-t2">{step.copy}</p>
                </li>
              ))}
            </ol>

            <div className="mt-[22px] grid gap-[13px] md:grid-cols-3">
              {[
                ["Simple span", "Positive bending dominates between two supports; movement is usually managed at the ends."],
                ["Continuous span", "Continuity can reduce midspan demand but adds negative bending and restraint effects over piers."],
                ["Girder geometry", "I-, T- and box-girders are member forms. The FHWA notes that beam and girder are often used interchangeably."],
              ].map(([heading, copy]) => (
                <div key={heading} className="border-t-[3px] border-teal-border bg-white p-[18px]">
                  <h3 className="text-f15 font-bold text-t1">{heading}</h3>
                  <p className="mt-[6px] text-f13 leading-golden text-t2">{copy}</p>
                </div>
              ))}
            </div>
            <p className="mt-[12px] text-f11 leading-relaxed text-t3">
              Terminology reference:{" "}
              <SourceLink href={sourceUrls.bridgeTypes}>FHWA bridge types and girder forms</SourceLink>.
            </p>
          </div>
        </section>

        <section id="active-use-design" className="scroll-mt-[110px] bg-white py-[55px] md:py-[89px]">
          <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="grid gap-[34px] lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">
                  Pedestrian and bicycle geometry
                </p>
                <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em] text-t1">
                  Design the path and bridge as one system
                </h2>
                <p className="mt-[16px] text-f15 leading-golden text-t2">
                  An active-user beam bridge is not a road bridge with traffic loads removed. The
                  usable corridor is defined by clear width, approach alignment, gradients,
                  sightlines, barrier geometry, joints, drainage, lighting and the behaviour of
                  people on foot, bicycles, wheelchairs and mobility devices.
                </p>
                <div className="mt-[22px] rounded-[9px] border-l-[4px] border-[#d69535] bg-[#fff8e9] p-[18px]">
                  <h3 className="text-f15 font-bold text-t1">There is no universal minimum width</h3>
                  <p className="mt-[7px] text-f13 leading-golden text-t2">
                    Queensland TMR lists 3.0 m minimum clear width between barriers for two-way
                    cycling and shared pedestrian–cycle use. The Transport for NSW toolbox gives a
                    4.0 m desired minimum for a shared path. Both are jurisdiction-specific; demand,
                    separation and owner approval govern the project.
                  </p>
                  <p className="mt-[9px] text-f11 text-t3">
                    Sources:{" "}
                    <SourceLink href={sourceUrls.tmrCriteria}>Queensland TMR 2024 criteria</SourceLink>{" "}
                    and{" "}
                    <SourceLink href={sourceUrls.nswToolbox}>Transport for NSW toolbox</SourceLink>.
                  </p>
                </div>
              </div>

              <figure className="overflow-hidden rounded-[12px] border border-border-default bg-bg2">
                <Image
                  src="/images/case-studies/beam-bridge/pedestrian-cycle-bridge-section.svg"
                  alt="Pedestrian and cycle beam bridge cross-section showing clear width, barriers, drainage, deck, crossbeam, main girders and bearings"
                  width={1600}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-border-default bg-white px-[16px] py-[10px] text-f11 leading-relaxed text-t3">
                  Clear width is measured between barriers. Values and edge details must be approved
                  by the owner and governing jurisdiction. Illustrative only; not to scale.
                </figcaption>
              </figure>
            </div>

            <div className="mt-[34px] grid gap-[13px] sm:grid-cols-2 lg:grid-cols-3">
              {activeUseDecisions.map((item) => (
                <article key={item.title} className="rounded-[8px] border border-border-default bg-bg2 p-[20px]">
                  <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-white text-teal-text shadow-sm">
                    <BridgeIcon name={item.icon} />
                  </span>
                  <h3 className="mt-[13px] text-f17 font-bold text-t1">{item.title}</h3>
                  <p className="mt-[6px] text-f13 leading-golden text-t2">{item.copy}</p>
                </article>
              ))}
            </div>

            <div className="mt-[26px] grid gap-[16px] rounded-[10px] border border-border-default bg-[#0b1838] p-[22px] text-white md:grid-cols-[0.72fr_1.28fr] md:p-[28px]">
              <div>
                <p className="text-f11 font-bold uppercase tracking-[0.16em] text-[#62d8cf]">
                  Australian project route
                </p>
                <h3 className="mt-[8px] text-f24 font-extrabold">Code plus owner criteria</h3>
              </div>
              <p className="text-f13 leading-golden text-white/80">
                Australian bridge work starts with the adopted AS/NZS 5100 series, then applies the
                road authority&apos;s active-transport requirements and the current Austroads Guide to
                Road Design Part 6A. Adoption, editions and project amendments must be confirmed in
                the brief; a web article cannot establish compliance. See{" "}
                <SourceLink href={sourceUrls.as5100}>Standards Australia</SourceLink> and{" "}
                <SourceLink href={sourceUrls.austroadsPart6A}>Austroads Part 6A</SourceLink>.
              </p>
            </div>
          </div>
        </section>

        <section id="vibration" className="scroll-mt-[110px] bg-bg2 py-[55px] md:py-[89px]">
          <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[20px] sm:px-[28px] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-[34px]">
            <figure className="overflow-hidden rounded-[12px] border border-border-default bg-white shadow-[0_12px_34px_rgba(11,24,56,0.05)]">
              <Image
                src="/images/case-studies/beam-bridge/footbridge-vibration-serviceability.svg"
                alt="Footbridge vibration workflow showing vertical and lateral modes, Australian screening triggers, acceleration-based comfort assessment and mitigation"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="h-auto w-full"
              />
              <figcaption className="border-t border-border-default bg-white px-[16px] py-[10px] text-f11 leading-relaxed text-t3">
                The 5 Hz vertical and 1.5 Hz lateral values are Australian investigation triggers,
                not pass/fail comfort limits.
              </figcaption>
            </figure>

            <div>
              <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">
                Dynamic serviceability
              </p>
              <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em] text-t1">
                Natural frequency is a screen, not a verdict
              </h2>
              <p className="mt-[16px] text-f15 leading-golden text-t2">
                Walking, running and crowd movement can excite vertical, lateral and torsional
                modes. In the AS/NZS 5100-based TMR guidance, a pedestrian bridge with vertical
                resonant frequency below 5 Hz requires a vibration serviceability investigation;
                special consideration is also required when the fundamental horizontal frequency
                is below 1.5 Hz.
              </p>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                Passing those screens does not prove comfort. The analysis still needs mode shape,
                modal mass, damping, pedestrian density and peak acceleration. The European
                Commission JRC/HIVOSS guide frames the same problem around comfort, lock-in risk,
                intentional excitation, testing and response mitigation.
              </p>
              <div className="mt-[20px] rounded-[9px] border border-[#e5bd7b] bg-[#fff8e9] p-[18px]">
                <div className="flex gap-[12px]">
                  <span className="mt-[1px] flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[8px] bg-white text-[#8a5b12]">
                    <BridgeIcon name="vibration" />
                  </span>
                  <div>
                    <h3 className="text-f15 font-bold text-t1">A useful academic counterexample</h3>
                    <p className="mt-[6px] text-f13 leading-golden text-t2">
                      A 2023 Monash pultruded-GFRP research footbridge measured first vertical
                      frequencies around 5.9–6.2 Hz, yet walking tests produced a reported peak
                      acceleration of 2.86 m/s². It was a specific 9 m prototype without its final
                      accessories—not a universal FRP result—but it shows why frequency alone is
                      insufficient.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-[13px] text-f11 leading-relaxed text-t3">
                Sources:{" "}
                <SourceLink href={sourceUrls.tmrGuide}>Queensland TMR 2023 guideline</SourceLink>,{" "}
                <SourceLink href={sourceUrls.jrcVibration}>European Commission JRC/HIVOSS</SourceLink>{" "}
                and <SourceLink href={sourceUrls.monashResearch}>Monash research paper</SourceLink>.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#0b1838] py-[55px] text-white md:py-[78px]">
          <div className="mx-auto max-w-[1120px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="grid gap-[28px] lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-f11 font-bold uppercase tracking-[0.18em] text-[#62d8cf]">
                  Balanced assessment
                </p>
                <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em]">
                  Where beam bridges work—and what governs
                </h2>
              </div>
              <div className="grid gap-[16px] md:grid-cols-2">
                <article className="rounded-[10px] border border-white/15 bg-white/[0.06] p-[22px]">
                  <h3 className="text-f19 font-bold text-[#7be3da]">Strengths of the form</h3>
                  <div className="mt-[15px]">
                    <CheckList
                      inverted
                      items={[
                        "Direct and legible structural load path",
                        "Repeatable members suit off-site fabrication",
                        "Multiple material and deck-system options",
                        "Exposed girders can support straightforward inspection",
                      ]}
                    />
                  </div>
                </article>
                <article className="rounded-[10px] border border-white/15 bg-white/[0.06] p-[22px]">
                  <h3 className="text-f19 font-bold text-[#ffcb83]">Common governing checks</h3>
                  <div className="mt-[15px]">
                    <CheckList
                      inverted
                      items={[
                        "Deflection, acceleration and lateral stability",
                        "Joint, bearing and drainage maintainability",
                        "Barrier, wind and accidental-load effects",
                        "Transport depth, lift mass and erection sequence",
                      ]}
                    />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="case-studies" className="scroll-mt-[110px] bg-bg2 py-[55px] md:py-[89px]">
          <div className="mx-auto max-w-[1180px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="max-w-[840px]">
              <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">
                Evidence-led examples
              </p>
              <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em] text-t1">
                Three pedestrian and cycle beam bridge case studies
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                These are publicly documented references selected for different lessons: a major
                concrete cycle bridge, a lightweight FRP cycleway system and a university-tested
                hybrid GFRP footbridge. None is represented as an F1 Composite project.
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
                    <figure className="self-start bg-white lg:border-r lg:border-border-default">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.alt}
                        width={1600}
                        height={900}
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="h-auto w-full"
                      />
                      <figcaption className="border-t border-border-default bg-white px-[16px] py-[10px] text-f11 leading-relaxed text-t3">
                        Original explanatory schematic based on the cited public record; not a
                        project drawing and not to scale.
                      </figcaption>
                    </figure>
                    <div className="p-[24px] md:p-[30px]">
                      <div className="flex flex-wrap items-center gap-[8px]">
                        <span className="text-f11 font-extrabold tracking-[0.16em] text-teal-text">
                          CASE {caseStudy.number}
                        </span>
                        <span className="rounded-full border border-[#e5bd7b] bg-[#fff8e9] px-[9px] py-[3px] text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a4c08]">
                          Public reference · not an F1 project
                        </span>
                      </div>
                      <h3 className="mt-[10px] text-f28 font-extrabold tracking-[-0.025em] text-t1">
                        {caseStudy.name}
                      </h3>
                      <p className="mt-[5px] text-f13 font-semibold text-t3">
                        {caseStudy.location} · {caseStudy.system}
                      </p>
                      <p className="mt-[14px] text-f15 leading-golden text-t2">{caseStudy.summary}</p>

                      <dl className="mt-[20px] grid grid-cols-2 gap-[8px]">
                        {caseStudy.stats.map(([label, value]) => (
                          <div key={label} className="rounded-[7px] border border-border-default bg-bg2 p-[12px]">
                            <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-t3">
                              {label}
                            </dt>
                            <dd className="mt-[3px] text-f15 font-extrabold text-t1">{value}</dd>
                          </div>
                        ))}
                      </dl>

                      <h4 className="mt-[20px] text-f13 font-bold uppercase tracking-[0.08em] text-t1">
                        What the record shows
                      </h4>
                      <div className="mt-[10px]">
                        <CheckList items={caseStudy.lessons} />
                      </div>
                      <p className="mt-[16px] text-f13">
                        <SourceLink href={caseStudy.source}>
                          Primary source: {caseStudy.sourceLabel} ↗
                        </SourceLink>
                        {"secondarySource" in caseStudy ? (
                          <>
                            <br />
                            <SourceLink href={caseStudy.secondarySource}>
                              Supporting source: {caseStudy.secondarySourceLabel} ↗
                            </SourceLink>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="research-basis" className="scroll-mt-[110px] bg-white py-[55px] md:py-[89px]">
          <div className="mx-auto max-w-[1120px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="max-w-[820px]">
              <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">
                Research basis
              </p>
              <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em] text-t1">
                What each institution contributes
              </h2>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                No single publication covers the whole decision. The design picture becomes more
                reliable when owner guidance, standards bodies, full-scale research and long-term
                field evidence are read together.
              </p>
            </div>

            <div className="mt-[30px] grid gap-[13px] md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "barrier" as const,
                  heading: "Queensland TMR",
                  copy: "Owner guidance for active-user geometry, barriers, loads, vibration screening, maintenance access and value-for-money system selection.",
                  href: sourceUrls.tmrGuide,
                  link: "Read the 2023 technical guideline",
                },
                {
                  icon: "vibration" as const,
                  heading: "European Commission JRC / HIVOSS",
                  copy: "A human-induced vibration methodology covering comfort, lock-in risk, measurement, modal identification and response control.",
                  href: sourceUrls.jrcVibration,
                  link: "Read the JRC research guide",
                },
                {
                  icon: "girder" as const,
                  heading: "Lisbon, Minho and Porto research teams",
                  copy: "Full-scale static, dynamic and creep testing plus later in-service modal assessment of the São Silvestre hybrid footbridge.",
                  href: sourceUrls.saoSilvestre,
                  link: "Review the full-scale study",
                },
                {
                  icon: "connection" as const,
                  heading: "AASHTO",
                  copy: "The 2025 second-edition LRFD guide updates the US design route for FRP pedestrian bridges and delegated system design.",
                  href: sourceUrls.aashtoFrp,
                  link: "View the current publication record",
                },
                {
                  icon: "inspection" as const,
                  heading: "Austroads",
                  copy: "ATS 5880-25 treats FRP bridge members as controlled, documented and tested manufactured products, not dimension-only catalogue items.",
                  href: sourceUrls.ats5880,
                  link: "View ATS 5880-25 Ed. 1.1",
                },
                {
                  icon: "durability" as const,
                  heading: "University of Birmingham / EPFL evidence",
                  copy: "Twenty-five-year Pontresina evidence shows why retained stiffness must not be presented as unchanged strength or maintenance-free service.",
                  href: sourceUrls.pontresina,
                  link: "Review the 2026 durability study",
                },
              ].map((item) => (
                <article key={item.heading} className="rounded-[9px] border border-border-default bg-bg2 p-[20px]">
                  <span className="flex h-[42px] w-[42px] items-center justify-center rounded-[8px] bg-white text-teal-text shadow-sm">
                    <BridgeIcon name={item.icon} />
                  </span>
                  <h3 className="mt-[13px] text-f17 font-bold text-t1">{item.heading}</h3>
                  <p className="mt-[7px] text-f13 leading-golden text-t2">{item.copy}</p>
                  <p className="mt-[10px] text-f11">
                    <SourceLink href={item.href}>{item.link} ↗</SourceLink>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="frp-design" className="scroll-mt-[110px] bg-bg2 py-[55px] md:py-[89px]">
          <div className="mx-auto max-w-[1120px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <div className="grid gap-[32px] lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-f11 font-bold uppercase tracking-[0.18em] text-teal-text">
                  FRP beam bridge design
                </p>
                <h2 className="mt-[10px] text-f32 font-extrabold tracking-[-0.025em] text-t1">
                  Lightweight does not mean lightly engineered
                </h2>
              </div>
              <div>
                <p className="text-f15 leading-golden text-t2">
                  Pultruded FRP can reduce lifting mass and remove conventional steel corrosion from
                  the composite member, which is useful at corrosive or difficult-access sites. It
                  is not a one-for-one steel substitution. Pultruded members are orthotropic, and
                  lower stiffness means deflection, shear deformation, vibration, local bearing and
                  connection deformation can govern before material strength is fully used.
                </p>
                <p className="mt-[13px] text-f15 leading-golden text-t2">
                  The current design and procurement route depends on jurisdiction. In the United
                  States, AASHTO published the second edition of its LRFD guide for FRP pedestrian
                  bridges in 2025. In Australia and New Zealand, Austroads ATS 5880-25 Ed. 1.1 sets
                  manufacturing requirements for members assembled from standard pultrusions or
                  bespoke vacuum-infused mouldings. The bridge owner&apos;s code and specifications
                  still govern the final system.
                </p>
              </div>
            </div>

            <div className="mt-[30px] grid gap-[13px] md:grid-cols-2 lg:grid-cols-3">
              {frpChecks.map((item) => (
                <article key={item.title} className="rounded-[8px] border border-border-default bg-white p-[20px]">
                  <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-teal-bg text-teal-text">
                    <BridgeIcon name={item.icon} />
                  </span>
                  <h3 className="mt-[13px] text-f15 font-bold text-t1">{item.title}</h3>
                  <p className="mt-[7px] text-f13 leading-golden text-t2">{item.copy}</p>
                </article>
              ))}
            </div>

            <div className="mt-[26px] grid gap-[16px] md:grid-cols-2">
              <article className="rounded-[10px] border-l-[4px] border-teal-text bg-teal-bg p-[20px] md:p-[24px]">
                <h3 className="text-f17 font-bold text-t1">Durability needs two columns, not one slogan</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">
                  A 2026 long-term Pontresina study reported unchanged global bridge stiffness after
                  25 years, while alpine-exposed material samples retained about 70% of initial
                  tensile strength. Pontresina is a truss, not a beam-bridge case; the evidence is
                  used here only to show that stiffness retention is not proof of unchanged strength.
                </p>
                <p className="mt-[9px] text-f11 text-t3">
                  Source: <SourceLink href={sourceUrls.pontresina}>Liu &amp; Keller, Composite Structures (2026)</SourceLink>.
                </p>
              </article>
              <article className="rounded-[10px] border-l-[4px] border-[#d69535] bg-[#fff8e9] p-[20px] md:p-[24px]">
                <h3 className="text-f17 font-bold text-t1">Fire performance is system-specific</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">
                  Resin chemistry, member geometry, exposed surface, protective layers, design load
                  and fire scenario determine performance. Neither “fireproof” nor a blanket failure
                  statement is defensible without a tested assembly and project fire strategy.
                </p>
              </article>
            </div>

            <div className="mt-[30px] rounded-[10px] border border-border-default bg-white p-[20px] md:p-[24px]">
              <div className="grid gap-[18px] md:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <h3 className="text-f19 font-bold text-t1">Minimum RFQ inputs</h3>
                  <p className="mt-[7px] text-f13 leading-golden text-t2">
                    Screen the whole bridge system before asking for a profile quotation.
                  </p>
                </div>
                <CheckList
                  items={[
                    "Clear span, overall width, support condition and required structural depth",
                    "Pedestrian, cycle, crowd, wind and any maintenance-vehicle load models",
                    "Deflection, vertical/lateral vibration and acceleration criteria",
                    "Exposure, resin, UV, fire, surface, drainage and design-life requirements",
                    "Deck-to-girder, barrier, bearing and splice concepts with inspection access",
                    "Transport limits, lifting plan, temporary stability and owner specification",
                  ]}
                />
              </div>
            </div>

            <div className="mt-[22px] rounded-[10px] border-l-[4px] border-teal-text bg-teal-bg p-[20px] md:p-[24px]">
              <h3 className="text-f17 font-bold text-t1">Use calculators for screening only</h3>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                The F1{" "}
                <Link className="font-semibold text-teal-text underline underline-offset-4" href="/frp-profile-calculator">
                  FRP beam calculator
                </Link>{" "}
                and{" "}
                <Link className="font-semibold text-teal-text underline underline-offset-4" href="/frp-span-tables">
                  span tables
                </Link>{" "}
                organise preliminary member checks. They do not model pedestrian vibration,
                bearings, bridge-system load distribution, fatigue, accidental actions or owner
                acceptance.
              </p>
            </div>

            <FAQ items={faqs} />
          </div>
        </section>

        <section id="sources" className="scroll-mt-[110px] border-t border-border-default bg-white py-[55px]">
          <div className="mx-auto max-w-[1120px] px-[20px] sm:px-[28px] lg:px-[34px]">
            <h2 className="text-f24 font-extrabold text-t1">Primary sources and visual methodology</h2>
            <p className="mt-[10px] max-w-[880px] text-f13 leading-golden text-t2">
              Project measurements are transcribed from transport-agency records or peer-reviewed
              research. The six diagrams are original explanatory graphics, not copied project
              drawings or photographic proof. Every project is labelled as a public reference and
              not an F1 Composite delivery.
            </p>

            <div className="mt-[22px] grid gap-[24px] lg:grid-cols-2">
              {[
                {
                  heading: "Bridge form and active-use criteria",
                  links: [
                    ["Victoria's Big Build — beam bridge definition", sourceUrls.definition],
                    ["FHWA — bending behaviour of beams", sourceUrls.bending],
                    ["Queensland TMR — pedestrian and cyclist bridge options", sourceUrls.tmrGuide],
                    ["Queensland TMR — bridge design criteria", sourceUrls.tmrCriteria],
                    ["Austroads — Guide to Road Design Part 6A", sourceUrls.austroadsPart6A],
                    ["Transport for NSW — Cycleway Design Toolbox", sourceUrls.nswToolbox],
                  ],
                },
                {
                  heading: "Research, cases and FRP specifications",
                  links: [
                    ["European Commission JRC — human-induced vibration", sourceUrls.jrcVibration],
                    ["Queensland TMR — Moggill Road Cycle Bridge", sourceUrls.moggill],
                    ["Gonilha et al. — São Silvestre full-scale study", sourceUrls.saoSilvestre],
                    ["Dacol et al. — São Silvestre modal study", sourceUrls.saoSilvestreDynamic],
                    ["AASHTO — 2025 FRP pedestrian bridge guide", sourceUrls.aashtoFrp],
                    ["Austroads — ATS 5880-25 FRP bridge members", sourceUrls.ats5880],
                    ["University of Birmingham — 25-year durability study", sourceUrls.pontresina],
                    ["Monash pGFRP footbridge research", sourceUrls.monashResearch],
                  ],
                },
              ].map((group) => (
                <section key={group.heading} aria-labelledby={`source-${group.heading.replaceAll(" ", "-").toLowerCase()}`}>
                  <h3
                    id={`source-${group.heading.replaceAll(" ", "-").toLowerCase()}`}
                    className="text-f17 font-bold text-t1"
                  >
                    {group.heading}
                  </h3>
                  <ol className="mt-[12px] space-y-[8px] text-f13 leading-golden text-t2">
                    {group.links.map(([label, href], index) => (
                      <li key={href} className="grid grid-cols-[24px_1fr] rounded-[7px] border border-border-default bg-bg2 p-[12px]">
                        <span className="font-bold text-t3">{index + 1}.</span>
                        <SourceLink href={href}>{label} ↗</SourceLink>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AskAICard
        title="Screen an FRP pedestrian bridge concept"
        description="Give the advisor your span, clear width, user mix, load model, exposure and governing owner. It will organise missing inputs and relevant F1 profile data; it does not replace the bridge engineer."
        prefill="I am evaluating an FRP pedestrian or cycle beam bridge. Help me structure the preliminary inputs for geometry, loads, vibration, connections, durability, erection and the RFQ without treating the result as final bridge design."
        ctaLabel="Start the engineering screen →"
      />

      <RelatedLinks
        groups={[
          {
            title: "Bridge applications",
            links: [
              { href: "/applications/frp-pedestrian-bridge-superstructures", label: "FRP pedestrian bridge superstructures" },
              { href: "/applications/frp-bridge-deck-panels", label: "FRP bridge deck panels" },
              { href: "/industries/infrastructure", label: "FRP for infrastructure" },
            ],
          },
          {
            title: "Products",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "Pultruded FRP I-beams" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
              { href: "/products/frp-handrail-systems", label: "FRP handrail systems" },
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
      <InnerCTA title="Planning a pedestrian or cycle beam bridge?" />
    </>
  );
}
