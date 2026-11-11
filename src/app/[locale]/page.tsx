import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedAccommodationSection } from "@/components/sections/FeaturedAccommodationSection";
import { GalleryPreviewSection } from "@/components/sections/GalleryPreviewSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tAbout = await getTranslations({ locale, namespace: "about" });
  const tFeatured = await getTranslations({ locale, namespace: "featured" });
  const tGallery = await getTranslations({ locale, namespace: "gallery" });

  return (
    <main className="min-h-screen bg-[#f5f0e7] text-[#282a26]">
      <Header locale={locale} />
      <HeroSection locale={locale} title={tHero("title")} subtitle={tHero("subtitle")} primaryCta={tHero("primaryCta")} secondaryCta={tHero("secondaryCta")} imageAlt={tHero("imageAlt")} />
      <AboutSection locale={locale} title={tAbout("title")} text={tAbout("text")} cta={tAbout("cta")} />
      <FeaturedAccommodationSection locale={locale} title={tFeatured("title")} subtitle={tFeatured("subtitle")} button={tFeatured("button")} />
      <GalleryPreviewSection locale={locale} title={tGallery("title")} subtitle={tGallery("subtitle")} button={tGallery("button")} />
      <ContactSection />
      <Footer locale={locale} />
    </main>
  );
}
