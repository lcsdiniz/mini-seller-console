import { useState, useMemo, type JSX } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type { TableHeader } from "@/types";

interface TableProps<T> {
  headers: TableHeader[];
  data: T[];
  pageSize?: number;
  clickableRows?: boolean;
  onRowClick?: (rowData: T) => void;
  renderRow?: (rowData: T) => JSX.Element;
}

export function Table<T>({
  headers,
  data,
  pageSize = 10,
  clickableRows,
  onRowClick,
  renderRow,
}: Readonly<TableProps<T>>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  return (
    <div>
      <table className="w-full border-collapse rounded-md shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
            {headers.map((header) => (
              <th key={header.key} className={`px-4 py-2 capitalize ${header.hidden}`}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-4 text-gray-500 dark:text-gray-400">
                No data available.
              </td>
            </tr>
          ) : (
            paginatedData.map((row, idx) =>
              renderRow ? (
                renderRow(row)
              ) : (
                <tr
                  key={(row as any).id ?? idx}
                  className={`border-b border-gray-200 dark:border-gray-600 ${
                    clickableRows ? "hover:bg-white dark:hover:bg-gray-800 cursor-pointer" : ""
                  }`}
                  onClick={() => clickableRows && onRowClick?.(row)}
                >
                  {headers.map((header) => (
                    <td key={header.key} className="px-4 py-2">{(row as any)[header.key]}</td>
                  ))}
                </tr>
              )
            )
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-2 text-gray-200 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-3 bg-gray-700 rounded-md disabled:opacity-50 cursor-pointer hover:bg-gray-600 transition disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="h-5 w-5 transform rotate-180" />
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-3 bg-gray-700 rounded-md disabled:opacity-50 cursor-pointer hover:bg-gray-600 transition disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-5 w-5 transform rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
}
