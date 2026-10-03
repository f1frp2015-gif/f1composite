import { sourcingHeroImages, frpzsImages, supplierImageNote } from "@/content/data/sourcingImages";
import { industryPages, type IndustryPageData } from "@/content/data/industryPages";
import { applicationPages } from "@/lib/applicationPages";
import type { BlogPost } from "@/content/data/blogPosts";
import { specialistProductIndex } from "@/content/data/pultrusionGuideIndex";

/**
 * Cover images for cards that lead to another page. The rule: a card shows
 * the page it opens, so its cover is that page's own lead image, or for a
 * product the product itself.
 *
 * Product covers are cut-outs centred on a 1200×750 white canvas at one scale
 * (public/images/covers, made with scripts/make-product-cover.mjs and
 * scripts/compose-family-cover.mjs), so a grid of products reads as a set.
 * Photos of places fill the frame and keep the source label their page gives
 * them ("Project photo", "Supplier photo", "Illustrative photo").
 */
export interface Cover {
  src: string;
  alt: string;
  /** "contain" for an image of another ratio that must show whole; covers otherwise fill the frame. */
  fit?: "cover" | "contain";
  /** The photo's source, as its page labels it: "Project photo", "Supplier photo", "Illustrative photo" … */
  note?: string;
  /** CSS object-position for a photo whose subject is off center. */
  position?: string;
}

// Prepared at the card's 16:10 ratio with their margins built in, so they fill
// the frame without cropping.
const product = (file: string, alt: string): Cover => ({ src: `/images/covers/${file}`, alt });

// Notes as the site writes them in figure heads.
const ILLUSTRATIVE = "Illustrative photo";

export const productCovers = {
  "/products/fiberglass-square-rods": { src: "/images/products/custom-range/fiberglass-square-rods.svg", alt: "Schematic of fiberglass square rods; conceptual geometry, not a production drawing", note: "Concept diagram" },
  "/products/fiberglass-t-profiles": { src: "/images/products/custom-range/fiberglass-t-profiles.svg", alt: "Schematic of fiberglass t profiles; conceptual geometry, not a production drawing", note: "Concept diagram" },
  "/products/frp-sheet-piling": { src: "/images/products/custom-range/frp-sheet-piling.svg", alt: "Schematic of frp sheet piling; conceptual geometry, not a production drawing", note: "Concept diagram" },
  "/products/frp-rock-bolts": { src: "/images/products/custom-range/frp-rock-bolts.svg", alt: "Schematic of frp rock bolts; conceptual geometry, not a production drawing", note: "Concept diagram" },
  "/products/frp-fencing": { src: "/images/products/custom-range/frp-fencing.svg", alt: "Schematic of frp fencing; conceptual geometry, not a production drawing", note: "Concept diagram" },

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
  "/products/frp-sound-barrier-wall": { src: "/images/products/frp-sound-barrier-wall/frp-sound-barrier-wall-highway.webp", alt: "FRP sound barrier wall along a highway" },
  "/products/frp-facade-panels": { src: "/images/products/facade-sunshade/frp-facade-sunshade-vertical-fins-curtain-wall.webp", alt: "Vertical fin sunshades on a curtain wall facade" },
  "/products/fiberglass-snow-markers": { src: "/images/products/fiberglass-snow-markers/fiberglass-snow-markers-reflective-stakes.webp", alt: "Fiberglass snow markers in five colors with reflective bands" },
  "/products/fiberglass-stakes": { src: "/images/products/fiberglass-stakes/fiberglass-stakes-size-range.webp", alt: "Green fiberglass stakes in several diameters and lengths" },
  "/products/fiberglass-dog-bone": { src: "/images/products/fiberglass-dog-bone/fiberglass-dog-bone-section.svg", alt: "Schematic fiberglass dog bone profile section" },
  "/products/frp-handrail-systems": { src: "/images/products/frp-handrail-systems/fiberglass-handrail-industrial-platform.webp", alt: "Yellow fiberglass handrails around industrial platforms and stairs", note: "Reference photo" },
  "/products/frp-ladders": { src: "/images/products/frp-ladders/fiberglass-fixed-ladder-cage.webp", alt: "Yellow fiberglass fixed ladder with cage hoops", note: "Reference photo" },
  "/products/frp-stair-treads": { src: "/images/products/frp-stair-treads/frp-stair-tread-covers-installed.webp", alt: "Black gritted fiberglass stair tread covers with yellow nosings", note: "Supplier photo" },
  "/products/frp-pultrusion-manufacturer-factory-direct": { src: "/images/f1-photos/f1-composite-pultrusion-hall-krauss-maffei-lines.webp", alt: "F1 Composite pultrusion hall with rows of pultrusion lines" },
} satisfies Record<string, Cover>;

// Industry pages keep their header image in industryPages.ts; the three guides
// and the construction page have their own.
export const industryCovers: Record<string, Cover> = {
  ...Object.fromEntries(
    (Object.values(industryPages) as IndustryPageData[]).map((page) => [
      page.path,
      {
        src: page.image.src,
        alt: page.image.alt,
        note: page.image.note,
      },
    ]),
  ),
  "/industries/construction": { src: "/images/industries/frp-building-applications-overview.webp", alt: "Building with numbered FRP application areas" },
};

// Tools show themselves: a crop of each tool's working panel, captured from
// the live page at 16:10 (public/images/covers/tools). Recapture after a
// visible redesign of a tool.
const tool = (file: string, alt: string): Cover => ({ src: `/images/covers/tools/${file}`, alt, position: "left top" });

export const toolCovers = {
  "/tools/profile-finder": tool("profile-finder.webp", "Profile finder with shape filters and a table of standard sizes"),
  "/frp-profile-calculator": tool("profile-calculator.webp", "FRP profile calculator results for bending, shear and deflection"),
  "/frp-span-tables": tool("span-tables.webp", "Span table of allowable loads for FRP I-beams from 1 to 2.5 m"),
  "/frp-density-calculator": tool("density-calculator.webp", "Density calculator with calculation modes, section inputs and the material balance"),
  "/fiberglass-pultruded-profile-price": tool("price-estimator.webp", "Price estimator showing an indicative price per meter"),
  "/tools/thermal-expansion-calculator": tool("thermal-expansion.webp", "Thermal expansion calculator inputs for an FRP member"),
  "/tools/handrail-load-calculator": tool("handrail-load.webp", "Handrail load check inputs for posts and top rails"),
  "/tools/access-geometry-checker": tool("access-geometry.webp", "Ladder, stair and walkway geometry checker"),
  "/tools/gfrp-rebar-calculator": tool("gfrp-rebar.webp", "GFRP rebar calculator matching a steel bar size"),
  "/tools/frp-column-calculator": tool("column-buckling.webp", "Column buckling calculator with section, length, end conditions and utilization"),
  "/tools/frp-cut-list-optimizer": tool("cut-list.webp", "Cut list optimizer with piece lengths, quantities and stock bar options"),
  "/tools/frp-life-cycle-cost-calculator": tool("life-cycle-cost.webp", "Life-cycle cost calculator with study period, discount rate and steel corrosivity inputs"),
  "/tools/frp-unit-converter": tool("unit-converter.webp", "Unit converter with quantity chips for stress, modulus, loads and thermal values"),
  "/technology/frp-u-value-calculator": tool("u-value-calculator.webp", "Whole-window U-value calculator with frame, glass and spacer inputs and the result"),
  "/ask": tool("engineering-assistant.webp", "Engineering assistant chat panel with starter questions"),
  "/ai/sourcing": tool("sourcing-assistant.webp", "Sourcing assistant project description and starting points"),
  "/ai/passive-house": tool("passive-house-selector.webp", "Passive House window selector with climate classes and window types"),
} satisfies Record<string, Cover>;

// Resource pages without a lead image show their own key table or list, like
// the tool covers; the windows guide opens on the window it is about.
const resource = (file: string, alt: string): Cover => ({ src: `/images/covers/resources/${file}`, alt, position: "left top" });

export const resourceCovers = {
  "/resources/technical-data": resource("technical-data.webp", "Table of E23 laminate properties with published values and EN 13706 minimums"),
  "/resources/evidence": resource("evidence.webp", "Table of reported results from SGS, PHI and Intertek test reports"),
  "/resources/downloads": resource("downloads.webp", "Document library with type filters and test report cards"),
  "/resources/design-guides": resource("design-guides.webp", "List of FRP design guides available on request"),
  "/resources/glossary": resource("glossary.webp", "Glossary entries for FRP, GRP and fiberglass"),
  "/resources/frp-pultrusion-fob-ddp-export-guide": resource("export-guide.webp", "Table comparing FOB, CIF, DAP and DDP responsibilities"),
  "/resources/how-to-choose-frp-pultrusion-supplier": resource("supplier-guide.webp", "Checklist cards for vetting an FRP pultrusion supplier"),
  "/resources/frp-windows-guide": { src: "/images/products/window-door/frp-window-frame-70-series-inward-hero.webp", alt: "Corner section of a 70-series FRP window frame with triple glazing", fit: "contain" },
} satisfies Record<string, Cover>;

export const applicationCovers: Record<string, Cover> = Object.fromEntries(
  [
    ...applicationPages.map((page) => [`/applications/${page.slug}`, { src: page.image, alt: page.imageAlt, note: page.imageNote }]),
    ...specialistProductIndex.map((page) => [`/products/${page.slug}`, { src: page.image, alt: page.imageAlt, note: "Component schematic" }]),
  ],
);

// Case studies open on Figure 1 of the case, with the same note.
const project = (file: string, alt: string, note?: string): Cover => ({ src: `/images/case-studies/${file}`, alt, ...(note ? { note } : {}) });

export const caseStudyCovers = {
  // The bridge page opens on its exploded-view drawing (Figure 01), captured on its own ground.
  "/case-studies/beam-bridge": { src: "/images/covers/case-studies/beam-bridge-exploded-view.webp", alt: "Exploded view of a 12 m FRP beam bridge: pultruded GRP I-beams, cross-members, deck and railing", note: "Concept drawing" },
  "/case-studies/qinling-station-antarctic-passive-windows": project("frp-qinling-station-antarctic-ross-sea-aerial.webp", "Qinling Station on the Ross Sea coast, Antarctica, seen from above"),
  "/case-studies/yancheng-talent-apartment-fenestration": project("frp-talent-apartment-yancheng-aerial-view.webp", "Yancheng talent apartment development seen from above"),
  "/case-studies/baotou-industrial-gfrp-pu-windows": project("frp-baotou-industrial-park-aerial.webp", "Baotou industrial park, with workshop buildings, rooftop PV and an office block"),
  "/case-studies/wanhua-yantai-zero-carbon-windows": project("frp-wanhua-yantai-zero-carbon-community-aerial.webp", "Wanhua Yantai zero-carbon community seen from above"),
  "/case-studies/chongqing-rooftop-pv-frp-rail": project("frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp", "PV modules on pultruded FRP rails over a blue color steel-tile factory roof in Chongqing", "Project photo"),
  "/case-studies/factory-access-staircase": { src: "/images/f1-photos/frp-factory-access-staircase-hero.webp", alt: "FRP access staircase and platform with orange handrails inside F1 Composite's Chongqing plant", note: "Project photo" },
  "/case-studies/european-bridge-deck": project("frp-bridge-deck-replacement-infrastructure-project.jpg", "Covered pedestrian bridge with curved timber slats and a white steel arch", ILLUSTRATIVE),
  "/case-studies/coastal-marina-walkway": project("frp-coastal-marina-walkway-grating-system.jpg", "Paved walkway with steel railings leading down to a marina on a lake", ILLUSTRATIVE),
  "/case-studies/water-treatment-cable-tray": project("frp-water-treatment-plant-aerial-cable-tray-handrail.webp", "Aerial view of circular clarifiers and rectangular basins at a water treatment plant", ILLUSTRATIVE),
} satisfies Record<string, Cover>;

// Technology pages open on their header figure; the tools keep their own covers.
export const technologyCovers = {
  "/sourcing/pultrusion-machines": { src: sourcingHeroImages["pultrusion-machines"].src, alt: sourcingHeroImages["pultrusion-machines"].alt, note: supplierImageNote, fit: "contain" },
  "/sourcing/pultrusion-dies": { src: sourcingHeroImages["pultrusion-dies"].src, alt: sourcingHeroImages["pultrusion-dies"].alt, note: supplierImageNote, fit: "contain" },
  "/sourcing/resin-mixing-injection": { src: sourcingHeroImages["resin-mixing-injection"].src, alt: sourcingHeroImages["resin-mixing-injection"].alt, note: supplierImageNote, fit: "contain" },
  "/sourcing/pullwinding-equipment": { src: "/images/sourcing/pullwinding-equipment.svg", alt: "Diagram of pullwinding equipment showing the main specification interfaces" },
  "/sourcing/slitting-cutting-equipment": { src: "/images/sourcing/slitting-cutting-equipment.svg", alt: "Diagram of mat slitters & profile cutters showing the main specification interfaces" },
  "/sourcing/smc-production-lines": { src: "/images/sourcing/smc-production-lines.svg", alt: "Diagram of smc production lines showing the main specification interfaces" },
  "/sourcing/bmc-smc-molds": { src: "/images/sourcing/bmc-smc-molds.svg", alt: "Diagram of bmc & smc molds showing the main specification interfaces" },
  "/sourcing/fiberglass-direct-roving": { src: "/images/sourcing/fiberglass-direct-roving.svg", alt: "Diagram of fiberglass direct roving showing the main specification interfaces" },
  "/sourcing/fiberglass-mat-veil": { src: "/images/sourcing/fiberglass-mat-veil.svg", alt: "Diagram of fiberglass mat & surface veil showing the main specification interfaces" },
  "/sourcing/stitched-fiberglass-fabrics": { src: "/images/sourcing/stitched-fiberglass-fabrics.svg", alt: "Diagram of stitched fiberglass fabrics showing the main specification interfaces" },
  "/sourcing/gelcoat-resins": { src: "/images/sourcing/gelcoat-resins.svg", alt: "Diagram of gelcoat resins showing the main specification interfaces" },
  "/sourcing/equipment": { src: frpzsImages.hydraulicLine.src, alt: frpzsImages.hydraulicLine.alt, note: supplierImageNote, fit: "contain" },
  "/sourcing/materials": { src: "/images/sourcing/materials.svg", alt: "Sourcing specification and qualification workflow" },

  "/technology/pultruded-profile-performance": { src: "/images/technology/frp-profile-engineering-drawing-3d-view.jpg", alt: "Dimensioned drawing and 3D view of a custom pultruded FRP profile", fit: "contain" },
  "/technology/pultrusion-process": { src: "/images/f1-photos/f1-composite-pultrusion-production-line-aerial.webp", alt: "Parallel pultrusion lines in production at an F1 Composite plant", note: "Production photo" },
  "/technology/frp-vs-traditional-materials": { src: "/images/technology/frp-vs-steel-aluminum-timber-concrete-material-comparison.jpg", alt: "Surfaces of FRP, steel, timber and galvanized steel side by side", note: ILLUSTRATIVE },
  "/technology/fiberglass-rebar-vs-steel": { src: "/images/products/frp-rebar/gfrp-straight-bars.webp", alt: "Helically surfaced GFRP reinforcing bars", note: "Supplier photo" },
  "/technology/pultrusion-resin-systems": { src: "/images/technology/resin-formulation-laboratory-testing.jpg", alt: "Resin samples dispensed into test tubes in a laboratory", note: ILLUSTRATIVE },
  "/technology/polyurethane-pultrusion-windows": { src: "/images/products/window-door/frp-window-frame-90-series-corner-section.webp", alt: "Corner section of a 90-series GFRP-PU window frame with triple glazing", fit: "contain" },
  "/technology/quality-testing": { src: "/images/technology/f1-composite-quality-testing-laboratory.webp", alt: "Technician at work in a materials testing laboratory", note: ILLUSTRATIVE },
  "/technology/knowhow-services": { src: "/images/f1-photos/f1-composite-pultrusion-hall-krauss-maffei-lines.webp", alt: "Pultrusion lines in an F1 Composite production hall", note: "Production photo" },
  // Comparison pages open on a table rather than a picture, so their cards show it.
  "/technology/frp-vs-aluminum-windows": { src: "/images/covers/technology/vs-aluminum-windows.webp", alt: "Table comparing FRP and thermally broken aluminum window frame properties", position: "left top" },
  "/technology/frp-vs-pvc-windows": { src: "/images/covers/technology/vs-pvc-windows.webp", alt: "Table comparing FRP and uPVC window frame properties", position: "left top" },
  "/technology/frp-vs-steel-gratings": { src: "/images/covers/technology/vs-steel-gratings.webp", alt: "Table comparing FRP and galvanized steel grating properties", position: "left top" },
  "/technology/pultrusion-vs-extrusion-filament-winding": { src: "/images/covers/technology/vs-extrusion.webp", alt: "Table comparing pultrusion, extrusion and filament winding", position: "left top" },
  "/technology/china-alternative-to-strongwell-fiberline-exel": { src: "/images/covers/technology/alt-strongwell.webp", alt: "Table comparing F1-STRUX with Western pultrusion suppliers", position: "left top" },
  "/technology/china-alternative-to-tencom-creative-pultrusions-windows": { src: "/images/covers/technology/alt-tencom.webp", alt: "Table comparing F1-THERM with North American window lineal suppliers", position: "left top" },
} satisfies Record<string, Cover>;

// Market pages open on their header figure, so the hub shows the same picture
// with the same note. The pages read their figure from here.
export const regionCovers = {
  "/regions/frp-pultrusion-supplier-usa": { src: "/images/f1-photos/f1-composite-pultrusion-plant-floor.webp", alt: "Finished pultruded profiles on inspection tables in an F1 Composite plant", note: "Production photo" },
  "/regions/frp-passive-house-windows-canada": { src: "/images/regions/frp-passive-house-windows-canada.jpg", alt: "Snow-covered trees and icicles seen through a window in winter", note: ILLUSTRATIVE },
  "/regions/frp-passive-house-windows-germany": { src: "/images/regions/frp-passive-house-windows-germany.jpg", alt: "Detached modern house with large windows and a timber-clad upper floor", note: ILLUSTRATIVE },
  "/regions/grp-windows-uk": { src: "/images/regions/grp-windows-uk.jpg", alt: "Office facade with dark window frames in a repeating grid", note: ILLUSTRATIVE },
  "/regions/frp-grating-supplier-saudi-arabia": { src: "/images/industries/frp-industrial-chemical-plant-facility.jpg", alt: "Petrochemical plant with a distillation column, pipe racks and two storage spheres", note: ILLUSTRATIVE },
  "/regions/frp-cable-tray-uae-oil-gas": { src: "/images/industries/industrial-cable-ladder-support.webp", alt: "FRP cable ladder on wall brackets in a chemical processing corridor" },
  "/regions/pultruded-frp-solar-mounting-australia": { src: "/images/industries/frp-energy-solar-power-installation.jpg", alt: "Two installers fixing solar panels to mounting rails on a flat roof", note: ILLUSTRATIVE },
} satisfies Record<string, Cover>;

/** The cover for a page, when one is registered. */
export function coverFor(href: string): Cover | undefined {
  const path = href.split(/[?#]/)[0];
  return (
    (productCovers as Record<string, Cover>)[path] ??
    industryCovers[path] ??
    applicationCovers[path] ??
    (toolCovers as Record<string, Cover>)[path] ??
    (caseStudyCovers as Record<string, Cover>)[path] ??
    (technologyCovers as Record<string, Cover>)[path] ??
    (regionCovers as Record<string, Cover>)[path] ??
    (resourceCovers as Record<string, Cover>)[path]
  );
}

// Articles show some photos whole; a card fills its frame with them instead.
const blogCardCovers: Record<string, Partial<Cover>> = {
  "frp-cable-tray-trunking-ladder-vs-metal": { fit: "cover" },
  "china-first-all-composite-truss-bridge-pengshui": { fit: "cover" },
  "gfrp-rebar-specification-guide-aci-440-astm-d7957": { fit: "cover" },
};

/** A blog post's cover for a card, labelled as the post labels it. */
export function blogCover(post: Pick<BlogPost, "slug" | "coverImage" | "coverAlt" | "coverNote" | "coverImageFit" | "coverImagePosition">): Cover {
  return {
    src: post.coverImage,
    alt: post.coverAlt,
    note: post.coverNote,
    ...(post.coverImageFit === "contain" ? { fit: "contain" as const } : {}),
    ...(post.coverImagePosition ? { position: post.coverImagePosition } : {}),
    ...blogCardCovers[post.slug],
  };
}
