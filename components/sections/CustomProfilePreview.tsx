import Image from "next/image";
import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";
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
    <section className="bg-bg2 py-[54px] md:py-[68px]">
      <div className="mx-auto grid max-w-[1320px] items-center gap-[32px] px-[20px] sm:px-[28px] lg:grid-cols-2 lg:px-[36px]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] border border-border-default bg-white">
          <Image
            src="/images/products/custom-frp-profile-engineering-drawing-3d-render.jpg"
            alt="Engineering illustration of a custom pultruded profile and its section drawing"
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-contain"
          />
          <p className="absolute bottom-0 inset-x-0 bg-white/90 px-[18px] py-[10px] text-f12 text-t3">
            Section development illustration
          </p>
        </div>
        <div>
          <SectionTag>Custom pultrusion</SectionTag>
          <h2 className="mt-[12px] text-[clamp(28px,3vw,40px)] font-bold leading-tight text-t1">
            Custom profiles, made to your drawing
          </h2>
          <ol className="mt-[22px] space-y-[18px]">
            {steps.map(([title, body], index) => (
              <li key={title} className="flex gap-[14px]">
                <span className="text-f13 font-bold text-teal-text">
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
              className="inline-flex min-h-[46px] items-center rounded-[7px] bg-teal-text px-[20px] text-f14 font-bold text-white"
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
