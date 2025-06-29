"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { DataTable } from "@/components/ui/shadcn/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import { Label } from "@/components/ui/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { Badge } from "@/components/ui/shadcn/badge";
import { PlusIcon, SearchIcon, RefreshCw, ImportIcon, ArrowUpDown } from "lucide-react";
import Link from 'next/link';

interface Order {
  id: string;
  customer: string;
  products: string;
  total: number;
  status: string;
  date: string;
}

export default function Orders() {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    dateRange: ''
  });

  const columns = [
    { accessorKey: 'id', header: 'Mã đơn hàng' },
    { accessorKey: 'customer', header: 'Khách hàng' },
    { accessorKey: 'products', header: 'Sản phẩm' },
    { accessorKey: 'total', header: 'Tổng tiền' },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }: { row: any }) => {
        const status = row.getValue('status');
        return (
          <Badge
            variant={status === 'delivered' ? 'default' : status === 'processing' ? 'secondary' : 'outline'}
          >
            {status === 'delivered' ? 'Đã giao' : status === 'processing' ? 'Đang xử lý' : 'Chờ xử lý'}
          </Badge>
        );
      },
    },
    { 
      accessorKey: 'date', 
      header: 'Ngày tạo',
      cell: ({ row }: { row: any }) => new Date(row.getValue('date')).toLocaleDateString()
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

  const handleEdit = (order: Order) => {
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    // Implement delete logic
  };

  const handleViewDetails = (order: Order) => {
    // Implement view details logic
  };

  const handleRefresh = () => {
    // Implement refresh logic
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Danh sách đơn hàng</CardTitle>
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
            <Button onClick={handleAdd}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Thêm đơn hàng
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
                  <SelectItem value="delivered">Đã giao</SelectItem>
                  <SelectItem value="processing">Đang xử lý</SelectItem>
                  <SelectItem value="pending">Chờ xử lý</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-64">
              <Label>Lọc theo thời gian</Label>
              <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hôm nay</SelectItem>
                  <SelectItem value="week">Tuần này</SelectItem>
                  <SelectItem value="month">Tháng này</SelectItem>
                  <SelectItem value="year">Năm nay</SelectItem>
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

      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm đơn hàng mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Khách hàng</Label>
                <Input id="customer" placeholder="Chọn khách hàng" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="products">Sản phẩm</Label>
                <Input id="products" placeholder="Chọn sản phẩm" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="total">Tổng tiền</Label>
                <Input id="total" type="number" placeholder="Nhập tổng tiền" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delivered">Đã giao</SelectItem>
                    <SelectItem value="processing">Đang xử lý</SelectItem>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="outline" asChild>
                <Link href="/orders/new-order">Edit Full Form</Link>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Hủy</Button>
                <Button>Lưu</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
