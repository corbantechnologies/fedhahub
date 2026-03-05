"use client";

import { use } from "react";
import { useFetchNewsDetail, useFetchNews } from "@/hooks/news/actions";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Link as LinkIcon, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NewsCard from "@/components/news/NewsCard";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: article, isLoading, isError } = useFetchNewsDetail(slug);
  const { data: allNews } = useFetchNews();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-slate-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-600 mb-8">We couldn't find the article you're looking for. It may have been removed or published under a different link.</p>
          <Link href="/news" className="inline-flex items-center text-emerald-600 font-medium hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
          </Link>
        </div>
      </div>
    );
  }

  let relatedArticles = allNews 
    ? allNews.filter((n) => n.category === article.category && n.id !== article.id && n.is_published)
    : [];

  // If there are less than 4 articles in the same category, pad with other latest news
  if (relatedArticles.length < 4 && allNews) {
    const otherNews = allNews.filter((n) => n.id !== article.id && n.is_published && !relatedArticles.some((r) => r.id === n.id));
    relatedArticles = [...relatedArticles, ...otherNews].slice(0, 4);
  } else {
    relatedArticles = relatedArticles.slice(0, 4);
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Header */}
      <div className="relative w-full bg-slate-900 min-h-[400px] sm:min-h-[500px] flex flex-col justify-end">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {article.image ? (
            <>
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover opacity-60"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
          )}
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
          <Link href="/news" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
            </Link>
            
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-500 text-white shadow-sm">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-sm text-slate-300 font-medium gap-4">
              {article.author_name && (
                <div className="flex items-center text-emerald-300">
                  <User className="w-5 h-5 mr-2" />
                  {article.author_name}
                </div>
              )}
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {article.read_time_minutes} min read
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <time dateTime={article.created_at}>
                  {new Date(article.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
        </div>

      {/* Article Body */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pt-16">
        {/* Brief / Lead paragraph */}
        <div className="mb-12">
          <p className="text-xl sm:text-2xl text-slate-600 font-medium leading-relaxed border-l-4 border-emerald-500 pl-6 italic">
            {article.brief}
          </p>
        </div>

        {/* Markdown Content styling with Tailwind Typography `prose` */}
        <div className="prose prose-lg prose-slate prose-emerald max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.body}
          </ReactMarkdown>
        </div>

        {/* Source link if provided */}
        {article.source_url && (
          <div className="mt-16 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Official Source</h3>
            <a 
              href={article.source_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors font-medium"
            >
              <LinkIcon className="w-4 h-4 mr-2 text-slate-500" />
              View original document
            </a>
          </div>
        )}
      </article>

      {/* Related/Other News */}
      {relatedArticles.length > 0 && (
        <div className="bg-slate-50 mt-20 border-t border-slate-100 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
              More News {"&"} Insights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArticles.map((item) => (
                <NewsCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
