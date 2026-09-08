export const sourceUrls = {
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
  jrcVibration:
    "https://publications.jrc.ec.europa.eu/repository/handle/JRC53442",
  monashResearch: "https://www.open-access.bcu.ac.uk/14288/",
  moggill:
    "https://www.tmr.qld.gov.au/travel-and-transport/cycling/infrastructure-projects/moggill-road-cycle-bridge",
  saoSilvestre:
    "https://www.sciencedirect.com/science/article/pii/S0263822314003997",
  saoSilvestreDynamic:
    "https://onlinelibrary.wiley.com/doi/full/10.1002/stc.3137",
  aashtoFrp: "https://store.transportation.org/Item/PublicationDetail?ID=5405",
  ats5880: "https://austroads.gov.au/publications/test-methods/ats-5880",
  pontresina:
    "https://research.birmingham.ac.uk/en/publications/durability-of-pultruded-fibre-polymer-composite-structures-under-/",
  as5100: "https://www.standards.org.au/sector-case-studies/construction",
} as const;

export const caseStudies = [
  {
    id: "moggill-road-cycle-bridge",
    number: "01",
    name: "Moggill Road Cycle Bridge",
    location: "Indooroopilly, Brisbane, Australia",
    system: "Prestressed-concrete T-girder cycle bridge",
    image:
      "/images/case-studies/beam-bridge/moggill-road-cycle-bridge-case-study.svg",
    mobileImage:
      "/images/case-studies/beam-bridge/moggill-road-cycle-bridge-case-study-mobile.svg",
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
    image:
      "/images/case-studies/beam-bridge/coronation-drive-frp-cycleway-case-study.svg",
    mobileImage:
      "/images/case-studies/beam-bridge/coronation-drive-frp-cycleway-case-study-mobile.svg",
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
    image:
      "/images/case-studies/beam-bridge/sao-silvestre-gfrp-footbridge-case-study.svg",
    mobileImage:
      "/images/case-studies/beam-bridge/sao-silvestre-gfrp-footbridge-case-study-mobile.svg",
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

export const faqs = [
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
