import { Label } from '@/components/ui/shadcn/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select';
import { FilterParams } from '@/types/table';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
  width?: string;
}

interface DataTableFiltersProps {
  filters: FilterParams;
  filterConfigs: FilterConfig[];
  onFilterChange: (key: string, value: string) => void;
}

export const DataTableFilters = ({
  filters,
  filterConfigs,
  onFilterChange,
}: DataTableFiltersProps) => {
  return (
    <div className="flex gap-4 mb-4">
      {filterConfigs.map((config) => (
        <div key={config.key} className={config.width || 'w-64'}>
          <Label>{config.label}</Label>
          <Select
            value={filters[config.key] || ''}
            onValueChange={(value) => onFilterChange(config.key, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Chọn ${config.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {config.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
};