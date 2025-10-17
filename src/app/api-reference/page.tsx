import Link from 'next/link';
import { Code, Terminal, ArrowRight } from 'lucide-react';

export default function APIReferencePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DashForge</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Terminal className="w-4 h-4 mr-2" />
            API Reference
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            DashForge API Reference
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Complete API documentation for integrating and extending DashForge
          </p>
        </div>
      </section>

      {/* API Overview */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Started with the API</h2>
            <div className="bg-white p-8 rounded-xl border border-gray-200 mb-12">
              <h3 className="text-xl font-semibold mb-4">Base URL</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-6">
                https://api.dashforge.in/v1
              </div>

              <h3 className="text-xl font-semibold mb-4">Authentication</h3>
              <p className="text-gray-600 mb-4">
                All API requests require authentication via Bearer tokens. Include your API key in the Authorization header:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                Authorization: Bearer YOUR_API_KEY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">API Endpoints</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <EndpointCard
              method="GET"
              endpoint="/apps"
              description="List all applications in your organization"
            />
            <EndpointCard
              method="POST"
              endpoint="/apps"
              description="Create a new application"
            />
            <EndpointCard
              method="GET"
              endpoint="/apps/:id"
              description="Get details of a specific application"
            />
            <EndpointCard
              method="PUT"
              endpoint="/apps/:id"
              description="Update an existing application"
            />
            <EndpointCard
              method="DELETE"
              endpoint="/apps/:id"
              description="Delete an application"
            />
            <EndpointCard
              method="GET"
              endpoint="/datasources"
              description="List all data sources"
            />
            <EndpointCard
              method="POST"
              endpoint="/datasources"
              description="Add a new data source"
            />
            <EndpointCard
              method="POST"
              endpoint="/queries/execute"
              description="Execute a database query"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help with the API?
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Our support team is here to help you integrate DashForge
          </p>
          <Link
            href="/support"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Contact Support
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 DashForge. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function EndpointCard({
  method,
  endpoint,
  description
}: {
  method: string;
  endpoint: string;
  description: string;
}) {
  const methodColors: Record<string, string> = {
    GET: 'bg-green-100 text-green-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-yellow-100 text-yellow-700',
    DELETE: 'bg-red-100 text-red-700'
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        <span className={`px-3 py-1 rounded-md text-sm font-semibold ${methodColors[method]}`}>
          {method}
        </span>
        <div className="flex-1">
          <code className="text-gray-900 font-mono text-lg block mb-2">{endpoint}</code>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
