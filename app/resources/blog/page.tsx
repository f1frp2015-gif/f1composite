import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { blogPosts } from "@/content/data/blogPosts";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Technical articles, industry insights, and FRP composite engineering knowledge from the F1 Composite team.",
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
      author: { "@type": "Organization", name: "F1 Composite" },
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
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/blog/${post.slug}`}
                className="group overflow-hidden rounded-[8px] border border-border-default bg-white transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
              >
                <div className="relative aspect-[1.618] overflow-hidden bg-bg2">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[0.34s] group-hover:scale-[1.03]"
                    style={
                      post.coverImagePosition
                        ? { objectPosition: post.coverImagePosition }
                        : undefined
                    }
                  />
                  <span className="absolute left-[13px] top-[13px] z-10 rounded-[4px] bg-teal/90 px-[8px] py-[3px] text-f11 font-bold uppercase tracking-[1px] text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-[21px]">
                  <div className="flex items-center gap-[13px] text-f11 text-t3">
                    <time>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h2 className="mt-[8px] text-f19 font-bold text-t1 group-hover:text-teal-text">
                    {post.title}
                  </h2>
                  <p className="mt-[8px] text-f15 leading-golden text-t2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
