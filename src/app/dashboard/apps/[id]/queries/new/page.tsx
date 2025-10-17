'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { ArrowLeft, Play, Save, Loader2 } from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: string;
}

export default function NewQueryPage() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;

  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [testResults, setTestResults] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    dataSourceId: '',
    queryType: 'SQL',
    query: 'SELECT * FROM customers LIMIT 10;',
  });

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
          setFormData(prev => ({ ...prev, dataSourceId: data.data[0].id }));
        }
      }
    } catch (err) {
      console.error('Error fetching data sources:', err);
    }
  };

  const testQuery = async () => {
    if (!formData.dataSourceId || !formData.query.trim()) {
      setError('Please select a data source and enter a query');
      return;
    }

    setTesting(true);
    setError('');
    setTestResults(null);

    try {
      const response = await api.post(`/apps/${appId}/queries/preview`, {
        dataSourceId: formData.dataSourceId,
        queryType: formData.queryType,
        config: {
          query: formData.query,
        },
      });

      const data = response.data;

      if (data.success) {
        setTestResults(data.data);
      } else {
        setError(data.error || 'Failed to execute query');
      }
    } catch (err: any) {
      console.error('Error testing query:', err);
      setError(err.message || 'Failed to test query');
    } finally {
      setTesting(false);
    }
  };

  const saveQuery = async () => {
    if (!formData.name.trim()) {
      setError('Please enter a query name');
      return;
    }

    if (!formData.dataSourceId || !formData.query.trim()) {
      setError('Please select a data source and enter a query');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await api.post(`/apps/${appId}/queries`, {
        name: formData.name,
        dataSourceId: formData.dataSourceId,
        queryType: formData.queryType,
        config: {
          query: formData.query,
        },
      });

      const data = response.data;

      if (data.success) {
        router.push(`/dashboard/apps/${appId}/edit?tab=queries`);
      } else {
        setError(data.error || 'Failed to save query');
      }
    } catch (err: any) {
      console.error('Error saving query:', err);
      setError(err.message || 'Failed to save query');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href={`/dashboard/apps/${appId}/edit?tab=queries`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to App Editor
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">New Query</h1>

        <div className="grid grid-cols-1 gap-6">
          {/* Query Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Query Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Query Name */}
              <Input
                label="Query Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Get All Customers"
                required
              />

              {/* Data Source Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Source
                </label>
                <select
                  value={formData.dataSourceId}
                  onChange={(e) => setFormData({ ...formData, dataSourceId: e.target.value })}
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

              {/* SQL Query */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SQL Query
                </label>
                <textarea
                  value={formData.query}
                  onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                  className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Enter your SQL query..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={testQuery}
                  disabled={testing || !formData.dataSourceId}
                >
                  {testing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Test Query
                    </>
                  )}
                </Button>

                <Button
                  variant="primary"
                  onClick={saveQuery}
                  disabled={saving || !formData.name || !formData.dataSourceId}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Query
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          {testResults && (
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.success ? (
                  <div>
                    <div className="mb-4 text-sm text-gray-600">
                      {Array.isArray(testResults.data)
                        ? `${testResults.data.length} rows returned`
                        : 'Query executed successfully'}
                      {testResults.executionTime && ` in ${testResults.executionTime}ms`}
                    </div>
                    <div className="overflow-x-auto">
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96 text-xs">
                        {JSON.stringify(testResults.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {testResults.error || 'Query failed'}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
