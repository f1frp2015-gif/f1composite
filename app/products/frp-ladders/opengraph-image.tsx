import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Industrial Fixed Access",
    title: "Fiberglass Fixed Ladder Systems",
    description:
      "Manual-verified ladder geometry, cage-component references and separate C/U rung-cover sizes.",
    accent: "#0d7f79",
    chips: ["500 mm outside width", "300 mm rung spacing", "Drawing-led release"],
  });
}
