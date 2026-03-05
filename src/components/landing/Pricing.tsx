"use client";

import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Starter",
    monthly: 999,
    features: ["GST Filing + Reconciliation", "Basic client management", "WhatsApp document intake"],
  },
  {
    name: "Professional",
    monthly: 2499,
    popular: true,
    features: ["All 8 compliance modules", "AI notice drafting", "Advanced team workflow and reports"],
  },
  {
    name: "Enterprise",
    monthly: null,
    features: ["Custom workflow automation", "SSO + role governance", "Dedicated onboarding + support"],
  },
];

function formatPrice(value: number | null, annual: boolean) {
  if (value === null) return "Custom";
  const final = annual ? Math.round(value * 12 * 0.8) : value;
  return annual ? `?${final.toLocaleString("en-IN")}/yr` : `?${value.toLocaleString("en-IN")}/mo`;
}

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  const ctaLabel = useMemo(() => (annual ? "Start Annual Plan" : "Start Monthly Plan"), [annual]);

  return (
    <section id="pricing" className="container py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-display-lg text-indigo-night">Pricing built for Indian CA firms</h2>
          <p className="mt-2 text-[12px] text-muted-ash">Switch annual billing for 20% savings.</p>
        </div>
        <button
          onClick={() => setAnnual((prev) => !prev)}
          className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-zinc-300 bg-white px-2 py-1"
        >
          <span className={cn("rounded-pill px-3 py-1 text-[10px] font-semibold", !annual ? "bg-indigo-night text-off-white" : "text-muted-ash")}>Monthly</span>
          <span className={cn("rounded-pill px-3 py-1 text-[10px] font-semibold", annual ? "bg-indigo-night text-off-white" : "text-muted-ash")}>Annual</span>
          <span className="rounded-pill bg-turmeric-gold/25 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#8a5e00]">20% OFF</span>
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className={cn("relative rounded-md border border-zinc-200 bg-warm-paper p-5", plan.popular && "border-saffron") }>
            {plan.popular ? (
              <span className="absolute -top-3 right-3 rounded-pill bg-saffron px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-ink-black">
                Most Popular
              </span>
            ) : null}
            <h3 className="text-heading-2 text-indigo-night">{plan.name}</h3>
            <p className="mt-2 font-display text-heading-1 text-ink-black">{formatPrice(plan.monthly, annual)}</p>
            <ul className="mt-4 space-y-2 text-[11px] text-muted-ash">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Button className="mt-5 w-full">{ctaLabel}</Button>
          </article>
        ))}
      </div>
    </section>
  );
}

