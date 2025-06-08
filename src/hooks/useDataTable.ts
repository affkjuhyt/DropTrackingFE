import { useState } from 'react';
import { TableParams, FilterParams } from '@/types/table';

interface UseDataTableProps {
  initialPageSize?: number;
  initialSortBy?: string;
  initialSortOrder?: 'asc' | 'desc';
  initialFilters?: FilterParams;
}

export const useDataTable = ({
  initialPageSize = 10,
  initialSortBy = 'created_at',
  initialSortOrder = 'desc',
  initialFilters = {
    search: '',
    status: '',
  },
}: UseDataTableProps = {}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [filters, setFilters] = useState<FilterParams>(initialFilters);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSorting = (field: string, order: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1); // Reset về trang đầu khi thay đổi sắp xếp
  };

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
    setCurrentPage(1);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const getQueryParams = (): TableParams => ({
    page: currentPage,
    size: pageSize,
    sort_by: sortBy,
    sort_order: sortOrder,
    filters,
  });

  return {
    // State
    currentPage,
    pageSize,
    sortBy,
    sortOrder,
    filters,

    // Handlers
    handlePageChange,
    handleSorting,
    handleSearch,
    handleFilterChange,
    getQueryParams,
  };
};