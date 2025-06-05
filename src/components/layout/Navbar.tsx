import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LayoutDashboard, ShoppingCart, BarChart3, Search, Bell, User, LogOut, Calendar, Inbox, CalendarCheck2, ShoppingBagIcon, User2Icon, Warehouse, Container, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '@/lib/utils';

type NavItemProps = {
  href?: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  subItems?: Array<{ href: string; label: string }>;
};

const NavItem = ({ href, icon: Icon, label, isCollapsed, subItems }: NavItemProps) => {
  if (subItems) {
    return isCollapsed ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center w-full px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <Icon className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right" className="w-48">
          {subItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="flex items-center space-x-3">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={label.toLowerCase()} className="border-none">
          <AccordionTrigger className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 [&[data-state=open]]:bg-gray-100">
            <div className="flex items-center space-x-3">
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-0">
            <div className="space-y-1">
              {subItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Link
      href={href || '/'}
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100",
        isCollapsed && "justify-center px-2"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Vertical Sidebar */}
      <nav className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className={cn(
          "p-6 flex items-center",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && <span className="text-xl font-bold">Dropship Tracker</span>}
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-1 px-2 space-y-2">
        <NavItem
          href="/"
          icon={LayoutDashboard}
          label="Dashboard"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/buying"
          icon={ShoppingBagIcon}
          label="Buying"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={ShoppingCart}
          label="Selling"
          isCollapsed={isCollapsed}
          subItems={[
            { href: '/selling/customers', label: 'Customers' },
            { href: '/selling/orders', label: 'Orders' },
            { href: '/selling/invoices', label: 'Invoices' },
            { href: '/selling/sales-partners', label: 'Sales Partners' },
            { href: '/selling/sales-persons', label: 'Sales Persons' },
          ]}
        />
        <NavItem
          icon={Warehouse}
          label="Stock"
          isCollapsed={isCollapsed}
          subItems={[
            { href: '/stocks/products', label: 'Products' },
            { href: '/stocks/categories', label: 'Categories' },
          ]}
        />
        <NavItem
          href="/shipping"
          icon={Container}
          label="Shipping"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/users"
          icon={User2Icon}
          label="Users"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/analytics"
          icon={BarChart3}
          label="Analytics"
          isCollapsed={isCollapsed}
        />
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="relative p-2">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">3</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-4">
                <div className="text-lg font-medium mb-2">Notifications</div>
                <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Your call has been confirmed</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                      <Inbox className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">You have a new message</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">1 minute ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                      <CalendarCheck2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Your subscription is expiring soon</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="p-2">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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