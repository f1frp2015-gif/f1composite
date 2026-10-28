import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";

// Guards for the picture-led carbon fiber tube and rod pages (2026-10-28): every open-licensed
// photograph is credited, every figure exists, and the class-value property table stays honest.

const { carbonScenePhotos, carbonFigures, carbonProperties } = loadProjectModule("content/data/carbonFiberScenes.ts");
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const TUBES = "app/products/pultruded-carbon-fiber-tubes/page.tsx";
const RODS = "app/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod/page.tsx";

test("every carbon scene photo exists, is described and carries its license", () => {
  assert.ok(Object.keys(carbonScenePhotos).length >= 15);
  for (const [id, photo] of Object.entries(carbonScenePhotos)) {
    assert.ok(existsSync(new URL(`../public${photo.src}`, import.meta.url)), photo.src);
    assert.ok(photo.alt.length > 30 && photo.shows.length > 20, id);
    assert.match(photo.credit.sourceHref, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/, id);
    assert.ok(photo.credit.author && photo.credit.license, id);
    if (!/public domain/i.test(photo.credit.license)) assert.match(photo.credit.licenseHref ?? "", /^https:\/\/creativecommons\.org\//, `${id} needs a license link`);
    // No photo of someone else's part may be captioned as an F1 part or project.
    assert.doesNotMatch(photo.shows, /F1 (part|product|project|installation)(?! or project)|FengDu/, id);
  }
  for (const figure of Object.values(carbonFigures)) assert.ok(existsSync(new URL(`../public${figure.src}`, import.meta.url)), figure.src);
});

test("both pages render the property table, the figures and a credits block", () => {
  assert.ok(carbonProperties.length >= 10);
  for (const row of carbonProperties) assert.ok(row.cfrp && row.gfrp && row.aluminium && row.steel && row.note, row.property);
  for (const file of [TUBES, RODS]) {
    const page = read(file);
    assert.ok(page.includes("carbonProperties.map"), `${file} property table`);
    assert.ok(page.includes('id="photo-credits"') && page.includes("creditedPhotos.map"), `${file} credits`);
    assert.ok(page.includes('id="performance"') && page.includes("applications.map"), `${file} performance and applications`);
    assert.ok(page.includes("carbonFigures.specificStiffness") && page.includes("carbonFigures.hollowVsSolid"), `${file} figures`);
    assert.doesNotMatch(page, /note="Illustrative photo"/, "open-licensed photos are not stock images");
    // The class values stay class values: no page may present them as an F1 datasheet or certificate.
    assert.doesNotMatch(page, /(F1|our|we)[^.]{0,40}(datasheet|certified|guarantee[sd]?)[^.]{0,40}(120|150) GPa/i, `${file} claims a CFRP datasheet`);
  }
  assert.ok(read(TUBES).includes("carbonFigures.fiberDirection"));
  assert.ok(read(TUBES).includes("/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod") && read(RODS).includes("/products/pultruded-carbon-fiber-tubes"), "the two pages link each other");
});
