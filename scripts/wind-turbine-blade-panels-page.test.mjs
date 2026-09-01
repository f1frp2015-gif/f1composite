import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import test from "node:test";

const pagePath = "app/products/wind-turbine-blade-panels/page.tsx";
const dataPath = "content/data/windTurbineBladePanelSpecs.ts";
const route = "/products/wind-turbine-blade-panels";

const page = readFileSync(pagePath, "utf8");
const data = readFileSync(dataPath, "utf8");

test("wind blade page keeps the report values scoped to GFP-WE20", () => {
  assert.match(page, /GFP-WE20/);
  assert.match(`${page}\n${data}`, /not (?:universal )?guaranteed minima/);
  assert.match(page, /P95 denotes 95% survival probability at 95% confidence/);
  assert.doesNotMatch(page, /DNV.?GL-accredited/i);
  assert.match(data, /R-L23011205a2\.Rev00\.EN/);
  assert.match(data, /AP3280A/);
  assert.match(data, /TM\+ Glass/);
  assert.match(data, /8\.51/);
  assert.match(data, /85\.29%/);
  assert.match(data, /72\.46%/);
});

test("wind blade page states project-specific cut length and all three material programs", () => {
  assert.match(page, /cut to the finished length specified in your approved order drawing/i);
  assert.match(page, /GFRP, CFRP & Carbon-Glass Hybrid/);
  assert.match(data, /GFRP pultruded panel/);
  assert.match(data, /CFRP pultruded panel/);
  assert.match(data, /Carbon-glass hybrid panel/);
});

test("SEO-named WebP source and specimen images exist and remain lightweight", () => {
  const files = [
    "pultruded-fiberglass-wind-blade-panel.webp",
    "pultruded-carbon-fiber-wind-blade-panel.webp",
    "carbon-glass-hybrid-wind-blade-panel.webp",
    "gfp-we20-pultruded-panel-test-sample.webp",
    "gfp-we20-fatigue-specimens-before-test.webp",
    "gfp-we20-fatigue-specimens-after-test.webp",
  ];

  for (const file of files) {
    const path = `public/images/products/wind-turbine-blade-panels/${file}`;
    assert.ok(existsSync(path), `${path} should exist`);
    assert.ok(statSync(path).size < 200 * 1024, `${path} should be under 200 KiB`);
  }
});

test("route is registered in navigation, product discovery, SEO and sitemap", () => {
  const owners = [
    "content/data/navigation.ts",
    "content/data/products.ts",
    "content/data/seoQueryTargets.ts",
    "app/pultruded-frp-profiles/page.tsx",
    "app/sitemap.ts",
  ];
  for (const owner of owners) {
    assert.match(readFileSync(owner, "utf8"), new RegExp(route.replaceAll("/", "\\/")), `${owner} should include ${route}`);
  }
});
