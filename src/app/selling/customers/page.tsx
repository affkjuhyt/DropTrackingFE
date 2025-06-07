'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { Button } from "@/components/ui/shadcn/button";
import { PlusCircle, Search, RefreshCw } from "lucide-react";
import { DataTable } from "@/components/ui/shadcn/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import { Badge } from "@/components/ui/shadcn/badge";
import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { toast } from 'sonner';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  status: "active" | "inactive";
  createdAt: string;
}

interface CreateCustomerDTO {
  customerName: string;
  customerType: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

const Customers = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    tags: ''
  });
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);

  const columns = [
    { accessorKey: 'name', header: 'Tên khách hàng' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Số điện thoại' },
    { 
      accessorKey: 'tags', 
      header: 'Tags',
      cell: ({ row }: { row: any }) => (
        <div className="flex gap-1">
          {row.original.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      )
    },
    { 
      accessorKey: 'status', 
      header: 'Trạng thái',
      cell: ({ row }: { row: any }) => (
        <Badge variant={row.original.status === "active" ? "default" : "secondary"}>
          {row.original.status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      )
    },
    { 
      accessorKey: 'createdAt', 
      header: 'Ngày tạo',
      cell: ({ row }: { row: any }) => new Date(row.original.createdAt).toLocaleDateString()
    },
    {
      id: 'actions',
      cell: ({ row }: { row: any }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(row.original)}>Sửa</Button>
          <Button variant="outline" size="sm" onClick={() => handleViewDetails(row.original)}>Chi tiết</Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleEdit = (customer: Customer) => {
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    // Implement delete logic
  };

  const handleViewDetails = (customer: Customer) => {
    // Implement view details logic
  };

  const handleRefresh = () => {
    // Implement refresh logic
  };

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
    country: ''
  });

  const createCustomerMutation = useMutation({
    mutationFn: async (data: CreateCustomerDTO) => {
      const response = await apiClient.post('/customers', data);
      return response.data;
    },
    onSuccess: () => {
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
        country: ''
      });
      handleRefresh();
    },
    onError: (error) => {
      toast.error('Có lỗi xảy ra khi tạo khách hàng');
      console.error('Error creating customer:', error);
    }
  });

  const handleInputChange = (field: keyof CreateCustomerDTO, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Danh sách khách hàng</CardTitle>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAdd}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Thêm khách hàng
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-4">
            <div className="w-64">
              <Label>Lọc theo trạng thái</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Data Table */}
          <DataTable
            columns={columns}
            data={[]}
            pageCount={10}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm khách hàng mới</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="after:content-['*'] after:ml-0.5 after:text-red-500">Tên khách hàng</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="Nhập tên khách hàng"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerType" className="after:content-['*'] after:ml-0.5 after:text-red-500">Loại khách hàng</Label>
                <Select
                  value={formData.customerType}
                  onValueChange={(value) => handleInputChange('customerType', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại khách hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="space-y-4">
              {/* Primary Contact Details */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-4 text-left"
                  onClick={() => setIsContactExpanded(!isContactExpanded)}
                >
                  <span className="font-medium">Thông tin liên hệ</span>
                  <motion.svg
                    animate={{ rotate: isContactExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {isContactExpanded && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={expandVariants}
                    >
                      <div className="p-4 border-t">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="example@email.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="Nhập số điện thoại"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Primary Address Details */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-4 text-left"
                  onClick={() => setIsAddressExpanded(!isAddressExpanded)}
                >
                  <span className="font-medium">Địa chỉ</span>
                  <motion.svg
                    animate={{ rotate: isAddressExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {isAddressExpanded && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={expandVariants}
                    >
                      <div className="p-4 border-t">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="addressLine1">Địa chỉ 1</Label>
                            <Input
                              id="addressLine1"
                              value={formData.addressLine1}
                              onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                              placeholder="Nhập địa chỉ 1"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="addressLine2">Địa chỉ 2</Label>
                            <Input
                              id="addressLine2"
                              value={formData.addressLine2}
                              onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                              placeholder="Nhập địa chỉ 2"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">Thành phố</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              placeholder="Nhập thành phố"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">Tỉnh/Thành phố</Label>
                            <Input
                              id="state"
                              value={formData.state}
                              onChange={(e) => handleInputChange('state', e.target.value)}
                              placeholder="Nhập tỉnh/thành phố"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">Mã bưu chính</Label>
                            <Input
                              id="zipCode"
                              value={formData.zipCode}
                              onChange={(e) => handleInputChange('zipCode', e.target.value)}
                              placeholder="Nhập mã bưu chính"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Quốc gia</Label>
                            <Input
                              id="country"
                              value={formData.country}
                              onChange={(e) => handleInputChange('country', e.target.value)}
                              placeholder="Nhập quốc gia"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Hủy</Button>
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

const expandVariants = {
  hidden: { 
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  visible: { 
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};
