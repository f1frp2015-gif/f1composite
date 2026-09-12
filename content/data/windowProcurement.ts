export const windowProcurement = {
  profiles: {
    path: "/products/window-door-profiles",
    title: "Fiberglass Window & Door Profiles for Fabricators",
    description:
      "Pultruded fiberglass window and door profiles for fabricators. Specify frame, sash, mullion and sill sections, cut lengths, machining and supporting documents.",
    h1: "Pultruded window & door profiles for fabricators",
    intro:
      "F1 Composite supplies FRP window and door profiles, also called fiberglass lineals or GRP profiles, for local fabrication. This route covers the profile set and agreed accessories; cutting, joining, glazing and final assembly are defined with the fabricator.",
    image:
      "/images/products/window-door/frp-window-frame-90-series-corner-section.webp",
    imageAlt: "Corner section of a pultruded fiberglass window frame",
    buyer:
      "Window and door manufacturers, fabricators and OEM development teams",
    supply:
      "Frame, sash, mullion, transom, sill and other agreed constant-section profiles",
    decision:
      "Select a compatible profile set before choosing individual sections. Frame and sash interfaces, gasket grooves, glazing beads, drainage and hardware locations must work together. A profile from one series is not automatically interchangeable with another.",
    sections: [
      [
        "Frame and sash",
        "Define opening type, frame depth, glazing pocket, sightline and the connection between fixed and moving parts. Supply a section drawing showing the interfaces that must be maintained.",
      ],
      [
        "Mullions and transoms",
        "State the glazing layout, unsupported lengths and attachment details. Section stiffness and connections are reviewed against the project's loads and deflection requirements.",
      ],
      [
        "Sills and thresholds",
        "Agree drainage paths, weatherseal interfaces and the connection to the surrounding opening. A threshold profile alone does not establish the water performance of the finished door.",
      ],
      [
        "Glazing beads and reinforcement",
        "Identify the glazing system and retention details. Reinforcement profiles used inside another frame material have a separate specification from a primary FRP frame section.",
      ],
    ],
    checklist: [
      "Profile drawings or the proposed frame series and opening type",
      "Cut length, quantity per section and repeat-order demand",
      "Resin, reinforcement, finish, color and dimensional tolerances",
      "Gasket, corner connection, hardware and glazing interfaces",
      "Machining requirements and responsibility for final assembly",
      "Required material data, sample inspection and delivery destination",
    ],
    message:
      "Please review my window and door profile requirements.\nProfile drawing / frame series:\nSections and cut lengths:\nQuantity per section:\nMaterial / finish:\nFabrication and accessory scope:\nDelivery destination:",
    action: "Request Profile Supply",
    evidence:
      "The window catalog provides series and assembly context; the material data sheet describes the identified laminate. A certificate or report for a finished specimen does not automatically certify a lineal or a locally assembled window. Agree the supporting documents and any required validation with the fabricator.",
    faq: [
      {
        question: "Does profile supply include complete windows?",
        answer:
          "No. This purchasing route is for lineals and agreed components. Glass, hardware, gaskets, machining and assembly must be listed in the quotation. Use the finished window and door route when you need factory-assembled units.",
      },
      {
        question: "Can F1 develop a new window profile?",
        answer:
          "A new section can be reviewed through the custom pultrusion process. Provide the geometry, interfaces, material requirements, tolerances and annual demand so tooling and sample development can be scoped.",
      },
      {
        question: "Are reinforcement profiles the same as FRP frames?",
        answer:
          "No. Reinforcement sections support a separate frame system, while primary FRP frame and sash profiles form the window structure. Identify the role and mating section before requesting a quote.",
      },
    ],
  },
  finished: {
    path: "/products/fiberglass-windows-doors",
    title: "Finished Fiberglass Windows & Doors | F1 Composite",
    description:
      "Specify finished fiberglass windows and doors by opening schedule, glazing, hardware and project requirements. Review assembly scope, reports and packing.",
    h1: "Finished fiberglass windows & doors",
    intro:
      "F1 Composite supplies finished windows and doors built with pultruded FRP profiles. This route is for project buyers who need assembled units rather than lineals. Frame series, glazing, hardware, accessories and delivery scope are confirmed against the opening schedule.",
    image:
      "/images/products/window-door/frp-window-frame-70-series-inward-hero.webp",
    imageAlt: "Finished fiberglass window with glazing and an operable sash",
    buyer:
      "Building-project procurement teams, contractors and window distributors",
    supply:
      "Project-specified window and door units with the agreed glazing, hardware and accessories",
    decision:
      "Begin with the opening schedule and required operation. Frame depth alone does not determine thermal, air, water or structural performance. The dimensions, glass build-up, seals, hardware and installation detail together define the offered unit.",
    sections: [
      [
        "Fixed windows",
        "For openings where ventilation is not required. Specify overall dimensions, glazing configuration, sightlines and whether fixed lights connect to adjacent operable units.",
      ],
      [
        "Tilt-and-turn, casement and awning windows",
        "Choose opening direction and handing, ventilation requirements, hardware and restrictors. Confirm allowable unit size and the applicable test configuration during specification review.",
      ],
      [
        "Sliding and lift-and-slide doors",
        "State panel arrangement, clear opening, threshold detail, operating hardware and glass weight. The offered configuration and transport constraints require project review.",
      ],
      [
        "Entrance doors",
        "Define leaf arrangement, infill, locks, hinges, threshold and weatherseal requirements. Confirm the surrounding-wall and installation interfaces before production.",
      ],
    ],
    checklist: [
      "Opening schedule with dimensions, quantities, handing and operation",
      "Project location and thermal, air, water and wind requirements",
      "Glass build-up, appearance, color and hardware schedule",
      "Frame series, sill and installation-interface drawings",
      "Required specimen reports and any additional project testing",
      "Packing, unloading constraints, spare parts and delivery terms",
    ],
    message:
      "Please review my finished window and door schedule.\nProject location:\nOpening types, dimensions and quantities:\nGlass and hardware requirements:\nThermal / air / water / wind requirements:\nInstallation interface and accessories:\nDelivery destination:",
    action: "Request Finished Units",
    evidence:
      "Review the original turn-and-tilt window and lift-sliding door reports against the offered size, glass, hardware and test conditions. Whole-window U-value differs from glass-only Ug and frame-only Uf. Report or certificate coverage must be checked for the specific configuration; it is not a blanket claim for every unit.",
    faq: [
      {
        question: "What is included in a finished-unit quotation?",
        answer:
          "The quotation identifies the frame, glass, hardware, seals and agreed accessories, together with inspection, packing and delivery terms. Confirm installation materials, site labor and spare parts separately rather than assuming they are included.",
      },
      {
        question: "Can one U-value be applied to every window size?",
        answer:
          "No. Whole-window performance changes with frame geometry, window size, glazing and edge details. Request data for the proposed assembly and distinguish whole-window Uw from glass Ug and frame Uf.",
      },
      {
        question: "What should I send before requesting a price?",
        answer:
          "Start with the opening schedule, project location, required performance, glazing and hardware preferences. Drawings and quantities allow the unit configuration and documentation requirements to be reviewed before a formal quote.",
      },
    ],
  },
} as const;
