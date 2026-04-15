import { useFetch, useMutate, useInfiniteFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";

export interface IInventory {
  id: string;
  sku?: string;
  name: string;
  brand?: string;
  unit: string;
  boughtPrice: number;
  sellingPrice: number;
  initialQuantity: number;
  hasTransactions?: boolean;
  purchaseItems?: any[];
  saleItems?: any[];
  lastAuditLog?: any;
  warehouseInventories: Array<{
    id?: string;
    warehouseId: string;
    quantity: number;
    reorderQuantity?: number;
    warehouse?: {
      id: string;
      name: string;
      isInternal?: boolean;
    };
  }>;
}

export interface BulkInventory {
  inventories: Array<Partial<IInventory>>;
}

export enum StockStatus {
  ALL = "all",
  LOW = "low",
  OUT = "out",
}

export enum TimeFrame {
  LAST_30_DAYS = "LAST_30_DAYS",
  LAST_90_DAYS = "LAST_90_DAYS",
  LAST_180_DAYS = "LAST_180_DAYS",
  LAST_365_DAYS = "LAST_365_DAYS",
}

export interface IInventoryAnalytics {
  summary: {
    totalPurchase: number;
    totalSale: number;
    netMovement: number;
    avgDailySales: number;
  };
  financials: {
    totalRevenue: number;
    totalCOGS: number;
    totalProfit: number;
    profitMargin: number;
    avgPurchasePrice: number;
    avgSalePrice: number;
  };
  analysis: {
    topPerformingWarehouses: {
      name: string;
      totalSold: number;
      revenue: number;
    }[];
  };
  history: Array<{
    id?: string;
    type: "purchase" | "sale";
    createdAt: string;
    unitPrice: number;
    quantity: number;
  }>;
}

const onErrorNotification = (error: any) => {
  toast.error(error.response?.data?.message || error.response?.data?.msg || "An error occurred");
};

const onSuccessNotification = (data: any) => {
  toast.success(data?.message || data?.msg || "Success!");
};

export const useCreateBulkInventory = () => {
  return useMutate<BulkInventory>(endpoints.INVENTORY + "/bulk", "post", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.inventories.root,
  });
};

export const useCreateInventory = () => {
  return useMutate<Partial<IInventory>>(endpoints.INVENTORY, "post", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.inventories.root,
  });
};

export const useGetInventoriesInfinite = (
  filterOptions?: Record<string, any>,
  enabled?: boolean
) => {
  const { search, ...filter } = filterOptions ?? { search: undefined };
  const queryParams = {
    ...(filter ? { ...filter } : {}),
    ...(search ? { search } : {}),
  };

  return useInfiniteFetch<any>(endpoints.INVENTORY, {
    queryKey: queryKeys.inventories.list(queryParams),
    params: { ...queryParams, limit: 10 },
    enabled: enabled ?? true,
  });
};

export const useFetchInventory = (id: string, enabled?: boolean) => {
  return useFetch<{ data: IInventory }>(`${endpoints.INVENTORY}/${id}`, {
    queryKey: queryKeys.inventories.detail(id),
    enabled: enabled ?? !!id,
  });
};

export const useFetchWarehouseInventorySelector = (
  warehouseId: string,
  enabled?: boolean,
) => {
  return useFetch<any>(`${endpoints.INVENTORY}/select/${warehouseId}`, {
    queryKey: queryKeys.warehouses.inventories(warehouseId),
    enabled: enabled ?? !!warehouseId,
  });
};

export const useFetchInventoryAnalytics = (
  id: string,
  enabled?: boolean,
  filters: Record<string, any> = {},
) => {
  return useFetch<{ data: IInventoryAnalytics }>(
    `${endpoints.INVENTORY}/analytics/${id}`,
    {
      queryKey: queryKeys.inventories.analytics(id, filters),
      params: { ...filters },
      enabled: enabled ?? !!id,
    },
  );
};

export const useUpdateInventory = (id: string) => {
  return useMutate<Partial<IInventory>>(`${endpoints.INVENTORY}/${id}`, "patch", {
    onError: onErrorNotification,
    onSuccess: () => toast.success("Inventory updated successfully!"),
    queryKey: queryKeys.inventories.root,
  });
};

export const useDeleteInventory = () => {
  return useMutate(
    (data: { id: string }) => `${endpoints.INVENTORY}/${data.id}`,
    "delete",
    {
      onError: onErrorNotification,
      onSuccess: () => toast.success("Inventory deleted successfully!"),
      queryKey: queryKeys.inventories.root,
    }
  );
};
