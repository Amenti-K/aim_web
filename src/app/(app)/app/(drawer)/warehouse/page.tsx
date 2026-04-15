"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetWarehousesInfinite } from "@/api/warehouse/api.warehouse";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, Eye, Pencil } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function WarehousePage() {
  const router = useRouter();
  const { canView, canCreate, canUpdate } = usePermissions();
  const hasViewAccess = canView("WAREHOUSES");
  const hasCreateAccess = canCreate("WAREHOUSES");
  const hasUpdateAccess = canUpdate("WAREHOUSES");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetWarehousesInfinite({ search }, hasViewAccess);

  const warehouses = useMemo(() => data?.pages?.flatMap((page) => (page as any).data) ?? [], [data]);

  if (!hasViewAccess) return <AccessDeniedView moduleName="Warehouses" />;
  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView refetch={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Warehouses</h1>
          <p className="text-sm text-muted-foreground">Manage your storage locations.</p>
        </div>
        {hasCreateAccess && (
          <Button className="w-full sm:w-auto" onClick={() => router.push("/app/warehouse/new")}>
            <Plus className="mr-2 h-4 w-4" /> Add Warehouse
          </Button>
        )}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search warehouses..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warehouses.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="h-24 text-center">No warehouses found.</TableCell></TableRow>
            ) : (
              warehouses.map((warehouse: any) => (
                <TableRow key={warehouse.id} className="cursor-pointer" onClick={() => router.push(`/app/warehouse/${warehouse.id}`)}>
                  <TableCell className="font-medium">{warehouse.name}</TableCell>
                  <TableCell>{warehouse.location || "N/A"}</TableCell>
                  <TableCell>{warehouse.contactPhone || "N/A"}</TableCell>
                  <TableCell><Badge variant={warehouse.isInternal ? "secondary" : "outline"}>{warehouse.isInternal ? "Internal" : "External"}</Badge></TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/app/warehouse/${warehouse.id}`)}><Eye className="mr-2 h-4 w-4" /> View details</DropdownMenuItem>
                        {hasUpdateAccess && <DropdownMenuItem onClick={() => router.push(`/app/warehouse/${warehouse.id}/edit`)}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>}
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
            <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
