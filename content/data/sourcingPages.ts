export type SourcingGroup = "equipment" | "materials";
export interface SourcingPage {
  slug: string;
  name: string;
  group: SourcingGroup;
  title: string;
  description: string;
  intro: string;
  rows: [string, string, string][];
  checks: { title: string; body: string }[];
  inputs: string[];
  faq: { question: string; answer: string }[];
  related: string[];
  flow: string[];
  image: string;
  imageAlt: string;
}
export const sourcingPages: SourcingPage[] = [
  {
    slug: "pultrusion-machines",
    name: "Pultrusion Machines",
    group: "equipment",
    title: "Pultrusion Machines | Specification & Sourcing",
    description: "Specify a pultrusion line around the profiles you plan to make. Review hydraulic or caterpillar pulling, resin handling, tooling and acceptance trials with F1.",
    intro: "Specify a pultrusion line around the profiles you plan to make. Review hydraulic or caterpillar pulling, resin handling, tooling and acceptance trials with F1.",
    rows: [
      [
        "Product and output",
        "Cross-section drawings, material system, cut lengths and output target",
        "A trial plan using representative profiles and materials"
      ],
      [
        "Pulling system",
        "Hydraulic or caterpillar arrangement, working envelope and grip interface",
        "Pulling capability, grip behavior and control under agreed production conditions"
      ],
      [
        "Complete line",
        "Creels, guides, impregnation, die heating, puller, cutter and controls",
        "A module list that identifies included equipment and buyer-supplied utilities"
      ]
    ],
    checks: [
      {
        title: "Compare systems on the same product",
        body: "A headline pulling force does not describe the entire line. Ask each proposed supplier to address the same profile, reinforcement, resin and output target, including permitted defects and dimensional tolerances."
      },
      {
        title: "Define the factory interfaces",
        body: "Provide the available layout, incoming power, cooling, extraction and finished-length handling. Identify responsibility for foundations, utility connections and lifting access."
      },
      {
        title: "Agree factory and site acceptance",
        body: "Define the trial length or duration, dimensional checks, material testing and records. List commissioning, training, spares and support separately, with the responsible supplier named."
      }
    ],
    inputs: [
      "Profile drawings and resin/reinforcement system",
      "Product mix and required output",
      "Factory layout, power supply and utility limits",
      "New line or upgrade, and equipment already owned",
      "Acceptance criteria, destination and requested support"
    ],
    faq: [
      {
        question: "Is a caterpillar puller a complete pultrusion machine?",
        answer: "It is one line module. A complete scope also needs reinforcement handling, resin application, shaping and curing, cutting and coordinated controls. Confirm each module and interface in the proposed package."
      }
    ],
    related: [
      "pultrusion-dies",
      "resin-mixing-injection",
      "slitting-cutting-equipment"
    ],
    flow: [
      "Creel",
      "Impregnation",
      "Heated die",
      "Pulling",
      "Cut-off"
    ],
    image: "/images/sourcing/pultrusion-machines.svg",
    imageAlt: "Diagram of pultrusion machines showing the main specification interfaces"
  },
  {
    slug: "pultrusion-dies",
    name: "Pultrusion Dies & Tooling",
    group: "equipment",
    title: "Pultrusion Dies & Tooling | Specification & Sourcing",
    description: "Specify pultrusion dies, mandrels and preformers by section drawing, material and line interfaces. Review tooling ownership, trials and acceptance.",
    intro: "Prepare a pultrusion die inquiry with the section drawing, resin system, reinforcement and line interfaces. Define tooling ownership, trial parts and acceptance.",
    rows: [
      [
        "Forming geometry",
        "Section dimensions, radii, wall thickness, internal cavities and tolerances",
        "Approved cavity, mandrel and preformer drawings"
      ],
      [
        "Heating and mounting",
        "Line center height, die envelope, heater and sensor connections",
        "Mounting details and the agreed thermal-control interfaces"
      ],
      [
        "Tooling package",
        "Die, preformers, mandrels, injection interface and wear parts",
        "A tool list, drawing release process and trial-part inspection plan"
      ]
    ],
    checks: [
      {
        title: "Start with the production section",
        body: "Identify critical assembly dimensions and cosmetic faces. The tool maker must account for the chosen material and process when proposing cavity geometry; the finished-part drawing alone does not define the machining dimensions."
      },
      {
        title: "Resolve closed-section details",
        body: "Hollow profiles need a coordinated mandrel and support arrangement. Review how fibers pass through the preformers and how the tooling will be assembled, aligned and maintained."
      },
      {
        title: "Protect the handover",
        body: "Agree ownership, drawing access, permitted use, identification and replacement parts. Define where trials occur, which material is used and how modifications are approved."
      }
    ],
    inputs: [
      "Dimensioned profile drawing and tolerance priorities",
      "Resin, fibers, mat/veil and layup information",
      "Line mounting, heating and injection interfaces",
      "Expected volume and maintenance requirements",
      "Sample inspection criteria and tooling ownership terms"
    ],
    faq: [
      {
        question: "Does a new die guarantee a finished profile will meet its specification?",
        answer: "Tooling is one part of the process. Geometry, reinforcement, resin and production conditions must be validated together on trial profiles before production release."
      }
    ],
    related: [
      "pultrusion-machines",
      "fiberglass-direct-roving",
      "fiberglass-mat-veil"
    ],
    flow: [
      "Drawing",
      "Tool design",
      "Machining",
      "Line trial",
      "Sample approval"
    ],
    image: "/images/sourcing/pultrusion-dies.svg",
    imageAlt: "Diagram of pultrusion dies & tooling showing the main specification interfaces"
  },
  {
    slug: "resin-mixing-injection",
    name: "Resin Mixing & PU Injection",
    group: "equipment",
    title: "Resin Mixing & PU Injection | Specification & Sourcing",
    description: "Compare batch mixing and metered resin injection for composite production. Define material compatibility, dosing, cleaning and the connection to the line.",
    intro: "Compare batch mixing and metered resin injection for composite production. Define material compatibility, dosing, cleaning and the connection to the line.",
    rows: [
      [
        "Batch mixer",
        "Resin and filler system, batch size and mixing purpose",
        "A proposed mixing and transfer arrangement for the named formulation"
      ],
      [
        "Metering and mixing",
        "Component count, ratio basis, flow range and material viscosity",
        "The specified accuracy, monitoring and calibration method"
      ],
      [
        "PU injection package",
        "Component conditioning, mixing head and injection-box interface",
        "Compatibility confirmation and a trial using the proposed PU system"
      ]
    ],
    checks: [
      {
        title: "Identify the exact chemistry",
        body: "Provide the formulation supplier’s technical and safety documents. Pumps, seals, tanks and cleaning provisions must be selected for the actual materials and intended operating conditions."
      },
      {
        title: "Treat the injection box as an interface",
        body: "Confirm the connection between dosing equipment, mixing head, injection box and die. Agree how the package responds to line starts, stops and abnormal conditions."
      },
      {
        title: "Plan changeover and acceptance",
        body: "Define color or formulation changes, cleaning provisions, calibration checks and material consumption during trials. Request the operating documents and support scope from the proposed equipment supplier."
      }
    ],
    inputs: [
      "Resin/component technical data and safety data sheets",
      "Batch or continuous operation and output range",
      "Ratio requirements and filler content, where relevant",
      "Existing die and line interface drawings",
      "Changeover, acceptance and support requirements"
    ],
    faq: [
      {
        question: "Can a batch mixer be used as a PU metering unit?",
        answer: "These are different duties. A mixer blends a batch; a metering package delivers components in a controlled ratio and integrates with the injection process. Specify the required function before comparing offers."
      }
    ],
    related: [
      "pultrusion-machines",
      "pultrusion-dies",
      "gelcoat-resins"
    ],
    flow: [
      "Component A",
      "Component B",
      "Metering",
      "Mixing",
      "Line interface"
    ],
    image: "/images/sourcing/resin-mixing-injection.svg",
    imageAlt: "Diagram of resin mixing & pu injection showing the main specification interfaces"
  },
  {
    slug: "pullwinding-equipment",
    name: "Pullwinding Equipment",
    group: "equipment",
    title: "Pullwinding Equipment | Specification & Sourcing",
    description: "Specify pullwinding equipment for composite tubes. Coordinate the mandrel, winding heads, resin system, pulling controls and acceptance trials.",
    intro: "Define a pullwinding line for composite tubes with longitudinal and wound reinforcement. Coordinate the mandrel, winding heads, resin system and pulling controls.",
    rows: [
      [
        "Tube definition",
        "Inner and outer geometry, material and required laminate architecture",
        "A proposed tooling and reinforcement arrangement"
      ],
      [
        "Winding module",
        "Fiber feeds, winding directions and line coordination",
        "A control and tension-management proposal for the specified layup"
      ],
      [
        "Line integration",
        "Mandrel, impregnation, curing, pulling and cutting",
        "A complete interface list and trial plan"
      ]
    ],
    checks: [
      {
        title: "Separate the process from the rating",
        body: "Adding wound reinforcement changes the laminate architecture. Any pressure, torsion or structural duty must be specified and verified on the finished tube; the equipment description is not a tube performance rating."
      },
      {
        title: "Coordinate motion and reinforcement",
        body: "Identify the winding pattern, longitudinal reinforcement and process constraints. The supplier must show how winding and pulling are coordinated through the intended operating range."
      },
      {
        title: "Define representative trials",
        body: "Use the intended resin and reinforcement during acceptance. Agree how tube geometry, laminate condition and required product properties will be inspected, with records supplied at handover."
      }
    ],
    inputs: [
      "Tube dimensions, lengths and expected output",
      "Required reinforcement architecture and fiber types",
      "Intended tube duty and product acceptance criteria",
      "Mandrel and existing line details, if upgrading",
      "Factory utilities, destination and training scope"
    ],
    faq: [
      {
        question: "Is pullwinding interchangeable with ordinary pultrusion?",
        answer: "The processes share some line functions, but pullwinding adds controlled wound reinforcement and associated tooling and motion requirements. Confirm that the proposed line supports the actual laminate and geometry."
      }
    ],
    related: [
      "pultrusion-machines",
      "fiberglass-direct-roving",
      "resin-mixing-injection"
    ],
    flow: [
      "Axial fibers",
      "Winding heads",
      "Mandrel / die",
      "Cure",
      "Pull / cut"
    ],
    image: "/images/sourcing/pullwinding-equipment.svg",
    imageAlt: "Diagram of pullwinding equipment showing the main specification interfaces"
  },
  {
    slug: "slitting-cutting-equipment",
    name: "Mat Slitters & Profile Cutters",
    group: "equipment",
    title: "Mat Slitters & Profile Cutters | Specification & Sourcing",
    description: "Specify mat slitters and cured-profile cutters. Review feed handling, dimensions, line synchronization, extraction and cut-quality acceptance.",
    intro: "Specify roll slitting and cured-profile cutting as separate production tasks. Review material handling, dimensions, line synchronization and cut-quality acceptance.",
    rows: [
      [
        "Roll mat slitter",
        "Material construction, parent-roll width, core and required strip widths",
        "Slit-width tolerance, edge condition and rewind arrangement"
      ],
      [
        "Profile cut-off",
        "Cured section geometry, cut lengths and finish requirements",
        "A proposed cutting and support package"
      ],
      [
        "Line connection",
        "Standalone or synchronized cutting, feed and takeaway",
        "Controls, guarding and extraction responsibilities"
      ]
    ],
    checks: [
      {
        title: "Match the machine to the material state",
        body: "Dry mat and stitched fabric require controlled feeding and support. A cured profile is a different cutting task. Send representative samples or construction details for each proposed machine."
      },
      {
        title: "Specify usable output",
        body: "Define acceptable width variation, fraying, cut squareness and length tolerance. Include downstream use: a strip that cannot pass through the preformers is not an acceptable production result."
      },
      {
        title: "Include handling and extraction",
        body: "Identify roll lifting, feed support, finished-length handling and the required extraction interfaces. The quotation should identify the supplied guards and controls and the installation responsibilities."
      }
    ],
    inputs: [
      "Roll or profile material and representative samples",
      "Parent-roll dimensions or section drawing",
      "Required strip widths or cut lengths and tolerances",
      "Production rate and standalone/in-line duty",
      "Handling, extraction, power and destination"
    ],
    faq: [
      {
        question: "Does one machine cover mat slitting and finished-profile cutting?",
        answer: "Usually these require different cutting and handling arrangements. Request separate scope lines unless a proposed supplier demonstrates that a particular configuration can perform both duties."
      }
    ],
    related: [
      "fiberglass-mat-veil",
      "stitched-fiberglass-fabrics",
      "pultrusion-machines"
    ],
    flow: [
      "Material in",
      "Feed / support",
      "Slit or cut",
      "Inspect",
      "Pack out"
    ],
    image: "/images/sourcing/slitting-cutting-equipment.svg",
    imageAlt: "Diagram of mat slitters & profile cutters showing the main specification interfaces"
  },
  {
    slug: "smc-production-lines",
    name: "SMC Production Lines",
    group: "equipment",
    title: "SMC Production Lines | Specification & Sourcing",
    description: "Specify SMC sheet-compounding equipment. Review resin paste, chopped reinforcement, carrier film, compaction and the downstream molding interface.",
    intro: "Prepare an SMC sheet-compounding equipment inquiry. Define resin paste, chopped reinforcement, carrier film, compaction and the interface with downstream molding.",
    rows: [
      [
        "Compounding input",
        "Resin paste, reinforcement, film and target sheet construction",
        "A proposed feed, coating and chopping arrangement"
      ],
      [
        "Sheet formation",
        "Target sheet width, material distribution and compaction",
        "The supplier’s control and inspection plan"
      ],
      [
        "Downstream interface",
        "Take-up, handling, storage and molding requirements",
        "The boundary between sheet production and part molding"
      ]
    ],
    checks: [
      {
        title: "Define the SMC sheet specification",
        body: "Provide the formulation, reinforcement requirements and sheet acceptance criteria. The equipment proposal should explain how feed and distribution are controlled and recorded."
      },
      {
        title: "Keep compounding and molding distinct",
        body: "An SMC line produces sheet molding compound. Presses, matched molds and downstream part finishing are separate equipment scopes unless expressly included."
      },
      {
        title: "Agree qualification with the material team",
        body: "Validate the sheet with the intended formulation and molding process. Specify which sheet checks and molded-part results are needed before acceptance, and who supplies trial materials and molds."
      }
    ],
    inputs: [
      "SMC formulation and target sheet specification",
      "Sheet width and required output",
      "Reinforcement, carrier-film and paste data",
      "Existing molding process and acceptance requirements",
      "Factory layout, utilities and delivery destination"
    ],
    faq: [
      {
        question: "Does an SMC production line include the molding press?",
        answer: "The scope must say so. Compounding sheet material and pressing it into a part are separate steps. List the press, molds and supporting equipment explicitly if they are needed."
      }
    ],
    related: [
      "bmc-smc-molds",
      "resin-mixing-injection",
      "fiberglass-direct-roving"
    ],
    flow: [
      "Carrier film",
      "Paste + fiber",
      "Compaction",
      "Take-up",
      "Molding feed"
    ],
    image: "/images/sourcing/smc-production-lines.svg",
    imageAlt: "Diagram of smc production lines showing the main specification interfaces"
  },
  {
    slug: "bmc-smc-molds",
    name: "BMC & SMC Molds",
    group: "equipment",
    title: "BMC & SMC Molds | Specification & Sourcing",
    description: "Define matched tooling for BMC or SMC components. Review part geometry, compound, molding-machine interfaces, trial parts and the tooling handover package.",
    intro: "Define matched tooling for BMC or SMC components. Review part geometry, compound, molding-machine interfaces, trial parts and the tooling handover package.",
    rows: [
      [
        "Part and compound",
        "Part CAD, critical dimensions, surface and selected BMC/SMC grade",
        "A mold design proposal tied to the intended process"
      ],
      [
        "Machine interface",
        "Press or injection-machine mounting, operating envelope and heating",
        "Tool dimensions, connections and ejection or handling interfaces"
      ],
      [
        "Tool lifecycle",
        "Cavity count, expected production duty and maintenance access",
        "Trial criteria, spare components and drawing ownership"
      ]
    ],
    checks: [
      {
        title: "Review manufacturability before cutting steel",
        body: "The selected compound and molding process influence filling, vents, parting lines and release. Resolve inserts, threads and cosmetic faces during design review."
      },
      {
        title: "Specify trial-part acceptance",
        body: "Agree the dimensional report, surface criteria and any required material or functional tests. Trial conditions and compound identification should accompany the samples."
      },
      {
        title: "Make changes traceable",
        body: "Name the party approving design revisions and trial corrections. Include a final drawing set, tool identification, maintenance documents and agreed replaceable components at handover."
      }
    ],
    inputs: [
      "Part CAD and inspection drawing",
      "Named BMC/SMC compound and molding process",
      "Molding machine and utility interface data",
      "Expected volume, cavity count and surface requirements",
      "Trial-part acceptance and ownership requirements"
    ],
    faq: [
      {
        question: "Is a BMC mold the same as a pultrusion die?",
        answer: "No. BMC/SMC tooling forms discrete molded components; a pultrusion die produces a continuous section. The drawings, machine interfaces and acceptance procedures differ."
      }
    ],
    related: [
      "smc-production-lines",
      "pultrusion-dies",
      "gelcoat-resins"
    ],
    flow: [
      "Part CAD",
      "Mold review",
      "Tool build",
      "Trial parts",
      "Handover"
    ],
    image: "/images/sourcing/bmc-smc-molds.svg",
    imageAlt: "Diagram of bmc & smc molds showing the main specification interfaces"
  },
  {
    slug: "fiberglass-direct-roving",
    name: "Fiberglass Direct Roving",
    group: "materials",
    title: "Fiberglass Direct Roving | Specification & Sourcing",
    description: "Specify fiberglass direct roving by glass type, sizing, linear density and resin compatibility. Prepare a qualification and delivery request for your process.",
    intro: "Specify fiberglass direct roving by glass type, sizing, linear density and resin compatibility. Prepare a qualification and delivery request for your process.",
    rows: [
      [
        "Fiber grade",
        "Glass type, filament requirement and named product grade",
        "Supplier technical data with the exact grade identifier"
      ],
      [
        "Processing fit",
        "Linear density, sizing and intended resin/process",
        "Compatibility evidence and a representative trial package"
      ],
      [
        "Packaging",
        "Package dimensions, payout, pallet and moisture protection",
        "A packing specification compatible with the creel and storage"
      ]
    ],
    checks: [
      {
        title: "Qualify sizing with the resin",
        body: "A glass designation or linear density alone does not establish compatibility. Review the sizing and intended resin with the proposed supplier, then assess wet-out and processing in the actual system."
      },
      {
        title: "Control grade substitutions",
        body: "Record the approved grade, supplier and incoming checks. Requalify changes that affect processing or laminate performance rather than accepting a substitution solely on nominal tex."
      },
      {
        title: "Inspect the delivered lot",
        body: "Agree lot identification, certificate of analysis, packing condition and sample retention. Identify how storage and handling will protect the reinforcement before it reaches the line."
      }
    ],
    inputs: [
      "Glass type, grade and required tex",
      "Resin system and manufacturing process",
      "Creel/package and payout requirements",
      "Trial quantity, annual demand and delivery schedule",
      "Required lot documents and incoming acceptance criteria"
    ],
    faq: [
      {
        question: "Does the same tex make two rovings interchangeable?",
        answer: "No. Sizing, glass composition, filament construction and package behavior can differ. Review the proposed grade and confirm the effect on processing and the finished laminate."
      }
    ],
    related: [
      "fiberglass-mat-veil",
      "stitched-fiberglass-fabrics",
      "pultrusion-machines"
    ],
    flow: [
      "Grade",
      "Sizing",
      "Payout",
      "Wet-out trial",
      "Lot release"
    ],
    image: "/images/sourcing/fiberglass-direct-roving.svg",
    imageAlt: "Diagram of fiberglass direct roving showing the main specification interfaces"
  },
  {
    slug: "fiberglass-mat-veil",
    name: "Fiberglass Mat & Surface Veil",
    group: "materials",
    title: "Fiberglass Mat & Surface Veil | Specification & Sourcing",
    description: "Compare continuous filament mat, chopped strand mat and surface veil for your composite process. Define binder compatibility, handling and surface requirements.",
    intro: "Compare continuous filament mat, chopped strand mat and surface veil for your composite process. Define binder compatibility, handling and surface requirements.",
    rows: [
      [
        "Continuous filament mat",
        "Area weight, width, construction and handling strength",
        "A grade proposed for the intended line and resin"
      ],
      [
        "Chopped strand mat",
        "Strand construction, binder, area weight and forming duty",
        "Confirmation that the binder and material suit the process"
      ],
      [
        "Surface veil",
        "Fiber type, weight, width and desired surface function",
        "A surface trial with the actual laminate and finish"
      ]
    ],
    checks: [
      {
        title: "Match construction to the process",
        body: "Mat that works in hand lay-up may not feed reliably through pultrusion preformers. Assess dry handling, tension, wet-out and dimensional stability on the proposed line."
      },
      {
        title: "Treat the binder as part of the specification",
        body: "Binder compatibility depends on the selected resin. Request a grade-specific recommendation and validate it; a generic label such as fiberglass mat is insufficient."
      },
      {
        title: "Inspect appearance and laminate behavior",
        body: "Specify the surface acceptance criteria alongside structural laminate requirements. A veil contributes to surface construction and does not replace the structural reinforcement schedule."
      }
    ],
    inputs: [
      "Mat or veil type and target area weight",
      "Roll width, slit widths and package limits",
      "Resin/binder compatibility requirements",
      "Surface and laminate acceptance criteria",
      "Trial-roll quantity, annual demand and destination"
    ],
    faq: [
      {
        question: "Can a surface veil replace a structural mat?",
        answer: "They serve different purposes in the laminate. Specify the surface layer and structural reinforcement separately and validate the complete construction."
      }
    ],
    related: [
      "fiberglass-direct-roving",
      "slitting-cutting-equipment",
      "gelcoat-resins"
    ],
    flow: [
      "Construction",
      "Binder",
      "Feeding trial",
      "Surface check",
      "Lot release"
    ],
    image: "/images/sourcing/fiberglass-mat-veil.svg",
    imageAlt: "Diagram of fiberglass mat & surface veil showing the main specification interfaces"
  },
  {
    slug: "stitched-fiberglass-fabrics",
    name: "Stitched Fiberglass Fabrics",
    group: "materials",
    title: "Stitched Fiberglass Fabrics | Specification & Sourcing",
    description: "Specify stitched glass fabrics by fiber orientation, area weight, width and backing. Match the construction to your laminate and manufacturing process.",
    intro: "Specify stitched glass fabrics by fiber orientation, area weight, width and backing. Match the construction to your laminate and manufacturing process.",
    rows: [
      [
        "Fiber architecture",
        "Required directions, layer weights and layup sequence",
        "A construction drawing or grade sheet defining each layer"
      ],
      [
        "Stitch and backing",
        "Stitch arrangement, any mat backing and binder details",
        "Compatibility and handling information for the named construction"
      ],
      [
        "Roll delivery",
        "Width, roll length, core and allowed joints",
        "An agreed packing and incoming inspection specification"
      ]
    ],
    checks: [
      {
        title: "Keep orientation explicit",
        body: "Specify the direction of each layer relative to the finished part. Total area weight alone cannot describe how the reinforcement is distributed between load directions."
      },
      {
        title: "Check forming and feed behavior",
        body: "Review how the fabric travels through guides or conforms in the mold. Agree trials for bridging, distortion, fraying and wet-out where these affect the process."
      },
      {
        title: "Release against the exact construction",
        body: "Record the approved grade and layup. A change to stitch, backing or layer distribution needs review even if the overall area weight stays the same."
      }
    ],
    inputs: [
      "Fiber directions and weight of each layer",
      "Total area weight, backing and stitch requirements",
      "Width, roll dimensions and required slit layout",
      "Resin, process and laminate performance requirements",
      "Sample quantity, demand and delivery destination"
    ],
    faq: [
      {
        question: "Are woven roving and stitched fabric the same material?",
        answer: "Their fiber architecture and handling differ. Define the required construction and approve a representative laminate rather than ordering only by total weight."
      }
    ],
    related: [
      "fiberglass-direct-roving",
      "fiberglass-mat-veil",
      "slitting-cutting-equipment"
    ],
    flow: [
      "Orientations",
      "Layer weights",
      "Stitch / backing",
      "Process trial",
      "Approval"
    ],
    image: "/images/sourcing/stitched-fiberglass-fabrics.svg",
    imageAlt: "Diagram of stitched fiberglass fabrics showing the main specification interfaces"
  },
  {
    slug: "gelcoat-resins",
    name: "Gelcoat Resins",
    group: "materials",
    title: "Gelcoat Resins | Specification & Sourcing",
    description: "Specify gelcoat by application, substrate, finish and exposure. Review the grade, processing documents, sample panels and delivery conditions.",
    intro: "Prepare a gelcoat inquiry by application, substrate, finish and exposure. Review the proposed grade, processing documents, sample panels and delivery conditions.",
    rows: [
      [
        "Application route",
        "Molded surface, tooling or another specified coating process",
        "A grade recommendation for the actual application method"
      ],
      [
        "Appearance and duty",
        "Color, gloss, thickness requirement and exposure",
        "An agreed sample-panel and test acceptance plan"
      ],
      [
        "Delivery and storage",
        "Pack size, shelf life and transport requirements",
        "Current technical/safety data and lot documentation"
      ]
    ],
    checks: [
      {
        title: "Confirm the substrate and process",
        body: "Describe the laminate resin, cure route and surface preparation. A gelcoat for molded parts should not be assumed suitable for coating a cured pultruded profile without supplier confirmation."
      },
      {
        title: "Approve a representative panel",
        body: "Evaluate color, cure, adhesion and the required exposure performance on the intended substrate. Record the grade, application method and acceptance criteria with the approved panel."
      },
      {
        title: "Define the delivery window",
        body: "Ask for current storage and shelf-life information for the offered grade. Packaging, transport classification and destination handling requirements must be confirmed before shipment."
      }
    ],
    inputs: [
      "Substrate resin and application method",
      "Target color, gloss and surface requirement",
      "Service exposure and required qualification tests",
      "Pack size, trial quantity and demand",
      "Destination and required delivery/storage conditions"
    ],
    faq: [
      {
        question: "Is gelcoat the same as the profile’s structural resin?",
        answer: "Gelcoat is selected for its surface role and processing method. It does not establish the structural properties of the underlying laminate or replace qualification of that laminate."
      }
    ],
    related: [
      "resin-mixing-injection",
      "fiberglass-mat-veil",
      "bmc-smc-molds"
    ],
    flow: [
      "Substrate",
      "Grade selection",
      "Sample panel",
      "Acceptance",
      "Delivery"
    ],
    image: "/images/sourcing/gelcoat-resins.svg",
    imageAlt: "Diagram of gelcoat resins showing the main specification interfaces"
  }
];
