import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const fromRoot = (relativePath) => path.join(root, relativePath);

const convertedAssets = [
  "public/images/blog/pultruded-thermal-break-aluminum-sliding-section.webp",
  "public/images/products/channel/frp-channel-profile-200x60x12mm.webp",
  "public/images/products/i-beam/frp-i-beam-profile-200x100x10mm.webp",
  "public/images/products/flat-bar/frp-flat-bar-photo.webp",
  "public/images/products/i-beam/frp-i-beam-photo.webp",
  "public/images/products/round-tube/frp-round-tube-photo.webp",
];

const assetRedirects = [
  ["public/images/blog/pultruded-thermal-break-aluminum-sliding-section.png", "public/images/blog/pultruded-thermal-break-aluminum-sliding-section.webp"],
  ["public/images/products/channel/frp-channel-profile-200x60x12mm.png", "public/images/products/channel/frp-channel-profile-200x60x12mm.webp"],
  ["public/images/products/i-beam/frp-i-beam-profile-200x100x10mm.png", "public/images/products/i-beam/frp-i-beam-profile-200x100x10mm.webp"],
  ["public/images/products/flat-bar/frp-flat-bar-photo.png", "public/images/products/flat-bar/frp-flat-bar-photo.webp"],
  ["public/images/products/i-beam/frp-i-beam-photo.png", "public/images/products/i-beam/frp-i-beam-photo.webp"],
  ["public/images/products/round-tube/frp-round-tube-photo.png", "public/images/products/round-tube/frp-round-tube-photo.webp"],
  ["public/images/products/round-tube/frp-round-tube-48x42mm.png", "public/images/products/round-tube/frp-round-tube-photo.webp"],
  ["public/images/blog/frp-electrical-insulation-substation.jpg", "public/images/industries/frp-electric-power-substation-infrastructure.jpg"],
  ["public/images/regions/frp-cable-tray-uae-oil-gas.jpg", "public/images/industries/frp-electric-power-substation-infrastructure.jpg"],
  ["public/images/blog/frp-fenestration-passivhaus-cover.jpg", "public/images/regions/frp-passive-house-windows-germany.jpg"],
  ["public/images/regions/frp-solar-mounting-australia.jpg", "public/images/industries/frp-energy-solar-power-installation.jpg"],
  ["public/images/products/fenestration/frp-window-frame-140-series-sliding.webp", "public/images/products/window-door/frp-window-door-frame-140-series-sliding.webp"],
  ["public/images/products/fenestration/frp-window-frame-80-series-tilt-turn.webp", "public/images/products/window-door/frp-window-door-frame-80-series-tilt-turn.webp"],
  ["public/images/products/angle/frp-angle-section-100x100x10mm.webp", "public/images/products/angle/frp-angle-photo.webp"],
];

test("sitewide image audit stays within the optimized quality gates", () => {
  const audit = spawnSync(process.execPath, [fromRoot("scripts/image-audit.mjs"), "--json"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
  });
  assert.equal(audit.status, 0, audit.stderr);
  const report = JSON.parse(audit.stdout);

  assert.equal(report.seoUnsafe.length, 0, "all public image basenames should be lowercase, descriptive and hyphenated");
  assert.equal(report.metadataFlags.length, 0, "no AI provenance or generation metadata tokens should ship");
  assert.equal(report.componentIssues.length, 0, "Next/Image usage should have alt, sizes and current preload semantics");
  assert.equal(report.missingReferences.length, 0, "all direct image references should resolve to public assets");
  assert.ok(report.total.bytes < 27 * 1024 * 1024, "raster source payload should stay below 27 MiB");
  assert.ok(report.duplicateGroups.length <= 1, "exact duplicate assets should stay consolidated");
});

test("image migrations preserve SEO redirects and remove superseded duplicate payloads", () => {
  const config = readFileSync(fromRoot("next.config.ts"), "utf8");

  for (const asset of convertedAssets) {
    const absolute = fromRoot(asset);
    assert.ok(existsSync(absolute), `${asset} should exist`);
    const buffer = readFileSync(absolute);
    assert.equal(buffer.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(buffer.subarray(8, 12).toString("ascii"), "WEBP");
    assert.ok(statSync(absolute).size > 20_000, `${asset} should be a real image asset`);
  }

  for (const [oldAsset, targetAsset] of assetRedirects) {
    assert.equal(existsSync(fromRoot(oldAsset)), false, `${oldAsset} should be retired`);
    assert.ok(existsSync(fromRoot(targetAsset)), `${targetAsset} should receive the redirect`);
    const publicPath = `/${oldAsset.replace(/^public\//, "")}`;
    assert.match(config, new RegExp(publicPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("JPEG optimizer retains deterministic SSIM and savings safeguards", () => {
  const optimizer = readFileSync(fromRoot("scripts/optimize-image-assets.mjs"), "utf8");
  assert.match(optimizer, /minimumSsim = 0\.98/);
  assert.match(optimizer, /minimumSavingsRatio = 0\.08/);
  assert.match(optimizer, /-map_metadata/);
  assert.match(optimizer, /-q:v/);
});
