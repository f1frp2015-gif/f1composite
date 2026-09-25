import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProjectModule } from "./load-project-module.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const { engineeringEvidence, withdrawnDownloads } = loadProjectModule("content/data/engineeringEvidence.ts");
const registry = join("content", "data", "engineeringEvidence.ts");

function sourceFiles(dir) {
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(?:tsx?|mdx?)$/.test(entry.name) ? [path] : [];
  });
}

test("withdrawn downloads are not linked from pages, data or machine-readable surfaces", () => {
  assert.ok(withdrawnDownloads.length > 0);
  const files = ["app", "components", "content", "lib"].flatMap(sourceFiles).filter((path) => path !== registry);
  const llms = loadProjectModule("lib/llmsContent.ts").buildLlmsContent();
  const knowledge = JSON.stringify(loadProjectModule("lib/publicKnowledge.ts").buildPublicKnowledge());
  for (const file of withdrawnDownloads) {
    assert.ok(!engineeringEvidence.some((record) => record.file === file), `${file} is still in the evidence library`);
    for (const path of files) assert.ok(!read(path).includes(file), `${path} links ${file}`);
    assert.ok(!llms.includes(file) && !knowledge.includes(file), `${file} is still in llms.txt or the public knowledge feed`);
  }
});

test("withdrawn downloads are served with a noindex header", () => {
  const config = read("next.config.ts");
  for (const file of withdrawnDownloads) {
    const at = config.indexOf(`source: "${file}"`);
    assert.ok(at > 0, `next.config.ts has no header rule for ${file}`);
    assert.match(config.slice(at, at + 200), /key: "X-Robots-Tag", value: "noindex"/);
  }
});
