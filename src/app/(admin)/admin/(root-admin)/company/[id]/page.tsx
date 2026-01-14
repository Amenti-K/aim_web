"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";
import { formatDate } from "@/lib/formatter";
import { useFetchCompany } from "@/api/company/api.company";
import { CompanyOwnerCard } from "@/components/company/CompanyOwnerCard";
import { CompanySubscriptionCard } from "@/components/company/CompanySubscriptionCard";
import { CompanyLimitsCard } from "@/components/company/CompanyLimitsCard";
import { CompanyFeaturesCard } from "@/components/company/CompanyFeaturesCard";
import { SubscriptionActions } from "@/components/company/SubscriptionActions";

const CompanyDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useFetchCompany(id);
  const company = data?.data;
  const owner = company?.owner;

  if (!isLoading && error) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-40" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Company not found</p>
        <Button variant="link" onClick={() => router.back()}>
          Back to Companies
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/companies")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Companies
      </Button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {company.name}
            </h1>
            <p className="text-muted-foreground">
              Created {formatDate(new Date(company.createdAt))}
            </p>
          </div>
        </div>
        {company.subscription && (
          <SubscriptionBadge
            status={company.subscription.status}
            className="text-sm"
          />
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CompanyOwnerCard owner={owner} createdAt={company.createdAt} />
        <CompanySubscriptionCard subscription={company.subscription} />
        <CompanyLimitsCard
          subscription={company.subscription}
          usages={company.usages}
        />
        <CompanyFeaturesCard features={company.subscription?.plan.features} />
      </div>

      <SubscriptionActions
        companyId={company.id}
        subscription={company.subscription}
      />
    </div>
  );
};

export default CompanyDetail;
