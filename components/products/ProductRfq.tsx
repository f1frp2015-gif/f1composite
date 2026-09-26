import Link from "next/link";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import { profileSupplyItems } from "@/components/sections/ProfileSupplyGuide";
import { supplyTerms } from "@/content/data/company";
import { buildRfqHref } from "@/lib/rfq";

/**
 * The closing quote block of a product page, on the dark ground: what to
 * send, the quote and WhatsApp actions, and the planning links that lead to a
 * better request. It replaces the footer's generic quote band (globals.css).
 * Profile pages use the default checklist; other families pass their own
 * checklist and inquiry link.
 */
export default function ProductRfq({
  product,
  productPath,
  links = [],
  quoteHref,
  items = profileSupplyItems(),
  intro = "Send the size, length and quantity, the service environment and the destination.",
}: {
  /** e.g. "FRP I-beams" */
  product: string;
  productPath: string;
  links?: { label: string; href: string }[];
  /** The family's own inquiry link; a general product quote otherwise. */
  quoteHref?: string;
  /** What a useful request includes. */
  items?: { title: string; text: string }[];
  intro?: string;
}) {
  const advisor = `/ask?prefill=${encodeURIComponent(`I am evaluating ${product}. Help me choose the product, materials and standards, and list what F1 Composite needs for a qualified RFQ.`)}`;
  return (
    <div data-page-rfq className="grid grid-cols-1 gap-[28px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[56px]">
      <div>
        <p className="text-f16 leading-relaxed text-white/80">
          {intro} We reply within {supplyTerms.responseTime}; a formal quotation follows once the specification and delivery are reviewed.
        </p>
        <div className="mt-[20px] flex flex-wrap items-center gap-[10px]">
          <Button href={quoteHref ?? buildRfqHref({ source: "product-rfq", product, productPath })}>Request a quote</Button>
          <WhatsAppButton topic={product} location="product-rfq" variant="outline" />
        </div>
        <ul className="mt-[20px] space-y-[8px] text-f14 font-semibold">
          {[...links, { label: "Ask the engineering assistant", href: advisor }, { label: "FOB and DDP delivery terms", href: "/resources/frp-pultrusion-fob-ddp-export-guide" }].map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-white underline underline-offset-4 hover:text-teal">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <dl className="grid gap-px overflow-hidden rounded-card bg-deep sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="bg-white px-[18px] py-[14px] sm:py-[18px]">
            <dt className="text-f16 font-bold text-t1">{item.title}</dt>
            <dd className="mt-[6px] text-f14 leading-golden text-t2 max-sm:hidden">{item.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
