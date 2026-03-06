import { Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

import { footerNavigation } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/types";

interface SiteFooterProps {
  settings: SiteSettings;
}

export function SiteFooter({ settings }: SiteFooterProps) {
  return (
    <footer className="shader-ink border-t border-[var(--ink-800)] bg-[var(--ink-950)] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="font-display text-2xl">{settings.siteName}</p>
          <p className="max-w-2xl text-sm text-white/90">
            Coaching, teambegeleiding en bestuursadvies voor professional service
            firms.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/95">
            <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail className="h-3.5 w-3.5 text-white/90" />
              {settings.email}
            </a>
            <span className="text-white/60">|</span>
            <a href={`tel:${settings.phone}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-white/90" />
              {settings.phone}
            </a>
            <span className="text-white/60">|</span>
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Linkedin className="h-3.5 w-3.5 text-white/90" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="space-y-2 text-sm text-white/95">
          {footerNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
