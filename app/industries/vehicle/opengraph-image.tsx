import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Vehicle",
    title: "Lightweight FRP Profiles for Commercial Vehicles, Rail, and Specialty Transport",
    description:
      "Pultruded FRP profiles reduce vehicle weight, resist corrosion, and extend service life across bus, truck, rail, and specialty transport applications.",
    accent: "#126f68",
    chips: ["Lightweight", "Corrosion-free", "Rail & transport"],
  });
}
