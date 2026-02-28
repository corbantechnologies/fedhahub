"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorLayoutProps {
    title: string;
    subtitle: string;
    formContent: React.ReactNode;
    resultsContent: React.ReactNode;
    seoHtmlContent?: string;
    faqs?: { question: string; answer: string }[];
}

export default function CalculatorLayout({
    title,
    subtitle,
    formContent,
    resultsContent,
    seoHtmlContent,
    faqs,
}: CalculatorLayoutProps) {
    return (
        <div className="w-full flex justify-center pb-16">
            <div className="w-full">
                {/* Header */}
                <div className="bg-slate-50 pt-16 pb-12 border-b border-slate-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight sm:text-5xl">{title}</h1>
                        <p className="mt-4 text-lg text-slate-500">{subtitle}</p>
                    </div>
                </div>

                {/* Body */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Form */}
                        <div className="md:col-span-7 border border-slate-200">
                            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                                {formContent}
                            </div>
                        </div>

                        {/* Right Column: Results Sticky */}
                        <div className="md:col-span-5 sticky top-24">
                            <div className="bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 p-6 sm:p-8">
                                {resultsContent}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Content Section */}
                {seoHtmlContent && (
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                        <div
                            className="prose prose-slate max-w-3xl mx-auto prose-headings:font-semibold prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: seoHtmlContent }}
                        />
                    </div>
                )}

                {/* FAQ Section */}
                {faqs && faqs.length > 0 && (
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24 max-w-3xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
                        <Accordion.Root type="single" collapsible className="w-full space-y-4">
                            {faqs.map((faq, index) => (
                                <Accordion.Item
                                    key={index}
                                    value={`item-${index}`}
                                    className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm"
                                >
                                    <Accordion.Header className="flex">
                                        <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 px-5 text-left text-base font-medium text-slate-900 transition-all hover:bg-slate-50 [&[data-state=open]>svg]:rotate-180">
                                            {faq.question}
                                            <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200" />
                                        </Accordion.Trigger>
                                    </Accordion.Header>
                                    <Accordion.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                        <div className="px-5 pb-5 pt-0 text-slate-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>
                            ))}
                        </Accordion.Root>
                    </div>
                )}
            </div>
        </div>
    );
}
