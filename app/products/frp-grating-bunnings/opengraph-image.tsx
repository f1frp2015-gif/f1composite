import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Australian buying guide",
    title: "FRP Grating Bunnings: Compare Your Options",
    description: "Retail floor panels or project-specified fibreglass grating? Compare materials, supports and supply scope.",
    accent: "#0d7f79",
    chips: ["Moulded & pultruded", "Panel selection", "Project quotes"],
  });
}
