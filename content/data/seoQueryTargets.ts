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
    title: "F1 Composite | FRP Manufacturing & Global Project Supply",
    description:
      "F1 Composite manufactures structural profiles, gratings, window systems and custom pultrusions for global projects, with EN 13706 and DDP supply support.",
    supportingUrls: ["/about", "/products/product-lines", "/regions"],
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
    title: "FRP Windows & Doors — Pultruded Fiberglass Systems",
    description:
      "Specify factory-assembled FRP windows and doors or pultruded fiberglass lineals for local fabrication. U-values to 0.78 W/m²·K and extreme-cold options.",
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
