import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LayoutDashboard, Package, ShoppingCart, BarChart3, Search, Bell, User } from 'lucide-react';

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Vertical Sidebar */}
      <nav className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <span className="text-xl font-bold">Dropship Tracker</span>
        </div>
        <div className="flex-1 px-4 space-y-2">
          <Link href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/products" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <Package className="h-5 w-5" />
            <span>Products</span>
          </Link>
          <Link href="/orders" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <ShoppingCart className="h-5 w-5" />
            <span>Orders</span>
          </Link>
          <Link href="/analytics" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-8">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="relative p-2">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Button variant="outline" size="sm" className="p-2">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}