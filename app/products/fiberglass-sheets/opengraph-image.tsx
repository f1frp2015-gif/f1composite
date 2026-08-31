import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Pultruded Fiberglass Sheets",
    title: "Solid Flat Stock, Cut to Size",
    description:
      "Smooth, gritted or embossed FRP sheet for liners, covers, baffles and fabricated blanks.",
    accent: "#0d7f79",
    chips: ["2–25 mm typical", "Cut-to-size", "Resin options"],
  });
}
