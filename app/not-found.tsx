import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you requested could not be found. Continue to the pultruded FRP profiles hub or talk to the FRP advisor.",
  robots: { index: false, follow: true },
};

const exits = [
  {
    href: "/pultruded-frp-profiles",
    title: "Pultruded FRP profiles hub",
    description: "Structural shapes, fenestration, gratings, custom pultrusions — the full product map.",
  },
  {
    href: "/applications",
    title: "Applications by structure",
    description: "Cable trays, cooling towers, bridge decks, solar mounting, chemical platforms.",
  },
  {
    href: "/industries",
    title: "Industries we serve",
    description: "Construction, infrastructure, energy, marine, industrial, vehicle.",
  },
  {
    href: "/ask",
    title: "Ask the FRP advisor",
    description: "Describe your application and get a profile family, resin system, and standards.",
  },
  {
    href: "/case-studies",
    title: "Case studies",
    description: "Real projects across 30+ countries with measurable outcomes.",
  },
  {
    href: "/contact",
    title: "Contact F1 Composite",
    description: "RFQ in one business day. Doris Li, Sales — direct factory team.",
  },
];

export default function NotFound() {
  return (
    <>
      <PageHeader
        tag="404"
        title="That page doesn't exist — but the FRP you need probably does."
        description="The URL you followed was renamed, removed, or never existed. Pick an entry point below or talk to the AI advisor."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Not found" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Continue from</SectionTag>
          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {exits.map((exit) => (
              <Link
                key={exit.href}
                href={exit.href}
                className="rounded-[8px] border border-border-default bg-white p-[24px] transition-colors hover:border-teal"
              >
                <h2 className="text-f19 font-bold text-t1">{exit.title}</h2>
                <p className="mt-[8px] text-f15 leading-golden text-t2">{exit.description}</p>
                <span className="mt-[13px] inline-block text-f13 font-bold text-teal-text">
                  Open →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
