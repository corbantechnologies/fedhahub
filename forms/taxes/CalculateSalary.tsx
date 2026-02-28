"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { calculateSalary, Salary } from "@/services/taxes";
import CalculatorLayout from "@/app/calculator-layout";
import { Loader2, Calculator } from "lucide-react";
import * as Label from "@radix-ui/react-label";

type FormValues = {
    gross_salary: number;
};

export default function CalculateSalary() {
    const [result, setResult] = useState<Salary | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const mutation = useMutation({
        mutationFn: calculateSalary,
        onSuccess: (data) => {
            setResult(data);
        },
    });

    const onSubmit = (data: FormValues) => {
        mutation.mutate({ gross_salary: Number(data.gross_salary) });
    };

    const formContent = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label.Root className="text-sm font-medium text-slate-700" htmlFor="gross_salary">
                    Gross Basic Salary (KES)
                </Label.Root>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">KES</span>
                    <input
                        id="gross_salary"
                        className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pl-12 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all font-medium text-slate-900 shadow-sm"
                        type="number"
                        placeholder="e.g. 50000"
                        {...register("gross_salary", {
                            required: "Gross salary is required",
                            min: { value: 1000, message: "Minimum salary is KES 1,000" }
                        })}
                    />
                </div>
                {errors.gross_salary && (
                    <p className="text-sm text-red-500 font-medium mt-1">{errors.gross_salary.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full inline-flex items-center justify-center rounded-md bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {mutation.isPending ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Calculating...
                    </>
                ) : (
                    <>
                        <Calculator className="mr-2 h-5 w-5" />
                        Calculate PAYE
                    </>
                )}
            </button>

            {mutation.isError && (
                <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm font-medium mt-4">
                    An error occurred while calculating. Please check your inputs and try again.
                </div>
            )}
        </form>
    );

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(val);
    };

    const resultsContent = result ? (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 bg-emerald-950/20 rounded-lg border border-emerald-800">
                <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-1">Net Take-Home Pay</h3>
                <p className="text-3xl font-bold font-mono text-emerald-50">{formatCurrency(result.net_pay)}</p>
            </div>

            <div className="space-y-4">
                <h4 className="text-slate-300 text-sm font-semibold uppercase tracking-wider border-b border-slate-800 pb-2">Payslip Breakdown</h4>

                <div className="space-y-3 font-mono text-sm">
                    <div className="flex justify-between items-center text-slate-300">
                        <span>Gross Salary</span>
                        <span>{formatCurrency(result.gross_pay)}</span>
                    </div>

                    <div className="space-y-2 pt-2 pb-2 border-y border-slate-800 text-red-300/80">
                        <div className="flex justify-between items-center">
                            <span>NSSF (Tier 1 & 2)</span>
                            <span>-{formatCurrency(result.nssf)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>SHIF (2.75%)</span>
                            <span>-{formatCurrency(result.shif)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Housing Levy (1.5%)</span>
                            <span>-{formatCurrency(result.housing_levy)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-slate-300 pt-1">
                        <span>Taxable Pay</span>
                        <span>{formatCurrency(result.taxable_pay)}</span>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800 text-red-300/80">
                        <div className="flex justify-between items-center">
                            <span>PAYE (Tax on income)</span>
                            <span>-{formatCurrency(result.paye_before_relief)}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-emerald-300/80">
                        <span>Personal Relief</span>
                        <span>+{formatCurrency(result.personal_relief)}</span>
                    </div>
                    <div className="flex justify-between items-center text-red-300/80 font-semibold pt-1 border-t border-slate-800">
                        <span>Net PAYE Deduction</span>
                        <span>-{formatCurrency(result.net_paye)}</span>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-slate-500" />
            </div>
            <p className="font-medium text-lg">Enter your gross salary</p>
            <p className="text-sm text-slate-500 max-w-xs">Your detailed 2026 payslip breakdown will appear here instantly.</p>
        </div>
    );

    const seoHtmlContent = `
    <h2>How is the 2026 Kenyan PAYE Calculated?</h2>
    <p>Calculating your net pay in Kenya involves several statutory deductions before arriving at your final take-home salary. As of 2026, the key deductions include:</p>
    <ul>
      <li><strong>NSSF:</strong> The new NSSF Act requires a 6% deduction from your pensionable earnings, capped at specific tiers.</li>
      <li><strong>SHIF:</strong> The Social Health Insurance Fund takes 2.75% of your gross pay, replacing the old NHIF system.</li>
      <li><strong>Affordable Housing Levy:</strong> A mandatory 1.5% deduction on your gross salary.</li>
      <li><strong>PAYE:</strong> Tax bands are applied to your taxable income (Gross Pay minus NSSF), starting at 10% and going up to 35% for highest earners.</li>
    </ul>
    <p>To get your Net Pay, we take your Gross Salary, subtract NSSF, SHIF, Housing Levy, and the Net PAYE (which is your calculated PAYE minus the standard monthly Personal Relief of KES 2,400).</p>
  `;

    const faqs = [
        {
            question: "What is the new SHIF deduction?",
            answer: "SHIF (Social Health Insurance Fund) replaces NHIF. It is calculated as a flat 2.75% of your gross earnings, with no upper cap."
        },
        {
            question: "How is the Housing Levy calculated?",
            answer: "The Affordable Housing Levy is calculated as 1.5% of your gross basic salary. Both the employee and employer contribute 1.5% each."
        },
        {
            question: "What is the standard personal relief for 2026?",
            answer: "The standard personal relief remains at KES 2,400 per month. This amount is subtracted from your calculated PAYE to reduce your overall tax burden."
        }
    ];

    return (
        <CalculatorLayout
            title="2026 PAYE Calculator"
            subtitle="Calculate your Net Pay, SHIF, Housing Levy, and NSSF deductions accurately for 2026."
            formContent={formContent}
            resultsContent={resultsContent}
            seoHtmlContent={seoHtmlContent}
            faqs={faqs}
        />
    );
}