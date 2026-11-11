"use client";

import Link from "next/link";
import { Camera, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

const localeRoutes = {
  sr: { home: "/sr", accommodation: "/sr/smestaj", gallery: "/sr/galerija" },
  en: { home: "/en", accommodation: "/en/accommodation", gallery: "/en/gallery" },
  hu: { home: "/hu", accommodation: "/hu/szallas", gallery: "/hu/galeria" },
  ru: { home: "/ru", accommodation: "/ru/accommodation", gallery: "/ru/gallery" },
} as const;

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const homeHref = localeRoutes[locale as keyof typeof localeRoutes]?.home ?? "/sr";
  const accommodationHref = localeRoutes[locale as keyof typeof localeRoutes]?.accommodation ?? "/sr/smestaj";
  const galleryHref = localeRoutes[locale as keyof typeof localeRoutes]?.gallery ?? "/sr/galerija";

  return (
    <footer className="bg-[#354a3c] text-[#f5f0e7]">
      <div className="container-shell flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4c2a5] text-[#d4c2a5] text-xs">VB</div>
          <div className="leading-none">
            <div className="font-serif text-lg uppercase tracking-[0.12em]">{tFooter("brand")}</div>
            <div className="text-sm uppercase tracking-[0.24em] text-[#d4c2a5]">{tFooter("subBrand")}</div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-[0.12em]">
          <Link href={`${homeHref}#about`} className="hover:text-[#d4c2a5]">{t("about")}</Link>
          <Link href={accommodationHref} className="hover:text-[#d4c2a5]">{t("offer")}</Link>
          <Link href={galleryHref} className="hover:text-[#d4c2a5]">{t("gallery")}</Link>
          <Link href={`${homeHref}#contact`} className="hover:text-[#d4c2a5]">{t("contact")}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/vilaboskapalic/?hl=en" target="_blank" rel="noreferrer" className="rounded-full border border-[#d4c2a5] p-2 text-[#d4c2a5] transition hover:bg-[#d4c2a5] hover:text-[#354a3c]" aria-label={t("instagram")}>
            <Camera size={16} />
          </a>
          <a href="https://www.facebook.com/vilaboskapalickojezero/?locale=sr_RS" target="_blank" rel="noreferrer" className="rounded-full border border-[#d4c2a5] p-2 text-[#d4c2a5] transition hover:bg-[#d4c2a5] hover:text-[#354a3c]" aria-label={t("facebook")}>
            <Globe size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
