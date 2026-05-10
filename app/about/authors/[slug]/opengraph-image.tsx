import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { authorsBySlug } from "@/lib/authors";

export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = authorsBySlug[slug];

  const fallback = {
    eyebrow: "Author",
    title: "F1 Composite Author",
    description: "Named expert behind F1 Composite engineering content.",
    accent: "#0d9a92",
    chips: ["Pultruded FRP", "Engineering"],
  };

  if (!author) return renderOgImage(fallback);

  return renderOgImage({
    eyebrow: author.bucketLabel,
    title: author.fullName,
    description: author.jobTitle,
    accent: author.accent,
    chips: author.expertise.slice(0, 3),
  });
}
