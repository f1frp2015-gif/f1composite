export type NavChild = {
  label: string;
  href: string;
  /**
   * Optional group header for long dropdowns. Consecutive children sharing a
   * group render under one uppercase header; grouped dropdowns lay out as a
   * multi-column panel on desktop. Ungrouped dropdowns render as before.
   */
  group?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const mainNav: NavItem[] = [
  {
    label: "Products",
    href: "/pultruded-frp-profiles",
    children: [
      { label: "Standard Profiles", href: "/products/standard-profiles" },
      { label: "Custom Pultrusions", href: "/products/custom-pultrusions" },
      { label: "Fenestration Systems", href: "/products/fenestration-systems" },
      { label: "Window Reinforcement Profiles", href: "/products/window-reinforcement-profiles" },
      { label: "Facade Sunshade Panels", href: "/products/facade-sunshade-panels" },
      { label: "Gratings & Decks", href: "/products/gratings" },
      { label: "Product Lines", href: "/products/product-lines" },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    children: [
      { group: "Process & Materials", label: "What is FRP?", href: "/what-is-frp" },
      { group: "Process & Materials", label: "Pultrusion Process", href: "/technology/pultrusion-process" },
      { group: "Process & Materials", label: "Resin Systems & Matrix Selection", href: "/technology/pultrusion-resin-systems" },
      { group: "Process & Materials", label: "Polyurethane Pultrusion Windows", href: "/technology/polyurethane-pultrusion-windows" },
      { group: "Process & Materials", label: "Quality & Testing", href: "/technology/quality-testing" },
      { group: "Comparisons", label: "FRP vs Traditional Materials", href: "/technology/frp-vs-traditional-materials" },
      { group: "Comparisons", label: "FRP vs Aluminum Windows", href: "/technology/frp-vs-aluminum-windows" },
      { group: "Comparisons", label: "FRP vs PVC Windows", href: "/technology/frp-vs-pvc-windows" },
      { group: "Comparisons", label: "FRP vs Steel Gratings", href: "/technology/frp-vs-steel-gratings" },
      { group: "Comparisons", label: "Pultrusion vs Extrusion vs Winding", href: "/technology/pultrusion-vs-extrusion-filament-winding" },
      { group: "Comparisons", label: "Strongwell / Fiberline / Exel Alternative", href: "/technology/china-alternative-to-strongwell-fiberline-exel" },
      { group: "Comparisons", label: "Tencom / Creative Pultrusions Alternative", href: "/technology/china-alternative-to-tencom-creative-pultrusions-windows" },
      { group: "Free Tools", label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
      { group: "Free Tools", label: "FRP Span Tables", href: "/frp-span-tables" },
      { group: "Free Tools", label: "Profile Price Estimator", href: "/fiberglass-pultruded-profile-price" },
      { group: "Free Tools", label: "U-Value Calculator", href: "/technology/u-value-calculator" },
      { group: "Free Tools", label: "AI Sourcing Assistant", href: "/ai/sourcing" },
      { group: "Free Tools", label: "Passive House AI Advisor", href: "/ai/passive-house" },
      { group: "Services", label: "Engineering Services", href: "/technology/knowhow-services" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Construction", href: "/industries/construction" },
      { label: "Infrastructure", href: "/industries/infrastructure" },
      { label: "Energy & Power", href: "/industries/energy" },
      { label: "Marine", href: "/industries/marine" },
      { label: "Industrial", href: "/industries/industrial" },
      { label: "Vehicle", href: "/industries/vehicle" },
      { label: "Applications", href: "/applications" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/resources/blog" },
      { label: "FRP Windows Guide", href: "/resources/frp-windows-guide" },
      { label: "How to Choose a Supplier", href: "/resources/how-to-choose-frp-pultrusion-supplier" },
      { label: "Downloads", href: "/resources/downloads" },
      { label: "Profile Technical Datasheets", href: "/resources/downloads#datasheets" },
      { label: "Technical Data", href: "/resources/technical-data" },
      { label: "Design Guides", href: "/resources/design-guides" },
      { label: "Glossary", href: "/resources/glossary" },
      { label: "DDP, Tariffs & HS Codes", href: "/resources/ddp-tariff-hs-code-guide" },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Ask AI", href: "/ask" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  products: [
    { label: "Standard Profiles", href: "/products/standard-profiles" },
    { label: "Custom Pultrusions", href: "/products/custom-pultrusions" },
    { label: "Fenestration Systems", href: "/products/fenestration-systems" },
    { label: "Window Reinforcement Profiles", href: "/products/window-reinforcement-profiles" },
    { label: "Facade Sunshade Panels", href: "/products/facade-sunshade-panels" },
    { label: "Gratings & Decks", href: "/products/gratings" },
    { label: "All Products", href: "/pultruded-frp-profiles" },
  ],
  technology: [
    { label: "What is FRP?", href: "/what-is-frp" },
    { label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
    { label: "FRP Span Tables", href: "/frp-span-tables" },
    { label: "Profile Price Estimator", href: "/fiberglass-pultruded-profile-price" },
    { label: "U-Value Calculator", href: "/technology/u-value-calculator" },
    { label: "Pultrusion Process", href: "/technology/pultrusion-process" },
    { label: "Resin Systems", href: "/technology/pultrusion-resin-systems" },
    { label: "FRP vs Traditional", href: "/technology/frp-vs-traditional-materials" },
    { label: "Pultrusion vs Extrusion", href: "/technology/pultrusion-vs-extrusion-filament-winding" },
    { label: "Quality & Testing", href: "/technology/quality-testing" },
    { label: "All Technology", href: "/technology" },
  ],
  industries: [
    { label: "Construction", href: "/industries/construction" },
    { label: "Infrastructure", href: "/industries/infrastructure" },
    { label: "Energy & Power", href: "/industries/energy" },
    { label: "Marine", href: "/industries/marine" },
    { label: "Industrial", href: "/industries/industrial" },
    { label: "Vehicle", href: "/industries/vehicle" },
    { label: "Applications", href: "/applications" },
  ],
  resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/resources/blog" },
    { label: "FRP Windows Guide", href: "/resources/frp-windows-guide" },
    { label: "How to Choose a Supplier", href: "/resources/how-to-choose-frp-pultrusion-supplier" },
    { label: "Technical Data", href: "/resources/technical-data" },
    { label: "Design Guides", href: "/resources/design-guides" },
    { label: "Glossary", href: "/resources/glossary" },
    { label: "DDP, Tariffs & HS Codes", href: "/resources/ddp-tariff-hs-code-guide" },
    { label: "Downloads", href: "/resources/downloads" },
    { label: "Profile Technical Datasheets", href: "/resources/downloads#datasheets" },
    { label: "Ask AI", href: "/ask" },
    { label: "AI Sourcing Assistant", href: "/ai/sourcing" },
    { label: "Passive House AI Advisor", href: "/ai/passive-house" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  markets: [
    { label: "Passive House Windows · Canada", href: "/regions/frp-passive-house-windows-canada" },
    { label: "Passive House Windows · Germany", href: "/regions/frp-passive-house-windows-germany" },
    { label: "GRP Windows · UK", href: "/regions/grp-windows-uk" },
    { label: "FRP for US Projects", href: "/regions/frp-pultrusion-supplier-usa" },
    { label: "FRP Grating · Saudi Arabia", href: "/regions/frp-grating-supplier-saudi-arabia" },
    { label: "Solar Mounting · Australia", href: "/regions/pultruded-frp-solar-mounting-australia" },
    { label: "Cable Tray · UAE", href: "/regions/frp-cable-tray-uae-oil-gas" },
    { label: "All Markets", href: "/regions" },
  ],
};
