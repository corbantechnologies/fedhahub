"use client";

import React from "react";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full min-h-[calc(100vh-140px)] bg-slate-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-slate-900 prose-h2:text-slate-800 prose-a:text-emerald-600 hover:prose-a:text-emerald-500">
                    {children}
                </div>
            </div>
        </div>
    );
}