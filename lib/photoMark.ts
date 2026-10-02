// Where the "© f1composite.com" mark sits on the group's own photos. Shared by
// scripts/mark-owned-photos.mjs, which draws it, and the tests, which check
// that no page crop shows only part of it.
//
// Layouts crop photos with object-cover, centered. The mark goes in the
// lower-right corner, so a downloaded or copied file always carries it, while
// our own cropped cards and figures usually cut it out entirely. The margin is
// chosen so that, for every layout aspect below, the mark is either fully
// visible or fully cropped, never cut in half.

export const MARK_TEXT = "© f1composite.com";

/**
 * Width / height of the boxes our layouts crop photos into: the home hero
 * (1.2, 1.38, 1.5), figures (4/3, 3/2), cards (16/10), social images (16/9)
 * and the phone-width application strips (about 3.75).
 */
export const LAYOUT_ASPECTS = [1.2, 4 / 3, 1.38, 1.5, 1.6, 16 / 9, 3.75];

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** The part of a width × height photo that stays visible when centered and cropped to `aspect`. */
export function visibleWindow(width: number, height: number, aspect: number): Box {
  if (aspect < width / height) {
    const visible = height * aspect;
    return { left: (width - visible) / 2, top: 0, width: visible, height };
  }
  const visible = width / aspect;
  return { left: 0, top: (height - visible) / 2, width, height: visible };
}

export function cropState(box: Box, view: Box): "inside" | "outside" | "partial" {
  const inside = box.left >= view.left && box.top >= view.top && box.left + box.width <= view.left + view.width && box.top + box.height <= view.top + view.height;
  if (inside) return "inside";
  const apart = box.left >= view.left + view.width || box.left + box.width <= view.left || box.top >= view.top + view.height || box.top + box.height <= view.top;
  return apart ? "outside" : "partial";
}

/** The mark's box in pixels: about a tenth of the long side wide, in the lower-right corner. */
export function markBox(width: number, height: number): Box {
  const long = Math.max(width, height);
  const markWidth = Math.round(long * 0.11);
  const markHeight = Math.round(markWidth * 0.2);
  const place = (margin: number): Box => ({ left: width - markWidth - margin, top: height - markHeight - margin, width: markWidth, height: markHeight });
  for (let step = 0; step <= 70; step += 1) {
    const box = place(Math.round(long * (0.01 + step * 0.002)));
    if (LAYOUT_ASPECTS.every((aspect) => cropState(box, visibleWindow(width, height, aspect)) !== "partial")) return box;
  }
  return place(Math.round(long * 0.01));
}
