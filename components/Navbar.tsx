"use client";

import * as React from "react";
import Link from "next/link";
import FedhaHubLogo from "@/components/FedhaHubLogo";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [open, setOpen] = React.useState(false);

    const links = [
        { href: "/paye", label: "PAYE 2026" },
        { href: "/sacco-dividends", label: "SACCO Dividends" },
        { href: "/loan-calculator", label: "Loan Calculator" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <FedhaHubLogo className="w-8 h-8" />
                        FedhaHub
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Nav Button */}
                <div className="flex md:hidden">
                    <button
                        onClick={() => setOpen(!open)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
                        aria-label="Open menu"
                    >
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <div
                className={cn(
                    "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-200 bg-white shadow-lg absolute w-full top-16",
                    open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-transparent shadow-none"
                )}
            >
                <div className="flex flex-col gap-2 p-4">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-md p-3 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
