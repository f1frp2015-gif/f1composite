import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import ProfileFinder from "@/components/tools/ProfileFinder";
import { finderRows } from "@/lib/profileFinder";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools/profile-finder";
const pageTitle = "FRP Profile Finder — Filter 114 Standard Sizes";
const pageDescription =
  "Filter F1 Composite's standard pultruded FRP profiles by shape, depth, mass and stiffness, compare up to four sizes and send them for one quotation.";

// Filter and comparison state lives in the query string; every variant
// shares this canonical, so only the bare finder is indexed.
export const metadata: Metadata = buildPageMetadata({ title: pageTitle, description: pageDescription, path: pagePath });

export default function ProfileFinderPage() {
  const rows = finderRows();
  const masses = rows.map((row) => row.mass);
  const format = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Profile Finder",
          url: absoluteUrl(pagePath),
          description: pageDescription,
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          publisher: { "@id": "https://www.f1composite.com/#organization" },
        }}
      />
      <PageHeader
        tag="Tools"
        line={{ name: "F1-STRUX", label: "Profile finder" }}
        title="FRP profile finder"
        description="Filter the standard pultruded profiles by shape, size, mass and stiffness. Tick up to four sizes to compare them side by side, then send them for one quotation."
        facts={[
          { label: "Catalog sizes", value: String(rows.length) },
          { label: "Shapes", value: String(new Set(rows.map((row) => row.shape)).size) },
          { label: "Mass", value: `${format(Math.min(...masses))}–${format(Math.max(...masses))} kg/m` },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Profile finder" }]}
      />

      <ToolSection label="FRP profile finder">
        <ProfileFinder rows={rows} />
      </ToolSection>

      <PageSection id="notes" title="Reading the table" tone="muted">
        <ul className="grid gap-[12px] md:grid-cols-3">
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">What the values are</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              Mass is the published catalog value. Area, Ix and Wx are calculated for the nominal section with sharp corners, so they differ slightly from a section with radii. D is the depth, leg, outside diameter or bar width; B the flange width or second leg; t the wall or flange thickness.
            </p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">Checking a span</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              Deflection usually decides an FRP size. Open a size in the{" "}
              <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:underline">profile calculator</Link>{" "}
              or read its row in the{" "}
              <Link href="/frp-span-tables" className="font-semibold text-teal-text hover:underline">span tables</Link>.
            </p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">No size fits</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              New cross-sections are pultruded to your drawing. See{" "}
              <Link href="/products/custom-pultruded-profiles" className="font-semibold text-teal-text hover:underline">custom pultruded profiles</Link>{" "}
              for tooling, samples and minimum runs.
            </p>
          </li>
        </ul>
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "Check a size", links: [
            { href: "/frp-profile-calculator", label: "FRP profile calculator" },
            { href: "/frp-span-tables", label: "FRP span tables" },
            { href: "/frp-density-calculator", label: "Density and weight calculator" },
          ] },
          { title: "Products", links: [
            { href: "/products/fiberglass-structural-shapes", label: "Standard FRP structural profiles" },
            { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions" },
            { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
          ] },
          { title: "Data", links: [
            { href: "/resources/technical-data", label: "FRP technical data" },
            { href: "/datasheets", label: "Profile datasheets" },
            { href: "/tools", label: "All engineering tools" },
          ] },
        ]}
      />

      <InnerCTA
        title="Send the sizes you shortlisted for one quotation"
        quoteHref="/contact?source=tool-profile-finder&inquiry_type=rfq"
        text="Send the sizes, lengths per piece, quantities and resin or color requirements."
      />
    </>
  );
}
