import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { PlusCircle, Search, RefreshCw } from 'lucide-react';

interface DataTableHeaderProps {
  title: string;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  onAdd?: () => void;
  addButtonText?: string;
}

export const DataTableHeader = ({
  title,
  searchPlaceholder = 'Tìm kiếm...',
  searchValue,
  onSearchChange,
  onRefresh,
  onAdd,
  addButtonText = 'Thêm mới',
}: DataTableHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        {onAdd && (
          <Button onClick={onAdd}>
            <PlusCircle className="h-4 w-4 mr-2" />
            {addButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};