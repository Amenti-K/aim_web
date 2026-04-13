"use client";

import { useState } from "react";

const summary = {
  totalInventoryValue: 125000,
  lowestStock: { inventory: "Sugar", quantity: 3 },
  bestSelling: { inventory: "Coffee", quantity: 120 },
  mostUnsold: { inventory: "Salt", quantity: 5 },
  totalRevenue: 120000,
  totalProfit: 54000,
};

const formatCurrency = (num: number) => `$${num.toLocaleString()}`;

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
    <section className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border bg-card p-4 text-card-foreground">
          <p className="text-sm text-muted-foreground">Total Inventory Value</p>
          <p className="mt-2 text-2xl font-semibold">
            {formatCurrency(summary.totalInventoryValue)}
          </p>
        </article>
        <article className="rounded-lg border bg-card p-4 text-card-foreground">
          <p className="text-sm text-muted-foreground">Lowest Stock</p>
          <p className="mt-2 text-2xl font-semibold">
            {summary.lowestStock.inventory}
          </p>
          <p className="text-xs text-muted-foreground">
            {summary.lowestStock.quantity} left
          </p>
        </article>
      </div>

      <article className="rounded-lg border bg-card p-4 text-card-foreground">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Analytics Overview</h2>
          <div className="flex flex-wrap gap-2">
            {chipOptions.map((chip) => (
              <button
                key={chip}
                onClick={() => setTimeFrame(chip)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  timeFrame === chip
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {chip}d
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <article key={card.title} className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="mt-2 text-xl font-semibold">{card.value}</p>
              {card.subtitle && (
                <p className="text-xs text-muted-foreground">{card.subtitle}</p>
              )}
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}
