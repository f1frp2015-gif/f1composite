import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import PassiveHouseWizard from "./PassiveHouseWizard";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Passive House Window Selector — PHI-Certified FRP Frame Tool (U_w 0.78)",
  description:
    "Free AI-powered passive house window selector. Enter your climate zone, target U-value, and window type — get the PHI-certified F1 Composite FRP fenestration series (Component-ID 2491wi03, U_w 0.78), U_w calc guidance, and matching case studies. No login.",
  path: "/ai/passive-house",
});

export default function PassiveHousePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Passive House Window Selector — F1 Composite",
    url: absoluteUrl("/ai/passive-house"),
    description:
      "Free AI-powered passive house fenestration selector — matches PHI climate class, target U-value, and building typology to F1 Composite PHI-certified FRP window series. No login required.",
    applicationCategory: "EngineeringApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@id": "https://www.f1composite.com/#organization",
      "@type": "Organization",
      name: "F1 Composite",
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[900px] px-[21px]">
          <div className="text-center">
            <span className="inline-block rounded-full bg-teal-bg px-[13px] py-[5px] text-f11 font-bold uppercase tracking-[2px] text-teal-text">
              Free · PHI Component-ID 2491wi03 · Class A+ / phA · No Login
            </span>
            <h1 className="mt-[13px] text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
              Free Passive House Window Selector
              <br />
              <span className="text-teal-text">Tell us your climate. We&rsquo;ll spec the FRP frame.</span>
            </h1>
            <p className="mt-[16px] mx-auto max-w-[640px] text-f15 leading-golden text-t2">
              Passive house fenestration has strict thermal, acoustic, and airtightness targets by
              climate zone. Answer 4 questions — our AI matches you, free, to the right F1 Composite
              PHI-certified FRP frame series (90 Series at U_w 0.78) and references a comparable
              certified project.
            </p>
          </div>

          <PassiveHouseWizard />

          <div className="mt-[55px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
            <h3 className="text-f15 font-bold text-t1">
              Why FRP instead of thermally broken aluminum for passive house?
            </h3>
            <div className="mt-[13px] grid gap-[13px] sm:grid-cols-2">
              <div>
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                  Thermal bridging
                </div>
                <p className="mt-[4px] text-f13 leading-golden text-t2">
                  FRP has no metallic path. Pultruded GFRP thermal conductivity ≈ 0.3 W/m·K vs steel
                  52, aluminum 160. No &ldquo;thermal break insert&rdquo; to fail at cold.
                </p>
              </div>
              <div>
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                  PHI Arctic certification
                </div>
                <p className="mt-[4px] text-f13 leading-golden text-t2">
                  Our 90-series is certified by Passive House Institute Darmstadt at phA (arctic)
                  climate class — the ceiling of the standard. Deployed at{" "}
                  <Link href="/case-studies/qinling-station-antarctic-passive-windows" className="font-semibold text-teal-text hover:underline">
                    Qinling Station, Antarctic Ross Sea
                  </Link>
                  .
                </p>
              </div>
              <div>
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                  No repainting
                </div>
                <p className="mt-[4px] text-f13 leading-golden text-t2">
                  Pigment is in-profile, not applied. UV-stable across a 25+ year service life in
                  coastal and high-altitude exposure.
                </p>
              </div>
              <div>
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                  Coastal durability
                </div>
                <p className="mt-[4px] text-f13 leading-golden text-t2">
                  Salt-air corrosion-free. Validated at{" "}
                  <Link href="/case-studies/yancheng-talent-apartment-fenestration" className="font-semibold text-teal-text hover:underline">
                    Yancheng Talent Apartment
                  </Link>{" "}
                  (Jiangsu coast, ~20 buildings).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[21px] flex flex-wrap gap-[21px]">
            <Link href="/products/fenestration-systems" className="text-f13 font-semibold text-teal-text hover:underline">
              → Full fenestration product page
            </Link>
            <Link href="/technology/u-value-calculator" className="text-f13 font-semibold text-teal-text hover:underline">
              → U-Value calculator (EN ISO 10077-1)
            </Link>
            <Link href="/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf" className="text-f13 font-semibold text-teal-text hover:underline" target="_blank" rel="noopener noreferrer">
              → Download PHI certificate (PDF)
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
