import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import CollectionSchema from "@/components/seo/CollectionSchema";
import { buildPageMetadata } from "@/lib/seo";

const description =
  "FRP profiles and grating for water and wastewater facilities. Review cable supports, access frames, walkways, chemical exposure and component supply scope.";
const uses = [
  {
    label: "Cable Tray Supports",
    href: "/applications/frp-cable-tray-supports",
    body: "Channels, angles and brackets can support cable routes near treatment equipment. Specify cable weight, support spacing, attachments and future capacity alongside the environment.",
  },
  {
    label: "Platforms & Access Frames",
    href: "/applications/frp-chemical-plant-platforms",
    body: "Beams, posts and bracing form equipment-access frames. Connections, concentrated loads, vibration and support conditions need to be checked separately from the member's bending capacity.",
  },
  {
    label: "Walkway Grating",
    href: "/products/grating",
    body: "Molded and pultruded panels provide different grid constructions. Define panel support, span direction, openings, slip-resistance requirements and fixing details.",
  },
  {
    label: "Handrail Components",
    href: "/products/frp-handrail-systems",
    body: "Rail and post sections can be supplied for edge protection. Confirm the guard geometry, connections, applicable project criteria and any assembly scope.",
  },
];
export const metadata: Metadata = buildPageMetadata({
  title: "FRP for Water & Wastewater | Profiles & Grating",
  description,
  path: "/industries/water-wastewater",
});
export default function WaterIndustryPage() {
  return (
    <>
      <CollectionSchema
        name="FRP for Water & Wastewater"
        description={description}
        path="/industries/water-wastewater"
        links={uses}
      />
      <PageHeader
        tag="Industries"
        title="FRP profiles for water & wastewater facilities"
        description="Water and wastewater projects use pultruded profiles and grating for cable supports, equipment access and walking surfaces. F1 supplies the specified profiles, panels and agreed fabricated components; treatment equipment and complete civil works are separate scopes."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Water & Wastewater" },
        ]}
      />
      <section className="bg-white py-[48px]">
        <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
          <h2 className="text-f31 font-bold text-t1">
            Components used around treatment equipment
          </h2>
          <div className="mt-[24px] grid gap-[20px] md:grid-cols-2">
            {uses.map((use) => (
              <article
                key={use.href}
                className="rounded-[10px] border border-border-default bg-bg2 p-[24px]"
              >
                <h3 className="text-f24 font-bold text-t1">{use.label}</h3>
                <p className="mt-[12px] text-f15 leading-relaxed text-t2">
                  {use.body}
                </p>
                <Link
                  href={use.href}
                  className="mt-[16px] inline-block text-f14 font-bold text-teal-text"
                >
                  Review components →
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-[36px] grid gap-[30px] md:grid-cols-2">
            <div>
              <h2 className="text-f24 font-bold text-t1">
                Specify the actual exposure
              </h2>
              <p className="mt-[12px] text-f15 leading-relaxed text-t2">
                Do not select a resin from the word wastewater alone. Provide
                the chemicals and concentrations, temperature, immersion or
                splash conditions, cleaning agents and outdoor exposure. Resin
                compatibility, reinforcement, surface veil and cut-edge
                protection are reviewed together. A material suitable for one
                treatment zone may not suit another.
              </p>
              <p className="mt-[12px] text-f15 leading-relaxed text-t2">
                Document operating and maintenance loads, panel support and
                attachment details. Fire and electrical requirements belong to
                the offered material and assembly, rather than to fiberglass as
                a universal category.
              </p>
            </div>
            <div>
              <h2 className="text-f24 font-bold text-t1">
                Separate material and fabrication scope
              </h2>
              <p className="mt-[12px] text-f15 leading-relaxed text-t2">
                Identify raw lengths, cut and drilled profiles, grating panels,
                fixing hardware and any agreed assemblies on the bill of
                materials. Include drawings, quantities, tolerances, inspection
                documents and destination. The quote should state who designs
                and installs the final structure.
              </p>
              <ul className="mt-[18px] space-y-[12px] text-f14 font-semibold text-teal-text">
                <li>
                  <Link href="/products/fiberglass-structural-shapes">
                    Standard profile catalog →
                  </Link>
                </li>
                <li>
                  <Link href="/products/custom-pultruded-profiles">
                    Custom sections →
                  </Link>
                </li>
                <li>
                  <Link href="/technology/pultrusion-resin-systems">
                    Material and resin selection →
                  </Link>
                </li>
                <li>
                  <Link href="/resources/evidence">
                    Technical references and report scope →
                  </Link>
                </li>
                <li>
                  <Link href="/contact?source=water-wastewater&inquiry_type=rfq">
                    Discuss your component schedule →
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
