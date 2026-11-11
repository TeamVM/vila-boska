import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { heroImage } from "@/data/image-manifest";

export function HeroSection({ locale, title, subtitle, primaryCta, secondaryCta, imageAlt }: {
  locale: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  imageAlt: string;
}) {
  const accommodationHref = locale === "sr" ? "/sr/smestaj" : locale === "hu" ? "/hu/szallas" : `/${locale}/accommodation`;
  const contactHref = `/${locale}#contact`;

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#1d2a26]">
      <Image src={heroImage} alt={imageAlt} fill priority className="object-cover opacity-95" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1715]/70 via-[#0d1715]/25 to-[#0d1715]/40" />

      <div className="container-shell relative z-10 flex min-h-[92vh] items-end pb-14 pt-12 text-[#f5f0e7] md:pb-20">
        <div className="max-w-[680px]">
          <h1 className="font-serif text-[3.2rem] leading-[0.9] tracking-[-0.04em] md:text-[6.5rem]">{title}</h1>
          <p className="mt-5 max-w-[440px] text-lg font-medium text-[#f5f0e7]/95 md:text-[1.4rem]">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={accommodationHref} className="inline-flex items-center gap-2 rounded-full border border-[#d4c2a5] bg-[#a94f3c] px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-[#f5f0e7] shadow-[0_12px_30px_rgba(169,79,60,0.28)] transition hover:bg-[#bb5d49]">
              {primaryCta} <ArrowRight size={16} />
            </Link>
            <Link href={contactHref} className="inline-flex items-center gap-2 rounded-full border border-[#f5f0e7]/50 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-[#f5f0e7] backdrop-blur-sm transition hover:bg-white/10">
              {secondaryCta}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[#f5f0e7]/80">
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </div>
    </section>
  );
}
