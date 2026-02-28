"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [open, setOpen] = React.useState(false);

    const links = [
        { href: "/paye-2026", label: "PAYE 2026" },
        { href: "/sacco-dividends", label: "SACCO Dividends" },
        { href: "/loan-calculator", label: "Loan Calculator" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <span className="bg-emerald-600 text-white p-1 rounded-md">FH</span>
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

                {/* Mobile Nav */}
                <div className="flex md:hidden">
                    <Dialog.Root open={open} onOpenChange={setOpen}>
                        <Dialog.Trigger asChild>
                            <button
                                className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
                                aria-label="Open menu"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                            <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[80%] max-w-sm border-l border-slate-200 bg-white p-6 shadow-xl sm:max-w-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                        <span className="bg-emerald-600 text-white p-1 rounded-md text-sm">FH</span>
                                        FedhaHub
                                    </span>
                                    <Dialog.Close asChild>
                                        <button
                                            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
                                            aria-label="Close menu"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </Dialog.Close>
                                </div>
                                <div className="flex flex-col gap-2">
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
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
            </div>
        </header>
    );
}
