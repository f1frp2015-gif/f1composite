import CoverCard from "@/components/ui/CoverCard";
import type { BlogPost } from "@/content/data/blogPosts";
import { blogCover } from "@/lib/covers";
import { formatShortDate } from "@/lib/dates";

/**
 * An article in a grid: its cover with the cover's label, the category and
 * date, the title and the first three lines of the excerpt. One treatment on
 * the blog index, the guides that collect articles and the hubs.
 */
export default function BlogCard({
  post,
  priority = false,
  sizes = "(max-width: 639px) 94vw, (max-width: 1023px) 46vw, 390px",
}: {
  post: Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "date" | "coverImage" | "coverAlt" | "coverNote" | "coverImageFit" | "coverImagePosition">;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <CoverCard
      href={`/resources/blog/${post.slug}`}
      cover={blogCover(post)}
      label={
        <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">
          {post.category} · <time dateTime={post.date}>{formatShortDate(post.date)}</time>
        </span>
      }
      title={post.title}
      text={post.excerpt}
      clampText
      priority={priority}
      sizes={sizes}
    />
  );
}
