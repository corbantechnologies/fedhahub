"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import * as Label from "@radix-ui/react-label";

type ContactFormValues = {
    userName: string;
    email: string;
    message: string;
    website_url?: string; // honeypot
};

export default function ContactUsPage() {
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>();

    const mutation = useMutation({
        mutationFn: async (data: ContactFormValues) => {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
        onSuccess: () => {
            setIsSuccess(true);
            reset();
            setTimeout(() => setIsSuccess(false), 5000);
        },
    });

    const onSubmit = (data: ContactFormValues) => {
        mutation.mutate(data);
    };

    return (
        <div className="w-full min-h-[calc(100vh-140px)] bg-slate-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight sm:text-5xl">Contact Us</h1>
                    <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                        Have a question about a calculation, spotted an outdated tax band, or interested in advertising partnerships? We would love to hear from you.
                    </p>
                </div>

                <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                    {/* Top Section: Company Details */}
                    <div className="p-8 sm:p-12 bg-slate-900 text-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-white">Get in Touch</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <span className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-1">Developed By</span>
                                    <span className="text-lg font-medium">Corban Technologies LTD</span>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-800 p-2 rounded-md shrink-0">
                                        <MapPin className="h-5 w-5 text-emerald-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-1">Location</span>
                                        <span className="text-lg">Mombasa, Kenya</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 sm:col-span-2">
                                    <div className="bg-slate-800 p-2 rounded-md shrink-0">
                                        <Mail className="h-5 w-5 text-emerald-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-1">Email Support</span>
                                        <a href="mailto:info@fedhahub.co.ke" className="text-lg hover:text-emerald-300 transition-colors">info@fedhahub.co.ke</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-slate-800/50 p-6 rounded-xl border border-slate-800">
                            <h3 className="font-medium text-emerald-400 mb-2">Response Time</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                We aim to respond to all technical inquiries and partnership requests within 48 hours.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section: Contact Form */}
                    <div className="p-8 sm:p-12 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>

                        {isSuccess ? (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                    <Send className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h4 className="text-lg font-bold text-emerald-900 mb-2">Message Sent!</h4>
                                <p className="text-emerald-700 font-medium">Thank you for reaching out. We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* Honeypot Field */}
                                <input
                                    type="text"
                                    className="hidden"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    {...register("website_url")}
                                />

                                <div className="space-y-2">
                                    <Label.Root className="text-sm font-medium text-slate-700" htmlFor="userName">Your Name</Label.Root>
                                    <input
                                        id="userName"
                                        className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm"
                                        placeholder="John Doe"
                                        {...register("userName", { required: "Name is required" })}
                                    />
                                    {errors.userName && <span className="text-sm text-red-500 font-medium">{errors.userName.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <Label.Root className="text-sm font-medium text-slate-700" htmlFor="email">Email Address</Label.Root>
                                    <input
                                        id="email"
                                        type="email"
                                        className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm"
                                        placeholder="john@example.com"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                    {errors.email && <span className="text-sm text-red-500 font-medium">{errors.email.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <Label.Root className="text-sm font-medium text-slate-700" htmlFor="message">How can we help?</Label.Root>
                                    <textarea
                                        id="message"
                                        className="flex min-h-[140px] w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-medium text-slate-900 shadow-sm resize-y"
                                        placeholder="Write your message here..."
                                        {...register("message", { required: "Message is required", minLength: { value: 10, message: "Please provide more details." } })}
                                    />
                                    {errors.message && <span className="text-sm text-red-500 font-medium">{errors.message.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="w-full inline-flex items-center justify-center rounded-md bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {mutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-5 w-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {mutation.isError && (
                                    <p className="text-sm text-red-600 font-medium text-center mt-2">
                                        Failed to send message. Please try again.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
