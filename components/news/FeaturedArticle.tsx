import Link from "next/link";
import { News } from "@/services/news";
import { Clock } from "lucide-react";
import Image from "next/image";

interface FeaturedArticleProps {
  article: News;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Link href={`/news/${article.slug}`} className="group relative block w-full rounded-3xl overflow-hidden shadow-xl mb-12 border border-slate-200 bg-slate-900">
      <div className="absolute inset-0 z-0">
        {article.image ? (
          <>
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 transition-transform duration-700 group-hover:scale-105" />
        )}
      </div>
      
      <div className={`relative z-10 flex flex-col justify-end p-6 sm:p-10 w-full max-w-4xl transition-all duration-300 ${
        article.image 
          ? "min-h-[450px] sm:min-h-[600px]" 
          : "min-h-[300px] sm:min-h-[450px]"
      }`}>
        <div className="mb-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-500 text-white shadow-md">
            {article.category}
          </span>
          {/* <span className="ml-3 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500 text-white shadow-md uppercase tracking-wider">
            Featured
          </span> */}
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-emerald-300 transition-colors">
          {article.title}
        </h2>
        
        <p className="text-lg sm:text-xl text-slate-200 mb-6 line-clamp-2 max-w-3xl">
          {article.brief}
        </p>
        
        <div className="flex items-center text-sm text-slate-300 font-medium">
          <Clock className="w-5 h-5 mr-2" />
          <span>{article.read_time_minutes} min read</span>
          <span className="mx-3">•</span>
          <time dateTime={article.created_at}>
            {new Date(article.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}
