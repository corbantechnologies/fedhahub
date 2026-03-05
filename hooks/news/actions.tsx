"use client";

import { getNews, getNewsDetail } from "@/services/news";
import { useQuery } from "@tanstack/react-query";

export function useFetchNews() {
    return useQuery({
        queryKey: ["news"],
        queryFn: getNews,
    });
}

export function useFetchNewsDetail(slug: string) {
    return useQuery({
        queryKey: ["news", slug],
        queryFn: () => getNewsDetail(slug),
        enabled: !!slug,
    });
}