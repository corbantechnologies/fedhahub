"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { generateSaccoDividends, SaccoDividends } from "@/services/saccos";
import CalculatorLayout from "@/app/calculator-layout";
import { Loader2, PieChart } from "lucide-react";
import * as Label from "@radix-ui/react-label";

type FormValues = {
    share_capital: number;
    current_deposits: number;
    monthly_contribution: number;
    share_rate: number;
    deposit_rate: number;
};

export default function CalculateSaccoDividends() {
    const [result, setResult] = useState<SaccoDividends | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const mutation = useMutation({
        mutationFn: generateSaccoDividends,
        onSuccess: (data) => {
            setResult(data);
        },
    });

    const onSubmit = (data: FormValues) => {
        mutation.mutate({
            share_capital: Number(data.share_capital),
            current_deposits: Number(data.current_deposits),
            monthly_contribution: Number(data.monthly_contribution),
            share_rate: Number(data.share_rate),
            deposit_rate: Number(data.deposit_rate),
        });
    };

    const formContent = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Share Capital */}
                <div className="space-y-2 col-span-1 md:col-span-2">
                    <Label.Root className="text-sm font-medium text-slate-700" htmlFor="share_capital">
                        Fixed Share Capital (KES)
                    </Label.Root>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">KES</span>
                        <input
                            id="share_capital"
                            className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pl-12 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm"
                            type="number"
                            placeholder="e.g. 30000"
                            {...register("share_capital", { required: "Required", min: 0 })}
                        />
                    </div>
                    {errors.share_capital && <span className="text-sm text-red-500">{errors.share_capital.message}</span>}
                </div>

                {/* Current Deposits */}
                <div className="space-y-2">
                    <Label.Root className="text-sm font-medium text-slate-700" htmlFor="current_deposits">
                        Current BOSA Deposits
                    </Label.Root>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">KES</span>
                        <input
                            id="current_deposits"
                            className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pl-12 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm"
                            type="number"
                            placeholder="e.g. 250000"
                            {...register("current_deposits", { required: "Required", min: 0 })}
                        />
                    </div>
                    {errors.current_deposits && <span className="text-sm text-red-500">{errors.current_deposits.message}</span>}
                </div>

                {/* Monthly Contribution */}
                <div className="space-y-2">
                    <Label.Root className="text-sm font-medium text-slate-700" htmlFor="monthly_contribution">
                        Monthly Contribution
                    </Label.Root>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">KES</span>
                        <input
                            id="monthly_contribution"
                            className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pl-12 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm"
                            type="number"
                            placeholder="e.g. 10000"
                            {...register("monthly_contribution", { required: "Required", min: 0 })}
                        />
                    </div>
                    {errors.monthly_contribution && <span className="text-sm text-red-500">{errors.monthly_contribution.message}</span>}
                </div>

                {/* Share Dividend Rate */}
                <div className="space-y-2">
                    <Label.Root className="text-sm font-medium text-slate-700" htmlFor="share_rate">
                        Share Dividend Rate (%)
                    </Label.Root>
                    <div className="relative">
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">%</span>
                        <input
                            id="share_rate"
                            className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm pr-8"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 15.0"
                            {...register("share_rate", { required: "Required", min: 0 })}
                        />
                    </div>
                    {errors.share_rate && <span className="text-sm text-red-500">{errors.share_rate.message}</span>}
                </div>

                {/* Interest on Deposits Rate */}
                <div className="space-y-2">
                    <Label.Root className="text-sm font-medium text-slate-700" htmlFor="deposit_rate">
                        Deposit Interest Rate (%)
                    </Label.Root>
                    <div className="relative">
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">%</span>
                        <input
                            id="deposit_rate"
                            className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm pr-8"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 11.0"
                            {...register("deposit_rate", { required: "Required", min: 0 })}
                        />
                    </div>
                    {errors.deposit_rate && <span className="text-sm text-red-500">{errors.deposit_rate.message}</span>}
                </div>
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full inline-flex items-center justify-center rounded-md bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
            >
                {mutation.isPending ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Calculating...
                    </>
                ) : (
                    <>
                        <PieChart className="mr-2 h-5 w-5" />
                        Calculate Returns
                    </>
                )}
            </button>

            {mutation.isError && (
                <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm font-medium mt-4">
                    An error occurred. Check input values!
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
                <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-1">Net Payout to Bank</h3>
                <p className="text-3xl font-bold font-mono text-emerald-50">{formatCurrency(result.net_payout)}</p>
            </div>

            <div className="space-y-4">
                <h4 className="text-slate-300 text-sm font-semibold uppercase tracking-wider border-b border-slate-800 pb-2">Breakdown</h4>

                <div className="space-y-3 font-mono text-sm">
                    <div className="flex justify-between items-center text-emerald-300/80">
                        <span>Interest on Deposits</span>
                        <span>+{formatCurrency(result.gross_deposit_interest)}</span>
                    </div>

                    <div className="flex justify-between items-center text-emerald-300/80">
                        <span>Dividends on Shares</span>
                        <span>+{formatCurrency(result.gross_share_dividend)}</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-300 pt-1 border-t border-slate-800">
                        <span>Gross Total Payout</span>
                        <span>{formatCurrency(result.gross_total_payout)}</span>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800 text-red-300/80">
                        <div className="flex justify-between items-center">
                            <span>Withholding Tax (5%)</span>
                            <span>-{formatCurrency(result.withholding_tax_5_percent)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-slate-400 pt-4 border-t border-slate-800 mx-auto w-full text-center">
                        <span className="w-full text-center text-xs">End of Year Projected Deposits: <strong className="text-slate-200">{formatCurrency(result.end_of_year_deposits)}</strong></span>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                <PieChart className="h-8 w-8 text-slate-500" />
            </div>
            <p className="font-medium text-lg">Enter SACCO Details</p>
            <p className="text-sm text-slate-500 max-w-xs">See exactly how much you will receive as dividend payouts at year end after tax.</p>
        </div>
    );

    const seoHtmlContent = `
    <h2>How do Kenyan SACCOs Calculate Dividends?</h2>
    <p>Calculating SACCO dividends in Kenya is based on two types of savings components:</p>
    <ul>
      <li><strong>Share Capital:</strong> The mandatory non-refundable shares required to be a member. These earn a flat dividend rate applied to the full amount.</li>
      <li><strong>BOSA Deposits:</strong> Your monthly savings. Interest is earned on these.</li>
    </ul>
    <p>For your BOSA Deposits, the math handles existing early-year balances (which earn full interest) differently from your ongoing monthly contributions (which earn pro-rated interest based on the month they are deposited).</p>
    <p>Additionally, the Kenyan government mandates a flat <strong>5% Withholding Tax</strong> on all SACCO payouts. Our calculator automatically calculates the gross returns and minus the tax so you can see your exact Net Payout to bank.</p>
  `;

    const faqs = [
        {
            question: "Are SACCO dividends taxed?",
            answer: "Yes. All SACCO interest on deposits and share capital dividends are subject to a final 5% withholding tax by the Kenya Revenue Authority (KRA)."
        },
        {
            question: "What is the difference between Share Capital and Deposits?",
            answer: "Share capital is your equity ownership in the SACCO. It cannot be withdrawn unless you are leaving the SACCO and selling shares to another member. BOSA deposits are your regular savings, which can be multiplied to guarantee you a loan."
        },
        {
            question: "How is interest calculated on monthly contributions?",
            answer: "Most SACCOs use a weighted or pro-rated calculation for new deposits made during the year. For instance, January contributions earn 11 months of interest, while November contributions earn only 1 month."
        }
    ];

    return (
        <CalculatorLayout
            title="SACCO Dividends Calculator"
            subtitle="Project your exact annual returns based on share capital, deposits, and monthly savings."
            formContent={formContent}
            resultsContent={resultsContent}
            seoHtmlContent={seoHtmlContent}
            faqs={faqs}
        />
    );
}