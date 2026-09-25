// Checks the rule stated in content/data/seoQueryTargets.ts: every supporting
// page links back to the page that owns its query. Reads the prerendered HTML
// from `next build` and only counts links inside <main>, so navigation and
// footer links do not satisfy the rule.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { loadProjectModule } from "./load-project-module.mjs";

const appDir = join(process.cwd(), ".next", "server", "app");
if (!existsSync(appDir)) {
  console.error("No build output in .next/server/app. Run `npm run build` first.");
  process.exit(1);
}

const { seoQueryTargets } = loadProjectModule("content/data/seoQueryTargets.ts");

function mainLinks(route) {
  const file = join(appDir, route === "/" ? "index.html" : `${route}.html`);
  if (!existsSync(file)) return null;
  const main = readFileSync(file, "utf8").match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";
  return [...main.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((match) => match[1].replace(/&amp;/g, "&"));
}

const linksTo = (href, target) => href === target || href.startsWith(`${target}#`) || href.startsWith(`${target}?`);

const problems = [];
let checked = 0;
for (const target of seoQueryTargets) {
  for (const route of target.supportingUrls) {
    const links = mainLinks(route);
    if (!links) {
      problems.push(`${route}: no prerendered HTML (supporting page for "${target.primaryQuery}")`);
      continue;
    }
    checked += 1;
    if (!links.some((href) => linksTo(href, target.targetUrl))) {
      problems.push(`${route} does not link to ${target.targetUrl}, which owns "${target.primaryQuery}"`);
    }
  }
}

if (problems.length > 0) {
  console.error("Supporting pages missing a link to their query owner:");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log(`Owner links OK: ${checked} supporting pages link back to their query owners.`);
