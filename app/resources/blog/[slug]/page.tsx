import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ArticleSummarizer from "@/components/ai/ArticleSummarizer";
import ArticleContent, { renderInlineMarkdown } from "@/components/blog/ArticleContent";
import BlogCard from "@/components/blog/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { blogPosts, blogPostsBySlug } from "@/content/data/blogPosts";
import { getBlogTarget, getBlogTopic, getRelatedBlogPosts } from "@/content/data/blogStrategy";
import { parseBlogContent } from "@/lib/blogContent";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { authorSlugByName, authorsBySlug } from "@/lib/authors";
import { prefillForBlog } from "@/lib/aiPrefill";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    return { title: "Blog Post" };
  }

  const target = getBlogTarget(slug);
  const topic = target ? getBlogTopic(target.topic) : undefined;

  return buildPageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.ogDescription ?? post.excerpt,
    path: `/resources/blog/${slug}`,
    image: `/resources/blog/${slug}/opengraph-image`,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      section: topic?.label ?? post.category,
    },
  });
}

// The article's related links, grouped by where they lead.
function relatedGroups(links: Array<{ label: string; href: string }>) {
  const kind = (href: string) =>
    /^\/(products|pultruded-frp-profiles)/.test(href) ? "Products"
      : /^\/(industries|applications|case-studies)/.test(href) ? "Applications"
        : /^\/(technology|resources|what-is-frp)/.test(href) && !href.startsWith("/technology/frp-u-value-calculator") ? "Guides"
          : "Tools and help";
  const order = ["Products", "Applications", "Guides", "Tools and help"];
  return order
    .map((title) => ({ title, links: links.filter((link) => kind(link.href) === title) }))
    .filter((group) => group.links.length > 0);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    notFound();
  }

  const target = getBlogTarget(slug);
  const topic = target ? getBlogTopic(target.topic) : undefined;
  const relatedPosts = getRelatedBlogPosts(slug, 3);
  const { blocks, headings } = parseBlogContent(post.content);
  const authorSlug = authorSlugByName(post.authorName);
  const authorHref = authorSlug ? `/about/authors/${authorSlug}` : undefined;
  const authorRecord = authorSlug ? authorsBySlug[authorSlug] : undefined;
  const summarizerContent = post.faq
    ? [
        post.content,
        `## ${post.faq.title}`,
        ...post.faq.items.map(
          (item) => `**${item.question}**\n\n${item.answer}`,
        ),
      ].join("\n\n")
    : post.content;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.updatedAt,
    image: [
      absoluteUrl(post.coverImage),
      absoluteUrl(`/resources/blog/${slug}/opengraph-image`),
    ],
    author: post.authorType === "Organization" ? {
      "@type": "Organization",
      name: post.authorName,
      url: absoluteUrl("/about"),
    } : {
      "@type": "Person",
      name: authorRecord?.name ?? post.authorName,
      ...(authorRecord?.credentials === "Ph.D."
        ? { honorificSuffix: "Ph.D." }
        : {}),
      jobTitle: post.authorRole,
      ...(authorHref
        ? {
            "@id": `${absoluteUrl(authorHref)}#person`,
            url: absoluteUrl(authorHref),
          }
        : {}),
      worksFor: { "@id": "https://www.f1composite.com/#organization" },
    },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    description: post.excerpt,
    mainEntityOfPage: absoluteUrl(`/resources/blog/${slug}`),
    isPartOf: {
      "@type": "Blog",
      "@id": `${absoluteUrl("/resources/blog")}#blog`,
      url: absoluteUrl("/resources/blog"),
      name: "F1 Composite FRP Engineering Blog",
    },
    articleSection: topic?.label ?? post.category,
    ...(target ? { about: { "@type": "Thing", name: target.primaryQuery } } : {}),
    citation: [...post.standards, ...(post.sourceLinks?.map((link) => link.href) ?? [])],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "aside[aria-label='Article summary'] blockquote", ".prose-f1 p:first-of-type"],
    },
    ...(post.answerBox
      ? {
          abstract: post.answerBox,
        }
      : {}),
  };

  const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        tag={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Blog", href: "/resources/blog" },
          ...(topic ? [{ label: topic.label, href: `/resources/blog/topics/${topic.slug}` }] : []),
          { label: post.title },
        ]}
      />

      <ArticleSignals
        publishedAt={post.date}
        updatedAt={post.updatedAt}
        readTime={post.readTime}
        authorName={post.authorName}
        authorRole={post.authorRole}
        authorHref={authorHref}
        reviewedBy={post.reviewedBy}
        standards={post.standards}
      />

      <section className="bg-white py-[40px] md:py-[56px]">
        <div className="site-container grid gap-[40px] lg:grid-cols-[minmax(0,800px)_minmax(0,1fr)] lg:gap-[56px]">
          <div className="min-w-0">
            <figure className="overflow-hidden rounded-card border border-border-default bg-white">
              <div className="relative aspect-[1.618] bg-bg2">
                <Image
                  src={post.coverImage}
                  alt={post.coverAlt}
                  fill
                  sizes="(max-width: 1023px) 94vw, 800px"
                  className={post.coverImageFit === "contain" ? "object-contain" : "object-cover"}
                  style={
                    post.coverImagePosition && post.coverImageFit !== "contain"
                      ? { objectPosition: post.coverImagePosition }
                      : undefined
                  }
                  preload
                />
                {post.coverNote ? (
                  <span className="absolute right-[8px] top-[8px] rounded-tag bg-white/90 px-[6px] py-[2px] font-mono text-f12 uppercase tracking-[0.06em] text-t2">
                    {post.coverNote}
                  </span>
                ) : null}
              </div>
              {post.coverAttribution ? (
                <figcaption className="border-t border-border-default px-[14px] py-[10px] text-f12 leading-golden text-t3">
                  Image by{" "}
                  <a href={post.coverAttribution.href} target="_blank" rel="noopener noreferrer" className="text-teal-text hover:underline">
                    {post.coverAttribution.creator}
                  </a>{" "}
                  via {post.coverAttribution.source} ·{" "}
                  <a href={post.coverAttribution.licenseHref} target="_blank" rel="noopener noreferrer" className="text-teal-text hover:underline">
                    {post.coverAttribution.license}
                  </a>
                </figcaption>
              ) : null}
            </figure>

            {post.answerBox ? (
              <aside aria-label="Article summary" className="mt-[24px] rounded-card border-l-4 border-l-teal bg-teal-bg px-[20px] py-[16px]">
                <p className={mono}>Short answer</p>
                <blockquote className="mt-[8px] text-f16 leading-golden text-t1">{post.answerBox}</blockquote>
              </aside>
            ) : null}

            {post.masterComparison ? (
              <aside aria-label="Master comparison page" className="mt-[12px] rounded-card border border-teal-border bg-white p-[20px]">
                <p className={mono}>Part of a larger comparison</p>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{post.masterComparison.note}</p>
                <Link href={post.masterComparison.href} className="mt-[4px] inline-flex min-h-[44px] items-center text-f16 font-bold text-teal-text hover:underline">
                  {post.masterComparison.label} <span aria-hidden="true" className="ml-[4px]">→</span>
                </Link>
              </aside>
            ) : null}

            <div className="mt-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
              <p className={mono}>Key points</p>
              <ul className="mt-[8px] space-y-[8px]">
                {post.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-[10px] text-f14 leading-golden text-t2">
                    <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-teal" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-[24px]">
              <ArticleSummarizer title={post.title} content={summarizerContent} />
            </div>

            {headings.length >= 2 ? (
              <details className="mt-[24px] rounded-card border border-border-default bg-bg2 px-[20px] py-[16px] lg:hidden">
                <summary className="cursor-pointer text-f14 font-semibold text-t1">On this page</summary>
                <nav aria-label="Article contents" className="mt-[8px]">
                  <ol className="space-y-[2px]">
                    {headings.map((heading) => (
                      <li key={heading.id} className={heading.level === 3 ? "pl-[12px]" : undefined}>
                        <a href={`#${heading.id}`} className="block py-[6px] text-f14 leading-golden text-t2 hover:text-teal-text">{heading.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </details>
            ) : null}

            <article className="prose-f1 mt-[40px]">
              <ArticleContent blocks={blocks} />
              {post.faq ? (
                <FAQ
                  title={post.faq.title}
                  items={post.faq.items.map((item, index) => ({
                    question: item.question,
                    answer: renderInlineMarkdown(item.answer, `faq-${slug}-${index}`),
                  }))}
                />
              ) : null}
            </article>

            <figure className="mt-[40px] overflow-hidden rounded-card border border-border-default bg-white">
              <div className="relative aspect-[1.618] bg-bg2">
                <Image
                  src={post.supportingImage}
                  alt={post.supportingAlt}
                  fill
                  sizes="(max-width: 1023px) 94vw, 800px"
                  className={post.supportingImageFit === "contain" ? "object-contain" : "object-cover"}
                  style={
                    post.supportingImagePosition && post.supportingImageFit !== "contain"
                      ? { objectPosition: post.supportingImagePosition }
                      : undefined
                  }
                />
              </div>
              <figcaption className="border-t border-border-default px-[14px] py-[10px] text-f14 leading-golden text-t2">
                <p>{post.supportingCaption}</p>
                {post.supportingAttribution ? (
                  <p className="mt-[4px] text-f12 text-t3">
                    Image by{" "}
                    <a href={post.supportingAttribution.href} target="_blank" rel="noopener noreferrer" className="text-teal-text hover:underline">
                      {post.supportingAttribution.creator}
                    </a>{" "}
                    via {post.supportingAttribution.source} ·{" "}
                    <a href={post.supportingAttribution.licenseHref} target="_blank" rel="noopener noreferrer" className="text-teal-text hover:underline">
                      {post.supportingAttribution.license}
                    </a>
                  </p>
                ) : null}
              </figcaption>
            </figure>

            {post.sourceLinks?.length ? (
              <div className="mt-[40px] border-t border-border-default pt-[20px]">
                <h2 className="text-f18 font-bold text-t1">Sources</h2>
                <ul className="mt-[8px] space-y-[4px]">
                  {post.sourceLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[32px] items-center text-f14 leading-golden text-teal-text hover:underline">
                        {link.label} <span aria-hidden="true" className="ml-[4px]">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-[112px] space-y-[16px]">
              {headings.length >= 2 ? (
                <nav aria-label="Article contents" className="border-l border-border-default pl-[16px]">
                  <p className={mono}>On this page</p>
                  <ol className="mt-[8px] space-y-[2px]">
                    {headings.map((heading) => (
                      <li key={heading.id} className={heading.level === 3 ? "pl-[12px]" : undefined}>
                        <a href={`#${heading.id}`} className="block py-[4px] text-f14 leading-golden text-t2 hover:text-teal-text">
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
                <p className={mono}>Project support</p>
                <p className="mt-[8px] text-f14 leading-golden text-t2">
                  Need a section sized, specification wording checked, or test documents for an
                  approval? Send the details to our engineering team.
                </p>
                <Link href="/contact?source=blog-aside&inquiry_type=technical" className="mt-[12px] inline-flex min-h-[40px] items-center rounded-control bg-teal-text px-[16px] text-f14 font-bold text-white transition-colors hover:bg-teal">
                  Talk to engineering
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {(topic || target) ? (
        <section aria-label="Continue with this topic" className="border-t border-border-default bg-white py-[32px]">
          <div className="site-container grid gap-[20px] md:grid-cols-2">
            {topic ? (
              <div className="rounded-card border border-border-default bg-bg2 p-[24px]">
                <p className={mono}>Explore the topic</p>
                <Link href={`/resources/blog/topics/${topic.slug}`} className="mt-[8px] inline-flex min-h-[44px] items-center text-f18 font-bold text-teal-text hover:underline">
                  {topic.label} <span aria-hidden="true" className="ml-[8px]">→</span>
                </Link>
              </div>
            ) : null}
            {target ? (
              <div className="rounded-card border border-teal-border bg-teal-bg p-[24px]">
                <p className={mono}>Next step</p>
                <Link href={target.nextStep.href} className="mt-[8px] inline-flex min-h-[44px] items-center text-f18 font-bold text-teal-text hover:underline">
                  {target.nextStep.label} <span aria-hidden="true" className="ml-[8px]">→</span>
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section className="border-t border-border-default bg-white py-[40px] md:py-[56px]" aria-labelledby="related-articles-heading">
          <div className="site-container">
            <h2 id="related-articles-heading" className="text-f24 font-bold text-t1">Related articles</h2>
            <div className="mt-[24px] grid gap-[24px] md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => <BlogCard key={relatedPost.slug} post={relatedPost} />)}
            </div>
          </div>
        </section>
      ) : null}

      <RelatedLinks title="Related products, applications and tools" background="bg2" groups={relatedGroups(post.relatedLinks)} />

      <InnerCTA advisorPrompt={prefillForBlog({ title: post.title, slug: post.slug })} />
    </>
  );
}
