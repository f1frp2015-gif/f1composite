import assert from "node:assert/strict";

// Read-only HTTP verification against the built site or its Vercel deployment.
const base = process.argv[2] ?? "http://localhost:3024";
const canonicalBase = "https://www.f1composite.com";
const paths = ["/", "/products/product-lines", "/pultruded-frp-profiles", "/applications", "/industries", "/products/frp-window-frames", "/products/window-door-profiles", "/products/fiberglass-windows-doors", "/products/grating", "/industries/water-wastewater", "/products/frp-solar-mounting-systems", "/applications/frp-solar-mounting-profiles"];
const discovered = new Set();
const titles = new Set();
const decode = value => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
for (const path of paths) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `${path}: status`);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  assert.ok(title && !titles.has(title), `${path}: distinct title`);
  titles.add(title);
  assert.ok(decode(title).length <= 60, `${path}: title length`);
  assert.ok(description && decode(description).length >= 120 && decode(description).length <= 160, `${path}: description length`);
  assert.equal(new URL(canonical).href, new URL(path, canonicalBase).href, `${path}: canonical`);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path}: one visible H1`);
  assert.ok(!/name="robots" content="[^"]*noindex/.test(html), `${path}: indexable`);
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) JSON.parse(match[1]);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"#]+)"/g)) {
    const url = new URL(decode(match[1]), base);
    if (url.origin === new URL(base).origin && !url.pathname.startsWith("/api/")) discovered.add(url.pathname);
  }
}

const failures = [];
const queue = [...discovered];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const path = queue.shift();
    try {
      const response = await fetch(new URL(path, base), { method: "HEAD", signal: AbortSignal.timeout(20000) });
      if (!response.ok) failures.push(`${path}: ${response.status}`);
    } catch (error) { failures.push(`${path}: ${error.message}`); }
  }
}));
assert.deepEqual(failures, [], "all linked pages and documents resolve");
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
for (const path of paths.filter(path => path !== "/")) assert.ok(sitemap.includes(`${canonicalBase}${path}</loc>`), `${path}: sitemap`);
const knowledge = await (await fetch(new URL("/api/ai-context", base))).json();
assert.equal(knowledge.commercialProductFamilies.length, 4);
assert.equal(knowledge.windowPurchasingRoutes.length, 2);
const llms = await (await fetch(new URL("/llms.txt", base))).text();
for (const family of knowledge.commercialProductFamilies) assert.ok(llms.includes(family.url), `public context agrees: ${family.name}`);
console.log(`Verified ${paths.length} indexable pages, ${discovered.size} linked paths, sitemap, JSON-LD and shared public context.`);
