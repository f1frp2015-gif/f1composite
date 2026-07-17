"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { mainNav, type NavChild } from "@/content/data/navigation";

/** Preserve authoring order while bucketing children by their group label. */
function groupChildren(children: readonly NavChild[]) {
  const groups: Array<{ title: string | null; items: NavChild[] }> = [];
  for (const child of children) {
    const title = child.group ?? null;
    const last = groups[groups.length - 1];
    if (last && last.title === title) {
      last.items.push(child);
    } else {
      groups.push({ title, items: [child] });
    }
  }
  return groups;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

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
              {item.children && openDropdown === item.href && (
                <div className="absolute left-0 top-full pt-[8px]">
                  {item.children.some((c) => c.group) ? (
                    <div className="grid w-max grid-cols-2 gap-x-[21px] gap-y-[13px] rounded-[8px] border border-border-default bg-white p-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                      {groupChildren(item.children).map((group) => (
                        <div key={group.title ?? "ungrouped"} className="min-w-[200px]">
                          {group.title && (
                            <p className="px-[13px] pb-[3px] pt-[5px] text-f12 font-semibold uppercase tracking-[0.08em] text-t3">
                              {group.title}
                            </p>
                          )}
                          {group.items.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-[4px] px-[13px] py-[6px] text-f13 text-t2 transition-colors duration-[0.21s] hover:bg-teal-bg hover:text-teal-text"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
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
                  )}
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
          className="-mr-[10px] p-[10px] lg:hidden"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setOpenMobileSection(null);
          }}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
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
        <div className="max-h-[calc(100vh-55px)] overflow-y-auto border-b border-border-default bg-white px-[34px] py-[21px] lg:hidden">
          {mainNav.map((item) => (
            <div key={item.href} className="mb-[8px] border-b border-border-default/60 pb-[8px] last:mb-0 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className="block flex-1 py-[8px] text-f15 font-medium text-t1"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {"children" in item && item.children && (
                  <button
                    type="button"
                    className="p-[10px]"
                    aria-label={openMobileSection === item.href ? `Collapse ${item.label} menu` : `Expand ${item.label} menu`}
                    aria-expanded={openMobileSection === item.href}
                    onClick={() =>
                      setOpenMobileSection(openMobileSection === item.href ? null : item.href)
                    }
                  >
                    <svg
                      className={`h-4 w-4 text-t2 transition-transform duration-[0.21s] ${
                        openMobileSection === item.href ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              {item.children && openMobileSection === item.href && (
                <div className="ml-[13px]">
                  {groupChildren(item.children).map((group) => (
                    <div key={group.title ?? "ungrouped"}>
                      {group.title && (
                        <p className="pb-[2px] pt-[8px] text-f12 font-semibold uppercase tracking-[0.08em] text-t3">
                          {group.title}
                        </p>
                      )}
                      {group.items.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-[8px] text-f13 text-t2"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
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
