import type { PultrusionGuide } from "./pultrusionGuideTypes";

const profileImage = {
  image: "/images/products/standard-profiles-cover.jpg",
  imageAlt: "Pultruded fiberglass profile geometries for application and component review",
  imageCaption: "Reference profile geometry",
};

const transformerSources: PultrusionGuide["sources"] = [
  { id: "roechling-transformer", title: "Röchling: plastics for dry transformers", url: "https://www.roechling.com/us/industrial/electrical-industry/transformer/dry-transformers", kind: "industry", note: "Application evidence for profile-based holders and winding spacers. Its material grades, test results and qualifications belong to that supplier." },
  { id: "roechling-profiles", title: "Röchling: composite and pultruded profiles", url: "https://www.roechling.com/industrial/products/composites/gfrp-cfrp/composite-profiles", kind: "industry", note: "Confirms pultrusion as the manufacturing route for constant-section composite profiles. This is not evidence for an F1 electrical grade." },
  { id: "iec-transformer", title: "IEC 60076-11:2018: dry-type transformers", url: "https://webstore.iec.ch/en/publication/29711", kind: "authority", note: "Official scope and edition information, including voltage limits and excluded transformer categories; detailed requirements require the adopted standard." },
  { id: "iec-thermal", title: "IEC 60085:2007: thermal evaluation and designation", url: "https://webstore.iec.ch/en/publication/666", kind: "authority", note: "Distinguishes electrical insulating materials from complete electrical insulation systems when assigning thermal classes." },
  { id: "iec-short-circuit", title: "IEC 60076-5:2006: ability to withstand short circuit", url: "https://webstore.iec.ch/en/publication/603", kind: "authority", note: "Transformer-level thermal and dynamic short-circuit evaluation. Confirm the edition required by the equipment contract." },
];

const railSources: PultrusionGuide["sources"] = [
  { id: "roechling-rail", title: "Röchling: rail technology and vehicles", url: "https://www.roechling.com/industrial/vehicle-construction/rail-technology-and-vehicles", kind: "industry", note: "Identifies profile-based third-rail covers separately from compression-molded conductor-rail supports. Supplier approvals and service history are not F1 evidence." },
  { id: "roechling-profiles", title: "Röchling: composite and pultruded profiles", url: "https://www.roechling.com/industrial/products/composites/gfrp-cfrp/composite-profiles", kind: "industry", note: "Manufacturing-route reference for pultruded profiles; no competitor material rating is adopted here." },
  { id: "foster-coverboards", title: "L.B. Foster: coverboards and brackets", url: "https://lbfoster.com/rail/rail-products/transit-products/third-rail-accessories/coverboards-and-brackets", kind: "industry", note: "Confirms that coverboard assemblies are adapted to transit-agency criteria and local wind, snow and ice exposure." },
  { id: "en-fixed-rail", title: "BSI: current BS EN 50122-1 release", url: "https://landingpage.bsigroup.com/LandingPage/Undated?UPI=000000000030171497", kind: "authority", note: "Lists BS EN 50122-1:2022+A1:2025 for fixed-installation electrical safety, earthing and the return circuit." },
  { id: "nfpa-transit", title: "NFPA 130: fixed guideway transit and passenger rail systems", url: "https://www.nfpa.org/product/nfpa-130-standard/p0130code?l=126", kind: "authority", note: "Official 2026 edition and system scope. The authority having jurisdiction and contract determine the applicable edition and requirements." },
  { id: "en-rail-vehicle-fire", title: "BSI: current BS EN 45545-2 release", url: "https://landingpage.bsigroup.com/LandingPage/Undated?UPI=000000000030334174", kind: "authority", note: "Lists 2020+A1:2023 and identifies the railway-vehicle fire scope. It is not automatically the acceptance standard for a fixed third-rail cover." },
];

const railStandards: PultrusionGuide["standards"] = [
  { name: "EN 50122-1:2022+A1:2025", category: "Standard", jurisdiction: "Projects adopting the European fixed-railway electrical-safety framework; national adoption and contract govern.", applies: "Protective provisions against electric shock in railway fixed installations, coordinated with earthing and the return circuit. The project engineer determines the cover's role in the complete protection arrangement.", limits: "An insulating profile alone does not demonstrate compliance of the track installation. Material dielectric data do not establish safe access, clearances or bonding arrangements.", sourceIds: ["en-fixed-rail"] },
  { name: "NFPA 130, 2026 edition", category: "Standard", jurisdiction: "North American and other projects where the authority having jurisdiction or contract adopts NFPA 130; the adopted edition can differ.", applies: "Fire and life safety for fixed guideway transit and passenger rail systems, including stations, trainways and other system elements.", limits: "A generic flame-retardant resin declaration does not approve a coverboard installation. The project must identify the material tests, assembly conditions and acceptance criteria applicable to its location.", sourceIds: ["nfpa-transit"] },
  { name: "EN 45545-2:2020+A1:2023", category: "Standard", jurisdiction: "Railway-vehicle projects adopting EN requirements; a fixed-installation contract may separately specify selected tests.", applies: "Fire behavior of materials and components on railway vehicles. Its use for a fixed third-rail cover needs an explicit project requirement.", limits: "A vehicle material classification is not a universal third-rail approval and does not replace fixed-installation electrical-safety or operator acceptance requirements.", sourceIds: ["en-rail-vehicle-fire"] },
];

const toolSources: PultrusionGuide["sources"] = [
  { id: "tencom-tool", title: "Tencom: fiberglass tool handles for linework", url: "https://www.tencom.com/blog/what-makes-fiberglass-tool-handles-safer-for-linework", kind: "industry", note: "Application-discovery source for pultruded fiberglass tool components. Supplier performance claims are not used as F1 qualification evidence." },
  { id: "astm-f711", title: "ASTM F711-26: FRP rod and tube used in live-line tools", url: "https://store.astm.org/f0711-26.html", kind: "authority", note: "Current edition, published March 2026. Covers solid rods and foam-filled tubes; fittings and complete-tool attachments are outside its scope." },
  { id: "iec-live-working", title: "IEC 60855-1:2016: insulating foam-filled tubes and solid rods", url: "https://webstore.iec.ch/en/publication/24654", kind: "authority", note: "Official scope for circular-section glass-reinforced components intended for live-working equipment on systems above 1 kV." },
  { id: "osha-tools", title: "OSHA 29 CFR 1910.269(j): live-line tools", url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.269", kind: "authority", note: "United States workplace rule covering tool design and condition. Its current note names ASTM F711-02 (2007), distinct from ASTM's current edition." },
  { id: "osha-interpretation", title: "OSHA: clarification of live-line tool examination and testing", url: "https://www.osha.gov/laws-regs/standardinterpretations/1995-02-02", kind: "authority", note: "Explains the employer's responsibility and distinctions among rod, hollow-tube and foam-filled constructions. Read with the current regulation." },
];

const toolStandards: PultrusionGuide["standards"] = [
  { name: "ASTM F711-26", category: "Standard", jurisdiction: "Procurement and qualification programs specifying ASTM requirements; not independently a universal legal requirement.", applies: "Technical characteristics and tests for FRP insulating solid rods and foam-filled tubes intended for live-line tools. The official catalog identifies design, sample, routine and acceptance testing.", limits: "Fittings and attachments for complete tools are excluded. Ordinary hollow tube, a material datasheet or an individual electrical test cannot establish compliance of a finished tool. This page makes no F1 conformity claim.", sourceIds: ["astm-f711"] },
  { name: "IEC 60855-1:2016", category: "Standard", jurisdiction: "Countries and contracts adopting this IEC component standard or its national implementation.", applies: "Circular-section fiberglass-reinforced solid rods and insulating foam-filled tubes for manufacture of live-working tools and equipment on electrical systems above 1 kV.", limits: "The scope does not automatically cover every cross-section, construction or complete tool. Its intended system-voltage scope is not a working-voltage rating for an unqualified component.", sourceIds: ["iec-live-working"] },
  { name: "29 CFR 1910.269(j)", category: "Regulation", jurisdiction: "United States workplaces and activities within OSHA's electric-power generation, transmission and distribution rule. Construction work on such systems falls under the parallel rule at 29 CFR 1926.957 (Subpart V).", applies: "Live-line tool design and condition, including daily cleaning and visual inspection and the periodic examination regime for tools used for primary employee protection. The current regulatory note references ASTM F711-02 (2007).", limits: "ASTM's current F711-26 catalog edition does not rewrite the regulation's referenced edition. Employers must follow the actual applicable rule; a component purchase does not establish a safe work method.", sourceIds: ["osha-tools"] },
];

export const electricalGuides: PultrusionGuide[] = [
  {
    kind: "application",
    slug: "frp-transformer-insulation-supports",
    name: "Dry-type transformer insulation supports",
    title: "FRP Transformer Insulation Supports | Design & Qualification",
    description: "Specify pultruded fiberglass winding spacers and supports for dry-type transformers: thermal classes, contact loads, cooling, insulation and RFQ evidence.",
    heading: "FRP insulation supports for dry-type transformers",
    summary: "A winding support must maintain position, carry its assigned loads and preserve the cooling and insulation arrangement. Define those jobs together before selecting a dog-bone, channel, angle or custom pultruded section.",
    scope: "Send a component drawing and equipment qualification requirements for feasibility review. This guide concerns pultruded support components; it does not establish an F1 thermal class, transformer approval or validated insulation system.",
    material: "Glass-reinforced thermoset profiles with a project-qualified resin, reinforcement and surface system",
    profiles: ["Dog-bone winding spacers", "Insulating channels and angles", "Support strips and custom constant-section holders"],
    ...profileImage,
    sections: [
      {
        id: "support-function",
        title: "Identify the support's job inside the transformer",
        paragraphs: [
          "Start with an annotated equipment section. Show the winding, core, clamps, grounded metalwork and cooling passages, then mark what each proposed FRP part must locate or support. An axial spacer, a radial positioning strip and a holder around a winding can require different stiffness, contact geometry and insulation arrangements even when their cross-sections look similar. Record the installation orientation so that loads can be related to the profile's fiber directions.",
          "Pultrusion suits a repeating cross-section followed by controlled cutting and machining. Röchling's dry-transformer examples identify profile-based holders and dog-bone winding spacers; they also identify pressure blocks machined from sheet, which are a different product route. The following design questions are an engineering specification framework. They do not transfer that supplier's grades or qualification to an F1 component, and they do not cover oil-impregnated laminated wood parts.",
        ],
        sourceIds: ["roechling-transformer", "roechling-profiles"],
      },
      {
        id: "material-and-temperature",
        title: "Select the material against the local temperature history",
        paragraphs: [
          "Ask for the temperature at the support itself, including continuous duty, expected overload periods, cooling interruptions and thermal cycles. Ambient room temperature alone is insufficient when a part sits beside a winding. Agree on the conditioning and temperature at which mechanical and electrical properties will be demonstrated. A room-temperature property sheet can help compare candidates, but it does not establish retention of stiffness or contact pressure during hot service.",
          "Keep the terms distinct: resin glass-transition temperature, a material's thermal endurance designation, the complete electrical insulation system's thermal class and the transformer's permitted temperature rise describe different things. IEC 60085 expressly distinguishes insulating materials from insulation systems. Select a specific resin and reinforcement package against the OEM's requirements; a generic polyester, vinyl ester or epoxy family name cannot establish class F or H suitability. Any surface coating, adhesive or sealant also belongs in the review.",
        ],
        sourceIds: ["iec-thermal", "iec-transformer"],
      },
      {
        id: "load-path",
        title: "Check contact loads and sustained compression",
        paragraphs: [
          "Build the mechanical input from winding weight, assembly clamping, handling and transport, normal operating loads, and the fault cases supplied by the equipment designer. Identify the actual bearing faces and the length over which load enters the support. A narrow contact line can create local compression and splitting that a longitudinal flexural coupon does not represent. Evaluate transverse properties, local stress concentrations, eccentric contact and the effect of holes or machined recesses.",
          "Sustained load at temperature also raises a creep question: how much movement can occur before the assembly loses its intended support or clearance? Ask for a justified allowable deformation and an assessment using data relevant to the selected material and condition. IEC 60076-5 addresses transformer short-circuit effects at equipment level. The OEM must translate its dynamic load case into component reactions; a successful support coupon does not replace the transformer's short-circuit evaluation.",
        ],
        sourceIds: ["iec-short-circuit", "iec-thermal"],
      },
      {
        id: "cooling-and-insulation",
        title: "Preserve cooling passages and electrical separation",
        paragraphs: [
          "Support geometry participates in the cooling arrangement. Increasing a bearing face may reduce contact stress while occupying more of an air passage; reducing a spacer can improve access for air while increasing local loading. Show the minimum passage dimensions and acceptable tolerance stack on the assembly drawing. Have the transformer designer review temperature performance in the final layout rather than treating a thicker support as an automatic improvement.",
          "The electrical review should locate the relevant air clearances, surface creepage paths and interfaces between insulation materials. Supply the equipment voltage, impulse and dielectric test requirements, pollution conditions and installation altitude. Surface contamination, moisture and sharp geometric transitions can affect the assembly even where the laminate has useful insulating properties. Do not convert a published material dielectric-strength result into an equipment operating voltage or infer that an FRP support permits reduced separation without an OEM assessment.",
        ],
        sourceIds: ["iec-transformer"],
      },
      {
        id: "fabrication-and-assembly",
        title: "Control the details that change during fabrication and assembly",
        paragraphs: [
          "Use functional datums for width, contact-face flatness, straightness, twist, cut length and hole position. Identify which surfaces contact the winding and which dimensions maintain cooling or insulation space. A tolerance acceptable for a building profile may be unsuitable for a tightly packed transformer assembly. Review cutter access, edge finishing and inspection methods before releasing the die, especially where the profile requires narrow radii or thin webs near a load-bearing region.",
          "Specify the approved machining, cleaning and packaging process so that conductive debris, damaged edges or contamination are not introduced before assembly. Where an edge treatment is required, include its material and application in the qualification plan. Trial-fit the first article against the actual mating components. The OEM should define assembly sequence and clamping control; excessive tightening or improvised shims can change load distribution and the clearances established in the design.",
        ],
        sourceIds: ["roechling-profiles", "iec-transformer"],
      },
      {
        id: "qualification",
        title: "Separate component acceptance from transformer qualification",
        paragraphs: [
          "Agree on the evidence plan before treating a material as approved. It should identify the formulation and reinforcement, profile drawing revision, conditioning, specimen orientation, required tests, acceptance limits and the party that approves the results. First-article dimensional inspection, representative material testing and assembly verification answer different questions. Keep their records connected through a material and production batch identity so a future investigation can establish exactly what was installed. North American contracts typically specify IEEE C57.12.01 for the dry-type transformer and UL 1446 for its insulation system, so confirm the OEM's governing standards before planning tests.",
          "Define what triggers renewed review: a resin or reinforcement change, a different surface layer, revised contact geometry, new machining or an altered curing process may affect the basis of approval. The purchase order should distinguish development samples from parts released for series use. For projects specifying IEC 60076-11, the equipment manufacturer's overall qualification remains necessary; the standard's scope and exclusions must be checked before applying it to a special transformer.",
        ],
        sourceIds: ["iec-transformer", "iec-thermal"],
      },
      {
        id: "inspection-and-failure",
        title: "Make deterioration observable during equipment maintenance",
        paragraphs: [
          "Plan access for inspection within the transformer's maintenance procedure. Useful observations include support movement, loose interfaces, cracking, separation of layers, heat discoloration, carbonized tracks and deposits that obstruct air passages. Record the location and operating context rather than replacing a failed part with an apparently similar shape. A changed duty cycle, loose clamp or blocked cooling route can make a replacement fail for the same underlying reason.",
          "Removal, cleaning and replacement belong under the equipment owner's electrical isolation and maintenance controls. A field repair, coating or replacement material should be assessed by the OEM against the original design and qualification. Do not promise a universal inspection interval or maintenance-free service. The appropriate schedule depends on equipment duty, environmental exposure, observed condition and the manufacturer's instructions, while replacement acceptance should preserve both the load path and the insulation arrangement.",
        ],
        sourceIds: ["iec-transformer"],
      },
    ],
    standards: [
      { name: "IEC 60076-11:2018", category: "Standard", jurisdiction: "Projects specifying IEC dry-type power transformer requirements or a corresponding national adoption.", applies: "Dry-type power transformers with highest equipment voltage up to 72.5 kV and at least one winding operating above 1.1 kV, within the standard's stated scope.", limits: "The official scope excludes several categories, including rolling-stock traction transformers and flameproof and mining transformers. This equipment standard does not certify an individual FRP support or cover every special transformer.", sourceIds: ["iec-transformer"] },
      { name: "IEC 60085:2007", category: "Standard", jurisdiction: "Electrical insulation programs adopting IEC thermal evaluation and designation.", applies: "Thermal evaluation and class designation, distinguishing electrical insulating materials from electrical insulation systems where thermal aging is the dominant factor.", limits: "A resin Tg or a material thermal designation does not establish the class of the assembled insulation system, and a thermal class does not replace mechanical or dielectric qualification.", sourceIds: ["iec-thermal"] },
      { name: "IEC 60076-5:2006", category: "Standard", jurisdiction: "Transformer contracts adopting this short-circuit evaluation framework; confirm the project edition.", applies: "Assessment of thermal and dynamic effects of external short circuits on power transformers.", limits: "Component property data support the OEM's analysis but do not independently establish the transformer's ability to withstand a short circuit.", sourceIds: ["iec-short-circuit"] },
    ],
    specification: [
      "Transformer type, equipment standard and edition, rated capacity, operating voltages and intended installation country.",
      "Annotated winding/core/clamp arrangement, part function, fiber direction, support drawing and functional datums.",
      "Local continuous and peak temperatures, duty duration, thermal cycles, cooling passages and the insulation-system class required by the OEM.",
      "Assembly preload, sustained and transient loads, short-circuit reactions, transport loads and allowable deformation.",
      "Air-clearance and creepage requirements, altitude, contamination, moisture and the proposed equipment dielectric tests.",
      "Profile dimensions, length, straightness, twist, contact faces, machining, edge treatment and cleanliness requirements.",
      "Qualification and batch-acceptance plan, material-change control, traceability, first-article quantities and series forecast.",
    ],
    faqs: [
      { question: "Is a dog-bone profile suitable for every dry-type transformer?", answer: "Its shape can provide useful winding support and spacing, but suitability depends on contact loads, local temperature, cooling, electrical separation and the OEM's qualification. Use the fiberglass dog-bone product page for profile geometry and this guide for the equipment-level specification." },
      { question: "Can a resin's glass-transition temperature prove class H insulation?", answer: "No. Tg, material thermal endurance and insulation-system thermal class are different properties. The equipment manufacturer must establish the applicable system classification and verify the selected component within that system." },
      { question: "Does this guide include oil-filled transformer insulation?", answer: "Its scope is pultruded supports for dry-type equipment. Oil-filled equipment introduces fluid compatibility, impregnation and insulation-system requirements that need a separate review. Laminated transformer wood and machined sheet components should not be described as pultruded GFRP." },
    ],
    sources: transformerSources,
    related: [
      { href: "/products/fiberglass-dog-bone", label: "Fiberglass dog-bone profile geometry" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
      { href: "/industries/energy", label: "Energy and power industry" },
    ],
  },
  {
    kind: "application",
    slug: "frp-third-rail-protection",
    name: "Third-rail protection systems",
    title: "FRP Third-Rail Protection | Coverboard Design Guide",
    description: "Plan pultruded third-rail coverboards around collector clearance, brackets, weather, fire requirements, electrical protection and operator qualification.",
    heading: "FRP third-rail protection from profile to track assembly",
    summary: "A third-rail cover is part of an operator-defined protection arrangement. Its cross-section, supports, ends and joints must fit the conductor and collector envelope while retaining the required mechanical and electrical performance in service.",
    scope: "F1 can review a drawing-led coverboard component inquiry and the evidence required for qualification. No standard stock cover, approved railway system or safe-access condition is asserted by this guide.",
    material: "Project-qualified glass-reinforced thermoset profiles, with fire and electrical requirements defined for the installation",
    profiles: ["Custom open cover sections", "Returned-edge coverboards", "Profile-based joint and end components subject to separate review"],
    ...profileImage,
    sections: [
      {
        id: "system-function",
        title: "Start with the conductor rail and collector envelope",
        paragraphs: [
          "Show whether the system uses top, side or bottom contact, then define the conductor position and the moving collector's permitted envelope. Include tolerances, rail alignment and the access needed for inspection and replacement. The cover must fit that operating geometry in its installed and deflected states. A familiar channel shape does not establish that it will clear the collector or provide the protective arrangement intended by the railway designer.",
          "Coverboards can help restrict unintended approach and address specified environmental exposure, but they do not make an energized track safe to enter or touch. The operating authority determines their function within the wider electrical-safety system. Röchling distinguishes profile-based third-rail covers from compression-molded rail supports; this guide concerns the pultruded cover component. Brackets, insulators, return-current arrangements and access controls need their own design and acceptance basis.",
        ],
        sourceIds: ["roechling-rail", "en-fixed-rail"],
      },
      {
        id: "cover-and-supports",
        title: "Design the cover and its supports as one assembly",
        paragraphs: [
          "Map straight runs, joints, curves, conductor ends, transitions and removable maintenance sections. Put the cover's support points and fixing geometry on the same drawing as the protected equipment. Supplied profile length and permissible unsupported span are separate decisions. Identify where the assembly fixes longitudinal position and where it permits the movement required by temperature changes, so neither uncontrolled migration nor restrained expansion is left to the installer to resolve.",
          "The connection review should include bracket stiffness, local bearing, hole or slot geometry, retention against uplift and the risk of edge splitting. Thin returns or snap features need their own load and fit evidence; satisfactory bending of the main cover span does not prove them. Confirm how the cover can be replaced without damaging adjoining parts, and use a representative assembly to verify the interface before committing to a production die.",
        ],
        sourceIds: ["foster-coverboards", "roechling-profiles"],
      },
      {
        id: "loads-and-exposure",
        title: "Define location-specific loads and exposure",
        paragraphs: [
          "Prepare a load schedule for the actual installation. Outdoor elevated track can require a different wind and ice assessment from a sheltered tunnel, while debris, handling impacts and maintenance activities introduce localized loads. Have the owner state whether accidental foot loading is a design case. A coverboard should never be advertised as a walking surface merely because a strong laminate is proposed. Check displacement as well as failure, because deflection can create interference before a member breaks.",
          "Record the minimum and maximum component temperatures, solar exposure, wetting, freeze-thaw conditions, salts, cleaning chemicals and expected particulate contamination. Evaluate the retention of the required properties after the agreed conditioning. The surface system, cut ends and drilled locations are part of that exposure assessment. Avoid treating a resin family's general corrosion resistance or a successful indoor electrical test as a prediction of outdoor service life.",
        ],
        sourceIds: ["foster-coverboards", "en-fixed-rail"],
      },
      {
        id: "electrical-and-fire",
        title: "Keep electrical protection and fire qualification separate",
        paragraphs: [
          "Ask the railway electrical designer to identify the cover's insulation function, the required tests and relevant interfaces. The laminate's electrical properties do not remove the need to consider contaminated surfaces, accumulated moisture, metal fixings and the surrounding protection arrangement. The designer also establishes what clearances and bonding provisions apply elsewhere in the assembly. A material dielectric-strength number cannot be translated directly into an approved system operating voltage or permission to contact the cover.",
          "Set fire and smoke requirements for the actual location and authority. NFPA 130 addresses transit-system fire and life safety where adopted, while EN 45545-2 addresses materials and components on railway vehicles. A contract may deliberately specify tests from another framework, but that choice should be explicit. Agree on the formulation, thickness, surface treatment and specimen or assembly arrangement covered by each report; a generic flame-retardant label does not define those boundaries.",
        ],
        sourceIds: ["en-fixed-rail", "nfpa-transit", "en-rail-vehicle-fire"],
      },
      {
        id: "manufacturing-and-installation",
        title: "Make the installed geometry reproducible",
        paragraphs: [
          "Specify the functional section dimensions, wall thickness, straightness, twist, cut length and hole positions against the approved drawing. The tolerance stack includes the support system and track installation, not only the pultrusion. Use fabrication methods that preserve the qualified edges and surfaces, and agree on inspection criteria for cracks, void indications, exposed fibers and machining damage. A dimensional pass should not override a surface defect affecting an electrical or load-bearing region.",
          "Installation belongs under the operator's isolation, access and work-permit procedures. Trial-fit a representative track section before series installation, checking support spacing, joint movement, end details and collector clearance. The approved installation instructions should define fastening, identification, permitted adjustment and final inspection. If parts do not fit, resolve the drawing or tolerance issue; unapproved field notching, drilling or forced assembly can invalidate both the geometry and the evidence supporting it.",
        ],
        sourceIds: ["roechling-profiles", "en-fixed-rail"],
      },
      {
        id: "qualification-and-release",
        title: "Use a staged qualification and release process",
        paragraphs: [
          "Begin with a requirements matrix listing the operator, installation environment, standards and their adopted editions, test methods, acceptance criteria and responsible approver. Follow with profile feasibility, representative material and connection evidence, first-article inspection, trial installation and the system checks required by the owner. State which checks apply to raw profile, fabricated cover and installed assembly. None of these stages should be silently replaced by a generic certificate from a different material or thickness.",
          "For serial supply, maintain drawing and formulation revisions, production batch identity and agreed inspection records. Define which changes trigger engineering review or repeated tests, including revised reinforcement, fire additives, coatings, fixing holes and support details. Resolve document approval before releasing parts for track use. This creates a traceable qualification inquiry even where a new profile is technically feasible but railway approval, suitable testing or a verified production route remains outstanding.",
        ],
        sourceIds: ["en-fixed-rail", "nfpa-transit"],
      },
      {
        id: "maintenance-boundaries",
        title: "Inspect retention, surface condition and drainage together",
        paragraphs: [
          "The maintenance plan should look for shifted covers, missing or loose fixings, open joints, distortion, cracking, separation of layers, impact damage and electrical tracking or burn marks. Inspect the conditions that can cause deterioration as well: obstructed drainage, deposits, recurrent collector interference and localized heat. Identify damaged parts by their location and production record so the owner can determine whether a problem is isolated or affects a wider installation batch.",
          "Cleaning, repair or recoating should follow a procedure compatible with the accepted material system and the operator's electrical controls. A coating change can affect the previously reviewed surface or fire behavior. Replacement should restore the approved bracket spacing, clearances and movement detail rather than merely cover a visible gap. Inspection frequency and withdrawal criteria belong to the operator's maintenance program; a component supplier should not promise indefinite life or treat a damaged cover as protective.",
        ],
        sourceIds: ["en-fixed-rail", "nfpa-transit"],
      },
    ],
    standards: railStandards,
    specification: [
      "Operating authority, country, project approval route and exact adopted standards and editions.",
      "System operating and maximum voltages, rail cross-section, contact arrangement and collector dynamic envelope.",
      "Cover and bracket CAD, installed tolerances, support spacing, joints, end transitions and removable sections.",
      "Wind, snow, ice, impact and any defined maintenance load, with allowable deflection and connection reactions.",
      "Component temperature range, tunnel or outdoor exposure, contamination, water, cleaning media and drainage arrangement.",
      "Electrical, fire and smoke test matrix, conditioning, accepted thicknesses and surface finishes, and approving parties.",
      "First-article trial location, quantities and cut lengths, installation constraints, identification and batch inspection documents.",
    ],
    faqs: [
      { question: "Can a coverboard replace safe railway access controls?", answer: "No. It is one component in an operator-defined protective arrangement. Track access, isolation, clearances and the wider electrical-safety provisions remain governed by the railway's design and operating procedures." },
      { question: "Must every third-rail cover meet EN 45545-2?", answer: "EN 45545-2 concerns railway vehicles. A fixed-installation project can specify its tests contractually, but there is no basis for presenting that as the universal third-rail rule. Confirm the owner's fixed-installation electrical and fire requirements." },
      { question: "Are the supporting insulators also pultruded?", answer: "Manufacturing routes vary. A system can combine pultruded covers with molded supports, metal brackets and other parts. Each item needs its own drawing and evidence; the pultrusion route of a cover does not describe the whole assembly." },
    ],
    sources: railSources,
    related: [
      { href: "/products/frp-third-rail-coverboards", label: "Specify a third-rail coverboard profile" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
      { href: "/industries/infrastructure", label: "Infrastructure industry" },
    ],
  },
  {
    kind: "application",
    slug: "frp-live-line-tool-components",
    name: "Live-line tool component qualification",
    title: "FRP Live-Line Tool Components | Qualification Guide",
    description: "Develop a specification for fiberglass live-line tool rods and foam-filled tubes, separating component tests, complete-tool qualification and employer duties.",
    heading: "Qualifying FRP components for live-line tools",
    summary: "A fiberglass rod or tube becomes a candidate tool component only through a defined material, fabrication and qualification process. Establish the applicable component standard and complete-tool acceptance route before selecting a profile.",
    scope: "This is a component feasibility and qualification inquiry. F1 has not established a dedicated live-line tool qualification through this page. It is not an offer of an approved complete tool, a working-voltage rating or instructions for energized work.",
    material: "Candidate fiberglass-reinforced insulating solid rod or foam-filled tube, subject to application-specific qualification",
    profiles: ["Solid insulating rods", "Circular foam-filled insulating tubes", "Drawing-controlled component ends subject to tool-maker qualification"],
    ...profileImage,
    sections: [
      {
        id: "supply-boundary",
        title: "Define whether you are buying a profile, component or tool",
        paragraphs: [
          "State the deliverable at the beginning of the inquiry. A pultruded blank, a cut and machined insulating component, a component fitted with a metal head and a complete tool are different products. The party integrating the tool must define the acceptance route for the final assembly and the evidence needed from its component supplier. A generic fiberglass handrail tube or structural rod is not an acceptable substitute merely because glass and resin are commonly electrical insulators.",
          "Tencom identifies pultruded fiberglass as a tool-component application. The authoritative component boundaries come from the relevant standards: ASTM F711 covers insulating solid rods and foam-filled tubes, while its scope excludes fittings and attachments for complete tools. IEC 60855-1 addresses circular-section rods and foam-filled tubes for manufacturing live-working equipment. These scope statements guide the inquiry; they do not establish that an F1 profile or an assembled tool conforms.",
        ],
        sourceIds: ["tencom-tool", "astm-f711", "iec-live-working"],
      },
      {
        id: "construction",
        title: "Choose a complete insulating construction",
        paragraphs: [
          "Describe the required solid or foam-filled construction, dimensions, effective component length, surface finish and end treatment. For a foam-filled tube, the core, tube wall, interfaces and end closures should be reviewed as one construction. The choice of a foam by itself cannot prove resistance to moisture ingress. Establish how the selected manufacturing process will control the relevant features and how the agreed inspections can verify them without overlooking internal or interface defects.",
          "Specify the fiberglass reinforcement and resin system with the qualification plan, then identify the properties that matter in the intended temperature, moisture and contamination conditions. Do not substitute carbon reinforcement or conductive additives into a construction intended to provide electrical insulation. Surface appearance and a low water-absorption figure alone do not establish live-line suitability. The material identity, processing controls and test evidence must describe the actual component that will enter the tool assembly.",
        ],
        sourceIds: ["astm-f711", "iec-live-working"],
      },
      {
        id: "mechanics-and-interfaces",
        title: "Check the mechanics of the tool and its end interfaces",
        paragraphs: [
          "Obtain load cases from the tool designer, including the tool head, handling geometry and any intended axial, bending or torsional action. A long component can meet a strength target while deflecting too much for the intended tool function. Discuss stiffness, component mass, straightness and the load introduction at each end together. Use the actual reinforcement orientation and construction when establishing the assessment; a generic longitudinal tensile value does not cover every failure mode.",
          "Holes, machined ends, threaded inserts, clamps, bonded ferrules and telescoping interfaces can change performance locally. Agree on the joint geometry, preparation and assembly controls with the tool manufacturer, then qualify the applicable final configuration. Changing a head or increasing overlap does not automatically preserve the original basis of approval. The rod-and-tube standard's scope limit is especially relevant here: evidence for the insulating length does not by itself establish the strength or electrical behavior of attachments.",
        ],
        sourceIds: ["astm-f711"],
      },
      {
        id: "electrical-evidence",
        title: "Write an electrical test plan without inventing a working rating",
        paragraphs: [
          "The procurement specification should state the adopted standard and edition, the component construction and the required design, production and acceptance evidence. Identify test conditions, required conditioning, the inspected length, acceptance criteria and who reviews the results. These details belong in a controlled plan agreed with the tool maker and test organization. A single dry dielectric test or a resin datasheet cannot stand in for the relevant qualification of the finished component.",
          "Keep laboratory tests separate from permitted field operation. A test voltage divided by specimen length is not a rule for selecting a safe working length, approach distance or equipment voltage. The working surface and complete assembly are exposed to conditions a simple material number cannot describe. This guide therefore provides no energized-work procedure or voltage-to-length formula. Qualified employers and tool manufacturers must establish their operating limits and practices through the applicable rules and validated equipment.",
        ],
        sourceIds: ["astm-f711", "iec-live-working", "osha-tools"],
      },
      {
        id: "production-release",
        title: "Carry qualification controls into production and assembly",
        paragraphs: [
          "Freeze the drawing, material construction, surface system, approved machining and marking locations before the first production release. Agree on the inspection methods for dimensions, straightness and visible damage, as well as the test records required by the selected standard and purchase contract. Development samples should be clearly distinguished from released components. Identify how the component batch will remain traceable after cutting, fabrication and integration into a complete tool.",
          "Review proposed changes before implementing them. A different reinforcement, resin, core, coating, end closure or fabrication process can affect the assumptions used during qualification. Packaging should preserve the qualified surfaces and prevent mix-ups with ordinary structural fiberglass products. The receiving tool manufacturer should verify identification and the agreed acceptance documents before assembly, then perform the further checks needed for its complete tool. Supplier documentation is an input to this process, not a substitute for it.",
        ],
        sourceIds: ["astm-f711", "iec-live-working"],
      },
      {
        id: "daily-and-periodic-care",
        title: "Distinguish daily condition checks from periodic examination",
        paragraphs: [
          "For work within its scope, OSHA 1910.269(j) requires live-line tools to be wiped clean and visually inspected before each day's use. A defect or contamination that could affect insulation or mechanical integrity triggers removal from service and the prescribed evaluation. The employer's procedure should make identification, condition reporting and segregation of suspect tools practical. Useful observations include cracks, surface damage, persistent deposits and loose interfaces; the manufacturer's instructions govern the actual inspection and care process.",
          "Tools used for primary employee protection enter OSHA's two-year examination, cleaning, repair and testing regime, with detailed conditions for testing and specific exceptions in the rule. It should not be reduced to a blanket statement that every tool needs only one identical test every two years. Read the current regulation and applicable manufacturer guidance together. Test voltages for in-service evaluation are not field working ratings, and a purchase certificate does not remove the employer's responsibilities.",
        ],
        sourceIds: ["osha-tools", "osha-interpretation"],
      },
      {
        id: "failure-response",
        title: "Define withdrawal, repair and replacement responsibilities",
        paragraphs: [
          "Specify who can authorize repair, what processes are permitted and how the tool returns to service after the required examination and testing. Uncontrolled sanding, drilling, painting or fitting replacement hardware can alter the construction that was qualified. A contaminated surface or damaged interface should not be dismissed because the underlying material is fiberglass. Record the defect, tool identity and relevant exposure so the manufacturer can distinguish isolated damage from a manufacturing or application issue.",
          "Use separate procurement gates for feasibility, component qualification, complete-tool validation and release to field use. If a required report, manufacturing control or competent approval is missing, keep the part within development status. A drawing-led inquiry can establish the work needed without claiming that a suitable product is already qualified. The result should be a clear allocation of design, testing, inspection and maintenance duties rather than a broad statement that a handle is electrically safe.",
        ],
        sourceIds: ["osha-tools", "astm-f711"],
      },
    ],
    standards: toolStandards,
    specification: [
      "Requested deliverable: blank profile, fabricated insulating component, fitted component or complete tool, with each party's qualification responsibilities.",
      "Intended tool function, destination country, applicable standards and exact editions, and the tool manufacturer's acceptance procedure.",
      "Solid or foam-filled construction, circular-section dimensions where applicable, length, straightness, mass and functional surface requirements.",
      "Tool-head and connection drawings, mechanical load cases, stiffness targets, fabrication and assembly process requirements.",
      "Temperature, moisture and contamination exposure, approved cleaning system, marking and protective packaging.",
      "Design, routine and acceptance test plan, conditioning, test responsibility, required reports and change-control procedure.",
      "First-article quantities, production forecast, traceability and explicit identification of development parts not released for field use.",
    ],
    faqs: [
      { question: "Can an ordinary hollow fiberglass tube be used as a hot-stick component?", answer: "Do not infer that from the material name. ASTM F711 and IEC 60855-1 cover solid rods and foam-filled tubes. Insulating hollow tubes have their own IEC standard, IEC 61235, and complete insulating sticks are covered by IEC 60832-1. The tool manufacturer must select and validate the appropriate construction and complete tool." },
      { question: "Does ASTM F711 qualification cover the tool head and attachments?", answer: "The standard's public scope excludes fittings and attachments for complete tools. Their design, fabrication and integration need the applicable further assessment. Rod or tube evidence cannot be presented as complete-tool approval." },
      { question: "Why are two ASTM F711 editions mentioned?", answer: "ASTM's catalog currently lists F711-26, while the current note in OSHA 1910.269(j) names F711-02 (2007). A current standards catalog does not amend the regulation. The purchaser and responsible employer must determine how their specific requirements will be met." },
    ],
    sources: toolSources,
    related: [
      { href: "/products/fiberglass-live-line-tool-tubes-rods", label: "Specify insulating rod and tube components" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
      { href: "/industries/energy", label: "Energy and power industry" },
    ],
  },
  {
    kind: "product",
    slug: "frp-third-rail-coverboards",
    name: "Pultruded third-rail coverboards",
    title: "FRP Third-Rail Coverboards | Component Specification",
    description: "Specify FRP third-rail coverboards with section geometry, bracket interfaces, material requirements, fabrication tolerances and batch acceptance evidence.",
    heading: "Pultruded FRP third-rail coverboards",
    summary: "Specify a coverboard as a drawing-controlled component with agreed material, interface and acceptance requirements. Establish the operator's qualification route before releasing a profile for railway service.",
    scope: "Component feasibility and qualification inquiry only. An approved railway product, standard available section, certified material package or installed system is not established by this page.",
    material: "Application-qualified glass-reinforced thermoset profile; resin, reinforcement and surface package agreed during review",
    profiles: ["Custom open coverboard sections", "Profiles with returned edges and defined mounting zones", "Cut and machined cover lengths to approved drawings"],
    ...profileImage,
    sections: [
      {
        id: "component-definition",
        title: "Define the component before selecting the section",
        paragraphs: [
          "Provide a section drawing showing the conductor rail and collector clearance alongside the proposed coverboard. Mark the profile surfaces that locate on brackets, the regions that carry fixing loads and the boundaries that must remain clear after tolerances and deflection are included. Specify whether the order covers raw lengths or cut, drilled and identified parts. A quotation based only on overall width and wall thickness leaves important functional requirements unresolved.",
          "Pultrusion is a candidate route for repeatable constant-section covers. Complex transitions, curved end pieces and supports may need a different manufacturing process or a separately qualified assembly. Röchling's application examples distinguish profile-based covers from compression-molded supports. Keep those parts separate in the bill of materials so that a profile supplier's scope does not imply responsibility for an entire conductor-rail protection system.",
        ],
        sourceIds: ["roechling-rail", "roechling-profiles"],
      },
      {
        id: "geometry-and-tolerances",
        title: "Specify functional datums, fit and tolerances",
        paragraphs: [
          "Dimension mounting width, internal clearances, wall thickness, returns, radii and the features controlling engagement with the bracket. Define the measurement datums and agreed inspection condition. Include cut length, end squareness, straightness, twist and hole or slot position where relevant. These requirements should be derived from the assembly tolerance budget; a generic pultrusion tolerance does not prove that a long cover will fit a particular track installation.",
          "Review thin lips, local thickness changes and tightly constrained fastening regions during die feasibility. Ask how first-article fit will be checked with representative mating parts, and how changes to bracket spacing or joint geometry will be controlled. Supplied length is a logistics and fabrication parameter. Permissible span and fastening capacity must come from the project assessment, including local wall behavior and connection retention.",
        ],
        sourceIds: ["roechling-profiles", "foster-coverboards"],
      },
      {
        id: "material-package",
        title: "Freeze the tested material and surface package",
        paragraphs: [
          "List the required mechanical, electrical, environmental and fire evidence without assuming one property substitutes for another. The accepted material description should identify resin and reinforcement, relevant additives, surface layers, color, wall thickness and any coating or edge treatment. Request reports that can be related to that description and to the specified conditioning. A report for an unrelated sheet or differently coated sample is not automatically evidence for the supplied profile.",
          "The operator's location and approval framework determine the applicable fire and electrical requirements. NFPA 130 and EN 50122-1 address different aspects of the transit installation, while EN 45545-2 has a railway-vehicle scope. Resolve the project's test matrix and adopted editions before production. This product inquiry does not assert a flame classification, insulation rating or railway approval for an untested F1 section.",
        ],
        sourceIds: ["nfpa-transit", "en-fixed-rail", "en-rail-vehicle-fire"],
      },
      {
        id: "fabrication-and-acceptance",
        title: "Agree on fabrication and acceptance at the finished-part level",
        paragraphs: [
          "The fabrication drawing should control cut ends, drilled features, any specified edge finish and identification. Agree on how cracks, separation of layers, local damage and exposed fibers will be evaluated, especially in mounting or electrically functional regions. Where a repair is allowed, its approval and inspection route should be documented before the batch is accepted. A conforming overall dimension does not override a defect that affects the intended function.",
          "An acceptance package can include the approved drawing revision, material identity, batch record, dimensional inspection, agreed test reports and a first-article fit record. Define sampling, witness points and responsibility in the purchase order. Development samples should remain clearly identified until the operator or designated approver releases the component. Packaging and handling instructions should protect long edges and prevent distortion or impact damage during transport and unloading.",
        ],
        sourceIds: ["roechling-profiles", "en-fixed-rail"],
      },
      {
        id: "supply-and-qualification",
        title: "Separate feasibility, first article and approved series supply",
        paragraphs: [
          "Begin with a feasibility review of geometry, material requirements and the tests needed. Then agree on a first-article scope, representative brackets and the review needed before any series order. Tooling approval is a manufacturing milestone, not railway approval. If the qualification route requires testing or acceptance that has not been completed, the commercial documents should say so and identify the remaining responsibilities and release conditions.",
          "For repeat orders, reference the accepted configuration and control changes to the profile, surface, machining or attachment interface. Retain batch identification through installation where the operator requires it. Spare parts should restore the approved geometry and material system. A visually similar replacement is not enough when the existing qualification depends on a particular wall, fixing detail or tested fire package.",
        ],
        sourceIds: ["en-fixed-rail", "nfpa-transit"],
      },
    ],
    standards: railStandards,
    specification: [
      "Operator and installation location, adopted standards and editions, and component approval responsibility.",
      "Section and fabrication drawings with conductor/collector envelope, bracket interfaces and functional tolerances.",
      "Required profile and cut lengths, support spacing, fastening arrangement and defined component loads.",
      "Material, conditioning, electrical and fire test matrix, surface finish, color and permitted fabrication processes.",
      "First-article fit checks, inspection sampling, witness requirements, documents and release criteria.",
      "Quantities, packaging, delivery sequence, spare-part strategy and batch identification requirements.",
    ],
    faqs: [
      { question: "Is there a universal third-rail coverboard section?", answer: "No section can be assumed to fit every conductor rail, collector envelope and support system. Send the operator's drawings and acceptance requirements for a component feasibility review." },
      { question: "Can I order this as a certified stock item?", answer: "This page establishes a qualification inquiry, not certified stock availability. Material evidence, section feasibility, testing and operator acceptance need to be agreed for the requested component." },
      { question: "Does the supplied profile length determine its allowable span?", answer: "No. Length describes the delivered part. Span depends on material properties, section geometry, support and fixing behavior, load cases and the permitted deflection in the track assembly." },
    ],
    sources: railSources,
    related: [
      { href: "/applications/frp-third-rail-protection", label: "Third-rail system design and qualification" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
    ],
  },
  {
    kind: "product",
    slug: "fiberglass-live-line-tool-tubes-rods",
    name: "Fiberglass insulating rod and tube components",
    title: "Fiberglass Live-Line Tool Rods & Tubes | Specification",
    description: "Specify fiberglass solid rods and foam-filled tubes for live-line tool development, covering geometry, interfaces, qualification and acceptance records.",
    heading: "Fiberglass rods and tubes for tool qualification inquiries",
    summary: "Prepare a component specification for a tool manufacturer's qualification program: construction, dimensions, interfaces, required tests and controlled production release. A structural fiberglass profile is not automatically a live-line tool component.",
    scope: "Feasibility and qualification inquiry for insulating components. No dedicated F1 live-line tool conformity, complete-tool approval or working-voltage rating is established here. Components must remain in development status until the responsible parties complete the required release process.",
    material: "Candidate fiberglass-reinforced solid rod or foam-filled insulating tube, subject to an agreed qualification program",
    profiles: ["Solid insulating rods", "Circular foam-filled insulating tubes", "Drawing-controlled cut and finished components"],
    ...profileImage,
    sections: [
      {
        id: "construction-scope",
        title: "Choose the construction covered by the qualification route",
        paragraphs: [
          "The inquiry should identify solid rod or foam-filled tube, the applicable standard and exact edition, and the intended component function. ASTM F711-26 covers these FRP insulating constructions for live-line tools. IEC 60855-1:2016 specifies circular-section fiberglass-reinforced rods and foam-filled tubes within its stated scope. An ordinary hollow structural tube cannot be relabeled as a component meeting either specification simply because it uses a similar resin and reinforcement.",
          "For a tube, include the wall, core and end-closure arrangement in the proposed construction. For either form, describe the intended surface and the subsequent fabrication operations. Agree on which party is responsible for design qualification, manufacturing controls and complete-tool integration. This page supports that inquiry; it does not present a qualified F1 material grade, an approved tooling range or a ready-to-use energized-work product.",
        ],
        sourceIds: ["astm-f711", "iec-live-working"],
      },
      {
        id: "dimensions-and-interfaces",
        title: "Dimension the profile around its function and interfaces",
        paragraphs: [
          "Provide diameter, tube wall where applicable, cut length, straightness and any required roundness or mass limits. Mark the functional datums and inspection condition. Show the surfaces involved in gripping, sliding or locating inside another component, together with the tolerances needed for those functions. Supply the tool-head or ferrule drawing so that local fit is considered before deciding the component dimensions and secondary operations.",
          "Holes, end machining, bonded fittings, clamps and telescoping interfaces need review by the tool designer. Identify their loads, approved preparation and assembly process. The public scope of ASTM F711 excludes complete-tool fittings and attachments, so evidence for a rod or tube is only part of the final acceptance case. Any change to the end design or machining must be assessed against that case rather than assumed to be covered by an earlier test.",
        ],
        sourceIds: ["astm-f711"],
      },
      {
        id: "qualification-records",
        title: "Specify the qualification evidence before ordering samples",
        paragraphs: [
          "List the tests, conditioning, acceptance criteria and reporting responsibilities required by the adopted standard and tool maker. ASTM's official scope distinguishes design, sample, routine and acceptance tests; these serve different purposes. A small set of development samples, an isolated dielectric result or a general pultrusion property sheet does not establish that the production component meets the required program. Agree on the sample identity and construction so results remain connected to the intended series product.",
          "Confirm the edition explicitly. The ASTM catalog currently lists F711-26, while the current note in OSHA 1910.269(j) references F711-02 (2007). The customer and responsible employer must determine the applicable contractual and regulatory basis; a later catalog edition does not silently amend the rule. Neither a material test voltage nor the voltage scope of an IEC standard establishes a working rating for the unqualified component offered for review.",
        ],
        sourceIds: ["astm-f711", "iec-live-working", "osha-tools"],
      },
      {
        id: "finished-part-acceptance",
        title: "Accept the finished component and preserve its identity",
        paragraphs: [
          "Agree on dimensional inspection, surface condition criteria, approved fabrication and the required production test records. Record the material construction, drawing revision and batch identity in the acceptance package. Marking location and method should be part of the approved specification so identification does not damage a critical surface. Keep unreleased development pieces distinguishable from accepted components and from ordinary structural rods or tubes in both documentation and packaging.",
          "A receiving check should confirm identity, transport condition and the agreed records before tool assembly. Establish how scratches, impact damage, exposed reinforcement, suspect closures or fabrication defects will be assessed. Packaging should protect the surface and ends and prevent mix-ups among constructions. A visually clean component still requires its qualification evidence, while a compliant document does not override physical damage observed on delivery.",
        ],
        sourceIds: ["astm-f711", "iec-live-working"],
      },
      {
        id: "release-and-changes",
        title: "Control release to the tool manufacturer and later changes",
        paragraphs: [
          "Separate feasibility review, first-article testing, component production approval and complete-tool release in the supply agreement. Identify the evidence and approving party for each stage. Where suitable tests or production controls have yet to be established, describe the supply as development work. No part should be represented as ready for energized service on the strength of this product description or the general insulating behavior of fiberglass.",
          "For repeat production, review changes to resin, reinforcement, core, surface, end closure and machining before implementation. Retain the records needed to investigate a returned component and connect it to the tool manufacturer's assembly records. Field inspection, maintenance and return-to-service decisions remain within the applicable employer and tool-manufacturer procedures. They cannot be replaced by the original component purchase or a supplier's broad claim of durability.",
        ],
        sourceIds: ["astm-f711", "osha-tools"],
      },
    ],
    standards: toolStandards,
    specification: [
      "Component or complete-tool supply boundary, intended tool function, destination country and responsible tool manufacturer.",
      "Applicable standards and exact editions, qualification stages, approving parties and required test reports.",
      "Solid or foam-filled construction, section geometry, diameter, wall, length, straightness and interface tolerances.",
      "Mechanical loads, stiffness requirements, end drawings, permitted machining and assembly operations.",
      "Temperature and moisture exposure, surface finish, core and end-closure details where applicable, and marking requirements.",
      "Design and production acceptance plan, change control, traceability, packaging and development-status identification.",
      "First-article quantity, subsequent demand and explicit conditions for component and complete-tool release.",
    ],
    faqs: [
      { question: "Are these components already qualified for live-line use?", answer: "This page does not establish a dedicated F1 qualification. It defines a feasibility and evidence review for a tool manufacturer's development program. Release depends on the required component and complete-tool assessments." },
      { question: "Can a hollow catalog tube be supplied instead of a foam-filled tube?", answer: "A construction change must be assessed against the selected standard and tool design. The cited component standards identify solid rods and foam-filled tubes; ordinary structural tube is not an equivalent solely because its dimensions match." },
      { question: "Can the component report serve as the finished tool's certificate?", answer: "No. Fittings, attachments, fabrication and the final configuration can introduce requirements outside the component report. The responsible tool manufacturer must establish the complete-tool acceptance evidence." },
    ],
    sources: toolSources,
    related: [
      { href: "/applications/frp-live-line-tool-components", label: "Live-line component qualification workflow" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
    ],
  },
];
