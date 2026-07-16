import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/data/blogPosts";
import { applicationPages } from "@/lib/applicationPages";
import { getAllDatasheetPages } from "@/lib/catalog/public";

const BASE = "https://www.f1composite.com";
const CATALOG_FALLBACK_DATE = "2026-07-12";

function toIsoDate(value: unknown, fallback: string): string {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) return value.toISOString().slice(0, 10);
  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.valueOf())) return parsed.toISOString().slice(0, 10);
  }
  return fallback;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const latestBlogUpdate =
    [...blogPosts]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
      ?.updatedAt ?? "2026-04-02";

  // lastmod describes the URL itself, never unrelated site activity. Only the
  // blog index follows the newest post because that listing actually changes.
  const DATES = {
    home: "2026-07-16",
    profiles: "2026-07-16",
    standardProfiles: "2026-07-16",
    standardProfileDetail: "2026-04-14",
    customPultrusions: "2026-07-16",
    fenestration: "2026-07-16",
    gratings: "2026-07-16",
    technology: "2026-04-15",
    industries: "2026-04-14",
    caseStudies: "2026-04-22",
    resources: "2026-04-14",
    blog: latestBlogUpdate,
    static: "2026-01-15",
  };

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

  // Live catalog datasheets (empty when the DB is unreachable — build-safe).
  const datasheetPages = await getAllDatasheetPages();
  const datasheetEntries = datasheetPages.map((d) => ({
    url: `${BASE}/datasheets/${d.slug}`,
    lastModified: toIsoDate(d.product.updated_at, CATALOG_FALLBACK_DATE),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));
  // Index page is a permanent nav destination — keep it listed even when the
  // catalog DB is unreachable at build time (slug entries above still drop).
  const latestCatalogUpdate = datasheetEntries
    .map((entry) => entry.lastModified)
    .sort((a, b) => b.localeCompare(a))[0] ?? CATALOG_FALLBACK_DATE;
  const datasheetIndexEntry = [{
    url: `${BASE}/datasheets`,
    lastModified: latestCatalogUpdate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }];

  return [
    { url: BASE, lastModified: DATES.home, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/pultruded-frp-profiles`, lastModified: DATES.profiles, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/what-is-frp`, lastModified: "2026-04-14", changeFrequency: "monthly", priority: 0.85 },
    // /products redirects 301 to /pultruded-frp-profiles (see next.config.ts)
    { url: `${BASE}/products/standard-profiles`, lastModified: DATES.standardProfiles, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/standard-profiles/i-beam`, lastModified: DATES.standardProfileDetail, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/angle`, lastModified: DATES.standardProfileDetail, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/channel`, lastModified: DATES.standardProfileDetail, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/square-tube`, lastModified: DATES.standardProfileDetail, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/tube`, lastModified: DATES.standardProfileDetail, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/flat-bar`, lastModified: DATES.standardProfileDetail, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/standard-profiles/rod`, lastModified: DATES.standardProfileDetail, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/products/custom-pultrusions`, lastModified: DATES.customPultrusions, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/fenestration-systems`, lastModified: DATES.fenestration, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/facade-sunshade-panels`, lastModified: "2026-07-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/window-reinforcement-profiles`, lastModified: "2026-07-07", changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/technology/china-alternative-to-tencom-creative-pultrusions-windows`, lastModified: "2026-07-07", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/products/gratings`, lastModified: DATES.gratings, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/stair-tread-covers`, lastModified: "2026-07-12", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/handrail-systems`, lastModified: "2026-07-12", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/fiberglass-sheets`, lastModified: "2026-07-12", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/products/product-lines`, lastModified: "2026-06-23", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology`, lastModified: DATES.technology, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/technology/pultrusion-process`, lastModified: DATES.technology, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology/pultrusion-resin-systems`, lastModified: "2026-07-08", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/frp-vs-traditional-materials`, lastModified: DATES.technology, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/technology/frp-vs-aluminum-windows`, lastModified: "2026-04-15", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/frp-vs-steel-gratings`, lastModified: "2026-07-16", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/frp-vs-pvc-windows`, lastModified: "2026-04-15", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/china-alternative-to-strongwell-fiberline-exel`, lastModified: "2026-06-23", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/pultrusion-vs-extrusion-filament-winding`, lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology/polyurethane-pultrusion-windows`, lastModified: "2026-07-16", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/technology/quality-testing`, lastModified: DATES.technology, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/technology/knowhow-services`, lastModified: DATES.technology, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/frp-profile-calculator`, lastModified: DATES.technology, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/frp-span-tables`, lastModified: "2026-07-11", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/fiberglass-pultruded-profile-price`, lastModified: "2026-07-12", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technology/u-value-calculator`, lastModified: "2026-04-05", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries`, lastModified: DATES.industries, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/industries/construction`, lastModified: DATES.industries, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/infrastructure`, lastModified: DATES.industries, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/energy`, lastModified: DATES.industries, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/marine`, lastModified: DATES.industries, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/industrial`, lastModified: DATES.industries, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/industries/vehicle`, lastModified: "2026-04-04", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/applications`, lastModified: "2026-05-03", changeFrequency: "monthly", priority: 0.85 },
    ...applicationEntries,
    { url: `${BASE}/case-studies`, lastModified: DATES.caseStudies, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/case-studies/european-bridge-deck`, lastModified: DATES.caseStudies, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/coastal-marina-walkway`, lastModified: DATES.caseStudies, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/chemical-plant-platform`, lastModified: DATES.caseStudies, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/fenestration-residential`, lastModified: DATES.caseStudies, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/solar-farm-mounting`, lastModified: DATES.caseStudies, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/water-treatment-cable-tray`, lastModified: "2026-04-02", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/qinling-station-antarctic-passive-windows`, lastModified: "2026-04-22", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/case-studies/yancheng-talent-apartment-fenestration`, lastModified: "2026-04-22", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/case-studies/factory-access-staircase`, lastModified: "2026-04-22", changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/resources`, lastModified: DATES.resources, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/resources/technical-data`, lastModified: DATES.resources, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/how-to-choose-frp-pultrusion-supplier`, lastModified: "2026-06-23", changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/resources/frp-windows-guide`, lastModified: "2026-07-16", changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/resources/ddp-tariff-hs-code-guide`, lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.78 },
    { url: `${BASE}/resources/design-guides`, lastModified: DATES.resources, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/resources/glossary`, lastModified: DATES.resources, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/blog`, lastModified: DATES.blog, changeFrequency: "weekly", priority: 0.7 },
    ...blogEntries,
    { url: `${BASE}/resources/downloads`, lastModified: DATES.resources, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about`, lastModified: DATES.static, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about/authors`, lastModified: "2026-05-10", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about/authors/yifan-liu`, lastModified: "2026-05-10", changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/about/authors/haifeng-gong`, lastModified: "2026-05-10", changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/about/authors/duowei-wang`, lastModified: "2026-05-10", changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/ask`, lastModified: "2026-04-04", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ai/sourcing`, lastModified: "2026-05-05", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/ai/passive-house`, lastModified: "2026-05-05", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/regions`, lastModified: "2026-07-09", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/regions/frp-grating-supplier-saudi-arabia`, lastModified: "2026-05-05", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/regions/pultruded-frp-solar-mounting-australia`, lastModified: "2026-05-05", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/regions/frp-cable-tray-uae-oil-gas`, lastModified: "2026-05-05", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/regions/frp-pultrusion-supplier-usa`, lastModified: "2026-05-21", changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE}/regions/frp-passive-house-windows-canada`, lastModified: "2026-06-06", changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE}/regions/frp-passive-house-windows-germany`, lastModified: "2026-07-04", changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE}/regions/grp-windows-uk`, lastModified: "2026-07-07", changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE}/contact`, lastModified: DATES.static, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: DATES.static, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: DATES.static, changeFrequency: "yearly", priority: 0.3 },
    ...datasheetIndexEntry,
    ...datasheetEntries,
  ];
}
