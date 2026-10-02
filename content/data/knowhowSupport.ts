export interface KnowHowSection {
  id: string;
  title: string;
  intro: string;
  rows: [string, string, string][];
}

export const sourcingSupportSections: Record<string, KnowHowSection[]> = {
  "pultrusion-dies": [
    {
      id: "profile-families",
      title: "Choose tooling around the profile family",
      intro: "The finished profile, reinforcement route and line interface define the tooling package.",
      rows: [
        [
          "Solid rods and flat strips",
          "Outside size, edge finish and straightness; plan fiber distribution across the section.",
          "Cavity drawing, entry geometry and trial inspection plan."
        ],
        [
          "Round, square and shaped tubes",
          "Wall thickness, internal geometry, mandrel support and the fiber path around it.",
          "Mandrel/support drawings, alignment references and access for assembly."
        ],
        [
          "I-beams, channels and angles",
          "Web/flange transitions, corner reinforcement and mat placement.",
          "Preformer sequence, critical dimensions and checks for twist or warpage."
        ],
        [
          "Sheet piles and interlocking sections",
          "Interlock clearance, wall alignment and repeat assembly fit.",
          "Matched samples and an agreed interlock inspection method."
        ],
        [
          "Grating bearing bars and custom profiles",
          "Bearing-bar geometry or the specific shutter/window/industrial section.",
          "Section-specific tooling, surface criteria and mating-part fit checks."
        ]
      ]
    },
    {
      id: "preforming",
      title: "Preforming, guide plates & mandrel supports",
      intro: "Coordinate dry-fiber guides and the preforming sequence with the selected open-bath or closed-injection process.",
      rows: [
        [
          "Creel and fiber guides",
          "Package layout, roving map, guide-hole arrangement and tension-control method.",
          "A numbered routing plan tied to the reinforcement schedule."
        ],
        [
          "Mat and veil forming",
          "Slit width, overlaps, orientation and the path around corners and cavities.",
          "A progressive forming sequence and trial checks for wrinkles or displaced layers."
        ],
        [
          "Die-entry preform",
          "Transition geometry, entry alignment and access for setup and cleaning.",
          "Preformer drawings, mounting datums and an integrated trial with the die."
        ],
        [
          "Hollow-section support",
          "Mandrel supports, thermal movement and fiber passage.",
          "Assembly sequence and clear identification of replaceable or wear components."
        ]
      ]
    },
    {
      id: "fixtures",
      title: "Production fixtures & inspection tooling",
      intro: "Identify every fixture by function so the quotation covers the complete tooling set.",
      rows: [
        [
          "Die mounting and alignment",
          "Line center height, mounting envelope and the datums used for setup.",
          "Mounting plates, alignment references and a setting record."
        ],
        [
          "Puller contact tooling",
          "Contact length, section support and allowable marking or distortion.",
          "Grip/shoe design matched to the offered puller and representative trials."
        ],
        [
          "Cutting and drilling fixtures",
          "Support span, datum faces, hole positions and local edge protection.",
          "Fixture drawing, first-piece inspection and replaceable locating parts."
        ],
        [
          "Inspection gauges and spares",
          "Critical-fit dimensions, tool IDs and the approved drawing revision.",
          "Gauge list, calibration requirements and a spare/wear-parts schedule."
        ]
      ]
    },
    {
      id: "tooling-handover",
      title: "Tool manufacture, trial & handover",
      intro: "Agree the sequence with the tool maker and record revisions through sample approval.",
      rows: [
        [
          "Design release",
          "Profile and tooling drawings, steel/surface-treatment proposal and critical interfaces.",
          "Buyer approval before manufacture; no fixed finish or tolerance assumed across all dies."
        ],
        [
          "Machining and finish",
          "Dimensional inspection, cavity condition, heater/sensor positions and identification.",
          "Inspection report against the approved tool specification."
        ],
        [
          "Trial and correction",
          "Material grades, reinforcement schedule, line configuration and part acceptance.",
          "Traceable trial samples, deviation list and agreed corrective actions."
        ],
        [
          "Release to production",
          "Final drawings, parts list, maintenance information and ownership/licensing terms.",
          "Signed handover record with unresolved items and responsible parties."
        ]
      ]
    }
  ],
  "pultrusion-machines": [
    {
      id: "line-configurations",
      title: "Compare line configurations",
      intro: "Choose by the product and production route; a pulling-force headline does not establish finished-product capacity.",
      rows: [
        [
          "Hydraulic profile line",
          "Large or varied sections needing an assessed grip and reciprocating pull cycle.",
          "Working envelope, speed/force range and performance on the specified section."
        ],
        [
          "Caterpillar profile line",
          "Continuous contact pulling, with attention to thin walls and surface finish.",
          "Belt/contact geometry, clamp control and checks for slip, crushing and marks."
        ],
        [
          "Double-station line",
          "Separate production lanes or stations on the proposed frame.",
          "Independent controls, working clearances and stated shared utilities."
        ],
        [
          "Rebar line",
          "Impregnation, surface wrapping, curing, cooling, pulling and cutting or take-up.",
          "Bar-size range, lane arrangement and product-specific qualification plan."
        ],
        [
          "Threaded rock-bolt line",
          "Thread/surface forming with coordinated pulling and downstream handling.",
          "Thread geometry and compatibility with the approved anchor assembly."
        ],
        [
          "Rebar mesh line",
          "Bar supply or integrated forming, cross placement and intersection formation.",
          "Mesh pitch/width, joint acceptance and included assembly equipment."
        ]
      ]
    },
    {
      id: "line-interfaces",
      title: "Specify the whole line interface",
      intro: "Keep one agreed interface schedule across the equipment supplier, tool maker, material supplier and receiving factory.",
      rows: [
        [
          "Fiber supply → preforming",
          "Creel capacity, payout, tension, mat feeds and reinforcement layout.",
          "Routing plan, preformer set and a demonstrated feed path."
        ],
        [
          "Resin delivery → die",
          "Open bath or closed injection, chemistry, temperature conditioning and connections.",
          "Compatibility confirmation and a coordinated stop/start procedure."
        ],
        [
          "Die → pulling → cutting",
          "Center height, cured profile temperature, grip tooling and synchronization.",
          "Trial evidence for section integrity, surface finish and cut length."
        ],
        [
          "Rebar take-up or cutting",
          "Permitted product flexibility, reel/core geometry and winding tension where coiling is intended.",
          "Product-specific approval for coiling and a defined straight-length alternative."
        ],
        [
          "Factory utilities → controls",
          "Power/frequency, air, cooling, extraction, layout and software/document access.",
          "Buyer/supplier responsibility list and site-readiness checklist."
        ]
      ]
    }
  ],
  "resin-mixing-injection": [
    {
      id: "injection-package",
      title: "Build the injection package by module",
      intro: "Review the exact formulation and optional equipment with the proposed supplier. A general resin label is insufficient.",
      rows: [
        [
          "A/B tanks and transfer",
          "Separate storage, replenishment, level indication and low-level response.",
          "Tank/material compatibility, transfer arrangement and alarms."
        ],
        [
          "Conditioning",
          "Agitation, moisture control, temperature conditioning or degassing where required by the formulation.",
          "An explicit included/optional schedule; tank and hose heating stated separately."
        ],
        [
          "Metering",
          "Component flow range, ratio basis (mass or volume), viscosity and filler characteristics.",
          "Pump/seal selection, calibration method and ratio verification records."
        ],
        [
          "Mixing and hoses",
          "Mixer type, connection geometry, residence time and replacement/cleaning access.",
          "Mixing-head and hose specification matched to the injection interface."
        ],
        [
          "Injection box and die",
          "Fiber entry, sealing, mounting and the transition into the heated tool.",
          "Joint drawings and a trial that includes both the dosing unit and tooling."
        ],
        [
          "Controls and shutdown",
          "Coordination with pulling, monitoring, fault response and approved cleaning arrangements.",
          "Commissioning checklist, supplier operating instructions and consumables list."
        ]
      ]
    },
    {
      id: "dosing-acceptance",
      title: "Verify dosing and product quality together",
      intro: "Equipment checks and laminate checks answer different questions and need separate acceptance records.",
      rows: [
        [
          "Metering verification",
          "Use the agreed method across the intended operating range and formulation.",
          "Record actual delivery and ratio, with the basis and instruments identified."
        ],
        [
          "Conditioning and controls",
          "Confirm the specified alarms, temperature functions and line communication.",
          "A functional check record against the purchased configuration."
        ],
        [
          "Representative product trial",
          "Use the approved fiber/layup, resin and tool combination.",
          "Part dimensions, surface/cure checks and the required material tests."
        ],
        [
          "Changeover and maintenance",
          "Confirm consumables, replacement parts and supplier-defined cleaning steps.",
          "Operator training record and the agreed aftercare contacts."
        ]
      ]
    }
  ],
  "slitting-cutting-equipment": [
    {
      id: "take-up",
      title: "Cutting, take-up & secondary fabrication",
      intro: "Match downstream handling to the product leaving the curing and pulling section.",
      rows: [
        [
          "Synchronized cut-off",
          "Section support, line signals, cut-length tolerance and edge quality.",
          "Acceptance at the intended output and an extraction/guarding scope."
        ],
        [
          "Rebar coiling",
          "Product grade, diameter, allowed bend, reel geometry and tension control.",
          "Approval for the offered product and a trial showing acceptable handling."
        ],
        [
          "Drilling and machining",
          "Hole/slot drawing, datum faces, fixtures and surface protection.",
          "First-piece dimensional report and a repeatable setup."
        ],
        [
          "Packing and identification",
          "Lengths, part IDs, protection and dispatch sequence.",
          "Packing specification linked to the cut list and batch traceability."
        ]
      ]
    }
  ],
  "fiberglass-direct-roving": [
    {
      id: "material-release",
      title: "Roving qualification and production release",
      intro: "Connect the approved roving grade to a controlled laminate and process record.",
      rows: [
        [
          "Technical package",
          "Glass grade, sizing, tex, packaging and intended resin/process.",
          "Current technical data, lot certificate and supplier change-notification terms."
        ],
        [
          "Creel and preformer trial",
          "Payout, tension, fuzz, breaks and behavior through the chosen guides.",
          "A feed-trial record tied to guide/preformer and material revisions."
        ],
        [
          "Laminate release",
          "Wet-out, reinforcement content and project mechanical/electrical requirements.",
          "Approved trial results; a new grade is reviewed before production substitution."
        ]
      ]
    }
  ],
  "fiberglass-mat-veil": [
    {
      id: "forming-trial",
      title: "Mat, veil & preformer compatibility",
      intro: "Qualify the sheet reinforcement on the actual route into the profile.",
      rows: [
        [
          "Width and construction",
          "Slit width, area weight, binder and surface-finish role.",
          "Roll specification and incoming inspection criteria."
        ],
        [
          "Forming sequence",
          "Corners, overlaps, longitudinal feed and hollow-section transitions.",
          "Trial evidence for feed stability and correct layer placement."
        ],
        [
          "Laminate and surface",
          "Named resin, cure route and accepted appearance.",
          "Sample panel/profile approval and a controlled reinforcement schedule."
        ]
      ]
    }
  ],
  "stitched-fiberglass-fabrics": [
    {
      id: "layup-transfer",
      title: "Transfer the layup into the tooling plan",
      intro: "Keep the reinforcement drawing and the forming sequence linked.",
      rows: [
        [
          "Layer map",
          "Fiber directions and weights referenced to the finished section.",
          "A layup document with a clear revision and orientation convention."
        ],
        [
          "Cut and feed plan",
          "Slit patterns, backing/stitch construction and guide/preformer clearance.",
          "Trial strips and a repeatable feeding arrangement."
        ],
        [
          "Approval and changes",
          "Proposed supplier, resin compatibility and trial acceptance.",
          "Named approved grade and review of construction changes."
        ]
      ]
    }
  ],
  "pullwinding-equipment": [
    {
      id: "winding-integration",
      title: "Mandrel, winding & pulling integration",
      intro: "Specify the interfaces as one package and qualify the resulting tube.",
      rows: [
        [
          "Fiber supply",
          "Axial reinforcement and winding packages, tension and replacement access.",
          "Fiber-route and creel layouts."
        ],
        [
          "Mandrel and winding",
          "Tube section, winding directions, intended architecture and motion coordination.",
          "Tooling/control proposal with the responsible integrator identified."
        ],
        [
          "Cure and downstream",
          "Resin delivery, heated tooling, pulling, cooling and cutting.",
          "A representative tube trial and documented acceptance results."
        ]
      ]
    }
  ]
};

export const materialSupportSections: KnowHowSection[] = [
  {
    id: "resins-additives",
    title: "Resins, cure systems & process additives",
    intro: "Qualify the full material package within Know-How support. Formulations and processing limits come from the selected material supplier and project trials.",
    rows: [
      [
        "Base resin",
        "Polyester, vinyl ester, epoxy or polyurethane selected for process and service requirements.",
        "Named grade, current technical/safety data and compatibility with the proposed impregnation route."
      ],
      [
        "Cure or hardener package",
        "Supplier-specified chemistry, ratio basis, handling and storage requirements.",
        "Approved formulation and validation plan; no universal mixing ratio or cure recipe."
      ],
      [
        "Release system",
        "Internal or external release requirement and the tool/substrate surfaces involved.",
        "Compatibility, surface/bonding implications and the supplier’s application guidance."
      ],
      [
        "Fillers, pigments and functional additives",
        "Required appearance or function, viscosity, settlement and pumping implications.",
        "Approved additive package and trials in the dosing, forming and curing system."
      ],
      [
        "Reinforcement and surface layers",
        "Roving, mat, stitched fabric and veil matched to the resin and geometry.",
        "Named grades, reinforcement schedule and incoming lot checks."
      ]
    ]
  },
  {
    id: "qualification",
    title: "From proposed materials to an approved bill of materials",
    intro: "Raw-material selection is complete only when it works with the tooling, equipment and required product tests.",
    rows: [
      [
        "Propose",
        "Collect technical/safety documents, supplier grade IDs and batch information.",
        "A candidate material list with open questions."
      ],
      [
        "Trial",
        "Evaluate storage/feed, wet-out, preforming, cure and product inspection.",
        "A traceable trial record using named tooling and equipment settings."
      ],
      [
        "Approve",
        "Agree the accepted bill of materials, inspection criteria and purchasing specification.",
        "Controlled BOM and sample/test references."
      ],
      [
        "Maintain",
        "Track incoming lots, shelf life, process changes and proposed substitutions.",
        "Change-control and requalification responsibilities."
      ]
    ]
  }
];
