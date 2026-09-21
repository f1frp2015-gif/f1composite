import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Construction",
    title: "FRP Products for Buildings & Construction",
    description:
      "Find windows, facade fins, structural profiles, grating, access systems, rebar and rooftop supports by building application.",
    accent: "#0f7a73",
    chips: ["6 application areas", "Product directory", "Design guidance"],
  });
}
