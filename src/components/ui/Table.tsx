import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((data: T) => ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function Table<T extends { id?: string | number }>({ 
  columns, 
  data, 
  onRowClick,
  isLoading = false,
  emptyMessage = 'No data available'
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="min-w-full divide-y divide-gray-200">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-100 rounded"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-50 rounded mt-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="min-w-full text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item, rowIndex) => (
            <tr
              key={item.id || rowIndex}
              onClick={() => onRowClick && onRowClick(item)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
            >
              {columns.map((column, colIndex) => {
                const value = typeof column.accessor === 'function'
                  ? column.accessor(item)
                  : item[column.accessor];

                return (
                  <td
                    key={colIndex}
                    className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${column.className || ''}`}
                  >
                    
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}