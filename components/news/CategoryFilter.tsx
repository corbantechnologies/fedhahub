"use client";

import { useMemo } from "react";
import { News } from "@/services/news";
import clsx from "clsx";

interface CategoryFilterProps {
  news: News[];
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({ news, activeCategory, onSelectCategory }: CategoryFilterProps) {
  // Extract unique categories from the news
  const categories = useMemo(() => {
    const cats = new Set<string>();
    news.forEach((article) => {
      if (article.category) {
        cats.add(article.category);
      }
    });
    return Array.from(cats).sort();
  }, [news]);

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8 items-center border-b border-slate-200 pb-4">
      <span className="text-sm font-medium text-slate-500 mr-2 uppercase tracking-wider">Filter:</span>
      <button
        onClick={() => onSelectCategory(null)}
        className={clsx(
          "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
          activeCategory === null
            ? "bg-slate-900 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        )}
      >
        All News
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={clsx(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
            activeCategory === category
              ? "bg-emerald-600 text-white"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
