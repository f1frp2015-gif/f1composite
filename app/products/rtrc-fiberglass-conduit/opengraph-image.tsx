import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "RTRC conduit",
    title: "Reinforced Thermosetting Resin Conduit (RTRC): Fiberglass Electrical Conduit",
    description: "NEC Article 355 uses, NEMA TC 14 and UL 2515/2420 wall types, trade sizes and support spacing.",
    accent: "#0f8a83",
    chips: ["NEC 355", "NEMA TC 14", "½–6 in"],
  });
}
