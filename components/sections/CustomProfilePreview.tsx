import Image from "next/image";
import Button from "@/components/ui/Button";
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
        <Figure number={1} title="From section drawing to profile" bleed>
          <Image
            src="/images/products/custom-frp-profile-drawing-3d-view.webp"
            alt="Toleranced drawing of a two-cell custom pultruded profile beside a 3D view of the finished profile"
            width={800}
            height={517}
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="h-auto w-full"
          />
        </Figure>
        <div>
          <LineTag line="F1-FORM" label="Custom pultrusion" />
          <h2 id="home-custom" className="mt-[12px] text-[clamp(26px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Custom profiles, made to your drawing
          </h2>
          <ol className="mt-[20px] divide-y divide-border-default border-y border-border-default">
            {steps.map(([title, body], index) => (
              <li key={title} className="py-[14px]">
                <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p>
                <h3 className="mt-[4px] text-f16 font-bold text-t1">{title}</h3>
                <p className="mt-[4px] text-f14 leading-golden text-t2">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-[24px] flex flex-wrap items-center gap-[16px]">
            <Button
              href={buildRfqHref({
                source: "homepage-custom-process",
                product: "Custom Pultruded Profiles",
                productPath: "/products/custom-pultruded-profiles",
                message:
                  "Please review my drawing and custom profile requirements.\nSection / drawing:\nMaterial or service conditions:\nLength and quantity:\nDelivery destination:",
              })}
            >
              Send your drawing
            </Button>
            <Button href="/products/custom-pultruded-profiles" variant="text">
              Explore custom profiles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
