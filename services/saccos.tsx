"use client"

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";

export interface SaccoDividends {
    end_of_year_deposits: number;
    gross_share_dividend: number;
    gross_deposit_interest: number;
    gross_total_payout: number;
    withholding_tax_5_percent: number;
    net_payout: number;
}

export interface Sacco {
    id: string;
    name: string;
    slug: string;
    dividend_rate_shares: string;
    interest_rate_deposits: string;
    financial_year: number;
    website_url: string;
    is_active: boolean;
    reference: string;
    created_at: string;
    updated_at: string;
}

interface SaccoDividendsPayload {
    share_capital: number;
    current_deposits: number;
    monthly_contribution: number;
    share_rate: number;
    deposit_rate: number;
}

export const generateSaccoDividends = async (payload: SaccoDividendsPayload) => {
    const response: AxiosResponse<SaccoDividends> = await apiActions.post("api/v1/saccos/calculate-dividends/", payload);
    return response.data;
}

export const getSaccos = async () => {
    const response: AxiosResponse<PaginatedResponse<Sacco>> = await apiActions.get("api/v1/saccos/sacco/");
    return response.data;
};

export const getSacco = async (slug: string) => {
    const response: AxiosResponse<Sacco> = await apiActions.get(`api/v1/saccos/sacco/${slug}/`);
    return response.data;
};
