interface SkeletonTableProps {
  readonly rows?: number;
  readonly headers: readonly string[];
}

export default function SkeletonTable({ rows = 5, headers }: SkeletonTableProps) {
  return (
    <table className="w-full border-collapse rounded-md shadow overflow-hidden">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
          {headers.map((header) => (
            <th key={header} className="px-4 py-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="animate-pulse">
        {Array.from({ length: rows }).map((_, r) => (
          <tr key={r} className="border-b border-gray-200 dark:border-gray-600">
            {headers.map((_, c) => (
              <td key={c} className="px-4 py-4">
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
