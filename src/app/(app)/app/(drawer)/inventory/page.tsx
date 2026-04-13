"use client";

import React, { useMemo } from "react";
import { useGetInventoriesInfinite } from "@/api/inventory/api.inventory";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function InventoryPage() {
  const { canView, canCreate } = usePermissions();
  const hasViewAccess = canView("INVENTORY");
  const hasCreateAccess = canCreate("INVENTORY");

  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInventoriesInfinite({}, hasViewAccess);

  const items = useMemo(() => {
    return data?.pages?.flatMap((page) => (page as any).data) ?? [];
  }, [data]);

  if (!hasViewAccess) {
    return <AccessDeniedView moduleName="Inventory" />;
  }

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView refetch={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manage your stock across all warehouses.
          </p>
        </div>
        {hasCreateAccess && (
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search inventory..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No inventory items found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="rounded bg-muted p-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.sku || "N/A"}</TableCell>
                  <TableCell>
                    <span
                      className={
                        item.quantity <= (item.minStock || 0)
                          ? "text-destructive font-bold"
                          : ""
                      }
                    >
                      {item.quantity} {item.unit || "units"}
                    </span>
                  </TableCell>
                  <TableCell>
                    ${Number(item.sellPrice).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {item.quantity <= 0 ? (
                      <Badge variant="destructive">Out of Stock</Badge>
                    ) : item.quantity <= (item.minStock || 0) ? (
                      <Badge
                        variant="destructive"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Low Stock
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-green-500/10 text-green-600 hover:bg-green-500/20"
                      >
                        In Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Stats</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Adjust Stock
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {hasNextPage && (
          <div className="flex justify-center p-4">
            <Button
              variant="outline"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
