import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProjectModule } from "./load-project-module.mjs";

// Image SEO guards: the image sitemap registry resolves to real files with
// descriptive names, every page's lead image is a full ImageObject, and only
// the group's own photos carry a licence statement.

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const { routeImages, imagesForRoute, ownedPhotoPlacements, beamBridgeDrawings } = loadProjectModule("lib/pageImages.ts");
const { buildImageObject, primaryImageObject, isOwnedPhoto } = loadProjectModule("lib/imageSeo.ts");
const { ownedPhotos, ownedPhotoPath, photoRights } = loadProjectModule("content/data/ownedPhotos.ts");

const SITE = "https://www.f1composite.com";
const sitemapSource = read("app/sitemap.ts");

test("every image the sitemap claims is a static public file with a descriptive, hyphenated name", () => {
  const routes = routeImages();
  assert.ok(routes.size > 100, `only ${routes.size} routes carry images`);
  let count = 0;
  for (const [route, images] of routes) {
    assert.ok(route.startsWith("/"), route);
    for (const src of images) {
      count += 1;
      assert.match(src, /^\/images\/[a-z0-9/-]+\.(webp|jpg|png|svg)$/, `${route}: ${src} should be a lowercase hyphenated /images path`);
      assert.ok(existsSync(join(root, "public", src)), `${route}: ${src} is missing from public/`);
      assert.doesNotMatch(src, /\/(img|image|photo|untitled|screenshot)[-_]?\d*\.[a-z]+$/, `${route}: ${src} has a generic file name`);
    }
    assert.equal(new Set(images).size, images.length, `${route} lists an image twice`);
  }
  assert.ok(count > 200, `only ${count} images registered`);
});

test("the sitemap emits the registry for every page it lists, with absolute image URLs", () => {
  assert.match(sitemapSource, /imagesForRoute\(entry\.url\.replace\(BASE, ""\) \|\| "\/"\)/);
  assert.match(sitemapSource, /`\$\{BASE\}\$\{src\}`/);
  // The beam-bridge drawings moved from an inline list to the registry.
  assert.doesNotMatch(sitemapSource, /images: \[\s*`\$\{BASE\}\/images/);
  assert.deepEqual(imagesForRoute("/case-studies/beam-bridge").filter((src) => src.endsWith(".svg")), beamBridgeDrawings);
  // Every registered route must be a sitemap URL, or the images are claimed by nothing.
  const listed = new Set([...sitemapSource.matchAll(/\$\{BASE\}(\/[^`]*)`/g)].map((match) => match[1]));
  const dynamic = [/^\/datasheets\//, /^\/resources\/blog\//, /^\/applications\//, /^\/products\//, /^\/case-studies\//, /^\/industries\//, /^\/sourcing\//, /^\/tools\//, /^\/regions\//, /^\/technology\//, /^\/resources\//];
  for (const route of routeImages().keys()) {
    assert.ok(listed.has(route) || dynamic.some((pattern) => pattern.test(route)), `${route} carries images but is not in the sitemap`);
  }
});

test("each owned photo is claimed by at least one page, and that page really renders it", () => {
  const claimed = new Set([...routeImages().values()].flat());
  for (const photo of ownedPhotos) {
    assert.ok(claimed.has(ownedPhotoPath(photo)), `${photo.file} is on no page's sitemap entry`);
  }
  for (const [route, images] of Object.entries(ownedPhotoPlacements)) {
    const page = route.startsWith("/case-studies/") && !existsSync(join(root, "app", route, "page.tsx"))
      ? read("content/data/caseStudyImages.ts")
      : read(join("app", route, "page.tsx"));
    for (const src of images) assert.ok(page.includes(src), `${route} does not render ${src}`);
  }
});

test("the ImageObject points at the static file, carries the alt as caption and links the page", () => {
  const object = primaryImageObject({ src: "/images/covers/frp-i-beam.webp", alt: "Pultruded fiberglass I-beam", caption: "Catalog section", width: 1200, height: 750, pagePath: "/products/fiberglass-structural-shapes/frp-i-beam" });
  assert.equal(object["@type"], "ImageObject");
  assert.equal(object.contentUrl, `${SITE}/images/covers/frp-i-beam.webp`);
  assert.equal(object.url, `${SITE}/products/fiberglass-structural-shapes/frp-i-beam`);
  assert.equal(object.caption, "Pultruded fiberglass I-beam");
  assert.equal(object.description, "Catalog section");
  assert.equal(object.width, 1200);
  assert.equal(object.representativeOfPage, true);
  assert.doesNotMatch(object.contentUrl, /_next\/image/);
  assert.equal(object.license, undefined, "a catalog cut-out is not a licensable photo");
  assert.equal(object.copyrightNotice, undefined);
});

test("the group's own photos are licensable in structured data, with the statement the files carry", () => {
  for (const photo of ownedPhotos) {
    const src = ownedPhotoPath(photo);
    assert.ok(isOwnedPhoto(src));
    const object = buildImageObject({ src, alt: photo.description });
    assert.equal(object.license, photoRights.rightsUrl);
    assert.equal(object.acquireLicensePage, photoRights.licensorUrl);
    assert.equal(object.creditText, photoRights.credit);
    assert.equal(object.copyrightNotice, photoRights.notice);
    assert.equal(object.creator.name, photoRights.creator);
  }
  // The licence page and the licensing contact exist.
  assert.ok(read("app/terms/page.tsx").includes('id="image-use"'));
  assert.ok(photoRights.licensorUrl.startsWith(`${SITE}/contact?`));
});

test("openly licensed photographs carry their own author and licence, never ours", () => {
  const { rebarScenePhotos } = loadProjectModule("content/data/frpRebar.ts");
  for (const scene of Object.values(rebarScenePhotos)) {
    const object = buildImageObject({ src: scene.src, alt: scene.alt, caption: scene.shows, credit: scene.credit });
    assert.equal(object.creditText, scene.credit.author);
    assert.notEqual(object.license, photoRights.rightsUrl, `${scene.src} must not claim F1 copyright`);
    if (scene.credit.licenseHref) assert.equal(object.license, scene.credit.licenseHref);
    else assert.equal(object.usageInfo, scene.credit.license);
    assert.equal(object.acquireLicensePage, undefined);
  }
});

test("page templates emit the ImageObject for their lead figure", () => {
  const expectations = [
    ["lib/seo.ts", /primaryImageOfPage: primaryImageObject\(\{ src: image, alt: imageAlt \?\? name/],
    ["app/resources/blog/[slug]/page.tsx", /primaryImageObject\(\{ src: post\.coverImage, alt: post\.coverAlt/],
    ["app/resources/blog/[slug]/page.tsx", /buildImageObject\(\{ src: post\.supportingImage, alt: post\.supportingAlt/],
    ["app/case-studies/[slug]/page.tsx", /primaryImageObject\(\{ src: caseStudyImages\[slug\]/],
    ["app/applications/[slug]/page.tsx", /image: primaryImageObject\(\{ src: page\.image, alt: page\.imageAlt/],
    ["components/industries/IndustryPage.tsx", /primaryImageOfPage: primaryImageObject\(\{ src: industry\.image\.src, alt: industry\.image\.alt/],
    ["components/sections/PultrusionGuidePage.tsx", /image: primaryImageObject\(\{ src: page\.image, alt: page\.imageAlt/],
    ["components/products/CustomProductPage.tsx", /primaryImageOfPage: primaryImageObject\(\{ src: page\.image, alt: page\.imageAlt/],
  ];
  for (const [file, pattern] of expectations) assert.match(read(file), pattern, file);
});

test("alt texts in the image registries describe the picture rather than naming a file", () => {
  const { blogPosts } = loadProjectModule("content/data/blogPosts.ts");
  const { caseStudyImageMeta, caseStudyContentImages } = loadProjectModule("content/data/caseStudyImages.ts");
  const alts = [
    ...blogPosts.flatMap((post) => [post.coverAlt, post.supportingAlt]),
    ...Object.values(caseStudyImageMeta).map((meta) => meta.alt),
    ...Object.values(caseStudyContentImages).flat().map((figure) => figure.alt),
  ];
  for (const alt of alts) {
    assert.ok(alt.length >= 20 && alt.length <= 260, `alt length ${alt.length}: ${alt}`);
    assert.doesNotMatch(alt, /^(image|picture|photo|graphic) of/i, alt);
    assert.doesNotMatch(alt, /\.(webp|jpg|jpeg|png|svg)\b/i, alt);
    assert.doesNotMatch(alt, /[_]{1}[a-z]/, `${alt} looks like a file name`);
  }
});
