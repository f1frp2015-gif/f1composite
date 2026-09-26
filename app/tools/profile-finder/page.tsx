import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
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

      <section className="bg-white py-[40px]">
        <div className="site-container">
          <ProfileFinder rows={rows} />
        </div>
      </section>

      <section className="bg-bg2 py-[48px]">
        <div className="site-container grid gap-[24px] md:grid-cols-3">
          <div>
            <h2 className="text-f20 font-bold text-t1">What the values are</h2>
            <p className="mt-[8px] text-f14 text-t2">
              Mass is the published catalog value. Area, Ix and Wx are calculated for the nominal section with sharp corners, so they differ slightly from a section with radii. D is the depth, leg, outside diameter or bar width; B the flange width or second leg; t the wall or flange thickness.
            </p>
          </div>
          <div>
            <h2 className="text-f20 font-bold text-t1">Checking a span</h2>
            <p className="mt-[8px] text-f14 text-t2">
              Deflection usually decides an FRP size. Open a size in the{" "}
              <Link href="/frp-profile-calculator" className="font-semibold text-teal-text underline">
                profile calculator
              </Link>{" "}
              or read its row in the{" "}
              <Link href="/frp-span-tables" className="font-semibold text-teal-text underline">
                span tables
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="text-f20 font-bold text-t1">No size fits</h2>
            <p className="mt-[8px] text-f14 text-t2">
              New cross-sections are pultruded to your drawing. See{" "}
              <Link href="/products/custom-pultruded-profiles" className="font-semibold text-teal-text underline">
                custom pultruded profiles
              </Link>{" "}
              for tooling, samples and minimum runs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
