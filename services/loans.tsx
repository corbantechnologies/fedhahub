"use client"

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";

export interface Loan {
    term_months: number;
    monthly_payment: number;
    total_interest: number;
    total_repayment: number;
    schedule: LoanSchedule[];
}

export interface LoanSchedule {
    due_date: string;
    principal_due: number;
    interest_due: number;
    total_due: number;
    balance_after: number;
}

export interface LoanPayload {
    mode: string;
    loan_type: string;
    principal: number;
    annual_rate: number;
    term_months?: number; // optional
    payment_per_month?: number; // optional
    start_date?: string; // optional
}

export const calculateLoan = async (payload: LoanPayload) => {
    const response: AxiosResponse<Loan> = await apiActions.post("api/v1/loans/calculate-loan/", payload);
    return response.data;
}; 