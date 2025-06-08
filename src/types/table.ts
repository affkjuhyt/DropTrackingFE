export interface PaginationParams {
  page: number;
  size: number;
}

export interface SortingParams {
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  [key: string]: string | undefined;
}

export interface TableParams extends PaginationParams, SortingParams {
  filters: FilterParams;
}

export interface TableData<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
}