'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { ArrowLeft, Play, Loader2 } from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: string;
}

export default function QueryTestPage() {
  const params = useParams();
  const appId = params.id as string;

  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [selectedDataSource, setSelectedDataSource] = useState('');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM customers LIMIT 10;');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDataSources();
  }, []);

  const fetchDataSources = async () => {
    try {
      const response = await api.get('/datasources');

      const data = response.data;
      if (data.success) {
        setDataSources(data.data);
        if (data.data.length > 0) {
          setSelectedDataSource(data.data[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching data sources:', err);
    }
  };

  const executeQuery = async () => {
    if (!selectedDataSource || !sqlQuery.trim()) {
      setError('Please select a data source and enter a query');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await api.post(`/apps/${appId}/queries/preview`, {
        dataSourceId: selectedDataSource,
        queryType: 'SQL',
        config: {
          query: sqlQuery,
        },
      });

      const data = response.data;

      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.error || 'Failed to execute query');
      }
    } catch (err: any) {
      console.error('Error executing query:', err);
      setError(err.message || 'Failed to execute query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Link href={`/dashboard/apps/${appId}/edit`} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to App Editor
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Query Tester</h1>

        <div className="grid grid-cols-1 gap-6">
          {/* Query Editor */}
          <Card>
            <CardHeader>
              <CardTitle>SQL Query Editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Data Source Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Data Source
                </label>
                <select
                  value={selectedDataSource}
                  onChange={(e) => setSelectedDataSource(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Data Source --</option>
                  {dataSources.map((ds) => (
                    <option key={ds.id} value={ds.id}>
                      {ds.name} ({ds.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* SQL Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SQL Query
                </label>
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Enter your SQL query..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Execute Button */}
              <Button
                variant="primary"
                onClick={executeQuery}
                disabled={loading || !selectedDataSource}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Execute Query
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Query Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results.success ? (
                  <div>
                    <div className="mb-4 text-sm text-gray-600">
                      {Array.isArray(results.data) ? `${results.data.length} rows returned` : 'Query executed successfully'}
                    </div>
                    <div className="overflow-x-auto">
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96 text-xs">
                        {JSON.stringify(results.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {results.error || 'Query failed'}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Sample Queries */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">List all customers:</div>
                  <button
                    onClick={() => setSqlQuery('SELECT * FROM customers LIMIT 10;')}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded font-mono text-left w-full"
                  >
                    SELECT * FROM customers LIMIT 10;
                  </button>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Top products by price:</div>
                  <button
                    onClick={() => setSqlQuery('SELECT * FROM products ORDER BY price DESC LIMIT 5;')}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded font-mono text-left w-full"
                  >
                    SELECT * FROM products ORDER BY price DESC LIMIT 5;
                  </button>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Recent orders with customer info:</div>
                  <button
                    onClick={() => setSqlQuery(`SELECT o.order_number, c.first_name || ' ' || c.last_name AS customer, o.total_amount, o.status\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nORDER BY o.order_date DESC\nLIMIT 10;`)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded font-mono text-left w-full"
                  >
                    SELECT o.order_number, c.first_name || ' ' || c.last_name AS customer, ...
                  </button>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Sales by category:</div>
                  <button
                    onClick={() => setSqlQuery(`SELECT category, COUNT(*) as product_count, SUM(price * stock_quantity) as total_value\nFROM products\nGROUP BY category\nORDER BY total_value DESC;`)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded font-mono text-left w-full"
                  >
                    SELECT category, COUNT(*) as product_count, ...
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
