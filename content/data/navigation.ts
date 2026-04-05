export const mainNav = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Standard Profiles", href: "/products/standard-profiles" },
      { label: "Custom Pultrusions", href: "/products/custom-pultrusions" },
      { label: "Fenestration Systems", href: "/products/fenestration-systems" },
      { label: "Gratings", href: "/products/gratings" },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    children: [
      { label: "Pultrusion Process", href: "/technology/pultrusion-process" },
      { label: "FRP vs Traditional Materials", href: "/technology/frp-vs-traditional-materials" },
      { label: "Quality & Testing", href: "/technology/quality-testing" },
      { label: "KNOWHOW Services", href: "/technology/knowhow-services" },
      { label: "FRP Calculator", href: "/technology/calculator" },
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
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "Ask AI", href: "/ask" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  products: [
    { label: "Standard Profiles", href: "/products/standard-profiles" },
    { label: "Custom Pultrusions", href: "/products/custom-pultrusions" },
    { label: "Fenestration Systems", href: "/products/fenestration-systems" },
    { label: "Gratings", href: "/products/gratings" },
    { label: "All Products", href: "/products" },
  ],
  technology: [
    { label: "Pultrusion Process", href: "/technology/pultrusion-process" },
    { label: "FRP vs Traditional", href: "/technology/frp-vs-traditional-materials" },
    { label: "Quality & Testing", href: "/technology/quality-testing" },
    { label: "KNOWHOW Services", href: "/technology/knowhow-services" },
  ],
  industries: [
    { label: "Construction", href: "/industries/construction" },
    { label: "Infrastructure", href: "/industries/infrastructure" },
    { label: "Energy & Power", href: "/industries/energy" },
    { label: "Marine", href: "/industries/marine" },
    { label: "Industrial", href: "/industries/industrial" },
    { label: "Vehicle", href: "/industries/vehicle" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/resources/blog" },
    { label: "Downloads", href: "/resources/downloads" },
    { label: "Contact", href: "/contact" },
  ],
};
