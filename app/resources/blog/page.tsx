import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import BlogCard from "@/components/blog/BlogCard";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { blogPosts } from "@/content/data/blogPosts";
import { blogTopics, getTopicPosts } from "@/content/data/blogStrategy";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Engineering Blog: Design, Selection & Installation",
  description:
    "Explore FRP engineering articles on fiberglass profiles, grating, windows and rebar. Find material comparisons, design checks and installation guides.",
  path: "/resources/blog",
});

const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/resources/blog#blog"),
    name: "F1 Composite FRP Engineering Blog",
    url: absoluteUrl("/resources/blog"),
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      dateModified: post.updatedAt,
      url: absoluteUrl(`/resources/blog/${post.slug}`),
      description: post.excerpt,
      author: { "@type": post.authorType ?? "Person", name: post.authorName },
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <PageHeader
        tag="Engineering blog"
        title="FRP engineering, from selection to installation"
        description="Choose a material, check a specification or prepare a project. Explore practical articles on pultruded fiberglass profiles, windows, grating, cable supports and reinforcement."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Blog" },
        ]}
        facts={[
          { label: "Article library", value: `${posts.length} articles` },
          { label: "Browse by need", value: `${blogTopics.length} topics` },
        ]}
      />

      <PageSection id="topics" title="Find the guidance for your project" intro="Start with a topic. Each collection connects the reading to product specifications, engineering tools and the information needed for a quote.">
        <nav aria-label="Blog topics">
          <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
            {blogTopics.map((topic) => (
              <li key={topic.slug}>
                <Link href={`/resources/blog/topics/${topic.slug}`} className="group flex h-full flex-col rounded-card border border-border-default bg-bg2 p-[24px] transition-colors hover:border-teal-border hover:bg-teal-bg">
                  <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{getTopicPosts(topic.slug).length} articles</span>
                  <h3 className="mt-[10px] text-f20 font-bold leading-tight text-t1 group-hover:text-teal-text">{topic.label}</h3>
                  <p className="mt-[10px] text-f14 leading-golden text-t2">{topic.description}</p>
                  <span className="mt-auto pt-[16px] text-f14 font-semibold text-teal-text">Explore articles <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageSection>

      <PageSection id="latest" title="Recent articles" tone="muted" aside={<a href="#all-articles" className="font-semibold text-teal-text hover:underline">Browse the full library ↓</a>}>
        <ul className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => <li key={post.slug}><BlogCard post={post} /></li>)}
        </ul>
      </PageSection>

      <PageSection id="all-articles" title="The complete article library" count={`${posts.length} articles`} intro="Browse every article by subject, or search for a product, material or engineering question." aside={<Link href="/search" className="font-semibold text-teal-text hover:underline">Search F1 Composite →</Link>}>
        <div className="grid gap-x-[40px] gap-y-[32px] lg:grid-cols-2">
          {blogTopics.map((topic) => (
            <section key={topic.slug} aria-labelledby={`library-${topic.slug}`}>
              <h3 id={`library-${topic.slug}`} className="border-b border-border-default pb-[12px] text-f20 font-bold text-t1">
                <Link href={`/resources/blog/topics/${topic.slug}`} className="hover:text-teal-text">{topic.label} <span aria-hidden="true">→</span></Link>
              </h3>
              <ul className="divide-y divide-border-default">
                {getTopicPosts(topic.slug).map((post) => (
                  <li key={post.slug}>
                    <Link href={`/resources/blog/${post.slug}`} className="block py-[12px] text-f14 font-semibold leading-golden text-t2 hover:text-teal-text">{post.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageSection>

      <InnerCTA title="Have a question an article does not answer?" text="Send the question with the product, the service conditions and the project stage." advisorPrompt="I have read F1 Composite's engineering articles and have a question about pultruded FRP for my project: [question]. Project details: [product, environment, size]." />
    </>
  );
}
