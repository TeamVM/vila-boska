"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Lightbox } from "@/components/gallery/Lightbox";

export function GalleryGrid({ images }: { images: string[] }) {
  const t = useTranslations("gallery");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {images.map((image, index) => (
          <button key={`${image}-${index}`} type="button" onClick={() => setSelectedIndex(index)} aria-label={`${t("imageAlt")} ${index + 1}`} className="overflow-hidden rounded-[18px] border border-[#354a3c]/10 bg-white text-left shadow-[0_12px_30px_rgba(53,74,60,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(53,74,60,0.08)]">
            <div className="relative h-[280px] w-full">
              <Image src={image} alt={t("imageAlt")} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null ? <Lightbox images={images} index={selectedIndex} onClose={() => setSelectedIndex(null)} /> : null}
    </>
  );
}
