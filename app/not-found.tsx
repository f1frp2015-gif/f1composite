import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you requested could not be found. Continue to the pultruded FRP profiles hub or ask the engineering assistant.",
  robots: { index: false, follow: true },
};

const exits = [
  {
    href: "/pultruded-frp-profiles",
    title: "Pultruded FRP profiles hub",
    description: "Structural shapes, window and door profiles, gratings and custom pultrusions: the full product map.",
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
    title: "Ask the engineering assistant",
    description: "Ask about profile selection, resins, standards and documents, with links to the sources.",
  },
  {
    href: "/case-studies",
    title: "Case studies",
    description: "Project accounts and engineering references, with the products supplied and the documents behind them.",
  },
  {
    href: "/contact",
    title: "Contact F1 Composite",
    description: "Send a name, email and short note. The export team replies within one business day.",
  },
];

export default function NotFound() {
  return (
    <>
      <PageHeader
        tag="404"
        title="This page does not exist"
        description="The address you followed was renamed, removed or never existed. Start again from one of the pages below."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Not found" },
        ]}
      />

      <PageSection id="continue" title="Continue from here" tone="muted">
        <ul className="grid gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {exits.map((exit) => (
            <li key={exit.href}>
              <Link
                href={exit.href}
                className="group flex h-full flex-col rounded-card border border-border-default bg-white p-[20px] transition-[border-color,box-shadow] duration-200 hover:border-teal-border hover:shadow-card sm:p-[24px]"
              >
                <h3 className="text-f18 font-bold text-t1 transition-colors group-hover:text-teal-text">{exit.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{exit.description}</p>
                <span className="mt-auto pt-[12px] text-f14 font-semibold text-teal-text">
                  Open <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}
