import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { blogPostsBySlug } from "@/content/data/blogPosts";

export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];
  const entry = post
    ? {
        title: post.title,
        description: post.ogDescription,
        chips: post.ogChips,
      }
    : {
        title: "F1 Composite Technical Article",
        description:
          "Engineering content for pultruded FRP profiles, materials, and applications.",
        chips: ["Technical article", "Pultruded FRP", "Engineering"],
      };

  return renderOgImage({
    eyebrow: "Blog",
    title: entry.title,
    description: entry.description,
    accent: "#117d76",
    chips: entry.chips,
  });
}
