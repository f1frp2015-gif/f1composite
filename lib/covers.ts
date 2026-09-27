import { industryPages } from "@/content/data/industryPages";
import { applicationPages } from "@/lib/applicationPages";

/**
 * Cover images for cards that lead to another page. The rule: a card shows
 * the page it opens, so its cover is that page's own lead image, or for a
 * product the product itself.
 *
 * Product covers are cut-outs centred on a 1200×750 white canvas at one scale
 * (public/images/covers, made with scripts/make-product-cover.mjs and
 * scripts/compose-family-cover.mjs), so a grid of products reads as a set.
 * Photos and renderings of places fill the frame and keep the label their page
 * gives them ("AI concept", "Rendering", "Illustrative photo").
 */
export interface Cover {
  src: string;
  alt: string;
  /** "contain" for an image of another ratio that must show whole; covers otherwise fill the frame. */
  fit?: "cover" | "contain";
  /** What kind of image this is, when it could be mistaken for an F1 project photo. */
  note?: string;
  /** CSS object-position for a photo whose subject is off center. */
  position?: string;
}

// Prepared at the card's 16:10 ratio with their margins built in, so they fill
// the frame without cropping.
const product = (file: string, alt: string): Cover => ({ src: `/images/covers/${file}`, alt });

// Notes as the site writes them in figure heads.
const AI_CONCEPT = "AI concept";
const RENDERING = "Rendering";
const ILLUSTRATIVE = "Illustrative photo";

export const productCovers = {
  "/products/fiberglass-structural-shapes": product("standard-profiles.webp", "Pultruded fiberglass I-beam, channel, square tube and angle"),
  "/products/fiberglass-structural-shapes/frp-i-beam": product("frp-i-beam.webp", "Pultruded fiberglass I-beam"),
  "/products/fiberglass-structural-shapes/frp-channel": product("frp-channel.webp", "Pultruded fiberglass channel"),
  "/products/fiberglass-structural-shapes/frp-angle": product("frp-angle.webp", "Pultruded fiberglass equal angle"),
  "/products/fiberglass-structural-shapes/frp-square-tube": product("frp-square-tube.webp", "Pultruded fiberglass square tube"),
  "/products/fiberglass-structural-shapes/frp-tube": product("frp-round-tube.webp", "Pultruded fiberglass round tube"),
  "/products/fiberglass-structural-shapes/frp-rod": product("frp-rod.webp", "Solid pultruded fiberglass round rod with a cut end"),
  "/products/fiberglass-structural-shapes/frp-flat-bar": product("frp-flat-bar.webp", "Pultruded fiberglass flat bar"),
  "/products/fiberglass-sheets": product("fiberglass-sheet.webp", "White pultruded fiberglass flat sheet"),
  "/products/fiberglass-plates": product("fiberglass-plate.webp", "Pultruded fiberglass plate profile with two enclosed cells"),
  "/products/frp-deck-panels": product("frp-deck-panel.webp", "Closed-profile pultruded FRP deck panel with internal webs"),
  "/products/custom-pultruded-profiles": product("custom-profile.webp", "Custom pultruded fiberglass profile with ribs and a formed edge"),
  "/products/frp-window-frames": product("window-profile.webp", "Fiberglass window frame corner with triple glazing and insulated chambers"),
  "/products/grating": product("frp-grating.webp", "Molded fiberglass grating panel beside pultruded bearing-bar grating"),
  "/products/molded-frp-grating": product("molded-frp-grating.webp", "Yellow molded fiberglass grating panel with a square mesh"),
  "/products/frp-gratings": product("pultruded-frp-grating.webp", "Yellow pultruded fiberglass grating with I-bar bearing bars and cross rods"),
  "/products/frp-rebar": product("frp-rebar.webp", "GFRP reinforcing bars in several diameters with helical surfaces"),
  "/products/frp-fasteners-fittings": product("frp-fasteners-fittings.webp", "Yellow molded fiberglass handrail fittings"),
  "/products/window-door-profiles": product("window-profile-samples.webp", "Five pultruded fiberglass window and door profiles showing their cross-sections"),
  "/products/fiberglass-windows-doors": product("finished-window.webp", "Corner of a finished fiberglass window with triple glazing"),
  "/products/frp-door-frames": product("door-frame.webp", "Three pultruded fiberglass door frame profiles with continuous raised stops"),
  "/products/fiberglass-door-thresholds": product("door-threshold.webp", "Pultruded fiberglass door threshold with hollow chambers and a stepped top"),
  "/products/wind-turbine-blade-panels": { ...product("wind-blade-panel.webp", "Pultruded fiberglass wind blade panel samples"), note: "Supplier photo" },
  "/products/frp-window-reinforcement": { src: "/images/products/upvc-window-fiberglass-reinforcement-context.jpg", alt: "White uPVC tilt-and-turn window", note: ILLUSTRATIVE, position: "center 35%" },
  "/products/frp-solar-mounting-systems": { src: "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp", alt: "Pultruded FRP solar mounting profiles supporting modules on an industrial rooftop in Chongqing", note: "Project photo" },
  "/products/frp-sound-barrier-wall": { src: "/images/products/frp-sound-barrier-wall/frp-sound-barrier-wall-highway.webp", alt: "Concept FRP sound barrier wall along a highway", note: AI_CONCEPT },
  "/products/frp-facade-panels": { src: "/images/products/facade-sunshade/frp-facade-sunshade-vertical-fins-curtain-wall.webp", alt: "Vertical fin sunshades on a curtain wall facade", note: RENDERING },
  "/products/fiberglass-snow-markers": { src: "/images/products/fiberglass-snow-markers/fiberglass-snow-markers-reflective-stakes.webp", alt: "Fiberglass snow markers in five colors with reflective bands", note: "Visualization" },
  "/products/fiberglass-stakes": { src: "/images/products/fiberglass-stakes/fiberglass-stakes-size-range.webp", alt: "Green fiberglass stakes in several diameters and lengths", note: "Visualization" },
  "/products/frp-handrail-systems": { src: "/images/products/frp-handrail-systems/fiberglass-handrail-industrial-platform.webp", alt: "Yellow fiberglass handrails around industrial platforms and stairs", note: "Reference photo" },
  "/products/frp-ladders": { src: "/images/products/frp-ladders/fiberglass-fixed-ladder-cage.webp", alt: "Yellow fiberglass fixed ladder with cage hoops", note: "Reference photo" },
  "/products/frp-stair-treads": { src: "/images/products/frp-stair-treads/frp-stair-tread-covers-installed.webp", alt: "Black gritted fiberglass stair tread covers with yellow nosings", note: "Supplier photo" },
  "/products/frp-pultrusion-manufacturer-factory-direct": { src: "/images/technology/f1-composite-pultrusion-hall-krauss-maffei-lines.webp", alt: "F1 Composite pultrusion hall with rows of pultrusion lines" },
} satisfies Record<string, Cover>;

// Industry pages keep their header image in industryPages.ts; the three guides
// and the construction page have their own.
export const industryCovers: Record<string, Cover> = {
  ...Object.fromEntries(
    Object.values(industryPages).map((page) => [
      page.path,
      {
        src: page.image.src,
        alt: page.image.alt,
        note: page.image.note,
      },
    ]),
  ),
  "/industries/construction": { src: "/images/industries/frp-building-applications-concept.webp", alt: "Concept building with numbered FRP application areas", note: "Illustration" },
};

// Tools show themselves: a crop of each tool's working panel, captured from
// the live page at 16:10 (public/images/covers/tools). Recapture after a
// visible redesign of a tool.
const tool = (file: string, alt: string): Cover => ({ src: `/images/covers/tools/${file}`, alt, position: "left top" });

export const toolCovers = {
  "/tools/profile-finder": tool("profile-finder.webp", "Profile finder with shape filters and a table of standard sizes"),
  "/frp-profile-calculator": tool("profile-calculator.webp", "FRP profile calculator results for bending, shear and deflection"),
  "/frp-span-tables": tool("span-tables.webp", "Span table of allowable loads for FRP I-beams from 1 to 2.5 m"),
  "/frp-density-calculator": tool("density.webp", "Density calculator options for a reinforcement layup"),
  "/fiberglass-pultruded-profile-price": tool("price-estimator.webp", "Price estimator showing an indicative price per meter"),
  "/tools/thermal-expansion-calculator": tool("thermal-expansion.webp", "Thermal expansion calculator inputs for an FRP member"),
  "/tools/handrail-load-calculator": tool("handrail-load.webp", "Handrail load check inputs for posts and top rails"),
  "/tools/access-geometry-checker": tool("access-geometry.webp", "Ladder, stair and walkway geometry checker"),
  "/tools/gfrp-rebar-calculator": tool("gfrp-rebar.webp", "GFRP rebar calculator matching a steel bar size"),
  "/technology/frp-u-value-calculator": tool("u-value.webp", "Whole-window U-value calculator"),
  "/ask": tool("ask.webp", "Engineering assistant question box with example questions"),
  "/ai/sourcing": tool("sourcing.webp", "Sourcing assistant project description and starting points"),
  "/ai/passive-house": tool("passive-house.webp", "Passive House window selector with climate classes and window types"),
} satisfies Record<string, Cover>;

export const applicationCovers: Record<string, Cover> = Object.fromEntries(
  applicationPages.map((page) => [`/applications/${page.slug}`, { src: page.image, alt: page.imageAlt, note: page.imageNote }]),
);

// Case studies open on Figure 1 of the case, with the same note: most window
// projects are shown by the architect's rendering, not a site photograph.
const project = (file: string, alt: string, note?: string): Cover => ({ src: `/images/case-studies/${file}`, alt, ...(note ? { note } : {}) });

export const caseStudyCovers = {
  "/case-studies/qinling-station-antarctic-passive-windows": project("frp-qinling-station-antarctic-ross-sea-aerial.webp", "Architectural rendering of Qinling Station on the Ross Sea coast, Antarctica", RENDERING),
  "/case-studies/yancheng-talent-apartment-fenestration": project("frp-talent-apartment-yancheng-aerial-view.webp", "Architectural rendering of the Yancheng talent apartment development from above", RENDERING),
  "/case-studies/baotou-industrial-gfrp-pu-windows": project("frp-baotou-industrial-park-aerial-rendering.webp", "Architectural rendering of the Baotou industrial park, with workshop buildings, rooftop PV and an office block", RENDERING),
  "/case-studies/wanhua-yantai-zero-carbon-windows": project("frp-wanhua-yantai-zero-carbon-community-aerial.webp", "Architectural rendering of the Wanhua Yantai zero-carbon community from above", RENDERING),
  "/case-studies/chongqing-rooftop-pv-frp-rail": project("frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp", "PV modules on pultruded FRP rails over a blue color steel-tile factory roof in Chongqing", "Project photo"),
  "/case-studies/factory-access-staircase": project("frp-factory-access-staircase-hero.webp", "FRP access staircase and platform with orange handrails inside F1 Composite's Chongqing plant", "Project photo"),
  "/case-studies/european-bridge-deck": project("frp-bridge-deck-replacement-infrastructure-project.jpg", "Covered pedestrian bridge with curved timber slats and a white steel arch", ILLUSTRATIVE),
  "/case-studies/coastal-marina-walkway": project("frp-coastal-marina-walkway-grating-system.jpg", "Paved walkway with steel railings leading down to a marina on a lake", ILLUSTRATIVE),
  "/case-studies/water-treatment-cable-tray": project("frp-water-treatment-plant-aerial-cable-tray-handrail.webp", "Aerial view of circular clarifiers and rectangular basins at a water treatment plant", ILLUSTRATIVE),
} satisfies Record<string, Cover>;

/** The cover for a page, when one is registered. */
export function coverFor(href: string): Cover | undefined {
  const path = href.split(/[?#]/)[0];
  return (
    (productCovers as Record<string, Cover>)[path] ??
    industryCovers[path] ??
    applicationCovers[path] ??
    (toolCovers as Record<string, Cover>)[path] ??
    (caseStudyCovers as Record<string, Cover>)[path]
  );
}
