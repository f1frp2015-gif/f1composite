// Builds the site search index once, at build time: every catalog size with
// its published mass and nominal section properties, every static page (from
// pages.generated.json), blog posts, application pages, glossary terms,
// authors and the document library. Served as /search-index.json for the
// palette and used directly by /search.

import generatedPages from "./pages.generated.json";
import type { SearchEntry, SearchKind } from "./types";
import { blogPosts } from "@/content/data/blogPosts";
import { engineeringEvidence } from "@/content/data/engineeringEvidence";
import { glossaryTerms } from "@/content/data/glossary";
import { productFamilies } from "@/content/data/productTaxonomy";
import { applicationPages } from "@/lib/applicationPages";
import { authors } from "@/lib/authors";
import { CAD_SLUGS } from "@/lib/cadManifest";
import { modelToSlug } from "@/lib/catalog/public";
import { computeProperties, type ShapeId } from "@/lib/catalog/shapes";
import { buildProducts } from "@/lib/catalog/standardProfiles";
import { datasheetHrefForModel } from "@/lib/datasheetContent";
import { assembleDocuments } from "@/lib/documents";
import { buildRfqHref } from "@/lib/rfq";

interface GeneratedPage {
  path: string;
  title: string;
  description: string;
  aliases?: string[];
  keywords?: string;
}

const clip = (text: string, length: number) => (text.length > length ? `${text.slice(0, length - 1).trimEnd()}…` : text);
const displayTitle = (title: string) => title.replace(/\s*[|—–-]\s*F1 Composite$/, "").split(" | ")[0].trim();

const TOOL_PATHS = new Set(["/tools", "/tools/profile-finder", "/frp-profile-calculator", "/frp-span-tables", "/frp-density-calculator", "/fiberglass-pultruded-profile-price", "/technology/frp-u-value-calculator", "/ask", "/ai/passive-house", "/ai/sourcing"]);
const DOCUMENT_PATHS = new Set(["/datasheets", "/resources/downloads", "/resources/evidence"]);

function pageKind(path: string): SearchKind {
  if (TOOL_PATHS.has(path)) return "tool";
  if (DOCUMENT_PATHS.has(path)) return "document";
  if (path === "/products/frp-pultrusion-manufacturer-factory-direct") return "company";
  if (path === "/pultruded-frp-profiles" || path.startsWith("/products/")) return "product";
  if (/^\/(industries|applications|case-studies|regions)(\/|$)/.test(path)) return "industry";
  if (path === "/" || /^\/(about|contact|privacy|terms)(\/|$)/.test(path)) return "company";
  return "article";
}

// Product line of each product page, from the shared taxonomy (F1-STRUX …).
const productLines = new Map<string, string>();
for (const family of productFamilies) {
  if (!family.brand.startsWith("F1-")) continue;
  for (const href of [family.href, ...family.links.map((link) => link.href)]) {
    if (href.startsWith("/products/")) productLines.set(href.split("#")[0], family.brand);
  }
}

const SIZE_FAMILIES: Record<string, { label: string; url: string }> = {
  i_beam: { label: "I-beam", url: "/products/fiberglass-structural-shapes/frp-i-beam" },
  channel: { label: "Channel", url: "/products/fiberglass-structural-shapes/frp-channel" },
  angle: { label: "Angle", url: "/products/fiberglass-structural-shapes/frp-angle" },
  shs: { label: "Square tube", url: "/products/fiberglass-structural-shapes/frp-square-tube" },
  rhs: { label: "Rectangular tube", url: "/products/fiberglass-structural-shapes/frp-square-tube" },
  tube: { label: "Round tube", url: "/products/fiberglass-structural-shapes/frp-tube" },
  rod: { label: "Rod", url: "/products/fiberglass-structural-shapes/frp-rod" },
  flat: { label: "Flat bar", url: "/products/fiberglass-structural-shapes/frp-flat-bar" },
};

const decimals = (value: number, digits: number) => value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

function sizeEntries(): SearchEntry[] {
  return buildProducts().map((product) => {
    const shape = product.geometry.shape as ShapeId;
    const family = SIZE_FAMILIES[shape];
    const properties = computeProperties({ kind: "parametric", shape, dims: product.geometry.dims });
    const slug = modelToSlug(product.model);
    // Rods and flat bars are chosen by area and width, the rest by stiffness.
    const property = shape === "rod" || shape === "flat" ? `A ${decimals(properties.A, 0)} mm²` : `Ix ${decimals(properties.Ix / 1e4, 1)} cm⁴`;
    return {
      id: `size:${slug}`,
      kind: "size",
      title: product.model,
      url: datasheetHrefForModel(product.model) ?? family.url,
      summary: `${family.label} · ${product.weight.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 })} kg/m · ${property}`,
      keywords: `${family.label} datasheet`,
      badge: "F1-STRUX",
      size: {
        glyph: shape,
        family: family.label,
        dims: product.model.replace(/^[^\d]*/, "").split("×").map(Number),
        mass: product.weight,
        familyUrl: family.url,
        ...(CAD_SLUGS.has(slug) ? { dxf: `/cad/${slug}.dxf` } : {}),
      },
    };
  });
}

function pageEntries(): SearchEntry[] {
  return (generatedPages as GeneratedPage[]).map((page) => {
    const kind = pageKind(page.path);
    const line = kind === "product" ? productLines.get(page.path) : undefined;
    return {
      id: `page:${page.path}`,
      kind,
      title: page.title,
      url: page.path,
      summary: clip(page.description, 160),
      keywords: [...(page.aliases ?? []), page.keywords ?? ""].join(" ").trim() || undefined,
      ...(line ? { badge: line } : {}),
    };
  });
}

function documentEntries(): SearchEntry[] {
  const documents = assembleDocuments();
  const listed = new Set(documents.map((document) => document.file));
  const entries: SearchEntry[] = documents.map((document) => ({
    id: `doc:${document.file ?? document.title}`,
    kind: "document",
    title: document.title,
    url: document.file ?? buildRfqHref({ source: "site-search", product: document.title, message: `Please confirm availability and applicability of: ${document.title}` }),
    summary: [document.type, document.issuer, document.product].filter(Boolean).join(" · "),
    keywords: clip(`${document.reference ?? ""} ${document.description}`, 400),
    badge: document.file ? document.format : "On request",
  }));
  // Evidence records the downloads list does not carry (PV frame reports).
  for (const record of engineeringEvidence) {
    if (listed.has(record.file)) continue;
    entries.push({
      id: `doc:${record.file}`,
      kind: "document",
      title: record.title,
      url: record.file,
      summary: `${record.kind} · ${record.reference} · ${record.productLabel}`,
      keywords: clip(record.scope, 400),
      badge: "PDF",
    });
  }
  return entries;
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [
    ...sizeEntries(),
    ...pageEntries(),
    ...blogPosts.map((post): SearchEntry => ({
      id: `blog:${post.slug}`,
      kind: "article",
      title: post.title,
      url: `/resources/blog/${post.slug}`,
      summary: clip(post.excerpt, 160),
      keywords: `${post.category} ${post.seoTitle ?? ""}`.trim(),
      badge: post.category,
    })),
    ...applicationPages.map((page): SearchEntry => ({
      id: `application:${page.slug}`,
      kind: "industry",
      title: displayTitle(page.title),
      url: `/applications/${page.slug}`,
      summary: clip(page.description, 160),
      keywords: `${page.shortTitle} ${page.h1}`,
    })),
    ...glossaryTerms.map((term): SearchEntry => ({
      id: `term:${term.id}`,
      kind: "glossary",
      title: term.term,
      url: `/resources/glossary#${term.id}`,
      summary: clip(term.definition, 160),
      keywords: term.category,
    })),
    ...authors.map((author): SearchEntry => ({
      id: `author:${author.slug}`,
      kind: "company",
      title: author.fullName,
      url: `/about/authors/${author.slug}`,
      summary: clip(`${author.jobTitle}. ${author.expertise.join(", ")}`, 160),
      keywords: author.knowsAbout.join(" "),
    })),
    ...documentEntries(),
  ];
  const ids = new Set<string>();
  return entries.filter((entry) => !ids.has(entry.id) && Boolean(ids.add(entry.id)));
}
