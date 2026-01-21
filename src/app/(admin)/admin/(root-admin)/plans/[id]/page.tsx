"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useFetchPlanById,
  useUpdatePlan,
  useDeactivatePlan,
} from "@/api/subscription/api.plan";
import { ErrorView, LoadingView } from "@/components/common/StateView";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlanForm } from "@/components/forms/form.plan";
import { PlanFormValues } from "@/components/schema/plan.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Edit,
  DollarSign,
  Box,
  LayoutDashboard,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PlanDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useFetchPlanById(id);
  const { mutate: updatePlan, isPending: isUpdating } = useUpdatePlan(id);
  const { mutate: deactivatePlan, isPending: isDeactivating } =
    useDeactivatePlan(id);

  const [isEditOpen, setIsEditOpen] = useState(false);

  // Handle Loading & Error
  if (isLoading) return <LoadingView />;
  if (error || !data?.data) return <ErrorView message="Plan not found." />;

  const plan = data.data;

  const handleUpdate = (values: PlanFormValues) => {
    updatePlan(values, {
      onSuccess: () => {
        setIsEditOpen(false);
      },
    });
  };

  const handleDeactivate = () => {
    deactivatePlan(undefined, {
      onSuccess: () => {
        router.push("/admin/plans");
      },
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight inline-flex items-center gap-3">
              {plan.name}
              {plan.isEnterprise && (
                <Badge variant="secondary">Enterprise</Badge>
              )}
              {plan.isActive ? (
                <Badge className="bg-green-500 hover:bg-green-600">
                  Active
                </Badge>
              ) : (
                <Badge variant="destructive">Inactive</Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              Plan ID: <span className="font-mono text-xs">{plan.id}</span>
            </p>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {plan.description || "No description provided."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" /> Edit Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[85%] max-w-[85%] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Plan</DialogTitle>
              </DialogHeader>
              <PlanForm
                initialData={plan}
                onSubmit={handleUpdate}
                isLoading={isUpdating}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Deactivate
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will deactivate the plan. Users currently
                  subscribed may not be affected immediately depending on logic,
                  but new subscriptions will be blocked.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={handleDeactivate}
                  disabled={isDeactivating}
                >
                  {isDeactivating ? "Deactivating..." : "Deactivate Plan"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Row 1: Pricing and Limits */}

        {/* Pricing */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" /> Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {plan.prices.length > 0 ? (
              plan.prices.map((price) => (
                <div
                  key={price.id}
                  className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0 border-primary/10"
                >
                  <span className="font-medium capitalize text-muted-foreground">
                    {price.interval.toLowerCase().replace("_", " ")}
                  </span>
                  <span className="text-xl font-bold">
                    {new Intl.NumberFormat("en-ET", {
                      style: "currency",
                      currency: price.currency,
                    }).format(price.amount)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground italic">
                No pricing configured.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Box className="w-5 h-5" /> Limits
            </CardTitle>
            <CardDescription>Usage limits for this plan</CardDescription>
          </CardHeader>
          <CardContent>
            {plan.limits.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {plan.limits.map((limit, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col border rounded-md p-3"
                  >
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                      {limit.metric}
                    </span>
                    <span className="text-lg font-semibold">
                      {limit.value === null ? "Unlimited" : limit.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">
                No usage limits defined.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Row 2: Features and Description (Full Width) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" /> Features (
                {plan.features.filter((f) => f.enabled).length})
              </CardTitle>
              <CardDescription>Enabled features for this plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {plan.features
                  .filter((f) => f.enabled)
                  .map((feature) => (
                    <div
                      key={feature.feature}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">
                        {feature.feature}
                      </span>
                    </div>
                  ))}
                {plan.features.filter((f) => f.enabled).length === 0 && (
                  <p className="text-muted-foreground italic">
                    No specific features enabled.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
