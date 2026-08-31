import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const publicImages = path.join(root, "public", "images");
const rasterExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".css", ".html"]);
const sourceRoots = ["app", "components", "content", "lib", "scripts"];

function walk(directory, extensions) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute, extensions));
    else if (!extensions || extensions.has(path.extname(entry.name).toLowerCase())) files.push(absolute);
  }
  return files;
}

function readDimensions(buffer, extension) {
  if (extension === ".png" && buffer.length >= 24 && buffer.subarray(1, 4).toString("ascii") === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if ((extension === ".jpg" || extension === ".jpeg") && buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    const sof = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
    let offset = 2;
    while (offset + 8 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      if (marker === 0xd8 || marker === 0xd9) {
        offset += 2;
        continue;
      }
      const length = buffer.readUInt16BE(offset + 2);
      if (sof.has(marker)) {
        return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
      }
      if (length < 2) break;
      offset += 2 + length;
    }
  }
  if (extension === ".webp" && buffer.length >= 30 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    const chunk = buffer.subarray(12, 16).toString("ascii");
    if (chunk === "VP8X") {
      const width = 1 + buffer.readUIntLE(24, 3);
      const height = 1 + buffer.readUIntLE(27, 3);
      return { width, height };
    }
    if (chunk === "VP8 " && buffer.length >= 30) {
      return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === "VP8L" && buffer.length >= 25 && buffer[20] === 0x2f) {
      const b1 = buffer[21];
      const b2 = buffer[22];
      const b3 = buffer[23];
      const b4 = buffer[24];
      return {
        width: 1 + (b1 | ((b2 & 0x3f) << 8)),
        height: 1 + ((b2 >> 6) | (b3 << 2) | ((b4 & 0x0f) << 10)),
      };
    }
  }
  if (extension === ".gif" && buffer.length >= 10 && buffer.subarray(0, 3).toString("ascii") === "GIF") {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
  return { width: null, height: null };
}

function bytes(value) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 ** 2) return `${(value / 1024).toFixed(1)} KiB`;
  return `${(value / 1024 ** 2).toFixed(2)} MiB`;
}

const sourceFiles = sourceRoots.flatMap((directory) => walk(path.join(root, directory), sourceExtensions));
const sourceEntries = sourceFiles.map((file) => ({ file, text: readFileSync(file, "utf8") }));
const sourceText = sourceEntries.map((entry) => entry.text).join("\n");
const referencedImagePaths = new Set(
  [...sourceText.matchAll(/["'`](\/images\/[^"'`?\s)]+\.(?:png|jpe?g|webp|gif|avif))["'`]/gi)].map((match) => match[1]),
);
const missingReferences = [...referencedImagePaths]
  .filter((publicPath) => !existsSync(path.join(root, "public", publicPath)))
  .sort();

const componentIssues = [];
for (const entry of sourceEntries) {
  const relative = path.relative(root, entry.file).split(path.sep).join("/");
  if (!/^(app|components)\//.test(relative)) continue;
  for (const match of entry.text.matchAll(/<Image\b[\s\S]*?\/>/g)) {
    const tag = match[0];
    const line = entry.text.slice(0, match.index).split("\n").length;
    if (!/\balt=/.test(tag)) componentIssues.push({ file: relative, line, issue: "missing alt" });
    if (/\bfill\b/.test(tag) && !/\bsizes=/.test(tag)) componentIssues.push({ file: relative, line, issue: "fill without sizes" });
    if (/\bpriority\b/.test(tag)) componentIssues.push({ file: relative, line, issue: "deprecated priority prop" });
    if (/loading="eager"/.test(tag) && !/fetchPriority="high"|\bpreload\b/.test(tag)) {
      componentIssues.push({ file: relative, line, issue: "eager image without high-priority intent" });
    }
  }
  for (const match of entry.text.matchAll(/<img\b/g)) {
    const line = entry.text.slice(0, match.index).split("\n").length;
    componentIssues.push({ file: relative, line, issue: "native img tag" });
  }
}

const assets = walk(publicImages, rasterExtensions).map((absolute) => {
  const buffer = readFileSync(absolute);
  const extension = path.extname(absolute).toLowerCase();
  const relative = path.relative(path.join(root, "public"), absolute).split(path.sep).join("/");
  const publicPath = `/${relative}`;
  const { width, height } = readDimensions(buffer, extension);
  const metadataText = buffer.toString("latin1").toLowerCase();
  const metadataTokens = ["openai", "dall-e", "gpt-image", "midjourney", "stable diffusion", "content credentials", "c2pa", "adobe firefly"]
    .filter((token) => metadataText.includes(token));
  const basename = path.basename(absolute);
  const seoSafe = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:png|jpe?g|webp|gif|avif)$/.test(basename);
  return {
    absolute,
    path: publicPath,
    extension,
    size: buffer.length,
    width,
    height,
    pixels: width && height ? width * height : null,
    referenced: sourceText.includes(publicPath),
    seoSafe,
    metadataTokens,
    hash: createHash("sha256").update(buffer).digest("hex"),
  };
});

const byFormat = Object.values(
  assets.reduce((summary, asset) => {
    summary[asset.extension] ??= { extension: asset.extension, count: 0, bytes: 0 };
    summary[asset.extension].count += 1;
    summary[asset.extension].bytes += asset.size;
    return summary;
  }, {}),
).sort((a, b) => b.bytes - a.bytes);

const duplicateGroups = Object.values(
  assets.reduce((groups, asset) => {
    groups[asset.hash] ??= [];
    groups[asset.hash].push(asset.path);
    return groups;
  }, {}),
).filter((paths) => paths.length > 1);

const report = {
  generatedAt: new Date().toISOString(),
  total: { count: assets.length, bytes: assets.reduce((sum, asset) => sum + asset.size, 0) },
  byFormat,
  large: assets.filter((asset) => asset.size >= 300 * 1024).sort((a, b) => b.size - a.size),
  oversized: assets.filter((asset) => asset.width && asset.height && (Math.max(asset.width, asset.height) > 2560 || asset.pixels > 4_000_000)).sort((a, b) => b.pixels - a.pixels),
  legacyHeavy: assets.filter((asset) => [".jpg", ".jpeg", ".png"].includes(asset.extension) && asset.size >= 150 * 1024).sort((a, b) => b.size - a.size),
  seoUnsafe: assets.filter((asset) => !asset.seoSafe).sort((a, b) => a.path.localeCompare(b.path)),
  metadataFlags: assets.filter((asset) => asset.metadataTokens.length > 0),
  unreferenced: assets.filter((asset) => !asset.referenced).sort((a, b) => b.size - a.size),
  duplicateGroups,
  componentIssues,
  missingReferences,
};

const jsonMode = process.argv.includes("--json");
if (jsonMode) {
  process.stdout.write(JSON.stringify(report, null, 2));
} else {
console.log("# Image Asset Audit");
console.log(`\n- Raster assets: ${report.total.count}`);
console.log(`- Source payload: ${bytes(report.total.bytes)}`);
console.log(`- Files ≥300 KiB: ${report.large.length}`);
console.log(`- Files >2560 px or 4 MP: ${report.oversized.length}`);
console.log(`- Heavy JPEG/PNG candidates: ${report.legacyHeavy.length}`);
console.log(`- SEO-unsafe basenames: ${report.seoUnsafe.length}`);
console.log(`- Embedded AI provenance tokens: ${report.metadataFlags.length}`);
console.log(`- Unreferenced assets: ${report.unreferenced.length}`);
console.log(`- Exact duplicate groups: ${report.duplicateGroups.length}`);
console.log(`- Next/Image implementation issues: ${report.componentIssues.length}`);
console.log(`- Missing direct image references: ${report.missingReferences.length}`);

console.log("\n## Formats");
for (const item of byFormat) console.log(`- ${item.extension}: ${item.count} files · ${bytes(item.bytes)}`);

function printAssets(title, items, limit = 50) {
  console.log(`\n## ${title}`);
  if (items.length === 0) {
    console.log("- None");
    return;
  }
  for (const asset of items.slice(0, limit)) {
    const dimensions = asset.width && asset.height ? ` · ${asset.width}×${asset.height}` : "";
    console.log(`- ${asset.path} · ${bytes(asset.size)}${dimensions}`);
  }
  if (items.length > limit) console.log(`- …and ${items.length - limit} more`);
}

printAssets("Largest files", [...assets].sort((a, b) => b.size - a.size), 30);
printAssets("Heavy legacy-format candidates", report.legacyHeavy);
printAssets("Oversized dimensions", report.oversized);
printAssets("SEO-unsafe filenames", report.seoUnsafe);
printAssets("Embedded AI provenance metadata", report.metadataFlags);
printAssets("Unreferenced assets", report.unreferenced, 80);

console.log("\n## Exact duplicates");
if (duplicateGroups.length === 0) console.log("- None");
else duplicateGroups.forEach((paths) => console.log(`- ${paths.join(" · ")}`));

console.log("\n## Next/Image implementation issues");
if (componentIssues.length === 0) console.log("- None");
else componentIssues.forEach((item) => console.log(`- ${item.file}:${item.line} · ${item.issue}`));

console.log("\n## Missing direct image references");
if (missingReferences.length === 0) console.log("- None");
else missingReferences.forEach((publicPath) => console.log(`- ${publicPath}`));
}
