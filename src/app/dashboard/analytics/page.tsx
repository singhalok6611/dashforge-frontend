'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Clock,
  Activity,
  BarChart3,
  Download
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const { showToast } = useToast();

  // Sample analytics data
  const stats = {
    totalViews: 15234,
    viewsChange: 12.5,
    activeUsers: 1847,
    usersChange: 8.2,
    avgSessionTime: '4m 32s',
    sessionChange: -2.3,
    apiCalls: 43521,
    apiChange: 15.7
  };

  const appUsage = [
    { name: 'Sales Dashboard', views: 5234, users: 523, growth: 15.2 },
    { name: 'Customer Analytics', views: 4123, users: 412, growth: 8.5 },
    { name: 'Inventory Manager', views: 2876, users: 287, growth: -3.2 },
    { name: 'HR Portal', views: 2001, users: 425, growth: 22.1 },
    { name: 'Project Tracker', views: 1000, users: 200, growth: 5.3 }
  ];

  const dailyActivity = [
    { date: 'Mon', views: 2145 },
    { date: 'Tue', views: 2567 },
    { date: 'Wed', views: 2234 },
    { date: 'Thu', views: 2890 },
    { date: 'Fri', views: 2456 },
    { date: 'Sat', views: 1234 },
    { date: 'Sun', views: 1234 }
  ];

  const maxViews = Math.max(...dailyActivity.map(d => d.views));

  const handleExport = () => {
    try {
      // Prepare CSV data
      const csvData = [];

      // Add header
      csvData.push('Analytics Report');
      csvData.push(`Time Range: ${timeRange === '7d' ? '7 Days' : timeRange === '30d' ? '30 Days' : '90 Days'}`);
      csvData.push(`Generated: ${new Date().toLocaleString()}`);
      csvData.push('');

      // Add summary stats
      csvData.push('Summary Statistics');
      csvData.push('Metric,Value,Change');
      csvData.push(`Total Views,${stats.totalViews},${stats.viewsChange}%`);
      csvData.push(`Active Users,${stats.activeUsers},${stats.usersChange}%`);
      csvData.push(`Avg Session Time,${stats.avgSessionTime},${stats.sessionChange}%`);
      csvData.push(`API Calls,${stats.apiCalls},${stats.apiChange}%`);
      csvData.push('');

      // Add app performance
      csvData.push('App Performance');
      csvData.push('App Name,Views,Users,Growth %');
      appUsage.forEach(app => {
        csvData.push(`${app.name},${app.views},${app.users},${app.growth}`);
      });
      csvData.push('');

      // Add daily activity
      csvData.push('Daily Activity');
      csvData.push('Day,Views');
      dailyActivity.forEach(day => {
        csvData.push(`${day.date},${day.views}`);
      });

      // Create CSV content
      const csvContent = csvData.join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `analytics-report-${timeRange}-${Date.now()}.csv`);
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      showToast('Analytics data exported successfully!', 'success');
    } catch (error) {
      console.error('Error exporting analytics:', error);
      showToast('Failed to export analytics data. Please try again.', 'error');
    }
  };

  const renderTrend = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">+{change}%</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{change}%</span>
        </div>
      );
    }
    return <span className="text-sm text-gray-500">0%</span>;
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
                Analytics
              </h1>
              <p className="text-gray-600">
                Monitor app performance and user engagement
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Time Range Selector */}
              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setTimeRange('7d')}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    timeRange === '7d'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  7 days
                </button>
                <button
                  onClick={() => setTimeRange('30d')}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    timeRange === '30d'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  30 days
                </button>
                <button
                  onClick={() => setTimeRange('90d')}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    timeRange === '90d'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  90 days
                </button>
              </div>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-5 h-5 text-blue-600" />
                {renderTrend(stats.viewsChange)}
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalViews.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-green-600" />
                {renderTrend(stats.usersChange)}
              </div>
              <p className="text-sm text-gray-600 mb-1">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.activeUsers.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                {renderTrend(stats.sessionChange)}
              </div>
              <p className="text-sm text-gray-600 mb-1">Avg. Session</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.avgSessionTime}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-5 h-5 text-orange-600" />
                {renderTrend(stats.apiChange)}
              </div>
              <p className="text-sm text-gray-600 mb-1">API Calls</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.apiCalls.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
            <CardDescription>
              Page views over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-2">
              {dailyActivity.map((day) => {
                const height = (day.views / maxViews) * 100;
                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col justify-end h-48 mb-2">
                      <div
                        className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors cursor-pointer relative group"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {day.views.toLocaleString()} views
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{day.date}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* App Performance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>App Performance</CardTitle>
                  <CardDescription>
                    Usage statistics by application
                  </CardDescription>
                </div>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appUsage.map((app, index) => (
                  <div key={app.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900">
                          {index + 1}. {app.name}
                        </span>
                      </div>
                      {renderTrend(app.growth)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{app.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{app.users.toLocaleString()} users</span>
                      </div>
                    </div>
                    {index < appUsage.length - 1 && (
                      <div className="pt-2 border-b border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                How users interact with your apps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Engagement Metric */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Return Rate</span>
                    <span className="text-sm font-semibold text-gray-900">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '68%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                    <span className="text-sm font-semibold text-gray-900">82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: '82%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">User Satisfaction</span>
                    <span className="text-sm font-semibold text-gray-900">91%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: '91%' }}
                    />
                  </div>
                </div>

                {/* User Activity Breakdown */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">User Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">New Users</span>
                      <span className="text-sm font-semibold text-gray-900">423</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Returning Users</span>
                      <span className="text-sm font-semibold text-gray-900">1,424</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Today</span>
                      <span className="text-sm font-semibold text-gray-900">287</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Card */}
        <Card className="mt-6 bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Strong Growth This Month
                </h4>
                <p className="text-sm text-gray-700">
                  Your apps are seeing 12.5% more views compared to last month. The Sales Dashboard
                  is your top performer with 15.2% growth. Consider expanding its features based on user feedback.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
