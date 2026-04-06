import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/data/blogPosts";

const BASE = "https://f1composite.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestBlogUpdate =
    [...blogPosts]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
      ?.updatedAt ?? "2026-04-02";

  // Use realistic dates per section instead of a single dynamic timestamp.
  // Update these when content actually changes.
  const DATES = {
    home: "2026-04-05",
    products: "2026-04-05",
    technology: "2026-04-05",
    industries: "2026-04-05",
    caseStudies: "2026-02-20",
    resources: "2026-03-25",
    blog: latestBlogUpdate,
    static: "2026-01-15",
  };

  const blogEntries = blogPosts.map((post) => ({
    url: `${BASE}/resources/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: BASE, lastModified: DATES.home, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/products`, lastModified: DATES.products, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/products/standard-profiles`, lastModified: DATES.products, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/standard-profiles/i-beam`, lastModified: DATES.products, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/angle`, lastModified: DATES.products, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/channel`, lastModified: DATES.products, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/square-tube`, lastModified: DATES.products, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/tube`, lastModified: DATES.products, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/flat-bar`, lastModified: DATES.products, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/custom-pultrusions`, lastModified: DATES.products, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/fenestration-systems`, lastModified: DATES.products, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/gratings`, lastModified: DATES.products, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology`, lastModified: DATES.technology, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/technology/pultrusion-process`, lastModified: DATES.technology, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology/frp-vs-traditional-materials`, lastModified: DATES.technology, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/technology/quality-testing`, lastModified: DATES.technology, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/technology/knowhow-services`, lastModified: DATES.technology, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/technology/calculator`, lastModified: DATES.technology, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology/u-value-calculator`, lastModified: "2026-04-05", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries`, lastModified: DATES.industries, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/industries/construction`, lastModified: DATES.industries, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/infrastructure`, lastModified: DATES.industries, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/energy`, lastModified: DATES.industries, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/marine`, lastModified: DATES.industries, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/industrial`, lastModified: DATES.industries, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/vehicle`, lastModified: "2026-04-04", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies`, lastModified: DATES.caseStudies, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/case-studies/european-bridge-deck`, lastModified: DATES.caseStudies, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/coastal-marina-walkway`, lastModified: DATES.caseStudies, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/chemical-plant-platform`, lastModified: DATES.caseStudies, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/fenestration-residential`, lastModified: DATES.caseStudies, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/solar-farm-mounting`, lastModified: DATES.caseStudies, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/water-treatment-cable-tray`, lastModified: "2026-04-02", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources`, lastModified: DATES.resources, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/resources/technical-data`, lastModified: DATES.resources, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/design-guides`, lastModified: DATES.resources, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/resources/blog`, lastModified: DATES.blog, changeFrequency: "weekly", priority: 0.7 },
    ...blogEntries,
    { url: `${BASE}/resources/downloads`, lastModified: DATES.resources, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about`, lastModified: DATES.static, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/ask`, lastModified: "2026-04-04", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: DATES.static, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: DATES.static, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: DATES.static, changeFrequency: "yearly", priority: 0.3 },
  ];
}
