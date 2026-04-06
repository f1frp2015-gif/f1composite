import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Standard Pultruded FRP Structural Profiles — Fiberglass Shapes",
  description:
    "Stock pultruded fiberglass structural shapes: FRP I-beams, channels, angles, square tubes, round tubes, flat bars, and rods. ISO 9001 certified, 75% lighter than steel, ready to ship.",
  path: "/products/standard-profiles",
  image: "/products/standard-profiles/opengraph-image",
});

const profileTypes: Array<{
  slug: string;
  name: string;
  subtitle: string;
  image: string;
  sizes: string;
  brief: string;
  imagePosition?: string;
}> = [
  {
    slug: "i-beam",
    name: "I-Beam",
    subtitle: "Wide Flange Profiles",
    image: "/images/products/i-beam/frp-i-beam-photo.png",
    sizes: "76×38 mm — 305×305 mm",
    brief: "Up to 75% lighter than steel. Maximum flexural stiffness for walkways, bridges, and platforms.",
  },
  {
    slug: "angle",
    name: "Angle",
    subtitle: "L-Profiles",
    image: "/images/products/angle/frp-angle-photo.png",
    sizes: "25×25 mm — 152×152 mm",
    brief: "Equal and unequal-leg options. Ideal as stiffeners, bracing, and ledger supports.",
  },
  {
    slug: "channel",
    name: "Channel",
    subtitle: "U-Profiles",
    image: "/images/products/channel/frp-channel-photo.png",
    sizes: "38×13 mm — 305×89 mm",
    brief: "Versatile open-section framing for cable management and modular assemblies.",
  },
  {
    slug: "square-tube",
    name: "Square Tube",
    subtitle: "SHS & RHS Profiles",
    image: "/images/products/square-tube/frp-square-tube-photo.png",
    sizes: "25×25 mm — 240×240 mm",
    brief: "Superior torsional rigidity for columns, trusses, and frame structures.",
  },
  {
    slug: "tube",
    name: "Round Tube",
    subtitle: "Circular Hollow Sections",
    image: "/images/products/round-tube/frp-round-tube-photo.png",
    sizes: "25 mm — 150 mm OD",
    brief: "Handrails, guardrails, and structural tubes with smooth interior bore.",
  },
  {
    slug: "flat-bar",
    name: "Flat Bar",
    subtitle: "Solid Rectangular Sections",
    image: "/images/products/flat-bar/frp-flat-bar-photo.png",
    sizes: "12×3 mm — 305×25 mm",
    brief: "Stiffeners, splice plates, wear strips. High-modulus options up to 70% glass.",
  },
];

export default function StandardProfilesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Standard FRP Structural Profiles",
    itemListElement: profileTypes.map((profile, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/products/standard-profiles/${profile.slug}`),
      name: profile.name,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <PageHeader
        tag="Standard Profiles"
        title="Pultruded FRP Structural Profiles"
        description="Seven core profile geometries engineered to replace steel and aluminium — corrosion-free, 75% lighter, ISO 9001 certified."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Standard Profiles" },
        ]}
      />

      {/* Profile Grid */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            {profileTypes.map((profile) => (
              <Link
                key={profile.slug}
                href={`/products/standard-profiles/${profile.slug}`}
                className="group overflow-hidden rounded-[8px] border border-border-default bg-white transition-all duration-300 hover:border-teal hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={profile.image}
                    alt={`Pultruded FRP ${profile.name} profile by F1 Composite`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={
                      profile.imagePosition
                        ? { objectPosition: profile.imagePosition }
                        : undefined
                    }
                  />
                </div>
                <div className="p-[21px]">
                  <h3 className="text-f19 font-bold text-t1">{profile.name}</h3>
                  <p className="text-f13 font-medium text-teal-text">{profile.subtitle}</p>
                  <p className="mt-[8px] text-f13 text-t3">
                    <span className="font-semibold">Sizes:</span> {profile.sizes}
                  </p>
                  <p className="mt-[8px] text-f15 leading-golden text-t2">{profile.brief}</p>
                  <span className="mt-[13px] inline-block text-f13 font-bold text-teal-text transition-colors group-hover:text-teal">
                    View all sizes →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InnerCTA title="Need engineering data or a quotation for standard profiles?" />
    </>
  );
}
