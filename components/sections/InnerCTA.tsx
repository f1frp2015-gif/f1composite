import Button from "@/components/ui/Button";
import { supplyTerms } from "@/content/data/company";
import WhatsAppButton from "@/components/contact/WhatsAppButton";

interface InnerCTAProps {
  title?: string;
  quoteHref?: string;
}

export default function InnerCTA({ title = "Ready to discuss your project?", quoteHref = "/contact?source=page-cta&inquiry_type=rfq" }: InnerCTAProps) {
  return (
    <section className="border-y border-border-default bg-white py-[38px] md:py-[46px]">
      <div className="site-container flex flex-col gap-[18px] md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-f24 font-bold tracking-[-0.02em] text-t1">{title}</h2>
          <p className="mt-[6px] max-w-[650px] text-f16 leading-relaxed text-t2">
            Send the dimensions, quantity, service conditions and destination. We reply within {supplyTerms.responseTime}.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-[10px]">
          <Button href={quoteHref}>Get a Quote</Button>
          <WhatsAppButton location="inner-cta" variant="outline" />
          <Button href="/pultruded-frp-profiles" variant="secondary">
            View Products
          </Button>
        </div>
      </div>
    </section>
  );
}
