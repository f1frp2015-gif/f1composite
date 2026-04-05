import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Custom Pultrusions",
    title: "Bespoke FRP Profiles Engineered Around Your Section, Load, and Resin Requirements",
    description:
      "From feasibility review to tooling, validation, and repeat production, F1 Composite delivers custom pultruded profiles for industrial and structural applications.",
    accent: "#0f8f88",
    chips: ["Custom tooling", "600 x 300 mm", "Engineering review"],
  });
}
