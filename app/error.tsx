"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <section className="bg-white py-[89px]">
      <div className="mx-auto max-w-[760px] px-[34px] text-center">
        <span className="inline-block rounded-[4px] bg-bg2 px-[10px] py-[5px] text-f13 font-medium text-t2">
          Something went wrong
        </span>
        <h1 className="mt-[21px] text-f31 font-extrabold tracking-[-0.02em] text-t1">
          The page hit an error.
        </h1>
        <p className="mt-[13px] text-f15 leading-golden text-t2">
          A temporary issue stopped this page from rendering. You can retry, or
          jump to the product hub or the FRP advisor.
        </p>
        {error.digest && (
          <p className="mt-[13px] text-[11px] text-t3">Error ref: {error.digest}</p>
        )}
        <div className="mt-[34px] flex flex-wrap justify-center gap-[13px]">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="rounded-[6px] bg-teal px-[21px] py-[10px] text-f14 font-medium text-white hover:bg-teal/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/pultruded-frp-profiles"
            className="rounded-[6px] border border-border-default px-[21px] py-[10px] text-f14 font-medium text-t1 hover:border-teal transition-colors"
          >
            Product hub
          </Link>
          <Link
            href="/ask"
            className="rounded-[6px] border border-border-default px-[21px] py-[10px] text-f14 font-medium text-t1 hover:border-teal transition-colors"
          >
            Ask FRP advisor
          </Link>
        </div>
      </div>
    </section>
  );
}
