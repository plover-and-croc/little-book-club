import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteUrl } from "@/lib/site";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Little Book Club | Adventures for today. Readers for life.",
  description:
    "Curated bundles of quality pre-loved English children's books for ages 0–12 in Thailand.",
  icons: {
    icon: [{ url: "/lbc-favicon.png", type: "image/png" }],
    apple: [{ url: "/lbc-favicon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Little Book Club",
    description:
      "Helping families build home libraries children love with curated pre-loved English books.",
    url: siteUrl,
    siteName: "Little Book Club",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baloo.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
