import { QueryClient } from '@tanstack/react-query';
import { ProductFilters } from '@/services/products';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

type QueryKeyType = ['products', 'list'] | ['products', 'list', ProductFilters] | ['products', 'detail', string];

export const queryKeys = {
  products: {
    all: ['products'] as const,
    list: (filters?: ProductFilters) => ['products', 'list', filters] as QueryKeyType,
    detail: (id: string) => ['products', 'detail', id] as QueryKeyType,
  },
  orders: {
    all: ['orders'] as const,
    list: () => ['orders', 'list'] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
  analytics: {
    all: ['analytics'] as const,
    overview: () => ['analytics', 'overview'] as const,
    sales: (period: string) => ['analytics', 'sales', period] as const,
  },
} as const;
