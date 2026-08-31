import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Beam bridge design guide with load-path diagrams and verified case studies";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Beam Bridge Engineering Guide",
    title: "Beam Bridge: Design, Diagram & Case Studies",
    description:
      "Load path, types, pros and cons, plus three source-backed concrete and FRP girder projects.",
    accent: "#0a9b91",
    chips: ["Original diagrams", "Australia + USA", "FRP girder evidence"],
  });
}
