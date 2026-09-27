import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import BlogCard from "@/components/blog/BlogCard";
import WindowProjects, { windowProjects } from "@/components/sections/WindowProjects";
import { buildWindowRfqHref } from "@/lib/windowInquiry";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { blogPosts } from "@/content/data/blogPosts";
import { windowRequestItems } from "@/content/data/windowBuying";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";

const pagePath = "/resources/frp-windows-guide";
const seoTarget = getSeoQueryTarget(pagePath);

/**
 * Pillar hub for the window / fenestration content cluster — the site's
 * strongest commercial query family ("frp window(s)", "frp window frames").
 * Organizes the window blog posts by buyer-journey stage and routes each
 * stage to its tools, comparison pages, and the fenestration product page.
 * Data-driven: cards pull title/excerpt/readTime from blogPosts by slug.
 */

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
});

interface Stage {
  id: string;
  /** The stage's name in the section bar. */
  nav: string;
  /** Position in the buyer journey; a stage outside it has none. */
  step?: number;
  title: string;
  description: string;
  slugs: string[];
  links: Array<{ href: string; label: string }>;
}

const stages: Stage[] = [
  {
    id: "frame-material",
    nav: "Frame material",
    step: 1,
    title: "Decide the frame material",
    description:
      "Why specifiers move from aluminum or PVC to pultruded fiberglass, and when they should not.",
    slugs: [
      "aluminum-window-condensation-cold-climate",
      "fabricating-fiberglass-window-lineals-switching-guide",
    ],
    links: [
      { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum windows: the full comparison" },
      { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC windows" },
      { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion windows (GFRP-PU)" },
    ],
  },
  {
    id: "thermal-target",
    nav: "Thermal target",
    step: 2,
    title: "Hit the thermal target",
    description:
      "Whole-window U-value engineering: frames, glazing, spacers, and thermal-break strategy.",
    slugs: [
      "frp-fenestration-thermal-performance",
      "frp-thermal-break-profiles-curtain-wall",
    ],
    links: [
      { href: "/technology/frp-u-value-calculator", label: "Free U-value calculator (EN ISO 10077-1)" },
      { href: "/ai/passive-house", label: "Passive House AI advisor" },
    ],
  },
  {
    id: "certify",
    nav: "Certification",
    step: 3,
    title: "Certify and comply",
    description:
      "Match reports to the offered configuration: PHI component scope, market requirements and AS 2047 specimen results. Historical lift-sliding evidence does not automatically cover the current 140 compression-seal door.",
    slugs: [
      "frp-fenestration-passivhaus-certification",
      "frp-windows-hurricane-wind-borne-debris-resistance",
      "gfrp-fenestration-australian-market-as2047",
      "frp-lift-sliding-door-as2047-engineering",
    ],
    links: [
      { href: "/regions/frp-passive-house-windows-canada", label: "Canada: passive house windows" },
      { href: "/regions/frp-passive-house-windows-germany", label: "Germany: Passivhaus supply" },
      { href: "/regions/grp-windows-uk", label: "UK: GRP windows" },
    ],
  },
  {
    id: "supply-path",
    nav: "Supply path",
    step: 4,
    title: "Choose a supply path and prepare the RFQ",
    description:
      "For local fabrication, prepare a profile BOM; for finished units, prepare a window schedule. Compare scope, drawings, configuration and evidence before quoting.",
    slugs: [
      "qualify-chinese-fiberglass-window-profile-supplier",
      "fiberglass-window-profile-price-drivers",
      "fabricating-fiberglass-window-lineals-switching-guide",
      "frp-window-profiles-powder-coating-aluminum-finish",
      "frp-window-finish-transverse-reinforcement",
    ],
    links: [
      { href: "/products/window-door-profiles", label: "Fiberglass window and door profiles: series selection and BOM" },
      { href: "/products/fiberglass-windows-doors", label: "Finished units: configuration and window schedule" },
      { href: "/products/frp-window-frames", label: "F1 window and door systems, 50–140 mm" },
      { href: "/products/frp-window-reinforcement", label: "Window reinforcement profiles" },
      { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "How to choose an FRP supplier" },
    ],
  },
  {
    id: "curtain-wall",
    nav: "Curtain wall",
    title: "Beyond windows: curtain wall",
    description:
      "The same thermal physics at facade scale: FRP isolators, mullions and transoms.",
    slugs: ["frp-curtain-wall-mullion-transom-carbon-glass-hybrid-pultrusion"],
    links: [
      { href: "/products/frp-facade-panels", label: "Facade and sunshade panels" },
    ],
  },
];

const postBySlug = new Map(blogPosts.map((p) => [p.slug, p]));
const articleCount = new Set(stages.flatMap((stage) => stage.slugs).filter((slug) => postBySlug.has(slug))).size;
const journeySteps = stages.filter((stage) => stage.step).length;

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
        description={`Everything on this site about fiberglass windows and doors: ${articleCount} articles, the tools, the comparison and market pages, and ${windowProjects.length} project case studies, in the order a fenestration project asks the questions.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "FRP Windows Guide" },
        ]}
      />
      <PageNav items={[...stages.map((stage) => ({ id: stage.id, label: stage.nav })), { id: "projects", label: "Projects" }]} />

      {stages.map((stage, index) => (
        <PageSection key={stage.id} id={stage.id} title={stage.title} count={stage.step ? `Step ${stage.step} of ${journeySteps}` : undefined} tone={index % 2 === 0 ? "white" : "muted"} intro={stage.description}>
          <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
            {stage.slugs.map((slug) => {
              const post = postBySlug.get(slug);
              if (!post) return null;
              return (
                <li key={slug}>
                  <BlogCard post={post} />
                </li>
              );
            })}
          </ul>
          {stage.links.length > 0 ? (
            <ul className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold">
              {stage.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-teal-text hover:underline">
                    {link.label} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </PageSection>
      ))}

      <WindowProjects tone={stages.length % 2 === 0 ? "white" : "muted"} />

      <PageSection id="quote" title="Prepare your window and door inquiry" tone="deep">
        <ProductRfq
          product="FRP windows and doors"
          productPath={pagePath}
          quoteHref={buildWindowRfqHref({ mode: "profiles", source: "window-guide", productPath: pagePath })}
          quoteLabel="Request system profiles"
          secondaryQuote={{ label: "Request finished units", href: buildWindowRfqHref({ mode: "finished", source: "window-guide", productPath: pagePath }) }}
          items={[...windowRequestItems.hub]}
          intro="Send a profile BOM for local fabrication or a window schedule for finished units. Early inquiries can start with the information you have."
          links={[{ label: "Compare the nine systems", href: "/products/frp-window-frames#series" }, { label: "Estimate a whole-window U-value", href: "/technology/frp-u-value-calculator" }]}
        />
      </PageSection>
    </>
  );
}
