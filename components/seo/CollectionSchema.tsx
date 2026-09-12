import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export default function CollectionSchema({
  name,
  description,
  path,
  links,
}: {
  name: string;
  description: string;
  path: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name,
        description,
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: links.map((link, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: link.label,
            url: absoluteUrl(link.href),
          })),
        },
      }}
    />
  );
}
