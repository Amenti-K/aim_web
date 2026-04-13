import { useMutate, useFetch, useInfiniteFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";

export interface ISellItem {
  id: string;
  unitPrice: number;
  quantity: number;
  inventoryId: string;
  warehouseId?: string;
}

export interface IPaymentItem {
  amount: number;
  description?: string;
  accountId: string;
}

export interface ICashPayment {
  amount: number;
  description?: string;
}

export interface INewSale {
  description?: string;
  partnerId: string;
  saleItems: ISellItem[];
  salePayments: IPaymentItem[];
  saleCashPayments?: ICashPayment;
}

export interface ISale {
  id: string;
  createdAt: string;
  description?: string;
  partnerId?: string;
  partner?: any;
  saleItems: {
    inventory: { name: string };
    unitPrice: number | string;
    quantity: number;
  }[];
  total: number;
}

export interface ISaleResponse {
  data: ISale[];
}

export interface ISaleDailyResponse {
  totalPaidByBank: number;
  totalPaidByCash: number;
  totalLoan: number;
}

export interface ISaleView extends ISale {
  partner?: any;
  saleItems: any[];
  salePayments: any[];
  saleCashPayment?: ICashPayment;
  loan?: any;
  lastAuditLog: any;
}

const onErrorNotification = (error: any) => {
  toast.error(error.response?.data?.message || error.response?.data?.msg || "An error occurred");
};

const onSuccessNotification = (data: any) => {
  toast.success(data?.message || data?.msg || "Success!");
};

export const useFetchSales = (
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

  return useFetch<ISaleResponse>(endpoints.SALE, {
    queryKey: queryKeys.sales.list(queryParams),
    params: queryParams,
    enabled: enabled ?? true,
  });
};

export const useInfiniteSales = (
  enabled: boolean,
  filters: Record<string, any> = {}
) => {
  return useInfiniteFetch<ISaleResponse>(endpoints.SALE, {
    queryKey: queryKeys.sales.list(filters),
    params: { ...filters, limit: 10 },
    enabled,
  });
};

export const useCreateSale = () => {
  return useMutate<INewSale>(endpoints.SALE, "post", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.sales.root,
  });
};

export const useFetchDailySaleReport = (
  date: Date,
  enabled?: boolean
) => {
  const queryParams = {
    date: date?.toISOString(),
  };
  return useFetch<ISaleDailyResponse>(endpoints.SALE + `/daily-report`, {
    queryKey: queryKeys.sales.list(queryParams),
    params: queryParams,
    enabled: enabled ?? true,
  });
};

export const useFetchSale = (id: string, enabled?: boolean) => {
  return useFetch<{ data: ISaleView }>(`${endpoints.SALE}/${id}`, {
    queryKey: queryKeys.sales.detail(id),
    enabled: enabled ?? !!id,
  });
};

export const useUpdateSale = (id: string) => {
  return useMutate<Partial<ISale>>(`${endpoints.SALE}/${id}`, "patch", {
    onError: onErrorNotification,
    onSuccess: () => toast.success("Sale updated successfully!"),
    queryKey: queryKeys.sales.root,
  });
};

export const useDeleteSale = () => {
  return useMutate(
    (data: { id: string }) => `${endpoints.SALE}/${data.id}`,
    "delete",
    {
      onError: onErrorNotification,
      onSuccess: () => toast.success("Sale Deleted successfully!"),
      queryKey: queryKeys.sales.root,
    }
  );
};
