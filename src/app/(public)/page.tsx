"use client";

import {
  Building2,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStatsMock } from "@/hooks/useDashboard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin");
  }, []);

  return <div className="space-y-6"></div>;
};

export default LandingPage;
