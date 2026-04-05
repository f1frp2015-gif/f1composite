"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { footerNav } from "@/content/data/navigation";

const columns = [
  { title: "Products", links: footerNav.products },
  { title: "Technology", links: footerNav.technology },
  { title: "Industries", links: footerNav.industries },
  { title: "Company", links: footerNav.company },
];

function FooterAccordion({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-default md:border-0">
      {/* Mobile: clickable header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-[13px] text-left md:pointer-events-none md:py-0"
      >
        <h4 className="text-f13 font-bold text-t1">{title}</h4>
        <svg
          className={`h-4 w-4 text-t3 transition-transform duration-200 md:hidden ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* Mobile: collapsible list / Desktop: always visible */}
      <ul className={`space-y-[8px] overflow-hidden transition-all duration-200 md:mt-[13px] md:max-h-none md:pb-0 ${open ? "max-h-[500px] pb-[13px]" : "max-h-0 md:max-h-none"}`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-f13 text-t2 transition-colors duration-[0.21s] hover:text-teal-text"
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
      <div className="mx-auto max-w-[1280px] px-[34px] py-[55px]">
        <div className="grid gap-[34px] md:grid-cols-[1.618fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Image
              src="/brand/f1-logo.png"
              alt="F1 Composites"
              width={148}
              height={42}
              className="mb-[21px] h-[42px] w-auto"
            />
            <div className="space-y-[8px]">
              <p className="text-f13 font-semibold text-t1">Doris Li — Sales Director</p>
              <a href="mailto:Doris.li@f1composite.com" className="block text-f13 text-teal-text hover:text-teal">
                Doris.li@f1composite.com
              </a>
              <a href="tel:+8613883333993" className="block text-f13 text-teal-text hover:text-teal">
                +86 138 8333 3993
              </a>
            </div>
          </div>

          {/* Nav columns — accordion on mobile, flat on desktop */}
          {columns.map((col) => (
            <FooterAccordion key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-[34px] flex flex-wrap items-center gap-[21px] border-t border-border-default pt-[21px]">
          <span className="text-f11 font-bold uppercase tracking-[2px] text-t3">Certified</span>
          <span className="rounded-[4px] border border-border-default px-[10px] py-[4px] text-f11 font-semibold text-t2">ISO 9001:2015</span>
          <span className="rounded-[4px] border border-border-default px-[10px] py-[4px] text-f11 font-semibold text-t2">CE Marking</span>
          <span className="rounded-[4px] border border-border-default px-[10px] py-[4px] text-f11 font-semibold text-t2">EN 13706</span>
          <span className="rounded-[4px] border border-border-default px-[10px] py-[4px] text-f11 font-semibold text-t2">ASTM</span>
        </div>

        {/* Bottom bar */}
        <div className="mt-[21px] flex flex-wrap items-center justify-between gap-[13px] border-t border-border-default pt-[21px]">
          <p className="text-f11 text-t3">
            © {new Date().getFullYear()} F1 Composite Co., Ltd. All rights reserved.
          </p>
          <div className="flex gap-[21px]">
            <Link href="/privacy" className="text-f11 text-t3 hover:text-teal-text">
              Privacy
            </Link>
            <Link href="/terms" className="text-f11 text-t3 hover:text-teal-text">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="text-f11 text-t3 hover:text-teal-text">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
