import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Free AI Tool",
    title: "Passive House Window Selector — match your climate to a PHI-certified FRP frame",
    description:
      "Free AI tool: enter climate zone, target U-value, and window type — get the matching F1 Composite PHI-certified pultruded FRP fenestration series with U_w and case-study evidence.",
    accent: "#117d76",
    chips: ["PHI Component-ID 2491wi03", "U_w 0.78 W/m²·K", "phA arctic certified"],
  });
}
