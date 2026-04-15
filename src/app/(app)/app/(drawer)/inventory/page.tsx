"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  StockStatus,
  useDeleteInventory,
  useGetInventoriesInfinite,
} from "@/api/inventory/api.inventory";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  MoreHorizontal,
  Package,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
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
import { useRouter } from "next/navigation";
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

export default function InventoryPage() {
  const router = useRouter();
  const { canView, canCreate, canUpdate, canDelete } = usePermissions();
  const hasViewAccess = canView("INVENTORY");
  const hasCreateAccess = canCreate("INVENTORY");
  const hasUpdateAccess = canUpdate("INVENTORY");
  const hasDeleteAccess = canDelete("INVENTORY");
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [stockStatus, setStockStatus] = useState<StockStatus>(StockStatus.ALL);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState<string | null>(
    null,
  );
  const deleteInventory = useDeleteInventory();

  useEffect(() => {
    const timeout = setTimeout(() => setSearchQuery(searchText.trim()), 300);
    return () => clearTimeout(timeout);
  }, [searchText]);

  const filters = useMemo(
    () => ({
      ...(searchQuery ? { search: searchQuery } : {}),
      stockStatus,
    }),
    [searchQuery, stockStatus],
  );

  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInventoriesInfinite(filters, hasViewAccess);

  const items = useMemo(() => {
    return data?.pages?.flatMap((page) => (page as any).data) ?? [];
  }, [data]);

  const handleDelete = () => {
    if (!selectedInventoryId) return;
    deleteInventory.mutate(
      { id: selectedInventoryId },
      {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setSelectedInventoryId(null);
        },
      },
    );
  };

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
          <Button
            className="w-full sm:w-auto"
            onClick={() => router.push("/app/inventory/new")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            className="pl-8"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "All", value: StockStatus.ALL },
            { label: "Low", value: StockStatus.LOW },
            { label: "Out", value: StockStatus.OUT },
          ].map((tab) => (
            <Button
              key={tab.value}
              type="button"
              variant={stockStatus === tab.value ? "default" : "outline"}
              onClick={() => setStockStatus(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
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
                <TableRow
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/app/inventory/${item.id}`)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="rounded bg-muted p-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.sku || "-"}</TableCell>
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
                    ${Number(item.sellingPrice).toLocaleString()}
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
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/app/inventory/${item.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        {hasUpdateAccess && (
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/app/inventory/${item.id}/edit`)
                            }
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                        )}
                        {hasDeleteAccess && (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedInventoryId(item.id);
                              setIsDeleteOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        )}
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

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete inventory?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The selected inventory item will be
              permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
