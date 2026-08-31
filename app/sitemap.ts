import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/data/blogPosts";
import { applicationPages } from "@/lib/applicationPages";

const BASE = "https://www.f1composite.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const latestBlogUpdate =
    [...blogPosts]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
      ?.updatedAt ?? "2026-04-02";

  const blogEntries = blogPosts.map((post) => ({
    url: `${BASE}/resources/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const applicationEntries = applicationPages.map((page) => ({
    url: `${BASE}/applications/${page.slug}`,
    lastModified: page.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  // Only content records with a real, content-owned update field emit
  // <lastmod>. Static routes intentionally omit it: a guessed or deploy-time
  // date is less useful than no date and quickly becomes inaccurate.
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/pultruded-frp-profiles`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/what-is-frp`, changeFrequency: "monthly", priority: 0.85 },
    // /products permanently redirects to /pultruded-frp-profiles (see next.config.ts)
    { url: `${BASE}/products/fiberglass-structural-shapes`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/fiberglass-structural-shapes/frp-i-beam`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/fiberglass-structural-shapes/frp-angle`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/fiberglass-structural-shapes/frp-channel`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/fiberglass-structural-shapes/frp-square-tube`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/fiberglass-structural-shapes/frp-tube`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/fiberglass-structural-shapes/frp-flat-bar`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/fiberglass-structural-shapes/frp-rod`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/frp-rebar`, changeFrequency: "monthly", priority: 0.82 },
    { url: `${BASE}/products/fiberglass-snow-markers`, changeFrequency: "monthly", priority: 0.82 },
    { url: `${BASE}/products/fiberglass-stakes`, changeFrequency: "monthly", priority: 0.82 },
    { url: `${BASE}/products/custom-pultruded-profiles`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/frp-pultrusion-manufacturer-factory-direct`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/products/frp-solar-mounting-systems`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/products/frp-window-frames`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/frp-facade-panels`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/frp-window-reinforcement`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/technology/china-alternative-to-tencom-creative-pultrusions-windows`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/products/frp-gratings`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/frp-deck-panels`, changeFrequency: "monthly", priority: 0.82 },
    { url: `${BASE}/products/molded-frp-grating`, changeFrequency: "monthly", priority: 0.82 },
    { url: `${BASE}/products/frp-stair-treads`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/frp-ladders`, changeFrequency: "monthly", priority: 0.82 },
    { url: `${BASE}/products/frp-handrail-systems`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/fiberglass-sheets`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/product-lines`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/technology/pultrusion-process`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology/pultrusion-resin-systems`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/frp-vs-traditional-materials`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/technology/frp-vs-aluminum-windows`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/fiberglass-rebar-vs-steel`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/frp-vs-steel-gratings`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/frp-vs-pvc-windows`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/china-alternative-to-strongwell-fiberline-exel`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/pultrusion-vs-extrusion-filament-winding`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology/polyurethane-pultrusion-windows`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/quality-testing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/technology/knowhow-services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/frp-profile-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/frp-profile-calculator/methodology`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/frp-profile-calculator/validation`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/frp-span-tables`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/fiberglass-pultruded-profile-price`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology/frp-u-value-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/industries/construction`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/infrastructure`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/energy`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/marine`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/industrial`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/vehicle`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/applications`, changeFrequency: "monthly", priority: 0.85 },
    ...applicationEntries,
    { url: `${BASE}/case-studies`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/case-studies/european-bridge-deck`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/coastal-marina-walkway`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/chemical-plant-platform`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/fenestration-residential`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/solar-farm-mounting`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/water-treatment-cable-tray`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/qinling-station-antarctic-passive-windows`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/case-studies/yancheng-talent-apartment-fenestration`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/case-studies/factory-access-staircase`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/resources`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/resources/technical-data`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/how-to-choose-frp-pultrusion-supplier`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/resources/frp-windows-guide`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/resources/frp-pultrusion-fob-ddp-export-guide`, changeFrequency: "monthly", priority: 0.78 },
    { url: `${BASE}/resources/design-guides`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/resources/glossary`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/blog`, lastModified: latestBlogUpdate, changeFrequency: "weekly", priority: 0.7 },
    ...blogEntries,
    { url: `${BASE}/resources/downloads`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about/authors`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about/authors/yifan-liu`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/about/authors/haifeng-gong`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/about/authors/duowei-wang`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/ask`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ai/sourcing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/ai/passive-house`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/regions`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/regions/frp-grating-supplier-saudi-arabia`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/regions/pultruded-frp-solar-mounting-australia`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/regions/frp-cable-tray-uae-oil-gas`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/regions/frp-pultrusion-supplier-usa`, changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE}/regions/frp-passive-house-windows-canada`, changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE}/regions/frp-passive-house-windows-germany`, changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE}/regions/grp-windows-uk`, changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
