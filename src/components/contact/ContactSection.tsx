import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactSection() {
  const t = useTranslations("contact");
  const propertyAddress = "Vila Boska Palić, Vikend Naselje 280, 24413 Palić, Serbia";
  const encodedAddress = encodeURIComponent(propertyAddress);

  return (
    <section id="contact" className="bg-[#f5f0e7] py-20">
      <div className="container-shell">
        <div className="mb-8">
          <h2 className="font-serif text-4xl text-[#282a26] md:text-6xl">{t("title")}</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.1fr_1.2fr]">
          <div className="space-y-6 rounded-[24px] border border-[#354a3c]/10 bg-[#f8f3ee] p-6 shadow-[0_12px_30px_rgba(53,74,60,0.05)]">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#a94f3c]">
                <Phone size={18} />
                <span className="text-sm font-medium uppercase tracking-[0.12em]">{t("phoneLabel")}</span>
              </div>
              <a href="tel:+381655527704" className="block text-lg text-[#282a26]">+381 65 552 7704</a>
              <a href="tel:+381653753834" className="block text-lg text-[#282a26]">+381 65 375 3834</a>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#a94f3c]">
                <Mail size={18} />
                <span className="text-sm font-medium uppercase tracking-[0.12em]">{t("emailLabel")}</span>
              </div>
              <a href="mailto:vilaboska@gmail.com" className="block text-lg text-[#282a26]">vilaboska@gmail.com</a>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#a94f3c]">
                <MapPin size={18} />
                <span className="text-sm font-medium uppercase tracking-[0.12em]">{t("addressLabel")}</span>
              </div>
              <p className="whitespace-pre-line text-lg leading-7 text-[#282a26]">{t("address")}</p>
              <p className="text-sm text-[#68766b]">{t("distance")}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-[#354a3c]/10 bg-[#f8f3ee] p-2 shadow-[0_12px_30px_rgba(53,74,60,0.05)]">
            <iframe
              title={t("mapTitle")}
              src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
              className="h-[360px] w-full rounded-[18px] border-0"
              loading="lazy"
            />
            <div className="mt-3 text-center">
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-[#354a3c]/25 bg-transparent px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[#354a3c]">
                  {t("mapButton")}
                </a>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-[#a94f3c] bg-[#a94f3c] px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[#fff]">
                  {t("directions")}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#354a3c]/10 bg-[#f8f3ee] p-6 shadow-[0_12px_30px_rgba(53,74,60,0.05)]">
            <h3 className="mb-6 font-serif text-4xl text-[#282a26]">{t("formTitle")}</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
