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

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(230px,1fr))]">
          {preview.map((image, index) => (
            <Link
              key={`${image}-${index}`}
              href={galleryHref}
              aria-label={`${t("imageAlt")} ${index + 1}`}
              className={`group relative block min-h-[220px] overflow-hidden rounded-xl border border-white/10 bg-[#18231e] ${index === 0 ? "sm:col-span-2 md:row-span-2 md:min-h-[480px]" : "md:min-h-0"}`}
            >
              <Image src={image} alt={t("imageAlt")} fill sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"} className="object-cover transition duration-700 group-hover:scale-[1.035]" />
              <span className="absolute inset-0 bg-gradient-to-t from-[#101612]/35 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
