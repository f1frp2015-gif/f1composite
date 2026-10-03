import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Automotive & rail",
    title: "FRP Profiles for Automotive, Bus & Rail Components",
    description:
      "Pultruded profiles for buses, passenger cars, EV battery enclosures, truck bodies and rail, designed around the vehicle maker's loads, joints and approval requirements.",
    accent: "#126f68",
    chips: ["Custom sections", "Vehicle interfaces", "Part-level validation"],
  });
}
