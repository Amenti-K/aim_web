"use client";

import {
  Building2,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ShieldAlert,
  ShieldCheck,
  Loader2,
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
import { Badge } from "@/components/ui/badge";
import { useGetAnalytics } from "@/api/analytics/api.analytics";
import {
  useEnableMaintenance,
  useDisableMaintenance,
  useGetMaintenanceStatus,
} from "@/api/admin/api.auth";

const Dashboard = () => {
  const { data: response, isLoading } = useGetAnalytics();
  const analytics = response?.data;

  // Live maintenance status badge — queries the public /admin/status endpoint
  const { data: statusData, refetch: refetchStatus } =
    useGetMaintenanceStatus();
  const isMaintenance = statusData?.maintenance;

  const { mutate: enableMaint, isPending: enabling } = useEnableMaintenance();
  const { mutate: disableMaint, isPending: disabling } =
    useDisableMaintenance();

  const handleEnable = () => {
    if (
      !window.confirm(
        "⚠️ This will block ALL non-admin users from accessing the app. Continue?",
      )
    )
      return;
    enableMaint({} as any, { onSuccess: () => refetchStatus() });
  };

  const handleDisable = () => {
    disableMaint({} as any, { onSuccess: () => refetchStatus() });
  };

  if (isLoading) {
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

  const getStatusCount = (status: string) =>
    analytics?.subscriptionsByStatus.find((s) => s.status === status)?.count ||
    0;

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
          value={analytics?.totalCompanies || 0}
          icon={Building2}
          description="Registered companies"
        />
        <StatsCard
          title="Total Users"
          value={analytics?.totalUsers || 0}
          icon={Users}
          description="Across all companies"
        />
        <StatsCard
          title="Active Subscriptions"
          value={getStatusCount("ACTIVE")}
          icon={CheckCircle}
          description="Currently active"
        />
        <StatsCard
          title="Trial Users"
          value={getStatusCount("TRIALING")}
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
                <p className="text-2xl font-bold">{getStatusCount("ACTIVE")}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-blue-100 p-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {getStatusCount("TRIALING")}
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
                  {getStatusCount("EXPIRED")}
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
                  {getStatusCount("CANCELED")}
                </p>
                <p className="text-sm text-muted-foreground">Canceled</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── System Maintenance Control ─────────────────────────────────── */}
      <Card
        className={
          isMaintenance
            ? "border-orange-400 bg-orange-50 dark:bg-orange-950/20"
            : ""
        }
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              {isMaintenance ? (
                <ShieldAlert className="h-5 w-5 text-orange-500" />
              ) : (
                <ShieldCheck className="h-5 w-5 text-green-500" />
              )}
              System Maintenance
            </CardTitle>
            <CardDescription>
              Toggle maintenance mode to block or restore mobile user access
            </CardDescription>
          </div>
          <Badge
            variant={isMaintenance ? "destructive" : "outline"}
            className={
              isMaintenance
                ? "bg-orange-500 text-white"
                : "border-green-500 text-green-600"
            }
          >
            {isMaintenance ? "🔴 Maintenance ON" : "🟢 System Online"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {/* Enable */}
            <Button
              variant="destructive"
              onClick={handleEnable}
              disabled={enabling || isMaintenance}
            >
              {enabling ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ShieldAlert className="mr-2 h-4 w-4" />
              )}
              {isMaintenance ? "Already in Maintenance" : "Enable Maintenance"}
            </Button>

            {/* Disable */}
            <Button
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
              onClick={handleDisable}
              disabled={disabling || !isMaintenance}
            >
              {disabling ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="mr-2 h-4 w-4" />
              )}
              {!isMaintenance ? "System Already Online" : "Disable Maintenance"}
            </Button>
          </div>

          {isMaintenance && (
            <p className="mt-3 text-sm text-orange-600 dark:text-orange-400">
              ⚠️ Users are currently blocked from accessing the mobile app.
            </p>
          )}
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
            <Button onClick={() => {}}>
              <Building2 className="mr-2 h-4 w-4" />
              View All Companies
            </Button>
            <Button variant="outline" onClick={() => {}}>
              <Clock className="mr-2 h-4 w-4" />
              Trial Companies
            </Button>
            <Button variant="outline" onClick={() => {}}>
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
