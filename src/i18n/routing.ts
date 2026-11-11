import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "en", "hu", "ru"],
  defaultLocale: "sr",
  localePrefix: "always",
});
