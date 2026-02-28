import React from "react";
import { Metadata } from "next";
import FedhaHubLogo from "@/components/FedhaHubLogo";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about FedhaHub and Corban Technologies LTD.",
};

export default function AboutUsPage() {
    return (
        <>
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-8 mt-2">
                <FedhaHubLogo className="w-12 h-12 shrink-0" />
                <h1 className="!mb-0 text-slate-900">About Us</h1>
            </div>

            <h3>The Mission</h3>
            <p>
                FedhaHub was created to provide Kenyans with fast, accurate, and completely free financial utilities. Navigating changing tax brackets, SHIF deductions, and complex SACCO dividend formulas shouldn't require a finance degree. Our tools are meticulously updated to reflect the latest 2026 statutory laws, making financial planning accessible to everyone.
            </p>

            <h3>The Engineering</h3>
            <p>
                FedhaHub is engineered, designed, and maintained by Corban Technologies LTD. We leverage modern, secure web technologies to ensure that your financial calculations are not only highly accurate but also completely private.
            </p>

            <h3>Disclaimer</h3>
            <div className="bg-slate-100 p-6 rounded-lg border border-slate-200 mt-4 text-slate-700 italic text-sm">
                The calculators and content provided on FedhaHub are for educational and informational purposes only. While we strive for 100% accuracy based on the latest guidelines from the Kenya Revenue Authority (KRA), NSSF, and regional SACCOs, these tools do not constitute certified financial, tax, or legal advice. Always consult with a certified accountant or your official SACCO representative for final figures.
            </div>
        </>
    );
}
