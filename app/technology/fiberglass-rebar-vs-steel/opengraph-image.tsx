import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Evidence-Based Rebar Comparison",
    title: "Fiberglass Rebar vs Steel",
    description:
      "FHWA, MnDOT, university-lab and ASTM evidence on strength, stiffness, durability and lifecycle cost.",
    accent: "#0f7069",
    chips: ["Test data", "Bridge evidence", "Design tradeoffs"],
  });
}
