"use client";

import React from "react";
import { useInfiniteLoanPartners } from "@/api/loan/api.loan";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, HandCoins } from "lucide-react";
import { useRouter } from "next/navigation";
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

export default function LoanPage() {
  const router = useRouter();
  const { canView, canCreate } = usePermissions();
  const hasViewAccess = canView("LOANS");
  const hasCreateAccess = canCreate("LOANS");

  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteLoanPartners(hasViewAccess);

  const loanPartners = React.useMemo(() => {
    return data?.pages?.flatMap((page) => (page as any).data) ?? [];
  }, [data]);

  if (!hasViewAccess) {
    return <AccessDeniedView moduleName="Loans" />;
  }

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView refetch={refetch} />;

  const totalGiven = loanPartners.filter((p: any) => p.balance > 0).reduce(
    (sum: number, p: any) => sum + p.balance,
    0
  );
  
  const totalTaken = loanPartners.filter((p: any) => p.balance < 0).reduce(
    (sum: number, p: any) => sum + Math.abs(p.balance),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Loans</h1>
          <p className="text-sm text-muted-foreground">
            Monitor borrow/lend balances and repayment history.
          </p>
        </div>
        {hasCreateAccess && (
          <Button className="w-full sm:w-auto" onClick={() => router.push("/app/loan/new")}>
            <Plus className="mr-2 h-4 w-4" /> Add Partner Loan
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Given</h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-emerald-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-emerald-600">Br {totalGiven.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{loanPartners.filter((p: any) => p.balance > 0).length} partners</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Taken</h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-red-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-red-600">Br {totalTaken.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{loanPartners.filter((p: any) => p.balance < 0).length} partners</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search partners..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner Name</TableHead>
              <TableHead>Current Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loanPartners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No loan records found.
                </TableCell>
              </TableRow>
            ) : (
              loanPartners.map((lp: any) => {
                const balance = Number(lp.balance || lp.totalLoan || 0);
                return (
                  <TableRow key={lp.id} className="cursor-pointer" onClick={() => {
                    const queryObj = new URLSearchParams({
                      name: lp.name || "",
                      phone: lp.phone || "",
                      balance: balance.toString(),
                      address: lp.address || ""
                    });
                    router.push(`/app/loan/${lp.id}?${queryObj.toString()}`);
                  }}>
                    <TableCell className="font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <HandCoins className="h-4 w-4 text-muted-foreground" />
                        {lp.name}
                      </div>
                    </TableCell>
                    <TableCell className={`font-bold ${balance < 0 ? "text-red-600" : "text-emerald-600"}`}>
                      Br {Math.abs(balance).toLocaleString()}
                      <span className="ml-1 text-[10px] font-normal text-muted-foreground uppercase">
                        ({balance < 0 ? "Owed" : "Lent"})
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        balance === 0 ? "bg-gray-50 text-gray-700 ring-gray-600/20" : 
                        balance < 0 ? "bg-red-50 text-red-700 ring-red-600/10" : "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
                      }`}>
                        {balance === 0 ? "Settled" : balance < 0 ? "Passive" : "Active"}
                      </span>
                    </TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            const queryObj = new URLSearchParams({
                              name: lp.name || "",
                              phone: lp.phone || "",
                              balance: balance.toString(),
                              address: lp.address || ""
                            });
                            router.push(`/app/loan/${lp.id}?${queryObj.toString()}`);
                          }}>View Ledger</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
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

