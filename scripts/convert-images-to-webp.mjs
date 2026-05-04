#!/usr/bin/env node
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const ROOT = "public/images";
const MIN_BYTES = 250 * 1024;
const QUALITY = 82;
const SKIP = new Set([".webp", ".avif", ".svg", ".ico", ".gif"]);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else out.push({ path: p, size: s.size });
  }
  return out;
}

const files = walk(ROOT).filter(
  (f) => f.size >= MIN_BYTES && !SKIP.has(extname(f.path).toLowerCase()),
);

console.log(`Converting ${files.length} images >=${MIN_BYTES / 1024}KB`);

let savedBytes = 0;
let skipped = 0;
let converted = 0;

for (const f of files) {
  const ext = extname(f.path).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  const webpPath = f.path.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  if (existsSync(webpPath)) {
    skipped++;
    continue;
  }
  try {
    await sharp(f.path).webp({ quality: QUALITY }).toFile(webpPath);
    const newSize = statSync(webpPath).size;
    savedBytes += f.size - newSize;
    converted++;
    console.log(
      `  ${basename(f.path)}: ${(f.size / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB`,
    );
  } catch (e) {
    console.error(`  FAILED ${f.path}:`, e.message);
  }
}

console.log(
  `\nConverted ${converted}, skipped ${skipped} existing. Saved ${(savedBytes / 1024 / 1024).toFixed(2)}MB.`,
);
