"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, Bell, Shield, Palette } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const settingsOptions = [
    {
      title: "Profile Settings",
      description: "Manage your personal information and security.",
      icon: User,
      href: "/app/settings/profile",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Company Profile",
      description: "Update company details, logo, and contact info.",
      icon: Building,
      href: "/app/settings/company",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Notifications",
      description: "Configure how you receive alerts and updates.",
      icon: Bell,
      href: "/app/settings/notifications",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Security",
      description: "Password management and sessions.",
      icon: Shield,
      href: "/app/settings/security",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Appearance",
      description: "Customize the look and feel of your dashboard.",
      icon: Palette,
      href: "/app/settings/appearance",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {settingsOptions.map((option) => (
          <Card 
            key={option.title} 
            className="cursor-pointer transition-colors hover:bg-muted/50"
            onClick={() => router.push(option.href)}
          >
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className={`rounded-lg p-2 ${option.bg} ${option.color}`}>
                <option.icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription className="line-clamp-1">{option.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
