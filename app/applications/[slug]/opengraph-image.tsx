import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { applicationPages } from "@/lib/applicationPages";

export const size = ogSize;
export const contentType = ogContentType;

const pagesBySlug = Object.fromEntries(applicationPages.map((p) => [p.slug, p]));

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pagesBySlug[slug];

  if (!page) {
    return renderOgImage({
      eyebrow: "FRP Application",
      title: "Pultruded FRP application engineering",
      description:
        "Application-driven FRP profile, resin, and standards guidance from F1 Composite.",
      accent: "#117d76",
      chips: ["Application engineering", "Pultruded FRP", "EN 13706 / ASTM"],
    });
  }

  return renderOgImage({
    eyebrow: "FRP Application",
    title: page.h1,
    description: page.description,
    accent: "#117d76",
    chips: page.standards.slice(0, 3),
  });
}
