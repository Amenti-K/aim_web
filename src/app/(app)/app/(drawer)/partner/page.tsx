"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPartnersInfinite } from "@/api/partner/api.partner";
import { LoadingView, ErrorView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, User, Eye, Pencil } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function PartnerPage() {
  const router = useRouter();
  const { canView, canCreate, canUpdate } = usePermissions();
  const hasViewAccess = canView("PARTNERS");
  const hasCreateAccess = canCreate("PARTNERS");
  const hasUpdateAccess = canUpdate("PARTNERS");
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPartnersInfinite({ search }, hasViewAccess);

  const partners = useMemo(() => {
    return data?.pages?.flatMap((page) => (page as any).data) ?? [];
  }, [data]);

  if (!hasViewAccess) {
    return <AccessDeniedView moduleName="Partners" />;
  }

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView refetch={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Partners</h1>
          <p className="text-sm text-muted-foreground">
            Customers and suppliers you do business with.
          </p>
        </div>
        {hasCreateAccess && (
          <Button className="w-full sm:w-auto" onClick={() => router.push("/app/partner/new")}>
            <Plus className="mr-2 h-4 w-4" /> Add Partner
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search partners..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No partners found.
                </TableCell>
              </TableRow>
            ) : (
              partners.map((partner: any) => (
                <TableRow key={partner.id} className="cursor-pointer" onClick={() => router.push(`/app/partner/${partner.id}`)}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span>{partner.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{partner.phone || "N/A"}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {partner.address || "N/A"}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/app/partner/${partner.id}`)}>
                          <Eye className="mr-2 h-4 w-4" /> View details
                        </DropdownMenuItem>
                        {hasUpdateAccess && (
                          <DropdownMenuItem onClick={() => router.push(`/app/partner/${partner.id}/edit`)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
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
    </div>
  );
}
