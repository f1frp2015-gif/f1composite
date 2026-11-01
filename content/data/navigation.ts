import { applicationNavigation } from "./applicationNavigation";
import type { GlyphShape } from "@/components/ui/SectionGlyph";

export type NavLink = {
  label: string;
  href: string;
  /** Section glyph for a product link in the Products menu. */
  glyph?: GlyphShape;
};

export type NavSection = {
  id: string;
  label: string;
  /** The section's own page; the heading links to it. */
  href?: string;
  /** Link text for that page where the heading alone would not read as a link, e.g. "All applications". */
  hrefLabel?: string;
  /** Product line name and glyph shown with a product family. */
  line?: string;
  glyph?: GlyphShape;
  links: readonly NavLink[];
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  sections?: readonly NavSection[];
};

export const pultrudedOverviewLink = {
  label: "Pultruded FRP Profiles",
  href: "/pultruded-frp-profiles",
} as const;

/**
 * The Products menu's side panel: the profile finder and the document
 * libraries, which also have their places under Tools and Resources.
 */
export const productShortcuts = {
  finder: { label: "Profile finder", href: "/tools/profile-finder" },
  /** The three tools buyers click most (Search Console, 12 months to 2026-10-25); also listed under Tools. */
  tools: [
    { label: "Span tables", href: "/frp-span-tables" },
    { label: "Profile calculator", href: "/frp-profile-calculator" },
    { label: "Window U-value calculator", href: "/technology/frp-u-value-calculator" },
  ],
  links: [
    { label: "All datasheets", href: "/datasheets" },
    { label: "Downloads & CAD", href: "/resources/downloads" },
    { label: "Test reports & certificates", href: "/resources/evidence" },
  ],
} as const;

/**
 * Product families and application guides have separate entry points.
 * Compact category links lead to specialist components without loading articles
 * into the shared navigation.
 */
export const mainNav = [
  {
    id: "products",
    label: "Products",
    href: "/products/product-lines",
    sections: [
      {
        id: "standard-profiles",
        label: "Standard profiles",
        href: "/products/fiberglass-structural-shapes",
        line: "F1-STRUX",
        links: [
          { label: "I-Beams", href: "/products/fiberglass-structural-shapes/frp-i-beam", glyph: "i_beam" },
          { label: "Channels", href: "/products/fiberglass-structural-shapes/frp-channel", glyph: "channel" },
          { label: "Angles", href: "/products/fiberglass-structural-shapes/frp-angle", glyph: "angle" },
          { label: "Square & Rectangular Tubes", href: "/products/fiberglass-structural-shapes/frp-square-tube", glyph: "shs" },
          { label: "Round Tubes", href: "/products/fiberglass-structural-shapes/frp-tube", glyph: "tube" },
          { label: "Solid Rods", href: "/products/fiberglass-structural-shapes/frp-rod", glyph: "rod" },
          { label: "Flat Bars", href: "/products/fiberglass-structural-shapes/frp-flat-bar", glyph: "flat" },
          { label: "Solid Sheets", href: "/products/fiberglass-sheets", glyph: "sheet" },
          { label: "Hollow & Multi-cell Profiles", href: "/products/fiberglass-plates", glyph: "multicell" },
          { label: "Deck Panels", href: "/products/frp-deck-panels", glyph: "multicell" },
        ],
      },
      // Product families in the order buyers look for them (Search Console, 12 months to
      // 2026-10-25, bot queries excluded): windows took 44% of named-query clicks on 14% of the
      // impressions; grating, handrails and ladders are one access-systems purchase; custom and
      // carbon profiles are one drawing-led route; rebar, fasteners and solar mounting are bought
      // by name; site and civil items are the long tail. Specialist components stay one link.
      {
        id: "windows-doors",
        label: "Windows & doors",
        href: "/products/frp-window-frames",
        line: "F1-THERM",
        glyph: "window",
        links: [
          { label: "Profiles for Fabricators", href: "/products/window-door-profiles" },
          { label: "Finished Windows & Doors", href: "/products/fiberglass-windows-doors" },
          { label: "Door Frame Profiles", href: "/products/frp-door-frames" },
          { label: "Door Thresholds", href: "/products/fiberglass-door-thresholds" },
          { label: "Window Reinforcement", href: "/products/frp-window-reinforcement" },
        ],
      },
      {
        id: "grating-access",
        label: "Grating, handrails & ladders",
        href: "/products/grating",
        line: "F1-GRID",
        glyph: "grating",
        links: [
          { label: "Molded FRP Grating", href: "/products/molded-frp-grating" },
          { label: "Pultruded FRP Grating", href: "/products/frp-gratings" },
          { label: "Stair Treads & Covers", href: "/products/frp-stair-treads" },
          { label: "Handrail Systems", href: "/products/frp-handrail-systems" },
          { label: "Fixed Ladders", href: "/products/frp-ladders" },
        ],
      },
      {
        id: "custom-profiles",
        label: "Custom & carbon fiber profiles",
        href: "/products/custom-pultruded-profiles",
        line: "F1-FORM",
        glyph: "custom",
        links: [
          { label: "Carbon Fiber Tubes", href: "/products/pultruded-carbon-fiber-tubes" },
          { label: "Carbon Fiber Rods", href: "/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod" },
          { label: "Carbon Fiber Plates", href: "/products/pultruded-carbon-fiber-plates" },
          { label: "Carbon Fiber Pultrusion", href: "/products/pultrusion-carbon-fiber" },
          { label: "T Profiles", href: "/products/fiberglass-t-profiles" },
          { label: "Square Rods", href: "/products/fiberglass-square-rods" },
        ],
      },
      { id: "rebar", label: "FRP rebar & mesh", href: "/products/frp-rebar", glyph: "rebar", links: [] },
      { id: "fasteners", label: "Fasteners & fittings", href: "/products/frp-fasteners-fittings", glyph: "fastener", links: [] },
      { id: "solar", label: "Solar mounting systems", href: "/products/frp-solar-mounting-systems", glyph: "channel", links: [] },
      {
        id: "site-civil",
        label: "Site & civil works",
        href: "/products/product-lines#custom-components",
        glyph: "rod",
        links: [
          { label: "Sheet Piling", href: "/products/frp-sheet-piling" },
          { label: "Rock Bolts", href: "/products/frp-rock-bolts" },
          { label: "Fencing", href: "/products/frp-fencing" },
          { label: "Tree & Plant Stakes", href: "/products/fiberglass-stakes" },
          { label: "Snow & Driveway Markers", href: "/products/fiberglass-snow-markers" },
        ],
      },
      { id: "specialist-components", label: "Specialist components", href: "/products/product-lines#specialist-components", glyph: "custom", links: [] },
    ],
  },
  {
    id: "applications",
    label: "Applications",
    href: "/applications",
    sections: applicationNavigation,
  },
  {
    id: "industries",
    label: "Industries",
    href: "/industries",
    sections: [
      {
        id: "by-industry",
        label: "By industry",
        links: [
          { label: "Water & Wastewater", href: "/industries/water-wastewater" },
          { label: "Buildings & Construction", href: "/industries/construction" },
          { label: "Infrastructure", href: "/industries/infrastructure" },
          { label: "Energy & Power", href: "/industries/energy" },
          { label: "Industrial & Chemical", href: "/industries/industrial" },
          { label: "Marine & Offshore", href: "/industries/marine" },
          { label: "Automotive & Rail", href: "/industries/vehicle" },
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
    id: "tools",
    label: "Tools",
    href: "/tools",
    sections: [
      // Tools are the site's strongest click asset (26% of clicks on 7% of impressions), so
      // every live tool is listed, the most-used first.
      {
        id: "engineering-tools",
        label: "Profiles & materials",
        links: [
          { label: "FRP Span Tables", href: "/frp-span-tables" },
          { label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
          { label: "Profile Finder", href: "/tools/profile-finder" },
          { label: "Column Buckling Calculator", href: "/tools/frp-column-calculator" },
          { label: "Density & Weight Calculator", href: "/frp-density-calculator" },
          { label: "Thermal Expansion Calculator", href: "/tools/thermal-expansion-calculator" },
          { label: "Unit Converter", href: "/tools/frp-unit-converter" },
        ],
      },
      {
        id: "application-tools",
        label: "Systems, costs & quotes",
        links: [
          { label: "Window U-Value Calculator", href: "/technology/frp-u-value-calculator" },
          { label: "GFRP Rebar Calculator", href: "/tools/gfrp-rebar-calculator" },
          { label: "Handrail Load Check", href: "/tools/handrail-load-calculator" },
          { label: "Ladder, Stair & Walkway Checker", href: "/tools/access-geometry-checker" },
          { label: "Life-Cycle Cost Calculator", href: "/tools/frp-life-cycle-cost-calculator" },
          { label: "Cut List Optimizer", href: "/tools/frp-cut-list-optimizer" },
          { label: "Price Estimator", href: "/fiberglass-pultruded-profile-price" },
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
        id: "knowledge",
        label: "Knowledge base",
        links: [
          { label: "What Is FRP?", href: "/what-is-frp" },
          { label: "Pultrusion Process", href: "/technology/pultrusion-process" },
          { label: "Pultruded Profile Performance", href: "/technology/pultruded-profile-performance" },
          { label: "Pultrusion Resin Systems", href: "/technology/pultrusion-resin-systems" },
          { label: "FRP vs Traditional Materials", href: "/technology/frp-vs-traditional-materials" },
          { label: "Engineering Blog", href: "/resources/blog" },
          { label: "FRP Glossary", href: "/resources/glossary" },
        ],
      },
      {
        id: "specification-resources",
        label: "Specification & documents",
        links: [
          { label: "FRP Technical Data", href: "/resources/technical-data" },
          { label: "Product Datasheets", href: "/datasheets" },
          { label: "Design Guides", href: "/resources/design-guides" },
          { label: "Downloads & CAD", href: "/resources/downloads" },
          { label: "Test Reports & Certificates", href: "/resources/evidence" },
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
          { label: "Quality & Testing", href: "/technology/quality-testing" },
          { label: "Know-How & Services", href: "/technology/knowhow-services" },
          { label: "Technical Authors", href: "/about/authors" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
] as const satisfies readonly NavItem[];

/**
 * The footer combines industry and application hubs in a compact set of
 * routes. Leaf pages stay discoverable through the menus and in-page links.
 */
export const footerNav = {
  products: [
    { label: "All Products", href: "/products/product-lines" },
    { label: "Pultruded FRP Profiles", href: "/pultruded-frp-profiles" },
    { label: "Windows & Doors", href: "/products/frp-window-frames" },
    { label: "Grating, Handrails & Ladders", href: "/products/grating" },
    { label: "Custom & Carbon Fiber Profiles", href: "/products/custom-pultruded-profiles" },
    { label: "GFRP Rebar", href: "/products/frp-rebar" },
  ],
  industries: [
    { label: "Industries", href: "/industries" },
    { label: "Applications", href: "/applications" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Global Markets", href: "/regions" },
  ],
  tools: [
    { label: "All Tools", href: "/tools" },
    { label: "Profile Finder", href: "/tools/profile-finder" },
    { label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
    { label: "Density & Weight Calculator", href: "/frp-density-calculator" },
  ],
  resources: [
    { label: "Resource Center", href: "/resources" },
    { label: "Technical Data", href: "/resources/technical-data" },
    { label: "Downloads & CAD", href: "/resources/downloads" },
    { label: "Product Evidence & Reports", href: "/resources/evidence" },
  ],
  company: [
    { label: "About F1 Composite", href: "/about" },
    { label: "Manufacturing Capabilities", href: "/products/frp-pultrusion-manufacturer-factory-direct" },
    { label: "Technical Authors", href: "/about/authors" },
    { label: "Contact", href: "/contact" },
  ],
} as const satisfies Record<string, readonly NavLink[]>;
