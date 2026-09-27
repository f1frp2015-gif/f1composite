"use client";

import { useEffect } from "react";
import Link from "next/link";
import LineTag from "@/components/ui/LineTag";

const secondary =
  "inline-flex min-h-[46px] items-center rounded-control border border-border-default bg-white px-[22px] text-f14 font-bold text-t1 transition-colors hover:border-teal-border hover:text-teal-text";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <section className="bg-white py-[48px] md:py-[64px]">
      <div className="site-container">
        <div className="max-w-[760px]">
          <LineTag line="Something went wrong" mark={false} />
          <h1 className="mt-[16px] text-[clamp(34px,4.5vw,56px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-t1">
            The page hit an error
          </h1>
          <p className="mt-[16px] text-f18 leading-relaxed text-t2">
            A temporary problem stopped this page from rendering. Try again, or go to the product hub or the engineering
            assistant.
          </p>
          {error.digest && <p className="mt-[12px] font-mono text-f12 text-t3">Error reference: {error.digest}</p>}
          <div className="mt-[24px] flex flex-wrap gap-[12px]">
            <button
              type="button"
              onClick={() => unstable_retry()}
              className="inline-flex min-h-[46px] items-center rounded-control bg-teal-text px-[22px] text-f14 font-bold text-white transition-colors hover:bg-teal"
            >
              Try again
            </button>
            <Link href="/pultruded-frp-profiles" className={secondary}>
              Product hub
            </Link>
            <Link href="/ask" className={secondary}>
              Ask the engineering assistant
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
