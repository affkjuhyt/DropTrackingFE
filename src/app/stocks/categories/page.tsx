"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { DataTable } from "@/components/ui/shadcn/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import { Label } from "@/components/ui/shadcn/label";
import { PlusIcon, SearchIcon, RefreshCw, ImportIcon, ArrowUpDown } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useCategories, useCreateCategory } from '@/services/categories';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function Categories() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const createCategoryMutation = useCreateCategory();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns = [
    {
      accessorKey: 'name',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('name')}>
          Tên danh mục
        </Button>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Mô tả',
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

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent_id: null,
    tax_class_id: null,
  });

  const { data: categories, isLoading } = useCategories();
  console.log("categories", categories);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    // Implement edit logic
  };

  const handleViewDetails = (category: Category) => {
    router.push(`/categories/${category.id}`);
  };

  const handleDelete = (id: string) => {
    // Implement delete logic
  };

  const handleRefresh = () => {
    // Implement refresh logic
  };

  const handleImport = () => {
    // Implement import logic
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    console.log("formData", formData);
    try {
      if (!formData.name || !formData.description) {
        toast.error('Vui lòng điền đày đủ thông tin bắt buộc');
        return;
      }
      await createCategoryMutation.mutateAsync(formData);
      toast.success('Tạo danh mục thành cong');
      setIsAddDialogOpen(false);
      setFormData({
        name: '',
        slug: '',
        description: '',
        parent_id: null,
        tax_class_id: null,
      });
    } catch (error) {
      console.error('Failed to create category:', error);
      toast.error('Có lỗi xảy ra khi tạo danh mục');
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Danh sách danh mục</CardTitle>
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
              Thêm danh mục
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={categories || []}
            pageCount={10}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên danh mục</Label>
                <Input 
                  id="name" 
                  placeholder="Nhập tên danh mục" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Input 
                  id="description"
                  placeholder="Nhập mô tả" 
                  value={formData.description}
                  onChange={(e) => {
                    handleInputChange('description', e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="outline" onClick={() => router.push('/categories/new-category')}>
                Chỉnh sửa form đầy đủ
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
                <Button onClick={handleSubmit} disabled={createCategoryMutation.isPending}>
                  {createCategoryMutation.isPending ? "Dang luu": "Luu"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
