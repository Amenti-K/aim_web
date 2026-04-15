"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Boxes,
  Warehouse,
  ChartColumnIncreasing,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import {
  useDeleteInventory,
  useFetchInventory,
} from "@/api/inventory/api.inventory";
import { usePermissions } from "@/hooks/permission.hook";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { formatCurrency } from "@/lib/formatter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function InventoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const inventoryId = id as string;
  const { canView, canUpdate, canDelete } = usePermissions();
  const hasViewAccess = canView("INVENTORY");
  const hasUpdateAccess = canUpdate("INVENTORY");
  const hasDeleteAccess = canDelete("INVENTORY");
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  const { data, isLoading, isError, refetch } = useFetchInventory(
    inventoryId,
    hasViewAccess,
  );
  const deleteInventory = useDeleteInventory();

  if (!hasViewAccess) {
    return <AccessDeniedView moduleName="Inventory" />;
  }
  if (isLoading) return <LoadingView />;
  if (isError || !data?.data) return <ErrorView refetch={refetch} />;

  const inventory = data.data;
  const totalQuantity = (inventory.warehouseInventories ?? []).reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0,
  );
  const totalReorderQuantity = (inventory.warehouseInventories ?? []).reduce(
    (sum, item) => sum + Number(item.reorderQuantity || 0),
    0,
  );
  const valuation = Number(inventory.boughtPrice || 0) * totalQuantity;
  const profitMargin =
    Number(inventory.sellingPrice || 0) > 0
      ? ((Number(inventory.sellingPrice || 0) - Number(inventory.boughtPrice || 0)) /
          Number(inventory.sellingPrice || 0)) *
        100
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{inventory.name}</h1>
            <p className="text-sm text-muted-foreground">
              Inventory details, distribution, and analysis.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {hasUpdateAccess && (
            <Button
              variant="outline"
              onClick={() => router.push(`/app/inventory/${inventoryId}/edit`)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          {hasDeleteAccess && (
            <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">SKU</p>
              <p className="font-medium">{inventory.sku || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Brand</p>
              <p className="font-medium">{inventory.brand || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Unit</p>
              <p className="font-medium">{inventory.unit || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Initial Quantity</p>
              <p className="font-medium">
                {Number(inventory.initialQuantity || 0).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stock Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total quantity</span>
              <span className="font-semibold">
                {totalQuantity.toLocaleString()} {inventory.unit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Reorder threshold</span>
              <span className="font-semibold">
                {totalReorderQuantity.toLocaleString()} {inventory.unit}
              </span>
            </div>
            <Badge
              variant={totalQuantity <= totalReorderQuantity ? "destructive" : "secondary"}
              className="w-full justify-center"
            >
              {totalQuantity <= 0
                ? "Out of stock"
                : totalQuantity <= totalReorderQuantity
                  ? "Low stock"
                  : "In stock"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Cost Price</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(inventory.boughtPrice)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Selling Price</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(inventory.sellingPrice)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{profitMargin.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">
              Valuation: {formatCurrency(valuation)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Warehouse className="h-5 w-5" />
            Warehouse Distribution
          </CardTitle>
          <Badge variant="outline">{inventory.warehouseInventories?.length || 0} Warehouses</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {inventory.warehouseInventories?.length ? (
            inventory.warehouseInventories.map((item, index) => (
              <div
                key={item.id || `${item.warehouseId}-${index}`}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex items-center gap-2">
                  <Boxes className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.warehouse?.name || "Warehouse"}</p>
                    <p className="text-xs text-muted-foreground">
                      Reorder at {Number(item.reorderQuantity || 0).toLocaleString()}{" "}
                      {inventory.unit}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  {Number(item.quantity || 0).toLocaleString()} {inventory.unit}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No warehouse distribution found.</p>
          )}
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center">
          <div>
            <p className="font-semibold">Deep Inventory Analysis</p>
            <p className="text-sm text-muted-foreground">
              Open detailed analytics and time-bound movement history for this item.
            </p>
          </div>
          <Button onClick={() => router.push(`/app/inventory/${inventoryId}/analysis`)}>
            <ChartColumnIncreasing className="mr-2 h-4 w-4" />
            View Analysis
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete inventory?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The inventory and related entries will
              be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() =>
                deleteInventory.mutate(
                  { id: inventoryId },
                  {
                    onSuccess: () => router.push("/app/inventory"),
                  },
                )
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
