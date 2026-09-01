import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Wind turbine blade pultruded panels in GFRP, CFRP and carbon-glass hybrid materials";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Wind Energy Pultrusion",
    title: "Wind Turbine Blade Panels",
    description:
      "GFRP, CFRP and carbon-glass hybrid laminates with project cut lengths and report-scoped fatigue data.",
    accent: "#0d7f79",
    chips: ["GFRP / CFRP / hybrid", "Cut to required length", "ISO 13003 test data"],
  });
}
