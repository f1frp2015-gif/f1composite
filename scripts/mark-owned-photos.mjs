// Marks the group's own photos listed in content/data/ownedPhotos.ts: draws
// "© f1composite.com" where lib/photoMark.ts places it and writes copyright
// metadata into the file (XMP for Google Images and IPTC-aware tools, EXIF for
// desktop viewers). Next's image optimizer strips metadata from the resized
// copies it serves, so the visible mark is what travels with a copied image;
// the metadata stays in the original file under /images/f1-photos/.
//
// Reads each photo from its former path and writes it to /images/f1-photos/.
// A photo that is already there is skipped. After a run, delete the former
// file and add its redirect to IMAGE_ASSET_REDIRECTS in next.config.ts.
//   node scripts/mark-owned-photos.mjs

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { loadProjectModule } from "./load-project-module.mjs";

const root = join(import.meta.dirname, "..");
const { MARK_TEXT, markBox } = loadProjectModule("lib/photoMark.ts");
const { OWNED_PHOTO_DIR, ownedPhotos, ownedPhotoPath, photoRights } = loadProjectModule("content/data/ownedPhotos.ts");

const xmlEscape = (text) => text.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]);

function xmp(description) {
  return `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
    xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"
    xmlns:plus="http://ns.useplus.org/ldf/xmp/1.0/"
    photoshop:Credit="${xmlEscape(photoRights.credit)}"
    xmpRights:Marked="True"
    xmpRights:WebStatement="${xmlEscape(photoRights.rightsUrl)}">
   <dc:creator><rdf:Seq><rdf:li>${xmlEscape(photoRights.creator)}</rdf:li></rdf:Seq></dc:creator>
   <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">${xmlEscape(photoRights.notice)}</rdf:li></rdf:Alt></dc:rights>
   <dc:description><rdf:Alt><rdf:li xml:lang="x-default">${xmlEscape(description)}</rdf:li></rdf:Alt></dc:description>
   <plus:Licensor><rdf:Seq><rdf:li rdf:parseType="Resource"><plus:LicensorURL>${xmlEscape(photoRights.licensorUrl)}</plus:LicensorURL></rdf:li></rdf:Seq></plus:Licensor>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

function markSvg(box) {
  const fontSize = Math.round(box.width / 12.2);
  const stroke = Math.max(1, Math.round(fontSize * 0.08));
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${box.width}" height="${box.height}">
  <text x="${box.width - stroke}" y="${Math.round(box.height / 2 + fontSize * 0.36)}" text-anchor="end"
    font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="${fontSize}" font-weight="700"
    fill="#ffffff" fill-opacity="0.88" stroke="#000000" stroke-opacity="0.35" stroke-width="${stroke}"
    paint-order="stroke" stroke-linejoin="round">${xmlEscape(MARK_TEXT)}</text>
</svg>`);
}

mkdirSync(join(root, "public", OWNED_PHOTO_DIR), { recursive: true });
for (const photo of ownedPhotos) {
  const target = join(root, "public", ownedPhotoPath(photo));
  if (existsSync(target)) {
    console.log(`skip   ${photo.file} (already marked)`);
    continue;
  }
  const source = join(root, "public", photo.from);
  const image = sharp(source);
  const { width, height } = await image.metadata();
  const box = markBox(width, height);
  await image
    .composite([{ input: markSvg(box), left: box.left, top: box.top }])
    .withExif({ IFD0: { Copyright: photoRights.notice, Artist: photoRights.creator, ImageDescription: photo.description } })
    .withXmp(xmp(photo.description))
    .webp({ quality: 86, effort: 6, smartSubsample: true })
    .toFile(target);
  console.log(`marked ${photo.file} (${width}×${height}, mark ${box.width}×${box.height} at ${box.left},${box.top})`);
}
