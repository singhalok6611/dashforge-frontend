'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import {
  Database,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Edit,
  TestTube,
  Loader2
} from 'lucide-react';
import { canCreateDataSource, canEditDataSource, canDeleteDataSource } from '@/lib/permissions';

type DatabaseType = 'postgresql' | 'mysql' | 'mongodb';

interface DataSource {
  id: string;
  name: string;
  type: DatabaseType;
  host: string;
  database: string;
  status: 'connected' | 'disconnected';
  createdAt: string;
}

export default function DataSourcesPage() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedType, setSelectedType] = useState<DatabaseType>('postgresql');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Check user permissions and fetch data sources on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserRole(user.role);
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
    fetchDataSources();
  }, []);

  const fetchDataSources = async () => {
    try {
      setLoading(true);
      const response = await api.get('/datasources');

      const data = response.data;

      if (data.success) {
        setDataSources(data.data.map((ds: any) => ({
          ...ds,
          host: '',
          database: '',
          status: 'connected' as const
        })));
      } else {
        setError(data.error || 'Failed to load data sources');
      }
    } catch (err) {
      console.error('Error fetching data sources:', err);
      setError('Failed to load data sources');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);

      const config = {
        host: formData.get('host'),
        port: parseInt(formData.get('port') as string),
        database: formData.get('database'),
        username: formData.get('username'),
        password: formData.get('password'),
        ssl: formData.get('ssl') === 'on'
      };

      const response = await api.post('/datasources', {
        name: formData.get('name'),
        type: selectedType.toUpperCase(),
        config
      });

      const data = response.data;

      if (data.success) {
        setShowNewForm(false);
        fetchDataSources(); // Refresh list
        alert('Data source created successfully!');
      } else {
        setError(data.error || 'Failed to create data source');
      }
    } catch (err) {
      console.error('Error creating data source:', err);
      setError('Failed to create data source. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTestConnection = () => {
    console.log('Testing connection...');
  };

  const handleDelete = (id: string, name: string) => {
    console.log('Delete data source:', { id, name });
  };

  const getTypeIcon = (type: DatabaseType) => {
    return <Database className="w-5 h-5" />;
  };

  const getTypeColor = (type: DatabaseType) => {
    switch (type) {
      case 'postgresql':
        return 'bg-blue-100 text-blue-800';
      case 'mysql':
        return 'bg-orange-100 text-orange-800';
      case 'mongodb':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Header with Breadcrumb */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Data Sources
              </h1>
              <p className="text-gray-600">
                Connect and manage your database connections
              </p>
            </div>
            {canCreateDataSource(userRole) && (
              <Button variant="primary" onClick={() => setShowNewForm(!showNewForm)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Data Source
              </Button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* New Data Source Form */}
        {showNewForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Connect New Database</CardTitle>
              <CardDescription>
                Add a new database connection to use in your applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Database Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Database Type
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedType('postgresql')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        selectedType === 'postgresql'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Database className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="font-medium text-gray-900">PostgreSQL</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedType('mysql')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        selectedType === 'mysql'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Database className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <p className="font-medium text-gray-900">MySQL</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedType('mongodb')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        selectedType === 'mongodb'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Database className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="font-medium text-gray-900">MongoDB</p>
                    </button>
                  </div>
                </div>

                {/* Connection Details */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="name"
                    label="Connection Name"
                    placeholder="My Database"
                    required
                  />
                  <Input
                    name="host"
                    label="Host"
                    placeholder="localhost or db.example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="port"
                    label="Port"
                    type="number"
                    placeholder={selectedType === 'mongodb' ? '27017' : selectedType === 'mysql' ? '3306' : '5432'}
                    required
                  />
                  <Input
                    name="database"
                    label="Database Name"
                    placeholder="database_name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="username"
                    label="Username"
                    placeholder="db_user"
                    required
                  />
                  <Input
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* SSL Option */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="ssl"
                    id="ssl"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="ssl" className="text-sm text-gray-700">
                    Use SSL/TLS connection
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleTestConnection}
                  >
                    <TestTube className="w-4 h-4 mr-2" />
                    Test Connection
                  </Button>
                  <Button type="submit" variant="primary" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Connect Database
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Existing Data Sources */}
        {loading ? (
          <Card>
            <CardContent className="py-16">
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600">Loading data sources...</p>
              </div>
            </CardContent>
          </Card>
        ) : dataSources.length === 0 ? (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No data sources yet
                </h3>
                <p className="text-gray-600 mb-6">
                  {canCreateDataSource(userRole)
                    ? 'Connect your first database to start building applications'
                    : 'No data sources have been configured yet'
                  }
                </p>
                {canCreateDataSource(userRole) && (
                  <Button variant="primary" onClick={() => setShowNewForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Data Source
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Connected Data Sources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataSources.map((source) => (
                <Card key={source.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(source.type)}`}>
                          {getTypeIcon(source.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{source.name}</CardTitle>
                          <CardDescription className="capitalize">{source.type}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {source.status === 'connected' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Host:</span>
                        <span className="font-mono text-gray-900">{source.host}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Database:</span>
                        <span className="font-mono text-gray-900">{source.database}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          source.status === 'connected'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {source.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Added:</span>
                        <span className="text-gray-900">
                          {new Date(source.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                      <Button variant="outline" className="flex-1">
                        <TestTube className="w-4 h-4 mr-2" />
                        Test
                      </Button>
                      {canEditDataSource(userRole) && (
                        <Button variant="outline" size="md">
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      {canDeleteDataSource(userRole) && (
                        <Button
                          variant="outline"
                          size="md"
                          onClick={() => handleDelete(source.id, source.name)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Info Card */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Database className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Secure Connection Storage
                </h4>
                <p className="text-sm text-gray-700">
                  All database credentials are encrypted at rest and in transit. Your connection
                  details are never exposed in your applications or logs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
