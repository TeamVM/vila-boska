import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { generalGalleryImages } from "@/data/image-manifest";

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });

  return (
    <main className="min-h-screen bg-[#f5f0e7] text-[#282a26]">
      <Header locale={locale} />
      <section className="container-shell py-16">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-5xl text-[#282a26] md:text-7xl">{t("pageTitle")}</h1>
        </div>
        <GalleryGrid images={[...generalGalleryImages]} />
      </section>
      <Footer locale={locale} />
    </main>
  );
}
