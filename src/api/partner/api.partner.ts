import { useMutate, useFetch, useInfiniteFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";

export interface IPartner {
  id: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface BulkPartner {
  partners: Array<Partial<IPartner>>;
}

const onErrorNotification = (error: any) => {
  toast.error(error.response?.data?.message || error.response?.data?.msg || "An error occurred");
};

const onSuccessNotification = (data: any) => {
  toast.success(data?.message || data?.msg || "Success!");
};

export const useCreatePartner = () => {
  return useMutate<any>(endpoints.PARTNER, "post", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.partners.root,
  });
};

export const useCreateManyPartners = () => {
  return useMutate<BulkPartner>(endpoints.PARTNER + "/bulk", "post", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.partners.root,
  });
};

export const useUpdatePartner = (id: string) => {
  return useMutate<any>(endpoints.PARTNER + "/" + id, "patch", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.partners.root,
  });
};

export const useFetchPartnerById = (id: string, enabled?: boolean) => {
  return useFetch<any>(endpoints.PARTNER + "/" + id, {
    queryKey: queryKeys.partners.detail(id),
    enabled: enabled ?? !!id,
  });
};

export const useFetchPartnerSelector = () => {
  return useFetch<any>(endpoints.PARTNER + "/select", {
    queryKey: queryKeys.partners.selector(),
  });
};

export const useDeletePartner = () => {
  return useMutate(
    (data: any) => `${endpoints.PARTNER}/${data.id}`,
    "delete",
    {
      onError: onErrorNotification,
      onSuccess: () => toast.success("Partner Deleted successfully!"),
      queryKey: queryKeys.partners.root,
    }
  );
};

export const useGetPartnersInfinite = (
  filterOptions?: Record<string, any>,
  enabled?: boolean
) => {
  const { search, ...filter } = filterOptions ?? { search: undefined };
  const queryParams = {
    ...(filter ? { ...filter } : {}),
    ...(search ? { search } : {}),
  };

  return useInfiniteFetch<any>(endpoints.PARTNER, {
    queryKey: queryKeys.partners.list(queryParams),
    params: { ...queryParams, limit: 10 },
    enabled: enabled ?? true,
  });
};

