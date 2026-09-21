// Reference values are explicitly attributed. They are not F1 batch test results.
// See docs/engineering/pultruded-profile-performance.md for editorial decisions.
export const performancePath = "/technology/pultruded-profile-performance";
export const performanceReviewed = "2026-09-21";

export const performanceSources = {
  gbProfiles: { label: "SAMR · GB/T 31539-2015", href: "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=AD4DB757D7FCC94752F4660D016CF46A", note: "Chinese specification for structural pultruded FRP profiles." },
  enTests: { label: "BSI · EN 13706-2:2002", href: "https://knowledge.bsigroup.com/products/reinforced-plastics-composites-specifications-for-pultruded-profiles-method-of-test-and-general-requirements", note: "Pultruded-profile test methods and general requirements." },
  enGrades: { label: "BSI · EN 13706-3:2002", href: "https://knowledge.bsigroup.com/products/reinforced-plastics-composites-specifications-for-pultruded-profiles-specific-requirements", note: "Properties and requirements for profile grades." },
  gradeReference: { label: "Fiberline · EN 13706 grade comparison", href: "https://fiberline.com/european-standard-en-13706", note: "Manufacturer-published summary used to cross-check selected E17 / E23 reference minimums; not an F1 test report." },
  dimensions: { label: "ASTM · D3917-23", href: "https://store.astm.org/d3917-23.html", note: "Production tolerances for thermoset glass-reinforced pultruded shapes; custom tolerances can differ." },
  appearance: { label: "ASTM · D4385-19", href: "https://store.astm.org/d4385-19.html", note: "Visual defect classification and acceptance criteria." },
  hardness: { label: "ASTM · D2583-25", href: "https://store.astm.org/d2583-25.html", note: "Barcol indentation hardness of rigid plastics." },
  composites: { label: "ASTM · Composite test methods", href: "https://store.astm.org/products-services/standards-and-publications/standards/composite-standards.html", note: "Mechanical test methods and D7290 characteristic-value evaluation." },
  gbTensile: { label: "SAMR · GB/T 1447-2005", href: "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=6856A2CAA76987D8EF07C010401CD8B8", note: "Tensile testing of fiber-reinforced plastic composites." },
  gbThermal: { label: "SAMR · GB/T 3399-1982", href: "https://std.samr.gov.cn/gb/search/gbDetailed?id=lhIhDQbhU6U%3D&mode=p", note: "Thermal conductivity by guarded hot plate; catalogue lists it as current." },
  isoThermal: { label: "ISO · 11357-2:2020", href: "https://www.iso.org/standard/77310.html", note: "Glass transition temperature by differential scanning calorimetry." },
  isoComposites: { label: "ISO · Reinforced plastics standards", href: "https://committee.iso.org/ics/83.120/x/", note: "Catalogue includes ISO 14125 flexure and ISO 14130 apparent interlaminar shear testing." },
  epta: { label: "EPTA · Pultruded composites in rail", href: "https://pultruders.com/wp-content/uploads/2022/07/2018_EPTA-Rail-Industry-Briefing.pdf", note: "Industry comparison values, including thermal conductivity and thermal expansion; not product certification." },
  dielectric: { label: "ASTM · D149-25", href: "https://store.astm.org/d0149-25.html", note: "Breakdown voltage and dielectric strength at commercial power frequencies." },
  electrical: { label: "ASTM · Electrical insulation methods", href: "https://store.astm.org/products-services/standards-and-publications/standards/electrical-insulating-material-standards.html", note: "Methods for electrical properties, resistivity and insulation evaluation." },
  volumeResistivity: { label: "IEC · 62631-3-1:2023", href: "https://webstore.iec.ch/en/publication/62314", note: "DC measurement of volume resistance and resistivity of insulating materials." },
  surfaceResistivity: { label: "IEC · 62631-3-2:2023", href: "https://webstore.iec.ch/en/publication/62315", note: "DC measurement of surface resistance and resistivity of insulating materials." },
  arc: { label: "ASTM · D495-22", href: "https://store.astm.org/d0495-22.html", note: "High-voltage, low-current dry arc resistance; distinct from Barcol hardness." },
  gbElectrical: { label: "SAMR · GB/T 1408.1-2016", href: "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=87A13862E96D86E34D814DAC69C161CA", note: "Electric strength of insulating materials at power frequencies." },
  ul: { label: "UL · UL 94 scope and limitations", href: "https://code-authorities.ul.com/about/blog/understanding-ul-94-rating-certifications-and-limitations/", note: "Small-scale plastic flammability classifications do not establish building-product fire performance." },
  fire: { label: "ASTM · Fire test methods", href: "https://store.astm.org/products-services/standards-and-publications/standards/fire-standards-and-flammability-standards.html", note: "E84 surface burning, E662 smoke density and other fire response tests." },
  euroFire: { label: "BSI · EN 13501-1:2018", href: "https://knowledge.bsigroup.com/products/fire-classification-of-construction-products-and-building-elements-classification-using-data-from-reaction-to-fire-tests", note: "Reaction-to-fire classification of construction products." },
  gbFire: { label: "SAMR · GB 8624 editions", href: "https://std.samr.gov.cn/search/stdPage?q=GB+862", note: "GB 8624-2012 is current at review; GB 8624-2025 takes effect on 1 January 2027." },
  gbFire2025: { label: "SAMR · GB 8624-2025 implementation", href: "https://std.samr.gov.cn/gb/search/gbDetailed?id=473DC30DBF46C20FE06397BE0A0AD08C", note: "Published 31 December 2025; replaces the 2012 edition from 1 January 2027." },
  chemical: { label: "ASTM · D543-21", href: "https://store.astm.org/d0543-21.html", note: "Chemical exposure evaluation; specify reagent, concentration, temperature, time and stress." },
  gbChemical: { label: "SAMR · GB/T 3857-2017", href: "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=06F551665B7D975B4F47882C60F4CCE7", note: "Chemical resistance testing of glass-reinforced thermosetting plastics." },
  nhcDimensions: { label: "NHC · Profile dimension tolerances", href: "https://www.nhcfrp.com/ProfileDimensionTolerance.html", note: "Supplier reference for the dimensional specification structure; its tolerance classes are not F1 acceptance limits." },
  nhcPhysical: { label: "NHC · Physical properties", href: "https://www.nhcfrp.com/Physical-Properties1.html", note: "Supplier-published density benchmark. Other entries need method and specimen verification." },
  nhcThermal: { label: "NHC · Thermal properties", href: "https://www.nhcfrp.com/Thermal-Properties1.html", note: "Background reference; thermal expansion units and formulation-specific fire claims were not adopted as F1 data." },
  nhcElectrical: { label: "NHC · Electrical properties", href: "https://www.nhcfrp.com/Electrical-Properties1.html", note: "Supplier-published electrical examples; confirm specimen direction, thickness and conditions." },
  nhcChemical: { label: "NHC · Chemical resistance", href: "https://www.nhcfrp.com/ChemicalResistance1.html", note: "Supplier comparison of isophthalic polyester and vinyl ester at 20 °C and 50 °C; not a project approval." },
} as const;

export type PerformanceSourceId = keyof typeof performanceSources;
export type PerformanceRow = {
  property: string;
  unit: string;
  reference: string;
  basis: "Drawing-specific" | "Published reference" | "Product-specific";
  methods: string;
  conditions: string;
};
export type PerformanceSection = {
  id: string;
  short: string;
  title: string;
  intro: string;
  takeaway: string;
  sources: PerformanceSourceId[];
  rows: PerformanceRow[];
};

export const performanceSections: PerformanceSection[] = [
  {
    id: "dimensions", short: "Dimensions", title: "Dimensions & tolerances",
    intro: "Specify the finished profile against a controlled drawing. Cross-section size, wall thickness and delivered length each need their own acceptance limits.",
    takeaway: "There is no single ± tolerance for every pultruded shape. Confirm the standard, edition, size band, datum and measurement length before approving the drawing. ASTM D3917 uses inch-pound values as the normative units.",
    sources: ["gbProfiles", "enTests", "dimensions", "appearance", "nhcDimensions"],
    rows: [
      { property: "Width, depth & outside diameter", unit: "mm", reference: "Nominal size ± agreed deviation", basis: "Drawing-specific", methods: "GB/T 31539; EN 13706-2; ASTM D3917", conditions: "Identify open or closed section, size band and measurement points. State whether an internal or external dimension controls the fit." },
      { property: "Wall thickness & corner geometry", unit: "mm", reference: "Minimum / maximum thickness; agreed radii", basis: "Drawing-specific", methods: "Selected profile standard + approved drawing", conditions: "Measure walls, webs and flanges separately. Specify radii and local transitions, especially near screw channels or mating features." },
      { property: "Cut length & end squareness", unit: "mm; °", reference: "Length allowance and end-cut deviation", basis: "Drawing-specific", methods: "Selected profile standard + cutting specification", conditions: "Separate as-pultruded supply from precision-cut parts. Define cut-face sealing and machining allowances." },
      { property: "Straightness, bow & camber", unit: "mm over stated length", reference: "Maximum deviation over a defined gauge length", basis: "Drawing-specific", methods: "EN 13706-2; ASTM D3917", conditions: "Record support condition, measurement plane and gauge length. A per-metre value does not automatically define the full-length limit." },
      { property: "Twist, angularity & flatness", unit: "° over length; mm", reference: "Separate limit for each geometric feature", basis: "Drawing-specific", methods: "EN 13706-2; ASTM D3917", conditions: "Name the reference face and measurement span. Check engagement and assembly clearance on the mating parts." },
      { property: "Surface quality & fabricated holes", unit: "Agreed acceptance criteria", reference: "Visual quality level and machining drawing", basis: "Drawing-specific", methods: "ASTM D4385; EN 13706-2; approved drawing", conditions: "Define acceptable cracks, exposed fibers, chips and surface defects. Hole position and diameter need separate fabrication tolerances." },
    ],
  },
  {
    id: "physical-mechanical", short: "Physical & mechanical", title: "Physical & mechanical properties",
    intro: "Pultruded FRP is directional. Report longitudinal (L / LW), transverse (T / CW), and through-thickness (Z) results separately, with the reinforcement and resin identified.",
    takeaway: "A coupon strength is not a beam load rating. Use verified material properties with section geometry, connections, creep, environmental reductions and the project design rules. E17 / E23 grade evidence must cover all required properties.",
    sources: ["enGrades", "enTests", "gbTensile", "composites", "isoComposites", "hardness", "nhcPhysical"],
    rows: [
      { property: "Density", unit: "g/cm³", reference: "1.72–1.94 · NHC published range", basis: "Published reference", methods: "ASTM D792; ISO 1183-1; GB/T 1463", conditions: "Supplier benchmark only. Confirm density for the actual fiber fraction, fillers and resin before estimating weight." },
      { property: "Fiber / resin content", unit: "% by mass or volume", reference: "Specify fraction and basis", basis: "Product-specific", methods: "ISO 1172 (glass / filler content); GB/T 2577 (resin content)", conditions: "Mass fraction and volume fraction are different. Account for mineral fillers and identify the reinforcement system." },
      { property: "Tensile strength & modulus, L / T", unit: "MPa; GPa", reference: "Declare grade and measured directional values", basis: "Product-specific", methods: "ISO 527-4/-5; ASTM D3039; GB/T 1447", conditions: "Select the method for the laminate and specimen. Include conditioning, coupon location, sample count and statistical basis." },
      { property: "Compression & flexure, L / T", unit: "MPa; GPa", reference: "Separate strength from stiffness", basis: "Product-specific", methods: "ASTM D6641 (compression); ISO 14125 (flexure); GB/T 1448 / 1449", conditions: "Record the fixture and failure mode. Coupon flexural modulus and full-section effective modulus are separate results." },
      { property: "Full-section flexural stiffness", unit: "GPa; N·mm²", reference: "Report effective modulus and section stiffness", basis: "Product-specific", methods: "EN 13706-2", conditions: "Identify section geometry, span, loading and test configuration; do not substitute a longitudinal tensile modulus." },
      { property: "Interlaminar shear & pin bearing", unit: "MPa", reference: "Separate shear and bearing results", basis: "Product-specific", methods: "ISO 14130 (short-beam); EN 13706-2 (pin bearing)", conditions: "Short-beam results are method-dependent and are not in-plane shear values. Connections also require hole, edge-distance and fastener checks." },
      { property: "Water absorption & Barcol hardness", unit: "%; Barcol scale", reference: "Agree conditioning and acceptance limits", basis: "Product-specific", methods: "ISO 62 / ASTM D570; ASTM D2583 / GB/T 3854", conditions: "State immersion time and temperature for absorption. Hardness indicates local surface condition and cannot replace mechanical testing." },
    ],
  },
  {
    id: "thermal", short: "Thermal", title: "Thermal performance",
    intro: "Thermal insulation, dimensional movement and temperature capability answer different design questions. The resin, cure and fiber direction influence each result.",
    takeaway: "Tg, heat-deflection temperature and continuous service temperature are different quantities. Define a service envelope using load, exposure time, moisture and property retention; a material conductivity alone does not establish a window U-value.",
    sources: ["epta", "gbThermal", "isoThermal", "nhcThermal"],
    rows: [
      { property: "Thermal conductivity, λ", unit: "W/(m·K)", reference: "0.3 · EPTA comparison value", basis: "Published reference", methods: "GB/T 3399; ASTM C177, where specimen and apparatus are suitable", conditions: "Industry illustration only. Request direction, mean test temperature, moisture condition and specimen thickness for the offered profile." },
      { property: "Coefficient of thermal expansion, α", unit: "10⁻⁶/K", reference: "11 · EPTA comparison value", basis: "Published reference", methods: "ASTM E831; GB/T 2572", conditions: "Confirm direction and temperature interval. Use ΔL = α × L × ΔT with consistent units; do not copy an ambiguous supplier unit." },
      { property: "Glass transition temperature, Tg", unit: "°C", reference: "Measured for the selected formulation and cure", basis: "Product-specific", methods: "ISO 11357-2 (DSC); ASTM E1640 (DMA)", conditions: "Name the method and transition criterion. DSC and DMA values need not coincide; wet conditioning may change performance." },
      { property: "Heat-deflection temperature, HDT", unit: "°C at stated stress", reference: "Test temperature under specified bending stress", basis: "Product-specific", methods: "ISO 75; ASTM D648", conditions: "Include applied stress and specimen orientation. HDT is not a continuous service-temperature rating." },
      { property: "Service temperature & thermal cycling", unit: "°C; cycles; retained %", reference: "Project-specific temperature envelope", basis: "Product-specific", methods: "Agreed aging / cycling and residual-property test plan", conditions: "State continuous and peak temperatures, duration, moisture, sustained load, acceptable deflection and strength retention." },
    ],
  },
  {
    id: "electrical", short: "Electrical", title: "Electrical insulation & conductivity",
    intro: "Glass-fiber profiles are commonly selected for electrical insulation, while carbon reinforcement or conductive additives can change conductivity. Specify the complete material and exposure conditions.",
    takeaway: "Dielectric breakdown strength is a laboratory result, not an operating-voltage rating. Equipment design must account for creepage, clearance, moisture, contamination, joints and the applicable equipment standard.",
    sources: ["dielectric", "electrical", "volumeResistivity", "surfaceResistivity", "arc", "gbElectrical", "nhcElectrical"],
    rows: [
      { property: "Dielectric strength", unit: "kV/mm", reference: "200 V/mil ≈ 7.87 kV/mm · NHC PF example", basis: "Published reference", methods: "ASTM D149; IEC 60243-1; GB/T 1408.1", conditions: "NHC labels this direction PF. Verify its orientation definition, specimen thickness, electrodes and dry / wet conditioning before comparison." },
      { property: "Volume resistivity / conductivity", unit: "Ω·m / S/m", reference: "Specify insulation or conductive target", basis: "Product-specific", methods: "IEC 62631-3-1; ASTM D257 for insulating materials", conditions: "Report direction, humidity, temperature and test voltage. Conductivity σ = 1/ρ for the corresponding direction and conditions; conductive composites need a suitable method." },
      { property: "Surface resistivity", unit: "Ω", reference: "Dry and conditioned results", basis: "Product-specific", methods: "IEC 62631-3-2; ASTM D257", conditions: "Surface contamination, coatings and moisture matter. Do not confuse surface resistivity with volume resistivity." },
      { property: "Permittivity & dissipation factor", unit: "Relative εr; tan δ", reference: "Values at a specified frequency", basis: "Product-specific", methods: "ASTM D150", conditions: "Include frequency, temperature and conditioning; a 60 Hz result does not establish RF performance." },
      { property: "Dry arc resistance & tracking", unit: "s; method-specific index", reference: "Separate arc and tracking evaluations", basis: "Product-specific", methods: "ASTM D495 (dry arc); IEC 60112 (CTI / PTI)", conditions: "Dry arc resistance and wet tracking are different phenomena. State the equipment environment and selected acceptance test." },
    ],
  },
  {
    id: "fire", short: "Fire & smoke", title: "Fire, smoke & reaction to fire",
    intro: "Specify a fire requirement for the actual end use, resin formulation, thickness, finish and installation. A fire-retardant additive does not establish a classification on its own.",
    takeaway: "UL 94 V-0, an E84 flame-spread result and an EN 13501-1 class are not interchangeable. Reaction-to-fire data also does not establish a load-bearing fire-resistance period.",
    sources: ["ul", "fire", "euroFire", "gbFire", "gbFire2025"],
    rows: [
      { property: "Small-flame behavior of plastic parts", unit: "Classification + thickness", reference: "Request the formulation-specific classification", basis: "Product-specific", methods: "UL 94", conditions: "Record tested thickness, color and material identification. This classification does not establish building-material fire compliance." },
      { property: "Surface burning", unit: "Flame-spread / smoke-developed indices", reference: "Request both indices and mounting details", basis: "Product-specific", methods: "ASTM E84", conditions: "A flame-spread index alone is incomplete. Review the specimen, supporting substrate and intended installation." },
      { property: "Construction-product reaction to fire", unit: "Classification and applicable suffixes", reference: "Declare the required market and end-use class", basis: "Product-specific", methods: "EN 13501-1; GB 8624", conditions: "Use the relevant classification report and its field of application. European and Chinese classes require their own evaluation." },
      { property: "Oxygen index", unit: "% oxygen by volume", reference: "Measured LOI for the selected laminate", basis: "Product-specific", methods: "ISO 4589-2; ASTM D2863; GB/T 2406.2", conditions: "LOI is a test result under defined conditions, not a substitute for an end-use fire classification." },
      { property: "Smoke density & toxicity", unit: "Method-specific results", reference: "Agree smoke and gas requirements separately", basis: "Product-specific", methods: "ASTM E662 (smoke density); application-specific gas testing", conditions: "Optical smoke density does not quantify toxicity. Rail and marine projects need the tests and criteria for their particular application." },
    ],
  },
  {
    id: "chemical", short: "Chemical resistance", title: "Chemical resistance & durability",
    intro: "Build a compatibility decision around the chemical, concentration, temperature and contact mode. Resin-family charts are useful for screening; the exact cured laminate determines the offered performance.",
    takeaway: "A chemical name or pH alone is insufficient. Include mixtures, cleaning chemicals, temperature excursions and sustained stress, then agree the acceptable change in mass, appearance and mechanical properties.",
    sources: ["chemical", "gbChemical", "nhcChemical"],
    rows: [
      { property: "Chemical compatibility", unit: "Chemical; concentration %; °C", reference: "Review exact resin grade against exposure", basis: "Product-specific", methods: "GB/T 3857; ASTM D543; ISO 175 as applicable", conditions: "Provide chemical names or composition, concentration basis, normal / maximum temperature and impurities. Methods cover related subjects but are not automatically equivalent." },
      { property: "Immersion, splash & vapor exposure", unit: "h; exposure mode", reference: "Exposure cycle matched to service", basis: "Product-specific", methods: "Agreed chemical-resistance test programme", conditions: "Continuous immersion differs from occasional splash. Define dwell time, drying, cleaning, stress and sample edge sealing." },
      { property: "Mass, dimensions & appearance", unit: "% change; visual record", reference: "Before / after exposure comparison", basis: "Product-specific", methods: "ASTM D543; GB/T 3857", conditions: "Record swelling, cracking, blistering or exposed fibers together with the measurement and conditioning procedure." },
      { property: "Retained mechanical properties", unit: "% of unexposed control", reference: "Agree retained strength and stiffness limits", basis: "Product-specific", methods: "Exposure protocol + relevant mechanical method", conditions: "Compare matched exposed and control specimens. A short immersion test does not establish a service life in years." },
      { property: "UV, moisture & outdoor aging", unit: "Exposure hours; retained %", reference: "Separate durability assessment", basis: "Product-specific", methods: "ISO 4892-3; ASTM G154; GB/T 2573, as applicable", conditions: "Specify coating / veil, exposure cycle and residual properties. Appearance retention and structural retention are separate criteria." },
    ],
  },
];

export const chemicalExamples = [
  { chemical: "Hydrochloric acid · 20%", iso20: "+", iso50: "+", ve20: "+", ve50: "+" },
  { chemical: "Potassium hydroxide · 10%", iso20: "0", iso50: "−", ve20: "+", ve50: "+" },
  { chemical: "Acetic acid · 75%", iso20: "0", iso50: "−", ve20: "+", ve50: "+" },
  { chemical: "Methyl ethyl ketone · 100%", iso20: "−", iso50: "−", ve20: "−", ve50: "−" },
] as const;

export const performanceFaqs = [
  { question: "Does E23 establish fire, electrical or chemical performance?", answer: "No. EN 13706 grade requirements concern specified profile properties. Fire behavior, electrical insulation and resistance to a particular chemical exposure need their own evidence for the supplied formulation and configuration." },
  { question: "Can I specify one tolerance for every profile dimension?", answer: "Specify dimensions individually against the applicable size bands, features and agreed standard. Cross-section dimensions, thickness, straightness, twist and cut length need distinct limits and measurement conditions." },
  { question: "Can glass-fiber insulation data be used for carbon-fiber profiles?", answer: "No. Carbon reinforcement and conductive additives can change electrical behavior. Use electrical test data for the actual resin, reinforcement, coating and conditioning, with the test direction stated." },
  { question: "What should accompany a performance requirement?", answer: "Send the section drawing, resin and reinforcement preference, service conditions, test standard and edition, target or minimum value, sampling plan and required report. F1 can then review the offered configuration and identify any additional testing needed." },
];
