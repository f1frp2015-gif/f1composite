import type { Metadata } from "next";
import { customerReviews } from "@/content/data/reviews";

const SITE_URL = "https://www.f1composite.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "F1 Composite",
  alternateName: ["F1 Composites", "Chongqing F1 Composites Co., Ltd."],
  legalName: "Chongqing F1 Composites Co., Ltd.",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/brand/f1-logo.png`,
    width: 512,
    height: 512,
  },
  description:
    "F1 Composite is FengDu New Material's international export company for pultruded FRP profiles, serving construction, infrastructure, energy, marine, industrial, and fenestration projects worldwide.",
  foundingDate: "2015",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 153 Jinyu Avenue, Cuntan Street",
    addressLocality: "Chongqing",
    addressRegion: "Liangjiang New Area",
    postalCode: "401121",
    addressCountry: "CN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "inquiry@f1composite.com",
    telephone: "+86-138-8333-8993",
    availableLanguage: ["English", "Chinese"],
    areaServed: "Worldwide",
  },
  naics: "326199",
  sameAs: ["https://www.youtube.com/@F1Composites"],
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

interface ProductFamilyPageSchemaOptions {
  name: string;
  description: string;
  path: string;
  image: string;
  category: string;
  material?: string | string[];
  additionalProperty?: Array<{ name: string; value: string }>;
  /**
   * Branded product-line token (the F1 Composite equivalent of Strongwell's
   * EXTREN®). Surfaces as schema.org `model` + a "Product line" property so AI
   * engines bind the generic product to a citeable, ownable brand name.
   */
  productLine?: string;
  /**
   * Real catalog price band for THIS product family (per linear meter unless
   * overridden). Omit only when no defensible number exists — an absent
   * `offers` (and no review/aggregateRating) fails Google's Product
   * structured-data check ("Either 'offers', 'review', or 'aggregateRating'
   * should be specified"). Never invent one flat price and reuse it across
   * different profile families — derive it from real per-SKU data instead,
   * e.g. via `priceRangeFromWeights()` below.
   */
  priceRange?: {
    lowPrice: string;
    highPrice: string;
    offerCount?: string;
    unitText?: string;
  };
  /**
   * Real measured properties for THIS specific product. Omit unless the value
   * is genuinely representative — do not assert one density / conductivity
   * across every product family.
   */
  measurements?: Array<{ propertyID: string; value: string; unitText: string }>;
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

const SEO_LENIENT = process.env.SEO_LENIENT === "1";

function enforceSeoLimits(
  path: string,
  title: string,
  description: string,
) {
  const violations: string[] = [];
  if (title.length > 60) {
    violations.push(
      `title is ${title.length} chars (max 60): "${title}"`,
    );
  }
  if (description.length < 120) {
    violations.push(
      `description is ${description.length} chars (min 120): "${description.slice(0, 80)}..."`,
    );
  }
  if (description.length > 160) {
    violations.push(
      `description is ${description.length} chars (max 160): "${description.slice(0, 80)}..."`,
    );
  }
  if (violations.length === 0) return;
  const msg = `[seo] ${path}\n  - ${violations.join("\n  - ")}`;
  if (SEO_LENIENT) {
    console.warn(msg);
    return;
  }
  throw new Error(
    `${msg}\n\nSet SEO_LENIENT=1 to downgrade to warning (use only as a temporary escape hatch).`,
  );
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: PageMetadataOptions): Metadata {
  enforceSeoLimits(path, title, description);
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    // Emit as `absolute` so the root layout's "%s | F1 Composite" template is
    // NOT appended. That +15-char suffix pushed many titles past Google's
    // ~60-char SERP limit; with `absolute`, the rendered <title> equals the
    // string validated above, so the 60-char guard reflects the real SERP title.
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildProductFamilyPageSchema({
  name,
  description,
  path,
  image,
  category,
  material,
  productLine,
}: ProductFamilyPageSchemaOptions) {
  const materials = Array.isArray(material) ? material : material ? [material] : [];

  // The site sells configurable B2B families and quote-only line items, not
  // checkout-ready SKUs with stable public prices. Describe the page/topic and
  // avoid Product/Offer rich-result claims that cannot be verified on-page.
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    name,
    description,
    url: absoluteUrl(path),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(image),
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: {
      "@type": "Thing",
      name,
      description,
      ...(productLine && { alternateName: productLine }),
    },
    provider: { "@id": `${SITE_URL}/#organization` },
    keywords: [category, productLine, ...materials].filter(Boolean).join(", "),
  };
}

/**
 * Derive a defensible per-linear-meter price band from real per-SKU weights
 * (kg/m, straight off the page's own spec table or DB row) and the internal
 * FOB-China USD/kg quoting tier for that product category — the tier already
 * spans the full OEM-to-project channel range, so multiplying by the
 * lightest and heaviest real SKU on the page gives a real, non-uniform band
 * instead of one flat price copy-pasted across every profile family.
 */
export function priceRangeFromWeights(
  weightsKgPerM: number[],
  kgPriceLow: number,
  kgPriceHigh: number,
): { lowPrice: string; highPrice: string; offerCount: string } | null {
  if (weightsKgPerM.length === 0) return null;
  const wMin = Math.min(...weightsKgPerM);
  const wMax = Math.max(...weightsKgPerM);
  const lowPrice = (Math.floor(wMin * kgPriceLow * 10) / 10).toString();
  const highPrice = Math.ceil(wMax * kgPriceHigh).toString();
  return { lowPrice, highPrice, offerCount: String(weightsKgPerM.length) };
}

/**
 * Build a schema.org aggregateRating + review fragment from REAL, verifiable
 * reviews in content/data/reviews.ts. Returns null when there are no reviews,
 * so we never emit an empty or fabricated AggregateRating — doing so is a Google
 * structured-data policy violation and risks a manual action. Once you add ≥1
 * genuine review, spread the result into an Organization or (better, for SERP
 * stars) a Product node.
 */
export function buildAggregateRating() {
  if (!customerReviews.length) return null;
  const count = customerReviews.length;
  const avg =
    customerReviews.reduce((sum, r) => sum + r.rating, 0) / count;
  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: String(count),
      bestRating: "5",
      worstRating: "1",
    },
    review: customerReviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Organization", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: r.body,
      datePublished: r.datePublished,
    })),
  };
}
