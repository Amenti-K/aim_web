"use client";

import { motion } from "motion/react";
import {
  Check,
  HelpCircle,
  Zap,
  ShieldCheck,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    description:
      "Perfect for small teams getting started. The Starter plan gives you full access to the platform with just a few practical limits, making it ideal for small businesses and early-stage teams who want to explore everything before scaling.",
    price: {
      "3-months": 1000,
      "6-months": 1800,
      yearly: 3500,
    },
    limits: [
      { label: "Employees", value: "2" },
      { label: "Warehouses", value: "2" },
    ],
    features: [
      "ACCOUNT",
      "ANALYTICS",
      "AUTH",
      "COMPANY",
      "EMPLOYEE",
      "EXPENSE",
      "INVENTORY",
      "INVENTORY_ADJUSTMENT",
      "LOAN",
      "PARTNER",
      "PURCHASE",
      "REPORTS",
      "ROLE",
      "SALE",
      "SUBSCRIPTION",
      "WAREHOUSE",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    description:
      "Built for growing and established businesses. The Pro plan is designed for teams that need complete freedom, scalability, and control. It removes all limits and unlocks the platform at its full potential.",
    price: {
      "3-months": 1500,
      "6-months": 2500,
      yearly: 5000,
    },
    limits: [{ label: "All Limits", value: "Unlimited" }],
    features: [
      "ACCOUNT",
      "ANALYTICS",
      "AUTH",
      "COMPANY",
      "EMPLOYEE",
      "EXPENSE",
      "INVENTORY",
      "INVENTORY_ADJUSTMENT",
      "LOAN",
      "PARTNER",
      "PURCHASE",
      "REPORTS",
      "ROLE",
      "SALE",
      "SUBSCRIPTION",
      "WAREHOUSE",
    ],
    cta: "Get Started Now",
    popular: true,
  },
];

const FAQS = [
  {
    question: "What's the difference between the Starter and Pro plans?",
    answer:
      "The Starter plan is perfectly suited for smaller teams and includes practical limits on employees and warehouses. The Pro plan removes all those limits and offers full scalability for growing businesses.",
  },
  {
    question: "Can I change my billing interval later?",
    answer:
      "Yes, you can easily switch between 3-month, 6-month, or yearly billing cycles at any time from your subscription settings.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently accept Telebirr, CBE (Commercial Bank of Ethiopia), and various other local banking options popular in Ethiopia.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "We offer a 14-day free trial on our Starter plan so you can experience the platform's potential before committing.",
  },
];

type BillingInterval = "3-months" | "6-months" | "yearly";

export default function PricingPage() {
  const [interval, setInterval] = useState<BillingInterval>("3-months");

  const intervals: { label: string; value: BillingInterval; discount?: string }[] =
    [
      { label: "3 Months", value: "3-months" },
      { label: "6 Months", value: "6-months", discount: "Save 10%" },
      { label: "Yearly", value: "yearly", discount: "Save 15%" },
    ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="pt-20 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <Zap size={14} className="fill-primary" />
            <span>Scale with Confidence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Choose Your <span className="text-primary">Growth Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Flexible pricing options tailored for Ethiopian businesses. Whether
            you're a small team or a large enterprise, we scale with you.
          </p>

          {/* New Billing Toggle (Segmented Control) */}
          <div className="flex justify-center mb-10">
            <div className="relative p-1 bg-muted/50 backdrop-blur-sm border rounded-2xl flex items-center shadow-inner">
              {intervals.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setInterval(item.value)}
                  className={cn(
                    "relative px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 z-10",
                    interval === item.value
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {item.discount && (
                    <span className="absolute -top-4 -right-2 bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-full border border-primary/10">
                      {item.discount}
                    </span>
                  )}
                  {interval === item.value && (
                    <motion.div
                      layoutId="active-interval"
                      className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={cn(
                "relative flex flex-col p-8 lg:p-10 rounded-[2.5rem] border bg-card/40 backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5",
                plan.popular
                  ? "border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/5 scale-105 z-10"
                  : "border-border/60",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed min-h-[80px]">
                  {plan.description}
                </p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    ETB
                  </span>
                  <span className="text-5xl font-black tracking-tight">
                    {plan.price[interval].toLocaleString()}
                  </span>
                  <span className="text-muted-foreground font-medium text-sm">
                    / {interval === "yearly" ? "year" : interval}
                  </span>
                </div>
              </div>

              <hr className="mb-10 border-border/30" />

              <div className="space-y-10 flex-1">
                {/* Limits Section */}
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/70">
                    Plan Limits
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {plan.limits.map((limit) => (
                      <div
                        key={limit.label}
                        className="bg-muted/40 p-3 rounded-2xl border border-border/20"
                      >
                        <p className="text-[10px] text-muted-foreground font-bold uppercase">
                          {limit.label}
                        </p>
                        <p className="text-lg font-bold">{limit.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Section */}
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/70">
                    Included Features
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 group/feature"
                      >
                        <div className="bg-primary/10 rounded-full p-1 group-hover/feature:bg-primary/20 transition-colors">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-[11px] text-muted-foreground font-bold truncate">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                variant={plan.popular ? "default" : "outline"}
                className={cn(
                  "w-full h-14 mt-12 text-lg rounded-2xl font-black transition-all shadow-xl group",
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-white shadow-primary/20 hover:scale-[1.02]"
                    : "hover:bg-primary/5 hover:text-primary hover:border-primary/50",
                )}
              >
                {plan.cta}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
          {[
            { label: "Secure Payments", icon: <ShieldCheck /> },
            { label: "Local Support", icon: <Globe /> },
            { label: "Fast Deployment", icon: <Zap /> },
            { label: "24/7 Monitoring", icon: <ShieldCheck /> },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center text-primary">
                {badge.icon}
              </div>
              <p className="text-xs font-black uppercase tracking-widest whitespace-nowrap">
                {badge.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">Billing FAQ</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find answers to common questions about our simple, straightforward
            pricing model.
          </p>
        </div>

        <div className="grid gap-4">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-card/40 border border-border/40 hover:border-primary/30 transition-colors backdrop-blur-sm group"
            >
              <h3 className="font-bold text-lg mb-3 flex items-center gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-black">
                  {i + 1}
                </span>
                {faq.question}
              </h3>
              <p className="text-muted-foreground leading-relaxed pl-12 text-sm">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-primary/95 p-12 lg:p-24 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">
              Start Scaling Today.
            </h2>
            <p className="text-xl text-primary-foreground/90 lg:text-2xl leading-relaxed">
              Join hundreds of Ethiopian businesses optimizing their operations
              with AIM Stock ERP.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-16 px-10 text-xl rounded-2xl font-black flex items-center gap-3 shadow-2xl shadow-black/10 hover:scale-105 transition-transform"
                >
                  Contact Sales <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
