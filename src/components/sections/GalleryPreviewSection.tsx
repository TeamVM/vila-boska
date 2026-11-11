import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { generalGalleryImages } from "@/data/image-manifest";

export function GalleryPreviewSection({ locale, title, subtitle, button }: { locale: string; title: string; subtitle: string; button: string; }) {
  const t = useTranslations("gallery");
  const preview = generalGalleryImages.slice(0, 5);
  const galleryHref = locale === "sr" ? "/sr/galerija" : locale === "hu" ? "/hu/galeria" : `/${locale}/gallery`;

  return (
    <section className="bg-[#1f352c] py-20 text-[#f5f0e7]">
      <div className="container-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl">{title}</h2>
            <p className="mt-3 text-base text-[#f5f0e7]/75 md:text-lg">{subtitle}</p>
          </div>
          <Link href={galleryHref} className="inline-flex items-center rounded-full border border-[#d4c2a5] bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-[#f5f0e7] transition hover:bg-[#d4c2a5] hover:text-[#1f352c]">
            {button}
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {preview.map((image, index) => (
            <div key={`${image}-${index}`} className={`overflow-hidden rounded-[18px] border border-white/10 ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <Image src={image} alt={t("imageAlt")} width={index === 0 ? 1000 : 700} height={index === 0 ? 700 : 520} className="h-full min-h-[260px] w-full object-cover transition duration-500 hover:scale-[1.02]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
