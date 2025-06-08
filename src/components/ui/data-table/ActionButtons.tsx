import { Button } from '@/components/ui/shadcn/button';
import { Pencil, Eye, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  editTitle?: string;
  viewTitle?: string;
  deleteTitle?: string;
  hideEdit?: boolean;
  hideView?: boolean;
  hideDelete?: boolean;
}

export const ActionButtons = ({
  onEdit,
  onView,
  onDelete,
  editTitle = 'Sửa',
  viewTitle = 'Chi tiết',
  deleteTitle = 'Xóa',
  hideEdit = false,
  hideView = false,
  hideDelete = false,
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      {!hideEdit && onEdit && (
        <Button variant="ghost" size="icon" onClick={onEdit} title={editTitle}>
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      {!hideView && onView && (
        <Button variant="ghost" size="icon" onClick={onView} title={viewTitle}>
          <Eye className="h-4 w-4" />
        </Button>
      )}
      {!hideDelete && onDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-destructive"
          title={deleteTitle}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};