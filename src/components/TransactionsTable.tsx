// src/components/TransactionsTable.tsx
import { GroupedTransactions } from '../utils/transactionHelpers';

type TableData = GroupedTransactions;

interface TransactionsTableProps<T extends TableData> {
  headers: (keyof T)[];
  data: T[];
  showHref?: boolean;
}

export function TransactionsTable<T extends TableData>({ 
  headers, 
  data, 
  showHref = false 
}: TransactionsTableProps<T>) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          {showHref && <th className="border p-2">#</th>}
          {headers.map((header) => (
            <th key={header as string} className="border p-2">{header as string}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={`${row.className} ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
            {showHref && (
              <td className="border p-2">
                <a href={`#${row.id}`} className="text-blue-500 hover:text-blue-700">#</a>
              </td>
            )}
            {headers.map((header) => {
              const value = row[header];
              if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
                return (
                  <td key={header as string} className="border p-2">
                    {formatCellValue(value)}
                  </td>
                );
              } else {
                return <td key={header as string} className="border p-2">Unknown type</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function formatCellValue(value: number | string | Date): string {
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}