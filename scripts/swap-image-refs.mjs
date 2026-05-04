#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "public/images";
const SRC_DIRS = ["app", "components", "content", "lib"];
const SRC_EXTS = new Set([".tsx", ".ts", ".md", ".mdx", ".json"]);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function listConvertedOriginals() {
  const webps = walk(ROOT).filter((p) => p.endsWith(".webp"));
  const out = [];
  for (const w of webps) {
    const base = w.slice(0, -".webp".length);
    for (const ext of [".jpg", ".jpeg", ".png"]) {
      if (existsSync(base + ext)) out.push({ original: base + ext, webp: w });
    }
  }
  return out;
}

const pairs = listConvertedOriginals();
console.log(`Found ${pairs.length} originals with .webp counterparts`);

const sourceFiles = SRC_DIRS.flatMap((d) => walk(d)).filter((p) =>
  SRC_EXTS.has(extname(p)),
);
console.log(`Scanning ${sourceFiles.length} source files`);

let edits = 0;
let filesEdited = 0;

for (const file of sourceFiles) {
  let content = readFileSync(file, "utf-8");
  let changed = false;

  for (const { original, webp } of pairs) {
    const publicOrig = "/" + original.replace(/^public\//, "");
    const publicWebp = "/" + webp.replace(/^public\//, "");
    if (content.includes(publicOrig)) {
      content = content.split(publicOrig).join(publicWebp);
      edits++;
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(file, content);
    filesEdited++;
    console.log(`  ✓ ${file}`);
  }
}

console.log(`\nMade ${edits} replacements across ${filesEdited} files.`);
