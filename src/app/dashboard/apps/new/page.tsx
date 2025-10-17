'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { ArrowLeft, Layout, BarChart3, Table, FileText, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { canCreateApp } from '@/lib/permissions';

const templates = [
  {
    id: 'blank',
    name: 'Blank App',
    description: 'Start from scratch with an empty canvas',
    icon: Layout,
    color: 'blue',
  },
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    description: 'Pre-built dashboard with charts and metrics',
    icon: BarChart3,
    color: 'purple',
  },
  {
    id: 'admin',
    name: 'Admin Panel',
    description: 'CRUD operations with data tables',
    icon: Table,
    color: 'green',
  },
  {
    id: 'form',
    name: 'Form Builder',
    description: 'Create forms with validation',
    icon: FileText,
    color: 'orange',
  },
];

export default function NewAppPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    template: 'blank',
  });
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Check user permissions on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserRole(user.role);

        // Redirect viewers to dashboard
        if (!canCreateApp(user.role)) {
          router.push('/dashboard?error=no-permission');
        }
      } catch (err) {
        router.push('/dashboard');
      }
    } else {
      router.push('/login');
    }
  }, [router]);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      setError('App name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Generate unique slug with timestamp
      const baseSlug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const timestamp = Date.now().toString().slice(-6);
      const slug = `${baseSlug}-${timestamp}`;

      const response = await api.post('/apps', {
        name: formData.name,
        description: formData.description,
        slug: slug,
        template: formData.template,
      });

      const data = response.data;

      if (data.success) {
        router.push('/dashboard/apps');
      } else {
        setError(data.error || 'Failed to create app');
      }
    } catch (err) {
      console.error('Error creating app:', err);
      setError('Failed to create app. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New App
        </h1>
        <p className="text-gray-600">
          Build your custom dashboard or admin panel in minutes
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <span className="ml-2 font-medium">Details</span>
        </div>
        <div className={`h-0.5 w-16 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <span className="ml-2 font-medium">Template</span>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Step 1: App Details */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>App Details</CardTitle>
            <CardDescription>Give your app a name and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              label="App Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="My Awesome Dashboard"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this app does..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button
                variant="primary"
                onClick={() => setStep(2)}
                disabled={!formData.name.trim()}
              >
                Next: Choose Template
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Choose Template */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose a Template</CardTitle>
            <CardDescription>Start with a template or build from scratch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {templates.map((template) => {
                const Icon = template.icon;
                const isSelected = formData.template === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => setFormData({ ...formData, template: template.id })}
                    className={`p-6 border-2 rounded-lg text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${template.color}-100`}>
                      <Icon className={`w-6 h-6 text-${template.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleCreate}
                disabled={loading}
              >
                {loading ? 'Creating App...' : 'Create App'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
