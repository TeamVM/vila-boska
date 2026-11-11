"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { accommodations } from "@/data/accommodations";
import { useTranslations } from "next-intl";

const unitCapacityMap = new Map(
  accommodations.map((item) => [item.name, { adults: item.standardCapacity, children: item.childCapacity }])
);

export function ContactForm() {
  const t = useTranslations("contact");
  const tAccommodation = useTranslations("accommodation");
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const contactSchema = z.object({
    fullName: z.string().optional(),
    email: z.string().email(t("validation.email")),
    accommodation: z.string().min(1, t("validation.unit")),
    adults: z.number().int().positive(t("validation.adults")),
    children: z.number().int().min(0, t("validation.children")),
    message: z.string().min(10, t("validation.message")),
    consent: z.boolean().refine((value) => value, t("validation.consent")),
  });
  type FormValues = z.infer<typeof contactSchema>;

  const { register, handleSubmit, setValue, watch, setError, clearErrors, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      accommodation: "",
      adults: 2,
      children: 0,
      message: "",
      consent: false,
    },
  });

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("unit");
    if (!selected) return;

    const bySlug = accommodations.find((item) => item.slug === selected)?.name;
    setValue("accommodation", bySlug || selected);
  }, [setValue]);

  const selectedAccommodation = watch("accommodation");
  const selectedLimits = unitCapacityMap.get(selectedAccommodation) ?? { adults: 6, children: 2 };

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setServerMessage(null);
    clearErrors();

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const field = issue?.path[0];
      if (field === "email" || field === "accommodation" || field === "adults" || field === "children" || field === "message" || field === "consent") {
        setError(field, { type: "manual", message: issue.message });
      } else {
        setServerMessage({ type: "error", text: issue?.message ?? t("errorGeneric") });
      }
      setSubmitting(false);
      return;
    }

    const validData = parsed.data;

    const payload = {
      fullName: validData.fullName || "",
      email: validData.email,
      accommodation: validData.accommodation,
      adults: Number(validData.adults),
      children: Number(validData.children ?? 0),
      message: validData.message,
      consent: validData.consent,
    };

    if (Number(payload.adults) > selectedLimits.adults) {
      setError("adults", { type: "manual", message: t("validation.tooManyAdults", { count: selectedLimits.adults, unit: tAccommodation(`units.${accommodations.find((item) => item.name === payload.accommodation)?.id ?? "studio-1"}`) }) });
      setSubmitting(false);
      return;
    }

    if (Number(payload.children) > selectedLimits.children) {
      setError("children", { type: "manual", message: t("validation.tooManyChildren", { count: selectedLimits.children, unit: tAccommodation(`units.${accommodations.find((item) => item.name === payload.accommodation)?.id ?? "studio-1"}`) }) });
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        const serverErrors: Record<string, string> = {
          invalidRequest: t("server.invalidRequest"),
          invalidUnit: t("server.invalidUnit"),
          adultsCapacity: t("server.adultsCapacity", { count: result.count }),
          childrenCapacity: t("server.childrenCapacity", { count: result.count }),
          rateLimited: t("server.rateLimited"),
          notConfigured: t("server.notConfigured"),
          emailFailed: t("server.emailFailed"),
        };
        setServerMessage({ type: "error", text: serverErrors[result.code] ?? t("errorGeneric") });
        setSubmitting(false);
        return;
      }

      setServerMessage({ type: "success", text: t("success") });
      setValue("fullName", "");
      setValue("email", "");
      setValue("accommodation", "");
      setValue("adults", 2);
      setValue("children", 0);
      setValue("message", "");
      setValue("consent", false);
    } catch (error) {
      setServerMessage({
        type: "error",
        text: t("errorGeneric"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm text-[#282a26]">{t("fullName")}</label>
        <input {...register("fullName")} className="w-full rounded-xl border border-[#354a3c]/15 bg-[#f2eee7] px-3 py-3 outline-none ring-0 transition focus:border-[#a94f3c]" placeholder={t("namePlaceholder")} />
      </div>

      <div>
        <label className="mb-2 block text-sm text-[#282a26]">{t("email")} *</label>
        <input {...register("email")} type="email" className="w-full rounded-xl border border-[#354a3c]/15 bg-[#f2eee7] px-3 py-3 outline-none transition focus:border-[#a94f3c]" placeholder={t("emailPlaceholder")} />
        {errors.email ? <p className="mt-1 text-sm text-[#a94f3c]">{errors.email.message}</p> : null}
      </div>

      <div>
        <label className="mb-2 block text-sm text-[#282a26]">{t("unit")} *</label>
        <select {...register("accommodation")} className="w-full rounded-xl border border-[#354a3c]/15 bg-[#f2eee7] px-3 py-3 outline-none transition focus:border-[#a94f3c]">
          <option value="">{t("unitPlaceholder")}</option>
          {accommodations.map((item) => (
            <option key={item.id} value={item.name}>{tAccommodation(`units.${item.id}`)}</option>
          ))}
        </select>
        {errors.accommodation ? <p className="mt-1 text-sm text-[#a94f3c]">{errors.accommodation.message}</p> : null}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm text-[#282a26]">{t("adults")} *</label>
          <input {...register("adults", { setValueAs: (value) => Number(value) })} type="number" min={1} className="w-full rounded-xl border border-[#354a3c]/15 bg-[#f2eee7] px-3 py-3 outline-none transition focus:border-[#a94f3c]" />
          {errors.adults ? <p className="mt-1 text-sm text-[#a94f3c]">{errors.adults.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm text-[#282a26]">{t("children")}</label>
          <input {...register("children", { setValueAs: (value) => value === "" ? 0 : Number(value) })} type="number" min={0} className="w-full rounded-xl border border-[#354a3c]/15 bg-[#f2eee7] px-3 py-3 outline-none transition focus:border-[#a94f3c]" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-[#282a26]">{t("message")} *</label>
        <textarea {...register("message")} rows={5} className="w-full rounded-xl border border-[#354a3c]/15 bg-[#f2eee7] px-3 py-3 outline-none transition focus:border-[#a94f3c]" placeholder={t("messagePlaceholder")} />
        {errors.message ? <p className="mt-1 text-sm text-[#a94f3c]">{errors.message.message}</p> : null}
      </div>

      <label className="flex items-start gap-3 text-sm text-[#282a26]">
        <input type="checkbox" {...register("consent")} className="mt-1 h-4 w-4 accent-[#a94f3c]" />
        <span>{t("privacyConsent")}</span>
      </label>
      {errors.consent ? <p className="text-sm text-[#a94f3c]">{errors.consent.message}</p> : null}

      {serverMessage ? (
        <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${serverMessage.type === "success" ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-[#a94f3c] bg-[#fff1ee] text-[#a94f3c]"}`}>
          {serverMessage.type === "success" ? <CheckCircle2 size={16} /> : <span className="text-base">!</span>}
          <span>{serverMessage.text}</span>
        </div>
      ) : null}

      <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#a94f3c] px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-[#fff] transition hover:bg-[#bb5d49] disabled:cursor-not-allowed disabled:opacity-70">
        {submitting ? <Loader2 className="animate-spin" size={16} /> : null}
        {submitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
