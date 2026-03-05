"use client"

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";
import { News } from "./news";

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    reference: string;
    created_at: string;
    updated_at: string;
    news: News[];
}


export const getCategories = async () => {
    const response: AxiosResponse<PaginatedResponse<Category>> = await apiActions.get("api/v1/news/categories/");
    return response.data.results;
}

export const getCategory = async (slug: string) => {
    const response: AxiosResponse<Category> = await apiActions.get(`api/v1/news/categories/${slug}/`);
    return response.data;
}
