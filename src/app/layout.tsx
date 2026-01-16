import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "../components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://as-muret.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AS Muret Cycliste",
    template: "%s | AS Muret Cycliste",
  },
  description: "Club cycliste et VTT depuis 1962 !",
  applicationName: "AS Muret Cycliste",
  generator: "Next.js",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "AS Muret Cycliste",
    title: "AS Muret Cycliste",
    description: "Club cycliste et VTT depuis 1962 !",
  },
  twitter: {
    card: "summary_large_image",
    title: "AS Muret Cycliste",
    description: "Club cycliste et VTT depuis 1962 !",
  },
  appleWebApp: {
    capable: true,
    title: "AS Muret Cycliste",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased flex flex-col`}
      >
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
