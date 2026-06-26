"use client"

import Link from "next/link";
import { ArrowRight, Calculator, PieChart, Landmark, AlertCircle, Loader2 } from "lucide-react";
import NewsCard from "@/components/news/NewsCard";
import FeaturedArticle from "@/components/news/FeaturedArticle";
import { useFetchNews } from "@/hooks/news/actions";

export default function Home() {
  const { data: news, isLoading, isError } = useFetchNews();

  const publishedNews = news?.filter((n) => n.is_published) || [];
  
  // Get featured article (first one that has is_featured, or just the first one)
  const featuredArticle = publishedNews.find((n) => n.is_featured) || publishedNews[0];
  
  // Get grid news (excluding the featured one)
  const gridNews = featuredArticle 
    ? publishedNews.filter((n) => n.id !== featuredArticle.id).slice(0, 8) 
    : [];

  return (
    <div className="w-full flex flex-col items-center bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Header Content */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            <span className="text-emerald-600">FedhaHub</span> Finance
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
            Expert insights, latest financial news, and smart tools for Kenyans.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
          
          {/* Main Content Area (News) */}
          <div className="flex-1 min-w-0">
            {/* Featured Article */}
            {featuredArticle && (
              <div className="mb-10">
                <FeaturedArticle article={featuredArticle} />
              </div>
            )}

            {/* News Grid */}
            {gridNews.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
                  <Link
                    href="/news"
                    className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-500 transition-colors"
                  >
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gridNews.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Loading / Empty States */}
            {isLoading && (
              <div className="py-20 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading latest news...</p>
              </div>
            )}
            
            {isError && (
               <div className="py-20 flex flex-col items-center justify-center bg-red-50 rounded-2xl">
                 <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                 <p className="text-red-700">Failed to load news. Please try again later.</p>
               </div>
            )}
          </div>

          {/* Sidebar Area (Calculators & Tools) */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                Financial Tools
              </h3>
              
              <div className="space-y-4">
                {/* Tool 1 */}
                <Link href="/paye" className="group block bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                      <Calculator className="h-5 w-5 text-slate-600 group-hover:text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-emerald-700">2026 PAYE Calculator</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">Calculate net pay, SHIF, Housing Levy & NSSF.</p>
                    </div>
                  </div>
                </Link>

                {/* Tool 2 */}
                <Link href="/sacco-dividends" className="group block bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                      <PieChart className="h-5 w-5 text-slate-600 group-hover:text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-emerald-700">SACCO Dividends</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">Project returns on share capital & deposits.</p>
                    </div>
                  </div>
                </Link>

                {/* Tool 3 */}
                <Link href="/loan-calculator" className="group block bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                      <Landmark className="h-5 w-5 text-slate-600 group-hover:text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-emerald-700">Loan Calculator</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">Compare reducing balance vs flat rate.</p>
                    </div>
                  </div>
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                 <div className="bg-emerald-600 rounded-xl p-5 text-white text-center shadow-md">
                   <h4 className="font-bold mb-2">Need Help?</h4>
                   <p className="text-emerald-100 text-sm mb-4">Our calculators use the latest 2026 Kenyan guidelines.</p>
                 </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
