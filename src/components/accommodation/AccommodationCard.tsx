"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, BedDouble, ChevronLeft, ChevronRight, Users, X } from "lucide-react";
import type { Accommodation } from "@/data/accommodations";

export function AccommodationCard({ accommodation, locale }: { accommodation: Accommodation; locale: string }) {
  const t = useTranslations("accommodation");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const name = t(`units.${accommodation.id}`);

  return (
    <>
      <article className="overflow-hidden rounded-[20px] border border-[#354a3c]/10 bg-[#f9f5f0] shadow-[0_16px_35px_rgba(53,74,60,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(53,74,60,0.08)]">
        <button type="button" onClick={() => setDetailsOpen(true)} className="group relative block h-60 w-full overflow-hidden text-left" aria-label={`${t("details")}: ${name}`}>
          <Image src={accommodation.mainImage} alt={name} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 33vw" />
          <span className="absolute bottom-3 right-3 rounded-full bg-[#1f352c]/85 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#f5f0e7]">{t("details")}</span>
        </button>
        <div className="space-y-3 p-4">
          <h3 className="font-serif text-3xl text-[#282a26]">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-[#354a3c]">
            <BedDouble size={16} aria-hidden="true" />
            <span>{accommodation.bedConfig.map((bed) => t(`beds.${bed}`)).join(" · ")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#354a3c]">
            <Users size={16} aria-hidden="true" />
            <span>{t("capacity", { count: accommodation.maxCapacity })}</span>
          </div>
          <button type="button" onClick={() => setDetailsOpen(true)} className="inline-flex items-center gap-2 border-b border-[#a94f3c] pt-2 text-xs font-medium uppercase tracking-[0.12em] text-[#a94f3c]">
            {t("details")} <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </article>

      {detailsOpen ? <AccommodationDetail accommodation={accommodation} locale={locale} onClose={() => setDetailsOpen(false)} /> : null}
    </>
  );
}

function AccommodationDetail({ accommodation, locale, onClose }: { accommodation: Accommodation; locale: string; onClose: () => void }) {
  const t = useTranslations("accommodation");
  const [imageIndex, setImageIndex] = useState(0);
  const name = t(`units.${accommodation.id}`);
  const imageCount = accommodation.gallery.length;
  const previousImage = () => setImageIndex((current) => (current - 1 + imageCount) % imageCount);
  const nextImage = () => setImageIndex((current) => (current + 1) % imageCount);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") previousImage();
      if (event.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, imageCount]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101612]/85 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-label={name} className="relative grid grid-cols-1 max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[20px] border border-[#d4c2a5]/40 bg-[#f5f0e7] shadow-[0_30px_90px_rgba(0,0,0,0.4)] md:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.8fr)]">
        <div className="relative flex min-w-0 min-h-[310px] flex-col bg-[#18231e] md:min-h-[620px]">
          <div className="relative min-w-0 min-h-[310px] flex-1 md:min-h-[500px]">
            <Image src={accommodation.gallery[imageIndex]} alt={`${name}, ${t("photo", { current: imageIndex + 1, total: imageCount })}`} fill className="object-contain" sizes="(max-width: 768px) 100vw, 65vw" priority />
            {imageCount > 1 ? (
              <>
                <button type="button" onClick={previousImage} aria-label={t("previousImage")} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white transition hover:bg-black/60"><ChevronLeft size={22} /></button>
                <button type="button" onClick={nextImage} aria-label={t("nextImage")} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white transition hover:bg-black/60"><ChevronRight size={22} /></button>
              </>
            ) : null}
            <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white">{t("photo", { current: imageIndex + 1, total: imageCount })}</span>
          </div>
          {imageCount > 1 ? (
            <div className="flex gap-2 overflow-x-auto p-3" aria-label={t("details")}>
              {accommodation.gallery.map((image, index) => (
                <button key={image} type="button" onClick={() => setImageIndex(index)} aria-label={t("photo", { current: index + 1, total: imageCount })} aria-current={index === imageIndex} className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 transition ${index === imageIndex ? "border-[#d4c2a5]" : "border-transparent opacity-65 hover:opacity-100"}`}>
                  <Image src={image} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col p-6 sm:p-8">
          <button type="button" onClick={onClose} aria-label={t("closeDetails")} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#354a3c]/15 bg-[#f5f0e7] text-[#354a3c] transition hover:bg-white md:right-5 md:top-5"><X size={20} /></button>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#a94f3c]">{t(`type${accommodation.type}`)}</span>
          <h2 className="mt-3 pr-10 font-serif text-4xl leading-tight text-[#282a26] sm:text-5xl">{name}</h2>
          <div className="mt-8 space-y-5 border-y border-[#354a3c]/15 py-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#68766b]">{t("bedsLabel")}</h3>
              <p className="mt-2 flex items-start gap-3 text-base leading-7 text-[#354a3c]"><BedDouble size={19} className="mt-1 shrink-0 text-[#a94f3c]" />{accommodation.bedConfig.map((bed) => t(`beds.${bed}`)).join(" · ")}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#68766b]">{t("capacityLabel")}</h3>
              <p className="mt-2 flex items-center gap-3 text-base text-[#354a3c]"><Users size={19} className="text-[#a94f3c]" />{t("capacity", { count: accommodation.maxCapacity })}</p>
            </div>
          </div>
          <div className="mt-auto grid gap-3 pt-8">
            <a href={accommodation.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#354a3c] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#f5f0e7] transition hover:bg-[#26382e]">
              {t("booking")} <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href={`/${locale}?unit=${accommodation.slug}#contact`} onClick={onClose} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#a94f3c] bg-[#a94f3c] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#bb5d49]">
              {t("inquiry")} <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
