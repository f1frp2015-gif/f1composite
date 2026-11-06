#!/usr/bin/env node
// Write the site's tables as static CSV files (lib/datasetFiles.ts) into
// public/downloads/data. Rerun after changing a span table, the GFRP rebar
// chart or the grating specifications; scripts/dataset-files.test.mjs checks
// that the committed files still match.
//
//   node scripts/build-dataset-files.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { loadProjectModule } from "./load-project-module.mjs";

const root = resolve(import.meta.dirname, "..");
const { DATASET_FILES } = loadProjectModule("lib/datasetFiles.ts");

for (const file of DATASET_FILES) {
  const out = resolve(root, `public${file.path}`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, file.csv());
  console.log(`wrote public${file.path}`);
}
