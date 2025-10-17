'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Play,
  Check,
  Zap,
  DollarSign,
  Clock,
  Users,
  Shield,
  TrendingUp,
  Lightbulb,
  Database,
  Layout,
  BarChart3,
  FileText,
  Code,
  Settings
} from 'lucide-react';

export default function ShowcasePage() {
  const [activeDemo, setActiveDemo] = useState<'customer' | 'sales' | 'inventory'>('customer');

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: '10x Faster',
      description: 'Build in hours what traditionally takes months',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: '90% Cost Savings',
      description: '$99/month vs $300K+ in development costs',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Zero Code',
      description: 'Visual drag-and-drop builder, no coding required',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant, role-based access control',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const demos = {
    customer: {
      title: 'Customer Management Admin Panel',
      description: 'View, edit, and manage customer records from your database',
      features: [
        'Sortable & filterable data table',
        'Quick search functionality',
        'Edit customer details inline',
        'Export to CSV/Excel',
        'Bulk operations',
      ],
      buildTime: '30 minutes',
      traditionalTime: '2-3 weeks',
    },
    sales: {
      title: 'Sales Analytics Dashboard',
      description: 'Track revenue, conversions, and sales performance in real-time',
      features: [
        'Interactive charts & graphs',
        'Revenue tracking',
        'Conversion rate metrics',
        'Top performing products',
        'Sales team leaderboard',
      ],
      buildTime: '45 minutes',
      traditionalTime: '3-4 weeks',
    },
    inventory: {
      title: 'Inventory Management System',
      description: 'Track stock levels, manage products, and automate reordering',
      features: [
        'Real-time stock tracking',
        'Low stock alerts',
        'Product catalog management',
        'Stock movement history',
        'Automated reorder notifications',
      ],
      buildTime: '1 hour',
      traditionalTime: '4-6 weeks',
    },
  };

  const workflow = [
    {
      step: 1,
      title: 'Create Your App',
      description: 'Choose a template or start from scratch',
      icon: <Layout className="w-8 h-8" />,
      time: '2 minutes',
    },
    {
      step: 2,
      title: 'Connect Data Source',
      description: 'Link your PostgreSQL, MySQL, or MongoDB database',
      icon: <Database className="w-8 h-8" />,
      time: '1 minute',
    },
    {
      step: 3,
      title: 'Build Queries',
      description: 'Write SQL or use visual query builder',
      icon: <Code className="w-8 h-8" />,
      time: '5 minutes',
    },
    {
      step: 4,
      title: 'Design Interface',
      description: 'Drag & drop components onto canvas',
      icon: <BarChart3 className="w-8 h-8" />,
      time: '10 minutes',
    },
    {
      step: 5,
      title: 'Configure Settings',
      description: 'Set permissions, customize appearance',
      icon: <Settings className="w-8 h-8" />,
      time: '2 minutes',
    },
    {
      step: 6,
      title: 'Deploy & Share',
      description: 'Publish and share with your team',
      icon: <Users className="w-8 h-8" />,
      time: '1 minute',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Experience DashForge
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build internal tools, admin panels, and dashboards in minutes without writing code.
              See how DashForge transforms the way you build software.
            </p>
          </div>
        </div>

        {/* Video Demo Section */}
        <Card className="mb-12 overflow-hidden">
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Play className="w-20 h-20 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Watch the Demo Video</h2>
              <p className="text-lg opacity-90 mb-6">
                See DashForge in action - from creating an app to deploying it in minutes
              </p>
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                <Play className="w-4 h-4 mr-2" />
                Play Video (Coming Soon)
              </Button>
            </div>
          </div>
        </Card>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Use Case Demos */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Real-World Use Cases</CardTitle>
            <CardDescription>See what you can build with DashForge</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Demo Tabs */}
            <div className="flex space-x-4 mb-8 border-b border-gray-200">
              {Object.entries(demos).map(([key, demo]) => (
                <button
                  key={key}
                  onClick={() => setActiveDemo(key as any)}
                  className={`pb-3 px-4 font-medium transition-colors ${
                    activeDemo === key
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {demo.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active Demo Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {demos[activeDemo].title}
                </h3>
                <p className="text-gray-600 mb-6">{demos[activeDemo].description}</p>

                <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                <ul className="space-y-2 mb-6">
                  {demos[activeDemo].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Zap className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-900">With DashForge</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">{demos[activeDemo].buildTime}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-red-600 mr-2" />
                      <span className="text-sm font-medium text-red-900">Traditional Dev</span>
                    </div>
                    <p className="text-2xl font-bold text-red-700">{demos[activeDemo].traditionalTime}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <Layout className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-75">Interactive Demo Coming Soon</p>
                  <p className="text-sm opacity-50 mt-2">Preview the actual interface</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Steps */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>Build your first app in 6 simple steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflow.map((item) => (
                <div key={item.step} className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-bold text-blue-600 mr-2">STEP {item.step}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {item.time}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Total Time: ~20 minutes
              </p>
              <p className="text-gray-600">
                Compare that to weeks or months of traditional development!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ROI Calculator */}
        <Card className="mb-12 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-8">
            <div className="text-center max-w-3xl mx-auto">
              <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Calculate Your Savings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Traditional Development</p>
                  <p className="text-3xl font-bold text-red-600">$300,000</p>
                  <p className="text-sm text-gray-500">+ 6 months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">With DashForge</p>
                  <p className="text-3xl font-bold text-green-600">$1,188</p>
                  <p className="text-sm text-gray-500">$99/mo × 12 months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Your Savings</p>
                  <p className="text-3xl font-bold text-blue-600">$298,812</p>
                  <p className="text-sm text-gray-500">+ 5.9 months faster</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                That's a <span className="font-bold text-green-600">99.6% cost reduction</span> and{' '}
                <span className="font-bold text-blue-600">10x faster delivery</span>
              </p>
              <Link href="/dashboard/apps/new">
                <Button variant="primary" size="lg">
                  Start Building Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="pt-12 pb-12 text-center">
            <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of teams building internal tools 10x faster with DashForge
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/dashboard/apps/new">
                <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100" size="lg">
                  Create Your First App
                </Button>
              </Link>
              <Link href="/dashboard/docs">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" size="lg">
                  Read Documentation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
