import Link from 'next/link';
import { Code, Book, Zap, Database, Layout, Shield, ArrowRight } from 'lucide-react';

export default function DocumentationPage() {
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
            <Book className="w-4 h-4 mr-2" />
            Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            DashForge Documentation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Everything you need to know to build powerful internal tools with DashForge
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Getting Started
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <QuickStartCard
              number="1"
              title="Create Your Account"
              description="Sign up for a free DashForge account to get started. No credit card required."
              icon={<Code className="w-6 h-6" />}
            />
            <QuickStartCard
              number="2"
              title="Connect Your Data"
              description="Link your databases (PostgreSQL, MySQL, MongoDB) or REST APIs in seconds."
              icon={<Database className="w-6 h-6" />}
            />
            <QuickStartCard
              number="3"
              title="Build Your App"
              description="Use our drag-and-drop builder to create beautiful interfaces without writing code."
              icon={<Layout className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Explore Documentation
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <DocSection
              icon={<Zap className="w-6 h-6" />}
              title="Quick Start Guide"
              description="Learn the basics and build your first dashboard in 5 minutes"
              topics={[
                "Creating your first app",
                "Connecting to databases",
                "Building UI components",
                "Running queries"
              ]}
            />
            <DocSection
              icon={<Database className="w-6 h-6" />}
              title="Data Sources"
              description="Connect and query various databases and APIs"
              topics={[
                "PostgreSQL connection",
                "MySQL connection",
                "MongoDB connection",
                "REST API integration"
              ]}
            />
            <DocSection
              icon={<Layout className="w-6 h-6" />}
              title="UI Components"
              description="Build beautiful interfaces with pre-built components"
              topics={[
                "Tables and data grids",
                "Forms and inputs",
                "Charts and visualizations",
                "Buttons and actions"
              ]}
            />
            <DocSection
              icon={<Shield className="w-6 h-6" />}
              title="Security & Auth"
              description="Secure your applications with authentication and permissions"
              topics={[
                "User authentication",
                "Role-based access control",
                "API security",
                "Data encryption"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Popular Guides
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <GuideLink
              title="Build a Customer Dashboard"
              description="Learn how to create a beautiful customer management dashboard in minutes"
            />
            <GuideLink
              title="Connect to PostgreSQL Database"
              description="Step-by-step guide to securely connecting your PostgreSQL database"
            />
            <GuideLink
              title="Create Custom Forms"
              description="Build powerful forms with validation and submission handling"
            />
            <GuideLink
              title="Deploy Your Application"
              description="Deploy your DashForge app and share it with your team"
            />
            <GuideLink
              title="Working with APIs"
              description="Fetch data from REST APIs and display it in your dashboard"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start building?
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Create your first internal tool in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Building Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Support
            </Link>
          </div>
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

function QuickStartCard({
  number,
  title,
  description,
  icon
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
          {number}
        </div>
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function DocSection({
  icon,
  title,
  description,
  topics
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  topics: string[];
}) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-3">
        {topics.map((topic, index) => (
          <li key={index} className="flex items-center text-sm text-gray-700">
            <ArrowRight className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GuideLink({ title, description }: { title: string; description: string }) {
  return (
    <a
      href="#"
      className="block bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 ml-4 transform group-hover:translate-x-1 transition-all" />
      </div>
    </a>
  );
}
