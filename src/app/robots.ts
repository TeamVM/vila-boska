import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.vilaboskapalic.rs/sitemap.xml",
    host: "https://www.vilaboskapalic.rs",
  };
}
