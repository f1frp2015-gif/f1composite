export const mainNav = [
  {
    label: "Products",
    href: "/pultruded-frp-profiles",
    children: [
      { label: "Standard Profiles", href: "/products/standard-profiles" },
      { label: "Custom Pultrusions", href: "/products/custom-pultrusions" },
      { label: "Fenestration Systems", href: "/products/fenestration-systems" },
      { label: "Gratings & Decks", href: "/products/gratings" },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    children: [
      { label: "What is FRP?", href: "/what-is-frp" },
      { label: "Pultrusion Process", href: "/technology/pultrusion-process" },
      { label: "FRP vs Traditional Materials", href: "/technology/frp-vs-traditional-materials" },
      { label: "Quality & Testing", href: "/technology/quality-testing" },
      { label: "KNOWHOW Services", href: "/technology/knowhow-services" },
      { label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
      { label: "U-Value Calculator", href: "/technology/u-value-calculator" },
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
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Downloads", href: "/resources/downloads" },
      { label: "Technical Data", href: "/resources/technical-data" },
      { label: "Design Guides", href: "/resources/design-guides" },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Ask AI", href: "/ask" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  products: [
    { label: "Standard Profiles", href: "/products/standard-profiles" },
    { label: "Custom Pultrusions", href: "/products/custom-pultrusions" },
    { label: "Fenestration Systems", href: "/products/fenestration-systems" },
    { label: "Gratings & Decks", href: "/products/gratings" },
    { label: "All Products", href: "/pultruded-frp-profiles" },
  ],
  technology: [
    { label: "What is FRP?", href: "/what-is-frp" },
    { label: "Pultrusion Process", href: "/technology/pultrusion-process" },
    { label: "FRP vs Traditional", href: "/technology/frp-vs-traditional-materials" },
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
  ],
  resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/resources/blog" },
    { label: "Technical Data", href: "/resources/technical-data" },
    { label: "Design Guides", href: "/resources/design-guides" },
    { label: "Downloads", href: "/resources/downloads" },
    { label: "Ask AI", href: "/ask" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  markets: [
    { label: "Passive House Windows · Canada", href: "/regions/frp-passive-house-windows-canada" },
    { label: "FRP for US Projects", href: "/regions/frp-pultrusion-supplier-usa" },
    { label: "FRP Grating · Saudi Arabia", href: "/regions/frp-grating-supplier-saudi-arabia" },
    { label: "Solar Mounting · Australia", href: "/regions/pultruded-frp-solar-mounting-australia" },
    { label: "Cable Tray · UAE", href: "/regions/frp-cable-tray-uae-oil-gas" },
  ],
};
