"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import SearchButton from "@/components/search/SearchButton";
import LineTag from "@/components/ui/LineTag";
import SectionGlyph from "@/components/ui/SectionGlyph";
import { mainNav, productShortcuts, pultrudedOverviewLink, type NavItem, type NavSection } from "@/content/data/navigation";

const items: readonly NavItem[] = mainNav;

function pathMatches(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function itemMatches(pathname: string, item: NavItem) {
  if (item.id === "products" && pathMatches(pathname, pultrudedOverviewLink.href)) return true;
  if (pathMatches(pathname, item.href)) return true;
  return item.sections?.some((section) =>
    (section.href && pathMatches(pathname, section.href)) || section.links.some((link) => pathMatches(pathname, link.href)),
  ) ?? false;
}

function menuLayout(sectionCount: number) {
  if (sectionCount >= 3) return "w-[min(900px,calc(100vw-48px))] grid-cols-3";
  if (sectionCount === 2) return "w-[min(680px,calc(100vw-48px))] grid-cols-2";
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

const linkState = (pathname: string, href: string) =>
  pathMatches(pathname, href) ? "bg-teal-bg2 text-teal-text" : "text-t2 hover:bg-teal-bg2 hover:text-teal-text";

/** Products: standard sizes as a glyph grid, systems with their product lines, and the profile finder. */
function ProductsMenu({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate: () => void }) {
  const [standard, ...systems] = item.sections ?? [];
  return (
    <div className="grid w-[min(1180px,calc(100vw-48px))] max-h-[calc(100dvh-96px)] grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.8fr)] overflow-y-auto overscroll-contain rounded-card border border-border-default bg-white shadow-pop">
      <section aria-labelledby="desktop-section-standard-profiles" className="p-[22px]">
        <h2 id="desktop-section-standard-profiles" className="flex items-center gap-[10px]">
          <Link href={standard.href!} prefetch={false} onClick={onNavigate} className="text-f16 font-bold text-t1 hover:text-teal-text">
            {standard.label}
          </Link>
          <LineTag line={standard.line!} />
        </h2>
        <div className="mt-[14px] grid grid-cols-4 gap-[8px] xl:grid-cols-5">
          {standard.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              onClick={onNavigate}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`grid justify-items-center gap-[6px] rounded-control border border-border-default px-[6px] py-[10px] text-center text-f12 font-semibold leading-tight transition-colors hover:border-teal-border ${linkState(pathname, link.href)}`}
            >
              {link.glyph ? <SectionGlyph shape={link.glyph} size={32} /> : null}
              {link.label}
            </Link>
          ))}
        </div>
        <Link href={pultrudedOverviewLink.href} prefetch={false} onClick={onNavigate} className="mt-[14px] inline-block text-f14 font-semibold text-teal-text hover:underline">
          {pultrudedOverviewLink.label} overview <span aria-hidden>→</span>
        </Link>
      </section>

      <section aria-labelledby="desktop-section-systems" className="border-l border-border-default p-[22px]">
        <h2 id="desktop-section-systems" className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">
          Systems
        </h2>
        <ul className="mt-[8px] grid gap-[4px]">
          {systems.map((section) => (
            <li key={section.id} className="grid grid-cols-[30px_minmax(0,1fr)] gap-[10px] rounded-control p-[6px]">
              {section.glyph ? <SectionGlyph shape={section.glyph} size={30} /> : <span />}
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-[8px]">
                  <Link href={section.href!} prefetch={false} onClick={onNavigate} aria-current={pathname === section.href ? "page" : undefined} className="text-f14 font-bold text-t1 hover:text-teal-text">
                    {section.label}
                  </Link>
                  {section.line ? <span className="font-mono text-f12 text-teal-text">{section.line}</span> : null}
                </span>
                {section.links.length ? (
                  <span className="mt-[2px] flex flex-wrap gap-x-[10px] gap-y-[2px]">
                    {section.links.map((link) => (
                      <Link key={link.href} href={link.href} prefetch={false} onClick={onNavigate} aria-current={pathname === link.href ? "page" : undefined} className="text-f12 text-t2 hover:text-teal-text hover:underline">
                        {link.label}
                      </Link>
                    ))}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="border-l border-border-default bg-bg2 p-[22px]">
        <div className="rounded-card bg-deep p-[16px]">
          <p className="font-mono text-f12 uppercase tracking-[0.06em] text-lime">{productShortcuts.finder.label}</p>
          <p className="mt-[6px] text-f16 font-bold text-white">Filter every standard size</p>
          <p className="mt-[4px] text-f14 text-white/75">By shape, size, mass and stiffness. Compare up to four and quote them together.</p>
          <Link href={productShortcuts.finder.href} prefetch={false} onClick={onNavigate} className="mt-[12px] inline-flex min-h-[36px] items-center rounded-control bg-white px-[12px] text-f14 font-bold text-deep hover:bg-teal-bg2">
            Open the finder
          </Link>
        </div>
        <ul className="mt-[14px] grid gap-[2px]">
          {productShortcuts.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} prefetch={false} onClick={onNavigate} className="block rounded-control px-[6px] py-[6px] text-f14 font-semibold text-t1 hover:text-teal-text">
                {link.label} <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href={item.href} prefetch={false} onClick={onNavigate} className="block rounded-control px-[6px] py-[6px] text-f14 font-semibold text-t1 hover:text-teal-text">
              All products <span aria-hidden>→</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

/** Other menus: one column per section, headed by the section's own page when it has one. */
function SectionsMenu({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate: () => void }) {
  const sections = item.sections ?? [];
  const isMegaMenu = sections.length > 1;
  return (
    <div className={`grid max-h-[calc(100dvh-96px)] gap-x-[28px] gap-y-[22px] overflow-y-auto overscroll-contain rounded-card border border-border-default bg-white p-[22px] shadow-pop ${menuLayout(sections.length)}`}>
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={isMegaMenu ? `desktop-section-${section.id}` : undefined}>
          {isMegaMenu ? (
            <h2 id={`desktop-section-${section.id}`} className="mb-[7px] px-[9px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">
              {section.href ? (
                <Link href={section.href} prefetch={false} onClick={onNavigate} className="hover:text-teal-text">
                  {section.label} <span aria-hidden>→</span>
                </Link>
              ) : (
                section.label
              )}
            </h2>
          ) : null}
          <div className="space-y-[2px]">
            {section.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={onNavigate}
                className={`block rounded-control px-[9px] py-[8px] text-f14 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${linkState(pathname, link.href)}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/** Phone menu content for Products: the same glyph grid, the systems and the finder. */
function MobileProducts({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate: () => void }) {
  const [standard, ...systems] = item.sections ?? [];
  return (
    <>
      <div className="grid grid-cols-4 gap-[6px] sm:grid-cols-5">
        {standard.links.map((link) => (
          <Link key={link.href} href={link.href} prefetch={false} onClick={onNavigate} aria-current={pathname === link.href ? "page" : undefined} className={`grid justify-items-center gap-[4px] rounded-control border border-border-default px-[4px] py-[8px] text-center text-f12 font-semibold leading-tight ${linkState(pathname, link.href)}`}>
            {link.glyph ? <SectionGlyph shape={link.glyph} size={28} /> : null}
            {link.label}
          </Link>
        ))}
      </div>
      <Link href={standard.href!} prefetch={false} onClick={onNavigate} className="text-f14 font-semibold text-teal-text">
        Standard profile catalog <span aria-hidden>→</span>
      </Link>
      <ul className="grid gap-[2px] border-t border-border-default pt-[8px]">
        {systems.map((section: NavSection) => (
          <li key={section.id}>
            <Link href={section.href!} prefetch={false} onClick={onNavigate} className="flex min-h-[44px] items-center gap-[10px] text-f14 font-bold text-t1">
              {section.glyph ? <SectionGlyph shape={section.glyph} size={26} /> : null}
              {section.label}
              {section.line ? <span className="font-mono text-f12 font-normal text-teal-text">{section.line}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={productShortcuts.finder.href} prefetch={false} onClick={onNavigate} className="rounded-card bg-deep px-[14px] py-[12px] text-f14 font-bold text-white">
        <span className="block font-mono text-f12 font-normal uppercase tracking-[0.06em] text-lime">{productShortcuts.finder.label}</span>
        Filter every standard size <span aria-hidden>→</span>
      </Link>
    </>
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
      className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-border-default bg-white/95 backdrop-blur-xl"
    >
      <nav
        aria-label="Primary navigation"
        className="site-container flex h-full items-center justify-between"
      >
        <Link
          href="/"
          className="rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4"
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
          {items.map((item) => {
            const expanded = desktopOpen === item.id;
            const active = itemMatches(pathname, item);
            const menuId = `desktop-navigation-${item.id}`;
            const isMegaMenu = item.id === "products" || (item.sections?.length ?? 0) > 1;

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
                  className={`inline-flex min-h-[44px] items-center rounded-control transition-colors ${
                    active
                      ? "bg-teal-bg2 text-teal-text"
                      : "text-t1 hover:bg-bg2 hover:text-teal-text"
                  }`}
                >
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center pl-[11px] pr-[5px] text-f14 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
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
                      className="inline-flex h-[44px] w-[32px] items-center justify-center rounded-r-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal"
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
                    {item.id === "products" ? (
                      <ProductsMenu item={item} pathname={pathname} onNavigate={closeNavigation} />
                    ) : (
                      <SectionsMenu item={item} pathname={pathname} onNavigate={closeNavigation} />
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <span className="ml-[8px]">
            <SearchButton variant="header" onOpen={closeNavigation} />
          </span>
          <Link
            href="/contact?source=header&inquiry_type=rfq"
            className="ml-[7px] inline-flex min-h-[44px] items-center rounded-control bg-teal-text px-[17px] text-f14 font-bold text-white transition-colors hover:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            onClick={closeNavigation}
          >
            Get a Quote
          </Link>
        </div>

        <div className="flex items-center gap-[4px] lg:hidden">
          <SearchButton variant="icon" onOpen={closeNavigation} />
          <Link
            href="/contact?source=mobile-header&inquiry_type=rfq"
            className="ml-[4px] inline-flex min-h-[42px] items-center rounded-control bg-teal-text px-[13px] text-f14 font-bold text-white sm:px-[16px]"
            onClick={closeNavigation}
          >
            Quote
          </Link>
          <button
            ref={mobileToggleRef}
            type="button"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-control text-t1 hover:bg-bg2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
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
        <>
          {/* Dims the page under the open menu; a tap on it closes the menu. */}
          <div className="fixed inset-x-0 bottom-0 top-[72px] bg-deep/40 lg:hidden" onClick={closeNavigation} aria-hidden />
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-b border-border-default bg-white px-[20px] py-[14px] shadow-pop sm:px-[28px] lg:hidden"
          >
            <div className="mx-auto max-w-[760px]">
              <SearchButton variant="field" onOpen={closeNavigation} />
              {items.map((item) => {
                const expanded = openMobileSection === item.id;
                const active = itemMatches(pathname, item);
                const sectionId = `mobile-section-${item.id}`;

                return (
                  <div key={item.id} className="border-b border-border-default last:border-0">
                    <div className="flex min-h-[54px] items-center">
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={`flex min-h-[44px] flex-1 items-center text-f16 font-bold ${
                          active ? "text-teal-text" : "text-t1"
                        }`}
                        onClick={closeNavigation}
                      >
                        {item.label}
                      </Link>
                      {item.sections && (
                        <button
                          type="button"
                          className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-control text-t2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
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
                        className="grid gap-[12px] pb-[18px]"
                      >
                        {item.id === "products" ? (
                          <MobileProducts item={item} pathname={pathname} onNavigate={closeNavigation} />
                        ) : (
                          <div className="grid gap-[12px] sm:grid-cols-2">
                            {item.sections.map((section) => (
                              <details key={section.id} className="group rounded-control border border-border-default px-[12px]">
                                <summary className="min-h-[44px] cursor-pointer py-[12px] text-f14 font-bold text-t1">
                                  {section.label}
                                </summary>
                                {[...(section.href ? [{ label: section.hrefLabel ?? section.label, href: section.href }] : []), ...section.links].map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    prefetch={false}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                    className={`block min-h-[40px] py-[8px] text-f14 font-medium ${
                                      pathMatches(pathname, link.href) ? "text-teal-text" : "text-t2"
                                    }`}
                                    onClick={closeNavigation}
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </details>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
