import { useFetch, useInfiniteFetch } from "@/hooks/query.hook";
import endpoints from "@/lib/endpoints";
import { queryKeys } from "@/lib/queryKeys";

export interface IAudit {
  id: string;
  userId: string;
  user?: any;
  action: string;
  entityType: string;
  entityId: string;
  oldValues?: any;
  newValues?: any;
  createdAt: string;
}

export const useGetAuditLogsInfinite = (
  filterOptions?: Record<string, any>,
  enabled?: boolean
) => {
  const { search, entityType, auditAction, ...filter } = filterOptions ?? {
    search: undefined,
  };
  const queryParams = {
    ...(filter ? { ...filter } : {}),
    ...(search ? { search } : {}),
    ...(entityType ? { entityType } : {}),
    ...(auditAction ? { auditAction } : {}),
  };

  return useInfiniteFetch<any>(endpoints.AUDITLOG, {
    queryKey: queryKeys.auditLogs.list(queryParams),
    params: { ...queryParams, limit: 10 },
    enabled: enabled ?? true,
  });
};

export const useGetEntityLogs = (
  entityId: string,
  entityType: string,
  enabled?: boolean
) => {
  return useFetch<any>(
    `${endpoints.AUDITLOG}/entity/${entityType}/${entityId}`,
    {
      queryKey: queryKeys.auditLogs.detail(entityId),
      enabled: enabled ?? !!entityId,
    }
  );
};
