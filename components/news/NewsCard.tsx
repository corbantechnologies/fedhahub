import Link from "next/link";
import { News } from "@/services/news";
import { Clock } from "lucide-react";
import Image from "next/image";

interface NewsCardProps {
  article: News;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link href={`/news/${article.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-100">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-6 text-center transition-transform duration-500 group-hover:scale-105">
            <span className="text-white/30 font-bold text-3xl italic tracking-widest uppercase">FedhaHub</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 shadow-sm">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-slate-500 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
          {article.brief}
        </p>
        <div className="flex items-center text-xs text-slate-400 font-medium mt-auto pt-4 border-t border-slate-100">
          <Clock className="w-4 h-4 mr-1.5" />
          <span>{article.read_time_minutes} min read</span>
          <span className="mx-2">•</span>
          <time dateTime={article.created_at}>
            {new Date(article.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}
