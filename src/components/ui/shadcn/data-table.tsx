import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
  ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  sortBy: string;
  sortOrder: string;
  onSortChange: (field: string, order: "desc" | "asc") => void;
}

export function DataTable<TData>({
  columns,
  data,
  pageCount,
  currentPage,
  onPageChange,
  sortBy,
  sortOrder,
  onSortChange,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: sortBy,
      desc: sortOrder === "desc"
    }
  ]);

  React.useEffect(() => {
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      onSortChange(id, desc ? "desc" : "asc");
    }
  }, [sorting, onSortChange]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {table.getFlatHeaders().map((header) => (
              <TableHead
                key={header.id}
                className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className="flex items-center gap-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="text-sm">
          Page {currentPage} of {pageCount}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Next
        </Button>
      </div>
    </div>
  );
}