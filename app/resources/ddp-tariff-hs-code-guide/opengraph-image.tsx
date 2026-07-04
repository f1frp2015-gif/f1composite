import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Import & Trade Compliance",
    title: "DDP, Tariffs & HS Codes for FRP Profile Imports",
    description:
      "Incoterms, HS/HTSUS classification, and Section 301 tariff exposure explained for US and Canada FRP buyers.",
    accent: "#0f7069",
    chips: ["DDP", "HS codes", "Section 301"],
  });
}
