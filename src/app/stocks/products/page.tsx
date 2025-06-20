"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { DataTable } from "@/components/ui/shadcn/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import { Label } from "@/components/ui/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { Badge } from "@/components/ui/shadcn/badge";
import { PlusIcon, SearchIcon, RefreshCw, ImportIcon, ArrowUpDown } from "lucide-react";
import { ProductFilters, useCreateProduct, useProducts } from '@/services/products';
import { toast } from 'sonner';
import { useCategories } from '@/services/categories';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: string;
  category: string;
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [filters, setFilters] = useState<ProductFilters>({
    status: null,
    search: '',
    category: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category_id: '',
    status: 'available'
  });

  const { data: products, isLoading } = useProducts(filters);
  const { data: categories } = useCategories();
  console.log("categories", categories);

  useEffect(() => {
    if (searchTerm) {
      const debounceSearch = setTimeout(() => {
        setFilters(prev => ({ ...prev, search: searchTerm }));
      }, 500);

      return () => clearTimeout(debounceSearch);
    } else {
      setFilters(prev => ({ ...prev, search: '' }));
    }
  }, [searchTerm]);
  const createProductMutation = useCreateProduct();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.sku || !formData.category_id || !formData.status) {
        toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
        return;
      }
      await createProductMutation.mutateAsync(formData);
      toast.success('Tạo sản phẩm thành công');
      setIsAddDialogOpen(false);
      setFormData({
        name: '',
        sku: '',
        category_id: '',
        status: 'available'
      });
    } catch (error) {
      console.error('Failed to create product:', error);
      toast.error('Có lỗi xảy ra khi tạo sản phẩm');
    }
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    // Implement delete logic
  };

  const handleImport = () => {
    // Implement import logic
  };

  const handleRefresh = () => {
    // Implement refresh logic
  };

  const columns = [
    { accessorKey: 'name', header: 'Tên sản phẩm' },
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'category', header: 'Danh mục' },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }: any) => {
        const status = row.getValue('status');
        return (
          <Badge
            variant={status === 'active' ? 'secondary' : status === 'inactive' ? 'outline' : 'default'}
          >
            {status === 'active' ? 'Đang bán' : status === 'inactive' ? 'Ngừng bán' : 'Hết hàng'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }: { row: any }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(row.original)}>Sửa</Button>
          <Button variant="outline" size="sm" onClick={() => handleEdit(row.original)}>Chi tiết</Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button variant="outline" size="icon">
                <SearchIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleImport}>
              <ImportIcon className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button onClick={handleAdd}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Thêm sản phẩm
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-4">
            <div className="w-64">
              <Label>Danh mục</Label>
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>

                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name || cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-64">
              <Label>Trạng thái</Label>
              <Select value={filters.status ?? ''} onValueChange={(value: "all" | "available" | "discontinued" | "out_of_stock") => setFilters(prev => ({ ...prev, status: value }))}>                
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="available">Đang bán</SelectItem>
                  <SelectItem value="discontinued">Ngừng bán</SelectItem>
                  <SelectItem value="out_of_stock">Hết hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Data Table */}
          <DataTable
            columns={columns}
            data={products || []}
            pageCount={10}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm mới</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên sản phẩm</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Danh mục</Label>
              <Select
                value={formData.category_id?.toString() ?? ''}
                onValueChange={(value) => handleInputChange('category_id', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Đang bán</SelectItem>
                  <SelectItem value="discontinued">Ngừng bán</SelectItem>
                  <SelectItem value="out_of_stock">Hết hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleSubmit} disabled={createProductMutation.isPending}>
              {createProductMutation.isPending ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}