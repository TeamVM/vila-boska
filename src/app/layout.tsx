import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vilaboskapalic.rs"),
  title: "Vila Boska Palić",
  openGraph: {
    title: "Vila Boska Palić",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
