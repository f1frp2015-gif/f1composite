import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import InnerCTA from "@/components/sections/InnerCTA";
import { buildPageMetadata } from "@/lib/seo";
import { applicationPages } from "@/lib/applicationPages";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Applications - Pultruded Fiberglass Profiles by Use Case",
  description:
    "Application guides for pultruded FRP profiles: cable tray supports, cooling towers, bridge decks, solar mounting and chemical plant platforms.",
  path: "/applications",
});

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        tag="Applications"
        title="FRP applications by structure and environment"
        description="Use-case pages for engineers and buyers evaluating pultruded fiberglass profiles by application, exposure, standards, and RFQ inputs."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Applications" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Application guides</SectionTag>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {applicationPages.map((page) => (
              <Link
                key={page.slug}
                href={`/applications/${page.slug}`}
                className="rounded-[8px] border border-border-default bg-white p-[24px] transition-colors hover:border-teal"
              >
                <h2 className="text-f19 font-bold text-t1">{page.shortTitle}</h2>
                <p className="mt-[8px] text-f15 leading-golden text-t2">{page.description}</p>
                <span className="mt-[13px] inline-block text-f13 font-bold text-teal-text">
                  View guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InnerCTA title="Need an FRP recommendation for your application?" />
    </>
  );
}
