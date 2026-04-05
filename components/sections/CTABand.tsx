import Button from "@/components/ui/Button";

export default function CTABand() {
  return (
    <section className="relative overflow-hidden bg-deep py-[55px]">
      {/* Gradient beam overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,161,153,0.1) 0%, rgba(91,176,48,0.08) 50%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-[34px] text-center">
        <h2 className="mx-auto max-w-[720px] text-f24 font-bold text-white">
          Send your drawing, profile requirement, or application brief and start a
          qualified RFQ with F1 Composite
        </h2>
        <p className="mx-auto mt-[13px] max-w-[560px] text-f15 leading-golden text-white/80">
          Share dimensions, quantities, resin requirements, application environment,
          and target delivery timing for a faster technical review.
        </p>
        <div className="mt-[21px]">
          <Button href="/contact" className="bg-white !text-deep hover:!bg-white/90">
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
