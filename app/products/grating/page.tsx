import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import CollectionSchema from "@/components/seo/CollectionSchema";
import { buildPageMetadata } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

const description =
  "Compare molded and pultruded FRP grating by construction, span direction, mesh, surface and resin. Find fiberglass grating specifications and quotation inputs.";
const links = [
  {
    label: "Molded FRP Grating",
    href: "/products/molded-frp-grating",
    image:
      "/images/products/molded-frp-grating/molded-grating-coastal-walkway.webp",
    body: "An integrally molded grid. Compare mesh openings, panel thickness, resin and surface options for the supported panel layout.",
  },
  {
    label: "Pultruded FRP Grating",
    href: "/products/frp-gratings",
    image:
      "/images/products/pultruded-frp-grating/pultruded-grating-rooftop-walkway.webp",
    body: "Pultruded bearing bars joined by cross-rods. Select bearing-bar direction, bar geometry and panel dimensions for the required span and loading.",
  },
];
export const metadata: Metadata = buildPageMetadata({
  title: "FRP Grating: Molded vs Pultruded | F1 Composite",
  description,
  path: "/products/grating",
});
export default function GratingPage() {
  return (
    <>
      <CollectionSchema
        name="FRP Grating"
        description={description}
        path="/products/grating"
        links={links}
      />
      <PageHeader
        tag="FRP Grating"
        title="Molded & pultruded FRP grating"
        description="Fiberglass grating, also called GRP grating, is supplied as molded panels or assembled pultruded bearing-bar panels. Choose the construction around the support layout, loading, openings and service environment."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          { label: "FRP Grating" },
        ]}
      />
      <section className="bg-white py-[48px]">
        <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
          <h2 className="text-f31 font-bold text-t1">
            Two constructions, separate specifications
          </h2>
          <div className="mt-[24px] grid gap-[24px] md:grid-cols-2">
            {links.map((item) => (
              <article
                key={item.href}
                className="overflow-hidden rounded-[12px] border border-border-default"
              >
                <Link href={item.href} className="relative block aspect-[16/9]">
                  <Image
                    src={item.image}
                    alt={item.label + " installed as a walking surface"}
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="object-cover"
                  />
                </Link>
                <div className="p-[24px]">
                  <h3 className="text-f24 font-bold text-t1">{item.label}</h3>
                  <p className="mt-[12px] text-f15 leading-relaxed text-t2">
                    {item.body}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-[18px] inline-block text-f14 font-bold text-teal-text"
                  >
                    View specifications →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-[36px] overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-f14">
              <caption className="pb-[16px] text-left text-f24 font-bold text-t1">
                Molded vs pultruded grating
              </caption>
              <thead>
                <tr className="bg-bg2">
                  {[
                    "Selection question",
                    "Molded grating",
                    "Pultruded grating",
                  ].map((label) => (
                    <th key={label} scope="col" className="p-[16px]">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "How is it made?",
                    "Glass reinforcement and resin form an integral grid in a mold.",
                    "Continuous pultruded bearing bars are joined with cross-rods.",
                  ],
                  [
                    "Which direction spans?",
                    "Square-mesh panels can support two-direction layouts; verify the selected panel's load data.",
                    "Bearing bars carry the main span. Cross-rod direction is not an equivalent load-bearing span.",
                  ],
                  [
                    "What geometry is specified?",
                    "Mesh opening, panel thickness, panel dimensions and edge support.",
                    "Bearing-bar shape, depth, spacing, cross-rod layout and panel dimensions.",
                  ],
                  [
                    "What controls selection?",
                    "Loading, support, cutouts, allowable deflection, resin and surface.",
                    "The same project checks, plus correct bearing-bar orientation.",
                  ],
                ].map(([question, molded, pultruded]) => (
                  <tr key={question} className="border-b border-border-default">
                    <th scope="row" className="p-[16px] font-semibold text-t1">
                      {question}
                    </th>
                    <td className="p-[16px] text-t2">{molded}</td>
                    <td className="p-[16px] text-t2">{pultruded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-[32px] grid gap-[28px] md:grid-cols-2">
            <div>
              <h2 className="text-f24 font-bold text-t1">
                Send a panel layout for quotation
              </h2>
              <p className="mt-[12px] text-f15 leading-relaxed text-t2">
                Include clear spans, support locations, load type, allowable
                deflection, panel dimensions, cutouts and quantities. State the
                chemical environment, temperature, fire requirements and desired
                surface. Confirm fixing clips, cut-edge treatment and delivery
                scope with the selected panel.
              </p>
              <Link
                href={buildRfqHref({
                  source: "grating-comparison",
                  product: "FRP Grating",
                  productPath: "/products/grating",
                  message:
                    "Please review my grating layout.\nMolded or pultruded:\nPanel dimensions and thickness:\nSupport span and loading:\nResin / service environment / surface:\nQuantity and destination:",
                })}
                className="mt-[18px] inline-block font-bold text-teal-text"
              >
                Request a grating quote →
              </Link>
            </div>
            <div>
              <h2 className="text-f24 font-bold text-t1">
                Related products and applications
              </h2>
              <p className="mt-[12px] text-f15 leading-relaxed text-t2">
                Grating is an open walking surface. Closed deck profiles and
                thin stair-tread covers have different geometry and support
                requirements; select them on their own product pages.
              </p>
              <ul className="mt-[18px] space-y-[12px] text-f14 text-teal-text">
                <li>
                  <Link href="/products/frp-stair-treads">
                    Grating treads and tread covers →
                  </Link>
                </li>
                <li>
                  <Link href="/products/frp-deck-panels">
                    Structural deck profiles →
                  </Link>
                </li>
                <li>
                  <Link href="/applications/frp-chemical-plant-platforms">
                    Platforms and walkways →
                  </Link>
                </li>
                <li>
                  <Link href="/industries/water-wastewater">
                    Water and wastewater applications →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
