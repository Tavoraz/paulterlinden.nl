"use client";

import clsx from "clsx";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  mainNavigation,
  primaryCtaHref,
  primaryCtaLabel,
} from "@/lib/site-config";
import type { SiteSettings } from "@/lib/types";

interface SiteHeaderProps {
  settings: SiteSettings;
}

export function SiteHeader({ settings }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const syncHeaderState = () => {
      const nextCompact = window.scrollY > 28;

      setIsCompact((current) =>
        current === nextCompact ? current : nextCompact,
      );
    };

    syncHeaderState();
    window.addEventListener("scroll", syncHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", syncHeaderState);
  }, []);

  return (
    <>
      <div aria-hidden="true" className="h-[108px] sm:h-[116px] lg:h-[124px]" />
      <header
        className={clsx(
          "site-header shader-ink fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[var(--ink-950)]/92 backdrop-blur transition-[box-shadow,background-color] duration-300",
          isCompact
            ? "shadow-[0_12px_28px_rgba(18,28,45,0.18)]"
            : "shadow-[0_18px_36px_rgba(18,28,45,0.08)]",
        )}
      >
        <div
          className={clsx(
            "mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 transition-[padding,min-height] duration-300 sm:px-6 lg:px-8",
            isCompact ? "min-h-[74px] py-2.5" : "min-h-[118px] py-5",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src={settings.logoPath}
              alt={settings.siteName}
              width={240}
              height={48}
              priority
              className={clsx(
                "h-auto w-[176px] transition-[width] duration-300 sm:w-[208px]",
                isCompact ? "lg:w-[176px]" : "lg:w-[252px]",
              )}
            />
          </Link>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-white/35 bg-white/10 px-3 text-sm font-semibold text-white md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Hoofdmenu"
          >
            {mainNavigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "nav-link rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "bg-white/20 !text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
                      : "hover:bg-white/12",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href={settings.ctaHref || primaryCtaHref} className="btn-primary ml-2">
              {primaryCtaLabel}
            </Link>
          </nav>
        </div>

        <div
          id="mobile-menu"
          className={clsx(
            "overflow-hidden border-t border-white/10 transition-all duration-300 md:hidden",
            isOpen ? "max-h-96" : "max-h-0",
          )}
        >
          <nav
            className="mx-auto flex w-full max-w-6xl flex-col px-4 py-3 sm:px-6"
            aria-label="Mobiel menu"
          >
            {mainNavigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "nav-link rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "bg-white/20 !text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
                      : "hover:bg-white/12",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={settings.ctaHref || primaryCtaHref}
              className="btn-primary mt-2 justify-center"
              onClick={() => setIsOpen(false)}
            >
              {primaryCtaLabel}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
