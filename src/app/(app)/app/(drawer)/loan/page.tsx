"use client";

import React from "react";
import { useInfiniteLoanPartners } from "@/api/loan/api.loan";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, HandCoins } from "lucide-react";
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
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Partner Loan
          </Button>
        )}
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
              loanPartners.map((lp: any) => (
                <TableRow key={lp.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <HandCoins className="h-4 w-4 text-muted-foreground" />
                      {lp.name}
                    </div>
                  </TableCell>
                  <TableCell className={`font-bold ${lp.totalLoan < 0 ? "text-red-600" : "text-green-600"}`}>
                    ${Math.abs(Number(lp.totalLoan)).toLocaleString()}
                    <span className="ml-1 text-[10px] font-normal text-muted-foreground uppercase">
                      ({lp.totalLoan < 0 ? "Owed" : "Lent"})
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      lp.totalLoan === 0 ? "bg-gray-50 text-gray-700 ring-gray-600/20" : 
                      lp.totalLoan < 0 ? "bg-red-50 text-red-700 ring-red-600/10" : "bg-green-50 text-green-700 ring-green-600/10"
                    }`}>
                      {lp.totalLoan === 0 ? "Settled" : lp.totalLoan < 0 ? "Passive" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Ledger</DropdownMenuItem>
                        <DropdownMenuItem>Add Transaction</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Settle All
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
