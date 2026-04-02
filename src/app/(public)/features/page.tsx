"use client";

import { motion } from "motion/react";
import {
  BarChart3,
  Package,
  Truck,
  Users,
  Warehouse,
  CreditCard,
  ShieldCheck,
  History,
  ShoppingCart,
  PieChart,
  UserCheck,
} from "lucide-react";

export default function ServicesPage() {
  const SERVICES = [
    {
      title: "Inventory Control",
      desc: "Track stock for every product (SKU) with simple stock-in and stock-out records, low-stock alerts, and basic product categorization.",
      icon: <Package className="text-primary" size={32} />,
    },
    {
      title: "Sales Management",
      desc: "Manage daily sales easily with invoice creation, quotations, customer records, and return handling.",
      icon: <ShoppingCart className="text-blue-500" size={32} />,
    },
    {
      title: "Warehouse Management",
      desc: "Support for basic warehouse tracking, stock movement between stores, and organized product storage.",
      icon: <Warehouse className="text-green-500" size={32} />,
    },
    {
      title: "User & Role Management",
      desc: "Create employee accounts and assign permissions based on their role (Admin, Sales, Storekeeper, Accountant, Manager). Control who can view, edit, approve, or delete data to ensure security and accountability.",
      icon: <Users className="text-orange-500" size={32} />,
    },
    {
      title: "Loan Management",
      desc: "Record and track customer loans, manage repayment schedules, monitor outstanding balances, and generate loan payment reports for better financial control.",
      icon: <UserCheck className="text-purple-500" size={32} />,
    },
    {
      title: "Financial Reporting",
      desc: "Generate simple financial summaries, sales reports, expense tracking, and profit overview for better decision-making.",
      icon: <PieChart className="text-indigo-500" size={32} />,
    },
    {
      title: "System Security",
      desc: "User login control with role-based permissions to protect business data and limit access.",
      icon: <History className="text-rose-500" size={32} />,
    },
    {
      title: "Audit & Compliance",
      desc: "Complete history of every transaction with user activity logs for maximum accountability.",
      icon: <ShieldCheck className="text-teal-500" size={32} />,
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 lg:py-24 space-y-24">
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Comprehensive <span className="text-primary">ERP Suite</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground leading-relaxed"
        >
          Discover a set of integrated modules designed to scale with your
          enterprise, providing deep visibility into every corner of your
          operations.
        </motion.p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="p-8 bg-card border border-border shadow-sm rounded-3xl hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col items-center text-center space-y-6 group"
          >
            <div className="p-4 bg-muted rounded-2xl group-hover:scale-110 group-hover:bg-primary/10 transition-all">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Integration Section */}
      <section className="p-12 lg:p-24 bg-foreground text-background rounded-[3rem] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Seamless mobile-to-cloud <br className="hidden md:block" />{" "}
              integration.
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Manage your inventory from your pocket or your desktop. AIM Stock
              lets you work smoothly across devices with fast updates and an
              easy-to-use interface.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center space-y-2">
                <p className="text-white font-bold text-2xl">Mobile</p>
                <p className="text-xs text-muted-foreground">iOS / Android</p>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center space-y-2">
                <p className="text-white font-bold text-2xl">Easy Setup</p>
                <p className="text-xs text-muted-foreground">
                  Get started in minutes
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-primary/20 backdrop-blur-xl border border-primary/20 rounded-2xl text-center space-y-2">
                <p className="text-white font-bold text-2xl">Real-time</p>
                <p className="text-xs text-muted-foreground">Live updates</p>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center space-y-2">
                <p className="text-white font-bold text-2xl">
                  Multi-user access
                </p>
                <p className="text-xs text-muted-foreground">
                  Multiple users can access the system
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
