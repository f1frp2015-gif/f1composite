import Button from "@/components/ui/Button";

interface InnerCTAProps {
  title?: string;
}

export default function InnerCTA({ title = "Ready to discuss your project?" }: InnerCTAProps) {
  return (
    <section className="border-y border-border-default bg-white py-[38px] md:py-[46px]">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-[18px] px-[20px] sm:px-[28px] md:flex-row md:items-center md:justify-between lg:px-[36px]">
        <div>
          <h2 className="text-f24 font-bold tracking-[-0.02em] text-t1">{title}</h2>
          <p className="mt-[6px] max-w-[650px] text-f15 leading-relaxed text-t2">
            Send the dimensions, quantity, service environment, and destination. Engineering responds within one business day.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-[10px]">
          <Button href="/contact?source=page-cta&inquiry_type=rfq">Get a Quote</Button>
          <Button href="/pultruded-frp-profiles" variant="secondary">
            View Products
          </Button>
        </div>
      </div>
    </section>
  );
}
