'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import {
  ArrowLeft,
  Save,
  Eye,
  Settings,
  Layout,
  Database,
  Code,
  Loader2,
  Plus,
  Trash2
} from 'lucide-react';
import { canCreateApp, canDeleteApp } from '@/lib/permissions';

interface App {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  icon: string;
  isPublic: boolean;
}

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: string;
}

export default function EditAppPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const appId = params.id as string;

  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'builder' | 'data' | 'queries' | 'settings'>('queries');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loadingDataSources, setLoadingDataSources] = useState(false);
  const [queries, setQueries] = useState<any[]>([]);
  const [loadingQueries, setLoadingQueries] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    isPublic: false,
  });

  // Check for tab query parameter and set active tab
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['builder', 'data', 'queries', 'settings'].includes(tab)) {
      setActiveTab(tab as 'builder' | 'data' | 'queries' | 'settings');
    }
  }, [searchParams]);

  useEffect(() => {
    fetchApp();
    fetchDataSources();
    fetchQueries();

    // Get user role from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserRole(user.role);
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
  }, [appId]);

  const fetchDataSources = async () => {
    try {
      setLoadingDataSources(true);
      const response = await api.get('/datasources');

      const data = response.data;
      if (data.success) {
        setDataSources(data.data);
      }
    } catch (err) {
      console.error('Error fetching data sources:', err);
    } finally {
      setLoadingDataSources(false);
    }
  };

  const fetchQueries = async () => {
    try {
      setLoadingQueries(true);
      const response = await api.get(`/apps/${appId}/queries`);

      const data = response.data;
      if (data.success) {
        setQueries(data.data);
      }
    } catch (err) {
      console.error('Error fetching queries:', err);
    } finally {
      setLoadingQueries(false);
    }
  };

  const fetchApp = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/apps/${appId}`);

      const data = response.data;

      if (data.success) {
        setApp(data.data);
        setFormData({
          name: data.data.name,
          description: data.data.description || '',
          icon: data.data.icon,
          isPublic: data.data.isPublic,
        });
      } else {
        setError('Failed to load app');
      }
    } catch (err) {
      console.error('Error fetching app:', err);
      setError('Failed to load app');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await api.put(`/apps/${appId}`, formData);

      const data = response.data;

      if (data.success) {
        setApp(data.data);
        alert('App saved successfully!');
      } else {
        alert(data.error || 'Failed to save app');
      }
    } catch (err) {
      console.error('Error saving app:', err);
      alert('Failed to save app');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading app...</p>
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">App Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The app you are looking for does not exist.'}</p>
            <Link href="/dashboard/apps">
              <Button variant="primary">Back to Apps</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/apps" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{app.icon}</span>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{app.name}</h1>
                <p className="text-sm text-gray-500">App Editor</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => window.open(`/dashboard/apps/${appId}`, '_blank')}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('builder')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'builder'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layout className="w-4 h-4 inline mr-2" />
            Builder
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'data'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Database className="w-4 h-4 inline mr-2" />
            Data Sources
          </button>
          <button
            onClick={() => setActiveTab('queries')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'queries'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Code className="w-4 h-4 inline mr-2" />
            Queries
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {/* Builder Tab */}
        {activeTab === 'builder' && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-16">
                <Layout className="w-20 h-20 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Visual Builder
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Use our drag-and-drop builder to create your interface with tables, charts, forms, and more
                </p>
                <Link href={`/dashboard/apps/${appId}/builder`}>
                  <Button variant="primary" size="lg">
                    <Layout className="w-5 h-5 mr-2" />
                    Open Visual Builder
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Sources Tab */}
        {activeTab === 'data' && (
          <div className="max-w-4xl">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Data Sources</CardTitle>
                    <CardDescription>Connect databases and APIs to your app</CardDescription>
                  </div>
                  <Link href="/dashboard/datasources">
                    <Button variant="primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Manage Data Sources
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {loadingDataSources ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading data sources...</p>
                  </div>
                ) : dataSources.length === 0 ? (
                  <div className="text-center py-12">
                    <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Data Sources Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Connect your first database or API to start working with data
                    </p>
                    <Link href="/dashboard/datasources">
                      <Button variant="outline">Add Data Source</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {dataSources.map((ds) => (
                      <div
                        key={ds.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Database className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">{ds.name}</h4>
                            <p className="text-sm text-gray-500">{ds.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              ds.status === 'CONNECTED'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {ds.status}
                          </span>
                          <Link href={`/dashboard/apps/${appId}/query-test`}>
                            <Button variant="outline" size="sm">
                              Test Query
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Queries Tab */}
        {activeTab === 'queries' && (
          <div className="max-w-4xl">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Queries</CardTitle>
                    <CardDescription>Create and manage database queries</CardDescription>
                  </div>
                  <Link href={`/dashboard/apps/${appId}/queries/new`}>
                    <Button variant="primary">
                      <Plus className="w-4 h-4 mr-2" />
                      New Query
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {loadingQueries ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading queries...</p>
                  </div>
                ) : queries.length === 0 ? (
                  <div className="text-center py-12">
                    <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Queries Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Write SQL queries or connect to REST APIs to fetch data
                    </p>
                    <Link href={`/dashboard/apps/${appId}/queries/new`}>
                      <Button variant="outline">Create Your First Query</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {queries.map((query) => (
                      <div
                        key={query.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Code className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">{query.name}</h4>
                            <p className="text-sm text-gray-500">
                              {query.dataSource?.name} • {query.queryType}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>App Settings</CardTitle>
                <CardDescription>Configure your app settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  label="App Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="My Awesome App"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what this app does..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    App Icon
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{formData.icon}</span>
                    <Input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="📱"
                      className="max-w-xs"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use any emoji as your app icon
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
                    Make this app publicly accessible
                  </label>
                </div>

                {userRole && canDeleteApp(userRole) && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Danger Zone</h3>
                    <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete App
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
