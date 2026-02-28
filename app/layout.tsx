import type { Metadata } from "next";
// Optional: Good for a clean, professional financial look
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// 1. Centralized SEO Engine
export const metadata: Metadata = {
  title: {
    template: "%s | FedhaHub Kenya", // Pages will show "SACCO Calculator | FedhaHub Kenya"
    default: "FedhaHub Kenya | Free 2026 Financial & Tax Calculators",
  },
  description: "Accurate, up-to-date 2026 Kenyan PAYE, SHIF, Housing Levy, SACCO dividends, and loan calculators.",
  keywords: ["PAYE calculator Kenya 2026", "SACCO dividend calculator", "SHIF calculator", "Kenya loan calculator"],
  openGraph: {
    title: "FedhaHub Kenya | 2026 Financial Calculators",
    description: "Calculate your Net Pay, SACCO dividends, and loan schedules instantly.",
    url: "https://yourdomain.com", // Update when you deploy
    siteName: "FedhaHub",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FedhaHub Kenya",
    description: "Free 2026 Kenyan Tax and SACCO calculators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
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