import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "UAE · Oil & Gas Cable Tray",
    title: "FRP cable tray for UAE oil and gas projects",
    description:
      "Pultruded FRP cable tray and ladder systems for UAE upstream and downstream projects, with vinyl ester options and fire test reports on request.",
    accent: "#117d76",
    chips: ["NEMA / IEC 61537 references", "Vinyl ester options", "Non-conductive"],
  });
}
