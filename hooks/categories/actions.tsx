"use client";

import { getCategories, getCategory } from "@/services/categories";
import { useQuery } from "@tanstack/react-query";

export function useFetchCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
}

export function useFetchCategory(slug: string) {
    return useQuery({
        queryKey: ["category", slug],
        queryFn: () => getCategory(slug),
        enabled: !!slug,
    });
}