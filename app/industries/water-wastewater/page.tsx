import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import waterTreatmentApplication from "@/public/images/industries/frp-pultruded-profiles-water-treatment-rendering.webp";
import PageHeader from "@/components/layout/PageHeader";
import CollectionSchema from "@/components/seo/CollectionSchema";
import { buildPageMetadata } from "@/lib/seo";

const description =
  "FRP profiles and grating for water and wastewater facilities. Review cable supports, access frames, walkways, chemical exposure and component supply scope.";
const zones = [
  {
    zone: "Headworks and screening",
    exposure: "Hydrogen sulfide, high humidity and wash-down",
    parts: "Walkway grating, covers, cable supports",
    note: "Vinyl ester resin and a surface veil are the usual starting point where H₂S builds up under covers.",
  },
  {
    zone: "Aeration and biological basins",
    exposure: "Constant splash and humidity, outdoor UV",
    parts: "Access walkways, handrails, pipe and cable supports",
    note: "Long runs along basin edges make weight and no recoating the main reasons to use FRP.",
  },
  {
    zone: "Clarifiers and settling tanks",
    exposure: "Immersion or splash at the water line",
    parts: "Baffles and plates cut from solid sheet, walkway grating",
    note: "Parts that sit in the water need the resin and cut-edge sealing checked for immersion.",
  },
  {
    zone: "Chemical dosing rooms",
    exposure: "Sodium hypochlorite, ferric chloride, caustic, acids",
    parts: "Platforms, grating, cable trays, equipment frames",
    note: "Send the chemical list with concentrations and temperatures; compatibility is confirmed per chemical.",
  },
  {
    zone: "Sludge handling and digesters",
    exposure: "Hydrogen sulfide, methane, heat",
    parts: "Cable trays and ladders, access frames, grating",
    note: "Non-conductive trays and supports help where electrical isolation near equipment matters.",
  },
];

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
        <div className="site-container">
          <figure className="mb-[40px] overflow-hidden rounded-card border border-border-default bg-bg2">
            <Image
              src={waterTreatmentApplication}
              alt="Concept rendering of gray pultruded FRP beams, columns and bracing supporting a grating access platform with yellow handrails beside wastewater treatment basins"
              sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 56px), (max-width: 1319px) calc(100vw - 72px), 1248px"
              className="h-auto w-full"
            />
            <figcaption className="px-[20px] py-[18px] sm:px-[24px]">
              <p className="text-f18 font-bold text-t1">
                Pultruded FRP profiles in water treatment
              </p>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">
                Application concept showing structural profiles, grating access
                platforms, stairs and handrails around treatment
                basins. Illustrative rendering; final members and connections
                are designed for the project loads and exposure.
              </p>
            </figcaption>
          </figure>
          <h2 className="text-f32 font-bold text-t1">
            Components used around treatment equipment
          </h2>
          <div className="mt-[24px] grid gap-[20px] md:grid-cols-2">
            {uses.map((use) => (
              <article
                key={use.href}
                className="rounded-card border border-border-default bg-bg2 p-[24px]"
              >
                <h3 className="text-f24 font-bold text-t1">{use.label}</h3>
                <p className="mt-[12px] text-f16 leading-relaxed text-t2">
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
          <h2 className="mt-[48px] text-f32 font-bold text-t1">
            FRP around the plant, zone by zone
          </h2>
          <p className="mt-[12px] max-w-[860px] text-f16 leading-relaxed text-t2">
            Exposure changes from one part of a treatment plant to the next, so the parts and the
            resin change too. This is where pultruded FRP is most often used, and what to check in
            each area.
          </p>
          <div className="mt-[20px] overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-f14">
              <thead>
                <tr className="border-b-2 border-border-default text-t1">
                  <th className="py-[10px] pr-[16px] font-bold">Area</th>
                  <th className="py-[10px] pr-[16px] font-bold">Exposure</th>
                  <th className="py-[10px] pr-[16px] font-bold">Typical FRP parts</th>
                  <th className="py-[10px] font-bold">What to check</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((row) => (
                  <tr key={row.zone} className="border-b border-border-default align-top text-t2">
                    <td className="py-[12px] pr-[16px] font-semibold text-t1">{row.zone}</td>
                    <td className="py-[12px] pr-[16px]">{row.exposure}</td>
                    <td className="py-[12px] pr-[16px]">{row.parts}</td>
                    <td className="py-[12px]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[16px] text-f14 leading-relaxed text-t2">
            For cable routes, see how{" "}
            <Link href="/resources/blog/frp-cable-tray-specifications-advantages" className="font-semibold text-teal-text">
              to specify FRP cable tray
            </Link>
            ; for walkways, the{" "}
            <Link href="/resources/blog/frp-grating-vs-steel-grating-cost-comparison" className="font-semibold text-teal-text">
              grating lifecycle cost example
            </Link>{" "}
            compares FRP with galvanized steel. Solid{" "}
            <Link href="/products/fiberglass-sheets" className="font-semibold text-teal-text">
              fiberglass sheet
            </Link>{" "}
            is cut to size for baffles and cover plates.
          </p>

          <div className="mt-[36px] grid gap-[30px] md:grid-cols-2">
            <div>
              <h2 className="text-f24 font-bold text-t1">
                Specify the actual exposure
              </h2>
              <p className="mt-[12px] text-f16 leading-relaxed text-t2">
                Do not select a resin from the word wastewater alone. Provide
                the chemicals and concentrations, temperature, immersion or
                splash conditions, cleaning agents and outdoor exposure. Resin
                compatibility, reinforcement, surface veil and cut-edge
                protection are reviewed together. A material suitable for one
                treatment zone may not suit another.
              </p>
              <p className="mt-[12px] text-f16 leading-relaxed text-t2">
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
              <p className="mt-[12px] text-f16 leading-relaxed text-t2">
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
