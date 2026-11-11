"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const t = useTranslations("gallery");
  const [currentIndex, setCurrentIndex] = useState(index);

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
      if (event.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [images.length, onClose]);

  const currentImage = images[currentIndex];

  return (
    <div role="dialog" aria-modal="true" aria-label={t("title")} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101612]/90 p-4 backdrop-blur-sm">
      <button type="button" aria-label={t("close")} onClick={onClose} className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/20 p-3 text-white">
        <X size={22} />
      </button>
      <button type="button" aria-label={t("previousImage")} onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)} className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-3 text-white">
        <ChevronLeft size={22} />
      </button>
      <div className="relative h-[70vh] w-full max-w-6xl overflow-hidden rounded-[20px] border border-white/10 bg-black/20">
        <Image src={currentImage} alt={`${t("imageAlt")} ${currentIndex + 1}`} fill className="object-contain" sizes="90vw" />
      </div>
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">{t("photoCount", { current: currentIndex + 1, total: images.length })}</span>
      <button type="button" aria-label={t("nextImage")} onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)} className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-3 text-white">
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
