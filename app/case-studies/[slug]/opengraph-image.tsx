import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

const caseStudyOgContent: Record<
  string,
  { title: string; description: string; chips: string[] }
> = {
  "european-bridge-deck": {
    title: "European Bridge Deck Replacement",
    description:
      "A bridge rehabilitation project in the Netherlands using pultruded FRP deck elements to reduce weight, speed installation, and remove corrosion maintenance.",
    chips: ["Netherlands", "40% weight reduction", "100-year design life"],
  },
  "coastal-marina-walkway": {
    title: "Coastal Marina Walkway System",
    description:
      "A marine walkway project in the United Kingdom using FRP grating and profiles to eliminate saltwater corrosion and reduce lifecycle maintenance.",
    chips: ["United Kingdom", "500 m walkway", "60% lifecycle savings"],
  },
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = caseStudyOgContent[slug] ?? {
    title: "F1 Composite Project Case Study",
    description:
      "A real-world pultruded FRP project showing engineering approach and measurable project outcomes.",
    chips: ["Project evidence", "Pultruded FRP", "Measured outcome"],
  };

  return renderOgImage({
    eyebrow: "Case Study",
    title: entry.title,
    description: entry.description,
    accent: "#0f756f",
    chips: entry.chips,
  });
}
