import type { Metadata } from "next";
import { customerReviews } from "@/content/data/reviews";

const SITE_URL = "https://www.f1composite.com";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

interface ProductSchemaOptions {
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
   * overridden). Omit for quote-only products — we then emit a price-less
   * Offer (we sell it, it is in stock, contact for a quote) rather than
   * asserting a fabricated price. B2B pricing is per-RFQ, so do not invent a
   * range just to populate the field.
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
      languages: {
        "en-US": url,
        "x-default": url,
      },
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

export function buildProductSchema({
  name,
  description,
  path,
  image,
  category,
  material,
  additionalProperty = [],
  productLine,
  priceRange,
  measurements,
}: ProductSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: absoluteUrl(path),
    image: [absoluteUrl(image)],
    category,
    ...(productLine && { model: productLine, mpn: productLine }),
    brand: {
      "@type": "Brand",
      name: "F1 Composite",
    },
    manufacturer: {
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: "F1 Composite",
      url: SITE_URL,
    },
    // Only emit `offers` when we have a REAL price band. Google Merchant
    // listings require every Offer to carry `price` or `priceSpecification`; a
    // price-less Offer is invalid (GSC error: "Either 'price' or
    // 'priceSpecification' should be specified (in 'offers')") and earns zero
    // rich-result benefit anyway. B2B pricing here is per-RFQ, so for quote-only
    // products we omit `offers` entirely — the Product stays valid via
    // brand / manufacturer / material / measurements. Pass a real `priceRange`
    // to restore an AggregateOffer with actual numbers.
    ...(priceRange && {
      offers: {
        "@type": "AggregateOffer",
        url: absoluteUrl("/contact"),
        priceCurrency: "USD",
        lowPrice: priceRange.lowPrice,
        highPrice: priceRange.highPrice,
        ...(priceRange.offerCount && { offerCount: priceRange.offerCount }),
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        businessFunction: "http://purl.org/goodrelations/v1#Sell",
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          unitText: priceRange.unitText ?? "linear meter",
        },
        seller: {
          "@id": `${SITE_URL}/#organization`,
          "@type": "Organization",
          name: "F1 Composite",
        },
      },
    }),
    material,
    ...(measurements?.length && {
      hasMeasurement: measurements.map((m) => ({
        "@type": "QuantitativeValue",
        propertyID: m.propertyID,
        value: m.value,
        unitText: m.unitText,
      })),
    }),
    additionalProperty: [
      ...(productLine
        ? [
            {
              "@type": "PropertyValue",
              name: "Product line",
              value: productLine,
            },
          ]
        : []),
      {
        "@type": "PropertyValue",
        name: "Manufacturing standard",
        value: "EN 13706 / ASTM D3917",
      },
      {
        "@type": "PropertyValue",
        name: "Quality system",
        value: "ISO 9001:2015",
      },
      ...additionalProperty.map((item) => ({
        "@type": "PropertyValue",
        name: item.name,
        value: item.value,
      })),
    ],
  };
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
