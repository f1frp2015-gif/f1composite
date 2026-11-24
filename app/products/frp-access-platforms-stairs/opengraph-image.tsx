import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "FRP access structures",
    title: "FRP Access Platforms, Stairs and Crossovers, Bolted from Pultruded Components",
    description: "Work platforms, crossovers, stair towers and walkways with OSHA, ISO, AS and IBC stair rules and floor loads.",
    accent: "#0f8a83",
    chips: ["No hot work", "Stair rules by code", "Marked kit to drawing"],
  });
}
