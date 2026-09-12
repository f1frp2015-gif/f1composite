/** Shared commercial taxonomy. Applications reference products; they do not create new families. */
export const standardProfileLinks = [
  {
    label: "I-Beams & Wide Flanges",
    href: "/products/fiberglass-structural-shapes/frp-i-beam",
  },
  {
    label: "Channels",
    href: "/products/fiberglass-structural-shapes/frp-channel",
  },
  { label: "Angles", href: "/products/fiberglass-structural-shapes/frp-angle" },
  {
    label: "Square & Rectangular Tubes",
    href: "/products/fiberglass-structural-shapes/frp-square-tube",
  },
  {
    label: "Round Tubes",
    href: "/products/fiberglass-structural-shapes/frp-tube",
  },
  {
    label: "Solid Rods",
    href: "/products/fiberglass-structural-shapes/frp-rod",
  },
  {
    label: "Flat Bars",
    href: "/products/fiberglass-structural-shapes/frp-flat-bar",
  },
] as const;

export const productFamilies = [
  {
    id: "standard",
    label: "Standard Pultruded Profiles",
    brand: "F1-STRUX",
    href: "/products/fiberglass-structural-shapes",
    description:
      "Choose an established fiberglass section and review dimensions, properties and weight per metre. Standard sections are also known as FRP structural shapes or GRP profiles.",
    image: "/images/products/standard-profiles-cover.jpg",
    imageAlt: "Pultruded fiberglass I-beam",
    links: standardProfileLinks,
  },
  {
    id: "custom",
    label: "Custom Pultruded Profiles",
    brand: "F1-FORM",
    href: "/products/custom-pultruded-profiles",
    description:
      "Develop a cross-section around your drawing, material requirements and production volume. Review tooling, samples and secondary fabrication before production.",
    image: "/images/products/custom-pultrusions-cover.jpg",
    imageAlt: "Custom pultruded composite cross-sections",
    links: [
      {
        label: "Profile Development",
        href: "/products/custom-pultruded-profiles",
      },
      {
        label: "Materials & Resin Options",
        href: "/technology/pultrusion-resin-systems",
      },
      { label: "Fabrication & Services", href: "/technology/knowhow-services" },
    ],
  },
  {
    id: "windows",
    label: "Windows & Doors",
    brand: "F1-THERM",
    href: "/products/frp-window-frames",
    description:
      "Pultruded window and door profiles for fabricators, reinforcement sections, and finished fiberglass windows and doors for building projects.",
    image:
      "/images/products/window-door/frp-window-frame-70-series-inward-hero.webp",
    imageAlt: "Fiberglass window frame and glazing assembly",
    links: [
      {
        label: "Window & Door Profiles",
        href: "/products/window-door-profiles",
      },
      {
        label: "Window Reinforcement Profiles",
        href: "/products/frp-window-reinforcement",
      },
      {
        label: "Finished Windows & Doors",
        href: "/products/fiberglass-windows-doors",
      },
    ],
  },
  {
    id: "grating",
    label: "FRP Grating",
    brand: "F1-GRID",
    href: "/products/grating",
    description:
      "Compare molded and pultruded fiberglass grating by construction, panel layout, span direction, surface and resin requirements.",
    image:
      "/images/products/pultruded-frp-grating/pultruded-grating-rooftop-walkway.webp",
    imageAlt: "Pultruded fiberglass grating used as a walking surface",
    links: [
      { label: "Molded FRP Grating", href: "/products/molded-frp-grating" },
      { label: "Pultruded FRP Grating", href: "/products/frp-gratings" },
      { label: "Stair Treads & Covers", href: "/products/frp-stair-treads" },
    ],
  },
] as const;

export const applicationGroups = [
  {
    label: "Platforms, Walkways & Access",
    description:
      "Structural profiles and grating for access frameworks and walking surfaces.",
    href: "/applications/frp-chemical-plant-platforms",
    products: ["standard", "custom", "grating"],
    links: [
      {
        label: "Chemical Plant Platforms",
        href: "/applications/frp-chemical-plant-platforms",
      },
      {
        label: "Handrail Profiles & Assemblies",
        href: "/products/frp-handrail-systems",
      },
      {
        label: "Fixed Ladder Components & Assemblies",
        href: "/products/frp-ladders",
      },
      { label: "Stair Treads", href: "/products/frp-stair-treads" },
    ],
  },
  {
    label: "Bridges & Decking",
    description:
      "Beams, deck sections and connections for pedestrian structures and deck replacement.",
    href: "/applications/frp-bridge-deck-panels",
    products: ["standard", "custom", "grating"],
    links: [
      {
        label: "Bridge Deck Applications",
        href: "/applications/frp-bridge-deck-panels",
      },
      {
        label: "Pedestrian Bridge Structures",
        href: "/applications/frp-pedestrian-bridge-superstructures",
      },
      {
        label: "Decking & Interlocking Profiles",
        href: "/products/frp-deck-panels",
      },
    ],
  },
  {
    label: "Cooling Towers",
    description:
      "Pultruded framing, bracing and support sections for wet industrial service.",
    href: "/applications/frp-cooling-tower-profiles",
    products: ["standard", "custom"],
    links: [
      {
        label: "Cooling Tower Profiles",
        href: "/applications/frp-cooling-tower-profiles",
      },
    ],
  },
  {
    label: "Cable & Electrical Supports",
    description:
      "Channels, angles and brackets for cable routes and equipment supports.",
    href: "/applications/frp-cable-tray-supports",
    products: ["standard", "custom"],
    links: [
      {
        label: "Cable Tray Supports",
        href: "/applications/frp-cable-tray-supports",
      },
    ],
  },
  {
    label: "Solar PV",
    description:
      "Module frame profiles, rails and structural sections with different connection and load requirements.",
    href: "/applications/frp-solar-mounting-profiles",
    products: ["standard", "custom"],
    links: [
      {
        label: "PV Support Design & Applications",
        href: "/applications/frp-solar-mounting-profiles",
      },
      {
        label: "Solar Profile Catalog & Supply",
        href: "/products/frp-solar-mounting-systems",
      },
    ],
  },
  {
    label: "Facades & Building Components",
    description:
      "Architectural profiles for shading, facades, windows and doors.",
    href: "/products/frp-facade-panels",
    products: ["custom", "windows"],
    links: [
      { label: "Facade Fins & Sunshades", href: "/products/frp-facade-panels" },
      {
        label: "Window & Door Profiles",
        href: "/products/window-door-profiles",
      },
      {
        label: "Finished Windows & Doors",
        href: "/products/fiberglass-windows-doors",
      },
    ],
  },
  {
    label: "Noise Barriers",
    description:
      "Panel and post sections for project-specific noise barrier assemblies.",
    href: "/products/frp-sound-barrier-wall",
    products: ["standard", "custom"],
    links: [
      {
        label: "Noise Barrier Panels & Components",
        href: "/products/frp-sound-barrier-wall",
      },
    ],
  },
  {
    label: "Specialized Components",
    description:
      "Dedicated reinforcement laminates and fabricated rod products for specific purchasing requirements.",
    href: "/products/wind-turbine-blade-panels",
    products: ["standard", "custom"],
    links: [
      {
        label: "Wind Blade Reinforcement",
        href: "/products/wind-turbine-blade-panels",
      },
      {
        label: "Reflective Snow Markers",
        href: "/products/fiberglass-snow-markers",
      },
      {
        label: "Plant, Tree & Vineyard Stakes",
        href: "/products/fiberglass-stakes",
      },
      {
        label: "Concrete Reinforcement: FRP Rebar",
        href: "/products/frp-rebar",
      },
    ],
  },
] as const;

export const taxonomyRevision = "2026-09-12";
