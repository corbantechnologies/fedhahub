import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "FedhaHub Kenya",
        short_name: "FedhaHub",
        description: "Accurate 2026 Kenyan PAYE, SHIF, Housing Levy, SACCO, and loan calculators.",
        start_url: "/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#0F172A",
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
