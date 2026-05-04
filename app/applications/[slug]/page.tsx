import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import RelatedLinks from "@/components/sections/RelatedLinks";
import AskAICard from "@/components/ai/AskAICard";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { applicationPages, getApplicationPage } from "@/lib/applicationPages";

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
    publisher: {
      "@id": "https://www.f1composite.com/#organization",
      "@type": "Organization",
      name: "F1 Composite",
    },
    mainEntityOfPage: absoluteUrl(`/applications/${page.slug}`),
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
