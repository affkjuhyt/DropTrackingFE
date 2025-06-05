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

interface DataTableProps<TData> {
  columns: {
    accessorKey?: string;
    id?: string;
    header?: string | React.ReactNode | ((props: any) => React.ReactNode);
    cell?: ({ row }: { row: any }) => React.ReactNode;
  }[];
  data: TData[];
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function DataTable<TData>({ 
  columns, 
  data,
  pageCount,
  currentPage,
  onPageChange,
}: DataTableProps<TData>) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id || column.accessorKey}>
                {typeof column.header === 'function'
                  ? column.header({ column })
                  : column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id || column.accessorKey}>
                  {column.cell
                    ? column.cell({ row })
                    : column.accessorKey
                    ? (row as any)[column.accessorKey]
                    : null}
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