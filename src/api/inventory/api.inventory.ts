import { useMutate, useInfiniteFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";

export interface IInventory {
  id: string;
  name: string;
  sku?: string;
  brand?: string;
  unit: string;
  boughtPrice: number;
  sellingPrice: number;
  initialQuantity: number;
  warehouseInventories: Array<{
    warehouseId: string;
    quantity: number;
    reorderQuantity?: number;
  }>;
}

export interface BulkInventory {
  inventories: Array<Partial<IInventory>>;
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
