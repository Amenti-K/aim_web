import { useMutate, useFetch, useInfiniteFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";

export interface IWarehouse {
  id: string;
  name: string;
  location?: string;
  contactPhone?: string;
  description?: string;
  isInternal: boolean;
}

export interface INewWarehouse {
  name: string;
  location?: string;
  contactPhone?: string;
  description?: string;
  isInternal: boolean;
}

export interface IWarehouseResponse {
  data: IWarehouse[];
  meta: any;
}

export interface IWarehouseSelector {
  id: string;
  name: string;
  isInternal: boolean;
  location: string;
}

export interface IWarehouseSelectResponse {
  data: IWarehouseSelector[];
}

export interface BulkWarehouse {
  warehouses: Array<Partial<INewWarehouse>>;
}

const onErrorNotification = (error: any) => {
  toast.error(error.response?.data?.message || error.response?.data?.msg || "An error occurred");
};

const onSuccessNotification = (data: any) => {
  toast.success(data?.message || data?.msg || "Success!");
};

export const useGetWarehousesInfinite = (
  filterOptions?: Record<string, any>,
  enabled?: boolean
) => {
  const { search, ...filter } = filterOptions ?? { search: undefined };
  const queryParams = {
    ...(filter ? { ...filter } : {}),
    ...(search ? { search } : {}),
  };

  return useInfiniteFetch<IWarehouseResponse>(endpoints.WAREHOUSE, {
    queryKey: queryKeys.warehouses.list(queryParams),
    params: { ...queryParams, limit: 10 },
    enabled: enabled ?? true,
  });
};

export const useCreateWarehouse = () => {
  return useMutate<IWarehouse>(endpoints.WAREHOUSE, "post", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.warehouses.root,
  });
};

export const useCreateManyWarehouses = () => {
  return useMutate<BulkWarehouse>(endpoints.WAREHOUSE + "/bulk", "post", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.warehouses.root,
  });
};

export const useUpdateWarehouse = (id: string) => {
  return useMutate<IWarehouse>(endpoints.WAREHOUSE + "/" + id, "patch", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.warehouses.root,
  });
};

export const useFetchWarehouseSelector = () => {
  return useFetch<IWarehouseSelectResponse>(endpoints.WAREHOUSE + "/select", {
    queryKey: queryKeys.warehouses.selector(),
  });
};

export const useDeleteWarehouse = () => {
  return useMutate(
    (data: Partial<IWarehouse>) => `${endpoints.WAREHOUSE}/${data.id}`,
    "delete",
    {
      onError: onErrorNotification,
      onSuccess: () => onSuccessNotification("Warehouse Deleted successfully!"),
      queryKey: queryKeys.warehouses.root,
    }
  );
};
