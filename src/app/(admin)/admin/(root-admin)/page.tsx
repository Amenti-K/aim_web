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
import { useGetAnalytics } from "@/api/analytics/api.analytics";

const Dashboard = () => {
  const { data: analytics, isLoading, isError } = useGetAnalytics();
  const { data: stats, isLoading: isLoadingStats } = useDashboardStatsMock();

  console.log("analytics", JSON.stringify(analytics));
  if (isLoadingStats || isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your ERP admin panel
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your ERP admin panel</p>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Companies"
          value={stats?.totalCompanies || 0}
          icon={Building2}
          description="Registered companies"
        />
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          description="Across all companies"
        />
        <StatsCard
          title="Active Subscriptions"
          value={stats?.subscriptionBreakdown.active || 0}
          icon={CheckCircle}
          description="Currently active"
        />
        <StatsCard
          title="Trial Users"
          value={stats?.subscriptionBreakdown.trialing || 0}
          icon={Clock}
          description="In trial period"
        />
      </div>

      {/* Subscription Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Overview</CardTitle>
          <CardDescription>
            Current subscription status breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {stats?.subscriptionBreakdown.active}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-blue-100 p-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {stats?.subscriptionBreakdown.trialing}
                </p>
                <p className="text-sm text-muted-foreground">Trialing</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-red-100 p-2">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {stats?.subscriptionBreakdown.expired}
                </p>
                <p className="text-sm text-muted-foreground">Expired</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-gray-100 p-2">
                <AlertCircle className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {stats?.subscriptionBreakdown.canceled}
                </p>
                <p className="text-sm text-muted-foreground">Canceled</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => "/companies"}>
              <Building2 className="mr-2 h-4 w-4" />
              View All Companies
            </Button>
            <Button variant="outline" onClick={() => "/companies?status=trial"}>
              <Clock className="mr-2 h-4 w-4" />
              Trial Companies
            </Button>
            <Button
              variant="outline"
              onClick={() => "/companies?status=expired"}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Expired Subscriptions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
