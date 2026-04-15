"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAccount,
  useTransferFunds,
  useFetchAccountSelector,
} from "@/api/account/api.account";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowLeftRight,
  Wallet,
  Calendar,
  Building2,
  Hash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TransferFundsForm from "@/components/account/TransferFundsForm";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatter";

export default function AccountDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  const {
    data: accountData,
    isLoading,
    isError,
    refetch,
  } = useGetAccount(id as string);
  const { data: accountsData } = useFetchAccountSelector();
  const transferFunds = useTransferFunds();

  if (isLoading) return <LoadingView />;
  if (isError || !accountData?.data) return <ErrorView refetch={refetch} />;

  const account = accountData.data;
  const transactions = account.transactions || [];
  const accounts = accountsData?.data || [];

  const handleTransfer = (data: any) => {
    transferFunds.mutate(data, {
      onSuccess: () => {
        setIsTransferOpen(false);
        refetch();
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{account.name}</h1>
          <p className="text-sm text-muted-foreground">
            Account Details & Transactions
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 overflow-hidden border-none shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          <CardHeader className="relative">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">Account Information</CardTitle>
                <CardDescription>
                  Detailed view of your {account.type} account
                </CardDescription>
              </div>
              <Badge variant={account.isActive ? "default" : "secondary"}>
                {account.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="relative grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-muted">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Bank / Institution
                  </p>
                  <p className="font-medium capitalize">
                    {account.bank?.toLowerCase().replace(/_/g, " ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-muted">
                  <Hash className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Account Number
                  </p>
                  <p className="font-mono">{account.number || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-muted">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Created On
                  </p>
                  <p className="font-medium">{formatDate(account.createdAt)}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center md:items-end space-y-2">
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-4xl font-bold text-primary">
                {Number(account.balance).toLocaleString()}{" "}
                <span className="text-lg font-normal">ETB</span>
              </p>
              <Button className="mt-4" onClick={() => setIsTransferOpen(true)}>
                <ArrowLeftRight className="mr-2 h-4 w-4" /> Transfer Funds
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Transaction Summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-600">Total Inflow</p>
              <p className="text-lg font-bold text-green-700">
                +
                {Number(
                  transactions
                    .filter((t: any) => t.direction === "in")
                    .reduce((acc: number, t: any) => acc + Number(t.amount), 0),
                ).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-600">Total Outflow</p>
              <p className="text-lg font-bold text-red-700">
                -
                {Number(
                  transactions
                    .filter((t: any) => t.direction === "out")
                    .reduce((acc: number, t: any) => acc + Number(t.amount), 0),
                ).toLocaleString()}
              </p>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground text-center">
                Reflecting {transactions.length} total transactions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions History</CardTitle>
          <CardDescription>Recent activities on this account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type / Source</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Related Party</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((tx: any) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-muted-foreground">
                        {formatDate(tx.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {tx.source.replace(/_/g, " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {tx.description || "-"}
                      </TableCell>
                      <TableCell>{tx.relatedName || "-"}</TableCell>
                      <TableCell
                        className={`text-right font-bold ${tx.direction === "in" ? "text-green-600" : "text-red-600"}`}
                      >
                        {tx.direction === "in" ? "+" : "-"}{" "}
                        {Number(tx.amount).toLocaleString()} ETB
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Funds</DialogTitle>
          </DialogHeader>
          <TransferFundsForm
            fromAccountId={account.id}
            accounts={accounts}
            onTransfer={handleTransfer}
            loading={transferFunds.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
