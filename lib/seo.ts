import type { Metadata } from "next";

const SITE_URL = "https://f1composite.com";

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
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
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

export function buildProductSchema({
  name,
  description,
  path,
  image,
  category,
  material,
  additionalProperty = [],
}: ProductSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: absoluteUrl(path),
    image: [absoluteUrl(image)],
    category,
    brand: {
      "@type": "Brand",
      name: "F1 Composite",
    },
    manufacturer: {
      "@type": "Organization",
      name: "F1 Composite",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
      },
      seller: {
        "@type": "Organization",
        name: "F1 Composite",
      },
    },
    material,
    additionalProperty: additionalProperty.map((item) => ({
      "@type": "PropertyValue",
      name: item.name,
      value: item.value,
    })),
  };
}
