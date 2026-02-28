import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Learn how FedhaHub handles and protects your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <h1>Privacy Policy</h1>

            <h3>Introduction</h3>
            <p>
                At FedhaHub, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by FedhaHub and how we use it.
            </p>

            <h3>Stateless Calculations (Crucial for Trust)</h3>
            <p>
                FedhaHub is built as a stateless utility. We do not store, save, or transmit your personal financial data (such as salary figures, loan amounts, or SACCO deposits) to any database. All calculations are processed instantly and are permanently deleted the moment you close the application or refresh the page.
            </p>

            <h3>Google AdSense & Cookies</h3>
            <p>
                Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.
            </p>
            <p>
                Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
            </p>
            <p>
                Users may opt out of personalized advertising by visiting Google's Ads Settings.
            </p>

            <h3>Analytics</h3>
            <p>
                We use basic, anonymized analytics to track page views and site performance to improve our calculators. No Personally Identifiable Information (PII) is captured during this process.
            </p>
        </>
    );
}
