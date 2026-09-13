import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import { doorThresholds as page } from "@/content/data/doorThresholds";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  image: "/images/products/door-thresholds/fiberglass-door-threshold-social.png",
});

const wrap = "mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]";
const quote = buildRfqHref({
  source: "door-thresholds",
  product: "F1 Fiberglass Door Thresholds",
  productPath: page.path,
  message: page.message,
});

export default function DoorThresholdsPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({
        name: page.h1,
        description: page.description,
        path: page.path,
        image: page.image,
        category: "Windows & Doors",
        material: "Pultruded glass-fiber-reinforced polymer (FRP / GRP)",
        schemaType: "ItemPage",
      })} />
      <PageHeader
        tag="F1 Composite · Windows & Doors"
        title={page.h1}
        description={page.intro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          { label: "Windows & Doors", href: "/products/frp-window-frames" },
          { label: "Fiberglass Door Thresholds" },
        ]}
        actions={{
          primary: { label: "Request a Threshold Quote", href: quote },
          secondary: { label: "Explore the Section", href: "#threshold-design" },
        }}
      />

      <section id="threshold-design" className="scroll-mt-[110px] bg-white py-[48px] md:py-[64px]">
        <div className={`${wrap} grid items-center gap-[32px] lg:grid-cols-[1.35fr_1fr]`}>
          <figure className="min-w-0">
            <Image
              src={page.image}
              alt={page.profileVariants[3].alt}
              width={1440}
              height={1098}
              sizes="(max-width: 1024px) 100vw, 55vw"
              loading="eager"
              className="h-auto w-full rounded-[14px]"
            />
            <figcaption className="mt-[12px] text-f12 leading-relaxed text-t3">
              F1 profile illustration. Dimensions, wall thicknesses and mating interfaces are confirmed on the approved section drawing.
            </figcaption>
          </figure>
          <div>
            <SectionTag>A specific application of pultrusion</SectionTag>
            <h2 className="mt-[16px] text-f31 font-bold leading-tight text-t1">The base of a well-detailed door</h2>
            <p className="mt-[16px] text-f15 leading-relaxed text-t2">
              Continuous glass reinforcement and resin form a constant-section sill profile.
              Hollow chambers, support webs and mating features can be developed around
              the opening rather than selected as an unrelated trim piece.
            </p>
            <dl className="mt-[24px] divide-y divide-border-default border-y border-border-default">
              {[
                ["Material role", "A composite base that can help reduce heat conduction through the sill."],
                ["System role", "An interface between the door frame, seals, drainage and supported floor edge."],
                ["Supply role", "Profile lengths and agreed machining for your fabrication process."],
              ].map(([title, body]) => (
                <div key={title} className="py-[14px]">
                  <dt className="text-f13 font-bold text-teal-text">{title}</dt>
                  <dd className="mt-[5px] text-f15 leading-relaxed text-t2">{body}</dd>
                </div>
              ))}
            </dl>
            <Link href="/products/custom-pultruded-profiles" className="mt-[20px] inline-block text-f14 font-bold text-teal-text underline-offset-4 hover:underline">
              Explore custom profile development →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[48px] md:py-[64px]" aria-labelledby="profile-configurations">
        <div className={wrap}>
          <SectionTag>Threshold profile configurations</SectionTag>
          <h2 id="profile-configurations" className="mt-[16px] text-f31 font-bold text-t1">Four continuous sill sections</h2>
          <p className="mt-[16px] max-w-[800px] text-f15 leading-relaxed text-t2">
            Compare closed and hooked bases for inward- and outward-opening door layouts.
            Each profile has a constant cross-section: chambers, steps and ribs run along its full length.
            Final selection depends on the mating frame and installation drawing.
          </p>
          <div className="mt-[28px] grid gap-[24px] md:grid-cols-2">
            {page.profileVariants.map((item) => (
              <figure key={item.id} className="overflow-hidden rounded-[14px] border border-border-default bg-white">
                <a href={`/images/products/door-thresholds/fiberglass-door-threshold-${item.id}.webp`} aria-label={`View full-size ${item.title.toLowerCase()} profile`}>
                  <Image
                    src={`/images/products/door-thresholds/fiberglass-door-threshold-${item.id}.webp`}
                    alt={item.alt}
                    width={1440}
                    height={1098}
                    sizes="(max-width: 768px) 100vw, (max-width: 1320px) 50vw, 624px"
                    className="h-auto w-full object-contain"
                  />
                </a>
                <figcaption className="p-[24px]">
                  <h3 className="text-f20 font-bold text-t1">{item.title}</h3>
                  <p className="mt-[10px] text-f14 leading-relaxed text-t2">{item.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-[20px] text-f12 leading-relaxed text-t3">Illustrative section options. Seals, end blocks and other assembly components are specified separately.</p>
        </div>
      </section>

      <section className="bg-white py-[48px] md:py-[64px]">
        <div className={wrap}>
          <SectionTag>Door threshold applications</SectionTag>
          <h2 className="mt-[16px] text-f31 font-bold text-t1">Choose the opening before the section</h2>
          <div className="mt-[28px] grid gap-[20px] lg:grid-cols-3">
            {page.applications.map((item, index) => (
              <article key={item.title} className="flex flex-col rounded-[12px] border border-border-default bg-white p-[26px]">
                <span className="text-f13 font-bold uppercase tracking-[0.08em] text-teal-text">0{index + 1} / {item.tag}</span>
                <h3 className="mt-[20px] text-f24 font-bold leading-tight text-t1">{item.title}</h3>
                <p className="mt-[14px] flex-1 text-f15 leading-relaxed text-t2">{item.body}</p>
                <p className="mt-[24px] border-t border-border-default pt-[16px] text-f12 font-semibold leading-relaxed text-t2">{item.inputs}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[48px] md:py-[64px]">
        <div className={`${wrap} grid items-center gap-[32px] lg:grid-cols-2`}>
          <div>
            <SectionTag>From profile to entrance</SectionTag>
            <h2 className="mt-[16px] text-f31 font-bold leading-tight text-t1">Detail the whole sill connection</h2>
            <p className="mt-[16px] text-f15 leading-relaxed text-t2">
              A fiberglass threshold works as part of the door assembly. Develop the
              section together with the frame and installation detail so the sealing,
              drainage and load paths remain continuous at the bottom of the opening.
            </p>
            <ol className="mt-[24px] space-y-[18px]">
              {[
                ["Match the frame", "Check jamb feet, corners, end blocks and seal compression against mating drawings."],
                ["Plan the water path", "Coordinate exterior fall, outlets, end sealing and the sill-to-building interface."],
                ["Support the loads", "Define bearing beneath the threshold, fixings and concentrated loads from tracks or traffic."],
                ["Verify the assembly", "Review thermal, air, water and access requirements for the proposed door and installation."],
              ].map(([title, body], index) => (
                <li key={title} className="flex gap-[14px]">
                  <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-bg2 text-f13 font-bold text-teal-text">{index + 1}</span>
                  <div><h3 className="text-f15 font-bold text-t1">{title}</h3><p className="mt-[4px] text-f14 leading-relaxed text-t2">{body}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <figure className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-bg2">
              <Image
                src="/images/products/door-thresholds/garden-door-opening-application.webp"
                alt="Glazed doors opening from an interior to a planted courtyard"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-[12px] text-f12 leading-relaxed text-t3">
              Application context; the pictured doors are not an F1 installation.
              Photo by <a href="https://unsplash.com/photos/open-glass-doors-reveal-a-lush-green-courtyard-garden-4_Dzj4pqbcg" className="underline underline-offset-2">强 任 / Unsplash</a>, used under the <a href="https://unsplash.com/license" className="underline underline-offset-2">Unsplash License</a>.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="specification" className="scroll-mt-[110px] bg-bg2 py-[48px] md:py-[64px]">
        <div className={`${wrap} grid gap-[32px] lg:grid-cols-2`}>
          <div>
            <SectionTag>Profile supply & customization</SectionTag>
            <h2 className="mt-[16px] text-f31 font-bold text-t1">Specify your F1 threshold</h2>
            <p className="mt-[16px] text-f15 leading-relaxed text-t2">{page.scope}</p>
            <div className="mt-[24px] rounded-[12px] border border-border-default bg-white p-[24px]">
              <h3 className="text-f19 font-bold text-t1">From drawing to repeat supply</h3>
              <p className="mt-[12px] text-f15 leading-relaxed text-t2">
                Start with the mating section and purchase requirements. F1 reviews
                tooling and material selection, agrees the sample inspection criteria,
                then confirms the production and delivery scope in the quotation.
              </p>
              <p className="mt-[12px] text-f14 leading-relaxed text-t2">
                Confirm the required laminate data and door-system evidence during
                development. Performance of a complete door cannot be inferred from
                a threshold profile alone.
              </p>
            </div>
          </div>
          <div className="rounded-[12px] border border-border-default bg-white p-[24px] sm:p-[30px]">
            <h3 className="text-f24 font-bold text-t1">Send these details with your drawing</h3>
            <ul className="mt-[20px] list-disc space-y-[12px] pl-[20px] text-f14 leading-relaxed text-t2">
              {page.checklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Button href={quote} className="mt-[26px]">Request a Threshold Quote</Button>
          </div>
        </div>
      </section>

      <section className="bg-white pb-[64px] pt-[1px]">
        <div className={wrap}>
          <FAQ title="Fiberglass door threshold questions" items={[...page.faq]} />
          <div className="mt-[40px] border-t border-border-default pt-[28px]">
            <h2 className="text-f19 font-bold text-t1">Continue with the matching product or tool</h2>
            <ul className="mt-[18px] grid gap-[14px] text-f14 font-semibold text-teal-text sm:grid-cols-2">
              {[
                ["Window & door profiles for fabricators", "/products/window-door-profiles"],
                ["Pultruded FRP profiles overview", "/pultruded-frp-profiles"],
                ["Finished fiberglass windows & doors", "/products/fiberglass-windows-doors"],
                ["FRP density & weight-per-metre calculator", "/frp-density-calculator"],
              ].map(([label, href]) => <li key={href}><Link href={href} className="underline-offset-4 hover:underline">{label} →</Link></li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
