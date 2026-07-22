"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

interface MobileAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export default function MobileActionBar({
  targetId,
  primary,
  secondary,
}: {
  targetId: string;
  primary: MobileAction;
  secondary?: MobileAction;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show only after the in-header actions have scrolled above the fixed
        // navigation. Do not flash the bar when the target starts below the
        // viewport on a particularly short device.
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 72);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-border-default bg-white/95 px-[12px] pb-[max(10px,env(safe-area-inset-bottom))] pt-[10px] shadow-[0_-10px_28px_rgba(11,24,56,0.12)] backdrop-blur-md transition-transform duration-200 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto grid max-w-[520px] grid-cols-2 gap-[8px]">
        <Button href={primary.href} variant={primary.variant ?? "primary"} className="w-full px-[10px]">
          {primary.label}
        </Button>
        {secondary ? (
          <Button href={secondary.href} variant={secondary.variant ?? "secondary"} className="w-full px-[10px]">
            {secondary.label}
          </Button>
        ) : (
          <Button href="/contact?source=mobile-product-bar&inquiry_type=rfq" variant="secondary" className="w-full px-[10px]">
            Send Requirements
          </Button>
        )}
      </div>
    </div>
  );
}
