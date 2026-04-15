import { useMutate, useFetch, useInfiniteFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";

export interface IPurchaseItem {
  id: string;
  unitPrice: number;
  quantity: number;
  inventoryId: string;
  warehouseId?: string;
}

export interface IPurchasePayment {
  amount: number;
  description?: string;
  accountId: string;
}

export interface INewPurchase {
  description?: string;
  partnerId: string;
  purchaseItems: IPurchaseItem[];
  purchasePayments: IPurchasePayment[];
}

export interface IPurchase {
  id: string;
  createdAt: string;
  description?: string;
  partnerId?: string;
  partner?: any;
  purchaseItems: {
    inventory: { name: string };
    unitPrice: number | string;
    quantity: number;
  }[];
  total: number;
}

export interface IPurchaseResponse {
  data: IPurchase[];
}

export interface IPurchaseDailyResponse {
  totalPaidByBank: number;
  totalPaidByCash: number;
  totalLoan: number;
}

export interface IPurchaseView extends IPurchase {
  partner?: any;
  purchaseItems: any[];
  purchasePayments: any[];
  purchaseCashPayment?: any;
  loan?: any;
  lastAuditLog: any;
}

const onErrorNotification = (error: any) => {
  toast.error(error.response?.data?.message || error.response?.data?.msg || "An error occurred");
};

const onSuccessNotification = (data: any) => {
  toast.success(data?.message || data?.msg || "Success!");
};

export const useFetchPurchases = (
  page: number,
  size: number,
  filterOptions?: Record<string, any>,
  enabled?: boolean
) => {
  const { search, ...filter } = filterOptions ?? { search: undefined };
  const queryParams = {
    page: page?.toString(),
    size: size?.toString(),
    ...(filter ? { ...filter } : {}),
    ...(search ? { search } : {}),
  };

  return useFetch<IPurchaseResponse>(endpoints.PURCHASE, {
    queryKey: queryKeys.purchases.list(queryParams),
    params: queryParams,
    enabled: enabled ?? true,
  });
};

export const useInfinitePurchases = (
  enabled: boolean,
  filters: Record<string, any> = {}
) => {
  return useInfiniteFetch<IPurchaseResponse>(endpoints.PURCHASE, {
    queryKey: queryKeys.purchases.list(filters),
    params: { ...filters, limit: 10 },
    enabled,
  });
};

export const useCreatePurchase = () => {
  return useMutate<INewPurchase>(endpoints.PURCHASE, "post", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.purchases.root,
  });
};

export const useFetchDailyPurchaseReport = (
  date: Date,
  enabled?: boolean
) => {
  const queryParams = {
    date: date?.toISOString(),
  };
  return useFetch<IPurchaseDailyResponse>(endpoints.PURCHASE + `/daily-report`, {
    queryKey: queryKeys.purchases.list(queryParams),
    params: queryParams,
    enabled: enabled ?? true,
  });
};

export const useFetchPurchase = (id: string, enabled?: boolean) => {
  return useFetch<{ data: IPurchaseView }>(`${endpoints.PURCHASE}/${id}`, {
    queryKey: queryKeys.purchases.detail(id),
    enabled: enabled ?? !!id,
  });
};

export const useUpdatePurchase = (id: string) => {
  return useMutate<Partial<IPurchase>>(`${endpoints.PURCHASE}/${id}`, "patch", {
    onError: onErrorNotification,
    onSuccess: () => toast.success("Purchase updated successfully!"),
    queryKey: queryKeys.purchases.root,
  });
};

export const useDeletePurchase = () => {
  return useMutate(
    (data: { id: string }) => `${endpoints.PURCHASE}/${data.id}`,
    "delete",
    {
      onError: onErrorNotification,
      onSuccess: () => toast.success("Purchase Deleted successfully!"),
      queryKey: queryKeys.purchases.root,
    }
  );
};
