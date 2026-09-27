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
        note: /AI-generated/i.test(page.image.note) ? AI_CONCEPT : /Rendering/i.test(page.image.note) ? RENDERING : /Illustrative/i.test(page.image.note) ? ILLUSTRATIVE : undefined,
      },
    ]),
  ),
  "/industries/construction": { src: "/images/industries/frp-building-applications-concept.webp", alt: "Concept building with numbered FRP application areas", note: "Concept" },
};

export const applicationCovers: Record<string, Cover> = Object.fromEntries(
  applicationPages.map((page) => [`/applications/${page.slug}`, { src: page.image, alt: page.imageAlt, note: page.imageNote }]),
);

/** The cover for a page, when one is registered. */
export function coverFor(href: string): Cover | undefined {
  const path = href.split(/[?#]/)[0];
  return (productCovers as Record<string, Cover>)[path] ?? industryCovers[path] ?? applicationCovers[path];
}
