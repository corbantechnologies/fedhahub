import type { Metadata, Viewport } from "next";
// Optional: Good for a clean, professional financial look
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// Controls the mobile browser top-bar color
export const viewport: Viewport = {
  themeColor: "#0F172A", // Deep Navy branding
};

// Centralized SEO Engine
export const metadata: Metadata = {
  metadataBase: new URL("https://fedhahub.co.ke"),
  title: {
    template: "%s | FedhaHub Kenya", // Pages will show "SACCO Calculator | FedhaHub Kenya"
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
    // No @handles needed. This just ensures the link looks great when shared.
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