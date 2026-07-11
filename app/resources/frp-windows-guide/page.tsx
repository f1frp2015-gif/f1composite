import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { blogPosts } from "@/content/data/blogPosts";

/**
 * Pillar hub for the window / fenestration content cluster — the site's
 * strongest commercial query family ("frp window(s)", "frp window frames").
 * Organizes the window blog posts by buyer-journey stage and routes each
 * stage to its tools, comparison pages, and the fenestration product page.
 * Data-driven: cards pull title/excerpt/readTime from blogPosts by slug.
 */

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Windows Guide: Selection, U-Value, Certification",
  description:
    "The complete FRP window library — frame selection, U-value targets, PHI / NAFS / AS 2047 certification, supplier qualification & fabrication, by buyer journey.",
  path: "/resources/frp-windows-guide",
});

interface Stage {
  step: string;
  title: string;
  description: string;
  slugs: string[];
  links: Array<{ href: string; label: string }>;
}

const stages: Stage[] = [
  {
    step: "1",
    title: "Decide the frame material",
    description:
      "Why specifiers move from aluminum or PVC to pultruded fiberglass — and when they should not.",
    slugs: [
      "frp-vs-aluminum-window-frames-comparison",
      "aluminum-window-condensation-cold-climate",
    ],
    links: [
      { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum windows — master comparison" },
      { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC windows" },
      { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion windows (GFRP-PU)" },
    ],
  },
  {
    step: "2",
    title: "Hit the thermal target",
    description:
      "Whole-window U-value engineering: frames, glazing, spacers, and thermal-break strategy.",
    slugs: [
      "frp-fenestration-thermal-performance",
      "frp-thermal-break-profiles-curtain-wall",
    ],
    links: [
      { href: "/technology/u-value-calculator", label: "Free U-value calculator (EN ISO 10077-1)" },
      { href: "/ai/passive-house", label: "Passive House AI advisor" },
    ],
  },
  {
    step: "3",
    title: "Certify and comply",
    description:
      "The certification stack by market: PHI component certification, NAFS, hurricane zones, AS 2047.",
    slugs: [
      "frp-fenestration-passivhaus-certification",
      "frp-windows-hurricane-wind-borne-debris-resistance",
      "gfrp-fenestration-australian-market-as2047",
      "frp-lift-sliding-door-as2047-engineering",
    ],
    links: [
      { href: "/regions/frp-passive-house-windows-canada", label: "Canada — passive house windows" },
      { href: "/regions/frp-passive-house-windows-germany", label: "Germany — Passivhaus supply" },
      { href: "/regions/grp-windows-uk", label: "UK — GRP windows" },
    ],
  },
  {
    step: "4",
    title: "Source and fabricate",
    description:
      "Qualifying a profile supplier, decomposing quotes, and running fiberglass lineals through a window shop.",
    slugs: [
      "qualify-chinese-fiberglass-window-profile-supplier",
      "fiberglass-window-profile-price-drivers",
      "fabricating-fiberglass-window-lineals-switching-guide",
      "frp-window-profiles-powder-coating-aluminum-finish",
      "frp-window-finish-transverse-reinforcement",
    ],
    links: [
      { href: "/products/fenestration-systems", label: "F1 fenestration systems (65–90 series)" },
      { href: "/products/window-reinforcement-profiles", label: "Window reinforcement profiles" },
      { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "How to choose an FRP supplier" },
    ],
  },
  {
    step: "+",
    title: "Beyond windows: curtain wall",
    description:
      "The same thermal physics at facade scale — FRP isolators, mullions and transoms.",
    slugs: ["frp-curtain-wall-mullion-transom-carbon-glass-hybrid-pultrusion"],
    links: [
      { href: "/products/facade-sunshade-panels", label: "Facade & sunshade panels" },
    ],
  },
];

const caseStudies = [
  { href: "/case-studies/qinling-station-antarctic-passive-windows", label: "Qinling Station, Antarctica — passive windows at −40 °C" },
  { href: "/case-studies/yancheng-talent-apartment-fenestration", label: "Yancheng talent apartments — 11,000 m² fenestration" },
  { href: "/case-studies/fenestration-residential", label: "Residential fenestration retrofit" },
];

const postBySlug = new Map(blogPosts.map((p) => [p.slug, p]));

export default function FrpWindowsGuidePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "FRP Windows Guide — the complete library",
          url: absoluteUrl("/resources/frp-windows-guide"),
          about: [
            { "@type": "Thing", name: "Fiberglass windows" },
            { "@type": "Thing", name: "FRP fenestration" },
          ],
          hasPart: stages.flatMap((s) =>
            s.slugs
              .map((slug) => postBySlug.get(slug))
              .filter(Boolean)
              .map((p) => ({
                "@type": "Article",
                headline: p!.title,
                url: absoluteUrl(`/resources/blog/${p!.slug}`),
              })),
          ),
        }}
      />
      <PageHeader
        tag="Buyer Journey Library"
        title="The FRP Windows Guide"
        description="Everything on this site about fiberglass windows and doors — 14 articles, 2 free tools, 5 comparison pages and 3 project case studies — organized in the order a fenestration project actually asks the questions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "FRP Windows Guide" },
        ]}
      />

      <section className="bg-white pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="space-y-[55px]">
            {stages.map((stage) => (
              <div key={stage.title}>
                <div className="flex items-baseline gap-[13px]">
                  <span className="text-f24 font-extrabold text-teal" aria-hidden="true">
                    {stage.step}
                  </span>
                  <div>
                    <h2 className="text-f24 font-bold text-t1">{stage.title}</h2>
                    <p className="mt-[3px] text-f15 leading-golden text-t2">
                      {stage.description}
                    </p>
                  </div>
                </div>
                <div className="mt-[21px] grid gap-[13px] md:grid-cols-2 lg:grid-cols-3">
                  {stage.slugs.map((slug) => {
                    const post = postBySlug.get(slug);
                    if (!post) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/resources/blog/${slug}`}
                        className="group flex flex-col rounded-[8px] border border-border-default bg-white p-[21px] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                      >
                        <h3 className="text-f15 font-bold leading-snug text-t1 group-hover:text-teal-text">
                          {post.title}
                        </h3>
                        <p className="mt-[8px] flex-1 text-f13 leading-golden text-t2 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <p className="mt-[13px] text-f12 font-semibold uppercase tracking-[0.06em] text-t3">
                          {post.readTime}
                        </p>
                      </Link>
                    );
                  })}
                </div>
                {stage.links.length > 0 && (
                  <div className="mt-[13px] flex flex-wrap gap-x-[21px] gap-y-[8px]">
                    {stage.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-f13 font-semibold text-teal-text hover:underline"
                      >
                        → {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="text-f24 font-bold text-t1">Proof: window projects delivered</h2>
          <div className="mt-[21px] flex flex-wrap gap-x-[21px] gap-y-[8px]">
            {caseStudies.map((cs) => (
              <Link
                key={cs.href}
                href={cs.href}
                className="text-f13 font-semibold text-teal-text hover:underline"
              >
                → {cs.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InnerCTA title="Working on a fenestration project? Send the spec — we quote profiles or finished units." />
    </>
  );
}
