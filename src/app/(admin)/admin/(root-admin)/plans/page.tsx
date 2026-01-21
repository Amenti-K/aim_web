"use client";

import React, { useState } from "react";
import { useFetchPlans, useCreatePlan } from "@/api/subscription/api.plan";
import { ErrorView, LoadingView } from "@/components/common/StateView";
import { IPlan } from "@/components/interface/subscription/subscription.interface";
import { useRouter } from "next/navigation";
import PlanCard from "@/components/plan/planCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlanForm } from "@/components/forms/form.plan";
import { PlanFormValues } from "@/components/schema/plan.schema";

function Plans() {
  const router = useRouter();
  const { data, isLoading, error } = useFetchPlans();
  const { mutate: createPlan, isPending: isCreating } = useCreatePlan();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const plans = data?.data || [];

  const handleSelectPlan = (plan: IPlan) => {
    router.push(`/admin/plans/${plan.id}`);
  };

  const handleCreateSubmit = (values: PlanFormValues) => {
    const payload = {
      ...values,
      description: values.description || undefined, // Ensure optional fields are undefined if empty
    };
    createPlan(payload, {
      onSuccess: () => {
        setIsCreateOpen(false);
      },
    });
  };

  if (isLoading) return <LoadingView />;
  if (error) return <ErrorView message="Failed to load plans." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plans</h1>
          <p className="text-muted-foreground">
            Manage subscription plans and pricing tiers.
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent
            className="w-[85%] max-w-[85%] max-h-[90vh] overflow-y-auto"
            style={{ width: 850 }}
          >
            <DialogHeader>
              <DialogTitle>Create New Plan</DialogTitle>
            </DialogHeader>
            <PlanForm onSubmit={handleCreateSubmit} isLoading={isCreating} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onClick={handleSelectPlan} />
        ))}
      </div>
    </div>
  );
}

export default Plans;
