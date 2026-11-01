import { ownedPhotos, ownedPhotoPath, photoRights } from "@/content/data/ownedPhotos";

/**
 * Image SEO: one schema.org ImageObject builder for every page's JSON-LD.
 *
 * Google Images ranks the page an image is embedded on, and links the result
 * to that page. What the site controls is (1) which page claims the image
 * (image sitemap, lib/pageImages.ts), (2) what the image is (alt, caption,
 * the ImageObject below) and (3) who owns it. For the group's own photos the
 * ImageObject carries license, acquireLicensePage, creditText, creator and
 * copyrightNotice, which is what Google reads for the "Licensable" badge in
 * image results; the same statement is written into the files as IPTC/XMP by
 * scripts/mark-owned-photos.mjs. Openly licensed photographs (Wikimedia
 * Commons) carry their own license link and author instead. Stock, supplier
 * and catalog images carry neither: we cannot license them.
 *
 * contentUrl is always the static /images path, not the /_next/image
 * optimizer URL the browser loads, so every crawler sees one canonical file.
 */

const SITE_URL = "https://www.f1composite.com";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const absolute = (path: string) => new URL(path, SITE_URL).toString();

const ownedPaths = new Set(ownedPhotos.map(ownedPhotoPath));

/** True for a photo the group took itself and may license (content/data/ownedPhotos.ts). */
export function isOwnedPhoto(src: string): boolean {
  return ownedPaths.has(src.split(/[?#]/)[0]);
}

export interface ImageCredit {
  /** Photographer or rights holder as the license asks it to be written. */
  author: string;
  /** License name, e.g. "CC BY-SA 4.0" or "Public domain". */
  license: string;
  /** Deed URL; absent for public-domain material. */
  licenseHref?: string;
  /** Where the file was found. */
  sourceHref?: string;
}

export interface ImageObjectInput {
  /** Site-relative path under /public (or an absolute URL). */
  src: string;
  /** The alt text the page renders; becomes `caption` so the text and the markup agree. */
  alt: string;
  /** Figure caption, when the page shows one. */
  caption?: string;
  width?: number;
  height?: number;
  /** Open-license attribution for a third-party photograph. */
  credit?: ImageCredit;
  /** Mark the page's lead image. */
  representativeOfPage?: boolean;
  /** The page the image is embedded on; sets `url` so a crawler can link image and page. */
  pagePath?: string;
}

/** A schema.org ImageObject for JSON-LD; licensing fields only when we can back them. */
export function buildImageObject({ src, alt, caption, width, height, credit, representativeOfPage, pagePath }: ImageObjectInput) {
  const contentUrl = absolute(src);
  const object: Record<string, unknown> = {
    "@type": "ImageObject",
    "@id": `${contentUrl}#image`,
    contentUrl,
    url: pagePath ? absolute(pagePath) : contentUrl,
    caption: alt,
    inLanguage: "en",
  };
  if (caption) object.description = caption;
  if (width && height) {
    object.width = width;
    object.height = height;
  }
  if (representativeOfPage) object.representativeOfPage = true;

  if (isOwnedPhoto(src)) {
    object.license = photoRights.rightsUrl;
    object.acquireLicensePage = photoRights.licensorUrl;
    object.creditText = photoRights.credit;
    object.creator = { "@type": "Organization", "@id": ORGANIZATION_ID, name: photoRights.creator };
    object.copyrightHolder = { "@id": ORGANIZATION_ID };
    object.copyrightNotice = photoRights.notice;
  } else if (credit) {
    object.creditText = credit.author;
    object.creator = { "@type": "Person", name: credit.author };
    if (credit.licenseHref) object.license = credit.licenseHref;
    else object.usageInfo = credit.license;
    if (credit.sourceHref) object.sameAs = credit.sourceHref;
  }
  return object;
}

/** Shorthand for a page's lead figure. */
export function primaryImageObject(input: Omit<ImageObjectInput, "representativeOfPage">) {
  return buildImageObject({ ...input, representativeOfPage: true });
}
