import React from "react";

export default function FedhaHubLogo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className={className}
            fill="none"
            aria-label="FedhaHub Logo"
        >
            {/* Deep Navy Background Plate (Trust/Security) */}
            <rect width="200" height="200" rx="48" fill="#0F172A" />

            {/* Emerald Green Upward Trend / Stylized 'F' */}
            <path
                d="M60 140V60H140"
                stroke="#10B981"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M60 100H115"
                stroke="#10B981"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Mint Green Accent Dot (The 'Hub' / Coin) */}
            <circle cx="140" cy="140" r="18" fill="#34D399" />
        </svg>
    );
}