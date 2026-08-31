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
    primaryQuery: "FRP profiles manufacturer",
    intent: "commercial",
    title: "FRP Profiles Manufacturer — Factory-Direct | F1 Composite",
    description:
      "Factory-direct FRP profiles manufacturer in China for structural shapes, gratings, window frames and custom pultrusions. EN 13706, ASTM D3917 and global supply.",
    supportingUrls: [
      "/pultruded-frp-profiles",
      "/products/fiberglass-structural-shapes",
      "/products/frp-pultrusion-manufacturer-factory-direct",
      "/about",
    ],
  },
  {
    targetUrl: "/what-is-frp",
    primaryQuery: "what is FRP",
    intent: "guide",
    title: "What Is FRP? Definition, Materials, Properties & Uses",
    description:
      "What is FRP? Learn how fiber reinforced plastic combines glass and resin, how it is made, its properties, standards, uses and engineering limits.",
    supportingUrls: [
      "/resources/blog/fiberglass-reinforced-plastic",
      "/resources/blog/frp-material",
      "/resources/blog/frp-meaning",
      "/technology/pultrusion-process",
      "/technology/frp-vs-traditional-materials",
      "/resources/glossary",
    ],
  },
  {
    targetUrl: "/resources/blog/fiberglass-reinforced-plastic",
    primaryQuery: "fiberglass reinforced plastic",
    intent: "guide",
    title: "Fiberglass Reinforced Plastic: Types, Properties & Uses",
    description:
      "Fiberglass reinforced plastic combines glass fibers with polymer resin. Learn its composition, forms, properties, manufacturing methods and structural uses.",
    supportingUrls: [
      "/what-is-frp",
      "/resources/blog/frp-material",
      "/pultruded-frp-profiles",
    ],
  },
  {
    targetUrl: "/resources/blog/frp-material",
    primaryQuery: "FRP material",
    intent: "technical",
    title: "FRP Material: Properties, Types & Selection Guide",
    description:
      "Compare FRP material fibers, resins and properties. Learn how engineers select a laminate by load, corrosion, fire, temperature and manufacturing method.",
    supportingUrls: [
      "/what-is-frp",
      "/resources/blog/fiberglass-reinforced-plastic",
      "/resources/technical-data",
    ],
  },
  {
    targetUrl: "/resources/blog/frp-meaning",
    primaryQuery: "FRP meaning",
    intent: "guide",
    title: "FRP Meaning: Fiber Reinforced Polymer Explained",
    description:
      "FRP means fiber reinforced polymer or fiber reinforced plastic. Learn FRP, GFRP, GRP and CFRP terminology and how to read the terms in specifications.",
    supportingUrls: [
      "/what-is-frp",
      "/resources/blog/fiberglass-reinforced-plastic",
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
      "/products/fiberglass-structural-shapes",
      "/products/custom-pultruded-profiles",
      "/technology/pultrusion-process",
      "/resources/how-to-choose-frp-pultrusion-supplier",
    ],
  },
  {
    targetUrl: "/products/fiberglass-structural-shapes",
    primaryQuery: "fiberglass structural shapes",
    intent: "commercial",
    title: "Fiberglass Structural Shapes — FRP Sizes & Weights",
    description:
      "Compare 114 fiberglass structural shapes: I-beams, channels, angles, tubes, flat bars and rods, with dimensions, weights and section data.",
    supportingUrls: [
      "/products/fiberglass-structural-shapes/frp-i-beam",
      "/products/fiberglass-structural-shapes/frp-channel",
      "/products/fiberglass-structural-shapes/frp-angle",
      "/frp-span-tables",
    ],
  },
  {
    targetUrl: "/products/product-lines",
    primaryQuery: "F1 Composite product lines",
    intent: "brand",
    title: "FRP Product Lines: F1-STRUX, F1-GRID, F1-THERM, F1-FORM",
    description:
      "Explore F1 Composite's four product lines for structural profiles, gratings, fenestration systems and custom pultrusions exported for global projects.",
    supportingUrls: [
      "/pultruded-frp-profiles",
      "/products/frp-gratings",
      "/products/frp-deck-panels",
      "/products/molded-frp-grating",
      "/products/frp-ladders",
      "/products/frp-handrail-systems",
      "/products/frp-window-frames",
      "/products/custom-pultruded-profiles",
    ],
  },
  {
    targetUrl: "/products/custom-pultruded-profiles",
    primaryQuery: "custom pultrusion manufacturer",
    intent: "commercial",
    title: "Custom Pultruded Profiles | FRP Pultrusion Manufacturer",
    description:
      "Custom pultruded profiles from an FRP pultrusion manufacturer with in-house tooling, material selection and production up to 600×300 mm.",
    supportingUrls: ["/pultruded-frp-profiles", "/technology/pultrusion-process"],
  },
  {
    targetUrl: "/products/frp-window-frames",
    primaryQuery: "FRP window frames",
    intent: "commercial",
    title: "FRP Window Frames — Pultruded Profiles & Finished Units",
    description:
      "Work with an FRP window frame manufacturer supplying finished fiberglass windows, doors and pultruded lineals in 65–140 series, with U-values to 0.78 W/m²·K.",
    supportingUrls: [
      "/resources/frp-windows-guide",
      "/technology/polyurethane-pultrusion-windows",
      "/technology/frp-vs-aluminum-windows",
      "/technology/frp-vs-pvc-windows",
    ],
  },
  {
    targetUrl: "/products/frp-pultrusion-manufacturer-factory-direct",
    primaryQuery: "FRP pultrusion manufacturer factory direct",
    intent: "commercial",
    title: "FRP Pultrusion Manufacturer — Factory-Direct Supply",
    description:
      "Source pultruded FRP factory-direct with documented capacity, tooling, quality control, FOB or DDP delivery, and engineering support for global projects.",
    supportingUrls: [
      "/",
      "/pultruded-frp-profiles",
      "/resources/frp-pultrusion-fob-ddp-export-guide",
      "/technology/quality-testing",
    ],
  },
  {
    targetUrl: "/technology/polyurethane-pultrusion-windows",
    primaryQuery: "polyurethane pultrusion windows",
    intent: "technical",
    title: "Polyurethane Pultrusion Windows — GFRP-PU Technology",
    description:
      "Learn how GFRP-PU window frames are pultruded, why polyurethane improves toughness and thin-wall performance, and where the technology fits.",
    supportingUrls: ["/products/frp-window-frames", "/resources/frp-windows-guide"],
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
      "/products/custom-pultruded-profiles",
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
    supportingUrls: ["/products/frp-window-frames", "/technology/polyurethane-pultrusion-windows"],
  },
  {
    targetUrl: "/products/frp-ladders",
    primaryQuery: "fiberglass fixed ladder",
    intent: "commercial",
    title: "Fiberglass Fixed Ladders | Industrial FRP Ladder Systems",
    description:
      "Industrial fiberglass fixed ladders and FRP access systems for corrosive facilities. Compare side rails, rungs, optional cage components and drawing inputs.",
    supportingUrls: [
      "/products/frp-handrail-systems",
      "/products/frp-stair-treads",
      "/products/fiberglass-structural-shapes/frp-square-tube",
      "/applications/frp-chemical-plant-platforms",
      "/industries/industrial",
    ],
  },
  {
    targetUrl: "/products/fiberglass-stakes",
    primaryQuery: "fiberglass stakes manufacturer",
    intent: "commercial",
    title: "Fiberglass Stakes Manufacturer | FRP Plant & Tree Stakes",
    description:
      "Fiberglass stakes manufacturer for 5–19 mm FRP plant, tree, vineyard and nursery rods. Compare sizes, colors, tapered ends, surface veil and RFQ inputs.",
    supportingUrls: [
      "/products/fiberglass-snow-markers",
      "/products/fiberglass-structural-shapes/frp-rod",
      "/products/custom-pultruded-profiles",
      "/products/frp-rebar",
      "/technology/pultrusion-process",
      "/technology/quality-testing",
    ],
  },
  {
    targetUrl: "/products/frp-handrail-systems",
    primaryQuery: "fiberglass handrail systems",
    intent: "commercial",
    title: "Fiberglass Handrail Systems | Industrial FRP Railing",
    description:
      "Industrial FRP handrail systems with fiberglass posts, top and mid rails, toe boards, fittings and base options. Configure layouts to the project load basis.",
    supportingUrls: [
      "/products/frp-ladders",
      "/products/frp-stair-treads",
      "/products/fiberglass-structural-shapes/frp-tube",
      "/products/fiberglass-structural-shapes/frp-square-tube",
      "/applications/frp-chemical-plant-platforms",
    ],
  },
  {
    targetUrl: "/products/frp-gratings",
    primaryQuery: "pultruded FRP grating manufacturer",
    intent: "commercial",
    title: "Pultruded FRP Grating Manufacturer | T-Bar & I-Bar",
    description:
      "Compare pultruded FRP grating T-bar, I-bar, high-load and high-open series with manual-derived nominal data, M/J/T 316SS clips and load-table support.",
    supportingUrls: [
      "/products/frp-deck-panels",
      "/products/molded-frp-grating",
      "/technology/frp-vs-steel-gratings",
      "/regions/frp-grating-supplier-saudi-arabia",
      "/applications/frp-chemical-plant-platforms",
    ],
  },
  {
    targetUrl: "/products/frp-deck-panels",
    primaryQuery: "structural FRP deck panels",
    intent: "commercial",
    title: "Structural FRP Deck Panels | 12 Cross-Sections",
    description:
      "Compare 12 structural FRP deck-panel cross-sections with neutral drawings, nominal A/B/t1/t2 values, joint geometry and project approval requirements.",
    supportingUrls: [
      "/applications/frp-bridge-deck-panels",
      "/applications/frp-pedestrian-bridge-superstructures",
      "/industries/infrastructure",
      "/case-studies/european-bridge-deck",
      "/products/frp-gratings",
    ],
  },
  {
    targetUrl: "/products/molded-frp-grating",
    primaryQuery: "molded FRP grating",
    intent: "commercial",
    title: "Molded FRP Grating Manufacturer | Mesh Sizes & Clips",
    description:
      "Compare molded fiberglass grating mesh, depths, panel sizes, nominal weights and open area, with gritted surfaces and matched M/C/J 316SS clips.",
    supportingUrls: [
      "/products/frp-gratings",
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
    supportingUrls: ["/products/molded-frp-grating", "/products/frp-gratings", "/industries/industrial"],
  },
  {
    targetUrl: "/technology/fiberglass-rebar-vs-steel",
    primaryQuery: "fiberglass rebar vs steel",
    intent: "comparison",
    title: "Fiberglass Rebar vs Steel — Test Data & Design Tradeoffs",
    description:
      "Compare fiberglass rebar vs steel using FHWA, MnDOT, university-lab and ASTM data on strength, stiffness, weight, durability, cracking and lifecycle cost.",
    supportingUrls: [
      "/products/frp-rebar",
      "/industries/infrastructure",
      "/industries/construction",
      "/technology/frp-vs-traditional-materials",
    ],
  },
  {
    targetUrl: "/frp-profile-calculator",
    primaryQuery: "FRP calculator",
    intent: "technical",
    title: "FRP Calculator — Beam, Load & Section Properties",
    description:
      "Run preliminary bending, shear and deflection screens for pultruded FRP profiles with method-specific EN, GB and ASCE-oriented input datasets.",
    supportingUrls: ["/frp-span-tables", "/products/fiberglass-structural-shapes"],
  },
  {
    targetUrl: "/frp-span-tables",
    primaryQuery: "FRP span tables",
    intent: "technical",
    title: "FRP Span Tables — Pultruded Fiberglass Load Charts",
    description:
      "Use allowable uniform-load span tables for pultruded FRP I-beams, channels and tubes based on EN 13706 E23, ASCE/SEI 74-23 and L/250 deflection.",
    supportingUrls: ["/frp-profile-calculator", "/products/fiberglass-structural-shapes"],
  },
  {
    targetUrl: "/fiberglass-pultruded-profile-price",
    primaryQuery: "fiberglass pultruded profile price",
    intent: "commercial",
    title: "Fiberglass Pultruded Profile Price — Estimator & Guide",
    description:
      "Estimate fiberglass pultruded profile prices in USD per meter and kilogram. See how section size, resin, glass content, finish and order volume affect cost.",
    supportingUrls: ["/pultruded-frp-profiles", "/products/fiberglass-structural-shapes"],
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
