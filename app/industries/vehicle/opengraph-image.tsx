import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Vehicle",
    title: "FRP Profiles for Automotive and Bus Components",
    description:
      "Pultruded profiles for buses, cars and EV enclosures, designed around the vehicle maker's loads, joints and approval requirements.",
    accent: "#126f68",
    chips: ["Custom sections", "Vehicle interfaces", "Part-level validation"],
  });
}
