import Button from "@/components/ui/Button";

interface InnerCTAProps {
  title?: string;
}

export default function InnerCTA({ title = "Ready to discuss your project?" }: InnerCTAProps) {
  return (
    <section className="bg-bg2 py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[34px] text-center">
        <h2 className="text-f24 font-bold text-t1">{title}</h2>
        <p className="mx-auto mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
          Our engineering team is ready to help you find the right FRP solution.
          Get in touch for technical consultation or a detailed quotation.
        </p>
        <div className="mt-[21px] flex justify-center gap-[13px]">
          <Button href="/contact">Request a Quote</Button>
          <Button href="/products" variant="secondary">
            Browse Products
          </Button>
        </div>
      </div>
    </section>
  );
}
