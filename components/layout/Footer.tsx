"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { footerNav } from "@/content/data/navigation";

const columns = [
  { title: "Products", links: footerNav.products },
  { title: "Explore", links: footerNav.explore },
  { title: "Company", links: footerNav.company },
];

function FooterAccordion({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-default md:border-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-[48px] w-full items-center justify-between text-left md:pointer-events-none md:min-h-0"
        aria-expanded={open}
      >
        <span className="text-f13 font-bold text-t1">{title}</span>
        <svg
          className={`h-4 w-4 text-t3 transition-transform duration-200 md:hidden ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <ul
        className={`space-y-[7px] overflow-hidden transition-[max-height,padding] duration-200 md:mt-[12px] md:max-h-none ${
          open ? "max-h-[280px] pb-[14px]" : "max-h-0 md:max-h-none"
        }`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-[34px] items-center text-f13 text-t2 transition-colors hover:text-teal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg2">
      <div className="bg-deep">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-[20px] px-[20px] py-[32px] sm:px-[28px] md:flex-row md:items-center md:justify-between md:px-[36px] md:py-[38px]">
          <div>
            <p className="text-f11 font-bold uppercase tracking-[0.14em] text-teal">Engineering &amp; RFQ support</p>
            <p className="mt-[5px] text-[clamp(22px,2.2vw,30px)] font-bold leading-tight tracking-[-0.02em] text-white">
              Have a project? Send the requirements.
            </p>
            <p className="mt-[6px] text-f13 text-white/70">Engineering review and quotation within one business day.</p>
          </div>
          <div className="flex flex-wrap gap-[10px]">
            <Link
              href="/contact?source=footer-cta&inquiry_type=rfq"
              className="inline-flex min-h-[46px] items-center justify-center rounded-[7px] bg-teal-text px-[20px] text-f13 font-bold text-white transition-colors hover:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Get a Quote
            </Link>
            <a
              href="https://wa.me/8613883338993"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center rounded-[7px] border border-white/25 px-[20px] text-f13 font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-[20px] py-[30px] sm:px-[28px] md:px-[36px] md:py-[36px]">
        <div className="grid gap-[18px] md:grid-cols-[1.45fr_1fr_1fr_1fr] md:gap-[36px]">
          <div className="pb-[4px]">
            <Link href="/" aria-label="F1 Composite home" className="inline-block rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal">
              <Image
                src="/brand/f1-logo.png"
                alt="F1 Composite"
                width={138}
                height={39}
                className="h-[39px] w-auto"
              />
            </Link>
            <p className="mt-[12px] max-w-[310px] text-f13 leading-relaxed text-t2">
              Pultruded FRP profiles, engineered systems, and factory-direct export support for projects worldwide.
            </p>
            <div className="mt-[13px] flex flex-wrap gap-x-[16px] gap-y-[4px]">
              <a href="mailto:inquiry@f1composite.com" className="text-f13 font-semibold text-teal-text hover:text-teal">
                inquiry@f1composite.com
              </a>
              <a href="tel:+8613883338993" className="text-f13 font-semibold text-teal-text hover:text-teal">
                +86 138 8333 8993
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <FooterAccordion key={column.title} title={column.title} links={column.links} />
          ))}
        </div>

        <div className="mt-[22px] flex flex-col gap-[14px] border-t border-border-default pt-[18px] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-[14px] gap-y-[7px]" aria-label="Standards and certifications">
            {[
              "ISO 9001:2015",
              "EN 13706",
              "ASTM D3917",
              "CE Marking",
            ].map((standard) => (
              <span key={standard} className="text-f11 font-bold uppercase tracking-[0.08em] text-t3">
                {standard}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[6px] text-f11 text-t3">
            <span>© {new Date().getFullYear()} Chongqing F1 Composites Co., Ltd.</span>
            <Link href="/privacy" className="hover:text-teal-text">Privacy</Link>
            <Link href="/terms" className="hover:text-teal-text">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-teal-text">Sitemap</Link>
            <a
              href="https://tradeos.f1composite.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-text"
            >
              TradeOS Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
