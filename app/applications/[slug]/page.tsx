import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import RelatedLinks from "@/components/sections/RelatedLinks";
import AskAICard from "@/components/ai/AskAICard";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { applicationPages, getApplicationPage } from "@/lib/applicationPages";

/* Pre-filled FRP profile calculator deep links — a typical span / load /
   environment per application so each page opens the tool already scoped. */
const PROFILE_CALC_LINK: Record<string, string> = {
  "frp-cable-tray-supports": "/frp-profile-calculator#shape=channel&span=1500&load=2&env=chemical&material=frp-e23&load_type=udl&defl=200",
  "frp-cooling-tower-profiles": "/frp-profile-calculator#shape=square-tube&span=2000&load=3&env=chemical&material=frp-e23&load_type=udl&defl=200",
  "frp-bridge-deck-panels": "/frp-profile-calculator#shape=i-beam&span=3000&load=5&env=outdoor&material=frp-e23&load_type=udl&defl=360",
  "frp-solar-mounting-profiles": "/frp-profile-calculator#shape=square-tube&span=2200&load=2.5&env=outdoor&material=frp-e23&load_type=udl&defl=180",
  "frp-chemical-plant-platforms": "/frp-profile-calculator#shape=i-beam&span=1800&load=10&env=chemical&material=frp-e23&load_type=udl&defl=360",
  "frp-pedestrian-bridge-superstructures": "/frp-profile-calculator#shape=i-beam&span=6000&load=5&env=outdoor&material=frp-e23&load_type=udl&defl=360",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return applicationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getApplicationPage(slug);

  if (!page) {
    return {};
  }

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: `/applications/${page.slug}`,
  });
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getApplicationPage(slug);

  if (!page) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.title,
    description: page.description,
    url: absoluteUrl(`/applications/${page.slug}`),
    about: page.shortTitle,
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    mainEntityOfPage: absoluteUrl(`/applications/${page.slug}`),
    dateModified: page.lastModified,
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        tag="FRP Application Guide"
        title={page.h1}
        description={page.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Applications", href: "/applications" },
          { label: page.shortTitle },
        ]}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[55px] px-[34px] lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionTag>Short answer</SectionTag>
            <p className="mt-[21px] text-f19 leading-golden text-t2">{page.intro}</p>
            <p className="mt-[21px] text-f15 leading-golden text-t2">{page.environment}</p>
          </div>
          <aside className="rounded-[8px] border border-border-default bg-bg2 p-[24px]">
            <h2 className="text-f19 font-bold text-t1">Quote-ready inputs</h2>
            <ul className="mt-[13px] space-y-[10px]">
              {page.rfqInputs.map((item) => (
                <li key={item} className="text-f13 leading-golden text-t2">
                  <span className="font-bold text-teal-text">-</span> {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-white pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <figure className="overflow-hidden rounded-[8px] border border-border-default bg-bg2">
            <Image
              src={page.image}
              alt={page.imageAlt}
              width={1280}
              height={720}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="aspect-[16/9] h-auto w-full object-cover"
              preload
            />
            <figcaption className="border-t border-border-default bg-white px-[21px] py-[13px] text-f13 leading-golden text-t3">
              Application context for {page.shortTitle}. Final member sizes, laminate,
              connections, and code checks remain project-specific.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-2">
            <div>
              <SectionTag>Recommended profiles</SectionTag>
              <div className="mt-[21px] space-y-[13px]">
                {page.recommendedProfiles.map((item) => (
                  <div key={item} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                    <p className="text-f15 leading-golden text-t2">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionTag>Resin and standards</SectionTag>
              <div className="mt-[21px] rounded-[8px] border border-border-default bg-white p-[24px]">
                <h2 className="text-f19 font-bold text-t1">Resin recommendation</h2>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{page.resinSystem}</p>
                <h3 className="mt-[24px] text-f15 font-bold text-t1">Common standards</h3>
                <div className="mt-[13px] flex flex-wrap gap-[8px]">
                  {page.standards.map((standard) => (
                    <span key={standard} className="rounded-[4px] bg-bg2 px-[10px] py-[5px] text-f13 font-medium text-t2">
                      {standard}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Engineering checks</SectionTag>
          <h2 className="mt-[8px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            {page.shortTitle}: design and specification checks
          </h2>
          <div className="mt-[21px] grid gap-[21px] md:grid-cols-3">
            {page.designChecks.map((item) => (
              <div key={item.title} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <h3 className="text-f15 font-bold text-t1">{item.title}</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.deepDive && (
        <section className="bg-white py-[55px]">
          <div className="mx-auto max-w-[1280px] px-[34px]">
            <SectionTag>In Depth</SectionTag>
            <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
              {page.deepDive.heading}
            </h2>
            <div className="mt-[21px] max-w-[860px] space-y-[13px]">
              {page.deepDive.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-f15 leading-golden text-t2">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <CalculatorCTA
            href={PROFILE_CALC_LINK[page.slug] ?? "/frp-profile-calculator"}
            eyebrow="Free tool · pre-filled for this application"
            title={`Size an FRP profile for ${page.shortTitle}`}
            sub="Opens the FRP profile calculator pre-loaded with a typical span, load, and environment for this application — bending, shear, and Timoshenko-corrected deflection in one screen, then quote against your spec."
          />
        </div>
      </section>

      <AskAICard
        prefill={`I am evaluating ${page.shortTitle}. Please recommend profile families, resin system, standards, and RFQ details for my project.`}
      />

      <RelatedLinks
        groups={[
          {
            title: "Related product pages",
            links: page.related,
          },
          {
            title: "Core resources",
            links: [
              { href: "/pultruded-frp-profiles", label: "Pultruded FRP profiles hub" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel and aluminum" },
              { href: "/technology/quality-testing", label: "Quality testing and standards" },
              { href: "/resources/technical-data", label: "Technical data" },
            ],
          },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <Link href="/applications" className="text-f13 font-bold text-teal-text hover:text-teal">
            Back to all FRP application guides
          </Link>
        </div>
      </section>

      <InnerCTA title={`Need a quote for ${page.shortTitle}?`} />
    </>
  );
}
