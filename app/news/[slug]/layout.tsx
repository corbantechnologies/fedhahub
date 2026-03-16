// app/news/[slug]/layout.tsx

import { Metadata } from "next";
import { getNewsDetail } from "@/services/news";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const article = await getNewsDetail(slug);
    
    if (!article) {
      return {
        title: "Article Not Found | FedhaHub Kenya",
      };
    }

    return {
      title: article.title,
      description: article.brief,
      openGraph: {
        title: article.title,
        description: article.brief,
        url: `/news/${slug}`,
        images: article.image ? [{ url: article.image }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.brief,
        images: article.image ? [article.image] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Financial News & Insights | FedhaHub Kenya",
      description: "Stay updated with the latest news on Kenyan Sacco dividends, PAYE changes, taxes, laws, and financial tips from FedhaHub.",
    };
  }
}

export default function NewsDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
