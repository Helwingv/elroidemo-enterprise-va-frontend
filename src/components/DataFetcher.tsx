import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface DataFetcherProps {
  tableName: string;
  columns?: string;
}

export default function DataFetcher({ tableName, columns = '*' }: DataFetcherProps) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const { data: fetchedData, error: fetchError } = await supabase
          .from(tableName)
          .select(columns);

        if (fetchError) {
          throw fetchError;
        }

        setData(fetchedData);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [tableName, columns]);

  if (loading) return <div className="p-4 text-center">Loading data...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (!data || data.length === 0) return <div className="p-4 text-center">No data found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Data from {tableName}</h2>
      <div className="bg-white rounded-xl shadow p-4 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="p-2 text-left text-sm font-medium text-gray-600">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-gray-100">
                {Object.values(row).map((value: any, i) => (
                  <td key={i} className="p-2 text-sm">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}