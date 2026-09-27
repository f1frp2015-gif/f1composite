import Link from "next/link";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import { supplyTerms } from "@/content/data/company";

interface InnerCTAProps {
  /** The page's own question, e.g. "Bring your marine drawings to the discussion". */
  title?: string;
  quoteHref?: string;
  /** What to send, in place of the general sentence. The reply time follows it. */
  text?: string;
  /** Opens the engineering assistant with this question; no assistant link without it. */
  advisorPrompt?: string;
  /** Planning links shown before the assistant and product links. */
  links?: { label: string; href: string }[];
}

/**
 * The closing call to action of a page without a product quote block. It sits
 * on the deep ground like the product pages' quote block (ProductRfq) and, like
 * it, hides the footer's generic quote band (globals.css), so every page ends
 * with one call to action.
 */
export default function InnerCTA({
  title = "Ready to discuss your project?",
  quoteHref = "/contact?source=page-cta&inquiry_type=rfq",
  text = "Send the dimensions, quantity, service conditions and destination.",
  advisorPrompt,
  links = [],
}: InnerCTAProps) {
  const planning = [
    ...links,
    ...(advisorPrompt ? [{ label: "Ask the engineering assistant", href: `/ask?prefill=${encodeURIComponent(advisorPrompt)}` }] : []),
    { label: "Browse the product range", href: "/products/product-lines" },
  ];
  return (
    <section data-page-rfq aria-labelledby="page-cta-title" className="bg-deep py-[48px] md:py-[64px]">
      <div className="site-container grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-[56px]">
        <div className="max-w-[760px]">
          <h2 id="page-cta-title" className="text-[clamp(26px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
            {title}
          </h2>
          <p className="mt-[12px] text-f16 leading-relaxed text-white/80">
            {text} We reply within {supplyTerms.responseTime}.
          </p>
          <ul className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold">
            {planning.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white underline decoration-white/35 underline-offset-4 hover:text-teal-light hover:decoration-teal-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-[10px]">
          <Button href={quoteHref}>Request a quote</Button>
          <WhatsAppButton location="inner-cta" variant="outline" />
        </div>
      </div>
    </section>
  );
}
