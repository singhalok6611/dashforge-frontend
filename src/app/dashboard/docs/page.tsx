'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  BookOpen,
  Search,
  ChevronRight,
  Rocket,
  Code,
  Database,
  Palette,
  Shield,
  Zap,
  FileText,
  Video,
  ExternalLink
} from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: {
    id: string;
    title: string;
    duration: string;
    slug: string;
  }[];
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const docSections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics and create your first app',
      icon: <Rocket className="w-6 h-6" />,
      articles: [
        { id: '1', title: 'Introduction to DashForge', duration: '5 min read', slug: 'introduction-to-dashforge' },
        { id: '2', title: 'Creating Your First App', duration: '10 min read', slug: 'creating-your-first-app' },
        { id: '3', title: 'Understanding the Dashboard', duration: '7 min read', slug: 'understanding-the-dashboard' },
        { id: '4', title: 'Quick Start Guide', duration: '15 min read', slug: 'quick-start-guide' }
      ]
    },
    {
      id: 'data-sources',
      title: 'Data Sources',
      description: 'Connect and manage your databases',
      icon: <Database className="w-6 h-6" />,
      articles: [
        { id: '5', title: 'Connecting PostgreSQL', duration: '8 min read', slug: 'connecting-postgresql' },
        { id: '6', title: 'Working with MySQL', duration: '8 min read', slug: 'working-with-mysql' },
        { id: '7', title: 'MongoDB Integration', duration: '10 min read', slug: 'mongodb-integration' },
        { id: '8', title: 'REST API Connections', duration: '12 min read', slug: 'rest-api-connections' }
      ]
    },
    {
      id: 'components',
      title: 'Components & UI',
      description: 'Build beautiful interfaces with our components',
      icon: <Palette className="w-6 h-6" />,
      articles: [
        { id: '9', title: 'Available Components', duration: '6 min read', slug: 'available-components' },
        { id: '10', title: 'Tables and Data Display', duration: '10 min read', slug: 'tables-data-display' },
        { id: '11', title: 'Forms and Input Fields', duration: '9 min read', slug: 'forms-input-fields' },
        { id: '12', title: 'Charts and Visualizations', duration: '12 min read', slug: 'charts-visualizations' }
      ]
    },
    {
      id: 'queries',
      title: 'Queries & Logic',
      description: 'Write queries and add business logic',
      icon: <Code className="w-6 h-6" />,
      articles: [
        { id: '13', title: 'Writing SQL Queries', duration: '12 min read', slug: 'writing-sql-queries' },
        { id: '14', title: 'JavaScript Transforms', duration: '15 min read', slug: 'javascript-transforms' },
        { id: '15', title: 'Query Variables', duration: '8 min read', slug: 'query-variables' },
        { id: '16', title: 'Error Handling', duration: '10 min read', slug: 'error-handling' }
      ]
    },
    {
      id: 'security',
      title: 'Security & Access',
      description: 'Secure your apps and manage permissions',
      icon: <Shield className="w-6 h-6" />,
      articles: [
        { id: '17', title: 'User Authentication', duration: '10 min read', slug: 'user-authentication' },
        { id: '18', title: 'Role-Based Access Control', duration: '12 min read', slug: 'role-based-access-control' },
        { id: '19', title: 'API Security', duration: '8 min read', slug: 'api-security' },
        { id: '20', title: 'Best Security Practices', duration: '15 min read', slug: 'security-best-practices' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Features',
      description: 'Master advanced DashForge capabilities',
      icon: <Zap className="w-6 h-6" />,
      articles: [
        { id: '21', title: 'Custom Components', duration: '20 min read', slug: 'custom-components' },
        { id: '22', title: 'Webhooks and Integrations', duration: '15 min read', slug: 'webhooks-integrations' },
        { id: '23', title: 'Performance Optimization', duration: '12 min read', slug: 'performance-optimization' },
        { id: '24', title: 'Deployment Options', duration: '18 min read', slug: 'deployment-options' }
      ]
    }
  ];

  const popularDocs = [
    { id: '2', title: 'Creating Your First App', views: 15234, slug: 'creating-your-first-app' },
    { id: '5', title: 'Connecting PostgreSQL', views: 12456, slug: 'connecting-postgresql' },
    { id: '10', title: 'Tables and Data Display', views: 9876, slug: 'tables-data-display' },
    { id: '14', title: 'JavaScript Transforms', views: 8765, slug: 'javascript-transforms' },
    { id: '18', title: 'Role-Based Access Control', views: 7654, slug: 'role-based-access-control' }
  ];

  const videoTutorials = [
    { id: '1', title: 'DashForge in 5 Minutes', duration: '5:23' },
    { id: '2', title: 'Building a CRUD App', duration: '12:45' },
    { id: '3', title: 'Advanced Query Techniques', duration: '18:30' }
  ];

  const filteredSections = searchQuery
    ? docSections.map(section => ({
        ...section,
        articles: section.articles.filter(article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.articles.length > 0)
    : docSections;

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
                Documentation
              </h1>
              <p className="text-gray-600">
                Everything you need to build amazing applications
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Documentation Sections */}
          <div className="lg:col-span-2 space-y-6">
            {filteredSections.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {section.icon}
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {section.articles.map((article, index) => (
                      <Link
                        key={article.id}
                        href={`/dashboard/docs/${article.slug}`}
                        className={`w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm group ${
                          index < section.articles.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          <span className="text-sm font-medium text-gray-900 text-left group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{article.duration}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularDocs.map((doc, index) => (
                    <Link
                      key={doc.id}
                      href={`/dashboard/docs/${doc.slug}`}
                      className="w-full text-left block"
                    >
                      <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm group">
                        <span className="text-sm font-semibold text-gray-400 mt-0.5 group-hover:text-blue-600 transition-colors">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {doc.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {doc.views.toLocaleString()} views
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {videoTutorials.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => console.log('Play video:', video.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Video className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 mb-0.5">
                            {video.title}
                          </p>
                          <p className="text-xs text-gray-500">{video.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <a
                    href="https://github.com/dashforge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">GitHub Repository</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="https://community.dashforge.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">Community Forum</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="https://api.dashforge.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">API Reference</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                  <button
                    onClick={() => console.log('Open changelog')}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">Changelog</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Help Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Need More Help?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Can't find what you're looking for? Our support team is here to help you get the most out of DashForge.
                  </p>
                  <div className="flex items-center space-x-3">
                    <Button variant="primary" onClick={() => console.log('Contact support')}>
                      Contact Support
                    </Button>
                    <Button variant="outline" onClick={() => console.log('Schedule demo')}>
                      Schedule a Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
