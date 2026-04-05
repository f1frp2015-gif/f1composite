"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { mainNav } from "@/content/data/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[55px] border-b border-border-default bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-[34px]">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/brand/f1-logo.png"
            alt="F1 Composites"
            width={120}
            height={34}
            className="h-[34px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-[21px] lg:flex">
          {mainNav.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() =>
                "children" in item ? setOpenDropdown(item.href) : undefined
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="text-f13 font-medium text-t1 transition-colors duration-[0.21s] hover:text-teal-text"
              >
                {item.label}
              </Link>
              {"children" in item && item.children && openDropdown === item.href && (
                <div className="absolute left-0 top-full pt-[8px]">
                  <div className="min-w-[220px] rounded-[8px] border border-border-default bg-white p-[8px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-[4px] px-[13px] py-[8px] text-f13 text-t2 transition-colors duration-[0.21s] hover:bg-teal-bg hover:text-teal-text"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="ml-[8px] rounded-[6px] bg-teal px-[16px] py-[7px] text-f13 font-semibold text-white transition-colors duration-[0.21s] hover:bg-teal-text"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-t1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-border-default bg-white px-[34px] py-[21px] lg:hidden">
          {mainNav.map((item) => (
            <div key={item.href} className="mb-[8px]">
              <Link
                href={item.href}
                className="block py-[8px] text-f15 font-medium text-t1"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {"children" in item && item.children && (
                <div className="ml-[13px]">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-[5px] text-f13 text-t2"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="mt-[13px] block rounded-[6px] bg-teal px-[16px] py-[10px] text-center text-f15 font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
