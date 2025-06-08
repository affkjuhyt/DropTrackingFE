import { TableParams } from '@/types/table';

export const createQueryString = (params: TableParams): string => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
    sort_by: params.sort_by,
    sort_order: params.sort_order,
  });

  // Add filters to query string
  Object.entries(params.filters).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });

  return queryParams.toString();
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const calculatePageCount = (total: number, pageSize: number): number => {
  return total ? Math.ceil(total / pageSize) : 1;
};

export const PAGE_SIZES = [10, 20, 50, 100];

export const SORT_ORDERS = [
  { value: 'asc', label: 'Tăng dần' },
  { value: 'desc', label: 'Giảm dần' },
];