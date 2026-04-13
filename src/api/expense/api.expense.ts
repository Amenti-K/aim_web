import { useMutate, useFetch, useInfiniteFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";

export interface IExpense {
  id: string;
  amount: number;
  description?: string;
  date: string;
  accountId: string;
  account?: any;
  category?: string;
  createdAt: string;
}

export interface INewExpense {
  amount: number;
  description?: string;
  date: string;
  accountId: string;
  category?: string;
}

export interface IExpenseResponse {
  data: IExpense[];
}

const onErrorNotification = (error: any) => {
  toast.error(error.response?.data?.message || error.response?.data?.msg || "An error occurred");
};

const onSuccessNotification = (data: any) => {
  toast.success(data?.message || data?.msg || "Success!");
};

export const useGetExpensesInfinite = (
  filterOptions?: Record<string, any>,
  enabled?: boolean
) => {
  const { search, ...filter } = filterOptions ?? { search: undefined };
  const queryParams = {
    ...(filter ? { ...filter } : {}),
    ...(search ? { search } : {}),
  };

  return useInfiniteFetch<IExpenseResponse>(endpoints.EXPENSE, {
    queryKey: queryKeys.expenses.list(queryParams),
    params: { ...queryParams, limit: 10 },
    enabled: enabled ?? true,
  });
};

export const useCreateExpense = () => {
  return useMutate<INewExpense>(endpoints.EXPENSE, "post", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.expenses.root,
  });
};

export const useFetchExpenseById = (id: string, enabled?: boolean) => {
  return useFetch<{ data: IExpense }>(`${endpoints.EXPENSE}/${id}`, {
    queryKey: queryKeys.expenses.detail(id),
    enabled: enabled ?? !!id,
  });
};

export const useUpdateExpense = (id: string) => {
  return useMutate<Partial<INewExpense>>(`${endpoints.EXPENSE}/${id}`, "patch", {
    onError: onErrorNotification,
    onSuccess: onSuccessNotification,
    queryKey: queryKeys.expenses.root,
  });
};

export const useDeleteExpense = () => {
  return useMutate(
    (data: { id: string }) => `${endpoints.EXPENSE}/${data.id}`,
    "delete",
    {
      onError: onErrorNotification,
      onSuccess: () => toast.success("Expense deleted successfully!"),
      queryKey: queryKeys.expenses.root,
    }
  );
};
