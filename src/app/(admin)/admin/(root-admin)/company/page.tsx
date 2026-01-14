"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { SearchFilters } from "@/components/company/SearchFilters";
import { CompanyCard } from "@/components/company/CompanyCard";
import { CompanyTable } from "@/components/company/CompanyTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useFetchCompanies } from "@/api/company/api.company";
import { CompanyFilterDto } from "@/types";
import { ICompanyList } from "@/components/interface/company/company.interface";
import { useRouter } from "next/navigation";
import { ErrorView, LoadingView } from "@/components/common/StateView";

type ViewMode = "table" | "cards";

const Companies = () => {
  const router = useRouter();

  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [filters, setFilters] = useState<CompanyFilterDto>({
    page: 1,
    limit: 10,
    name: "",
    ownerPhone: "",
  });

  const { data, isLoading, error, refetch } = useFetchCompanies(
    filters.page,
    filters.limit,
    filters.name,
    filters.ownerPhone
  );
  const companies = data?.data || ([] as ICompanyList[]);
  const meta = data?.meta;

  if (isLoading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView refetch={refetch} />;
  }

  const handleSearch = (name: string, phone: string) => {
    setFilters((prev) => ({
      ...prev,
      name: name || undefined,
      ownerPhone: phone || undefined,
      page: 1,
      limit: 10,
    }));
    refetch();
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    refetch();
  };

  const handelCompanyClick = (id: string) => {
    router.push(`/admin/company/${id}`);
    // router.push(router.pathname + "/" + id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Companies</h1>
          <p className="text-muted-foreground">
            Manage and view all registered companies
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border p-1">
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "cards" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("cards")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        {/* <CardHeader>
          <CardTitle className="text-lg">Search Filters</CardTitle>
        </CardHeader> */}
        <CardContent>
          <SearchFilters onSearch={handleSearch} />
        </CardContent>
      </Card>

      {viewMode === "table" ? (
        <CompanyTable companies={companies} onSelect={handelCompanyClick} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies?.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onSelect={handelCompanyClick}
            />
          ))}
        </div>
      )}

      {/* {meta && meta.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
                className={
                  filters.page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: meta.totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => handlePageChange(i + 1)}
                  isActive={filters.page === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(meta.totalPages, filters.page + 1))
                }
                className={
                  filters.page === meta.totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )} */}
    </div>
  );
};

export default Companies;
