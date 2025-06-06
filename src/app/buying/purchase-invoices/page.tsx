"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { Button } from "@/components/ui/shadcn/button";
import { PlusIcon, SearchIcon, RefreshCw, ImportIcon, ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/ui/shadcn/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import Link from 'next/link';

interface PurchaseInvoice {
  id: string;
  invoiceNumber: string;
  supplier: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const PurchaseInvoices = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: ''
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const columns = [
    { 
      accessorKey: 'invoiceNumber',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('invoiceNumber')}>
          Số hóa đơn
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    { accessorKey: 'supplier', header: 'Nhà cung cấp' },
    {
      accessorKey: 'totalAmount',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('totalAmount')}>
          Tổng tiền
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: { getValue: (key: string) => number } }) => 
        formatCurrency(row.getValue("totalAmount")),
    },
    {
      accessorKey: 'status',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('status')}>
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'paymentStatus',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('paymentStatus')}>
          Trạng thái thanh toán
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => handleSort('createdAt')}>
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => 
        formatDate(row.getValue("createdAt")),
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

  const handleSort = (key: string) => {
    // Implement sort logic
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleEdit = (invoice: PurchaseInvoice) => {
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    // Implement delete logic
  };

  const handleViewDetails = (invoice: PurchaseInvoice) => {
    // Implement view details logic
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
          <CardTitle>Danh sách hóa đơn mua hàng</CardTitle>
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
              Thêm hóa đơn
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
                  <SelectItem value="draft">Nháp</SelectItem>
                  <SelectItem value="pending">Chờ xử lý</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-64">
              <Label>Lọc theo trạng thái thanh toán</Label>
              <Select value={filters.paymentStatus} onValueChange={(value) => setFilters(prev => ({ ...prev, paymentStatus: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái thanh toán" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unpaid">Chưa thanh toán</SelectItem>
                  <SelectItem value="partial">Thanh toán một phần</SelectItem>
                  <SelectItem value="paid">Đã thanh toán</SelectItem>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm hóa đơn mua hàng mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Số hóa đơn</Label>
                <Input id="invoiceNumber" placeholder="Nhập số hóa đơn" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supplier">Nhà cung cấp</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhà cung cấp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier1">Nhà cung cấp 1</SelectItem>
                    <SelectItem value="supplier2">Nhà cung cấp 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalAmount">Tổng tiền</Label>
                <Input id="totalAmount" type="number" placeholder="Nhập tổng tiền" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Nháp</SelectItem>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Trạng thái thanh toán</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái thanh toán" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unpaid">Chưa thanh toán</SelectItem>
                    <SelectItem value="partial">Thanh toán một phần</SelectItem>
                    <SelectItem value="paid">Đã thanh toán</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="outline" asChild>
                <Link href="/purchase-invoices/new-invoice">Chỉnh sửa form đầy đủ</Link>
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
};

export default PurchaseInvoices;
