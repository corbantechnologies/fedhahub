"use client"

import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";
import { apiActions } from "@/tools/axios";

export interface News {
    id: string;
    title: string;
    image: string;
    slug: string;
    category: string;
    brief: string;
    body: string; // it is in markdown format
    read_time_minutes: number;
    source_url: string | null;
    is_featured: boolean;
    is_published: boolean;
    reference: string;
    created_at: string;
    updated_at: string;
}

export const getNews = async () => {
    const response: AxiosResponse<PaginatedResponse<News>> = await apiActions.get(`/api/v1/news/`);
    return response.data.results;
}

export const getNewsDetail = async (slug: string) => {
    const response: AxiosResponse<News> = await apiActions.get(`/api/v1/news/${slug}/`);
    return response.data;
}