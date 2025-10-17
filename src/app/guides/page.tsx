import Link from 'next/link';
import { Code, BookOpen, Database, Layout, Zap, Shield, Users, ArrowRight } from 'lucide-react';

export default function GuidesPage() {
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
            <BookOpen className="w-4 h-4 mr-2" />
            Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            DashForge Guides
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Step-by-step tutorials to help you master DashForge and build amazing internal tools
          </p>
        </div>
      </section>

      {/* Guide Categories */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard
              icon={<Zap className="w-6 h-6" />}
              title="Getting Started"
              count="12 guides"
              description="Learn the basics and start building your first application"
            />
            <CategoryCard
              icon={<Database className="w-6 h-6" />}
              title="Data Sources"
              count="8 guides"
              description="Connect to databases and APIs to power your applications"
            />
            <CategoryCard
              icon={<Layout className="w-6 h-6" />}
              title="UI Components"
              count="15 guides"
              description="Build beautiful interfaces with pre-built components"
            />
            <CategoryCard
              icon={<Shield className="w-6 h-6" />}
              title="Security & Auth"
              count="6 guides"
              description="Implement authentication and secure your applications"
            />
            <CategoryCard
              icon={<Users className="w-6 h-6" />}
              title="Team Collaboration"
              count="5 guides"
              description="Work effectively with your team in DashForge"
            />
            <CategoryCard
              icon={<Code className="w-6 h-6" />}
              title="Advanced Topics"
              count="10 guides"
              description="Master advanced features and customization"
            />
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Popular Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <GuideCard
              title="Build Your First Dashboard"
              description="Create a complete customer dashboard with tables, charts, and forms in under 10 minutes"
              difficulty="Beginner"
              time="10 min read"
            />
            <GuideCard
              title="Connect to PostgreSQL"
              description="Securely connect your PostgreSQL database and start querying data"
              difficulty="Beginner"
              time="5 min read"
            />
            <GuideCard
              title="Create Custom Forms"
              description="Build dynamic forms with validation, conditional logic, and submission handling"
              difficulty="Intermediate"
              time="15 min read"
            />
            <GuideCard
              title="Working with REST APIs"
              description="Integrate external APIs and display data in your dashboards"
              difficulty="Intermediate"
              time="12 min read"
            />
            <GuideCard
              title="Implement Role-Based Access"
              description="Set up user roles and permissions to control access to your applications"
              difficulty="Advanced"
              time="20 min read"
            />
            <GuideCard
              title="Deploy to Production"
              description="Learn best practices for deploying and scaling your DashForge applications"
              difficulty="Advanced"
              time="18 min read"
            />
          </div>
        </div>
      </section>

      {/* Featured Guide */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                Featured Guide
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Guide to Building Internal Tools
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Learn everything you need to know about building internal tools with DashForge, from
                initial setup to advanced customization. This comprehensive guide covers best practices,
                common patterns, and real-world examples.
              </p>
              <div className="flex items-center text-sm text-gray-600 space-x-6 mb-8">
                <span>45 min read</span>
                <span>•</span>
                <span>Beginner to Advanced</span>
                <span>•</span>
                <span>Updated Jan 2025</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Read Full Guide
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to start building?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Put these guides into practice and create your first internal tool
          </p>
          <Link
            href="/register"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Building Free
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

function CategoryCard({
  icon,
  title,
  count,
  description
}: {
  icon: React.ReactNode;
  title: string;
  count: string;
  description: string;
}) {
  return (
    <a
      href="#"
      className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all group"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mb-3">{count}</p>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </a>
  );
}

function GuideCard({
  title,
  description,
  difficulty,
  time
}: {
  title: string;
  description: string;
  difficulty: string;
  time: string;
}) {
  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700'
  };

  return (
    <a
      href="#"
      className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
          {title}
        </h3>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 ml-2 transform group-hover:translate-x-1 transition-all" />
      </div>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
      <div className="flex items-center gap-3 text-xs">
        <span className={`px-2 py-1 rounded-md font-semibold ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
        <span className="text-gray-500">{time}</span>
      </div>
    </a>
  );
}
