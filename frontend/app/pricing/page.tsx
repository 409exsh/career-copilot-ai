import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "For focused job seekers managing applications manually.",
    features: ["Resume intelligence", "50 job scans/month", "ATS keyword matching", "Basic analytics"],
  },
  {
    name: "Pro Agent",
    price: "$49",
    description: "For active candidates who want AI-assisted applications.",
    features: ["Everything in Starter", "500 job scans/month", "Custom resume versions", "Screening answer drafts", "Platform integrations"],
    featured: true,
  },
  {
    name: "Career OS",
    price: "$99",
    description: "For power users and career coaches managing multiple pipelines.",
    features: ["Everything in Pro Agent", "Unlimited saved roles", "Advanced analytics", "Approval workflows", "Priority automation"],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <nav className="mx-auto mb-16 flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold">
          <span className="rounded-xl bg-cyan-400 p-2 text-black">
            <Sparkles size={20} />
          </span>
          Career Copilot AI
        </Link>

        <Link href="/signin" className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:bg-slate-900">
          Sign in
        </Link>
      </nav>

      <section className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Pricing</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">Plans for every job search velocity.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Start with resume intelligence, then unlock platform connections, AI customization, and approval-based auto-apply.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-3xl border p-8 ${
                plan.featured
                  ? "border-cyan-400 bg-cyan-400 text-black"
                  : "border-slate-800 bg-slate-950"
              }`}
            >
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className={`mt-3 leading-7 ${plan.featured ? "text-black/70" : "text-slate-400"}`}>
                {plan.description}
              </p>
              <div className="mt-8 flex items-end gap-2">
                <p className="text-5xl font-semibold">{plan.price}</p>
                <p className={plan.featured ? "text-black/60" : "text-slate-400"}>/month</p>
              </div>

              <Link
                href="/dashboard"
                className={`mt-8 block rounded-2xl px-5 py-4 text-center font-semibold ${
                  plan.featured
                    ? "bg-black text-white hover:bg-slate-900"
                    : "bg-white text-black hover:bg-slate-200"
                }`}
              >
                Start Free
              </Link>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <p key={feature} className="flex items-center gap-3">
                    <Check size={18} />
                    {feature}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
