import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProjectModule } from "./load-project-module.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const { engineeringEvidence, reportedResults } = loadProjectModule("content/data/engineeringEvidence.ts");
const { pvFrameReports } = loadProjectModule("content/data/pvFrameEvidence.ts");

function pageFiles(dir) {
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return pageFiles(path);
    return entry.name === "page.tsx" ? [path] : [];
  });
}

test("every reported result points at a listed document that exists", () => {
  const ids = new Set(engineeringEvidence.map((record) => record.id));
  for (const row of reportedResults) {
    assert.ok(ids.has(row.id), `${row.id} has no card in the evidence index`);
    assert.equal(engineeringEvidence.find((record) => record.id === row.id).file, row.file, `${row.id} links a different file`);
    assert.ok(existsSync(join(root, "public", row.file)), `${row.file} is missing`);
    assert.match(row.date, /^\d{4}-\d{2}-\d{2}$/);
  }
  for (const report of pvFrameReports) assert.ok(ids.has(report.id), `${report.id} is missing from the evidence index`);
});

test("Intertek and TÜV rows state the report conclusion, not extracted measurements", () => {
  // Both laboratories restrict partial reproduction of their reports.
  const measurement = /\d[\d.,]*\s*(?:MPa|GPa|kPa|Pa|kN|N|%|L\/s|W\/)/;
  const restricted = reportedResults.filter((row) => /Intertek|TÜV/.test(row.issuer));
  assert.ok(restricted.length >= 4);
  for (const row of restricted) {
    assert.doesNotMatch(row.result, measurement, `${row.issuer} ${row.reference} quotes a measured value`);
  }
  for (const record of engineeringEvidence.filter((item) => /TÜV/.test(item.reference))) {
    assert.doesNotMatch(record.scope, measurement, `${record.reference} scope quotes a measured value`);
  }
});

test("page content dates are real, not in the future, and reach the page and the sitemap", () => {
  const { pageDates } = loadProjectModule("content/data/pageDates.ts");
  // A day and a half of slack so a date written in China does not fail in UTC.
  const latestAllowed = new Date(Date.now() + 36 * 3600 * 1000).toISOString().slice(0, 10);
  assert.match(read("app/sitemap.ts"), /pageDateFor\(entry\.url\.replace\(BASE, ""\) \|\| "\/"\)/);
  for (const [route, date] of Object.entries(pageDates)) {
    assert.match(date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(!Number.isNaN(Date.parse(date)) && date <= latestAllowed, `${route} is dated ${date}`);
    const source = read(`app${route}/page.tsx`);
    assert.ok(source.includes(`pageDates[`), `${route} does not read its date from pageDates`);
    assert.ok(/dateModified[:=]/.test(source), `${route} declares no dateModified`);
  }
});

test("llms.txt names the maintained page for each owned query and states the citation rules", () => {
  const { pageDates } = loadProjectModule("content/data/pageDates.ts");
  const { seoQueryTargets } = loadProjectModule("content/data/seoQueryTargets.ts");
  const { buildLlmsIndex, buildLlmsContent } = loadProjectModule("lib/llmsContent.ts");
  const index = buildLlmsIndex();
  for (const text of [index, buildLlmsContent()]) {
    assert.match(text, /## Preferred citations/);
    assert.match(text, /## When citing F1 Composite/);
    for (const target of seoQueryTargets.filter((item) => item.intent !== "brand")) {
      const url = `https://www.f1composite.com${target.targetUrl === "/" ? "" : target.targetUrl}`;
      assert.ok(text.includes(`[${target.primaryQuery}](${url})`), `${target.primaryQuery} has no preferred citation`);
    }
  }
  const revision = index.match(/- Brief revision: (\d{4}-\d{2}-\d{2})/)?.[1];
  assert.ok(revision, "llms.txt has no brief revision");
  for (const date of Object.values(pageDates)) assert.ok(date <= revision, `brief revision ${revision} is older than a dated page (${date})`);
});

test("the structural-shape and grating hubs open with a quotable key-facts block", () => {
  for (const route of ["/products/fiberglass-structural-shapes", "/products/grating"]) {
    const source = read(`app${route}/page.tsx`);
    assert.match(source, /<KeyFacts\b[^>]*\bsummary=/s, `${route} has no key-facts summary`);
    assert.match(source, /facts=\{keyFacts\}/, `${route} renders no key facts`);
  }
});

test("a page header date matches the page's JSON-LD dateModified", () => {
  const dated = pageFiles("app").filter((path) => /<PageHeader[^>]*\bupdated=\{/.test(read(path).replace(/\n\s*/g, " ")));
  assert.ok(dated.length >= 15, `only ${dated.length} pages show a date`);
  for (const path of dated) {
    const source = read(path);
    const expression = source.replace(/\n\s*/g, " ").match(/<PageHeader[^>]*\bupdated=\{([^}]+)\}/)[1];
    assert.ok(source.includes(`dateModified: ${expression}`), `${path} shows ${expression} but declares a different dateModified`);
  }
});
