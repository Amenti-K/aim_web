"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/formatter";
import {
  Box,
  AlertTriangle,
  TrendingUp,
  Clock3,
  DollarSign,
  Activity,
} from "lucide-react";

const summary = {
  totalInventoryValue: 125000,
  lowestStock: { inventory: "Sugar", quantity: 3 },
  bestSelling: { inventory: "Coffee", quantity: 120 },
  mostUnsold: { inventory: "Salt", quantity: 5 },
  totalRevenue: 120000,
  totalProfit: 54000,
};

const chipOptions = ["30", "90", "180", "365"];

const cards = [
  {
    title: "Best Selling",
    value: summary.bestSelling.inventory,
    subtitle: `${summary.bestSelling.quantity} sold`,
  },
  {
    title: "Most Unsold",
    value: summary.mostUnsold.inventory,
    subtitle: `${summary.mostUnsold.quantity} items`,
  },
  { title: "Revenue", value: formatCurrency(summary.totalRevenue) },
  { title: "Profit", value: formatCurrency(summary.totalProfit) },
];

export default function DashboardPage() {
  const [timeFrame, setTimeFrame] = useState("30");

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Inventory Value</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(summary.totalInventoryValue)}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
            <Box className="h-4 w-4" />
            Updated from inventory snapshot
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Lowest Stock</CardDescription>
            <CardTitle className="text-2xl">
              {summary.lowestStock.inventory}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-xs text-amber-600">
            <AlertTriangle className="h-4 w-4" />
            {summary.lowestStock.quantity} units left
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>
                Mirrors the mobile home dashboard structure.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              {chipOptions.map((chip) => (
                <Button
                  key={chip}
                  type="button"
                  size="sm"
                  variant={timeFrame === chip ? "default" : "outline"}
                  onClick={() => setTimeFrame(chip)}
                >
                  {chip}d
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
              const icon =
                card.title === "Best Selling" ? (
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                ) : card.title === "Most Unsold" ? (
                  <Clock3 className="h-4 w-4 text-slate-500" />
                ) : card.title === "Revenue" ? (
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Activity className="h-4 w-4 text-violet-600" />
                );

              return (
                <Card key={card.title}>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      {icon}
                      {card.title}
                    </CardDescription>
                    <CardTitle className="text-xl">{card.value}</CardTitle>
                  </CardHeader>
                  {card.subtitle && (
                    <CardContent className="pt-0 text-xs text-muted-foreground">
                      {card.subtitle}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          <Separator />

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">Performance Breakdown</CardTitle>
                <CardDescription>
                  Reserved for pie chart component like mobile.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-44 rounded-md bg-muted/40" />
            </Card>
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">Revenue vs Profit Trend</CardTitle>
                <CardDescription>
                  Reserved for trend chart component.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-44 rounded-md bg-muted/40" />
            </Card>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
