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

test("a page header date matches the page's JSON-LD dateModified", () => {
  const dated = pageFiles("app").filter((path) => /<PageHeader[^>]*\bupdated=\{/.test(read(path).replace(/\n\s*/g, " ")));
  assert.ok(dated.length >= 15, `only ${dated.length} pages show a date`);
  for (const path of dated) {
    const source = read(path);
    const expression = source.replace(/\n\s*/g, " ").match(/<PageHeader[^>]*\bupdated=\{([^}]+)\}/)[1];
    assert.ok(source.includes(`dateModified: ${expression}`), `${path} shows ${expression} but declares a different dateModified`);
  }
});
