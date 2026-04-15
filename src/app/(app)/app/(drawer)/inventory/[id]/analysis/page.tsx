"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, TrendingUp, History, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import {
  TimeFrame,
  useFetchInventory,
  useFetchInventoryAnalytics,
} from "@/api/inventory/api.inventory";
import { usePermissions } from "@/hooks/permission.hook";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatDate } from "@/lib/formatter";
import { Badge } from "@/components/ui/badge";

export default function InventoryAnalysisPage() {
  const { id } = useParams();
  const router = useRouter();
  const inventoryId = id as string;
  const { canView } = usePermissions();
  const hasViewAccess = canView("INVENTORY");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(TimeFrame.LAST_30_DAYS);

  const { data: inventoryDetail } = useFetchInventory(inventoryId, hasViewAccess);
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useFetchInventoryAnalytics(inventoryId, hasViewAccess, { timeFrame });

  const analyticsData = data?.data;
  const topWarehouses = useMemo(
    () => analyticsData?.analysis?.topPerformingWarehouses ?? [],
    [analyticsData?.analysis],
  );

  if (!hasViewAccess) {
    return <AccessDeniedView moduleName="Inventory" />;
  }
  if (isLoading) return <LoadingView />;
  if (isError || !analyticsData) return <ErrorView refetch={refetch} />;

  const inventory = inventoryDetail?.data;
  const analytics = analyticsData;
  const unit = inventory?.unit || "unit";
  const timeOptions = [
    { label: "Last 30 days", value: TimeFrame.LAST_30_DAYS },
    { label: "Last 90 days", value: TimeFrame.LAST_90_DAYS },
    { label: "Last 6 months", value: TimeFrame.LAST_180_DAYS },
    { label: "Last 1 year", value: TimeFrame.LAST_365_DAYS },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Analysis: {inventory?.name || "Inventory"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Time-bound analytics and inventory movement history.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {timeOptions.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={timeFrame === option.value ? "default" : "outline"}
            onClick={() => setTimeFrame(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="movement">Movement</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {formatCurrency(analytics.financials.totalRevenue)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">COGS</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {formatCurrency(analytics.financials.totalCOGS)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profit</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {formatCurrency(analytics.financials.totalProfit)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {Number(analytics.summary.totalSale || 0).toLocaleString()} {unit}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {Number(analytics.financials.profitMargin || 0).toFixed(1)}%
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Purchase Price</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {formatCurrency(analytics.financials.avgPurchasePrice)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Sale Price</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {formatCurrency(analytics.financials.avgSalePrice)}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="h-4 w-4" />
                Top Performing Warehouses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topWarehouses.length ? (
                topWarehouses.map((warehouse, index) => (
                  <div
                    key={`${warehouse.name}-${index}`}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div>
                      <p className="font-medium">{warehouse.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Sold: {Number(warehouse.totalSold || 0).toLocaleString()} {unit}
                      </p>
                    </div>
                    <p className="font-semibold">{formatCurrency(warehouse.revenue)}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No warehouse performance data available.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movement" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Purchase</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {Number(analytics.summary.totalPurchase || 0).toLocaleString()} {unit}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Sale</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {Number(analytics.summary.totalSale || 0).toLocaleString()} {unit}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analytics.history?.length ? (
                analytics.history.map((item, index) => (
                  <div
                    key={item.id || `${item.type}-${index}`}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-md p-2 ${
                          item.type === "purchase"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium capitalize">{item.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.type === "purchase" ? "secondary" : "destructive"}>
                        {item.type === "purchase" ? "+" : "-"}{" "}
                        {Number(item.quantity || 0).toLocaleString()} {unit}
                      </Badge>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No movement history found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
