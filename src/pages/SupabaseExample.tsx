import React, { useState } from 'react';
import DataFetcher from '../components/DataFetcher';

export default function SupabaseExample() {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState('*');
  const [showData, setShowData] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowData(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Supabase Data Fetcher</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tableName" className="block text-sm font-medium text-gray-700 mb-2">
              Table Name
            </label>
            <input
              type="text"
              id="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter table name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="columns" className="block text-sm font-medium text-gray-700 mb-2">
              Columns (comma-separated, leave '*' for all columns)
            </label>
            <input
              type="text"
              id="columns"
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="*"
            />
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Fetch Data
          </button>
        </form>
      </div>
      
      {showData && tableName && (
        <DataFetcher tableName={tableName} columns={columns} />
      )}
    </div>
  );
}