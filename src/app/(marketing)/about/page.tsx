"use client";

import { motion } from "motion/react";
import { Shield, Target, Users, Zap, CheckCircle2 } from "lucide-react";
import { match } from "assert";
import { on } from "events";

const values = [
  {
    title: "Simplicity",
    desc: "We build system that are easy to use, easy to learn, and practical for real businesses.",
    icon: <Zap className="text-primary" />,
  },
  {
    title: "Reliability",
    desc: "We ensure accurate tracking and stable performance so businesses can depend on our system every day.",
    icon: <Shield className="text-primary" />,
  },
  {
    title: "Customer Success",
    desc: "We focus on helping businesses grow through strong support, training, and continuous improvement.",
    icon: <Users className="text-primary" />,
  },
  {
    title: "Innovation for Growth",
    desc: "We continuously improve our solutions to match the changing needs of businesses in Ethiopia and across Africa",
    icon: <Users className="text-primary" />,
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 lg:py-24 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Empowering Enterprises with{" "}
          <span className="text-primary">Precision</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground leading-relaxed"
        >
          Built by a team of logistics and software experts, AIM Stock was
          created to solve the complexities of modern supply chain management.
          We believe that technology should simplify operations, not complicate
          them.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="grid lg:grid-cols-2 gap-12">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -30 }}
          viewport={{ once: true }}
          className="p-12 bg-card border border-border shadow-2xl rounded-3xl space-y-6"
        >
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-xl">
            <Target className="text-primary" size={24} />
          </div>
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To empower small and medium businesses in Ethiopia with a simple,
            reliable, and affordable inventory management system that improves
            control, reduces losses, and supports business growth.
          </p>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 30 }}
          viewport={{ once: true }}
          className="p-12 bg-primary text-white shadow-2xl rounded-3xl space-y-6"
        >
          <div className="w-12 h-12 bg-white/20 flex items-center justify-center rounded-xl">
            <Zap className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold">Our Vision</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            To become the most trusted and widely chosen inventory and business
            management system for small and medium businesses in Ethiopia, and
            to expand our impact across Africa as a leading business solution.
          </p>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">What we stand for</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our values define our culture and the way we build our product.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-card border border-border shadow-sm rounded-2xl space-y-4 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center rounded-2xl mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold">{value.title}</h3>
              <p className="text-muted-foreground">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
