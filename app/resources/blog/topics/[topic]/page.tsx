import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import BlogCard from "@/components/blog/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import { blogPostsBySlug } from "@/content/data/blogPosts";
import { blogTopics, getBlogTopic, getTopicPosts } from "@/content/data/blogStrategy";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return blogTopics.map(({ slug }) => ({ topic: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getBlogTopic((await params).topic);
  if (!topic) notFound();
  return buildPageMetadata({ title: topic.title, description: topic.description, path: `/resources/blog/topics/${topic.slug}` });
}

export default async function BlogTopicPage({ params }: Props) {
  const topic = getBlogTopic((await params).topic);
  if (!topic) notFound();
  const posts = getTopicPosts(topic.slug);
  const furtherPosts = posts.filter((post) => !topic.startHere.includes(post.slug));
  const path = `/resources/blog/topics/${topic.slug}`;
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": absoluteUrl(path),
        name: topic.title,
        description: topic.description,
        url: absoluteUrl(path),
        isPartOf: { "@id": absoluteUrl("/resources/blog#blog") },
        inLanguage: "en",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: posts.length,
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem", position: index + 1,
            name: post.title, url: absoluteUrl(`/resources/blog/${post.slug}`),
          })),
        },
      }} />
      <PageHeader tag="Blog topic" title={topic.title.replace(/ \| F1 Composite$/, "")} description={topic.intro} breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources" },
        { label: "Blog", href: "/resources/blog" },
        { label: topic.label },
      ]} />

      <PageSection id="start-here" title="Start with your next decision" intro="Use these questions to narrow the reading before you specify a product.">
        <ul className="mb-[24px] grid gap-[12px] md:grid-cols-3">
          {topic.questions.map((question) => <li key={question} className="rounded-card border border-teal-border bg-teal-bg p-[20px] text-f16 font-semibold leading-golden text-t1">{question}</li>)}
        </ul>
        <ol className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
          {topic.startHere.map((slug, index) => (
            <li key={slug}>
              <p className="mb-[8px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">Read {index + 1}</p>
              <BlogCard post={blogPostsBySlug[slug]} />
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="specify" title="Put the reading to work" tone="muted" intro="Continue to the relevant product, evidence or tool when you are ready to define the project.">
        <ul className="grid gap-[12px] md:grid-cols-3">
          {topic.nextLinks.map((link) => <li key={link.href}><Link href={link.href} className="flex h-full min-h-[56px] items-center justify-between gap-[16px] rounded-card border border-border-default bg-white p-[20px] text-f16 font-semibold text-teal-text hover:border-teal-border">{link.label}<span aria-hidden="true">→</span></Link></li>)}
        </ul>
      </PageSection>

      <PageSection id="articles" title={furtherPosts.length ? "Continue reading" : "Explore more FRP guidance"} count={`${posts.length} articles in this topic`}>
        {furtherPosts.length ? (
          <ul className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
            {furtherPosts.map((post) => <li key={post.slug}><BlogCard post={post} /></li>)}
          </ul>
        ) : <p className="text-f16 leading-golden text-t2">The reading path above covers this collection. Explore another topic for related project questions.</p>}
        <nav aria-label="Other blog topics" className="mt-[32px] border-t border-border-default pt-[24px]">
          <p className="mb-[12px] text-f16 font-bold text-t1">Explore another topic</p>
          <ul className="flex flex-wrap gap-[8px]">
            {blogTopics.filter((item) => item.slug !== topic.slug).map((item) => <li key={item.slug}><Link href={`/resources/blog/topics/${item.slug}`} className="inline-flex min-h-[44px] items-center rounded-control border border-border-default px-[14px] text-f14 text-teal-text hover:bg-teal-bg">{item.label}</Link></li>)}
          </ul>
        </nav>
      </PageSection>
    </>
  );
}
