"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2, Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import { useDeleteSale, useFetchSale } from "@/api/sale/api.sale";
import { usePermissions } from "@/hooks/permission.hook";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { formatDate } from "@/lib/formatter";
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

export default function SalesDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const saleId = id as string;
  const { canView, canUpdate, canDelete } = usePermissions();
  const hasViewAccess = canView("SALES");
  const hasUpdateAccess = canUpdate("SALES");
  const hasDeleteAccess = canDelete("SALES");
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  const { data, isLoading, isError, refetch } = useFetchSale(saleId, hasViewAccess);
  const deleteSale = useDeleteSale();

  if (!hasViewAccess) {
    return <AccessDeniedView moduleName="Sales" />;
  }
  if (isLoading) return <LoadingView />;
  if (isError || !data?.data) return <ErrorView refetch={refetch} />;

  const sale = data.data;
  const saleItems = sale.saleItems || [];
  const salePayments = sale.salePayments || [];
  const subtotal = saleItems.reduce(
    (sum: number, item: any) =>
      sum + Number(item.unitPrice || 0) * Number(item.quantity || 0),
    0,
  );
  const paidByBank = salePayments.reduce(
    (sum: number, payment: any) => sum + Number(payment.amount || 0),
    0,
  );
  const paidByCash = Number(sale.saleCashPayment?.amount || 0);
  const paidAmount = paidByBank + paidByCash;
  const loanAmount = Number(sale.loan?.amount || 0);
  const soNumber = `SO-${sale.id.slice(-6).toUpperCase()}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{soNumber}</h1>
            <p className="text-sm text-muted-foreground">
              Structured sale details and payment breakdown.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {hasUpdateAccess && (
            <Button
              variant="outline"
              onClick={() => router.push(`/app/sales/${saleId}/edit`)}
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
            <CardTitle>Sale Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Customer</p>
                <p className="font-medium">{sale.partner?.name || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Created At</p>
                <p className="font-medium">{formatDate(sale.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:col-span-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="font-medium">{sale.description || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{subtotal.toLocaleString()} ETB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Paid</span>
              <span className="font-semibold text-green-600">
                {paidAmount.toLocaleString()} ETB
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Loan</span>
              <span className="font-semibold text-orange-600">
                {loanAmount.toLocaleString()} ETB
              </span>
            </div>
            <Badge variant="outline" className="w-full justify-center">
              {paidAmount >= subtotal ? "Paid" : "Pending"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {saleItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items found.</p>
          ) : (
            saleItems.map((item: any, index: number) => (
              <div
                key={item.id || `${item.inventory?.name}-${index}`}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <p className="font-medium">{item.inventory?.name || "Unknown Item"}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {Number(item.quantity || 0).toLocaleString()} x{" "}
                    {Number(item.unitPrice || 0).toLocaleString()} ETB
                  </p>
                </div>
                <p className="font-semibold">
                  {(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toLocaleString()} ETB
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {salePayments.length === 0 && !sale.saleCashPayment ? (
            <p className="text-sm text-muted-foreground">No payment records found.</p>
          ) : (
            <>
              {salePayments.map((payment: any) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div>
                    <p className="font-medium">{payment.account?.name || "Bank Payment"}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.description || "No description"}
                    </p>
                  </div>
                  <p className="font-semibold">{Number(payment.amount || 0).toLocaleString()} ETB</p>
                </div>
              ))}
              {sale.saleCashPayment && (
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <p className="font-medium">Cash Payment</p>
                    <p className="text-sm text-muted-foreground">
                      {sale.saleCashPayment.description || "No description"}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {Number(sale.saleCashPayment.amount || 0).toLocaleString()} ETB
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete sale?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The sale and related entries will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() =>
                deleteSale.mutate(
                  { id: saleId },
                  {
                    onSuccess: () => router.push("/app/sales"),
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
