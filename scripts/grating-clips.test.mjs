import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  buildDxf,
  CLIP_DRAWINGS,
  OUTPUT_PATH,
  REQUIRED_LAYERS,
} from "./generate-grating-clip-cad.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const dataPath = path.join(repositoryRoot, "content/data/gratingClips.ts");
const componentPath = path.join(repositoryRoot, "components/sections/GratingClipGuide.tsx");
const pagePath = path.join(repositoryRoot, "app/products/frp-gratings/page.tsx");

const expectedSkus = [
  "F1-GRID-CLIP-M-316",
  "F1-GRID-CLIP-C-316",
  "F1-GRID-CLIP-J-316",
  "F1-GRID-CLIP-T-316",
];

const thirdPartyTokens = [
  "Bedford",
  "Strongwell",
  "Fibergrate",
  "McNICHOLS",
  "PROGrate",
  "PROGrid",
  "DURADEK",
  "DURAGRID",
  "Safe-T-Span",
];

function clipBlock(source, code) {
  const marker = `code: "${code}"`;
  const markerIndex = source.indexOf(marker);
  assert.notEqual(markerIndex, -1, `missing ${code} clip data`);

  const blockStart = source.lastIndexOf("{", markerIndex);
  const nextMarkerIndexes = ["M", "C", "J", "T"]
    .map((candidate) => source.indexOf(`code: "${candidate}"`, markerIndex + marker.length))
    .filter((index) => index !== -1);
  const nextMarkerIndex = nextMarkerIndexes.length > 0 ? Math.min(...nextMarkerIndexes) : source.length;
  const blockEnd = source.lastIndexOf("}", nextMarkerIndex);

  assert.ok(blockStart >= 0 && blockEnd > markerIndex, `cannot isolate ${code} clip data`);
  return source.slice(blockStart, blockEnd + 1);
}

function assertNeutral(value, label) {
  for (const token of thirdPartyTokens) {
    assert.doesNotMatch(value, new RegExp(token, "i"), `${label} contains third-party token ${token}`);
  }
  assert.doesNotMatch(value, /https?:\/\//i, `${label} must not contain supplier URLs`);
}

function dxfTextValues(dxf) {
  const lines = dxf.split(/\r?\n/);
  const values = [];
  for (let index = 0; index < lines.length - 1; index += 1) {
    if (lines[index] === "1") values.push(lines[index + 1]);
  }
  return values;
}

test("grating clip data defines four neutral F1 316SS records", async () => {
  const source = await readFile(dataPath, "utf8");

  assert.match(source, /export const gratingClips\s*=/);
  assert.deepEqual(
    [...source.matchAll(/code:\s*"([MCJT])"/g)].map((match) => match[1]).sort(),
    ["C", "J", "M", "T"],
  );

  for (const sku of expectedSkus) {
    assert.equal(source.match(new RegExp(sku, "g"))?.length, 1, `${sku} must appear once`);
  }

  assert.match(source, /316\s*(?:SS|stainless steel)/i);
  assert.match(source, /f1-grid-grating-clips-m-c-j-t-316ss\.dxf/);
  assertNeutral(source, "grating clip data");
});

test("data compatibility is explicit and C clip cannot replace support or hold-downs", async () => {
  const source = await readFile(dataPath, "utf8");
  const mClip = clipBlock(source, "M");
  const cClip = clipBlock(source, "C");
  const jClip = clipBlock(source, "J");
  const tClip = clipBlock(source, "T");

  for (const block of [mClip, jClip]) {
    assert.match(block, /"Molded grating"/);
    assert.match(block, /"Pultruded grating"/);
  }

  assert.match(cClip, /"Molded grating"/);
  assert.doesNotMatch(cClip, /"Pultruded grating"/);
  assert.match(cClip, /(?:does not|is not|must not|cannot)[\s\S]*(?:support|hold-down)/i);

  assert.match(tClip, /"Pultruded grating"/);
  assert.doesNotMatch(tClip, /"Molded grating"/);
  assert.match(tClip, /series-specific|naming.*(?:varies|not uniform)|(?:varies|not uniform).*naming/i);

  assert.match(source, /Minimum 2 panel-to-support hold-downs/);
  assert.match(source, /Minimum 4 panel-to-support hold-downs/);
  assert.match(source, /1200 mm \/ 4 ft maximum/);
  assert.match(source, /600–900 mm \/ 2–3 ft/);
  assert.match(source, /38 mm \/ 1\.5 in minimum bearing/);
});

test("public grating-clip surface contains no supplier or third-party identity", async () => {
  const publicSurface = (
    await Promise.all([
      readFile(dataPath, "utf8"),
      readFile(componentPath, "utf8"),
      readFile(pagePath, "utf8"),
      readFile(OUTPUT_PATH, "ascii"),
    ])
  ).join("\n");

  assertNeutral(publicSurface, "public grating-clip surface");
});

test("generated file is deterministic ASCII AutoCAD R12 with required layers", async () => {
  const generated = buildDxf();
  const committed = await readFile(OUTPUT_PATH, "ascii");

  assert.equal(committed, generated);
  assert.match(committed, /\n9\n\$ACADVER\n1\nAC1009\n/);
  assert.match(committed, /\n0\nEOF\n$/);
  assert.ok(Buffer.from(committed, "ascii").every((byte) => byte < 128));

  for (const layer of REQUIRED_LAYERS) {
    assert.match(committed, new RegExp(`\\n2\\n${layer}\\n`), `missing ${layer} layer`);
  }

  assert.deepEqual(
    CLIP_DRAWINGS.map((drawing) => drawing.sku),
    expectedSkus,
  );
});

test("DXF includes four controlled installation schematics without manufacturing dimensions", async () => {
  const dxf = await readFile(OUTPUT_PATH, "ascii");
  const notes = dxfTextValues(dxf).join("\n");

  for (const code of ["M", "C", "J", "T"]) {
    assert.match(notes, new RegExp(`${code} CLIP INSTALLATION SCHEMATIC`));
  }
  for (const sku of expectedSkus) assert.match(notes, new RegExp(sku));

  assert.match(notes, /316 STAINLESS STEEL/);
  assert.match(notes, /NOT FOR FABRICATION/);
  assert.match(notes, /NOT TO SCALE/);
  assert.match(notes, /APPROVED PROJECT DRAWING CONTROLS/);
  assert.match(notes, /C CLIP[\s\S]*MOLDED GRATING ONLY/);
  assert.match(notes, /DOES NOT REPLACE SUPPORT OR PANEL HOLD-DOWNS/);
  assert.match(notes, /T CLIP[\s\S]*PULTRUDED GRATING ONLY/);
  assert.doesNotMatch(notes, /\b\d+(?:\.\d+)?\s*(?:MM|CM|INCH|INCHES)\b/i);
  assertNeutral(notes, "DXF notes");
});
