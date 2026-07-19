"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { prefillForProfileFamily, type ProfileFamilySlug } from "@/lib/aiPrefill";

interface ProductHubCardProps {
  slug: ProfileFamilySlug;
  name: string;
  /** SEO keyword pinned to the card. */
  keyword: string;
  sizes: string;
  summary: string;
  image: string;
  /** CSS object-position override for images whose subject sits off-center. */
  imagePosition?: string;
  /** Primary product page URL. */
  href: string;
  /** Optional spec sheet PDF URL — when present, surfaces a "Download specs" CTA. */
  specSheetHref?: string;
  /** Where the sample request lands — defaults to /contact with prefilled query. */
  sampleHref?: string;
  pageId: string;
}

/**
 * Hub product card with three layered actions:
 *  1. "Explore" — primary product page
 *  2. "Spec sheet" — direct PDF download (when available)
 *  3. "Request sample" — short-circuit straight to a sample RFQ
 *
 * Each action emits a `product_card_action` event so we can rank which
 * geometry pulls which downstream behaviour.
 */
export default function ProductHubCard({
  slug,
  name,
  keyword,
  sizes,
  summary,
  image,
  imagePosition,
  href,
  specSheetHref,
  sampleHref,
  pageId,
}: ProductHubCardProps) {
  const fireAction = (action: "explore" | "specs" | "sample" | "ask", dest: string) =>
    trackEvent("product_card_action", {
      product_id: slug,
      cta_location: `${pageId}:product-card`,
      destination_url: dest,
      intent_layer: action === "explore" ? "explore" : "transact",
      note: action,
      value:
        action === "explore" ? 3 : action === "specs" ? 6 : action === "sample" ? 7 : 4,
    });

  const sampleUrl =
    sampleHref ??
    `/contact?type=sample&product=${encodeURIComponent(slug)}`;

  const askUrl = `/ask?prefill=${encodeURIComponent(
    prefillForProfileFamily(slug, name),
  )}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[8px] border border-border-default bg-white transition-all hover:border-teal hover:shadow-lg">
      <Link
        href={href}
        onClick={() => fireAction("explore", href)}
        className="block"
        aria-label={`Explore ${name}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          <Image
            src={image}
            alt={`${name} — pultruded fiberglass profile by F1 Composite`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-[8px] p-[21px]">
        <p className="text-f13 font-medium text-teal-text">{keyword}</p>
        <Link
          href={href}
          onClick={() => fireAction("explore", href)}
          className="text-f19 font-bold text-t1 hover:text-teal-text"
        >
          {name}
        </Link>
        <p className="text-f13 text-t3">
          <span className="font-semibold">Size range:</span> {sizes}
        </p>
        <p className="flex-1 text-f15 leading-golden text-t2">{summary}</p>

        <div className="mt-[8px] flex flex-wrap gap-x-[13px] gap-y-[5px] border-t border-border-default pt-[13px] text-f13 font-semibold">
          <Link
            href={href}
            onClick={() => fireAction("explore", href)}
            className="text-teal-text hover:text-teal"
          >
            Explore →
          </Link>
          {specSheetHref ? (
            <Link
              href={specSheetHref}
              onClick={() => fireAction("specs", specSheetHref)}
              className="text-t2 hover:text-teal-text"
            >
              Spec sheet (PDF) →
            </Link>
          ) : null}
          <Link
            href={sampleUrl}
            onClick={() => fireAction("sample", sampleUrl)}
            className="text-t2 hover:text-teal-text"
          >
            Request sample →
          </Link>
          <Link
            href={askUrl}
            onClick={() => fireAction("ask", askUrl)}
            className="text-t2 hover:text-teal-text"
          >
            Ask AI advisor →
          </Link>
        </div>
      </div>
    </article>
  );
}
