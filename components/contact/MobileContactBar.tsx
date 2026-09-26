"use client";

import { useSyncExternalStore } from "react";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/contact/WhatsAppButton";

// The contact and advisor pages are the contact step themselves.
const HIDDEN_PATHS = /^\/(contact|ask)(\/|$)/;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

/** Show once the visitor has scrolled past roughly the first screen. */
function visibleSnapshot() {
  return window.scrollY > 480 && !HIDDEN_PATHS.test(window.location.pathname);
}

/**
 * Sitewide mobile bar with a quote link and WhatsApp. Pages that render their
 * own bottom bar mark it with data-page-bottom-bar, and a CSS rule in
 * globals.css hides this one there.
 */
export default function MobileContactBar() {
  const visible = useSyncExternalStore(subscribe, visibleSnapshot, () => false);
  return (
    <div
      data-site-contact-bar
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-[55] border-t border-border-default bg-white/95 px-[12px] pb-[max(10px,env(safe-area-inset-bottom))] pt-[10px] shadow-bar backdrop-blur-md transition-transform duration-200 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="mx-auto grid max-w-[520px] grid-cols-2 gap-[8px]">
        <Button href="/contact?source=mobile-contact-bar&inquiry_type=rfq" className="w-full px-[10px]">
          Get a Quote
        </Button>
        <WhatsAppButton location="mobile-contact-bar" variant="outline" className="w-full" />
      </div>
    </div>
  );
}
