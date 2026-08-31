import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Pultruded Fiberglass Plates",
    title: "19 Profile References",
    description:
      "Hollow and multi-cell FRP plate sections with source A/B/t1/t2 values, source IDs and drawing-led selection.",
    accent: "#0d7f79",
    chips: ["19 profiles", "15 schematics", "RFQ drawing check"],
  });
}
