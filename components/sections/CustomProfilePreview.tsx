import Image from "next/image";
import Link from "next/link";
import Figure from "@/components/ui/Figure";
import LineTag from "@/components/ui/LineTag";
import { buildRfqHref } from "@/lib/rfq";

const steps = [
  [
    "Share your requirements",
    "Send a drawing or target section, service conditions, cut length and quantity.",
  ],
  [
    "Review the profile",
    "Agree the geometry, material, tolerances and connection or machining requirements.",
  ],
  [
    "Confirm tooling and samples",
    "Review the tooling scope and sample inspection before releasing production.",
  ],
];
export default function CustomProfilePreview() {
  return (
    <section className="bg-white py-[48px] md:py-[64px]" aria-labelledby="home-custom">
      <div className="site-container grid items-center gap-[32px] lg:grid-cols-2">
        <Figure number={1} title="Section development" note="Illustration">
          <div className="relative -m-[16px] aspect-[4/3] bg-white">
            <Image
              src="/images/products/custom-frp-profile-engineering-drawing-3d-render.jpg"
              alt="Engineering illustration of a custom pultruded profile and its section drawing"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-contain"
            />
          </div>
        </Figure>
        <div>
          <LineTag line="F1-FORM" label="Custom pultrusion" />
          <h2 id="home-custom" className="mt-[12px] text-[clamp(26px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Custom profiles, made to your drawing
          </h2>
          <ol className="mt-[22px] space-y-[18px]">
            {steps.map(([title, body], index) => (
              <li key={title} className="flex gap-[14px]">
                <span className="text-f14 font-bold text-teal-text">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-bold text-t1">{title}</h3>
                  <p className="mt-[4px] text-f14 leading-relaxed text-t2">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-[24px] flex flex-wrap gap-[20px]">
            <Link
              href={buildRfqHref({
                source: "homepage-custom-process",
                product: "Custom Pultruded Profiles",
                productPath: "/products/custom-pultruded-profiles",
                message:
                  "Please review my drawing and custom profile requirements.\nSection / drawing:\nMaterial or service conditions:\nLength and quantity:\nDelivery destination:",
              })}
              className="inline-flex min-h-[46px] items-center rounded-control bg-teal-text px-[20px] text-f14 font-bold text-white"
            >
              Send your drawing
            </Link>
            <Link
              href="/products/custom-pultruded-profiles"
              className="inline-flex min-h-[46px] items-center text-f14 font-bold text-teal-text"
            >
              Explore custom profiles →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
