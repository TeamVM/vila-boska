"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MouseEvent } from "react";
import { Camera, Globe, Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";

const localeRoutes = {
  sr: { home: "/sr", accommodation: "/sr/smestaj", gallery: "/sr/galerija" },
  en: { home: "/en", accommodation: "/en/accommodation", gallery: "/en/gallery" },
  hu: { home: "/hu", accommodation: "/hu/szallas", gallery: "/hu/galeria" },
  ru: { home: "/ru", accommodation: "/ru/accommodation", gallery: "/ru/gallery" },
} as const;

const normalizeLocale = (pathname: string) => {
  const match = pathname.match(/^\/(sr|en|hu|ru)(?:\/|$)/);
  const locale = match?.[1] ?? "sr";
  const withoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/";
  return { locale, withoutLocale } as const;
};

const localizedTarget = (currentLocale: string, targetLocale: string, pathname: string) => {
  const { withoutLocale } = normalizeLocale(pathname);
  const currentBase = localeRoutes[currentLocale as keyof typeof localeRoutes];
  const nextBase = localeRoutes[targetLocale as keyof typeof localeRoutes];

  if (withoutLocale === "/" || withoutLocale === "") {
    return nextBase.home;
  }

  const routeMap: Record<string, string> = {
    "/smestaj": nextBase.accommodation,
    "/accommodation": nextBase.accommodation,
    "/szallas": nextBase.accommodation,
    "/galerija": nextBase.gallery,
    "/gallery": nextBase.gallery,
    "/galeria": nextBase.gallery,
  };

  const fallback = routeMap[withoutLocale] ?? nextBase.home;
  if (fallback === currentBase.home && targetLocale !== currentLocale) {
    return nextBase.home;
  }

  return fallback;
};

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const homeHref = localeRoutes[locale as keyof typeof localeRoutes]?.home ?? "/sr";
  const offerHref = localeRoutes[locale as keyof typeof localeRoutes]?.accommodation ?? "/sr/smestaj";
  const galleryHref = localeRoutes[locale as keyof typeof localeRoutes]?.gallery ?? "/sr/galerija";
  const preserveLocaleLocation = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    const suffix = `${window.location.search}${window.location.hash}`;
    if (suffix) {
      event.preventDefault();
      window.location.assign(`${target}${suffix}`);
    }
  };

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#354a3c] text-[#f5f0e7]">
      <div className="container-shell grid min-h-[76px] grid-cols-[1fr_auto_1fr] items-center py-3">
        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#f5f0e7] transition hover:border-[#d4c2a5] hover:text-[#d4c2a5] xl:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <nav aria-label={t("about")} className="hidden items-center gap-7 text-xs font-medium uppercase tracking-[0.12em] xl:flex">
            <Link href={`${homeHref}#about`} className="opacity-90 transition hover:text-[#d4c2a5]">{t("about")}</Link>
            <Link href={offerHref} className="opacity-90 transition hover:text-[#d4c2a5]">{t("offer")}</Link>
          </nav>
        </div>

        <Link href={homeHref} className="flex flex-col items-center gap-1 whitespace-nowrap text-center">
          <span className="font-serif text-xl tracking-[0.06em] sm:text-2xl md:text-[2rem]">{t("brand")}</span>
          <span className="text-[0.52rem] uppercase tracking-[0.4em] text-[#d4c2a5] md:text-[0.58rem]">{t("brandLocation")}</span>
        </Link>

        <div className="flex items-center justify-end gap-3">
          <Link href={`${homeHref}#contact`} aria-label={t("contact")} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4c2a5]/65 text-[#d4c2a5] transition hover:bg-[#d4c2a5] hover:text-[#354a3c] xl:hidden">
            <Phone size={16} aria-hidden="true" />
          </Link>
          <nav aria-label={t("gallery")} className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.12em] xl:flex">
            <Link href={galleryHref} className="opacity-90 transition hover:text-[#d4c2a5]">{t("gallery")}</Link>
            <Link href={`${homeHref}#contact`} className="rounded-full border border-[#d4c2a5]/70 px-4 py-2.5 text-[#f5f0e7] transition hover:bg-[#d4c2a5] hover:text-[#354a3c]">{t("contact")}</Link>
          </nav>
          <div aria-label={t("language")} className="hidden items-center gap-2 border-l border-white/20 pl-4 text-[0.68rem] xl:flex">
            {(["sr", "en", "hu", "ru"] as const).map((item) => (
              <Link
                key={item}
                href={localizedTarget(locale, item, pathname)}
                onClick={(event) => preserveLocaleLocation(event, localizedTarget(locale, item, pathname))}
                className={`transition ${locale === item ? "text-[#d4c2a5]" : "opacity-80 hover:text-[#d4c2a5]"}`}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-[#354a3c] px-4 py-4 xl:hidden">
          <nav className="flex flex-col gap-4 text-sm uppercase tracking-[0.12em]">
            <Link href={`${homeHref}#about`} onClick={() => setMobileOpen(false)}>{t("about")}</Link>
            <Link href={offerHref} onClick={() => setMobileOpen(false)}>{t("offer")}</Link>
            <Link href={galleryHref} onClick={() => setMobileOpen(false)}>{t("gallery")}</Link>
            <Link href={`${homeHref}#contact`} onClick={() => setMobileOpen(false)}>{t("contact")}</Link>
            <div className="flex items-center gap-3 pt-2">
              {(["sr", "en", "hu", "ru"] as const).map((item) => (
                <Link
                  key={item}
                  href={localizedTarget(locale, item, pathname)}
                  onClick={(event) => {
                    setMobileOpen(false);
                    preserveLocaleLocation(event, localizedTarget(locale, item, pathname));
                  }}
                  className={`${locale === item ? "text-[#d4c2a5]" : "opacity-80"}`}
                >
                  {item.toUpperCase()}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://www.instagram.com/vilaboskapalic/?hl=en" target="_blank" rel="noreferrer" aria-label={t("instagram")}><Camera size={18} /></a>
              <a href="https://www.facebook.com/vilaboskapalickojezero/?locale=sr_RS" target="_blank" rel="noreferrer" aria-label={t("facebook")}><Globe size={18} /></a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
