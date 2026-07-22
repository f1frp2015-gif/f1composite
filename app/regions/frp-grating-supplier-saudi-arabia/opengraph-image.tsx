import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Saudi Arabia · FRP Grating",
    title: "FRP grating supplier for Saudi Arabia — petrochemical, desalination, coastal infrastructure",
    description:
      "Pultruded and molded FRP grating shipped directly from our factory in China to projects in Saudi Arabia. Vinyl ester options for chloride and acid-splash service; ISO 9001 and EN 13706.",
    accent: "#0f8a83",
    chips: ["Vinyl ester options", "ASTM E84 fire-rated", "Direct from factory"],
  });
}
