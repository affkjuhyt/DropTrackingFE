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
import { PlusIcon, SearchIcon, RefreshCw, ImportIcon, ArrowUpDown, ListFilter } from "lucide-react";
import Link from 'next/link';

interface Invoice {
  id: string;
  customer: string;
  products: string;
  total: number;
  status: string;
  date: string;
}

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
  });

  const handleSort = ({ id }: any) => {

  }

  const handleAddInvoice = () => {

  }

  const handleEdit = ({ id }: any) => {

  }
  

  const handleDelete = ({ id }: any) => {

  }

  const handleRefresh = () => {
    // Implement refresh logic
  };

  const columns = [
    { accessorKey: 'id', header: 'Mã hóa đơn' },
    { accessorKey: 'customer', header: 'Khách hàng' },
    { accessorKey: 'products', header: 'Sản phẩm' },
    {
      accessorKey: 'total',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('total')}>
          Tổng tiền
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }: any) => {
        const status = row.getValue('status');
        return (
          <Badge
            variant={status === 'Paid' ? 'secondary' : status === 'Pending' ? 'outline' : 'default'}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'date',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('date')}>
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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
          <CardTitle>Danh sách hóa đơn</CardTitle>
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
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Thêm hóa đơn
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-4">
            <div className="w-64">
              <Label>Lọc theo trạng thái</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="paid">Đã thanh toán</SelectItem>
                  <SelectItem value="pending">Chưa thanh toán</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-64">
              <Label>Lọc theo ngày</Label>
              <Select value={filters.dateRange} onValueChange={(value) => setFilters({ ...filters, dateRange: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ngày" />
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
            <DialogTitle>Thêm hóa đơn mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Khách hàng</Label>
                <Input id="customer" placeholder="Nhập tên khách hàng" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="products">Sản phẩm</Label>
                <Input id="products" placeholder="Nhập sản phẩm" />
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
                    <SelectItem value="paid">Đã thanh toán</SelectItem>
                    <SelectItem value="pending">Chưa thanh toán</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="outline" asChild>
                <Link href="/invoices/new-invoice">Edit Full Form</Link>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
                <Button>Lưu</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
