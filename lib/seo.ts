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
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: "F1 Composite",
      url: SITE_URL,
    },
    isRelatedTo: {
      "@type": "Product",
      name: "Pultruded FRP Profiles",
      url: absoluteUrl("/pultruded-frp-profiles"),
    },
    offers: {
      "@type": "AggregateOffer",
      url: absoluteUrl("/contact"),
      priceCurrency: "USD",
      lowPrice: "5",
      highPrice: "300",
      offerCount: "100",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      businessFunction: "http://purl.org/goodrelations/v1#Sell",
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        unitText: "linear meter",
      },
      seller: {
        "@id": `${SITE_URL}/#organization`,
        "@type": "Organization",
        name: "F1 Composite",
      },
    },
    material,
    hasMeasurement: [
      {
        "@type": "QuantitativeValue",
        propertyID: "density",
        value: "1.9",
        unitText: "g/cm^3",
      },
      {
        "@type": "QuantitativeValue",
        propertyID: "thermal conductivity",
        value: "0.3",
        unitText: "W/(m·K)",
      },
    ],
    additionalProperty: [
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
