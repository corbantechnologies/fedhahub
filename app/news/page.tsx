"use client";

import { useState } from "react";
import { useFetchNews } from "@/hooks/news/actions";
import FeaturedArticle from "@/components/news/FeaturedArticle";
import NewsCard from "@/components/news/NewsCard";
import CategoryFilter from "@/components/news/CategoryFilter";
import { Loader2, AlertCircle } from "lucide-react";

export default function NewsPage() {
  const { data: news, isLoading, isError } = useFetchNews();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-slate-500 font-medium">Fetching latest news...</p>
      </div>
    );
  }

  if (isError || !news) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
        <div className="bg-red-50 p-6 rounded-2xl flex flex-col items-center text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-red-900 mb-2">Failed to load news</h3>
          <p className="text-red-700">We couldn't reach the backend right now. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Filter published only (just in case backend doesn't)
  const publishedNews = news.filter((n) => n.is_published);

  if (publishedNews.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
        <div className="bg-slate-50 p-8 rounded-2xl flex flex-col items-center text-center max-w-md border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-2">No News Yet</h3>
          <p className="text-slate-500">Check back later for the latest financial updates.</p>
        </div>
      </div>
    );
  }

  // 1. First, filter all published news by the selected category (if any)
  const filteredNews = activeCategory
    ? publishedNews.filter((n) => n.category === activeCategory)
    : publishedNews;

  // 2. Find the featured article for the current view (global if no category, or top of category)
  const featuredArticle = filteredNews.find((n) => n.is_featured) || filteredNews[0];
  
  // 3. Exclude the featured article from the regular grid so it's not duplicated
  const gridNews = featuredArticle ? filteredNews.filter((n) => n.id !== featuredArticle.id) : [];

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Financial <span className="text-emerald-600">News & Insights</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Stay updated with the latest in Kenyan finance, SACCO policies, taxation, and economic trends.
          </p>
        </div>

        {/* Category Filter (Placed at the top so it doesn't jump during filtering) */}
        <CategoryFilter
          news={publishedNews}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Featured Article (Top story for the current view) */}
        {featuredArticle && (
          <FeaturedArticle article={featuredArticle} />
        )}

        {/* News Grid */}
        {gridNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {gridNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
