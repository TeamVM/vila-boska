import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CarFront, MapPin, Wifi, Waves } from "lucide-react";
import { useTranslations } from "next-intl";

export function AboutSection({ locale, title, text, cta }: { locale: string; title: string; text: string; cta: string; }) {
  const t = useTranslations("amenities");
  const tAbout = useTranslations("about");
  const offerHref = locale === "sr" ? "/sr/smestaj" : locale === "hu" ? "/hu/szallas" : `/${locale}/accommodation`;

  return (
    <section id="about" className="bg-[#f5f0e7] py-20">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.3fr_0.8fr] lg:items-center">
          <div className="overflow-hidden rounded-[22px] border border-[#354a3c]/10 bg-white shadow-[0_12px_30px_rgba(53,74,60,0.08)]">
            <Image src="/Slike/Galerija/OG__0006.jpg" alt={tAbout("imageAlt")} width={900} height={700} className="h-[420px] w-full object-cover" />
          </div>

          <div>
            <h2 className="font-serif text-4xl leading-none text-[#282a26] md:text-6xl">{title}</h2>
            <p className="mt-6 max-w-[620px] text-base leading-8 text-[#282a26]/80 md:text-lg">{text}</p>
            <Link href={offerHref} className="mt-8 inline-flex items-center gap-2 border-b border-[#a94f3c] pb-1 text-sm font-medium uppercase tracking-[0.12em] text-[#a94f3c]">
              {cta} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-4 rounded-[22px] border border-[#354a3c]/10 bg-[#f7f3ed] p-6 shadow-[0_12px_30px_rgba(53,74,60,0.04)]">
            {[
              { icon: MapPin, label: t("distance") },
              { icon: CarFront, label: t("parking") },
              { icon: Waves, label: t("pool") },
              { icon: Wifi, label: t("wifi") },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-[#354a3c]/10 bg-white/60 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a94f3c] text-[#f5f0e7]">
                  <Icon size={17} />
                </div>
                <span className="text-sm font-medium text-[#282a26]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
