"use client";

import { motion } from "motion/react";
import { ShieldCheck, Scale, AlertTriangle, FileText, CheckCircle } from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "March 30, 2026";

  const sections = [
    {
      icon: <CheckCircle className="text-primary" />,
      title: "1. Acceptance of Terms",
      content: "By accessing or using the AIM Stock ERP platform, mobile application, or any associated service, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not use the services."
    },
    {
      icon: <FileText className="text-primary" />,
      title: "2. Description of Service",
      content: "AIM Stock is a business-to-business (B2B) inventory and stock management tool. It provides tracking for inventory levels, sales, purchases, warehouse logistics, and internal reporting. AIM Stock is NOT a financial institution and does NOT provide banking or direct investment services."
    },
    {
      icon: <ShieldCheck className="text-primary" />,
      title: "3. User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete data relating to your business assets and inventory records."
    },
    {
      icon: <AlertTriangle className="text-orange-500" />,
      title: "4. Prohibited Uses",
      content: "You may not use AIM Stock for any illegal activities, including but not limited to tracking restricted or stolen goods, money laundering, or violating any trade regulations. Misuse of the platform will lead to immediate account termination."
    },
    {
      icon: <Scale className="text-primary" />,
      title: "5. Limitation of Liability",
      content: "While we strive for 99.9% uptime and data accuracy, AIM Stock is provided on an 'as is' basis. We are not liable for any business losses, data inaccuracies resulting from user input, or temporary system outages that may occur during maintenance."
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 lg:py-24 space-y-16">
      {/* Header Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
        >
          <Scale size={14} className="fill-primary" />
          <span>Terms & Conditions</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Agreement for <span className="text-primary">Business</span> Success.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground leading-relaxed"
        >
          Please read these terms carefully before starting your journey with AIM Stock. 
          They define your rights and responsibilities as a user of our ERP platform.
        </motion.p>
        <div className="text-sm text-muted-foreground pt-4">
          Last Updated: {lastUpdated}
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-card border border-border/50 shadow-sm rounded-3xl space-y-4 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold">{section.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-14">
              {section.content}
            </p>
          </motion.div>
        ))}

        <div className="p-12 bg-primary text-white rounded-[2.5rem] shadow-2xl mt-16 text-center space-y-6">
          <h2 className="text-3xl font-bold">Still have questions?</h2>
          <p className="text-white/80 text-lg">
            Our legal and support teams are available to clarify any part of these terms.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-white text-primary rounded-xl font-bold shadow-xl hover:scale-105 transition-transform active:scale-95">
              Contact Sales
            </button>
            <button className="px-8 py-3 border border-white/30 rounded-xl font-bold hover:bg-white/10 transition-colors">
              Read Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
