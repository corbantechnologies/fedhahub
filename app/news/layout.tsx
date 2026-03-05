import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial News & Insights | FedhaHub Kenya",
  description: "Stay updated with the latest news on Kenyan Sacco dividends, PAYE changes, taxes, laws, and financial tips from FedhaHub.",
  openGraph: {
    title: "Financial News & Insights | FedhaHub Kenya",
    description: "Stay updated with the latest news on Kenyan Sacco dividends, PAYE changes, taxes, laws, and financial tips.",
    url: "https://fedhahub.co.ke/news",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
