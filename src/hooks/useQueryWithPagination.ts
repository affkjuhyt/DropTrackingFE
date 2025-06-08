import { useQuery } from '@tanstack/react-query';
import { TableParams, TableData } from '@/types/table';
import apiClient from '@/lib/axios';

interface UseQueryWithPaginationProps<T> {
  queryKey: string;
  endpoint: string;
  params: TableParams;
  options?: {
    staleTime?: number;
    enabled?: boolean;
    keepPreviousData?: boolean;
  };
}

export const useQueryWithPagination = <T>({ 
  queryKey,
  endpoint,
  params,
  options = {}
}: UseQueryWithPaginationProps<T>) => {
  const { 
    staleTime = 5000,
    enabled = true,
    keepPreviousData = true
  } = options;

  return useQuery<TableData<T>>({ 
    queryKey: [queryKey, params],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        size: params.size.toString(),
        sort_by: params.sort_by,
        sort_order: params.sort_order,
        ...Object.entries(params.filters).reduce((acc, [key, value]) => {
          if (value) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, string>)
      });

      const response = await apiClient.get(`${endpoint}?${queryParams.toString()}`);
      return response.data;
    },
    staleTime,
    enabled,
  });
};