"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 lg:py-24 space-y-24">
      {/* Header Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Let's Start a <span className="text-primary">Conversation</span>.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground leading-relaxed"
        >
          Whether you have a question about features, pricing, or a demo, our team is ready to help you optimize your business operations.
        </motion.p>
      </section>

      <section className="grid lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 lg:p-12 bg-card border border-border shadow-2xl rounded-[2.5rem] space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Send us a message</h2>
            <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="John Doe" className="h-12 border-border/50 bg-muted/30 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input placeholder="john@example.com" type="email" className="h-12 border-border/50 bg-muted/30 rounded-xl" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input placeholder="Acme Inc." className="h-12 border-border/50 bg-muted/30 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Topic</label>
                <Input placeholder="Sales Inquiry" className="h-12 border-border/50 bg-muted/30 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="How can we help you?" className="min-h-[150px] border-border/50 bg-muted/30 rounded-xl resize-none" />
            </div>
            <Button size="lg" className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group">
              Send Message
              <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </form>
        </motion.div>

        {/* Contact Info & Details */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between space-y-12"
        >
          <div className="grid gap-8">
            {[
              {
                title: "Email Support",
                desc: "Direct access to our helpdesk team.",
                value: "support@aimstock.com",
                icon: <Mail className="text-primary" />
              },
              {
                title: "Phone Support",
                desc: "Mon - Fri, 9am - 6pm EAT.",
                value: "+254 700 000 000",
                icon: <Phone className="text-blue-500" />
              },
              {
                title: "Our Headquarters",
                desc: "Visit our innovation hub.",
                value: "Nairobi, Kenya",
                icon: <MapPin className="text-green-500" />
              }
            ].map((info, i) => (
              <div key={i} className="flex space-x-6 p-6 bg-card border border-border/50 rounded-2xl group hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-muted flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">{info.title}</h3>
                  <p className="text-sm text-muted-foreground">{info.desc}</p>
                  <p className="font-semibold text-foreground pt-1">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-secondary border border-border/50 rounded-3xl space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg">
                <Clock className="text-primary" size={20} />
              </div>
              <div>
                <p className="font-bold">Average Response Time</p>
                <p className="text-sm text-muted-foreground text-green-500 font-semibold">Under 2 hours</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center rounded-lg">
                <Globe className="text-blue-500" size={20} />
              </div>
              <div>
                <p className="font-bold">Global Presence</p>
                <p className="text-sm text-muted-foreground">Supporting businesses in 15+ countries.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
