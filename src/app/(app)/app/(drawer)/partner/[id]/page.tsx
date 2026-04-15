"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useDeletePartner, useFetchPartnerById } from "@/api/partner/api.partner";
import { ErrorView, LoadingView } from "@/components/common/StateView";
import { AccessDeniedView } from "@/components/guards/AccessDeniedView";
import { usePermissions } from "@/hooks/permission.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function PartnerDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const partnerId = id as string;
  const { canView, canUpdate, canDelete } = usePermissions();
  const [openDelete, setOpenDelete] = React.useState(false);
  const { data, isLoading, isError, refetch } = useFetchPartnerById(partnerId, canView("PARTNERS"));
  const deletePartner = useDeletePartner();

  if (!canView("PARTNERS")) return <AccessDeniedView moduleName="Partners" />;
  if (isLoading) return <LoadingView />;
  if (isError || !data?.data) return <ErrorView refetch={refetch} />;
  const partner = data.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft className="h-5 w-5" /></Button>
          <div><h1 className="text-2xl font-bold">{partner.name}</h1><p className="text-sm text-muted-foreground">{partner.phone || "No phone"}</p></div>
        </div>
        <div className="flex gap-2">
          {canUpdate("PARTNERS") && <Button variant="outline" onClick={() => router.push(`/app/partner/${partnerId}/edit`)}><Pencil className="mr-2 h-4 w-4" /> Edit</Button>}
          {canDelete("PARTNERS") && <Button variant="destructive" onClick={() => setOpenDelete(true)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>}
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Partner profile</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <div><p className="text-xs text-muted-foreground">Name</p><p>{partner.name}</p></div>
          <div><p className="text-xs text-muted-foreground">Phone</p><p>{partner.phone || "N/A"}</p></div>
          <div className="md:col-span-2"><p className="text-xs text-muted-foreground">Address</p><p>{partner.address || "N/A"}</p></div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle className="text-base">Sales</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{partner.sale?.length || 0}</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Purchases</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{partner.purchases?.length || 0}</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Loans</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{partner.loans?.length || 0}</p></CardContent></Card>
      </div>

      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete partner?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => deletePartner.mutate({ id: partnerId } as any, { onSuccess: () => router.push("/app/partner") })}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
