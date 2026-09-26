import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { blogPosts } from "@/content/data/blogPosts";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pultruded FRP Engineering Blog & Technical Articles",
  description:
    "Technical articles on pultruded FRP profiles: passive house fenestration, bridge decks, marine walkways, EN 13706 / ASTM standards, and engineering know-how.",
  path: "/resources/blog",
});

const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "F1 Composite Engineering Insights",
    url: absoluteUrl("/resources/blog"),
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      url: absoluteUrl(`/resources/blog/${post.slug}`),
      description: post.excerpt,
      author: { "@id": "https://www.f1composite.com/#organization" },
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <PageHeader
        tag="Blog"
        title="Engineering Insights"
        description="Technical articles and industry perspectives from the F1 Composite engineering team."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Blog" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="site-container">
          <div className="grid gap-[21px] md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/blog/${post.slug}`}
                className="group overflow-hidden rounded-card border border-border-default bg-white transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-card"
              >
                <div className="relative aspect-[1.618] overflow-hidden bg-bg2">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className={`${post.coverImageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-[0.34s] group-hover:scale-[1.03]`}
                    style={
                      post.coverImagePosition && post.coverImageFit !== "contain"
                        ? { objectPosition: post.coverImagePosition }
                        : undefined
                    }
                  />
                  <span className="absolute left-[13px] top-[13px] z-10 rounded-tag bg-teal-text px-[8px] py-[3px] text-f12 font-bold uppercase tracking-[1px] text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-[21px]">
                  <div className="flex items-center gap-[13px] text-f12 text-t3">
                    <time>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h2 className="mt-[8px] text-f18 font-bold text-t1 group-hover:text-teal-text">
                    {post.title}
                  </h2>
                  <p className="mt-[8px] text-f16 leading-golden text-t2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
