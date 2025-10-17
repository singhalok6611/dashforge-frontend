'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import {
  Plus,
  Search,
  Layout,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Clock,
  Users,
  ArrowLeft,
  Loader2,
  FileText
} from 'lucide-react';
import { canCreateApp, canEditApp, canDeleteApp } from '@/lib/permissions';

interface App {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  icon: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  creator: {
    name: string;
    email: string;
  };
  _count: {
    pages: number;
    queries: number;
  };
}

export default function AppsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchApps();

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
  }, []);

  const fetchApps = async () => {
    try {
      setLoading(true);
      const response = await api.get('/apps');

      const data = response.data;

      if (data.success) {
        setApps(data.data);
      } else {
        setError(data.error || 'Failed to load apps');
      }
    } catch (err) {
      console.error('Error fetching apps:', err);
      setError('Failed to load apps. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.description && app.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDeleteApp = async (appId: string, appName: string) => {
    if (!confirm(`Are you sure you want to delete "${appName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await api.delete(`/apps/${appId}`);
      setApps(apps.filter(app => app.id !== appId));
    } catch (err) {
      console.error('Error deleting app:', err);
      alert('Failed to delete app');
    }
  };

  const getStatusBadge = (app: App) => {
    const hasQueries = app._count.queries > 0;
    const status = hasQueries ? 'active' : 'draft';
    const color = hasQueries ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    return { status, color };
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
                My Apps
              </h1>
              <p className="text-gray-600">
                Manage and organize all your applications
              </p>
            </div>
            {userRole && canCreateApp(userRole) && (
              <Link href="/dashboard/apps/new">
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New App
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search apps by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <Card>
            <CardContent className="py-16">
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600">Loading your apps...</p>
              </div>
            </CardContent>
          </Card>
        ) : filteredApps.length === 0 ? (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layout className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'No apps found' : 'No apps yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : userRole && canCreateApp(userRole)
                    ? 'Create your first app to start building powerful dashboards'
                    : 'No apps have been created yet'
                  }
                </p>
                {!searchQuery && userRole && canCreateApp(userRole) && (
                  <Link href="/dashboard/apps/new">
                    <Button variant="primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First App
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl mr-1">{app.icon}</span>
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(app).color}`}>
                          {getStatusBadge(app).status}
                        </span>
                        {app.isPublic && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Public
                          </span>
                        )}
                      </div>
                      <CardDescription>{app.description || 'No description'}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Stats */}
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                    <FileText className="w-4 h-4" />
                    <span>{app._count.queries} queries</span>
                  </div>

                  {/* Timestamps */}
                  <div className="space-y-2 mb-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>Created {new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>Updated {new Date(app.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      by {app.creator.name}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Link href={`/dashboard/apps/${app.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    {userRole && canEditApp(userRole) && (
                      <Link href={`/dashboard/apps/${app.id}/builder`}>
                        <Button variant="outline" size="md">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                    {userRole && canDeleteApp(userRole) && (
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => handleDeleteApp(app.id, app.name)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {!loading && filteredApps.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">Total Apps</p>
                <p className="text-3xl font-bold text-gray-900">{apps.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {apps.filter(a => getStatusBadge(a).status === 'active').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">Drafts</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {apps.filter(a => getStatusBadge(a).status === 'draft').length}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
