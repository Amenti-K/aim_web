"use client";

import React, { useState } from "react";
import {
  useGetAccountsInfinite,
  useGetSummary,
  useCreateAccount,
  useUpdateAccount,
  useDeleteAccount,
  useTransferFunds,
} from "@/api/account/api.account";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MoreHorizontal,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  Pencil,
  Trash2,
  Eye,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AccountForm from "@/components/account/AccountForm";
import TransferFundsForm from "@/components/account/TransferFundsForm";
import { IAccountDetail, IAccountTransfer } from "@/components/interface/interface.account";
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

export default function AccountPage() {
  const router = useRouter();
  const { canView, canCreate, canUpdate, canDelete } = usePermissions();
  const hasViewAccess = canView("ACCOUNT");
  const hasCreateAccess = canCreate("ACCOUNT");
  const hasUpdateAccess = canUpdate("ACCOUNT");
  const hasDeleteAccess = canDelete("ACCOUNT");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<IAccountDetail | null>(null);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetAccountsInfinite({}, hasViewAccess);

  const { data: summaryData, refetch: refetchSummary } = useGetSummary(hasViewAccess);

  const createAccount = useCreateAccount();
  const updateAccount = useUpdateAccount();
  const deleteAccount = useDeleteAccount();
  const transferFunds = useTransferFunds();

  const accounts = React.useMemo(() => {
    return data?.pages?.flatMap((page) => (page as any).data) ?? [];
  }, [data]);

  if (!hasViewAccess) {
    return <AccessDeniedView moduleName="Accounts" />;
  }

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView refetch={refetch} />;

  const handleCreate = (formData: any) => {
    createAccount.mutate(formData, {
      onSuccess: () => {
        setIsAddOpen(false);
        refetch();
        refetchSummary();
      },
    });
  };

  const handleUpdate = (formData: any) => {
    updateAccount.mutate(formData, {
      onSuccess: () => {
        setIsEditOpen(false);
        refetch();
        refetchSummary();
      },
    });
  };

  const handleDelete = () => {
    if (selectedAccount) {
      deleteAccount.mutate(
        { id: selectedAccount.id },
        {
          onSuccess: () => {
            setIsDeleteAlertOpen(false);
            refetch();
            refetchSummary();
          },
        }
      );
    }
  };

  const handleTransfer = (data: IAccountTransfer) => {
    transferFunds.mutate(data, {
      onSuccess: () => {
        setIsTransferOpen(false);
        refetch();
        refetchSummary();
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
          <p className="text-sm text-muted-foreground">
            Manage your cash, bank, and mobile money accounts.
          </p>
        </div>
        <div className="flex gap-2">
          {hasCreateAccess && (
            <Button className="w-full sm:w-auto" onClick={() => setIsAddOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Account
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(summaryData?.totalBalance || 0).toLocaleString()} ETB
            </div>
            <p className="text-xs text-muted-foreground">
              Combined across {accounts.length} accounts
            </p>
          </CardContent>
        </Card>
        {/* These might need real data from backend if summary provides them */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Inflow</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{Number(summaryData?.monthlyInflow || 0).toLocaleString()} ETB
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Outflow</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              -{Number(summaryData?.monthlyOutflow || 0).toLocaleString()} ETB
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account Name</TableHead>
              <TableHead>Bank / Institution</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead className="text-right">Current Balance</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No accounts found.
                </TableCell>
              </TableRow>
            ) : (
              accounts.map((acc: IAccountDetail) => (
                <TableRow key={acc.id} className="cursor-pointer" onClick={() => router.push(`/app/account/${acc.id}`)}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                      {acc.name}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{acc.bank?.toLowerCase().replace(/_/g, " ")}</TableCell>
                  <TableCell>{acc.branch || "-"}</TableCell>
                  <TableCell className="font-mono">{acc.number || "-"}</TableCell>
                  <TableCell className="text-right font-bold">
                    {Number(acc.balance).toLocaleString()} ETB
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/app/account/${acc.id}`)}>
                          <Eye className="mr-2 h-4 w-4" /> View Transactions
                        </DropdownMenuItem>
                        {hasUpdateAccess && (
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAccount(acc);
                              setIsEditOpen(true);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Edit Details
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedAccount(acc);
                            setIsTransferOpen(true);
                          }}
                        >
                          <ArrowLeftRight className="mr-2 h-4 w-4" /> Transfer Funds
                        </DropdownMenuItem>
                        {hasDeleteAccess && (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedAccount(acc);
                              setIsDeleteAlertOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Account
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
      </div>

      {/* Modals */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
          </DialogHeader>
          <AccountForm onSave={handleCreate} loading={createAccount.isPending} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
          </DialogHeader>
          <AccountForm
            mode="edit"
            data={selectedAccount || {}}
            onSave={handleUpdate}
            loading={updateAccount.isPending}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Funds</DialogTitle>
          </DialogHeader>
          <TransferFundsForm
            fromAccountId={selectedAccount?.id || ""}
            accounts={accounts}
            onTransfer={handleTransfer}
            loading={transferFunds.isPending}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              account <strong>{selectedAccount?.name}</strong> and all associated
              transaction history.
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

