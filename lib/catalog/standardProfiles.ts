/**
 * Public, build-safe source of truth for F1's published standard profile sizes
 * and masses. Keep database seeding, span tables, structural screening, and
 * pricing references on this dataset so the same nominal section never carries
 * two different kg/m values across the site.
 */

export type ParametricGeometry = {
  kind: "parametric";
  shape: string;
  dims: Record<string, number>;
};

export type StandardProfileProduct = {
  model: string;
  cat: string;
  geometry: ParametricGeometry;
  /** Published nominal mass, kg/m. */
  weight: number;
};

export type StandardSection = {
  shape: "i-beam" | "channel" | "angle" | "square-tube" | "round-tube";
  h: number;
  b: number;
  tw: number;
  tf: number;
};

const close = (a: number, b: number) => Math.abs(a - b) <= 0.01;
const geo = (shape: string, dims: Record<string, number>): ParametricGeometry => ({
  kind: "parametric",
  shape,
  dims,
});

const PRODUCTS: StandardProfileProduct[] = [];

for (const [h, b, t, weight] of [
  [76, 38, 6.4, 1.2], [100, 50, 6, 1.6], [120, 60, 6, 2.0], [152, 76, 6.4, 2.9],
  [160, 80, 8, 3.6], [200, 100, 10, 5.8], [240, 120, 12, 8.4], [300, 150, 15, 13.5],
  [305, 305, 12.7, 16.0],
] as const) {
  PRODUCTS.push({ model: `I ${h}×${b}×${t}`, cat: "i-beam", geometry: geo("i_beam", { H: h, B: b, tf: t, tw: t }), weight });
}

for (const [h, b, t, weight] of [
  [38, 13, 4.8, 0.4], [50, 25, 5, 0.7], [76, 25, 6.4, 1.0], [76, 38, 6.4, 1.4],
  [100, 30, 6, 1.5], [100, 50, 6, 1.8], [120, 50, 6, 2.0], [150, 40, 6, 2.1],
  [152, 43, 6.4, 2.2], [152, 43, 9.5, 3.2], [160, 48, 8, 3.0], [200, 60, 8, 3.8],
  [200, 60, 10, 4.6], [240, 72, 8, 4.6], [240, 72, 12, 6.8], [254, 76, 9.5, 5.6],
  [300, 90, 15, 10.4], [305, 89, 12.7, 8.8], [360, 108, 18, 15.0],
] as const) {
  PRODUCTS.push({ model: `U ${h}×${b}×${t}`, cat: "channel", geometry: geo("channel", { H: h, B: b, tf: t, tw: t }), weight });
}

for (const [a, b, t, weight] of [
  [25, 25, 3.2, 0.3], [30, 30, 4, 0.4], [38, 38, 4.8, 0.5], [50, 50, 5, 0.8],
  [50, 50, 6, 0.9], [50, 50, 8, 1.2], [65, 65, 6, 1.2], [75, 75, 6, 1.4],
  [75, 75, 8, 1.8], [76, 76, 6.4, 1.5], [100, 100, 8, 2.5], [100, 100, 10, 3.0],
  [102, 102, 9.5, 3.0], [150, 150, 12, 5.6], [152, 152, 12.7, 6.0],
] as const) {
  PRODUCTS.push({ model: `L ${a}×${b}×${t}`, cat: "angle", geometry: geo("angle", { a, b, t }), weight });
}

for (const [h, b, t, weight] of [
  [25, 25, 3.2, 0.4], [38, 38, 4.8, 0.9], [40, 20, 7, 1.0], [40, 25, 8, 1.2],
  [50, 50, 5, 1.4], [60, 60, 5, 1.7], [75, 75, 6, 2.5], [80, 60, 5, 2.0],
  [100, 100, 6, 3.5], [100, 100, 8, 4.5], [100, 60, 8, 3.6], [114, 114, 6, 4.0],
  [114, 114, 8, 5.2], [120, 120, 8, 5.6], [120, 60, 5, 2.6], [132, 132, 9.5, 7.0],
  [152, 152, 9.5, 8.2], [160, 160, 8, 7.4], [200, 200, 10, 11.6], [240, 240, 12, 16.8],
] as const) {
  const square = h === b;
  PRODUCTS.push({
    model: `${square ? "SHS" : "RHS"} ${h}×${b}×${t}`,
    cat: "square-tube",
    geometry: square ? geo("shs", { D: h, t }) : geo("rhs", { H: h, B: b, t }),
    weight,
  });
}

for (const [od, t, weight] of [
  [25, 3, 0.3], [32, 3, 0.4], [38, 3.2, 0.5], [42, 4, 0.7], [50, 4, 0.9],
  [50, 5, 1.1], [60, 5, 1.3], [63.5, 6.4, 1.7], [70, 5, 1.6], [76, 6.4, 2.1],
  [80, 5, 1.8], [80, 7, 2.5], [89, 6.4, 2.5], [100, 6, 2.7], [114, 6.4, 3.3],
  [127, 6.4, 3.7], [150, 8, 5.4],
] as const) {
  PRODUCTS.push({ model: `CHS ${od}×${t}`, cat: "round-tube", geometry: geo("tube", { OD: od, t }), weight });
}

for (const [d, weight] of [
  [6, 0.05], [8, 0.09], [10, 0.14], [12, 0.21], [13, 0.24], [16, 0.37],
  [19, 0.52], [20, 0.57], [22, 0.69], [25, 0.89], [28, 1.12], [30, 1.29],
  [32, 1.47], [38, 2.06], [40, 2.29], [50, 3.57],
] as const) {
  PRODUCTS.push({ model: `Rod Ø${d}`, cat: "rod", geometry: geo("rod", { D: d }), weight });
}

for (const [width, t, weight] of [
  [12, 3, 0.07], [20, 3, 0.11], [25, 3, 0.14], [25, 5, 0.23], [30, 4, 0.22],
  [38, 4.8, 0.33], [50, 5, 0.45], [50, 6, 0.55], [50, 10, 0.91], [75, 6, 0.82],
  [75, 10, 1.36], [100, 6, 1.09], [100, 10, 1.82], [100, 15, 2.73], [150, 10, 2.73],
  [150, 15, 4.09], [200, 15, 5.45], [305, 25, 13.86],
] as const) {
  PRODUCTS.push({ model: `FB ${width}×${t}`, cat: "flat-bar", geometry: geo("flat", { H: width, B: t }), weight });
}

export function buildProducts(): StandardProfileProduct[] {
  return PRODUCTS.map((product) => ({
    ...product,
    geometry: { ...product.geometry, dims: { ...product.geometry.dims } },
  }));
}

/** Exact nominal-dimension match; deliberately does not guess by depth alone. */
export function findStandardProfile(section: StandardSection): StandardProfileProduct | null {
  return PRODUCTS.find((product) => {
    const d = product.geometry.dims;
    if (section.shape === "i-beam" && product.geometry.shape === "i_beam") {
      return close(d.H, section.h) && close(d.B, section.b) && close(d.tw, section.tw) && close(d.tf, section.tf);
    }
    if (section.shape === "channel" && product.geometry.shape === "channel") {
      return close(d.H, section.h) && close(d.B, section.b) && close(d.tw, section.tw) && close(d.tf, section.tf);
    }
    if (section.shape === "angle" && product.geometry.shape === "angle") {
      return close(d.a, section.h) && close(d.b, section.b) && close(d.t, section.tw);
    }
    if (section.shape === "square-tube") {
      if (product.geometry.shape === "shs") {
        return close(d.D, section.h) && close(section.h, section.b) && close(d.t, section.tw);
      }
      if (product.geometry.shape === "rhs") {
        return close(d.H, section.h) && close(d.B, section.b) && close(d.t, section.tw);
      }
    }
    if (section.shape === "round-tube" && product.geometry.shape === "tube") {
      return close(d.OD, section.h) && close(d.t, section.tw);
    }
    return false;
  }) ?? null;
}
