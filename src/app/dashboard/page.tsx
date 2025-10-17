'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SkeletonStat, SkeletonCard } from '@/components/ui/skeleton';
import { Plus, Database, Users as UsersIcon, Layout, Loader2 } from 'lucide-react';
import { canCreateApp, canManageTeam, canCreateDataSource } from '@/lib/permissions';
import api from '@/lib/api';

interface App {
  id: string;
  name: string;
  description: string | null;
  icon: string;
}

interface DashboardStats {
  totalApps: number;
  dataSources: number;
  teamMembers: number;
  apiCalls: number;
  recentApps: App[];
}

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>({
    totalApps: 0,
    dataSources: 0,
    teamMembers: 1,
    apiCalls: 0,
    recentApps: [],
  });
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();

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

  const fetchDashboardStats = async () => {
    try {
      // Use api client which automatically sends httpOnly cookies
      const response = await api.get('/apps');

      if (response.data.success) {
        setStats({
          totalApps: response.data.data.length,
          dataSources: 0, // TODO: Fetch from API when endpoint is ready
          teamMembers: 1, // TODO: Fetch from API when endpoint is ready
          apiCalls: 0, // TODO: Fetch from API when endpoint is ready
          recentApps: response.data.data.slice(0, 3), // Get 3 most recent apps
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        {/* Header Skeleton */}
        <div className="mb-8 animate-fade-in">
          <div className="h-9 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 w-96 bg-gray-200 rounded"></div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <SkeletonStat key={i} />
          ))}
        </div>

        {/* Recent Apps Skeleton */}
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[rgb(var(--text))] mb-2">
          Welcome back!
        </h1>
        <p className="text-[rgb(var(--text-secondary))]">
          Here's what's happening with your dashboards today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className={`grid grid-cols-1 ${canCreateApp(userRole ?? undefined) || canManageTeam(userRole ?? undefined) ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6 mb-8`}>
        {canCreateApp(userRole ?? undefined) && (
          <Link href="/dashboard/apps/new">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Create New App</h3>
                    <p className="text-sm text-gray-600">Start from scratch or use a template</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        <Link href="/dashboard/datasources">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{canCreateDataSource(userRole ?? undefined) ? 'Connect Database' : 'View Data Sources'}</h3>
                  <p className="text-sm text-gray-600">{canCreateDataSource(userRole ?? undefined) ? 'Add a new data source' : 'Browse available data sources'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {canManageTeam(userRole ?? undefined) && (
          <Link href="/dashboard/team">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Invite Team</h3>
                    <p className="text-sm text-gray-600">Collaborate with your team</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        <Link href="/dashboard/apps">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Layout className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Browse Apps</h3>
                  <p className="text-sm text-gray-600">View all your applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">Total Apps</p>
            <p className="text-3xl font-bold text-[rgb(var(--text))]">{stats.totalApps}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">Data Sources</p>
            <p className="text-3xl font-bold text-[rgb(var(--text))]">{stats.dataSources}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">Team Members</p>
            <p className="text-3xl font-bold text-[rgb(var(--text))]">{stats.teamMembers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">API Calls</p>
            <p className="text-3xl font-bold text-[rgb(var(--text))]">{stats.apiCalls}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Apps */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Apps</CardTitle>
              <CardDescription>
                {stats.recentApps.length > 0
                  ? 'Your recently updated apps'
                  : canCreateApp(userRole ?? undefined)
                  ? 'Get started by creating your first app'
                  : 'View all available apps'}
              </CardDescription>
            </div>
            {canCreateApp(userRole ?? undefined) && (
              <Link href="/dashboard/apps/new">
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-2" />
                  New App
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {stats.recentApps.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layout className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No apps yet</h3>
              <p className="text-gray-600 mb-6">
                {canCreateApp(userRole ?? undefined)
                  ? 'Create your first app to start building powerful dashboards'
                  : 'No apps have been created yet. Contact your administrator to create apps.'}
              </p>
              {canCreateApp(userRole ?? undefined) && (
                <Link href="/dashboard/apps/new">
                  <Button variant="primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First App
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.recentApps.map((app) => (
                <Link key={app.id} href={`/dashboard/apps/${app.id}`}>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-3xl">{app.icon}</span>
                        <h3 className="font-semibold text-gray-900 truncate">{app.name}</h3>
                      </div>
                      {app.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{app.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Getting Started Guide */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Follow these steps to build your first dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Connect your data</h4>
                  <p className="text-sm text-gray-600">
                    Connect to your database, API, or other data sources
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Build your interface</h4>
                  <p className="text-sm text-gray-600">
                    Drag and drop components to create your dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Share with your team</h4>
                  <p className="text-sm text-gray-600">
                    Invite team members and set permissions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
