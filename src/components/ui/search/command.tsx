'use client';

import { BarChart3, Container, LayoutDashboard, Search, ShoppingBagIcon, ShoppingCart, User2Icon, Warehouse } from "lucide-react";
import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../shadcn/input";

type Route = {
  path: string;
  label: string;
  icon?: React.ElementType;
};

const availableRoutes: Route[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/buying/purchase-orders', label: 'Purchase Orders', icon: ShoppingBagIcon },
  { path: '/buying/purchase-invoices', label: 'Purchase Invoices', icon: ShoppingBagIcon },
  { path: '/buying/suppliers', label: 'Suppliers', icon: ShoppingBagIcon },
  { path: '/buying/contacts', label: 'Contacts', icon: ShoppingBagIcon },
  { path: '/selling/customers', label: 'Customers', icon: ShoppingCart },
  { path: '/selling/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/selling/invoices', label: 'Invoices', icon: ShoppingCart },
  { path: '/selling/sales-partners', label: 'Sales Partners', icon: ShoppingCart },
  { path: '/selling/sales-persons', label: 'Sales Persons', icon: ShoppingCart },
  { path: '/stocks/products', label: 'Products', icon: Warehouse },
  { path: '/stocks/categories', label: 'Categories', icon: Warehouse },
  { path: '/shipping', label: 'Shipping', icon: Container },
  { path: '/users', label: 'Users', icon: User2Icon },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="button"
          placeholder="Tìm kiếm... (⌘ + K)"
          className="pl-10 w-full cursor-pointer"
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Menu"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] max-w-[90vw] max-h-[400px] overflow-y-auto rounded-xl bg-white shadow-2xl border border-gray-200"
      >
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Tìm kiếm trang..."
          className="w-full px-4 py-3 border-b border-gray-200 outline-none"
        />

        <Command.List className="py-2">
          <Command.Empty className="px-4 py-2 text-sm text-gray-500">
            Không tìm thấy kết quả.
          </Command.Empty>

          {availableRoutes.map((route) => (
            <Command.Item
              key={route.path}
              value={route.path}
              onSelect={() => {
                router.push(route.path);
                setOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {route.icon && <route.icon className="h-4 w-4 mr-2" />}
              <span>{route.label}</span>
              <span className="ml-auto text-xs text-gray-400">{route.path}</span>
            </Command.Item>
          ))}
        </Command.List>
      </Command.Dialog>
    </div>
  );
};

export default CommandPalette;
