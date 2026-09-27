import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Vehicle",
    title: "FRP Profiles for Bus, Trailer, Rail and Specialty Vehicles",
    description:
      "Pultruded profiles for selected body, wall and interior components, designed around the vehicle maker's loads, joints and fire requirements.",
    accent: "#126f68",
    chips: ["Lighter than steel", "Does not rust", "Custom sections"],
  });
}
