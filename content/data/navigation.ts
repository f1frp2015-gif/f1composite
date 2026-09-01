export type NavChild = {
  label: string;
  href: string;
  group?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

/**
 * The global navigation intentionally exposes only the decisions a project
 * buyer needs to make. Long-tail comparison, article, calculator, and market
 * pages remain reachable from their crawlable hub pages and contextual links.
 */
export const mainNav: NavItem[] = [
  {
    label: "Products",
    href: "/pultruded-frp-profiles",
    children: [
      { group: "Structural profiles", label: "Standard Structural Profiles", href: "/products/fiberglass-structural-shapes" },
      { group: "Structural profiles", label: "FRP Rebar", href: "/products/frp-rebar" },
      { group: "Structural profiles", label: "Fiberglass Snow Markers", href: "/products/fiberglass-snow-markers" },
      { group: "Structural profiles", label: "Fiberglass Stakes", href: "/products/fiberglass-stakes" },
      { group: "Structural profiles", label: "Fiberglass Sheets", href: "/products/fiberglass-sheets" },
      { group: "Structural profiles", label: "Fiberglass Plate Profiles", href: "/products/fiberglass-plates" },
      { group: "Structural profiles", label: "Custom Pultrusions", href: "/products/custom-pultruded-profiles" },
      { group: "Grating & decking", label: "Pultruded FRP Grating", href: "/products/frp-gratings" },
      { group: "Grating & decking", label: "Molded FRP Grating", href: "/products/molded-frp-grating" },
      { group: "Grating & decking", label: "Structural FRP Deck Panels", href: "/products/frp-deck-panels" },
      { group: "Grating & decking", label: "FRP Stair Treads", href: "/products/frp-stair-treads" },
      { group: "Access systems", label: "FRP Fixed Ladders", href: "/products/frp-ladders" },
      { group: "Access systems", label: "FRP Handrail Systems", href: "/products/frp-handrail-systems" },
      { group: "Building & energy", label: "FRP Windows & Doors", href: "/products/frp-window-frames" },
      { group: "Building & energy", label: "Window Reinforcement Profiles", href: "/products/frp-window-reinforcement" },
      { group: "Building & energy", label: "Facade & Sunshade Panels", href: "/products/frp-facade-panels" },
      { group: "Building & energy", label: "Wind Turbine Blade Panels", href: "/products/wind-turbine-blade-panels" },
      { group: "Building & energy", label: "FRP Sound Barrier Walls", href: "/products/frp-sound-barrier-wall" },
      { group: "Building & energy", label: "Solar Frames & Mounting", href: "/products/frp-solar-mounting-systems" },
      { group: "Browse", label: "All Products", href: "/pultruded-frp-profiles" },
      { group: "Browse", label: "Technical Datasheets", href: "/datasheets" },
      { group: "Browse", label: "F1 Product Lines", href: "/products/product-lines" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { group: "By industry", label: "Construction", href: "/industries/construction" },
      { group: "By industry", label: "Infrastructure", href: "/industries/infrastructure" },
      { group: "By industry", label: "Energy & Power", href: "/industries/energy" },
      { group: "By industry", label: "Marine & Offshore", href: "/industries/marine" },
      { group: "By industry", label: "Industrial & Chemical", href: "/industries/industrial" },
      { group: "By industry", label: "Transportation", href: "/industries/vehicle" },
      { group: "Application solutions", label: "Application Library", href: "/applications" },
      { group: "Application solutions", label: "Chemical Plant Platforms", href: "/applications/frp-chemical-plant-platforms" },
      { group: "Application solutions", label: "Bridge Deck Panels", href: "/applications/frp-bridge-deck-panels" },
      { group: "Application solutions", label: "Cable Tray Supports", href: "/applications/frp-cable-tray-supports" },
      { group: "Proof & markets", label: "Case Studies", href: "/case-studies" },
      { group: "Proof & markets", label: "Global Markets", href: "/regions" },
    ],
  },
  {
    label: "Engineering",
    href: "/resources",
    children: [
      { group: "Specify", label: "Technical Data", href: "/resources/technical-data" },
      { group: "Specify", label: "Design Guides", href: "/resources/design-guides" },
      { group: "Specify", label: "Downloads & CAD", href: "/resources/downloads" },
      { group: "Tools & support", label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
      { group: "Tools & support", label: "Span Tables", href: "/frp-span-tables" },
      { group: "Tools & support", label: "Price Estimator", href: "/fiberglass-pultruded-profile-price" },
      { group: "Tools & support", label: "Engineering Assistant", href: "/ask" },
      { group: "Learn", label: "What is FRP?", href: "/what-is-frp" },
      { group: "Learn", label: "Technology Center", href: "/technology" },
      { group: "Learn", label: "Engineering Blog", href: "/resources/blog" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About F1 Composite", href: "/about" },
      { label: "Manufacturing & Quality", href: "/technology/quality-testing" },
      { label: "Technical Authors", href: "/about/authors" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerNav = {
  profiles: [
    { label: "All Products", href: "/pultruded-frp-profiles" },
    { label: "Structural Profiles", href: "/products/fiberglass-structural-shapes" },
    { label: "FRP Rebar", href: "/products/frp-rebar" },
    { label: "Fiberglass Snow Markers", href: "/products/fiberglass-snow-markers" },
    { label: "Fiberglass Stakes", href: "/products/fiberglass-stakes" },
    { label: "Fiberglass Sheets", href: "/products/fiberglass-sheets" },
    { label: "Fiberglass Plate Profiles", href: "/products/fiberglass-plates" },
    { label: "Custom Pultrusions", href: "/products/custom-pultruded-profiles" },
    { label: "Pultruded FRP Grating", href: "/products/frp-gratings" },
    { label: "Molded FRP Grating", href: "/products/molded-frp-grating" },
    { label: "Structural Deck Panels", href: "/products/frp-deck-panels" },
  ],
  systems: [
    { label: "FRP Stair Treads", href: "/products/frp-stair-treads" },
    { label: "FRP Fixed Ladders", href: "/products/frp-ladders" },
    { label: "FRP Handrail Systems", href: "/products/frp-handrail-systems" },
    { label: "FRP Windows & Doors", href: "/products/frp-window-frames" },
    { label: "Window Reinforcement", href: "/products/frp-window-reinforcement" },
    { label: "Facade & Sunshade Panels", href: "/products/frp-facade-panels" },
    { label: "Wind Turbine Blade Panels", href: "/products/wind-turbine-blade-panels" },
    { label: "FRP Sound Barrier Walls", href: "/products/frp-sound-barrier-wall" },
    { label: "Solar Mounting Systems", href: "/products/frp-solar-mounting-systems" },
  ],
  applications: [
    { label: "Industries", href: "/industries" },
    { label: "Application Library", href: "/applications" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Global Markets", href: "/regions" },
  ],
  engineering: [
    { label: "Technical Data", href: "/resources/technical-data" },
    { label: "Design Guides", href: "/resources/design-guides" },
    { label: "Downloads & CAD", href: "/resources/downloads" },
    { label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
    { label: "Span Tables", href: "/frp-span-tables" },
    { label: "Engineering Assistant", href: "/ask" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Quality & Testing", href: "/technology/quality-testing" },
    { label: "Technical Authors", href: "/about/authors" },
    { label: "Contact", href: "/contact" },
  ],
};
