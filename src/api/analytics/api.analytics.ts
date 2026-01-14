import { useFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { AdminAnalyticsResponse } from "@/components/interface/analytics/interface.analytics";
import { IResponse } from "@/components/interface/common.interface";

export const useGetAnalytics = (options?: { enabled?: boolean }) => {
  return useFetch<IResponse<AdminAnalyticsResponse>>(
    endpoints.ADMIN + "/analytics",
    {
      queryKey: ["analytics"],
      enabled: options?.enabled || true,
    }
  );
};
