'use client';

import { Card, CardContent } from '@/components/ui/shadcn/card';
import { DataTable } from '@/components/ui/shadcn/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/shadcn/dialog';
import { Badge } from '@/components/ui/shadcn/badge';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { queryClient } from '@/lib/react-query';
import apiClient from '@/lib/axios';

// Custom components
import { DataTableHeader } from '@/components/ui/data-table/DataTableHeader';
import { DataTableFilters, FilterConfig } from '@/components/ui/data-table/DataTableFilters';
import { ActionButtons } from '@/components/ui/data-table/ActionButtons';
import { ExpandableSection } from '@/components/ui/common/ExpandableSection';

// Hooks
import { useDataTable } from '@/hooks/useDataTable';
import { useQueryWithPagination } from '@/hooks/useQueryWithPagination';

// Types
import { Customer, CreateCustomerDTO } from '@/types/customer';

// Utils
import { formatDate } from '@/utils/table';
import { useState } from 'react';
import { Label } from '@/components/ui/shadcn/label';
import { Input } from '@/components/ui/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/shadcn/select';
import { Button } from '@/components/ui/shadcn/button';

const CUSTOMER_TYPE_OPTIONS = [
  { value: 'company', label: 'Company' },
  { value: 'individual', label: 'Individual' },
  { value: 'partnership', label: 'Partnership' },
];

const FILTER_CONFIGS: FilterConfig[] = [
  {
    key: 'customerType',
    label: 'Loại khách hàng',
    options: CUSTOMER_TYPE_OPTIONS,
  },
];

const Customers = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<CreateCustomerDTO>({
    customerName: '',
    customerType: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const {
    currentPage,
    pageSize,
    sortBy,
    sortOrder,
    filters,
    handlePageChange,
    handleSorting,
    handleSearch,
    handleFilterChange,
    getQueryParams,
  } = useDataTable();

  const columns: ColumnDef<Customer, any>[] = [
    { 
      accessorKey: 'customerName', 
      header: 'Tên khách hàng',
      enableSorting: true
    },
    { 
      accessorKey: 'email', 
      header: 'Email',
      enableSorting: true
    },
    { 
      accessorKey: 'phone', 
      header: 'Số điện thoại',
      enableSorting: true
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }) => (
        <div className="flex gap-1">
          {row.original?.tags?.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      enableSorting: true,
      cell: ({ row }) => (
        <Badge variant={row.original?.status === 'active' ? 'default' : 'secondary'}>
          {row.original?.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </Badge>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Ngày tạo',
      enableSorting: true,
      cell: ({ row }) => formatDate(row.original?.createdAt),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <ActionButtons
          onEdit={() => handleEdit(row.original)}
          onView={() => handleViewDetails(row.original)}
          onDelete={() => handleDelete(row.original.id)}
        />
      ),
    },
  ];

  const handleEdit = (customer: Customer) => {
    // Implement edit logic
  };

  const handleViewDetails = (customer: Customer) => {
    // Implement view details logic
  };

  const handleDelete = (id: string) => {
    // Implement delete logic
  };

  const {
    data: customers,
    isLoading,
    error,
  } = useQueryWithPagination<Customer>({
    queryKey: 'customers',
    endpoint: '/customers',
    params: getQueryParams(),
  });

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['customers'] });
    await queryClient.refetchQueries({ queryKey: ['customers'] });
  };

  const createCustomerMutation = useMutation({
    mutationFn: async (data: CreateCustomerDTO) => {
      const response = await apiClient.post('/customers', data);
      return response.data;
    },
    onSuccess: async () => {
      toast.success('Tạo khách hàng thành công');
      setIsAdding(false);
      setFormData({
        customerName: '',
        customerType: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      });
      await handleRefresh();
    },
    onError: error => {
      toast.error('Có lỗi xảy ra khi tạo khách hàng');
      console.error('Error creating customer:', error);
    },
  });

  const handleInputChange = (field: keyof CreateCustomerDTO, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerType) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    createCustomerMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <DataTableHeader
            title="Danh sách khách hàng"
            searchValue={filters.search || ''}
            onSearchChange={handleSearch}
            onRefresh={handleRefresh}
            onAdd={() => setIsAdding(true)}
            addButtonText="Thêm khách hàng"
          />

          <DataTableFilters
            filters={filters}
            filterConfigs={FILTER_CONFIGS}
            onFilterChange={handleFilterChange}
          />

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">Có lỗi xảy ra khi tải dữ liệu</div>
          ) : (
            <DataTable
              columns={columns}
              data={customers?.items || []}
              pageCount={customers?.total_pages || 1}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSorting}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm khách hàng mới</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="customerName"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Tên khách hàng
                </Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={e => handleInputChange('customerName', e.target.value)}
                  placeholder="Nhập tên khách hàng"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="customerType"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Loại khách hàng
                </Label>
                <Select
                  value={formData.customerType}
                  onValueChange={value => handleInputChange('customerType', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại khách hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    {CUSTOMER_TYPE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ExpandableSection title="Thông tin liên hệ">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection title="Địa chỉ">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Địa chỉ 1</Label>
                  <Input
                    id="addressLine1"
                    value={formData.addressLine1}
                    onChange={e => handleInputChange('addressLine1', e.target.value)}
                    placeholder="Nhập địa chỉ 1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Địa chỉ 2</Label>
                  <Input
                    id="addressLine2"
                    value={formData.addressLine2}
                    onChange={e => handleInputChange('addressLine2', e.target.value)}
                    placeholder="Nhập địa chỉ 2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Thành phố</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={e => handleInputChange('city', e.target.value)}
                    placeholder="Nhập thành phố"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Tỉnh/Thành phố</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={e => handleInputChange('state', e.target.value)}
                    placeholder="Nhập tỉnh/thành phố"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Mã bưu chính</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={e => handleInputChange('zipCode', e.target.value)}
                    placeholder="Nhập mã bưu chính"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Quốc gia</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={e => handleInputChange('country', e.target.value)}
                    placeholder="Nhập quốc gia"
                  />
                </div>
              </div>
            </ExpandableSection>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={createCustomerMutation.isPending}>
                {createCustomerMutation.isPending ? 'Đang xử lý...' : 'Lưu'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
