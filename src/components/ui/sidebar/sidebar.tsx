import Link from 'next/link';
import { Button } from '@/components/ui/shadcn/button';
import { LayoutDashboard, ShoppingCart, BarChart3, ShoppingBagIcon, User2Icon, Warehouse, ChevronLeft, ChevronRight, Settings, WalletMinimal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/shadcn/accordion';
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

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
};

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
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
      {/* Main Navigation */}
      <div className="flex-1 flex flex-col px-2">
        <div className="flex-1 space-y-2">
          <NavItem
            href="/"
            icon={LayoutDashboard}
            label="Dashboard"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={ShoppingBagIcon}
            label="Buying"
            isCollapsed={isCollapsed}
            subItems={[
              { href: '/buying/purchase-orders', label: 'Purchase Orders' },
              { href: '/buying/purchase-invoices', label: 'Purchase Invoices' },
              { href: '/buying/suppliers', label: 'Suppliers' },
              { href: '/buying/contacts', label: 'Contacts' },
            ]}
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
              { href: '/stocks/shipments', label: 'Shipments' },
            ]}
          />
          <NavItem
            href="/users"
            icon={User2Icon}
            label="Users"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={WalletMinimal}
            label="Accounting"
            isCollapsed={isCollapsed}
            subItems={[
              { href: '/accounting/shipping-rule', label: 'Shipping Rule' },
              { href: '/accounting/tax', label: 'Tax' },
              { href: '/accounting/settings', label: 'Account Setting' },
              { href: '/accounting/financial-statement', label: 'Financial Statement' },
            ]}
          />
          <NavItem
            href="/analytics"
            icon={BarChart3}
            label="Analytics"
            isCollapsed={isCollapsed}
          />
        </div>
        {/* Footer Navigation */}
        <div className="pt-2 border-t border-gray-200">
          <NavItem
            icon={Settings}
            label="Settings"
            isCollapsed={isCollapsed}
            subItems={[
              { href: '/settings/general', label: 'General' },
              { href: '/settings/security', label: 'Security' },
              { href: '/settings/notifications', label: 'Notifications' },
              { href: '/settings/integrations', label: 'Integrations' },
              { href: '/settings/billing', label: 'Billing' },
            ]}
          />
        </div>
      </div>
    </nav>
  );
}