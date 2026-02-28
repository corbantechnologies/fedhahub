import Link from "next/link";
import FedhaHubLogo from "@/components/FedhaHubLogo";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-white mt-auto">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
                        <Link href="/privacy-policy" className="hover:text-emerald-700 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/about-us" className="hover:text-emerald-700 transition-colors">
                            About Us
                        </Link>
                        <Link href="/contact" className="hover:text-emerald-700 transition-colors">
                            Contact
                        </Link>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-4 sm:mt-0">
                        <FedhaHubLogo className="w-5 h-5" />
                        <p className="text-sm text-slate-500 text-center">
                            &copy; {currentYear} FedhaHub. Built by Corban Technologies LTD.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
