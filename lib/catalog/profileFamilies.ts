// Display names and family pages for the catalog shapes, shared by the site
// search and the profile finder.

import type { ShapeId } from "./shapes";

export interface ProfileFamily {
  label: string;
  /** The standard profile page that lists the family's sizes. */
  url: string;
}

export const PROFILE_FAMILIES: Record<ShapeId, ProfileFamily> = {
  i_beam: { label: "I-beam", url: "/products/fiberglass-structural-shapes/frp-i-beam" },
  channel: { label: "Channel", url: "/products/fiberglass-structural-shapes/frp-channel" },
  angle: { label: "Angle", url: "/products/fiberglass-structural-shapes/frp-angle" },
  shs: { label: "Square tube", url: "/products/fiberglass-structural-shapes/frp-square-tube" },
  rhs: { label: "Rectangular tube", url: "/products/fiberglass-structural-shapes/frp-square-tube" },
  tube: { label: "Round tube", url: "/products/fiberglass-structural-shapes/frp-tube" },
  rod: { label: "Rod", url: "/products/fiberglass-structural-shapes/frp-rod" },
  flat: { label: "Flat bar", url: "/products/fiberglass-structural-shapes/frp-flat-bar" },
};

/** Catalog order: open sections, closed sections, then solid bars. */
export const FAMILY_ORDER: readonly ShapeId[] = ["i_beam", "channel", "angle", "shs", "rhs", "tube", "rod", "flat"];
