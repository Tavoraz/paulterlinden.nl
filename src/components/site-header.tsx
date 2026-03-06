"use client";

import clsx from "clsx";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { mainNavigation } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/types";

interface SiteHeaderProps {
  settings: SiteSettings;
}

export function SiteHeader({ settings }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shader-ink sticky top-0 z-50 border-b border-white/10 bg-[var(--ink-950)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src={settings.logoPath}
            alt={settings.siteName}
            width={142}
            height={28}
            priority
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

        <nav className="hidden items-center gap-1 md:flex" aria-label="Hoofdmenu">
          {mainNavigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "nav-link rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-white/20 !text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
                    : "hover:bg-white/12",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={settings.ctaHref}
            className="btn-motion ml-2 rounded-md bg-[var(--accent-500)] px-4 py-2 text-sm font-semibold !text-white transition-colors hover:bg-[var(--accent-600)]"
          >
            {settings.ctaLabel}
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
        <nav className="mx-auto flex w-full max-w-6xl flex-col px-4 py-3 sm:px-6" aria-label="Mobiel menu">
          {mainNavigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "nav-link rounded-md px-3 py-2 text-sm font-semibold transition-colors",
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
            href={settings.ctaHref}
            className="btn-motion mt-2 rounded-md bg-[var(--accent-500)] px-4 py-2 text-center text-sm font-semibold !text-white transition-colors hover:bg-[var(--accent-600)]"
            onClick={() => setIsOpen(false)}
          >
            {settings.ctaLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
