import type { StandardSection } from "@/lib/catalog/standardProfiles";

export type Geometry =
  | { type: "round"; od: number; id: number }
  | { type: "square"; side: number; t: number }
  | { type: "rect"; w: number; h: number; t: number }
  | { type: "angle"; leg: number; t: number }
  | { type: "channel"; w: number; h: number; t: number }
  | { type: "i_beam"; bf: number; tf: number; h: number; tw: number };

export type ProfileType = Geometry["type"];

export function getPriceGeometryError(g: Geometry): string | null {
  const values: number[] = [];
  for (const [key, value] of Object.entries(g)) {
    if (key === "type" || (g.type === "round" && key === "id")) continue;
    if (typeof value === "number") values.push(value);
  }
  if (!values.every((value) => Number.isFinite(value) && value > 0)) {
    return "All section dimensions must be finite numbers greater than zero.";
  }

  if (g.type === "round") {
    if (!Number.isFinite(g.id) || g.id < 0) return "Inside diameter must be zero or greater.";
    if (g.id >= g.od) return "Inside diameter must be less than outside diameter.";
  }
  if (g.type === "square" && 2 * g.t >= g.side) {
    return "Square-tube wall is too large: 2·t must be less than the side dimension.";
  }
  if (g.type === "rect" && 2 * g.t >= Math.min(g.w, g.h)) {
    return "Rectangular-tube wall is too large: 2·t must be less than both width and height.";
  }
  if (g.type === "angle" && g.t >= g.leg) {
    return "Angle thickness must be less than the leg dimension.";
  }
  if (g.type === "channel" && (g.t >= g.w || g.t >= g.h)) {
    return "Channel thickness must be less than both flange width and section depth.";
  }
  if (g.type === "i_beam" && 2 * g.tf >= g.h) {
    return "I-beam flange thickness is too large: 2·tf must be less than H.";
  }
  if (g.type === "i_beam" && g.tw >= g.bf) {
    return "I-beam web thickness must be less than flange width.";
  }
  return null;
}

export function toStandardSection(g: Geometry): StandardSection {
  switch (g.type) {
    case "i_beam":
      return { shape: "i-beam", h: g.h, b: g.bf, tw: g.tw, tf: g.tf };
    case "channel":
      return { shape: "channel", h: g.h, b: g.w, tw: g.t, tf: g.t };
    case "angle":
      return { shape: "angle", h: g.leg, b: g.leg, tw: g.t, tf: g.t };
    case "square":
      return { shape: "square-tube", h: g.side, b: g.side, tw: g.t, tf: g.t };
    case "rect":
      return { shape: "square-tube", h: g.h, b: g.w, tw: g.t, tf: g.t };
    case "round":
      return { shape: "round-tube", h: g.od, b: g.od, tw: (g.od - g.id) / 2, tf: (g.od - g.id) / 2 };
  }
}
