"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { calculateLoan, Loan, LoanPayload } from "@/services/loans";
import CalculatorLayout from "@/app/calculator-layout";
import { Loader2, Landmark, ChevronDown, Check, ChevronUp } from "lucide-react";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

type FormValues = {
    mode: "fixed_term" | "fixed_payment";
    loan_type: "flat" | "reducing";
    principal: number;
    annual_rate: number;
    term_months?: number;
    payment_per_month?: number;
    start_date?: string;
};

export default function CalculateLoan() {
    const [result, setResult] = useState<Loan | null>(null);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            mode: "fixed_term",
            loan_type: "reducing",
            principal: 100000,
            annual_rate: 14.0,
            term_months: 12,
        }
    });

    const watchMode = watch("mode");

    const mutation = useMutation({
        mutationFn: calculateLoan,
        onSuccess: (data) => {
            setResult(data);
        },
    });

    const onSubmit = (data: FormValues) => {
        const payload: LoanPayload = {
            mode: data.mode,
            loan_type: data.loan_type,
            principal: Number(data.principal),
            annual_rate: Number(data.annual_rate),
        };

        if (data.mode === "fixed_term") {
            payload.term_months = Number(data.term_months);
        } else {
            payload.payment_per_month = Number(data.payment_per_month);
        }

        if (data.start_date) {
            payload.start_date = data.start_date;
        }

        mutation.mutate(payload);
    };

    const formContent = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Target Calculation Mode */}
            <div className="space-y-2">
                <Label.Root className="text-sm font-medium text-slate-700">Calculation Mode</Label.Root>
                <Controller
                    name="mode"
                    control={control}
                    render={({ field }) => (
                        <Select.Root value={field.value} onValueChange={field.onChange}>
                            <Select.Trigger className="flex h-12 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium">
                                <Select.Value placeholder="Select Mode" />
                                <Select.Icon>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content className="z-50 overflow-hidden rounded-md border border-slate-200 bg-white text-slate-900 shadow-lg animate-in fade-in-80">
                                    <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
                                        <ChevronUp className="h-4 w-4" />
                                    </Select.ScrollUpButton>
                                    <Select.Viewport className="p-1">
                                        <Select.Item value="fixed_term" className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 font-medium">
                                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                                <Select.ItemIndicator>
                                                    <Check className="h-4 w-4" />
                                                </Select.ItemIndicator>
                                            </span>
                                            <Select.ItemText>Fixed Term (Calculate Payment)</Select.ItemText>
                                        </Select.Item>
                                        <Select.Item value="fixed_payment" className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 font-medium">
                                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                                <Select.ItemIndicator>
                                                    <Check className="h-4 w-4" />
                                                </Select.ItemIndicator>
                                            </span>
                                            <Select.ItemText>Fixed Payment (Calculate Term)</Select.ItemText>
                                        </Select.Item>
                                    </Select.Viewport>
                                    <Select.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
                                        <ChevronDown className="h-4 w-4" />
                                    </Select.ScrollDownButton>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    )}
                />
            </div>

            {/* Loan Type */}
            <div className="space-y-2">
                <Label.Root className="text-sm font-medium text-slate-700">Interest Type</Label.Root>
                <Controller
                    name="loan_type"
                    control={control}
                    render={({ field }) => (
                        <Select.Root value={field.value} onValueChange={field.onChange}>
                            <Select.Trigger className="flex h-12 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium">
                                <Select.Value placeholder="Select Interest Type" />
                                <Select.Icon>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content className="z-50 overflow-hidden rounded-md border border-slate-200 bg-white text-slate-900 shadow-lg animate-in fade-in-80">
                                    <Select.Viewport className="p-1">
                                        <Select.Item value="reducing" className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 font-medium">
                                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                                <Select.ItemIndicator><Check className="h-4 w-4" /></Select.ItemIndicator>
                                            </span>
                                            <Select.ItemText>Reducing Balance</Select.ItemText>
                                        </Select.Item>
                                        <Select.Item value="flat" className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 font-medium">
                                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                                <Select.ItemIndicator><Check className="h-4 w-4" /></Select.ItemIndicator>
                                            </span>
                                            <Select.ItemText>Flat Rate</Select.ItemText>
                                        </Select.Item>
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Principal */}
                <div className="space-y-2 md:col-span-2">
                    <Label.Root className="text-sm font-medium text-slate-700" htmlFor="principal">Principal Amount (KES)</Label.Root>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">KES</span>
                        <input
                            id="principal"
                            className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pl-12 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm"
                            type="number"
                            placeholder="e.g. 500000"
                            {...register("principal", { required: "Required", min: 100 })}
                        />
                    </div>
                    {errors.principal && <span className="text-sm text-red-500">{errors.principal.message}</span>}
                </div>

                {/* Annual Rate */}
                <div className="space-y-2">
                    <Label.Root className="text-sm font-medium text-slate-700" htmlFor="annual_rate">Annual Interest Rate (%)</Label.Root>
                    <div className="relative">
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">%</span>
                        <input
                            id="annual_rate"
                            className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm pr-8"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 14.0"
                            {...register("annual_rate", { required: "Required", min: 1 })}
                        />
                    </div>
                    {errors.annual_rate && <span className="text-sm text-red-500">{errors.annual_rate.message}</span>}
                </div>

                {/* Dynamic Field (Term vs Payment) */}
                {watchMode === "fixed_term" ? (
                    <div className="space-y-2">
                        <Label.Root className="text-sm font-medium text-slate-700" htmlFor="term_months">Loan Term (Months)</Label.Root>
                        <input
                            id="term_months"
                            className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm"
                            type="number"
                            placeholder="e.g. 36"
                            {...register("term_months", { required: "Required for Fixed Term Mode", min: 1 })}
                        />
                        {errors.term_months && <span className="text-sm text-red-500">{errors.term_months.message}</span>}
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Label.Root className="text-sm font-medium text-slate-700" htmlFor="payment_per_month">Monthly Payment (KES)</Label.Root>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">KES</span>
                            <input
                                id="payment_per_month"
                                className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pl-12 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm"
                                type="number"
                                placeholder="e.g. 15000"
                                {...register("payment_per_month", { required: "Required for Fixed Payment Mode", min: 100 })}
                            />
                        </div>
                        {errors.payment_per_month && <span className="text-sm text-red-500">{errors.payment_per_month.message}</span>}
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full inline-flex items-center justify-center rounded-md bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
            >
                {mutation.isPending ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Schedule...
                    </>
                ) : (
                    <>
                        <Landmark className="mr-2 h-5 w-5" />
                        Amortize Loan
                    </>
                )}
            </button>

            {mutation.isError && (
                <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm font-medium mt-4">
                    An error occurred calculating the loan. Ensure your inputs (e.g. payment is large enough to cover interest) are valid.
                </div>
            )}
        </form>
    );

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(val);
    };

    const resultsContent = result ? (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-950/20 rounded-lg border border-emerald-800 col-span-2">
                    <h3 className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">Monthly Payment</h3>
                    <p className="text-3xl font-bold font-mono text-emerald-50">{formatCurrency(result.monthly_payment)}</p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Interest</h3>
                    <p className="text-lg font-semibold font-mono text-slate-50">{formatCurrency(result.total_interest)}</p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Term (Months)</h3>
                    <p className="text-lg font-semibold font-mono text-slate-50">{result.term_months} mos</p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 col-span-2">
                    <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Repayment</h3>
                    <p className="text-xl font-semibold font-mono text-slate-50">{formatCurrency(result.total_repayment)}</p>
                </div>
            </div>

            <div className="space-y-2 mt-6">
                <h4 className="text-slate-300 text-sm font-semibold uppercase tracking-wider border-b border-slate-800 pb-2">Amortization Schedule (First 3 Months)</h4>

                <div className="space-y-2">
                    {result.schedule.slice(0, 3).map((item, i) => (
                        <div key={i} className="bg-slate-800/30 p-3 rounded-md border border-slate-700/50 text-xs font-mono flex flex-col gap-1">
                            <div className="flex justify-between text-emerald-400 pb-1 border-b border-slate-700/50">
                                <span>{item.due_date}</span>
                                <span>Pill: {formatCurrency(item.total_due)}</span>
                            </div>
                            <div className="flex justify-between text-slate-400 mt-1">
                                <span>Principal: {formatCurrency(item.principal_due)}</span>
                                <span>Interest: {formatCurrency(item.interest_due)}</span>
                            </div>
                            <div className="flex justify-between text-slate-300 pt-1">
                                <span>Balance</span>
                                <span>{formatCurrency(item.balance_after)}</span>
                            </div>
                        </div>
                    ))}
                    {result.schedule.length > 3 && (
                        <div className="text-center text-xs text-slate-500 py-2 italic font-mono">
                            + {result.schedule.length - 3} more months...
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                <Landmark className="h-8 w-8 text-slate-500" />
            </div>
            <p className="font-medium text-lg">Loan Configuration</p>
            <p className="text-sm text-slate-500 max-w-xs">Instantly generate a full amortization schedule based on flat or reducing balance.</p>
        </div>
    );

    const seoHtmlContent = `
    <h2>Comparing Flat vs. Reducing Balance Loans</h2>
    <p>Understanding exactly how your bank or SACCO calculates loan interest is the most important factor in borrowing smart.</p>
    <ul>
      <li><strong>Reducing Balance:</strong> Interest is charged solely on the remaining principal balance. As you pay off the principal each month, your interest portion drops, often making this the cheaper option.</li>
      <li><strong>Flat Rate:</strong> Interest is calculated on the original principal amount throughout the entire term. This results in much higher total interest paid compared to a reducing balance loan at the exact same percentage rate.</li>
    </ul>
    <p>Using FedhaHub's advanced amortization engine, you can instantly compare both methods and determine the true "Effective Annual Rate" (APR) of your financial commitments.</p>
  `;

    const faqs = [
        {
            question: "What is 'Fixed Term' vs 'Fixed Payment' mode?",
            answer: "In Fixed Term mode, you define how long you want to pay (e.g., 36 months) and we calculate exactly how much you must pay each month. In Fixed Payment mode, you tell us how much you can afford to pay weekly/monthly, and we'll tell you how many months it will take to clear the debt."
        },
        {
            question: "Why does Flat Rate interest seem more expensive?",
            answer: "A 12% reducing balance loan continually re-evaluates interest on a smaller balance. A 12% flat rate loan charges interest on the full original starting amount until the very last day, meaning you are virtually paying interest on money you've already repaid!"
        }
    ];

    return (
        <CalculatorLayout
            title="Advanced Loan Calculator"
            subtitle="Compare flat vs reducing balance interest methods and generate amortization schedules."
            formContent={formContent}
            resultsContent={resultsContent}
            seoHtmlContent={seoHtmlContent}
            faqs={faqs}
        />
    );
}