import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ThermalExpansionCalculator from "@/components/tools/ThermalExpansionCalculator";
import { THERMAL_MATERIALS } from "@/lib/thermalMovement";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools/thermal-expansion-calculator";
const pageDescription =
  "Work out thermal expansion of pultruded FRP profiles, the movement against steel, concrete or glass, restrained stress and the sealant joint width you need.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Thermal Expansion Calculator | Joints & Movement",
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "What is the thermal expansion coefficient of pultruded FRP?",
    answer:
      "Lengthwise, manufacturer design manuals give about 6 to 11 × 10⁻⁶ per K for E-glass pultruded profiles, close to glass and concrete and below carbon steel (12 × 10⁻⁶/K) and aluminium (23 × 10⁻⁶/K). Crosswise the value is several times higher because the resin controls it. The calculator uses 8 × 10⁻⁶/K lengthwise; replace it with the value declared for the supplied profile when your specification needs it.",
  },
  {
    question: "Why does the fixing substrate matter?",
    answer:
      "A member fixed at both ends to a material that moves differently is strained by the difference, not by its own movement. An FRP rail on a steel platform moves about 4 × 10⁻⁶/K less than the steel, so over a 6 m run and an 80 K range the relative movement is only about 2 mm. An FRP frame against aluminium would see almost four times that.",
  },
  {
    question: "How wide should a sealed joint be?",
    answer:
      "The sealant can only stretch or compress by its movement class, a percentage of the joint width at installation (ISO 11600 and ASTM C920 classes). The minimum width is the larger of the opening and closing movement divided by that percentage. Add construction tolerance and follow the sealant maker's width-to-depth ratio.",
  },
  {
    question: "Which temperatures should I enter?",
    answer:
      "Enter the temperature of the member itself. Dark or sunlit surfaces run well above the shade air temperature, and members in water or indoors stay closer to it. Use the design values that apply to the project, for example EN 1991-1-5 in Europe, and the installation temperature expected on site.",
  },
  {
    question: "Is the restrained stress a design check?",
    answer:
      "No. It is the upper bound E · α · ΔT for a member held rigidly at both ends, without creep relaxation or fixing slip. It shows whether movement has to be provided. A restrained compression member can also buckle, so the usual answer is slotted holes or sliding supports rather than a stronger section.",
  },
];

export default function ThermalExpansionPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Thermal Expansion Calculator",
          url: absoluteUrl(pagePath),
          description: pageDescription,
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          publisher: { "@id": "https://www.f1composite.com/#organization" },
        }}
      />
      <PageHeader
        tag="Tools"
        title="FRP thermal expansion calculator"
        description="How far a pultruded FRP member grows and shrinks between its fixings, how that compares with the steel, concrete or glass it is fixed to, and how wide a sealed joint must be."
        facts={[
          { label: "FRP lengthwise α", value: "8 × 10⁻⁶/K" },
          { label: "Materials", value: String(THERMAL_MATERIALS.length) },
          { label: "Sealant classes", value: "ISO 11600 / ASTM C920" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Thermal expansion" }]}
      />

      <section className="bg-white py-[40px]">
        <div className="site-container">
          <ThermalExpansionCalculator />
        </div>
      </section>

      <section className="bg-bg2 py-[48px]">
        <div className="site-container">
          <h2 className="text-f24 font-bold text-t1">Coefficients used</h2>
          <p className="mt-[8px] max-w-[820px] text-f14 text-t2">
            Free movement is α · L · ΔT. The steel, aluminium, concrete and glass values are the ones given in the
            Eurocodes and EN 572-1. The FRP and PVC-U values are typical published ranges and vary with the glass
            content and resin, so a specification should quote the value declared for the supplied product
            (measured to ASTM E831 or ISO 11359-2).
          </p>
          <div className="mt-[21px] overflow-x-auto rounded-card border border-border-default bg-white">
            <table className="w-full min-w-[640px] text-f14">
              <thead className="bg-bg2 text-left text-t1">
                <tr>
                  <th className="p-[12px]">Material</th>
                  <th className="p-[12px] text-right">α (10⁻⁶/K)</th>
                  <th className="p-[12px] text-right">E (GPa)</th>
                  <th className="p-[12px]">Source</th>
                </tr>
              </thead>
              <tbody>
                {THERMAL_MATERIALS.map((material) => (
                  <tr key={material.id} className="border-t border-border-default">
                    <td className="p-[12px] text-t1">{material.label}</td>
                    <td className="p-[12px] text-right tabular-nums">{material.alpha}</td>
                    <td className="p-[12px] text-right tabular-nums">{material.E}</td>
                    <td className="p-[12px] text-f12 text-t3">{material.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[13px] max-w-[820px] text-f14 text-t2">
            Low movement is one reason FRP window frames stay tight against the glass. See{" "}
            <Link href="/products/frp-window-frames" className="font-semibold text-teal-text underline">FRP window frames</Link>{" "}
            and the{" "}
            <Link href="/technology/frp-u-value-calculator" className="font-semibold text-teal-text underline">window U-value calculator</Link>.
            For spans and loads, use the{" "}
            <Link href="/frp-profile-calculator" className="font-semibold text-teal-text underline">FRP profile calculator</Link>.
          </p>
          <FAQ items={faqs} />
        </div>
      </section>

      <RelatedLinks
        groups={[
          { title: "Other tools", links: [
            { href: "/tools", label: "All engineering tools" },
            { href: "/tools/handrail-load-calculator", label: "Handrail and guardrail load check" },
            { href: "/frp-span-tables", label: "FRP span tables" },
          ] },
          { title: "Products that move with temperature", links: [
            { href: "/products/frp-handrail-systems", label: "FRP handrail systems" },
            { href: "/applications/frp-cable-tray-supports", label: "FRP cable tray supports" },
            { href: "/products/frp-solar-mounting-systems", label: "FRP solar mounting systems" },
          ] },
          { title: "Material data", links: [
            { href: "/resources/technical-data", label: "FRP technical data" },
            { href: "/technology/pultruded-profile-performance", label: "Pultruded profile performance" },
            { href: "/technology/frp-vs-traditional-materials", label: "FRP vs traditional materials" },
          ] },
        ]}
      />
    </>
  );
}
