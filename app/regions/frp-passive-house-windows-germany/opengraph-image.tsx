import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Germany · FRP Passive House Windows",
    title: "Fiberglass passive house windows, DDP Germany from F1 Composite",
    description:
      "Pultruded FRP (GFK) fenestration for Passivhaus, Effizienzhaus, and GEG projects. PHI Cert 2491wi03, U_w 0.78 — outside EU aluminum anti-dumping duties and CBAM.",
    accent: "#ffcc00",
    chips: ["PHI Darmstadt 2491wi03 · U_w 0.78", "GEG 2024 / BEG-ready", "No alu duties · No CBAM · DDP"],
  });
}
