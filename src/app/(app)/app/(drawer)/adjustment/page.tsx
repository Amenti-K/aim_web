"use client";

import React from "react";
import { useGetAdjustmentsInfinite } from "@/api/adjustment/api.adjustment";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, MoveHorizontal } from "lucide-react";
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
import { formatDate } from "@/lib/formatter";

export default function AdjustmentPage() {
  const { canView, canCreate } = usePermissions();
  const hasViewAccess = canView("INVENTORYADJUSTMENT");
  const hasCreateAccess = canCreate("INVENTORYADJUSTMENT");

  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAdjustmentsInfinite({}, hasViewAccess);

  const adjustments = React.useMemo(() => {
    return data?.pages?.flatMap((page) => (page as any).data) ?? [];
  }, [data]);

  if (!hasViewAccess) {
    return <AccessDeniedView moduleName="Inventory Adjustment" />;
  }

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView refetch={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Stock Adjustments
          </h1>
          <p className="text-sm text-muted-foreground">
            View history of manual stock level corrections.
          </p>
        </div>
        {hasCreateAccess && (
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> New Adjustment
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search adjustments..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adjustments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No adjustments found.
                </TableCell>
              </TableRow>
            ) : (
              adjustments.map((adj: any) => (
                <TableRow key={adj.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {formatDate(adj.createdAt)}
                  </TableCell>
                  <TableCell>{adj.inventory?.name || "Unknown Item"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        adj.type === "INCREASE" ? "secondary" : "destructive"
                      }
                    >
                      {adj.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold">
                    {adj.type === "INCREASE" ? "+" : "-"}
                    {adj.quantity}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {adj.reason || "Manual Correction"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
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
