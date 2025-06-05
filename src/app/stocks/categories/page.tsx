"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusIcon, SearchIcon, RefreshCw, ImportIcon, ArrowUpDown } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function Categories() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

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
      id: 'select',
      header: ({ table }: any) => (
        <Checkbox
          checked={table?.getIsAllPageRowsSelected?.() || false}
          onCheckedChange={(value) => table?.toggleAllPageRowsSelected?.(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row?.getIsSelected?.() || false}
          onCheckedChange={(value) => row?.toggleSelected?.(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('name')}>
          Tên danh mục
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Mô tả',
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('createdAt')}>
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: { getValue: (key: string) => any } }) => 
        formatDate(row.getValue("createdAt")),
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('updatedAt')}>
          Ngày cập nhật
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: { getValue: (key: string) => any } }) => 
        formatDate(row.getValue("updatedAt")),
    },
    {
      id: 'actions',
      cell: ({ row }: { row: any }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(row.original)}>Sửa</Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>Xóa</Button>
        </div>
      ),
    },
  ];

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

  const handleDelete = (id: string) => {
    // Implement delete logic
  };

  const handleDeleteSelected = () => {
    // Implement bulk delete logic
  };

  const handleImport = () => {
    // Implement import logic
  };

  const handleRefresh = () => {
    // Implement refresh logic
  };

  return (
    <div className="space-y-6">
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
          {/* Selected Actions */}
          {selectedItems.length > 0 && (
            <div className="mb-4">
              <Button variant="destructive" onClick={handleDeleteSelected}>
                Xóa {selectedItems.length} mục đã chọn
              </Button>
            </div>
          )}

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
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên danh mục</Label>
                <Input id="name" placeholder="Nhập tên danh mục" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Input id="description" placeholder="Nhập mô tả" />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
              <Button>Lưu</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
