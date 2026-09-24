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
      "A bridge deck replacement in the Netherlands using pultruded FRP deck elements to cut weight and speed up installation.",
    chips: ["Netherlands", "1,200 m² deck", "40% weight reduction"],
  },
  "coastal-marina-walkway": {
    title: "Coastal Marina Walkway System",
    description:
      "A marine walkway project in the United Kingdom using FRP grating and profiles for saltwater exposure.",
    chips: ["United Kingdom", "500 m walkway", "Molded grating + profiles"],
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
