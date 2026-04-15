"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useDeleteExpense, useFetchExpenseById } from "@/api/expense/api.expense";
import { ErrorView, LoadingView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/formatter";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function ExpenseDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const expenseId = id as string;
  const { canView, canUpdate, canDelete } = usePermissions();
  const [openDelete, setOpenDelete] = React.useState(false);
  const { data, isLoading, isError, refetch } = useFetchExpenseById(expenseId, canView("EXPENSE"));
  const deleteExpense = useDeleteExpense();

  if (!canView("EXPENSE")) return <AccessDeniedView moduleName="Expenses" />;
  if (isLoading) return <LoadingView />;
  if (isError || !data?.data) return <ErrorView refetch={refetch} />;
  const expense: any = data.data;
  const bankPayments = expense.expensePayments ?? [];
  const cash = Number(expense.expenseCashPayment?.amount || 0);
  const bankTotal = bankPayments.reduce((sum: number, item: any) => sum + Number(item.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft className="h-5 w-5" /></Button>
          <div><h1 className="text-2xl font-bold">Expense Detail</h1><p className="text-sm text-muted-foreground">{formatDate(expense.createdAt)}</p></div>
        </div>
        <div className="flex gap-2">
          {canUpdate("EXPENSE") && <Button variant="outline" onClick={() => router.push(`/app/expense/${expenseId}/edit`)}><Pencil className="mr-2 h-4 w-4" /> Edit</Button>}
          {canDelete("EXPENSE") && <Button variant="destructive" onClick={() => setOpenDelete(true)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>}
        </div>
      </div>

      <Card><CardHeader><CardTitle>Total amount</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{formatCurrency(expense.amount)}</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Description</CardTitle></CardHeader><CardContent>{expense.description || "No description"}</CardContent></Card>
      <Card>
        <CardHeader><CardTitle>Payment breakdown</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between"><span>Cash</span><span>{formatCurrency(cash)}</span></div>
          {bankPayments.map((item: any) => (
            <div key={item.id} className="flex justify-between"><span>{item.account?.name || "Bank account"}</span><span>{formatCurrency(item.amount)}</span></div>
          ))}
          <div className="border-t pt-2 flex justify-between font-semibold"><span>Total bank</span><span>{formatCurrency(bankTotal)}</span></div>
        </CardContent>
      </Card>

      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete expense?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => deleteExpense.mutate({ id: expenseId }, { onSuccess: () => router.push("/app/expense") })}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
