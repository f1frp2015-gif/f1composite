import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import BlogCard from "@/components/blog/BlogCard";
import InnerCTA from "@/components/sections/InnerCTA";
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

      <PageSection id="articles" title="Articles, newest first" count={`${posts.length} articles`} tone="muted">
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[16px]">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <BlogCard post={post} priority={index < 3} />
            </li>
          ))}
        </ul>
      </PageSection>

      <InnerCTA title="Have a question an article does not answer?" text="Send the question with the product, the service conditions and the project stage." advisorPrompt="I have read F1 Composite's engineering articles and have a question about pultruded FRP for my project: [question]. Project details: [product, environment, size]." />
    </>
  );
}
