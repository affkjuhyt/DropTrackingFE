import { Bell, Calendar, CalendarCheck2, Inbox } from "lucide-react";
import { Button } from "../shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../shadcn/dropdown-menu";

export const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative p-2">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            3
          </span>
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
  );
};
