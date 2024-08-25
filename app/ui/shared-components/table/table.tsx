"use client";

import React from 'react';

interface TableType {
    columns: string[]
    data: Record<string, any>[],
    total?: Record<string, any>
}
export const Table:React.FC<TableType> = ({ columns, data, total }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((column) => (
              <th key={column} className="py-2 px-4 text-left border-b border-gray-200">
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">                
              {columns.map((column) => (
                <td key={column} className="py-2 px-4 border-b border-gray-200">
                  {typeof row[column] === 'function' ? row[column](row) : row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {
          total && 
          <tfoot className="bg-gray-200 text-black">
            <tr>
              {columns.map((column, index) => (
                <td key={column} className="py-2 px-4 border-t border-gray-200 font-bold">                              
                  {total[column]}
                </td>
              ))}
            </tr>
          </tfoot>
        }
      </table>
    </div>
  );
};