"use client";

import { motion } from "motion/react";
import { Check, HelpCircle, Zap, ShieldCheck, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    price: { monthly: 29, yearly: 290 },
    description: "Perfect for small warehouses looking to digitize their inventory.",
    features: [
      "Up to 500 SKUs",
      "2 User Licenses",
      "Basic Inventory Tracking",
      "Mobile App Access",
      "Email Support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: { monthly: 99, yearly: 990 },
    description: "Advanced features for growing businesses with multiple locations.",
    features: [
      "Unlimited SKUs",
      "10 User Licenses",
      "Advanced Analytics",
      "Multi-Warehouse Support",
      "API Access",
      "Priority Support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    description: "Tailored solutions for large-scale operations and global enterprises.",
    features: [
      "Custom User Licenses",
      "Dedicated Account Manager",
      "On-premise Deployment Option",
      "Custom Integrations",
      "White-labeling",
      "24/7 Phone Support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const FAQS = [
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings.",
  },
  {
    question: "Do you offer a free trial?",
    answer: "We offer a 14-day free trial for both Starter and Professional plans. No credit card required.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and wire transfers for Enterprise customers.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and follow industry best practices for data security.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

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
            <span>Transparent Pricing</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Simple Plans for <span className="text-primary">Every Business</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Choose the plan that's right for you. All plans include core ERP features to help you scale efficiently.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={cn("text-sm font-medium", !isYearly ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-muted rounded-full p-1 transition-colors hover:bg-primary/20 focus:outline-none"
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 bg-primary rounded-full shadow-lg"
              />
            </button>
            <span className={cn("text-sm font-medium", isYearly ? "text-foreground" : "text-muted-foreground")}>
              Yearly <span className="text-primary text-xs font-bold ml-1">(Save 20%)</span>
            </span>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-primary/5",
                plan.popular ? "border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20" : "border-border/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {typeof plan.price === "string" ? plan.price : isYearly ? `$${plan.price.yearly}` : `$${plan.price.monthly}`}
                  </span>
                  {typeof plan.price !== "string" && (
                    <span className="text-muted-foreground font-medium">/{isYearly ? "year" : "month"}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 rounded-full p-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.popular ? "default" : "outline"}
                className={cn(
                  "w-full h-12 text-lg rounded-xl font-bold transition-all",
                  plan.popular ? "bg-primary hover:bg-primary/90 text-white" : "hover:bg-primary/5 hover:text-primary hover:border-primary/50"
                )}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 py-12 border-y border-border/50">
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Mock Trust Icons */}
           <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck className="text-primary" /> SecurePay</div>
           <div className="flex items-center gap-2 font-bold text-xl"><Globe className="text-primary" /> GlobalSync</div>
           <div className="flex items-center gap-2 font-bold text-xl"><Zap className="text-primary" /> FastFlow</div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about our plans and billing.</p>
        </div>

        <div className="grid gap-6">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors"
            >
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                {faq.question}
              </h3>
              <p className="text-muted-foreground text-sm py-2 px-4 border-l-2 border-primary/10 ml-1">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-primary p-12 lg:p-20 rounded-[3rem] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold">Still have questions?</h2>
            <p className="text-xl text-primary-foreground/90">
              Our team is ready to help you find the best plan for your business needs. 
              Get in touch with us today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-xl font-bold flex items-center gap-2">
                Talk to Sales <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
