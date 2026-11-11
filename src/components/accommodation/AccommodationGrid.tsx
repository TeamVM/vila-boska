import { AccommodationCard } from "@/components/accommodation/AccommodationCard";
import type { Accommodation } from "@/data/accommodations";

export function AccommodationGrid({ items, locale }: { items: Accommodation[]; locale: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((unit) => (
        <AccommodationCard key={unit.id} accommodation={unit} locale={locale} />
      ))}
    </div>
  );
}
