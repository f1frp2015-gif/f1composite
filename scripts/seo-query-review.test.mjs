// All fixtures in this file are synthetic, test-only observations, not site results.
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { readGscCsv, reviewQueries, loadOwnershipTargets } from "./seo-query-review.mjs";

const HEADER = "query,page,country,device,date,clicks,impressions,position";
const urlA = "https://www.f1composite.com/a";
const urlB = "https://www.f1composite.com/b";
const line = (overrides = {}) => {
  const row = { query: "test-only frp", page: urlA, country: "USA", device: "DESKTOP", date: "2026-10-11", clicks: "2", impressions: "20", position: "4", ...overrides };
  return HEADER.split(",").map(key => String(row[key]).includes(",") || /["\r\n]/.test(String(row[key])) ? `"${String(row[key]).replaceAll('"', '""')}"` : row[key]).join(",");
};
const input = (...lines) => readGscCsv([HEADER, ...lines].join("\n"));
const oneGroup = rows => reviewQueries(rows, { asOf: "2026-10-11" }).groups[0];

test("reads BOM, quoted commas/newlines and escaped quotes without changing query identity", () => {
  const query = 'test-only "FRP, tube"\nprocurement';
  const csv = `\uFEFF${HEADER.toUpperCase()}\r\n${line({ query })}\r\n`;
  const rows = readGscCsv(csv);
  assert.equal(rows[0].query, query);
  assert.equal(rows[0].clicks, 2);
  assert.equal(rows[0].country, "USA");
});

test("rejects malformed CSV and missing joint dimensions", () => {
  for (const csv of ['query,page\nx,y', `${HEADER}\n"unclosed`, `${HEADER}\n"closed"junk`, `${HEADER}\nx,y`, `${HEADER},query\n`]) {
    assert.throws(() => readGscCsv(csv), /Missing required|Unclosed|Malformed|cells|Duplicate/);
  }
  for (const key of ["query", "page", "country", "device", "date"]) assert.throws(() => input(line({ [key]: "" })), /required|absolute/);
});

test("rejects invalid dates and numbers rather than coercing to zero", () => {
  for (const date of ["2026-02-29", "2026-13-01", "2026-04-31", "10/11/2026", "2026-1-01"]) assert.throws(() => input(line({ date })), /date|YYYY/);
  for (const clicks of ["NaN", "Infinity", "-1", "1.2", "1,000", "1e3", "0x10", "9007199254740992"]) assert.throws(() => input(line({ clicks })), /clicks/);
  for (const position of ["NaN", "Infinity", "-1", "0", "0.5"]) assert.throws(() => input(line({ position })), /position/);
  assert.throws(() => input(line({ page: "javascript:alert(1)" })), /HTTP/);
  assert.throws(() => input(line({ page: `${urlA}#hidden` })), /fragment/);
  assert.throws(() => input(line({ clicks: "1", impressions: "0" })), /zero impressions/);
  assert.equal(input(line({ date: "2024-02-29" }))[0].date, "2024-02-29");
});

test("rejects overlapping exports at the exact five-dimensional grain", () => {
  assert.throws(() => input(line(), line({ clicks: "9" })), /duplicate.*grain/);
  const rows = input(line(), line({ page: urlB }), line({ country: "GBR" }), line({ device: "MOBILE" }), line({ date: "2026-10-10" }), line({ query: "TEST-only frp" }));
  const report = reviewQueries(rows, { asOf: "2026-10-11" });
  assert.equal(report.groups.length, 4);
  assert.equal(report.includedRows, 6);
  assert.equal(report.groups.find(group => group.country === "GBR").current.clicks, 2);
});

test("keeps missing metrics distinct from a measured zero", () => {
  const group = oneGroup(input(line({ clicks: "", impressions: "", position: "" })));
  assert.equal(group.current.clicks, null);
  assert.equal(group.current.impressions, null);
  assert.equal(group.current.weightedPosition, null);
  assert.equal(group.current.status, "partial_metrics");
  assert.equal(group.previous.status, "missing");
  assert.equal(group.previous.clicks, null);
  const zero = oneGroup(input(line({ clicks: "0", impressions: "0", position: "" })));
  assert.equal(zero.current.clicks, 0);
  assert.equal(zero.current.impressions, 0);
  assert.equal(zero.current.weightedPosition, null);
  assert.equal(zero.weeks.at(-1).dominanceStatus, "zero_measured_impressions");
});

test("weights position by impressions and never averages row averages equally", () => {
  const group = oneGroup(input(line({ impressions: "90", position: "2" }), line({ page: urlB, impressions: "10", position: "10" })));
  assert.equal(group.current.weightedPosition, 2.8);
  assert.equal(group.current.impressions, 100);
  assert.equal(group.multiplePagesObserved, true);
  assert.equal(group.weeks.at(-1).dominantPage, urlA);
  const incomplete = oneGroup(input(line(), line({ page: urlB, position: "" })));
  assert.equal(incomplete.current.weightedPosition, null);
  assert.equal(incomplete.current.impressions, 40);
  assert.equal(incomplete.current.missingPositionRows, 1);
});

test("flags only adjacent observed dominant-page changes, not ties or missing weeks", () => {
  const group = oneGroup(input(
    line({ date: "2026-08-23", impressions: "5" }),
    line({ date: "2026-08-30", page: urlB, impressions: "6" }),
    line({ date: "2026-09-06", impressions: "10" }), line({ date: "2026-09-06", page: urlB, impressions: "10" }),
    line({ date: "2026-09-20", impressions: "7" }),
    line({ date: "2026-09-27", page: urlB, impressions: "" }),
  ));
  assert.equal(group.adjacentWeekDominantPageSwitches.length, 1);
  assert.equal(group.adjacentWeekDominantPageSwitches[0].toPage, urlB);
  const tie = group.weeks.find(week => week.end === "2026-09-06");
  assert.equal(tie.dominanceStatus, "tie");
  assert.equal(tie.dominantPage, null);
  assert.deepEqual(tie.tiedPages, [urlA, urlB]);
  assert.equal(group.weeks.find(week => week.end === "2026-09-13").dominanceStatus, "missing");
  assert.equal(group.weeks.find(week => week.end === "2026-09-27").dominanceStatus, "missing_impressions");
});

test("windows are 56 inclusive dates each, exclude outside data and suppress sparse comparisons", () => {
  const report = reviewQueries(input(line({ date: "2026-06-21" }), line({ date: "2026-06-22" }), line({ date: "2026-08-16" }), line({ date: "2026-08-17" }), line(), line({ date: "2026-10-12" })), { asOf: "2026-10-11" });
  assert.deepEqual(report.windows, { previous: { start: "2026-06-22", end: "2026-08-16" }, current: { start: "2026-08-17", end: "2026-10-11" }, daysEach: 56 });
  assert.deepEqual(report.excludedRows, { beforeWindow: 1, afterAsOf: 1 });
  assert.equal(report.groups[0].current.clicks, 4);
  assert.equal(report.groups[0].previous.clicks, 4);
  assert.equal(report.groups[0].comparison.clicksDelta, null);
  assert.equal(report.groups[0].comparison.status, "insufficient-observed-dates-or-metrics");
});

test("112 test-only daily rows permit descriptive differences without a causal uplift claim", () => {
  const start = Date.parse("2026-06-22T00:00:00Z");
  const rows = input(...Array.from({ length: 112 }, (_, i) => line({ date: new Date(start + i * 86_400_000).toISOString().slice(0, 10), clicks: i < 56 ? "1" : "2", impressions: "10", position: i < 56 ? "5" : "3" })));
  const group = oneGroup(rows);
  assert.equal(group.previous.observedDays, 56);
  assert.equal(group.current.observedDays, 56);
  assert.equal(group.comparison.status, "descriptive-only");
  assert.equal(group.comparison.clicksDelta, 56);
  assert.equal(group.comparison.impressionsDelta, 0);
  assert.equal(group.comparison.weightedPositionDelta, -2);
  assert.match(group.comparison.interpretation, /not uplift or a causal effect/);
});

test("empty template has missing status, no fabricated groups, metrics or improvement", () => {
  const report = reviewQueries(readGscCsv(`${HEADER}\n`), { asOf: "2026-10-11" });
  assert.equal(report.status, "missing");
  assert.deepEqual(report.groups, []);
  assert.equal(report.inputRows, 0); // record count, not a measured business metric
  assert.throws(() => reviewQueries([], { asOf: "2026-02-30" }), /invalid date/);
});

test("references the live ownership registry only on exact normalized primary query", () => {
  const targets = loadOwnershipTargets();
  const target = targets.find(value => value.primaryQuery.toLowerCase() === "frp profile machining");
  assert.ok(target);
  const report = reviewQueries(input(line({ query: "FRP Profile Machining" }), line({ query: "best frp profile machining company" })), { asOf: "2026-10-11", ownershipTargets: targets });
  assert.equal(report.groups.find(group => group.query === "FRP Profile Machining").ownership.references[0].targetUrl, target.targetUrl);
  assert.equal(report.groups.find(group => group.query.startsWith("best")).ownership.match, "unmatched");
});

test("CLI writes only local JSON and leaves invalid or duplicate input without an output", () => {
  const dir = mkdtempSync(join(tmpdir(), "seo-query-review-test-only-"));
  try {
    const source = join(dir, "input.csv"), output = join(dir, "review.json");
    writeFileSync(source, `${HEADER}\n`);
    const command = (...args) => spawnSync(process.execPath, ["scripts/seo-query-review.mjs", ...args], { encoding: "utf8" });
    const result = command("--input", source, "--output", output, "--as-of", "2026-10-11");
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(readFileSync(output, "utf8")).status, "missing");
    assert.equal(command("--input", source, "--output", source).status, 1);
    assert.equal(command("--input", source, "--input", source, "--output", output).status, 1);
    writeFileSync(source, `${HEADER}\n${line()}\n${line()}`);
    const failed = command("--input", source, "--output", join(dir, "invalid.json"));
    assert.equal(failed.status, 1);
    assert.match(failed.stderr, /duplicate/);
    assert.throws(() => readFileSync(join(dir, "invalid.json")), /ENOENT/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
