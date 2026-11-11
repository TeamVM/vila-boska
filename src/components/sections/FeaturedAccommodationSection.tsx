import { accommodations, featuredAccommodationIds } from "@/data/accommodations";
import { AccommodationCard } from "@/components/accommodation/AccommodationCard";

export function FeaturedAccommodationSection({ locale, title, subtitle, button }: { locale: string; title: string; subtitle: string; button: string; }) {
  const featured = accommodations.filter((item) => featuredAccommodationIds.includes(item.id));

  return (
    <section className="bg-[#f5f0e7] py-20">
      <div className="container-shell">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl text-[#282a26] md:text-6xl">{title}</h2>
          <p className="mt-4 text-base text-[#282a26]/70 md:text-lg">{subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((unit) => (
            <AccommodationCard key={unit.id} accommodation={unit} locale={locale} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={locale === "sr" ? "/sr/smestaj" : locale === "hu" ? "/hu/szallas" : `/${locale}/accommodation`} className="inline-flex items-center rounded-full border border-[#a94f3c] bg-transparent px-7 py-3 text-sm font-medium uppercase tracking-[0.12em] text-[#a94f3c] transition hover:bg-[#a94f3c] hover:text-[#f5f0e7]">
            {button}
          </a>
        </div>
      </div>
    </section>
  );
}
