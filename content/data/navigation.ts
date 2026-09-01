export type NavLink = {
  label: string;
  href: string;
};

export type NavSection = {
  id: string;
  label: string;
  links: readonly NavLink[];
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  sections?: readonly NavSection[];
};

/**
 * Global navigation follows the way an industrial buyer narrows a project:
 * product family -> application -> engineering validation -> source files -> supplier.
 * Long-tail pages remain reachable from these crawlable hubs and contextual links.
 */
export const mainNav = [
  {
    id: "products",
    label: "Products",
    href: "/pultruded-frp-profiles",
    sections: [
      {
        id: "profiles-materials",
        label: "Profiles & materials",
        links: [
          { label: "Fiberglass Structural Shapes", href: "/products/fiberglass-structural-shapes" },
          { label: "FRP Rebar", href: "/products/frp-rebar" },
          { label: "Fiberglass Sheets", href: "/products/fiberglass-sheets" },
          { label: "Fiberglass Plate Profiles", href: "/products/fiberglass-plates" },
          { label: "Custom Pultruded Profiles", href: "/products/custom-pultruded-profiles" },
        ],
      },
      {
        id: "grating-access",
        label: "Grating, decking & access",
        links: [
          { label: "Pultruded FRP Grating", href: "/products/frp-gratings" },
          { label: "Molded FRP Grating", href: "/products/molded-frp-grating" },
          { label: "Structural FRP Deck Panels", href: "/products/frp-deck-panels" },
          { label: "FRP Stair Treads", href: "/products/frp-stair-treads" },
          { label: "Fiberglass Fixed Ladders", href: "/products/frp-ladders" },
          { label: "FRP Handrail Systems", href: "/products/frp-handrail-systems" },
        ],
      },
      {
        id: "building-infrastructure",
        label: "Building & infrastructure",
        links: [
          { label: "FRP Windows & Doors", href: "/products/frp-window-frames" },
          { label: "Window Reinforcement Profiles", href: "/products/frp-window-reinforcement" },
          { label: "Facade & Sunshade Panels", href: "/products/frp-facade-panels" },
          { label: "FRP Sound Barrier Walls", href: "/products/frp-sound-barrier-wall" },
        ],
      },
      {
        id: "energy-utility",
        label: "Energy & specialty",
        links: [
          { label: "Solar Frames & Mounting", href: "/products/frp-solar-mounting-systems" },
          { label: "Wind Turbine Blade Panels", href: "/products/wind-turbine-blade-panels" },
          { label: "Fiberglass Snow Markers", href: "/products/fiberglass-snow-markers" },
          { label: "Fiberglass Stakes", href: "/products/fiberglass-stakes" },
        ],
      },
    ],
  },
  {
    id: "applications",
    label: "Applications",
    href: "/applications",
    sections: [
      {
        id: "by-application",
        label: "By application",
        links: [
          { label: "Cable Tray Supports", href: "/applications/frp-cable-tray-supports" },
          { label: "Cooling Tower Profiles", href: "/applications/frp-cooling-tower-profiles" },
          { label: "Bridge Deck Panels", href: "/applications/frp-bridge-deck-panels" },
          { label: "Chemical Plant Platforms", href: "/applications/frp-chemical-plant-platforms" },
          { label: "Pedestrian Bridge Systems", href: "/applications/frp-pedestrian-bridge-superstructures" },
          { label: "Solar Mounting Profiles", href: "/applications/frp-solar-mounting-profiles" },
        ],
      },
      {
        id: "by-industry",
        label: "By industry",
        links: [
          { label: "All Industries", href: "/industries" },
          { label: "Buildings & Construction", href: "/industries/construction" },
          { label: "Infrastructure", href: "/industries/infrastructure" },
          { label: "Energy & Power", href: "/industries/energy" },
          { label: "Industrial & Chemical", href: "/industries/industrial" },
          { label: "Marine & Offshore", href: "/industries/marine" },
          { label: "Transportation & Rail", href: "/industries/vehicle" },
        ],
      },
      {
        id: "proof-markets",
        label: "Proof & markets",
        links: [
          { label: "Case Studies", href: "/case-studies" },
          { label: "Global Markets", href: "/regions" },
        ],
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    href: "/technology",
    sections: [
      {
        id: "technology-validation",
        label: "Technology & validation",
        links: [
          { label: "Pultrusion Process", href: "/technology/pultrusion-process" },
          { label: "Pultrusion Resin Systems", href: "/technology/pultrusion-resin-systems" },
          { label: "FRP vs Traditional Materials", href: "/technology/frp-vs-traditional-materials" },
          { label: "Quality & Testing", href: "/technology/quality-testing" },
          { label: "Know-How & Services", href: "/technology/knowhow-services" },
        ],
      },
      {
        id: "engineering-tools",
        label: "Engineering tools",
        links: [
          { label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
          { label: "FRP Span Tables", href: "/frp-span-tables" },
          { label: "Price Estimator", href: "/fiberglass-pultruded-profile-price" },
          { label: "Window U-Value Calculator", href: "/technology/frp-u-value-calculator" },
          { label: "Engineering Assistant", href: "/ask" },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    sections: [
      {
        id: "specification-resources",
        label: "Specification resources",
        links: [
          { label: "FRP Technical Data", href: "/resources/technical-data" },
          { label: "Product Datasheets", href: "/datasheets" },
          { label: "Design Guides", href: "/resources/design-guides" },
          { label: "Downloads & CAD", href: "/resources/downloads" },
        ],
      },
      {
        id: "learn",
        label: "Learn",
        links: [
          { label: "What Is FRP?", href: "/what-is-frp" },
          { label: "Engineering Blog", href: "/resources/blog" },
          { label: "FRP Glossary", href: "/resources/glossary" },
        ],
      },
      {
        id: "buyer-guides",
        label: "Buyer guides",
        links: [
          { label: "How to Choose an FRP Supplier", href: "/resources/how-to-choose-frp-pultrusion-supplier" },
          { label: "FOB & DDP Export Guide", href: "/resources/frp-pultrusion-fob-ddp-export-guide" },
          { label: "FRP Windows Guide", href: "/resources/frp-windows-guide" },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    href: "/about",
    sections: [
      {
        id: "company-links",
        label: "About & contact",
        links: [
          { label: "Manufacturing Capabilities", href: "/products/frp-pultrusion-manufacturer-factory-direct" },
          { label: "Technical Authors", href: "/about/authors" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
] as const satisfies readonly NavItem[];

/**
 * The footer is intentionally a short set of hubs and high-intent routes.
 * Leaf product pages stay discoverable through Products and contextual links.
 */
export const footerNav = {
  products: [
    { label: "All FRP Products", href: "/pultruded-frp-profiles" },
    { label: "Structural Shapes", href: "/products/fiberglass-structural-shapes" },
    { label: "FRP Grating", href: "/products/frp-gratings" },
    { label: "FRP Rebar", href: "/products/frp-rebar" },
    { label: "FRP Windows & Doors", href: "/products/frp-window-frames" },
    { label: "Custom Pultrusions", href: "/products/custom-pultruded-profiles" },
  ],
  applications: [
    { label: "Applications", href: "/applications" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Global Markets", href: "/regions" },
  ],
  resources: [
    { label: "Resource Center", href: "/resources" },
    { label: "Technical Data", href: "/resources/technical-data" },
    { label: "Downloads & CAD", href: "/resources/downloads" },
    { label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
    { label: "Engineering Blog", href: "/resources/blog" },
    { label: "Quality & Testing", href: "/technology/quality-testing" },
  ],
  company: [
    { label: "About F1 Composite", href: "/about" },
    { label: "Manufacturing Capabilities", href: "/products/frp-pultrusion-manufacturer-factory-direct" },
    { label: "Technical Authors", href: "/about/authors" },
    { label: "Contact", href: "/contact" },
  ],
} as const satisfies Record<string, readonly NavLink[]>;
