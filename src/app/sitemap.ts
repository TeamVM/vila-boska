import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.vilaboskapalic.rs";

  return [
    { url: `${base}/sr`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/en`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/hu`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/ru`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/sr/smestaj`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/en/accommodation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/hu/szallas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/ru/accommodation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/sr/galerija`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/en/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/hu/galeria`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/ru/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}
