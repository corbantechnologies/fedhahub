import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // 1. Import the Next.js Script component
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fedhahub.co.ke"),
  other: {
    "google-adsense-account": "ca-pub-7368601299278605",
  },
  title: {
    template: "%s | FedhaHub Kenya",
    default: "FedhaHub Kenya | Free 2026 Financial & Tax Calculators",
  },
  description: "Accurate, up-to-date 2026 Kenyan PAYE, SHIF, Housing Levy, SACCO dividends, and loan calculators.",
  keywords: [
    "PAYE calculator Kenya 2026",
    "SACCO dividend calculator",
    "SHIF calculator",
    "Housing Levy calculator",
    "Kenya loan calculator",
    "salary calculator Kenya",
    "KRA tax calculator"
  ],
  authors: [{ name: "Corban Technologies LTD" }],
  creator: "Corban Technologies LTD",
  publisher: "Corban Technologies LTD",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FedhaHub Kenya | 2026 Financial Calculators",
    description: "Calculate your Net Pay, SACCO dividends, and loan schedules instantly.",
    url: "https://fedhahub.co.ke",
    siteName: "FedhaHub",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FedhaHub Kenya",
    description: "Free 2026 Kenyan Tax and SACCO calculators.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FedhaHub",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-50 text-slate-900">
      <head>
        {/* 2. Replace <script> with Next.js <Script> and use crossOrigin */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7368601299278605"
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <Analytics />
        <TanstackQueryProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}