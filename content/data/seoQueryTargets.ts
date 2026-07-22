/**
 * Search-intent ownership for the site's highest-value query clusters.
 *
 * One URL owns each primary query. Supporting pages must target a distinct
 * intent (technical, comparison, guide, or regional) and link back to the
 * commercial owner instead of repeating its exact title/H1.
 */
export interface SeoQueryTarget {
  targetUrl: string;
  primaryQuery: string;
  intent: "brand" | "commercial" | "technical" | "comparison" | "guide" | "regional";
  title: string;
  description: string;
  supportingUrls: readonly string[];
}

export const seoQueryTargets = [
  {
    targetUrl: "/",
    primaryQuery: "F1 Composite",
    intent: "brand",
    title: "F1 Composite | FengDu FRP Export & Project Supply",
    description:
      "F1 Composite is FengDu New Material's international export company for structural profiles, gratings, window systems and custom pultrusions.",
    supportingUrls: ["/about", "/products/product-lines", "/regions"],
  },
  {
    targetUrl: "/what-is-frp",
    primaryQuery: "what is FRP",
    intent: "guide",
    title: "What Is FRP? Fiberglass Reinforced Polymer Explained",
    description:
      "Learn what FRP means, how fiberglass and resin form a composite, its properties, standards, applications, limitations, and differences from steel.",
    supportingUrls: [
      "/technology/pultrusion-process",
      "/technology/frp-vs-traditional-materials",
      "/resources/glossary",
    ],
  },
  {
    targetUrl: "/pultruded-frp-profiles",
    primaryQuery: "pultruded FRP profiles",
    intent: "commercial",
    title: "Pultruded FRP Profiles & Structural Shapes — EN 13706",
    description:
      "Specify pultruded FRP profiles, structural shapes, gratings, window frames and custom sections. EN 13706 and ASTM D3917; factory-direct global supply.",
    supportingUrls: [
      "/products/standard-profiles",
      "/products/custom-pultrusions",
      "/technology/pultrusion-process",
      "/resources/how-to-choose-frp-pultrusion-supplier",
    ],
  },
  {
    targetUrl: "/products/standard-profiles",
    primaryQuery: "fiberglass structural shapes",
    intent: "commercial",
    title: "Fiberglass Structural Shapes — FRP Sizes & Weights",
    description:
      "Compare 114 fiberglass structural shapes: I-beams, channels, angles, tubes, flat bars and rods, with dimensions, weights and section data.",
    supportingUrls: [
      "/products/standard-profiles/i-beam",
      "/products/standard-profiles/channel",
      "/products/standard-profiles/angle",
      "/frp-span-tables",
    ],
  },
  {
    targetUrl: "/products/product-lines",
    primaryQuery: "F1 Composite product lines",
    intent: "brand",
    title: "F1-STRUX, F1-GRID, F1-THERM & F1-FORM Product Lines",
    description:
      "Explore F1 Composite's four product lines for structural profiles, gratings, fenestration systems and custom pultrusions exported for global projects.",
    supportingUrls: [
      "/pultruded-frp-profiles",
      "/products/gratings",
      "/products/fenestration-systems",
      "/products/custom-pultrusions",
    ],
  },
  {
    targetUrl: "/products/custom-pultrusions",
    primaryQuery: "custom pultrusions",
    intent: "commercial",
    title: "Custom Pultrusions — Bespoke FRP Profile Manufacturer",
    description:
      "Develop custom pultruded FRP sections to 600×300 mm with in-house tooling, resin and reinforcement selection, validation, and repeat production.",
    supportingUrls: ["/pultruded-frp-profiles", "/technology/pultrusion-process"],
  },
  {
    targetUrl: "/products/fenestration-systems",
    primaryQuery: "FRP windows",
    intent: "commercial",
    title: "FRP Windows & Fiberglass Window Frames | F1 Composite",
    description:
      "Finished FRP windows and doors plus pultruded fiberglass window frames, profiles and lineals for fabricators. 65–140 series; U-values to 0.78 W/m²·K.",
    supportingUrls: [
      "/resources/frp-windows-guide",
      "/technology/polyurethane-pultrusion-windows",
      "/technology/frp-vs-aluminum-windows",
      "/technology/frp-vs-pvc-windows",
    ],
  },
  {
    targetUrl: "/technology/polyurethane-pultrusion-windows",
    primaryQuery: "polyurethane pultrusion windows",
    intent: "technical",
    title: "Polyurethane Pultrusion Windows — GFRP-PU Technology",
    description:
      "Learn how GFRP-PU window frames are pultruded, why polyurethane improves toughness and thin-wall performance, and where the technology fits.",
    supportingUrls: ["/products/fenestration-systems", "/resources/frp-windows-guide"],
  },
  {
    targetUrl: "/technology/pultrusion-process",
    primaryQuery: "pultrusion process",
    intent: "technical",
    title: "Fiberglass Pultrusion Process — How FRP Profiles Are Made",
    description:
      "See each pultrusion process stage: fiber creel, resin impregnation, heated-die curing, pull control, cutoff, quality checks and production variables.",
    supportingUrls: [
      "/what-is-frp",
      "/products/custom-pultrusions",
      "/technology/pultrusion-resin-systems",
    ],
  },
  {
    targetUrl: "/technology/frp-vs-traditional-materials",
    primaryQuery: "FRP vs steel vs aluminum",
    intent: "comparison",
    title: "FRP vs Steel vs Aluminum — Engineering Comparison",
    description:
      "Compare FRP, steel and aluminum by strength, stiffness, weight, corrosion, conductivity, installation and lifecycle cost for structural projects.",
    supportingUrls: [
      "/resources/blog/frp-vs-steel-structural-profiles",
      "/technology/frp-vs-aluminum-windows",
      "/technology/frp-vs-steel-gratings",
    ],
  },
  {
    targetUrl: "/resources/frp-windows-guide",
    primaryQuery: "FRP windows guide",
    intent: "guide",
    title: "FRP Windows Guide — Selection, U-Value & Certification",
    description:
      "Research FRP window materials, frame selection, U-value targets, PHI, NAFS and AS 2047 certification, supplier qualification and fabrication routes.",
    supportingUrls: ["/products/fenestration-systems", "/technology/polyurethane-pultrusion-windows"],
  },
  {
    targetUrl: "/products/gratings",
    primaryQuery: "FRP grating",
    intent: "commercial",
    title: "FRP Grating — Molded, Pultruded & Solid-Top Panels",
    description:
      "Specify molded and pultruded FRP grating, deck panels and solid-top covers for chemical, marine and industrial walkways, with load and slip data.",
    supportingUrls: [
      "/technology/frp-vs-steel-gratings",
      "/regions/frp-grating-supplier-saudi-arabia",
      "/applications/frp-chemical-plant-platforms",
    ],
  },
  {
    targetUrl: "/technology/frp-vs-steel-gratings",
    primaryQuery: "FRP grating vs steel grating",
    intent: "comparison",
    title: "FRP Grating vs Steel — Corrosion, Slip & Lifecycle Cost",
    description:
      "Compare FRP grating with steel on load, corrosion, weight, slip resistance, electrical safety, installation and lifecycle cost.",
    supportingUrls: ["/products/gratings", "/industries/industrial"],
  },
  {
    targetUrl: "/frp-profile-calculator",
    primaryQuery: "FRP profile calculator",
    intent: "technical",
    title: "Free FRP Profile Calculator — LRFD/ASD Design Checks",
    description:
      "Run bending, shear and deflection checks for pultruded FRP profiles with LRFD or ASD methods and EN 13706, GB 50608 and ASCE 74-23 inputs.",
    supportingUrls: ["/frp-span-tables", "/products/standard-profiles"],
  },
  {
    targetUrl: "/frp-span-tables",
    primaryQuery: "FRP span tables",
    intent: "technical",
    title: "FRP Span Tables — Pultruded Fiberglass Load Charts",
    description:
      "Use allowable uniform-load span tables for pultruded FRP I-beams, channels and tubes based on EN 13706 E23, ASCE/SEI 74-23 and L/250 deflection.",
    supportingUrls: ["/frp-profile-calculator", "/products/standard-profiles"],
  },
  {
    targetUrl: "/fiberglass-pultruded-profile-price",
    primaryQuery: "fiberglass pultruded profile price",
    intent: "commercial",
    title: "Fiberglass Pultruded Profile Price — Estimator & Guide",
    description:
      "Estimate fiberglass pultruded profile prices in USD per meter and kilogram. See how section size, resin, glass content, finish and order volume affect cost.",
    supportingUrls: ["/pultruded-frp-profiles", "/products/standard-profiles"],
  },
  {
    targetUrl: "/technology/china-alternative-to-strongwell-fiberline-exel",
    primaryQuery: "China alternative to Strongwell",
    intent: "comparison",
    title: "China Alternative to Strongwell, Fiberline & Exel FRP",
    description:
      "Compare F1-STRUX pultruded FRP profiles with Strongwell, Fiberline, Creative Pultrusions and Exel on standards, tooling, capacity and export supply.",
    supportingUrls: [
      "/pultruded-frp-profiles",
      "/resources/how-to-choose-frp-pultrusion-supplier",
    ],
  },
] as const satisfies readonly SeoQueryTarget[];

const targetsByUrl = new Map<string, SeoQueryTarget>();
const targetsByQuery = new Map<string, SeoQueryTarget>();

for (const target of seoQueryTargets) {
  const queryKey = target.primaryQuery.trim().toLowerCase();
  if (targetsByUrl.has(target.targetUrl)) throw new Error(`Duplicate SEO target URL: ${target.targetUrl}`);
  if (targetsByQuery.has(queryKey)) throw new Error(`Duplicate primary SEO query: ${target.primaryQuery}`);
  targetsByUrl.set(target.targetUrl, target);
  targetsByQuery.set(queryKey, target);
}

export function getSeoQueryTarget(targetUrl: string): SeoQueryTarget {
  const target = targetsByUrl.get(targetUrl);
  if (!target) throw new Error(`Missing SEO query target for ${targetUrl}`);
  return target;
}
