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
              <a
                href="https://wa.me/8613883333993"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[4px] text-f13 text-teal-text hover:text-teal"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="https://www.youtube.com/@F1Composites"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[4px] text-f13 text-teal-text hover:text-teal"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
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
