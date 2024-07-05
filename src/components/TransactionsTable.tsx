// src/components/TransactionsTable.tsx
import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { GroupedTransactions, Transaction } from '../utils/transactionHelpers';

type TableData = GroupedTransactions | Transaction;

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
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (sortColumn) {
      return [...data].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [data, sortColumn, sortDirection]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {showHref && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>}
            {headers.map((header) => (
              <th
                key={header as string}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(header)}
              >
                <div className="flex items-center">
                  {header as string}
                  {sortColumn === header && (
                    sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, index) => (
            <tr key={index} className={`${row.className} hover:bg-gray-50`}>
              {showHref && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:text-blue-700">
                  <a href={`#${row.id}`}>#</a>
                </td>
              )}
              {headers.map((header) => {
                const value = row[header];
              if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
                return (
                  <td key={header as string} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCellValue(value)}
                  </td>
                );
              } else {
                return (
                  <td key={header as string} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Unknown type
                  </td>
                );
              }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatCellValue(value: number | string | Date): string {
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return String(value);
}