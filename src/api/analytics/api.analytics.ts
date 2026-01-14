import { useFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";

export const useGetAnalytics = (options?: { enabled?: boolean }) => {
  return useFetch(endpoints.ADMINANALYTICS, {
    queryKey: ["analytics"],
    enabled: options?.enabled || true,
  });
};
