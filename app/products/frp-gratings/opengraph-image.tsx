import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Gratings",
    title: "FRP Grating Manufacturer — Molded and Pultruded Panels",
    description:
      "Anti-slip, lightweight, and corrosion-resistant grating systems for platforms, stairways, wastewater plants, and offshore environments.",
    accent: "#0d7f79",
    chips: ["Anti-slip surfaces", "Marine ready", "Load-rated panels"],
  });
}
