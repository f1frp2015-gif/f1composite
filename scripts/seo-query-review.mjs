#!/usr/bin/env node
// Offline review only. Reads real, jointly dimensioned GSC rows; never edits routes.
import { readFileSync, writeFileSync, mkdirSync, realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProjectModule } from "./load-project-module.mjs";

const DAY = 86_400_000;
export const REQUIRED_HEADERS = ["query", "page", "country", "device", "date", "clicks", "impressions", "position"];

/** RFC 4180-style quoted fields, embedded newlines, doubled quotes and UTF-8 BOM. */
export function parseCsv(text) {
  const input = text.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [], field = "", quoted = false, closed = false;
  const cell = () => { row.push(field); field = ""; closed = false; };
  const record = () => { cell(); if (row.some(value => value !== "")) rows.push(row); row = []; };
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quoted) {
      if (c === '"' && input[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { quoted = false; closed = true; }
      else field += c;
    } else if (c === ",") cell();
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && input[i + 1] === "\n") i++;
      record();
    } else if (c === '"' && field === "" && !closed) quoted = true;
    else {
      if (closed || c === '"') throw new Error(`Malformed CSV near character ${i + 1}`);
      field += c;
    }
  }
  if (quoted) throw new Error("Unclosed quoted CSV field");
  if (row.length || field !== "" || closed) record();
  return rows;
}

function dateValue(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(`${label}: expected YYYY-MM-DD, date is required`);
  const time = Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== value) throw new Error(`${label}: invalid date ${value}`);
  return time;
}
const iso = time => new Date(time).toISOString().slice(0, 10);

function numberOrMissing(value, name, record) {
  if (value === "") return null;
  if (!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(value)) throw new Error(`Record ${record}: invalid ${name} ${JSON.stringify(value)}`);
  const number = Number(value);
  if (!Number.isFinite(number) || number > Number.MAX_SAFE_INTEGER || (name !== "position" && !Number.isSafeInteger(number))) {
    throw new Error(`Record ${record}: ${name} must be a finite nonnegative ${name === "position" ? "number" : "integer"}`);
  }
  return number;
}

export function readGscCsv(text) {
  const records = parseCsv(text);
  if (!records.length) throw new Error(`CSV header is required: ${REQUIRED_HEADERS.join(",")}`);
  const headers = records[0].map(value => value.trim().toLowerCase());
  if (new Set(headers).size !== headers.length) throw new Error("Duplicate CSV headers");
  for (const key of REQUIRED_HEADERS) if (!headers.includes(key)) throw new Error(`Missing required CSV column: ${key}`);
  const seen = new Set();
  return records.slice(1).map((values, index) => {
    const record = index + 2;
    if (values.length !== headers.length) throw new Error(`Record ${record}: ${values.length} cells; expected ${headers.length}`);
    const data = Object.fromEntries(headers.map((key, i) => [key, values[i].trim()]));
    for (const key of ["query", "page", "country", "device"]) if (!data[key]) throw new Error(`Record ${record}: ${key} is required`);
    let url;
    try { url = new URL(data.page); } catch { throw new Error(`Record ${record}: page must be an absolute HTTP(S) URL`); }
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.hash) throw new Error(`Record ${record}: page must be an HTTP(S) URL without credentials or fragment`);
    dateValue(data.date, `Record ${record}`);
    data.clicks = numberOrMissing(data.clicks, "clicks", record);
    data.impressions = numberOrMissing(data.impressions, "impressions", record);
    data.position = numberOrMissing(data.position, "position", record);
    if (data.position !== null && data.position < 1 && !(data.position === 0 && data.impressions === 0)) throw new Error(`Record ${record}: position must be at least 1 when impressions are positive or missing`);
    if (data.impressions === 0 && data.clicks > 0) throw new Error(`Record ${record}: clicks cannot be positive with zero impressions`);
    // Keep all source dimensions, including page spelling and query case, distinct.
    const key = JSON.stringify([data.query, data.page, data.country, data.device, data.date]);
    if (seen.has(key)) throw new Error(`Record ${record}: duplicate query/page/country/device/date grain; merge overlapping exports upstream`);
    seen.add(key);
    return Object.fromEntries(REQUIRED_HEADERS.map(key => [key, data[key]]));
  });
}

function safeSum(values) {
  const result = values.reduce((total, value) => total + value, 0);
  if (!Number.isFinite(result) || result > Number.MAX_SAFE_INTEGER) throw new Error("Aggregate exceeds safe numeric range");
  return result;
}

function metrics(rows) {
  if (!rows.length) return { status: "missing", rowCount: 0, observedDays: 0, clicks: null, impressions: null, weightedPosition: null, missingClicksRows: 0, missingImpressionsRows: 0, missingPositionRows: 0 };
  const missingClicksRows = rows.filter(row => row.clicks === null).length;
  const missingImpressionsRows = rows.filter(row => row.impressions === null).length;
  const missingPositionRows = rows.filter(row => row.position === null && row.impressions !== 0).length;
  const impressions = missingImpressionsRows ? null : safeSum(rows.map(row => row.impressions));
  const weighted = rows.filter(row => row.impressions > 0 && row.position !== null).map(row => row.position * row.impressions);
  return {
    status: missingClicksRows || missingImpressionsRows || missingPositionRows ? "partial_metrics" : "observed",
    rowCount: rows.length, observedDays: new Set(rows.map(row => row.date)).size,
    clicks: missingClicksRows ? null : safeSum(rows.map(row => row.clicks)), impressions,
    weightedPosition: impressions > 0 && !missingPositionRows ? safeSum(weighted) / impressions : null,
    missingClicksRows, missingImpressionsRows, missingPositionRows,
  };
}

function byPage(rows) {
  const pages = new Map();
  for (const row of rows) {
    if (!pages.has(row.page)) pages.set(row.page, []);
    pages.get(row.page).push(row);
  }
  return [...pages].map(([page, values]) => ({ page, ...metrics(values) }))
    .sort((a, b) => (b.impressions ?? -1) - (a.impressions ?? -1) || a.page.localeCompare(b.page));
}

function summarizeWindow(rows, start, end) {
  const inWindow = rows.filter(row => row.date >= start && row.date <= end);
  const summary = metrics(inWindow);
  return { start, end, expectedDays: 56, ...summary, allDatesObserved: summary.observedDays === 56, pages: byPage(inWindow) };
}

function weekly(rows, start, index) {
  const from = start + index * 7 * DAY, to = from + 6 * DAY;
  const selected = rows.filter(row => row.date >= iso(from) && row.date <= iso(to));
  const summary = metrics(selected), pages = byPage(selected);
  const positive = pages.filter(page => page.impressions > 0);
  const best = positive.filter(page => page.impressions === positive[0]?.impressions).map(page => page.page);
  const dominanceStatus = !selected.length ? "missing" : summary.impressions === null ? "missing_impressions" : !positive.length ? "zero_measured_impressions" : best.length > 1 ? "tie" : "observed";
  return {
    start: iso(from), end: iso(to), period: index < 8 ? "previous" : "current", ...summary,
    pages, multiplePagesWithImpressions: positive.length > 1, dominanceStatus,
    dominantPage: dominanceStatus === "observed" ? best[0] : null,
    tiedPages: dominanceStatus === "tie" ? best : [],
  };
}

export function loadOwnershipTargets() {
  const existing = loadProjectModule("content/data/seoQueryTargets.ts").seoQueryTargets;
  const { blogKeywordTargets } = loadProjectModule("content/data/blogStrategy.ts");
  const ownedUrls = new Set(existing.map(target => target.targetUrl));
  return [...existing, ...blogKeywordTargets
    .filter(target => !ownedUrls.has(`/resources/blog/${target.slug}`))
    .map(target => ({
      targetUrl: `/resources/blog/${target.slug}`, primaryQuery: target.primaryQuery,
      intent: target.intent,
      supportingUrls: [`/resources/blog/topics/${target.topic}`, target.nextStep.href],
    }))];
}

const queryKey = query => query.trim().replace(/\s+/g, " ").toLowerCase();

export function reviewQueries(rows, { asOf, ownershipTargets = [] } = {}) {
  const latest = rows.reduce((max, row) => row.date > max ? row.date : max, "");
  const endDate = asOf ?? (latest || iso(Date.now()));
  const end = dateValue(endDate, "--as-of");
  const first = end - 111 * DAY, currentStart = end - 55 * DAY;
  const groups = new Map();
  let beforeWindow = 0, afterAsOf = 0;
  for (const row of rows) {
    if (row.date < iso(first)) { beforeWindow++; continue; }
    if (row.date > endDate) { afterAsOf++; continue; }
    const key = JSON.stringify([row.query, row.country, row.device]);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  const results = [...groups.values()].map(values => {
    const { query, country, device } = values[0];
    const previous = summarizeWindow(values, iso(first), iso(currentStart - DAY));
    const current = summarizeWindow(values, iso(currentStart), endDate);
    const weeks = Array.from({ length: 16 }, (_, index) => weekly(values, first, index));
    const switches = weeks.flatMap((week, index) => {
      const preceding = weeks[index - 1];
      return preceding?.dominantPage && week.dominantPage && preceding.dominantPage !== week.dominantPage
        ? [{ fromWeek: preceding.start, toWeek: week.start, fromPage: preceding.dominantPage, toPage: week.dominantPage }] : [];
    });
    const refs = ownershipTargets.filter(target => queryKey(target.primaryQuery) === queryKey(query))
      .map(({ primaryQuery, targetUrl, intent, supportingUrls }) => ({ primaryQuery, targetUrl, intent, supportingUrls }));
    const eligible = [previous, current].every(window => window.allDatesObserved && window.status === "observed");
    const delta = key => eligible && previous[key] !== null && current[key] !== null ? current[key] - previous[key] : null;
    return {
      query, country, device,
      ownership: { match: refs.length ? "exact-primary-query-case-insensitive" : "unmatched", references: refs },
      observation: "Review only: multiple URLs or dominant-page changes do not establish cannibalization.",
      multiplePagesObserved: new Set(values.map(row => row.page)).size > 1,
      previous, current, weeks, adjacentWeekDominantPageSwitches: switches,
      comparison: {
        status: eligible ? "descriptive-only" : "insufficient-observed-dates-or-metrics",
        clicksDelta: delta("clicks"), impressionsDelta: delta("impressions"), weightedPositionDelta: delta("weightedPosition"),
        interpretation: "Differences are observations, not uplift or a causal effect. A negative position delta means a lower observed average position number.",
      },
    };
  }).sort((a, b) => JSON.stringify([a.query, a.country, a.device]).localeCompare(JSON.stringify([b.query, b.country, b.device])));
  return {
    schemaVersion: 1, status: results.length ? "observed-data" : "missing", asOf: endDate,
    asOfSource: asOf ? "explicit" : latest ? "latest-input-date" : "system-date-no-data",
    windows: { previous: { start: iso(first), end: iso(currentStart - DAY) }, current: { start: iso(currentStart), end: endDate }, daysEach: 56 },
    inputRows: rows.length, includedRows: rows.length - beforeWindow - afterAsOf, excludedRows: { beforeWindow, afterAsOf },
    methodology: {
      grain: ["query", "page", "country", "device", "date"],
      grouping: ["query", "country", "device"], dominance: "weekly page-level impressions; ties and missing data have no single winner",
      position: "sum(input row position * impressions) / sum(input row impressions); not GSC property-level average position",
      totals: "Sums of observed page-level rows; not market search volume or unique searches. Missing rows are not zeros.",
      coverage: "A row on every date does not prove a complete export. GSC privacy filtering and row limits still apply.",
      actions: "No automatic owner changes, mergers, redirects, rankings or attribution claims.",
    },
    ownershipSource: "content/data/seoQueryTargets.ts + content/data/blogStrategy.ts (reference only; no fuzzy query matching)", groups: results,
  };
}

export function runCli(args) {
  if (args.length === 1 && args[0] === "--help") {
    console.log("node scripts/seo-query-review.mjs --input gsc.csv --output review.json [--as-of YYYY-MM-DD]\nOffline review of two adjacent 56-day windows. See docs/seo/query-review.md.");
    return;
  }
  const flags = {};
  for (let i = 0; i < args.length; i += 2) {
    if (!["--input", "--output", "--as-of"].includes(args[i]) || !args[i + 1] || args[i + 1].startsWith("--") || flags[args[i]]) throw new Error(`Invalid or repeated argument: ${args[i]}`);
    flags[args[i]] = args[i + 1];
  }
  if (!flags["--input"] || !flags["--output"]) throw new Error("--input and --output are required; use --help");
  const input = resolve(flags["--input"]), output = resolve(flags["--output"]);
  let outputReal;
  try { outputReal = realpathSync(output); } catch { outputReal = output; }
  if (realpathSync(input) === outputReal) throw new Error("Output must not overwrite the input CSV");
  if (!output.endsWith(".json")) throw new Error("--output must be a .json file");
  const rows = readGscCsv(readFileSync(input, "utf8"));
  const report = reviewQueries(rows, { asOf: flags["--as-of"], ownershipTargets: loadOwnershipTargets() });
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`${report.status}: ${report.includedRows} observed rows, ${report.groups.length} query/country/device groups → ${output}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { runCli(process.argv.slice(2)); }
  catch (error) { console.error(`seo-query-review: ${error.message}`); process.exitCode = 1; }
}
