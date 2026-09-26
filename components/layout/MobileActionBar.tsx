"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import { pickBarAction } from "@/lib/mobileBar";

interface MobileAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export default function MobileActionBar({
  targetId,
  primary,
  secondary,
  whatsappTopic,
}: {
  targetId: string;
  primary: MobileAction;
  secondary?: MobileAction;
  /** Product or page topic for the pre-filled WhatsApp message. */
  whatsappTopic?: string;
}) {
  const [visible, setVisible] = useState(false);
  const barAction = pickBarAction(primary, secondary);

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
      // The bottom margin stretches the root far below the screen, so the
      // actions count as intersecting until they pass the top edge. A header
      // figure can start them below the fold on phones, and a jump from there
      // straight past them (an anchor link) must still fire the callback.
      { rootMargin: "-72px 0px 100000px 0px", threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      data-page-bottom-bar
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-border-default bg-white/95 px-[12px] pb-[max(10px,env(safe-area-inset-bottom))] pt-[10px] shadow-bar backdrop-blur-md transition-transform duration-200 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      {/* Two actions fit a phone without wrapping: the quote link and WhatsApp.
          The header above keeps every other action. */}
      <div className="mx-auto grid max-w-[520px] grid-cols-[1fr_46px] gap-[8px]">
        <Button href={barAction.href} className="w-full px-[10px]">
          {barAction.label}
        </Button>
        <WhatsAppButton topic={whatsappTopic} location="mobile-product-bar" label="Chat on WhatsApp" variant="outline" iconOnly />
      </div>
    </div>
  );
}
