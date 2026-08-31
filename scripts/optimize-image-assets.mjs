import { existsSync, renameSync, readdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const imagesRoot = path.join(root, "public", "images");
const apply = process.argv.includes("--apply");
const minimumBytes = 100 * 1024;
const minimumSavingsRatio = 0.08;
const minimumSsim = 0.98;

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (/\.jpe?g$/i.test(entry.name)) files.push(absolute);
  }
  return files;
}

function run(command, args) {
  return spawnSync(command, args, { encoding: "utf8" });
}

if (!run("ffmpeg", ["-version"]).stdout) {
  console.error("ffmpeg is required for deterministic JPEG optimization and SSIM validation.");
  process.exit(1);
}

let originalBytes = 0;
let optimizedBytes = 0;
let eligible = 0;
let changed = 0;
let skipped = 0;

for (const file of walk(imagesRoot).sort()) {
  const before = statSync(file).size;
  originalBytes += before;
  if (before < minimumBytes) {
    optimizedBytes += before;
    continue;
  }
  eligible += 1;

  const extension = path.extname(file);
  const temporary = path.join(path.dirname(file), `.${path.basename(file, extension)}.image-opt-${process.pid}${extension}`);
  const encode = run("ffmpeg", [
    "-hide_banner",
    "-loglevel", "error",
    "-i", file,
    "-map_metadata", "-1",
    "-frames:v", "1",
    "-q:v", "3",
    "-y",
    temporary,
  ]);

  if (encode.status !== 0) {
    console.error(`encode failed: ${path.relative(root, file)}\n${encode.stderr}`);
    if (existsSync(temporary)) unlinkSync(temporary);
    process.exit(1);
  }

  const after = statSync(temporary).size;
  const comparison = run("ffmpeg", [
    "-hide_banner",
    "-i", file,
    "-i", temporary,
    "-lavfi", "ssim",
    "-f", "null",
    "-",
  ]);
  const match = `${comparison.stdout}\n${comparison.stderr}`.match(/All:([0-9.]+)/);
  const ssim = match ? Number(match[1]) : 0;
  const savingsRatio = 1 - after / before;
  const accepted = ssim >= minimumSsim && savingsRatio >= minimumSavingsRatio;
  const relative = path.relative(root, file).split(path.sep).join("/");

  if (accepted) {
    changed += 1;
    optimizedBytes += after;
    console.log(`${apply ? "optimized" : "would optimize"}: ${relative} · ${(before / 1024).toFixed(1)}→${(after / 1024).toFixed(1)} KiB · SSIM ${ssim.toFixed(4)}`);
    if (apply) renameSync(temporary, file);
    else unlinkSync(temporary);
  } else {
    skipped += 1;
    optimizedBytes += before;
    console.log(`kept: ${relative} · savings ${(savingsRatio * 100).toFixed(1)}% · SSIM ${ssim.toFixed(4)}`);
    unlinkSync(temporary);
  }
}

const saved = originalBytes - optimizedBytes;
console.log(`\n${apply ? "Applied" : "Dry run"}: ${changed}/${eligible} eligible JPEGs optimized; ${skipped} kept by safeguards; ${(saved / 1024 / 1024).toFixed(2)} MiB saved.`);
