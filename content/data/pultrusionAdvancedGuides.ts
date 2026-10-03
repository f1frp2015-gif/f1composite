import type { PultrusionGuide } from "./pultrusionGuideTypes";

// Engineering questions below are original specification guidance. Industry
// references establish applications; their products, approvals and performance
// figures are not evidence of F1 capability or certification.
const strengtheningSources: PultrusionGuide["sources"] = [
  { id: "iso-cfrp-strip", title: "ISO 10406-3:2019: test methods for CFRP strips", url: "https://www.iso.org/standard/72162.html", kind: "authority", note: "Test methods for unidirectional pultruded CFRP strips used as externally bonded reinforcement on concrete. Results describe the strip, not a bonded strengthening system." },
  { id: "epsilon-strips", title: "Epsilon Composite: pultruded carbon flat laminates", url: "https://www.epsilon-composite.com/en/our-products/carbolam-pultruded-flat-laminates", kind: "industry", note: "Evidence of a commercial carbon/epoxy strip application in civil engineering; proprietary products and performance are not F1 specifications." },
  { id: "aci-strengthening", title: "ACI PRC-440.2-23: FRP strengthening guide", url: "https://www.concrete.org/store/productdetail?ItemID=440223&Language=English&Units=US_AND_METRIC", kind: "authority", note: "Publisher's scope for engineering, construction and inspection of externally bonded and near-surface-mounted FRP strengthening systems. The full guide is not reproduced." },
  { id: "aci-strengthening-code", title: "ACI CODE-440.13-24: FRP concrete-strengthening code", url: "https://www.concrete.org/store/productdetail?ItemID=44013U24&Language=English&Units=US_Units", kind: "authority", note: "Official publisher listing for the 2024 design code. Its publication does not establish adoption by a particular jurisdiction or project." },
  { id: "aci-strengthening-code-scope", title: "ACI CODE-440.13-24: official preview and scope", url: "https://www.concrete.org/Portals/0/Files/PDF/Previews/440.13-24_preview.pdf", kind: "authority", note: "The public preview includes the preface and Sections 1.1–1.2, establishing concrete-only, permitted-system and seismic limits. It does not provide the full design provisions." },
  { id: "eota-register", title: "EOTA: European Assessment Document register", url: "https://www.eota.eu/eads", kind: "authority", note: "Lists EAD 160086-01-0301 and identifies the earlier 160086-00-0301 as superseded." },
  { id: "ead-strips", title: "EAD 160086-01-0301: CFRP strengthening kits", url: "https://www.eota.eu/download?file=/2018/18-16-0095/for+ojeu/ead+160086-01-0301_ojeu+2025.pdf", kind: "authority", note: "Sections 1.1–1.2 define the carbon/epoxy strip and bonding-agent kit, manufacturing dimensions and intended-use limits. This assessment document is not an approval of F1 products." },
  { id: "sika-method", title: "Sika CarboDur System: application method statement", url: "https://gbr.sika.com/dam/dms/gb01/a/Sika%20CarboDur%20System.pdf", kind: "industry", note: "A manufacturer's system-specific example of installation and inspection controls. Its adhesive, dimensions, environmental limits and cure times must not be transferred to another system." },
];

const strengtheningStandards: PultrusionGuide["standards"] = [
  { name: "ACI PRC-440.2-23", category: "Guidance", jurisdiction: "United States origin; use where accepted by the project designer and authority", applies: "Engineering, construction and inspection guidance for FRP used in externally bonded or near-surface-mounted concrete strengthening.", limits: "A guide, not a product certificate or an automatic legal approval. The project design must define enforceable requirements. It is distinct from standards for internal GFRP reinforcing bars.", sourceIds: ["aci-strengthening"] },
  { name: "ACI CODE-440.13-24", category: "Standard", jurisdiction: "Projects adopting this code through the governing code, authority or contract", applies: "Minimum requirements for strengthening existing concrete with the unidirectional externally bonded and near-surface-mounted FRP systems permitted by its Chapter 4.", limits: "Publication does not make it law everywhere or certify a product. Masonry is excluded. Seismic strengthening of seismic-force-resisting members in Seismic Design Categories B–F is outside its scope; the designer must establish the applicable route.", sourceIds: ["aci-strengthening-code", "aci-strengthening-code-scope"] },
  { name: "EAD 160086-01-0301", category: "Assessment route", jurisdiction: "European technical assessment route for construction products", applies: "Assessment of concrete-strengthening kits comprising unidirectional carbon/epoxy strips and an epoxy structural bonding agent, for externally bonded or near-surface-mounted use.", limits: "Strip width and thickness must be prefabricated in the plant; site cutting to width is excluded. The stated intended use excludes seismic retrofitting and prevention. An EAD is not an ETA: verify the actual kit and assessment scope. EOTA lists the earlier -00 version as superseded.", sourceIds: ["ead-strips", "eota-register"] },
];

const rollerSources: PultrusionGuide["sources"] = [
  { id: "epsilon-rollers", title: "Epsilon Composite: technical carbon rollers", url: "https://www.epsilon-composite.com/en/our-products/technical-rollers", kind: "industry", note: "Application evidence for converting, printing and nonwoven machinery. Describes pullwinding and hybrid manufacture; its finished-roller claims do not establish F1 capabilities." },
  { id: "epsilon-process", title: "Epsilon Composite: pultrusion and filament-winding hybrid", url: "https://www.epsilon-composite.com/en/k1-process-pultrusion-and-filament-winding-hybrid", kind: "industry", note: "Explains that some high-performance tubes combine pultruded reinforcement and wound layers. K1 is a proprietary process, not an F1 process claim." },
  { id: "iso-geometric", title: "ISO 1101:2017: geometrical specification language", url: "https://www.iso.org/standard/66777.html", kind: "authority", note: "Official scope for indicating and interpreting form, orientation, location and run-out requirements. It does not set a roller tolerance or inspection support arrangement; the purchase checklist is original project guidance." },
  { id: "iso-datums", title: "ISO 5459:2024: datums and datum systems", url: "https://www.iso.org/standard/87855.html", kind: "authority", note: "Defines the indication and interpretation of datums in technical documentation. Its public scope excludes the verification operator; measurement fixtures and conditions need separate agreement." },
  { id: "iso-rigid", title: "ISO 21940-11:2016: balancing rigid-behavior rotors", url: "https://www.iso.org/standard/54074.html", kind: "authority", note: "Official scope for balancing procedures and tolerances when the rotor has rigid behavior." },
  { id: "iso-rigid-amendment", title: "ISO 21940-11:2016/Amd 1:2022", url: "https://www.iso.org/standard/78116.html", kind: "authority", note: "Published amendment to Part 11; establish the contractual edition and amendments with the purchaser." },
  { id: "iso-flexible", title: "ISO 21940-12:2016: balancing flexible-behavior rotors", url: "https://www.iso.org/standard/50429.html", kind: "authority", note: "Official scope and limitations for flexible rotors, including the exclusion of structural resonance assessment." },
  { id: "iso-machinery", title: "ISO 12100:2010: machinery risk assessment", url: "https://www.iso.org/standard/51528.html", kind: "authority", note: "General machinery design, risk assessment and risk reduction; not a material certification." },
  { id: "osha-guarding", title: "OSHA 29 CFR 1910.212: machine guarding", url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.212", kind: "authority", note: "US workplace requirements concerning machine hazards such as rotating parts and ingoing nip points." },
];

const rollerStandards: PultrusionGuide["standards"] = [
  { name: "ISO 21940-11:2016/Amd 1:2022", category: "Standard", jurisdiction: "International; when specified for the rotor", applies: "Balancing procedures and residual-unbalance tolerances for rotors with rigid behavior.", limits: "The purchaser must define the applicable rotor configuration, service speed and acceptance criteria. This is not a universal balance grade for every carbon tube or long roller.", sourceIds: ["iso-rigid", "iso-rigid-amendment"] },
  { name: "ISO 21940-12:2016", category: "Standard", jurisdiction: "International; flexible-behavior rotor applications", applies: "Balancing methods and guidance for rotors with flexible behavior.", limits: "The official scope does not make it a universal rotor acceptance specification and excludes structural resonances. A satisfactory balance result does not establish the entire machine's vibration performance.", sourceIds: ["iso-flexible"] },
  { name: "ISO 12100:2010", category: "Standard", jurisdiction: "International machinery risk assessment", applies: "The machine designer's assessment of hazards and risk reduction across intended use.", limits: "A carbon tube alone cannot demonstrate conformity of guarding, control functions or the complete machine.", sourceIds: ["iso-machinery"] },
  { name: "29 CFR 1910.212", category: "Regulation", jurisdiction: "United States general-industry workplaces", applies: "Guarding of machine hazards, including rotating parts and ingoing nip points.", limits: "Applies to the installed workplace machine and its hazards. It is not an OSHA product approval for a replacement roller.", sourceIds: ["osha-guarding"] },
];

const railSources: PultrusionGuide["sources"] = [
  { id: "buefa-resins", title: "BÜFA Composite Systems: resins and pultrusion", url: "https://www.buefa-composites.com/products-systems/buefa-products/unsaturated-polyester-resins-vinyl-ester-resins-epoxy-resin-systems", kind: "industry", note: "Resin-system supplier evidence for pultrusion and fire-retardant formulations. A resin offering does not qualify a finished railway profile." },
  { id: "buefa-fire", title: "BÜFA: fire-retardant systems brochure", url: "https://www.buefa-composites.com/fileadmin/media/PDFs_zum_Download/BUEFA_Composites_Fire_Retardant_Brochure_ENG.pdf", kind: "industry", note: "Explains the significance of laminate construction, thickness and surfaces for fire behavior. Its infusion and RTM examples must not be treated as tested pultruded profiles." },
  { id: "en-rail-fire", title: "NEN-EN 45545-2:2020+A1:2023", url: "https://www.nen.nl/en/nen-en-45545-2-2020-a1-2023-en-316338", kind: "authority", note: "Official national standards-body description of reaction-to-fire requirements for materials and products on railway vehicles." },
  { id: "iec-rail-vibration", title: "IEC 61373:2026: rolling-stock equipment shock and vibration", url: "https://webstore.iec.ch/en/publication/68999", kind: "authority", note: "Current edition published July 2026. Its equipment scope excludes the vehicle main structure and certain purely mechanical substructures." },
  { id: "roechling-rail-fabrication", title: "Röchling: rail-component design, fabrication and assembly", url: "https://www.roechling.com/industrial/vehicle-construction/rail-technology-and-vehicles", kind: "industry", note: "Application evidence for engineering, machining, bonding, screw connections, painting and quality checks. Its certifications do not apply to F1; the drawing and interface questions here are an original procurement framework." },
  { id: "frp-connection-review", title: "Strongwell (ACMA Pultrusion Conference): FRP connection limit states", url: "https://www.strongwell.com/wp-content/uploads/2022/03/21-0414_ACMA-Presentation-Vantage.pdf", kind: "industry", note: "Technical presentation hosted by Strongwell, especially slide 19, identifies bearing, shear-out, net-section and prying failure modes. This is background for reviewing connections, not a railway design standard or source of numerical F1 allowables." },
  { id: "iso-rail-quality", title: "ISO 22163:2023: railway quality-management scope", url: "https://www.iso.org/standard/79427.html", kind: "authority", note: "Official overview establishes railway supply-chain quality and defect-prevention context. The release checklist is original engineering guidance, not a reconstruction of its clauses; no F1 certification is asserted." },
];

const railStandards: PultrusionGuide["standards"] = [
  { name: "EN 45545-2:2020+A1:2023", category: "Standard", jurisdiction: "EU rail vehicles within the LOC&PAS TSI, and other railway programs and contracts adopting this standard", applies: "Reaction-to-fire performance of railway-vehicle materials and products. Operation and design categories under Part 1 inform the hazard level.", limits: "The vehicle customer must identify the component requirement set and hazard level. A result does not establish structural fire resistance, crash performance or approval of an entire vehicle.", sourceIds: ["en-rail-fire"] },
  { name: "IEC 61373:2026", category: "Standard", jurisdiction: "Railway equipment programs where this test standard is applicable", applies: "Shock and vibration testing of equipment attached to the vehicle's main structure, within the stated equipment scope.", limits: "Not a blanket test standard for every profile: the main vehicle structure and mechanical substructures without electrical, electronic or pneumatic components are excluded. The OEM determines applicability to the equipment assembly. This edition replaces 2010.", sourceIds: ["iec-rail-vibration"] },
];

const carbonImage = "/images/products/wind-turbine-blade-panels/pultruded-carbon-fiber-wind-blade-panel.webp";
const railImage = "/images/products/standard-profiles-cover.jpg";

export const advancedGuides: PultrusionGuide[] = [
  {
    kind: "application",
    slug: "cfrp-concrete-strengthening",
    name: "CFRP concrete strengthening",
    title: "CFRP Concrete Strengthening | Pultruded Strip Guide",
    description: "Specify pultruded CFRP strips for concrete strengthening: existing-structure assessment, bonding, installation controls, inspection and system qualification.",
    heading: "Pultruded CFRP strips for strengthening concrete",
    summary: "A carbon strip becomes structural reinforcement only when its load can enter and leave the existing concrete safely. Start with the condition and required capacity of the structure, then specify the strip, adhesive, substrate preparation and acceptance process together.",
    scope: "F1 can review a component qualification inquiry for pultruded reinforcement against a supplied specification. An accepted strengthening kit, structural design, adhesive selection and site installation require identified specialist responsibilities and project evidence.",
    material: "Project-qualified carbon-fiber laminate, typically with an epoxy matrix; compatible adhesive and substrate repair system selected as an assembly.",
    profiles: ["Flat CFRP strips for externally bonded reinforcement", "Narrow strips considered for near-surface-mounted reinforcement", "Project-specific cut lengths and prepared bonding faces"],
    image: carbonImage,
    imageAlt: "Pultruded carbon-fiber panel used as a reference for continuous-fiber laminate geometry",
    imageCaption: "Reference material geometry from the F1 laminate range; not a photograph of a concrete-strengthening product or installed project.",
    sections: [
      {
        id: "define-the-intervention", title: "Define what the existing structure must do",
        paragraphs: [
          "A change of building use, increased equipment weight, revised loading or a damaged member can trigger a strengthening study. The first deliverable is an assessment of the existing structure: dimensions, reinforcement, material condition, current loading and the deficiency to be addressed. A strip schedule prepared before that assessment can solve the wrong problem. For example, adding longitudinal reinforcement to a beam does not by itself resolve an inadequate support or a shear-critical region.",
          "Commercial pultruded carbon laminates demonstrate that this is an established civil-engineering application. Each intervention still needs a defined load path and an accountable designer. Separate reinforcement of a sound member from repair of active deterioration; investigate the cause of cracking, corrosion or movement rather than covering the symptom with a bonded strip. The sequence of repairs, temporary support and loading is part of the design brief.",
        ], sourceIds: ["epsilon-strips", "aci-strengthening"],
      },
      {
        id: "reinforcement-position", title: "Choose the position of the reinforcement",
        paragraphs: [
          "Externally bonded strips follow a prepared face of the concrete. Near-surface-mounted strips sit in designed grooves. These arrangements create different construction interfaces: available face width and exposure matter for surface bonding, while cover, existing reinforcement and groove positioning matter for an embedded strip. The choice should be shown on a coordinated drawing with strip direction, termination and intersections, rather than left to the installer.",
          "For an existing floor, map reinforcement and services before proposing cuts. For a beam soffit, establish working access, interruptions at supports and the route for transferring force at each end. Treat curved surfaces, congested junctions, prestressed members and inaccessible terminations as specific design problems. An ordinary flat-strip inquiry does not include prestressing equipment, anchorage hardware or a complete prestressed strengthening system.",
        ], sourceIds: ["ead-strips"],
      },
      {
        id: "material-and-bond", title: "Specify the load-transfer system",
        paragraphs: [
          "Longitudinal stiffness determines how the added reinforcement participates in the member; tensile strength alone is insufficient to select it. The design brief should identify the required material data, test direction, statistical basis and environmental assumptions. Thickness and width define an area, but a larger area is useful only if the concrete and interfaces can develop its force. The reinforcement already present and the strain at the time of bonding also affect the intervention.",
          "Ask the engineer to address strip termination, intermediate cracking, interface failure, anchorage where required, and the consequences of losing the added reinforcement. Coordinate serviceability with ultimate resistance, including movement that may affect finishes or equipment. Existing joints and active cracks require their own treatment. This page provides questions for a specification; it does not provide allowable bond stress, a strip-count formula or a substitute for member calculations.",
        ], sourceIds: ["aci-strengthening"],
      },
      {
        id: "installation-planning", title: "Turn the design into a controlled installation",
        paragraphs: [
          "Use the selected system's current method statement and project specification. A manufacturer's published example shows why substrate assessment, repair, surface preparation, environmental checks, adhesive control and installation inspection belong in one procedure. Its application temperatures, adhesive thicknesses and curing periods are specific to that system; copying them to an unrelated laminate and resin combination would leave the interface unqualified.",
          "Prepare an installation plan with hold points and named signatories. Record the condition accepted before work, the repair materials, strip identification and the release to proceed. Define how overhead work, access restrictions and nearby operations affect the sequence. Keep the reinforcement protected during handling; carbon-fiber cutting dust is conductive, so plan collection and protection of nearby electrical equipment. State when the strengthened member may return to the intended loading.",
        ], sourceIds: ["sika-method"],
      },
      {
        id: "inspection-and-records", title: "Agree on the acceptance record before bonding",
        paragraphs: [
          "The inspection plan should connect a delivered strip batch to its installed location. Useful records include drawings, material certificates, adhesive identity, installer qualification, environmental observations, inspection results and photographs before access is closed. Agree on who reviews deviations such as a relocated strip, unexpected substrate defect or interruption during installation. Acceptance of the delivered material and acceptance of the finished intervention are separate decisions.",
          "Select inspection methods with the system designer and installer, including their limits and any repair of inspected areas. A sound-looking surface cannot reveal every defect, while a local test cannot characterize every square meter of an installation. The purpose is an agreed evidence package with acceptance criteria and escalation rules. A manufacturer's installation example includes both pre-installation checks and post-installation quality control, demonstrating the need to plan both stages.",
        ], sourceIds: ["sika-method"],
      },
      {
        id: "service-and-maintenance", title: "Plan for exposure, damage and future alterations",
        paragraphs: [
          "The operating environment belongs in the original design: moisture, chemicals, temperature, impact, abrasion, ultraviolet exposure and the required fire strategy may lead to different protection details. A high glass-transition value for a laminate does not establish the allowable temperature of the adhesive or the fire resistance of a strengthened member. Identify the controlling element of the assembled system and the evidence needed for the intended service.",
          "Create an accessible as-built record so a later contractor can locate the reinforcement before drilling, chasing services or changing finishes. The maintenance plan should define inspection access, reportable changes and who assesses new cracks, edge lifting, impact marks or damaged protection. Following fire, a significant impact or an increase in loading, arrange a structural review. Cosmetic repair should not conceal damage before its significance has been determined.",
        ], sourceIds: ["aci-strengthening"],
      },
      {
        id: "qualification-route", title: "Procure a defined scope with a qualification route",
        paragraphs: [
          "Distinguish a laminate manufacturer, a strengthening-system supplier, the structural designer and the installation contractor. Purchasing a pultruded plate addresses only one part of that chain. If a project requires an assessed kit, confirm the actual product combination and documented intended use before substituting any component. A source's successful bridge project is evidence of that source's work, not transferable approval for another supplier.",
          "For component development, agree on a staged decision: review the design inputs, identify the proposed material and surface, test representative samples, and resolve system compatibility before production release. Keep unverified properties marked as pending. F1's existing CFRP-related product content provides a manufacturing discussion starting point; it does not establish a tested concrete-strengthening kit. A useful inquiry states exactly which evidence the project needs and which party will accept it.",
        ], sourceIds: ["ead-strips", "epsilon-strips"],
      },
    ],
    standards: strengtheningStandards,
    specification: [
      "Project country, authority, design basis and responsible structural engineer.",
      "Existing-member drawings, reinforcement survey, condition assessment and current versus required loads.",
      "Externally bonded or near-surface-mounted arrangement; strip orientation, lengths, terminations and interfaces.",
      "Specified laminate stiffness, tensile properties, dimensional tolerances and required test or characteristic-value basis.",
      "Approved adhesive, repair materials, primer or surface treatment, and required evidence for their combination.",
      "Installation access, substrate condition, environmental limits, support requirements and loading restrictions.",
      "Service exposure, protective finish, fire design approach, inspection access and foreseeable alterations.",
      "Sample plan, material traceability, installation inspection, acceptance authority, quantities and delivery schedule.",
    ],
    faqs: [
      { question: "Can I replace any carbon strip with another of the same dimensions?", answer: "No. Stiffness, strength basis, surface condition and compatibility with the adhesive and substrate are part of the specified system. A substitution needs review by the designer and, where relevant, the system or assessment holder." },
      { question: "Is a pultruded strip the same product as carbon fabric?", answer: "No. A cured strip has a defined section and cannot conform to details in the same way as a fabric installed with resin. Their detailing, installation and qualification need separate consideration." },
      { question: "Does F1 offer an approved concrete-strengthening kit?", answer: "This page supports a component qualification inquiry. An approved kit, compatible adhesive, structural design and installation scope must be confirmed with project-specific documentation; none is established merely by the availability of a CFRP laminate." },
      { question: "Can a material test tell me how much load the building can carry?", answer: "No. The engineer must assess the existing structure and the strengthened load path, including concrete, connections, bond, other failure modes and serviceability. A laminate tensile result is an input to that work." },
      { question: "How do ACI CODE-440.13-24 and ACI PRC-440.2-23 differ?", answer: "The code sets minimum requirements within a defined scope when adopted for the project; the guide provides engineering guidance. Confirm the governing documents with the responsible designer. The code's publication does not make the guide obsolete, and neither document alone qualifies a supplied strip or an installed system." },
    ], sources: strengtheningSources,
    related: [
      { href: "/products/pultruded-cfrp-strengthening-strips", label: "CFRP strip procurement and qualification" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
      { href: "/industries/infrastructure", label: "Infrastructure industry" },
    ],
  },
  {
    kind: "application",
    slug: "carbon-fiber-industrial-rollers",
    name: "Carbon-fiber industrial rollers",
    title: "Carbon-Fiber Industrial Rollers | Web Handling Guide",
    description: "Define carbon roller requirements for film, printing and nonwoven lines: load paths, rotor behavior, surfaces, end fittings, commissioning and qualification.",
    heading: "Carbon-fiber components for industrial rollers",
    summary: "A light tube is only the starting point for a production roller. The working surface, end connections, bearings and rotating assembly must deliver the required web handling, dimensional accuracy and machine behavior together.",
    scope: "F1 can review a CFRP component feasibility and qualification inquiry. Precision finishing, end fittings, balancing, bearings and qualification of a finished roller must be separately defined and confirmed; they are not assumed supply capabilities.",
    material: "Application-specific CFRP tube construction, potentially requiring transverse or angled reinforcement as well as longitudinal fibers.",
    profiles: ["Candidate CFRP roller shells", "Longitudinal reinforcement for an engineered hybrid shell", "Tube components with agreed machining and surface allowances"],
    image: carbonImage,
    imageAlt: "Continuous carbon-fiber laminate shown as a material reference for reinforcement design",
    imageCaption: "Reference carbon-laminate geometry; not a photograph of a finished industrial roller, roller tube or customer installation.",
    sections: [
      {
        id: "roller-duty", title: "Identify the roller's process duty",
        paragraphs: [
          "A free-running guide roller redirects a moving web. A driven roller transfers torque, while a contact or process roller may carry a controlled nip load or apply a coating. Printing parts introduce further demands on mounting and the working surface. Before comparing materials, identify the duty and the production problem: excessive deflection, difficult handling, unstable tracking, vibration, surface damage or inadequate response during acceleration.",
          "Carbon roller applications are documented in film converting, printing and nonwoven machinery. Those examples involve engineered assemblies rather than interchangeable black tubes. A retrofit must preserve the machine interfaces and process geometry. Record the existing bearing arrangement, drive connection, web path and adjustment range, including conditions during threading, start-up and a process upset. These inputs explain what a candidate replacement must actually accomplish.",
        ], sourceIds: ["epsilon-rollers"],
      },
      {
        id: "reinforcement-architecture", title: "Choose reinforcement for more than bending stiffness",
        paragraphs: [
          "A predominantly longitudinal reinforcement layout provides the bending stiffness that limits shell deflection between bearings, but a roller also experiences local contact, end restraint and sometimes torsion. The proposed tube architecture should be reviewed against all those actions. Ask what carries hoop and shear loads, how the end region is supported, and whether holes or machined features interrupt important fibers. A catalog tensile modulus is not a complete tube design description.",
          "Industrial examples include pullwinding and structures combining pultruded reinforcement with wound layers. This distinction matters when a purchaser specifies 'pultruded carbon roller': the chosen architecture may require another process or a combination of processes. Confirm the actual construction and manufacturing scope before promising a straight substitution. A plain unidirectional tube should not inherit the properties or operating limits of a proprietary hybrid assembly.",
        ], sourceIds: ["epsilon-rollers", "epsilon-process"],
      },
      {
        id: "loads-and-dynamics", title: "Connect web loads to rotor behavior",
        paragraphs: [
          "Provide web tension, wrap angle, contact width and the distances between load application points and bearings. Include nip forces and drive torque where present, together with maximum speed, routine operating speed and acceleration. These allow the responsible engineer to build the loading model and consider deflection, local shell behavior and the end connections. A line-speed figure without diameter and support geometry is an incomplete mechanical brief.",
          "Agree on how the assembled rotor will be assessed across its operating range. Its behavior depends on the shell, journals, bearings, attachments and supports. Balancing reduces the effects of mass eccentricity; it does not remove every possible vibration mechanism. A satisfactory static deflection calculation does not establish a safe dynamic operating range. The machine specialist should identify the relevant rotor behavior, modes and acceptance measurements before choosing a balancing specification. State the first bending critical speed of the assembled rotor and the required margin to maximum operating speed; that margin decides whether rigid-rotor (ISO 21940-11) or flexible-rotor (ISO 21940-12) procedures apply.",
        ], sourceIds: ["iso-rigid", "iso-flexible"],
      },
      {
        id: "surfaces-and-ends", title: "Treat the surface and end fittings as functional parts",
        paragraphs: [
          "Define the web-facing surface by its task: traction, release, marking sensitivity, wear or a process-specific finish. Specify a measurement method and acceptance condition for roughness, profile and run-out. Temperature, process liquids and cleaning agents can affect a coating or an adhesive differently from the carbon laminate. Include both normal operation and cleaning cycles in the exposure schedule rather than asking only whether carbon fiber resists a named chemical.",
          "At each end, identify the route for radial force, axial restraint and torque. Bonded inserts, mechanical retention and bearing seats require their own drawings and evidence. Carbon laminate is electrochemically noble relative to aluminum and steel, so where moisture, process liquid or washdown can reach a metal journal or insert, specify an isolating layer, a sealed interface and drainage, and record the metal grade on the end-fitting drawing. Ask how assembly and disassembly are performed without damaging the shell. Where static control is required, assess the complete path through coatings, end fittings, bearings and the machine; the presence of conductive carbon fibers is insufficient to establish a specified surface or assembly resistance.",
        ], sourceIds: ["epsilon-rollers"],
      },
      {
        id: "installation-and-commissioning", title: "Commission the assembly in the actual machine",
        paragraphs: [
          "Before installation, compare the delivered item with the approved interface drawing and inspect transport supports, shell condition and protected surfaces. Use the handling and mounting method agreed for the component. Establish how bearing alignment, axial location and drive connection will be checked. If a new roller changes inertia or process response, the OEM should review the relevant machine settings and permitted operating sequence.",
          "Set commissioning stages and stop criteria with the machine team. Useful observations include bearing temperature, vibration, tracking, surface marking and behavior through acceleration and deceleration. Do not infer a permissible test speed from a competitor's brochure. The machine risk assessment must also address access to rotating parts and nip points during threading, operation and maintenance. Changes to a roller can require review of the installation's guards and safe operating procedures.",
        ], sourceIds: ["iso-machinery", "osha-guarding"],
      },
      {
        id: "maintenance-and-failures", title: "Make deterioration visible and repair decisions controlled",
        paragraphs: [
          "Record the accepted assembly condition after commissioning so later inspections have a useful baseline. Identify the components that may be serviced by the operator and those that need specialist assessment. The maintenance plan should connect inspection frequency to duty, environment and consequences of failure. Avoid a generic promise that carbon rollers require no maintenance: bearings, coatings and connections remain working parts.",
          "Report changes such as unusual noise or vibration, surface scoring, exposed fibers, looseness at an end fitting or damage after a dropped tool. An apparently small impact can require a closer examination of the laminate. Do not restore appearance by uncontrolled sanding or drilling. Recoating, machining or replacing attachments can change geometry and mass distribution, so define which dimensional, balance and commissioning checks must be repeated after each permitted repair.",
        ], sourceIds: ["iso-machinery", "iso-rigid"],
      },
      {
        id: "qualification-and-supply", title: "Separate tube qualification from finished-roller acceptance",
        paragraphs: [
          "Use a responsibility schedule with separate entries for shell design, tube manufacture, end fittings, finishing, assembly, balancing and machine approval. A component supplier may only cover selected entries. Specify what each delivery includes, which characteristics are still unfinished and who accepts the final assembly. This prevents a tube quotation from being interpreted as a warranted process-performance offer.",
          "A practical development sequence begins with the original machine drawing and duty schedule, then reviews construction options and representative samples before releasing a prototype. Define the evidence needed at each decision point and preserve the identity of the laminate and adhesive processes used. F1 can assess a component inquiry against that brief; stock availability, precision roller production and complete assembly qualification must be confirmed separately for the proposed scope.",
        ], sourceIds: ["epsilon-process", "iso-machinery"],
      },
    ],
    standards: rollerStandards,
    specification: [
      "Machine and roller function; original interface drawing, web path and the problem to be solved.",
      "Outside and inside diameters, working face length, bearing span, journals, drive and mounting arrangement.",
      "Web material, width, tension, wrap angle, contact pressure or nip load, and torque where driven.",
      "Continuous and maximum speed, acceleration and deceleration, operating cycles and exceptional loads.",
      "Deflection, run-out, surface profile, roughness, vibration and balance acceptance requirements with measurement conditions.",
      "Process temperature, cleaning temperatures and chemicals, surface coating, static-control or hazardous-area requirements.",
      "Bare shell versus finished assembly; responsibilities for end fittings, adhesives, bearings, machining and balancing.",
      "Prototype quantity, inspection plan, traceability, commissioning owner, service access and permitted repair scope.",
    ],
    faqs: [
      { question: "Can a carbon tube replace a metal roller of the same dimensions?", answer: "Only after assessment of the complete duty and assembly. Deflection, torsion, local contact, end connections and rotor behavior may require different geometry or reinforcement even when the outer diameter is fixed." },
      { question: "Is dynamic balancing enough to prevent vibration?", answer: "No. It addresses unbalance under the agreed conditions. Rotor flexibility, structural resonance, bearings, mounting and process excitation need separate consideration by the machine specialist." },
      { question: "Does carbon fiber automatically make the roller antistatic?", answer: "No. Coatings and interfaces can interrupt the required electrical path. Specify the surface and assembly requirements and the method for verifying them in the finished configuration." },
      { question: "Can F1 supply a ready-to-run precision roller?", answer: "This page establishes a component inquiry route. A finished roller would require separately confirmed capabilities and responsibilities for the shell, end fittings, precision surface, bearings, balancing and machine acceptance." },
    ], sources: rollerSources,
    related: [
      { href: "/products/carbon-fiber-roller-tubes", label: "Roller-tube procurement and qualification" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
      { href: "/industries/industrial", label: "Industrial and chemical industry" },
    ],
  },
  {
    kind: "application",
    slug: "frp-rail-interior-profiles",
    name: "Rail interior and secondary profiles",
    title: "FRP Rail Interior Profiles | Fire Qualification Guide",
    description: "Plan railway interior and secondary pultruded profiles with a defined component function, EN 45545 fire evidence, connections, traceability and change control.",
    heading: "Pultruded profiles for rail interiors and secondary components",
    summary: "A railway profile needs a defined job, an agreed material construction and evidence for its actual installation. Fire behavior, mechanical retention, surface finish and service access should be specified together before choosing a section.",
    scope: "F1 can review custom-profile qualification inquiries against an OEM specification. Railway acceptance, requirement sets, hazard levels and test coverage must be confirmed for the offered component; no vehicle approval or HL classification is implied.",
    material: "Project-defined glass-fiber laminate and fire-retardant resin, including every surface layer and bonded interface relevant to the component evaluation.",
    profiles: ["Interior-panel and ceiling support rails", "Secondary cover and service-hatch framing", "Cable-protection covers and equipment-enclosure edge profiles"],
    image: railImage,
    imageAlt: "Standard pultruded profile sections used as reference cross-section geometries",
    imageCaption: "Reference profile geometries; not qualified railway products or photographs of a rail-vehicle installation.",
    sections: [
      {
        id: "component-location", title: "Start with a component location and function",
        paragraphs: [
          "Long, repeatable cross-sections can be considered for interior panel rails, secondary ceiling supports, equipment-cover edges and service-hatch frames. These are candidate locations for an OEM review, not a list of approved substitutions. State what the part supports, how occupants or maintenance staff can contact it, and what happens if it detaches. A small panel support above passengers has different consequences from a protected cover inside a service compartment.",
          "Map the component within the vehicle drawing, including neighboring materials, exposed faces and fixing points. Decide whether the inquiry concerns a bare length, machined profile, finished component or assembly. Primary carbody members, crash structures, restraint attachments and fire barriers require their own design and qualification routes; a successful secondary profile does not establish suitability for those duties.",
        ], sourceIds: ["en-rail-fire"],
      },
      {
        id: "material-selection", title: "Specify a repeatable material construction",
        paragraphs: [
          "The material definition should include reinforcement arrangement, resin formulation, relevant additives, surface veil and any coating or bonded layer. A resin category such as polyester, vinyl ester or phenolic is too broad for procurement. Record the intended manufacturing process and the resulting component construction so that test samples can be related to serial production. Surface appearance and fire behavior must be addressed on the same drawing and material schedule.",
          "BÜFA's published portfolio confirms that resins can be formulated for pultrusion and fire-retardant applications. Its wider rail examples also use other composite processes. That is useful evidence of material-system development, not proof that every illustrated railway component is pultruded. Select a formulation with the manufacturer and then establish the evidence needed for the proposed section and finish. Do not transfer results from an unrelated infusion panel or gelcoat combination.",
        ], sourceIds: ["buefa-resins", "buefa-fire"],
      },
      {
        id: "fire-evidence", title: "Build a fire-evidence matrix for the actual part",
        paragraphs: [
          "Ask the vehicle customer to specify the applicable standard edition, component requirement set and hazard level. Record them alongside the part number and installation location. The report package should identify tested construction, thickness, surfaces, test configuration and any stated field of application. A general 'fire-retardant' label is not enough to match a supplied component to a vehicle requirement.",
          "EN 45545-2 concerns reaction to fire of railway materials and products; it does not by itself establish a load-bearing fire-resistance period. This guide addresses EN 45545-2 evidence: North American passenger rail and transit programs typically specify material tests under 49 CFR 238.103 or NFPA 130, and Chinese multiple-unit programs TB/T 3237. Keep those questions separate in the design review. Claims such as halogen-free or a small-specimen flammability classification address different properties and cannot substitute for the specified railway evidence. When a required test or report is missing, identify it as a qualification task with an owner, sample construction and acceptance decision.",
        ], sourceIds: ["en-rail-fire", "buefa-fire"],
      },
      {
        id: "loads-and-connections", title: "Design the interfaces that keep the component in place",
        paragraphs: [
          "Describe the loads at the component level: its own weight, supported equipment or panels, access forces, repeated operation of a cover, vibration and foreseeable handling damage. The OEM should identify relevant load cases and acceptance limits. A straight-profile material test does not determine the capacity of a drilled end, a clip or a bonded bracket. Include local bearing, edge distances, attachment stiffness and the route into the supporting structure in the review.",
          "For bolted interfaces, establish the clamping arrangement and how the laminate is protected from damaging local compression. For bonded details, define compatible substrates, surface preparation and production controls. Account for differential movement between composite profiles, metal structures and large panels. Service removal should have an intended sequence so a routine maintenance action does not pry against an unsupported flange or disturb an adjacent safety-critical attachment.",
        ], sourceIds: ["frp-connection-review", "roechling-rail-fabrication"],
      },
      {
        id: "vibration-and-fit", title: "Qualify the assembly under an applicable test plan",
        paragraphs: [
          "Begin with fit and function: verify interfaces, panel engagement, clearance, installation access and removal space on a representative build. Then select mechanical tests against the defined duty. Agree on whether samples include production drilling, fasteners, adhesive, finish and neighboring parts. An isolated coupon can characterize a material but cannot demonstrate that an assembled cover stays retained or that a hinge interface survives the required operating cycles.",
          "IEC 61373:2026 provides shock and vibration requirements for railway equipment within its scope. It is not a blanket requirement for every interior rail: the vehicle main structure and certain purely mechanical substructures are excluded. Have the OEM decide whether the equipment assembly falls within that scope or needs another program-specific load and test basis. Identify the correct category and edition in the contract rather than adding a generic 'rail vibration certified' claim.",
        ], sourceIds: ["iec-rail-vibration"],
      },
      {
        id: "installation-and-maintenance", title: "Preserve the approved configuration through service",
        paragraphs: [
          "Release installation drawings with the permitted cutting, drilling, edge treatment and fastening details. Include inspection of machined features and the method for confirming correct engagement of clips or joints. Mark components so delivered batches remain linked to the material and inspection records. Define how damaged or mismatched parts are handled before the assembly is closed, and retain access to the fixings that need maintenance.",
          "A service plan should identify reportable cracks, loose fixings, damaged edges, loss of finish and changes in fit. Specify compatible cleaning products and the party authorized to assess repairs. Replacement paint, adhesive, decorative film or an altered wall thickness may change the configuration that was evaluated. Treat such changes as engineering decisions with documented acceptance; maintenance convenience is not evidence that the original qualification still applies.",
        ], sourceIds: ["buefa-fire"],
      },
      {
        id: "program-release", title: "Make qualification and production release distinct decisions",
        paragraphs: [
          "The procurement package should distinguish a feasibility sample from a qualified serial component. Assign responsibility for design review, fire testing, mechanical validation, first-article inspection and final OEM release. Establish which material or process changes require notification. A useful quality record connects formulation, reinforcement, production batch, dimensions, machining and finish to the tested or otherwise accepted configuration.",
          "For an F1 inquiry, provide the vehicle program requirements first. A profile shape can then be considered alongside the necessary material and process development. Avoid ordering 'HL3 profile' without a component definition, required evidence and acceptance route. The aim is a reviewable supply scope with clear pending tasks, not an implied vehicle certification based on a material name or a general-purpose catalog section.",
        ], sourceIds: ["en-rail-fire", "buefa-resins"],
      },
    ],
    standards: railStandards,
    specification: [
      "Country, vehicle program, OEM specification versions and the authority accepting the component.",
      "Installed location, part function, neighboring materials, exposed faces and consequences of detachment.",
      "Fire standard edition, component requirement set and hazard level provided by the customer.",
      "Section drawing, wall thickness, length, finish, coating, adhesive and relevant assembly construction.",
      "Mechanical load cases, equipment masses, operating cycles, vibration basis and connection drawings.",
      "Machining, edge treatment, installation sequence, inspection access and replacement requirements.",
      "Representative specimen configuration, qualification tests, first-article acceptance and report traceability.",
      "Prototype and production quantities, batch marking, change-notification rules and delivery milestones.",
    ],
    faqs: [
      { question: "Does a flame-retardant resin make the finished profile rail approved?", answer: "No. The supplied construction and its test evidence must match the component's required performance and installation context. Resin information is only one input to that assessment." },
      { question: "Can I specify HL3 without a requirement set?", answer: "The customer must identify both the applicable component requirements and hazard level. A hazard-level label alone does not define the tests, construction or report coverage needed for a particular part." },
      { question: "Must every interior profile be tested to IEC 61373?", answer: "No. That standard has a defined equipment scope and exclusions. The OEM should establish whether the assembly falls within it and specify the appropriate mechanical qualification program." },
      { question: "Can a qualified profile be repainted without review?", answer: "The proposed finish must be checked against the accepted construction and report scope. A change in coating, adhesive, film or another constituent can require additional evaluation." },
    ], sources: railSources,
    related: [
      { href: "/products/fire-retardant-rail-profiles", label: "Rail-profile procurement and qualification" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
      { href: "/industries/vehicle", label: "Automotive and rail industry" },
    ],
  },
  {
    kind: "product",
    slug: "pultruded-cfrp-strengthening-strips",
    name: "Pultruded CFRP strengthening strips",
    title: "Pultruded CFRP Strengthening Strips | Specification",
    description: "Prepare a CFRP strip qualification inquiry with section geometry, laminate data, bonding-face requirements, batch evidence and system compatibility.",
    heading: "Specify a CFRP strip component for a strengthening system",
    summary: "The purchase specification for a carbon strip should define its dimensions, longitudinal material data, bonding face and traceability. System compatibility and structural acceptance remain explicit project requirements.",
    scope: "Component qualification inquiry only: F1 can assess a supplied strip specification and required evidence. Stock sizes, assessed strengthening kits, adhesive compatibility and approvals require confirmation before an offer is accepted.",
    material: "Specified carbon-fiber laminate with a qualified resin and controlled bonding surface.",
    profiles: ["Flat strip with specified width and thickness", "Cut lengths identified to the reinforcement schedule", "Narrow strip geometries considered for a designed groove"],
    image: carbonImage,
    imageAlt: "Carbon-fiber pultruded panel shown as a reference laminate geometry",
    imageCaption: "Reference material geometry; no strengthening-kit approval or installed application is represented.",
    sections: [
      {
        id: "geometry-and-delivery", title: "Put the functional geometry on the purchase drawing",
        paragraphs: [
          "Give each strip a part number linked to width, thickness, length and the permitted tolerances. Define how those dimensions are measured and whether the requirement applies before or after any surface treatment. Include straightness, edge condition and end-cut requirements where they affect fitting or bonding. A supplier needs the actual section rather than an approximate area calculated from a rounded catalog dimension.",
          "State whether delivery is in individual lengths or another agreed format, and establish transport and handling requirements for that format. The reinforcement drawing should identify orientation and installed position without relying on removable packaging. If lengths will be cut on site, assign the cutting procedure, identification transfer and final inspection to a named party. Material availability and packaging geometry are quotation items, not assumed stock commitments.",
        ], sourceIds: ["ead-strips", "sika-method"],
      },
      {
        id: "laminate-data", title: "Request material data on an agreed basis",
        paragraphs: [
          "Specify the properties needed by the designer, including longitudinal stiffness and tensile behavior, together with the applicable test method and acceptance basis. Distinguish typical development data from declared or statistically established design inputs. The source of a value, specimen orientation, conditioning and representative production construction should be identifiable. An isolated high test result is not a procurement specification. ISO 10406-3:2019 gives test methods for pultruded CFRP strips used as externally bonded reinforcement; on European projects the bonding adhesive is normally declared under EN 1504-4.",
          "Define the permitted reinforcement and matrix system and how changes are controlled. Where thermal or environmental performance matters, agree on the evidence and conditioning relevant to the project. A carbon strip's resin temperature data should not be presented as the service limit of an adhesive joint. The purchaser should state which characteristics are mandatory for tender review and which need to be established during development.",
        ], sourceIds: ["aci-strengthening", "iso-cfrp-strip"],
      },
      {
        id: "surface-and-kit", title: "Make the bonding face a controlled interface",
        paragraphs: [
          "Identify the intended bonding face, its surface preparation, protection during transport and compatibility requirements. Surface texture alone does not demonstrate a qualified adhesive interface. The system owner should determine the acceptance evidence for the actual strip, adhesive, concrete and any repair layer. Preserve the identity of the proposed materials during sample evaluation so the production component can be compared with what was accepted.",
          "Define whether the order covers only strips or components of an assessed kit. Include exclusions and interfaces in the quotation, such as adhesive supply, site preparation and installation supervision. If an existing system approval is a project requirement, check its exact products and allowed variations before purchasing an alternative strip. A reference to an assessment document is not evidence that the offered material belongs to an assessed system.",
        ], sourceIds: ["ead-strips"],
      },
      {
        id: "acceptance-and-traceability", title: "Agree on sample release, inspection and batch records",
        paragraphs: [
          "Set a qualification stage before serial delivery: approve the drawing and material proposal, identify representative samples and agree on test acceptance. The inspection plan can cover dimensions, visual condition, bonding-face protection and the specified material tests. Record the criteria for disposition of damaged edges, surface contamination or mismarked pieces. Do not leave rework decisions to a generic visual-quality statement.",
          "Request a delivery record that connects the part number and batch to the relevant material and inspection evidence. Specify how identification survives unpacking, cutting and installation. Agree on protective packaging, handling instructions, storage conditions and an incoming-inspection period. These controls support a traceable component purchase; final acceptance of the strengthened member also requires the system designer's and installer's project records.",
        ], sourceIds: ["aci-strengthening"],
      },
    ],
    standards: strengtheningStandards,
    specification: [
      "Part-numbered strip schedule: width, thickness, length, quantity, tolerances and measurement conditions.",
      "Material system, required property basis, test methods, conditioning and acceptance criteria.",
      "Bonding-face definition, protection and the intended adhesive/system qualification evidence.",
      "Externally bonded (EB) or near-surface-mounted (NSM) use, drawing revision and responsible designer or kit supplier.",
      "Prototype and serial release requirements, inspection records, marking and traceability.",
      "Delivery format, handling constraints, destination, storage period and installation program.",
    ],
    faqs: [
      { question: "Are these catalog stock strips?", answer: "This is a specification and qualification route. Dimensions, availability, minimum order and evidence requirements must be reviewed before a product offer is confirmed." },
      { question: "Is adhesive included?", answer: "Only if expressly included in an agreed scope with compatibility and system evidence. A strip-only quotation does not establish an accepted strengthening kit." },
      { question: "Can wind-blade laminate data be used for this strip?", answer: "Not automatically. The offered construction, bonding interface, property basis and intended strengthening use need project qualification." },
      { question: "Can a wide plate be slit on site under EAD 160086-01-0301?", answer: "No. Its scope excludes strips cut on site to the required width. Specify the factory-produced width and thickness. Cutting to length is a separate installation operation that must follow the selected kit's instructions and the project specification." },
    ], sources: strengtheningSources,
    related: [
      { href: "/applications/cfrp-concrete-strengthening", label: "Concrete-strengthening application guide" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
    ],
  },
  {
    kind: "product",
    slug: "carbon-fiber-roller-tubes",
    name: "Carbon-fiber roller tube components",
    title: "Carbon-Fiber Roller Tubes | Component Procurement Guide",
    description: "Specify CFRP roller tube geometry, reinforcement, machining allowances, end interfaces and inspection without assuming finished-roller qualification.",
    heading: "Carbon-fiber tube components for an engineered roller",
    summary: "A tube inquiry should identify the structural shell and the work needed to turn it into a roller. Separate material and geometry requirements from precision finishing, assembly, balancing and machine acceptance.",
    scope: "F1 can assess a component feasibility inquiry against a drawing and load schedule. Tube process, dimensions, machining, end fittings and finished-roller services are subject to technical review and explicit scope confirmation.",
    material: "CFRP construction selected for the proposed shell duty; longitudinal, transverse and angled reinforcement requirements must be defined.",
    profiles: ["Candidate tubular roller shells", "Shell blanks with controlled machining allowances", "Pultruded reinforcement elements for a separately designed assembly"],
    image: carbonImage,
    imageAlt: "Carbon laminate reference showing continuous-fiber reinforcement geometry",
    imageCaption: "Reference carbon material geometry; this image does not show a roller tube or establish finished-roller manufacturing capability.",
    sections: [
      {
        id: "shell-drawing", title: "Define the shell and its datums",
        paragraphs: [
          "Provide outside diameter, inside diameter or wall definition, length and the surfaces used as datums. Explain whether tolerances apply to a manufactured blank or a finished component. Specify straightness, roundness and concentricity only with the measurement length, support and condition needed to interpret them. A long shell supported differently during inspection can produce a different observation, so agreement on the method is as useful as a tolerance number.",
          "Show the working face, end insertion zones, shoulders and any areas that will later be machined. Define allowances without assuming that unlimited material can be removed from the laminate. Add the mating-end drawings or identify the party developing them. If outer diameter is fixed by the machine, include the available space for wall thickness, coatings and end features so the material proposal can address the real envelope.",
        ], sourceIds: ["iso-geometric", "iso-datums", "epsilon-rollers"],
      },
      {
        id: "construction-and-inputs", title: "Specify the duty before selecting a construction",
        paragraphs: [
          "The shell brief needs bearing span, radial loads, torsion where driven, operating speed and the intended connection arrangement. Provide stiffness targets and local-contact conditions along with any mass objective. Ask the supplier to identify the proposed reinforcement architecture and its limitations. A requirement for carbon fiber does not by itself specify bending stiffness, shear response or resistance to local pressure.",
          "Some established roller constructions use pullwinding or combine pultruded elements with wound layers. That application evidence is a reason to evaluate process suitability, not a promise that one process can cover every tube. Confirm whether the proposed component can be made within the available manufacturing scope, then agree on representative test evidence. If the required construction needs a specialist partner or another process, resolve that before tooling or production commitments.",
        ], sourceIds: ["epsilon-process"],
      },
      {
        id: "finishing-and-assembly", title: "List every operation beyond the tube blank",
        paragraphs: [
          "Create a scope table for cutting, machining, end-fitting supply, bonding, coating, grinding, assembly and balancing. Mark the responsible party and acceptance point for each operation. The first delivery may intentionally be an unfinished shell; the drawing and packaging should make that status clear. A material supplier's inspection report should not be interpreted as acceptance of work performed later by an assembler.",
          "For surface coatings, define the contact material, cleaning exposure, profile and roughness required by the process. For end fittings, agree on fit, retention, installation loads, galvanic isolation from metal journals and the inspection of the completed joint. For static control, request the applicable surface and assembly test rather than an assumption based on fiber conductivity. These interface decisions can influence the shell design, so communicate them before approving its nominal dimensions.",
        ], sourceIds: ["epsilon-rollers", "iso-rigid", "iso-flexible"],
      },
      {
        id: "acceptance-stages", title: "Keep component acceptance separate from rotor acceptance",
        paragraphs: [
          "Agree on incoming checks for geometry, visual condition, identification and specified material evidence. State how transport damage is documented and who can authorize rework. For a prototype, include a review of manufacturing deviations before the component is built into an assembly. Inspection of an inaccessible surface or joint may need to happen earlier in the sequence; the quality plan should identify that hold point.",
          "The finished-rotor specification belongs to the party responsible for the assembled roller. It should address the actual attachments, service speed, balancing basis and machine checks. A balance requirement cannot be verified on a bare shell as though journals, coatings and bearings were already present. Preserve records through subsequent operations, and define which changes require renewed acceptance. The final release should identify both the delivered configuration and the limits of the approved use.",
        ], sourceIds: ["iso-rigid", "iso-flexible"],
      },
    ],
    standards: rollerStandards.slice(0, 2),
    specification: [
      "Shell drawing with datums, OD/ID, length, wall definition and tolerances for the actual delivery stage.",
      "Bearing span, load schedule, torque, speeds, temperature, mass and stiffness targets.",
      "Proposed reinforcement architecture, required material evidence and process restrictions.",
      "End-fitting drawings, insertion zones, machining allowances and assembly responsibilities.",
      "Working surface, coating, cleaning exposure, static requirements and finish acceptance.",
      "Prototype inspection, production traceability, packaging, balancing owner and final assembly acceptance.",
    ],
    faqs: [
      { question: "Does the tube quotation include balancing?", answer: "Only if specifically included and technically defined. Balancing and final rotor acceptance normally depend on the complete configuration, including end fittings and surface treatments." },
      { question: "Can I machine a standard tube to the final roller diameter?", answer: "Only within an approved machining plan and allowance. Removing material can interrupt reinforcement and change structural performance, so the laminate and final geometry must be reviewed together." },
      { question: "Is a pultruded carbon tube suitable for every driven roller?", answer: "No. Torque, local pressure and end connections may require reinforcement directions or a manufacturing process beyond a predominantly longitudinal pultrusion." },
    ], sources: rollerSources,
    related: [
      { href: "/applications/carbon-fiber-industrial-rollers", label: "Industrial-roller application guide" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
    ],
  },
  {
    kind: "product",
    slug: "fire-retardant-rail-profiles",
    name: "Fire-retardant rail profile components",
    title: "Fire-Retardant Rail Profiles | Component Specification",
    description: "Prepare a railway profile inquiry with a controlled cross-section, material and finish schedule, fire-test coverage, first-article inspection and traceability.",
    heading: "Specify a pultruded profile for a railway qualification program",
    summary: "The purchase definition needs a part drawing and a controlled material construction, followed by evidence matched to the OEM's component requirements. A hazard-level label alone is not a complete specification.",
    scope: "Custom-profile qualification inquiry. F1 can assess drawings and required evidence; railway test coverage, classification, approval and serial production release must be confirmed for the specific offered construction.",
    material: "Specified glass-fiber laminate, fire-retardant resin and surface system controlled to the evaluated component construction.",
    profiles: ["Panel-retention and support sections", "Secondary frames and cover-edge profiles", "Custom channels and closure sections for an OEM-defined component"],
    image: railImage,
    imageAlt: "Pultruded structural shapes illustrating possible section geometries",
    imageCaption: "Reference section geometries from general pultrusion; no railway fire classification or installed vehicle application is represented.",
    sections: [
      {
        id: "part-definition", title: "Specify a part number rather than a material label",
        paragraphs: [
          "The purchase drawing should define section geometry, wall thickness, length, tolerances and the datums that control fit. Identify visible and hidden surfaces, mating parts and the interfaces that retain a panel or cover. Detail holes, slots, cut ends and any required edge treatment. Provide the finished-part drawing even when the initial quotation concerns a raw length, because later machining can influence the section and manufacturing proposal.",
          "Clarify delivery scope: unmachined profile, cut and drilled component, coated part or an assembled item. Include appearance criteria and a reference sample where useful, with a method for judging color and visible defects. State which variations are functional, cosmetic or subject to OEM review. This allows an inspection plan to target the characteristics that actually control installation and acceptance.",
        ], sourceIds: ["roechling-rail-fabrication", "en-rail-fire"],
      },
      {
        id: "controlled-construction", title: "Freeze the constituents and finish that matter to qualification",
        paragraphs: [
          "Create a material schedule covering reinforcement, resin, relevant additives, surface veil, coating and any bonded interface included in the supplied component. Identify the process and the production characteristics that must remain consistent with the accepted samples. A generic formulation description cannot support meaningful change control; the customer and supplier need a shared method for identifying the approved construction and subsequent revisions.",
          "BÜFA's resin offering provides a useful example of material selection for pultrusion. It does not authorize an assertion that a profile made with a named resin meets a rail requirement. Obtain the evidence for the actual proposed construction and record any restrictions. If the customer changes finish or geometry during development, review the evidence implications before simply carrying the earlier material description onto the new drawing.",
        ], sourceIds: ["buefa-resins", "buefa-fire"],
      },
      {
        id: "test-coverage", title: "Match the evidence package to the customer's requirements",
        paragraphs: [
          "Request the vehicle program, component location, applicable standard edition, requirement set and hazard level. The supplier's response should identify available reports, the represented material construction and any gaps requiring new work. Keep report identity and sample identity connected. A purchasing phrase such as 'rail approved' leaves the acceptance object unclear; name the component and the evidence the customer will use to approve it.",
          "Mechanical acceptance needs its own schedule alongside fire evidence. Define which requirements apply to the material, machined profile or complete assembly and who supplies the associated tests or calculations. Equipment vibration standards have defined scopes; they should not be added to every profile order without an applicability decision. Resolve this division before commissioning samples so the specimens are representative of the work they are intended to support.",
        ], sourceIds: ["en-rail-fire", "iec-rail-vibration"],
      },
      {
        id: "production-release", title: "Release production with traceability and change control",
        paragraphs: [
          "Agree on the sequence from drawing approval through representative samples and first-article inspection to serial release. The inspection plan should specify dimensional checks, surface condition, machining quality and identification. Where qualification remains pending, show that status explicitly on commercial and technical documents. Do not allow a prototype delivery or a successful fit check to be mistaken for the completion of all program requirements.",
          "Define batch marking, certificate content, retained records and packaging that protects exposed edges and finished faces. Establish how nonconforming pieces are segregated and who approves repairs. Require notification of changes to constituents, geometry or processes that could affect the accepted configuration. For spares, retain the approved drawing and material revision so a later order does not introduce an undocumented substitute into a vehicle already in service.",
        ], sourceIds: ["iso-rail-quality", "roechling-rail-fabrication"],
      },
    ],
    standards: railStandards,
    specification: [
      "OEM program, installed function, standard editions, requirement set and hazard level.",
      "Part-numbered section and finished-component drawings, datums, wall thickness and tolerances.",
      "Delivery stage: raw length, machined part, finished part or defined assembly.",
      "Material and surface schedule, colors, coatings, adhesives and proposed changes from tested construction.",
      "Required fire evidence, mechanical acceptance basis, representative samples and first-article review.",
      "Production release authority, marking, batch records, change control, spares and delivery program.",
    ],
    faqs: [
      { question: "Are all profiles on this page already HL3 classified?", answer: "No. This page describes a qualification inquiry. Classification and report coverage must be established for the offered construction and the component's specified requirements." },
      { question: "Can the same report cover different wall thicknesses and coatings?", answer: "Only where the report and accepted scope support the proposed variants. The customer should review the actual construction and documented coverage rather than assume all changes are included." },
      { question: "What should a first inquiry include?", answer: "Send the component drawing, its installed location, material and finish requirements, the OEM's fire and mechanical criteria, quantities and the intended qualification schedule." },
    ], sources: railSources,
    related: [
      { href: "/applications/frp-rail-interior-profiles", label: "Rail-interior application guide" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
    ],
  },
];
