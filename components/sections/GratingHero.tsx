import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import ProductPageNav from "@/components/products/ProductPageNav";
import Figure from "@/components/ui/Figure";
import { type GratingFamily } from "@/lib/gratingInquiry";

// The grating pages' header in the product page template: F1-GRID line tag,
// key facts, the panel photograph in a figure plate, and the sticky section
// bar. The quote button opens the drawing route of the project planner.
export default function GratingHero({ family, title, description, image, imageAlt, caption, facts }: {
  family?: GratingFamily;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  caption: string;
  facts: readonly { label: string; value: string }[];
}) {
  const specifications = family ? `${family}-grating-specifications` : "grating-configurations";
  const figure = family ? (
    <Figure number={1} title={family === "molded" ? "Molded mesh" : "Pultruded bearing bars"} note="Photo" caption={caption}>
      <div className="relative -m-[16px] aspect-[3/2]">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
      </div>
    </Figure>
  ) : (
    <Figure number={1} title="Two constructions" note="Photos · not to a common scale" caption="Compare the integral molded mesh with directional pultruded bars.">
      <div className="-m-[16px] grid grid-cols-2 gap-[2px] bg-border-default">
        {[
          ["/images/products/molded-frp-grating/molded-grating-grit-mesh-closeup.webp", "Molded square mesh"],
          ["/images/products/pultruded-frp-grating/pultruded-grating-t-bar-closeup.webp", "Pultruded bearing bars"],
        ].map(([src, label]) => (
          <div key={src} className="relative aspect-[4/3] bg-white">
            <Image src={src} alt={label} fill sizes="(max-width: 1023px) 46vw, 22vw" className="object-cover" preload />
            <span className="absolute inset-x-0 bottom-0 bg-deep/90 px-[10px] py-[6px] text-f14 font-bold text-white">{label}</span>
          </div>
        ))}
      </div>
    </Figure>
  );
  return (
    <>
      <PageHeader
        tag="FRP Grating"
        line={{ name: "F1-GRID", label: family ? `${family} grating` : "Grating" }}
        title={title}
        description={description}
        facts={[...facts]}
        figure={figure}
        actions={{
          primary: { label: "Get a Project Quote", href: "#grating-quote" },
          secondary: { label: "Help Me Select", href: "#grating-help", variant: "secondary" },
          note: "Whole panels or drawing-based requirements. Quantities, fabrication and delivery scope confirmed with your quote.",
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          ...(family ? [{ label: "FRP Grating", href: "/products/grating" }, { label: family === "molded" ? "Molded Grating" : "Pultruded Grating" }] : [{ label: "FRP Grating" }]),
        ]}
      />
      <ProductPageNav
        items={[
          { id: specifications, label: "Specifications" },
          { id: "grating-selection", label: "Selection guide" },
          { id: "grating-engineering", label: "Engineering & downloads" },
          { id: "grating-supply", label: "Supply & delivery" },
          { id: "grating-faq", label: "FAQ" },
        ]}
      />
    </>
  );
}
