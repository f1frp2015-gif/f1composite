import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const appDir = join(root, "app");
const sitemapSource = readFileSync(join(appDir, "sitemap.ts"), "utf8");

const excluded = new Set([
  "/admin",
  "/datasheets",
  "/llms.txt",
  "/llms-full.txt",
  "/frp-profile-calculator/embed",
  "/frp-span-tables/embed",
  "/ai/passive-house/embed",
  // User-facing legal pages intentionally stay crawlable but are noindex and
  // therefore must not be advertised as search-result candidates in sitemap.
  "/privacy",
  "/terms",
]);

const noindexRoutes = ["/privacy", "/terms"];

function collectPages(dir) {
  const pages = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) pages.push(...collectPages(path));
    if (entry.isFile() && entry.name === "page.tsx") pages.push(path);
  }
  return pages;
}

function routeForPage(file) {
  const directory = relative(appDir, join(file, ".."));
  if (!directory) return "/";
  if (directory.split(sep).some((segment) => segment.startsWith("[") || segment.startsWith("("))) {
    return null;
  }
  return `/${directory.split(sep).join("/")}`;
}

function isInSitemap(route) {
  if (route === "/") return /url:\s*BASE(?:[,}])/.test(sitemapSource);
  return sitemapSource.includes(`\${BASE}${route}`);
}

const routes = collectPages(appDir)
  .map(routeForPage)
  .filter((route) => route && !excluded.has(route));

const missing = routes.filter((route) => !isInSitemap(route));
if (missing.length > 0) {
  console.error("Static crawlable routes missing from app/sitemap.ts:");
  for (const route of missing) console.error(`  - ${route}`);
  process.exit(1);
}

for (const route of routes) {
  const page = route === "/" ? join(appDir, "page.tsx") : join(appDir, route, "page.tsx");
  if (!existsSync(page)) {
    console.error(`Route resolved to a missing page: ${route}`);
    process.exit(1);
  }
}

for (const route of noindexRoutes) {
  const page = join(appDir, route, "page.tsx");
  const pageSource = readFileSync(page, "utf8");
  if (!/robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/.test(pageSource)) {
    console.error(`Intentional noindex route is missing robots index:false, follow:true: ${route}`);
    process.exit(1);
  }
  if (isInSitemap(route)) {
    console.error(`Intentional noindex route must not appear in app/sitemap.ts: ${route}`);
    process.exit(1);
  }
}

console.log(
  `Sitemap coverage OK: ${routes.length} static indexable routes; ${noindexRoutes.length} crawlable noindex routes verified.`,
);
