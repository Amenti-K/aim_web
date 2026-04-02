"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Package,
  Truck,
  Users,
  ShieldCheck,
  Globe,
  Zap,
  TrendingUp,
  Boxes,
  ClipboardCheck,
  CreditCard,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaGooglePlay } from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const MODULES = [
  {
    title: "Stock Control",
    desc: "Track your inventory in real-time with simple and accurate stock updates.",
    icon: <Boxes className="w-8 h-8 text-primary" />,
    color: "bg-primary/10",
  },
  {
    title: "Sales Tracking",
    desc: "Record daily sales, monitor performance, and never miss a transaction.",
    icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
    color: "bg-blue-500/10",
  },
  {
    title: "Purchases",
    desc: "Manage suppliers and restock inventory with organized purchase records.",
    icon: <Truck className="w-8 h-8 text-green-500" />,
    color: "bg-green-500/10",
  },
  {
    title: "Expenses",
    desc: "Track business expenses and understand where your money goes.",
    icon: <CreditCard className="w-8 h-8 text-orange-500" />,
    color: "bg-orange-500/10",
  },
  {
    title: "Reports",
    desc: "Get clear insights into your business with simple and useful reports.",
    icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
    color: "bg-indigo-500/10",
  },
  {
    title: "Multi-User Access",
    desc: "Let your team work together with controlled roles and permissions.",
    icon: <Users className="w-8 h-8 text-purple-500" />,
    color: "bg-purple-500/10",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-24">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                <Zap size={14} className="fill-primary" />
                {/* <span>Mobile-First ERP System</span> */}
                <span>Modern ERP for Enterprises</span>
              </div>
              {/* <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
                Manage Your <span className="text-primary">Business</span>{" "}
                <br /> From Your Phone.
              </h1> */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
                Revolutionize Your <span className="text-primary">Stock</span>{" "}
                <br /> Management.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                AIM Stock is the ultimate ERP solution for businesses of all
                sizes, helping you streamline inventory management, track
                financial performance, and run operations with confidence
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/download/apk">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white shadow-xl"
                  >
                    <Download />
                    Download APK
                  </Button>
                </Link>

                <Link href="https://play.google.com/store/apps/details?id=your.app.id">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg flex items-center gap-2"
                  >
                    <FaGooglePlay />
                    Play Store
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 pt-6 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={20} className="text-primary" />
                  <span className="text-sm font-medium">
                    Enterprise Security
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe size={20} className="text-primary" />
                  <span className="text-sm font-medium">Cloud Integrated</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative flex justify-center">
                <div className="w-[260px] h-[520px] bg-black rounded-[2.5rem] p-2 shadow-2xl border border-border">
                  {/* Screen */}
                  <div className="w-full h-full bg-muted/30 rounded-[2rem] p-4 flex flex-col gap-4">
                    {/* Top bar */}
                    <div className="h-3 w-1/3 bg-background rounded-full" />

                    {/* Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-20 bg-card rounded-xl border border-border/50"
                        />
                      ))}
                    </div>

                    {/* Activity */}
                    <div className="flex-1 bg-card rounded-xl border border-border/50 p-3 space-y-2">
                      <div className="h-2 w-full bg-muted rounded-full" />
                      <div className="h-2 w-5/6 bg-muted rounded-full" />
                      <div className="h-2 w-3/4 bg-muted rounded-full" />
                    </div>

                    {/* Bottom nav */}
                    <div className="h-10 bg-background rounded-xl flex justify-around items-center">
                      <div className="w-5 h-5 bg-muted rounded" />
                      <div className="w-5 h-5 bg-muted rounded" />
                      <div className="w-5 h-5 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-6 rounded-2xl shadow-2xl border border-border max-w-[200px]"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <TrendingUp className="text-green-500" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Monthly ROI
                    </p>
                    <p className="text-xl font-bold text-foreground">+24.8%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-20">
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm"
          >
            Capabilities
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            One Platform, Every Asset.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            AIM Stock gives you simple tools to manage stock, sales, purchases,
            and expenses, all in one mobile app.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {MODULES.map((module, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className={`w-14 h-14 ${module.color} flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform`}
              >
                {module.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {module.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {module.desc}
              </p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <BoxDiagonal size={40} className="text-primary/5" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto p-12 lg:p-24 bg-card border border-border shadow-2xl rounded-[3rem] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-3xl rounded-full" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold">
              Ready to take control of your warehouses?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join enterprises that have optimized their operations with AIM
              Stock ERP.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* <Link href="/admin">
                <Button
                  size="lg"
                  className="h-16 px-12 text-xl bg-primary hover:bg-primary/90 text-white rounded-full"
                >
                  Get Started Free
                </Button>
              </Link> */}
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 px-12 text-xl rounded-full"
                >
                  Speak to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BoxDiagonal({ size, className }: { size: number; className: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
