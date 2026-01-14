import { IPlan } from "@/components/interface/subscription/subscription.interface";
import { useFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";

export const useFetchPlans = () => {
  return useFetch<Array<IPlan>>(endpoints.PLAN, {
    queryKey: ["plans"],
  });
};
