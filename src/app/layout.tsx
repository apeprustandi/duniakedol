import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dunia Kedol",
    default: "Dunia Kedol — Komunitas Belajar Node.js & Automasi",
  },
  description:
    "Komunitas belajar Node.js dan automasi web. Materi terstruktur, automation challenges, forum diskusi, dan Bot Lab — dari nol sampai jago.",
  keywords: [
    "belajar nodejs",
    "web automation",
    "puppeteer",
    "web scraping",
    "komunitas programmer",
    "belajar programming",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://duniakedol.id",
    siteName: "Dunia Kedol",
    title: "Dunia Kedol — Komunitas Belajar Node.js & Automasi",
    description:
      "Materi terstruktur, automation challenges, Bot Lab + AI, dan komunitas aktif. Belajar programming jadi gampang.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dunia Kedol — Komunitas Belajar Node.js & Automasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dunia Kedol — Komunitas Belajar Node.js & Automasi",
    description:
      "Materi terstruktur, automation challenges, Bot Lab + AI, dan komunitas aktif.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jetbrainsMono.variable} scroll-smooth`}>
      <body className="font-mono antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}