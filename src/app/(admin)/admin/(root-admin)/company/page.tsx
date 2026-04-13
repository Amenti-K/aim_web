"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { SearchFilters } from "@/components/company/SearchFilters";
import { CompanyCard } from "@/components/company/CompanyCard";
import { CompanyTable } from "@/components/company/CompanyTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAttachCashAccount,
  useFetchCompanies,
} from "@/api/company/api.company";
import {
  ICompanyFilterDto,
  ICompanyList,
} from "@/components/interface/company/company.interface";
import { useRouter } from "next/navigation";
import { ErrorView, LoadingView } from "@/components/common/StateView";

type ViewMode = "table" | "cards";

const Companies = () => {
  const router = useRouter();
  const attachCashAccount = useAttachCashAccount();

  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [filters, setFilters] = useState<ICompanyFilterDto>({
    page: 1,
    limit: 10,
    name: "",
    ownerPhone: "",
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchCompanies(filters.limit, filters.name, filters.ownerPhone);

  const companies =
    data?.pages.flatMap((page) => page.data) || ([] as ICompanyList[]);

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
    }));
    // Refetch is handled automatically by queryKey changes in the hook
  };


  const handelCompanyClick = (id: string) => {
    router.push(`/admin/company/${id}`);
    // router.push(router.pathname + "/" + id);
  };

  const handleFixCompanies = () => {
    attachCashAccount.mutate({} as JSON);
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
          {/* <Button
            variant="link"
            // size="sm"
            onClick={handleFixCompanies}
          >
            Fix Companies
          </Button> */}
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

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="min-w-[200px]"
          >
            {isFetchingNextPage ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Loading...
              </div>
            ) : (
              "Load More Companies"
            )}
          </Button>
        </div>
      )}

      {!hasNextPage && companies.length > 0 && (
        <p className="text-center text-sm text-muted-foreground pt-4">
          No more companies to show
        </p>
      )}

    </div>
  );
};

export default Companies;
