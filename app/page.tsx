import Link from "next/link";
import { ArrowRight, Calculator, PieChart, Landmark } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-slate-900 text-white py-24 sm:py-32 relative overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent blur-3xl opacity-50 transform rotate-12" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Smart Financial Tools for <span className="text-emerald-400">Kenyans</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Accurate, up-to-date 2026 tax brackets, SACCO dividend projections, and loan calculators. Make informed financial decisions instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/paye"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-900/20"
            >
              Calculate 2026 PAYE
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/sacco-dividends"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded-lg font-medium transition-colors ring-1 ring-slate-700"
            >
              SACCO Dividends
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Cards Section */}
      <section className="w-full py-20 bg-slate-50 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need in one place</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Our calculators are built with the latest 2026 guidelines, ensuring you get the most accurate deductions and financial projections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Link href="/paye" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all hover:border-emerald-200">
              <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all">
                <Calculator className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">2026 NET PAY / PAYE</h3>
              <p className="text-slate-500 leading-relaxed">
                Calculate your take-home pay including SHIF, Housing Levy, NSSF, and standard PAYE tax bands automatically.
              </p>
            </Link>

            {/* Feature 2 */}
            <Link href="/sacco-dividends" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all hover:border-emerald-200">
              <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all">
                <PieChart className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">SACCO Dividends</h3>
              <p className="text-slate-500 leading-relaxed">
                Project your annual returns based on share capital and deposits with weighted average calculations.
              </p>
            </Link>

            {/* Feature 3 */}
            <Link href="/loan-calculator" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all hover:border-emerald-200">
              <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all">
                <Landmark className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Loan Calculator</h3>
              <p className="text-slate-500 leading-relaxed">
                Compare reducing balance vs flat rate loans. Generate complete amortization schedules instantly.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
