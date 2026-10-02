import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import sharp from "sharp";
import { loadProjectModule } from "./load-project-module.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const { ownedPhotos, ownedPhotoPath, photoRights } = loadProjectModule("content/data/ownedPhotos.ts");
const { LAYOUT_ASPECTS, cropState, markBox, visibleWindow } = loadProjectModule("lib/photoMark.ts");

test("each owned photo is marked and carries copyright metadata", async () => {
  assert.ok(ownedPhotos.length > 0);
  for (const photo of ownedPhotos) {
    const file = join(root, "public", ownedPhotoPath(photo));
    assert.ok(existsSync(file), `${ownedPhotoPath(photo)} is missing; run node scripts/mark-owned-photos.mjs`);
    const meta = await sharp(file).metadata();
    const xmp = meta.xmp?.toString() ?? "";
    assert.ok(xmp.includes(photoRights.rightsUrl), `${photo.file} has no rights statement`);
    assert.ok(xmp.includes(photoRights.notice), `${photo.file} has no copyright notice`);
    // EXIF text is ASCII, so libvips writes "©" as "(C)".
    assert.ok(meta.exif && meta.exif.includes(Buffer.from("(C) Chongqing F1 Composites Co., Ltd.")), `${photo.file} has no EXIF copyright`);
  }
});

test("the mark is never cut in half by our layouts", async () => {
  for (const photo of ownedPhotos) {
    const { width, height } = await sharp(join(root, "public", ownedPhotoPath(photo))).metadata();
    const box = markBox(width, height);
    for (const aspect of LAYOUT_ASPECTS) {
      assert.notEqual(cropState(box, visibleWindow(width, height, aspect)), "partial", `${photo.file} at ${aspect.toFixed(2)}`);
    }
  }
});

test("unmarked originals are gone, redirected and no longer referenced", () => {
  const config = read("next.config.ts");
  const sources = execFileSync("git", ["grep", "-l", "-F", "/images/", "--", "app", "components", "content", "lib"], { cwd: root, encoding: "utf8" }).trim().split("\n");
  const text = sources.filter((path) => path !== "content/data/ownedPhotos.ts").map(read).join("\n");
  for (const photo of ownedPhotos) {
    assert.ok(!existsSync(join(root, "public", photo.from)), `${photo.from} is still published unmarked`);
    assert.ok(config.includes(`["${photo.from}", "${ownedPhotoPath(photo)}"]`), `${photo.from} has no redirect`);
    assert.ok(!text.includes(photo.from), `${photo.from} is still referenced`);
  }
});

test("owned photos are never labelled as stock or supplier images", () => {
  const owned = new Set(ownedPhotos.map(ownedPhotoPath));
  for (const line of read("lib/covers.ts").split("\n")) {
    if ([...owned].some((path) => line.includes(path))) assert.doesNotMatch(line, /ILLUSTRATIVE|Illustrative photo|Supplier photo/, line);
  }
  const { blogPosts } = loadProjectModule("content/data/blogPosts.ts");
  for (const post of blogPosts) {
    if (owned.has(post.supportingImage)) assert.doesNotMatch(post.supportingCaption ?? "", /^(Illustrative|Supplier) photo/, post.slug);
    if (owned.has(post.coverImage)) assert.doesNotMatch(post.coverNote ?? "", /Illustrative|Supplier/, post.slug);
  }
});

test("the terms page explains image use at the rights URL", () => {
  assert.equal(photoRights.rightsUrl, "https://www.f1composite.com/terms#image-use");
  assert.match(read("app/terms/page.tsx"), /id="image-use"/);
});
