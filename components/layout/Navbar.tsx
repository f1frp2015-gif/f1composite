"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { mainNav, type NavItem } from "@/content/data/navigation";

function pathMatches(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function itemMatches(pathname: string, item: NavItem) {
  if (pathMatches(pathname, item.href)) return true;
  return item.sections?.some((section) =>
    section.links.some((link) => pathMatches(pathname, link.href)),
  ) ?? false;
}

function menuLayout(sectionCount: number) {
  if (sectionCount >= 4) {
    return "w-[min(1120px,calc(100vw-48px))] grid-cols-4";
  }
  if (sectionCount === 3) {
    return "w-[min(900px,calc(100vw-48px))] grid-cols-3";
  }
  if (sectionCount === 2) {
    return "w-[min(680px,calc(100vw-48px))] grid-cols-2";
  }
  return "w-[290px] grid-cols-1";
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
  const pathname = usePathname();
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const desktopToggleRefs = useRef(new Map<string, HTMLButtonElement>());
  const desktopOpenCauseRef = useRef<"hover" | "button" | null>(null);
  const hoverSuppressedForRef = useRef<string | null>(null);

  const closeDesktopNavigation = useCallback(() => {
    desktopOpenCauseRef.current = null;
    hoverSuppressedForRef.current = null;
    setDesktopOpen(null);
  }, []);

  const closeNavigation = useCallback(() => {
    closeDesktopNavigation();
    setMobileOpen(false);
    setOpenMobileSection(null);
  }, [closeDesktopNavigation]);

  function openDesktopFromHover(itemId: string, pointerType: string) {
    if (pointerType !== "mouse" || hoverSuppressedForRef.current === itemId) return;
    desktopOpenCauseRef.current = "hover";
    setDesktopOpen(itemId);
  }

  function toggleDesktopFromButton(itemId: string) {
    if (desktopOpen !== itemId) {
      desktopOpenCauseRef.current = "button";
      hoverSuppressedForRef.current = null;
      setDesktopOpen(itemId);
      return;
    }

    // A mouse hover opens before its click event. Promote that first click to
    // an explicit open instead of immediately toggling the menu closed again.
    if (desktopOpenCauseRef.current === "hover") {
      desktopOpenCauseRef.current = "button";
      return;
    }

    desktopOpenCauseRef.current = null;
    hoverSuppressedForRef.current = itemId;
    setDesktopOpen(null);
  }

  useEffect(() => {
    if (!desktopOpen && !mobileOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) closeNavigation();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (mobileOpen) {
        closeNavigation();
        requestAnimationFrame(() => mobileToggleRef.current?.focus());
        return;
      }

      if (desktopOpen) {
        const trigger = desktopToggleRefs.current.get(desktopOpen);
        closeDesktopNavigation();
        requestAnimationFrame(() => trigger?.focus());
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeDesktopNavigation, closeNavigation, desktopOpen, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1024px)");
    function resetAcrossBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) {
        setMobileOpen(false);
        setOpenMobileSection(null);
      } else {
        closeDesktopNavigation();
      }
    }
    desktopMedia.addEventListener("change", resetAcrossBreakpoint);
    return () => desktopMedia.removeEventListener("change", resetAcrossBreakpoint);
  }, [closeDesktopNavigation]);

  function closeWhenFocusLeaves(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      closeDesktopNavigation();
    }
  }

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-border-default bg-white/95 shadow-[0_1px_0_rgba(11,24,56,0.02)] backdrop-blur-xl"
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-[20px] sm:px-[28px] lg:px-[36px]"
      >
        <Link
          href="/"
          className="rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4"
          aria-label="F1 Composite home"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={closeNavigation}
        >
          <Image
            src="/brand/f1-logo.png"
            alt="F1 Composite"
            width={58}
            height={40}
          />
        </Link>

        <div className="hidden h-full items-center gap-[3px] lg:flex">
          {mainNav.map((item) => {
            const expanded = desktopOpen === item.id;
            const active = itemMatches(pathname, item);
            const menuId = `desktop-navigation-${item.id}`;
            const sectionCount = item.sections?.length ?? 0;
            const isMegaMenu = sectionCount > 1;

            return (
              <div
                key={item.id}
                className="relative flex h-full items-center"
                onPointerEnter={(event) => openDesktopFromHover(item.id, event.pointerType)}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") closeDesktopNavigation();
                }}
                onBlur={closeWhenFocusLeaves}
              >
                <div
                  className={`inline-flex min-h-[44px] items-center rounded-[7px] transition-colors ${
                    active
                      ? "bg-teal-bg2 text-teal-text"
                      : "text-t1 hover:bg-bg2 hover:text-teal-text"
                  }`}
                >
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center pl-[11px] pr-[5px] text-f13 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={closeNavigation}
                  >
                    {item.label}
                  </Link>
                  {item.sections && (
                    <button
                      ref={(node) => {
                        if (node) desktopToggleRefs.current.set(item.id, node);
                        else desktopToggleRefs.current.delete(item.id);
                      }}
                      type="button"
                      className="inline-flex h-[44px] w-[32px] items-center justify-center rounded-r-[7px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal"
                      aria-label={`${expanded ? "Close" : "Open"} ${item.label} navigation`}
                      aria-expanded={expanded}
                      aria-controls={menuId}
                      onClick={() => toggleDesktopFromButton(item.id)}
                    >
                      <Chevron open={expanded} />
                    </button>
                  )}
                </div>

                {item.sections && (
                  <div
                    id={menuId}
                    hidden={!expanded}
                    className={
                      isMegaMenu
                        ? "fixed inset-x-0 top-[71px] flex justify-center pt-[12px]"
                        : "absolute right-0 top-[calc(100%-1px)] pt-[12px]"
                    }
                  >
                    <div
                      className={`grid max-h-[calc(100dvh-96px)] gap-x-[28px] gap-y-[22px] overflow-y-auto overscroll-contain rounded-[12px] border border-border-default bg-white p-[22px] shadow-[0_18px_48px_rgba(11,24,56,0.14)] ${menuLayout(sectionCount)}`}
                    >
                      {item.sections.map((section) => (
                        <section
                          key={section.id}
                          aria-labelledby={isMegaMenu ? `desktop-section-${section.id}` : undefined}
                        >
                          {isMegaMenu && (
                            <h2
                              id={`desktop-section-${section.id}`}
                              className="mb-[7px] px-[9px] text-f11 font-bold uppercase tracking-[0.12em] text-t3"
                            >
                              {section.label}
                            </h2>
                          )}
                          <div className="space-y-[2px]">
                            {section.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                prefetch={false}
                                aria-current={pathname === link.href ? "page" : undefined}
                                onClick={closeNavigation}
                                className={`block rounded-[6px] px-[9px] py-[8px] text-f13 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                                  pathMatches(pathname, link.href)
                                    ? "bg-teal-bg2 text-teal-text"
                                    : "text-t2 hover:bg-teal-bg2 hover:text-teal-text"
                                }`}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/contact?source=header&inquiry_type=rfq"
            className="ml-[7px] inline-flex min-h-[44px] items-center rounded-[7px] bg-teal-text px-[17px] text-f13 font-bold text-white shadow-[0_6px_16px_rgba(0,122,116,0.18)] transition-colors hover:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            onClick={closeNavigation}
          >
            Get a Quote
          </Link>
        </div>

        <div className="flex items-center gap-[8px] lg:hidden">
          <Link
            href="/contact?source=mobile-header&inquiry_type=rfq"
            className="inline-flex min-h-[42px] items-center rounded-[7px] bg-teal-text px-[13px] text-f13 font-bold text-white sm:px-[16px]"
            onClick={closeNavigation}
          >
            Quote
          </Link>
          <button
            ref={mobileToggleRef}
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
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-b border-border-default bg-white px-[20px] py-[14px] shadow-[0_18px_36px_rgba(11,24,56,0.12)] sm:px-[28px] lg:hidden"
        >
          <div className="mx-auto max-w-[760px]">
            {mainNav.map((item) => {
              const expanded = openMobileSection === item.id;
              const active = itemMatches(pathname, item);
              const sectionId = `mobile-section-${item.id}`;

              return (
                <div key={item.id} className="border-b border-border-default last:border-0">
                  <div className="flex min-h-[54px] items-center">
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`flex min-h-[44px] flex-1 items-center text-f15 font-bold ${
                        active ? "text-teal-text" : "text-t1"
                      }`}
                      onClick={closeNavigation}
                    >
                      {item.label}
                    </Link>
                    {item.sections && (
                      <button
                        type="button"
                        className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[6px] text-t2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                        aria-expanded={expanded}
                        aria-controls={sectionId}
                        onClick={() => setOpenMobileSection(expanded ? null : item.id)}
                      >
                        <Chevron open={expanded} />
                      </button>
                    )}
                  </div>

                  {item.sections && (
                    <div
                      id={sectionId}
                      hidden={!expanded}
                      className="grid gap-[16px] pb-[18px] sm:grid-cols-2"
                    >
                      {item.sections.map((section) => (
                        <section key={section.id} aria-labelledby={`mobile-heading-${section.id}`}>
                          <h2
                            id={`mobile-heading-${section.id}`}
                            className="mb-[5px] text-f11 font-bold uppercase tracking-[0.12em] text-t3"
                          >
                            {section.label}
                          </h2>
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              prefetch={false}
                              aria-current={pathname === link.href ? "page" : undefined}
                              className={`block min-h-[40px] py-[8px] text-f13 font-medium ${
                                pathMatches(pathname, link.href) ? "text-teal-text" : "text-t2"
                              }`}
                              onClick={closeNavigation}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </section>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
