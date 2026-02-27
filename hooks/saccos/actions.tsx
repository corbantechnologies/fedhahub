"use client";

import { getSaccos, getSacco } from "@/services/saccos";
import { useQuery } from "@tanstack/react-query";

export function useFetchSaccos() {
    return useQuery({
        queryKey: ["saccos"],
        queryFn: getSaccos,
    });
}

export function useFetchSacco(slug: string) {
    return useQuery({
        queryKey: ["sacco", slug],
        queryFn: () => getSacco(slug),
        enabled: !!slug,
    });
}