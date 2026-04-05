import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP Gratings",
    title: "Molded and Pultruded Gratings for Corrosive, Marine, and Industrial Walkways",
    description:
      "Anti-slip, lightweight, and corrosion-resistant grating systems for platforms, stairways, wastewater plants, and offshore environments.",
    accent: "#0d7f79",
    chips: ["Anti-slip surfaces", "Marine ready", "Load-rated panels"],
  });
}
