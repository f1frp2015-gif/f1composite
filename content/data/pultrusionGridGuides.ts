import type { PultrusionGuide } from "./pultrusionGuideTypes";

const profileImage = {
  image: "/images/products/standard-profiles-cover.jpg",
  imageAlt: "Composite profile geometry for electrical component qualification",
  imageCaption: "Reference geometry; final electrical assembly requires separate qualification",
};

const switchgearSources: PultrusionGuide["sources"] = [
  { id: "roechling-switchgear", title: "Röchling: composite materials for switchgear", url: "https://www.roechling.com/us/industrial/electrical-industry/switchgear", kind: "industry", note: "Application discovery: pultruded frames and housings in switchgear. Supplier grades, ratings and service history do not establish F1 capabilities." },
  { id: "iec-lv-assemblies", title: "IEC 61439-1:2020: low-voltage assemblies", url: "https://webstore.iec.ch/en/publication/32338", kind: "authority", note: "Assembly-level general rules, used with the relevant product part. The official copy incorporates the 2021 and 2023 corrigenda." },
  { id: "iec-hv-common", title: "IEC 62271-1:2017+AMD1:2021: AC switchgear", url: "https://webstore.iec.ch/en/publication/71439", kind: "authority", note: "Common specifications for AC switchgear above 1 kV, subject to the relevant equipment-specific part." },
  { id: "iec-metal-enclosed", title: "IEC 62271-200:2021+AMD1:2024: metal-enclosed assemblies", url: "https://webstore.iec.ch/en/publication/96236", kind: "authority", note: "AC metal-enclosed equipment above 1 kV through 52 kV. Includes equipment tests; does not assign an arc rating to a bare FRP profile." },
  { id: "iec-coordination", title: "IEC 60664-1:2020+AMD1:2025: insulation coordination", url: "https://webstore.iec.ch/en/publication/107319", kind: "authority", note: "Low-voltage insulation-coordination scope, including its limits for gases and liquid insulation." },
  { id: "iec-tracking", title: "IEC 60112:2025: proof and comparative tracking indices", url: "https://webstore.iec.ch/en/publication/79781", kind: "authority", note: "Official catalog lists the corrected 2026-02 version. Material tracking characterization must not be presented as equipment working voltage." },
  { id: "iec-thermal", title: "IEC 60085:2007: thermal evaluation and designation", url: "https://webstore.iec.ch/en/publication/666", kind: "authority", note: "Distinguishes an electrical insulating material from an electrical insulation system for thermal classification." },
  { id: "eu-fgas", title: "European Commission: F-gas rules affecting equipment", url: "https://climate.ec.europa.eu/areas-action/fluorinated-greenhouse-gases/stakeholder-obligations/f-gases-equipment-and-products_en", kind: "authority", note: "Official implementation guidance for Regulation (EU) 2024/573. The regulation, not this summary guidance, has legal force." },
  { id: "eu-fgas-faq", title: "European Commission: electrical switchgear F-gas FAQ", url: "https://climate.ec.europa.eu/document/download/cfe52d31-9203-435d-b043-62f74900fd96_en?filename=policy_f-gases_stakeholders_switchgear_faq_en.pdf", kind: "authority", note: "Version 3, November 2025, explains staged putting-into-operation prohibitions and derogations; check the project date and applicable legal text." },
];

const switchgearStandards: PultrusionGuide["standards"] = [
  { name: "IEC 61439-1:2020 with the relevant product part", category: "Standard", jurisdiction: "Low-voltage assembly contracts adopting IEC requirements or their national implementation.", applies: "General requirements and verification of low-voltage switchgear and controlgear assemblies. Part 1 is used with the relevant Part 2 or later product part.", limits: "Part 1 alone is not an assembly conformity route. Approval of a support material does not establish temperature rise, short-circuit withstand or dielectric performance of the assembly.", sourceIds: ["iec-lv-assemblies"] },
  { name: "IEC 62271-1:2017+AMD1:2021", category: "Standard", jurisdiction: "AC high-voltage equipment programs adopting IEC requirements; equipment-specific parts and national adoption govern.", applies: "Common specifications for AC switchgear above 1 kV, with service frequencies through 60 Hz, unless the particular equipment standard specifies otherwise.", limits: "This is not a material standard or a qualification of an individual insulating operating rod. DC equipment requires its appropriate separate framework.", sourceIds: ["iec-hv-common"] },
  { name: "IEC 62271-200:2021+AMD1:2024", category: "Standard", jurisdiction: "Projects specifying prefabricated AC metal-enclosed switchgear within the standard's scope.", applies: "Assemblies rated above 1 kV and through 52 kV, indoors or outdoors, with frequencies through 60 Hz.", limits: "Internal-arc classification and other equipment results depend on the tested arrangement. Neither a flame-retardant resin nor a profile coupon proves the classification of a modified enclosure.", sourceIds: ["iec-metal-enclosed"] },
  { name: "IEC 60664-1:2020+AMD1:2025", category: "Standard", jurisdiction: "Low-voltage equipment insulation-coordination programs using this IEC basic safety publication through the relevant product standard.", applies: "Equipment up to AC 1,000 V or DC 1,500 V, through 30 kHz; addresses creepage, clearance and solid-insulation criteria.", limits: "Do not apply its air-gap rules to liquid insulation, other gases or compressed air. It is not a universal clearance table for medium-voltage switchgear or ionized arc environments.", sourceIds: ["iec-coordination"] },
  { name: "IEC 60112:2025, corrected 2026-02", category: "Standard", jurisdiction: "Material and part qualification programs specifying proof or comparative tracking indices.", applies: "AC-voltage testing of solid insulating material specimens for tracking characterization or acceptance.", limits: "CTI/PTI does not establish impulse withstand, arc containment, equipment voltage or a maintenance interval. Use the exact surface and conditioning relevant to the part.", sourceIds: ["iec-tracking"] },
  { name: "Regulation (EU) 2024/573: switchgear provisions", category: "Regulation", jurisdiction: "European Union equipment and activities within the F-gas Regulation's scope.", applies: "Staged restrictions on putting certain F-gas switchgear into operation, subject to the regulation's conditions and derogations; review the equipment category and project date.", limits: "A composite support is not an F-gas compliance certificate. A change of insulating medium still requires equipment and material compatibility assessment. Commission FAQ guidance does not replace the legal text.", sourceIds: ["eu-fgas", "eu-fgas-faq"] },
];

const conductorSources: PultrusionGuide["sources"] = [
  { id: "epsilon-conductors", title: "Epsilon Composite: advanced conductors", url: "https://www.epsilon-composite.com/en/areas/advanced-conductors", kind: "industry", note: "Discovery evidence for pultruded composite conductor cores. Epsilon's trademarks, qualification, temperature limits and capacity claims are specific to its technology and are not F1 claims." },
  { id: "astm-core", title: "ASTM B987/B987M-25: carbon thermoset conductor cores", url: "https://store.astm.org/b0987_b0987m-25.html", kind: "authority", note: "Active edition checked October 2026; its scope includes defined core and individual-strand diameters. Older supplier pages may still cite the 2020 edition." },
  { id: "iec-core", title: "IEC TS 62818-1:2024: polymeric matrix composite cores", url: "https://webstore.iec.ch/en/publication/87014", kind: "authority", note: "Technical Specification for polymer-matrix single- or multi-wire supporting cores. Characterization guidance is not complete-conductor or line approval." },
  { id: "ieee-rating", title: "IEEE 738-2023: conductor current-temperature calculation", url: "https://standards.ieee.org/ieee/738/10207/", kind: "authority", note: "Thermal calculation method. The official scope expressly leaves selection of suitable weather and conductor parameters to the user." },
  { id: "cigre-qualification", title: "CIGRE TB 426: qualifying high-temperature conductors", url: "https://www.e-cigre.org/publications/detail/426-guide-for-qualifying-high-temperature-conductors-for-use-on-overhead-transmission-lines.html", kind: "authority", note: "2010 guidance for complete conductor systems, including accessories, intended for maximum temperatures above 150°C; not a universal rating for all composite cores." },
  { id: "cigre-uprating", title: "CIGRE TB 763: uprating existing overhead lines", url: "https://www.e-cigre.org/publications/detail/763-conductors-for-the-uprating-of-existing-overhead-lines.html", kind: "authority", note: "2019 guidance covering conductor choices and sag-tension in current uprating. It explicitly distinguishes voltage upgrading." },
  { id: "cigre-new-lines", title: "CIGRE TB 983: high-temperature conductors in new lines", url: "https://www.e-cigre.org/publications/detail/983-use-of-high-temperature-conductors-in-new-overhead-lines.html", kind: "authority", note: "2026 publication covering electrical, mechanical, constructability and economic considerations for new lines; scope reviewed from official public contents." },
  { id: "cigre-handling", title: "CIGRE TB 916: handling fittings and conductors", url: "https://www.e-cigre.org/publications/detail/916-correct-handling-of-fittings-and-conductors-for-overhead-lines.html", kind: "authority", note: "2023 industry guidance on handling and installation. Project-specific manufacturer procedures remain necessary." },
  { id: "epri-specification", title: "EPRI: Advanced Conductor Specification Guide", url: "https://restservice.epri.com/publicdownload/000000003002030304/0/Product", kind: "authority", note: "Public guide and example specification for conductor procurement and thermal-mechanical qualification. Its examples are not universal contract requirements." },
];

const conductorStandards: PultrusionGuide["standards"] = [
  { name: "ASTM B987/B987M-25", category: "Standard", jurisdiction: "Procurement programs specifying ASTM carbon thermoset composite core requirements.", applies: "Carbon-reinforced thermoset supporting cores for overhead conductors; the 2025 scope includes core diameters 4.57–21.21 mm and individual stranded-core wires 1.52–7.07 mm.", limits: "Scope dimensions are not F1 available sizes. Compliance does not approve a finished conductor, fitting or line. Other matrix systems require their applicable qualification basis.", sourceIds: ["astm-core"] },
  { name: "IEC TS 62818-1:2024", category: "Guidance", jurisdiction: "Projects adopting this IEC Technical Specification for polymer-matrix supporting cores.", applies: "Terminology and characterization recommendations for single- or multi-wire fiber-reinforced polymer cores.", limits: "Its stated scope does not supply all compliance criteria that a purchaser may need. Agree acceptance limits and system qualification separately; it is a Technical Specification, not a generic IEC product certificate.", sourceIds: ["iec-core"] },
  { name: "IEEE 738-2023", category: "Standard", jurisdiction: "Line-rating studies and utility programs adopting this calculation method.", applies: "Relates bare-conductor current, temperature and weather for steady and time-varying conditions.", limits: "The user selects appropriate input conditions. Thermal calculation does not qualify core aging, predict all sag behavior or verify fittings and structural capacity.", sourceIds: ["ieee-rating"] },
  { name: "CIGRE TB 426 (2010)", category: "Guidance", jurisdiction: "Utility qualification programs choosing to incorporate this technical guidance.", applies: "Recommendations for qualifying complete high-temperature conductor systems and accessories intended for maximum temperatures above 150°C.", limits: "It is guidance with a defined temperature scope. A buyer must specify the required tests and criteria; citing the brochure does not certify a core or prove service life.", sourceIds: ["cigre-qualification"] },
  { name: "CIGRE TB 763 (2019) and TB 983 (2026)", category: "Guidance", jurisdiction: "Engineering studies for existing-line current uprating or new-line development, respectively.", applies: "Supports selection and system assessment of high-temperature conductors in the relevant project context.", limits: "Neither replaces statutory clearance rules, utility acceptance or project structural calculations. Current uprating must not be described as automatic voltage upgrading.", sourceIds: ["cigre-uprating", "cigre-new-lines"] },
];

export const gridGuides: PultrusionGuide[] = [
  {
    kind: "application",
    slug: "frp-switchgear-insulation-components",
    name: "Switchgear insulation and mechanism components",
    title: "FRP Switchgear Insulation | Supports & Mechanisms",
    description: "Specify pultruded FRP switchgear supports and operating parts: insulation paths, fault loads, cycling, thermal duty, material tests and OEM qualification.",
    heading: "FRP switchgear components: insulation and movement together",
    summary: "A switchgear support must retain the position and electrical separation established by the equipment design. A moving insulating link must do so throughout its stroke and operating life. Start with the assembly's required behavior, then specify the profile and its interfaces.",
    scope: "F1 welcomes drawing-led feasibility and qualification inquiries for pultruded insulating components. This page does not establish an approved electrical grade, a switchgear voltage rating, an arc classification or a complete operating mechanism supplied by F1.",
    material: "Glass-fiber thermoset profiles with resin, reinforcement, surface and fabrication qualified for the equipment",
    profiles: ["Insulating support angles and channels", "Constant-section frame and guide members", "Rods or tubes for OEM-qualified insulating linkages"],
    ...profileImage,
    sections: [
      { id: "component-function", title: "Separate a fixed support from a moving operating member", paragraphs: [
        "Annotate an equipment drawing with live conductors, grounded structure, moving contacts, interlocks and the proposed component. Identify whether the part carries a busbar, locates an insulating barrier, guides a carriage, forms a frame or transmits operating force. These functions produce different load cases. A frame that stays still and a rod that changes alignment during a switch operation should not share an acceptance specification merely because both use fiberglass.",
        "Pultrusion is a candidate where the section repeats along the length and the required holes or end features can be produced without compromising the load path. Röchling's switchgear examples confirm profile-based frames and housings as an established application. The component-selection framework here extends that application into questions for the OEM; it does not transfer a competitor's material qualification. Complex molded insulators, pressure-tight barriers and complete interrupters require separate manufacturing and qualification routes.",
      ], sourceIds: ["roechling-switchgear", "iec-hv-common"] },
      { id: "electrical-boundary", title: "Draw the insulation boundary at every operating position", paragraphs: [
        "Provide the equipment voltage, impulse requirements, AC or DC duty, altitude and environment before asking for a material grade. Mark the shortest air gaps and surface paths on the assembled drawing, including the ends of rods, fasteners, adjacent metal edges and any bonded inserts. For a moving part, repeat that review at the travel limits and intermediate positions. A desirable nominal gap can disappear through deflection, wear, a tolerance stack or an incorrect assembly orientation.",
        "For low-voltage equipment, select the applicable insulation-coordination basis through the product standard. IEC 60664-1 has an explicit scope and should not become a universal medium-voltage or gas-insulated spacing calculator. Separate a laminate's dielectric test result, surface tracking behavior and the assembled insulation design. The engineering release should identify which test is addressing which failure mechanism and the condition of the specimen or assembly, rather than describing a profile as suitable for a voltage based only on thickness.",
      ], sourceIds: ["iec-coordination", "iec-lv-assemblies", "iec-hv-common"] },
      { id: "fault-and-cycle-loads", title: "Translate fault and operating duty into component reactions", paragraphs: [
        "The OEM should provide support reactions for normal duty, short-circuit events, switching operations, transport and installation. Keep force magnitude, direction and duration together. For a busbar support, check the spacing of its attachment points and the way electromagnetic loading reaches the profile. For a linkage, map push, pull and side load over the stroke; include misalignment, stopping loads and the compressive condition in which buckling could control. Do not substitute the longitudinal tensile strength for every one of these checks.",
        "Connections often govern the design: a hole can introduce bearing, shear-out or splitting; a metal insert can change local stiffness and introduce a new electrical interface. Define the retention method and inspectable failure criteria before endurance testing. A repeated operating test should track alignment, backlash, wear, retained load transfer and insulation geometry. Passing a single pull test on a rod does not demonstrate that an assembled switch will continue to operate correctly after its specified cycling program.",
      ], sourceIds: ["iec-lv-assemblies", "iec-hv-common", "roechling-switchgear"] },
      { id: "thermal-and-surface", title: "Match thermal and surface evidence to the real duty", paragraphs: [
        "Request the temperature history at the part, not simply the ambient enclosure rating. A support close to a conductor may see a different temperature from one near a ventilation path. Record continuous duty, temporary overloads, thermal cycles and the amount of sustained mechanical load present while hot. Select material data and validation conditions that represent those combinations. Resin family names and room-temperature stiffness do not establish retained clamping force or dimensional stability in service.",
        "A material's thermal endurance, resin glass-transition measurement and insulation-system class answer different questions. IEC 60085 distinguishes material and system classification. Surface tracking assessment under IEC 60112 likewise has its own purpose; a CTI result is not a working-voltage rating. Identify the final surface, coating, machining and cleaning process in the qualification record. If fire performance is specified, define the test and exact construction, and keep that evidence separate from the equipment's internal-arc performance.",
      ], sourceIds: ["iec-thermal", "iec-tracking", "iec-metal-enclosed"] },
      { id: "medium-and-environment", title: "Review the insulating medium and the installation market", paragraphs: [
        "Specify whether the part operates in air, a controlled gas atmosphere or another medium, and whether it is exposed to condensation, dust, coastal contamination or cleaning agents. The engineering team should assess moisture uptake, surface contamination and compatibility of the laminate, adhesive, sealant and metallic interfaces. A material accepted in one enclosure environment should not be silently substituted into another. For sealed equipment, ask the OEM which cleanliness, moisture and outgassing controls belong in component acceptance.",
        "European projects also need an equipment-level review of Regulation (EU) 2024/573. Its staged restrictions include a prohibition from 1 January 2026 on putting into operation medium-voltage switchgear for primary and secondary distribution rated up to and including 24 kV that uses F-gases as its insulating or breaking medium, subject to the regulation's conditions and derogations. Establish the project-specific position before freezing an insulating medium. An FRP component does not itself demonstrate regulatory compliance, and selecting an alternative gas or air arrangement does not preserve the old dielectric and material-compatibility qualification automatically.",
      ], sourceIds: ["eu-fgas", "eu-fgas-faq", "iec-coordination"] },
      { id: "fabrication-and-fit", title: "Control machining, cleanliness and first assembly", paragraphs: [
        "Use functional datums for the mounting faces, pin centers, hole axes, guide surfaces and cut ends. State allowable straightness, twist and surface damage where they affect the assembly. Review the reinforcement arrangement around machined features and the suitability of the proposed fastening method. A large cross-section with poorly placed holes can be less reliable than a smaller part whose loads enter cleanly; extra material is not a replacement for connection design.",
        "Agree how the supplier will cut, drill, deburr, clean, identify and package the parts. Conductive contamination from nearby metalworking and damage to a finished surface are relevant to electrical integration. Trial-fit representative parts using the intended hardware and OEM assembly process, then inspect alignment and the full travel envelope. Keep torque, adhesive cure or insert installation parameters on controlled instructions, and define how a nonconforming part is quarantined instead of adjusted informally on the production line.",
      ], sourceIds: ["roechling-switchgear", "iec-lv-assemblies", "iec-hv-common"] },
      { id: "qualification-release", title: "Release the component and the switchgear at separate levels", paragraphs: [
        "Create a qualification matrix with three columns: the material property being established, the fabricated-part interface being checked and the equipment performance being verified. Allocate a responsible party and acceptance record to each. For example, a material tracking test informs selection; a machined-link endurance test examines a connection; an equipment dielectric or short-circuit verification addresses the final assembly. The tests are complementary and should not be exchanged because one is cheaper or easier to obtain.",
        "Treat a new resin, reinforcement, pigment, surface layer, curing process, insert or machining revision as a controlled change. The OEM decides which evidence can be retained and what must be repeated. IEC 61439-1 requires the relevant assembly product part, while IEC 62271 common requirements are used with the equipment-specific requirements. For metal-enclosed medium-voltage equipment, internal-arc classification remains tied to its evaluated arrangement. F1 development samples should be identified as such until an agreed release is completed.",
      ], sourceIds: ["iec-lv-assemblies", "iec-hv-common", "iec-metal-enclosed"] },
      { id: "inspection-and-replacement", title: "Make deterioration and replacement traceable", paragraphs: [
        "The equipment maintenance plan should identify accessible inspection locations and what constitutes a reason to stop and investigate. Relevant observations include tracking marks, cracking near holes, loose inserts, movement of supports, abnormal mechanism play, heat discoloration and deposits on insulating surfaces. Keep photographs and component identification with the operating history. A cosmetic cleaning step cannot establish that a damaged electrical or load-bearing component is fit for service.",
        "Replacement belongs under the equipment owner's isolation and maintenance procedures. Match the approved drawing and material revision, then perform the checks required by the OEM before returning the equipment to service. Do not set a generic replacement interval from a profile datasheet. If the same part fails repeatedly, review loading, alignment, contamination and temperature together; replacing it with a visually similar FRP shape can leave the actual cause unresolved.",
      ], sourceIds: ["iec-lv-assemblies", "iec-hv-common"] },
    ],
    standards: switchgearStandards,
    specification: [
      "Equipment type, destination market, AC/DC duty, rated voltage and adopted equipment standards with editions.",
      "Component function and annotated assembly drawing showing live parts, grounded parts, travel envelope and datums.",
      "Insulation-coordination requirements, impulse and power-frequency tests, contamination, humidity and altitude.",
      "Normal, fault, switching, transport and installation reactions, operating-cycle target and allowable deformation or play.",
      "Local continuous and temporary temperatures, insulating medium, cleaning agents and fire-performance requirements.",
      "Profile and reinforcement concept, machining, inserts, fasteners, cleanliness, surface finish and packaging.",
      "Material, fabricated-part and equipment qualification responsibilities, change-control rules and batch records.",
      "First-article quantity, fit-check assembly, series forecast, inspection plan and replacement identification requirements.",
    ],
    faqs: [
      { question: "Can an insulating support be selected by switchgear voltage alone?", answer: "No. Its location, insulation paths, environment, mechanical duty and equipment verification matter. The voltage class is an input to the OEM's design, not a transferable rating for a generic profile." },
      { question: "Does a flame-retardant FRP frame prove internal-arc safety?", answer: "No. Material fire performance and an assembly's internal-arc classification concern different tests and behavior. The evaluated enclosure, compartments and installation arrangement determine the equipment evidence." },
      { question: "Can a linkage use a standard fiberglass rod?", answer: "A rod geometry can start a feasibility review, but the reinforcement, ends, pin holes, stroke loads, wear and insulation arrangement need application-specific validation. This page does not offer a prequalified operating linkage." },
      { question: "Does changing from SF6 to another medium leave the component unchanged?", answer: "The OEM should reassess material compatibility and the equipment's electrical design. Regulatory suitability of the new equipment and technical qualification of its components are separate decisions." },
    ],
    sources: switchgearSources,
    related: [
      { href: "/products/frp-switchgear-insulating-profiles", label: "Switchgear insulating profile specification" },
      { href: "/applications/frp-transformer-insulation-supports", label: "Dry-transformer insulation supports" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profile development" },
      { href: "/industries/energy", label: "Energy and electrical applications" },
    ],
  },
  {
    kind: "product",
    slug: "frp-switchgear-insulating-profiles",
    name: "Switchgear insulating profiles",
    title: "FRP Switchgear Insulating Profiles | Qualification",
    description: "Drawing-led inquiries for FRP switchgear support profiles and linkage blanks, with functional tolerances, material evidence, machining and release requirements.",
    heading: "Pultruded FRP profiles for switchgear component development",
    summary: "Specify the profile around its mounting faces, insulation paths and load-transfer interfaces. The useful deliverable is a controlled component definition and qualification plan that the switchgear manufacturer can evaluate.",
    scope: "Qualification inquiries for angles, channels, custom sections and suitable rod or tube blanks. Availability, manufacturing route and required validation are reviewed against the drawing; no stock electrical grade or approved equipment rating is asserted.",
    material: "Application-qualified glass-reinforced thermoset with controlled surface and machining condition",
    profiles: ["Support angles and channels", "Frame, guide and insulating spacer sections", "Rod and tube blanks for separately qualified mechanisms"],
    ...profileImage,
    sections: [
      { id: "product-boundary", title: "Choose a blank, a machined component or a development sample", paragraphs: [
        "State the delivery boundary first. A cut profile blank leaves hole-making and finishing to the OEM; a fabricated component requires an approved machining drawing; a development sample is supplied for evaluation under an agreed plan. List what the delivered part includes, especially inserts, end treatments and identification. A supplied rod should not be called a complete switch operating mechanism when the joints and assembly are outside the order.",
        "Match the candidate route to the geometry. Constant sections are suitable for pultrusion review, while deep three-dimensional features or pressure-tight insulating barriers can require a different process. The application examples establish a use for composite profiles, not universal interchangeability with molded or machined-sheet electrical components.",
      ], sourceIds: ["roechling-switchgear"] },
      { id: "functional-dimensions", title: "Put functional dimensions ahead of a generic tolerance table", paragraphs: [
        "Identify the datums used during assembly and inspection. Provide contact-face flatness, hole-to-hole spacing, hole-axis orientation, straightness, twist and cut length where they control fit or insulation geometry. For a sliding guide, include the mating clearance and permitted wear; for a link, include pin fit, end geometry and travel. A universal dimensional tolerance cannot answer these different interface requirements.",
        "Review whether the specified features can be measured reliably on the intended part. Agree gauges or inspection fixtures for critical positions and reserve representative first articles for fit assessment. The drawing should show which deviations are acceptable, which require engineering disposition and which reject the component.",
      ], sourceIds: ["iec-lv-assemblies", "iec-hv-common"] },
      { id: "material-evidence", title: "Request evidence for the selected material and surface", paragraphs: [
        "Specify the loads, temperature and environment before choosing a resin system. Request relevant directional mechanical data and the proposed electrical and thermal characterization. Record the reinforcement, curing, surface layer and any coating in the material identity. A change of pigment or surface treatment should be reviewed when the acceptance evidence depends on that surface.",
        "Keep tests in their proper roles. Tracking-index data characterize a material or part under a defined test; dielectric properties depend on specimen geometry and condition; thermal classification distinguishes material from insulation system. None of these documents independently certifies the completed switchgear. Ask the OEM to identify the evidence needed for its exact equipment program.",
      ], sourceIds: ["iec-tracking", "iec-thermal", "iec-coordination"] },
      { id: "machining-interface", title: "Qualify end features and assembly methods", paragraphs: [
        "Specify drilling, edge finishing, insert installation and cleaning as controlled operations. Review holes near ends and thin webs for the actual connection loads. Where an adhesive or clamped insert transfers force, include its cure, surface preparation or tightening method in the joint validation; a strong parent laminate does not demonstrate a durable joint.",
        "Inspect the first fabricated parts with the intended hardware. Check fit, movement, retained separation and the ability to identify the approved orientation. Document any contact marks, fiber damage or local crushing found during trial assembly. Resolve those observations through the drawing or process before series manufacture instead of relying on operator adjustment.",
      ], sourceIds: ["iec-hv-common", "roechling-switchgear"] },
      { id: "acceptance-delivery", title: "Agree qualification, batch acceptance and traceable delivery", paragraphs: [
        "Separate one-time design qualification from production acceptance. The plan should name the approved configuration, sampling basis, conditioning, methods, acceptance limits and record owner. Include dimensional inspection and whatever material or part checks the OEM requires. Equipment-level verification remains with the switchgear manufacturer, including the applicable assembly standard and product part.",
        "Package components to preserve surfaces and prevent mixing of drawing revisions. Mark the batch and part identity in an approved location outside critical electrical or fitting areas. The delivery file should connect material identity, fabrication revision, inspection results and any approved deviations. A future replacement order should be reproducible from that record rather than from a photograph and nominal dimensions.",
      ], sourceIds: ["iec-lv-assemblies", "iec-hv-common", "iec-metal-enclosed"] },
    ],
    standards: switchgearStandards,
    specification: [
      "Part drawing, supplied-state definition, revision, functional datums, mating components and first-article quantity.",
      "Switchgear application, AC/DC and voltage information, destination, adopted standards and OEM approval contact.",
      "Load cases, cycles, stiffness/deflection limits, local temperature, medium and environmental exposure.",
      "Electrical, tracking, thermal and fire evidence required for the exact material and final surface condition.",
      "Holes, slots, inserts, end preparation, finishing, cleanliness and assembly method to be qualified.",
      "Inspection and acceptance criteria, batch traceability, packaging, change notification and production forecast.",
    ],
    faqs: [
      { question: "Are published standard profile dimensions an approved electrical catalog?", answer: "No. Geometry availability and electrical application qualification are separate. Submit the equipment requirements and drawing for a component-specific feasibility review." },
      { question: "Can F1 reproduce a competitor's approved grade from its name?", answer: "A trade name or appearance is insufficient. Provide the functional requirements and required evidence; any proposed material needs its own qualification and the OEM's approval." },
      { question: "Can the OEM perform final machining?", answer: "The supplied state can be agreed, but machining, surface condition and cleanliness still need controlled instructions and acceptance. Qualification should represent the final component that enters the equipment." },
    ],
    sources: switchgearSources,
    related: [
      { href: "/applications/frp-switchgear-insulation-components", label: "Switchgear application and qualification guide" },
      { href: "/products/custom-pultruded-profiles", label: "Custom profile development" },
      { href: "/products/fiberglass-dog-bone", label: "Transformer spacer geometry" },
    ],
  },
  {
    kind: "application",
    slug: "composite-overhead-conductor-cores",
    name: "Composite cores for overhead conductors",
    title: "Composite Conductor Cores | HTLS Qualification Guide",
    description: "Evaluate composite cores for overhead conductors: material architecture, heat and creep, bending, fittings, sag-tension, installation and qualification.",
    heading: "Composite overhead conductor cores: from rod to qualified line",
    summary: "The composite core is one element in a conductor, fitting and line system. Its value depends on retained strength and dimensional behavior through manufacture, installation and operation—not simply the tensile strength of a new straight specimen.",
    scope: "This guide supports technical feasibility and qualification inquiries only. F1 does not claim a utility-approved conductor core, licensed proprietary conductor system, demonstrated ampacity increase or established maximum service temperature on the basis of this page.",
    material: "Candidate carbon-fiber thermoset cores or other specifically defined polymer-matrix architectures, with qualified protection and interfaces",
    profiles: ["Monolithic composite supporting cores", "Individual composite wires for a separately designed stranded core", "Protected core constructions subject to system qualification"],
    ...profileImage,
    sections: [
      { id: "system-boundary", title: "Define the project before selecting the core", paragraphs: [
        "Begin with the utility's purpose: increase current on an existing circuit, resolve a clearance constraint, replace aged conductors or design a new line. Document the existing geometry and the limiting equipment. The line designer should check structures, foundations, insulator strings, fittings, substation connections and required clearances as part of the option study. A conductor proposal cannot promise that existing towers will remain adequate without that review.",
        "Epsilon identifies pultruded composite cores as a technology used in advanced conductors. This is evidence for the application, not a transferable performance guarantee. Separate three purchases or approvals: the core, the finished conductor with its accessories, and the project line design. A favorable result at one level does not release the next. Current uprating also does not automatically authorize raising the circuit voltage; those changes involve different electrical and regulatory assessments.",
      ], sourceIds: ["epsilon-conductors", "cigre-uprating", "cigre-new-lines"] },
      { id: "core-architecture", title: "Specify the complete material architecture", paragraphs: [
        "Describe the load-bearing fibers, matrix, external protection, nominal size and construction. A monolithic carbon-based rod, a hybrid fiber arrangement and a multi-wire polymer-matrix core have different interfaces and handling behavior. Include the method by which the core is separated from neighboring metallic strands where galvanic interaction needs control. A coating or barrier is part of the qualified construction; it is not an optional cosmetic finish.",
        "The specification should connect each architecture choice to a requirement and a verification method. Check the applicability of the selected core standard before requesting compliance. ASTM B987/B987M-25 concerns carbon-reinforced thermoset cores with defined dimensional scope; IEC TS 62818-1:2024 addresses polymer-matrix supporting cores more broadly. Neither permits all advanced conductor materials to be described as equivalent pultruded carbon rods. Identify any technology rights, approved-source requirements or proprietary fitting interfaces before a development program begins.",
      ], sourceIds: ["astm-core", "iec-core", "epsilon-conductors"] },
      { id: "temperature-and-aging", title: "Establish temperature duty and retained performance", paragraphs: [
        "The duty specification should distinguish continuous operation, temporary emergency operation and temperature cycles, with their durations and associated tension. Ask where the temperature is evaluated: the metal surface, the core or a connector can experience different conditions. Require a justified operating envelope for the selected conductor system. A resin glass-transition measurement by itself does not demonstrate long-term strength retention, a safe emergency limit or a promised service life.",
        "Develop an aging plan that relates exposure to the required mechanical behavior. Define what will be measured before and after conditioning, how load is applied and how changes are accepted or rejected. Consider retained tensile performance, dimensional change, environmental interaction and the stability of protective layers. EPRI's public guide provides a reference for thermal-mechanical qualification; its example procedures need an explicit project decision before becoming procurement criteria. Accelerated testing requires a defensible interpretation rather than an unsupported conversion from test hours to years outdoors.",
      ], sourceIds: ["epri-specification", "iec-core", "cigre-qualification"] },
      { id: "sag-tension-rating", title: "Calculate thermal rating and mechanical clearance separately", paragraphs: [
        "A thermal calculation estimates conductor temperature for a current and set of environmental assumptions. IEEE 738-2023 supplies a method, but does not choose appropriate weather or conductor inputs for the utility. State the wind, ambient conditions, solar exposure and conductor properties used in the study, and distinguish a steady rating from a time-dependent operating case. Avoid quoting a percentage capacity gain without the baseline, conductor configuration and accepted temperature limit.",
        "The mechanical study then needs the conductor's stress-strain behavior, creep assumptions, thermal expansion and load sharing between metal and core. Review initial and final conditions, span geometry, wind and ice cases, and the relevant hot-state clearance. A low thermal-expansion core is not proof that sag is negligible. Use a model and data valid for the exact conductor architecture, including any transition in load sharing, and resolve the uncertainty before claiming that a reconductoring option preserves every existing clearance.",
      ], sourceIds: ["ieee-rating", "cigre-uprating", "cigre-new-lines"] },
      { id: "bending-and-fatigue", title: "Review the full path from manufacturing reel to installed span", paragraphs: [
        "Track each place that bends, grips or redirects the core and conductor: core winding, stranding, transport reels, payout equipment, tensioners, sheaves and final hardware. Define the permitted equipment geometry and loads through the conductor manufacturer's installation process. A straight tensile specimen does not reproduce bending under tension, local contact or accumulated handling damage. The qualified core and complete conductor may also need different limits, so a core test diameter should not be copied into a field stringing instruction.",
        "The qualification review should include the relevant fatigue mechanisms and how the conductor interacts with clamps, dampers and spacers. Consider the actual exposure to vibration and cyclic motion rather than assuming that a high static strength resolves them. Plan how potential damage will be detected, recorded and assessed after a handling incident. Visual appearance alone may not settle whether the core remains fit for use, and an unvalidated field inspection technique must not be presented as conclusive.",
      ], sourceIds: ["astm-core", "cigre-handling", "cigre-new-lines"] },
      { id: "fittings-and-load-transfer", title: "Qualify terminations and accessories with the conductor", paragraphs: [
        "Dead ends and splices must transfer load through the architecture they actually grip. Define the core termination, the metal-strand connection, heat flow, electrical contact and any protection exposed during preparation. Obtain drawings and controlled installation instructions for each approved fitting combination. A fitting used successfully on another conductor of the same outside diameter is not automatically compatible with a different composite core or strand arrangement.",
        "Evaluate mechanical retention and thermal behavior together under the project's required conditions. Inspect for slip, local crushing, damaged protection and changes after cycling. Suspension hardware, dampers and spacers also need the proper compatibility basis. CIGRE's high-temperature qualification guidance treats the conductor and its accessories as a system; the purchase specification should make responsibility for that system explicit, including who approves deviations and who supplies trained installation support.",
      ], sourceIds: ["cigre-qualification", "cigre-handling", "epri-specification"] },
      { id: "manufacturing-release", title: "Preserve traceability through stranding and acceptance", paragraphs: [
        "Map the evidence chain from core batch to reel, conductor manufacturing lot and installed line section. Agree which characteristics are verified on the core before stranding and which on the completed conductor. Include controlled handling between those stages. A core certificate should be attributable to the material actually consumed in a conductor reel, with changes and nonconformities resolved before delivery rather than reconstructed after an incident.",
        "Design qualification, routine control and purchaser acceptance have different purposes. The contract should define the relevant standards, editions, tests, sample selection, acceptance limits, retest rules and witness points. Agree material and process change control covering fibers, matrix, protection, cure, dimensions and stranding. Do not label an entire supply program approved because a single development sample passed one test. Release quantities and production stages in accordance with the utility and conductor manufacturer's qualification plan.",
      ], sourceIds: ["astm-core", "iec-core", "epri-specification"] },
      { id: "installation-and-service", title: "Hand over a maintainable system with recorded limits", paragraphs: [
        "Before construction, the utility, conductor supplier and contractor should agree the installation plan, equipment, trained personnel, hold points and disposition of damaged material. Record reel identity, installed section, fitted hardware and any deviations. Use the supplier's approved inspection and installation methods; this guide supplies specification questions, not a stringing procedure or permission to improvise around a damaged core.",
        "The operations handover should identify accepted ratings, temperature limits, inspection methods and the triggers for engineering review. Include the response to abnormal heat exposure, suspected connector movement, mechanical damage or a changed operating regime. A replacement fitting or repair must preserve the system qualification. Compare inspection results with the installation baseline and documented duty, and avoid promising that the composite core makes the line maintenance-free.",
      ], sourceIds: ["cigre-handling", "cigre-new-lines", "cigre-qualification"] },
    ],
    standards: conductorStandards,
    specification: [
      "Utility, destination country, circuit purpose, existing or new-line status, and responsible conductor/system integrator.",
      "Proposed conductor architecture, core type, dimensional drawing, protective construction and technology-interface requirements.",
      "Continuous, emergency and cyclic temperature duty; required tensile behavior, creep data, environmental exposure and qualification life assumptions.",
      "Conductor geometry, metal strands, sag-tension model inputs, span and structural constraints, and rating-study conditions.",
      "Approved fittings, termination interfaces, manufacturing equipment, reel requirements and installation responsibilities.",
      "Core, conductor and system standards with editions; qualification tests, acceptance limits, witness points and change control.",
      "Development quantities, test-program responsibility, production forecast, traceability and documentation deliverables.",
      "Installation support, inspection method, abnormal-event response and conditions for field repair or replacement approval.",
    ],
    faqs: [
      { question: "Does a composite core automatically double line capacity?", answer: "No. The result depends on conductor design, accepted temperatures, weather assumptions, clearances, fittings and the rest of the circuit. A competitor's reported gain cannot be transferred to an unqualified core or a different line." },
      { question: "Is ASTM B987-20 the current reference?", answer: "The official ASTM catalog identifies B987/B987M-25 as active as of this review. A contract may specify a particular edition, so resolve that requirement explicitly rather than copying an older supplier reference." },
      { question: "Can generic pultruded carbon rod replace an approved conductor core?", answer: "No. The material, protection, manufacturing control, handling and conductor interfaces require dedicated qualification. This inquiry page does not identify an interchangeable or utility-approved F1 core." },
      { question: "Does a core test certificate approve the complete conductor?", answer: "No. The stranded conductor, its accessories, installation process and project design need their own evidence and acceptance. Keep the three approval levels visible in procurement." },
    ],
    sources: conductorSources,
    related: [
      { href: "/products/composite-conductor-core-rods", label: "Composite conductor core development inquiry" },
      { href: "/applications/frp-switchgear-insulation-components", label: "Switchgear insulating components" },
      { href: "/industries/energy", label: "Energy and grid applications" },
    ],
  },
  {
    kind: "product",
    slug: "composite-conductor-core-rods",
    name: "Composite conductor core development",
    title: "Composite Conductor Core Rods | Development Inquiry",
    description: "Plan a composite conductor core qualification inquiry: architecture, protected interfaces, reel handling, testing, traceability and conductor integration.",
    heading: "Composite conductor core rods for qualification review",
    summary: "An overhead-conductor core inquiry needs a controlled architecture and a system partner. Define the intended conductor, protective interface and qualification program before discussing a nominal rod diameter or production volume.",
    scope: "Technical feasibility and development inquiries only. No F1 utility qualification, series availability, maximum operating temperature, licensed conductor technology or stock ASTM-compliant core is represented here.",
    material: "Carbon-fiber thermoset or another explicitly defined polymer-matrix core architecture, subject to manufacturing and system qualification",
    profiles: ["Candidate continuous core rods", "Candidate individual core wires", "Specified protective constructions requiring validated continuity and interfaces"],
    ...profileImage,
    sections: [
      { id: "development-definition", title: "Define what the development program is meant to produce", paragraphs: [
        "Identify the conductor manufacturer or technology owner that will integrate the core. Describe whether the inquiry concerns a material study, qualification-length core, trial conductor production or a proposed series supply program. Each stage needs a defined deliverable and approval gate. F1's review begins with feasibility and evidence requirements; a page about the application does not establish an approved manufacturing capability.",
        "Attach the proposed core drawing and architecture, including the load-bearing material and outer protection. State whether the design is a single core or individual wires for a stranded construction, and resolve any licensed or proprietary interface requirements. Do not request equivalence solely by naming a branded conductor or supplying its outside diameter.",
      ], sourceIds: ["epsilon-conductors", "iec-core"] },
      { id: "dimension-and-protection", title: "Control geometry and the protection that surrounds it", paragraphs: [
        "Nominal diameter is only one variable. Specify dimensional variation, roundness where relevant, protective-layer construction, surface defects and the continuous length needed for the integration trial. Define how the conductor manufacturer will verify receipt and how a nonconforming length will be located and isolated. The protection system must remain compatible with adjacent metal, stranding operations and approved termination preparation.",
        "The ASTM core specification includes a defined dimensional scope and requirements for the protective barrier and core quality. Those standard scope limits are not a catalog of sizes F1 can supply. The feasibility review must establish the manufacturing route, measurement capability and qualification plan for the requested construction before a production specification is accepted.",
      ], sourceIds: ["astm-core", "iec-core"] },
      { id: "mechanical-thermal-data", title: "Specify performance with its test condition and definition", paragraphs: [
        "For each requested property, state the specimen construction, conditioning, test temperature, loading method and reporting basis. Tensile strength, axial stiffness, strain capacity, thermal behavior and performance after exposure should be traceable to the same material definition. Values from a different fiber ratio, surface construction or matrix cannot be treated as guaranteed data for the proposed core.",
        "Distinguish initial characterization from retained properties after the qualification exposure. Let the conductor integrator define how the evidence supports its temperature envelope and mechanical model. A high Tg result or a short-term elevated-temperature tensile test alone does not prove a long-term conductor rating. Record the exact limits the development program is testing instead of promising the outcome in advance.",
      ], sourceIds: ["iec-core", "epri-specification", "ieee-rating"] },
      { id: "reels-and-integration", title: "Agree reel handling and stranding interfaces before delivery", paragraphs: [
        "Request the receiver's payoff and stranding arrangement, contact surfaces, tension controls, reel geometry and handling path. Agree the core-specific limits and how the trial will detect damage. Protection during transport is part of the delivered condition, so identify packaging, restraint, reel marking and the inspection required after a suspected impact or handling deviation.",
        "The qualified handling envelope must come from the actual construction and process. Do not infer a permissible field sheave size from an isolated core test or a generic diameter ratio. The completed conductor requires its own installation instructions. If production trials change a contact, bend or gripping condition, assess the change before treating earlier evidence as valid for the new process.",
      ], sourceIds: ["cigre-handling", "astm-core"] },
      { id: "qualification-and-handover", title: "Make the evidence package usable by the conductor integrator", paragraphs: [
        "The proposed release package should connect core identity, reel identity, drawing and material revision, inspection results, test reports and approved deviations. Define where retained samples and records will be held. Distinguish the core tests from conductor and fitting qualification, with named responsibility for each. The order should state which standard editions and purchaser criteria apply rather than relying on a general claim of international compliance.",
        "A trial pass supports the next agreed development step; it does not independently approve utility service. Material, protection, cure, dimension and production-process changes require the designated review. Before series release, the system integrator and utility should have accepted the necessary conductor and accessory evidence and the installation support plan. This product page is an entry point to that qualification discussion.",
      ], sourceIds: ["iec-core", "epri-specification", "cigre-qualification"] },
    ],
    standards: conductorStandards,
    specification: [
      "Development stage, conductor integrator, utility/project context and qualification decision owner.",
      "Core architecture and drawing, size and tolerances, protection system, continuous trial length and technology rights or interfaces.",
      "Mechanical and thermal requirements with test conditions, retained-property criteria and environmental exposure.",
      "Reel, payoff, stranding and contact geometry; proposed inspection and handling controls.",
      "Core standards and editions, purchaser criteria, test laboratory responsibilities and witness requirements.",
      "Core-to-conductor traceability, change control, trial quantity, timing and evidence needed before series consideration.",
    ],
    faqs: [
      { question: "Is this an available utility-approved F1 core product?", answer: "No such status is asserted. The page invites a feasibility and qualification inquiry. Any supply proposal must establish manufacturing capability and the required core and system approvals separately." },
      { question: "Can I order by diameter and tensile strength only?", answer: "Those inputs are insufficient. The architecture, protection, thermal duty, bending and handling requirements, conductor integration and evidence program also need definition." },
      { question: "Does the ASTM dimensional scope confirm F1 production sizes?", answer: "No. It describes the standard's coverage. Requested dimensions and production lengths remain subject to feasibility and qualification review." },
    ],
    sources: conductorSources,
    related: [
      { href: "/applications/composite-overhead-conductor-cores", label: "Overhead conductor system qualification guide" },
      { href: "/products/custom-pultruded-profiles", label: "Custom composite profile development" },
      { href: "/industries/energy", label: "Energy and electrical applications" },
    ],
  },
];
