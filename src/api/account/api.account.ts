import { useMutate, useFetch, useInfiniteFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";

export interface IAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
}

const onErrorNotification = (error: any) => {
  toast.error(error.response?.data?.message || error.response?.data?.msg || "An error occurred");
};

const onSuccessNotification = (data: any) => {
  toast.success(data?.message || data?.msg || "Success!");
};

export const useGetSummary = (enabled?: boolean) => {
  return useFetch<any>(`${endpoints.ACCOUNT}/summary`, {
    queryKey: queryKeys.accounts.summary(),
    enabled: enabled ?? true,
  });
};

export const useGetAccount = (id: string, enabled?: boolean) => {
  return useFetch<any>(`${endpoints.ACCOUNT}/${id}`, {
    queryKey: queryKeys.accounts.detail(id),
    enabled: enabled ?? !!id,
  });
};

export const useGetAccountsInfinite = (
  filterOptions?: Record<string, any>,
  enabled?: boolean
) => {
  const { search, ...filter } = filterOptions ?? { search: undefined };
  const queryParams = {
    ...(filter ? { ...filter } : {}),
    ...(search ? { search } : {}),
  };

  return useInfiniteFetch<any>(endpoints.ACCOUNT, {
    queryKey: queryKeys.accounts.list(queryParams),
    params: { ...queryParams, limit: 10 },
    enabled: enabled ?? true,
  });
};

export const useCreateAccount = () => {
  return useMutate<any>(endpoints.ACCOUNT, "post", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.accounts.root,
  });
};

export const useUpdateAccount = () => {
  return useMutate<any>(
    (data: any) => `${endpoints.ACCOUNT}/${data.id}`,
    "patch",
    {
      onError: onErrorNotification,
      onSuccess: onSuccessNotification,
      queryKey: queryKeys.accounts.root,
    }
  );
};

export const useDeleteAccount = () => {
  return useMutate(
    (data: { id: string }) => `${endpoints.ACCOUNT}/${data.id}`,
    "delete",
    {
      onError: onErrorNotification,
      onSuccess: () => toast.success("Account deleted successfully!"),
      queryKey: queryKeys.accounts.root,
    }
  );
};

export const useFetchAccountSelector = () => {
  return useFetch<any>(endpoints.ACCOUNT + "/select", {
    queryKey: queryKeys.accounts.selector(),
  });
};

export const useTransferFunds = () => {
  return useMutate<any>(endpoints.ACCOUNT + "/transfer", "post", {
    onError: onErrorNotification,
    onSuccess: () => toast.success("Funds transferred successfully!"),
    queryKey: queryKeys.accounts.root,
  });
};
