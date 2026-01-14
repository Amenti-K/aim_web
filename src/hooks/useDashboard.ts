import { useQuery } from "@tanstack/react-query";
import { DashboardStats } from "@/types";

// Fallback hook that uses mock data when API isn't ready
export const useDashboardStatsMock = () => {
  return useQuery({
    queryKey: ["dashboard-stats-mock"],
    queryFn: async (): Promise<DashboardStats> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        totalCompanies: 156,
        totalUsers: 1243,
        subscriptionBreakdown: {
          active: 98,
          trialing: 32,
          expired: 18,
          canceled: 8,
        },
      };
    },
  });
};
