"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useDeleteWarehouse, useFetchWarehouseById } from "@/api/warehouse/api.warehouse";
import { ErrorView, LoadingView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function WarehouseDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const warehouseId = id as string;
  const { canView, canUpdate, canDelete } = usePermissions();
  const [openDelete, setOpenDelete] = React.useState(false);
  const { data, isLoading, isError, refetch } = useFetchWarehouseById(warehouseId, canView("WAREHOUSES"));
  const deleteWarehouse = useDeleteWarehouse();

  if (!canView("WAREHOUSES")) return <AccessDeniedView moduleName="Warehouses" />;
  if (isLoading) return <LoadingView />;
  if (isError || !data?.data) return <ErrorView refetch={refetch} />;
  const warehouse = data.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft className="h-5 w-5" /></Button>
          <div><h1 className="text-2xl font-bold">{warehouse.name}</h1><p className="text-sm text-muted-foreground">{warehouse.location}</p></div>
        </div>
        <div className="flex gap-2">
          {canUpdate("WAREHOUSES") && <Button variant="outline" onClick={() => router.push(`/app/warehouse/${warehouseId}/edit`)}><Pencil className="mr-2 h-4 w-4" /> Edit</Button>}
          {canDelete("WAREHOUSES") && <Button variant="destructive" onClick={() => setOpenDelete(true)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>}
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Warehouse information</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <div><p className="text-xs text-muted-foreground">Phone</p><p>{warehouse.contactPhone || "N/A"}</p></div>
          <div><p className="text-xs text-muted-foreground">Type</p><Badge variant={warehouse.isInternal ? "secondary" : "outline"}>{warehouse.isInternal ? "Internal" : "External"}</Badge></div>
          <div className="md:col-span-2"><p className="text-xs text-muted-foreground">Description</p><p>{warehouse.description || "No description"}</p></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Inventories</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Inventory</TableHead><TableHead>Qty</TableHead><TableHead>Reorder</TableHead></TableRow></TableHeader>
            <TableBody>
              {(warehouse.warehouseInventories ?? []).length === 0 ? (
                <TableRow><TableCell colSpan={3} className="text-center">No inventory records.</TableCell></TableRow>
              ) : (
                warehouse.warehouseInventories.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.inventory?.name || "-"}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.reorderQuantity}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Transactions</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <div><p className="text-xs text-muted-foreground">Purchase transactions</p><p className="text-xl font-semibold">{warehouse.purchaseItems?.length || 0}</p></div>
          <div><p className="text-xs text-muted-foreground">Sale transactions</p><p className="text-xl font-semibold">{warehouse.saleItems?.length || 0}</p></div>
        </CardContent>
      </Card>

      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete warehouse?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => deleteWarehouse.mutate({ id: warehouseId } as any, { onSuccess: () => router.push("/app/warehouse") })}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
