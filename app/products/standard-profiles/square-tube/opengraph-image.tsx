import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Square Tube",
    title: "Square and Rectangular Hollow Sections with High Torsional Rigidity",
    description:
      "SHS and RHS pultruded profiles for columns, trusses, frames, and conduit applications where closed-section performance matters.",
    accent: "#127069",
    chips: ["SHS and RHS", "Closed sections", "Columns and frames"],
  });
}
