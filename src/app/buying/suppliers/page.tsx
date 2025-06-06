"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { Button } from "@/components/ui/shadcn/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import { PlusIcon, SearchIcon, RefreshCcw } from "lucide-react";
import { DataTable } from "@/components/ui/shadcn/data-table";
import { useRouter } from 'next/navigation';

interface Supplier {
  id: string;
  supplierName: string;
  supplierGroup: string;
  priceList: string;
  role: string;
  allowance: number;
}

const Suppliers = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    supplierGroup: '',
    role: ''
  });

  const columns = [
    { accessorKey: 'supplierName', header: 'Tên nhà cung cấp' },
    { accessorKey: 'supplierGroup', header: 'Nhóm nhà cung cấp' },
    { accessorKey: 'priceList', header: 'Bảng giá' },
    { accessorKey: 'role', header: 'Vai trò' },
    { accessorKey: 'allowance', header: 'Chiết khấu (%)' },
    {
      id: 'actions',
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(row.original)}>Sửa</Button>
          <Button variant="outline" size="sm" onClick={() => handleViewDetails(row.original.id)}>Chi tiết</Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setIsDialogOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    // Implement edit logic
  };

  const handleViewDetails = (id: string) => {
    router.push(`/suppliers/${id}`);
  };

  const handleDelete = (id: string) => {
    // Implement delete logic
  };

  const handleRefresh = () => {
    // Implement refresh logic
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Danh sách nhà cung cấp</CardTitle>
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
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAdd}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Thêm nhà cung cấp
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="w-64">
              <Label>Lọc theo nhóm</Label>
              <Select value={filters.supplierGroup} onValueChange={(value) => setFilters(prev => ({ ...prev, supplierGroup: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhóm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group1">Nhóm 1</SelectItem>
                  <SelectItem value="group2">Nhóm 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-64">
              <Label>Lọc theo vai trò</Label>
              <Select value={filters.role} onValueChange={(value) => setFilters(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                  <SelectItem value="manager">Quản lý</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={[]}
            pageCount={10}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Thêm nhà cung cấp mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplierName">Tên nhà cung cấp</Label>
                <Input id="supplierName" placeholder="Nhập tên nhà cung cấp" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supplierGroup">Nhóm nhà cung cấp</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhóm nhà cung cấp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group1">Nhóm 1</SelectItem>
                    <SelectItem value="group2">Nhóm 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceList">Bảng giá mặc định</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bảng giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="list1">Bảng giá 1</SelectItem>
                    <SelectItem value="list2">Bảng giá 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Vai trò được phép ghi đè</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Quản trị viên</SelectItem>
                    <SelectItem value="manager">Quản lý</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowance">Chiết khấu đơn hàng (%)</Label>
                <Input id="allowance" type="number" placeholder="Nhập phần trăm chiết khấu" />
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.push('/suppliers/new-supplier')}>
                Chỉnh sửa form đầy đủ
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
                <Button>Lưu</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Suppliers;
