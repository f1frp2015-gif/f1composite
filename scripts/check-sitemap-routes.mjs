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
]);

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

console.log(`Sitemap coverage OK: ${routes.length} static crawlable routes.`);
