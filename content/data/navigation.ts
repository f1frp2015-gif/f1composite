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
      { group: "Profile systems", label: "Standard Structural Profiles", href: "/products/fiberglass-structural-shapes" },
      { group: "Profile systems", label: "Custom Pultrusions", href: "/products/custom-pultruded-profiles" },
      { group: "Profile systems", label: "Pultruded FRP Grating", href: "/products/frp-gratings" },
      { group: "Profile systems", label: "Molded FRP Grating", href: "/products/molded-frp-grating" },
      { group: "Engineered systems", label: "Structural FRP Deck Panels", href: "/products/frp-deck-panels" },
      { group: "Engineered systems", label: "FRP Windows & Doors", href: "/products/frp-window-frames" },
      { group: "Engineered systems", label: "Solar Frames & Mounting", href: "/products/frp-solar-mounting-systems" },
      { group: "Engineered systems", label: "FRP Fixed Ladders", href: "/products/frp-ladders" },
      { group: "Engineered systems", label: "FRP Handrail Systems", href: "/products/frp-handrail-systems" },
      { group: "Browse", label: "All Products", href: "/pultruded-frp-profiles" },
      { group: "Browse", label: "Technical Datasheets", href: "/datasheets" },
    ],
  },
  {
    label: "Applications",
    href: "/industries",
    children: [
      { group: "Markets", label: "Construction", href: "/industries/construction" },
      { group: "Markets", label: "Infrastructure", href: "/industries/infrastructure" },
      { group: "Markets", label: "Energy & Power", href: "/industries/energy" },
      { group: "Markets", label: "Marine", href: "/industries/marine" },
      { group: "Markets", label: "Industrial", href: "/industries/industrial" },
      { group: "Markets", label: "Vehicle", href: "/industries/vehicle" },
      { group: "Project proof", label: "Application Library", href: "/applications" },
      { group: "Project proof", label: "Case Studies", href: "/case-studies" },
      { group: "Project proof", label: "Global Markets", href: "/regions" },
    ],
  },
  {
    label: "Engineering",
    href: "/resources",
    children: [
      { group: "Specify", label: "Technical Data", href: "/resources/technical-data" },
      { group: "Specify", label: "Design Guides", href: "/resources/design-guides" },
      { group: "Specify", label: "Downloads & CAD", href: "/resources/downloads" },
      { group: "Tools", label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
      { group: "Tools", label: "Span Tables", href: "/frp-span-tables" },
      { group: "Tools", label: "Price Estimator", href: "/fiberglass-pultruded-profile-price" },
      { group: "Learn", label: "What is FRP?", href: "/what-is-frp" },
      { group: "Learn", label: "Technology Center", href: "/technology" },
      { group: "Learn", label: "Engineering Blog", href: "/resources/blog" },
      { group: "Assistant", label: "Engineering Assistant", href: "/ask" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About F1 Composite", href: "/about" },
      { label: "Manufacturing & Quality", href: "/technology/quality-testing" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerNav = {
  products: [
    { label: "Standard Profiles", href: "/products/fiberglass-structural-shapes" },
    { label: "Custom Pultrusions", href: "/products/custom-pultruded-profiles" },
    { label: "Pultruded FRP Grating", href: "/products/frp-gratings" },
    { label: "Structural FRP Deck Panels", href: "/products/frp-deck-panels" },
    { label: "Molded FRP Grating", href: "/products/molded-frp-grating" },
    { label: "FRP Fixed Ladders", href: "/products/frp-ladders" },
    { label: "FRP Handrail Systems", href: "/products/frp-handrail-systems" },
    { label: "FRP Windows & Doors", href: "/products/frp-window-frames" },
    { label: "All Products", href: "/pultruded-frp-profiles" },
  ],
  explore: [
    { label: "Glass Fiber Reinforced Plastic Guide", href: "/what-is-frp" },
    { label: "Applications", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Technical Data", href: "/resources/technical-data" },
    { label: "Downloads & CAD", href: "/resources/downloads" },
    { label: "Engineering Center", href: "/resources" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Quality & Testing", href: "/technology/quality-testing" },
    { label: "Global Markets", href: "/regions" },
    { label: "Contact", href: "/contact" },
  ],
};
