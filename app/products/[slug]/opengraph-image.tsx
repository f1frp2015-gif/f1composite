import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { specialistProductIndex } from "@/content/data/pultrusionGuideIndex";

export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = specialistProductIndex.find((item) => item.slug === slug);
  return renderOgImage({
    eyebrow: "Component specification",
    title: page?.name ?? "Specialist pultruded components",
    description: page?.description ?? "Material, geometry and qualification guidance for custom pultruded components.",
    accent: "#117d76",
    chips: ["Drawing review", "Material selection", "Project qualification"],
  });
}
