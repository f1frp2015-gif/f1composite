import type { Metadata } from "next";

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
    title,
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
    offers: priceRange
      ? {
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
        }
      : {
          // Quote-only product. We assert that F1 sells it and it is in stock,
          // but do NOT fabricate a price — B2B pricing is per-RFQ. Pass a real
          // `priceRange` to emit an AggregateOffer with actual numbers.
          "@type": "Offer",
          url: absoluteUrl("/contact"),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          seller: {
            "@id": `${SITE_URL}/#organization`,
            "@type": "Organization",
            name: "F1 Composite",
          },
        },
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
