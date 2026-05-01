"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Lock, Eye, BookOpen, Clock, UserMinus } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "March 30, 2026";

  useEffect(() => {
    // Check if the URL has a hash, e.g., #account-deletion
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");

      // Delay slightly to let Framer Motion animations settle
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 lg:py-24 space-y-16">
      {/* Header Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
        >
          <Shield size={14} className="fill-primary" />
          <span>Privacy Policy</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Your Data, <span className="text-primary">Protected</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground leading-relaxed"
        >
          At AIM Stock, we are committed to being transparent about how we
          collect and use your data. This policy explains our practices for our
          inventory and stock management services.
        </motion.p>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground pt-4">
          <Clock size={16} />
          <span>Last Updated: {lastUpdated}</span>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto space-y-12 bg-card border border-border shadow-2xl rounded-[2.5rem] p-8 md:p-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <BookOpen className="text-primary" />
            1. Nature of Our Service
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            AIM Stock is an enterprise resource planning (ERP) tool designed
            specifically for stock tracking, inventory management, warehouse
            logistics, and business operations.{" "}
            <strong>
              Please Note: AIM Stock is NOT a banking, investment, or
              financial-specific application.
            </strong>
            We do not provide financial advice, handle direct monetary
            transactions between individuals, or manage banking accounts.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Eye className="text-primary" />
            2. Information We Collect
          </h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">a. Account Information</h3>
            <p className="text-muted-foreground">
              When you register for AIM Stock, we collect personal data such as
              your name, unique phone number, and company name to provide you
              with secure access to your ERP dashboard.
            </p>

            <h3 className="text-xl font-semibold">
              b. Inventory & Business Data
            </h3>
            <p className="text-muted-foreground">
              You provide us with data relating to your stock items, SKUs,
              warehouse locations, supplier details, and sales records. This
              data is strictly used to provide the inventory management service
              to your business.
            </p>

            <h3 className="text-xl font-semibold">c. Device & Usage Info</h3>
            <p className="text-muted-foreground">
              we don't collect device identifiers (IP address, operating system,
              and hardware details) when you use our mobile app or web portal.
              For performance reason we ask the permission of an internet access
              and notification.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Lock className="text-primary" />
            3. How We Use & Protect Your Data
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use your information to sync data across your devices, generate
            real-time reports, and improve system stability. Your business data
            is encrypted during transit and while at rest using
            industry-standard protocols.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>
              <strong>No Selling of Data:</strong> We never sell your business
              or personal data to third parties.
            </li>
            <li>
              <strong>Encryption:</strong> All inventory records and user
              credentials are protected by AES-256 encryption.
            </li>
            <li>
              <strong>Access Control:</strong> You have full control over which
              employees can access specific stock data.
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Shield className="text-primary" />
            4. Third-Party Services
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use trusted third-party services like Google Play Services for
            app performance analytics and secure cloud hosting. These providers
            only have access to information necessary to perform their
            specialized tasks.
          </p>
        </div>

        <div className="space-y-6">
          <h2
            id="account-deletion"
            className="text-2xl font-bold flex items-center gap-3 scroll-mt-24"
          >
            <UserMinus className="text-primary" />
            5. Account Deletion
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We provide a clear and permanent way for you to delete your account
            directly within the AIM Stock app.
          </p>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              How to Delete Your Account
            </h3>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
              <li>
                Open the <strong>Drawer</strong> menu in the AIM Stock app.
              </li>
              <li>
                Navigate to <strong>Settings</strong> &gt;{" "}
                <strong>Company Information</strong>.
              </li>
              <li>
                Scroll down to the bottom of the page and tap{" "}
                <strong>Delete My Account</strong>.
              </li>
              <li>Enter your password to securely confirm the deletion.</li>
            </ol>

            <h3 className="text-xl font-semibold pt-2">Data Deletion Policy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Account deletion is a permanent action. Upon confirmation, all
              your account data, inventory records, and transaction history will
              be permanently deleted from our systems within 30 days. This
              action cannot be undone.
            </p>

            <h3 className="text-xl font-semibold pt-2">
              Alternative Deletion Method
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              If you cannot access the AIM Stock app, you can request account
              deletion by emailing our support team at{" "}
              <strong>support@aimstock.app</strong> with your registered phone
              number.
            </p>
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t">
          <h2 className="text-2xl font-bold">Contact Us Regarding Privacy</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy or how we handle
            your data, please contact us at:
          </p>
          <div className="bg-muted/50 p-6 rounded-2xl">
            <p className="font-bold">AIM Stock Privacy Team</p>
            <p className="text-primary">info.aimstock@aimtechgroups.com</p>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>
      </section>
    </div>
  );
}
