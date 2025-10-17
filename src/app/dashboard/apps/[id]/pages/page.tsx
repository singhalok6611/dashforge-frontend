'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import {
  ArrowLeft,
  Plus,
  FileText,
  Edit2,
  Trash2,
  Loader2,
  Layout,
  Save,
  X
} from 'lucide-react';

interface Page {
  id: string;
  name: string;
  slug: string;
  order: number;
  appId: string;
  createdAt: string;
  updatedAt: string;
}

interface App {
  id: string;
  name: string;
}

export default function PagesManagementPage() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;

  const [app, setApp] = useState<App | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [deletingPage, setDeletingPage] = useState<string | null>(null);

  // Form state for creating new page
  const [newPageForm, setNewPageForm] = useState({
    name: '',
    slug: '',
  });

  // Form state for editing page
  const [editPageForm, setEditPageForm] = useState({
    name: '',
    slug: '',
  });

  useEffect(() => {
    fetchApp();
    fetchPages();
  }, [appId]);

  const fetchApp = async () => {
    try {
      const response = await api.get(`/apps/${appId}`);

      const data = response.data;
      if (data.success) {
        setApp(data.data);
      } else {
        setError(data.error || 'Failed to fetch app');
      }
    } catch (err) {
      console.error('Error fetching app:', err);
      setError('Failed to fetch app');
    }
  };

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/apps/${appId}/pages`);

      const data = response.data;
      if (data.success) {
        setPages(data.data);
      } else {
        setError(data.error || 'Failed to fetch pages');
      }
    } catch (err) {
      console.error('Error fetching pages:', err);
      setError('Failed to fetch pages');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPageForm.name || !newPageForm.slug) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await api.post(`/apps/${appId}/pages`, newPageForm);

      const data = response.data;
      if (data.success) {
        setPages([...pages, data.data]);
        setNewPageForm({ name: '', slug: '' });
        setShowCreateForm(false);
      } else {
        alert(data.error || 'Failed to create page');
      }
    } catch (err) {
      console.error('Error creating page:', err);
      alert('Failed to create page');
    }
  };

  const handleUpdatePage = async (pageId: string) => {
    if (!editPageForm.name || !editPageForm.slug) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await api.put(`/apps/${appId}/pages/${pageId}`, editPageForm);

      const data = response.data;
      if (data.success) {
        setPages(pages.map(p => p.id === pageId ? data.data : p));
        setEditingPage(null);
        setEditPageForm({ name: '', slug: '' });
      } else {
        alert(data.error || 'Failed to update page');
      }
    } catch (err) {
      console.error('Error updating page:', err);
      alert('Failed to update page');
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) {
      return;
    }

    try {
      setDeletingPage(pageId);
      const response = await api.delete(`/apps/${appId}/pages/${pageId}`);

      const data = response.data;
      if (data.success) {
        setPages(pages.filter(p => p.id !== pageId));
      } else {
        alert(data.error || 'Failed to delete page');
      }
    } catch (err) {
      console.error('Error deleting page:', err);
      alert('Failed to delete page');
    } finally {
      setDeletingPage(null);
    }
  };

  const startEditingPage = (page: Page) => {
    setEditingPage(page.id);
    setEditPageForm({
      name: page.name,
      slug: page.slug,
    });
  };

  const cancelEditing = () => {
    setEditingPage(null);
    setEditPageForm({ name: '', slug: '' });
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNewPageNameChange = (name: string) => {
    setNewPageForm({
      name,
      slug: generateSlug(name),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href={`/dashboard/apps/${appId}`}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Pages</h1>
                {app && (
                  <p className="text-sm text-gray-500">{app.name}</p>
                )}
              </div>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2"
            >
              {showCreateForm ? (
                <>
                  <X className="h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  New Page
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Create Page Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Page</CardTitle>
              <CardDescription>
                Add a new page to your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Name
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Home, Dashboard, Settings"
                    value={newPageForm.name}
                    onChange={(e) => handleNewPageNameChange(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., home, dashboard, settings"
                    value={newPageForm.slug}
                    onChange={(e) => setNewPageForm({ ...newPageForm, slug: e.target.value })}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL-friendly identifier (lowercase, no spaces)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Create Page
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewPageForm({ name: '', slug: '' });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Pages List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : pages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pages yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Create your first page to get started
              </p>
              {!showCreateForm && (
                <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Page
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pages.map((page) => (
              <Card key={page.id}>
                <CardContent className="p-6">
                  {editingPage === page.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Name
                        </label>
                        <Input
                          type="text"
                          value={editPageForm.name}
                          onChange={(e) => setEditPageForm({ ...editPageForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Slug
                        </label>
                        <Input
                          type="text"
                          value={editPageForm.slug}
                          onChange={(e) => setEditPageForm({ ...editPageForm, slug: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleUpdatePage(page.id)}
                          className="flex items-center gap-2"
                        >
                          <Save className="h-4 w-4" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {page.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                              /{page.slug}
                            </span>
                            <span>Order: {page.order}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEditingPage(page)}
                          className="flex items-center gap-2"
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeletePage(page.id)}
                          disabled={deletingPage === page.id}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          {deletingPage === page.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Card */}
        {pages.length > 0 && (
          <Card className="mt-6 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Layout className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">
                    Multi-page Applications
                  </h4>
                  <p className="text-sm text-blue-700">
                    You have {pages.length} {pages.length === 1 ? 'page' : 'pages'} configured.
                    Each page can have its own layout and components. Navigate between pages
                    using the page builder to customize individual pages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
