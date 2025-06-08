import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import CommandPalette from '../ui/search/command';
import { ModeToggle } from '../ui/mode-toggle';
import { Notification } from '../ui/notification/notification';
import Sidebar from '../ui/sidebar/sidebar';

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-8">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <CommandPalette />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Notification />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}