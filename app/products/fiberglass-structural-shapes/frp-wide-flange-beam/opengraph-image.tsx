import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP WF Beam",
    title: "Fiberglass Wide Flange Beams for Columns, Frames and Unbraced Spans",
    description:
      "Catalog 305 × 305 mm WF and standard 4 × 4 to 12 × 12 in sizes with mass, Ix, Iy and flange slenderness.",
    accent: "#0f8a83",
    chips: ["WF vs I-beam", "Weak-axis stiffness", "Size chart"],
  });
}
