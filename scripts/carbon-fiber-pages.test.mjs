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
const PLATES = "app/products/pultruded-carbon-fiber-plates/page.tsx";
const HUB = "app/products/pultrusion-carbon-fiber/page.tsx";
const STRIPS = "app/products/pultruded-cfrp-strengthening-strips/page.tsx";
const BEAMS = "app/products/carbon-fiber-robotic-beams/page.tsx";
const ROLLERS = "app/products/carbon-fiber-roller-tubes/page.tsx";

test("every carbon scene photo exists, is described and carries its license", () => {
  assert.ok(Object.keys(carbonScenePhotos).length >= 38);
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

test("all four carbon pages render the property table, the figures and a credits block", () => {
  assert.ok(carbonProperties.length >= 10);
  for (const row of carbonProperties) assert.ok(row.cfrp && row.gfrp && row.aluminium && row.steel && row.note, row.property);
  for (const file of [TUBES, RODS, PLATES, HUB]) {
    const page = read(file);
    assert.ok(page.includes("carbonProperties.map"), `${file} property table`);
    assert.ok(page.includes('id="photo-credits"') && page.includes("creditedPhotos.map"), `${file} credits`);
    assert.ok(page.includes('id="performance"') && page.includes("applications.map"), `${file} performance and applications`);
    assert.ok(page.includes("carbonFigures.specificStiffness"), `${file} specific-stiffness figure`);
    if (file !== PLATES && file !== HUB) assert.ok(page.includes("carbonFigures.hollowVsSolid"), `${file} hollow-vs-solid figure`);
    assert.doesNotMatch(page, /note="Illustrative photo"/, "open-licensed photos are not stock images");
    // The class values stay class values: no page may present them as an F1 datasheet or certificate.
    assert.doesNotMatch(page, /(F1|our|we)[^.]{0,40}(datasheet|certified|guarantee[sd]?)[^.]{0,40}(120|150) GPa/i, `${file} claims a CFRP datasheet`);
  }
  assert.ok(read(TUBES).includes("carbonFigures.fiberDirection"));
  // The hub keeps its #plates, #tubes and #rods anchors (docs/pultrusion-carbon-fiber-images.md) and links all three product pages.
  for (const href of ["/products/pultruded-carbon-fiber-plates", "/products/pultruded-carbon-fiber-tubes", "/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod"]) assert.ok(read(HUB).includes(href), `hub links ${href}`);
  assert.ok(read(HUB).includes("carbonProfileFormats.map") && read(HUB).includes("carbonFigures.fiberDirection"), "hub form sections and fiber-direction figure");
  // The strengthening strip page keeps the sourced guide sections and adds the placement figure, the bond figure and a credits block.
  const strips = read(STRIPS);
  for (const token of ["carbonFigures.strengtheningSections", "carbonFigures.bondLine", 'id="photo-credits"', "creditedPhotos.map", "GuideSection", "GuideStandards", "GuideSources", "/applications/cfrp-concrete-strengthening", "/products/pultruded-carbon-fiber-plates", "dateModified: updated"]) assert.ok(strips.includes(token), `strip page: ${token}`);
  assert.doesNotMatch(strips, /note="Illustrative photo"/);
  assert.doesNotMatch(strips, /(F1|we|our)[^.]{0,40}(assessed kit|ETA|approved system)[^.]{0,20}(hold|holds|have|has|supply|supplies)/i, "the strip page must not claim an assessed kit");
  // The robotic beam page: equal-stiffness figure, the shared table, machine cards, credits, and no robot-approval or stock-arm claim.
  const beams = read(BEAMS);
  for (const token of ["carbonFigures.robotBeamStiffness", "carbonFigures.fiberDirection", "carbonProperties.map", "machines.map", 'id="photo-credits"', "creditedPhotos.map", "GuideSection", "GuideStandards", "GuideSources", "/applications/cfrp-robotic-beams-struts", "/products/carbon-fiber-roller-tubes", "/products/pultruded-carbon-fiber-tubes", "dateModified: updated"]) assert.ok(beams.includes(token), `beam page: ${token}`);
  assert.doesNotMatch(beams, /note="Illustrative photo"/);
  // A sentence that says "not an F1 … stock arm series" is the disclaimer, not a claim.
  assert.doesNotMatch(beams, /(?<!\b(?:not|never|no)\b[^.]{0,60})(F1|we|our)(?![^.]{0,60}\b(?:not|never|no)\b)[^.]{0,40}(certified|approved|stock)[^.]{0,20}(robot|arm series)/i, "the beam page must not claim a certified or stock arm");
  assert.match(beams, /not an F1 datasheet, a stock arm series or a robot safety approval/);
  // The roller tube page: same-shell figure, the shared table, roll cards, credits, and no balance or stock-roller claim.
  const rollers = read(ROLLERS);
  for (const token of ["carbonFigures.rollerShell", "carbonFigures.fiberDirection", "carbonProperties.map", "rolls.map", 'id="photo-credits"', "creditedPhotos.map", "GuideSection", "GuideStandards", "GuideSources", "/applications/carbon-fiber-industrial-rollers", "/products/carbon-fiber-robotic-beams", "/products/pultruded-carbon-fiber-tubes", "dateModified: updated"]) assert.ok(rollers.includes(token), `roller page: ${token}`);
  assert.doesNotMatch(rollers, /note="Illustrative photo"/);
  assert.doesNotMatch(rollers, /(?<!\b(?:not|never|no)\b[^.]{0,60})(F1|we|our)(?![^.]{0,60}\b(?:not|never|no)\b)[^.]{0,40}(balanced|balance grade|stock)[^.]{0,20}(roller|rotor|series)/i, "the roller page must not claim a balanced or stock roller");
  assert.match(rollers, /not an F1 datasheet, a stock roller series or a balance guarantee/);
  assert.ok(read(PLATES).includes("carbonFigures.plateOrientation") && read(PLATES).includes("carbonFigures.bondLine"), "plate page figures");
  assert.ok(read(PLATES).includes("/products/pultruded-carbon-fiber-tubes") && read(PLATES).includes("/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod"), "the plate page links the tube and rod pages");
  assert.ok(read(TUBES).includes("/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod") && read(RODS).includes("/products/pultruded-carbon-fiber-tubes"), "the two pages link each other");
});
