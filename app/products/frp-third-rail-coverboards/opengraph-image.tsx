import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "F1 Composite custom pultruded FRP third-rail coverboards";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Custom pultruded component",
    title: "FRP Third-Rail Coverboards",
    description: "Flame-retardant fiberglass covers pultruded to the contact-rail drawing, cut and drilled to the bracket pitch.",
    accent: "#117d76",
    chips: ["To your section drawing", "Cut & drilled lengths", "Batch test records"],
  });
}
