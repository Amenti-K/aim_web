import { useFetch, useMutate } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import {
  IPaginatedResponse,
  IResponse,
} from "@/components/interface/common.interface";
import {
  ICompany,
  ICompanyList,
} from "@/components/interface/company/company.interface";

export const useFetchCompanies = (
  page: number = 1,
  limit: number = 10,
  name?: string,
  ownerPhone?: string,
) => {
  const url = `${endpoints.COMPANY}?page=${page}&limit=${limit}${
    name ? `&name=${name}` : ""
  }${ownerPhone ? `&ownerPhone=${ownerPhone}` : ""}`;
  return useFetch<IPaginatedResponse<ICompanyList>>(url, {
    queryKey: ["companies"],
  });
};

export const useFetchCompany = (id: string) => {
  return useFetch<IResponse<ICompany>>(endpoints.COMPANY + `/${id}`, {
    queryKey: ["company", id],
  });
};

export const useAttachCashAccount = () => {
  return useMutate<JSON>(endpoints.ADMIN + "/accounts", "patch", {
    queryKey: ["accounts"],
  });
};
