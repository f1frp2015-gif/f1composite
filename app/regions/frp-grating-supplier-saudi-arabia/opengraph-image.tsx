import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Saudi Arabia · FRP Grating",
    title: "FRP grating supplier for Saudi Arabia — petrochemical, desalination, coastal infrastructure",
    description:
      "Pultruded and molded FRP grating shipped from China to projects in Saudi Arabia, with vinyl ester options for chloride and acid-splash service.",
    accent: "#0f8a83",
    chips: ["Vinyl ester options", "Fire test reports on request", "Shipped from China"],
  });
}
