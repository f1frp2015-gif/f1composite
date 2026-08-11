import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const BASE_URL = "https://www.f1composite.com";
const HOST = "www.f1composite.com";
const INDEXNOW_KEY = "79eeba46f40c47acc7ed14dad5cd5942";
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const ZERO_SHA = /^0+$/;

function git(args, { allowFailure = false } = {}) {
  try {
    return execFileSync("git", args, {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", allowFailure ? "ignore" : "inherit"],
    });
  } catch (error) {
    if (allowFailure) return "";
    throw error;
  }
}

function sourceAt(ref, file) {
  if (!ref || ZERO_SHA.test(ref)) return "";
  return git(["show", `${ref}:${file}`], { allowFailure: true });
}

export function routeFromPageFile(file) {
  if (!file.startsWith("app/") || !file.endsWith("/page.tsx")) return null;

  const segments = file.slice(4, -"/page.tsx".length).split("/").filter(Boolean);
  if (segments.some((segment) => segment.startsWith("@") || segment.includes("["))) return null;

  const publicSegments = segments.filter(
    (segment) => !(segment.startsWith("(") && segment.endsWith(")")),
  );
  return publicSegments.length === 0 ? "/" : `/${publicSegments.join("/")}`;
}

export function parseSlugBlocks(source) {
  const matches = [...source.matchAll(/^  \{\r?\n    slug:\s*"([^"]+)"/gm)];
  const blocks = new Map();

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const next = matches[index + 1];
    blocks.set(match[1], source.slice(match.index, next?.index ?? source.length).trim());
  }

  return blocks;
}

export function changedSlugs(beforeSource, afterSource) {
  const before = parseSlugBlocks(beforeSource);
  const after = parseSlugBlocks(afterSource);
  const changed = new Set();

  for (const [slug, block] of after) {
    if (before.get(slug) !== block) changed.add(slug);
  }
  for (const slug of before.keys()) {
    if (!after.has(slug)) changed.add(slug);
  }

  return changed;
}

function parseStaticSitemapPaths(source) {
  return new Set(
    [...source.matchAll(/url:\s*`\$\{BASE\}(\/[^`$]+)`/g)].map((match) => match[1]),
  );
}

function parseRedirectSources(source) {
  return new Set(
    [...source.matchAll(/source:\s*"(\/[^"\n]+)"/g)]
      .map((match) => match[1])
      .filter((route) => !/[:*()]/.test(route)),
  );
}

function symmetricDifference(left, right) {
  return new Set([
    ...[...left].filter((value) => !right.has(value)),
    ...[...right].filter((value) => !left.has(value)),
  ]);
}

function parseNameStatus(output) {
  return output
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("\t");
      const status = parts[0];
      if (status.startsWith("R") || status.startsWith("C")) {
        return { status: status[0], oldPath: parts[1], newPath: parts[2] };
      }
      return { status: status[0], oldPath: parts[1], newPath: parts[1] };
    });
}

function addPath(paths, route) {
  if (!route || !route.startsWith("/")) return;
  // Private and intentionally noindex application surfaces are not search
  // landing pages. Deleted/redirected exceptions can still be sent through
  // the workflow's explicit manual URL input.
  if (/^\/(?:admin|api|datasheets)(?:\/|$)/.test(route) || route.endsWith("/embed")) return;
  paths.add(route);
}

function addAllRecordRoutes(paths, source, prefix) {
  for (const slug of parseSlugBlocks(source).keys()) addPath(paths, `${prefix}/${slug}`);
}

export function collectChangedPaths(beforeRef, afterRef) {
  const changes = parseNameStatus(
    git(["diff", "--name-status", "--find-renames", beforeRef, afterRef, "--"]),
  );
  const paths = new Set();
  const changedFiles = new Set();

  for (const change of changes) {
    changedFiles.add(change.oldPath);
    changedFiles.add(change.newPath);

    if (change.status === "D" || change.status === "R") {
      addPath(paths, routeFromPageFile(change.oldPath));
    }
    if (change.status !== "D") {
      addPath(paths, routeFromPageFile(change.newPath));
    }
  }

  const blogFile = "content/data/blogPosts.ts";
  const beforeBlog = sourceAt(beforeRef, blogFile);
  const afterBlog = sourceAt(afterRef, blogFile);
  if (changedFiles.has(blogFile)) {
    for (const slug of changedSlugs(beforeBlog, afterBlog)) {
      addPath(paths, `/resources/blog/${slug}`);
    }
    addPath(paths, "/resources/blog");
  }
  if (changedFiles.has("app/resources/blog/[slug]/page.tsx")) {
    addAllRecordRoutes(paths, afterBlog || beforeBlog, "/resources/blog");
  }

  const applicationFile = "lib/applicationPages.ts";
  const beforeApplications = sourceAt(beforeRef, applicationFile);
  const afterApplications = sourceAt(afterRef, applicationFile);
  if (changedFiles.has(applicationFile)) {
    for (const slug of changedSlugs(beforeApplications, afterApplications)) {
      addPath(paths, `/applications/${slug}`);
    }
    addPath(paths, "/applications");
  }
  if (changedFiles.has("app/applications/[slug]/page.tsx")) {
    addAllRecordRoutes(paths, afterApplications || beforeApplications, "/applications");
  }

  const sitemapFile = "app/sitemap.ts";
  if (changedFiles.has(sitemapFile)) {
    const beforePaths = parseStaticSitemapPaths(sourceAt(beforeRef, sitemapFile));
    const afterPaths = parseStaticSitemapPaths(sourceAt(afterRef, sitemapFile));
    for (const route of symmetricDifference(beforePaths, afterPaths)) addPath(paths, route);
  }

  const configFile = "next.config.ts";
  if (changedFiles.has(configFile)) {
    const beforeSources = parseRedirectSources(sourceAt(beforeRef, configFile));
    const afterSources = parseRedirectSources(sourceAt(afterRef, configFile));
    for (const route of symmetricDifference(beforeSources, afterSources)) addPath(paths, route);
  }

  return [...paths].sort();
}

export function normalizeUrls(value) {
  const urls = new Set();
  for (const item of value.split(/[\s,]+/).filter(Boolean)) {
    const url = new URL(item.startsWith("/") ? `${BASE_URL}${item}` : item);
    if (url.protocol !== "https:" || url.hostname !== HOST) {
      throw new Error(`IndexNow URL must belong to ${BASE_URL}: ${item}`);
    }
    url.hash = "";
    urls.add(url.toString());
  }
  return [...urls].sort();
}

function parseArgs(argv) {
  const options = { before: "", after: "HEAD", urls: "", dryRun: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--before") options.before = argv[++index] ?? "";
    else if (arg === "--after") options.after = argv[++index] ?? "HEAD";
    else if (arg === "--urls") options.urls = argv[++index] ?? "";
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const before = options.before || git(["rev-parse", `${options.after}^`]).trim();
  const urlList = options.urls
    ? normalizeUrls(options.urls)
    : collectChangedPaths(before, options.after).map((route) => `${BASE_URL}${route}`);

  if (urlList.length === 0) {
    console.log("IndexNow: no changed public URLs to submit.");
    return;
  }
  if (urlList.length > 10_000) {
    throw new Error(`IndexNow accepts at most 10,000 URLs per request; received ${urlList.length}.`);
  }

  if (options.dryRun) {
    console.log(JSON.stringify({ count: urlList.length, urlList }, null, 2));
    return;
  }

  // Fail early if the public ownership proof is missing from this checkout.
  const localKey = readFileSync(resolve(REPO_ROOT, `public/${INDEXNOW_KEY}.txt`), "utf8").trim();
  if (localKey !== INDEXNOW_KEY) throw new Error("IndexNow ownership key file is missing or invalid.");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList }),
    signal: AbortSignal.timeout(30_000),
  });

  if (response.status !== 200 && response.status !== 202) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(`IndexNow rejected ${urlList.length} URL(s): HTTP ${response.status} ${detail}`);
  }

  console.log(`IndexNow accepted ${urlList.length} URL(s) with HTTP ${response.status}.`);
  for (const url of urlList) console.log(`- ${url}`);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
