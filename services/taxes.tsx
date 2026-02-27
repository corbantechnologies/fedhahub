"use client";

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";

export interface Salary {
    gross_pay: number;
    nssf: number;
    shif: number;
    housing_levy: number;
    taxable_pay: number;
    paye_before_relief: number;
    personal_relief: number;
    net_paye: number;
    net_pay: number;
}

interface SalaryPayload {
    gross_salary: number;
}

export const calculateSalary = async (payload: SalaryPayload) => {
    const response: AxiosResponse<Salary> = await apiActions.post("api/v1/taxes/tax-calculation/", payload);
    return response.data;
};