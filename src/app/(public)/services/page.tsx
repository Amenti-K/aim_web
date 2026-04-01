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
  UserCheck
} from "lucide-react";

export default function ServicesPage() {
  const SERVICES = [
    {
      title: "Inventory Master Control",
      desc: "Advanced tracking for every SKU with serial number management, batch tracking, and automated threshold alerts.",
      icon: <Package className="text-primary" size={32} />
    },
    {
      title: "Omnichannel Sales",
      desc: "Manage sales across multiple platforms. Automated invoicing, quotation generation, and returns processing.",
      icon: <ShoppingCart className="text-blue-500" size={32} />
    },
    {
      title: "Advanced Warehousing",
      desc: "Multi-warehouse support with bin location management and stock transfer optimization.",
      icon: <Warehouse className="text-green-500" size={32} />
    },
    {
      title: "Human Capital Management",
      desc: "Employee profiles, payroll processing, attendance tracking, and performance reviews in one place.",
      icon: <Users className="text-orange-500" size={32} />
    },
    {
      title: "Smart Procurement",
      desc: "Optimize purchasing with supplier management, purchase order automation, and lead-time analysis.",
      icon: <UserCheck className="text-purple-500" size={32} />
    },
    {
      title: "Financial Analytics",
      desc: "Real-time P&L statements, balance sheets, and tax-ready reports for data-driven decisions.",
      icon: <PieChart className="text-indigo-500" size={32} />
    },
    {
      title: "Audit & Compliance",
      desc: "Complete history of every transaction with user activity logs for maximum accountability.",
      icon: <History className="text-rose-500" size={32} />
    },
    {
      title: "Enterprise Security",
      desc: "Role-based access control (RBAC), end-to-end encryption, and multi-factor authentication.",
      icon: <ShieldCheck className="text-teal-500" size={32} />
    }
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
          Discover a set of integrated modules designed to scale with your enterprise, providing deep visibility into every corner of your operations.
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
              Seamless mobile-to-cloud <br className="hidden md:block" /> integration.
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Manage your inventory from your pocket or your desktop. Our cloud-sync technology ensures that every scan on mobile is reflected instantly on the web.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4 pt-12">
               <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center space-y-2">
                 <p className="text-white font-bold text-2xl">Mobile</p>
                 <p className="text-xs text-muted-foreground">iOS / Android</p>
               </div>
               <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center space-y-2">
                 <p className="text-white font-bold text-2xl">Offline</p>
                 <p className="text-xs text-muted-foreground">Sync later</p>
               </div>
             </div>
             <div className="space-y-4">
               <div className="p-6 bg-primary/20 backdrop-blur-xl border border-primary/20 rounded-2xl text-center space-y-2">
                 <p className="text-white font-bold text-2xl">Real-time</p>
                 <p className="text-xs text-muted-foreground">Live updates</p>
               </div>
               <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center space-y-2">
                 <p className="text-white font-bold text-2xl">APIs</p>
                 <p className="text-xs text-muted-foreground">Modern REST</p>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
