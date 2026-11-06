import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import Figure from "@/components/ui/Figure";
import { buildPageMetadata } from "@/lib/seo";
import { buildImageObject } from "@/lib/imageSeo";
import { routeImages } from "@/lib/pageImages";
import { ownedPhotos, ownedPhotoPath, photoRights } from "@/content/data/ownedPhotos";

// The group's own photos in one place: production halls, product samples and
// the FRP access staircase in the Chongqing plant. Each one carries the same
// licensing statement in its ImageObject as on the pages that use it, and
// links back to those pages.

const pagePath = "/about/photos";
const SITE_URL = "https://www.f1composite.com";

export const metadata: Metadata = buildPageMetadata({
  title: "Factory & Project Photos | F1 Composite",
  description:
    "Photos taken in FengDu pultrusion halls and F1 Composite's Chongqing plant: production lines, pultruded profiles, sheets and an FRP access staircase.",
  path: pagePath,
});

/** Pages (other than this one) that show each photo, from the image registry. */
function usedOn(src: string): string[] {
  return [...routeImages()].filter(([route, sources]) => route !== pagePath && sources.includes(src)).map(([route]) => route).sort();
}

const routeLabel = (route: string) =>
  route === "/"
    ? "Home"
    : route
        .split("/")
        .filter(Boolean)
        .pop()!
        .replace(/-/g, " ")
        .replace(/\bfrp\b/g, "FRP")
        .replace(/^./, (c) => c.toUpperCase());

const photos = ownedPhotos.map((photo) => ({ ...photo, src: ownedPhotoPath(photo), pages: usedOn(ownedPhotoPath(photo)) }));

const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": `${SITE_URL}${pagePath}#gallery`,
  url: `${SITE_URL}${pagePath}`,
  name: "F1 Composite factory and project photos",
  description: "Photos the group took in its own pultrusion halls and plant, with licensing terms.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
      { "@type": "ListItem", position: 3, name: "Photos", item: `${SITE_URL}${pagePath}` },
    ],
  },
  associatedMedia: photos.map((photo) => buildImageObject({ src: photo.src, alt: photo.description, caption: photo.label, pagePath })),
};

export default function PhotosPage() {
  const production = photos.filter((photo) => photo.label === "Production photo").length;
  return (
    <>
      <JsonLd data={gallerySchema} />
      <PageHeader
        tag="Company"
        title="Factory and project photos"
        description="Photos the group took itself in FengDu pultrusion halls and in F1 Composite's Chongqing plant. Stock and supplier images used elsewhere on the site are not on this page."
        facts={[
          { label: "Production photos", value: String(production) },
          { label: "Project photos", value: String(photos.length - production) },
          { label: "License", value: "On request" },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Photos" },
        ]}
      />

      <PageSection id="photos" title="Photo library" tone="white">
        <div className="grid gap-[20px] sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <Figure key={photo.file} number={i + 1} title={photo.description} note={photo.label} bleed>
              <div className="relative aspect-[4/3]">
                <Image src={photo.src} alt={photo.description} fill sizes="(max-width: 639px) 94vw, (max-width: 1023px) 46vw, 31vw" className="object-cover" />
              </div>
              {photo.pages.length > 0 && (
                <p className="border-t border-border-default bg-white px-[14px] py-[10px] text-f14 text-t3">
                  Used on:{" "}
                  {photo.pages.map((route, j) => (
                    <span key={route}>
                      {j > 0 && ", "}
                      <Link href={route} className="font-semibold text-teal-text hover:underline">
                        {routeLabel(route)}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </Figure>
          ))}
        </div>
      </PageSection>

      <PageSection id="licensing" title="Using these photos" tone="muted">
        <div className="max-w-[760px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>
            {photoRights.notice} Each file carries a visible mark and copyright metadata. The terms are in{" "}
            <Link href="/terms#image-use" className="font-semibold text-teal-text hover:underline">
              Terms of use, image use
            </Link>
            .
          </p>
          <p>
            Distributors, journalists and project partners can ask for an unmarked file and a license through the{" "}
            <Link href="/contact?source=image-license&inquiry_type=general" className="font-semibold text-teal-text hover:underline">
              contact form
            </Link>
            . Say which photo, where it will appear and how it will be credited.
          </p>
        </div>
      </PageSection>

      <InnerCTA />
    </>
  );
}
