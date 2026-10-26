import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";

// Guards for the GFRP rebar cluster added in the October 2026 market upgrade: the product
// page, the applications and standards reference pages, and the two supporting articles.

const rebar = loadProjectModule("lib/gfrpRebar.ts");
const { rebarCatalog } = loadProjectModule("content/data/frpRebar.ts");
const { blogPosts } = loadProjectModule("content/data/blogPosts.ts");
const { seoQueryTargets } = loadProjectModule("content/data/seoQueryTargets.ts");
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const PRODUCT = "app/products/frp-rebar/page.tsx";
const APPLICATIONS = "app/resources/gfrp-rebar-applications/page.tsx";
const STANDARDS = "app/resources/gfrp-rebar-standards/page.tsx";
const NEW_POSTS = ["gfrp-rebar-manufacturers-how-to-qualify-a-supplier", "importing-gfrp-rebar-container-loading-documents"];

test("ASTM D7957 Table 3 is reproduced for No. 2 to No. 10 with falling stress per area", () => {
  const sizes = rebar.ASTM_D7957_SIZE_MINIMUMS;
  assert.deepEqual(sizes.map((s) => s.designation), ["No. 2", "No. 3", "No. 4", "No. 5", "No. 6", "No. 7", "No. 8", "No. 9", "No. 10"]);
  assert.equal(sizes[2].minTensileLoadKn, 96);
  assert.equal(sizes[2].minTensileLoadKip, 21.6);
  const stresses = sizes.map(rebar.astmMinTensileStressMPa);
  for (let i = 1; i < stresses.length; i++) assert.ok(stresses[i] < stresses[i - 1], `${sizes[i].designation} stress should fall with size`);
  assert.ok(Math.abs(stresses[2] - 744) < 1);
  assert.ok(rebar.ASTM_D7957_REQUIREMENTS.length >= 10);
  assert.ok(rebar.ASTM_D7957_REQUIREMENTS.some((r) => /44\.8 GPa/.test(r.requirement)));
});

test("the standards crosswalk covers every market the calculator lists and the Chinese standards", () => {
  const markets = new Set(rebar.GFRP_STANDARDS_CROSSWALK.map((row) => row.market));
  for (const market of ["United States", "Canada", "European Union", "Australia", "China", "International"]) assert.ok(markets.has(market), market);
  assert.ok(rebar.GFRP_STANDARDS_CROSSWALK.some((row) => /GB\/T 26743/.test(row.document)));
  for (const row of rebar.GFRP_STANDARDS_CROSSWALK) assert.ok(row.ask.length > 20 && row.scope.length > 20, row.document);
  assert.ok(Math.abs(rebar.gfrpMetresPerTonne(113) - 4657) < 5);
});

test("the catalog describes segments, supply routes, price basis and export packing", () => {
  assert.ok(rebarCatalog.segments.length >= 6);
  for (const segment of rebarCatalog.segments) assert.match(segment.href, /^\/resources\/gfrp-rebar-applications#/);
  assert.deepEqual(rebarCatalog.supplyRoutes.map((route) => route.stage).sort(), ["distributor", "quote", "sample", "technical"]);
  assert.ok(rebarCatalog.faqs.length >= 10);
  assert.deepEqual(rebarCatalog.grades.map((g) => g.id), ["45", "60"], "owner decision 2026-10-26: two modulus grades");
  assert.ok(read(PRODUCT).includes("catalog.grades.map"));
  assert.match(read(APPLICATIONS) + read(STANDARDS) + read(PRODUCT), /FengDu/);
  assert.ok(rebarCatalog.title.length <= 60, "title length");
  assert.ok(rebarCatalog.description.length <= 160, "description length");
  // Owner rule 2026-10-23: price ranges only, RFQ decides.
  assert.match(rebarCatalog.pricing.retailRange, /roughly \$0\.25 to \$0\.85 per foot/);
  for (const text of [rebarCatalog.pricing.retailRange, ...rebarCatalog.faqs.map((f) => f.answer)]) assert.doesNotMatch(text, /\$\d+\.\d{2} per (foot|metre|meter)(?! for)/i);
});

test("the rebar pages link each other and the owner page", () => {
  const product = read(PRODUCT);
  for (const href of ["/resources/gfrp-rebar-applications", "/resources/gfrp-rebar-standards", "/resources/gfrp-rebar-size-chart", "/tools/gfrp-rebar-calculator", "/resources/blog/fiberglass-rebar-cost-per-foot", `/resources/blog/${NEW_POSTS[0]}`, `/resources/blog/${NEW_POSTS[1]}`]) {
    assert.ok(product.includes(href), `product page does not link ${href}`);
  }
  for (const file of [APPLICATIONS, STANDARDS]) {
    const page = read(file);
    assert.ok(page.includes('href="/products/frp-rebar"') || page.includes('href: "/products/frp-rebar"'), `${file} does not link the rebar page`);
    assert.match(page, /dateModified: PAGE_UPDATED/);
  }
  assert.ok(read(APPLICATIONS).includes("/resources/gfrp-rebar-standards"));
  assert.ok(read(STANDARDS).includes("/resources/gfrp-rebar-applications"));
  for (const id of ["marine", "precast", "flatwork", "bridges", "mri", "soft-eye", "water"]) assert.ok(read(APPLICATIONS).includes(`id: "${id}"`), `applications page lacks #${id}`);
});

test("new pages and articles are registered as query owners with title and description limits", () => {
  for (const url of ["/products/frp-rebar", "/resources/gfrp-rebar-applications", "/resources/gfrp-rebar-standards"]) {
    const target = seoQueryTargets.find((t) => t.targetUrl === url);
    assert.ok(target, url);
    assert.ok(target.title.length <= 60, `${url} title`);
    assert.ok(target.description.length <= 160, `${url} description`);
  }
  for (const slug of NEW_POSTS) {
    const post = blogPosts.find((p) => p.slug === slug);
    assert.ok(post, slug);
    assert.ok(post.seoTitle.length <= 60);
    assert.ok(post.sourceLinks.length >= 5, `${slug} sources`);
    assert.ok(post.faq.items.length >= 4);
    assert.ok(post.content.includes("/products/frp-rebar"));
  }
});

test("no page claims an approval, listing or domestic-content status F1 does not hold", () => {
  const sources = [PRODUCT, APPLICATIONS, STANDARDS, "content/data/frpRebar.ts"].map(read).join("\n")
    + blogPosts.filter((p) => NEW_POSTS.includes(p.slug)).map((p) => `${p.answerBox}\n${p.content}\n${p.faq.items.map((i) => i.answer).join("\n")}`).join("\n");
  for (const pattern of [
    /(F1|we|our)(?![^.]{0,60}\b(?:not|never|no)\b)[^.]{0,60}\b(hold|holds|have|has|is|are)\b[^.]{0,20}\b(ICC-ES|ESR|DOT|CE[- ]mark|DIBt|ETA|Buy America|BABA)[^.]{0,20}(approved|approval|listed|listing|certified|compliant)/i,
    /ICC-ES (approved|certified) GFRP/i,
    /DOT[- ]approved (bar|rebar|supplier)/i,
  ]) {
    const match = sources.match(pattern);
    assert.equal(match, null, `approval claim: ${match?.[0]}`);
  }
  assert.match(sources, /do not hold ICC-ES/);
});
