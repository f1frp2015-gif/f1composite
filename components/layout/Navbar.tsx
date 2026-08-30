"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mainNav, type NavChild } from "@/content/data/navigation";

function groupChildren(children: readonly NavChild[]) {
  const groups: Array<{ title: string | null; items: NavChild[] }> = [];

  for (const child of children) {
    const title = child.group ?? null;
    const last = groups[groups.length - 1];
    if (last && last.title === title) last.items.push(child);
    else groups.push({ title, items: [child] });
  }

  return groups;
}

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  function closeMobileMenu() {
    setMobileOpen(false);
    setOpenMobileSection(null);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-border-default bg-white/95 shadow-[0_1px_0_rgba(11,24,56,0.02)] backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-[20px] sm:px-[28px] lg:px-[36px]"
      >
        <Link
          href="/"
          className="rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4"
          aria-label="F1 Composite home"
        >
          <Image
            src="/brand/f1-logo.png"
            alt="F1 Composite"
            width={142}
            height={40}
            priority
          />
        </Link>

        <div className="hidden h-full items-center gap-[8px] lg:flex">
          {mainNav.map((item) => {
            const grouped = item.children?.some((child) => child.group);

            return (
              <div key={item.href} className="group relative flex h-full items-center">
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center gap-[5px] rounded-[6px] px-[12px] text-f13 font-semibold text-t1 transition-colors hover:bg-bg2 hover:text-teal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                >
                  {item.label}
                  {item.children && <Chevron />}
                </Link>

                {item.children && (
                  <div className="invisible absolute left-1/2 top-[calc(100%-1px)] -translate-x-1/2 pt-[12px] opacity-0 transition-[opacity,visibility,transform] duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {grouped ? (
                      <div className="grid w-[min(760px,calc(100vw-48px))] grid-cols-2 gap-x-[32px] gap-y-[20px] rounded-[12px] border border-border-default bg-white p-[24px] shadow-[0_18px_48px_rgba(11,24,56,0.14)]">
                        {groupChildren(item.children).map((group) => (
                          <div key={group.title ?? "general"}>
                            {group.title && (
                              <p className="mb-[7px] px-[10px] text-f11 font-bold uppercase tracking-[0.12em] text-t3">
                                {group.title}
                              </p>
                            )}
                            <div className="space-y-[2px]">
                              {group.items.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block rounded-[6px] px-[10px] py-[8px] text-f13 font-medium text-t2 transition-colors hover:bg-teal-bg2 hover:text-teal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="min-w-[260px] rounded-[12px] border border-border-default bg-white p-[10px] shadow-[0_18px_48px_rgba(11,24,56,0.14)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-[6px] px-[12px] py-[10px] text-f13 font-medium text-t2 transition-colors hover:bg-teal-bg2 hover:text-teal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/contact?source=header&inquiry_type=rfq"
            className="ml-[8px] inline-flex min-h-[44px] items-center rounded-[7px] bg-teal-text px-[18px] text-f13 font-bold text-white shadow-[0_6px_16px_rgba(0,122,116,0.18)] transition-colors hover:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Get a Quote
          </Link>
        </div>

        <div className="flex items-center gap-[8px] lg:hidden">
          <Link
            href="/contact?source=mobile-header&inquiry_type=rfq"
            className="inline-flex min-h-[42px] items-center rounded-[7px] bg-teal-text px-[13px] text-f13 font-bold text-white sm:px-[16px]"
            onClick={closeMobileMenu}
          >
            Quote
          </Link>
          <button
            type="button"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[7px] text-t1 hover:bg-bg2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            onClick={() => {
              setMobileOpen((open) => !open);
              setOpenMobileSection(null);
            }}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-border-default bg-white px-[20px] py-[14px] shadow-[0_18px_36px_rgba(11,24,56,0.12)] sm:px-[28px] lg:hidden"
        >
          {mainNav.map((item) => {
            const expanded = openMobileSection === item.href;

            return (
              <div key={item.href} className="border-b border-border-default last:border-0">
                <div className="flex min-h-[54px] items-center">
                  <Link
                    href={item.href}
                    className="flex min-h-[44px] flex-1 items-center text-f15 font-bold text-t1"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[6px] text-t2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                      aria-expanded={expanded}
                      onClick={() => setOpenMobileSection(expanded ? null : item.href)}
                    >
                      <Chevron open={expanded} />
                    </button>
                  )}
                </div>

                {item.children && expanded && (
                  <div className="grid gap-[16px] pb-[18px] sm:grid-cols-2">
                    {groupChildren(item.children).map((group) => (
                      <div key={group.title ?? "general"}>
                        {group.title && (
                          <p className="mb-[5px] text-f11 font-bold uppercase tracking-[0.12em] text-t3">
                            {group.title}
                          </p>
                        )}
                        {group.items.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block min-h-[40px] py-[8px] text-f13 font-medium text-t2"
                            onClick={closeMobileMenu}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
