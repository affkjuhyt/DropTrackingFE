import { useQuery as useReactQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { handleApiError } from '@/lib/axios';

type QueryOptions<TData, TParams = void> = Omit<
  UseQueryOptions<TData, AxiosError, TData, readonly unknown[]>,
  'queryKey' | 'queryFn'
> & {
  queryFn: (params?: TParams) => Promise<TData>;
  queryKey: readonly unknown[];
};

export const useQuery = <TData, TParams = void>(
  options: QueryOptions<TData, TParams>
) => {
  const { queryKey, queryFn, ...restOptions } = options;

  return useReactQuery<TData, AxiosError>({
    queryKey,
    queryFn: () => queryFn(),
    ...restOptions
  });
};
